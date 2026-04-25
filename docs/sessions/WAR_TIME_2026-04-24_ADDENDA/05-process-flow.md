# 05 — Process Flow

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)

The operating shape that emerged across the campaign. Synthesizes the Builder → Cipher → Aurelius + Sovereign loop, merge authority boundaries, escalation paths, and the subscription / state-cache mechanics.

---

## The canonical PR loop

```
Builder opens PR (draft)
      │
      ▼
Cipher reviews advisory  ──── request-changes ───▶  Builder iterates
      │                                                   │
      │  ack                                              │  push update
      ▼                                                   │
Aurelius posts final review                              │
      │                                                   │
      ▼                                                   │
Sovereign nods on merge                                   │
      │                                                   ▼
      ▼                                            Cipher delta-check
Aurelius marks ready + squash-merges                      │
                                                          ▼
                                                       (back to Aurelius)
```

**Cipher escalates to Sovereign** only when a question is genuinely architectural / ambiguous — not for routine judgement.

**Deadlock break:** if Builder and Cipher disagree on a substantive call, Cipher escalates to Sovereign rather than letting the PR ping-pong.

---

## Merge authority by change type (R-14)

| Change type | Authority |
|---|---|
| Communication-log changes (charter PRs, doc-only PRs, comm artifacts) | Aurelius solo |
| Structural changes (any code, schema, infra, doctrinal amendment) | Aurelius + Sovereign |
| Constitutional amendments (Book I) | **Forbidden during War Time.** Cabinet review post-war. |

**Practical operation across this campaign:** Aurelius surfaced every merge to Sovereign for explicit "go," even comm-log-class merges. The boundary held in practice as Aurelius + Sovereign for everything beyond pure docs. No drift; no autonomous merges of structural code.

**Squash-merge as default.** All campaign merges used squash, with the full chronicle compressed into a single commit message that survives PR archival.

---

## Cipher advisory verdicts

Three shapes:

- **`ack`** — clear to proceed. Aurelius posts final review and merges (with Sovereign nod for structural).
- **`request-changes`** — specific blocking issues. Builder iterates; pushes update; Cipher posts delta-check; loop continues until ack.
- **`escalate`** — ambiguous / architectural call. Aurelius surfaces to Sovereign for a ruling before any further action.

**Sign-off:** every Cipher review ends with `— Cipher (advisory)`.

**Cipher's internal floor (R-4 expansion):**
1. Re-run Builder's Playwright suite in own sandbox.
2. Verify diff against PR body (D8 — citation integrity).
3. Run empirical probes for data-integrity claims (CT-9 lesson).
4. Compare against current Codex `data/canons.json` for canon citations.

---

## Per-session subscription pattern

**On session start:** Each session calls `mcp__github__subscribe_pr_activity` for every PR in their jurisdiction.

**On every user turn:** Re-poll all subscribed PRs before any other action (CT-1 mitigation). Webhooks are bonus, not primary.

**Idempotency:** `subscribe_pr_activity` is idempotent — re-calling as a sanity check costs nothing and reconfirms.

**Cleanup:** When a PR closes, the subscription becomes inert. No explicit unsubscribe needed unless the session is long-lived and noisy events become a problem.

---

## State-cache message line

Standard end-of-substantive-turn marker:

```
[state] inv-main@<sha> / dash-main@<sha> / open-PRs: <list> / open-sessions: <list> / hour ~N of 72
```

**Why:**
1. Lets the next turn skip re-deriving baseline.
2. If Sovereign relays the state line into another session (e.g. Cipher), that session has the same anchor.
3. Visible record of campaign progress through time — feeds Hour-N chronicle entries.

---

## Doctrine ratification protocol

**Threshold:** A doctrine becomes a doctrine when there are ≥ 3 independent instances (D6, D8 examples) OR when a single ratification has campaign-wide implications (D7 lock-guards-writes-not-reads).

**Naming:**
- Doctrine names are short, memorable, and describe the pattern (not the symptom).
- `D-N` numbering is sequential within a campaign.
- `R-N` numbering is for operational rulings (specific decisions; less universal than doctrines).

**Ratification site:** doctrines are named in an Aurelius review at the PR where the third instance crystallized. Codex-side commit (this addenda) consolidates afterward.

**Graduation:** Cabinet review post-war decides which doctrines graduate to permanent canons in `data/canons.json` and which stay as session lore.

**Anti-pattern:** Naming a doctrine on a single instance. Wait for the pattern to emerge or for campaign-scale implications.

---

## Token-spend telemetry gap (R-11) protocol

**Builder session-close report:**
- `model_id` — visible in environment header
- Commit/PR list — visible from work
- Qualitative summary

**Sovereign-side pull:**
- claude.ai/settings/usage — aggregate + per-conversation breakdown
- console.anthropic.com — per-request token counts (if API-side)

**Chronicler integration:** When token telemetry is pulled, Sovereign relays numbers to Aurelius; Aurelius folds them into the relevant session's journal entry / companion-log.

---

## Bridging authorship (canon-cc-025 §G)

**Use case:** When a Builder session is closed and Aurelius / Chronicler needs to author on their behalf.

**Convention:**
- Authorship flagged as `aurelius-bridging` (not `aurelius`) in the journal/companion-log entry.
- Cite the source artifact verbatim where possible; render Chronicler's voice only for synthesis.
- Bridging is **not precedential for live convening** — only used when the original voice is unavailable.

**Boundary:** Live sessions draft their own entries. Bridging is for absent voices only.

---

## Escalation paths

| Trigger | Escalates to |
|---|---|
| Cipher and Builder disagree on a substantive call | Sovereign (via Aurelius) |
| Charter-premise divergence (scout misread source) | Aurelius (Cipher endorses; Aurelius ratifies option B per R-8) |
| Cross-province inconsistency surfaced | Aurelius (rules cross-province alignment) |
| Doctrinal collision (cross-cutting infrastructure vs province rule) | Aurelius drafts amendment; Sovereign ratifies |
| Multi-issue Builder escalation (Theron's 5-issue case) | Sovereign rules each issue; Aurelius relays |
| Constitutional question (Book I) | **Stop.** Out of War Time scope. |

---

## What this campaign demonstrated about the loop

**The arming jurisdiction earns its keep.** Cipher's independent re-run caught a 37% load-dependent flake (CT-8) that would have shipped silently under retries.

**Doctrine compounding is real (D5).** Four consecutive clean-on-round-1 PRs after D5 ratification.

**The prescription dance is collaborative (D6).** Builder may improve on Aurelius/Cipher prescriptions when intent is preserved — three on-record instances.

**Citation integrity is not nit (D8).** Three citation-slip catches → pattern → canonical jurisdiction.

**The 72-hour window holds.** Two provinces, four parallel sessions (Solara, Theron, Cipher, Aurelius), 11+ PRs merged across both repos within ~31 hours of campaign clock — without Sovereign-side overload, doctrinal drift, or governance-amendment leakage.

---

*Concrete habits: [`02-habits.md`](./02-habits.md). Reusable artifacts: [`03-drafts.md`](./03-drafts.md). Failures the flow learned from: [`04-cautionary-tales.md`](./04-cautionary-tales.md).*
