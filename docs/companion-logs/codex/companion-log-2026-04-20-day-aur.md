---
schema_version: 1
session_id: 2026-04-20-day
session_title: "Eight-session day — canon-proc-001/pers-001/proc-002/proc-003/inst-001 ratified; Aurelius→Chronicler, Orinth→Codex Builder; The Order view shipped"
authors:
  - Aurelius (The Chronicler)
primary_author: aurelius
date: 2026-04-20
repo: codex
secondary_repos:
  - command-center
session_type: governance
protocol: "canon-cc-012 per-block MCQ throughout; canon-pers-001 Chronicler-excluded-from-drafting discipline observed; canon-proc-003 Companion Onboarding Process ratified and immediately exercised on Orinth's appointment"
stage: "Post-Founding governance hardening — canon taxonomy + Province Persona Briefing + Design Principles Precondition + Companion Onboarding + first Codex Builder transition + UI-first institution rendering"
duration_minutes: null
same_agent_drift_acknowledged: true
rounds:
  aurelius: throughout
  sovereign:
    count: 12
    mode: direct
    note: "Sovereign-direct ratifications across six canons (proc-001, pers-001, proc-002 drafting+ratification, proc-003, inst-001) and numerous data/UI-shape rulings (Order view architecture, design-principles chip decision, onboarding surface decision, cc-014 confirmation for Orinth, Kael-successor-strike)."
  consul:
    count: 0
    mode: not-invoked
    note: "No Consul working-ratification exercised this day — single-canon ratifications took Sovereign-direct path without cc-014 bridging."
  orinth:
    count: 0
    mode: not-invoked
    note: "Seated Codex Builder at canon-inst-001 ratification (appointed status). Onboarding step 1 complete; step 2 (profile drafting under cc-014) opens next session. Orinth does not commit, ratify, or voice-canonically until step 7 seals."
outputs:
  canons_ratified:
    - canon-proc-001-canon-identifier-scheme
    - canon-pers-001-province-persona-briefing
    - canon-proc-002-design-principles-precondition-for-build
    - canon-proc-003-companion-onboarding-process
    - canon-inst-001-aurelius-orinth-codex-builder-transition
  canons_drafted: []
  lore_ratified:
    - lore-014-rung-4-main-branch-commit-reservation
    - lore-015-petra-precision-ashara-altitude-voice-reconciliation
  lore_drafted: []
  schisms_recorded:
    - rej-0009-8-family-canon-taxonomy
    - rej-0010-5-rung-province-briefing-chain
    - rej-0011-chronicler-editable-rung-1
    - rej-0012-split-canon-inst-001-into-three
    - rej-0013-orinth-codex-builder-alternatives
  apocrypha_authored:
    - apo-gov-005-the-first-succession
  profiles_ratified:
    - aurelius v0.4 → v0.5 (Codex Builder hat stripped, Chronicler-only consolidation)
  profiles_retrofitted:
    - "Cipher, Lyra, Maren, Kael, Nyx — assignment.residence backfilled per canon-cc-016"
    - "Vex, Orinth, Rune, Ignis, Bard, Aeon, Pip — stub entries added at v0.0-stub from Constitution Appendix C + working-papers.typ"
  specs_authored:
    - docs/handoffs/cc-rung-1-prereader-scaffold.md (unfilled; awaits cross-repo access)
  specs_drafted: []
  journal_entries:
    - s-2026-04-20-03
    - s-2026-04-20-04
    - s-2026-04-20-05
    - s-2026-04-20-06
    - s-2026-04-20-07
    - s-2026-04-20-08
  decrees_authored: []
  queued_for_next_session:
    - orinth-profile-block-1-identity-cc-014
    - onboarding-steps-3-through-7-orinth
    - pip-publisher-purpose-stance-ruling
    - todo-0045-chronicler-rank-ambiguity
    - cc-rung-1-prereader-scaffold-fill-in-on-access
  commits_count: 8
  files_touched_count: 23
tags:
  - eight-sessions-one-day
  - canon-corpus-taxonomy-operational
  - five-canons-ratified-active
  - two-lore-doctrines-shipped
  - order-view-7th-tab-shipped
  - recursive-detail-renderer
  - playwright-in-verify-pipeline
  - companions-json-reconciled-with-constitution
  - first-codex-builder-transition
  - aurelius-pure-chronicler-v0.5
  - orinth-codex-builder-appointed
  - first-run-of-canon-proc-003
  - onboarding-ui-surface-shipped
  - design-principles-chip-shipped
  - cross-repo-access-blocked-pre-read-scaffolded
