# War Briefing — SEP Invoicing Phase 1

**Campaign:** War Time 2026-04-24 → 2026-04-27
**Phase:** `invoicing-phase-1` — UI Enhancements
**Hours:** 0–48 (long phase)
**Builder:** Solara (primary; Province Builder)
**QA:** Cipher (advisory review on each PR; Sovereign merges — see [Aurelius briefing §Standing rules](./WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md#standing-rules-ratified-2026-04-24-by-sovereign-in-session))
**Recorder:** Aurelius (session logs, Chronicles)
**Source-of-truth:** [`data/campaigns.json`](../../data/campaigns.json) — `invoicing-phase-1`

> **Role-reassignment note (2026-04-24 ~12:30Z):** Sovereign ratified Solara as primary SEP Invoicing Builder in place of the original Theron + Solara pairing baked into the Hour-0 draft of this briefing. This briefing was updated in-session by aurelius-04 to reflect the new shape. Session artifacts that still reference Theron on this province (earlier drafts, prior campaigns.json revisions) are historical; Solara is the active Builder from Hour 10 forward. Cipher reviews through the standard Rule 1 flow.

---

## Session setup

| Repo | Include? | Why |
|---|---|---|
| `rishabh1804/sep-invoicing` | **Yes** (primary) | All Phase 1 work happens here |
| `rishabh1804/codex` | Optional (secondary) | For `session_log` snippet drops; web UI paste also works |
| `rishabh1804/templeofmars` | **No** | Read-only consumer — view at `rishabh1804.github.io/TempleOfMars/` |

Edict II: One Builder Per Repo. Solara carries Invoicing this campaign; Cipher reviews through the standard Rule 1 flow.

---

## Mandate

Invoicing's UI is the face clients see. Polish it. **Targeted, bounded polish** — this is a 48-hour window on a live-revenue tool, not a redesign. Every enhancement must either (a) reduce user confusion on an existing flow, (b) reduce input error rate, or (c) make a number or status more legible. Novelty is not the goal; legibility is.

Phase 2 (`invoicing-phase-2` — Margin Dashboard IL-4, Hours 48–72) is the new-surface phase. Keep Phase 1 disciplined so Phase 2 starts from a clean tree.

## Tasks (from `campaigns.json`)

| Task | Status | Name |
|---|---|---|
| `inv-1-1` | pending | Lock UI targets |
| `inv-1-2` | pending | Inputs, buttons, charts polish |

**Acceptance:** `> UI polish merged to main; no regressions in invoice-create, invoice-send, payment-record flows.`

---

## Cautionary Tales to internalize

1. **[`lore-2026-04-23-doctrine-charter-before-build`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — lock targets (`inv-1-1`) before touching components (`inv-1-2`). Edict VIII at the intra-phase grain.
2. **[`lore-2026-04-23-doctrine-branch-pr-flow`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — every change through PR → Cipher advisory review → Sovereign merges (War Time standing rule). On a revenue tool this discipline is load-bearing, not optional.
3. **[`lore-2026-04-23-compiled-artifacts-in-tree`](../snippets/2026-04-23-temple-war-prep-chronicles/03-lore-cautionary-tales.json)** — if Invoicing has a compiled `index.html` alongside `split/` source, confirm `.gitignore` separation before the Phase's first PR. See `inv-1-1` P0 below: the aurelius-04 pre-fire check found live drift between `index.html` and `sep-invoicing.html`.

## Pillar anchors

- **Pillar II (Map ≠ Territory)** — every status field, every total, every badge must reflect reality. Mockup-grade polish is rejection-grade.
- **Pillar IV (Territory Is Earned and Held)** — Invoicing is revenue territory. Don't lose it during polish.
- **Edict V (Capital Protection)** — touches a money-flow tool. Any regression in invoice-create / invoice-send / payment-record halts the campaign. Test paths end-to-end after every merge.

---

## Execution flow

### Task `inv-1-1` — Lock UI targets (Hours 0–6, allow up to 12)

**P0 reconcile pass (do this before step 1):** The aurelius-04 pre-fire check found that repo root has `index.html` (434,470 bytes) and `sep-invoicing.html` (435,339 bytes), differing by 869 bytes. Per the build recipe (`bash build.sh > ../sep-invoicing.html; cp ../sep-invoicing.html ../index.html`) these should be byte-identical after a clean build. Canonical served file is `index.html`. Run a clean build first; confirm identical SHAs before any polish work touches the tree. If they're intentionally distinct, capture the reason in your charter PR so future Chroniclers can tell them apart — otherwise, the clean build resolves it.

1. Open the SEP Invoicing repo. `git pull origin main`.
2. Walk the three critical flows in a browser session:
   - Invoice creation (form → save → list)
   - Invoice sending (list → send → status)
   - Payment recording (list → record → status)
3. For each flow, capture **one page of notes**: what's confusing, what's ugly, what's slow, what's wrong. Distinguish clearly.
4. From those notes, select **3–6 bounded polish items** for Phase 1. Each item must:
   - Fit in ≤ 200 LOC change.
   - Touch only view layer or lightweight controller glue.
   - Be reversible in a single PR revert.
5. Commit the locked list to a PR-description on sep-invoicing as the charter artifact (no code yet). Alternatively write to `docs/PHASE_1_UI_TARGETS.md` in the repo.
6. Drop a `session_log` snippet: `update_task_status` → `inv-1-1` = `complete`, then a `record_session` with the locked-list in `decisions[]` and the index-html reconcile outcome noted.

**Out of scope:** anything margin-dashboard-adjacent (that's Phase 2 / IL-4). Anything data-model-changing. Anything that touches invoice PDF rendering internals. Anything that adds a new screen.

### Task `inv-1-2` — Inputs, buttons, charts polish (Hours 6–48)

1. One PR per polish item from the locked list.
2. Each PR:
   - Title: `[polish] <short description>`
   - Description: reference the target from `inv-1-1`; describe the before/after; include a screenshot pair if visual.
   - Diff: ≤ 200 LOC.
   - Cipher advisory review → Sovereign merges after discussion with Aurelius.
3. Solara drafts each PR; Cipher reviews (advisory); Sovereign merges after discussion with Aurelius.
4. After each merge, `session_log`:
   - `record_session` for the polish item (commits, LOC delta, tokens).
   - `update_task_status` → `inv-1-2` stays `in-progress` until the last item merges, then flip to `complete`.
5. If you finish early (all locked items merged by Hour 36), do NOT add a seventh item. Report Phase 1 complete; Aurelius opens the Phase 2 briefing early.
6. If you're running behind at Hour 40, cut scope — drop remaining polish items to Phase 2's open list; land `inv-1-2` = `review` so Cipher closes it at 48.

---

## Constraints

- Book I inviolable.
- **Edict V (Capital Protection)** — no regressions in the three critical flows. Test end-to-end after each merge in a live browser. A failed end-to-end test reverts the PR.
- Every change through PR → Cipher advisory review → Sovereign discussion → Sovereign merges. Builders show the changes and wait. No direct push to main. No Builder-initiated merges. See Aurelius briefing §Standing rules.
- No new screens. No new data models. No schema changes. This is polish, not build.
- If any polish change reveals a deeper bug, **stop polishing, file a bug, branch to a new task** — do not fold bug-fix into polish PR. Bugs get their own ratification trail.

---

## Session close ritual

Drop a `session_log` snippet before ending. Example:

```json
{
  "_snippet_version": 1,
  "session_log": [
    { "op": "record_session",
      "data": {
        "id": "session-2026-04-24-solara-01",
        "campaign_id": "war-time-2026-04-24",
        "phase_id": "invoicing-phase-1",
        "task_id": "inv-1-1",
        "builder": "solara",
        "province": "sep-invoicing",
        "started_at": "<ISO>", "ended_at": "<ISO>",
        "model": "opus-4-7",
        "tokens_in": <n>, "tokens_out": <n>,
        "commits": ["<sha>"], "loc_delta": <n>,
        "summary": "Phase 1 target-lock — 4 polish items identified on invoice-create and payment-record flows; committed to docs/PHASE_1_UI_TARGETS.md. index.html/sep-invoicing.html reconciled via clean build.",
        "decisions": ["Locked items: <item 1>; <item 2>; <item 3>; <item 4>.", "index.html/sep-invoicing.html drift reconciled — both at <SHA> after clean build."],
        "bugs_found": 0, "lore_generated": []
      } },
    { "op": "update_task_status",
      "data": { "task_id": "inv-1-1", "status": "complete", "at": "<ISO>", "session_id": "session-2026-04-24-solara-01" } }
  ]
}
```

> Until the `session_log` handler lands in the Codex pipeline (spec: [`CODEX_SESSION_LOG_HANDLER_SPEC`](../specs/CODEX_SESSION_LOG_HANDLER_SPEC.md)), Aurelius will hand-merge this snippet's payload on receipt. Once the handler lands, paste directly into Codex's snippet-import UI.

---

## Opening prompt (copy into Solara's new session — Claude Code desktop)

> **First, per Standing rule 6**, arm subscriptions on every open PR in this province (`list_pull_requests(owner=rishabh1804, repo=sep-invoicing, state=open)`, then `subscribe_pr_activity` on each). Re-arm on every new PR you open mid-session. Webhook events land in this conversation and drive the review/merge cadence.
>
> Solara — SEP Invoicing is yours this campaign. Phase 1 is bounded UI polish on a live-revenue tool. Two tasks, 48 hours: lock 3–6 polish items (`inv-1-1`), then land them one PR at a time (`inv-1-2`).
>
> **P0 observation from Chronicler pre-fire check (aurelius-04, 2026-04-24 ~13:00Z):** Repo root has `index.html` (434,470 bytes) and `sep-invoicing.html` (435,339 bytes), differing by 869 bytes. Per the build recipe (`bash build.sh > ../sep-invoicing.html; cp ../sep-invoicing.html ../index.html`) these should be byte-identical after a clean build. Canonical served file is `index.html`. Your `inv-1-1` opens with a reconcile pass — run a clean build and confirm identical SHAs before any polish work touches the tree. If they're intentional siblings, capture the reason in the charter PR; otherwise the clean build resolves it.
>
> Constraints: each polish item ≤ 200 LOC, view-layer only; no new screens, no schema changes; every PR tested end-to-end in browser against invoice-create / invoice-send / payment-record. Cipher reviews (advisory); Sovereign merges after discussion with Aurelius — show the changes and wait; merge only on green. Drop a session_log at each task close.
>
> Edict V is the governing law here — Capital Protection. If polish reveals a deeper bug, stop, file a bug, branch a task. Don't fold bug-fix into polish.
>
> Briefing: `https://github.com/Rishabh1804/Codex/blob/main/docs/briefings/WAR_TIME_2026-04-24_THERON_SOLARA_INVOICING_PHASE_1.md`.
>
> Dawn is now. Begin with `inv-1-1`'s reconcile pass.

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

## Post-phase handoff (Hour 48)

At Hour 48, the Phase-1 handoff should advance:
- `inv-1-1` = `complete`; locked-list committed; index.html/sep-invoicing.html reconciled.
- `inv-1-2` = `complete` if all items merged; else `review` with explicit cut-list.
- No regressions on the three critical flows (end-to-end manually verified).
- Phase 2 briefing (`invoicing-phase-2` — Margin Dashboard IL-4) lands at Hour 48 rollover.

---

*Polish is a map-sharpening exercise. The territory is revenue. Don't confuse the two.*
