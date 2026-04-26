# 02 — Habits

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)
**See also:** [`01a-doctrines.md`](./01a-doctrines.md) · [`01b-operational-rulings.md`](./01b-operational-rulings.md) · [`05-process-flow.md`](./05-process-flow.md)

Process habits that held under campaign stress. Standing orders for sessions inheriting the operating shape — not constitutional, but battle-tested in the 72-hour window.

---

## Cipher review gate (between Builder and Aurelius)

**Shape:** Builder opens PR → Cipher posts advisory review (`ack` / `request-changes` / `escalate`) → Aurelius posts final review → Sovereign nods on merge → Aurelius executes squash-merge.

**Authority:**
- Cipher posts review comments only — no merges, no commits, no pushes.
- Aurelius merges communication logs solo; structural changes require Sovereign nod (R-14).
- Cipher escalates to Sovereign only for genuinely architectural / ambiguous calls; routine judgement stays with the gate.

**Cipher-specific jurisdiction:**
- Independently re-runs Builder's Playwright suite in his own sandbox.
- Verifies citation integrity against `data/canons.json` (D8).
- Probes Builder's framings empirically when something looks off (PR #7 round-1 caught a "visible-but-useless" framing that turned out wrong).
- Catches body-text drift from actual diff (D8).

---

## Re-poll-on-wake (webhook delivery is unreliable)

**Standing rule:** On every user turn, before any other action, re-poll all subscribed PRs.

**Mechanics:** `mcp__github__pull_request_read` with methods `get`, `get_reviews`, `get_review_comments`, `get_comments`, `get_check_runs`. Compare against last-seen state; surface only what's new.

**Why:** Webhook delivery (`<github-webhook-activity>` events) dropped consistently throughout this campaign. Cipher's reviews, Theron's pushes, and PR-body edits all delivered via manual relay rather than the subscription pipe. Subscription is bonus, not primary.

**Defense in depth:** Every review or ack ends with an explicit handoff line (`→ <Actor>: <action required>`). Even if the webhook fails and the event is relayed by Sovereign via copy-paste, the instruction survives transport.

---

## Branch-per-PR for post-squash workflows

**Standing rule (R-2):** After a squash-merge, the head-branch is "done." New work cuts a fresh single-purpose branch off `origin/main`.

**Naming:** `claude/<repo-shorthand>-<phase>-<slug>`.

