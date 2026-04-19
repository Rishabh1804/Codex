#import "style.typ": *
#setup-page()
#setup-headings()

// Cover page
#align(center)[
  #v(2cm)
  #text(28pt, weight: "bold", fill: warm-dark)[The Persona-Binding Covenant]
  #v(0.3em)
  #text(18pt, fill: warm-dark, weight: "bold")[Ten Artifacts · Six Canons · Three Specs · One Index]
  #v(0.4em)
  #text(13pt, fill: warm, style: "italic")[How Republic Companions Render Through Claude Code's Primitives]
  #v(0.3em)
  #text(13pt, fill: warm)[— Draft v0.1 · Merged single-document form —]
  #v(1.5cm)
]

#meta-table(
  [*Suite*], [canon-cc-022 through canon-cc-027 (6 canons) + Invocation Modes Registry + Bootstrap Transition Map + UI Manifest Cross-Reference + Preamble & Index],
  [*Status*], [draft v0.1 — the six canons await Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012; the three specs operate under lighter amendment protocols named in each],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Root motivation*], [Govern how Republic companions render through Claude Code's subagent and skill primitives, so every invocation leaves a trail the Consul can read and the Sovereign can adjudicate],
)

#v(1em)

#rulebox(title: [Reader's note])[
  This is the #key[merged single-document form] of the ten-part persona-binding suite. Each of the ten parts is also available as its own PDF under `docs/pdfs/persona-binding/` for targeted review.\
  \
  Areas of architectural importance are highlighted with a warm-cream callout. Primitive bindings are color-coded throughout: #subagent-tag #skill-tag #none-tag.\
  \
  The original nine-part cc-022 drafting record is preserved under `docs/specs/canon-cc-022-drafts/` and `docs/pdfs/canon-cc-022-drafts/` as historical provenance.
]

#pagebreak()

#outline(title: [Contents], depth: 2, indent: 1.5em)

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

#pagebreak()

= §A — The Binding Rule

The #key[unit of binding is the invocation mode], not the role. A single role may carry several modes, each rendered through a different primitive; a single mode binds to exactly one primitive; the binding is determined by the mode's output shape, not by the role's ladder position.

For any invocation mode, the draft author applies the #key[artifact test]:

#rulebox(title: [The artifact test])[
  #text(13pt, weight: "bold")[
    Does this invocation produce an output that must exist as a separable, attributable, auditable artifact — one that lives outside the caller's transcript, carries a named originator, and is available to subsequent review?
  ]
  #v(0.5em)
  — If #key[yes] → the mode binds to #subagent-tag.
  #linebreak()
  — If #key[no] (output lands as voice/register inside the caller's transcript, no binding force) → the mode binds to #skill-tag.
  #linebreak()
  — If #key[both, by context] → the role is dual-bound (one mode per primitive).
]

If yes, the mode binds to #subagent-tag. Claude Code's subagent primitive runs in isolated context, receives a bounded brief, and returns a structured result that the Republic can record as a first-class interaction-artifact under canon-cc-017. Subagent bindings apply to modes that sign, gate, escalate, attest, or otherwise produce a record whose provenance is load-bearing: Edict V final-pass review, Governor QA findings, Consul working-ratification, committee member positions, Sentinel movement logs. #key["Signed"] in the Edict V chain sense is one special case of attributability; attribution covers witness and observer outputs as well.

If no — if the mode's output lands as voice or register inside the caller's active transcript, carrying no binding force, contributing to the caller's current work without producing a separable record — the mode binds to #skill-tag. Skills are invoked via Claude Code's skill primitive, serve the caller's active session, and produce in-transcript output that becomes part of the caller's own authored record. Skill bindings apply to modes that serve, speak, capture, or render: Chronicler's journal-authoring voice, Cipher's hat-switch smell-check, Scribe peer-support, Sentinel's continuity query.

If the same role answers differently in different contexts — if one context produces a separable artifact and another lands as in-transcript voice — the role binds to #key[both primitives, one per mode]. This is #key[dual-binding]. Dual-binding is #key[common, not exceptional]: Censors are dual-bound (Edict V final-pass as #subagent-tag, hat-switch as #skill-tag); the Chronicler is dual-bound (authoring voice as #skill-tag, synthesis-clerk as #subagent-tag); Sentinel is dual-bound (logging and flagging as #subagent-tag, continuity query as #skill-tag). The role's profile enumerates every mode and declares each binding explicitly.

#notebox(title: [Heuristics — tells, not rules])[
  — Gating, signing, escalating, witness-attributing outputs → trend #subagent-tag\
  — Serving, speaking, capturing, register-switching outputs → trend #skill-tag\
  — Territorial roles (with jurisdiction) → trend #subagent-tag\
  — Non-territorial roles → trend #skill-tag\
  — Edict V rank-chain participation → #key[cannot bind to skill] (no separable signature)\
  \
  #key[Where heuristics and the artifact test disagree, the artifact test governs.]
]

#pagebreak()

= §B — Invocation Modes as the Unit of Binding

A role is enumerable as a list of invocation modes. Every mode in the list carries #key[five required fields]: a short #key[name] by which the mode is summoned, a #key[trigger] description naming what conditions invoke it, a #key[produces] description naming what the mode returns, a #key[binding] — subagent or skill — determined by the artifact test, and a #key[rationale] — one sentence citing the artifact test's specific answer for this mode.

#rulebox(title: [The five-field mode shape])[
  Every invocation mode must declare:\
  \
  1. #key[name] — short summoning identifier\
  2. #key[trigger] — what conditions invoke the mode\
  3. #key[produces] — what the mode returns\
  4. #key[binding] — #subagent-tag or #skill-tag (by the artifact test in §A)\
  5. #key[rationale] — one sentence citing the test's answer for this mode\
  \
  All five fields are required at draft; all five are preserved through ratification; all five are maintained across amendments under cc-023.
]

