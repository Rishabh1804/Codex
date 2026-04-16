# CODEX — Phase 5 Session Handoff
**Date:** 13 April 2026
**Session:** Phase 5 — Chapter Detail + Apocrypha + Schisms rename + Auto-migration
**Status:** Built, QA'd (4 bugs found/fixed), ready for deploy

---

## What Was Built

### 1. Chapter Detail View (views.js + core.js + start.js + styles.css)
- New route: `#/chapter/:volumeId/:chapterId` with `renderChapterDetail()`
- Breadcrumb: Library → Volume Name → Chapter Name
- Content rendering: `## Heading` lines become section titles, paragraphs preserve `\n` as `<br>`
- Auto-derived linked canons (from session `decisions` matched against canon IDs)
- Auto-derived linked sessions (from `chapters_touched`)
- Linked TODOs (filtered by `chapter` field)
- Previous/next chapter navigation (sorted by `order` field)
- Spec URL rendered as tappable link if present
- Empty content → placeholder with inline Edit button
- Header: back button + volume name + edit quill

### 2. Data Model Expansion (data.js)
- `addChapter`: accepts `content`, `order`, `completed`, `ended` from input (historical date support)
- `updateChapter`: allowlist expanded with `content`, `order`
- `getSortedChapters()`: sorts by `order` field with array-index fallback

### 3. Apocrypha (data.js + views.js + forms.js + start.js + styles.css)
- New `apocrypha` array in canons.json data model
- Three statuses: `fulfilled`, `foretold`, `forgotten`
- Store methods: `addApocryphon`, `updateApocryphon`, `deleteApocryphon`
- Collapsed section beneath Schisms in Canons tab
- Italic prose rendering with volume tags and status badges
- Snippet import/preview support
- Search integration (weight 3x)
- WAL replay support (findEntity/insertEntity/removeEntity)

### 4. Schisms Rename (all files)
- `rejected_alternatives` → `schisms` in canons.json data model
- `store.rejections` → `store.schisms` throughout
- `addRejection` → `addSchism`
- `renderRejectionCard` → `renderSchismCard`
- CSS: `cx-rejection-*` → `cx-schism-*`
- Backward compat: `populateStore` reads `cData.schisms || cData.rejected_alternatives`
- Backward compat: WAL replay handles both `'schism'` and `'rejection'` entity types
- Backward compat: Snippet import reads `_snippetParsed.schisms || _snippetParsed.rejections`

### 5. Auto-Migration System (seed.js + start.js)
- `CODEX_MIGRATIONS` array in seed.js
- Runner at Step 11.5 in boot sequence (after WAL replay, before listener registration)
- Explicit `_cacheToLocalStorage()` after migration
- Data-guarded for idempotency (checks chapter existence, content emptiness)
- Migration `phase-5-chapter-backfill-v1`:
  - Creates 3 new chapters (Phase 3, Phase 4, Phase 5) with full narratives
  - Updates 4 existing chapters with content + order
  - Updates Codex volume `current_phase`
  - Seeds first apocryphon: "The Sleepless Guardian"

### 6. Snippet Pipeline Expansion (forms.js)
- `new_chapters` in snippet format: creates chapters via import
- Preview: duplicate detection for new_chapters, target validation for chapter_updates
- Import: `new_chapters` processed before `chapter_updates` (correct ordering)
- Apocrypha in snippet format: import + preview
- Split toast counters: `newChapters`, `chapterUpdates`, `apocrypha`, `schisms`

### 7. Volume Detail Enhancement (views.js)
- Chapter cards sorted by `order` via `getSortedChapters()`
- Chapter tap navigates to chapter detail (was: opens edit form)

### 8. Delete-from-Detail Navigation Fix (forms.js)
- Deleting chapter while on chapter-detail navigates to volume instead of re-rendering dead view

---

## QA Audit Summary (1 round, 4 bugs)

