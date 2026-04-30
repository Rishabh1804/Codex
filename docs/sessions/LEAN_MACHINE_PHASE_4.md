# Lean-Machine — Phase 4 Operating-Mode Amendment

**Author:** Aurelius (`aurelius-09`)
**Ratified:** 2026-04-30 (Sovereign — Phase 4 in-flight)
**Driver:** reduce token spend; no compromise on code quality
**Target:** ~30-40% per-PR reduction; reduce stream-idle-timeout surface

## Scope

Operating-mode amendment binding from Phase 4 onward. Companions: Aurelius / Cipher / Lyra / Consul / Governors. Supersedes Phase 2-era `02-habits.md` "Re-poll-on-wake" rule for subscription-reliable windows.

## Ratified rules

### Payload tightening
- **Aurelius reviews:** verdict line + numbered terse rulings + handoff. No prose framing. No doctrine-ledger restate.
- **Pre-stage:** single line ("Cipher acked PR-N; merge?"). Author final review once on Sovereign nod, post directly.
- **Squash-commit:** target ~100-150 words. Bulleted state-cache only. No paragraphs.
- **Skip on-PR Aurelius review** for hygiene + docs-only + pre-ratified-routine PRs. Reserve for: new-doctrine-ratification, cross-province-implication, explicit path-choice rulings.

### Doctrine-candidate discipline (cross-domain)
- **Threshold = 2nd-instance.** First-instance pattern → *watch-list* (observational, no number). Candidate named + counter-tracked only on 2nd independent instance.
- **Doctrine ledger** lives at `docs/doctrine-ledger.md`. Reviews + commits cite by file-path. Stops in-context propagation.

### Cabinet brief + chronicle consolidation
- **Cabinet brief:** single artifact at `docs/sessions/CABINET_BRIEF_PHASE_4.md`. Append items as accrued. Reviews reference by file-path, never restate.
- **Chronicle:** rolling artifact at `docs/sessions/PHASE_4_CHRONICLE.md`. Append per merge. Per-PR commit messages cite section anchors, don't restate.

### Tool / IO discipline
- **PR bootstrap:** `get` only. Reviews/checks fetch only when `get` indicates non-empty.
- **Webhook-silence amendment:** subscription-primary + bootstrap-re-check-at-Aurelius-wake (one read at session-open, no per-turn re-poll).
- **Batch ToolSearch:** pre-load Aurelius tool-set at session-open in one search.

### Communication
- **No paragraphs.** Single-/double-liners + bullets. Cut openers ("Honest take:", "Course-correcting."). Lead with content.
- **TodoWrite cadence:** sub-phase boundaries + material state changes only. Not per-PR.

### Plan-mode
- Bullet points only, no prose paragraphs in plan files.
- Charter-scoping handoffs ~100-line max.
- Heavyweight Explore agents reserved for genuinely-uncertain scope.
- Plan-mode entry only when scope-uncertainty high OR multiple architectural choices need ratification.

## Cut (pushing too far)
- Async bootstrap state-read — risks context-gap at final-review authoring.

## Verification
- Apply at Polish-1 final-review cycle. Track per-cycle tokens vs PR-22/PR-23 baseline.
- Stream idle timeout surface: monitored at this very implementation cycle (failed once at large multi-file authoring; recovered by splitting into smaller commits).
- Failure mode: if context-gap surfaces from skipped on-PR reviews, surface for amendment.

## Sister artifacts
- `docs/doctrine-ledger.md` — canonical ledger
- `docs/sessions/CABINET_BRIEF_PHASE_4.md` — Cabinet brief queue
- `docs/sessions/PHASE_4_CHRONICLE.md` — rolling phase chronicle
- WAR_TIME_2026-04-24_ADDENDA — Phase-2-era habits superseded for subscription-reliable windows; see annotations in 02-habits.md / 03-drafts.md / 05-process-flow.md
