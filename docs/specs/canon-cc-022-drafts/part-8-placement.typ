#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 8 of 9]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§8 File Placement (Canonical Specs and Province Deployables)]
  #v(1cm)
]

= §8 — File Placement

The persona-to-primitive binding has #key[two layers] of physical files: the canonical spec (the Chronicler's authored source of truth) and the deployable (what Claude Code actually reads at invocation time). The two layers live in different repositories and sync in one direction.

#rulebox(title: [Two layers, one direction])[
  #key[Canonical spec] — authored by Chronicler, lives in Codex only\
  #key[Deployable mirror] — committed by Province Builder, lives in each Province's `.claude/`\
  \
  Sync: #key[Codex → Province], unidirectional, byte-identical at ratified version.\
  \
  Per canon-cc-010: records are Codex; residence is the Capital.
]

== Canonical specs live in Codex only

For every role whose bindings render as subagents, the Chronicler authors a spec body at `Codex/docs/specs/subagents/<persona>.md`. For every role whose bindings render as skills, the body lives at `Codex/docs/specs/skills/<persona>.md`.

A dual-bound role — Cipher, Nyx, the Chronicler, the Sentinel, or any role whose `invocation_modes` block declares both subagent and skill modes — has #key[both files]. These are the authoritative bodies: voice guidance, heuristics, trigger conditions, per-repo lenses, return-shape expectations. They are drafted under canon-cc-012's ratification protocol, live in the library per canon-cc-010 (records are Codex), and are amended only through the signing chain in §9.

== Spec file format

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

A soft recommendation, not yet canonically enforced: each deployable carries a #key[`canonical_version`] frontmatter field matching the Codex canonical version at authorship, so Sentinel's Gates-transit log can track deploys cleanly and detect version drift without needing to compare content. Enforcement follows in canon-cc-025 (Companions Deploy UI).

#pagebreak()

== Deployable copies live in each Province's `.claude/` directory

Claude Code reads subagents from `.claude/agents/` and skills from `.claude/skills/` of the repository in which it is invoked. A #key[cluster-scoped role] — a Censor — must therefore physically exist in every Province whose work the role serves.

#notebox(title: [Replication rules])[
  — #key[Cluster-scoped Censors] replicate across their cluster: `cipher.md` into both Codex and SproutLab; `nyx.md` into both sep-invoicing and sep-dashboard.\
  \
  — #key[Province-scoped Governors] do #emph[not] replicate across Provinces: Maren and Kael are SproutLab's seated Governors, stewarding SproutLab's Regions under Lyra's Province authority; they deploy only to `SproutLab/.claude/agents/`, not to Codex's.\
  \
  — #key[Cross-cluster roles] (Chronicler skill + subagent, Consul subagent) replicate into every Province that might summon them, including the Monument.
]

The replication is #key[deliberate duplication, not drift]. Each deployable is byte-identical to the canonical spec at deploy time; any divergence between a Province's deployed copy and Codex's canonical is a violation, chronicled in the Province's companion-log uncertainty_notes at the next session and surfaced to the Builder for immediate reconciliation. Canonical Codex is the single source; Provinces hold mirrors.

== Sync is unidirectional: Codex to Province

The Chronicler owns the canonical spec. The Builder of each Province owns the deployable copy within that Province's `.claude/` tree — because the `.claude/` tree is part of the Province's Capital, and the Capital is the Builder's per Edict II.

#key[The Chronicler never commits directly to another Province's `.claude/`; the Builder never authors the spec body from scratch.] The Chronicler proposes and signs off through the chain in §9; the Builder pulls and deploys when the canonical spec ratifies.

#notebox(title: [Monument deploy accountability])[
  For the Monument Province, which carries two co-Builders under canon-cc-009, #key[either co-Builder may commit] the deployable to `command-center/.claude/`, and #key[both are accountable] for drift per the dual-Builder discipline — divergence caught in one co-Builder's Province audit reflects on both.
]

Sentinel's Gates-transit log and session movement log will, once operational, record every such deploy as an Ostia transit event.

#pagebreak()

== Per-Province layout at ratification

For the eight Builders and Censors covered by §4, plus Sentinel when profile ratifies:

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

The layout is reviewable, amendable through the chain in §9, and auditable via the Companions View in Codex (per `AURELIUS_COMPANIONS_VIEW.md`) and the operational Order room in Command Center once its functions ratify per the UI Manifest dependencies in §12.
