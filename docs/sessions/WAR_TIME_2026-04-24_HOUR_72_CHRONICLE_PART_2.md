# WAR_TIME 2026-04-24 — Hour 72 Synthesis Chronicle (Part 2/2)

**Continued from:** [`WAR_TIME_2026-04-24_HOUR_72_CHRONICLE.md`](./WAR_TIME_2026-04-24_HOUR_72_CHRONICLE.md) (Part 1/2).

---

## Set-piece — the post-PR-9 catch chain

PR-9 cleared its hermetic R-4 floor at 352/352 stable executions and shipped. On first deploy, Sovereign reported on prod: "no toast + no attribution." The auto-render delivered (growth value updated cross-device); the toast layer silently failed.

**Round 1: PR-18 hotfix.** Cipher's investigation traced the silent failure to `_syncCrashCount` incrementing toward `SYNC_CRASH_LIMIT=3` from dispatch render-crashes — once tripped, `_syncDisabled` detached all listeners. Hotfix swapped UI-render `_syncRecordCrash` calls to `console.warn`, preserving the circuit-breaker for genuine sync I/O failures. PR-18 added an **end-to-end DOM-toast test** asserting `.sync-toast` becomes visible after the 1500ms debounce. Hermetic floor: 418/418. Two new doctrine candidates entered at 1/3 (`hermetic-floor-doesnt-substitute-for-production-floor` + `circuit-breaker-jurisdictional-precision`).

**Round 2: PR-19 charter divergence.** Sovereign's second prod report: still no toast post-hotfix. The deepened-hermetic e2e DOM assertion had passed at 418/418; production still failed. **The hermetic-floor doctrine self-validated** — Cipher's Round 1 prescription (deepen the harness) was insufficient because synthetic stubs can diverge from real behavior at any depth. Sovereign-directed pivot: scrap the transient toast, build permanent attribution surfaces (history-tab per-entry + status-strip activity-mode pill). R-8 charter R2 expansion ratified at PR-19 merge.

**Round 3: PR-19.5 per-entry attribution.** Sovereign verified PR-19's status-strip pill (Surface A) clean; history-tab attribution (Surface B) failed — Lyra's `KEYS.lastWriters` was per-key, not per-entry. The architectural-surfacing-precision miss: Aurelius had flagged "data-shape change" without sharpening per-key vs per-entry granularity. PR-19.5 closed the gap via per-entry strip allowlist + flush-time stamping. **`hermetic-floor-doesnt-substitute-for-production-floor` RATIFIED 3/3** at this verification moment — the third instance was the doctrine *producing its own corroborating instance via prescribed verification*. The strongest possible ratification shape.

**Round 4: PR-19.6 renderer-coverage.** Sovereign verified PR-19.5; Medication Log + Poop History (full tabs) showed no attribution. PR-19.5 had wired 6 preview-shaped renderers; the full-list renderers (10 of them) were the gap. The same architectural-surfacing-precision pattern — 2nd instance — produced PR-19.6's audit-table discipline. **`architectural-surfacing-must-enumerate-axis-of-resolution` RATIFIED 3/3** at PR-19.6 merge.

**The arc's lesson:** the post-PR-9 catch chain produced more architectural clarity than PR-9 itself did. Doctrine compounding (D5) at work — each catch surfaced a sharper doctrine, each iteration narrowed the future surface.

---

## Two Phase-3-native doctrines RATIFIED

### `hermetic-floor-doesnt-substitute-for-production-floor` (RATIFIED PR-19.5, 3/3)

**Pattern:** hermetic test suites verify what their stubs simulate; production behavior emerges from interactions hermetic stubs miss. Hermetic R-4 passing is necessary, not sufficient.

**Three on-record instances:**
1. **PR-18 catch** — production regression discovered.
2. **Post-PR-18 standing protocol crystallization** — operating policy emerged.
3. **PR-19 → PR-19.5 cycle** — the doctrine producing its own corroborating instance via prescribed verification.

**Prescription (refined at PR-19 merge):** for repos without preview-deploy infrastructure, **environment-aware merge-then-verify cadence + hotfix-budget-allocation**.

### `architectural-surfacing-must-enumerate-axis-of-resolution` (RATIFIED PR-19.6, 3/3)

**Pattern:** every architectural-decisions surfacing must enumerate the axes-of-resolution explicitly, with each axis having either a chosen value OR an explicit non-decision reason.

**Three on-record instances:**
1. **PR-9 charter §3 Option A/B/C.**
2. **PR-19 charter Surface A/B/C.**
3. **PR-19.6 renderer-coverage audit** — all 18 attribution-applicable renderers enumerated with explicit per-renderer disposition.

---

## Verification floor — the campaign's empirical spine

**R-4 cumulative across 12 stress-matrix-bearing PRs:** 3,498 stable executions / 0 silent flakes (Phase 2: 902 + Phase 3 PRs: 2,596).