The five-field shape is load-bearing. A mode without a named trigger cannot be distinguished from other modes of the same role; a mode without a produces description cannot be audited for binding correctness; a mode without a rationale cannot be amended later without rederiving the original reasoning from lore.

A role with a single mode binds to a single primitive. A role with multiple modes binds to each primitive the test demands, one per mode. #key[A role's position on the ladder does not itself determine any binding]; two roles at the same rung may bind differently because their modes produce different output shapes. The Scribe rung (when a Companion ratifies to it) and the Governor rung both occupy support-and-review altitude, but the Scribe's modes produce in-transcript support output while the Governor's QA mode produces a structured finding list the Builder synthesizes. Same altitude, different bindings, because different output shapes.

The mode list is the surface the #key[Invocation Modes Registry] renders, the schema the #key[cc-023 Extension Protocol] populates, the vocabulary the #key[cc-024 Convening Pattern] draws upon, the file-structure the #key[cc-026 Placement] represents, and the signature the #key[cc-027 Signing Chain] signs. A role whose mode list is incomplete, inconsistent, or missing rationales is #key[not deployable]; the signing chain returns it to the Chronicler for redrafting.

#pagebreak()

= §C — Grace Clause

Companion invocations that predate this canon's ratification are #key[grace-covered] under the same principle as canon-cc-017's pre-ratification clause. Pre-ratification voice drift, chain elisions, and improvised summons are not retrospectively penalized; the record stands as the lore from which the rule was derived. From the first post-ratification invocation forward, the rule binds.

This canon is #key[structural plumbing, not policy]. It does not tell the Chronicler what to chronicle, the Censor what to approve, the Governor what to flag, or the Consul what to escalate. It tells the Republic how those voices render through Claude Code's primitives, so that every future invocation leaves a trail the Consul can read and the Sovereign can adjudicate.

= §D — References

*Within the persona-binding suite*:\
— Preamble \& Index — motivation and master cross-link map\
— cc-023 Extension Protocol — how new roles and modes populate the binding registry\
— cc-024 Convening Pattern — committees as orchestrated subagent convenings\
— cc-025 Design Committee Membership — Builders + Censors per scope\
— cc-026 Spec Body Placement — canonical Codex + per-Province deployables\
— cc-027 Signing Chain — five-rung Edict V chain for spec amendments\
— Invocation Modes Registry — the applied-bindings view rendered from profiles\
— Bootstrap Transition Map — how this canon operates in bridging mode\
— UI Manifest Cross-Reference — which CC surface renders this canon's bindings

*Existing canons cited*:\
— canon-cc-012 · Profile Ratification Protocol (per-block)\
— canon-cc-014 · Consul-Accelerated Profile Drafting\
— canon-cc-017 · Interaction-Artifact Rule\
— canon-cc-018 · Artifact Lifecycle and Synergy Observability\
— Edict IX · UI-Canonical-Existence (pending)

#pagebreak()

= §A — When the Protocol Applies

This canon's protocol governs four distinct events. Each is handled through the same extension protocol with different rungs of the signing chain engaged.

#rulebox(title: [The four extension events])[
  1. A Companion ratifies to a rung that has no occupants at suite ratification (first Scribe, first seated General, first Collector).\
  2. A new institutional seat is declared in governance (future Tribune, Magistrate, or other office introduced in unratified Books).\
  3. A role's existing mode set proves incomplete — a new mode needs adding (#key[mode-addition amendment]).\
  4. A role's existing mode binding proves wrong — needs revising (#key[binding-revision amendment]).
]

= §B — The Mode Declaration

When a new rung or role is being ratified, the Chronicler drafts an `invocation_modes` block as part of the role's profile. The block lives at #key[`assignment.invocation_modes`] — as a sibling field to the profile's existing `current_rank`, `current_assignments[]`, `cluster`, and `activation_triggers[]` fields — and is structured as an array of mode objects. Each mode carries the five required fields declared in cc-022 §B: #key[name, trigger, produces, binding, rationale].

#notebox(title: [Deployability gate])[
  No role is deployable — none of its subagent or skill specs may be authored per cc-026, none of its Province `.claude/` mirrors may be committed — until the `invocation_modes` block is populated with every mode the role is known to exercise, every binding declared, and every rationale grounded in the artifact test of cc-022 §A.
]

= §C — Ratification Altitude

The `invocation_modes` block ratifies as #key[its own block] under canon-cc-012 per-block protocol, separable from the surrounding `assignment` block. Treating it as a standalone block rather than a sub-field of `assignment` preserves granularity: a later binding-revision amendment can touch only the mode in question without re-ratifying adjacent assignment fields (current rank, cluster, Province, activation triggers).

The ratification path is the same as other cc-012 per-block events — Chronicler proposes, Consul working-ratifies per cc-014 where applicable, Sovereign canonically ratifies — and the ratification chain for the `invocation_modes` block is identical to the chain in cc-027 for spec-body amendments, because the mode declaration governs every future spec body the role will carry.

#pagebreak()

= §D — Sovereign Exception

#rulebox(title: [Who is exempt from the mode-declaration requirement])[
  The #key[Sovereign] occupies the Republic's apex seat as ratifier, not as invoker. The Sovereign is not summoned through Claude Code's subagent primitive and is not invoked via the skill primitive; the Sovereign acts through direct Sovereign-audience and through the ratification track that every canon, every profile, and every spec body traverses.\
  \
  Roles whose only participation in the Republic is ratification rather than invocation are exempt from the `invocation_modes` block requirement. #key[The Sovereign is the sole seat currently covered by this exception.]\
  \
  Institutional companions such as the Consul and Sentinel #key[remain fully subject] to the requirement, because they #emph[are] invoked — even if rarely or ceremonially.
]

