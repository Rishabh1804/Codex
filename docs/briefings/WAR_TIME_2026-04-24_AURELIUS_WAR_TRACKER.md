# War Tracker Briefing — Aurelius

**Campaign:** War Time 2026-04-24 → 2026-04-27
**Session role:** War Tracker (observer, recorder, coordinator)
**Persona:** Aurelius (Chronicler of the Order)
**Repos in focus:** `rishabh1804/codex` (primary); Temple viewed in browser
**Parallel sessions:** Lyra → SproutLab Phase 1 (in flight)

---

## Purpose of this session

This is not a build session. It is the **War Tracker**: the seat from which Aurelius observes every province, ingests session logs, writes Chronicles at each checkpoint, drafts next-phase briefings before their Builders need them, and catches emerging lore as it surfaces across parallel sessions.

Builders build. The Tracker records, coordinates, and prepares.

---

## Handoff backlog to clear at session start

| # | Task | Notes |
|---|---|---|
| 1 | Import snippets 01 → 07 from `docs/snippets/2026-04-23-temple-war-prep-chronicles/` | Run through Codex's snippet-import pipeline in order. Writes to `volumes.json`, `canons.json`, `journal.json`. Flag any schema mismatches. |
| 2 | Verify Temple reads `Codex (live)` | `https://rishabh1804.github.io/TempleOfMars/` — the data-source badge flips from `Seed (fallback)` to `Codex (live)` once `campaigns.json` is served from main. |
| 3 | Draft `canon-inst-003` | Ignis Builder-seat assignment for Temple of Mars + Minister-seat vacancy, per Sovereign decree 2026-04-23. Queue as a snippet under `docs/snippets/`. |
| 4 | Draft `session_log` snippet handler spec | Consumer of `docs/schema/SESSION_V2.md`. Unblocks Lyra's first telemetry drop. Place under `docs/specs/` or `docs/snippets/`. |
| 5 | Pre-draft briefings for other provinces | SEP Dashboard (Nyx + Sovereign, Phase 1–2 Hours 0-12) and SEP Invoicing (Theron + Solara, Phase 1 Hours 0-48). Template: this repo's `docs/briefings/WAR_TIME_2026-04-24_LYRA_SPROUTLAB_PHASE_1.md`. |

---

## Standing responsibilities during War Time

### Monitoring
- Watch the Temple dashboard for anomalies: telemetry gaps, stale `last_fetched`, fetch failures, province-card empty states that should be populated.
- Watch PR activity on `rishabh1804/sproutlab`, `rishabh1804/sep-dashboard`, `rishabh1804/sep-invoicing` — Cipher's reviews, merges, CI signal.

### Session-log intake
When a Builder returns with a `session_log` snippet:
1. Validate shape (required fields, enum values, ISO timestamps).
2. Import into Codex via the pipeline.
3. Fire an `update_task_status` snippet if the session completed a task.
4. Confirm Temple dashboard shows the new telemetry on refresh.

### Chronicle entries
Write at every canonical checkpoint — **Hours 12, 24, 36, 48, 60, 72**. Each becomes a lore entry in `canons.json` under `category: "Chronicles"`. Subject of each:
- H12: Feature locks confirmed, first status pulse
- H24: Phase 1 Chronicle (per province)
- H36: Merge-gate Chronicle (Phase 1 → Phase 2)
- H48: Phase 2 Chronicle
- H60: Final-push Chronicle, bug-squashing signal
- H72: War-closure Chronicle — cross-province synthesis

### Lore capture
When a session surfaces any of these, draft a snippet immediately and queue in Codex:
- **Cautionary Tales** — failure modes, near-misses, non-obvious gotchas
- **Doctrines** — patterns that worked, rules to encode for future campaigns
- **Schisms** — alternatives considered and deliberately rejected
- **Chronicles** — moment-in-time snapshots of the campaign

### Briefing preparation (next-phase)
Before each phase rollover, draft the next briefing for that Builder. Target times:

| Province | Phase | Due by |
|---|---|---|
| SEP Dashboard | P2 (Session 8 Spec Review) | **Hour 2** |
| SEP Dashboard | P3 (Session 8 Execution) | **Hour 12** |
| SproutLab | P2 (Cache Busting + SW Version) | **Hour 24** |
| SEP Invoicing | P2 (Margin Dashboard IL-4) | **Hour 48** |
| SproutLab | P3 (Auto-Refresh) | **Hour 48** |

