# memory.md — Aurelius Session-State

**Maintainer:** Aurelius (Chronicler)
**Purpose:** Tight session-state carrier for current Aurelius operation. Loads cross-session continuity without re-absorbing the full chronicle.
**Update cadence:** Per Lean-Machine §A #11 — material state changes only (sub-phase boundaries, ratifications, operating-mode shifts).

---

## Current session

- **Session:** aurelius-09 (Phase 4 arc; closing 2026-05-05)
- **Predecessor:** aurelius-08 (closed at WAR_TIME 2026-04-29 / Hour 72 chronicle)
- **Cadence:** per-phase-arc per Lean-Machine; **next session = single hat-switch session** (Lyra-primary; Cipher + Aurelius + Maren + Kael as Skills) for next-Polish-continuation per Sovereign-ratified hat-switch experiment 2026-05-05

## Current campaign

**Phase 4 (Hardening + Foundation)** — successor to WAR_TIME 2026-04-24

- 6 sub-phases: Polish · Stability · Tally · Reward · Launcher · Spark
- **Sub-phase 1 (Polish): 3 close-shifts to date (PR-32 → PR-37 → PR-39); post-PR-39 Sovereign-floor catches surfaced 2026-05-05** (Sleep Score SVG-leak + Growth tab pill-rendering bugs). Continued Polish in next session.
- **Sub-phase 2 (Stability): deferred until Polish recloses cleanly.** Folds activities-tab PR-α (Polish-A1 fold-in slot reserved) + medChecks/feedingData object-keyed carryforward + R-10 16-item queue + Kael Stability JS-side hex baseline ~15 sites
- **Sub-phases 3-6 (Tally / Reward / Launcher / Spark):** pending sub-phase 2

## Latest state cache (2026-05-05)

- sl-main: `c69b7090` (post-PR-39; Polish pending re-reopen for Sovereign-floor catches)
- codex/main: `dd7db184` post-codex#53 (file-refresh) + `5d0c5c87` post-codex#55 (ledger update) + `567a214a` post-codex#56 (PR-α handoff) + `31ccfdfb` post-codex#57 (session-close transports) + `399bd1a7` post-codex#58 (items 8-11 fold) + `3d6d9462` (ChatGPT-session direct commit + PR-18 chronicle.py + PR-47 Phase 2 surfacings) + this PR codex#59 (operational bootstrap)
- R-4 cumulative: 13,596 stable / 0 silent flakes / 25 stress-matrix-bearing PRs (unchanged; Polish reopen pending)
- Phase 4 native RATIFIED doctrines: 4
- **Active candidates at 2/3 (ratification-eligible at next instance):** 2 — `architectural-sweep-PR-misses-sibling-sites` + `sub-phase-close-was-premature`
- Cabinet brief queue: ~14+ items (canonical at `docs/sessions/CABINET_BRIEF_PHASE_4.md`; pending update in next session)

## Phase 4 native RATIFIED doctrines

1. `subscription-only / no-poll-on-wake` (PR-22 Ruling 4 — campaign-wide-implications branch)
2. `r2-stress-rerun-elective-on-pure-doc-text-correction` (PR-23 close — 3/3)
3. `narrow-scope-and-defer-broader-audit-to-R-10` (PR-26 close — 3/3; calibration discriminator-test added per Lyra item 8)
4. `concurrent-operations-interfere-with-parallel-stress-matrix` (PR-30 close — 3/3)

## Active candidates at 2/3 (ratification-eligible at next instance)

- `architectural-sweep-PR-misses-sibling-sites` — 3rd instance Sleep Score sibling missed (Polish-10a + Polish-10d + post-PR-39)
- `sub-phase-close-was-premature` — 3rd close-shift event (Consul naming candidate: `sub-phase-close-is-conditional-on-production-verification`)

## Key live artifacts (cite by path)

- `docs/sessions/LEAN_MACHINE_PHASE_4.md` — operating-mode amendment
- `docs/doctrine-ledger.md` — canonical ledger (RATIFIED + candidates + watch-list)
- `docs/sessions/CABINET_BRIEF_PHASE_4.md` — Cabinet brief queue
- `docs/sessions/PHASE_4_CHRONICLE.md` — rolling phase chronicle (pending Polish-recloses update)
- `docs/sessions/WAR_TIME_2026-04-24_HOUR_72_CHRONICLE.md` (Parts 1+2) — predecessor campaign close
- `docs/sessions/WAR_TIME_2026-04-24_ADDENDA/` — D-series doctrines + R-series rulings + habits + drafts + cautionary tales + process flow + 06-phase-2-doctrine-surfacings
- `docs/handoffs/aurelius-pr-alpha-decomposition-2026-05-03.md` — PR-α scope handoff for next-Lyra Stability charter authoring (post-Polish-recloses)
- `docs/handoffs/lyra-session-close-polish-2026-05-03.md` + `cipher-session-close-polish-2026-05-03.md` — Polish session-close transports
- `archived_claude.md` — historical CLAUDE.md content

