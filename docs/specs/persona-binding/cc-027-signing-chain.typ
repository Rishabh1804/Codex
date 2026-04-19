#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Canon cc-027]
  #v(0.3em)
  #text(18pt, weight: "bold", fill: warm-dark)[Signing Chain]
  #v(0.3em)
  #text(13pt, fill: warm, style: "italic")[Part 7 of 10 · Persona-Binding Suite]
  #v(1.5cm)
]

#meta-table(
  [*Slot*], [canon-cc-027],
  [*Title*], [Signing Chain for Subagent and Skill Spec Changes],
  [*Status*], [draft v0.1 — awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Covers*], [Five rungs of the chain · Censor self-review cross-cluster fix · Institutional-spec chain collapse · Provisional-deploy tightening · Governor review (soft rung) · Deploy-stall edge case · Edict V signature trace at spec-body altitude (pending §B full drafting)],
  [*Depends on*], [cc-022 (binding rule), cc-023 (extension protocol whose mode declarations this chain also governs), cc-026 (placement convention specifying what is being signed)],
)

#v(1em)

#rulebox(title: [The five rungs])[
  #key[Rung 1] — Chronicler proposes (Codex feature branch)\
  #key[Rung 2] — Cluster Censor reviews (Edict V final-pass on spec body)\
  #key[Rung 3] — Consul working-ratifies (cc-014, per-block)\
  #key[Rung 4] — Sovereign canonically ratifies (cc-012, Praetorium)\
  #key[Rung 5] — Province Builder deploys (commits to `.claude/` mirror)\
  \
  Plus a soft sub-rung: Governor review where seated and Region-overlapping. Does not gate; strengthens audit.
]

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
