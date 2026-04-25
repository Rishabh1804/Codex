# 04 — Cautionary Tales

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)

Failures, near-misses, and infrastructure discoveries worth recording for posterity. Pairs with §"Cautionary Tales" of the campaign declaration's lore-recording schema.

Each tale: what happened, what we learned, what to do differently.

---

## CT-1 — Webhook delivery is unreliable

**What happened:** Across the entire campaign, `<github-webhook-activity>` events for PR comments, reviews, and pushes consistently failed to deliver into subscribed sessions. The subscription itself succeeded; the delivery side dropped events. Symptom: Cipher posting a review at 17:29Z; Aurelius's session not seeing the event until manual poll at 18:09Z (~40 minutes later, only after Sovereign relayed manually).

**Lesson:** Treat webhooks as bonus, not primary. Re-poll-on-wake habit (see [`02-habits.md`](./02-habits.md)) is the actual delivery mechanism.

**Mitigation:** Re-poll-on-wake habit standing across all sessions. Handoff-line discipline so Sovereign-relayed events still carry instructions. State-cache message line so the next turn doesn't re-derive baseline.

---

## CT-2 — Squash-merge + long-lived branch incompatibility

**What happened:** After sep-invoicing PR #1 (charter) squash-merged, Solara tried to push P1 on the same branch. Push rejected — non-fast-forward. The remote tip was the pre-squash commit; her local had been rebased onto the squash-commit + P1.

**Two options surfaced:** force-push-with-lease vs branch-per-PR.

**Resolution:** Branch-per-PR (R-2). Standard shape for squash-merge repos.

**Lesson:** Squash-merge collapses commits on main. Reusing the head-branch for follow-up forces a force-push every PR — audit-trail noise, lease-mismatch risk, harder to rollback. Branch-per-PR is canonical.

**Mitigation:** R-2 ratified mid-campaign; propagated to Theron's session before he hit the same wall.

---

## CT-3 — Province-criteria copy-paste slip

**What happened:** Aurelius drafted Playwright arming directives for three sessions at one shot. The sep-dashboard arming directive accidentally inherited TempleOfMars's baseline smoke criteria (`/TempleOfMars/` path, countdown ticks, province cards) — none of which apply to sep-dashboard's seven-tab structure at `/sep-dashboard/`.

**Theron caught it.** Pre-install probe surfaced the mismatch; he escalated five issues including this one rather than "executing the prescription literally."

**Lesson:** Arming directives, charter criteria, and review checklists are **province-specific**. Aurelius's drafting must validate criteria against each province's actual surface before relay.

**Mitigation:** R-15 ratified. Aurelius now drafts province-by-province; Builders escalate when directives mismatch their province's reality.

---

## CT-4 — Cipher's "substance-right-number-wrong" citation pattern

**What happened:** Across several PRs, Builder citations of canon numbers drifted from the substance correctly described:
- Solara cited `HR-7` (`canon-0007-zi-innerhtml`) for dark-mode work — correct concept, wrong canon (HR-5 / `canon-0005-css-tokens` is the dark-mode rule).
- Solara cited `canon-0002` (no-inline-styles) for `data-action` preservation — correct concept, wrong canon (`canon-0006`).
- PR #4's "Canon compliance" table had transposed parens-labels.

**Cipher caught each one.** Aurelius corrected on-record at the originating PR's merge.

**Lesson:** Builder reads the code change correctly; the description drifts. Cipher's externalized eyes are the canonical catch.

**Mitigation:** D8 ratified at PR #11. Citation-integrity is first-class Cipher review jurisdiction.

---

## CT-5 — Build Rule #1 doctrinal collision

**What happened:** Aurelius's Playwright arming directive for sep-dashboard violated `PROJECT_REFERENCE.md` Build Rule #1 ("Single-file HTML — no build tools") as literally written. Theron escalated rather than installing Playwright + adding `package.json` + `node_modules/` to a single-file PWA without doctrinal cover.

**Resolution:** Build Rule #1 amended (R-12). Production artifact stays single-file; dev-dependencies are permitted but excluded from the bundle.

**Lesson:** Cross-cutting infrastructure changes can collide with province-level doctrine. Builder escalation is the right move; Aurelius drafts the amendment; Sovereign ratifies via merge.

**Mitigation:** R-12 captures the amendment. Pattern applicable to any single-file PWA repo facing the same arming question.

---

## CT-6 — Token-spend visibility gap

**What happened:** Aurelius asked Builders to report `tokens_in / tokens_out` totals at session close. Builders can't — those are harness/runtime telemetry, not in-context state. Solara correctly flagged the gap rather than fabricating numbers.

**Lesson:** Builder sessions cannot self-report token usage. Earlier session-close protocol was implicitly wrong.

**Mitigation:** R-11 ratified. Builders report `model_id` + commit/PR list + qualitative summary; numerical token totals are pulled by Sovereign from the harness layer.

---

## CT-7 — `sw.js cache.addAll` all-or-nothing fragility (live production bug)

