# Codex — Quick Reference
**Version:** 1.0 · **Created:** 11 April 2026
**Use:** Open alongside code during every build session

---

## 1. Data Shapes

### volumes.json
```json
{
  "_schema_version": 1,
  "volumes": [{
    "id": "sproutlab",
    "name": "SproutLab",
    "shelf": "active|paused|archived|abandoned",
    "description": "...",
    "domain_color": "#E8B4B8",
    "tags": ["pwa", "health"],
    "repo": "rishabh1804.github.io/sproutlab/",
    "current_phase": "CareTickets Phase D complete",
    "chapters": [{
      "id": "caretickets",
      "name": "CareTickets",
      "status": "planned|in-progress|paused|complete|abandoned",
      "started": "2026-04-06",
      "completed": "2026-04-10",
      "ended": null,
      "summary": "...",
      "spec_url": "https://...",
      "_deleted": false,
      "_deleted_date": null
    }],
    "todos": [{
      "id": "todo-0001-fix-id-mismatch",
      "text": "Fix ctStorageWarning ID mismatch",
      "status": "open|resolved",
      "chapter": "caretickets",
      "created": "2026-04-10",
      "resolved": null,
      "source_session": "s-2026-04-10-01"
    }],
    "shelf_history": [{
      "shelf": "active",
      "date": "2024-10-01",
      "reason": null
    }]
  }]
}
```

### canons.json
```json
{
  "_schema_version": 1,
  "canons": [{
    "id": "canon-0001-no-ellipsis",
    "scope": "sproutlab|global",
    "category": "design|architecture|process",
    "title": "No text-overflow ellipsis",
    "rationale": "Truncated text hides meaning...",
    "created": "2026-03",
    "status": "active|deprecated|superseded",
    "superseded_by": null,
    "references": ["HR-7"],
    "_deleted": false,
    "_deleted_date": null
  }],
  "rejected_alternatives": [{
    "id": "rej-0001-horizontal-timeline",
    "context": "Today So Far card design",
    "volumes": ["sproutlab"],
    "rejected": "Horizontal scrolling timeline",
    "chosen": "Vertical chronological list",
    "reason": "375px screen width...",
    "date": "2026-04-06",
    "canon_id": null
  }]
}
```

### journal.json
```json
{
  "_schema_version": 1,
  "journal": [{
    "date": "2026-04-10",
    "sessions": [{
      "id": "s-2026-04-10-01",
      "summary": "CareTickets Phase D...",
      "volumes_touched": ["sproutlab"],
      "chapters_touched": ["caretickets"],
      "decisions": ["canon-0045-notification-arch"],
      "bugs_found": 12,
      "bugs_fixed": 12,
      "duration_minutes": 180,
      "open_todos": ["Fix ctStorageWarning ID mismatch"],
      "handoff": "Next: device sync",
      "screenshots": []
    }]
  }]
}
```

### Aurelius Snippet Format
```json
{
  "_snippet_version": 1,
  "session": { "date": "...", "summary": "...", ... },
  "canons": [{ ... }],
  "rejections": [{ ... }],
  "todos": [{ "volume": "sproutlab", "todo": { ... } }],
  "new_chapters": [{ "volume": "codex", "chapter": { "id": "...", "name": "...", ... } }],
  "chapter_updates": [{ "volume": "sproutlab", "chapter": "caretickets", "patch": { "status": "complete" } }],
  "canon_updates": [{ "id": "canon-0009-post-build-qa", "patch": { "status": "superseded" } }],
  "todo_updates": [{ "volume": "sproutlab", "todo": "todo-0001-fix-id", "patch": { "status": "resolved" } }],
  "apocrypha": [{ "id": "apo-0001-...", "title": "...", ... }]
}
```

