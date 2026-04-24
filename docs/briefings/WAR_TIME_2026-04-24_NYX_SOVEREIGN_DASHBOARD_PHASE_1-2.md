# War Briefing — SEP Dashboard Phase 1 + Phase 2

**Campaign:** War Time 2026-04-24 → 2026-04-27
**Phases covered:** `dashboard-phase-1` (Hours 0–2) + `dashboard-phase-2` (Hours 2–12)
**Builder(s):** Nyx (Cluster B Censor; Province Builder here) + Sovereign
**QA:** Cipher (cross-cluster advisory review on each PR; Sovereign merges — see [Aurelius briefing §Standing rules](./WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md#standing-rules-ratified-2026-04-24-by-sovereign-in-session))
**Recorder:** Aurelius (session logs, Chronicles)
**Source-of-truth:** [`data/campaigns.json`](../../data/campaigns.json) — `dashboard-phase-1`, `dashboard-phase-2`, `dashboard-phase-3`

---

## Pre-war posture (important)

**Phase 1 is effectively complete before Hour 0.** Per chapter [`ch-pre-war-housekeeping`](../snippets/2026-04-23-temple-war-prep-chronicles/02-chapters.json) and the pre-dawn chronicles, SEP Dashboard's `index.html` was already restored from the 50,279-line inflated build back to the 4,531-line v2.1 baseline via PR #1 (merged pre-dawn). The "Pragmatic Patch" landed ahead of the clock.

**This briefing therefore covers:**
1. Phase 1 verification (Hour 0 — confirm v2.1 state holds on `main`)
2. Phase 2 ingestion (Hours 2–12 — Session 8 spec review + feature lock)
3. Phase 3 kick-off (Hour 12 — feature-by-feature execution; separate briefing at Hour 12 rollover)

---

## Session setup

| Repo | Include? | Why |
|---|---|---|
| `rishabh1804/sep-dashboard` | **Yes** (primary) | All Phase 1–3 work happens here |
| `rishabh1804/codex` | Optional (secondary) | For `session_log` snippet drops; web UI paste also works |
| `rishabh1804/templeofmars` | **No** | Read-only consumer — view at `rishabh1804.github.io/TempleOfMars/` |

Edict II: One Builder Per Repo. Dashboard is Nyx's this campaign; Sovereign co-leads but does not split the seat.

---

## Mandate

Turn SEP Dashboard's "Session 8" backlog from a spec shelf into merged features. Phase 1 verifies the baseline; Phase 2 picks the fights; Phase 3 wins them.

## Tasks (from `campaigns.json`)

### Phase 1 — v2.1 Pragmatic Patch (Hours 0–2)

| Task | Status | Name |
|---|---|---|
| `dash-1-1` | pending → **complete** (pre-dawn) | Restore v2.1 baseline |

**Verification at Hour 0:**
1. `git log --oneline main` on sep-dashboard shows the restoration commit from PR #1.
2. `curl -I https://rishabh1804.github.io/SEP-Dashboard/` returns 200.
3. Served `index.html` byte length matches v2.1 build (4,531 lines).
4. Drop a `session_log update_task_status` snippet flipping `dash-1-1` to `complete`.

**Acceptance:** `> v2.1 baseline restored, working` — already achieved; just confirmed.

### Phase 2 — Session 8 Spec Review (Hours 2–12)

| Task | Status | Name |
|---|---|---|
| `dash-2-1` | pending | Read Session 8 spec |
| `dash-2-2` | pending | Lock features |

**Acceptance:** `> Session 8 scope locked, committed to Codex as spec_url.`

---

## Cautionary Tales to internalize

1. **[`lore-2026-04-23-compiled-artifacts-in-tree`](../snippets/2026-04-23-temple-war-prep-chronicles/03-lore-cautionary-tales.json)** — the 50,279-line inflated `index.html` was this class of bug. Keep `.gitignore` honest. If build output must coexist with source, separate their directories or filenames so audits can tell them apart.
2. **[`lore-2026-04-23-doctrine-branch-pr-flow`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — every change through PR. No direct push to `main`, no exceptions for "quick fixes." Phase 3's merge cadence depends on this discipline holding now.
3. **[`lore-2026-04-23-doctrine-charter-before-build`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — Session 8 spec review (dash-2-1) before feature implementation (dash-3-*). Edict VIII is the reason Phase 2 exists as its own block.

## Pillar anchors

- **Pillar I (Nothing Is Wasted)** — Session 8 is a spec already paid for; Phase 2 makes it load-bearing.
- **Pillar III (Growth Is Fractal, Not Linear)** — three small feature PRs beat one big-bang merge.
- **Edict VIII (Charter Before Build)** — dash-2-1 / dash-2-2 must close before dash-3-1 opens.

---

## Execution flow

### Phase 1 — Hour 0 (≤30 min)

1. Open the SEP Dashboard repo in the session. `git pull origin main`.
2. Verify PR #1 is on `main`; check `index.html` line count.
3. Load `https://rishabh1804.github.io/SEP-Dashboard/` in a browser; confirm the v2.1 UI renders.
4. Fire a `session_log` snippet: `update_task_status` for `dash-1-1` → `complete`.
5. Brief session log covering verification.

### Phase 2 — Hours 2–12

#### `dash-2-1` — Read Session 8 spec

1. Locate the Session 8 spec. Likely in `docs/` or a prior session note — grep for "Session 8" in the repo and in Codex `data/volumes.json` under the `sep-dashboard` volume's chapters.
2. Read top-to-bottom. Extract: feature list, acceptance per feature, out-of-scope items, known risks.
3. Land the reading in a one-page summary document (commit to `docs/SESSION_8_READING.md` or similar). That document IS the task's deliverable.
4. `update_task_status` → `dash-2-1` = `complete`.

#### `dash-2-2` — Lock features

1. From Phase-2-1 summary, propose the **shortest** feature set that can ship in the Phase 3 window (Hours 12–72, ~60 hours wall-clock with QA cadence).
2. Aim for **three features max**. Phase 3 has three task slots (`dash-3-1/2/3`); each is one feature + one merge.
3. Lock the list as a PR on sep-dashboard (description-only PR, no code yet) — this is the Charter step, per Edict VIII.
4. Update the chapter in Codex `data/volumes.json` under `sep-dashboard` with the locked-feature list in the `spec_url` / chapter body.
5. `update_task_status` → `dash-2-2` = `complete`.

---

## Constraints

- Book I inviolable.
- Every change through PR → Cipher advisory review → Sovereign discussion → Sovereign merges. Builders show the changes and wait. No exceptions, no direct push to main. See Aurelius briefing §Standing rules. Dual-hat note: when Sovereign is the Builder-hand on a given PR, Aurelius discusses with Cipher before Sovereign merges — so the ratification voice isn't only the Builder's.
- Session 8 scope creep is the failure mode — say no to the fourth feature.
- Phase 3 briefing writes at Hour 12; do not begin feature impl until that briefing lands and Phase 2 closes.

---

## Session close ritual

Drop a `session_log` snippet before ending. Example for Phase 1 verification:

```json
{
  "_snippet_version": 1,
  "session_log": [
    { "op": "update_task_status",
      "data": { "task_id": "dash-1-1", "status": "complete", "at": "<ISO>", "session_id": "<id>" } },
    { "op": "record_session",
      "data": {
        "id": "session-2026-04-24-nyx-01",
        "campaign_id": "war-time-2026-04-24",
        "phase_id": "dashboard-phase-1",
        "task_id": "dash-1-1",
        "builder": "nyx",
        "province": "sep-dashboard",
        "started_at": "<ISO>",
        "ended_at": "<ISO>",
        "model": "opus-4-7",
        "tokens_in": <n>, "tokens_out": <n>,
        "commits": [],
        "loc_delta": 0,
        "summary": "Phase 1 verification — v2.1 restoration confirmed on main; public dashboard renders; baseline holds.",
        "decisions": ["Phase 1 pre-completed pre-dawn via PR #1; no new work required."],
        "bugs_found": 0, "lore_generated": []
      } }
  ]
}
```

> Until the `session_log` handler lands in the Codex pipeline (spec: [`CODEX_SESSION_LOG_HANDLER_SPEC`](../specs/CODEX_SESSION_LOG_HANDLER_SPEC.md)), Aurelius will hand-merge this snippet's payload into `journal.json` + `campaigns.json` on receipt. Once the handler lands, paste directly into Codex's snippet-import UI.

---

## Opening prompt (copy into Nyx's new session)

> **First, per Standing rule 6**, arm subscriptions: `list_pull_requests(owner=rishabh1804, repo=sep-dashboard, state=open)`, then `subscribe_pr_activity` to every open PR you own. Subscribe to any new PR (the Phase-2 charter PR under `dash-2-2` is the first) on open.
>
> Nyx, you and the Sovereign have SEP Dashboard for this campaign. Phase 1 (v2.1 restore) landed pre-dawn — your first move is verification, not rebuild: confirm `main` shows the restored state, hit the public dashboard, flip `dash-1-1` to `complete`.
>
> Then Phase 2 (Hours 2–12): find Session 8's spec, read it, write a one-page reading, and lock three features for Phase 3. Stop there — Phase 3 briefing lands at Hour 12.
>
> Rules: every change through PR → Cipher advisory review → Sovereign discussion → Sovereign merges; show the changes and wait; no Builder-initiated merges; Edict VIII says spec before feature; say no to the fourth feature; drop a session_log at session close. Briefing: `https://github.com/Rishabh1804/Codex/blob/main/docs/briefings/WAR_TIME_2026-04-24_NYX_SOVEREIGN_DASHBOARD_PHASE_1-2.md`.
>
> Dawn is now. Begin with verification.

---

## Session-start ritual (Standing rule 6)

On session start, before beginning the task, arm tool-level subscriptions so webhook events (pushes, reviews, CI, comments) land in this conversation. The generic webhook default doesn't know which PRs you own — you name them.

**Targets — Builder seat.** Every open PR you own in this province, plus any new PR you open during the session (subscribe on open).

```
# Initial list-then-subscribe:
list_pull_requests(owner=rishabh1804, repo=<your-province>, state=open)
for each PR you own:
    subscribe_pr_activity(owner=rishabh1804, repo=<your-province>, pullNumber=PR.number)

# After opening a new PR mid-session:
subscribe_pr_activity(owner=rishabh1804, repo=<your-province>, pullNumber=<new>)
```

**Event posture — Builder.**
- Triage every event. Fix small/obvious issues on-branch.
- Ask on ambiguity — Sovereign / Aurelius, not self-resolved.
- Skip when no action is required.
- **Never merge.** Sovereign merges (Standing rule 1).

---

## Post-phase handoff (Hour 12)

At Hour 12, the Phase-2 handoff should advance:
- `dash-2-1` and `dash-2-2` both `complete`.
- Session 8 reading committed to sep-dashboard repo.
- Feature-lock PR open (description-only, three features max).
- Phase 3 briefing (Aurelius drafts) lands before Hour 12 close, opening the feature-impl window.

---

*Session 8 already paid for the territory. This campaign pays for the map and the walking.*
