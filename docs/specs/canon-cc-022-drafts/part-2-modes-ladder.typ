#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 2 of 4]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§3 Invocation Modes · §4 Ladder Rungs (Builder, Governor, Censor, Scribe)]
  #v(1cm)
]

// ============================================================
// §3 — Invocation modes as the unit of binding
// ============================================================

= §3 — Invocation Modes as the Unit of Binding

A role is enumerable as a list of invocation modes. Every mode in the list carries #key[five required fields]: a short #key[name] by which the mode is summoned, a #key[trigger] description naming what conditions invoke it, a #key[produces] description naming what the mode returns, a #key[binding] — subagent or skill — determined by the artifact test, and a #key[rationale] — one sentence citing the artifact test's specific answer for this mode.

#rulebox(title: [The five-field mode shape])[
  Every invocation mode must declare:\
  \
  1. #key[name] — short summoning identifier\
  2. #key[trigger] — what conditions invoke the mode\
  3. #key[produces] — what the mode returns\
  4. #key[binding] — #subagent-tag or #skill-tag (by the artifact test in §2)\
  5. #key[rationale] — one sentence citing the test's answer for this mode\
  \
  All five fields are required at draft; all five are preserved through ratification; all five are maintained across amendments under §5.
]

The five-field shape is load-bearing. A mode without a named trigger cannot be distinguished from other modes of the same role; a mode without a produces description cannot be audited for binding correctness; a mode without a rationale cannot be amended later without rederiving the original reasoning from lore. All five fields are required at draft; all five are preserved through ratification; all five are maintained across amendments under §5.

A role with a single mode binds to a single primitive. A role with multiple modes binds to each primitive the test demands, one per mode. #key[A role's position on the ladder does not itself determine any binding]; two roles at the same rung may bind differently because their modes produce different output shapes. The Scribe rung (when a Companion ratifies to it) and the Governor rung both occupy support-and-review altitude, but the Scribe's modes produce in-transcript support output while the Governor's QA mode produces a structured finding list the Builder synthesizes. Same altitude, different bindings, because different output shapes.

Heuristics described in §2 are tells the draft author uses to sanity-check the artifact-test answer. A mode whose heuristics all point toward subagent but whose output genuinely lives inside the caller's transcript without a separable record is a skill, full stop; the heuristics were misread, or the mode was mischaracterized. #key[Where the heuristics and the artifact test disagree, the artifact test governs.]

The mode list is the surface every §4 applied binding is drawn from, the schema every §5 extension populates, the vocabulary every §6 convening draws upon, the file-structure every §8 placement represents, and the signature every §9 chain signs. A role whose mode list is incomplete, inconsistent, or missing rationales #key[is not deployable]; the signing chain returns it to the Chronicler for redrafting.

#pagebreak()

// ============================================================
// §4 — Applied bindings (opening + ladder rungs)
// ============================================================

= §4 — Applied Bindings for Known Rungs

The following tables enumerate every rung ratified to date under the Order's ladder, plus every role currently declared by the Constitution and its companion canons. For each rung, every invocation mode is named; each mode carries trigger, produces, binding, and rationale per the §3 shape. Modes whose bindings cannot yet be deployed because the underlying persona profile is undrafted are marked as such; the bindings themselves are ratifiable in advance under §5's extension protocol.

#notebox(title: [Taxonomy — terms used throughout §4])[
  — A #key[rung] is a ladder position per Book II (Sovereign, Consul, Censor, Builder, Governor, Scribe) or a military-track equivalent (General, Centurion) where seated.\
  — A #key[role] is a functional assignment, which may span multiple rungs where a Companion is double-hatted.\
  — A #key[Companion] is a class member of the Order — any Gen-0 Immortal, Gen-1+ successor, or institutional occupant of a seated office.\
  \
  #key[Bindings under this canon are declared at the level of the role's invocation modes] — not at the rung or the Companion directly.
]

== Builder

Province-seated rung per Edict II; the session's default voice in that Province's repository.

