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
  [*Depends on*], [cc-022 (binding rule every entry satisfies), cc-023 (extension protocol for updates)],
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
  The artifact test (cc-022 §A) governs every row.
]

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

*Within the suite*: cc-022 (binding rule) · cc-023 (extension protocol for updates) · cc-026 (placement for deploy targets) · cc-027 (signing chain) · Preamble \& Index

*Existing canons*: cc-009 · cc-012 · cc-014 · cc-017 · cc-018 · canon-gov-002 · canon-gov-003 · Edict I · Edict II · lore-sync-003
