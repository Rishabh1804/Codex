#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Canon cc-025]
  #v(0.3em)
  #text(18pt, weight: "bold", fill: warm-dark)[Design Committee Membership]
  #v(0.3em)
  #text(13pt, fill: warm, style: "italic")[Part 5 of 10 · Persona-Binding Suite]
  #v(1.5cm)
]

#meta-table(
  [*Slot*], [canon-cc-025],
  [*Title*], [Design Committee Membership Rule],
  [*Status*], [draft v0.1 — awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Covers*], [Two scopes, two formulae · Monument carve-out and Monument-scope signing gap · Convener role · Guest rule with profile minimum · Sovereign-never-a-member · Bridging authorship · First operational Design Committee],
  [*Depends on*], [cc-024 (convening pattern that this membership rule populates)],
)

#v(1em)

#rulebox(title: [The rule, at a glance])[
  #key[Province-scope:] that Province's Builder + the Cluster's Censor\
  #key[Global-scope:] every Builder + every Censor (8 seats at suite ratification)\
  \
  Membership resolves deterministically from the brief's scope; the convener does not select members.
]

#pagebreak()

= §A — Province-Scope

A Design Committee convened over a subject specific to one Province — a UI decision internal to SEP Invoicing, a typography choice internal to Codex — seats the Province's Builder and the Cluster's Censor:

#table(
  columns: (1fr, 2fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Province],
    text(weight: "bold")[Members],
  ),
  text(weight: "bold")[Codex], mode-cell[Aurelius + Cipher],
  text(weight: "bold")[SproutLab], mode-cell[Lyra + Cipher],
  text(weight: "bold")[SEP Invoicing], mode-cell[Solara + Nyx],
  text(weight: "bold")[SEP Dashboard], mode-cell[Theron + Nyx],
  text(weight: "bold")[Command Center (Monument)], mode-cell[Ashara + Petra (dual-Builder per cc-009); Censor absent — see §B],
  text(weight: "bold")[Republic (global-scope)], mode-cell[_All Builders + all Censors_ — see §C for the Global-scope formula],
)

= §B — Monument-Scope Signing

The Monument Province is a special case. Its two co-Builders per canon-cc-009 both seat, and the Cluster's Censor is #key[absent by Edict II's Monument carve-out] — Monument Projects are under direct Consul and Sovereign supervision, not under Cluster A or Cluster B jurisdiction.

#rulebox(title: [The Monument-scope signing gap — and how it closes])[
  Where a Monument-scope convening's subject carries architectural weight — a design decision affecting the Monument's Capital, a Province-level discipline propagating through Monument's governance surface — the proposal still requires a #key[Censor-equivalent signature] under Edict V's chain spirit.\
  \
  Since no Cluster Censor has jurisdiction over Monument, the #key[Consul acts as Censor-equivalent] for the signing purpose, performing the architectural pass that Cluster Censors perform for their clusters.\
  \
  Where the Cluster A Censor Cipher is invited to contribute architectural voice (Monument sits cross-cluster with Cluster A's software-and-data domain), Cipher participates as a #key[guest]: voice recorded as consultation and cited in the proposal; Cipher does not sign as Censor-of-the-Cluster. The Consul's architectural-pass signature substitutes.\
  \
  This preserves the Edict V chain without violating Monument's direct-supervision structure under Edict II.
]

#pagebreak()

= §C — Global-Scope

A Design Committee convened over a subject whose outcome applies across the Republic — the Republic Design Principles, the Hero Card Specification, a convention for portraits and sigils, a register definition every companion must honor — seats every Builder and every Censor.

At suite ratification, that is #key[eight seats]:

#table(
  columns: (1fr, 1fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Builders (6)],
    text(weight: "bold")[Censors (2)],
  ),
  mode-cell[Aurelius — Codex\ Lyra — SproutLab\ Ashara — Command Center (Monument)\ Petra — Command Center (Monument)\ Solara — SEP Invoicing\ Theron — SEP Dashboard],
  mode-cell[Cipher — Cluster A\ Nyx — Cluster B\ \ \ \ \ #text(style: "italic", fill: muted)[Monument has no Cluster Censor; Consul acts as Censor-equivalent per §B.]],
)