### WAL Entry
```json
{
  "id": "wal-1712345678901-a3b2c",
  "timestamp": "2026-04-11T14:30:00+05:30",
  "_schema_version": 1,
  "action": "create|update|delete|shelf_transition",
  "entity_type": "volume|canon|rejection|session|todo|chapter",
  "entity_id": "canon-0048-notification-arch",
  "target_file": "volumes.json|canons.json|journal.json",
  "parent_id": null,
  "payload": { },
  "status": "pending|syncing|synced|failed|resolved",
  "error": null
}
```

---

## 2. ID Formats

| Entity | Format | Example |
|--------|--------|---------|
| Volume | `autoSlug(name)` | `sproutlab` |
| Chapter | `autoSlug(name)` | `caretickets` |
| Canon | `canon-NNNN-slug` | `canon-0001-no-ellipsis` |
| TODO | `todo-NNNN-slug` | `todo-0001-fix-id-mismatch` |
| Rejection | `rej-NNNN-slug` | `rej-0001-horizontal-timeline` |
| Session | `s-YYYY-MM-DD-NN` | `s-2026-04-10-01` |
| WAL | `wal-{timestamp}-{random}` | `wal-1712345678901-a3b2c` |

All numbers 4-digit zero-padded (except session suffix: 2-digit). IDs never reused after deletion.

---

## 3. localStorage Keys (all prefixed `codex-`)

```javascript
const KEYS = {
  THEME: 'codex-theme',
  TEXT_SIZE: 'codex-textSize',
  TOKEN: 'codex-token',
  REPO_URL: 'codex-repo-url',
  DISPLAY_NAME: 'codex-display-name',
  DEFAULT_SHELF: 'codex-default-shelf',
  DEFAULT_BRANCH: 'codex-default-branch',
  CACHE_VOLUMES: 'codex-cache-volumes',
  CACHE_CANONS: 'codex-cache-canons',
  CACHE_JOURNAL: 'codex-cache-journal',
  SHA_VOLUMES: 'codex-sha-volumes',
  SHA_CANONS: 'codex-sha-canons',
  SHA_JOURNAL: 'codex-sha-journal',
  WAL: 'codex-wal',
  ERROR_LOG: 'codex-errorlog',
  VISIT_COUNT: 'codex-visits',
  WIZARD_DONE: 'codex-wizard-done',
};
```

Draft keys: `codex-draft:{entity}:{mode}:{id?}`

Additional `codex-` keys (not in KEYS constant):
- `codex-seed-version` — tracks which seed version has been applied
- `codex-migrations` — JSON array of applied migration IDs

---

## 4. Routes

| Hash | View | Tab highlight |
|------|------|---------------|
| `#/` or `#/dashboard` | Dashboard | dashboard |
| `#/journal` | Journal | journal |
| `#/canons` | Canons | canons |
| `#/todos` | TODOs | todos |
| `#/volume/:id` | Volume Detail | dashboard |
| `#/chapter/:volId/:chId` | Chapter Detail | dashboard |
| `#/canon/:id` | Canon Detail | canons |
| `#/settings` | Settings | none |

Sub-settings views (storage, trash, error log) render directly without hash routes.

---

## 5. z-index Hierarchy

| Layer | z-index |
|-------|---------|
| Base content | 0 |
| FAB | 5 |
| Header + Tab bar | 10 |
| Breadcrumb | 15 |
| Skeleton loader | 20 |
| Dropdowns | 50 |
| Overlay backdrop | 90 |
| Overlay | 100 |
| Confirm backdrop | 190 |
| Confirm dialog | 200 |
| Sync detail panel | 500 |
| Toast | 1000 |
| Sync indicator | 1001 |

---

## 6. CSS Tokens