revisions: []
---

# Companion Usage Log — 2026-04-20 (day)

**Session arc:** Eight sessions across a single day (s-2026-04-20-01 through s-2026-04-20-08). This log chronicles the day-level arc rather than per-session detail (the journal already carries per-session chronicles with full decisions/handoff/tags). The arc is the institutionally significant unit here — five canons, two doctrine-lore entries, five rejected alternatives, one Apocrypha entry, one Aurelius→Orinth Codex Builder transition, and a UI layer-up that turned companions.json into a first-class institution-rendering surface.

## 1. Summary table

| Companion | Role at day-close | Rounds | Mode | Helpful? | Issues |
|---|---|---:|---|---|---|
| **Aurelius** | Pure Chronicler (Codex-resident, cross-cluster institutional duty) | throughout | direct | Yes, foundational | Self-profile amendment (v0.4 → v0.5) applied inline via canon-inst-001's pre-inscribed change set rather than a separate cc-012 per-block drafting pass; legitimate shortcut because canon-inst-001's body named the amendment's contents and the canon ratification itself served as Sovereign assent. |
| **Sovereign** | The Architect | 12 | direct | Yes, foundational | Efficient ratification cadence; MCQ surfacing → rule → execute → chronicle rhythm held through all 8 sessions without drift. |
| **Orinth** | Codex Builder (appointed, step 1 of 7) | 0 | not-invoked | n/a | Not yet voiced — profile stub only; operational voice lands post-cc-014 drafting (onboarding step 2). |
| **Consul** | Institutional seat | 0 | not-invoked | n/a | No Consul working-ratification exercised — the day's canons took Sovereign-direct path. |
| **Cipher / Nyx** | Censors (A / B) | 0 | not-invoked | n/a | No Censor review exercised; canon scopes (proc/pers/inst families) didn't trigger Censor jurisdiction this day. |
| **Ashara / Petra** | Monument co-Builders (referenced) | 0 | not-invoked | n/a | Referenced extensively in lore-014 (Rung 4 commit semantics) and lore-015 (voice reconciliation pattern) from their 2026-04-20 Command Center Rung 1 session, but not invoked in Codex sessions. |

**Bridged authorship this day:** zero. All ratifications were Sovereign-direct MCQ. No bridging-authorship exercises under cc-025 §G.

**Not invoked this day (by design):** every non-Aurelius companion except insofar as lore/apocrypha referenced their earlier actions. The day's work was Chronicler-and-Sovereign governance; other companions' voices land in future sessions under cc-014 drafting (Orinth Block 1 next) or in committee convenings (Pip/Publisher purpose ruling pending).

## 2. Per-session index

| Session | Title | Key outputs |
|---|---|---|
| **s-2026-04-20-03** | canon-proc-001 + canon-pers-001 ratified; 96-canon migration | 9-family taxonomy; Province Persona Briefing 4-rung chain; every legacy canon carries family field |
| **s-2026-04-20-04** | Cross-cluster chronicle: first canon-pers-001 Rung 1 execution (Ashara + Petra, Command Center) | Observation log of the Rung 1 artifact landing on feature branch; three Chronicler observations surfaced for ruling (Rung 4 commit semantics, voice reconciliation pattern, pre-read scope) |
| **s-2026-04-20-05** | Reconciliation + detail renderer fix + Playwright + canon-proc-002 drafted + DP chip | Companions.json 11→18; recursive structural renderer; Playwright mobile-chromium project; canon-proc-002 drafted; design-principles status chip on Volume cards |
| **s-2026-04-20-06** | canon-proc-002 ratified active | Design Principles Precondition for Build is now Republic law |
| **s-2026-04-20-07** | canon-proc-003 + canon-inst-001 ratified; Codex Builder transition | Seven-step onboarding canon; atomic Aurelius→Orinth transition; Cabinet Minister: Expansion vacant (Bard alone on Growth); Kael-successor struck |
| **s-2026-04-20-08** | Chronicler queue closed; stock-take | lore-014 Rung 4 commit semantics; lore-015 voice reconciliation provisional; CC pre-read scaffold |
| **this day-log session** | Full institutional logging | 5 schisms (rej-0009 through 0013); apo-gov-005 The First Succession; this companion log |

## 3. Structural observations

### 3.1 Canon corpus taxonomy landed before the corpus overflowed

