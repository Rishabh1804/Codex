# CODEX — TODO Cleanup Session Handoff
**Date:** 14 April 2026
**Session:** TODO Cleanup — 5 open TODOs resolved
**Status:** Built, QA'd (3 rounds, 0 bugs), ready for deploy

---

## TODOs Resolved

### TODO 1 — Reconcile QUICK_REFERENCE font size tokens (docs-only)
**Source chapter:** design-session
**Resolution:** Updated CODEX_QUICK_REFERENCE.md section 6 to document the actual dynamic `--fs-base` system: all `--fs-*` tokens are `calc()` expressions relative to `--fs-base`, not static values. Documented TEXT_SIZES presets (LOW=12px, MED=14px default, HIGH=17px), `applyTextSize()` in views.js, and that icons remain 24px. Also fixed: missing `TEXT_SIZE` key in KEYS section, removed phantom `GLOBAL_SCHEMA` key, added non-KEYS entries (`codex-seed-version`, `codex-migrations`), added chapter detail route, updated Store Mutation API (schisms rename, apocrypha methods, getSortedChapters), updated snippet format (new_chapters, apocrypha, canon_updates), added Phase 5 to build phases table.

### TODO 2 — Chapter handoff docs (docs-only)
**Source chapter:** phase-2-build
**Resolution:** Resolved as partially complete. The `docs/` directory exists with handoff documents per canon-0032-self-contained-repos. In-app viewer out of scope (too large for this session). Status: resolved.

### TODO 3 — Storage usage view understates total (code fix)
**Source chapter:** phase-4-polish
**Resolution:** Fixed `renderStorageUsage()` in views.js. Previously iterated only `Object.values(KEYS)`, missing `codex-draft:*`, `codex-seed-version`, and `codex-migrations` keys. Now iterates all localStorage keys with `codex-` prefix using a `for` loop over `localStorage.length`.

### TODO 4 — Trash view: add deleted apocrypha (code fix)
**Source chapter:** phase-5-chapter-detail
**Resolution:** Added deleted apocrypha section to `renderTrashView()` in views.js, positioned between canons and chapters. Uses `scroll` icon, `escAttr` for IDs, `formatRelativeTime` for dates. Added `restoreApocryphon` and `permanentDeleteApocryphon` handlers in start.js following exact canon/chapter patterns (WAL entries, confirm dialog for permanent delete, toast, re-render).

### TODO 5 — canon_updates in snippet pipeline (code fix)
**Source chapter:** phase-4-polish (canon-0009 supersession)
**Resolution:** Added `canon_updates` to the snippet format. Format: `[{ "id": "canon-NNNN-slug", "patch": { ... } }]`. Preview validates target existence. Import calls `store.updateCanon(cu.id, cu.patch)`. Toast counter added. The canon-0009 fix itself is delivered via the session snippet.

---

## Files Modified

| File | Lines | Delta | Changes |
|---|---|---|---|
| views.js | 1,497 | +17 | renderStorageUsage prefix scan, renderTrashView apocrypha section |
| forms.js | 746 | +21 | canon_updates preview + import + toast counter |
| start.js | 743 | +13 | restoreApocryphon + permanentDeleteApocryphon handlers |
| CODEX_QUICK_REFERENCE.md | — | — | Font tokens, KEYS, routes, snippet format, store API, build phases |

**Unchanged:** data.js, seed.js, core.js, styles.css, template.html, build.sh

---

## Codebase State

- **Total build:** 5,248 lines (codex.html), up from 5,195 (+53)
- **Split files:** 8 modules, concat order unchanged
- **All syntax checks pass**, all data-actions wired, 0 QA bugs

---

## QA Audit Summary (3 rounds, 0 bugs)

| Round | Scope | Result |
|---|---|---|
| 1 | Syntax check (node -c) all 6 JS files | All pass |
| 2 | data-action wiring audit | All used actions handled in start.js |
| 3 | Logic review of each TODO fix | Patterns match existing code, WAL entity types correct |

---

## Deploy Instructions

```bash
cd ~/codex
unzip -o ~/storage/downloads/codex-todofix.zip
git --no-pager add -A
git --no-pager commit -m "TODO cleanup: storage view, trash apocrypha, docs reconciliation"
git push
```

After deploy: import session snippet via Settings → Import Snippet. The snippet includes the canon-0009 supersession fix via `canon_updates`.
