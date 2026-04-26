# 01a — Doctrines (D-series)

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)
**See also:** [`README.md`](./README.md) · [`01b-operational-rulings.md`](./01b-operational-rulings.md)

D-series captures observed patterns about how the system works. Named after enough independent instances to establish them as patterns rather than coincidences. All entries are **candidate doctrine** pending post-war Cabinet review.

---

### D1 — `navigator.serviceWorker.ready` for SW activation waits

**Ratified:** sep-dashboard#6 merge.

**Substance:** Atomic `await navigator.serviceWorker.ready` inside a single `page.evaluate` collapses wait + read into one round-trip. Eliminates the inter-call window between a `waitForFunction` returning and the subsequent `getRegistration()` snapshot.

**Anti-pattern:** `waitForFunction` predicates that accept `(active || installing || waiting)` — under load, `installing` becomes truthy before the `waitUntil` promise resolves, producing race-conditioned cache-empty failures.

**Evidence:** PR #6 round-1 (Cipher request-changes) caught a ~37% flake under parallel load on `tests/e2e/sw_install.spec.ts`. Cipher's prescribed fix (`reg.active`) still flaked at ~14%. Theron's atomic switch to `serviceWorker.ready` produced 100/100 across four stress configs.

---

### D2 — Fix sibling races on discovery

**Ratified:** sep-dashboard#6 merge; reinforced sep-dashboard#7, #8.

**Substance:** When a defect's pattern is found in one site, scan and fix all siblings in the same PR with explicit disclosure. Mirrors `inv-1-2 P2`'s duplicate-site discipline (Solara's `im.js:149` + `:349` fix).

**Discipline:** Disclose the scope expansion explicitly in the PR body. Edict V reconcile-window transparency.

**Evidence:** PR #6 — Theron extended the sw.js race fix to `smoke.spec.ts` test 3, removed unused helper. PR #7 — three round-2 guards added after Cipher's empirical probe proved round-1's "visible-but-useless" framing wrong (`togglePeriod`, `setProdCap2`, `togglePickerWorker` all mutated `sep_prod_log_v1` directly under lock).

**Anti-pattern:** Stopping at the literal site named in the charter when the pattern obviously extends.

---

### D3 — Doctrine self-validation cycle (16-minute interval observed)

**Ratified:** sep-dashboard#7 merge.

**Substance:** Newly ratified doctrines surface their own incomplete application on the next contact. Pattern shape: **catch → iterate → ratify → next surface.**

**Evidence:** D2 ratified at PR #6 close (07:39:18Z). PR #7 round-1 opened sixteen minutes later (07:55:35Z) and surfaced its own incomplete D2 application — the round-1 sibling sweep stopped one cluster short of the production-write paths. Cipher's empirical probe caught the gap; Theron iterated; D2 deepened.

**Implication:** The arming jurisdiction is doctrine-surfacing, not just regression-catching. Each ratification produces a candidate gap on the next surface, which produces a refinement, which compounds (see D5).

---

### D4 — Independent convergence as signal

**Ratified:** sep-dashboard#7 merge.

**Substance:** When two independent reads (Builder + Cipher, separate sandboxes, no coordination) arrive at the same workaround for an obstruction, that's a stability anchor — not coincidence.

**Evidence:** PR #7 — Theron and Cipher independently hit the same `STATE`-not-on-`window` scoping issue when seeding test fixtures, and independently arrived at the same workaround.

**Implication:** Two independent paths to the same solution is signal that the solution sits at a real shape of the problem, not a sandbox artifact.

---

### D5 — Doctrine compounding

**Ratified:** sep-dashboard#8 merge; empirically validated through #9, #10, #11.

**Substance:** Early prescription/iteration cycles pay forward as proactive application in subsequent PRs. The catch → iterate → ratify → next surface pattern (D3) flattens cycles when ratified doctrine pre-empts the gap on next surface.

**Empirical evidence:**

| PR | Cycles to clean | Doctrines applied |
|---|---|---|
| #7 dash-3-1 | 2 (request-changes + delta-check) | D2 partial round-1 → D2 (full) + R-3 |
| #8 dash-3-2a | 1 (clean) | R-3, D2, R-9 |
| #9 dash-3-2b | 1 (clean) | R-3, D2, D5 |
| #10 dash-3-3 | 1 (clean) | R-3, D2, D5, hygiene-queue |
| #11 hygiene-sweep | 1 (clean code) | R-3, D2, D5, D8 |

Four consecutive clean-on-round-1 PRs after D5 ratification.

**Implication:** Investment in doctrine surfacing during early PRs amortizes across the campaign.

---

### D6 — Builder-may-improve-on-prescription

**Ratified:** sep-dashboard#10 merge; evidence across #6, #9, #10.

**Substance:** The prescription dance is *"deliver the intent better if you see how,"* not *"execute the prescription literally."* When Builder sees a better path that preserves the prescriber's intent and earns its keep, Builder takes it and surfaces the improvement on-record.

**Evidence — three on-record instances:**

| PR | Builder's improvement | Over prescription |
|---|---|---|
| #6 | `serviceWorker.ready` (atomic) | Cipher's `reg.active` polling |
| #9 | `_helpers.ts` (generic) | Aurelius's `_dialog-helper.ts` |
| #10 | `csvCell`'s `String(v ?? '')` defensiveness | baseline inline `String(v)` |

Three independent instances → pattern.

---

### D7 — Lock guards writes, not reads

**Ratified:** sep-dashboard#10 merge (CSV export).

**Substance:** Locks gate edit affordances. Reads remain accessible by default. Made explicit by Theron's read-availability framing on the export buttons (exports remain available under month-lock because they're read actions on locked-month records).

**Implication:** B3 (invoice PDF), B4 (charts), and any future read-shaped feature remain available under lock. Default: "read paths bypass lock; write paths are guarded."

---

### D8 — Citation-integrity as a Cipher-canonical review surface

**Ratified:** sep-dashboard#11 merge (hygiene sweep).

**Substance:** Citation integrity is first-class Cipher review jurisdiction, not polish nit. Pattern: *Builder reads change correctly; description drifts.* Cipher's externalized eyes catch what the Builder's mental model can't see.

**Evidence — three on-record instances:**

| PR | Builder citation | Correct |
|---|---|---|
| sep-invoicing#1 charter | HR-7 (zi-innerhtml) for dark-mode work | HR-5 (css-tokens) |
| sep-invoicing#2 / #4 polish | canon-0002 / transposed parens-labels | canon-0006 / correct numbering |
| sep-dashboard#11 | "byte-for-byte" for CSV refactor | semantically equivalent under RFC 4180 |

**Implication:** Citation slip is signal that Builder's mental model and the artifact disagreed somewhere. Treat citations with the same care as code.

**Self-validation note (Codex#45 round-1 review):** Cipher caught 2–3 D8-class slips inside *this very addenda* — D2-vs-R-3 misframing in the D5 table, D7 misattribution in CT-7's mitigation line, hour-number drift in the Hour 24 chronicle. The doctrine self-validates within its own ratification artifact, mirroring D3's 16-minute cycle. *Catch → iterate → ratify → next surface* applies recursively to the addenda itself.

---

*Operational rulings (R-series) live in [`01b-operational-rulings.md`](./01b-operational-rulings.md).*