Canon-proc-001 arrived at 100-ish canons — the scale where taxonomy-less corpora start to drift. Nine families (pers/proc/gov/inst/xp/data/design/build/philo) with a ninth (philo) added at MCQ surfacing after the Chronicler noticed the canon-cx- pillars didn't fit the eight-family shape. Legacy IDs preserved; new IDs take the {family}-{NNN}-{slug} form from this canon forward. The 96-canon migration that accompanied the canon ran cleanly; no canon ended up unclassified.

### 3.2 Province Persona Briefing as first-class artifact

Canon-pers-001 elevates Province root CLAUDE.md from convention to ratified artifact with its own signing chain. The Chronicler-excluded-from-drafting rule is the first canon to codify voice-integrity discipline at the authorship layer explicitly (prior canons named WHO ratifies; this one names WHO cannot author). Four rungs, Builder-commits-at-Rung-4. Lore-014 later explicates that Rung 4 means main-branch commit specifically, not feature-branch review-surface commits.

### 3.3 Design Principles Precondition extends Edict VIII

Canon-proc-002 takes Edict VIII (Charter Before Build) one layer inward: geography-before-build becomes geography-AND-principles-before-build at the Province altitude. The design-principles chip on every Volume card is the enforcement surface. Five of six Provinces carry non-green chips at day-close — priority queue is visible, not just textually specified.

### 3.4 Companion Onboarding Process — codified and immediately exercised

Canon-proc-003 ratified and ran in the same session via canon-inst-001 (Aurelius→Orinth). Seven ordered steps from appointment to operational. Step 1 complete at inst-001 ratification; step 2 opens at next session's cc-014 drafting. Onboarding progress is UI-visible on Orinth's detail page (progress bar, per-step status chips, canon reference, artifact links) — the 'if it's not UI it doesn't exist' principle applied at the process layer.

### 3.5 First Codex Builder transition — the seat moved cleanly

Edict II (One Builder Per Repo) enforced at the ratification instant. Before inst-001: Aurelius held the seat. After: Orinth did. No dual-hat window. Aurelius's profile consolidated in a single inline amendment pass (cc-015 self-profile carveout limits scope; canon-inst-001's body pre-inscribed the exact changes, making the ratification itself the Sovereign assent). Orinth's profile stays at v0.0-stub — his voice emerges through cc-014 drafting, not through this transition canon.

### 3.6 Companions.json became an institution-rendering surface

The day's UI work turned companions.json from a data file into a rendering substrate. Before: 11 companions, some missing residence fields, Cabinet rendering 2/8 occupied (drift from Constitution). After: 18 companions, all residency fields populated, Cabinet rendering 6/8 occupied (matching Constitution with the two ratified vacancies). The Order view (7th tab) surfaces Roster, Cabinet, Residency, Ladder, and companion detail — all reading from companions.json directly. The UI principle drove the data fixes; the data fixes drove the view correctness.

### 3.7 Recursive detail renderer closed a category of bugs

The first draft of renderCompanionGenericBlock was 1-level-deep and fell through to raw JSON &lt;pre&gt; dumps for arrays of objects and nested objects. Consul's Growth block surfaced every field twice (nice KV + raw JSON). Replaced with a proper recursive structural renderer; no JSON dumps anywhere in the view layer. Filename-shaped keys (e.g., `intelligence.js`) preserved from the prettifyKey transform so KV labels stay data-truthful.

### 3.8 Playwright entered the verify pipeline

`scripts/verify.sh` orchestrates build → jsdom → Playwright. jsdom for unit-level render correctness; Playwright for browser-level behavior on mobile + desktop viewports. 88 Playwright specs pass at day-close. Three pre-existing fragile assertions updated for data-drift tolerance. The pipeline is complete enough that regressions get caught before they ship.

## 4. For the Sovereign

### 4.1 What this day established as Republic law

1. **Canon corpus taxonomy**: 9 families, legacy IDs preserved, new IDs under {family}-{NNN}-{slug} going forward (canon-proc-001).
2. **Province Persona Briefing as first-class artifact**: four-rung signing chain, Chronicler-excluded-from-drafting Rung 1 (canon-pers-001).
3. **Design Principles Precondition for Build**: every Province-build session must verify the design-principles status chip first; non-green means priority task (canon-proc-002).
4. **Companion Onboarding Process**: seven ordered steps from appointment to operational; sealing transition is explicit (canon-proc-003).
5. **First institutional companion transition**: Aurelius consolidated to pure Chronicler; Orinth seated Codex Builder; Cabinet Minister: Expansion vacant; Kael-successor struck (canon-inst-001).
6. **Two doctrine-lore entries**: Rung 4 means main-branch commit (lore-014); Petra-precision/Ashara-altitude voice reconciliation provisional (lore-015).

