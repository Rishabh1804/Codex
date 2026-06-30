// Vercel serverless function — live World Cup 2026 scores via API-Football (api-sports.io).
//
// Design goals:
//  - Secret key stays server-side (process.env.FOOTBALL_API_KEY); never shipped to the client.
//  - Respect the 100 req/day free tier: only call upstream when a fixture is actually in its live
//    window, and let Vercel's CDN cache the response (s-maxage) so many users => few upstream calls.
//  - Never break the page: any error / missing key / rate-limit => { source:'stale', matches:[] }
//    and the client keeps its curated snapshot.

const API_BASE = 'https://v3.football.api-sports.io';
const WC_LEAGUE = 1;
const WC_SEASON = 2026;
const PLAY_MS = 150 * 60 * 1000; // ~2.5h live window (covers ET + penalties)

// Baked-in fixture schedule — kept in sync with the client MATCHES (kickoff ISO + our flag codes).
// Used to (a) gate upstream calls to live windows and (b) match API fixtures to our board.
const FIXTURES = [
  ['2026-06-29T00:30:00+05:30', 'za', 'ca'],
  ['2026-06-29T22:30:00+05:30', 'br', 'jp'],
  ['2026-06-30T02:00:00+05:30', 'de', 'py'],
  ['2026-06-30T06:30:00+05:30', 'nl', 'ma'],
  ['2026-06-30T22:30:00+05:30', 'ci', 'no'],
  ['2026-07-01T02:30:00+05:30', 'fr', 'se'],
  ['2026-07-01T06:30:00+05:30', 'mx', 'ec'],
  ['2026-07-01T21:30:00+05:30', 'gb-eng', 'cd'],
  ['2026-07-02T01:30:00+05:30', 'be', 'sn'],
  ['2026-07-02T05:30:00+05:30', 'us', 'ba'],
  ['2026-07-03T00:30:00+05:30', 'es', 'at'],
  ['2026-07-03T04:30:00+05:30', 'pt', 'hr'],
  ['2026-07-03T08:30:00+05:30', 'ch', 'dz'],
  ['2026-07-03T23:30:00+05:30', 'au', 'eg'],
  ['2026-07-04T03:30:00+05:30', 'ar', 'cv'],
  ['2026-07-04T07:00:00+05:30', 'co', 'gh'],
];

// API-Football team name (lowercased) -> our flag code. Includes common aliases.
const NAME2CODE = {
  'south africa': 'za', 'canada': 'ca', 'brazil': 'br', 'japan': 'jp', 'germany': 'de',
  'paraguay': 'py', 'netherlands': 'nl', 'morocco': 'ma', 'ivory coast': 'ci', "cote d'ivoire": 'ci',
  'norway': 'no', 'france': 'fr', 'sweden': 'se', 'mexico': 'mx',
  'ecuador': 'ec', 'england': 'gb-eng', 'dr congo': 'cd', 'congo dr': 'cd', 'democratic republic of congo': 'cd',
  'belgium': 'be', 'senegal': 'sn', 'usa': 'us', 'united states': 'us', 'bosnia and herzegovina': 'ba',
  'spain': 'es', 'austria': 'at', 'portugal': 'pt', 'croatia': 'hr', 'switzerland': 'ch',
  'algeria': 'dz', 'australia': 'au', 'egypt': 'eg', 'argentina': 'ar', 'cape verde': 'cv',
  'colombia': 'co', 'ghana': 'gh',
};
const code = name => NAME2CODE[String(name || '').trim().toLowerCase()] || null;

const LIVE_STATUSES = new Set(['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'INT', 'SUSP']);
const FINAL_STATUSES = new Set(['FT', 'AET', 'PEN']);
function mapStatus(short) {
  if (FINAL_STATUSES.has(short)) return 'final';
  if (LIVE_STATUSES.has(short)) return 'live';
  return 'sched';
}

// IST date (YYYY-MM-DD) for a given epoch — used for the date query param.
function istDate(ms) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date(ms));
}

module.exports = async (req, res) => {
  const now = Date.now();
  // Which fixture (if any) is currently inside its live window?
  const liveFix = FIXTURES.find(([t]) => {
    const ko = new Date(t).getTime();
    return now >= ko && now < ko + PLAY_MS;
  });

  // CDN cache: short while live, longer when idle (cuts upstream calls hard on the free tier).
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control',
    liveFix ? 's-maxage=120, stale-while-revalidate=300' : 's-maxage=900, stale-while-revalidate=1800');

  // No live match right now -> no upstream call; client keeps the snapshot.
  if (!liveFix) {
    return res.status(200).end(JSON.stringify({ source: 'snapshot', live: false, updated: new Date(now).toISOString(), matches: [] }));
  }

  const key = process.env.FOOTBALL_API_KEY;
  if (!key) {
    return res.status(200).end(JSON.stringify({ source: 'stale', reason: 'no-key', live: true, matches: [] }));
  }

  try {
    const date = istDate(new Date(liveFix[0]).getTime());
    const url = `${API_BASE}/fixtures?league=${WC_LEAGUE}&season=${WC_SEASON}&date=${date}&timezone=Asia/Kolkata`;
    const r = await fetch(url, { headers: { 'x-apisports-key': key } });
    if (!r.ok) {
      return res.status(200).end(JSON.stringify({ source: 'stale', reason: `http-${r.status}`, live: true, matches: [] }));
    }
    const data = await r.json();
    const matches = (data.response || []).map(f => {
      const a = code(f.teams && f.teams.home && f.teams.home.name);
      const b = code(f.teams && f.teams.away && f.teams.away.name);
      if (!a || !b) return null; // unmapped team -> skip, snapshot retained for that tie
      const pen = f.score && f.score.penalty;
      const hasPen = pen && (pen.home != null || pen.away != null);
      const st = f.fixture && f.fixture.status;
      return {
        key: `${a}|${b}`, a, b,
        scoreA: f.goals && f.goals.home, scoreB: f.goals && f.goals.away,
        status: mapStatus(st && st.short),
        minute: (st && st.elapsed != null) ? st.elapsed : null,
        pens: hasPen ? `${pen.home}–${pen.away}` : null,
        winner: (f.teams && f.teams.home && f.teams.home.winner) ? 'a'
              : (f.teams && f.teams.away && f.teams.away.winner) ? 'b' : null,
      };
    }).filter(Boolean);
    return res.status(200).end(JSON.stringify({ source: 'api', live: true, updated: new Date(now).toISOString(), matches }));
  } catch (e) {
    return res.status(200).end(JSON.stringify({ source: 'stale', reason: 'fetch-error', live: true, matches: [] }));
  }
};
