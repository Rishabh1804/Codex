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
