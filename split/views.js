/* CODEX — Views (Phase 3: Journal, Canons, Canon Detail, Snippet Import) */

/* --- Phase 3 State --- */
var _journalFilters = { range: '30d', volume: null };
var _journalLoadMoreCount = 30;
var _canonPage = 1;
var _canonFilters = { scope: null, category: null, status: null };
var _canonSort = 'newest';
var CANONS_PER_PAGE = 10;

/* --- Phase 1 Lore State --- */
var _loreFilters = { category: null, domain: null };
var _loreSort = 'newest';

/* --- Forum Pattern (canon-0052) State — TODOs --- */
var _todoFilters = { status: 'open', volume: null };
var _todoSort = 'newest';

/* --- Forum Pattern (canon-0052) State — Journal sub-tabs ---
   Per canon-0052 §Journal: four sub-tabs (Sessions / Decrees / Logs / All)
   default 'all' per §Sub-Tab Pattern. Sessions / Decrees are derived from
   journal.json entries (decrees = sessions whose id starts 'decree-' or
   that carry a ratification_mode field). Logs render from
   store.companion_logs (canon-0053 v1 schema, generated at build time). */
var _journalSubTab = (typeof localStorage !== 'undefined' && localStorage.getItem('codex-subtab-journal')) || 'all';

/* --- Forum Pattern (canon-0052) State — Canons sub-tabs + filters ---
   Per canon-0052 §Sub-Tab Pattern, selection persists in localStorage
   under codex-subtab-{tab}. Default is 'canons' (the primary entity type
   in this tab); the canon's "All default leftmost" rule from §Sub-Tabs
   is overridden by §Canons which lists three concrete sub-tabs without
   an All option — the three Rostras carry incompatible signals and an
   All view would jumble them. */
var _canonsSubTab = (typeof localStorage !== 'undefined' && localStorage.getItem('codex-subtab-canons')) || 'canons';
var _schismFilters = { volume: null };
var _schismSort = 'newest';
var _apocryphaFilters = { status: null, volume: null };
var _apocryphaSort = 'newest';

/* --- Forum Pattern (canon-0052) State — Library (Dashboard) --- */
var _libraryFilters = { shelf: null, cluster: null };
var _librarySort = 'recent';

/* --- Forum Pattern (canon-0052) State — Specs --- */
var _specFilters = { status: null, category: null, volume: null };
var _specSort = 'newest';

var SPEC_STATUSES = ['needed', 'proposed', 'drafting', 'review', 'locked', 'implemented', 'superseded'];
var SPEC_CATEGORIES = ['impl-spec', 'design-spec', 'canon-draft', 'handoff'];

/* Derive cluster from volume id per canon-cc-016 residency model. Data
   has cluster:null across the board (flagged for housekeeping) — compute
   until the data fix commit lands. */
function getVolumeCluster(volId) {
  if (volId === 'codex' || volId === 'sproutlab') return 'A';
  if (volId === 'sep-invoicing' || volId === 'sep-dashboard') return 'B';
  if (volId === 'command-center') return 'Monument';
  return null;
}
function getClusterLabel(key) {
  if (key === 'A') return 'Cluster A';
  if (key === 'B') return 'Cluster B';
  if (key === 'Monument') return 'Monument';
  return key || 'Unaligned';
}

/* --- Shared Helpers --- */

/* Walk every chapter and return any whose status is not in CHAPTER_STATUSES.
   Used by Settings to surface drift (canon-0052 §Chapter Status Enum —
   "any unrecognized status surfaces in Settings as 'Unknown chapter status'
   warnings"). Returns array of { volumeId, volumeName, chapterId,
   chapterName, status }. */
function detectChapterStatusDrift() {
  var drift = [];
  (store.volumes || []).forEach(function(v) {
    (v.chapters || []).forEach(function(ch) {
      if (ch._deleted) return;
      if (ch.status && CHAPTER_STATUSES.indexOf(ch.status) === -1) {
        drift.push({ volumeId: v.id, volumeName: v.name, chapterId: ch.id, chapterName: ch.name, status: ch.status });
      }
    });
  });
  return drift;
}

/* Chapter status → cx() icon name. Covers the canon-0052 enum —
   progress states (planned → spec-drafting → spec-complete → in-progress
   → review → complete) plus interrupts (paused, blocked, abandoned).
   Unknown values fall through to bookmark; drift surfaces in Settings. */
function chapterStatusIcon(status) {
  switch (status) {
    case 'complete': return 'check';
    case 'in-progress': return 'clock';
    case 'spec-drafting': return 'quill';
    case 'spec-complete': return 'scroll';
    case 'review': return 'search';
    case 'abandoned': return 'alert';
    case 'blocked': return 'lock';
    case 'paused': return 'clock';
    case 'planned': return 'bookmark';
    default: return 'bookmark';
  }
}

/* Generic per-key tally: returns [{ key, count }] sorted descending.
   Used by every Forum Pattern Rostra that needs derived dot rows. */
function tallyBy(items, keyFn) {
  var map = {};
  items.forEach(function(item) {
    var k = keyFn(item);
    if (k == null) return;
    if (Array.isArray(k)) {
      k.forEach(function(kk) { if (kk != null) map[kk] = (map[kk] || 0) + 1; });
    } else {
      map[k] = (map[k] || 0) + 1;
    }
  });
  return Object.keys(map).map(function(k) { return { key: k, count: map[k] }; })
    .sort(function(a, b) { return b.count - a.count; });
}

/* Canons Rostra signals (canon-0052 §Canons). Total + per-category +
   per-status + scope-coverage. Categories/statuses are derived from
   data, not hard-coded — adding a new category to canons.json adds a
   dot automatically. */
function computeCanonsStats() {
  var canons = filterActive(store.canons);
  return {
    total: canons.length,
    byCategory: tallyBy(canons, function(c) { return c.category; }),
    byStatus: tallyBy(canons, function(c) { return c.status; }),
    byScope: tallyBy(canons, function(c) { return c.scope; })
  };
}

/* Schisms Rostra signals. Per-volume counts (volumes[] is an array on
   each schism), plus total. */
function computeSchismsStats() {
  var schisms = filterActive(store.schisms);
  return {
    total: schisms.length,
    byVolume: tallyBy(schisms, function(s) { return s.volumes || []; })
  };
}

/* Apocrypha Rostra signals. Per-status (fulfilled/foretold/forgotten)
   plus per-volume. */
function computeApocryphaStats() {
  var apo = filterActive(store.apocrypha);
  return {
    total: apo.length,
    byStatus: tallyBy(apo, function(a) { return a.status; }),
    byVolume: tallyBy(apo, function(a) { return a.volumes || []; })
  };
}

/* Look up a volume name by id; falls back to the id itself when the
   volume isn't found (orphaned scope reference). */
function lookupVolumeName(id) {
  if (!id || id === 'global') return id === 'global' ? 'Global' : id;
  var v = (store.volumes || []).find(function(x) { return x.id === id; });
  return v ? v.name : id;
}
function lookupVolumeColor(id) {
  if (!id) return null;
  var v = (store.volumes || []).find(function(x) { return x.id === id; });
  return v ? (v.domain_color || null) : null;
}

/* TODOs Rostra signals (canon-0052 §TODOs). Walks every volume's todos and
   produces { open, resolvedThisWeek, resolvedThisMonth, resolvedLifetime,
   resolutionRate30d, avgResolutionDays, overdue, stalled, perVolume }.
   Resolution-rate is rolling 30-day percentage of (resolved-in-window) over
   (resolved-in-window + still-open-created-in-window). avgResolutionDays is
   lifetime mean for resolved entries that carry both created and resolved
   dates. perVolume is sorted by openCount descending. */
function computeTodoStats() {
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 86400000);
  var oneMonthAgo = new Date(today.getTime() - 30 * 86400000);
  var fourteenDaysAgo = new Date(today.getTime() - 14 * 86400000);
  var thirtyDaysAgo = new Date(today.getTime() - 30 * 86400000);

  var stats = {
    open: 0, resolvedThisWeek: 0, resolvedThisMonth: 0, resolvedLifetime: 0,
    overdue: 0, stalled: 0, resolutionRate30d: null, avgResolutionDays: null,
    perVolume: []
  };
  var perVolMap = {};
  var resolvedDurations = [];
  var resolvedIn30d = 0;
  var openCreatedIn30d = 0;

  (store.volumes || []).forEach(function(vol) {
    if (vol._deleted) return;
    perVolMap[vol.id] = { volId: vol.id, name: vol.name, color: vol.domain_color || null, openCount: 0, totalCount: 0 };
    (vol.todos || []).forEach(function(t) {
      if (t._deleted) return;
      perVolMap[vol.id].totalCount++;
      var created = parseDateSafe(t.created);
      if (t.status === 'open') {
        stats.open++;
        perVolMap[vol.id].openCount++;
        if (created && created < fourteenDaysAgo) stats.overdue++;
        if (created && created < thirtyDaysAgo) stats.stalled++;
        if (created && created >= thirtyDaysAgo) openCreatedIn30d++;
      } else if (t.status === 'resolved') {
        stats.resolvedLifetime++;
        var resolved = parseDateSafe(t.resolved);
        if (resolved) {
          if (resolved >= oneWeekAgo) stats.resolvedThisWeek++;
          if (resolved >= oneMonthAgo) stats.resolvedThisMonth++;
          if (resolved >= thirtyDaysAgo) resolvedIn30d++;
          if (created) {
            var diffDays = Math.round((resolved - created) / 86400000);
            if (diffDays >= 0) resolvedDurations.push(diffDays);
          }
        }
      }
    });
  });

  if (resolvedDurations.length > 0) {
    var sum = 0;
    resolvedDurations.forEach(function(d) { sum += d; });
    stats.avgResolutionDays = Math.round((sum / resolvedDurations.length) * 10) / 10;
  }
  var rateDenom = resolvedIn30d + openCreatedIn30d;
  if (rateDenom > 0) stats.resolutionRate30d = Math.round((resolvedIn30d / rateDenom) * 100);

  stats.perVolume = Object.keys(perVolMap).map(function(k) { return perVolMap[k]; })
    .filter(function(v) { return v.totalCount > 0; })
    .sort(function(a, b) { return b.openCount - a.openCount; });
  return stats;
}

/* TODO age helpers — overdue = open + created > 14 days ago; stalled = open
   + created > 30 days ago. Canon-0052 §TODOs notes "no recent activity" as
   part of stalled; TODO entities don't currently track activity timestamps,
   so the no-activity component is deferred until a touch-timestamp lands. */
function todoIsOverdue(t) {
  if (t.status !== 'open' || !t.created) return false;
  var c = parseDateSafe(t.created);
  return c && (Date.now() - c.getTime()) > 14 * 86400000;
}
function todoIsStalled(t) {
  if (t.status !== 'open' || !t.created) return false;
  var c = parseDateSafe(t.created);
  return c && (Date.now() - c.getTime()) > 30 * 86400000;
}

function renderTruncated(text, maxChars, entityId, field) {
  if (!text || text.length <= maxChars) return '<span class="cx-truncated-container">' + escHtml(text || '') + '</span>';
  var truncated = text.substring(0, maxChars).replace(/\s+\S*$/, '');
  return '<span class="cx-truncated-container" data-max="' + maxChars + '">' + escHtml(truncated) + '\u2026 <button class="cx-link-btn" data-action="expandText" data-id="' + escAttr(entityId) + '" data-field="' + escAttr(field) + '">Read more</button></span>';
}

function getEntityFieldText(id, field) {
  // Search sessions
  for (var i = 0; i < store.journal.length; i++) {
    var day = store.journal[i];
    for (var j = 0; j < (day.sessions || []).length; j++) {
      var s = day.sessions[j];
      if (s.id === id) return s[field] || '';
    }
  }
  // Search canons
  var canon = store.canons.find(function(c) { return c.id === id; });
  if (canon) return canon[field] || '';
  // Search schisms
  var rej = store.schisms.find(function(r) { return r.id === id; });
  if (rej) return rej[field] || '';
  // Search lore
  var lentry = store.lore.find(function(l) { return l.id === id; });
  if (lentry) return lentry[field] || '';
  return '';
}

function handleExpandText(el) {
  var id = el.dataset.id;
  var field = el.dataset.field;
  var container = el.closest('.cx-truncated-container');
  if (!container) return;
  var full = getEntityFieldText(id, field);
  container.innerHTML = escHtml(full) + ' <button data-action="collapseText" data-id="' + escAttr(id) + '" data-field="' + escAttr(field) + '" class="cx-link-btn">Show less</button>';
}

function handleCollapseText(el) {
  var id = el.dataset.id;
  var field = el.dataset.field;
  var container = el.closest('.cx-truncated-container');
  if (!container) return;
  var maxChars = parseInt(container.dataset.max, 10) || 120;
  var full = getEntityFieldText(id, field);
  var truncated = full.substring(0, maxChars).replace(/\s+\S*$/, '');
  container.innerHTML = escHtml(truncated) + '\u2026 <button data-action="expandText" data-id="' + escAttr(id) + '" data-field="' + escAttr(field) + '" class="cx-link-btn">Read more</button>';
}

function renderDayHeader(dateStr) {
  var today = localDateStr();
  var yd = new Date(); yd.setDate(yd.getDate() - 1);
  var yesterday = localDateStr(yd);
  var label = dateStr === today ? 'Today' : dateStr === yesterday ? 'Yesterday' : formatAbsoluteDate(dateStr);
  return '<div class="cx-day-header">' + escHtml(label) + '</div>';
}

/* --- Last Active Date (for dashboard sort — spec bug #97) --- */
function getLastActiveDate(volumeId) {
  for (var i = 0; i < store.journal.length; i++) {
    var day = store.journal[i];
    for (var j = 0; j < (day.sessions || []).length; j++) {
      if ((day.sessions[j].volumes_touched || []).includes(volumeId)) return day.date;
    }
  }
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (vol && vol.shelf_history && vol.shelf_history.length > 0) {
    return vol.shelf_history[vol.shelf_history.length - 1].date;
  }
  return null;
}

/* ============================================================
   JOURNAL VIEW
   ============================================================ */

/* Journal Forum Pattern dispatcher (canon-0052 §Journal). Four sub-tabs:
   Sessions / Decrees / Logs / All. Sessions and Decrees are derived from
   the same journal.json store; Logs reads store.companion_logs (canon-0053
   v1 schema). The "All" sub-tab is the default per §Sub-Tab Pattern. */
function renderJournal() {
  var vc = document.getElementById('viewContainer');
  var html = renderSubTabBar('journal', [
    { key: 'all', label: 'All' },
    { key: 'sessions', label: 'Sessions' },
    { key: 'decrees', label: 'Decrees' },
    { key: 'logs', label: 'Logs' }
  ], _journalSubTab);

  if (_journalSubTab === 'sessions') html += renderJournalSessionsSubTab();
  else if (_journalSubTab === 'decrees') html += renderJournalDecreesSubTab();
  else if (_journalSubTab === 'logs') html += renderJournalLogsSubTab();
  else html += renderJournalAllSubTab();

  vc.innerHTML = html;
}

/* True for sessions whose id starts with 'decree-' OR that carry a
   ratification_mode field. The data layer doesn't model decrees as a
   separate entity type — they're sessions with an institutional shape. */
function isDecreeSession(s) {
  if (!s) return false;
  if (s.id && s.id.indexOf('decree-') === 0) return true;
  if (s.ratification_mode) return true;
  return false;
}

/* Walk store.journal and return flat session arrays partitioned by type.
   Sorted newest-first by day.date (store.journal already sorted). */
function partitionJournalEntries() {
  var sessions = [];
  var decrees = [];
  (store.journal || []).forEach(function(day) {
    (day.sessions || []).forEach(function(s) {
      var entry = { session: s, date: day.date };
      if (isDecreeSession(s)) decrees.push(entry);
      else sessions.push(entry);
    });
  });
  return { sessions: sessions, decrees: decrees };
}

/* Sessions sub-tab Rostra signals (canon-0052 §Journal Sessions). */
function computeSessionsStats(entries) {
  var weekAgo = daysAgo(7);
  var monthAgo = daysAgo(30);
  var bugsFound = 0, bugsFixed = 0, durationSum = 0, durationCount = 0;
  var thisWeek = 0, thisMonth = 0;
  var perVolume = {};
  entries.forEach(function(e) {
    var s = e.session;
    if (e.date >= weekAgo) thisWeek++;
    if (e.date >= monthAgo) thisMonth++;
    bugsFound += (s.bugs_found || 0);
    bugsFixed += (s.bugs_fixed || 0);
    if (typeof s.duration_minutes === 'number') {
      durationSum += s.duration_minutes; durationCount++;
    }
    (s.volumes_touched || []).forEach(function(v) { perVolume[v] = (perVolume[v] || 0) + 1; });
  });
  return {
    total: entries.length, thisWeek: thisWeek, thisMonth: thisMonth,
    bugsFound: bugsFound, bugsFixed: bugsFixed,
    avgDuration: durationCount > 0 ? Math.round(durationSum / durationCount) : null,
    perVolume: Object.keys(perVolume).map(function(k) { return { key: k, count: perVolume[k] }; })
      .sort(function(a, b) { return b.count - a.count; })
  };
}

/* Decrees sub-tab Rostra signals (canon-0052 §Journal Decrees). */
function computeDecreesStats(entries) {
  var perProvince = {};
  var perMode = {};
  entries.forEach(function(e) {
    var s = e.session;
    var p = s.province_of_origin;
    if (p) perProvince[p] = (perProvince[p] || 0) + 1;
    var m = s.ratification_mode;
    if (m) perMode[m] = (perMode[m] || 0) + 1;
  });
  return {
    total: entries.length,
    perProvince: Object.keys(perProvince).map(function(k) { return { key: k, count: perProvince[k] }; })
      .sort(function(a, b) { return b.count - a.count; }),
    perMode: Object.keys(perMode).map(function(k) { return { key: k, count: perMode[k] }; })
      .sort(function(a, b) { return b.count - a.count; })
  };
}

/* Logs sub-tab Rostra signals (canon-0052 §Journal Logs). Reads canon-
   0053 v1 schema entries from store.companion_logs. Per-companion
   invocation tally collapses Form A/B/C entries — scalars use the value,
   'throughout' counts as 1, Form C uses the count. */
function computeCompanionLogsStats() {
  var logs = store.companion_logs || [];
  var perCompanion = {};
  var perRepo = {};
  var driftCount = 0;
  var totalRounds = 0;
  var roundsCount = 0;
  logs.forEach(function(log) {
    if (log.same_agent_drift_acknowledged) driftCount++;
    if (log.repo) perRepo[log.repo] = (perRepo[log.repo] || 0) + 1;
    var rounds = log.rounds || {};
    Object.keys(rounds).forEach(function(comp) {
      var v = rounds[comp];
      var n = 0;
      if (typeof v === 'number') n = v;
      else if (v === 'throughout') n = 1;
      else if (v && typeof v === 'object' && typeof v.count === 'number') n = v.count;
      perCompanion[comp] = (perCompanion[comp] || 0) + n;
      if (n > 0) { totalRounds += n; roundsCount++; }
    });
  });
  return {
    total: logs.length, driftCount: driftCount,
    avgRoundsPerSession: roundsCount > 0 ? Math.round((totalRounds / logs.length) * 10) / 10 : null,
    perCompanion: Object.keys(perCompanion).map(function(k) { return { key: k, count: perCompanion[k] }; })
      .filter(function(p) { return p.count > 0; })
      .sort(function(a, b) { return b.count - a.count; }),
    perRepo: Object.keys(perRepo).map(function(k) { return { key: k, count: perRepo[k] }; })
      .sort(function(a, b) { return b.count - a.count; })
  };
}

/* ---- Journal sub-tab renderers ---- */
function renderJournalSessionsSubTab() {
  var p = partitionJournalEntries();
  var stats = computeSessionsStats(p.sessions);

  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">sessions</span></div>';
  if (stats.perVolume.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.perVolume.forEach(function(v) {
      var color = lookupVolumeColor(v.key);
      var bg = color ? 'background:' + color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(lookupVolumeName(v.key) + ' \u2014 ' + v.count) + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(lookupVolumeName(v.key)) + ' ' + v.count + '</span>';
    });
    html += '</div>';
  }
  var statLine = stats.thisWeek + ' wk \u00B7 ' + stats.thisMonth + ' mo \u00B7 ' + stats.total + ' total';
  html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Logged:</span> ' + escHtml(statLine) + '</div>';
  if (stats.bugsFound > 0 || stats.bugsFixed > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Bugs:</span> ' + stats.bugsFound + ' found \u00B7 ' + stats.bugsFixed + ' fixed</div>';
  }
  if (stats.avgDuration != null) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Avg duration:</span> ' + stats.avgDuration + ' min</div>';
  }
  html += '</div>';

  return html + renderJournalRangeAndCards(p.sessions, 'session');
}

