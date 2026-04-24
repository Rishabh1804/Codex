# Session Schema v2 — Campaign Telemetry Extension

**Status:** Draft (pending ratification)
**Declared:** 2026-04-23 by Sovereign decree
**Consumer:** Temple of Mars (Watchtower, sister to Command Center)
**Mirror:** [`templeofmars/docs/SCHEMA.md`](https://github.com/Rishabh1804/TempleOfMars/blob/main/docs/SCHEMA.md)

---

## Why

Temple of Mars observes campaign-level telemetry (sessions, tokens, cost, velocity) aggregated from Codex's session log. The existing Session schema in `journal.json` lacked campaign linkage and cost fields. This document declares the v2 extension.

## Backwards compatibility

**Non-breaking.** All new fields are optional. Existing sessions render unchanged. Temple degrades to zero-contribution aggregates for sessions missing campaign fields.

## Extended Session (`journal.json`)

```jsonc
{
  // EXISTING
  "id": "session-2026-04-23-aurelius-01",
  "summary": "Temple scaffold",
  "volumes_touched": ["temple-of-mars"],
  "decisions": ["Adopt Stack B (SvelteKit)"],
  "bugs_found": 0,
  "handoff": "Ignis takes builder seat Hour 0",

  // NEW — campaign linkage
  "campaign_id": "war-time-2026-04-24",
  "phase_id": "sproutlab-phase-1",
  "task_id": "sl-1-2",
  "builder": "lyra",
  "province": "sproutlab",

  // NEW — wall-clock
  "started_at": "2026-04-24T02:30:00Z",
  "ended_at": "2026-04-24T04:15:00Z",

  // NEW — tokens + model (for cost derivation)
  "model": "opus-4-7",
  "tokens_in": 125000,
  "tokens_out": 18500,

  // NEW — git outputs (auto-derivable)
  "commits": ["abc1234", "def5678"],
  "loc_delta": 234,

  // NEW — lore trail
  "lore_generated": ["lore-xyz"]
}
```

## Enums

- `builder`: lyra | nyx | sovereign | theron | solara | cipher | aurelius | orinth | ignis | rune | maren | kael
- `province`: sproutlab | sep-dashboard | sep-invoicing | codex | command-center
- `model`: opus-4-7 | opus-4-6 | sonnet-4-6 | haiku-4-5 | other

## `session_log` snippet type

New snippet type in the import pipeline. Full operation catalog in the Temple schema mirror.

- `record_session` — writes a complete session record; dedupes by `id`.
- `update_task_status` — advances a task's status in `campaigns.json`. Accepts: pending | in-progress | review | complete | blocked.
- `log_blocker` — optional Priority 3 capture for post-war Cautionary Tale synthesis. Attaches to a session.

## Pricing table

USD per 1M tokens. Reconcile quarterly against Anthropic public rates.

| Model | Input | Output |
|---|---|---|
| opus-4-7 | 15 | 75 |
| opus-4-6 | 15 | 75 |
| sonnet-4-6 | 3 | 15 |
| haiku-4-5 | 1 | 5 |

## Ratification path

1. Schema mirror in Temple repo (shipped alongside this doc)
2. `session_log` snippet handler implementation in Codex import pipeline (next PR)
3. First War Time session logs → validates end-to-end
4. Canon entry promoting v2 to stable schema (post-War, after validation)

---

*Codex is the territory. Temple is the map. This schema is the contract between them.*
