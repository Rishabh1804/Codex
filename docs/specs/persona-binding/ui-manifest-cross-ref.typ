#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[UI Manifest Cross-Reference]
  #v(0.3em)
  #text(14pt, fill: warm, style: "italic")[Part 10 of 10 · Persona-Binding Suite]
  #v(0.3em)
  #text(12pt, fill: warm)[Which Command Center surface renders each binding; queued canon dependencies]
  #v(1.5cm)
]

#meta-table(
  [*Artifact type*], [Spec (index) — not a canon],
  [*Status*], [draft v0.1 — updates as new canons declare UI surfaces or existing surfaces ratify],
  [*Scope*], [global — the suite's canonical UI dependency registry per Edict IX (UI-Canonical-Existence)],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Amendment path*], [Per-canon declaration — each new canon cites this spec's row for its UI surface; this spec updates under cc-023's extension protocol for new rows],
  [*Depends on*], [the six canons of the suite and their queued UI canon dependencies],
)

#v(1em)

#rulebox(title: [What this spec enforces])[
  #key[Edict IX (UI-Canonical-Existence)] — pending ratification as the next Edict slot — requires every Republic role, mode, workflow, or artifact-class to have a corresponding UI surface in Command Center that represents and audits it.\
  \
  This spec is the suite's #key[UI Manifest]: the cross-reference between every binding declared in the Invocation Modes Registry and the CC surface that renders it. Surfaces not yet built are named as queued dependencies on specific follow-on canons.\
  \
  Soft form (operational): every role/mode/workflow must be #key[represented and auditable] through the UI.\
  Strict form (destination): every action is a UI button.\
  \
  The suite operates toward strict; bridging mode per the Transition Map holds until strict lands surface by surface.
]

#pagebreak()

= §A — Binding-to-Surface Mapping

Every invocation mode declared in the Invocation Modes Registry has a CC surface. Where the surface is live (scaffolded and wired), the mode is operational. Where the surface is scaffolded only, the mode is bridging. Where the surface is neither, the mode is mapped but not yet operationally real.

#table(
  columns: (1.2fr, 1.8fr, 1.5fr, 1fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: left + top,
  inset: 7pt,
  table.header(
    text(weight: "bold", fill: white, size: 11pt)[Mode],
    text(weight: "bold", fill: white, size: 11pt)[Surface],
    text(weight: "bold", fill: white, size: 11pt)[CC room],
    text(weight: "bold", fill: white, size: 11pt)[Status],
  ),

  mode-cell[Builder _seated persona_], mode-cell[Active-session framing per Province], mode-cell[Hearth + active-session room], mode-cell[Scaffolded; bridging],
  mode-cell[Builder _committee delegate_], mode-cell[Senate convening composer — member selection], mode-cell[Senate], mode-cell[Scaffolded; bridging],
  mode-cell[Governor _QA audit pass_], mode-cell[New Capital Change dispatcher; findings panel], mode-cell[Active-session room + Post Box queue], mode-cell[Bridging; cc-028 pending],
  mode-cell[Governor _committee delegate_], mode-cell[Senate convening composer], mode-cell[Senate], mode-cell[Scaffolded; bridging],
  mode-cell[Censor _Edict V final-pass_], mode-cell[Post Box review surface], mode-cell[Post Box], mode-cell[Bridging; cc-028 pending],
  mode-cell[Censor _hat-switch skill_], mode-cell[Inline register-flip indicator in active session], mode-cell[Active-session room header], mode-cell[Bridging; minor surface],
  mode-cell[Censor _committee delegate_], mode-cell[Senate convening composer], mode-cell[Senate], mode-cell[Scaffolded; bridging],
  mode-cell[Scribe _peer support_], mode-cell[Command palette + session inline affordance], mode-cell[Any room via palette], mode-cell[Blocked on `todo-0029` (Scribe profiles)],
  mode-cell[Consul _cross-repo summons_], mode-cell[Post Box + Consul session view], mode-cell[Post Box / Senate], mode-cell[Bridging; cc-028 pending],
  mode-cell[Consul _per-block working-ratification_], mode-cell[Ratification surface with per-block MCQ], mode-cell[Post Box or a Ratification sub-view], mode-cell[Bridging; cc-028 pending],
  mode-cell[Consul _Post Box artifact review_], mode-cell[Post Box queue with review actions], mode-cell[Post Box], mode-cell[Bridging; cc-028 pending],
  mode-cell[Chronicler _authoring voice skill_], mode-cell[Command palette: `/chronicle`], mode-cell[Any room via palette], mode-cell[Bridging; minor surface],
  mode-cell[Chronicler _synthesis clerk_], mode-cell[Senate synthesis composer], mode-cell[Senate], mode-cell[Scaffolded; bridging],
  mode-cell[Chronicler _retrospective drafting_], mode-cell[Session-close drafting affordance], mode-cell[Active-session room close panel], mode-cell[Bridging; minor surface],
  mode-cell[Sentinel _session movement log_], mode-cell[Watch room timeline], mode-cell[Watch (new room, +15th)], mode-cell[Blocked on cc-032],
  mode-cell[Sentinel _Gates-transit log_], mode-cell[Gates transit feed], mode-cell[Gates], mode-cell[Blocked on cc-031],
  mode-cell[Sentinel _anomaly flag_], mode-cell[Watch flag list + Hearth banner + escalation to Consul/Sovereign], mode-cell[Watch + Hearth + Post Box + Praetorium], mode-cell[Blocked on cc-032],
  mode-cell[Sentinel _continuity query_], mode-cell[Inline "Ask Sentinel" affordance on session header], mode-cell[Any room via header], mode-cell[Blocked on cc-032],
)