```css
/* Spacing */
--sp-2: 2px; --sp-4: 4px; --sp-6: 6px; --sp-8: 8px; --sp-10: 10px;
--sp-12: 12px; --sp-16: 16px; --sp-20: 20px; --sp-24: 24px; --sp-32: 32px;

/* Font sizes — dynamic system driven by --fs-base */
/* --fs-base default: 14px. Changed by text size presets (see below). */
--fs-2xs: calc(var(--fs-base) - 4px);   /* 10px at med */
--fs-xs:  calc(var(--fs-base) - 2px);   /* 12px at med */
--fs-sm:  var(--fs-base);               /* 14px at med */
--fs-md:  calc(var(--fs-base) + 2px);   /* 16px at med */
--fs-lg:  calc(var(--fs-base) + 4px);   /* 18px at med */
--fs-xl:  calc(var(--fs-base) + 6px);   /* 20px at med */
--fs-2xl: calc(var(--fs-base) + 10px);  /* 24px at med */
--fs-3xl: calc(var(--fs-base) + 16px);  /* 30px at med */

/* Text size presets (Settings slider, stored in codex-textSize) */
/* LOW: --fs-base = 12px | MED: 14px (default) | HIGH: 17px */
/* Applied via applyTextSize() in views.js. Icons remain 24px at all sizes. */

/* Radius */
--r-sm: 4px; --r-md: 8px; --r-lg: 12px; --r-xl: 16px; --r-2xl: 20px; --r-full: 9999px;

/* Animation */
--anim-overlay: 300ms; --anim-toast: 200ms; --anim-tab-switch: 150ms; --anim-expand: 200ms;
```

### Theme Colors

| Token | Light | Dark |
|-------|-------|------|
| --bg-primary | #FAF6F1 | #1A1610 |
| --bg-secondary | #F0EBE3 | #242018 |
| --bg-card | #FFFFFF | #2E2820 |
| --text-primary | #2C2417 | #E8E0D4 |
| --text-secondary | #6B5E50 | #B0A494 |
| --text-tertiary | #9C8E7E | #7A6E60 |
| --border | #E0D6CA | #3D362C |
| --accent | #8B7355 | #C4A87A |
| --accent-light | #B09A7E | #A08C6A |
| --success | #4A7C59 | #6AAF7B |
| --warning | #C4883A | #E0A850 |
| --error | #B84C4C | #D46A6A |

Default domain_color (when not set): `#8B7355`

---

## 7. Store Mutation API

```
store.addVolume(volume)
store.updateVolume(id, patch)
store.deleteVolume(id)                    // blocks if linked data
store.addChapter(volumeId, chapter)
store.updateChapter(volumeId, chapterId, patch)  // auto-fills completed/ended dates
store.deleteChapter(volumeId, chapterId)  // soft-delete
store.getSortedChapters(volume)           // sorts by order field with array-index fallback
store.addCanon(canon)
store.updateCanon(id, patch)
store.deleteCanon(id)                     // soft-delete
store.addSchism(schism)
store.addApocryphon(apocryphon)
store.updateApocryphon(id, patch)
store.deleteApocryphon(id)               // soft-delete
store.addTodo(volumeId, todo)
store.updateTodo(volumeId, todoId, patch)
store.deleteTodo(volumeId, todoId)        // hard delete
store.addJournalSession(date, session)    // upserts day entry
store.deleteSession(date, sessionId)      // auto-removes empty day
store.transitionShelf(volumeId, newShelf, reason)  // manages shelf_history
```

Every method: validates → mutates in-memory → creates WAL entry → fires onChange.

---

## 8. File ↔ Entity Mapping

| Entity | File | Push function |
|--------|------|---------------|
| volume, chapter, todo | volumes.json | buildVolumesFile() |
| canon, rejection | canons.json | buildCanonsFile() |
| session | journal.json | buildJournalFile() |

WAL flush push order: volumes.json → canons.json → journal.json (dependency order).

---

## 9. GitHub API Endpoints

| Action | Method | Path |
|--------|--------|------|
| Fetch file | GET | `/repos/{owner}/{repo}/contents/data/{file}` |
| Create file | PUT (no SHA) | same |
| Update file | PUT (with SHA) | same |
| Validate token | GET | `/repos/{owner}/{repo}` |