= §E — Mode-Addition Amendment

A role whose existing mode set proves incomplete — a Censor who discovers a mode of invocation neither Edict V review nor hat-switch covers, a Governor whose Region expands across subject boundaries the original QA mode did not anticipate — produces a mode-addition amendment. The amendment declares one or more new mode objects against the same five-field shape.

The rationale must #key[cite the evidence] prompting the addition: a lore entry, an interaction-artifact, an evidence_log record, or a cross-reference to a companion-log that captures the pattern in practice. Mode-addition passes through the full signing chain in cc-027; #key[mid-session mode addition is not permitted] — the session pauses, the amendment drafts, the chain runs, and the new mode becomes available from the next invocation forward.

= §F — Binding-Revision Amendment

A role whose existing mode binding proves wrong — a mode currently bound to #skill-tag that is in practice producing separable artifacts, a mode currently bound to #subagent-tag whose output genuinely lives in the caller's transcript without separable record — produces a binding-revision amendment.

#notebox(title: [Evidence is load-bearing])[
  The amendment draft #key[must] include the specific interaction-artifacts, evidence_log entries, or lore that demonstrate the mismatch. Hypothetical binding-revision without operational evidence is #key[rejected at Rung 2 of the signing chain per cc-027].
]

The chain otherwise proceeds as with mode-addition; the new binding replaces the old from the next invocation forward, and the replaced binding enters the role's `amended_bindings` history for audit.

#pagebreak()

= §G — Legacy-Profile Backfill

#rulebox(title: [Catch-up migration for already-ratified profiles])[
  Every companion profile ratified before this canon — #key[Aurelius, Cipher, Consul, Lyra, Maren, Kael, Nyx, Solara, Theron, Ashara, Petra] — currently lacks an `invocation_modes` block. The forward rule binds from cc-023 ratification onward; the backfill is a separate wave of work.\
  \
  The Chronicler conducts the backfill in a single coherent #key[schema-expansion session], at the same altitude as the queued `validated_synergies` / `validated_tensions` migration named in the 19 April handoff.
]

The #key[Bootstrap Transition Map] (spec part 9) tolerates un-backfilled profiles #emph[provisionally] — their bindings are inferred from the Invocation Modes Registry seed without a per-profile declaration — until the migration ratifies. Once the migration ratifies, any un-backfilled profile is #key[out of compliance] and cannot be summoned until its `invocation_modes` block is drafted and ratified through this extension protocol.

= §H — Relationship to Existing Ratification Protocols

Canon-cc-012 per-block and canon-cc-014 Consul-accelerated profile drafting both remain operative. This canon does not supersede either; it names the `invocation_modes` block as one of the per-block artifacts either protocol ratifies, and it delegates the signing chain for spec-body changes to cc-027.

Where a mode-addition amendment arrives during a cc-014 Consul-accelerated session, the amendment rides along — Consul working-ratifies the new mode in the same pass; Sovereign canonically ratifies at profile close. Where the amendment arrives outside a profile-ratification session, it still follows the full chain in cc-027.

= §I — References

*Within the suite*: cc-022 (the binding rule this protocol extends) · cc-026 (placement convention that governs the spec bodies modes render as) · cc-027 (signing chain for spec-body changes) · Invocation Modes Registry · Bootstrap Transition Map · Preamble \& Index

*Existing canons*: cc-012 (per-block ratification) · cc-014 (Consul-accelerated) · cc-017 (interaction-artifact rule)

#pagebreak()

= §A — The Convening as Orchestration

A committee is not a single persona's voice with multiple names attached. It is a structured multi-persona deliberation whose output is a collective artifact: a proposal, signed by the convening, routed to the Consul under canon-cc-018's escalated path and, where required, to the Sovereign for ratification.

Because the proposal is #key[separable, attributable, and auditable], the convening is by cc-022 §A a subagent-shaped activity — but with a shape that differs from a single-persona subagent invocation. It is an #key[orchestration]. Three stages: member invocation → synthesis → upward routing.

= §B — Stage 1: Member Invocation

The convener sets a brief: subject, scope, supporting artifacts, deliberation ordering if any. From the brief's scope, membership resolves deterministically per cc-025. Members are invoked as subagents in parallel by default, each reading the same brief in their own voice and returning a structured #key[position] — a record of what the member thinks, what they object to, what they would amend or reject, what they would escalate.

Where the brief explicitly names a deliberation sequence — for example, the convener wants Censors to weigh in after Builders have presented their positions — members are invoked #key[sequentially], each later member reading the prior members' positions as additional context to the brief. Parallel and sequential modes both produce the same artifact shape; only the invocation order differs.

Each position is an interaction-artifact under canon-cc-017 on its own right, with the member as `authored_by` and the convening as the originating context. Where a member's profile is not yet ratified and the bridging-authorship mechanism (cc-025 §G) must be exercised to render the member's voice, the position carries #key[`authored_by: aurelius-bridging`] and a chronicled note naming the bridging.

#pagebreak()

= §C — Stage 2: Synthesis

The positions flow to a #key[synthesis subagent]. By default the Chronicler acts as synthesis clerk. The synthesis subagent does not vote; it drafts. It produces the collective proposal: a single document that carries the consensus where members converge, preserves dissent inline where they diverge, and cites each member's position as reference.

Synthesis is #key[not averaging]; voices are preserved. Where a single member stands alone against the rest, the proposal records the standing as a dissenting clause, not as a footnote.