function renderJournalDecreesSubTab() {
  var p = partitionJournalEntries();
  var stats = computeDecreesStats(p.decrees);

  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">decrees</span></div>';
  if (stats.perProvince.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.perProvince.forEach(function(p2) {
      var color = lookupVolumeColor(p2.key);
      var bg = color ? 'background:' + color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(lookupVolumeName(p2.key) + ' \u2014 ' + p2.count) + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(lookupVolumeName(p2.key)) + ' ' + p2.count + '</span>';
    });
    html += '</div>';
  }
  if (stats.perMode.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Modes:</span> ';
    html += stats.perMode.map(function(m) { return escHtml(m.key + ' \u00D7 ' + m.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  html += '</div>';

  return html + renderJournalRangeAndCards(p.decrees, 'decree');
}

function renderJournalLogsSubTab() {
  var stats = computeCompanionLogsStats();

  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">logs</span></div>';
  if (stats.perRepo.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.perRepo.forEach(function(r) {
      var color = lookupVolumeColor(r.key);
      var bg = color ? 'background:' + color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(lookupVolumeName(r.key) + ' \u2014 ' + r.count) + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(lookupVolumeName(r.key)) + ' ' + r.count + '</span>';
    });
    html += '</div>';
  }
  if (stats.perCompanion.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Invocations:</span> ';
    html += stats.perCompanion.slice(0, 8).map(function(c) { return escHtml(c.key + ' \u00D7 ' + c.count); }).join(' \u00B7 ');
    if (stats.perCompanion.length > 8) html += ' \u00B7 +' + (stats.perCompanion.length - 8) + ' more';
    html += '</div>';
  }
  if (stats.avgRoundsPerSession != null) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Avg rounds/session:</span> ' + stats.avgRoundsPerSession + '</div>';
  }
  if (stats.driftCount > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-chip cx-chip-sm cx-overdue-chip">Same-agent drift acknowledged \u00D7 ' + stats.driftCount + '</span></div>';
  }
  html += '</div>';

  if (stats.total === 0) {
    html += renderEmptyState('scroll', 'No companion logs yet', 'Logs land in docs/companion-logs/<repo>/ — see canon-0053 for the format');
    return html;
  }

  // Sort by date (newest first) and render as cards.
  var logs = (store.companion_logs || []).slice().sort(function(a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });
  html += '<div class="cx-filter-count">' + logs.length + ' log' + (logs.length === 1 ? '' : 's') + '</div>';
  logs.forEach(function(log) { html += renderCompanionLogCard(log); });
  return html;
}

function renderJournalAllSubTab() {
  var p = partitionJournalEntries();
  var sStats = computeSessionsStats(p.sessions);
  var dStats = computeDecreesStats(p.decrees);
  var lStats = computeCompanionLogsStats();

  var html = '<div class="cx-rostra">';
  var totalAll = sStats.total + dStats.total + lStats.total;
  html += '<div class="cx-rostra-headline">' + totalAll + ' <span class="cx-rostra-headline-label">entries</span></div>';
  html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Mix:</span> ' + sStats.total + ' sessions \u00B7 ' + dStats.total + ' decrees \u00B7 ' + lStats.total + ' logs</div>';
  html += '</div>';

  // Combined chronological stream — sessions/decrees by their day.date,
  // logs by their date field. Render unified day-grouped cards.
  var combined = [];
  p.sessions.forEach(function(e) { combined.push({ kind: 'session', date: e.date, payload: e }); });
  p.decrees.forEach(function(e) { combined.push({ kind: 'decree', date: e.date, payload: e }); });
  (store.companion_logs || []).forEach(function(log) {
    combined.push({ kind: 'log', date: log.date || '', payload: log });
  });
  combined.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });

  if (combined.length === 0) {
    html += renderEmptyState('scroll', 'No journal entries', 'Log your first session');
    return html;
  }

  // Group by date.
  var byDate = {};
  var dateOrder = [];
  combined.forEach(function(item) {
    if (!byDate[item.date]) { byDate[item.date] = []; dateOrder.push(item.date); }
    byDate[item.date].push(item);
  });
  dateOrder.forEach(function(d) {
    html += renderDayHeader(d);
    byDate[d].forEach(function(item) {
      if (item.kind === 'log') html += renderCompanionLogCard(item.payload);
      else html += renderSessionCard(item.payload.session, item.payload.date);
    });
  });
  return html;
}

/* Common Range/Volume filter row + paginated session-card rendering used by
   Sessions and Decrees sub-tabs. Returns HTML string. */
function renderJournalRangeAndCards(entries, kind) {
  var html = '';

  // Filter pills — Range + Volume (derived from entries).
  var ranges = [
    { key: '7d', label: '7 days' },
    { key: '30d', label: '30 days' },
    { key: '90d', label: '90 days' },
    { key: 'all', label: 'All' }
  ];
  html += '<div class="cx-filter-row">';
  ranges.forEach(function(r) {
    var active = _journalFilters.range === r.key;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="setJournalRange" data-key="' + escAttr(r.key) + '">' + escHtml(r.label) + '</button>';
  });
  html += '</div>';

  var perVolume = {};
  entries.forEach(function(e) {
    (e.session.volumes_touched || []).forEach(function(v) { perVolume[v] = (perVolume[v] || 0) + 1; });
  });
  var volumeOptions = Object.keys(perVolume).map(function(k) {
    return { key: k, label: lookupVolumeName(k) };
  });
  html += renderDerivedFilterRow('journalVolume', _journalFilters.volume, volumeOptions, 'All');

  // Apply filters to the entries.
  var cutoff = null;
  if (_journalFilters.range === '7d') cutoff = daysAgo(7);
  else if (_journalFilters.range === '30d') cutoff = daysAgo(30);
  else if (_journalFilters.range === '90d') cutoff = daysAgo(90);
  var filtered = entries.filter(function(e) {
    if (cutoff && e.date < cutoff) return false;
    if (_journalFilters.volume && (e.session.volumes_touched || []).indexOf(_journalFilters.volume) === -1) return false;
    return true;
  });
  filtered.sort(function(a, b) { return b.date.localeCompare(a.date); });

  var filtersActive = (_journalFilters.range && _journalFilters.range !== 'all') || _journalFilters.volume;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + filtered.length + ' of ' + entries.length
    : filtered.length + ' ' + kind + (filtered.length === 1 ? '' : 's')) + '</div>';

  if (filtered.length === 0) {
    html += renderEmptyState('scroll', 'No ' + kind + 's match', filtersActive ? 'Try adjusting filters' : 'Nothing logged yet');
    return html;
  }

  // Paginate by _journalLoadMoreCount (entries count).
  var rendered = 0;
  var byDate = {};
  var dateOrder = [];
  for (var i = 0; i < filtered.length && rendered < _journalLoadMoreCount; i++) {
    var e = filtered[i];
    if (!byDate[e.date]) { byDate[e.date] = []; dateOrder.push(e.date); }
    byDate[e.date].push(e);
    rendered++;
  }
  dateOrder.forEach(function(d) {
    html += renderDayHeader(d);
    byDate[d].forEach(function(e) { html += renderSessionCard(e.session, e.date); });
  });
  if (rendered < filtered.length) {
    html += '<div class="cx-center"><button class="cx-btn-secondary" data-action="loadMoreJournal">Load more (' + (filtered.length - rendered) + ' remaining)</button></div>';
  }
  return html;
}

/* Companion log card (canon-0053). Compact summary surfaced in the Logs
   sub-tab — frontmatter signals + a link to the markdown body. */
function renderCompanionLogCard(log) {
  var html = '<div class="cx-card cx-companion-log-card">';
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-title">' + cx('scroll') + ' ' + escHtml(log.session_title || log.session_id || '') + '</div>';
  html += '</div>';
  html += '<div class="cx-chip-row" style="margin:var(--sp-4) 0">';
  if (log.repo) html += '<span class="cx-chip cx-chip-sm">' + escHtml(lookupVolumeName(log.repo)) + '</span>';
  if (log.session_type) html += '<span class="cx-chip cx-chip-sm">' + escHtml(log.session_type) + '</span>';
  if (log.same_agent_drift_acknowledged) html += '<span class="cx-chip cx-chip-sm cx-overdue-chip">drift ack</span>';
  if (log.duration_minutes) html += '<span class="cx-chip cx-chip-sm">' + escHtml(log.duration_minutes) + ' min</span>';
  html += '</div>';
  if (log.authors && log.authors.length > 0) {
    html += '<div class="cx-card-meta">' + escHtml(log.authors.join(' \u00B7 ')) + '</div>';
  }
  if (log.stage) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">' + escHtml(log.stage) + '</div>';
  }
  if (log.path) {
    var url = 'https://github.com/Rishabh1804/Codex/blob/main/' + escAttr(log.path);
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-8)"><a href="' + url + '" target="_blank" rel="noopener" class="cx-link-btn">' + escHtml(log.session_id || 'view log') + ' \u2192</a></div>';
  }
  html += '</div>';
  return html;
}

function renderSessionCard(session, date) {
  var html = '<div class="cx-card cx-session-card">';

  // Header: session ID + duration + delete
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-meta">' + escHtml(session.id);
  if (session.duration_minutes) html += ' \u00B7 ' + escHtml(session.duration_minutes) + ' min';
  html += '</div>';
  html += '<button class="cx-btn-icon cx-btn-danger-icon" data-action="deleteSession" data-date="' + escAttr(date) + '" data-id="' + escAttr(session.id) + '">' + cx('trash') + '</button>';
  html += '</div>';

  // Summary (truncated)
  if (session.summary) {
    html += '<div class="cx-session-summary">' + renderTruncated(session.summary, 120, session.id, 'summary') + '</div>';
  }

  // Volume chips
  if (session.volumes_touched && session.volumes_touched.length > 0) {
    html += '<div class="cx-chip-row">';
    session.volumes_touched.forEach(function(vid) {
      var vol = store.volumes.find(function(v) { return v.id === vid; });
      var color = vol ? vol.domain_color : '#8B7355';
      var name = vol ? vol.name : vid;
      html += '<span class="cx-chip cx-chip-sm cx-vol-chip" style="border-color:' + escAttr(color) + ';color:' + escAttr(color) + '" data-action="goToVolume" data-id="' + escAttr(vid) + '">' + escHtml(name) + '</span>';
    });
    html += '</div>';
  }

  // Chapter chips
  if (session.chapters_touched && session.chapters_touched.length > 0) {
    html += '<div class="cx-chip-row">';
    session.chapters_touched.forEach(function(ch) {
      html += '<span class="cx-chip cx-chip-sm">' + cx('bookmark') + ' ' + escHtml(ch) + '</span>';
    });
    html += '</div>';
  }

  // Expandable details section
  var hasDetails = (session.bugs_found > 0 || session.bugs_fixed > 0) ||
    (session.decisions && session.decisions.length > 0) ||
    (session.open_todos && session.open_todos.length > 0) ||
    session.handoff;

  if (hasDetails) {
    html += '<div data-expandable="true" data-expanded="false">';
    html += '<button class="cx-expand-header cx-link-btn" data-action="toggleExpand"><span class="cx-expand-toggle">\u25B6</span> Details</button>';
    html += '<div class="cx-expandable-content">';

    // Bugs
    if (session.bugs_found > 0 || session.bugs_fixed > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Bugs:</span> ' + escHtml(session.bugs_found || 0) + ' found, ' + escHtml(session.bugs_fixed || 0) + ' fixed</div>';
    }

    // Decisions
    if (session.decisions && session.decisions.length > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Decisions:</span>';
      session.decisions.forEach(function(d) {
        // Check if it's a canon reference (starts with canon-)
        if (d.match && d.match(/^canon-/)) {
          html += '<div class="cx-session-decision"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(d) + '">' + escHtml(d) + '</button></div>';
        } else {
          html += '<div class="cx-session-decision">' + escHtml(d) + '</div>';
        }
      });
      html += '</div>';
    }

    // Open TODOs (historical snapshot)
    if (session.open_todos && session.open_todos.length > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Open TODOs:</span>';
      session.open_todos.forEach(function(t) {
        html += '<div class="cx-session-todo-item">\u2022 ' + escHtml(t) + '</div>';
      });
      html += '</div>';
    }

    // Handoff
    if (session.handoff) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Handoff:</span> ' + renderTruncated(session.handoff, 200, session.id, 'handoff') + '</div>';
    }

    html += '</div></div>'; // expandable
  }

  html += '</div>'; // card
  return html;
}


/* ============================================================
   CANONS VIEW
   ============================================================ */

/* Forum Pattern dispatcher for the Canons tab (canon-0052 §Canons).
   Three sub-tabs (Canons / Schisms / Apocrypha), each with its own
   Rostra → Notice Boards → Stalls. Sub-tab selection persists in
   localStorage per §Sub-Tab Pattern. */
function renderCanons() {
  var vc = document.getElementById('viewContainer');
  var html = renderSubTabBar('canons', [
    { key: 'canons', label: 'Canons' },
    { key: 'schisms', label: 'Schisms' },
    { key: 'apocrypha', label: 'Apocrypha' }
  ], _canonsSubTab);

  if (_canonsSubTab === 'schisms') html += renderSchismsSubTab();
  else if (_canonsSubTab === 'apocrypha') html += renderApocryphaSubTab();
  else html += renderCanonsSubTab();

  vc.innerHTML = html;
}

/* Generic sub-tab pill row. canon-0052 §Sub-Tab Pattern: pill row directly
   below the primary tab bar, same visual language as filter pills, "All"
   default leftmost when applicable, selection persists per primary-tab in
   localStorage (`codex-subtab-{tab}`). */
function renderSubTabBar(tabName, options, current) {
  var html = '<div class="cx-filter-row cx-subtab-row">';
  options.forEach(function(opt) {
    var active = current === opt.key;
    html += '<button class="cx-filter-pill cx-subtab-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="setSubTab" data-tab="' + escAttr(tabName) + '" data-key="' + escAttr(opt.key) + '">' + escHtml(opt.label) + '</button>';
  });
  html += '</div>';
  return html;
}