**Examples observed in campaign:**
- `claude/inv-1-2-P1` through `claude/inv-1-2-P5` (Solara's polish slate)
- `claude/dash-phase-2-arm-playwright` (Theron's atomic arming)
- `claude/dash-phase-2-spec-review` (Theron's pure-charter PR)
- `claude/dash-phase-2-sw-hardening` (Theron's production-bug fix)
- `claude/dash-phase-3-1-month-lock` through `claude/dash-phase-3-3-csv-export`
- `claude/dash-hygiene-sweep-1`

**Discipline:** Old branches are abandoned post-merge (or deleted). Local checkouts must `git fetch origin && git checkout main && git pull` before cutting a new branch.

---

## Atomic arming PR + arming-directive shape

**Standing rule (R-3, R-4):** Test infrastructure (Playwright + chromium + scaffold + first smoke tests) lands as one atomic arming PR, separate from the first feature that uses it.

**Province-specific arming directives** (R-15): Builder's arming directive is tailored to their province. No copy-paste between sibling provinces.

**Components of an arming PR:**
- `package.json` + `pnpm-lock.yaml` (tracked)
- `playwright.config.ts` with `retries: 0` (R-6)
- Local static server in `tests/e2e/` (zero-dep Node stdlib preferred)
- `tests/e2e/smoke.spec.ts` covering 4 baseline criteria specific to the province
- `.gitignore` allowlist + dev-artifact ignores
- Build Rule #1 amendment doc if applicable (R-12)

**Solara's bundle exception (one-off):** sep-invoicing PR #3 bundled arming + first feature; accepted as one-off because retroactive splitting would be wasteful and scope stayed disciplined. Going forward, atomic arming is canonical.

---

## Triad spec test pattern (R-7)

**Default test-shape for visible-state changes:**

1. **Positive** — new state renders with expected content.
2. **Regression guard** — legacy / absent state is NOT there.
3. **Positive regression** — new state is absent when real data exists.

**Why test 3 matters:** Without it, a buggy condition (e.g. `ranked.length >= 0` instead of `=== 0`) that always renders the empty-state would silently shadow real data and pass tests 1+2.

**Eleven of fourteen** sep-invoicing slate tests use this shape. Held cleanly across sep-dashboard's validation guards (semantic adaptation: positive + regression A + regression B for paired booleans).

---

## Hygiene queue maintenance (R-10)

**Per-session discipline:** Each Builder session maintains a hygiene queue of dead-code findings, helper-backports, and deferred citation comments. Disclosed in PR bodies so the queue is visible across sessions.

**Flush trigger:** 3–5 items → atomic hygiene-sweep PR (`claude/<repo>-hygiene-sweep-<n>`). Below threshold, items wait.

**Sweep PR shape:**
- Each item is its own atomic concern within the PR.
- Net source LOC trends negative (sweeps remove dead surface).
- No new feature scope; Aurelius rejects sweeps that drift into feature territory.

---

## Stress-validation reps for new test infrastructure

**Standing rule:** When test infrastructure is new (arming PR, helper extraction, race-condition fix), Builder runs the suite under multiple configurations:

1. **Single full suite** — first-pass green at default workers.
2. **CI=1 (workers=1) `--repeat-each=5`** — sequential stress, catches state-bleed.
3. **Default (workers=2) `--repeat-each=5`** — parallel stress, catches load-dependent timing races.

**Cipher independent re-run:** Same three configs in Cipher's sandbox.

**Empirical payoff:** PR #6's load-dependent flake reproduced in 3/8 parallel runs; isolated re-runs all passed. Without parallel-stress reps, the flake would have shipped.

---

## Independent re-run as Cipher's verification floor

**Standing rule (R-4 expansion):** Cipher does not trust Builder's self-reported test results. He re-runs the suite in his own sandbox before posting any review.

**Three properties verified:**
1. Reproducibility — Cipher's run matches Builder's pass/fail counts.
2. Determinism — suite passes cleanly under stress reps.
3. Coverage matches description — spec body actually asserts what the Builder claims.

**Caught:** PR #6 flake (Builder pass / Cipher fail). PR #7 round-1 framing (Builder claimed "visible-but-useless"; Cipher's empirical probe showed actual mutation).

---

## Token discipline (state-cache messaging)

**Adopted:** Mid-campaign after Sovereign flagged poll-cost concerns.

**Practices:**
- **Lightweight metadata polls first.** `list_pull_requests` with `perPage: 5`, sorted by updated, only fetch full reviews when there's reason to think they exist.
- **State-cache message line** at the end of substantive turns: `[state] inv-main@<sha> / dash-main@<sha> / open-PRs: ... / open-sessions: ... / hour ~N of 72`.
- **Tight reviews.** Aurelius reviews stay focused on rulings + handoffs; commit messages carry the full chronicle.
- **Trust Cipher relays.** When Sovereign relays a Cipher review, light-poll to confirm metadata; don't re-fetch the full review body.

**Why:** Token usage on parallel multi-session campaigns compounds. Idle sessions are cheap (no continuous burn), but each wake re-includes context.

---

## Handoff line discipline

**Standing rule:** Every Cipher review, every Aurelius review, every Builder PR body ends with explicit handoff lines:

```
→ <Actor1>: <specific action required>
→ <Actor2>: <specific action required>
```

**Why:**
1. Webhook delivery is unreliable; if an event is relayed via copy-paste, the instruction survives.
2. Multi-actor PRs have ambiguity by default; explicit handoffs eliminate "who's up next" guesswork.
3. Future readers (post-war Cabinet, future Chronicler) reconstruct the loop without context spelunking.

---

## Chronicler / Aurelius cross-cuts

**Re-poll on wake — applies here too.** Aurelius polls all subscribed PRs at every user turn before drafting reviews.

**Doctrine ratification on-record.** Every doctrine (D-series) and ruling (R-series) gets named in an Aurelius review at the PR where it crystallized. Codex-side commit (this addenda) consolidates afterward.

**Bridging authorship.** When a Builder session is closed and Aurelius needs to author on their behalf, per `canon-cc-025 §G` the authorship is flagged `aurelius-bridging` (not `aurelius`). Bridging is for absent voices only — live sessions draft their own.

---

*Reusable text artifacts (prompts, directives, templates): [`03-drafts.md`](./03-drafts.md). Process flow: [`05-process-flow.md`](./05-process-flow.md).*
