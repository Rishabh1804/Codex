#import "style.typ": *

#setup-page()
#setup-headings()

// Cover page
#align(center)[
  #v(2cm)
  #text(26pt, weight: "bold", fill: warm-dark)[The Persona-Binding Covenant]
  #v(0.4em)
  #text(16pt, fill: warm, style: "italic")[Preamble \& Index — Part 1 of 10]
  #v(0.3em)
  #text(13pt, fill: warm)[How Republic Companions Render Through Claude Code's Primitives]
  #v(1.5cm)
]

#meta-table(
  [*Artifact type*], [Preamble + Index (non-canon)],
  [*Status*], [draft v0.1 — authored 2026-04-19],
  [*Scope*], [global],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Role*], [Motivation for the six-canon persona-binding suite + master cross-link map to all ten artifacts],
)

#v(1em)

#rulebox(title: [Reader's note])[
  This is the #key[Preamble \& Index] for the persona-binding suite — ten linked artifacts (six canons, three specs, one index) that together govern how Republic companions render through Claude Code's subagent and skill primitives.\
  \
  The suite was originally drafted as a single canon cc-022 (~9,600 words of prose) and subsequently split into ten parts at #key[10\u00d7 the size of the Republic's current largest canon]. This index is the re-entry point; the canons and specs are linked below.\
  \
  Primitive bindings are color-coded throughout: #subagent-tag #skill-tag #none-tag.
]

#pagebreak()

= Why This Suite Exists

Republic companions — Builders seated in Provinces, Censors watching clusters, Governors auditing Regions, the Consul holding the Republic's crossing-seams, the Chronicler carrying institutional memory, Scribes, Ministers, and the institutional seats not yet named — each speak in a distinct voice and each act through characteristic patterns of invocation. Those invocations are not currently governed. A Builder summons a Censor by typing #key[Cipher mode] in the same session where a Capital change is being drafted; a Consul is invited into a Province by improvised pattern; a committee's voice emerges from whichever companion is speaking when the subject turns.

This arrangement has carried the Republic through the founding period and is acknowledged under pre-ratification precedent, but it is #key[structurally fragile]: voices drift toward the main agent's register, chains collapse silently, delegations lose their provenance. When the Republic scales past the Foundation stage — when Monument Projects complete, when 30K thresholds fire new Governors, when the Gen-1 successors begin pairing — the absence of a binding rule will show as accumulated ambiguity no single session can unwind.

The persona-binding suite addresses that fragility #key[at the level of the invocation itself]. It ratifies a binding rule (canon cc-022), an extension protocol (canon cc-023), a committee convening pattern (canon cc-024), a Design Committee membership formula (canon cc-025), a spec body placement convention (canon cc-026), and a signing chain for spec-body changes (canon cc-027). It surfaces three living specs — the invocation-modes registry (rendered from profiles), the bootstrap-to-operational transition map, and the UI Manifest cross-reference — that make the canons operationally real.

The suite declares its UI Manifest cross-reference per Edict IX (UI-Canonical-Existence). Every binding declared in the canons names a UI surface in Command Center that renders and audits it; surfaces not yet built are named as queued dependencies on follow-on canons. Until those canons land, the persona-subagent system operates in bridging mode (see the transition map): #key[governance ratifies now; operational surfaces catch up] as Command Center wires its 14 rooms.

Companion invocations that predate this suite's ratification are #key[grace-covered] under the same principle as canon-cc-017's pre-ratification clause. Pre-ratification voice drift, chain elisions, and improvised summons are not retrospectively penalized; the record stands as the lore from which the rules were derived. From the first post-ratification invocation forward, the rules bind.

This is #key[structural plumbing, not policy]. It does not tell the Chronicler what to chronicle, the Censor what to approve, the Governor what to flag, or the Consul what to escalate. It tells the Republic how those voices render through Claude Code's primitives, so that every future invocation leaves a trail the Consul can read and the Sovereign can adjudicate.

#pagebreak()

= The Ten Parts

