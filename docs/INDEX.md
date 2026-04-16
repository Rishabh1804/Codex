# Codex docs/ — Index

**Province:** Codex (Ostia) · **Maintained by:** Aurelius · **Last reorganized:** 16 April 2026

This directory holds reference material, session artifacts, and import
pipelines for the Codex data layer. It is NOT the data itself — the
canonical data lives in `data/` (canons.json, volumes.json, companions.json).
Files here are either source material for imports, historical handoffs,
or rendered documents.

---

## Directory structure

```
docs/
├── INDEX.md              ← you are here
├── handoffs/             ← session continuity documents
├── specs/                ← feature specifications and references
├── pdfs/                 ← rendered documents (Constitution, Dissertation, Working Papers)
├── snippets/             ← Aurelius snippets for import into Codex
├── chapters/             ← chapter backfill JSONs (content for volumes.json)
└── apocrypha/            ← expanded apocrypha narrative source JSONs
```

---

## handoffs/

Session handoff documents. Each captures the state at session close so
the next session (which may have no memory of the prior) can resume
without loss. Upload the relevant handoff at the start of a session.

| File | Session | Content |
|------|---------|---------|
| CODEX_HANDOFF_PHASE4.md | Phase 4 close | Chapter Detail View spec, snippet pipeline state |
| CODEX_HANDOFF_PHASE5.md | Phase 5 close | Apocrypha, Schisms, auto-migration, 7 chapter narratives |
| CODEX_HANDOFF_TODO_CLEANUP.md | TODO Cleanup session | Stale phases, governance snippets, BN items |

---

## specs/

Feature specifications and quick references. These describe what was
built (or is to be built) and why.

| File | Content |
|------|---------|
| CODEX_CHAPTER_DETAIL_SPEC.md | Chapter Detail View — prose rendering, linked entities, prev/next |
| CODEX_QUICK_REFERENCE.md | Architecture overview, data shapes, build pipeline, design decisions |

---

## pdfs/

Rendered documents. These are build artifacts from Typst source (per
canon-cc-001: Typst source is canonical, PDFs are convenience renders).
The Typst source lives in `constitution/`.

| File | Content |
|------|---------|
| codex-constitution-v1.0.pdf | Constitution of the Republic, Books I–IX |
| codex-dissertation.pdf | RPG Design Dissertation v1.0 (57 pages, seed document) |
| codex-session-01-delivered-work.pdf | Phase 1 session deliverable summary |
| codex-working-papers-v1.pdf | Working Papers Volume I |

---

## snippets/

Aurelius-format JSON snippets for import into Codex via Settings →
Import Aurelius Snippet. All snippets use the **flat format** required
by the live importer (`_snippet_version: 1` at top level, data arrays
at top level). The `snippet_type` + `operations` wrapper format is NOT
supported by the current importer.

Import flow: paste snippet JSON → Preview (check marks) → Import →
data writes to WAL → sync pushes to GitHub.

| File | Date | Content |
|------|------|---------|
| snippet-2026-04-14-cleanup.json | 14 Apr | Cleanup session: canon updates, chapter updates |
| snippet-2026-04-14-sproutlab-backfill.json | 14 Apr | SproutLab chapter backfill (13 chapters) |
| snippet-2026-04-14-todo-cleanup.json | 14 Apr | TODO resolutions |
| snippet-2026-04-15-bn-cleanup.json | 15 Apr | BN item cleanup + phase updates |
| snippet-batch-1.json | various | Batch import 1 |
| snippet-batch-2.json | various | Batch import 2 |
| snippet-batch-3.json | various | Batch import 3 |
| snippet-batch-4.json | various | Batch import 4 |
| snippet-canon-lessons.json | various | Canon lessons learned |
| snippet-2026-04-16-session-canons-all.json | 16 Apr | 15 canons from CC Foundation session |
| snippet-2026-04-16-naming-convention.json | 16 Apr | Canon naming convention (canon-0052) |
| snippet-2026-04-16-founding-of-the-capital.json | 16 Apr | Lore: The Founding of the Capital |

**Removed (16 Apr 2026):** 3 governance snippets using wrong wrapper
format + 1 superseded deploy-canons snippet. Content was already
imported via other paths.

---

## chapters/

Chapter backfill JSONs. Each file contains narrative content for one
or more SproutLab/Codex chapters, formatted for import via the
`new_chapters` snippet operation. These were the source material for
populating chapter detail views with prose narratives.

| File | Volume | Chapters |
|------|--------|----------|
| ch01-v1v2.json | sproutlab | Phase 1+2 combined |
| ch02-diet.json | sproutlab | Diet Intelligence |
| ch03-medical.json | sproutlab | Medical Intelligence |
| ch04-intelligence.json | sproutlab | ISL + scoring |
| ch05-smartqa.json | sproutlab | Smart Q&A |
| ch06-designprinciples.json | sproutlab | Design Principles |
| ch07-searchbar.json | sproutlab | Search Bar |
| ch08-migrations.json | sproutlab | Migrations M1–M3 |
| ch09-crossdomain.json | sproutlab | Cross-Domain Intelligence |
| ch10-todaysofar.json | sproutlab | Today So Far |
| ch11-caretickets.json | sproutlab | CareTickets |
| ch12-architecturesplit.json | sproutlab | Architecture Split |
| ch13-bugcapture.json | sproutlab | Bug Capture System |
| ch14-codex-todo.json | codex | Codex TODO Cleanup |

---

## apocrypha/

Expanded apocrypha narrative source files. These contain the dramatic
retellings used to populate Codex's Apocrypha section. v2 files are
revisions of the originals; "expanded" files are longer narrative
versions.

| File | Apocryphon | Status |
|------|-----------|--------|
| apo-expanded-machine-remembers.json | The Machine That Remembers | foretold |
| apo-expanded-predictive-engine.json | The Predictive Engine | foretold |
| apo-expanded-second-child.json | The Second Child | foretold |
| apo-machine-remembers-v2.json | The Machine That Remembers (v2) | foretold |
| apo-predictive-engine-v2.json | The Predictive Engine (v2) | foretold |
| apo-second-child-v2.json | The Second Child (v2) | foretold |
| apo-thirteen-scrolls.json | The Thirteen Scrolls | fulfilled |

---

## For future sessions

When starting a Codex session, check:

1. **Handoff doc** — upload the most recent `handoffs/CODEX_HANDOFF_*.md`
   for context on where the last session left off.
2. **Quick reference** — `specs/CODEX_QUICK_REFERENCE.md` has architecture,
   data shapes, and build pipeline.
3. **Snippet format** — if producing snippets, use the flat format.
   Reference any file in `snippets/` for the shape. Do NOT use the
   `snippet_type` + `operations` wrapper.
4. **PDFs** — if the Constitution or Dissertation is needed, they're in
   `pdfs/`. But remember: Typst source in `constitution/` is canonical
   (canon-cc-001).