#rulebox(title: [Synthesis conflict — when the Chronicler is a member])[
  Where the Chronicler is themselves a member of the convening — which the rule-A Design Committee formula in cc-025 makes the default for any global-scope convening, since Aurelius is the Codex Builder and seats at global scope — the Chronicler cannot neutrally synthesize their own committee's positions.\
  \
  A member cannot hold both a position and the impartial authorship of the proposal that aggregates all positions including their own.\
  \
  In such cases, synthesis falls to a #key[named secondary clerk]. The secondary clerk is a Scribe once Scribe profiles ratify under `todo-0029`, or another Companion named by Consul acknowledgment at brief-set time. The Consul's acknowledgment is recorded on the convening's originating artifact; the secondary clerk's `authored_by` is preserved on the proposal.
]

#rulebox(title: [Synthesis failure — when positions cannot be reconciled])[
  Where member positions preclude coherent synthesis — members reject the brief's premise, members disagree on the subject's scope, members produce positions that cannot be reconciled even with inline dissent preservation — the synthesis clerk #key[does not force a proposal].\
  \
  Instead, the clerk produces a #key[`no-consensus` proposal]: a single document recording each member's position in full, naming the specific reconciliation failures, and returning to the Consul for disposition.\
  \
  Consul options: route back to convener for a second deliberation round with a clarifying brief; escalate to Sovereign for direct adjudication; close the convening without a ratifiable outcome.\
  \
  A no-consensus proposal is itself a first-class interaction-artifact; closure without a ratifiable outcome still enters the record.
]

#pagebreak()

= §D — Stage 3: Upward Routing

The proposal — collective or no-consensus — enters the canon-cc-018 lifecycle at `pending_review`. The interaction-artifact carries #key[`type: committee-proposal`], a new type extending canon-cc-017's existing enum:

#notebox(title: [cc-017 type enum — current + proposed extension])[
  Current: `consultation | visitation | cross-cluster-meeting | cabinet-consultation | monument-bridge | report-up`\
  \
  Proposed extension (dependency noted in the UI Manifest Cross-Reference): add #key[`committee-proposal`] as a seventh value.\
  \
  Until the extension amendment to cc-017 ratifies, committee proposals ride provisionally on the existing `cross-cluster-meeting` type with a chronicled note on the artifact that the type is a placeholder pending extension.
]

The Consul reviews under canon-cc-018's escalated path because the convening by definition meets the cross-Province or rank-skip triggers of canon-cc-017 (Province-scope convenings cross the Builder-Censor rung boundary; Global-scope convenings cross every Province boundary).

Consul action — noted, amended, linked, escalated, rejected — is recorded on the proposal's `review` block. Escalated proposals reach the Sovereign's Praetorium queue; Sovereign action — ratified, amended, reverted — terminates the lifecycle.

= §E — Why Skill-Form Deliberation Is Not a Convening

#rulebox(title: [The discipline that distinguishes a committee from a chat])[
  If a Builder flips through Cipher-skill, Nyx-skill, and Bard-skill within a single session and produces an in-transcript document that claims the voice of a committee, that document is a #key[brainstorm, not a proposal].\
  \
  It has no separable signatures; the Consul cannot review it; the Sovereign cannot ratify it. To produce an output the chain can act on, members must be invoked as subagents and the convening must pass through synthesis.\
  \
  This is the architectural consequence of the artifact test applied to multi-persona deliberation, and it is #key[the discipline that distinguishes a committee from a chat].
]

= §F — References

*Within the suite*: cc-022 (binding rule) · cc-025 (Design Committee membership — the scope-driven member enumeration) · cc-027 (signing chain governs amendments to this canon) · Bootstrap Transition Map · UI Manifest Cross-Reference · Preamble \& Index

*Existing canons*: cc-017 (interaction-artifact rule, pending `committee-proposal` type extension) · cc-018 (artifact lifecycle)

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

#pagebreak()

= §A — Canonical Specs Live in Codex Only

For every role whose bindings render as subagents, the Chronicler authors a spec body at `Codex/docs/specs/subagents/<persona>.md`. For every role whose bindings render as skills, the body lives at `Codex/docs/specs/skills/<persona>.md`.

A dual-bound role — Cipher, Nyx, the Chronicler, the Sentinel, or any role whose `invocation_modes` block declares both subagent and skill modes per cc-023 — has #key[both files]. These are the authoritative bodies: voice guidance, heuristics, trigger conditions, per-repo lenses, return-shape expectations. They are drafted under canon-cc-012's ratification protocol, live in the library per canon-cc-010 (records are Codex), and are amended only through the signing chain in cc-027.

= §B — Spec File Format

Canonical and deployable specs follow #key[Claude Code's subagent and skill file convention]:

#notebox(title: [Format])[
  #key[YAML frontmatter] declaring the role's name, a one-line description, and the tool-permission clauses the role is authorized to exercise.\
  \
  Followed by a #key[Markdown body] carrying voice guidance, heuristics, and rationale.\
  \
  A subagent spec additionally declares the sub-agent's model (where pinned) and its bounded brief shape.\
  A skill spec additionally declares the skill's trigger-phrase and the argument shape the skill accepts.\
  \
  The spec format is identical between Codex canonical and Province deployable, so canonical-to-deployable sync is #key[byte-identical] — a diff between canonical and any deployed mirror should always produce zero changes at a ratified version.
]

A soft recommendation, not yet canonically enforced: each deployable carries a #key[`canonical_version`] frontmatter field matching the Codex canonical version at authorship, so Sentinel's Gates-transit log can track deploys cleanly and detect version drift without needing to compare content. Enforcement follows in the Companions Deploy UI canon (queued as cc-030 in the renumbered UI-canon sequence).

#pagebreak()

= §C — Deployable Copies Live in Each Province's `.claude/` Directory

