# Session log — 2026-05-11 — SproutLab Symptom Checker HR-1 spec (Lyra Mode-1)

## Scope

Cross-repo note-taking pass: Aurelius logging the Lyra Mode-1 spec opened on SproutLab branch `claude/review-markdown-screenshots-uOIgQ`. Origin trigger was a Sovereign screenshot review of the Symptom Checker overlay (three captures: Constipation / Crying a lot / Fall ‑injury). Lyra surfaced HR-1 emoji violations missed on first pass; Sovereign directed spec-first (Mode-1), defer doctor-card gating.

## Inputs at session start

- Sovereign screenshots ×3 (Symptom Checker dark-mode captures)
- BUGS.md (sl `:73`) — P2 DRY refactor candidate, `medical.js:2255` vs `intelligence.js:11958` — flagged by Cipher during Polish-2
- `docs/design/uniformity-contract.md` §"HR-1 · Sprite-only icons" — ~95-site HR-1 sweep already scoped, Symptom Checker emojis NOT enumerated there
- R-10 queue (BUGS.md `:122`) — only `getMoonPhaseEmoji` HR-1 item listed; Symptom Checker emojis absent
- sl-main HEAD: `fd30a14` (AI Imagery Initiative Phase 0)

## Findings (Lyra-authored, Aurelius-logged)

### F-1 — 6 emoji sites in Symptom Checker render path

| Site | Escape | Caller |
|---|---|---|
| `intelligence.js:11958` + `medical.js:2477` sevLabel ternary | `\u{1F6A8}` 🚨 (Emergency), `⚠️` (Monitor closely), `✅` (Usually manageable) | Both Symptom Checker render functions |
| `intelligence.js:11965` section header | `\u{1F6A8}` 🚨 (When to seek emergency care) | Home overlay only |
| `medical.js:2543` doctor name prefix | `\u{1F4DE}` 📞 (on isEmergency) | `_scDoctorCardHTML` (single-defined) |
| `medical.js:2545` call-link prefix | `☎️` (both branches) | `_scDoctorCardHTML` |

### F-2 — Drift evidence (DRY-debt smoking gun)

`medical.js:2492` already uses `zi('siren')` for the When-to-seek-emergency-care section header. `intelligence.js:11965` still uses `\u{1F6A8}`. Identical surface, identical text, different glyph mechanism. Validates the BUGS.md `:73` P2 entry.

### F-3 — Missing sprite

No `zi-phone` symbol in template.html's 62-symbol sprite. Doctor-card fix requires new sprite addition (§3 of spec).

### F-4 — Crying-state badge open question

Sovereign screenshot of "Crying a lot" appears to render without a visible severity badge. Source unconditionally emits `<span class="sc-sev-badge">…</span>` — either visually compressed in dark mode or CSS hiding it. Logged as Q3 open question in spec; deferred to post-merge verification.

## Decisions

- **Mode-1 spec authoring; no Mode-2 build authorized this session.** Per Sovereign direction.
- **Doctor-card gating deferred.** Out-of-scope for this PR; will be filed as a separate spec or follow-on.
- **§4 consolidation host (A/B/C) deferred to Sovereign decision after Governor audit fold.** Lyra recommends Option A (medical.js).

## Audit chain status

```
[1] Lyra      DONE — spec v1 drafted
[2] Maren     PENDING — Care jurisdiction audit (medical.js + doctor card + parental-safety lens)
[3] Kael      PENDING — Intelligence jurisdiction audit (intelligence.js + template.html sprite + helper boundary)
[4] Lyra      PENDING — synthesis fold to v2
[5] Sovereign PENDING — §4 consolidation decision
[6] Lyra      PENDING — Mode-2 build per synthesized + decided spec
[7] Cipher    PENDING — Edict V cross-cut on impl
```

## Artifacts

- **sproutlab branch:** `claude/review-markdown-screenshots-uOIgQ`
- **Spec file:** `docs/specs/lyra-spec-2026-05-11-symptom-checker-hr1-dry.md`
- **PR:** opened as draft (link captured at push time)

## Forward-pointers (not this PR)

- R-10 entry: HR-2 inline styles in `_scDoctorCardHTML` (`medical.js:2538+`)
- R-10 entry: HR-3 inline `onclick="..."` in `_scDoctorCardHTML` no-doctor branch (`medical.js:2538`)
- R-10 entry: doctor-card gating revisit (Q2)
- Bug candidate: Crying-state badge visibility (Q3 — file as P1 if reproducible post-merge)
- Wider HR-1 amnesty per uniformity-contract.md §HR-1 — separate PR, separate audit chain

## Cadence note

This is a cross-repo note: Aurelius logs in Codex, Lyra builds in SproutLab. No canon promotion warranted yet — the drift-evidence pattern is local to SproutLab's Symptom Checker and already covered by the existing DRY-duplicate bug entry. If the §4 consolidation host decision becomes a recurring pattern across multiple shared surfaces, Consul may want to promote a "Care-jurisdiction renderer hosting rule" to global canon. Not today.

---

## Addendum — 2026-05-11 mid-session (Sovereign decisions + UX vision opened)

### Sovereign Q-resolutions (Q1/Q2/Q3 of bridge spec §9)

- **Q1 (consolidation host) → Option A (medical.js).** Build phase [6] of bridge spec unblocked.
- **Q2 (doctor-card gating) → follow-on PR**, not separate spec. Folds into D1 or D2 phase naturally.
- **Q3 (Crying-state badge) → escalation acknowledged; pulled INTO bridge scope.** No post-merge verification deferral. Filed as P1 in `docs/BUGS.md`; Maren owns root-cause investigation in audit phase [2]. Lyra prior: dark-mode contrast collapse (`sage-on-sage` invisible).