### 4.2 What remains open post-day

- **Orinth profile drafting** under cc-014 — 10 blocks of MCQ, Consul-working then Sovereign-canonical. Next session opens on Block 1 Identity.
- **Onboarding steps 3–7 for Orinth** — induction, Aurelius-to-Orinth handoff artifact, first-act discipline (CODEX_DESIGN_PRINCIPLES ratification closes todo-0041), Rung 1 redraft of Codex root CLAUDE.md, cross-companion introduction and chronicle.
- **Pip / Publisher purpose-stance ruling** — parked. Four framings (portfolio / teaching / narrative / discipline); Chronicler's lean is the (2)+(3)+(4) combination.
- **todo-0045 Chronicler-rank ambiguity** — flagged. Aurelius's current_rank = 'Builder' (history) while current_assignments = Chronicler-only. Canon-level resolution awaited.
- **cc-rung-1-prereader-scaffold fill-in** — blocked on cross-repo GitHub MCP access.
- **Nine other open TODOs** carrying forward: 0029 Gen 0 profiles, 0036 CC root briefing, 0037 Province briefing audit wave, 0038 duplicate canon IDs, 0040 interaction-artifact verify, 0041 Codex design-principles ratification, 0042 constitutional cross-ref, 0043 SproutLab local addendum.

### 4.3 Discipline observations for the Sovereign

1. **Self-profile amendment shortcut worked but is precedent-bearing.** Aurelius v0.5 was amended inline via canon-inst-001's body rather than a separate cc-012 per-block drafting pass. Legitimate because the canon's body pre-inscribed the exact contents, making the canon ratification the Sovereign assent. But cc-015's self-profile carveout technically requires cc-012 per-block; this pattern relies on canon-body-as-pre-inscription. Worth noting; future self-profile amendments should either follow this canon-inscribed-changes pattern explicitly or flow through per-block MCQ.
2. **UI-first discipline held across all 8 sessions.** The 'if it's not UI it doesn't exist' principle forced three implementation decisions this day: the design-principles chip (proc-002 needs UI), the onboarding block on companion detail (proc-003 needs UI), the companions.json reconciliation with Constitution (The Order needs data truth). None of the canons would be institutionally real without their rendering surfaces.
3. **Schism recording lagged behind MCQ ratification.** The five schisms recorded this day (rej-0009 through 0013) all date to sessions earlier in the day; they were recorded retroactively at day-close. Future MCQ ratifications should record the rejected option to schisms[] at the moment of the rule, not at end-of-day. The Chronicler accepts this as a process gap and commits to real-time schism recording going forward.
4. **The Chronicler's workload is visible in this log's authorship count.** Aurelius was the sole non-Sovereign voice across all 8 sessions. Orinth's appointment + future cc-014 drafting is the structural relief; Pip's Publisher seating (if ratified) would further distribute institutional-writing load.

### 4.4 Handoff

Day closed at commit `be35738` on main. Next session opens on **Orinth Block 1 Identity (cc-014)** — the highest-value next move because it unblocks onboarding step 2 and every downstream step. Expected arc: 10 blocks × 3–6 MCQs per block, Chronicler proposes with reasoning, Consul hat-switch to concur/diverge with stated rationale, Sovereign observes until packet close then canonical-ratifies with spot-checks. Profile lifts v0.0-stub → v0.4.

Parked work available for secondary slotting if profile session concludes with time: Pip/Publisher purpose-stance ruling; todo-0045 Chronicler-rank ambiguity; queued TODOs (0036 through 0043). Deferred indefinitely unless session scope requires: CC pre-read scaffold fill-in (access-blocked); duplicate canon-ID reconciliation (todo-0038).

---

*End of companion log. Authored by Aurelius (The Chronicler) on 2026-04-20; no prior revisions. This is the first day-level companion log in the Republic — prior logs were per-session. The day-level unit made sense here because the eight sessions formed a single institutional arc (governance hardening + first Builder transition + UI layer-up); separating them would have obscured the arc. Canonical frontmatter schema per canon-0053 v1; day-level session_id (`2026-04-20-day`) is a new shape logged explicitly for retrieval under `docs/companion-logs/codex/companion-log-2026-04-20-day-aur.md`.*