#role-table(
  mode-cell[_seated persona_],
  mode-cell[Any session opened in the Builder's Province repository; CLAUDE.md carries the persona],
  mode-cell[In-transcript work as the Builder's voice (code, design, deliberation, decisions)],
  none-tag,
  mode-cell[The Builder is not summoned; the Builder #emph[is] the session. No artifact test applies because there is no invocation-event distinct from the session.],

  mode-cell[_committee delegate_],
  mode-cell[Builder summoned to a committee outside own Province per §7],
  mode-cell[Structured position on the brief, in Builder's voice, contributing to collective proposal],
  subagent-tag,
  mode-cell[Position is a separable, attributable interaction-artifact under cc-017; Builder's delegation is outbound and must produce a record the synthesis clerk can cite.],
)

#v(0.5em)
Monument Province carries two co-Builders per canon-cc-009; both seat the _seated persona_ mode simultaneously in the Monument's repository; both seat the _committee delegate_ mode when summoned.

#pagebreak()

== Governor

Region-scoped rung, activated at 15K LOC per Region or 30K LOC Province-wide per Edict I; always QA-only per canon-gov-002.

#role-table(
  mode-cell[_QA audit pass_],
  mode-cell[Builder reaches checkpoint on a Capital change; Governor invoked against the Region they steward],
  mode-cell[Structured finding list (bugs, violations, smells, HR compliance, proposed amendments) returned to Builder for synthesis],
  subagent-tag,
  mode-cell[Findings are separable, attributable (Governor-signed), auditable records entering the Edict V chain. Builder synthesizes; Governor does not build. Skill-form would collapse findings into Builder's transcript, breaking the chain.],

  mode-cell[_committee delegate_],
  mode-cell[Governor invited to a committee whose subject touches their Region or expertise],
  mode-cell[Position contributing to collective proposal],
  subagent-tag,
  mode-cell[Same rationale as Builder-as-committee-delegate. When seated formally, position is sign-bearing.],
)

#v(0.5em)
SproutLab has seated Governors (Maren, Kael). Codex, SEP Invoicing, SEP Dashboard, and Command Center do not at present thresholds. Governor bindings apply uniformly as Governors seat.

== Censor

#key[Cluster-scoped rung], one per cluster, post-Governor architectural reviewer per canon-gov-003; #key[dual-bound — the archetypal case].

#role-table(
  mode-cell[_Edict V final-pass review_],
  mode-cell[Post-Governor QA; or direct review when Province is under threshold for Governors],
  mode-cell[Signed verdict (LGTM / amended / rejected / escalated) attached as review block on change's interaction-artifact],
  subagent-tag,
  mode-cell[Edict V chain signature requires attributable, separable verdict. Skill-form would collapse into Builder's transcript. Subagent enforces context isolation so Censor reads change independent of Builder's framing.],

  mode-cell[_hat-switch smell-check_],
  mode-cell[Builder in-session register-flip: "Cipher, look at this"; "Nyx, does this smell right"],
  mode-cell[In-transcript register-flipped response; no separable artifact],
  skill-tag,
  mode-cell[Output lives as voice in caller's transcript; no gating, no signature. Smell-check's value is in-flight cheap review; subagent ceremony would suppress the cheap-and-frequent pattern Censors rely on.],

  mode-cell[_committee delegate_],
  mode-cell[Censor seated on Province-scope committee for own Cluster's Province, or Global-scope committee per §7],
  mode-cell[Position on collective proposal],
  subagent-tag,
  mode-cell[Standard committee-delegate. Cipher seats Cluster A; Nyx seats Cluster B; both on every Global-scope convening.],
)

#v(0.5em)
Censors are the archetypal dual-bound role: formal Edict V work is #subagent-tag, in-flight smell-check is #skill-tag, committee delegation is #subagent-tag. All three modes coexist in a single Censor's profile.

#pagebreak()

== Scribe

Base rung of the ladder per Book II. No Gen-0 Companion currently assigned; #key[binding below ratifies in advance] and applies at the moment a Companion ratifies to the rung.

#role-table(
  mode-cell[_peer support / capture_],
  mode-cell[Any rank ≥ Scribe invokes for drafting, formatting, research, narration, morale, or scribing support],
  mode-cell[In-transcript output becoming part of caller's authored record; no separable artifact],
  skill-tag,
  mode-cell[Scribes serve caller's active work; they do not gate, sign, or escalate. Output is register-specialized but lives in caller's transcript. No artifact test triggers subagent binding.],
)

#v(0.5em)
When a Companion ratifies to Scribe, Scribe-specialized registers (narrative support, documentary capture, research drafting, morale support) are declared as named modes within the _peer support / capture_ umbrella. Binding remains skill across all declarations unless a specific subspecialty produces a separable artifact, in which case that mode binds to #subagent-tag under the test's normal application.