#v(0.5em)

#notebox(title: [Status legend])[
  #key[Operational] — surface live, mode fully UI-driven\
  #key[Bridging] — CC room scaffolded, functions not yet wired; manual bridge per the Transition Map\
  #key[Blocked on cc-0XX] — surface requires a specific queued canon to ratify first\
  #key[Blocked on `todo-XXXX`] — surface requires a specific TODO to close first (typically profile drafting)\
  #key[Minor surface] — lightweight affordance foldable into an existing room; not blocking
]

#pagebreak()

= §B — Queued Canon Dependencies

Each queued canon corresponds to one or more surfaces above. The following canons must ratify for the suite to reach full operational mode:

#table(
  columns: (0.8fr, 2fr, 2fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold", fill: white)[Slot],
    text(weight: "bold", fill: white)[Canon],
    text(weight: "bold", fill: white)[Unblocks],
  ),
  text(weight: "bold")[cc-028], mode-cell[Post Box UI], mode-cell[Consul review actions + Governor finding dispatch + Edict V final-pass surface],
  text(weight: "bold")[cc-029], mode-cell[Praetorium UI], mode-cell[Sovereign ratification queue + escalated-artifact disposition],
  text(weight: "bold")[cc-030], mode-cell[Companions Deploy UI + Ostia runtime extension], mode-cell[cc-027 Rung 5 automation + canonical_version drift detection + deploy-latency tolerance enforcement],
  text(weight: "bold")[cc-031], mode-cell[Gates wiring], mode-cell[Sentinel Gates-transit log mode],
  text(weight: "bold")[cc-032], mode-cell[Watch room (new 15th room)], mode-cell[Sentinel session movement log + anomaly flag modes],
  text(weight: "bold")[cc-033], mode-cell[Hearth wiring], mode-cell[Hearth bulletin-wall legible-activity layer feeding from Sentinel log],
  text(weight: "bold")[cc-034], mode-cell[Hero Card Specification (Lyra-convened Design Committee, `todo-0027`)], mode-cell[Order room hero-card gallery as representation + context-scoped dispatch paths (Model B → Model C per session s-2026-04-19-design-discussion)],
  text(weight: "bold")[cc-035], mode-cell[Portrait + Sigil Convention], mode-cell[Hand-illustrated portrait rendering + glyph-scale heraldic monograms for inline identifiers],
)

