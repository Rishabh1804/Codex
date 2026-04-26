# 01b — Operational rulings (R-series)

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)
**See also:** [`README.md`](./README.md) · [`01a-doctrines.md`](./01a-doctrines.md)

R-series captures specific decisions made in response to specific situations. Set the operating policy for the campaign. All entries are **candidate doctrine** pending post-war Cabinet review.

---

### R-1 — War Time canon-scope ruling: cite by number, ignore `scope` field

**Ratified:** sep-invoicing#1 charter merge.

**Substance:** For the duration of War Time, Builders cite canons by number regardless of the `"scope"` field in `data/canons.json`. Cipher verifies substance; nobody blocks on scope-field semantics.

**Origin:** Cipher flagged that canons 0001–0012 carry `"scope": "sproutlab"` while sep-invoicing has been following them as de-facto shared hygiene.

**Sunset:** Post-WAR_TIME, Cabinet review formalizes cross-province propagation or re-scopes individually.

---

### R-2 — Branch-per-PR for post-squash workflows

**Ratified:** sep-invoicing#1 → #2 transition (Solara's non-fast-forward push).

**Substance:** After a squash-merge, the head-branch is "done." Each PR cuts a fresh single-purpose branch off `origin/main`, named `claude/<scope>-<slug>`.

**Naming convention:** `claude/<repo-shorthand>-<phase>-<slug>` (e.g. `claude/inv-1-2-P1`, `claude/dash-phase-3-1-month-lock`).

**Standing rule:** the harness's "develop on this branch" instruction is scoped to the originating task. New sub-task = new branch.

---

### R-3 — Atomic-canon (one concern per PR)

**Ratified:** First applied sep-dashboard#3; reaffirmed throughout.

**Substance:** One PR = one atomic concern. Hygiene work, infrastructure arming, doctrinal amendments, and feature work each get their own PR.

