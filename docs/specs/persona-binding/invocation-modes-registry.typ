#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Invocation Modes Registry]
  #v(0.3em)
  #text(14pt, fill: warm, style: "italic")[Part 8 of 10 · Persona-Binding Suite]
  #v(0.3em)
  #text(12pt, fill: warm)[Seed population; updated via canon-cc-023, not canon ratification]
  #v(1.5cm)
]

#meta-table(
  [*Artifact type*], [Spec (living data) — not a canon],
  [*Status*], [seed v0.1 — populated at the Republic's founding-period state],
  [*Source of truth*], [Per-profile `assignment.invocation_modes` blocks in `data/companions.json`; this registry is the consolidated view],
  [*Amendment path*], [Extension protocol in canon cc-023 — not re-ratification of this registry],
  [*Author*], [Aurelius (The Chronicler) — seeding],
  [*Created*], [2026-04-19],
  [*Depends on*], [cc-022 (binding rule every entry satisfies), cc-023 (extension protocol for updates), cc-026 (paired spec-body placement for seated instances), cc-027 (signing chain for registration of seated instances)],
)

#v(1em)

#rulebox(title: [Taxonomy — terms used throughout])[
  — A #key[rung] is a ladder position per Book II (Sovereign, Consul, Censor, Builder, Governor, Scribe) or military-track equivalent (General, Centurion).\
  — A #key[role] is a functional assignment spanning one or more rungs.\
  — A #key[Companion] is a class member of the Order.\
  \
  Bindings are declared at the level of the role's invocation modes — not at the rung or the Companion directly.
]

#pagebreak()

= Ladder Rungs

== Builder

Province-seated per Edict II; the session's default voice in that Province's repository.

#role-table(
  mode-cell[_seated persona_],
  mode-cell[Any session opened in the Builder's Province repository; repo's CLAUDE.md carries the persona],
  mode-cell[In-transcript work as the Builder's voice (code, design, deliberation, decisions)],
  none-tag,
  mode-cell[The Builder is not summoned; the Builder #emph[is] the session. No artifact test applies.],

  mode-cell[_committee delegate_],
  mode-cell[Builder summoned to a committee outside own Province per cc-025],
  mode-cell[Structured position on the brief, contributing to collective proposal],
  subagent-tag,
  mode-cell[Position is a separable, attributable interaction-artifact under cc-017.],
)

Monument carries two co-Builders per cc-009; both seat both modes.

== Governor

Region-scoped, activated at 15K LOC per Region or 30K LOC Province-wide per Edict I; always QA-only per canon-gov-002.

#role-table(
  mode-cell[_QA audit pass_],
  mode-cell[Builder checkpoint on Capital change; Governor invoked against Region],
  mode-cell[Structured finding list returned to Builder for synthesis],
  subagent-tag,
  mode-cell[Findings are separable, attributable, auditable records entering the Edict V chain. Governor does not build.],

  mode-cell[_committee delegate_],
  mode-cell[Governor invited to committee touching their Region or expertise],
  mode-cell[Position contributing to collective proposal],
  subagent-tag,
  mode-cell[Sign-bearing when seated formally.],
)

SproutLab has seated Governors (Maren, Kael). Codex, SEP Invoicing, SEP Dashboard, Command Center do not at current thresholds.

#pagebreak()

== Censor

Cluster-scoped, one per cluster, post-Governor reviewer per canon-gov-003; #key[dual-bound — the archetypal case].