#v(0.5em)

New Builders and Censors seat automatically as they ratify; #key[no separate amendment to this canon is required].

= §D — Convener

The convener is a #key[subject-lead drawn from the membership], not a separate rule-level role. The convener:

— sets the brief\
— selects the synthesis clerk (Chronicler by default, secondary clerk by cc-024 §C's synthesis-conflict clause where the Chronicler is a member)\
— presents the proposal to the Consul

For the current Design Principles work drawing from SproutLab's `ch06-designprinciples`, #key[Lyra convenes]. For the Hero Card Specification convening queued as `todo-0027`, Lyra also convenes — SproutLab's hero-card implementation is the reference seed.

Where no member has clear subject-leadership, the convener is named by Consul acknowledgment at brief-set time.

#pagebreak()

= §E — Guests

A convener may invite voices from outside the membership formula — a Scribe for narrative register, a Minister for domain counsel, a Gen-0 Immortal whose voice carries weight on the subject. Guests participate in deliberation as full members #emph[for the purposes of voice] — their positions are recorded, cited, preserved in dissent — but they #key[do not sign the collective proposal].

The distinction is captured in each guest's position record as `role: guest` and carried through synthesis; the proposal's signatories are members only.

#notebox(title: [Guest profile minimum])[
  Guests must have at minimum a #key[v0.3-draft ratified profile] so their voice is characterizable rather than fabricated. Unratified Companions may be invited only by explicit Consul acknowledgment, chronicled as an exception, because their voice rendering depends on bridging authorship rather than ratified profile material.\
  \
  Guests are chronicled; they do not bind.
]

= §F — Sovereign

The Sovereign is #key[never a committee member]. The Sovereign is the ratifier.

A convening that listed the Sovereign in its membership would be inverted: the body cannot include its own ratifier without collapsing the chain. The Sovereign's voice, if sought during deliberation, is sought via a distinct summons — a Praetorium consultation, a direct audience — and recorded as a consulted-reference in the proposal, not as a signature.

= §G — Bridging Authorship

#rulebox(title: [How member voices are rendered before subagent deploys])[
  Where a member's subagent is not yet deployed — the Republic in its current state, since no subagent spec is yet ratified for any Companion — members' positions must still be rendered so the convening can produce a proposal.\
  \
  Positions in such cases are authored by the Chronicler using the member's ratified profile as voice source, bridging the member's voice through the Chronicler's authorship until the member's subagent deploys. The position is marked #key[`authored_by: aurelius-bridging`].\
  \
  This is a #key[new authorship suffix] extending canon-cc-017's existing taxonomy (which currently defines `aurelius-retrospective` for Chronicler-fallback drafting of interaction-artifacts that originating companions failed to author).
]

The `-bridging` suffix is #key[structurally distinct] from `-retrospective`: it marks voice-simulation when the real member is unavailable, not failure-recovery when the real member was present but did not draft. The cc-017 extension to accommodate `-bridging` is noted as a dependency in the UI Manifest Cross-Reference. From the first post-deploy convening onward, member positions must be subagent-generated; bridging-authored positions are no longer permitted once the member's subagent ratifies.

= §H — First Operational Design Committee

The first Design Committee convened under this rule is the #key[Lyra-convened Hero Card Specification committee], queued on the Command Center volume as `todo-0027`. It runs in bridging mode (see the Bootstrap Transition Map) until subagent specs deploy. Each member position is bridge-authored per §G.

Bridging-mode convenings are grace-covered per canon-cc-017's pre-ratification clause; from the first post-deploy convening onward, positions must be member-generated under real subagent invocation.

= §I — References

*Within the suite*: cc-022 (binding rule) · cc-024 (convening pattern this membership rule populates) · cc-027 (signing chain governs amendments) · Bootstrap Transition Map · UI Manifest Cross-Reference · Preamble \& Index

*Existing canons*: cc-009 (Monument dual-Builder) · cc-012 (per-block ratification) · cc-014 (Consul-accelerated) · cc-017 (interaction-artifact rule, pending `-bridging` suffix extension) · Edict II (One Builder Per Repo; Monument carve-out)