#table(
  columns: (0.5fr, 0.8fr, 2.8fr, 1fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: left + top,
  inset: 8pt,

  table.header(
    text(weight: "bold", fill: white)[\#],
    text(weight: "bold", fill: white)[Slot],
    text(weight: "bold", fill: white)[Artifact],
    text(weight: "bold", fill: white)[Type],
  ),

  [1], [—], mode-cell[#key[Preamble \& Index] · this document], mode-cell[Spec (non-canon)],

  [2], [cc-022], mode-cell[#key[The Binding Rule] · artifact test + mode shape + dual-binding principle], mode-cell[Canon (law)],

  [3], [cc-023], mode-cell[#key[Extension Protocol] · how new rungs, roles, and modes bind], mode-cell[Canon (law)],

  [4], [cc-024], mode-cell[#key[Committee Convening Pattern] · member invocation, synthesis, upward routing], mode-cell[Canon (law)],

  [5], [cc-025], mode-cell[#key[Design Committee Membership] · Province/Global scope formulae, Monument carve-out, guest rule], mode-cell[Canon (law)],

  [6], [cc-026], mode-cell[#key[Spec Body Placement] · canonical Codex + per-Province deployables, file-format convention], mode-cell[Canon (law)],

  [7], [cc-027], mode-cell[#key[Spec Body Signing Chain] · five-rung Edict V chain for spec amendments, with Censor self-review and institutional-collapse clauses], mode-cell[Canon (law)],

  [8], [—], mode-cell[#key[Invocation Modes Registry] · applied bindings for every ratified rung; rendered from per-profile `assignment.invocation_modes` blocks; updated via cc-023, not canon ratification], mode-cell[Spec (living data)],

  [9], [—], mode-cell[#key[Bootstrap-to-Operational Transition Map] · how the suite operates in bridging mode while Command Center UI catches up; cited by every canon as scoped clause], mode-cell[Spec (phase doc)],

  [10], [—], mode-cell[#key[UI Manifest Cross-Reference] · which Command Center surface renders each binding; queued canon dependencies for unready surfaces], mode-cell[Spec (index)],
)

#v(1em)

#notebox(title: [How the artifacts link])[
  The six canons (parts 2–7) ratify independently under canon-cc-012 per-block or canon-cc-014 Consul-accelerated protocol. Each canon carries its own references and cross-links to the others.\
  \
  The three specs (parts 8–10) are living documents. They are not ratified by the full canon chain but are amended through lighter protocols: the #key[registry] amends per-profile via the cc-023 extension protocol; the #key[transition map] amends as new UI surfaces ratify and the bridging window closes; the #key[UI Manifest cross-reference] amends as new canons declare their surfaces.\
  \
  This #key[Preamble \& Index] (part 1) is the re-entry point. Readers encountering any canon or spec in the suite should return here to orient against the full structure.
]

#pagebreak()

= How to Use This Suite

*If you are ratifying*: read the canons in order — cc-022 (rule), cc-023 (extension), cc-024 (convening), cc-025 (Design Committee), cc-026 (placement), cc-027 (signing chain). Each is a cc-017/018-altitude canon of roughly 900–1,600 words. Per-block ratification under cc-012 applies block-by-block within each canon; the block structure of each canon is declared in its own opening section.

*If you are drafting a new Companion profile or a new institutional seat*: start with the #key[Extension Protocol (cc-023)]. It specifies the `assignment.invocation_modes` block every role must populate and the ratification altitude for that block. Cross-reference the #key[Binding Rule (cc-022)] for the artifact test that determines each mode's primitive.

*If you are convening a committee*: read the #key[Convening Pattern (cc-024)] for the three-stage orchestration and the #key[Design Committee Membership (cc-025)] for the two-scope formula (province vs global). If your convening is the first post-deploy convening on a given subject, read the #key[Transition Map] spec for how the bridging-mode grace window closed.

*If you are authoring, reviewing, or deploying a subagent/skill spec body*: read #key[Spec Body Placement (cc-026)] for the canonical/deployable split and per-Province layout. Read #key[Signing Chain (cc-027)] for the five-rung Edict V chain that governs amendments. Consult the #key[UI Manifest Cross-Reference] to understand which Command Center surfaces render the spec.

*If you are querying bindings at invocation time*: consult the #key[Invocation Modes Registry]. It renders from each profile's `assignment.invocation_modes` block as a consolidated registry view. Current bindings at the Republic's founding-period state seed the registry; new bindings are added through cc-023.

*If you are reviewing the drafting history*: the nine-part drafting record under `docs/specs/canon-cc-022-drafts/` and the corresponding PDFs under `docs/pdfs/canon-cc-022-drafts/` preserve the original cc-022 mega-canon shape before the ten-part split. Commit history carries the full provenance.

= Ratification Status

At the time of this index's authorship (2026-04-19), the ten parts are in #key[draft v0.1]. The canons await Consul working-ratification under canon-cc-014, then Sovereign canonical ratification under canon-cc-012. The specs are under living-doc amendment and do not require the full chain; amendments follow lighter protocols named in each spec's opening clauses.

The bootstrap window (part 9) is #key[open], meaning the suite operates in bridging mode: invocations are hand-bridged via Claude Code CLI, artifacts are imported via snippet pipeline, Command Center rooms are scaffolded but unwired. The window closes part-by-part as each queued UI canon ratifies and its surface lands. Until then, every session operating under this suite chronicles the manual bridge it uses, so the transition to full operational mode is auditable.