| # | Sev | Bug | Fix |
|---|---|---|---|
| 1 | Critical | WAL replay: old `entity_type: 'rejection'` entries fail — find/insert/remove only handle `'schism'` | Added `case 'rejection':` fall-through in all three functions |
| 2 | Moderate | Migration cache: `_fireChange` suppressed during init — localStorage stale after migration | Added explicit `store._cacheToLocalStorage()` after migration runner |
| 3 | Moderate | Snippet backward compat: old snippets with `rejections` key silently skipped | Added `|| _snippetParsed.rejections` fallback in preview and import |
| 4 | Cosmetic | "Next" chapter nav arrow points left | Wrapped in `<span style="transform:scaleX(-1)">` |

**Cosmetic debt (1 item):** Trash view doesn't list deleted apocrypha (no creation/deletion UI exists yet).

---

## Files Modified (7 of 8)

| File | Lines | Delta | Changes |
|---|---|---|---|
| data.js | 529 | +33 | Apocrypha store/methods, addChapter expansion, updateChapter allowlist, schisms rename, populateStore compat |
| core.js | 732 | +11 | Chapter route, breadcrumb, header, renderers map, search, buildCanonsFile, WAL entity compat |
| views.js | 1480 | +191 | Chapter helpers, renderChapterDetail, apocrypha section, search results, schism rename |
| forms.js | 725 | +55 | new_chapters/apocrypha snippet pipeline, schism rename, delete navigation fix |
| start.js | 730 | +22 | editChapterDetail action, toggleApocrypha, migration runner |
| seed.js | 88 | +73 | CODEX_MIGRATIONS with chapter narratives + first apocryphon |
| styles.css | 847 | +25 | Chapter detail, apocrypha, schism CSS classes |

**Unchanged:** template.html, build.sh

---

## Codebase State

- **Total build:** 5,195 lines (codex.html), up from 4,758 (+437)
- **Split files:** 8 modules, concat order unchanged
- **All syntax checks pass**, all brackets balanced, all new CSS classes have rules, all data-actions wired

---

## Canons Created (this session)

**canon-0015-single-zip-delivery** (scope: global, category: process)
> All session deliverables ship as a single pre-built zip. Split source files + built output. One download, one unzip, deploy.

**canon-0016-self-contained-repos** (scope: global, category: process)
> Every project repo contains a docs/ directory with all specs, design principles, handoff documents, and quick references. The repo is the single source of truth for both code and documentation. No file uploads needed to start a session.

**Note:** These canons need to be imported via snippet. The canon IDs canon-0015 and canon-0016 conflict with existing canons in the seed data. Use canon-0031 and canon-0032 for the actual IDs.

---

## Snippet Format Additions

### new_chapters
```json
{
  "new_chapters": [{
    "volume": "codex",
    "chapter": {
      "id": "...", "name": "...", "status": "complete",
      "started": "2026-04-13", "completed": "2026-04-13",
      "content": "...", "order": 7
    }
  }]
}
```

### apocrypha
```json
{
  "apocrypha": [{
    "id": "apo-0001-...",
    "title": "...",
    "narrative": "...",
    "volumes": ["sproutlab"],
    "date": "2026-04-10",
    "status": "fulfilled"
  }]
}
```

---

## Deploy Instructions

```bash
cd ~/codex
unzip -o ~/storage/downloads/codex-phase5.zip
git --no-pager add -A
git --no-pager commit -m "Phase 5: Chapter Detail, Apocrypha, Schisms rename, auto-migration"
git push
```

Open Codex. Migration runs automatically. All chapters have narratives. The Sleepless Guardian awaits in the Apocrypha.

---

## What's Next

- Import session snippet (canon-0031, canon-0032, session log, TODOs)
- Backfill SproutLab and SEP chapters via future snippets
- Apocrypha detail view (future)
- Write more apocrypha entries
- Push docs/ to other project repos (SproutLab, SEP)
