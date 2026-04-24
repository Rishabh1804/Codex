# War Briefing — SproutLab Phase 1

**Campaign:** War Time 2026-04-24 → 2026-04-27
**Phase:** `sproutlab-phase-1` — Connection Indicator + Offline Badge
**Hours:** 0–24
**Builder:** Lyra
**QA:** Cipher (advisory review on each PR; merge authority held by Sovereign — see [Aurelius briefing §Standing rules](./WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md#standing-rules-ratified-2026-04-24-by-sovereign-in-session))
**Recorder:** Aurelius (session logs, Chronicles)
**Source-of-truth:** [`data/campaigns.json`](../../data/campaigns.json#sproutlab-phase-1)

---

## Session setup

| Repo | Include? | Why |
|---|---|---|
| `rishabh1804/sproutlab` | **Yes** (primary) | All Phase 1 work happens here |
| `rishabh1804/codex` | Optional (secondary) | For `session_log` snippet drop at session end; web UI paste also works |
| `rishabh1804/templeofmars` | **No** | Read-only consumer — view at `rishabh1804.github.io/TempleOfMars/` in a browser tab |
| Other provinces / Command Center | **No** | Different campaign phases; Edict II (One Builder Per Repo) |

One Builder per repo. One repo in focus.

---

## Mandate

Make sync visibility a first-class UX concern. Surface connection state and offline state **honestly**, in the UI, **persistently**. Kill any hardcoded status.

## Tasks (from `campaigns.json`)

| Task | Status | Name |
|---|---|---|
| `sl-1-1` | pending | Assess sync visibility gaps |
| `sl-1-2` | pending | Implement connection indicator |
| `sl-1-3` | pending | Implement offline badge |

## Acceptance

> Connection indicator live, offline badge visible, merged to `main`.

---

## Cautionary Tales to internalize

1. **[`lore-2026-04-23-compiled-artifacts-in-tree`](../snippets/2026-04-23-temple-war-prep-chronicles/03-lore-cautionary-tales.json)** — SproutLab's `split/sproutlab.html` + `.trashed-*.js` cruft was purged pre-war (-77,226 LOC). Do NOT let compiled output drift back into the tree. Ensure `.gitignore` covers that class of file.
2. **Hardcoded status (general)** — the existing offline badge is reportedly hardcoded. Wire it to real `navigator.onLine` state + Firestore sync listener + WAL replay status. No lies in the UI. Every pixel of state must mirror reality.

## Pillar anchors

- **Pillar I (Nothing Is Wasted)** — every decision, every blocker, every near-miss lands as lore at session close.
- **Pillar II (Map ≠ Territory)** — the offline badge is a map of sync state; it must be drawn from the territory, not invented.
- **Edict III** — Sync Pipeline Authoritative. No write side-channels.

---

## Repo starting state

- **Branch:** `main` at commit [`82901743`](https://github.com/Rishabh1804/sproutlab) (cruft-purged state)
- **Surface:** ~61,933 lines split modules + 61,948 lines compiled `index.html`
- **Companion-Set:** Lyra, Maren, Kael already deployed under `.claude/` per canon-cc-026
- **Build:** `split/build.sh` (canonical concat → `split/sproutlab.html` + root `index.html`; Canon 0033)

### Files likely to touch

- `split/core.js` — sync pipeline, Firestore listeners, WAL
- `split/start.js` — init hooks, router
- `split/views.js` — header badge / status UI
- `split/styles.css` — badge styling if needed

Confirm actual files during `sl-1-1` (assess-gaps).

---

## Execution flow

### Task `sl-1-1` — Assess sync visibility gaps
1. Grep for current offline-badge render code.
2. Grep for `navigator.onLine` usage.
3. Identify Firestore listener subscription points and whether their `_isOffline` state drives UI.
4. Identify WAL replay status surface (if any).
5. Write a one-page gap summary as a PR description on a throw-away branch (or commit to an interim doc) — **this is the spec phase**.

### Task `sl-1-2` — Implement connection indicator
1. Single visual component in the header: green dot (online + sync healthy), amber (online + sync pending via WAL), red (offline).
2. Drive from a derived store that fuses `navigator.onLine`, Firestore connection-state-listener, and WAL queue depth.
3. No hardcoded classes or text — all derived.
4. One PR → Cipher advisory review → Sovereign + Aurelius discussion → Sovereign merges.

### Task `sl-1-3` — Implement offline badge
1. Persistent badge while offline (don't hide behind a tooltip).
2. Clear copy: "Offline — changes will sync when back online. (N pending)" where N is WAL depth.
3. Disappears when online AND WAL drained.
4. Accessibility: `aria-live="polite"` on state change.
5. One PR → Cipher advisory review → Sovereign + Aurelius discussion → Sovereign merges.

---

## Constraints

- Book I inviolable.
- One Builder: Lyra. Cipher reviews (advisory); Sovereign merges (War Time standing rule — see Aurelius briefing §Standing rules).
- War Time powers authorize SOP expansion, not Book I touching.
- **Every commit goes through PR → Cipher advisory review → Sovereign discussion → Sovereign merges.** Builders show the changes and wait. See Aurelius briefing §Standing rules.
- No direct push to `main`. (Doctrine `lore-2026-04-23-doctrine-branch-pr-flow`.)

---

## Session close ritual

Before ending the session, drop a `session_log` snippet. Paste into Codex's snippet-import UI. Temple dashboard picks it up on next refresh (Seed → Codex live, non-zero telemetry).

Template:

```json
{
  "snippet_type": "session_log",
  "operations": [{
    "op": "record_session",
    "data": {
      "id": "session-2026-04-24-lyra-<NN>",
      "campaign_id": "war-time-2026-04-24",
      "phase_id": "sproutlab-phase-1",
      "task_id": "<sl-1-1 | sl-1-2 | sl-1-3>",
      "builder": "lyra",
      "province": "sproutlab",
      "started_at": "<ISO>",
      "ended_at": "<ISO>",
      "model": "opus-4-7",
      "tokens_in": <n>,
      "tokens_out": <n>,
      "commits": ["<sha>"],
      "loc_delta": <n>,
      "summary": "<1-2 line summary>",
      "decisions": ["<what was decided>"],
      "bugs_found": 0,
      "lore_generated": []
    }
  }]
}
```

After the task is merged, update task status:

```json
{
  "snippet_type": "session_log",
  "operations": [{
    "op": "update_task_status",
    "data": { "task_id": "<sl-1-N>", "status": "complete" }
  }]
}
```

---

## Opening prompt (copy into Lyra's new session)

> **First, per Standing rule 6**, arm subscriptions: `list_pull_requests(owner=rishabh1804, repo=sproutlab, state=open)`, then `subscribe_pr_activity` to every open PR you own. Subscribe to any new PR you open mid-session (on open, before first push).
>
> Lyra, you're up. War Time Phase 1 — Connection Indicator + Offline Badge. Mandate: make sync visibility honest. Sprint:
> 1. `sl-1-1` — audit the current sync/offline UX in `split/core.js` + wherever the header badge lives. Write a one-page gap summary.
> 2. `sl-1-2` — wire a derived store fusing `navigator.onLine`, Firestore connection-state, WAL depth. Render a three-state header indicator (green / amber / red).
> 3. `sl-1-3` — replace the hardcoded offline badge with a live one. Copy: "Offline — changes will sync when back online. (N pending)". `aria-live="polite"`.
>
> Rules: one PR per task; Cipher reviews (advisory); Sovereign merges after discussion with Aurelius — show the changes and wait; no direct push to main; no Builder-initiated merges; kill every hardcoded class. Briefing: `https://github.com/Rishabh1804/Codex/blob/main/docs/briefings/WAR_TIME_2026-04-24_LYRA_SPROUTLAB_PHASE_1.md`. Session-close ritual: drop a `session_log` snippet into Codex.
>
> Dawn is now. Begin with `sl-1-1`.

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

## Post-phase handoff (Hour 24)

At Hour 24, Lyra's handoff should advance:
- All three tasks merged to `main`
- Phase-1 chapter updates status to `review` in Codex `campaigns.json`
- Phase-2 chapter (`sproutlab-phase-2` — Cache Busting + SW Version) inherits at Hour 24

---

*This briefing is a living document. Amend in-flight if the gap audit (`sl-1-1`) surfaces new territory. Every amendment is itself a decision worth logging.*
