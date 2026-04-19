#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Bootstrap-to-Operational Transition Map]
  #v(0.3em)
  #text(14pt, fill: warm, style: "italic")[Part 9 of 10 · Persona-Binding Suite]
  #v(0.3em)
  #text(12pt, fill: warm)[How the suite operates while Command Center catches up]
  #v(1.5cm)
]

#meta-table(
  [*Artifact type*], [Spec (phase doc) — not a canon],
  [*Status*], [draft v0.1 — the bridging window is open; transitions track separately per surface],
  [*Scope*], [global — cited by every canon in the suite as scoped clause],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Amendment path*], [As each queued UI canon ratifies and its surface lands in Command Center, the corresponding row in §D transitions from #emph[bridging] to #emph[operational]; this spec updates without full canon chain],
  [*Depends on*], [the six canons of the suite (cc-022 through cc-027) and their queued UI canon dependencies],
)

#v(1em)

#rulebox(title: [The bridging window])[
  The persona-binding suite ratifies at governance altitude immediately. Its #key[operational surfaces] — Command Center rooms that render and audit the bindings — land progressively as each queued UI canon ratifies.\
  \
  Between ratification and full operational deployment, the suite operates in #key[bridging mode]: invocations are hand-bridged through Claude Code's CLI; artifacts are imported via the snippet pipeline; drift is chronicled manually in companion-log uncertainty_notes passes.\
  \
  Every session operating during the bridging window #key[must chronicle the manual bridge it used] so the transition is auditable and retrospective verification remains possible.
]

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
