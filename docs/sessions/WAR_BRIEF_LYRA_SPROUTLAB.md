# War Time Brief: SproutLab Sync UX Refresh
**Lead:** Lyra  
**Duration:** 72 hours (08:00 IST 2026-04-24 to 08:00 IST 2026-04-27)  
**Status:** BEGINS TOMORROW 08:00 IST  

---

## Your Mandate
**Full Sync UX Refresh** — Three-phase implementation of connection visibility + cache invalidation + auto-refresh

### Phase 1: Connection Indicator + Offline Badge (Hours 0-24)
**Goal:** Replace hardcoded "Connected" status with actual connection state  
**Current State:** Settings sync card shows "Connected" always (line 1168, sync.js) — doesn't reflect Firebase auth or listener status

**Deliverable:**
- Connection state check function: `isConnected()` → checks Firebase auth + listener-ready gates
- Visual feedback: Connected (green) | Offline (gray) | Syncing (spinner)
- Settings tab sync card updated with live connection badge
- Offline indicator visible when no connection

**Key Files:**
- `/home/user/sproutlab/split/sync.js` (1,255 LOC) — sync.js lines 1089-1187 (Settings tab sync UI)
- `/home/user/sproutlab/split/core.js` (3,450 LOC) — render/UI update functions
- `/home/user/sproutlab/index.html` — final deployment

**Acceptance:** Connection state correctly reflects Firebase + listener status in real-time

---

### Phase 2: Cache Busting + Service Worker Version (Hours 24-48)
**Goal:** Implement version-based cache invalidation  
**Current State:** 
- Service Worker has no version field
- manifest.json has no version field
- HTML cached indefinitely by browser
- Deploy doesn't invalidate old cache

**Deliverable:**
- Add `version` field to manifest.json (increment on each deploy)
- Service Worker version-based cache key (e.g., `cache-v2`, `cache-v3`)
- Cache-busting query param on HTML fetch: `index.html?v=<version>`
- Update manifest version on every build

**Key Files:**
- `/home/user/sproutlab/manifest.json` — add version field
- `/home/user/sproutlab/index.html` — inline Service Worker (lines 19436-19450)
- `/home/user/sproutlab/split/build.sh` — append version to manifest during build

**Acceptance:** Browser clears old cache when version increments; users get fresh HTML

---

### Phase 3: Auto-Refresh on Listener Fire (Hours 48-72)
**Goal:** UI auto-updates when remote data arrives (no manual reload needed)  
**Current State:** Requires full page reload via `window.location.reload()` after sync toast click

**Deliverable:**
- Listener callbacks trigger targeted re-renders (not full page reload)
- Connection + data arrival → auto-update specific UI sections
- Remove "tap to refresh" requirement
- Graceful handling: if auto-refresh fails, fallback to manual refresh button

**Key Files:**
- `/home/user/sproutlab/split/sync.js` — listener callbacks (line 874+)
- `/home/user/sproutlab/split/home.js` — vitals card re-render
- `/home/user/sproutlab/split/core.js` — render functions

**Acceptance:** Remote changes visible on UI within 2-3 seconds of listener fire; no manual reload

---

## Known Context
**Sync Model:** Cloud-primary (Firestore), real-time listeners, 19/34 fields syncing  
**WAL:** 2-layer (localStorage + Firebase IndexedDB)  
**Bugs Fixed:** B3 + B4 patched in C0 v3.1  
**Known Limitation (KL-1):** Concurrent-writes-during-debounce (2s window) — documented, will be fixed by reconcile spec (not in scope)

**No scope for fixing KL-1 in 72h** — focus on visibility + cache + auto-refresh

---

## QA Strategy
- Cipher reviews each PR (advisory, no cadence requirement); Sovereign merges after discussion with Aurelius (War Time standing rule, ratified 2026-04-24 Hour 0 — see `docs/briefings/WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md` §Standing rules)
- Manual testing: offline/online state transitions, cache-busting on version bump, auto-refresh on listener fire
- Cross-device testing: verify sync on two devices simultaneously

---

## Deployment
- All code merged to main branch
- Service Worker version bumped (forces user cache clear)
- Zero-downtime deploy via GitHub Pages

---

## Timeline Checkpoints
- **Hour 0:** Review this brief, assess Phase 1 scope
- **Hour 6:** Phase 1 implementation started
- **Hour 12:** Hour 0-12 update to Aurelius
- **Hour 24:** Phase 1 complete & merged, Phase 2 implementation started
- **Hour 36:** Phase 2 complete & merged, Phase 3 implementation started
- **Hour 48:** Hour 24-48 update to Aurelius
- **Hour 60:** Phase 3 complete, testing & edge cases
- **Hour 72:** All merged, ready for handoff

---

## Communication
Report blockers + discoveries to Aurelius (Chronicler). Every decision logged for Doctrine/Cautionary Tale entries.

**Your move, Lyra. The sync visibility of SproutLab depends on your three phases. Begin at Hour 0.**
