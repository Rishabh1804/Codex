#import "style.typ": *

#setup-page()
#setup-headings()

// Cover page
#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Canon cc-022]
  #v(0.3em)
  #text(18pt, weight: "bold", fill: warm-dark)[The Binding Rule]
  #v(0.3em)
  #text(13pt, fill: warm, style: "italic")[Part 2 of 10 · Persona-Binding Suite]
  #v(1.5cm)
]

#meta-table(
  [*Slot*], [canon-cc-022],
  [*Title*], [Persona-to-Primitive Binding — The Binding Rule],
  [*Status*], [draft v0.1 — awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Covers*], [Why the suite exists (at rule altitude) · The artifact test · Invocation-mode shape and five required fields · Dual-binding principle],
  [*Companion artifacts*], [cc-023 Extension Protocol · cc-024 Convening Pattern · cc-025 Design Committee · cc-026 Placement · cc-027 Signing Chain · Invocation Modes Registry · Bootstrap Transition Map · UI Manifest Cross-Reference · Preamble \& Index],
)

#v(1em)

#rulebox(title: [Where this fits])[
  This canon is the #key[ratifiable heart] of the persona-binding suite. It declares the rule that determines, for every companion invocation mode, whether the mode binds to #subagent-tag or #skill-tag. Every other canon and spec in the suite derives from this rule.
]

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
