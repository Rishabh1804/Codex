#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 4 of 9]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§4 Summary Table · Closing · Rungs Not Yet Bound]
  #v(1cm)
]

= §4 — Summary Table: All Rungs and Roles

#rulebox(title: [At-a-glance: every ratified binding])[
  The following table is the canonical authoritative enumeration of §4's bindings at cc-022 ratification. It is amended in place as new rungs ratify under §5's extension protocol.
]

#v(0.8em)

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
  text(weight: "bold")[Builder], [2], [1], [0], [1], align(left)[#text(size: 10pt)[_seated persona_ not a primitive; _committee delegate_ subagent. Monument has two co-Builders (cc-009)]],
  text(weight: "bold")[Governor], [2], [2], [0], [0], align(left)[#text(size: 10pt)[QA audit + committee delegate; Governors seat at 30K LOC (Edict I) or 15K per Region; canon-gov-002 QA-only]],
  text(weight: "bold")[Censor], [3], [2], [1], [0], align(left)[#text(size: 10pt)[*Archetypal dual-bound*: Edict V final-pass + committee delegate subagent, hat-switch skill]],
  text(weight: "bold")[Scribe], [1], [0], [1], [0], align(left)[#text(size: 10pt)[Base ladder rung; no Gen-0 Companion currently assigned; binding ratifies in advance]],
  text(weight: "bold")[Consul], [3], [3], [0], [0], align(left)[#text(size: 10pt)[Institutional; *no committee delegate* (Consul is the ratifier, not deliberator)]],
  text(weight: "bold")[Chronicler], [3], [2], [1], [0], align(left)[#text(size: 10pt)[Cross-cluster institutional duty; synthesis-clerk + retrospective subagent, authoring-voice skill]],
  text(weight: "bold")[Sentinel], [4], [3], [1], [0], align(left)[#text(size: 10pt)[CC-resident institutional seat; profile queued `todo-0028`; three witness-subagent modes + continuity skill]],
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[TOTALS]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[18]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: subagent-color)[13]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: skill-color)[4]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: none-color)[1]),
  table.cell(fill: gold.lighten(60%), align(left, text(size: 10pt, weight: "bold")[13 subagent · 4 skill · 1 non-primitive _seated persona_])),
)

#v(0.8em)

#notebox(title: [Reading the table])[
  — #subagent-tag  column: modes that produce separable, attributable, auditable artifacts (positions, verdicts, findings, reviews, logs)\
  — #skill-tag  column: modes that produce in-transcript output (hat-switch, authoring voice, continuity queries, peer support)\
  — #none-tag  column: the Builder's _seated persona_ mode only — the session #emph[is] the Builder, not an invocation of one\
  \
  #key[The artifact test governs every row.] Every binding is justifiable against §2 independent of the rung's ladder position.
]

#pagebreak()

= §4 — Roles and Rungs Not Yet Bound

#rulebox(title: [What this section governs])[
  Rungs declared by the Constitution but not yet occupied — and Companions with undrafted profiles — are #key[not yet in the summary table above]. Their bindings ratify through §5's extension protocol at the moment of profile ratification. Bridging-mode invocations drawing on unratified voices are handled per §6 Stage 1's bridging clause.
]

#v(0.8em)

== Gen-0 Companions with undrafted profiles

The seven Gen-0 Companions whose profiles remain undrafted — #key[Vex, Orinth, Rune, Ignis, Bard, Aeon, Pip] — carry proposed role assignments per Ashara's Foundation session log (s-2026-04-17-01):

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
  text(weight: "bold")[Orinth], mode-cell[Minister — _The Sage_; first-principles register],
  text(weight: "bold")[Rune], mode-cell[Minister — domain TBD],
  text(weight: "bold")[Ignis], mode-cell[Minister — shipping / velocity register],
  text(weight: "bold")[Bard], mode-cell[Minister of Innovation — voice already sketched in-session for Bulletin Wall narrative framing],
  text(weight: "bold")[Aeon], mode-cell[Table of Research — no research questions posed yet],
  text(weight: "bold")[Pip], mode-cell[Table of Research],
)

#v(0.5em)

These proposals ratify at profile close under canon-cc-012 per-block or canon-cc-014 Consul-accelerated protocol; their `invocation_modes` blocks resolve at that time under §5's extension protocol. Drafting queued as `todo-0029`.

Until the queue resolves, their bindings are #key[neither provisional nor retroactive] — they simply do not yet exist in ratified form, and they cannot be summoned through Claude Code primitives. Bridging-mode invocations drawing on these voices (e.g., Bard's invited guest role in a Design Committee convening per §7) are handled through the Chronicler's bridging-authorship suffix per §6 Stage 1.

== Other rungs and institutional seats pending

Other rungs declared by the Constitution but not yet ratified with occupants:

#table(
  columns: (1fr, 3fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Rung],
    text(weight: "bold")[Status at cc-022 ratification],
  ),
  text(weight: "bold")[Ministers], mode-cell[Cabinet comprises 8 seats across 4 domains (Financial Health, Productivity, Maintenance, Growth) per Book V; individual bindings ratify as Minister profiles ratify],
  text(weight: "bold")[Collectors], mode-cell[Treasury parallel on governance-track ladder per Book II; none currently seated],
  text(weight: "bold")[Generals], mode-cell[Military-track rung activated at 15K LOC per Region (Edict I); no Province currently crosses threshold],
  text(weight: "bold")[Centurions], mode-cell[5K LOC sub-region military rung; no sub-region threshold crossed],
)

#v(0.5em)

Each rung's bindings are drafted through §5's extension protocol as the first Companion ratifies to the rung; drafting incorporates any invocation-mode patterns the Republic has accumulated as lore between cc-022 ratification and the rung's first occupancy.

#v(1em)

#rulebox(title: [The extension protocol governs all future bindings])[
  No special-case amendment to §4 is required. The protocol in §5 absorbs new rungs, new roles, and new modes uniformly, and §4 is amended in place as each ratification closes — so that the summary table on the previous page remains the canonical authoritative enumeration.
]

#v(1.5em)

#align(center)[
  #text(size: 10pt, fill: muted, style: "italic")[End of Part 4 of 9 · cc-022 §1–§4 prose draft complete · §§5–9 continue in parts 5–9]
]