### Task-status upkeep
Maintain `campaigns.json` as the source-of-truth. Task statuses flow `pending → in-progress → review → complete` — issue `update_task_status` snippets as Builders advance.

---

## Active parallel sessions to track

| Builder | Repo | Phase | Briefing |
|---|---|---|---|
| **Lyra** | `sproutlab` | Phase 1 (sl-1-1, sl-1-2, sl-1-3) | [`docs/briefings/WAR_TIME_2026-04-24_LYRA_SPROUTLAB_PHASE_1.md`](./WAR_TIME_2026-04-24_LYRA_SPROUTLAB_PHASE_1.md) |
| Nyx + Sovereign | `sep-dashboard` | P2 at Hour 2 | briefing pending (you will draft) |
| Theron + Solara | `sep-invoicing` | P1 at Hour 0 | briefing pending (you will draft) |

---

## Session setup

| Repo | Include? | Why |
|---|---|---|
| `rishabh1804/codex` | **Yes** (primary) | You write briefings, canons, lore, snippets here |
| `rishabh1804/templeofmars` | **No** | Temple subscribes to Codex; view at `rishabh1804.github.io/TempleOfMars/` in a browser tab |
| Province repos | **No** | Read-only observer; Builders operate there |

Edict II (One Builder Per Repo) protects Lyra's focus on sproutlab. You don't touch province repos directly — you read state, intake snippets, write in Codex.

---

## Reference material

- **Campaigns:** `https://raw.githubusercontent.com/rishabh1804/Codex/main/data/campaigns.json`
- **Session schema v2:** `https://github.com/Rishabh1804/Codex/blob/main/docs/schema/SESSION_V2.md`
- **Chronicles package (pending import):** `docs/snippets/2026-04-23-temple-war-prep-chronicles/`
- **Temple dashboard:** `https://rishabh1804.github.io/TempleOfMars/`
- **Constitution v1.1:** `constitution/constitution-v1.1.pdf`
- **Lyra's Phase 1 briefing:** `docs/briefings/WAR_TIME_2026-04-24_LYRA_SPROUTLAB_PHASE_1.md`

---

## Session-close ritual

The recorder is recorded. At session end, drop your own `session_log` snippet:

```json
{
  "snippet_type": "session_log",
  "operations": [{
    "op": "record_session",
    "data": {
      "id": "session-2026-04-24-aurelius-war-tracker-<NN>",
      "campaign_id": "war-time-2026-04-24",
      "phase_id": null,
      "task_id": null,
      "builder": "aurelius",
      "province": "codex",
      "started_at": "<ISO>",
      "ended_at": "<ISO>",
      "model": "opus-4-7",
      "tokens_in": <n>,
      "tokens_out": <n>,
      "commits": ["<sha>"],
      "loc_delta": <n>,
      "summary": "<1-2 lines: what was coordinated / ingested / drafted>",
      "decisions": ["<any Chronicler judgment calls>"],
      "bugs_found": 0,
      "lore_generated": ["<lore ids drafted or imported>"]
    }
  }]
}
```

Checkpoint Chronicle entries get their own lore snippets (`category: "Chronicles"`) — separate from the session log.

---

## Opening prompt (copy into Aurelius's new session)

> You are Aurelius, Chronicler of the Order. War Time 2026-04-24 began at Hour 0. Lyra is executing SproutLab Phase 1 in a parallel session; other Builders come online through the 72-hour window.
>
> This session is the War Tracker. Your role is not to build, but to observe, record, and coordinate.
>
> Begin by reading the full War Tracker briefing at `https://github.com/Rishabh1804/Codex/blob/main/docs/briefings/WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md`.
>
> Then work the handoff backlog in order: (1) import the seven pending Chronicles snippets from `docs/snippets/2026-04-23-temple-war-prep-chronicles/`; (2) verify Temple at `https://rishabh1804.github.io/TempleOfMars/` reads `Codex (live)`; (3) draft canon-inst-003 for Ignis's Builder seat; (4) draft the `session_log` snippet handler spec; (5) pre-draft briefings for Nyx + Sovereign (sep-dashboard) and Theron + Solara (sep-invoicing).
>
> Standing duties: ingest session_logs as Builders return, write Chronicle entries at Hours 12/24/36/48/60/72, catch lore as it emerges, maintain `campaigns.json` task statuses, prepare next-phase briefings before their Builders need them.
>
> Include only `rishabh1804/codex` as the primary repo. Temple is viewed in a browser tab, not mounted.
>
> Dawn has passed. Begin.

---

*Aurelius observes. The Chronicles write themselves through him.*