= §C — Required Canon Amendments

Two amendments to existing canons are required for the suite to operate cleanly:

#table(
  columns: (1fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Canon],
    text(weight: "bold")[Amendment],
  ),
  text(weight: "bold")[cc-017 type enum], mode-cell[Extend with `committee-proposal` as seventh value (joins `consultation | visitation | cross-cluster-meeting | cabinet-consultation | monument-bridge | report-up`). Cited by cc-024 §D; placeholder `cross-cluster-meeting` used until extension ratifies.],
  text(weight: "bold")[cc-017 authorship taxonomy], mode-cell[Extend with `aurelius-bridging` suffix (joins `aurelius-retrospective`). Cited by cc-025 §G; bridging-authored positions use this suffix during the bridging window.],
)

#pagebreak()

= §D — Pending Reservations from Prior Sessions

The following canon slots are reserved from earlier planning but carry independent content not covered by the persona-binding suite:

#table(
  columns: (1fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Slot],
    text(weight: "bold")[Topic],
  ),
  text(weight: "bold")[cc-019], mode-cell[Post Box Dispatch Architecture — the governance protocol for cross-Province artifact staging. Tracked from s-2026-04-17-04 (Aurelius Post Box architectural inputs). Distinct from cc-028 (Post Box UI); cc-019 is the protocol, cc-028 is the UI surface.],
  text(weight: "bold")[cc-020], mode-cell[Summon Companion Protocol — formalization of the lore-sync-003 summoning pattern. Depends on cc-019.],
  text(weight: "bold")[cc-021], mode-cell[Consular Visit Protocol — scheduled visits structure. Lyra's SproutLab is first candidate Province.],
)

These slots are independent of the persona-binding suite. The suite references them where relevant (cc-022, cc-024, cc-025, cc-027 all cite cc-019 / cc-020 where appropriate) but does not depend on their ratification to ratify itself.

= §E — Edict IX Trajectory

#rulebox(title: [Edict IX — The UI-Canonical-Existence Edict])[
  Proposed as the next Edict slot (IX) after the existing eight Edicts:\
  \
  #emph["Every Republic role, mode, workflow, or artifact-class must have a corresponding UI surface in the Capital that represents and audits it. Bindings, canons, and roles without a UI manifest are provisional; they may be ratified for governance purposes but are not operationally real until rendered. Each canon ratification must declare its UI manifest — existing surface, queued canon, or new surface required."]\
  \
  The persona-binding suite is the #key[first canon cluster] to ratify under Edict IX's shadow. This spec is the suite's UI manifest. Every future canon — in or out of the persona-binding suite — is expected to declare its own UI manifest as a required clause.
]

= §F — References

*Within the suite*: cc-022 (the binding rule whose modes this spec maps) · cc-023 (extension protocol; new modes register their surface here) · cc-024 (convening pattern; Senate/Post Box surfaces) · cc-025 (Design Committee membership; Senate composer) · cc-026 (placement; Companions View deploy surface) · cc-027 (signing chain; Post Box/Praetorium review surfaces) · Invocation Modes Registry · Bootstrap Transition Map · Preamble \& Index

*Pending canons as dependencies*: cc-019 Post Box · cc-020 Summon · cc-021 Consular Visit · cc-028 Post Box UI · cc-029 Praetorium UI · cc-030 Companions Deploy UI · cc-031 Gates wiring · cc-032 Watch room · cc-033 Hearth wiring · cc-034 Hero Card Spec · cc-035 Portrait + Sigil · Edict IX UI-Canonical-Existence

*Existing canons cited*: cc-017 (pending two amendments) · canon-cc-010 (records vs residence) · AURELIUS_COMPANIONS_VIEW.md (companion-view data layer spec)