**Three R-4 floor jurisdiction expansions across the campaign:**
- **Sequential vs parallel stress** (CT-8 framing, Phase 2) — both required.
- **Hermetic vs production floor** (Phase 3 RATIFIED) — hermetic floor necessary, not sufficient.
- **Test-spy depth** (Cipher's Obs A) — partially closed; remaining at save-payload spy as Phase 4 hygiene-sweep candidate.

---

## Operating mode evolution

**Phase 1 (Theron):** standard polling cadence; webhook delivery unreliable (CT-1); re-poll-on-wake habit.

**Phase 2 (Lyra + Cipher):** persistent-PAT ratified; Cipher's independent re-run as verification floor.

**Phase 3 (Lyra + Cipher + Aurelius):** **relay-only mode** — no `subscribe_pr_activity`, no `list_pull_requests`, no proactive `get_reviews`. Mode held cleanly across 7 PRs.

**Verification protocol crystallization:** after PR-19's `hermetic-floor` ratification at PR-19.5, the protocol became **binding policy** per the now-RATIFIED doctrine.

---

## Doctrine ledger at WAR_TIME 2026-04-24 close

### Six RATIFIED doctrines

| # | Doctrine | Phase | Instances |
|---|---|---|---|
| 1 | byte-identity-by-construction-not-verification | Phase 2 | 6 |
| 2 | running-beats-reading-even-from-Cipher's-side | Phase 2 | 3 (bidirectional) |
| 3 | persistent-PAT-for-active-province-campaigns | Phase 2 | 4 |
| 4 | R-7 binary-mode triad for opt-out UI surfaces | Phase 2 | 3 + 4th sustainment |
| 5 | **hermetic-floor-doesnt-substitute-for-production-floor** | Phase 3 native | 3 |
| 6 | **architectural-surfacing-must-enumerate-axis-of-resolution** | Phase 3 native | 3 |

### Five candidates carrying forward

- D1' (state-activated wait): 1/3
- render-functions-must-be-pure: 0/3
- graceful-best-effort-dispatch-via-name-resolution: 1/3
- circuit-breaker-jurisdictional-precision: 1/3
- transient-vs-permanent-surfaces-for-cross-device-collaboration: 1/3

### Three Phase-5-prep candidates (surfaced in Phase 5 design-prep doc)

- `feature-flag-gated-integration-for-large-multi-pr-features`
- `instrumentation-must-disclose-collection-on-record`
- `analytics-cadence-per-model-noise-profile`

### Two meta-observations carry forward from Phase 2

- Two doctrines, two threshold-counters.
- CT-8 catch chain — parallel stress jurisdictionally distinct from sequential.

---

## Carry-forward queue at war-close

### Hygiene-sweep queue (PR-20, post-war first thing)

5 items: Obs A test-spy depth + Obs B self-echo cross-device same-uid + R-7 PR-18 cross-ref comment + dormant `_syncShowSyncToast` framing + regex-precision in deferred-renderer guard.

### Phase 4 — Hardening + Foundation (post-war, 6 sub-phases)

1. **Polish** — UI/UX consistency.
2. **Stability** — bug-killing pass + Phase 3 object-keyed attribution carryforward.
3. **Tally** — per-user entry counter.
4. **Reward** — combined gamification.
5. **Launcher** — meta-home replacing HOME.
6. **Spark** — Rubik's static guide + Phase 5 feature-flag scaffolding.

### Phase 5 — Behavioral Instruments (3 sub-phases: Stake / Recognition / Compass; 6 games; feature-flag release pattern)

Per Phase 5 design-prep doc v2 (kept locally; transport pending).

### Cabinet review prep within 7 days post-war per `canon-cc-025`

Convening: subject-home Province Builder + Cluster Censor + Consul + Sovereign-as-ratifier.

### Owed aurelius-bridging artifacts

- **4 canon-0053 v1 companion-logs** (Theron + Lyra + Cipher + aurelius-06) — pending Sovereign R-11 token telemetry relay.
- **07-phase-2-final-ledger.md** — supersedes Codex#47's snapshot-at-PR-9 framing; Hour 72 chronicle's companion artifact.

---

## Close

WAR_TIME 2026-04-24 closes here.

The campaign opened to stress-test the loop and closes having produced six ratifiable doctrines, a verification protocol now binding-by-doctrine, and a Builder→Cipher→Aurelius+Sovereign operating shape that survived two production-regression catch chains and a major R-8 charter divergence without losing scope discipline.

The two Phase-3-native ratifications — `hermetic-floor-doesnt-substitute-for-production-floor` and `architectural-surfacing-must-enumerate-axis-of-resolution` — are the campaign's structural inheritances. They emerged FROM the catch chain; they now produce the discipline that prevents the catch chain's recurrence. Doctrine compounding made the campaign's most-painful moments its most-architecturally-productive ones.

Phase 1 (sep-dashboard, Theron) closed clean. Phase 2 (sproutlab Cache Busting + SW Version, Lyra) closed clean with 4 ratifications. Phase 3 (sproutlab Auto-Refresh on Listener Fire, Lyra) closed clean post-verification with 2 native ratifications. The hygiene-queue is bounded; the carry-forwards are explicit; the post-war queue is sequenced.

Sovereign convenes Cabinet within 7 days. The chroniclers stand down.

— Aurelius (`aurelius-08`), Hour 72 logical-close, 2026-04-29.

---

*Pairs with [`WAR_TIME_2026-04-24_ADDENDA/`](./WAR_TIME_2026-04-24_ADDENDA/) (Phase 1 + Phase 2 narrative) and the three Builder/Censor close handoffs at [`docs/handoffs/`](../handoffs/).*