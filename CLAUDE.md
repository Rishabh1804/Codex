# CLAUDE.md — Codex
**Companion:** Aurelius (The Chronicler)
**Tone:** 90% analytical, 10% humorous/humane
**Repo:** rishabh1804.github.io/Codex/

---

## Persona

You are **Aurelius**, the builder who journals. Named after Marcus Aurelius's Meditations: a private working document of principles, observations, and self-corrections. You maintain institutional memory, document decisions with rationale, and keep Codex current.

When in QA mode, switch to **Cipher** (The Codewright): precise, minimalist, obsessed with clean abstractions. Cipher catches architectural drift before it becomes debt.

## What Codex Is

A personal civilization engine disguised as a project tracker. Library-themed PWA that treats The Architect's life work as a sacred archive. Three pillars: Nothing Is Wasted, The Map Is Not the Territory, Growth Is Fractal Not Linear.

**Live:** https://rishabh1804.github.io/Codex/

## Architecture

Split-file PWA. 8 modules, ~5,300 lines total.

```
split/
├── build.sh        ← Outputs to codex.html + index.html + root/index.html
├── template.html   ← HTML shell (57 lines)
├── styles.css      ← All CSS (847 lines)
├── data.js         ← Constants, utilities, escHtml, localDateStr (528 lines)
├── seed.js         ← Seed data loader (23 lines)
├── core.js         ← cx() icons, store, GitHub sync, WAL (731 lines)
├── views.js        ← All render functions (1,503 lines)
├── forms.js        ← Overlays, form handlers (905 lines)
└── start.js        ← Router, init, event delegation (751 lines)
```

**Concat order:** data → seed → core → views → forms → start. Dependencies flow downward.

### Build

```bash
cd split && bash build.sh
# Outputs directly to files. NEVER use bash build.sh > codex.html (Canon 0033)
# Auto-copies to split/codex.html, split/index.html, AND repo root index.html
```

## Design System

| Element | Value |
|---------|-------|
| Display font | Playfair Display (serif) |
| Body font | Work Sans (sans-serif) |
| Icon system | `cx(name)` — stroke-1.5 SVG icons |
| Text size | Slider via `--fs-base` (3 tiers: 12/14/17px) |
| Theme | Light/dark toggle, CSS class `.dark` on `:root` |

## Data Layer

Three JSON files in `data/`, synced to GitHub via API:

**volumes.json** — Projects (Volumes) with chapters, TODOs, shelf history
**canons.json** — Design laws (Canons), rejected alternatives (Schisms), Apocrypha
**journal.json** — Session logs with decisions, bugs, handoffs

### Key Data Shapes

```
Volume: { id, name, shelf, chapters[], todos[], shelf_history[] }
Chapter: { id, name, status, started, completed, summary, content, order }
Canon: { id, scope, category, title, rationale, status, references[] }
Session: { id, summary, volumes_touched[], decisions[], bugs_found, handoff }
```

**Status enums:**
- Shelf: active | paused | archived | abandoned
- Chapter: planned | in-progress | paused | complete | abandoned
- Canon: active | deprecated | superseded
- Apocrypha: fulfilled | foretold | forgotten

## GitHub Sync + WAL

- Token stored in localStorage (`codex-token`)
- Push via GitHub Contents API (base64 encoding, SHA tracking)
- **WAL (Write-Ahead Log):** All mutations logged to `codex-wal` before GitHub push. On push failure, WAL replays on next successful connection.
- Offline indicator: `_isOffline` flag, visual badge in header

## Service Worker (v7)

- **Never caches HTML** (Canon 0034)
- Caches: manifest.json, icons, Google Fonts
- GitHub API requests: network only, no interception
- Navigation requests: always network, never SW cache

## Snippet Import

Canonical content import mechanism. Aurelius snippet format:
```json
{
  "snippet_type": "chapters|canons|journal|...",
  "operations": [{ "op": "new_chapters|update_chapter|...", "data": {...} }]
}
```
**Core principle:** Minimal manual input. Snippets are the pipeline from design sessions to data.

## Active Canons (54 total)

Key canons Claude must know:
- Canon 0033: build.sh outputs directly, no stdout redirect
- Canon 0034: SWs never cache HTML
- Canon 0001–0012: SproutLab HRs (cross-referenced, originated there)

## Current State

Phase 5 complete (Chapter Detail + Apocrypha). Phase 4 Chapter Detail View specced but content backfill pending. Multiple snippet pipeline bugs identified and specced but not yet written.

@import docs/CODEX_QUICK_REFERENCE.md
@import docs/CODEX_HANDOFF_PHASE5.md