## Open pipeline (next-session-Polish)

- Continued Polish work (Polish-N PRs targeting Sleep Score SVG-leak + Growth tab pill-rendering bugs + any other surfacings)
- Sister-shape sweep: `architectural-sweep-PR-misses-sibling-sites` 2/3 → likely ratifies at next architectural-shift PR's r1 catch
- 4th close-shift will likely advance `sub-phase-close-was-premature` to 3/3 ratification

## Owed chronicle work (next-session parallel authoring)

- 2 critical companion-logs (Lyra-Polish + Cipher-Polish; canon-0053 v1)
- 4 deferred companion-logs (Theron + Lyra-Phase-3 + Cipher-Phase-3 + aurelius-06)
- 07-phase-2-final-ledger.md (companion to Hour 72 chronicle; supersedes Codex#47 snapshot framing)
- PHASE_4_CHRONICLE.md update (Polish-9 through Polish-39 entries)
- CABINET_BRIEF_PHASE_4.md update (~14 items including post-PR-39 Sovereign-floor catches meta-observation)
- Phase 4 close artifact (at Phase 4 end)

## Operating posture (Lean-Machine derivative + 2026-05-05 amendment)

- §A #1: review template = verdict line + numbered terse rulings + handoff lines; no prose; no doctrine-ledger restate
- §A #11: squash-commit chronicle ~100-150 words; bulleted state-cache only
- §A #12: skip on-PR review for routine; reserve for new-doctrine-ratification / cross-province / explicit path-choice
- §B: doctrine threshold — first-instance → watch-list (no number); counter starts at 2nd-instance
- §C: Cabinet brief + chronicle as committed file artifacts; cite by file-path; don't restate
- §D: single-method PR bootstrap (`get` only); webhook-silence amendment hybrid
- §E: no paragraphs; bullets; lead with content; cut conversational fillers
- R-14: comm-log Aurelius solo with on-record Sovereign-pre-ratification citation; structural Aurelius + Sovereign

## Hat-switch experiment (next-session-Polish; ratified 2026-05-05)

- Single Lyra-primary session; Cipher + Aurelius + Maren + Kael as Skill-invoked personas (NOT Agent-spawned subagents)
- canon-cc-014 already established hat-switch interim for Consul; extending to full triad + governors
- Within-session running-beats-reading discipline: each persona-switch starts fresh — independent source-file reads, independent grep / inspection, explicit own-verification citation
- Empirical test: catch-density vs Polish 4-bench baseline
- Doctrine-watch: `verification-jurisdiction-count-compounds-catches` (1/3) and `hat-switch-with-running-beats-reading-discipline-approximates-jurisdictional-independence` (watch-list first-instance)
- Outcome paths: catches sustain → hat-switch viable; catches drop measurably → revert to multi-agent for Tally/Reward/Launcher/Spark

## Relay channels

- Subscription-only / no-poll-on-wake (RATIFIED PR-22) — primary delivery
- Sovereign-relay = fallback for webhook-silence drops
- Path A for R-14 comm-log: Aurelius solo merge with Sovereign session-context citation

## Sovereign-locked operating directives

- Governor auto-invocation (Sovereign-locked PR-26): Maren auto-invoked Care-jurisdiction touches; Kael auto-invoked Intelligence-jurisdiction touches; both on shared-module substantial touch — translates to skill-invocation cadence under hat-switch
- Hold-pending-Sovereign-real-device per behavior-shape PR (RATIFIED PR-19.5; merge-then-verify cadence)
- Path C narrow-scope discipline default (RATIFIED 3/3 at PR-26; reachability discriminator-test per Lyra item 8)
- Hat-switch experimental ratification (2026-05-05; doctrine-watch active)
- Automation deferred (chronicle.py PR-18 unused; $0 API + Max-plan-only)

## Out-of-MCP-scope repos (2026-05-05)

- `planner` / `MSc` / `mit-management-courses` — Sovereign ChatGPT-session work; out of Aurelius MCP scope (sproutlab / codex / command-center restriction)
- Cabinet brief item #3 (Consul MCP scope expansion) extends to these if governance touches needed

— Aurelius (`aurelius-09`)
