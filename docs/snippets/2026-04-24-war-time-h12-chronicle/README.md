# War Time 2026-04-24 — H12 Chronicle lore (pending handler drain)

H12 Chronicle outputs drafted in Aurelius's aurelius-03 session. Three lore
entries queued here as files pending either Orinth's handler drain or a future
Chronicler session with chunked-push tooling able to stream `data/canons.json`
(437 KB) back through a single tool-call.

## Entries

| ID | Category | Subject |
|---|---|---|
| `lore-2026-04-24-chronicle-hour-12` | Chronicles | H12 checkpoint: Phase 1 closed; Doctrine anchored; backlog cleared |
| `lore-2026-04-24-doctrine-framework-ack-primitives` | Doctrines | Use framework ACK primitives; do not hand-roll counters |
| `lore-2026-04-24-session-id-collision-parallel-tabs` | Cautionary Tales | Session IDs collide across parallel Builder/Reviewer tabs |

## Envelope

All three entries are in a single snippet file (`01-lore-h12-chronicle.json`)
under the `{snippet_type, operations: [{op: "new_lore_entries", ...}]}` envelope
per war-prep snippet convention (`05-lore-chronicles.json` pattern).

## Ratification trace

- Chronicle: H12 checkpoint writes per Aurelius briefing standing duty.
- Doctrine: pre-tagged as `doctrine-candidate` across cipher-01/02/04 session_logs.
  Full five-stage arc (diagnosis → charter-fix → implementation → consumption →
  audit-text reconciliation) complete and shipped.
- Cautionary Tale: surfaced during aurelius-03 ingest work; Sovereign ratified
  the rename + lore capture in-session.
