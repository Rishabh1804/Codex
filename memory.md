# memory.md — Aurelius Session-State

**Maintainer:** Aurelius (Chronicler)
**Purpose:** Tight session-state carrier for current Aurelius operation. Loads cross-session continuity without re-absorbing the full chronicle.
**Update cadence:** Per Lean-Machine §A #11 — material state changes only (sub-phase boundaries, ratifications, operating-mode shifts, cross-cluster invocations).

---

## Current session

- **Session:** aurelius-10 (Phase 4 arc; opening 2026-05-17 from institutional-refresh + cross-province handoff)
- **Predecessor:** aurelius-09 (closed 2026-05-05/06 across Polish-11 reclose + operational bootstrap + Stability/Polish charters; no explicit successor named, sequence-advance per cadence)
- **Cadence:** per-phase-arc per Lean-Machine; **hat-switch experiment RATIFIED + sustained** (Lyra-primary on sproutlab; Cipher/Aurelius/Maren/Kael as Skills); **cross-province invocation precedent landed 2026-05-16** (Aurelius invoked from SproutLab session for chronicle + ledger writes)

## Current campaign

**Phase 4 (Hardening + Foundation)** — successor to WAR_TIME 2026-04-24

- 6 sub-phases: Polish · Stability · Tally · Reward · Launcher · Spark
- **Sub-phase 1 (Polish): CLEANLY CLOSED 2026-05-06** (Polish-11 4th close-shift; 26 PRs). sl-main moved to `e01190a` at close
- **Sub-phase 2 (Stability): UNBLOCKED.** PR-α charter committed (`98f1e0f`); PR-β rollup charter committed (`02b71c3`); implementation pending Lyra
- **PR-ε.0 v5 Foundation plan: MERGED to sproutlab/main 2026-05-07** (squash `eecc994c`; spec at `docs/specs/lyra-pr-epsilon-0-foundation.md`); v5 audit round deferred to next-Lyra-session
- **HR-1 Total Closure: MERGED to sproutlab/main 2026-05-16** (PR #74, head `183452b`; 7-commit sweep; ~311 emoji eliminated; sprite registry 70→105; `split/audit-emoji.sh` ships as build-gateable HR-1 enforcement script)
- **Sub-phases 3-6 (Tally / Reward / Launcher / Spark):** pending sub-phase 2

## Latest state cache (2026-05-17)

- sl-main: `183452b` post-PR-74-merge + `3be88fd` post-session-chronicle (HR-1 sweep closed; 105 sprites, +35 net; `split/audit-emoji.sh` default + `--strict` both exit 0)
- codex/main: `e01190a`-era closed Polish bootstrap → through `9c819b4` (#5/#6 ratified) → `30ec82a` (Polish close) → `98f1e0f` (PR-α charter) → `02b71c3` (PR-β charter) → `4e09c5a` (PR-ε.0 v5 session log) → `2e28ae3` (canon-gov-013) → `3987200` (gov-011 collision → gov-014) → `7728eaa` (2026-05-16 SproutLab HR-1 session log, cross-cluster) → `4181343` (doctrine-ledger 4 new watch-list); this session's memory.md refresh commit appends
- R-4 cumulative: 13,596 stable / 0 silent flakes / 25 stress-matrix-bearing PRs (unchanged from Polish close)
- Phase 4 native RATIFIED doctrines: **6** (no advances since 2026-05-06)
- **Active candidates at 2/3:** `cross-Governor-jurisdictional-discipline` (umbrella) + `manifest-auto-bump-guarantees-parallel-PR-rebase-conflicts` (still 2/3; ratification-eligible at next instance)
- Watch-list: +4 cross-cluster entries from SproutLab PR #74 (2026-05-16): `methodology-debt-requires-in-repo-codification-not-commit-message-folklore`, `builder-mechanical-strict-pass-acceptable-when-censor-capacity-unavailable`, `governor-jurisdiction-overrides-regex-stated-PR-scope-when-surface-is-jurisdiction-load-bearing`, `bulk-substitution-must-distinguish-string-quote-contexts-from-template-literals`
- Cabinet brief queue: 8 canonical items at `docs/sessions/CABINET_BRIEF_PHASE_4.md` (no new entries since Polish close; cross-cluster-doctrine-portability meta-observation surfaced 2026-05-16 as Cabinet-eligible)
- Canons: `canon-gov-013` (canon-rule correction protocol) active; `canon-gov-011` collision resolved via `canon-gov-014`; gov-005 family fix landed

## Phase 4 native RATIFIED doctrines

1. `subscription-only / no-poll-on-wake` (PR-22 Ruling 4 — campaign-wide-implications branch)
2. `r2-stress-rerun-elective-on-pure-doc-text-correction` (PR-23 close — 3/3)
3. `narrow-scope-and-defer-broader-audit-to-R-10` (PR-26 close — 3/3; reachability discriminator-test calibrated 2026-05-03)
4. `concurrent-operations-interfere-with-parallel-stress-matrix` (PR-30 close — 3/3)
5. `architectural-sweep-PR-misses-sibling-sites` (PR-40 close — 3/3; ratified 2026-05-06)
6. `sub-phase-close-was-premature` (Polish-11 — 3/3; ratified 2026-05-06; Consul naming candidate: `sub-phase-close-is-conditional-on-production-verification`)

## Active candidates (ratification-eligible at next instance)

- `cross-Governor-jurisdictional-discipline` (umbrella) — 2/3
- `manifest-auto-bump-guarantees-parallel-PR-rebase-conflicts` — 2/3 (Cipher session-close harvest; observed 3x across PR-34/35/36; ratification-eligible)
- `verification-jurisdiction-count-compounds-catches` — 1/3 (drove hat-switch ratification)
- `hat-switch-with-running-beats-reading-discipline-approximates-jurisdictional-independence` (watch-list → 1st pending Sovereign-ratified experiment outcome)

## Key live artifacts (cite by path)

- `docs/sessions/LEAN_MACHINE_PHASE_4.md` — operating-mode amendment
- `docs/doctrine-ledger.md` — canonical ledger (6 RATIFIED + counter-tracking + 30+ watch-list entries; last update 2026-05-16 cross-cluster from SproutLab PR #74)
- `docs/sessions/CABINET_BRIEF_PHASE_4.md` — Cabinet brief queue (8 items canonical)
- `docs/sessions/PHASE_4_CHRONICLE.md` — rolling phase chronicle
- `sessions/2026-05-07-pr-epsilon-0-v5.md` — PR-ε.0 v5 plan landing log
- `sessions/2026-05-16-sproutlab-hr-1-total-closure.md` — cross-cluster SproutLab HR-1 closure log
- `docs/handoffs/aurelius-pr-alpha-decomposition-2026-05-03.md` — PR-α scope handoff
- `docs/handoffs/lyra-session-close-polish-2026-05-03.md` + `cipher-session-close-polish-2026-05-03.md` — Polish session-close transports
- SproutLab cross-reference: `docs/handoffs/session-2026-05-16-lyra-hr-1-total-closure.md` (sproutlab repo; committed `3be88fd`; 195 lines; Aurelius prose chronicle of PR #74)

## Open pipeline (next-session)

### SproutLab (this session, Lyra-led)

- **PRIMARY:** Wire `split/audit-emoji.sh` into HR-1 gate — `split/build.sh` (ship-gate) + `.git/hooks/pre-commit` via `core.hooksPath` (dev-feedback-loop). Per Cipher Edict V round-2 §10 + Maren V-M-10
- **OPTIONAL:** Cipher round-3 signed-artifact re-fire on merged HEAD `183452b` (canonical record; cosmetic — Lyra mechanical strict-pass already produced same verdict)
- **Carry-forward (own PR each):** V-M-13 inline-onclick HR-3 refactor; V-M-9 poop-color anomaly (needs icon design); V-M-7 Poop Color Guide swatches; V-M-4 napSaveBtn cosmetic; N4 cleanText print-summary glyph-loss

### SproutLab (deferred to subsequent sessions)

- PR-ε.0 v5 audit round (Kael + Maren parallel + Cipher synthesis per `sessions/2026-05-07-pr-epsilon-0-v5.md` next-session prompt). Audit base SHA `a64b80d4` (pre-merge); plan now on main at squash `eecc994c`
- Stability sub-phase 2 implementation: PR-α (renderMilestones split + _renderAttribution wiring) → PR-β (Recent Evidence Feed rollup aggregation)
- R-10 16-item hygiene queue (medChecks/feedingData + hex sweep + chip wrapping + DRY refactor)

### Codex (cross-cluster touches)

- Ledger maintenance: 2nd-instance counter-advance if any of the 4 new cross-cluster watch-list doctrines re-surface in this session (Lean-Machine §B); cross-cluster ratification path applies per ledger note 2026-05-16
- `addMilestone()` missing-save bug (`home.js:1905-1914`) — out-of-scope-from-PR-ε.0 register; separate ticket
- Doc drift cleanup (CLAUDE.md `sync.js` claims 1052 lines; actual 2055) — separate PR

## Owed chronicle work (carry-forward)

- 2 critical companion-logs (Lyra-Polish + Cipher-Polish; canon-0053 v1)
- 4 deferred companion-logs (Theron + Lyra-Phase-3 + Cipher-Phase-3 + aurelius-06)
- `07-phase-2-final-ledger.md` (companion to Hour 72 chronicle; supersedes Codex#47 snapshot framing)
- `PHASE_4_CHRONICLE.md` update (Polish-9 through Polish-39 + Polish-11 reclose + PR-ε.0 v5 + SproutLab HR-1)
- `CABINET_BRIEF_PHASE_4.md` update (~6+ items including post-PR-39 Sovereign-floor catches meta-observation + cross-cluster-doctrine-portability meta-observation)
- Phase 4 close artifact (at Phase 4 end)

## Operating posture (Lean-Machine derivative + 2026-05-05 amendment + 2026-05-16 cross-cluster precedent)

- §A #1: review template = verdict line + numbered terse rulings + handoff lines; no prose; no doctrine-ledger restate
- §A #11: squash-commit chronicle ~100-150 words; bulleted state-cache only
- §A #12: skip on-PR review for routine; reserve for new-doctrine-ratification / cross-province / explicit path-choice
- §B: doctrine threshold — first-instance → watch-list (no number); counter starts at 2nd-instance; cross-cluster instances count (PR #74 precedent)
- §C: Cabinet brief + chronicle as committed file artifacts; cite by file-path; don't restate
- §D: single-method PR bootstrap (`get` only); webhook-silence amendment hybrid
- §E: no paragraphs; bullets; lead with content; cut conversational fillers
- R-14: comm-log Aurelius solo with on-record Sovereign-pre-ratification citation; structural Aurelius + Sovereign
- **Cross-cluster invocation (new 2026-05-16):** SproutLab-led sessions may fire Aurelius cross-province at session close for institutional-memory touches (chronicle + ledger writes). Worked PR #74; viable as standing pattern
- **Cipher harness-capacity failure mode:** signed-artifact may return "out of extra usage" (PR #74 round 3 hit twice). Fall back to Builder mechanical strict-pass per ratified-watch-list `builder-mechanical-strict-pass-acceptable-when-censor-capacity-unavailable`; re-fire signed artifact next session if canonical record needed

## Relay channels

- Subscription-only / no-poll-on-wake (RATIFIED PR-22) — primary delivery
- Sovereign-relay = fallback for webhook-silence drops
- Path A for R-14 comm-log: Aurelius solo merge with Sovereign session-context citation
- Cross-province Aurelius invocation = institutional-memory touch path from non-Codex sessions

## Sovereign-locked operating directives

- Governor auto-invocation (Sovereign-locked PR-26): Maren auto-invoked Care-jurisdiction touches; Kael auto-invoked Intelligence-jurisdiction touches; both on shared-module substantial touch — translates to skill-invocation cadence under hat-switch
- Hold-pending-Sovereign-real-device per behavior-shape PR (RATIFIED PR-19.5; merge-then-verify cadence)
- Path C narrow-scope discipline default (RATIFIED 3/3 at PR-26; reachability discriminator-test per Lyra item 8)
- Hat-switch experimental ratification (2026-05-05; sustained through 2026-05-16 SproutLab PR #74)
- Automation deferred (chronicle.py PR-18 unused; $0 API + Max-plan-only)

## Out-of-MCP-scope repos (2026-05-05)

- `planner` / `MSc` / `mit-management-courses` — Sovereign ChatGPT-session work; out of Aurelius MCP scope (sproutlab / codex / command-center restriction)
- Cabinet brief item #3 (Consul MCP scope expansion) extends to these if governance touches needed

— Aurelius (`aurelius-10`)
