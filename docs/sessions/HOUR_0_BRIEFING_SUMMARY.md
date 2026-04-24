# Hour 0: War Time Briefing Summary
**Time:** 2026-04-24, 08:00 IST  
**Duration:** 72 hours (until 2026-04-27, 08:00 IST)  
**Status:** ACTIVE

---

## For All Participants

War Time has been declared under Book VI, Article 2(c) + (d) — Scope Pivot + Velocity Event.

**The Trigger:** Claude API weekly limit resets at this moment. We have exactly 72 hours of uninterrupted compute capacity before the next reset. This is a rare resource window that must be exploited now or lost.

**The Scope:** Three provinces require simultaneous health intervention:
1. **SproutLab** — Sync visibility infrastructure is broken (hardcoded status, no offline indicator, no auto-refresh)
2. **SEP Dashboard** — Non-operational (index.html replaced with wrong app; recovery ready)
3. **SEP Invoicing** — Feature delivery window (UI enhancements + margin dashboard)

**The Constraint:** Book I remains inviolable. Four Pillars, Sovereign's Covenant, Ladder structure — all unchanged. This is health intervention, not scope expansion.

---

## Individual Assignments

### Lyra — SproutLab
**Your brief:** `/home/user/Codex/docs/sessions/WAR_BRIEF_LYRA_SPROUTLAB.md`

**Three phases in sequence:**
1. **Hours 0-24:** Connection indicator + offline badge (replace hardcoded status)
2. **Hours 24-48:** Cache busting + Service Worker version (manifest + SW versioning)
3. **Hours 48-72:** Auto-refresh on listener fire (UI updates without manual reload)

**Acceptance:** All three implemented, tested, merged to main.

**Your repository:** `/home/user/sproutlab/`

---

### Nyx + Sovereign — SEP Dashboard
**Your brief:** `/home/user/Codex/docs/sessions/WAR_BRIEF_NYX_SOVEREIGN_DASHBOARD.md`

**Two phases:**
1. **Hours 0-2:** Pragmatic patch — restore v2.1 via `git checkout 08de8ee -- index.html` (5 minutes)
2. **Hours 2-12:** Context review — read NEXT_SESSION_SPEC.md, lock Session 8 feature scope
3. **Hours 12-60:** Execution — implement locked Session 8 features (Session 8A, 8B, etc.)
4. **Hours 60-72:** Testing & final merge

**Acceptance:** Dashboard operational, Session 8 features merged to main.

**Your repository:** `/home/user/sep-dashboard/`

---

### Theron + Solara — SEP Invoicing
**Your brief:** `/home/user/Codex/docs/sessions/WAR_BRIEF_THERON_SOLARA_INVOICING.md`

**Two phases:**
1. **Hours 0-48:** UI Enhancements (input styling, button interactivity, chart animations)
2. **Hours 48-72:** Margin Dashboard (Phase IL-4 — cost/KG tracking, client profitability analysis)

**Acceptance:** Both phases implemented, tested, merged to main.

**Your repository:** `/home/user/sep-invoicing/`

---

### Cipher — QA Lead
**Cadence:** Per-merge reviews only (no continuous cadence requirement)

**Scope:**
- Review Lyra's sync patterns (connection state, cache invalidation, auto-refresh)
- Review Nyx's Dashboard recovery and Session 8 feature architecture
- Review Theron/Solara's UI enhancements and margin dashboard integration

**Sign-off required before merge to main for each province.**

---

### Aurelius + Consul — Chronicler
**Role:** Record everything

**During 72h, log:**
- **Chronicles:** Hour 0-24 (diagnosis + feature locks), Hour 24-48 (progress), Hour 48-72 (final push), Hour 72 (synthesis)
- **Doctrines:** Sync visibility pattern, cache invalidation strategy, dashboard recovery pattern, feature delivery staging
- **Cautionary Tales:** Hardcoded status badge lesson, batch upload file replacement lesson, any scope creep moments

**Deliverable at Hour 72:** Lore package (all entries as JSON export) + handoff documentation to Command Center

---

## Key Dates & Checkpoints