Headers: `Authorization: Bearer {token}`, `Accept: application/vnd.github.v3+json`
Content: base64 via `utf8ToBase64()` / `base64ToUtf8()` (never raw btoa/atob)
Response SHA: `json.content.sha` (not `json.sha`)
Base64 content: strip `\n` before decoding

---

## 10. Initialization Sequence

```
1. <head> script: set data-theme from localStorage
2. DOMContentLoaded
3. Register service worker (async)
4. Test localStorage availability → block if unavailable
5. Check settings → show wizard if first run
6. Read cached data from localStorage
7. Read WAL from localStorage, reset stuck "syncing" → "pending"
8. Fetch 3 JSONs from GitHub (Promise.allSettled) → cache fallback on failure
9. Check _schema_version → migrate if needed, block if too new
10. Populate store from fetched data
11. Replay WAL entries (per-entry try-catch)
12. Register onChange + onWalChange listeners
13. Parse hash route
14. Render initial view
15. Set _initializing = false
Post: purge old WAL, render sync indicator + tab badge, increment visit count
```

---

## 11. Build Phases

| Phase | Scope |
|-------|-------|
| 1 — Core | Utilities, Store, Settings (local), Shell, Dashboard, Volume Detail, Edit overlays, Theme |
| 2 — Persistence | GitHub sync, WAL, Onboarding wizard, Token validation |
| 3 — Content | Journal, Canons, TODOs, Rejections, Snippet import |
| 4 — Polish | Search, Heatmap, Stats, Pagination, Export, SW, Error log, Trash, Sync panel |
| 5 — Content depth | Chapter Detail, Apocrypha, Schisms rename, Auto-migration |

---

## 12. Builder Notes (from Pass 7)

| BN | Issue | Severity |
|----|-------|----------|
| BN-1 | ~15 data-action values need wiring in delegation | Medium |
| BN-4 | Chapter status CSS classes missing (.cx-status-planned etc.) | Medium |
| BN-6 | renderCurrentView needs fallback for unknown view | Medium |
| BN-7 | File builder routing needed in flushQueue | Medium |
| BN-13 | Snippet preview should validate chapter_update targets | Medium |
| BN-14 | renderTextField must apply type/min/step params | Medium |
| BN-15 | ~35 view-specific CSS classes to implement during build | Medium |
| BN-2 | buildSupersessionChain: use filterActive() | Low |
| BN-3 | Helpers should accept snapshot param (future) | Low |
| BN-5 | Shelf definitions canon in initial backfill | Low |
| BN-8 | Clear _pendingFilter on any tab switch | Low |
| BN-9 | GLOBAL_SCHEMA key may be unused | Low |
| BN-11 | Sub-settings views have no hash routes | Low |

---

## 13. CSS Class Prefix

All Codex classes: `cx-` prefix. Never unprefixed (shares origin with SproutLab).

## 14. Icon Function

`cx(name)` — returns SVG HTML string. Use `currentColor` for fills. Fallback for unknown icons: empty span with `cx-missing` class. Minimum 16 icons (decided in design session).

## 15. Responsive Breakpoints

```css
/* Default: mobile (<600px) */
@media (min-width: 600px) { /* tablet */ }
@media (min-width: 960px) { /* desktop */ }
```

## 16. Performance Budget

| Metric | Target |
|--------|--------|
| First meaningful paint | <1.5s on 4G |
| Time to interactive | <2s on 4G |
| Tab switch | <100ms |
| Search results | <200ms |
| Form save to toast | <300ms |

---

## 17. Pre-Build Blockers

1. **Font families** — serif heading + sans body (exact families TBD in design session)
2. **Icon SVGs** — 16 minimum cx() icons (source TBD in design session)
3. **Initial data backfill** — Aurelius generates initial JSON files

---

*This document is the builder's cheat sheet. The full spec is CODEX_SPEC_v1.md.*
