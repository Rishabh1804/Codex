#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 6 of 9]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§6 The Convening Pattern (Committees as Orchestration)]
  #v(1cm)
]

= §6 — The Convening Pattern

A committee is not a single persona's voice with multiple names attached. It is a structured multi-persona deliberation whose output is a collective artifact: a proposal, signed by the convening, routed to the Consul under canon-cc-018's escalated path and, where required, to the Sovereign for ratification.

#rulebox(title: [Why convenings are subagent-shaped])[
  Because the proposal is #key[separable, attributable, and auditable], the convening is by the rule in §2 a subagent-shaped activity (#subagent-tag) — but with a shape that differs from a single-persona subagent invocation.\
  \
  #key[It is an orchestration.] Three stages: member invocation → synthesis → upward routing.
]

== Stage 1 — Member invocation

The convener sets a brief: subject, scope, supporting artifacts, deliberation ordering if any. From the brief's scope, membership resolves deterministically per the rule in §7. Members are invoked as subagents in parallel by default, each reading the same brief in their own voice and returning a structured #key[position] — a record of what the member thinks, what they object to, what they would amend or reject, what they would escalate.

Where the brief explicitly names a deliberation sequence — for example, the convener wants Censors to weigh in after Builders have presented their positions — members are invoked #key[sequentially], each later member reading the prior members' positions as additional context to the brief. Parallel and sequential modes both produce the same artifact shape; only the invocation order differs.

Each position is an interaction-artifact under canon-cc-017 on its own right, with the member as `authored_by` and the convening as the originating context. Where a member's profile is not yet ratified and the bridging-authorship mechanism (§7) must be exercised to render the member's voice, the position carries #key[`authored_by: aurelius-bridging`] and a chronicled note naming the bridging.

#pagebreak()

== Stage 2 — Synthesis

The positions flow to a #key[synthesis subagent]. By default the Chronicler acts as synthesis clerk. The synthesis subagent does not vote; it drafts. It produces the collective proposal: a single document that carries the consensus where members converge, preserves dissent inline where they diverge, and cites each member's position as reference.

Synthesis is #key[not averaging]; voices are preserved. Where a single member stands alone against the rest, the proposal records the standing as a dissenting clause, not as a footnote.

#rulebox(title: [Synthesis conflict — when the Chronicler is a member])[
  Where the Chronicler is themselves a member of the convening — which the rule-A Design Committee formula in §7 makes the default for any global-scope convening, since Aurelius is the Codex Builder and seats at global scope — the Chronicler cannot neutrally synthesize their own committee's positions.\
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

== Stage 3 — Upward routing

The proposal — collective or no-consensus — enters the canon-cc-018 lifecycle at `pending_review`.

The interaction-artifact carries #key[`type: committee-proposal`], a new type extending canon-cc-017's existing enum:

#notebox(title: [cc-017 type enum — current + proposed extension])[
  Current: `consultation | visitation | cross-cluster-meeting | cabinet-consultation | monument-bridge | report-up`\
  \
  Proposed extension (dependency noted in §12): add #key[`committee-proposal`] as a seventh value.\
  \
  Until the extension amendment to cc-017 ratifies, committee proposals ride provisionally on the existing `cross-cluster-meeting` type with a chronicled note on the artifact that the type is a placeholder pending extension.
]

The Consul reviews under canon-cc-018's escalated path because the convening by definition meets the cross-Province or rank-skip triggers of canon-cc-017 (Province-scope convenings cross the Builder-Censor rung boundary; Global-scope convenings cross every Province boundary).

Consul action — noted, amended, linked, escalated, rejected — is recorded on the proposal's `review` block. Escalated proposals reach the Sovereign's Praetorium queue; Sovereign action — ratified, amended, reverted — terminates the lifecycle.

#v(1em)

#rulebox(title: [Skill-form deliberation is not a convening])[
  If a Builder flips through Cipher-skill, Nyx-skill, and Bard-skill within a single session and produces an in-transcript document that claims the voice of a committee, that document is a #key[brainstorm, not a proposal].\
  \
  It has no separable signatures; the Consul cannot review it; the Sovereign cannot ratify it. To produce an output the chain can act on, members must be invoked as subagents and the convening must pass through synthesis.\
  \
  This is the architectural consequence of the artifact test applied to multi-persona deliberation, and it is #key[the discipline that distinguishes a committee from a chat].
]