**Refinement (PR #7 merge):** "The threshold gates UI/feature scope, not data-integrity remediation." LOC-overshoot to close real defects is correct, not creep.

**Refinement (PR #8 merge):** Dead-code findings batch into a hygiene-sweep queue, not standalone PRs. Threshold: 3–5 items.

---

### R-4 — Playwright arming required for all parallel sessions

**Ratified:** Mid-campaign at PR #2 close (sep-invoicing).

**Substance:** Each Builder, Cipher, and Aurelius arms with Playwright + chromium. Every non-doc PR ships with a Playwright test file under `tests/e2e/` plus a passing run-log in the PR description. Failing tests block merge.

**Cipher's expanded jurisdiction:** Independently re-runs Builder's Playwright tests in own sandbox. Builder-pass / Cipher-fail divergence is escalation-worthy (caught for the first time at PR #6).

---

### R-5 — P1 grandfather clause (one-time, retired)

**Ratified and retired:** sep-invoicing#2 merge.

**Substance:** PR #2 merged on static verification only because Solara opened it under prior (ambiguous) policy and the change was genuinely static-verifiable. Static-verification-only gating is **retired with this clause**.

**Implication:** One-shot and historical. Future grandfather clauses are not implied; each is a separate Sovereign call.

---

### R-6 — `retries: 0` floor doctrine

**Ratified:** sep-dashboard#3; cross-province aligned at sep-dashboard#4.

**Substance:** Playwright suites run at `retries: 0` unconditionally. Flaky tests must be fixed, not retried silently. With hermetic test setup the legitimate network-flake surface is near zero, so retries can only mask real regressions.

**First payoff:** PR #6 (sw.js hardening) — the `retries: 0` floor caught a ~37% load-dependent flake that would have shipped silently under retries.

---

### R-7 — Triad spec idiom

**Ratified:** sep-invoicing#5 (P3) merge.

**Substance:** For empty-state, conditional-render, and feature-affordance changes, three Playwright tests:

1. **Positive** — new state renders with expected content.
2. **Regression guard** — legacy / absent state is NOT there.
3. **Positive regression** — new state is absent when real data exists.

**Coverage:** Eleven of fourteen sep-invoicing slate tests use this shape. Held cleanly across sep-dashboard validation guards (PR #8, #9).

**Implication:** Default test-shape for visible-state changes. Departures need explicit reasoning.

---

### R-8 — Charter-premise divergence (option B)

**Ratified:** sep-invoicing#4 (P4) merge.

**Substance:** When the charter's literal description rests on a scout's misread of source, the Builder may re-scope in-flight to address the underlying polish *intent*. Discipline: disclose the divergence explicitly per Edict V; offer Aurelius the option to overturn (option A).

**Evidence:** sep-invoicing P4 charter described "blank SVG → muted-text fallback" but the empty-state was already muted text. Solara re-scoped to upgrade the opaque copy + add CTA; Cipher endorsed; Aurelius ratified.

**Boundary:** Option B is not a license to redesign. The scope must stay within the charter's polish ceiling.

---

### R-9 — Split-threshold doctrine

**Ratified:** sep-dashboard#5 charter merge; refined sep-dashboard#7.

**Substance:** When a feature PR's authored diff exceeds **~200 LOC source** or **~150 LOC tests**, split along a natural seam. Below threshold, single PR is fine.

**Refinement (R-9'):** The threshold gates UI/feature scope, not data-integrity remediation. Round-2 LOC-overshoot to close a data-mutation hole (PR #7) is the right call.

**Builder discretion:** Threshold is a trigger, not a hard line. Builder judges at authoring time and discloses the call.

---

### R-10 — Hygiene-sweep doctrine

**Ratified:** sep-dashboard#8 merge.

**Substance:** Dead-code findings, helper-backports, deferred citation comments, and other non-blocking hygiene items accumulate into a per-session hygiene queue. **3–5 items** → atomic hygiene-sweep PR. Below threshold, items wait.

**Discipline:** Each PR's body discloses any item logged to the hygiene queue. Hygiene PRs are scope-tight: only items from the queue, no new feature surface.

**Evidence — first sweep:** sep-dashboard#11 closed three carried-forward items (dead `startNewInvoice`, `exportGSTRegister` escaper backport, perm-side over-advance test gap). Net −62 LOC.

---

### R-11 — Token-spend telemetry gap

**Ratified:** Mid-campaign at Solara's session close.

**Substance:** Builder sessions don't have direct in-context access to `tokens_in / tokens_out` totals — those are harness/runtime telemetry.

**Adjustment:** At session close, Builders report `model_id` (visible in environment header) + commit/PR list + qualitative summary. Numerical token totals are pulled by Sovereign from the harness layer (claude.ai/settings/usage or console.anthropic.com).

---

### R-12 — Build Rule #1 amendment (sep-dashboard, pattern-applicable)

**Ratified:** sep-dashboard#3 merge.

**Substance:** The production artifact (`index.html`) remains single-file, no build step required to ship or run it. Dev-dependencies for testing and CI (`package.json`, `pnpm-lock.yaml`, `node_modules/`, `playwright.config.ts`, `tests/e2e/`) are permitted but strictly excluded from the production bundle and gitignored.

**Origin:** Theron's escalation when arming with Playwright violated `PROJECT_REFERENCE.md` Build Rule #1 as literally written.

**Pattern applicability:** Any single-file PWA repo facing the same arming question.

---

### R-13 — "Slot" vocabulary

**Ratified:** sep-dashboard#5 charter merge.

**Substance:** In War Time vocabulary, **one slot = one feature PR end-to-end (open to merge)**, not a 15-minute code chunk. Multi-agent flow overhead is the cost of the review gates; that cost buys the regression guarantees.

**Origin:** Cipher flagged that `NEXT_SESSION_SPEC.md` sized features in 10–20 minute solo-burn estimates; the charter sized per-PR.

---

### R-14 — Aurelius merge authority boundary

**Ratified:** Sovereign's framing in opening shift instructions.

**Substance:**

- **Communication-log changes** (charter PRs, doc-only PRs, ceremonial deploy fixes) → **Aurelius merges solo**.
- **Structural changes** (any code, schema, infra, or doctrinal amendment) → **Aurelius + Sovereign merge gate**.

**Edge case:** sep-invoicing#1 charter PR carried both a comm-log payload (slate lock) and a one-line deploy-step fix. Treated as comm-log because the code change was mechanical. For this campaign, Aurelius surfaced merges of every kind to Sovereign for explicit "go" — the boundary held in practice as Aurelius + Sovereign for everything beyond pure docs.

---

### R-15 — Provincial-criteria specificity

**Ratified:** Implicitly after Theron's escalation on Aurelius's TempleOfMars→sep-dashboard arming directive slip.

**Substance:** Arming directives, charter criteria, and review checklists are **province-specific**. Copying acceptance criteria from one province to another silently produces non-applicable tests.

**Discipline:** Aurelius drafts province-specific directives. Builders escalate when directives mismatch their province's reality.

---

*Reusable drafts: [`03-drafts.md`](./03-drafts.md). Process habits: [`02-habits.md`](./02-habits.md). Failures and near-misses: [`04-cautionary-tales.md`](./04-cautionary-tales.md).*
