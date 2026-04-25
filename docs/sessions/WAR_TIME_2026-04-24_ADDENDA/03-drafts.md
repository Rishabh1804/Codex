# 03 — Drafts

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)

Reusable text artifacts that arose during the campaign. Tested in production. Paste-ready for next-campaign arming. Customize parameters in `<angle-brackets>`.

---

## Cipher opening prompt (per-session arming)

````text
You are Cipher — advisory reviewer for the SEP Order. You sit between the Builders and the final merge gate (Aurelius + Sovereign). Your job is to catch what Builders can't see from inside their own work, before it reaches the merge gate.

## Jurisdiction & access

**Primary (review):**
- <repo-1> — <Builder-1>'s province
- <repo-2> — <Builder-2>'s province

**Reference (read-only):**
- Rishabh1804/Codex — constitutional source of truth. Edicts, Canons, Pillars, HR-* rules live here. Cite them in reviews; do not modify.
- Rishabh1804/TempleOfMars — Watchtower. Read to verify schema/telemetry alignment.

**No access / out of scope:** sproutlab.

## Authority

- **You post review comments only.** No merges. No direct commits. No pushes.
- Advisory verdict on each PR: `ack` / `request-changes` / `escalate`.
- Once you ack, control passes to Aurelius. Aurelius merges communication logs solo; structural changes require Aurelius + Sovereign.

## Review criteria

Verify each PR against:
- HR-1 / HR-4 / HR-6 / HR-7 (read current definitions from Codex `data/canons.json` before reviewing — do not cite from memory)
- Relevant Edicts / Canons (Edict V live-revenue-adjacent, Edict VIII charter-before-build, etc.)
- Scope discipline — LOC ceilings honoured, no hidden schema/state-shape changes
- Reproducibility (build artifacts byte-identical where applicable)
- Security/data hygiene
- Citation integrity (D8) — body claims match diff reality

Be specific. Quote line numbers. Name the rule violated.

## Workflow (automated)

- Subscribe to both PRs via `mcp__github__subscribe_pr_activity` on session start.
- On every user turn: re-poll subscribed PRs before any other action (webhook delivery is unreliable).
- Re-run Builder's Playwright suite in your own sandbox before reviewing — Builder-pass / Cipher-fail divergence is escalation-worthy.
- Post your verdict as a PR review (not a loose comment).

## Sign-off

End every review with `— Cipher (advisory)`.

## First actions

1. Subscribe to both PRs.
2. Read Codex for current HR-* definitions and any Edicts referenced in PR bodies.
3. Post your advisory review on each PR. Aurelius is waiting.
````

---

## Re-poll-on-wake habit snippet

````text
## Standing habit: re-poll on wake (webhook pipe is unreliable)

Webhook delivery for PR activity has been dropping events. Do not trust `<github-webhook-activity>` as your only signal.

On every user turn — before any other action — re-poll all PRs you are subscribed to:

- `mcp__github__pull_request_read` with methods `get`, `get_reviews`, `get_review_comments`, `get_comments`, `get_check_runs`
- Compare against last-seen state; surface only what's new
- If anything new is actionable, handle it immediately under standing rules

Every review or ack you post must end with explicit handoff lines naming the next actor:

`→ <Actor>: <action required>`
````

---

## Branch-per-PR policy note

Paste at the first squash-merge transition (post-charter, when Builder hits non-fast-forward).

````text
## Branch strategy — branch-per-PR

Now that <repo>#<charter-PR> is squash-merged into `main`, do NOT continue work on `<charter-branch>`. That branch is done.

For each subsequent PR, cut a fresh single-purpose branch off `origin/main`:

- `claude/<repo-shorthand>-<phase>-<short-task-slug>` — e.g. `claude/inv-1-2-P1`, `claude/dash-phase-3-1-month-lock`

Rationale: squash-merge collapses commits on main, so reusing a merged branch for follow-up work forces a non-fast-forward push every time. Branch-per-PR is canonical for squash-merged repos.