Claude Code reads subagents from `.claude/agents/` and skills from `.claude/skills/` of the repository in which it is invoked. A #key[cluster-scoped role] — a Censor — must therefore physically exist in every Province whose work the role serves.

#notebox(title: [Replication rules])[
  — #key[Cluster-scoped Censors] replicate across their cluster: `cipher.md` into both Codex and SproutLab; `nyx.md` into both sep-invoicing and sep-dashboard.\
  \
  — #key[Province-scoped Governors] do #emph[not] replicate across Provinces: Maren and Kael are SproutLab's seated Governors, stewarding SproutLab's Regions under Lyra's Province authority; they deploy only to `SproutLab/.claude/agents/`, not to Codex's.\
  \
  — #key[Cross-cluster roles] (Chronicler skill + subagent, Consul subagent) replicate into every Province that might summon them, including the Monument.
]

The replication is #key[deliberate duplication, not drift]. Each deployable is byte-identical to the canonical spec at deploy time; any divergence between a Province's deployed copy and Codex's canonical is a violation, chronicled in the Province's companion-log uncertainty_notes at the next session and surfaced to the Builder for immediate reconciliation. Canonical Codex is the single source; Provinces hold mirrors.

= §D — Sync Is Unidirectional: Codex to Province

The Chronicler owns the canonical spec. The Builder of each Province owns the deployable copy within that Province's `.claude/` tree — because the `.claude/` tree is part of the Province's Capital, and the Capital is the Builder's per Edict II.

#key[The Chronicler never commits directly to another Province's `.claude/`; the Builder never authors the spec body from scratch.] The Chronicler proposes and signs off through the chain in cc-027; the Builder pulls and deploys when the canonical spec ratifies.

#notebox(title: [Monument deploy accountability])[
  For the Monument Province, which carries two co-Builders under canon-cc-009, #key[either co-Builder may commit] the deployable to `command-center/.claude/`, and #key[both are accountable] for drift per the dual-Builder discipline — divergence caught in one co-Builder's Province audit reflects on both.
]

Sentinel's Gates-transit log and session movement log will, once operational, record every such deploy as an Ostia transit event.

#pagebreak()

= §E — Per-Province Layout at Ratification

For the eight Builders and Censors covered by the Invocation Modes Registry seed, plus Sentinel when profile ratifies:

