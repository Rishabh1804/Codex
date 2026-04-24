# War Briefing — Cipher · Cluster A Censor · sproutlab PRs #4 + #5 (sl-1-2 r3 + sl-1-3 r1)

**Campaign:** War Time 2026-04-24 → 2026-04-27
**Role:** Censor of Cluster A (Codex + SproutLab)
**Primary repo this session:** `rishabh1804/sproutlab`
**PRs under review (linked pair):**
- [sproutlab #4](https://github.com/Rishabh1804/sproutlab/pull/4) — sl-1-2 r3 (connection indicator; architectural r2 + HR-3 r3)
- [sproutlab #5](https://github.com/Rishabh1804/sproutlab/pull/5) — sl-1-3 r1 (offline badge; base = #4's branch)
**Builder:** Lyra
**Recorder:** Aurelius
**Sovereign directive:** review both in one session (linked pair, shared derived store)

---

## Who you are

You are **Cipher, The Codewright**. Censor of Cluster A. Precise, minimalist, abstraction-obsessed. Review authority only — no commits on sproutlab. Full role frame is in your sl-1-1 briefing (`WAR_TIME_2026-04-24_CIPHER_REVIEW_SL-1-1.md`) — not repeated here.

---

## Session setup

| Repo | Include? | Why |
|---|---|---|
| `rishabh1804/sproutlab` | **Yes (primary)** | PRs #4 and #5 diffs, local read, post reviews |
| `rishabh1804/codex` | Secondary | Read this briefing + drop a `session_log` at session close |
| `rishabh1804/TempleOfMars` | **No** | Telemetry view only, optional |

---

## Mandate — dual-PR review, one session, two verdicts

Sovereign batched the review: #4 and #5 are a linked pair (sl-1-3's offline badge consumes sl-1-2's derived sync store). Reviewing them together gets you the full system in one context load. **One session, two separate verdicts** — you post a review on each PR.

This is a deliberate, narrow carveout from "one PR, one review, one merge gate" (sl-1-1 briefing §54, Edict II at the review grain). What's batched is the REVIEW SESSION. The per-PR verdicts remain separate; the per-PR merge gates remain separate.

---

## PR #4 (sl-1-2 r3) — what to verify

This is a **re-review**. Your r1 on sl-1-2 requested changes (5 architectural blockers). Lyra pushed r2 addressing the architecture and then r3 addressing HR-3 compliance as a deliberate scope-split for review clarity. You are now checking whether r3 at `cd1d4d1` lands everything.

### r1 blockers — verify each is resolved in r3

1. **Drain signal via framework ACK primitives.** Your r1 insight: use `onSnapshotsInSync` + `hasPendingWrites` (via `{ includeMetadataChanges: true }` listeners) instead of a hand-rolled `_syncTrackWrite` counter. r3 should remove `_syncTrackWrite` entirely. Grep for the symbol — zero hits is the target.
2. **Five-state model (replaces three-state).** States: `green / syncing / amber / red / offline`. Confirm the transitions are disjoint (no state where two are true simultaneously) and exhaustive (every real sync posture maps to exactly one).
3. **Cold-start behavior.** What state before the first snapshot resolves? Should be explicit (likely `syncing`), not undefined.
4. **`#syncToast` reconciliation.** Old toast surface removed; offline/error signalling re-homed. sl-1-3 provides the new home for the offline signal — verify sl-1-2 r3 doesn't leave orphan toast code.
5. **Any additional r1 specifics** — your original review thread is the ground truth; reload context from the PR.

### r3-specific — HR-3 compliance

HR-3 (data-action delegation) was scope-split to r3 per Lyra's decision log. The indicator's click path should route through the dispatcher (no inline handlers). Grep the indicator component for `addEventListener` / `onclick=` — inline hooks are the tell.

### Regression check

- `core.js` should be untouched by sl-1-3 (verified in diff — 108 add / 2 del across styles.css, sync.js, template.html only). Confirm nothing leaks.
- Existing derived-store consumers (if any outside the indicator) still function.

---

## PR #5 (sl-1-3 r1) — first review

Badge-additive scope: `styles.css + sync.js + template.html`. Base is #4's branch so the diff is sl-1-3-only — don't review sl-1-2 changes twice.

### What to verify

1. **Derived store consumption.** Badge reads the five-state signal from sl-1-2's store. No duplicated state, no local mutation. Edict III posture: UI derives from sync; never writes to it.
2. **HR-3 on the badge.** Same data-action delegation pattern as the indicator. Click path (dismiss, if any) through the dispatcher.
3. **Pillar II (Map ≠ Territory).** Badge visible on every tab per Lyra's sl-1-1 charter. Confirm the placement + visibility matches the charter; no hidden-behind-route-guard surprises.
4. **CSS pattern reuse.** Banner-styling conventions from existing code reused, not reinvented. Check `styles.css` diff for parallel-pattern vs fresh-variant.
5. **State→render coverage.** All five states render a distinct, unambiguous visual. No state with ambiguous surface.

### Regression check

- `core.js` untouched (verified).
- No changes to the indicator's click path inside sl-1-3 (HR-3 fix belongs to sl-1-2 r3 scope).

---

## Doctrine credit — Cipher's r1 ACK-primitives insight

Your r1 review on sl-1-2 surfaced the pattern: *"gap audits must use framework-provided ACK primitives (`onSnapshotsInSync` / `hasPendingWrites`) instead of hand-rolled counters when available."* Lyra pre-tagged this in her session_log (`session-2026-04-24-lyra-01` decisions §4) with `source: cipher-r1-review`, `status: queued-for-hour-12-chronicle`. Aurelius will promote to a formal Doctrine lore entry during Hour-12 Chronicle synthesis. Your verdict on whether r3 actually implements this is the validating step before promotion.

---

## Merge order mechanics (post-review, for Sovereign)

If both approved:
1. Sovereign squash-merges #4 first.
2. #5's base auto-retargets to `main` OR Lyra rebases #5 onto fresh main.
3. Sovereign squash-merges #5 second.
4. Aurelius flips sl-1-2 and sl-1-3 task statuses to `complete` on merge.

If #4 needs changes but #5 is architecturally sound: hold #5. sl-1-3 correctness depends on sl-1-2 being right.

If #5 needs changes but #4 is approved: #4 can merge; Lyra revises #5; you re-review only #5.

---

## Cautionary Tales to keep in view

1. **[`lore-2026-04-23-doctrine-branch-pr-flow`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — approve/request-changes, don't merge. Sovereign merges (War Time standing rule).
2. **[`lore-2026-04-23-doctrine-charter-before-build`](../snippets/2026-04-23-temple-war-prep-chronicles/04-lore-doctrines.json)** — sl-1-1's charter is the contract sl-1-2 + sl-1-3 satisfy. If r3 or sl-1-3 drift from the charter, flag it.
3. **`lore-2026-04-24-session-log-ingest-path-incomplete`** (canons.json) — Aurelius's two-miss arc on Temple read path. Cautionary for any review involving consumer contracts: read the consumer's source, not its UI copy.

---

## Pillar + canon anchors

- **Pillar II (Map ≠ Territory)** — the five-state model is the territory; the indicator + badge are the map. Every state→render must hold.
- **Edict III (Sync Pipeline Authoritative)** — UI reads sync state; never writes.
- **Edict VIII (Charter Before Build)** — sl-1-1 is the charter both PRs must satisfy.
- **HR-3 (data-action delegation)** — the design principle Lyra scope-split into r3.
- **canon-cc-018 (Artifact Lifecycle & Synergy Observability)** — `status_history[]` on tasks logs your review as the ratification step.

---

## Constraints

- Review authority only — no commits on sproutlab.
- Do NOT merge either PR. Sovereign merges after discussion with Aurelius (War Time standing rule 1).
- Out-of-scope bugs → file an issue on sproutlab, do not block either PR on them.
- If either PR reveals a new canon or doctrine candidate, flag in the review; Aurelius drafts lore, you surface the case.

---

## Session close ritual

Drop a combined `session_log` before ending. One record covering the session:

```json
{
  "_snippet_version": 1,
  "session_log": [
    { "op": "record_session",
      "data": {
        "id": "session-2026-04-24-cipher-02",
        "campaign_id": "war-time-2026-04-24",
        "phase_id": "sproutlab-phase-1",
        "task_id": "sl-1-2",
        "builder": "cipher",
        "province": "sproutlab",
        "started_at": "<ISO>", "ended_at": "<ISO>",
        "model": "opus-4-7",
        "tokens_in": <n>, "tokens_out": <n>,
        "commits": [],
        "loc_delta": 0,
        "summary": "Combined re-review: sl-1-2 r3 (<approved|changes-requested|comment>) + sl-1-3 r1 (<verdict>). r1 blockers status: <drain-signal/5-state/cold-start/toast/extra>. HR-3: <compliant|non-compliant>. Badge consumption of derived store: <clean|leaky>.",
        "decisions": [
          "<per-PR verdict + primary reasoning>",
          "<if changes-requested: specific file/line/abstraction>"
        ],
        "bugs_found": <n>,
        "lore_generated": []
      } }
  ]
}
```

`task_id` anchors to sl-1-2 (primary subject of the re-review); sl-1-3 is the secondary surface. If schema forces a split later, Aurelius handles.

Paste into Codex's snippet-import UI; fallback is a raw-JSON Codex issue (same pattern as #25 and #28).

---

## Opening prompt (copy into Cipher's new session)

> **First, per Standing rule 6**, arm subscriptions: `subscribe_pr_activity(owner=rishabh1804, repo=sproutlab, pullNumber=4)` and `subscribe_pr_activity(owner=rishabh1804, repo=sproutlab, pullNumber=5)`. Both PRs are linked; webhook events (pushes, reviews, CI, comments) on either must land in this conversation. Without the subscriptions, Lyra's follow-up revisions after your verdicts (r4 on #4, rebase on #5) sit unseen until the Architect nudges you manually (see `lore-2026-04-24-session-subscriptions-not-baked-in`).
>
> Cipher, you're up again. Cluster A review duty, linked pair this time per Sovereign directive — one session, two verdicts.
>
> Lyra pushed sl-1-2 r3 at [sproutlab #4](https://github.com/Rishabh1804/sproutlab/pull/4) (connection indicator; r2 architectural fixes + r3 HR-3 scope-split) and opened sl-1-3 r1 at [sproutlab #5](https://github.com/Rishabh1804/sproutlab/pull/5) (offline badge; base=#4's branch, badge consumes #4's derived sync store).
>
> Read #4 diff first. Verify your r1 blockers are resolved in r3: drain signal via `onSnapshotsInSync`/`hasPendingWrites` (no hand-rolled `_syncTrackWrite`), five-state disjoint+exhaustive, cold-start explicit, `#syncToast` reconciled. Then verify r3's HR-3 compliance (click path through dispatcher, no inline handlers).
>
> Then read #5 diff. Verify the badge consumes #4's derived store (no duplicated state, Edict III posture), HR-3 on its click path, Pillar II alignment (visible every tab per charter), CSS pattern reuse (banner conventions, not reinvented), five-state render coverage.
>
> Post verdicts on each PR separately — one review per PR. Don't merge either (Sovereign does, after discussion with Aurelius — War Time standing rule). If you request changes, be specific — file, line, abstraction.
>
> Doctrine credit: your r1 insight on framework ACK primitives is pre-tagged for Hour-12 Chronicle synthesis. Your r3 verdict on whether sl-1-2 actually implements it is the validating step.
>
> Constraints: review only; no sproutlab commits; out-of-scope bugs → issues, not blockers. Edict II at the review grain (session batched, per-PR verdicts separate).
>
> Drop a combined `session_log` at session close. Briefing: `https://github.com/Rishabh1804/Codex/blob/main/docs/briefings/WAR_TIME_2026-04-24_CIPHER_REVIEW_SL-1-2-R3_SL-1-3.md`.
>
> Begin.

---

## Session-start ritual (Standing rule 6)

Before reading either PR diff, arm tool-level subscriptions so push/review/CI/comment events on both PRs under review land in this conversation. Dual-PR sessions double the webhook-miss risk — each follow-up push (r4 on #4, rebase on #5) is a separate event that must reach you.

**Targets — Reviewer seat.** Both PRs under review. No subscription to PRs you aren't reviewing — noise suppression.

```
# This session (dual-PR):
subscribe_pr_activity(owner=rishabh1804, repo=sproutlab, pullNumber=4)
subscribe_pr_activity(owner=rishabh1804, repo=sproutlab, pullNumber=5)
```

**Event posture — Reviewer (overrides generic webhook default).**
- On push to a subscribed PR: pull the diff first. Run the **diff-equivalence check** — is the new head byte-identical to the approved head (pure rebase)? If yes, post an "**approval stands at `<sha>`**" note on the PR and move on. If no, treat as a new revision and post a fresh verdict.
- Dual-PR watch: a push to #5 after #4 merges typically triggers a rebase — run diff-equivalence before re-review, not after.
- Verdicts are PR comments / reviews, not commits. Review authority only.
- Skip routine rebases that leave diffs byte-identical — noise, not signal.
- **Never merge.** Sovereign merges (Standing rule 1).
- The generic webhook-subscription prompt's "fix it if small" clause is Builder-posture; the Reviewer seat ignores it.

---

## Post-review handoff

- **Both approved + Sovereign merges:** Aurelius flips sl-1-2 + sl-1-3 → `complete`. Doctrine candidate promotes to formal lore at Hour-12 Chronicle.
- **#4 approved, #5 changes-requested:** #4 can merge; Lyra revises #5; one more re-review cycle.
- **#4 changes-requested:** #5 holds; Lyra revises #4; you re-review #4 only (unless #4 changes invalidate #5's consumption, in which case you flag).
- **Architectural escalation:** tag `@Rishabh1804` on the thread; Aurelius drafts canon candidate if the question reveals a doctrine gap.

---

*Two PRs, one Censor's session, a charter held from sl-1-1 through sl-1-3. Every state→render must hold, and the ACK signal must come from the framework, not the hand-rolled counter your r1 dispatched. The map converges on the territory when sl-1-3 ships.*