| Time | Event |
|------|-------|
| **2026-04-24, 08:00 IST** | War Time BEGINS. All leads start Hour 0. |
| **Hour 12** | First status update from all three leads to Aurelius. Feature locks confirmed. |
| **Hour 24** | Hour 0-24 Chronicle entry. Lyra Phase 1 complete. Nyx Session 8 feature decisions locked. Theron/Solara UI enhancements started. |
| **Hour 36** | Nyx Session 8 Feature 1 merged. Theron/Solara button interactivity in progress. |
| **Hour 48** | Hour 24-48 Chronicle entry. Lyra Phase 2 merged. Nyx Session 8 Feature 2 merged. Theron/Solara Phase 1 (UI) merged, Phase 2 (margin) begins. |
| **Hour 60** | All major work merged. Final testing & bug squashing. |
| **Hour 72 (2026-04-27, 08:00 IST)** | War Time EXPIRES. All branches merged to main. Lore package exported. Handoff documentation complete. |
| **Within 7 days** | Post-War Review by Working Committee. |

---

## Technical Context (per province)

### SproutLab
- 8-module single-file PWA (139,171 LOC (split modules) / 61,948 LOC (compiled))
- Cloud-primary Firestore sync, real-time listeners
- 19/34 fields syncing (by design)
- Known Limitation (KL-1): Concurrent-writes-during-debounce — documented, reconcile spec pending (OUT OF SCOPE)
- Build: Cat-based concatenation, deployed to GitHub Pages
- Key files: `/home/user/sproutlab/split/sync.js` (1,255 LOC), `core.js` (3,450 LOC), `index.html`

### SEP Dashboard
- Monolithic single-file PWA (2.49MB)
- Currently broken (index.html is wrong app — Ziva's Dashboard instead of SEP v2.1)
- Recovery ready: `git checkout 08de8ee -- index.html` (5 min, zero risk)
- v2.1 baseline documented in SESSION_7_HANDOFF.md + NEXT_SESSION_SPEC.md
- No build process — direct single-file deploy
- Key files: `/home/user/sep-dashboard/index.html`, `manifest.json`, `sw.js`

### SEP Invoicing
- 22-module split-file PWA (7,419 LOC)
- Mature, production-ready, 13 features shipped
- Design system: 381 CSS classes, 54 tokens, full dark mode
- Storage: localStorage only (no cloud sync)
- Build: `bash build.sh` → index.html → GitHub Pages
- Key files: `/home/user/sep-invoicing/split/{styles.css, core.js, items.js, stats.js, invoice-ops.js, settings.js}`
- Phase IL-4 (margin dashboard) infrastructure in place (`S.defaultCostPerKg`)

---

## Communication Protocol

**For all leads:** Report blockers, discoveries, design decisions to **Aurelius** (Chronicler).

- **Blockers:** Alert immediately so we can escalate
- **Discoveries:** Every pattern, every lesson learned becomes lore
- **Design decisions:** Rationale logged for Doctrine entries
- **Scope creep:** Every moment a choice is made to expand or hold scope — logged with justification

**Aurelius will:**
- Synthesize discoveries into Doctrine entries
- Record scope decisions and rationale
- Compile Cautionary Tales from near-misses and failures
- Produce Hour-by-hour Chronicle updates
- Deliver final lore package to Command Center at Hour 72

---

## Deployment Strategy

**All three provinces:**
- Work on main branch (or feature branches that merge to main)
- Cipher reviews per PR (advisory); Sovereign merges after discussion with Aurelius (War Time standing rule, ratified 2026-04-24 Hour 0 — see Aurelius briefing §Standing rules)
- GitHub Pages deployment automatic on merge to main
- Zero-downtime continuous deployment

**Service Worker considerations:**
- SproutLab: Version bump forces cache clear
- SEP Dashboard: Always fetches HTML fresh (static assets cached)
- SEP Invoicing: Manual build outputs index.html

---

## Nothing Is Wasted (Pillar I)

Every scrap of work becomes lore:
- Every bug discovered = Cautionary Tale
- Every pattern that works = Doctrine
- Every decision made = Chronicle entry
- Every constraint found = Known Limitation record

At Hour 72, the lore package flows to Command Center as institutional memory.

---

## Your Move

**Aurelius speaks:** War Time begins in less than 24 hours. All briefs are prepared. All assignments locked. Three provinces, 72 hours, clear deliverables.

The Sovereign has spoken. The Order assembles.

**Begin at Hour 0.**
