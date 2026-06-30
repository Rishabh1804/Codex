# World Cup 2026 — Briefing Dashboard (Codex artifact)

A self-contained, interactive briefing on the **2026 FIFA Men's World Cup** (USA · Canada ·
Mexico), captured at the **Round of 32** knockout stage. Built as a permanent Codex library
artifact and deployed to Vercel.

**Snapshot:** morning of **30 June 2026 (IST)** — group stage complete, knockouts under way.

## What's here

```
library/world-cup-2026/
├── index.html              ← the dashboard (open in any browser; self-contained, no build step)
├── manifest.webmanifest    ← PWA manifest (installable app)
├── sw.js                   ← service worker (network-first HTML, offline-capable)
├── icon.svg / icon-192.png / icon-512.png   ← app icons
├── wallpapers/             ← downloadable phone wallpaper pack (committed PNGs)
│   ├── android/  *.png      (1080 × 2340)
│   └── ios/      *.png      (1170 × 2532)
└── _build/                 ← wallpaper generation pipeline (regenerable)
    ├── wallpaper-template.html   parametric HTML/SVG design (?d=<design>)
    ├── flags/  fonts/            local assets (public-domain flags + Google Fonts woff2)
    ├── fetch-assets.sh           re-download local assets via curl
    └── render.sh                 render all designs → PNGs via chrome-headless-shell
```

## Live & app features

- **Live tournament clock** — a ticking IST clock anchored to the snapshot moment and advancing in
  real time, so countdowns stay internally consistent whenever the page is opened.
- **Live status strip** — a pulsing "LIVE NOW" card for the in-progress match and a real-time
  "next kick-off" countdown; per-match countdown chips on the scheduled board.
- **Match alerts (notifications)** — the bell button requests the Web Notifications permission and
  schedules a system notification 15 minutes before, and at, each kick-off (falls back to an in-page
  toast if permission is denied). Preference persists in localStorage.
- **Installable PWA** — `manifest.webmanifest` + `sw.js` make it installable to a home screen and
  usable offline; the install button appears when the browser offers it.

## The dashboard (`index.html`)

Single file — inline CSS + vanilla JS + inline SVG. Sections: hero metrics · executive summary ·
interactive Round-of-32 **bracket** · filterable **match board** (IST, with highlight links) ·
**stats & records** (Golden Boot bar chart, tournament records, hat-tricks, breakout stars) ·
all 12 **group tables** · key-events **timeline** · **video gallery** · **wallpaper pack** ·
sourced footer. Dark/light toggle (persisted). Responsive to mobile.

## Wallpaper pack

Six original tournament-themed designs (Road to the Final · Golden Boot · 48 Nations · Bracket ·
Host Cities · Champions Path), each rendered at Android and iOS resolutions. Built from
**public-domain national flags** + original design — no copyrighted FIFA logos/poster art, so the
pack is safe to share on the public deploy.

**Regenerate:**
```bash
cd _build
bash fetch-assets.sh   # only if flags/ or fonts/ are missing
bash render.sh         # writes ../wallpapers/{android,ios}/*.png
```
Rendering uses the pre-installed `chrome-headless-shell` with `--virtual-time-budget` (old-headless
mode) and **local** assets, because a headless browser behind the agent proxy can't complete TLS to
remote CDNs. The deployed dashboard itself uses remote flagcdn + Google Fonts (fine in real browsers).

## Design discipline

Built to the Codex/SproutLab **glanceability standard** (the "6-second rule"): every card leads
with one fact, status is colour-encoded (not text-only), nothing requires scrolling to read its
point. No emojis (HR-1) — iconography is inline SVG. Token-based spacing/type/colour (HR-5).
Playfair Display headings / Work Sans body — the Codex type idiom.

## Data & sources

Every score, standing and stat was cross-checked against ≥2 live sources (FIFA.com, CBS Sports,
NBC Sports, Reuters, AP, ESPN, Olympics.com, Northeastern) before publishing. A live tournament
means a few third-place rows differ slightly between outlets; the dashboard shows the
well-corroborated picture with an explicit "as-of" stamp. Full source links in the page footer.

*Not affiliated with FIFA. Flags are public domain. Wallpapers free for personal use.*