/* ---- Canons sub-tab — Forum Pattern ---- */
function renderCanonsSubTab() {
  var stats = computeCanonsStats();

  // ROSTRA — total + derived category dots + status dots + scope-coverage.
  // Category dots use the per-category color class, matching the Lore
  // Rostra's visual language (canon-0052 cross-cutting discipline).
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">canons</span></div>';
  if (stats.byCategory.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.byCategory.forEach(function(c) {
      html += '<span class="cx-rostra-dot cx-canon-cat-dot cx-canon-cat-' + escAttr(c.key) + '" title="' + escAttr(c.key + ' \u2014 ' + c.count) + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(c.key) + ' ' + c.count + '</span>';
    });
    html += '</div>';
  }
  if (stats.byStatus.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Status:</span> ';
    html += stats.byStatus.map(function(s) { return escHtml(s.key + ' ' + s.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  if (stats.byScope.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Scope:</span> ';
    html += stats.byScope.map(function(s) { return escHtml(lookupVolumeName(s.key) + ' ' + s.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  html += '</div>';

  // NOTICE BOARDS — derived from data (canon-0052 §Canons rules out
  // hard-coded enums). Scope / Category / Status / Sort with Lore-style
  // small-caps row labels for visual orientation.
  html += renderDerivedFilterRow('canonScope', _canonFilters.scope, stats.byScope.map(function(s) { return { key: s.key, label: lookupVolumeName(s.key) }; }), 'All', 'Scope:');
  html += renderDerivedFilterRow('canonCategory', _canonFilters.category, stats.byCategory.map(function(c) { return { key: c.key, label: c.key }; }), 'All', 'Category:');
  html += renderDerivedFilterRow('canonStatus', _canonFilters.status, stats.byStatus.map(function(s) { return { key: s.key, label: s.key }; }), 'All', 'Status:');
  html += renderSortRow('canonSort', _canonSort, [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' },
    { key: 'title', label: 'Title' },
    { key: 'scope', label: 'Scope' }
  ], 'Sort:');

  // Apply filters.
  var canons = filterActive(store.canons).filter(function(c) {
    if (_canonFilters.scope && c.scope !== _canonFilters.scope) return false;
    if (_canonFilters.category && c.category !== _canonFilters.category) return false;
    if (_canonFilters.status && c.status !== _canonFilters.status) return false;
    return true;
  });
  if (_canonSort === 'oldest') canons.sort(function(a, b) { return a.id.localeCompare(b.id); });
  else if (_canonSort === 'title') canons.sort(function(a, b) { return (a.title || '').localeCompare(b.title || ''); });
  else if (_canonSort === 'scope') canons.sort(function(a, b) { return (a.scope || '').localeCompare(b.scope || '') || b.id.localeCompare(a.id); });
  else canons.sort(function(a, b) { return b.id.localeCompare(a.id); });

  var totalShown = filterActive(store.canons).length;
  var filtersActive = _canonFilters.scope || _canonFilters.category || _canonFilters.status;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + canons.length + ' of ' + totalShown
    : canons.length + ' canon' + (canons.length === 1 ? '' : 's')) + '</div>';

  if (canons.length === 0) {
    html += renderEmptyState('bookmark', 'No canons match', 'Try adjusting filters or add a new canon', 'New Canon', 'openCreateCanon');
    return html;
  }

  // Paginate (10/page) — keep existing pagination since 88+ canons in
  // a single scroll is mobile-painful even after filtering.
  var totalPages = Math.max(1, Math.ceil(canons.length / CANONS_PER_PAGE));
  if (_canonPage > totalPages) _canonPage = totalPages;
  var pageCanons = canons.slice((_canonPage - 1) * CANONS_PER_PAGE, _canonPage * CANONS_PER_PAGE);
  pageCanons.forEach(function(canon) { html += renderCanonCard(canon); });
  if (totalPages > 1) html += renderPaginationHtml(_canonPage, totalPages);
  return html;
}

/* ---- Schisms sub-tab — Forum Pattern ---- */
function renderSchismsSubTab() {
  var stats = computeSchismsStats();
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">schisms</span></div>';
  if (stats.byVolume.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.byVolume.forEach(function(v) {
      var color = lookupVolumeColor(v.key);
      var bg = color ? 'background:' + color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(lookupVolumeName(v.key) + ' \u2014 ' + v.count) + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(lookupVolumeName(v.key)) + ' ' + v.count + '</span>';
    });
    html += '</div>';
  }
  html += '</div>';

  html += renderDerivedFilterRow('schismVolume', _schismFilters.volume, stats.byVolume.map(function(v) { return { key: v.key, label: lookupVolumeName(v.key) }; }), 'All', 'Volume:');
  html += renderSortRow('schismSort', _schismSort, [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' }
  ], 'Sort:');

  var schisms = filterActive(store.schisms);
  if (_schismFilters.volume) schisms = schisms.filter(function(s) { return (s.volumes || []).indexOf(_schismFilters.volume) !== -1; });
  if (_schismSort === 'oldest') schisms.sort(function(a, b) { return a.id.localeCompare(b.id); });
  else schisms.sort(function(a, b) { return b.id.localeCompare(a.id); });

  var filtersActive = _schismFilters.volume;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + schisms.length + ' of ' + stats.total
    : schisms.length + ' schism' + (schisms.length === 1 ? '' : 's')) + '</div>';

  if (schisms.length === 0) {
    html += renderEmptyState('alert', 'No schisms match', 'Try adjusting filters');
    return html;
  }
  schisms.forEach(function(s) { html += renderSchismCard(s); });
  return html;
}

/* ---- Apocrypha sub-tab — Forum Pattern ---- */
function renderApocryphaSubTab() {
  var stats = computeApocryphaStats();
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">apocrypha</span></div>';
  if (stats.byStatus.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Status:</span> ';
    html += stats.byStatus.map(function(s) { return escHtml(s.key + ' ' + s.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  if (stats.byVolume.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.byVolume.forEach(function(v) {
      var color = lookupVolumeColor(v.key);
      var bg = color ? 'background:' + color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(lookupVolumeName(v.key) + ' \u2014 ' + v.count) + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(lookupVolumeName(v.key)) + ' ' + v.count + '</span>';
    });
    html += '</div>';
  }
  html += '</div>';

  html += renderDerivedFilterRow('apocryphaStatus', _apocryphaFilters.status, stats.byStatus.map(function(s) { return { key: s.key, label: s.key }; }), 'All', 'Status:');
  html += renderDerivedFilterRow('apocryphaVolume', _apocryphaFilters.volume, stats.byVolume.map(function(v) { return { key: v.key, label: lookupVolumeName(v.key) }; }), 'All', 'Volume:');
  html += renderSortRow('apocryphaSort', _apocryphaSort, [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' }
  ], 'Sort:');

  var apocryphon = filterActive(store.apocrypha);
  if (_apocryphaFilters.status) apocryphon = apocryphon.filter(function(a) { return a.status === _apocryphaFilters.status; });
  if (_apocryphaFilters.volume) apocryphon = apocryphon.filter(function(a) { return (a.volumes || []).indexOf(_apocryphaFilters.volume) !== -1; });
  if (_apocryphaSort === 'oldest') apocryphon.sort(function(a, b) { return a.id.localeCompare(b.id); });
  else apocryphon.sort(function(a, b) { return b.id.localeCompare(a.id); });

  var filtersActive = _apocryphaFilters.status || _apocryphaFilters.volume;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + apocryphon.length + ' of ' + stats.total
    : apocryphon.length + ' entr' + (apocryphon.length === 1 ? 'y' : 'ies')) + '</div>';

  if (apocryphon.length === 0) {
    html += renderEmptyState('scroll', 'No apocrypha match', 'Try adjusting filters');
    return html;
  }
  apocryphon.forEach(function(a) {
    var statusCls = a.status === 'fulfilled' ? 'cx-status-complete' : a.status === 'foretold' ? 'cx-status-in-progress' : 'cx-status-abandoned';
    html += '<div class="cx-apocrypha-card">';
    html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--sp-8)">';
    html += '<div class="cx-apocrypha-title">' + escHtml(a.title) + '</div>';
    html += '<div style="display:flex;gap:var(--sp-4);flex-shrink:0">';
    html += '<button class="cx-btn-icon" data-action="editApocryphon" data-id="' + escAttr(a.id) + '" title="Edit">' + cx('quill') + '</button>';
    html += '<button class="cx-btn-icon" data-action="deleteApocryphonAction" data-id="' + escAttr(a.id) + '" title="Delete">' + cx('trash') + '</button>';
    html += '</div></div>';
    html += '<span class="cx-chip cx-chip-sm ' + statusCls + '">' + escHtml(a.status) + '</span>';
    if (a.narrative) html += '<div class="cx-apocrypha-narrative">' + escHtml(a.narrative).replace(/\n/g, '<br>') + '</div>';
    var ameta = [];
    if (a.volumes && a.volumes.length > 0) {
      a.volumes.forEach(function(vid) { ameta.push(lookupVolumeName(vid)); });
    }
    if (a.date) ameta.push(formatAbsoluteDate(a.date));
    if (ameta.length > 0) html += '<div class="cx-card-meta" style="margin-top:var(--sp-8)">' + escHtml(ameta.join(' \u00B7 ')) + '</div>';
    html += '</div>';
  });
  return html;
}

/* Generic Forum Pattern filter pill row. `filterKey` is the action name
   suffix (e.g. 'canonScope' → data-action="setCanonScopeFilter"); cap-casing
   is applied so the action handler is the conventional set<Filter>Filter
   name. `current` is the currently-selected key (null = All). `options`
   is [{ key, label }]. `allLabel` is the leftmost pill label (typically
   "All") which clears the filter when clicked. `rowLabel` is the optional
   SMALL-CAPS prefix label (e.g. "Category:") matching Lore's convention. */
function renderDerivedFilterRow(filterKey, current, options, allLabel, rowLabel) {
  var html = '<div class="cx-filter-row">';
  if (rowLabel) html += '<span class="cx-filter-label">' + escHtml(rowLabel) + '</span>';
  var actionName = 'set' + filterKey.charAt(0).toUpperCase() + filterKey.slice(1) + 'Filter';
  html += '<button class="cx-filter-pill' + (current ? '' : ' cx-filter-pill-active') + '" data-action="' + actionName + '" data-key="">' + escHtml(allLabel || 'All') + '</button>';
  options.forEach(function(opt) {
    var active = current === opt.key;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="' + actionName + '" data-key="' + escAttr(opt.key) + '">' + escHtml(opt.label) + '</button>';
  });
  html += '</div>';
  return html;
}
function renderSortRow(sortKey, current, options, rowLabel) {
  var html = '<div class="cx-filter-row">';
  if (rowLabel) html += '<span class="cx-filter-label">' + escHtml(rowLabel) + '</span>';
  var actionName = 'set' + sortKey.charAt(0).toUpperCase() + sortKey.slice(1);
  options.forEach(function(opt) {
    var active = current === opt.key;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="' + actionName + '" data-key="' + escAttr(opt.key) + '">' + escHtml(opt.label) + '</button>';
  });
  html += '</div>';
  return html;
}

function renderPaginationHtml(current, total) {
  return '<div class="cx-pagination">'
    + '<button data-action="changePage" data-page="' + (current - 1) + '" class="cx-btn-secondary cx-btn-sm"' + (current === 1 ? ' disabled' : '') + '>Prev</button>'
    + '<span class="cx-card-meta">Page ' + current + ' of ' + total + '</span>'
    + '<button data-action="changePage" data-page="' + (current + 1) + '" class="cx-btn-secondary cx-btn-sm"' + (current === total ? ' disabled' : '') + '>Next</button>'
    + '</div>';
}

function renderCanonCard(canon) {
  var catClass = 'cx-canon-cat-' + escAttr(canon.category || 'unknown');
  var html = '<div class="cx-card cx-card-clickable cx-canon-card ' + catClass + '" data-action="goToCanon" data-id="' + escAttr(canon.id) + '">';
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-title">' + cx('bookmark') + escHtml(canon.title) + '</div>';
  html += '</div>';

  // Badges — category takes the colored-chip slot (primary classification);
  // scope + status follow as neutral outline chips.
  html += '<div class="cx-chip-row">';
  html += '<span class="cx-chip cx-chip-sm cx-canon-cat-chip ' + catClass + '-chip">' + escHtml(canon.category || '') + '</span>';
  var scopeLabel = canon.scope === 'global' ? 'Global' : lookupVolumeName(canon.scope);
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(scopeLabel) + '</span>';
  html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(canon.status) + '">' + escHtml(canon.status) + '</span>';
  html += '</div>';

  if (canon.rationale) {
    html += '<div class="cx-card-body">' + renderTruncated(canon.rationale, 100, canon.id, 'rationale') + '</div>';
  }

  // References — resolved via the cross-cutting utility per canon-0052
  // §Cross-Cutting Discipline. Each ref becomes a clickable navigation
  // button; unresolved IDs fall back to plain text.
  if (canon.references && canon.references.length > 0) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">Refs: ';
    canon.references.forEach(function(refId, idx) {
      if (idx > 0) html += ', ';
      html += renderReferenceLink(refId);
    });
    html += '</div>';
  }

  if (canon.created) {
    html += '<div class="cx-card-meta">' + escHtml(formatAbsoluteDate(canon.created)) + '</div>';
  }

  html += '</div>';
  return html;
}

function renderSchismCard(rej) {
  var html = '<div class="cx-card cx-schism-card">';
  html += '<div class="cx-card-header"><div class="cx-card-meta cx-schism-title">Rejected: ' + escHtml(rej.rejected) + '</div></div>';
  html += '<div class="cx-card-body" style="font-size:var(--fs-xs)"><span style="color:var(--success)">Chosen:</span> ' + escHtml(rej.chosen) + '</div>';
  if (rej.reason) {
    html += '<div class="cx-card-body" style="font-size:var(--fs-xs);color:var(--text-secondary)">' + renderTruncated(rej.reason, 120, rej.id, 'reason') + '</div>';
  }

  // Context + volumes + date
  var meta = [];
  if (rej.context) meta.push(rej.context);
  if (rej.volumes && rej.volumes.length > 0) {
    var volNames = rej.volumes.map(function(vid) {
      var v = store.volumes.find(function(x) { return x.id === vid; });
      return v ? v.name : vid;
    });
    meta.push(volNames.join(', '));
  }
  if (rej.date) meta.push(formatAbsoluteDate(rej.date));
  if (meta.length > 0) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">' + escHtml(meta.join(' \u00B7 ')) + '</div>';
  }

  // Linked canon
  if (rej.canon_id) {
    html += '<div style="margin-top:var(--sp-4)"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(rej.canon_id) + '">Canon: ' + escHtml(rej.canon_id) + '</button></div>';
  }

  html += '</div>';
  return html;
}


/* ============================================================
   CANON DETAIL VIEW
   ============================================================ */

function renderCanonDetail(route) {
  var vc = document.getElementById('viewContainer');
  var canon = store.canons.find(function(c) { return c.id === route.id; });
  if (!canon) {
    vc.innerHTML = renderEmptyState('alert', 'Canon not found', 'This canon may have been deleted');
    return;
  }

  var html = '';

  // Title
  html += '<h1 class="cx-page-title">' + cx('bookmark') + ' ' + escHtml(canon.title) + '</h1>';

  // Badges row
  html += '<div class="cx-chip-row" style="margin-bottom:var(--sp-16)">';
  var scopeLabel = canon.scope === 'global' ? 'Global' : (function() { var v = store.volumes.find(function(x) { return x.id === canon.scope; }); return v ? v.name : canon.scope; })();
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(scopeLabel) + '</span>';
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(canon.category) + '</span>';
  html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(canon.status) + '">' + escHtml(canon.status) + '</span>';
  if (canon.created) {
    html += '<span class="cx-chip cx-chip-sm">' + escHtml(formatAbsoluteDate(canon.created)) + '</span>';
  }
  html += '</div>';

  // Rationale (full)
  if (canon.rationale) {
    html += '<div class="cx-section-title">Rationale</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0;line-height:1.6">' + escHtml(canon.rationale) + '</div></div>';
  }

  // References
  if (canon.references && canon.references.length > 0) {
    html += '<div class="cx-section-title">References</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">' + escHtml(canon.references.join(', ')) + '</div></div>';
  }

  // Supersession Chain
  var chain = buildSupersessionChain(canon.id, store.canons);
  if (chain.length > 1) {
    html += '<div class="cx-section-title">Supersession Chain</div>';
    html += '<div class="cx-card">' + renderSupersessionChain(chain, canon.id) + '</div>';
  } else if (canon.superseded_by) {
    html += '<div class="cx-section-title">Superseded By</div>';
    html += '<div class="cx-card"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(canon.superseded_by) + '">' + escHtml(canon.superseded_by) + '</button></div>';
  }

  // Linked Schisms
  var linkedSchisms = filterActive(store.schisms).filter(function(r) { return r.canon_id === canon.id; });
  if (linkedSchisms.length > 0) {
    html += '<div class="cx-section-title">Linked Schisms (' + linkedSchisms.length + ')</div>';
    linkedSchisms.forEach(function(rej) { html += renderSchismCard(rej); });
  }

  // Action bar
  html += '<div class="cx-action-bar">';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="copyCanonId" data-id="' + escAttr(canon.id) + '">' + cx('link') + ' Copy ID</button>';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="copyCanonJson" data-id="' + escAttr(canon.id) + '">' + cx('download') + ' Copy JSON</button>';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="editCanon" data-id="' + escAttr(canon.id) + '">' + cx('quill') + ' Edit</button>';
  html += '<button class="cx-btn-danger cx-btn-sm" data-action="deleteCanon" data-id="' + escAttr(canon.id) + '">' + cx('trash') + ' Delete</button>';
  html += '</div>';

  vc.innerHTML = html;
}

function buildSupersessionChain(canonId, allCanons) {
  var active = filterActive(allCanons);
  var visited = {};

  // Walk backward for predecessors
  var predecessors = [];
  var currentId = canonId;
  var depth = 0;
  visited[canonId] = true;
  while (depth < 10) {
    var pred = active.find(function(c) { return c.superseded_by === currentId && !visited[c.id]; });
    if (!pred) break;
    visited[pred.id] = true;
    predecessors.unshift(pred.id);
    currentId = pred.id;
    depth++;
  }

  // Walk forward for successors
  var successors = [];
  var canon = active.find(function(c) { return c.id === canonId; });
  currentId = canon ? canon.superseded_by : null;
  depth = 0;
  while (currentId && depth < 10 && !visited[currentId]) {
    visited[currentId] = true;
    successors.push(currentId);
    var next = active.find(function(c) { return c.id === currentId; });
    currentId = next ? next.superseded_by : null;
    depth++;
  }

  // Full chain: predecessors → current → successors
  var chain = predecessors.concat([canonId]).concat(successors);
  return chain;
}

function renderSupersessionChain(chain, currentId) {
  var html = '<div class="cx-chain">';
  for (var i = 0; i < chain.length; i++) {
    var nodeId = chain[i];
    var canon = store.canons.find(function(c) { return c.id === nodeId; });
    var title = canon ? canon.title : nodeId;
    var isCurrent = nodeId === currentId;

    if (i > 0) html += '<div class="cx-chain-line"></div>';

    html += '<div class="cx-chain-node' + (isCurrent ? ' cx-chain-current' : ' cx-chain-link') + '"'
      + (isCurrent ? '' : ' data-action="goToCanon" data-id="' + escAttr(nodeId) + '"') + '>';
    html += '<span class="cx-chain-marker">' + (isCurrent ? '\u25C9' : '\u25CB') + '</span>';
    html += '<span class="cx-chain-id">' + escHtml(title) + '</span>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}


/* ============================================================
   PHASE 1 LORE — Top-level tab, detail view, card
   Spec: dissertation §3.4 — Narrative Wisdom
   ============================================================ */

function renderLore() {
  var vc = document.getElementById('viewContainer');
  var html = '';

  // Phase 1.5 B2: Health strip + B3: Export button
  var allLore = filterActive(store.lore);
  if (allLore.length > 0) {
    html += renderLoreHealthStrip(allLore);
  }

  // Category filter bar
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Category:</span>';
  html += '<button class="cx-chip cx-chip-sm' + (!_loreFilters.category ? ' cx-chip-active' : '') + '" data-action="toggleLoreFilter" data-key="category" data-value="">All</button>';
  LORE_CATEGORIES.forEach(function(c) {
    var active = _loreFilters.category === c ? ' cx-chip-active' : '';
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="toggleLoreFilter" data-key="category" data-value="' + escAttr(c) + '">' + escHtml(LORE_CATEGORY_LABELS[c]) + '</button>';
  });
  html += '</div>';

  // Domain filter bar (from volume ids present in lore)
  var domainSet = {};
  filterActive(store.lore).forEach(function(l) { (l.domain || []).forEach(function(d) { domainSet[d] = true; }); });
  var domainOpts = Object.keys(domainSet);
  if (domainOpts.length > 0) {
    html += '<div class="cx-filter-bar">';
    html += '<span class="cx-filter-label">Domain:</span>';
    html += '<button class="cx-chip cx-chip-sm' + (!_loreFilters.domain ? ' cx-chip-active' : '') + '" data-action="toggleLoreFilter" data-key="domain" data-value="">All</button>';
    domainOpts.forEach(function(d) {
      var active = _loreFilters.domain === d ? ' cx-chip-active' : '';
      var vol = store.volumes.find(function(v) { return v.id === d; });
      var label = vol ? vol.name : d;
      html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="toggleLoreFilter" data-key="domain" data-value="' + escAttr(d) + '">' + escHtml(label) + '</button>';
    });
    html += '</div>';
  }

  // Sort
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Sort:</span>';
  var sortOpts = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'title', label: 'Title' },
    { value: 'category', label: 'Category' }
  ];
  sortOpts.forEach(function(s) {
    var active = _loreSort === s.value ? ' cx-chip-active' : '';
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="setLoreSort" data-value="' + escAttr(s.value) + '">' + escHtml(s.label) + '</button>';
  });
  html += '</div>';

  // Apply filters
  var lore = filterActive(store.lore).filter(function(l) {
    if (_loreFilters.category && l.category !== _loreFilters.category) return false;
    if (_loreFilters.domain && (l.domain || []).indexOf(_loreFilters.domain) === -1) return false;
    return true;
  });

  if (lore.length === 0) {
    html += renderEmptyState('tome', 'No lore yet', 'Lore is backward-looking narrative wisdom \u2014 decrees, origins, cautionary tales, doctrines, and chronicles.', 'New Lore', 'openCreateLore');
    vc.innerHTML = html;
    return;
  }

  // Sort
  if (_loreSort === 'oldest') {
    lore.sort(function(a, b) { return (a.created || '').localeCompare(b.created || ''); });
  } else if (_loreSort === 'title') {
    lore.sort(function(a, b) { return (a.title || '').localeCompare(b.title || ''); });
  } else if (_loreSort === 'category') {
    var catOrder = {};
    LORE_CATEGORIES.forEach(function(c, i) { catOrder[c] = i; });
    lore.sort(function(a, b) {
      var ao = catOrder[a.category] != null ? catOrder[a.category] : 99;
      var bo = catOrder[b.category] != null ? catOrder[b.category] : 99;
      if (ao !== bo) return ao - bo;
      return (b.created || '').localeCompare(a.created || '');
    });
  } else {
    // newest
    lore.sort(function(a, b) { return (b.created || '').localeCompare(a.created || ''); });
  }

  html += '<div class="cx-card-meta" style="margin-bottom:var(--sp-8)">' + lore.length + ' lore entr' + (lore.length === 1 ? 'y' : 'ies') + '</div>';

  // If sorted by category, group with headers; else flat list
  if (_loreSort === 'category') {
    var grouped = {};
    LORE_CATEGORIES.forEach(function(c) { grouped[c] = []; });
    lore.forEach(function(l) { if (grouped[l.category]) grouped[l.category].push(l); });
    LORE_CATEGORIES.forEach(function(c) {
      if (grouped[c].length === 0) return;
      html += '<div class="cx-section-title">' + escHtml(LORE_CATEGORY_LABELS[c]) + ' (' + grouped[c].length + ')</div>';
      grouped[c].forEach(function(l) { html += renderLoreCard(l); });
    });
  } else {
    lore.forEach(function(l) { html += renderLoreCard(l); });
  }

  vc.innerHTML = html;
}

/* Lore tab health strip — total count, per-category distribution, orphan count.
   Also hosts the markdown export button. Phase 1.5 B2 + B3. */
function renderLoreHealthStrip(allLore) {
  var byCat = {};
  LORE_CATEGORIES.forEach(function(c) { byCat[c] = 0; });
  var orphans = 0;
  allLore.forEach(function(l) {
    if (byCat.hasOwnProperty(l.category)) byCat[l.category]++;
    if (!l.references || l.references.length === 0) orphans++;
  });

  var html = '<div class="cx-lore-health">';
  html += '<div class="cx-lore-health-row">';
  html += '<span class="cx-lore-health-total"><span class="cx-lore-health-num">' + allLore.length + '</span> lore</span>';
  html += '<div class="cx-lore-health-dots">';
  LORE_CATEGORIES.forEach(function(c) {
    var n = byCat[c];
    if (n === 0) return;
    html += '<span class="cx-lore-health-dot cx-lore-cat-' + escAttr(c) + '" title="' + escAttr(n + ' ' + LORE_CATEGORY_LABELS[c]) + '">'
      + '<span class="cx-lore-health-dot-mark"></span>'
      + '<span class="cx-lore-health-dot-label">' + n + ' ' + escHtml(LORE_CATEGORY_LABELS[c]) + '</span>'
      + '</span>';
  });
  html += '</div>';
  html += '<button class="cx-btn-icon cx-lore-export-btn" data-action="exportLoreMarkdown" title="Export Lore as markdown">' + cx('download') + '</button>';
  html += '</div>';
  if (orphans > 0) {
    html += '<div class="cx-lore-health-orphans">' + orphans + ' orphan' + (orphans !== 1 ? 's' : '') + ' \u00B7 lore without references</div>';
  }
  html += '</div>';
  return html;
}

function renderLoreCard(l) {
  var catClass = 'cx-lore-cat-' + escAttr(l.category);
  var html = '<div class="cx-card cx-card-clickable cx-lore-card ' + catClass + '" data-action="goToLore" data-id="' + escAttr(l.id) + '">';
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-title">' + cx('tome') + escHtml(l.title) + '</div>';
  html += '</div>';

  // Badges: category + domains
  html += '<div class="cx-chip-row">';
  html += '<span class="cx-chip cx-chip-sm cx-lore-cat-chip ' + catClass + '-chip">' + escHtml(LORE_CATEGORY_LABELS[l.category] || l.category) + '</span>';
  if (l.domain && l.domain.length > 0) {
    l.domain.forEach(function(d) {
      var vol = store.volumes.find(function(v) { return v.id === d; });
      html += '<span class="cx-chip cx-chip-sm">' + escHtml(vol ? vol.name : d) + '</span>';
    });
  }
  if (l.sourceType && l.sourceType !== 'manual') {
    html += '<span class="cx-chip cx-chip-sm cx-lore-source-chip">' + escHtml(l.sourceType.replace(/_/g, ' ')) + '</span>';
  }
  html += '</div>';

  // Body preview (italic, truncated)
  if (l.body) {
    html += '<div class="cx-lore-body">' + renderTruncated(l.body, 160, l.id, 'body') + '</div>';
  }

  // Meta: tags + date
  var meta = [];
  if (l.tags && l.tags.length > 0) meta.push('#' + l.tags.join(' #'));
  if (l.created) meta.push(formatAbsoluteDate(l.created));
  if (meta.length > 0) html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">' + escHtml(meta.join(' \u00B7 ')) + '</div>';

  html += '</div>';
  return html;
}

function renderLoreDetail(route) {
  var vc = document.getElementById('viewContainer');
  var l = store.lore.find(function(x) { return x.id === route.id; });
  if (!l) {
    vc.innerHTML = renderEmptyState('alert', 'Lore not found', 'This lore entry may have been deleted');
    return;
  }

  var catClass = 'cx-lore-cat-' + escAttr(l.category);
  var html = '';

  // Title
  html += '<h1 class="cx-page-title">' + cx('tome') + ' ' + escHtml(l.title) + '</h1>';

  // Voice subtitle (from dissertation table)
  var voice = LORE_CATEGORY_VOICES[l.category];
  if (voice) {
    html += '<div class="cx-lore-voice">\u201C' + escHtml(voice) + '\u201D</div>';
  }

  // Badges row
  html += '<div class="cx-chip-row" style="margin-bottom:var(--sp-16)">';
  html += '<span class="cx-chip cx-chip-sm cx-lore-cat-chip ' + catClass + '-chip">' + escHtml(LORE_CATEGORY_LABELS[l.category] || l.category) + '</span>';
  if (l.domain && l.domain.length > 0) {
    l.domain.forEach(function(d) {
      var vol = store.volumes.find(function(v) { return v.id === d; });
      html += '<span class="cx-chip cx-chip-sm">' + escHtml(vol ? vol.name : d) + '</span>';
    });
  }
  if (l.sourceType && l.sourceType !== 'manual') {
    html += '<span class="cx-chip cx-chip-sm cx-lore-source-chip">' + escHtml(l.sourceType.replace(/_/g, ' ')) + '</span>';
  }
  if (l.created) {
    html += '<span class="cx-chip cx-chip-sm">' + escHtml(formatAbsoluteDate(l.created)) + '</span>';
  }
  html += '</div>';

  // Body (full narrative)
  if (l.body) {
    html += '<div class="cx-section-title">Narrative</div>';
    html += '<div class="cx-card cx-lore-body-full">' + escHtml(l.body).replace(/\n/g, '<br>') + '</div>';
  }

  // Tags
  if (l.tags && l.tags.length > 0) {
    html += '<div class="cx-section-title">Tags</div>';
    html += '<div class="cx-chip-row">';
    l.tags.forEach(function(t) { html += '<span class="cx-chip cx-chip-sm">#' + escHtml(t) + '</span>'; });
    html += '</div>';
  }

  // References — resolve against all known entity types (Phase 1.5 B1)
  if (l.references && l.references.length > 0) {
    html += '<div class="cx-section-title">References</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">';
    l.references.forEach(function(refId, idx) {
      if (idx > 0) html += ', ';
      html += renderReferenceLink(refId);
    });
    html += '</div></div>';
  }

  // Source (if auto-generated)
  if (l.sourceType && l.sourceType !== 'manual' && l.sourceId) {
    html += '<div class="cx-section-title">Auto-Generated From</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">';
    html += '<span class="cx-card-meta">' + escHtml(l.sourceType.replace(/_/g, ' ')) + ':</span> ';
    html += '<span>' + escHtml(l.sourceId) + '</span>';
    html += '</div></div>';
  }

  // Action bar
  html += '<div class="cx-action-bar">';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="copyLoreJson" data-id="' + escAttr(l.id) + '">' + cx('download') + ' Copy JSON</button>';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="editLore" data-id="' + escAttr(l.id) + '">' + cx('quill') + ' Edit</button>';
  html += '<button class="cx-btn-danger cx-btn-sm" data-action="deleteLoreAction" data-id="' + escAttr(l.id) + '">' + cx('trash') + ' Delete</button>';
  html += '</div>';

  vc.innerHTML = html;
}


/* ============================================================
   PHASE 4: Search Results
   ============================================================ */

function renderSearchResults(results, query) {
  var container = document.querySelector('.cx-search-results');
  if (!container) return;
  if (!results || results.length === 0) {
    container.innerHTML = '<div class="cx-search-empty">No results for \u201C' + escHtml(query) + '\u201D</div>';
    return;
  }

  var groups = { canon: [], lore: [], schism: [], apocryphon: [], session: [], volume: [] };
  var labels = { canon: 'Canons', lore: 'Lore', schism: 'Schisms', apocryphon: 'Apocrypha', session: 'Sessions', volume: 'Volumes' };
  var icons = { canon: 'bookmark', lore: 'tome', schism: 'alert', apocryphon: 'scroll', session: 'scroll', volume: 'book' };
  results.forEach(function(r) { if (groups[r.type]) groups[r.type].push(r); });

  var html = '';
  ['canon', 'lore', 'session', 'schism', 'apocryphon', 'volume'].forEach(function(type) {
    var items = groups[type];
    if (items.length === 0) return;
    html += '<div class="cx-search-group-header">' + cx(icons[type]) + ' ' + escHtml(labels[type]) + ' (' + items.length + ')</div>';
    items.forEach(function(item) {
      var e = item.entity;
      var title = '', snippet = '', route = '';
      switch (type) {
        case 'canon':
          title = e.title || e.id;
          snippet = buildSnippet(e.rationale || '', query);
          route = '#/canon/' + encodeURIComponent(e.id);
          break;
        case 'schism':
          title = 'Rejected: ' + (e.rejected || e.id);
          snippet = buildSnippet(e.reason || e.chosen || '', query);
          route = '#/canons';
          break;
        case 'apocryphon':
          title = e.title || e.id;
          snippet = buildSnippet(e.narrative || '', query);
          route = '#/canons';
          break;
        case 'lore':
          title = e.title || e.id;
          snippet = buildSnippet(e.body || '', query);
          route = '#/lore/' + encodeURIComponent(e.id);
          break;
        case 'session':
          title = e.id + (e.date ? ' \u00B7 ' + formatAbsoluteDate(e.date) : '');
          snippet = buildSnippet(e.summary || '', query);
          route = '#/journal';
          break;
        case 'volume':
          title = e.name || e.id;
          snippet = buildSnippet(e.description || e.current_phase || '', query);
          route = '#/volume/' + encodeURIComponent(e.id);
          break;
      }
      html += '<div class="cx-search-result" data-action="searchNavigate" data-route="' + escAttr(route) + '">';
      html += '<div class="cx-search-result-title">' + highlightMatch(title, query) + '</div>';
      if (snippet) html += '<div class="cx-search-result-snippet">' + snippet + '</div>';
      html += '</div>';
    });
  });

  container.innerHTML = html;
}

/* ============================================================
   PHASE 4: Stats Bar
   ============================================================ */

/* Specs Rostra signals (canon-0052 §Specs). Total + status dots +
   category dots + per-volume dots + coverage-gap signal ("N in-progress
   chapters lack specs"). Coverage-gap is the novel Rostra signal the
   Specs tab introduces — surfaces what's owed by the Chapters layer. */
function computeSpecsStats() {
  var specs = filterActive(store.specs || []);
  var byStatus = tallyBy(specs, function(s) { return s.status; });
  var byCategory = tallyBy(specs, function(s) { return s.category; });
  var byVolume = tallyBy(specs, function(s) { return s.volumes || []; });

  // Coverage gap: chapters with active-work status (canon-0052 enum) that
  // carry no spec_id back-pointer. The Chapter Status Enum designates spec-
  // drafting and spec-complete as explicit spec-phase states; any chapter
  // in those states without a spec is a gap. Broaden the lens to include
  // in-progress + review too (active work that should have had a spec).
  var gap = [];
  (store.volumes || []).forEach(function(v) {
    if (v._deleted) return;
    (v.chapters || []).forEach(function(ch) {
      if (ch._deleted) return;
      if (['spec-drafting', 'spec-complete', 'in-progress', 'review'].indexOf(ch.status) === -1) return;
      if (ch.spec_id) return;
      gap.push({ volumeId: v.id, volumeName: v.name, chapterId: ch.id, chapterName: ch.name, status: ch.status });
    });
  });

  return {
    total: specs.length,
    byStatus: byStatus,
    byCategory: byCategory,
    byVolume: byVolume,
    coverageGap: gap
  };
}

function renderSpecs() {
  var vc = document.getElementById('viewContainer');
  var stats = computeSpecsStats();

  // ROSTRA
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.total + ' <span class="cx-rostra-headline-label">specs</span></div>';
  if (stats.byCategory.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.byCategory.forEach(function(c) {
      html += '<span class="cx-rostra-dot cx-spec-cat-dot cx-spec-cat-' + escAttr(c.key) + '" title="' + escAttr(c.key + ' \u2014 ' + c.count) + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(c.key) + ' ' + c.count + '</span>';
    });
    html += '</div>';
  }
  if (stats.byStatus.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Status:</span> ';
    html += stats.byStatus.map(function(s) { return escHtml(s.key + ' ' + s.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  if (stats.byVolume.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Volumes:</span> ';
    html += stats.byVolume.map(function(v) { return escHtml(lookupVolumeName(v.key) + ' ' + v.count); }).join(' \u00B7 ');
    html += '</div>';
  }
  if (stats.coverageGap.length > 0) {
    html += '<div class="cx-rostra-stats" style="color:var(--warning)"><span class="cx-rostra-stat-label">Coverage gap:</span> ' + stats.coverageGap.length + ' active chapter' + (stats.coverageGap.length === 1 ? '' : 's') + ' without spec</div>';
  }
  html += '</div>';

  // NOTICE BOARDS — Status / Category / Volume / Sort, all derived from
  // data. Category filter doubles as the sub-tab axis per canon-0052
  // §Specs "Sub-tabs: none — the Category filter covers the dimensions".
  html += renderDerivedFilterRow('specStatus', _specFilters.status, stats.byStatus.map(function(s) { return { key: s.key, label: s.key }; }), 'All', 'Status:');
  html += renderDerivedFilterRow('specCategory', _specFilters.category, stats.byCategory.map(function(c) { return { key: c.key, label: c.key }; }), 'All', 'Category:');
  html += renderDerivedFilterRow('specVolume', _specFilters.volume, stats.byVolume.map(function(v) { return { key: v.key, label: lookupVolumeName(v.key) }; }), 'All', 'Volume:');
  html += renderSortRow('specSort', _specSort, [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' },
    { key: 'status', label: 'Status' },
    { key: 'title', label: 'Title' }
  ], 'Sort:');

  // Apply filters + sort.
  var specs = filterActive(store.specs || []).filter(function(s) {
    if (_specFilters.status && s.status !== _specFilters.status) return false;
    if (_specFilters.category && s.category !== _specFilters.category) return false;
    if (_specFilters.volume && (s.volumes || []).indexOf(_specFilters.volume) === -1) return false;
    return true;
  });
  if (_specSort === 'oldest') specs.sort(function(a, b) { return (a.created || '').localeCompare(b.created || ''); });
  else if (_specSort === 'status') specs.sort(function(a, b) {
    var ai = SPEC_STATUSES.indexOf(a.status), bi = SPEC_STATUSES.indexOf(b.status);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  else if (_specSort === 'title') specs.sort(function(a, b) { return (a.title || '').localeCompare(b.title || ''); });
  else specs.sort(function(a, b) { return (b.created || '').localeCompare(a.created || ''); });

  var filtersActive = _specFilters.status || _specFilters.category || _specFilters.volume;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + specs.length + ' of ' + stats.total
    : specs.length + ' spec' + (specs.length === 1 ? '' : 's')) + '</div>';

  if (specs.length === 0) {
    html += renderEmptyState('quill', 'No specs match', filtersActive ? 'Try adjusting filters' : 'Specs land in data/specs.json — see canon-0052 §Specs');
    vc.innerHTML = html;
    return;
  }

  specs.forEach(function(s) { html += renderSpecCard(s); });
  vc.innerHTML = html;
}

function renderSpecCard(spec) {
  var catClass = 'cx-spec-cat-' + escAttr(spec.category || 'unknown');
  var html = '<div class="cx-card cx-card-clickable cx-spec-card ' + catClass + '" data-action="navigate" data-route="#/spec/' + escAttr(spec.id) + '">';
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-title">' + cx('quill') + ' ' + escHtml(spec.title || spec.id) + '</div>';
  html += '</div>';
  html += '<div class="cx-chip-row">';
  html += '<span class="cx-chip cx-chip-sm cx-spec-cat-chip ' + catClass + '-chip">' + escHtml(spec.category || '') + '</span>';
  if (spec.status) html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(spec.status) + '">' + escHtml(spec.status) + '</span>';
  (spec.volumes || []).forEach(function(v) {
    html += '<span class="cx-chip cx-chip-sm">' + escHtml(lookupVolumeName(v)) + '</span>';
  });
  html += '</div>';
  if (spec.summary) {
    html += '<div class="cx-card-body">' + renderTruncated(spec.summary, 160, spec.id, 'summary') + '</div>';
  }
  if (spec.references && spec.references.length > 0) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">Refs: ';
    spec.references.forEach(function(refId, idx) {
      if (idx > 0) html += ', ';
      html += renderReferenceLink(refId);
    });
    html += '</div>';
  }
  var metaBits = [];
  if (spec.authored_by) metaBits.push(spec.authored_by);
  if (spec.created) metaBits.push(formatAbsoluteDate(spec.created));
  if (metaBits.length > 0) html += '<div class="cx-card-meta">' + escHtml(metaBits.join(' \u00B7 ')) + '</div>';
  html += '</div>';
  return html;
}

function renderSpecDetail(route) {
  var vc = document.getElementById('viewContainer');
  var spec = (store.specs || []).find(function(s) { return s.id === route.id; });
  if (!spec) {
    vc.innerHTML = renderEmptyState('alert', 'Spec not found', 'This spec may have been deleted');
    return;
  }
  var catClass = 'cx-spec-cat-' + escAttr(spec.category || 'unknown');
  var html = '<h1 class="cx-page-title">' + cx('quill') + ' ' + escHtml(spec.title || spec.id) + '</h1>';
  html += '<div class="cx-chip-row" style="margin-bottom:var(--sp-16)">';
  html += '<span class="cx-chip cx-chip-sm cx-spec-cat-chip ' + catClass + '-chip">' + escHtml(spec.category || '') + '</span>';
  if (spec.status) html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(spec.status) + '">' + escHtml(spec.status) + '</span>';
  (spec.volumes || []).forEach(function(v) {
    html += '<span class="cx-chip cx-chip-sm">' + escHtml(lookupVolumeName(v)) + '</span>';
  });
  html += '</div>';

  if (spec.summary) {
    html += '<div class="cx-section-title">Summary</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">' + escHtml(spec.summary).replace(/\n/g, '<br>') + '</div></div>';
  }
  if (spec.references && spec.references.length > 0) {
    html += '<div class="cx-section-title">References</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">';
    spec.references.forEach(function(refId, idx) {
      if (idx > 0) html += ', ';
      html += renderReferenceLink(refId);
    });
    html += '</div></div>';
  }
  if (spec.path) {
    var url = 'https://github.com/Rishabh1804/Codex/blob/main/' + escAttr(spec.path);
    html += '<div class="cx-section-title">Document</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0"><a href="' + url + '" target="_blank" rel="noopener" class="cx-link-btn">' + escHtml(spec.path) + ' \u2192</a></div></div>';
  }
  var metaBits = [];
  if (spec.authored_by) metaBits.push('Authored by ' + spec.authored_by);
  if (spec.created) metaBits.push('Created ' + formatAbsoluteDate(spec.created));
  if (metaBits.length > 0) html += '<div class="cx-card-meta" style="margin-top:var(--sp-16)">' + escHtml(metaBits.join(' \u00B7 ')) + '</div>';

  vc.innerHTML = html;
}

/* Library Rostra + stats (canon-0052 §Library). Headline volume count,
   per-shelf dots, per-cluster dots, and aggregate signal counts (active
   chapters, open TODOs, sessions this month, canons, lore). Shelf dots
   use the shelf color semantic (cx-shelf-<shelf>); cluster dots use
   accent for Monument and accent-light for Cluster A/B. */
function computeLibraryStats() {
  var vols = filterActive(store.volumes);
  var byShelf = {};
  var byCluster = {};
  vols.forEach(function(v) {
    byShelf[v.shelf] = (byShelf[v.shelf] || 0) + 1;
    var c = getVolumeCluster(v.id);
    if (c) byCluster[c] = (byCluster[c] || 0) + 1;
    else byCluster['Unaligned'] = (byCluster['Unaligned'] || 0) + 1;
  });
  var activeChapters = 0;
  vols.forEach(function(v) {
    filterActive(v.chapters || []).forEach(function(ch) {
      if (isActiveChapterStatus(ch.status)) activeChapters++;
    });
  });
  var openTodos = 0;
  vols.forEach(function(v) {
    (v.todos || []).forEach(function(t) { if (t.status === 'open' && !t._deleted) openTodos++; });
  });
  var now = new Date();
  var monthStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  var sessionsThisMonth = 0;
  (store.journal || []).forEach(function(day) {
    if ((day.date || '').substring(0, 7) === monthStr) sessionsThisMonth += (day.sessions || []).length;
  });
  return {
    totalVolumes: vols.length,
    byShelf: SHELF_ORDER.filter(function(s) { return byShelf[s]; }).map(function(s) { return { key: s, count: byShelf[s] }; }),
    byCluster: ['A','B','Monument','Unaligned'].filter(function(c) { return byCluster[c]; }).map(function(c) { return { key: c, count: byCluster[c] }; }),
    activeChapters: activeChapters,
    openTodos: openTodos,
    sessionsThisMonth: sessionsThisMonth,
    canonCount: filterActive(store.canons).length,
    loreCount: filterActive(store.lore).length
  };
}

function renderLibraryRostra() {
  var stats = computeLibraryStats();
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.totalVolumes + ' <span class="cx-rostra-headline-label">volumes</span></div>';

  if (stats.byShelf.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.byShelf.forEach(function(s) {
      html += '<span class="cx-rostra-dot cx-shelf-' + escAttr(s.key) + '" title="' + escAttr(SHELF_LABELS[s.key] + ' \u2014 ' + s.count) + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(SHELF_LABELS[s.key]) + ' ' + s.count + '</span>';
    });
    html += '</div>';
  }

  if (stats.byCluster.length > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Cluster:</span> ';
    html += stats.byCluster.map(function(c) { return escHtml(getClusterLabel(c.key) + ' ' + c.count); }).join(' \u00B7 ');
    html += '</div>';
  }

  var signalLine = stats.activeChapters + ' active ch \u00B7 '
    + stats.openTodos + ' open TODO' + (stats.openTodos === 1 ? '' : 's') + ' \u00B7 '
    + stats.sessionsThisMonth + ' sessions/mo \u00B7 '
    + stats.canonCount + ' canon' + (stats.canonCount === 1 ? '' : 's');
  html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Signals:</span> ' + escHtml(signalLine) + '</div>';
  if (stats.loreCount > 0) {
    html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Lore:</span> ' + stats.loreCount + ' entr' + (stats.loreCount === 1 ? 'y' : 'ies') + '</div>';
  }
  html += '</div>';
  return html;
}

/* ============================================================
   PHASE 4: Heatmap (90-day GitHub-style activity grid)
   ============================================================ */

function renderHeatmap() {
  var sessionCounts = {};
  store.journal.forEach(function(day) {
    sessionCounts[day.date] = (day.sessions || []).length;
  });

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start 89 days ago, walk back to nearest Sunday
  var start = new Date(today);
  start.setDate(start.getDate() - 89);
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  var html = '<div class="cx-heatmap-wrap">';
  html += '<div class="cx-heatmap-label">Activity</div>';
  html += '<div class="cx-heatmap-scroll"><div class="cx-heatmap">';

  var cursor = new Date(start);
  while (cursor <= today) {
    var dateStr = localDateStr(cursor);
    var count = sessionCounts[dateStr] || 0;
    var level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : 3;
    html += '<div class="cx-heatmap-cell" data-level="' + level + '" data-action="heatmapTap" data-date="' + escAttr(dateStr) + '" title="' + escAttr(dateStr + ': ' + count + ' session' + (count !== 1 ? 's' : '')) + '"></div>';
    cursor.setDate(cursor.getDate() + 1);
  }

  // Fill remaining cells to complete the last column (reach Saturday)
  while (cursor.getDay() !== 0) {
    html += '<div class="cx-heatmap-cell" style="visibility:hidden"></div>';
    cursor.setDate(cursor.getDate() + 1);
  }

  html += '</div></div></div>';
  return html;
}

/* ============================================================
   PHASE 4: Sync Detail Panel
   ============================================================ */

function toggleSyncDetailPanel() {
  var existing = document.getElementById('syncDetailPanel');
  if (existing) { existing.remove(); return; }

  var pending = store._wal.filter(function(e) { return e.status === 'pending'; }).length;
  var syncing = store._wal.filter(function(e) { return e.status === 'syncing'; }).length;
  var synced = store._wal.filter(function(e) { return e.status === 'synced'; }).length;
  var failed = store._wal.filter(function(e) { return e.status === 'failed'; }).length;

  var hasRepo = !!localStorage.getItem(KEYS.REPO_URL);
  var statusLabel, statusColor;
  if (!hasRepo) { statusLabel = 'Local only'; statusColor = 'var(--text-tertiary)'; }
  else if (_isOffline) { statusLabel = 'Offline'; statusColor = 'var(--warning)'; }
  else if (failed > 0) { statusLabel = 'Sync failed'; statusColor = 'var(--error)'; }
  else if (pending > 0 || syncing > 0) { statusLabel = 'Syncing'; statusColor = 'var(--warning)'; }
  else { statusLabel = 'Connected'; statusColor = 'var(--success)'; }

  var lastFetch = store._meta.lastFetch;
  var lastFetchLabel = lastFetch ? formatRelativeTime(lastFetch.substring(0, 10)) : 'Never';

  var html = '<div id="syncDetailPanel" class="cx-sync-panel">';
  html += '<div class="cx-sync-panel-header"><span class="cx-sync-panel-title">Sync</span>';
  html += '<button class="cx-btn-icon" data-action="closeSyncPanel" style="min-width:28px;min-height:28px;padding:var(--sp-4)">' + cx('close') + '</button></div>';
  html += '<div class="cx-sync-panel-status"><div class="cx-sync-panel-dot" style="background:' + statusColor + '"></div>' + escHtml(statusLabel) + '</div>';
  html += '<div class="cx-sync-panel-row"><span>Pending</span><span class="cx-sync-panel-val">' + pending + '</span></div>';
  html += '<div class="cx-sync-panel-row"><span>Syncing</span><span class="cx-sync-panel-val">' + syncing + '</span></div>';
  html += '<div class="cx-sync-panel-row"><span>Synced</span><span class="cx-sync-panel-val">' + synced + '</span></div>';
  html += '<div class="cx-sync-panel-row"><span>Failed</span><span class="cx-sync-panel-val">' + failed + '</span></div>';
  html += '<div class="cx-sync-panel-meta">Last fetch: ' + escHtml(lastFetchLabel) + '</div>';
  if (hasRepo) {
    html += '<button class="cx-btn-primary cx-btn-sm cx-full-width" data-action="forceSyncFromPanel" style="margin-top:var(--sp-8)">' + cx('refresh') + ' Force Sync</button>';
  }
  html += '</div>';

  document.body.insertAdjacentHTML('beforeend', html);
}

/* ============================================================
   PHASE 4: Trash View (sub-settings, no hash route)
   ============================================================ */

function renderTrashView() {
  var vc = document.getElementById('viewContainer');
  var deletedCanons = store.canons.filter(function(c) { return c._deleted; });
  var deletedChapters = [];
  store.volumes.forEach(function(v) {
    (v.chapters || []).forEach(function(ch) {
      if (ch._deleted) deletedChapters.push({ volume: v, chapter: ch });
    });
  });
  var deletedApocrypha = store.apocrypha.filter(function(a) { return a._deleted; });
  var deletedLore = store.lore.filter(function(l) { return l._deleted; });

  var html = '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-16)">';
  html += '<button class="cx-btn-icon" data-action="openSettings">' + cx('arrow-left') + '</button>';
  html += '<h2 class="cx-page-title" style="margin:0">Trash</h2></div>';

  if (deletedCanons.length === 0 && deletedChapters.length === 0 && deletedApocrypha.length === 0 && deletedLore.length === 0) {
    html += renderEmptyState('trash', 'Trash is empty', 'Deleted canons, chapters, apocrypha, and lore appear here');
    vc.innerHTML = html;
    return;
  }

  if (deletedCanons.length > 0) {
    html += '<div class="cx-section-title">' + cx('bookmark') + ' Canons (' + deletedCanons.length + ')</div>';
    html += '<div class="cx-card">';
    deletedCanons.forEach(function(c) {
      html += '<div class="cx-trash-item">';
      html += '<div class="cx-trash-info"><div class="cx-trash-name">' + escHtml(c.title || c.id) + '</div>';
      html += '<div class="cx-trash-meta">Deleted ' + escHtml(formatRelativeTime(c._deleted_date)) + '</div></div>';
      html += '<div class="cx-trash-actions">';
      html += '<button class="cx-btn-secondary cx-btn-sm" data-action="restoreCanon" data-id="' + escAttr(c.id) + '">Restore</button>';
      html += '<button class="cx-btn-danger cx-btn-sm" data-action="permanentDeleteCanon" data-id="' + escAttr(c.id) + '">' + cx('trash') + '</button>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  if (deletedApocrypha.length > 0) {
    html += '<div class="cx-section-title">' + cx('scroll') + ' Apocrypha (' + deletedApocrypha.length + ')</div>';
    html += '<div class="cx-card">';
    deletedApocrypha.forEach(function(a) {
      html += '<div class="cx-trash-item">';
      html += '<div class="cx-trash-info"><div class="cx-trash-name">' + escHtml(a.title || a.id) + '</div>';
      html += '<div class="cx-trash-meta">Deleted ' + escHtml(formatRelativeTime(a._deleted_date)) + '</div></div>';
      html += '<div class="cx-trash-actions">';
      html += '<button class="cx-btn-secondary cx-btn-sm" data-action="restoreApocryphon" data-id="' + escAttr(a.id) + '">Restore</button>';
      html += '<button class="cx-btn-danger cx-btn-sm" data-action="permanentDeleteApocryphon" data-id="' + escAttr(a.id) + '">' + cx('trash') + '</button>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  if (deletedChapters.length > 0) {
    html += '<div class="cx-section-title">' + cx('bookmark') + ' Chapters (' + deletedChapters.length + ')</div>';
    html += '<div class="cx-card">';
    deletedChapters.forEach(function(item) {
      html += '<div class="cx-trash-item">';
      html += '<div class="cx-trash-info"><div class="cx-trash-name">' + escHtml(item.chapter.name || item.chapter.id) + '</div>';
      html += '<div class="cx-trash-meta">' + escHtml(item.volume.name) + ' \u00B7 Deleted ' + escHtml(formatRelativeTime(item.chapter._deleted_date)) + '</div></div>';
      html += '<div class="cx-trash-actions">';
      html += '<button class="cx-btn-secondary cx-btn-sm" data-action="restoreChapter" data-id="' + escAttr(item.chapter.id) + '" data-vol="' + escAttr(item.volume.id) + '">Restore</button>';
      html += '<button class="cx-btn-danger cx-btn-sm" data-action="permanentDeleteChapter" data-id="' + escAttr(item.chapter.id) + '" data-vol="' + escAttr(item.volume.id) + '">' + cx('trash') + '</button>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  if (deletedLore.length > 0) {
    html += '<div class="cx-section-title">' + cx('tome') + ' Lore (' + deletedLore.length + ')</div>';
    html += '<div class="cx-card">';
    deletedLore.forEach(function(l) {
      html += '<div class="cx-trash-item">';
      html += '<div class="cx-trash-info"><div class="cx-trash-name">' + escHtml(l.title || l.id) + '</div>';
      html += '<div class="cx-trash-meta">' + escHtml(LORE_CATEGORY_LABELS[l.category] || l.category) + ' \u00B7 Deleted ' + escHtml(formatRelativeTime(l._deleted_date)) + '</div></div>';
      html += '<div class="cx-trash-actions">';
      html += '<button class="cx-btn-secondary cx-btn-sm" data-action="restoreLore" data-id="' + escAttr(l.id) + '">Restore</button>';
      html += '<button class="cx-btn-danger cx-btn-sm" data-action="permanentDeleteLore" data-id="' + escAttr(l.id) + '">' + cx('trash') + '</button>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  vc.innerHTML = html;
}

/* ============================================================
   PHASE 4: Error Log View (sub-settings, no hash route)
   ============================================================ */

function renderErrorLogView() {
  var vc = document.getElementById('viewContainer');
  var log = [];
  try { log = JSON.parse(localStorage.getItem(KEYS.ERROR_LOG) || '[]'); } catch(e) {}

  var html = '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-16)">';
  html += '<button class="cx-btn-icon" data-action="openSettings">' + cx('arrow-left') + '</button>';
  html += '<h2 class="cx-page-title" style="margin:0">Error Log</h2></div>';

  if (log.length === 0) {
    html += renderEmptyState('check', 'No errors', 'Error log is clean');
    vc.innerHTML = html;
    return;
  }

  html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-12)">';
  html += '<span class="cx-card-meta">' + log.length + ' entries</span>';
  html += '<button class="cx-btn-danger cx-btn-sm" data-action="clearErrorLog">' + cx('trash') + ' Clear All</button>';
  html += '</div>';

  html += '<div class="cx-card">';
  log.forEach(function(entry) {
    html += '<div class="cx-error-entry">';
    html += '<div><span class="cx-error-ts">' + escHtml(entry.ts ? entry.ts.substring(0, 19).replace('T', ' ') : '?') + '</span>';
    html += '<span class="cx-error-cat">' + escHtml(entry.cat || '?') + '</span></div>';
    html += '<div class="cx-error-msg">' + escHtml(entry.msg || '') + '</div>';
    if (entry.detail) html += '<div class="cx-error-detail">' + escHtml(entry.detail) + '</div>';
    html += '</div>';
  });
  html += '</div>';

  vc.innerHTML = html;
}

/* ============================================================
   PHASE 4: Storage Usage View (sub-settings)
   ============================================================ */

function renderStorageUsage() {
  var vc = document.getElementById('viewContainer');
  var rows = [];
  var total = 0;

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.indexOf('codex-') === 0) {
      var val = localStorage.getItem(key);
      if (val !== null) {
        var size = val.length * 2; // rough byte estimate (UTF-16)
        rows.push({ key: key, size: size });
        total += size;
      }
    }
  }
  rows.sort(function(a, b) { return b.size - a.size; });

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

  var html = '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-16)">';
  html += '<button class="cx-btn-icon" data-action="openSettings">' + cx('arrow-left') + '</button>';
  html += '<h2 class="cx-page-title" style="margin:0">Storage Usage</h2></div>';

  html += '<div class="cx-card">';
  rows.forEach(function(r) {
    html += '<div class="cx-storage-row"><span>' + escHtml(r.key.replace('codex-', '')) + '</span><span>' + formatBytes(r.size) + '</span></div>';
  });
  html += '<div class="cx-storage-row cx-storage-total"><span>Total</span><span>' + formatBytes(total) + '</span></div>';
  html += '</div>';

  vc.innerHTML = html;
}

/* ============================================================
   DASHBOARD (from Phase 1, Phase 4: stats bar + heatmap)
   ============================================================ */

/* Library (Dashboard) overhaul — Forum Pattern (canon-0052 §Library).
   Rostra → Notice Boards (Shelf / Cluster / Sort) → Heatmap → Stalls.
   Heatmap position is provisional — canon-0052 §Open Questions #2 names
   "cut or shrink" as an open decision; keeping it here until the test
   concludes. Cards keep their existing structure (canon-0052 notes they
   already pattern-align); only the grouping around them changes. */
function renderDashboard() {
  var vc = document.getElementById('viewContainer');
  var snap = store.getSnapshot();
  var hasVolumes = snap.volumes.length > 0;
  var html = renderConnectGitHubCta();
  if (!hasVolumes) {
    html += renderEmptyState('book', 'The library is empty', 'Tap + to add your first volume', 'New Volume', 'fabAction');
    vc.innerHTML = html;
    return;
  }

  // ROSTRA
  html += renderLibraryRostra();

  // NOTICE BOARDS — Shelf / Cluster / Sort. Shelf + Cluster pills derived
  // from data; Sort is fixed (recent / name / activity).
  var stats = computeLibraryStats();
  html += renderDerivedFilterRow('libraryShelf', _libraryFilters.shelf, stats.byShelf.map(function(s) { return { key: s.key, label: SHELF_LABELS[s.key] || s.key }; }), 'All', 'Shelf:');
  html += renderDerivedFilterRow('libraryCluster', _libraryFilters.cluster, stats.byCluster.map(function(c) { return { key: c.key, label: getClusterLabel(c.key) }; }), 'All', 'Cluster:');
  html += renderSortRow('librarySort', _librarySort, [
    { key: 'recent', label: 'Recent' },
    { key: 'name', label: 'Name' },
    { key: 'chapters', label: 'Chapters' }
  ], 'Sort:');

  // Apply filters + compute visible set.
  var vols = filterActive(snap.volumes).filter(function(v) {
    if (_libraryFilters.shelf && v.shelf !== _libraryFilters.shelf) return false;
    if (_libraryFilters.cluster) {
      var c = getVolumeCluster(v.id) || 'Unaligned';
      if (c !== _libraryFilters.cluster) return false;
    }
    return true;
  });
  var filtersActive = _libraryFilters.shelf || _libraryFilters.cluster;
  var total = filterActive(snap.volumes).length;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + vols.length + ' of ' + total
    : vols.length + ' volume' + (vols.length === 1 ? '' : 's')) + '</div>';

  // HEATMAP — kept below filters; decision on trim/remove deferred per
  // canon-0052 §Open Questions #2.
  html += renderHeatmap();

  if (vols.length === 0) {
    html += renderEmptyState('book', 'No volumes match', 'Try adjusting filters');
    vc.innerHTML = html;
    return;
  }

  // STALLS — group by shelf when no shelf filter is active (mirrors prior
  // behavior); flat ordered list when a shelf or cluster filter narrows
  // the view, or when sort is not 'recent'.
  function sortVolumes(arr) {
    arr.sort(function(a, b) {
      if (_librarySort === 'name') return (a.name || '').localeCompare(b.name || '');
      if (_librarySort === 'chapters') {
        return filterActive(b.chapters || []).length - filterActive(a.chapters || []).length;
      }
      // recent
      var da = getLastActiveDate(a.id) || '0000-00-00';
      var db = getLastActiveDate(b.id) || '0000-00-00';
      return db.localeCompare(da);
    });
  }

  if (!_libraryFilters.shelf && _librarySort === 'recent') {
    // Shelf-grouped rendering (prior behavior).
    SHELF_ORDER.forEach(function(shelf) {
      var shelfVols = vols.filter(function(v) { return v.shelf === shelf; });
      if (shelfVols.length === 0) return;
      sortVolumes(shelfVols);
      html += '<div class="cx-shelf-group"><div class="cx-shelf-group-label">' + escHtml(SHELF_LABELS[shelf]) + ' (' + shelfVols.length + ')</div>';
      shelfVols.forEach(function(vol) { html += renderVolumeCard(vol); });
      html += '</div>';
    });
  } else {
    // Flat sorted list.
    sortVolumes(vols);
    vols.forEach(function(vol) { html += renderVolumeCard(vol); });
  }

  vc.innerHTML = html;

  // Phase 4: Auto-scroll heatmap to show most recent dates
  var heatScroll = vc.querySelector('.cx-heatmap-scroll');
  if (heatScroll) heatScroll.scrollLeft = heatScroll.scrollWidth;
}

/* Volume card — extracted from inline renderDashboard body. Keeps current
   visual (accent stripe, shelf badge, tags, meta line) while surfacing
   the cluster chip (new) and a tighter meta row. */
function renderVolumeCard(vol) {
  var chapters = filterActive(vol.chapters || []);
  var openTodos = (vol.todos || []).filter(function(t) { return t.status === 'open' && !t._deleted; });
  var meta = [];
  if (chapters.length > 0) meta.push(chapters.length + ' ch');
  if (openTodos.length > 0) meta.push(openTodos.length + ' TODO' + (openTodos.length === 1 ? '' : 's'));

  var cluster = getVolumeCluster(vol.id);
  var html = '<div class="cx-card cx-card-clickable cx-vol-card" data-action="goToVolume" data-id="' + escAttr(vol.id) + '">';
  html += '<div class="cx-vol-accent" style="background:' + escAttr(vol.domain_color || '#8B7355') + '"></div>';
  html += '<div class="cx-vol-card-content">';
  html += '<div class="cx-card-header"><div class="cx-card-title">' + cx('book') + escHtml(vol.name) + '</div>'
    + '<span class="cx-shelf-badge cx-shelf-' + escAttr(vol.shelf) + '">' + escHtml(vol.shelf) + '</span></div>';

  var chipRow = '';
  if (cluster) chipRow += '<span class="cx-chip cx-chip-sm">' + escHtml(getClusterLabel(cluster)) + '</span>';
  chipRow += renderDesignPrinciplesChip(vol.design_principles);
  if (chipRow) html += '<div class="cx-chip-row" style="margin:var(--sp-4) 0">' + chipRow + '</div>';

  if (vol.current_phase) html += '<div class="cx-card-body" style="color:var(--accent);font-size:var(--fs-xs)">' + escHtml(vol.current_phase) + '</div>';
  if (vol.description) html += '<div class="cx-card-body" style="font-size:var(--fs-xs);color:var(--text-secondary)">' + escHtml(vol.description) + '</div>';
  if (meta.length > 0) html += '<div class="cx-card-meta">' + cx('clock') + ' ' + escHtml(meta.join(' \u00B7 ')) + '</div>';
  if (vol.tags && vol.tags.length > 0) {
    html += '<div class="cx-tag-inline">';
    vol.tags.forEach(function(t) { html += '<span class="cx-chip cx-chip-sm">' + escHtml(t) + '</span>'; });
    html += '</div>';
  }
  html += '</div></div>';
  return html;
}

/* Design Principles status chip — canon-proc-002 Precondition for Build.
   Renders one of: ratified (green, accent), draft (muted italic, dashed
   border), missing (red-ish warning). Tappable to follow spec_path in a
   future iteration; for now it's a status surface only. */
function renderDesignPrinciplesChip(dp) {
  if (!dp) {
    return '<span class="cx-chip cx-chip-sm cx-dp-chip cx-dp-missing" title="Design principles not yet drafted — priority per canon-proc-002">' + cx('alert') + 'principles missing</span>';
  }
  var status = dp.status || 'missing';
  if (status === 'ratified') {
    return '<span class="cx-chip cx-chip-sm cx-dp-chip cx-dp-ratified" title="Design principles ratified">' + cx('check') + 'principles ratified</span>';
  }
  if (status === 'draft') {
    return '<span class="cx-chip cx-chip-sm cx-dp-chip cx-dp-draft" title="Design principles drafted, ratification pending">' + cx('quill') + 'principles draft</span>';
  }
  return '<span class="cx-chip cx-chip-sm cx-dp-chip cx-dp-missing" title="Design principles not yet drafted — priority per canon-proc-002">' + cx('alert') + 'principles missing</span>';
}

/* --- Chapter Helpers (Phase 5) --- */
function getSortedChapters(vol) {
  var chs = filterActive(vol.chapters || []);
  return chs.sort(function(a, b) {
    var oa = a.order != null ? a.order : 9999;
    var ob = b.order != null ? b.order : 9999;
    return oa - ob;
  });
}

function getChapterLinkedSessions(chapterId) {
  var results = [];
  store.journal.forEach(function(day) {
    (day.sessions || []).forEach(function(s) {
      if ((s.chapters_touched || []).indexOf(chapterId) !== -1) {
        results.push({ date: day.date, session: s });
      }
    });
  });
  return results;
}

function getChapterLinkedCanons(chapterId) {
  var linked = getChapterLinkedSessions(chapterId);
  var canonIds = {};
  linked.forEach(function(ls) {
    (ls.session.decisions || []).forEach(function(d) {
      if (!canonIds[d]) {
        var canon = store.canons.find(function(c) { return c.id === d && !c._deleted; });
        if (canon) canonIds[d] = canon;
      }
    });
  });
  var result = [];
  Object.keys(canonIds).forEach(function(k) { result.push(canonIds[k]); });
  return result;
}

function renderChapterContent(content) {
  if (!content || !content.trim()) return '';
  var blocks = content.split(/\n\n+/);
  var html = '<div class="cx-chapter-prose">';
  blocks.forEach(function(block) {
    block = block.trim();
    if (!block) return;
    if (block.indexOf('## ') === 0) {
      html += '<div class="cx-chapter-section-heading">' + escHtml(block.substring(3)) + '</div>';
    } else {
      html += '<p>' + escHtml(block).replace(/\n/g, '<br>') + '</p>';
    }
  });
  html += '</div>';
  return html;
}

/* --- Volume Detail (from Phase 1) --- */
function renderVolumeDetail(route) {
  var vc = document.getElementById('viewContainer');
  var vol = store.volumes.find(function(v) { return v.id === route.id; });
  if (!vol) {
    vc.innerHTML = renderEmptyState('alert', 'Volume not found', 'This volume may have been deleted');
    return;
  }

  var html = '';

  // Header
  html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-8)">';
  html += '<div class="cx-vol-accent" style="background:' + escAttr(vol.domain_color) + ';width:4px;height:28px;border-radius:2px"></div>';
  html += '<h1 class="cx-page-title" style="margin:0">' + escHtml(vol.name) + '</h1>';
  html += '<span class="cx-shelf-badge cx-shelf-' + escAttr(vol.shelf) + '">' + escHtml(vol.shelf) + '</span>';
  html += '</div>';
  if (vol.description) html += '<p style="color:var(--text-secondary);margin-bottom:var(--sp-12);line-height:1.6">' + escHtml(vol.description) + '</p>';
  if (vol.current_phase) html += '<p style="color:var(--accent);font-size:var(--fs-xs);font-weight:500;margin-bottom:var(--sp-12)">' + cx('info') + ' ' + escHtml(vol.current_phase) + '</p>';
  if (vol.tags && vol.tags.length > 0) {
    html += '<div class="cx-tag-inline" style="margin-bottom:var(--sp-12)">';
    vol.tags.forEach(function(t) { html += '<span class="cx-chip cx-chip-sm">' + escHtml(t) + '</span>'; });
    html += '</div>';
  }

  // Action bar
  html += '<div class="cx-action-bar">';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="openShelfTransition" data-id="' + escAttr(vol.id) + '">' + cx('shelf') + ' Move Shelf</button>';
  html += '</div>';

  // TODOs
  var todos = vol.todos || [];
  var openTodos = todos.filter(function(t) { return t.status === 'open'; });
  var resolvedTodos = todos.filter(function(t) { return t.status === 'resolved'; });

  html += '<div class="cx-section-title">' + cx('check') + ' TODOs (' + openTodos.length + ' open)</div>';
  if (openTodos.length === 0 && resolvedTodos.length === 0) {
    html += '<p style="color:var(--text-tertiary);font-size:var(--fs-xs);margin-bottom:var(--sp-16)">No TODOs yet</p>';
  } else {
    html += '<div class="cx-card">';
    openTodos.forEach(function(t) { html += renderTodoItem(vol.id, t); });
    if (resolvedTodos.length > 0) {
      html += '<div class="cx-todo-chapter-label" style="margin-top:var(--sp-8)">Resolved (' + resolvedTodos.length + ')</div>';
      resolvedTodos.forEach(function(t) { html += renderTodoItem(vol.id, t); });
    }
    html += '</div>';
  }

  // Chapters
  var chapters = getSortedChapters(vol);
  html += '<div class="cx-section-title">' + cx('bookmark') + ' Chapters (' + chapters.length + ')</div>';
  if (chapters.length === 0) {
    html += '<p style="color:var(--text-tertiary);font-size:var(--fs-xs);margin-bottom:var(--sp-16)">No chapters yet</p>';
  } else {
    html += '<div class="cx-card">';
    chapters.forEach(function(ch) {
      var icon = chapterStatusIcon(ch.status);
      var meta = [];
      if (ch.started) meta.push('Started ' + formatRelativeTime(ch.started));
      if (ch.completed) meta.push('Done ' + formatRelativeTime(ch.completed));

      html += '<div class="cx-chapter-item" data-action="navigate" data-route="#/chapter/' + encodeURIComponent(vol.id) + '/' + encodeURIComponent(ch.id) + '">';
      html += '<span class="cx-status-' + escAttr(ch.status) + '">' + cx(icon) + '</span>';
      html += '<div><div class="cx-chapter-name">' + escHtml(ch.name) + '</div>';
      if (ch.summary) html += '<div class="cx-chapter-summary">' + escHtml(ch.summary) + '</div>';
      if (meta.length > 0) html += '<div class="cx-chapter-meta">' + escHtml(meta.join(' \u00B7 ')) + '</div>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  // Shelf History
  var history = vol.shelf_history || [];
  if (history.length > 1) {
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('clock') + ' Shelf History</div>';
    html += '<div class="cx-shelf-timeline">';
    for (var h = history.length - 1; h >= 0; h--) {
      var sh = history[h];
      html += '<div class="cx-timeline-entry"><div class="cx-timeline-dot"></div><div>'
        + '<div class="cx-timeline-text">' + escHtml(SHELF_LABELS[sh.shelf] || sh.shelf) + (sh.reason ? ' \u2014 ' + escHtml(sh.reason) : '') + '</div>'
        + '<div class="cx-timeline-date">' + escHtml(formatAbsoluteDate(sh.date)) + '</div></div></div>';
    }
    html += '</div>';
  }

  // Danger zone
  html += '<div class="cx-divider"></div>';
  html += '<div class="cx-section-title">Danger Zone</div>';
  html += '<button class="cx-btn-danger cx-full-width" data-action="deleteVolume" data-id="' + escAttr(vol.id) + '">' + cx('trash') + ' Delete Volume</button>';

  vc.innerHTML = html;
}

/* --- Chapter Detail (Phase 5) --- */
function renderChapterDetail(route) {
  var vc = document.getElementById('viewContainer');
  var vol = store.volumes.find(function(v) { return v.id === route.volumeId; });
  if (!vol) { vc.innerHTML = renderEmptyState('alert', 'Volume not found', 'This volume may have been deleted'); return; }
  var ch = (vol.chapters || []).find(function(c) { return c.id === route.chapterId && !c._deleted; });
  if (!ch) { vc.innerHTML = renderEmptyState('alert', 'Chapter not found', 'This chapter may have been deleted'); return; }

  var html = '';

  // Title + status
  var statusIcon = chapterStatusIcon(ch.status);
  html += '<h1 class="cx-page-title">' + escHtml(ch.name) + '</h1>';

  // Badges
  html += '<div class="cx-chip-row" style="margin-bottom:var(--sp-12)">';
  html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(ch.status) + '">' + cx(statusIcon) + ' ' + escHtml(ch.status) + '</span>';
  if (ch.started) html += '<span class="cx-chip cx-chip-sm">Started ' + escHtml(formatAbsoluteDate(ch.started)) + '</span>';
  if (ch.completed) html += '<span class="cx-chip cx-chip-sm">Done ' + escHtml(formatAbsoluteDate(ch.completed)) + '</span>';
  html += '</div>';

  // Summary
  if (ch.summary) html += '<p style="color:var(--text-secondary);font-size:var(--fs-sm);line-height:1.6;margin-bottom:var(--sp-16)">' + escHtml(ch.summary) + '</p>';

  // Spec URL
  if (ch.spec_url) html += '<p style="margin-bottom:var(--sp-16)"><a href="' + escAttr(ch.spec_url) + '" target="_blank" rel="noopener" class="cx-link-btn">' + cx('link') + ' View Spec</a></p>';

  // Content
  var contentHtml = renderChapterContent(ch.content);
  if (contentHtml) {
    html += '<div class="cx-divider"></div>';
    html += contentHtml;
  } else {
    html += '<div class="cx-chapter-empty">' + cx('scroll') + '<p>No narrative yet.</p><button data-action="editChapterDetail" class="cx-btn-secondary cx-btn-sm">' + cx('quill') + ' Edit Chapter</button></div>';
  }

  // Linked canons
  var linkedCanons = getChapterLinkedCanons(ch.id);
  if (linkedCanons.length > 0) {
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('bookmark') + ' Linked Canons (' + linkedCanons.length + ')</div>';
    linkedCanons.forEach(function(canon) {
      html += '<div class="cx-mini-card" data-action="navigate" data-route="#/canon/' + encodeURIComponent(canon.id) + '">';
      html += '<div style="font-size:var(--fs-sm);font-weight:500">' + escHtml(canon.title) + '</div>';
      html += '<div style="font-size:var(--fs-xs);color:var(--text-tertiary)">' + escHtml(canon.id) + '</div>';
      html += '</div>';
    });
  }

  // Linked sessions
  var linkedSessions = getChapterLinkedSessions(ch.id);
  if (linkedSessions.length > 0) {
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('scroll') + ' Sessions (' + linkedSessions.length + ')</div>';
    linkedSessions.forEach(function(ls) {
      var s = ls.session;
      var dur = s.duration_minutes ? s.duration_minutes + 'm' : '';
      html += '<div class="cx-mini-card">';
      html += '<div style="font-size:var(--fs-sm);font-weight:500">' + escHtml(s.id) + ' \u00B7 ' + escHtml(formatAbsoluteDate(ls.date)) + (dur ? ' \u00B7 ' + escHtml(dur) : '') + '</div>';
      if (s.summary) html += '<div style="font-size:var(--fs-xs);color:var(--text-secondary);margin-top:var(--sp-4);line-height:1.5">' + escHtml(s.summary.length > 150 ? s.summary.substring(0, 150) + '\u2026' : s.summary) + '</div>';
      html += '</div>';
    });
  }

  // Linked TODOs
  var todos = (vol.todos || []).filter(function(t) { return t.chapter === ch.id; });
  if (todos.length > 0) {
    var openTodos = todos.filter(function(t) { return t.status === 'open'; });
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('check') + ' TODOs (' + openTodos.length + ' open)</div>';
    html += '<div class="cx-card">';
    todos.forEach(function(t) { html += renderTodoItem(vol.id, t); });
    html += '</div>';
  }

  // Prev / Next navigation
  var sorted = getSortedChapters(vol);
  var curIdx = -1;
  for (var i = 0; i < sorted.length; i++) { if (sorted[i].id === ch.id) { curIdx = i; break; } }
  var prev = curIdx > 0 ? sorted[curIdx - 1] : null;
  var next = curIdx < sorted.length - 1 ? sorted[curIdx + 1] : null;

  if (prev || next) {
    html += '<div class="cx-chapter-nav">';
    if (prev) {
      html += '<div class="cx-chapter-nav-btn" data-action="navigate" data-route="#/chapter/' + encodeURIComponent(vol.id) + '/' + encodeURIComponent(prev.id) + '">';
      html += '<span style="font-size:var(--fs-xs);color:var(--text-tertiary)">' + cx('arrow-left') + ' Previous</span>';
      html += '<span style="font-size:var(--fs-sm);font-weight:500">' + escHtml(prev.name) + '</span>';
      html += '</div>';
    } else {
      html += '<div></div>';
    }
    if (next) {
      html += '<div class="cx-chapter-nav-btn" style="text-align:right" data-action="navigate" data-route="#/chapter/' + encodeURIComponent(vol.id) + '/' + encodeURIComponent(next.id) + '">';
      html += '<span style="font-size:var(--fs-xs);color:var(--text-tertiary)">Next <span style="display:inline-block;transform:scaleX(-1)">' + cx('arrow-left') + '</span></span>';
      html += '<span style="font-size:var(--fs-sm);font-weight:500">' + escHtml(next.name) + '</span>';
      html += '</div>';
    }
    html += '</div>';
  }

  vc.innerHTML = html;
}

function renderTodoItem(volumeId, todo) {
  var done = todo.status === 'resolved';
  var cls = done ? ' cx-todo-resolved' : '';
  var html = '<div class="cx-todo-item' + cls + '">';
  html += '<button class="cx-todo-check' + (done ? ' cx-todo-checked' : '') + '" data-action="toggleTodo" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(todo.id) + '">';
  if (done) html += cx('check');
  html += '</button>';
  html += '<div class="cx-todo-content">';
  html += '<div class="' + (done ? 'cx-todo-text-done' : 'cx-todo-text') + '">' + escHtml(todo.text) + '</div>';
  var meta = [];
  if (todo.chapter) meta.push(todo.chapter);
  meta.push(formatRelativeTime(todo.created));
  html += '<div class="cx-todo-meta">' + escHtml(meta.join(' \u00B7 '));
  // Stalled wins over overdue when both apply (stalled is the stronger signal).
  if (todoIsStalled(todo)) html += ' <span class="cx-chip cx-chip-sm cx-stalled-chip">Stalled</span>';
  else if (todoIsOverdue(todo)) html += ' <span class="cx-chip cx-chip-sm cx-overdue-chip">Overdue</span>';
  html += '</div>';
  html += '</div>';
  html += '<button class="cx-btn-icon cx-btn-danger-icon" data-action="deleteTodo" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(todo.id) + '">' + cx('trash') + '</button>';
  html += '</div>';
  return html;
}

/* --- TODOs (All) --- */
function renderTodos() {
  var vc = document.getElementById('viewContainer');

  // Gather every active TODO with its volume context.
  var allTodos = [];
  (store.volumes || []).forEach(function(vol) {
    if (vol._deleted) return;
    (vol.todos || []).forEach(function(t) {
      if (t._deleted) return;
      allTodos.push({ volume: vol, todo: t });
    });
  });

  // Session carryover — most recent journal session with non-empty open_todos.
  // open_todos[] is a historical snapshot; surface it as an action affordance
  // until the items are promoted to volume TODOs.
  var carryover = null;
  var sessionsWithTodos = [];
  (store.journal || []).forEach(function(day) {
    (day.sessions || []).forEach(function(s) {
      if (s.open_todos && s.open_todos.length > 0) {
        sessionsWithTodos.push({ session: s, date: day.date || s.date || '' });
      }
    });
  });
  sessionsWithTodos.sort(function(a, b) {
    if (b.date !== a.date) return b.date < a.date ? -1 : 1;
    return (b.session.id || '') < (a.session.id || '') ? -1 : 1;
  });
  if (sessionsWithTodos.length > 0) {
    var candidate = sessionsWithTodos[0];
    var promotedCount = 0;
    (store.volumes || []).forEach(function(vol) {
      (vol.todos || []).forEach(function(t) {
        if (t.source_session === candidate.session.id) promotedCount++;
      });
    });
    if (promotedCount < candidate.session.open_todos.length) carryover = candidate;
  }

  var stats = computeTodoStats();
  var html = '';

  // ROSTRA — single card; always present per canon-0052.
  html += renderTodoRostra(stats);

  // Session carryover stays directly under the Rostra: it's an interrupt
  // surface, not a normal TODO entity.
  if (carryover) {
    var s = carryover.session;
    html += '<div class="cx-card cx-todo-volume-group" style="margin-top:var(--sp-12)">';
    html += '<div class="cx-todo-volume-title">' + cx('clock') + ' Session carryover \u2014 ' + escHtml(s.id) + '</div>';
    html += '<div class="cx-session-todo-item" style="font-style:italic">Historical snapshot from session close. Promote to a volume TODO to track as active work.</div>';
    s.open_todos.forEach(function(t) {
      html += '<div class="cx-session-todo-item">\u2022 ' + escHtml(t) + '</div>';
    });
    html += '</div>';
  }

  // NOTICE BOARDS — three pill rows: Status / Volume / Sort.
  html += renderTodoNoticeBoards(stats);

  // Apply filters + sort to produce the visible set.
  var filtered = allTodos.filter(function(item) {
    if (_todoFilters.status && _todoFilters.status !== 'all' && item.todo.status !== _todoFilters.status) return false;
    if (_todoFilters.volume && item.volume.id !== _todoFilters.volume) return false;
    return true;
  });
  filtered.sort(function(a, b) {
    if (_todoSort === 'overdue') {
      var ao = todoIsOverdue(a.todo) ? 1 : 0;
      var bo = todoIsOverdue(b.todo) ? 1 : 0;
      if (bo !== ao) return bo - ao;
    } else if (_todoSort === 'stalled') {
      var as = todoIsStalled(a.todo) ? 1 : 0;
      var bs = todoIsStalled(b.todo) ? 1 : 0;
      if (bs !== as) return bs - as;
    }
    var ac = a.todo.created || '';
    var bc = b.todo.created || '';
    if (_todoSort === 'oldest') return ac < bc ? -1 : ac > bc ? 1 : 0;
    return bc < ac ? -1 : bc > ac ? 1 : 0; // newest default + tiebreaker
  });

  // FILTERED COUNT.
  var filtersActive = (_todoFilters.status && _todoFilters.status !== 'all') || _todoFilters.volume;
  var totalShown = allTodos.length;
  html += '<div class="cx-filter-count">' + (filtersActive
    ? 'Showing ' + filtered.length + ' of ' + totalShown
    : filtered.length + ' entr' + (filtered.length === 1 ? 'y' : 'ies')) + '</div>';

  // STALLS — the cards. Group by volume only when no volume filter is active
  // (volume-filtered view is already a single-volume list, so headers add noise).
  if (filtered.length === 0) {
    html += renderEmptyState('check', 'No matches', 'No TODOs match the current filter selection');
  } else if (_todoFilters.volume) {
    html += '<div class="cx-card cx-todo-volume-group">';
    filtered.forEach(function(item) { html += renderTodoItem(item.volume.id, item.todo); });
    html += '</div>';
  } else {
    var grouped = {};
    var groupOrder = [];
    filtered.forEach(function(item) {
      if (!grouped[item.volume.id]) {
        grouped[item.volume.id] = { volume: item.volume, todos: [] };
        groupOrder.push(item.volume.id);
      }
      grouped[item.volume.id].todos.push(item.todo);
    });
    groupOrder.forEach(function(volId) {
      var g = grouped[volId];
      html += '<div class="cx-card cx-todo-volume-group">';
      html += '<div class="cx-todo-volume-title" data-action="goToVolume" data-id="' + escAttr(volId) + '" style="cursor:pointer">' + cx('book') + escHtml(g.volume.name) + '</div>';
      g.todos.forEach(function(t) { html += renderTodoItem(volId, t); });
      html += '</div>';
    });
  }

  vc.innerHTML = html;
}

/* Forum Pattern Rostra for the TODOs tab. Headline open count + per-volume
   dots + resolved counts + resolution-rate + avg-time + overdue/stalled. */
function renderTodoRostra(stats) {
  var html = '<div class="cx-rostra">';
  html += '<div class="cx-rostra-headline">' + stats.open + ' <span class="cx-rostra-headline-label">open</span></div>';

  if (stats.perVolume.length > 0) {
    html += '<div class="cx-rostra-dots">';
    stats.perVolume.forEach(function(v) {
      var bg = v.color ? 'background:' + v.color : '';
      html += '<span class="cx-rostra-dot" title="' + escAttr(v.name + ' — ' + v.openCount + ' open / ' + v.totalCount + ' total') + '" style="' + bg + '"></span>';
      html += '<span class="cx-rostra-dot-label">' + escHtml(v.name) + ' ' + v.openCount + '</span>';
    });
    html += '</div>';
  }

  var stats2 = [];
  stats2.push(stats.resolvedThisWeek + ' wk');
  stats2.push(stats.resolvedThisMonth + ' mo');
  stats2.push(stats.resolvedLifetime + ' total');
  html += '<div class="cx-rostra-stats"><span class="cx-rostra-stat-label">Resolved:</span> ' + escHtml(stats2.join(' \u00B7 ')) + '</div>';

  var meta = [];
  if (stats.resolutionRate30d != null) meta.push('Rate (30d): ' + stats.resolutionRate30d + '%');
  if (stats.avgResolutionDays != null) meta.push('Avg time: ' + stats.avgResolutionDays + 'd');
  if (meta.length > 0) html += '<div class="cx-rostra-stats">' + escHtml(meta.join(' \u00B7 ')) + '</div>';

  if (stats.overdue > 0 || stats.stalled > 0) {
    html += '<div class="cx-rostra-stats">';
    if (stats.overdue > 0) html += '<span class="cx-chip cx-chip-sm cx-overdue-chip">Overdue ' + stats.overdue + '</span> ';
    if (stats.stalled > 0) html += '<span class="cx-chip cx-chip-sm cx-stalled-chip">Stalled ' + stats.stalled + '</span>';
    html += '</div>';
  }

  html += '</div>';
  return html;
}

/* Three pill rows under the Rostra. Volume pills are derived from data —
   adding a new volume with TODOs adds a pill automatically. */
function renderTodoNoticeBoards(stats) {
  var html = '';
  var statusOptions = [
    { key: 'all', label: 'All' },
    { key: 'open', label: 'Open' },
    { key: 'resolved', label: 'Resolved' }
  ];
  html += '<div class="cx-filter-row">';
  statusOptions.forEach(function(opt) {
    var active = (_todoFilters.status || 'open') === opt.key;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="setTodoStatusFilter" data-key="' + escAttr(opt.key) + '">' + escHtml(opt.label) + '</button>';
  });
  html += '</div>';

  // Volume pills — derived from data.
  html += '<div class="cx-filter-row">';
  html += '<button class="cx-filter-pill' + (_todoFilters.volume ? '' : ' cx-filter-pill-active') + '" data-action="setTodoVolumeFilter" data-key="">All</button>';
  stats.perVolume.forEach(function(v) {
    var active = _todoFilters.volume === v.volId;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="setTodoVolumeFilter" data-key="' + escAttr(v.volId) + '">' + escHtml(v.name) + '</button>';
  });
  html += '</div>';

  // Sort pills.
  var sortOptions = [
    { key: 'newest', label: 'Newest' },
    { key: 'oldest', label: 'Oldest' },
    { key: 'overdue', label: 'Overdue' },
    { key: 'stalled', label: 'Stalled' }
  ];
  html += '<div class="cx-filter-row">';
  sortOptions.forEach(function(opt) {
    var active = _todoSort === opt.key;
    html += '<button class="cx-filter-pill' + (active ? ' cx-filter-pill-active' : '') + '" data-action="setTodoSort" data-key="' + escAttr(opt.key) + '">' + escHtml(opt.label) + '</button>';
  });
  html += '</div>';
  return html;
}

/* --- Settings (Phase 2: GitHub connection) --- */
function renderSettings() {
  var vc = document.getElementById('viewContainer');
  var currentTheme = localStorage.getItem(KEYS.THEME) || 'dark';
  var currentSize = localStorage.getItem(KEYS.TEXT_SIZE) || 'med';
  var isLight = currentTheme === 'light';
  var repoUrl = localStorage.getItem(KEYS.REPO_URL) || '';
  var hasGitHub = !!repoUrl;
  var html = '';

  // Appearance
  html += '<div class="cx-settings-section"><div class="cx-section-title">Appearance</div><div class="cx-card">';
  html += '<div class="cx-settings-row" data-action="toggleTheme">';
  html += '<div class="cx-settings-left">' + cx(isLight ? 'sun' : 'moon') + '<div><div class="cx-settings-label">Theme</div><div class="cx-settings-hint">' + (isLight ? 'Light' : 'Dark') + ' mode</div></div></div>';
  html += '<div class="cx-settings-right">' + (isLight ? 'Light' : 'Dark') + '</div></div>';
  html += '</div></div>';

  // Text size
  html += '<div class="cx-settings-section"><div class="cx-card" style="padding:var(--sp-16)">';
  html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">' + cx('book') + '<div><div class="cx-settings-label">Text size</div><div class="cx-settings-hint">Adjust reading comfort</div></div></div>';
  html += '<div class="cx-slider-wrap"><div class="cx-slider-track" id="cxSliderTrack">';
  html += '<div class="cx-slider-fill" id="cxSliderFill" style="width:' + TEXT_SIZE_POS[currentSize] + '%"></div>';
  html += '<div class="cx-slider-thumb" id="cxSliderThumb" style="left:' + TEXT_SIZE_POS[currentSize] + '%"></div></div>';
  html += '<div class="cx-slider-labels">';
  ['low', 'med', 'high'].forEach(function(s) {
    html += '<span class="cx-slider-label' + (s === currentSize ? ' cx-slider-label-active' : '') + '" data-action="setTextSize" data-size="' + s + '">' + s.toUpperCase() + '</span>';
  });
  html += '</div></div>';
  html += '<div class="cx-preview-pill"><span style="font-family:var(--ff-heading);font-size:var(--fs-lg)">Aa</span> \u2014 <span style="font-size:var(--fs-sm)">This is how text will look</span></div>';
  html += '</div></div>';

  // GitHub Sync
  html += '<div class="cx-settings-section"><div class="cx-section-title">GitHub Sync</div><div class="cx-card" style="padding:var(--sp-16)">';
  if (hasGitHub) {
    html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">';
    html += '<span class="cx-sync-badge cx-sync-badge-connected">' + cx('check') + ' Connected</span>';
    html += '</div>';
    html += '<div class="cx-settings-hint" style="margin-bottom:var(--sp-12)">Repository: ' + escHtml(repoUrl) + '</div>';
    var pending = store._wal.filter(function(e) { return e.status === 'pending' || e.status === 'failed'; }).length;
    if (pending > 0) {
      html += '<div class="cx-settings-hint" style="color:var(--warning)">' + pending + ' pending change' + (pending !== 1 ? 's' : '') + '</div>';
    }
    html += '<div style="display:flex;gap:var(--sp-8);margin-top:var(--sp-12)">';
    html += '<button class="cx-btn-secondary cx-btn-sm" data-action="syncNow">' + cx('refresh') + ' Sync Now</button>';
    html += '<button class="cx-btn-secondary cx-btn-sm" data-action="disconnectGitHub">Disconnect</button>';
    html += '</div>';
  } else {
    html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">' + cx('github');
    html += '<div><div class="cx-settings-label">Connect GitHub</div><div class="cx-settings-hint">Sync data to a repository for backup and cross-device access</div></div></div>';
    html += renderTextField('settings-repo', 'Repository URL', '', { placeholder: 'owner/repo or https://github.com/owner/repo' });
    html += renderTextField('settings-token', 'Personal Access Token', '', { placeholder: 'ghp_...', type: 'password' });
    html += '<div class="cx-settings-hint" style="margin-bottom:var(--sp-12)">Token needs repo Contents read/write permission</div>';
    html += '<button class="cx-btn-primary" data-action="validateAndSaveGitHub">' + cx('check') + ' Connect</button>';
    html += '<div id="github-validation-status"></div>';
  }
  html += '</div></div>';

  // Data
  html += '<div class="cx-settings-section"><div class="cx-section-title">Data</div><div class="cx-card">';
  html += '<div class="cx-settings-row" data-action="openSnippetImport"><div class="cx-settings-left">' + cx('download') + '<div><div class="cx-settings-label">Import Aurelius Snippet</div><div class="cx-settings-hint">Paste JSON from build sessions</div></div></div></div>';
  html += '<div class="cx-settings-row" data-action="exportData"><div class="cx-settings-left">' + cx('download') + '<div><div class="cx-settings-label">Export Data</div><div class="cx-settings-hint">Download as JSON</div></div></div></div>';
  html += '<div class="cx-settings-row" data-action="restoreData"><div class="cx-settings-left">' + cx('refresh') + '<div><div class="cx-settings-label">Restore from Backup</div><div class="cx-settings-hint">Paste exported JSON to restore</div></div></div></div>';
  html += '</div></div>';

  // Data Integrity — chapter status drift (canon-0052 §Chapter Status Enum)
  var statusDrift = detectChapterStatusDrift();
  if (statusDrift.length > 0) {
    html += '<div class="cx-settings-section"><div class="cx-section-title">Data Integrity</div><div class="cx-card" style="padding:var(--sp-16);border-left:3px solid var(--warning)">';
    html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-8)">' + cx('alert');
    html += '<div><div class="cx-settings-label">Unknown chapter status</div><div class="cx-settings-hint">' + statusDrift.length + ' chapter' + (statusDrift.length !== 1 ? 's' : '') + ' carry a status not in the canon-0052 enum</div></div></div>';
    html += '<ul style="margin:var(--sp-8) 0 0 var(--sp-16);padding:0;font-size:var(--fs-sm);color:var(--text-secondary)">';
    statusDrift.forEach(function(d) {
      html += '<li><code>' + escHtml(d.status) + '</code> \u2014 ' + escHtml(d.volumeName) + ' / ' + escHtml(d.chapterName) + '</li>';
    });
    html += '</ul></div></div>';
  }

  // Advanced (Phase 4)
  html += '<div class="cx-settings-section"><div class="cx-section-title">Advanced</div><div class="cx-card">';
  html += '<div class="cx-settings-row" data-action="viewTrash"><div class="cx-settings-left">' + cx('trash') + '<div><div class="cx-settings-label">Trash</div><div class="cx-settings-hint">Restore or permanently delete items</div></div></div></div>';
  html += '<div class="cx-settings-row" data-action="viewErrorLog"><div class="cx-settings-left">' + cx('alert') + '<div><div class="cx-settings-label">Error Log</div><div class="cx-settings-hint">View recent errors</div></div></div></div>';
  html += '<div class="cx-settings-row" data-action="viewStorage"><div class="cx-settings-left">' + cx('info') + '<div><div class="cx-settings-label">Storage Usage</div><div class="cx-settings-hint">localStorage breakdown</div></div></div></div>';
  html += '</div></div>';

  // About
  html += '<div class="cx-settings-section"><div class="cx-section-title">About</div><div class="cx-card">';
  html += '<div class="cx-settings-row"><div class="cx-settings-left">' + cx('info') + '<div><div class="cx-settings-label">Codex v' + escHtml(CODEX_VERSION) + '</div><div class="cx-settings-hint">The builder who journals</div></div></div></div>';
  html += '</div></div>';

  vc.innerHTML = html;
  initTextSizeSlider();
}

function initTextSizeSlider() {
  var track = document.getElementById('cxSliderTrack');
  var thumb = document.getElementById('cxSliderThumb');
  if (!track || !thumb) return;

  function posToSize(x) {
    var rect = track.getBoundingClientRect();
    var pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    return pct < 25 ? 'low' : pct < 75 ? 'med' : 'high';
  }
  track.addEventListener('click', function(e) { applyTextSize(posToSize(e.clientX)); });
  var dragging = false;
  thumb.addEventListener('pointerdown', function(e) { dragging = true; thumb.setPointerCapture(e.pointerId); });
  document.addEventListener('pointermove', function(e) { if (dragging) applyTextSize(posToSize(e.clientX)); });
  document.addEventListener('pointerup', function() { dragging = false; });
}

function applyTextSize(size) {
  if (!TEXT_SIZES[size]) return;
  document.documentElement.style.setProperty('--fs-base', TEXT_SIZES[size]);
  localStorage.setItem(KEYS.TEXT_SIZE, size);
  var fill = document.getElementById('cxSliderFill');
  var thumb = document.getElementById('cxSliderThumb');
  if (fill) fill.style.width = TEXT_SIZE_POS[size] + '%';
  if (thumb) thumb.style.left = TEXT_SIZE_POS[size] + '%';
  var labels = document.querySelectorAll('.cx-slider-label');
  for (var i = 0; i < labels.length; i++) labels[i].classList.toggle('cx-slider-label-active', labels[i].dataset.size === size);
}

/* ============================================================
   PHASE 2: Onboarding Wizard (4 steps)
   ============================================================ */

var _wizardStep = 1;

function renderWizard() {
  var vc = document.getElementById('viewContainer');
  if (!vc) return;
  var steps = [null, renderWizardWelcome, renderWizardGitHub, renderWizardTheme, renderWizardDone];
  if (_wizardStep < 1 || _wizardStep > 4) _wizardStep = 1;
  vc.innerHTML = steps[_wizardStep]();
}

function renderWizardWelcome() {
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('book') + '</div>'
    + '<h1 class="cx-wizard-title">Welcome to Codex</h1>'
    + '<p class="cx-wizard-subtitle">The project library that remembers everything.</p>'
    + '<p class="cx-wizard-body">Codex tracks your volumes, chapters, canons, and decisions across every build session. '
    + 'Connect GitHub for cross-device sync, or use it locally.</p>'
    + '<div class="cx-wizard-progress">Step 1 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardNext">Get Started</button>'
    + '</div>';
}

function renderWizardGitHub() {
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('github') + '</div>'
    + '<h1 class="cx-wizard-title">Connect GitHub</h1>'
    + '<p class="cx-wizard-subtitle">Optional \u2014 sync your library to a repository for backup and cross-device access.</p>'
    + '<div class="cx-wizard-form">'
    + renderTextField('wizard-repo', 'Repository URL', '', { placeholder: 'owner/repo or https://github.com/owner/repo' })
    + renderTextField('wizard-token', 'Personal Access Token', '', { placeholder: 'ghp_...', type: 'password' })
    + '<div class="cx-settings-hint" style="margin-bottom:var(--sp-16)">Create a fine-grained token with Contents read/write on the target repo.</div>'
    + '<div id="wizard-validation-status"></div>'
    + '</div>'
    + '<div class="cx-wizard-progress">Step 2 of 4</div>'
    + '<div class="cx-wizard-actions">'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardValidateGitHub">' + cx('check') + ' Connect</button>'
    + '<button class="cx-btn-secondary cx-wizard-btn" data-action="wizardSkipGitHub">Skip \u2014 use locally</button>'
    + '</div></div>';
}

function renderWizardTheme() {
  var current = localStorage.getItem(KEYS.THEME) || 'dark';
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + (current === 'light' ? cx('sun') : cx('moon')) + '</div>'
    + '<h1 class="cx-wizard-title">Choose Your Theme</h1>'
    + '<div class="cx-wizard-theme-options">'
    + '<div class="cx-wizard-theme-card' + (current === 'light' ? ' cx-wizard-theme-active' : '') + '" data-action="wizardSelectTheme" data-value="light">'
    + cx('sun') + '<span>Light</span></div>'
    + '<div class="cx-wizard-theme-card' + (current === 'dark' ? ' cx-wizard-theme-active' : '') + '" data-action="wizardSelectTheme" data-value="dark">'
    + cx('moon') + '<span>Dark</span></div>'
    + '</div>'
    + '<div class="cx-wizard-progress">Step 3 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardThemeNext">Continue</button>'
    + '</div>';
}

function renderWizardDone() {
  var hasGitHub = !!localStorage.getItem(KEYS.REPO_URL);
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('check') + '</div>'
    + '<h1 class="cx-wizard-title">You\u2019re All Set</h1>'
    + '<p class="cx-wizard-subtitle">' + (hasGitHub
      ? 'Connected to GitHub. Your library will sync automatically.'
      : 'Running locally. You can connect GitHub anytime from Settings.') + '</p>'
    + '<div class="cx-wizard-progress">Step 4 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardFinish">Open Codex</button>'
    + '</div>';
}

/* ============================================================
   The Order — companion roster, Cabinet, Residency, Ladder.
   Read-only surface over store.companions (companions.json).
   Mutations flow through the snippet pipeline per canon-cc-012.
   ============================================================ */

var _orderSubTab = (function() {
  try { return localStorage.getItem('codex-subtab-order') || 'roster'; }
  catch(e) { return 'roster'; }
})();

/* Cabinet structure inscribed in constitution/working-papers.typ line 161
   and constitution/books/appendices.typ. The app derives occupants from
   companions' current_assignments at render-time; the structure itself is
   constitutional and does not live in companions.json. */
var CABINET_STRUCTURE = [
  { domain: 'Financial Health', portfolios: ['Treasury', 'Budget'] },
  { domain: 'Productivity',     portfolios: ['Efficiency', 'Output'] },
  { domain: 'Maintenance',      portfolios: ['Stability', 'Debt'] },
  { domain: 'Growth',           portfolios: ['Expansion', 'Innovation'] }
];

/* Residency ordering — Provinces first (Cluster A, Cluster B), then
   Command Center (Capital + Monument), then unresided. */
var RESIDENCY_ORDER = [
  { key: 'codex',          label: 'Codex',          cluster: 'A' },
  { key: 'sproutlab',      label: 'SproutLab',      cluster: 'A' },
  { key: 'sep-invoicing',  label: 'SEP Invoicing',  cluster: 'B' },
  { key: 'sep-dashboard',  label: 'SEP Dashboard',  cluster: 'B' },
  { key: 'command-center', label: 'Command Center', cluster: 'Capital' }
];

/* Ladder ordering — Constitution Book II Article 1 single-ladder spec. */
var LADDER_RANKS = [
  { key: 'Sovereign', label: 'Sovereign' },
  { key: 'Consul',    label: 'Consul' },
  { key: 'Censor',    label: 'Censors' },
  { key: 'Builder',   label: 'Builders' },
  { key: 'Governor',  label: 'Governors' },
  { key: 'Scribe',    label: 'Scribes' }
];

function renderOrder() {
  var vc = document.getElementById('viewContainer');
  var companions = store.companions || [];

  if (companions.length === 0) {
    vc.innerHTML = renderEmptyState('tome', 'The Order stands empty',
      'No companions are seated. companions.json has not loaded, or the roster is unbootstrapped.');
    return;
  }

  var html = renderOrderHeader(companions);

  html += renderSubTabBar('order', [
    { key: 'roster',    label: 'Roster' },
    { key: 'cabinet',   label: 'Cabinet' },
    { key: 'residency', label: 'Residency' },
    { key: 'ladder',    label: 'Ladder' }
  ], _orderSubTab);

  if      (_orderSubTab === 'cabinet')   html += renderOrderCabinetSubTab(companions);
  else if (_orderSubTab === 'residency') html += renderOrderResidencySubTab(companions);
  else if (_orderSubTab === 'ladder')    html += renderOrderLadderSubTab(companions);
  else                                    html += renderOrderRosterSubTab(companions);

  vc.innerHTML = html;
}

/* Header — roster health at a glance. */
function renderOrderHeader(companions) {
  var meta = store.companions_meta || {};
  var total = companions.length;
  var gen  = companions.filter(function(c) { return c.companion_class === 'generational'; }).length;
  var inst = companions.filter(function(c) { return c.companion_class === 'institutional'; }).length;

  var ratified = 0, drafts = 0;
  companions.forEach(function(c) {
    var v = c.meta && c.meta.profile_version;
    if (!v) return;
    if (String(v).indexOf('draft') !== -1) drafts++;
    else ratified++;
  });

  var stats = [
    { label: 'Companions',    value: total },
    { label: 'Generational',  value: gen },
    { label: 'Institutional', value: inst },
    { label: 'Ratified',      value: ratified },
    { label: 'Drafts',        value: drafts }
  ];

  var html = '<div class="cx-order-hero">';
  html += '<h1 class="cx-page-title">' + cx('tome') + ' The Order</h1>';
  html += '<p class="cx-order-hero-subtitle">The Republic\u2019s companion roster \u2014 seated, residing, ranked.</p>';
  html += '<div class="cx-order-stats">';
  stats.forEach(function(s) {
    html += '<div class="cx-order-stat"><span class="cx-order-stat-value">' + escHtml(String(s.value)) + '</span>'
         +  '<span class="cx-order-stat-label">' + escHtml(s.label) + '</span></div>';
  });
  html += '</div>';
  if (meta.updated) {
    html += '<div class="cx-order-hero-meta">Roster updated ' + escHtml(formatAbsoluteDate(meta.updated)) + '</div>';
  }
  html += '</div>';
  return html;
}

/* ---- Roster subtab — all companions as full cards ---- */
function renderOrderRosterSubTab(companions) {
  var sorted = companions.slice().sort(orderCompanionsByInstitutionalThenName);
  var html = '';
  sorted.forEach(function(c) { html += renderCompanionCard(c); });
  return html;
}

/* Sort: institutional first (Consul), then generational by name. */
function orderCompanionsByInstitutionalThenName(a, b) {
  var ai = a.companion_class === 'institutional' ? 0 : 1;
  var bi = b.companion_class === 'institutional' ? 0 : 1;
  if (ai !== bi) return ai - bi;
  var an = ((a.identity && a.identity.name) || a.id || '').toLowerCase();
  var bn = ((b.identity && b.identity.name) || b.id || '').toLowerCase();
  return an.localeCompare(bn);
}

/* Companion card — compact-rich. Clickable, routes to detail. */
function renderCompanionCard(c) {
  var id       = c.id || '';
  var ident    = c.identity || {};
  var asn      = c.assignment || {};
  var meta     = c.meta || {};
  var name     = ident.name || id;
  var title    = ident.title || '';
  var archetype = ident.archetype || '';
  var cls      = c.companion_class || 'generational';
  var rank     = asn.current_rank || '';
  var residence = asn.residence || asn.province || (cls === 'institutional' ? 'command-center' : '');
  var cluster  = asn.cluster || '';
  var version  = meta.profile_version || '';
  var assignments = Array.isArray(asn.current_assignments) ? asn.current_assignments : [];
  var doubleHat = asn.double_hatted === true;

  var archetypeCls = archetype ? ' cx-archetype-' + escAttr(archetype.toLowerCase()) : '';
  var classCls     = ' cx-class-' + escAttr(cls);
  var versionCls   = version && String(version).indexOf('draft') !== -1 ? 'cx-version-draft' : 'cx-version-ratified';
  var residenceLabel = residenceLabelFor(residence);

  var html = '<div class="cx-card cx-card-clickable cx-companion-card' + archetypeCls + classCls + '" data-action="goToCompanion" data-id="' + escAttr(id) + '">';

  html += '<div class="cx-companion-card-head">';
  html += '<div class="cx-companion-card-name-block">';
  html += '<div class="cx-companion-card-name">' + escHtml(name) + '</div>';
  if (title) html += '<div class="cx-companion-card-title">' + escHtml(title) + '</div>';
  html += '</div>';
  if (doubleHat) html += '<span class="cx-companion-dh-badge" title="Double-hatted">' + cx('bookmark') + '</span>';
  if (asn.operational_status === 'appointed') html += '<span class="cx-companion-appointed-badge" title="Appointed — onboarding in flight per canon-proc-003">' + cx('clock') + '</span>';
  html += '</div>';

  html += '<div class="cx-chip-row cx-companion-card-chips">';
  if (archetype) html += '<span class="cx-chip cx-chip-sm cx-chip-archetype' + archetypeCls + '">' + escHtml(archetype) + '</span>';
  if (rank)      html += '<span class="cx-chip cx-chip-sm cx-chip-rank">' + escHtml(rank) + '</span>';
  if (residenceLabel) html += '<span class="cx-chip cx-chip-sm cx-chip-residence">' + escHtml(residenceLabel) + '</span>';
  if (cluster && cluster !== 'Monument' && cluster !== 'Capital') html += '<span class="cx-chip cx-chip-sm">Cluster ' + escHtml(cluster) + '</span>';
  else if (cluster)                                                 html += '<span class="cx-chip cx-chip-sm">' + escHtml(cluster) + '</span>';
  if (cls === 'institutional') html += '<span class="cx-chip cx-chip-sm cx-chip-institutional">Institutional</span>';
  html += '</div>';

  if (assignments.length > 0) {
    html += '<ul class="cx-companion-assignments">';
    assignments.forEach(function(a) { html += '<li>' + escHtml(a) + '</li>'; });
    html += '</ul>';
  }

  var footerBits = [];
  if (version) footerBits.push('<span class="cx-companion-version ' + versionCls + '">' + escHtml(version) + '</span>');
  if (ident.generation != null) footerBits.push('Gen ' + escHtml(String(ident.generation)));
  if (footerBits.length > 0) {
    html += '<div class="cx-card-meta cx-companion-card-foot">' + footerBits.join(' \u00B7 ') + '</div>';
  }

  html += '</div>';
  return html;
}

function residenceLabelFor(key) {
  if (!key) return '';
  var match = RESIDENCY_ORDER.find(function(r) { return r.key === key; });
  return match ? match.label : key;
}

/* ---- Cabinet subtab — 4 domains × 2 seats, vacancies visible ---- */
function renderOrderCabinetSubTab(companions) {
  var filled = computeCabinetOccupancy(companions);

  var totalSeats = 8;
  var vacantSeats = 0;
  CABINET_STRUCTURE.forEach(function(d) {
    d.portfolios.forEach(function(p) {
      if (!filled[d.domain + '|' + p]) vacantSeats++;
    });
  });

  var html = '<div class="cx-cabinet-summary">';
  html += '<span>' + escHtml(String(totalSeats - vacantSeats)) + ' of ' + totalSeats + ' Ministerial seats filled</span>';
  if (vacantSeats > 0) html += '<span class="cx-cabinet-summary-vacant">\u00B7 ' + vacantSeats + ' vacant</span>';
  html += '</div>';

  html += '<div class="cx-cabinet-grid">';
  CABINET_STRUCTURE.forEach(function(d) {
    html += '<div class="cx-cabinet-domain" data-domain="' + escAttr(d.domain.toLowerCase().replace(/\s+/g, '-')) + '">';
    html += '<div class="cx-cabinet-domain-title">' + escHtml(d.domain) + '</div>';
    d.portfolios.forEach(function(p) {
      var key = d.domain + '|' + p;
      var occupant = filled[key];
      html += renderCabinetSeat(d.domain, p, occupant);
    });
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="cx-cabinet-footnote">Cabinet structure per Constitution Book II Article 4 and working-papers.typ. Vacancies chronicled per canon-cc-011.</div>';

  return html;
}

function renderCabinetSeat(domain, portfolio, occupant) {
  if (occupant) {
    var c = occupant.companion;
    var ident = c.identity || {};
    return '<button class="cx-cabinet-seat" data-action="goToCompanion" data-id="' + escAttr(c.id) + '">'
      +  '<div class="cx-cabinet-seat-portfolio">Minister: ' + escHtml(portfolio) + '</div>'
      +  '<div class="cx-cabinet-seat-name">' + escHtml(ident.name || c.id) + '</div>'
      +  (ident.title ? '<div class="cx-cabinet-seat-title">' + escHtml(ident.title) + '</div>' : '')
      +  '</button>';
  }
  return '<div class="cx-cabinet-seat cx-cabinet-seat-vacant">'
    + '<div class="cx-cabinet-seat-portfolio">Minister: ' + escHtml(portfolio) + '</div>'
    + '<div class="cx-cabinet-seat-name">' + cx('alert') + ' Vacant</div>'
    + '</div>';
}

/* Parse each companion's current_assignments for Cabinet-seat strings of the
   form "Minister: <Portfolio> (<Domain>)". Returns a map domain|portfolio → companion. */
function computeCabinetOccupancy(companions) {
  var map = {};
  companions.forEach(function(c) {
    var assignments = (c.assignment && c.assignment.current_assignments) || [];
    assignments.forEach(function(a) {
      var m = /Minister:\s*([A-Za-z]+)\s*\(([^)]+)\)/.exec(a);
      if (!m) return;
      var portfolio = m[1].trim();
      var domainRaw = m[2].trim();
      // Match against CABINET_STRUCTURE to canonicalize.
      CABINET_STRUCTURE.forEach(function(d) {
        if (d.portfolios.indexOf(portfolio) === -1) return;
        // Domain match: exact or substring (e.g. "Financial Health domain" contains "Financial Health")
        if (domainRaw.indexOf(d.domain) === -1) return;
        map[d.domain + '|' + portfolio] = { companion: c };
      });
    });
  });
  return map;
}

/* ---- Residency subtab — grouped by Province/Capital ---- */
function renderOrderResidencySubTab(companions) {
  var groups = {};
  var unresided = [];

  companions.forEach(function(c) {
    var asn = c.assignment || {};
    var key = asn.residence || asn.province || null;
    if (!key) { unresided.push(c); return; }
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });

  var html = '';
  RESIDENCY_ORDER.forEach(function(r) {
    var members = groups[r.key];
    if (!members || members.length === 0) return;
    members.sort(orderCompanionsByInstitutionalThenName);
    html += renderResidencyGroup(r, members);
  });

  // Any residence keys not in RESIDENCY_ORDER
  Object.keys(groups).forEach(function(k) {
    if (RESIDENCY_ORDER.find(function(r) { return r.key === k; })) return;
    groups[k].sort(orderCompanionsByInstitutionalThenName);
    html += renderResidencyGroup({ key: k, label: residenceLabelFor(k), cluster: '' }, groups[k]);
  });

  if (unresided.length > 0) {
    unresided.sort(orderCompanionsByInstitutionalThenName);
    html += renderResidencyGroup({ key: 'unresided', label: 'Unresided', cluster: '' }, unresided);
  }

  return html;
}

function renderResidencyGroup(r, members) {
  var clusterLabel = r.cluster === 'A' ? 'Cluster A'
                   : r.cluster === 'B' ? 'Cluster B'
                   : r.cluster === 'Capital' ? 'Capital'
                   : '';
  var html = '<div class="cx-residency-group">';
  html += '<div class="cx-residency-header">';
  html += '<span class="cx-residency-title">' + cx('book') + ' ' + escHtml(r.label) + '</span>';
  if (clusterLabel) html += '<span class="cx-residency-cluster">' + escHtml(clusterLabel) + '</span>';
  html += '<span class="cx-residency-count">' + members.length + '</span>';
  html += '</div>';
  html += '<div class="cx-residency-roster">';
  members.forEach(function(c) { html += renderCompanionPill(c); });
  html += '</div>';
  html += '</div>';
  return html;
}

/* Compact pill — name, rank, title — clickable to detail. */
function renderCompanionPill(c) {
  var ident = c.identity || {};
  var asn   = c.assignment || {};
  var name  = ident.name || c.id;
  var rank  = asn.current_rank || '';
  var title = ident.title || '';
  var cls   = c.companion_class === 'institutional' ? ' cx-companion-pill-institutional' : '';
  return '<button class="cx-companion-pill' + cls + '" data-action="goToCompanion" data-id="' + escAttr(c.id) + '">'
    +  '<span class="cx-companion-pill-name">' + escHtml(name) + '</span>'
    +  (rank  ? '<span class="cx-companion-pill-rank">' + escHtml(rank) + '</span>' : '')
    +  (title ? '<span class="cx-companion-pill-title">' + escHtml(title) + '</span>' : '')
    +  '</button>';
}

/* ---- Ladder subtab — the single-ladder hierarchy ---- */
function renderOrderLadderSubTab(companions) {
  var byRank = {};
  LADDER_RANKS.forEach(function(r) { byRank[r.key] = []; });

  companions.forEach(function(c) {
    var rank = (c.assignment && c.assignment.current_rank) || null;
    if (!rank) return;
    // Normalize: "Censor-designate" etc. maps to "Censor"
    var canonical = rank.split(/[\s\-]/)[0];
    if (byRank[canonical]) byRank[canonical].push(c);
  });

  // Sovereign is the Architect — not a companion seat. Render as placeholder row.
  var html = '<div class="cx-ladder">';

  html += '<div class="cx-ladder-row cx-ladder-row-sovereign">';
  html += '<div class="cx-ladder-rank-title">' + escHtml('Sovereign') + '</div>';
  html += '<div class="cx-ladder-rank-occupants">';
  html += '<div class="cx-ladder-seat-sovereign">The Architect</div>';
  html += '</div></div>';

  LADDER_RANKS.slice(1).forEach(function(r) {
    var members = (byRank[r.key] || []).slice().sort(orderCompanionsByInstitutionalThenName);
    html += '<div class="cx-ladder-row">';
    html += '<div class="cx-ladder-rank-title">' + escHtml(r.label);
    if (members.length > 0) html += ' <span class="cx-ladder-count">' + members.length + '</span>';
    html += '</div>';
    html += '<div class="cx-ladder-rank-occupants">';
    if (members.length === 0) {
      html += '<div class="cx-ladder-empty">None seated</div>';
    } else {
      members.forEach(function(c) { html += renderCompanionPill(c); });
    }
    html += '</div></div>';
  });

  html += '</div>';

  html += '<div class="cx-ladder-footnote">Single-ladder per Constitution Book II Article 1. Military-track parallel (General/Centurion) and Treasury parallel (Collector) not yet seated.</div>';

  return html;
}

/* ==========================================================
   Companion Detail — route #/companion/<id>
   Renders the ten-block profile schema in readable sections.
   ========================================================== */

function renderCompanionDetail(route) {
  var vc = document.getElementById('viewContainer');
  var c = (store.companions || []).find(function(x) { return x.id === route.id; });
  if (!c) {
    vc.innerHTML = renderEmptyState('alert', 'Companion not found',
      'No companion with this id. The id may be misspelled or the roster may be unloaded.');
    return;
  }

  var ident = c.identity || {};
  var asn   = c.assignment || {};
  var meta  = c.meta || {};

  var html = '';

  // Hero
  html += '<div class="cx-companion-detail-hero">';
  html += '<h1 class="cx-page-title cx-companion-detail-name">' + escHtml(ident.name || c.id) + '</h1>';
  if (ident.title) html += '<div class="cx-companion-detail-title">' + escHtml(ident.title) + '</div>';
  html += '<div class="cx-chip-row cx-companion-detail-chips">';
  if (ident.archetype)            html += '<span class="cx-chip cx-chip-sm cx-chip-archetype">' + escHtml(ident.archetype) + '</span>';
  if (asn.current_rank)           html += '<span class="cx-chip cx-chip-sm cx-chip-rank">' + escHtml(asn.current_rank) + '</span>';
  if (c.companion_class)          html += '<span class="cx-chip cx-chip-sm">' + escHtml(c.companion_class) + '</span>';
  if (ident.generation != null)   html += '<span class="cx-chip cx-chip-sm">Gen ' + escHtml(String(ident.generation)) + '</span>';
  if (meta.profile_version) {
    var vstr = String(meta.profile_version);
    var vcls = vstr.indexOf('stub') !== -1 ? 'cx-chip-version-stub' : (vstr.indexOf('draft') !== -1 ? 'cx-chip-version-draft' : 'cx-chip-version-ratified');
    html += '<span class="cx-chip cx-chip-sm ' + vcls + '">' + escHtml(meta.profile_version) + '</span>';
  }
  html += '</div>';
  if (ident.key_trait) html += '<p class="cx-companion-detail-keytrait">' + escHtml(ident.key_trait) + '</p>';
  if (ident.named_after) html += '<p class="cx-companion-detail-namedafter"><strong>Named after.</strong> ' + escHtml(ident.named_after) + '</p>';
  html += '</div>';

  // Assignment block
  html += renderCompanionAssignmentBlock(c);

  // Onboarding block — canon-proc-003. Surfaces only when an onboarding
  // is in flight (operational_status === 'appointed') or recently sealed.
  html += renderCompanionOnboardingBlock(c);

  // Subsequent blocks — render whatever is present
  var blocks = [
    { key: 'voice',         label: 'Voice' },
    { key: 'mind',          label: 'Mind' },
    { key: 'shadow',        label: 'Shadow' },
    { key: 'relationships', label: 'Relationships' },
    { key: 'biography',     label: 'Biography' },
    { key: 'growth',        label: 'Growth' },
    { key: 'modulators',    label: 'Modulators' },
    { key: 'meta',          label: 'Meta' }
  ];
  blocks.forEach(function(b) {
    if (c[b.key]) html += renderCompanionGenericBlock(b.label, c[b.key]);
  });

  // Companion logs cross-reference (canon-0053)
  html += renderCompanionLogsCrossRef(c);

  vc.innerHTML = html;
}

function renderCompanionAssignmentBlock(c) {
  var asn = c.assignment || {};
  var html = '<section class="cx-companion-block">';
  html += '<div class="cx-companion-block-title">' + cx('bookmark') + ' Assignment</div>';
  html += '<div class="cx-companion-block-body">';

  var kv = [];
  if (asn.current_rank)      kv.push(['Rank',      asn.current_rank]);
  if (asn.cluster)           kv.push(['Cluster',   asn.cluster]);
  if (asn.province)          kv.push(['Province',  asn.province]);
  if (asn.residence)         kv.push(['Residence', residenceLabelFor(asn.residence)]);
  if (asn.track)             kv.push(['Track',     asn.track]);
  if (asn.double_hatted === true)  kv.push(['Double-hatted', 'Yes']);
  if (asn.double_hatted === false) kv.push(['Double-hatted', 'No']);
  html += renderKVTable(kv);

  if (Array.isArray(asn.current_assignments) && asn.current_assignments.length > 0) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Current assignments</div>';
    html += '<ul class="cx-companion-list">';
    asn.current_assignments.forEach(function(a) { html += '<li>' + escHtml(a) + '</li>'; });
    html += '</ul></div>';
  }

  if (asn.double_hat_note) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Double-hat note</div>';
    html += '<p class="cx-companion-prose">' + escHtml(asn.double_hat_note) + '</p></div>';
  }

  if (asn.notes) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Notes</div>';
    html += '<p class="cx-companion-prose">' + escHtml(asn.notes) + '</p></div>';
  }

  if (asn.scope_note) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Scope</div>';
    html += '<p class="cx-companion-prose">' + escHtml(asn.scope_note) + '</p></div>';
  }

  if (asn.access_note) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Access</div>';
    html += '<p class="cx-companion-prose">' + escHtml(asn.access_note) + '</p></div>';
  }

  if (asn.activation_status) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Activation status</div>';
    html += '<p class="cx-companion-prose">' + escHtml(asn.activation_status) + '</p></div>';
  }

  if (Array.isArray(asn.activation_triggers) && asn.activation_triggers.length > 0) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Activation triggers</div>';
    html += '<ul class="cx-companion-list">';
    asn.activation_triggers.forEach(function(t) { html += '<li>' + escHtml(t) + '</li>'; });
    html += '</ul></div>';
  }

  if (asn.reassignment_condition) {
    var rc = asn.reassignment_condition;
    html += '<div class="cx-companion-subblock cx-companion-reassignment">';
    html += '<div class="cx-companion-subblock-title">' + cx('refresh') + ' Reassignment condition</div>';
    if (rc.successor)        html += '<div class="cx-kv-row"><span class="cx-kv-key">Successor</span><span class="cx-kv-value">' + escHtml(rc.successor) + '</span></div>';
    if (rc.trigger_condition) html += '<div class="cx-kv-row"><span class="cx-kv-key">Trigger</span><span class="cx-kv-value">' + escHtml(rc.trigger_condition) + '</span></div>';
    if (rc.process)          html += '<div class="cx-kv-row"><span class="cx-kv-key">Process</span><span class="cx-kv-value">' + escHtml(rc.process) + '</span></div>';
    html += '</div>';
  }

  if (asn.jurisdiction) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Jurisdiction</div>';
    html += renderCompanionValue(asn.jurisdiction, 0);
    html += '</div>';
  }

  if (asn.per_repo_lens) {
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">Per-repo lens</div>';
    Object.keys(asn.per_repo_lens).forEach(function(k) {
      html += '<div class="cx-kv-row"><span class="cx-kv-key">' + escHtml(k) + '</span><span class="cx-kv-value">' + escHtml(String(asn.per_repo_lens[k])) + '</span></div>';
    });
    html += '</div>';
  }

  html += '</div></section>';
  return html;
}

/* Generic block renderer — recursive structural renderer for the 10-block
   companion schema. Scalars become K/V rows; string arrays become bulleted
   lists; object arrays become indexed cards with their own K/V rows and
   nested subblocks; nested objects recurse. No raw JSON dumps anywhere. */
function renderCompanionGenericBlock(label, block) {
  if (block == null) return '';
  if (Array.isArray(block) && block.length === 0) return '';
  if (typeof block === 'object' && !Array.isArray(block) && Object.keys(block).length === 0) return '';
  var html = '<section class="cx-companion-block">';
  html += '<div class="cx-companion-block-title">' + escHtml(label) + '</div>';
  html += '<div class="cx-companion-block-body">';
  html += renderCompanionValue(block, 0);
  html += '</div></section>';
  return html;
}

/* Recursive value renderer — handles scalars, arrays (of scalars and of
   objects), and nested objects. Depth is informational (bounded visually
   via CSS .cx-companion-subblock nesting). */
function renderCompanionValue(v, depth) {
  if (v == null) return '';
  var t = typeof v;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    return '<p class="cx-companion-prose">' + escHtml(String(v)) + '</p>';
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return '';
    var allScalar = v.every(function(x) { var xt = typeof x; return xt === 'string' || xt === 'number' || xt === 'boolean'; });
    if (allScalar) {
      var h = '<ul class="cx-companion-list">';
      v.forEach(function(item) { h += '<li>' + escHtml(String(item)) + '</li>'; });
      h += '</ul>';
      return h;
    }
    // array of objects — each item as an indexed subblock
    var h2 = '<div class="cx-companion-list-items">';
    v.forEach(function(item, idx) {
      h2 += '<div class="cx-companion-list-item">';
      h2 += '<div class="cx-companion-list-item-index">' + (idx + 1) + '</div>';
      h2 += '<div class="cx-companion-list-item-body">';
      h2 += renderCompanionValue(item, depth + 1);
      h2 += '</div></div>';
    });
    h2 += '</div>';
    return h2;
  }
  if (t === 'object') {
    return renderCompanionObject(v, depth);
  }
  return '';
}

function renderCompanionObject(obj, depth) {
  var html = '';
  // Pass 1: scalar fields → KV table
  var scalars = [];
  Object.keys(obj).forEach(function(k) {
    var val = obj[k];
    if (val == null) return;
    var vt = typeof val;
    if (vt === 'string' || vt === 'number' || vt === 'boolean') {
      scalars.push([prettifyKey(k), String(val)]);
    }
  });
  if (scalars.length > 0) html += renderKVTable(scalars);
  // Pass 2: nested fields → recursive subblocks
  Object.keys(obj).forEach(function(k) {
    var val = obj[k];
    if (val == null) return;
    var vt = typeof val;
    if (vt === 'string' || vt === 'number' || vt === 'boolean') return;
    if (Array.isArray(val) && val.length === 0) return;
    if (vt === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) return;
    html += '<div class="cx-companion-subblock">';
    html += '<div class="cx-companion-subblock-title">' + escHtml(prettifyKey(k)) + '</div>';
    html += renderCompanionValue(val, depth + 1);
    html += '</div>';
  });
  return html;
}

function renderKVTable(rows) {
  if (!rows || rows.length === 0) return '';
  var html = '<div class="cx-kv-table">';
  rows.forEach(function(row) {
    html += '<div class="cx-kv-row">';
    html += '<span class="cx-kv-key">' + escHtml(row[0]) + '</span>';
    html += '<span class="cx-kv-value">' + escHtml(row[1]) + '</span>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function prettifyKey(k) {
  var s = String(k);
  // Preserve identifier-shaped keys (filenames, URLs, hyphenated slugs) — they
  // are data, not labels.
  if (/[./]/.test(s)) return s;
  return s.replace(/_/g, ' ').replace(/\b\w/g, function(ch) { return ch.toUpperCase(); });
}


/* Onboarding block — canon-proc-003. Renders the seven-step progress when
   a companion is 'appointed' (onboarding in flight) or recently sealed. For
   'operational' and 'seated-grandfathered' companions, returns empty so the
   detail page isn't cluttered with completed processes. */
function renderCompanionOnboardingBlock(c) {
  var asn = c.assignment || {};
  var opStatus = asn.operational_status;
  var ob = asn.onboarding;
  if (!ob || !opStatus || opStatus === 'seated-grandfathered' || opStatus === 'operational') return '';
  var steps = ob.steps || [];
  var total = steps.length;
  var complete = steps.filter(function(s) { return s.status === 'complete' || s.status === 'exempted'; }).length;

  var html = '<section class="cx-companion-block cx-onboarding-block">';
  html += '<div class="cx-companion-block-title">' + cx('scroll') + ' Onboarding <span class="cx-chip cx-chip-sm cx-onboarding-status-' + escAttr(opStatus) + '">' + escHtml(opStatus) + '</span></div>';
  html += '<div class="cx-companion-block-body">';
  html += '<div class="cx-onboarding-progress">';
  html += '<div class="cx-onboarding-progress-bar"><div class="cx-onboarding-progress-fill" style="width:' + (total ? Math.round(complete * 100 / total) : 0) + '%"></div></div>';
  html += '<div class="cx-onboarding-progress-label">' + complete + ' of ' + total + ' complete</div>';
  html += '</div>';
  if (ob.canon_reference) {
    html += '<div class="cx-onboarding-canon-ref">' + renderReferenceLink(ob.canon_reference) + '</div>';
  }
  html += '<ol class="cx-onboarding-steps">';
  steps.forEach(function(s) {
    var status = s.status || 'pending';
    html += '<li class="cx-onboarding-step cx-onboarding-step-' + escAttr(status) + '">';
    html += '<div class="cx-onboarding-step-header">';
    html += '<span class="cx-onboarding-step-marker">' + (status === 'complete' || status === 'exempted' ? cx('check') : (status === 'in-progress' ? cx('clock') : cx('bookmark'))) + '</span>';
    html += '<span class="cx-onboarding-step-num">' + escHtml(String(s.step)) + '</span>';
    html += '<span class="cx-onboarding-step-name">' + escHtml(s.name) + '</span>';
    html += '<span class="cx-chip cx-chip-sm cx-onboarding-step-chip-' + escAttr(status) + '">' + escHtml(status) + '</span>';
    html += '</div>';
    if (s.completed || s.artifact) {
      html += '<div class="cx-onboarding-step-meta">';
      if (s.completed) html += '<span>' + escHtml(formatAbsoluteDate(s.completed)) + '</span>';
      if (s.completed && s.artifact) html += ' \u00B7 ';
      if (s.artifact) html += renderReferenceLink(s.artifact);
      html += '</div>';
    }
    html += '</li>';
  });
  html += '</ol>';
  if (ob.started) {
    html += '<div class="cx-companion-prose cx-onboarding-footnote">Started ' + escHtml(formatAbsoluteDate(ob.started)) + ' \u00B7 canon-proc-003 seven-step process \u00B7 appointed until step 7 seals</div>';
  }
  html += '</div></section>';
  return html;
}

/* Cross-reference Companion Logs (canon-0053) — count + navigation. */
function renderCompanionLogsCrossRef(c) {
  var logs = store.companion_logs || [];
  var name = (c.identity && c.identity.name) || c.id;
  var nameLower = String(name).toLowerCase();
  var matching = logs.filter(function(log) {
    var invoked = (log.invoked_companions || log.companions || []);
    if (!Array.isArray(invoked)) return false;
    return invoked.some(function(n) { return String(n).toLowerCase() === nameLower; });
  });

  var html = '<section class="cx-companion-block">';
  html += '<div class="cx-companion-block-title">' + cx('scroll') + ' Companion logs (canon-0053)</div>';
  html += '<div class="cx-companion-block-body">';
  if (matching.length === 0) {
    html += '<p class="cx-companion-prose cx-muted">No logs in docs/companion-logs/ reference ' + escHtml(name) + ' yet.</p>';
  } else {
    html += '<p class="cx-companion-prose">' + matching.length + ' log entr' + (matching.length === 1 ? 'y' : 'ies') + ' reference ' + escHtml(name) + '. '
         +  '<button class="cx-link-btn" data-action="navigate" data-route="#/journal">Open Journal \u2192 Logs</button></p>';
  }
  html += '</div></section>';
  return html;
}
