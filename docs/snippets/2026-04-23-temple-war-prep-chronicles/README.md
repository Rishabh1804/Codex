# 2026-04-23 — Temple War-Prep Chronicles

Snippet package drafted by Aurelius (Chronicler) for the pre-dawn work session of 2026-04-23, covering:

1. Pre-war housekeeping (SproutLab cruft purge, SEP Dashboard v2.1 restore verification, PR #19 disposition)
2. Temple of Mars founding (charter, stack selection, v0.1 scaffold, deploy fire-drill)
3. Codex integration (`data/campaigns.json`, Session v2 schema, `session_log` snippet type)

Pillar I — Nothing Is Wasted. Every decision, every constraint, every rejected alternative is recorded here for future synthesis.

## Import order

Snippets are numbered in the order they should be applied. Each is a self-contained `snippet_type` + `operations` block per Codex's existing pipeline.

| # | File | Writes to | Purpose |
|---|---|---|---|
| 01 | `01-volume-temple-of-mars.json` | `data/volumes.json` | New Volume: Temple of Mars |
| 02 | `02-chapters.json` | `data/volumes.json` (chapters[]) | 12 chapters under the Temple Volume |
| 03 | `03-lore-cautionary-tales.json` | `data/canons.json` (lore[]) | 7 Cautionary Tales |
| 04 | `04-lore-doctrines.json` | `data/canons.json` (lore[]) | 7 Doctrines |
| 05 | `05-lore-chronicles.json` | `data/canons.json` (lore[]) | 2 Chronicles |
| 06 | `06-schisms.json` | `data/canons.json` (schisms[]) | 9 Schisms (rejected alternatives) |
| 07 | `07-session-log.json` | `data/journal.json` (sessions[]) | 1 Session record |

## Summary of the session

- **Duration:** 2026-04-23 (pre-dawn, within 24h of War Time Hour 0)
- **Driver:** Aurelius (Chronicler), on behalf of the Sovereign
- **Volumes touched:** `sproutlab`, `sep-dashboard`, `codex`, `temple-of-mars`
- **Decisions ratified:** 15 (see session log)
- **PRs landed:** SproutLab #2, Codex #20, TempleOfMars #1/#2/#3/#4
- **Outcome:** Temple of Mars v0.1 live at `https://rishabh1804.github.io/TempleOfMars/` with Codex-backed telemetry, ready for War Time Hour 0.

## What the Sovereign should do

1. Review each snippet file — adjust IDs, titles, or wording as needed.
2. Run snippets 01 → 07 through Codex's existing snippet-import pipeline.
3. Verify `volumes.json`, `canons.json`, `journal.json` contain the new entries.
4. Canon entry for Ignis's Builder-seat reassignment (vacating Minister seat per Sovereign decree 2026-04-23) is noted in chapter `ch-ignis-canon-entry` and remains queued — formal canon-inst-* classification reserved for Sovereign hand.

---

*Codex is the territory. The map is already drawn. These snippets are the ink.*