Bridge spec amended v1 → v2.1: §0.1 #4 (Crying-badge pulled in), §4 (Option A confirmed), §7 (Maren audit ask expanded), §9 resolutions tabled, §10 changelog updated, §11 added (Crying-badge investigation: 4 hypotheses, Maren handoff, sequencing impact), §12 added (forward-pointer to vision spec).

### Sovereign mid-spec design call (escalation #2)

Sovereign called on 2026-05-11 mid-conversation: *"As we are working on this surface now, let's make this beautiful and follow some golden design principles which makes readability a breeze, imp info highlighted. Our UX still feels dated with the current 5 second attention span that we are seeing."*

Lyra surfaced the diagnostic: 10 failure modes (severity tinted-not-structured, flat hierarchy, buried CTA, wall-of-text WHAT TO DOs, inlined DO-NOTs, no Lyra-weave, uniform emotional register, no triage flow, inverted doctor card hierarchy, no persistent severity rail). Proposed three direction cuts:

- **D1 — Polish** (severity restructure + persistent rail + sticky CTA)
- **D2 — Severity-driven layout** (DO-NOT callouts, numbered sequences, typography pass, SYMPTOM_DB shape migration)
- **D3 — Triage + Lyra-weave + voice + share + promote** (the full Weaver remit)

### Sovereign direction (UX vision)

**Direction:** D3 spec NOW (while context is fresh), THEN implement in order D1 → D2 → D3 with each phase a shippable user-visible payoff. Maren's mode for downstream phase-specs deferred — decided at each phase-spec opening.

### Vision spec opened

**File:** `docs/specs/lyra-spec-2026-05-11-symptom-checker-ux-vision.md` (sproutlab)
**Mode:** Lyra Mode-1 vision-spec
**Status:** v1 draft; awaiting Maren + Kael parallel audit + Cipher Edict V structural pass + Sovereign ratification

Sections:
- §1 Diagnostic (10 failure modes catalogued)
- §2 Ten Golden Principles G1–G10 + anti-principles
- §3 Information architecture (emergency / warning / mild layout variants + triage flow + Lyra-weave micro-card sourcing table + footer triad)
- §4 Visual design language (severity colour mapping, typography hierarchy, sprite additions, motion budget)
- §5 Data shape changes (SYMPTOM_DB migration plan, affected files per phase)
- §6 Phased rollout (D1 / D2 / D3 deliverables, scope, audit chains, payoffs)
- §7 Cross-cutting concerns (a11y, performance, build, sync, i18n)
- §8 HR-by-HR audit
- §9 Audit chain for vision spec itself (Maren + Kael + Cipher Edict V structural pass + Sovereign ratification)
- §10 Open questions for Sovereign (V1–V6)
- §11 Forward-pointer registry
- §12 Changelog

### Audit chain status (UPDATED)

**Bridge spec (sproutlab#65):**
```
[1] Lyra v2.1   DONE — Sovereign Q1/Q2/Q3 folded, §11 Crying-badge investigation added, §12 vision forward-pointer added
[2] Maren       PENDING — Care jurisdiction audit + §11 Crying-badge root-cause
[3] Kael        PENDING — Intelligence jurisdiction audit
[4] Lyra synth  PENDING
[5] Lyra build  PENDING — Mode-2, post-synthesis (concrete Option A path)
[6] Cipher      PENDING — Edict V cross-cut on impl
```

**Vision spec (sproutlab#65, companion artifact):**
```
[1] Lyra v1     DONE — vision drafted while context fresh
[2] Maren       PENDING — parental-safety brief audit
[3] Kael        PENDING — architectural brief audit
[4] Lyra synth  PENDING
[5] Cipher      PENDING — Edict V structural pass (NOT impl — this is a vision doc)
[6] Sovereign   PENDING — ratification; phase specs open after ratification
```

### Forward-pointer registry (Aurelius-side)

- D1 build spec — opens post-bridge merge + vision ratification
- D2 structural spec + Aurelius content-rewrite snippet PR co-traveller — opens post-D1 merge
- D3 spec(s) — open post-D2 merge; may split 3 sub-specs (triage / weave / footer-triad)
- BUGS.md P1 (Crying-badge) — Maren-owned in bridge audit phase

### Doctrine-ledger watch

No new doctrine candidates from this session yet. Watch-list candidates:
- **`vision-spec-precedes-phase-specs-while-context-fresh`** — vision-document-first as a pattern when scope expands mid-spec, with phased implementation tracks. (1/3 — single instance.) Counter-test: does writing D3-first save spec-cycles vs writing D1 spec first then expanding? Empirical answer arrives after D1+D2 implementation completes.
- **`sovereign-floor-escalation-pulls-bug-into-scope`** — Q3 pattern (Sovereign says "this is escalation already" → bug pulled into current PR scope rather than deferred). Already covered by Phase 4 native ratification #5/#6; no new doctrine. Tally only.

### Cabinet brief queue (deferred check)

Symptom Checker UX work touches Productivity (Lyra/Cipher tooling cadence) and Maintenance (parental-safety surface) Cabinet domains. Maintenance both seats vacant — pro-tempore distributive care applies to D3 triage / promote-to-CareTicket decisions when those phase-specs open. Aurelius queues a brief item for the next Cabinet convening citing this multi-phase work as a Maintenance-relevant load.