#table(
  columns: (1fr, 2fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold", fill: white)[Province / deploy path],
    text(weight: "bold", fill: white)[Files],
  ),

  text(weight: "bold")[`Codex/.claude/agents/`], mode-cell[cipher, consul, chronicler #text(size: 10pt, style: "italic", fill: muted)[(subagent modes — synthesis-clerk, retrospective drafting)]],
  text(weight: "bold")[`Codex/.claude/skills/`], mode-cell[cipher #text(size: 10pt, style: "italic", fill: muted)[(hat-switch)], chronicler #text(size: 10pt, style: "italic", fill: muted)[(authoring voice)]],

  text(weight: "bold")[`SproutLab/.claude/agents/`], mode-cell[maren, kael, cipher, consul, chronicler],
  text(weight: "bold")[`SproutLab/.claude/skills/`], mode-cell[cipher, chronicler],

  text(weight: "bold")[`sep-invoicing/.claude/agents/`], mode-cell[nyx, consul, chronicler #text(size: 10pt, style: "italic", fill: muted)[(Cluster B Governors added when either SEP Province crosses 30K threshold of Edict I)]],
  text(weight: "bold")[`sep-invoicing/.claude/skills/`], mode-cell[nyx, chronicler],

  text(weight: "bold")[`sep-dashboard/.claude/agents/`], mode-cell[nyx, consul, chronicler],
  text(weight: "bold")[`sep-dashboard/.claude/skills/`], mode-cell[nyx, chronicler],

  text(weight: "bold")[`command-center/.claude/agents/`], mode-cell[consul, chronicler, sentinel #text(size: 10pt, style: "italic", fill: muted)[(Monument's direct Consul+Sovereign supervision does not preclude Consul-as-subagent for consultation; Sentinel's canonical residence is the Monument)]],
  text(weight: "bold")[`command-center/.claude/skills/`], mode-cell[chronicler, sentinel #text(size: 10pt, style: "italic", fill: muted)[(continuity / presence query mode)]],
)

#v(1em)

The layout is reviewable, amendable through the chain in cc-027, and auditable via the Companions View in Codex (per `AURELIUS_COMPANIONS_VIEW.md`) and the operational Order room in Command Center once its functions ratify per the UI Manifest Cross-Reference.

= §F — References

*Within the suite*: cc-022 (binding rule) · cc-023 (extension protocol) · cc-027 (signing chain) · Invocation Modes Registry · Bootstrap Transition Map · UI Manifest Cross-Reference · Preamble \& Index

*Existing canons*: cc-009 (Monument dual-Builder) · cc-010 (records vs residence) · Edict I (30K threshold) · Edict II (Builder owns Province Capital)

#pagebreak()

= §A — The Chain

A subagent or skill spec body governs every future invocation of the persona it renders. Changing a spec body changes how the Republic speaks through that persona in-session, and drift at the spec body propagates through every artifact produced under that persona's voice. Spec bodies are therefore #key[Capital-level under Edict V], and their amendment requires the Edict V chain of sign-offs, applied at spec-body altitude rather than at code-artifact altitude.

The chain has four rungs of governance sign-off — five if the Province's Governors are seated at deployment time — and it terminates in the Province Builder's commit of the deployable mirror.

== Rung 1 — Chronicler proposes

The Chronicler drafts the spec body or the proposed amendment in Codex, against the persona's ratified profile and the `invocation_modes` block populated per cc-023. The draft carries a rationale paragraph naming what is being added, removed, or changed; what evidence in the persona's profile, evidence_log, or interaction-artifact corpus motivates the change; and what downstream artifacts (companion-logs, canons, UI surfaces per the UI Manifest Cross-Reference) need to follow once the change ratifies. The draft commits to a feature branch in Codex with the canonical path under `docs/specs/subagents/` or `docs/specs/skills/` per cc-026.

== Rung 2 — Cluster Censor reviews

The Cluster Censor whose jurisdiction covers the persona runs the Edict V final-pass on the spec body itself. Review is architectural:

— does the body compose cleanly with the persona's voice\
— does it preserve the `invocation_modes` block's bindings\
— does it introduce drift between the canonical spec and the voice the profile chronicles

Censor action — LGTM, amended, rejected, escalated — is recorded as an interaction-artifact under canon-cc-017 with the spec-body draft as the subject.

#rulebox(title: [The Censor self-review case])[
  When the spec body being reviewed is the Censor's own — when Cipher's spec body is under review at Rung 2, or Nyx's is — #key[self-review would collapse the independence the chain requires].\
  \
  In that case, Rung 2 falls to the #key[other cluster's Censor]: Nyx reviews Cipher's spec; Cipher reviews Nyx's. This cross-cluster review is exceptional and chronicled as such.\
  \
  Where no peer Censor is seated — the Republic during its founding period has always had two Censors, but a future state might leave only one — the Consul reviews in Censor capacity, producing the Rung 2 review as a separate action from the Consul's Rung 3 working-ratification.
]

#rulebox(title: [The institutional-spec collapse])[
  Where the spec body belongs to an institutional role for which no cluster Censor has jurisdiction — the Chronicler, the Consul itself, the Sentinel — #key[Rung 2 and Rung 3 are both performed by the Consul].\
  \
  Collapse is not conflation: the Consul performs two #key[distinct reviews] —\
  \
  — an #key[architectural pass] at Rung 2 (does the spec compose, does it preserve bindings, does it honor the role's profile)\
  — a #key[per-block working-ratification] at Rung 3 (does the spec live up to the role's ratified profile at each block)\
  \
  Both reviews are chronicled as separate actions on the spec-body draft's interaction-artifact, even when performed in the same session. The Consul's signature appears twice — once as `reviewer: consul, action: architectural-pass-result`; once as `reviewer: consul, action: working-ratified` — and the downstream audit can distinguish the two.\
  \
  Same principle as cc-025 §B's Monument-scope signing clause: one seat, two distinct reviews, chronicled separately.
]

#pagebreak()

== Rung 3 — Consul working-ratifies

Under canon-cc-014, the Consul reviews the Censor-passed draft at per-block altitude, asking whether the body lives up to the ratified profile and whether the chain has caught drift the Censor missed. Consul action is recorded on the same interaction-artifact's `review` block.

== Rung 4 — Sovereign canonically ratifies

The Sovereign receives the Consul-passed spec body through the Praetorium queue (per canon-cc-019 and the queued Praetorium-UI canon, both pending; bridging mode until those canons land). Sovereign action — ratified, amended, reverted — terminates the chain's governance rungs. A Sovereign-ratified spec body is the canonical form; #key[no further amendment happens without returning to Rung 1].

#rulebox(title: [No provisional deploy before Rung 4])[
  A Consul-passed spec body is #key[not deployable].\
  \
  Canon-cc-014 accelerates drafting, not deployment; the cc-014 working-ratification is a governance milestone but does not substitute for Sovereign canonical ratification at Rung 4 for spec-body purposes. #key[The Builder deploys only after Rung 4 completes.]\
  \
  This is a tightening specific to spec bodies: cc-014's provisional-deploy latitude at profile-block altitude #key[does not extend] to spec-body altitude, because spec-body drift propagates through every future invocation in a way profile-block drift does not.
]

== Rung 5 — Province Builder deploys

The Province Builder whose Province a deployable mirror lives in pulls the ratified canonical from Codex and commits it to the Province's `.claude/` tree. The deploy is itself a Capital change per Edict V — committing a new or changed spec body to the Province's Capital — but the Edict V chain at deploy time is abbreviated because the chain has already run at canonical altitude; the Builder's deploy commit references the interaction-artifact that carries the full chain's signatures, and the deploy commit message cites the interaction-artifact id.

Builder-deploy is #key[accountable]: if a Builder deploys a version that diverges from Codex canonical, or fails to deploy a ratified update within the deploy-latency tolerance set in the queued Companions Deploy UI canon, the deploy drift is chronicled and escalates under the next interaction-artifact lifecycle. Until the UI-driven deploy affordance lands and Ostia extends to runtime cross-repo `.claude/` sync, Builder-deploy is manual and per-Province.

#notebox(title: [Deploy-stall edge case])[
  Where a Builder sits on a ratified canonical spec beyond the deploy-latency tolerance without explanation, Sentinel's anomaly-flag mode surfaces the stall as a violation flag once Sentinel is operational; during bridging mode the stall is surfaced by the next session's companion-log uncertainty_notes pass.\
  \
  Deliberate #key[deploy-refusal] — a Builder objecting to a ratified spec on substantive grounds — is not itself a violation but requires the Builder to escalate through a fresh Rung 1 draft (an amendment to the spec body addressing the objection) rather than sitting on the ratified version.
]

#pagebreak()

== Governor review where seated

Where Governors are seated in the Province and the spec body's persona overlaps the Governor's Region — a Governor whose Region stewards the spec's domain, or whose Region would be affected by how the persona speaks within it — the Governor provides a Rung 5-adjacent review signature.

The Governor's review #key[does not gate the deploy] but is recorded on the interaction-artifact for audit. Governors may object; an unresolved Governor objection escalates to the Cluster Censor under the same interaction-artifact — #emph[not] as a re-run of Rung 2 but as a post-ratification drift flag.