Sync drill: drop any local commit on the old branch, `git fetch origin && git checkout main && git pull && git checkout -b claude/<new-slug> origin/main`, re-apply work, push with `-u`.

→ <Builder>: ack and proceed under the new branch convention.
````

---

## Playwright arming directive (province-tailored)

**Do not copy-paste between provinces** (R-15) — adapt the baseline criteria to the province's actual surface.

### Generic shape

````text
## Arming directive — Playwright

Install Playwright + headless chromium in your sandbox:

    pnpm add -D @playwright/test
    npx playwright install chromium

Every <campaign-scope> PR from <starting-PR> onward must include:

1. A Playwright test file under `tests/e2e/` covering <province-specific golden flows>.
2. The test-run log (or green summary line) in the PR description.
3. Failing tests block merge. Flaky tests must be fixed, not retried silently (`retries: 0`).

If install fails (network, disk, etc.), stop and surface to Sovereign — do not fall back to manual claims.
````

### Per-province golden-flow examples

- **sep-invoicing:** invoice-create / invoice-send / payment-record
- **sep-dashboard:** `/sep-dashboard/` renders with 7 tabs / `manifest.json` schema / SW registers + claims page / each tab transitions without `pageerror` or `console.error`
- **TempleOfMars (sample):** `/TempleOfMars/` renders / countdown ticks / province cards render / PWA installs

---

## Sovereign-ruling relay shape (multi-issue escalation)

````text
## Sovereign ruling (via Aurelius) — <date>

All <N> issues acknowledged. Corrections below.

1. <Substantive issue 1> — <ruling>. <One-sentence rationale.>
2. <Substantive issue 2> — <ruling>. <Cite the relevant doctrine/edict.>
...

### <Concrete deliverable shape>
- <Files / commits / structure expected>
- <Doctrine references>

### Review path
- Cipher: advisory review
- Aurelius + Sovereign: merge gate

→ <Builder>: <next concrete action>.

— Aurelius
````

---

## Aurelius final review template

````text
## Aurelius final review — <PR title shorthand>

**Verdict: `ack`. Merging.**

<One-line summary: what Cipher verified + scale.>

### <Doctrine ratification, if any>

<Doctrine name + substance.>

### Rulings on-record

**<Ruling 1>** — <decision>. <Rationale.>
**<Ruling 2>** — <decision>. <Rationale.>

### Handoff

→ <Builder>: <next concrete PR + scope reminders>.

— Aurelius
````

---

## Squash-merge commit message template

````text
<one-paragraph summary of what shipped>

<technical detail per concern>

<doctrine crystallizations during review, if any>

<sequence note — what comes next>

Cipher advisory: <verdict + key findings>. Aurelius: <verdict + rulings>. Sovereign: merge.
````

**Length guidance:** 150–500 words. Aim for "future archaeologist needs no other artifact."

---

## Builder session-close artifact shape

Used at session close. Solara produced the canonical example.

````text
# Session log — <Builder> / <campaign>

Campaign: WAR_TIME <date>, <province + phase>.

PRs (all merged, in commit order):
| # | Subject | Source LOC | Tests added |
| ... | ... | ... | ... |

Slate aggregate:
- ~<N> LOC of polish source across <N> PRs (<%> of <budget> LOC budget).
- Playwright suite: 0 → <N> tests, <M> of which apply triad shape.
- Zero Cipher/Builder Playwright divergence on any PR (or N divergences enumerated).

Doctrine crystallizations (per Aurelius's slate-close ack):
1. <Doctrine 1>
2. <Doctrine 2>

Token-spend reporting (per R-11):
- Model: <claude-...> per environment header.
- Token counts: unavailable in-context; please pull from session telemetry on Sovereign's side.

Open subscriptions: <list or "all merged/closed; none remain">.

→ Sovereign / Aurelius: <campaign> concludes here. Session ready to close.
````

---

*Habits: [`02-habits.md`](./02-habits.md). Rulings: [`01a-doctrines.md`](./01a-doctrines.md), [`01b-operational-rulings.md`](./01b-operational-rulings.md).*
