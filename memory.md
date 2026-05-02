# memory.md — Aurelius Session-State

**Maintainer:** Aurelius (Chronicler)
**Purpose:** Tight session-state carrier for current Aurelius operation. Loads cross-session continuity without re-absorbing the full chronicle.
**Update cadence:** Per Lean-Machine §A #11 — material state changes only (sub-phase boundaries, ratifications, operating-mode shifts).

---

## Current session

- **Session:** aurelius-09 (Phase 4 arc)
- **Predecessor:** aurelius-08 (closed at WAR_TIME 2026-04-29 / Hour 72 chronicle)
- **Cadence:** per-phase-arc per Lean-Machine; aurelius-10 opens at Phase 5 OR post-Cabinet at Phase 4 close

## Current campaign

**Phase 4 (Hardening + Foundation)** — successor to WAR_TIME 2026-04-24

- 6 sub-phases: Polish · Stability · Tally · Reward · Launcher · Spark
- **Sub-phase 1 (Polish):** closed at PR-32 then REOPENED at PR-33 for Polish-10 architectural fix; effective close shifts to PR-37 (~4 days at Lyra cadence)
- **Sub-phase 2 (Stability):** deferred until PR-37 merges; folds activities-tab PR-α (recent-evidence-attribution + renderMilestones split) + medChecks/feedingData object-keyed carryforward + R-10 carry-forwards (P-1 + P-5 + remaining) + Kael Stability JS-side hex baseline ~11 sites
- **Sub-phases 3-6 (Tally / Reward / Launcher / Spark):** pending sub-phase 2

## Latest state cache

- sl-main: `87f10ed0` (post-PR-33 Polish-10 charter amendment)
- codex/main: `2507d986` (post-PR-52 canon-pers-002)
- R-4 cumulative: 9,867 stable / 0 silent flakes / 21 stress-matrix-bearing PRs
- Phase 4 native RATIFIED doctrines: 4
- Cabinet brief queue: 10 items

## Phase 4 native RATIFIED doctrines

1. `subscription-only / no-poll-on-wake` (PR-22 Ruling 4 — campaign-wide-implications branch)
2. `r2-stress-rerun-elective-on-pure-doc-text-correction` (PR-23 close — 3/3)
3. `narrow-scope-and-defer-broader-audit-to-R-10` (PR-26 close — 3/3)
4. `concurrent-operations-interfere-with-parallel-stress-matrix` (PR-30 close — 3/3)

## Key live artifacts (cite by path)

- `docs/sessions/LEAN_MACHINE_PHASE_4.md` — operating-mode amendment
- `docs/doctrine-ledger.md` — canonical ledger (RATIFIED + candidates + watch-list)
- `docs/sessions/CABINET_BRIEF_PHASE_4.md` — Cabinet brief queue
- `docs/sessions/PHASE_4_CHRONICLE.md` — rolling phase chronicle
- `docs/sessions/WAR_TIME_2026-04-24_HOUR_72_CHRONICLE.md` (Parts 1+2) — predecessor campaign close
- `docs/sessions/WAR_TIME_2026-04-24_ADDENDA/` — D-series doctrines + R-series rulings + habits + drafts + cautionary tales + process flow
- `archived_claude.md` — historical CLAUDE.md content moved out of active operational context

## Open pipeline

- sproutlab Polish-10 sequence: PR-34 Polish-10a (SVG-strip ~25 sites) → PR-35 Polish-10b (HR-3 Care+Home ~30) → PR-36 Polish-10c (HR-3 Intel+Diet ~30) → PR-37 Polish-10 close
- sproutlab PR-11 (Phase 3 close-artifact) — pending Lyra
- codex#53 — this PR (CLAUDE.md/memory.md/archived_claude.md refresh)

## Owed chronicle work

- 07-phase-2-final-ledger.md (companion to Hour 72 chronicle)
- 4 canon-0053 v1 companion-logs (pending R-11 token telemetry relay)
- Phase 4 close artifact (at Phase 4 end)
- Cabinet review prep within 7 days post-Phase-4-close per canon-cc-025

## Operating posture (Lean-Machine derivative)

- §A #1: review template = verdict line + numbered terse rulings + handoff lines; no prose; no doctrine-ledger restate
- §A #11: squash-commit chronicle ~100-150 words; bulleted state-cache only
- §A #12: skip on-PR review for routine PRs; reserve for new-doctrine-ratification / cross-province / explicit path-choice
- §B: doctrine threshold — first-instance → watch-list (no number); counter starts at 2nd-instance
- §C: Cabinet brief + chronicle as committed file artifacts; cite by file-path; don't restate
- §D: single-method PR bootstrap (`get` only); webhook-silence amendment hybrid
- §E: no paragraphs; bullets; lead with content; cut conversational fillers
- R-14: comm-log Aurelius solo with on-record Sovereign-pre-ratification citation; structural Aurelius + Sovereign

## Relay channels

- Subscription-only / no-poll-on-wake (RATIFIED PR-22) — primary delivery
- Sovereign-relay = fallback for webhook-silence drops (caught at PR-23 + PR-26)
- Polish-10 charter (PR-33) used Path A for R-14 (Aurelius solo merge with Sovereign session-context citation)

## Sovereign-locked operating directives

- Governor auto-invocation (Sovereign-locked PR-26): Maren auto-invoked Care-jurisdiction touches; Kael auto-invoked Intelligence-jurisdiction touches; both on shared-module substantial touch
- Hold-pending-Sovereign-real-device per behavior-shape PR (RATIFIED PR-19.5; merge-then-verify cadence; sub-phase-close-scope expansion noted at PR-33)
- Path C narrow-scope discipline default (RATIFIED 3/3 at PR-26)

— Aurelius (`aurelius-09`)