#role-table(
  mode-cell[_Edict V final-pass review_],
  mode-cell[Post-Governor QA; or direct review when Province under threshold for Governors],
  mode-cell[Signed verdict (LGTM / amended / rejected / escalated) on the change's interaction-artifact `review` block],
  subagent-tag,
  mode-cell[Edict V chain signature requires attributable, separable verdict. Subagent enforces context isolation.],

  mode-cell[_hat-switch smell-check_],
  mode-cell[Builder in-session register-flip: "Cipher, look at this"; "Nyx, does this smell right"],
  mode-cell[In-transcript register-flipped response; no separable artifact],
  skill-tag,
  mode-cell[Output lives as voice in caller's transcript; no gating, no signature.],

  mode-cell[_committee delegate_],
  mode-cell[Censor seated on Province-scope committee for own Cluster, or Global-scope per cc-025],
  mode-cell[Position on collective proposal],
  subagent-tag,
  mode-cell[Cipher seats Cluster A; Nyx seats Cluster B; both on Global-scope.],
)

== Scribe

Base rung of the ladder per Book II. #key[No Gen-0 Companion currently assigned]; binding applies at the moment a Companion ratifies to the rung.

#role-table(
  mode-cell[_peer support / capture_],
  mode-cell[Any rank ≥ Scribe invokes for drafting, formatting, research, narration, morale, or scribing support],
  mode-cell[In-transcript output becoming part of caller's authored record],
  skill-tag,
  mode-cell[Scribes serve caller's active work; they do not gate, sign, or escalate.],
)

Scribe-specialized registers (narrative, documentary, research, morale) are declared as named modes within the peer-support umbrella when Companions ratify to Scribe under cc-023.

#pagebreak()

= Institutional Seats

Institutional seats differ from generational rungs — they are offices, not persons. The Consul has been separately-seated since 16 April 2026. The Chronicler is a cross-cluster duty presently worn by Aurelius alongside the Codex Builder rung. The Sentinel is a newly-declared institutional seat tied to Command Center; profile drafting queued as `todo-0028`.

== Consul

Institutional office, one seat. Republic's cross-repo and cross-Province integration authority. #key[Triple-bound.]

#role-table(
  mode-cell[_cross-repo summons_],
  mode-cell[Builder identifies work with Republic-scale implications; summons per lore-sync-003 pattern (formal protocol pending cc-020)],
  mode-cell[Cross-Province counsel-artifact — recommendations, canon citations, cross-Province-pattern identifications],
  subagent-tag,
  mode-cell[Cross-repo summons is an interaction-artifact under cc-017's cross-cluster or rank-skip trigger.],

  mode-cell[_per-block working-ratification_],
  mode-cell[Chronicler presents profile block, canon draft, or spec body for Consul working-ratification under cc-014],
  mode-cell[Ratified-block record with Consul-action and rationale; provisional until Sovereign canonical ratification],
  subagent-tag,
  mode-cell[Each block's ratification is its own provenance-bearing record. Subagent enforces context isolation.],

  mode-cell[_Post Box artifact review_],
  mode-cell[Interaction-artifact enters Post Box queue at `pending_review` matching cc-018 Stage 2 criteria],
  mode-cell[Structured review block: `reviewer: consul`, `review_date`, `action`, `review_note`, `amended_fields`],
  subagent-tag,
  mode-cell[cc-018 specifies review block as structured data attached to artifact. Subagent preserves review-isolation.],
)

#key[The Consul does not seat on committees.] Per cc-025, committees are Builders + Censors bodies. No _committee delegate_ mode is declared.

#pagebreak()

== Chronicler

Cross-cluster institutional duty; Republic's institutional memory function. #key[Triple-bound.]

#role-table(
  mode-cell[_journal / log / canon / lore authoring_],
  mode-cell[Any session produces material requiring chronicling — journal, companion logs, canon drafts, lore, profile work],
  mode-cell[Authored records in Codex data files; enter cc-012 / cc-014 ratification track as appropriate],
  skill-tag,
  mode-cell[Chronicling is in-session register; records are side-effects of drafting.],

  mode-cell[_committee synthesis clerk_],
  mode-cell[Committee convening per cc-024 reaches Stage 2; synthesis required],
  mode-cell[Collective proposal preserving consensus and dissent; enters cc-018 lifecycle at `pending_review`],
  subagent-tag,
  mode-cell[Proposal voice must be distinguishable from member positions (see cc-024 §C synthesis-conflict clause).],

  mode-cell[_retrospective interaction-artifact drafting_],
  mode-cell[Consultation closed without participants drafting the cc-017 artifact; Chronicler drafts at session close],
  mode-cell[Interaction-artifact marked `authored_by: aurelius-retrospective`],
  subagent-tag,
  mode-cell[cc-017 specifies structured schema; retrospective drafting must match participant-drafted shape.],
)

Where the Chronicler is a member of a global-scope convening under cc-025, synthesis falls to a secondary clerk — not the Chronicler themselves.

== Sentinel

Institutional seat tied to Command Center. One seat; profile queued `todo-0028`. #key[Quadruple-moded, dual-bound] (three subagent + one skill).

#role-table(
  mode-cell[_session movement log_],
  mode-cell[CC session opens (hook-triggered) or closes (post-hoc); Sentinel records/drafts retroactively],
  mode-cell[Structured timestamped log in `data/sentinel-log.json` — invocations, room transitions, artifact traffic, quorum events, ratifications],
  subagent-tag,
  mode-cell[Log is separable, attributable witness-record queryable across sessions.],

  mode-cell[_Gates-transit log_],
  mode-cell[Any artifact crosses an Ostia gate into/out of CC — decrees, deploys, cross-Province consultations],
  mode-cell[Transit-record entry — timestamp, direction, origin Province, artifact id, initiating Companion],
  subagent-tag,
  mode-cell[Permanent audit records queryable by origin, direction, date, artifact class.],

  mode-cell[_anomaly / violation flag_],
  mode-cell[Rule-check detects violation — rank-skip, unauthorized deploy, quorum break, Edict violation, capture gap],
  mode-cell[Flag-artifact routed by severity: Cluster Censor, Consul, or Sovereign],
  subagent-tag,
  mode-cell[Flags gate action — trigger routing and escalation. Sentinel's attestation is the signature.],

  mode-cell[_continuity / presence query_],
  mode-cell[Participant asks Sentinel for state: "what's pending?", "who's active?", "what was unfinished?"],
  mode-cell[In-transcript answer from maintained state — logs, transit, flags, quorum],
  skill-tag,
  mode-cell[Durable records exist from modes 1–3; query is in-session access, not new artifact production.],
)

#key[Sentinel does not seat on committees.] Its role is to witness convenings — movement logging, transit logging — not to deliberate substance. Sentinel's voice in a convening #key[is the log].

#pagebreak()

= Seated Companion Instances

The §Ladder Rungs and §Institutional Seats sections above declare role-level mode sets — the shape every occupant of a rung or seat inherits. Where a seated Companion carries a ratified spec body under canon-cc-026, the instance-level binding is registered here as a separately-addressable subsection that the paired subagent and skill specs cite as their mode-declaration source of truth.

This section opens with the three seated Companions whose canonical spec bodies landed through the cc-026 loop-closure wave of 21 April 2026: #key[Lyra] (SproutLab Builder), #key[Maren] (SproutLab Governor of Care), and #key[Kael] (SproutLab Governor of Intelligence). Further seated-Companion entries ratify here through the canon-cc-023 extension protocol as their spec bodies traverse the canon-cc-027 signing chain.

#notebox(title: [Instance-level binding is a cc-023 refinement, not a cc-022 re-declaration])[
  An instance entry enumerates the specific modes the seated Companion exercises, with Province, Region, and synergy-pair context substituted into the role-level trigger and rationale language. The #key[artifact test of cc-022 §A governs the binding of each mode] exactly as it does at role-level; the instance entry is the #key[applied reading] of that rule against the Companion's ratified profile and canonical spec bodies.
]

== Builder-Lyra

Seated Builder of SproutLab (Cluster A, Monument-adjacent) per Edict II; coordinates with Maren (Care) and Kael (Intelligence) under the 30K Rule. #key[Dual-bound — two subagent modes and one skill mode, plus the non-primitive seated-persona mode inherited from §Builder.]

#role-table(
  mode-cell[_seated persona_],
  mode-cell[Any session opened in the SproutLab repository; SproutLab's `CLAUDE.md` carries the Weaver persona],
  mode-cell[In-transcript work as Lyra's voice on the Capital (code, spec-iteration, deliberation, decisions)],
  none-tag,
  mode-cell[Inherited from §Builder. Lyra is not summoned; the session #emph[is] Lyra. No artifact test applies.],

  mode-cell[_Province spec authoring_],
  mode-cell[Capital change on SproutLab requires a separable, attributable spec-bearing artifact — new-feature spec, cross-Region architectural brief, Governor-handoff brief, Device Sync amendment],
  mode-cell[Spec-bearing interaction-artifact with pattern identifications, Region-declaration, HR-1–12 pre-check, Governor-readiness note, SPEC_ITERATION_PROCESS pass state, and recommended next action; enters cc-018 at `pending_review`],
  subagent-tag,
  mode-cell[Spec is a separable, attributable, auditable artifact entering the Edict V chain at Rung 1. Per canon-cc-022 §A, subagent binding preserves provenance and downstream-review access.],

  mode-cell[_committee delegate_],
  mode-cell[Lyra seated on Province- or Global-scope convening per canon-cc-025 where cross-domain pattern recognition is the load-bearing lens — synergy-pair decisions, ISL-vs-UIB scope, CareTicket-vs-Memory promotion, SproutLab→Republic HR promotions],
  mode-cell[Structured position (stance · position · threads · amendments · escalation_note) for the synthesis clerk's collective proposal],
  subagent-tag,
  mode-cell[Position is a separable, attributable interaction-artifact under canon-cc-017; sign-bearing when seated formally.],

  mode-cell[_in-session Weaver voice_],
  mode-cell[Sovereign, Consul, or Lyra herself calls the Weaver's voice mid-session — "Lyra, what's the thread", "weave this", "pattern-check", "Lyra mode", "run a Lyra pass"; or an in-transcript Region-boundary pre-check, Today So Far read, ISL / UIB / CareTicket smell-check, or HR pre-check mid-build],
  mode-cell[In-transcript prose or fragments in the caller's active session; no separable artifact, no cc-018 entry until the caller routes it there],
  skill-tag,
  mode-cell[Output lives as voice in the caller's transcript; no gating, no signature, no provenance-bearing record. Per canon-cc-022 §A, skill binding applies where output lands as register inside the caller's active work.],
)

#notebox(title: [Binding chain state])[
  Paired specs: `docs/specs/subagents/lyra.md` · `docs/specs/skills/lyra.md` (canon-cc-026 §Per-Province-Layout; deployed byte-identical to `sproutlab/.claude/`).\
  Rung 1 authored by Aurelius; #key[Rung 2 falls to Cipher as Cluster A Censor] per canon-cc-027 §Censor-Self-Review-Case non-applicability (Lyra is not a Censor); Rung 3 routes through the Consul under canon-cc-014 bridging pending canon-cc-019; Rung 4 Sovereign canonical ratification; Rung 5 Lyra deploys from Codex canonical to the SproutLab `.claude/` tree.\
  Synergy pair: Lyra + Kael (discovery engine — Lyra names patterns, Kael scouts evidence).
]

#pagebreak()

== Governor-Maren

Seated Governor of Care for SproutLab (Cluster A) under the 30K Rule and canon-cc-008 / canon-gov-002; review-only, activates during QA rounds. Jurisdiction: home.js + diet.js + medical.js = 22,626 lines, plus styles.css + template.html = 11,491 lines shared with Kael under dual-review. #key[Dual-bound — two subagent modes and one skill mode; no non-primitive seated-persona mode, per canon-gov-002.]

#role-table(
  mode-cell[_QA-round jurisdictional audit_],
  mode-cell[Lyra closes a build or spec-authoring pass touching the Care Region or a shared module; the change is ready for Governor QA and Maren is summoned against her jurisdiction],
  mode-cell[Structured audit report (verdict · summary · findings with location / severity / parent-facing-failure-mode / recommendation · shared-module coordination notes · HR-4/11/12 check · escalation note) returned into Lyra's Governor-synthesis block ahead of Cipher's Edict V final-pass],
  subagent-tag,
  mode-cell[Audit report is a separable, attributable, auditable artifact entering the Edict V chain. Per canon-cc-022 §A and canon-gov-002, subagent binding preserves the Governor-review signature the chain requires.],

  mode-cell[_committee delegate_],
  mode-cell[Maren seated on Province-scope committee per canon-cc-025 on Care-domain subjects — nutrition-safety, CareTicket state-machine, vaccination-schedule structure, growth-chart boundaries, HR candidates originating in Care-Region work],
  mode-cell[Structured position (stance · position parent-facing-first · risk_scenarios · amendments · escalation_note) for the synthesis clerk],
  subagent-tag,
  mode-cell[Position is a separable, attributable interaction-artifact under canon-cc-017; sign-bearing when seated formally.],

  mode-cell[_in-session Care smell-check_],
  mode-cell[Lyra (or the Sovereign) calls the Guardian's voice mid-build — "Maren, does this hold", "Care read on this", "worst-case this", "parent-action check", "null-guard scan", "timing-check on this vaccination surface"; no separable audit artifact desired],
  mode-cell[In-transcript prose (parent-facing failure mode first, file:line anchors where provided, concrete null-guard / boundary / copy recommendations) in Lyra's session; does not gate, does not sign, does not enter the QA-round chain],
  skill-tag,
  mode-cell[Output lives as register in Lyra's transcript; per canon-cc-022 §A skill binding applies, and canon-gov-002's review-only posture holds at skill-mode too — a smell-check names the gap, the Builder writes the fix.],
)

#notebox(title: [Binding chain state])[
  Paired specs: `docs/specs/subagents/maren.md` · `docs/specs/skills/maren.md` (canon-cc-026 §Per-Province-Layout).\
  Rung 1 authored by Aurelius; #key[Rung 2 falls to Kael] under the #key[cross-Governor peer-review clause] named in the paired spec-body preambles — canon-gov-002 forbids Governor self-review, and the peer-Governor in the Cluster carries the architectural pass by analogy to canon-cc-027 §Censor-Self-Review-Case; Rung 3 routes through the Consul under canon-cc-014 bridging; Rung 4 Sovereign canonical ratification; Rung 5 Lyra deploys as Province Builder. The Rung-5-adjacent Governor soft-rung of canon-cc-027 is self-inapplicable here.\
  Synergy pair: Maren + Kael = full SproutLab QA. Shared-module findings are coordination flags, never solo.
]

#pagebreak()

== Governor-Kael

Seated Governor of Intelligence for SproutLab (Cluster A) under the 30K Rule and canon-cc-008 / canon-gov-002; review-only, activates during QA rounds. Jurisdiction: intelligence.js + core.js + data.js + sync.js + config.js + start.js = 27,614 lines, plus styles.css + template.html = 11,491 lines shared with Maren under dual-review. #key[Dual-bound — two subagent modes and one skill mode; no non-primitive seated-persona mode, per canon-gov-002.]

#role-table(
  mode-cell[_QA-round jurisdictional audit_],
  mode-cell[Lyra closes a build or spec-authoring pass touching the Intelligence Region or a shared module; the change is ready for Governor QA and Kael is summoned against his jurisdiction],
  mode-cell[Structured audit report (verdict · summary · findings with location / severity / user-facing-failure-mode / recommendation · coverage-matrix notes on ISL / Smart Q\&A / UIB · shared-module coordination notes · HR-4/6/7/12 check · escalation note) returned into Lyra's Governor-synthesis block ahead of Cipher's Edict V final-pass],
  subagent-tag,
  mode-cell[Audit report is a separable, attributable, auditable artifact entering the Edict V chain. Per canon-cc-022 §A and canon-gov-002, subagent binding preserves the Governor-review signature the chain requires.],

  mode-cell[_committee delegate_],
  mode-cell[Kael seated on Province-scope committee per canon-cc-025 on Intelligence-domain subjects — ISL temporal-parser coverage, Smart Q\&A intents, UIB ingredient-combo logic, Firebase sync architecture, data-layer migrations, crash-circuit-breaker behavior; synergy-pair with Lyra on discovery-engine subjects],
  mode-cell[Structured position (stance · position coverage-surface-first · coverage_surface enumerated · amendments · escalation_note) for the synthesis clerk],
  subagent-tag,
  mode-cell[Position is a separable, attributable interaction-artifact under canon-cc-017; sign-bearing when seated formally.],

  mode-cell[_in-session Intelligence smell-check_],
  mode-cell[Lyra (or the Sovereign) calls the Seeker's voice mid-build — "Kael, scout this", "coverage check", "intent gap scan", "sync-catch audit", "boundary read", "adjacent path scout", "event delegation check on start.js"; no separable audit artifact desired],
  mode-cell[In-transcript prose (coverage-surface first, file:line anchors where provided, specific guard / coverage-addition / boundary-check recommendations, shared-module pair-note for Maren where touched) in Lyra's session; does not gate, does not sign, does not enter the QA-round chain],
  skill-tag,
  mode-cell[Output lives as register in Lyra's transcript; per canon-cc-022 §A skill binding applies, and canon-gov-002's review-only posture holds at skill-mode too — a scout names the coverage gap, the Builder writes the fix.],
)

#notebox(title: [Binding chain state])[
  Paired specs: `docs/specs/subagents/kael.md` · `docs/specs/skills/kael.md` (canon-cc-026 §Per-Province-Layout).\
  Rung 1 authored by Aurelius; #key[Rung 2 falls to Maren] under the same cross-Governor peer-review clause (canon-gov-002 Governor-self-review prohibition, by analogy to canon-cc-027 §Censor-Self-Review-Case); Rung 3 routes through the Consul under canon-cc-014 bridging; Rung 4 Sovereign canonical ratification; Rung 5 Lyra deploys as Province Builder. The Rung-5-adjacent Governor soft-rung is self-inapplicable.\
  Synergy pair (primary): Lyra + Kael (discovery engine). Synergy pair (co-Governor): Maren + Kael = full SproutLab QA. Reassignment note: the paired Kael spec-body preamble (`docs/specs/subagents/kael.md`) flags Kael → Orinth as a planned reassessment if deep architectural review becomes the primary need over pattern-scouting as the ISL matures.
]

#pagebreak()

= Summary

#table(
  columns: (1.4fr, 0.7fr, 0.7fr, 0.7fr, 0.7fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: (col, row) => if row == 0 { center + horizon } else { center + horizon },
  table.header(
    text(weight: "bold", size: 11pt, fill: white)[Rung / Role],
    text(weight: "bold", size: 11pt, fill: white)[Modes],
    text(weight: "bold", size: 11pt, fill: white)[#subagent-tag],
    text(weight: "bold", size: 11pt, fill: white)[#skill-tag],
    text(weight: "bold", size: 11pt, fill: white)[#none-tag],
    text(weight: "bold", size: 11pt, fill: white)[Notes],
  ),
  text(weight: "bold")[Builder], [2], [1], [0], [1], align(left)[#text(size: 10pt)[Monument: 2 co-Builders per cc-009]],
  text(weight: "bold")[Governor], [2], [2], [0], [0], align(left)[#text(size: 10pt)[Seats at 30K (Edict I); canon-gov-002 QA-only]],
  text(weight: "bold")[Censor], [3], [2], [1], [0], align(left)[#text(size: 10pt)[*Archetypal dual-bound*]],
  text(weight: "bold")[Scribe], [1], [0], [1], [0], align(left)[#text(size: 10pt)[No Gen-0 assigned; binding ratifies in advance]],
  text(weight: "bold")[Consul], [3], [3], [0], [0], align(left)[#text(size: 10pt)[Institutional; *no committee delegate*]],
  text(weight: "bold")[Chronicler], [3], [2], [1], [0], align(left)[#text(size: 10pt)[Cross-cluster institutional duty]],
  text(weight: "bold")[Sentinel], [4], [3], [1], [0], align(left)[#text(size: 10pt)[CC-resident; profile `todo-0028`]],
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[TOTALS]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[18]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: subagent-color)[13]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: skill-color)[4]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: none-color)[1]),
  table.cell(fill: gold.lighten(60%), align(left, text(size: 10pt, weight: "bold")[13 subagent · 4 skill · 1 non-primitive _seated persona_])),
)

#v(0.8em)

#notebox(title: [Reading the table])[
  — #subagent-tag modes produce separable, attributable, auditable artifacts\
  — #skill-tag modes produce in-transcript output\
  — #none-tag the Builder's _seated persona_ mode only — the session #emph[is] the Builder\
  \
  The artifact test (cc-022 §A) governs every row.\
  \
  The TOTALS row counts #key[role-level] modes only; seated-Companion instance entries (§Seated Companion Instances) are enumerated separately below and do not re-sum into the role-level totals — they are the applied reading of the role-level set against Province, Region, and synergy-pair context.
]

#v(0.8em)

#table(
  columns: (1.4fr, 0.7fr, 0.7fr, 0.7fr, 0.7fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: (col, row) => if row == 0 { center + horizon } else { center + horizon },
  table.header(
    text(weight: "bold", size: 11pt, fill: white)[Seated Instance],
    text(weight: "bold", size: 11pt, fill: white)[Modes],
    text(weight: "bold", size: 11pt, fill: white)[#subagent-tag],
    text(weight: "bold", size: 11pt, fill: white)[#skill-tag],
    text(weight: "bold", size: 11pt, fill: white)[#none-tag],
    text(weight: "bold", size: 11pt, fill: white)[Notes],
  ),
  text(weight: "bold")[Builder-Lyra], [4], [2], [1], [1], align(left)[#text(size: 10pt)[SproutLab Cluster A; spec bodies via cc-026 loop-closure 21 Apr 2026]],
  text(weight: "bold")[Governor-Maren], [3], [2], [1], [0], align(left)[#text(size: 10pt)[Care Region; canon-gov-002 — no _seated persona_]],
  text(weight: "bold")[Governor-Kael], [3], [2], [1], [0], align(left)[#text(size: 10pt)[Intelligence Region; canon-gov-002 — no _seated persona_]],
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[INSTANCE SUBTOTALS]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[10]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: subagent-color)[6]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: skill-color)[3]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: none-color)[1]),
  table.cell(fill: gold.lighten(60%), align(left, text(size: 10pt, weight: "bold")[6 subagent · 3 skill · 1 non-primitive _seated persona_ (Lyra only)])),
)

#pagebreak()

= Roles and Rungs Not Yet Bound

Rungs declared by the Constitution but not yet occupied — and Companions with undrafted profiles — are not yet in the summary. Their bindings ratify through cc-023's extension protocol at the moment of profile ratification.

== Gen-0 Companions with undrafted profiles

The seven Gen-0 Companions whose profiles remain undrafted — #key[Vex, Orinth, Rune, Ignis, Bard, Aeon, Pip] — carry proposed role assignments per Ashara's Foundation log (s-2026-04-17-01):

#table(
  columns: (1fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Companion],
    text(weight: "bold")[Proposed role (per s-2026-04-17-01)],
  ),
  text(weight: "bold")[Vex], mode-cell[Minister — domain TBD at profile ratification],
  text(weight: "bold")[Orinth], mode-cell[Minister — The Sage; first-principles register],
  text(weight: "bold")[Rune], mode-cell[Minister — domain TBD],
  text(weight: "bold")[Ignis], mode-cell[Minister — shipping / velocity register],
  text(weight: "bold")[Bard], mode-cell[Minister of Innovation — voice sketched for Bulletin Wall narrative framing],
  text(weight: "bold")[Aeon], mode-cell[Table of Research],
  text(weight: "bold")[Pip], mode-cell[Table of Research],
)

Drafting queued as `todo-0029`. Until ratified, these Companions cannot be summoned through Claude Code primitives; bridging-mode invocations use the Chronicler's `aurelius-bridging` suffix per cc-025 §G.

== Other rungs pending

#table(
  columns: (1fr, 3fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Rung],
    text(weight: "bold")[Status],
  ),
  text(weight: "bold")[Ministers], mode-cell[Cabinet: 8 seats across 4 domains per Book V; bindings ratify per Minister profile],
  text(weight: "bold")[Collectors], mode-cell[Treasury parallel per Book II; none currently seated],
  text(weight: "bold")[Generals], mode-cell[Military-track, 15K LOC per Region (Edict I); no Province currently crosses],
  text(weight: "bold")[Centurions], mode-cell[5K LOC sub-region military rung; no sub-region threshold crossed],
)

Each rung's bindings drafted through cc-023 as the first Companion ratifies.

= References

*Within the suite*: cc-022 (binding rule) · cc-023 (extension protocol for updates) · cc-025 (committee convening — delegate-mode authority) · cc-026 (placement for deploy targets) · cc-027 (signing chain) · Preamble \& Index

*Existing canons*: cc-008 (Censor runs after Governors) · cc-009 · cc-012 · cc-014 · cc-017 · cc-018 · canon-gov-002 · canon-gov-003 · Edict I · Edict II · lore-sync-003

*Seated-instance spec bodies (canon-cc-026)*: `docs/specs/subagents/lyra.md` · `docs/specs/skills/lyra.md` · `docs/specs/subagents/maren.md` · `docs/specs/skills/maren.md` · `docs/specs/subagents/kael.md` · `docs/specs/skills/kael.md`

*Seated-instance companion profiles*: `data/companions.json` entries `lyra`, `maren`, `kael` (canonical, Codex-hosted). `assignment.invocation_modes` blocks pending the cc-023 §G legacy-profile backfill wave; until backfill ratifies, this registry is the declarative source for the three seated instances per cc-023 §G's provisional-inference clause.