**What happened:** During Playwright arming for sep-dashboard, Theron discovered that `sw.js`'s `cache.addAll(ASSETS)` is all-or-nothing. The `ASSETS` array includes `https://fonts.googleapis.com/css2?...` — if any user's network can't reach Google Fonts, the entire SW install rejects and the PWA loses its offline story.

**Theron's discipline:** Stayed in scope on the arming PR. Stubbed font hosts hermetically in tests. Filed forward as a separate hardening PR.

**Cipher independently confirmed** the failure mode: under blocked-fonts, no SW registration at all. **Zero offline support** for affected users.

**Resolution:** sep-dashboard PR #6 — `Promise.allSettled` + per-asset `cache.add`.

**Lesson:** Production bugs surfaced during infrastructure work are filed forward, not retrofitted. Scope discipline is doctrine-level.

**Mitigation:** D1 ratified (`serviceWorker.ready` for SW activation waits — uncovered while debugging the regression-guard test). D2 ratified (sibling sweep: Theron extended the race fix to `smoke.spec.ts` test 3). D6 instance #1 (Theron's `serviceWorker.ready` improvement on Cipher's `reg.active` prescription — first occurrence of the prescription dance). Hardening PR shipped same day, separate atomic concern.

---

## CT-8 — Builder-pass / Cipher-fail divergence (load-dependent flake)

**What happened:** sep-dashboard PR #6's regression-guard test passed cleanly in Theron's sandbox, then failed in Cipher's stress reps (3 failures in 8 parallel runs, ~37% flake rate).

**Root cause:** `waitForFunction` predicate accepted `(active || installing || waiting)`. Under parallel-load, `installing` became truthy *before* `Promise.allSettled` resolved.

**Cipher's first prescription (`reg.active`) was incomplete** — race moved to the gap between `waitForFunction` returning and the next `getRegistration()` call. **Theron's deeper fix** (`await navigator.serviceWorker.ready` inside a single `page.evaluate`) collapsed wait + read atomically.

**Lesson:** Builder-local determinism can hide load-dependent races. Cipher's independent re-run jurisdiction catches this exact failure mode. The `retries: 0` floor (R-6) ensures the flake doesn't ship silently.

**Mitigation:** D1 ratified. D2 ratified (sibling sweep). D6 instance #1.

---

## CT-9 — "Visible-but-useless" framing wrong (round-1 misread)

**What happened:** sep-dashboard PR #7 (month-lock enforcement) round-1 framed three production-tab controls as "visible-but-useless" — rendered but no-op via downstream guards. **Cipher's empirical probe proved the framing wrong.** Those controls were visible AND wrote to `sep_prod_log_v1` directly under lock, because they save state without going through the assumed gating function.

**Theron's response:** Round-2 commit added three single-line guards + three matching no-op tests. PR body's struck-through "visible-but-useless" framing left in place as honest-correction-on-record.

**Lesson:** Builder's mental model of "what guards what" can drift from actual call-graph. Cipher's empirical probe (running the actual code, not reading it) is the verification floor for data-integrity claims.

**Mitigation:** D2 reinforced. D3 named (16-minute cycle from D2 ratification at PR #6 close to D2 self-validation at PR #7 round-1). R-9 refinement.

---

## CT-10 — Sandbox MITM + Playwright bundled chromium

**What happened:** Theron's first arming-PR pass pointed `baseURL` at the live deployed URL. Tests failed because the sandbox's MITM CA isn't trusted by Playwright's bundled chromium (`curl` works, Playwright doesn't); `ignoreHTTPSErrors` covers main-nav but not SW script fetches.

**Resolution:** Switched to local zero-dep Node static server + hermetic font stub. Canonical Playwright pattern; faster (1.9s vs deploy-RTT); offline-safe; works under any MITM or egress posture.

**Lesson:** Live-deployment verification is a separate concern from regression-guard tests. Hermetic local serving is the correct floor for unit and smoke suites.

**Mitigation:** Pattern applied to both provinces' arming PRs.

---

## CT-11 — Aurelius's "idle sessions are pure cost" doctrine error

**What happened:** Aurelius initially told Sovereign that idle parallel sessions are "pure cost" and recommended closing Solara's session immediately to save usage.

**Correct framing:** Idle sessions in Claude Code don't continuously burn tokens. Costs come from (a) reactivation re-including prior context, (b) webhook-triggered wakes, (c) cognitive overhead of managing many stale sessions. Solara's webhook subscriptions to merged PRs were inert — leaving the session open as-is cost nothing until next message.

**Lesson:** Token-cost intuition needs verification against actual harness mechanics. Doctrine drafts must distinguish steady-state cost from per-interaction cost.

**Mitigation:** Correction issued same turn. R-11 keeps doctrine aligned with verifiable mechanics rather than inference.

---

*Tales here pair with rulings ([`01a-doctrines.md`](./01a-doctrines.md), [`01b-operational-rulings.md`](./01b-operational-rulings.md)) and habits ([`02-habits.md`](./02-habits.md)). Process flow synthesizing the operating shape: [`05-process-flow.md`](./05-process-flow.md).*