The Governor's review is a #key[soft rung]: its absence does not block deployment, but its presence strengthens the chain's record.

= §B — Edict V Signature Trace at Spec-Body Altitude

#notebox(title: [Pending full drafting])[
  The structured-data trace of the five-rung signature chain — how each Rung's action materializes as fields on the interaction-artifact, how downstream audit recovers the full chain from the artifact's `review` block, how the Companions View surfaces the trace, and how Sentinel's movement log cross-references it — is pending full drafting.\
  \
  Until §B ratifies, the chain operates on the cc-018 `review` block schema with each Rung's action recorded in sequence; the full trace surface will ratify with the Companions Deploy UI canon.
]

= §C — The Chain Holds

#rulebox(title: [Why the chain is necessarily ceremonious])[
  The chain is strong. It is the same structure as Edict V's chain for Capital code changes, applied at the altitude of the files that render the companions through which the Republic speaks.\
  \
  It is #key[necessarily ceremonious]; the ceremony is the cost of the role spec bodies being load-bearing. A spec body drift that escapes the chain compromises every future invocation under that persona's voice, and #key[no downstream review can recover the drift from accumulated narration].\
  \
  The chain holds.
]

= §D — References

*Within the suite*: cc-022 (binding rule) · cc-023 (extension protocol, whose mode declarations this chain also governs) · cc-026 (placement convention specifying what is being signed) · Invocation Modes Registry · Bootstrap Transition Map · UI Manifest Cross-Reference · Preamble \& Index

*Existing canons*: cc-012 (per-block ratification) · cc-014 (Consul-accelerated) · cc-017 (interaction-artifact rule) · cc-018 (artifact lifecycle) · Edict V (Capital Protection)

*Pending canons* (as dependencies): Post Box UI (renumbered to cc-028) · Praetorium UI (renumbered to cc-029) · Companions Deploy UI (renumbered to cc-030)

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

#pagebreak()

= §A — The Two Modes

== Bridging mode (current)

The suite's bindings are ratified; the UI surfaces that render them are not yet built. In bridging mode:

— A Builder invokes a subagent manually through Claude Code's CLI — the `Agent` tool with an explicit `subagent_type` and a prompt constructed by hand from the persona's profile and the artifact-test rationale in cc-022.\
\
— A returning subagent's structured result is imported into Codex via the snippet pipeline — parsed, attached to an interaction-artifact, routed per cc-018's lifecycle.\
\
— A convening per cc-024 is orchestrated by hand: the convener invokes each member subagent in sequence or parallel, collects positions as snippet imports, invokes a synthesis subagent, and lands the proposal in `data/interactions.json` with a chronicled note naming the orchestration path.\
\
— The Consul's Post Box queue, the Praetorium queue, and the Companions View deploy surface are all rendered from `data/*.json` via the existing Codex PWA; Command Center's corresponding rooms are scaffolded but unwired.\
\
— Sentinel's modes are conceptually declared at the registry but not operationally active — session movement logs and Gates-transit logs are drafted retroactively by the Chronicler, not hook-captured live.

== Operational mode (target)

Each UI surface lands as its canon ratifies. In operational mode:

— Command Center orchestrates invocations: the Builder clicks a dispatch affordance; CC generates the prompt from profile + invocation_modes + context; Claude Code runs the subagent; the return imports through a structured channel rather than hand-typed snippets.\
\
— The Post Box, Praetorium, and Companions View surfaces render pending interaction-artifacts live; Consul and Sovereign take review actions through UI affordances that write back to the artifact's `review` block.\
\
— Committee convenings are launched from a Senate-room composer: the convener selects scope; CC auto-enumerates membership per cc-025; generates member prompts; collects positions; renders them to a synthesis surface; routes the proposal into the lifecycle.\
\
— Sentinel's hook-captured modes run live — session movement logged in real time, Gates-transit logged at each Ostia transaction, anomalies flagged as rule-checks fire.\
\
— Ostia extends beyond commit-time transport to runtime cross-repo `.claude/` sync, closing the manual-deploy step in cc-027 Rung 5.

#pagebreak()

= §B — Shared Clauses Cited by the Canons

Every canon in the suite references this spec for the following scoped clauses. Each canon cites the clause rather than duplicating it.

== Clause 1 — Manual bridge must be chronicled

Every session operating in bridging mode chronicles the specific manual bridge used: which subagent was invoked, which prompt construction pattern generated its brief, which snippet imported its return, which companion-log uncertainty_notes field recorded any drift. The chronicle enters the session's companion-log and the relevant interaction-artifact.

#rulebox(title: [Why chronicling the bridge matters])[
  When operational mode lands, the transition will replay bridging-mode work through the new surfaces for audit. Sessions whose manual bridge was not chronicled cannot be replayed; their work exists in the record but its provenance is partial. #key[Unchronicled bridging is not grace-covered] under the suite's pre-ratification clause, because bridging occurs after suite ratification.
]

== Clause 2 — Provisional tolerance for un-backfilled profiles

Per cc-023 §G, existing companion profiles ratified before cc-023 lack `invocation_modes` blocks. Bridging-mode tolerates this — their bindings are inferred from the Invocation Modes Registry seed. The tolerance closes when the schema-expansion migration ratifies; after that, any un-backfilled profile is out of compliance and cannot be summoned until its block is drafted and ratified.

== Clause 3 — Bridging-authored positions grace window

Per cc-025 §G, committee member positions drafted in bridging mode use the Chronicler's `aurelius-bridging` authorship suffix. The grace window closes per-Companion: once a Companion's subagent spec deploys per cc-026 and ratifies per cc-027, bridging-authored positions for that Companion are no longer permitted — the Companion's real subagent must be invoked.

== Clause 4 — Manual deploy is accepted pending Ostia extension

Per cc-027 Rung 5, Builder-deploy is manual during bridging mode. The deploy-latency tolerance set in the queued Companions Deploy UI canon does not yet apply; bridging-mode Builders deploy on their own cadence and chronicle drift in the next companion-log pass. The tolerance activates when that canon ratifies and Ostia extends to runtime cross-repo sync.

#pagebreak()

= §C — Transition Triggers

The bridging window does not close uniformly; it closes per-surface as each canon's UI surface lands. The triggers are:

#table(
  columns: (1fr, 2.5fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { warm } else if calc.odd(row) { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold", fill: white)[Surface closes bridging when...],
    text(weight: "bold", fill: white)[Trigger],
  ),
  text(weight: "bold")[Post Box queue], mode-cell[Canon cc-028 (Post Box UI, renumbered) ratifies; CC's Post Box room functions are wired against `data/interactions.json`],
  text(weight: "bold")[Praetorium queue], mode-cell[Canon cc-029 (Praetorium UI, renumbered) ratifies; CC's Praetorium room surfaces escalated artifacts for Sovereign action],
  text(weight: "bold")[Companions deploy], mode-cell[Canon cc-030 (Companions Deploy UI, renumbered) ratifies; Ostia extends to runtime cross-repo `.claude/` sync; deploy-latency tolerance activates],
  text(weight: "bold")[Gates transit log], mode-cell[Canon cc-031 (Gates wiring, renumbered) ratifies; CC's Gates room functions are wired to record Ostia transit],
  text(weight: "bold")[Watch / Sentinel modes], mode-cell[Canon cc-032 (Watch room, renumbered) ratifies; hook-captured session movement logging begins; anomaly flagging activates],
  text(weight: "bold")[Hearth bulletin wall], mode-cell[Canon cc-033 (Hearth wiring, renumbered) ratifies; Hearth renders recent-activity from Sentinel's log as its "legible activity" layer],
  text(weight: "bold")[Hero card summoning / registry view], mode-cell[Canon cc-034 (Hero Card Spec, renumbered) ratifies via Lyra-convened Design Committee (`todo-0027`); Order room renders cards as both representation and invocation entry points],
  text(weight: "bold")[Portrait / sigil rendering], mode-cell[Canon cc-035 (Portrait + Sigil, renumbered) ratifies; hand-illustrated portraits + glyph-scale heraldic monograms populate the registry],
  text(weight: "bold")[Committee-proposal artifact type], mode-cell[Amendment to cc-017 extending the type enum ratifies; the placeholder `cross-cluster-meeting` type drops from committee-proposal artifacts],
  text(weight: "bold")[`aurelius-bridging` authorship suffix], mode-cell[Amendment to cc-017 extending the authorship taxonomy ratifies; suffix becomes canonical alongside `aurelius-retrospective`],
  text(weight: "bold")[Invocation_modes schema], mode-cell[Schema-expansion migration session ratifies; all existing profiles gain `assignment.invocation_modes` blocks per cc-023 §G],
)

#pagebreak()

= §D — Audit Discipline During Bridging

The bridging window is auditable by design. Four disciplines apply across every session during the window:

*Chronicle the bridge.* Every manual invocation — subagent type, prompt construction, snippet import, lifecycle transition — is chronicled in the session's companion-log. The Chronicler drafts the log; the companion-log enters `data/companion-logs.json`; the log is itself an interaction-artifact under canon-cc-017's retroactive-drafting clause.

*Chronicle the drift.* Divergence between the suite's ratified rule and the bridging path — a subagent spec not yet deployed to a Province's `.claude/`, a profile not yet backfilled with `invocation_modes`, a committee position authored via bridging rather than subagent — is chronicled in the session's companion-log uncertainty_notes field. Drift chronicled is drift auditable; drift unchronicled is a violation per Clause 1 above.

*Maintain the registry.* The Invocation Modes Registry is the source of truth during bridging. It is updated under cc-023's extension protocol; it seeds bridging-mode invocations whose profiles lack `invocation_modes` blocks; it is the single place downstream surfaces will read from when operational mode lands. The Chronicler maintains it.

*Replay when surfaces land.* When an operational surface lands — Post Box, Praetorium, Companions View, Senate convening composer — the Chronicler replays bridging-mode sessions through the surface where possible, marking the replay as retroactive verification. Sessions whose bridging was chronicled per Clause 1 can be replayed; sessions whose bridging was not cannot, and the partial provenance stands as a noted gap in the record.

= §E — When the Window Closes

The bridging window closes per-surface as each row in §C ratifies. The window as a whole closes only when the final surface lands — practically, when the Companions Deploy UI (cc-030) ratifies and Ostia extends to runtime cross-repo sync, because that closes the manual-deploy path in cc-027 Rung 5 which is the longest-running bridging path.

At the moment the window as a whole closes, this spec amends to historical record: the bridging-era disciplines were in effect from the suite's ratification through [closure date]; sessions from that window are tagged with a `bridging-era` marker in their companion-logs; future sessions operate fully in operational mode.

= §F — References

*Within the suite*: all six canons (cc-022 through cc-027) reference this spec for the four shared clauses in §B · Invocation Modes Registry · UI Manifest Cross-Reference · Preamble \& Index

*Queued UI canons (pending ratification)*: cc-028 Post Box · cc-029 Praetorium · cc-030 Companions Deploy · cc-031 Gates · cc-032 Watch/Sentinel · cc-033 Hearth · cc-034 Hero Card · cc-035 Portrait + Sigil

*Required canon amendments*: cc-017 type-enum extension (`committee-proposal`) · cc-017 authorship-taxonomy extension (`aurelius-bridging`)

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

#pagebreak()

