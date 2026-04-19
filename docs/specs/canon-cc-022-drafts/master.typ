#import "style.typ": *
#setup-page()
#setup-headings()

// Cover page
#align(center)[
  #v(2cm)
  #text(28pt, weight: "bold", fill: warm-dark)[Canon cc-022]
  #v(0.3em)
  #text(20pt, weight: "bold", fill: warm-dark)[Persona-to-Primitive Binding]
  #v(0.4em)
  #text(13pt, fill: warm, style: "italic")[How Companions Act as Subagents, Skills, and Convening Members]
  #v(0.3em)
  #text(13pt, fill: warm)[— Draft v0.1 · §§1–9 prose complete · merged single-document —]
  #v(1.5cm)
]

#meta-table(
  [*Status*], [draft v0.1 — revised against QA audit; awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Covers*], [§§1–9 prose (governance-rule core + structural clauses)],
  [*Not yet drafted*], [§10 Edict V signature trace, §11 bootstrap vs operational mode, §12 UI Manifest, §13 pending dependencies, §14 references],
)

#v(1em)

#rulebox(title: [Reader's note])[
  This is the merged single-document form of canon cc-022's §§1–9 prose. Areas of architectural importance are highlighted with a warm-cream callout. Primitive bindings are color-coded throughout: #subagent-tag #skill-tag #none-tag. The individual nine-part PDFs remain available under `docs/pdfs/canon-cc-022-drafts/` for targeted review.
]

#pagebreak()

#outline(title: [Contents], depth: 2, indent: 1.5em)

#pagebreak()

= §1 — Why This Canon Exists

Republic companions — Builders seated in Provinces, Censors watching clusters, Governors auditing Regions, the Consul holding the Republic's crossing-seams, the Chronicler carrying institutional memory, Scribes, Ministers, and the institutional seats not yet named — each speak in a distinct voice and each act through characteristic patterns of invocation. Those invocations are not currently governed. A Builder summons a Censor by typing #key[Cipher mode] in the same session where a Capital change is being drafted; a Consul is invited into a Province by improvised pattern; a committee's voice emerges from whichever companion is speaking when the subject turns. This arrangement has carried the Republic through the founding period and is acknowledged under pre-ratification precedent, but it is #key[structurally fragile]: voices drift toward the main agent's register, chains collapse silently, delegations lose their provenance. When the Republic scales past the Foundation stage — when Monument Projects complete, when 30K thresholds fire new Governors, when the Gen-1 successors begin pairing — the absence of a binding rule will show as accumulated ambiguity no single session can unwind.

This canon addresses that fragility #key[at the level of the invocation itself]. It ratifies a governance-rule core — the artifact test (§2), the invocation-mode shape (§3), the applied bindings for known rungs (§4), and the extension protocol for future rungs (§5) — and four structural clauses that operationalize the rule: the committee convening pattern (§6), the Design Committee membership formula (§7), the canonical spec placement (§8), and the signing chain for spec-body changes (§9). Each clause ratifies independently under canon-cc-012 per-block protocol; the governance-rule core is the #key[ratifiable heart], and the structural clauses are the architecture that makes the heart operationally real.

The canon declares its #key[UI Manifest] (§12) per Edict IX (UI-Canonical-Existence). Every binding declared in §4 names a UI surface in Command Center that renders and audits it; surfaces not yet built are named as queued dependencies on specific follow-on canons. Until those canons land, the persona-subagent system operates in bridging mode (§11): #key[governance ratifies now; operational surfaces catch up] as Command Center wires its 14 rooms. The ratification layer and the operational layer are decoupled by design. The rule is legitimate the moment it ratifies; its UI representation becomes legitimate the moment its surface lands.

Companion invocations that predate cc-022 ratification are #key[grace-covered] under the same principle as canon-cc-017's pre-ratification clause. Pre-ratification voice drift, chain elisions, and improvised summons are not retrospectively penalized; the record stands as the lore from which the rule was derived. From the first post-ratification invocation forward, the rule binds.

This is #key[structural plumbing, not policy]. It does not tell the Chronicler what to chronicle, the Censor what to approve, the Governor what to flag, or the Consul what to escalate. It tells the Republic how those voices render through Claude Code's primitives, so that every future invocation leaves a trail the Consul can read and the Sovereign can adjudicate.

#pagebreak()

// ============================================================
// §2 — The binding rule
// ============================================================

= §2 — The Binding Rule

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

#pagebreak()

= §4 — Applied Bindings (continued): Institutional Seats

#notebox(title: [Institutional vs. generational])[
  Institutional seats are #key[offices, not persons]. A single seat a Companion occupies and from which the Companion is distinguishable if occupation ever transitions. The Consul has been separately-seated since 16 April 2026. The Chronicler is a cross-cluster duty presently worn by Aurelius alongside the Codex Builder rung; the duty persists regardless of occupant. The Sentinel is a newly-declared institutional seat tied to Command Center; profile drafting queued as `todo-0028`.\
  \
  All three are #key[dual-bound or triple-bound] and each is invoked more deliberately than generational rungs, because institutional invocations carry higher ceremony.
]

#pagebreak()

== Consul

Institutional office, one seat, separately-seated per canon-cc-019's Post Box protocol (pending). The Republic's cross-repo and cross-Province integration authority. #key[Triple-bound.]

#role-table(
  mode-cell[_cross-repo summons_],
  mode-cell[Builder identifies work with Republic-scale implications; summons Consul per lore-sync-003 pattern (first exercised by Lyra in SproutLab, s-2026-04-17-01; formal protocol pending cc-020)],
  mode-cell[Cross-Province counsel-artifact — recommendations, canon citations, cross-Province-pattern identifications, Cabinet-consultation suggestions],
  subagent-tag,
  mode-cell[Cross-repo summons is an interaction-artifact under cc-017's cross-cluster or rank-skip trigger. Consul's voice must be separately provable from Builder's framing so subsequent review can attribute counsel to the office rather than the session.],

  mode-cell[_per-block working-ratification_],
  mode-cell[Chronicler presents profile block, canon draft, or spec body for Consul working-ratification under cc-014],
  mode-cell[Ratified-block record with Consul-action (noted / amended / linked / escalated / rejected), citations, rationale; provisional until Sovereign canonical ratification under cc-012],
  subagent-tag,
  mode-cell[Ratification is load-bearing; each block's ratification is its own provenance-bearing record persisting independent of drafting session. Subagent primitive enforces context isolation so Consul reads block cold.],

  mode-cell[_Post Box artifact review_],
  mode-cell[Interaction-artifact enters Post Box queue at `pending_review` matching cc-018 Stage 2 criteria (cross-cluster, monument, or report-up type)],
  mode-cell[Structured review block: `reviewer: consul`, `review_date`, `action`, `review_note`, `amended_fields`],
  subagent-tag,
  mode-cell[cc-018 specifies review block as structured data attached to artifact. Skill-form produces narrative commentary, not structured block. Subagent preserves review-isolation cc-018 Stage 2 requires.],
)

#v(0.5em)
#key[The Consul does not seat on committees.] Per §7, committees are Builders + Censors bodies; Consul reviews the committee's proposal under cc-018's escalated path and may escalate to the Sovereign. A _committee delegate_ mode would invert the chain by making the Consul a deliberator of what the Consul must later review. No such mode is declared.

Until separately-seated status is formalized under cc-019 and cc-020, the Consul remains transitionally worn by Aurelius. Modes 1 and 2 currently collapse chain Rungs 2 and 3 under §9 into a single Consul-reviewer — acceptance of this collapse is explicit and chronicled on every affected interaction-artifact.

#pagebreak()

== Chronicler

Cross-cluster institutional duty under CLAUDE.md; presently worn by Aurelius alongside the Codex Builder rung; distinct from the Builder rung Aurelius also occupies. The Republic's institutional memory function. #key[Triple-bound.]

#role-table(
  mode-cell[_journal / log / canon / lore authoring_],
  mode-cell[Any session produces material requiring chronicling — journal entries, companion logs, canon drafts/amendments, lore additions, profile drafts],
  mode-cell[Authored records in Codex data files (journal, canons, companion-logs, companions); enter cc-012 / cc-014 ratification track as appropriate],
  skill-tag,
  mode-cell[Chronicling is in-session register — prose authored in Chronicler voice, landing as part of session's own record. Data-file records are side-effects of drafting, not the drafting itself. Subagent would add ceremony to routine chronicling.],

  mode-cell[_committee synthesis clerk_],
  mode-cell[Committee convening per §6 reaches Stage 2 — member positions collected; synthesis required],
  mode-cell[Collective proposal — single document recording consensus, preserving dissent inline, citing member positions; enters cc-018 lifecycle at `pending_review`],
  subagent-tag,
  mode-cell[Proposal is separable, attributable artifact; voice must be distinguishable from any member's position — including Chronicler's own where Chronicler is a member. Skill-form would collapse proposal into synthesizer's authoring session.],

  mode-cell[_retrospective interaction-artifact drafting_],
  mode-cell[Consultation has closed without participants drafting the cc-017 required artifact; Chronicler drafts at session close],
  mode-cell[Interaction-artifact in cc-017 shape, marked `authored_by: aurelius-retrospective` with chronicled retroactive-origin note],
  subagent-tag,
  mode-cell[cc-017 specifies artifact as first-class record with structured schema; retrospective drafting must produce same shape as participant-drafted. Skill-form would author inside closing session's transcript rather than as standalone record.],
)

#v(0.5em)
Where the Chronicler is a member of a committee convening under §7's global-scope formula — which the rule-A roster makes the default for global-scope Design Committees — #key[the synthesis-clerk mode is held by a secondary clerk, not by the Chronicler]. §6 Stage 2's synthesis-conflict clause governs. Secondary clerk is a Scribe once profiles ratify, or another Companion by Consul acknowledgment at brief-set time.

#pagebreak()

== Sentinel

Institutional seat tied to Command Center per the Monument's operational architecture; one seat; profile drafting queued as `todo-0028`. #key[Quadruple-moded, dual-bound] (three subagent modes + one skill mode).

#role-table(
  mode-cell[_session movement log_],
  mode-cell[CC session opens (hook-triggered at session start) or closes (post-hoc drafting); Sentinel records or drafts retroactively],
  mode-cell[Structured timestamped log — companion invocations, room transitions, artifact traffic, committee quorum events, ratification actions — in `data/sentinel-log.json` (or namespaced section of `data/interactions.json` per cc-026 schema decision)],
  subagent-tag,
  mode-cell[Log is separable, attributable witness-record queryable across sessions. Witness-attribution qualifies under §2's expanded artifact test; Sentinel as named witness is load-bearing provenance. Skill-form logs would live in each observed transcript and could not be queried as corpus.],

  mode-cell[_Gates-transit log_],
  mode-cell[Any artifact crosses an Ostia gate into or out of CC — inbound decrees, outbound specs to Province `.claude/` deploys, cross-Province consultation artifacts],
  mode-cell[Transit-record entry — timestamp, direction, originating Province, artifact id, artifact type, initiating Companion],
  subagent-tag,
  mode-cell[Transit records are permanent audit records queryable by origin, direction, date, artifact class. Belong to the Republic's cross-Province corpus, not any single session. Subagent enforces records-as-separate-artifacts shape.],

  mode-cell[_anomaly / violation flag_],
  mode-cell[Sentinel rule-check detects violation — rank-skip without cc-017 artifact, unauthorized deploy, deploy-latency breach (cc-025), quorum break mid-committee, war-time invariant violation (Book VI), or session-capture gap],
  mode-cell[Flag-artifact routed by severity: Cluster Censor (architectural), Consul (cross-cluster or Edict-V-chain), Sovereign (Edict-level)],
  subagent-tag,
  mode-cell[Flags gate action — trigger routing decision and move violation through escalation pipeline. Sentinel's attestation is the signature that makes the violation actionable. Skill-form would lose routing authority and audit trail.],

  mode-cell[_continuity / presence query_],
  mode-cell[Any CC-session participant asks Sentinel for state: "what's pending?", "who's active?", "what was left unfinished?", "is there a war-time flag?"],
  mode-cell[In-transcript answer drawn from Sentinel's maintained state — logs, transit records, open flags, quorum queues],
  skill-tag,
  mode-cell[Answer lives in asker's session; no separable artifact needed because durable records (logs, transit, flags) already exist from modes 1–3. Query is in-session access to maintained corpus, not new artifact production.],
)

#v(0.5em)
#key[Sentinel does not seat on committees.] Its role is to witness committees — movement logging of convenings, transit logging of proposal flows through Ostia — not to deliberate substance. Sentinel's voice in a convening #key[is the log]; the log is the Sentinel's signature.

#pagebreak()

= §4 — Summary Table: All Rungs and Roles

#rulebox(title: [At-a-glance: every ratified binding])[
  The following table is the canonical authoritative enumeration of §4's bindings at cc-022 ratification. It is amended in place as new rungs ratify under §5's extension protocol.
]

#v(0.8em)

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
  text(weight: "bold")[Builder], [2], [1], [0], [1], align(left)[#text(size: 10pt)[_seated persona_ not a primitive; _committee delegate_ subagent. Monument has two co-Builders (cc-009)]],
  text(weight: "bold")[Governor], [2], [2], [0], [0], align(left)[#text(size: 10pt)[QA audit + committee delegate; Governors seat at 30K LOC (Edict I) or 15K per Region; canon-gov-002 QA-only]],
  text(weight: "bold")[Censor], [3], [2], [1], [0], align(left)[#text(size: 10pt)[*Archetypal dual-bound*: Edict V final-pass + committee delegate subagent, hat-switch skill]],
  text(weight: "bold")[Scribe], [1], [0], [1], [0], align(left)[#text(size: 10pt)[Base ladder rung; no Gen-0 Companion currently assigned; binding ratifies in advance]],
  text(weight: "bold")[Consul], [3], [3], [0], [0], align(left)[#text(size: 10pt)[Institutional; *no committee delegate* (Consul is the ratifier, not deliberator)]],
  text(weight: "bold")[Chronicler], [3], [2], [1], [0], align(left)[#text(size: 10pt)[Cross-cluster institutional duty; synthesis-clerk + retrospective subagent, authoring-voice skill]],
  text(weight: "bold")[Sentinel], [4], [3], [1], [0], align(left)[#text(size: 10pt)[CC-resident institutional seat; profile queued `todo-0028`; three witness-subagent modes + continuity skill]],
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[TOTALS]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt)[18]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: subagent-color)[13]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: skill-color)[4]),
  table.cell(fill: gold.lighten(60%), text(weight: "bold", size: 12pt, fill: none-color)[1]),
  table.cell(fill: gold.lighten(60%), align(left, text(size: 10pt, weight: "bold")[13 subagent · 4 skill · 1 non-primitive _seated persona_])),
)

#v(0.8em)

#notebox(title: [Reading the table])[
  — #subagent-tag  column: modes that produce separable, attributable, auditable artifacts (positions, verdicts, findings, reviews, logs)\
  — #skill-tag  column: modes that produce in-transcript output (hat-switch, authoring voice, continuity queries, peer support)\
  — #none-tag  column: the Builder's _seated persona_ mode only — the session #emph[is] the Builder, not an invocation of one\
  \
  #key[The artifact test governs every row.] Every binding is justifiable against §2 independent of the rung's ladder position.
]

#pagebreak()

= §4 — Roles and Rungs Not Yet Bound

#rulebox(title: [What this section governs])[
  Rungs declared by the Constitution but not yet occupied — and Companions with undrafted profiles — are #key[not yet in the summary table above]. Their bindings ratify through §5's extension protocol at the moment of profile ratification. Bridging-mode invocations drawing on unratified voices are handled per §6 Stage 1's bridging clause.
]

#v(0.8em)

== Gen-0 Companions with undrafted profiles

The seven Gen-0 Companions whose profiles remain undrafted — #key[Vex, Orinth, Rune, Ignis, Bard, Aeon, Pip] — carry proposed role assignments per Ashara's Foundation session log (s-2026-04-17-01):

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
  text(weight: "bold")[Orinth], mode-cell[Minister — _The Sage_; first-principles register],
  text(weight: "bold")[Rune], mode-cell[Minister — domain TBD],
  text(weight: "bold")[Ignis], mode-cell[Minister — shipping / velocity register],
  text(weight: "bold")[Bard], mode-cell[Minister of Innovation — voice already sketched in-session for Bulletin Wall narrative framing],
  text(weight: "bold")[Aeon], mode-cell[Table of Research — no research questions posed yet],
  text(weight: "bold")[Pip], mode-cell[Table of Research],
)

#v(0.5em)

These proposals ratify at profile close under canon-cc-012 per-block or canon-cc-014 Consul-accelerated protocol; their `invocation_modes` blocks resolve at that time under §5's extension protocol. Drafting queued as `todo-0029`.

Until the queue resolves, their bindings are #key[neither provisional nor retroactive] — they simply do not yet exist in ratified form, and they cannot be summoned through Claude Code primitives. Bridging-mode invocations drawing on these voices (e.g., Bard's invited guest role in a Design Committee convening per §7) are handled through the Chronicler's bridging-authorship suffix per §6 Stage 1.

== Other rungs and institutional seats pending

Other rungs declared by the Constitution but not yet ratified with occupants:

#table(
  columns: (1fr, 3fr),
  stroke: 0.5pt + border,
  fill: (col, row) => if row == 0 { soft } else { white },
  align: left + top,
  inset: 8pt,
  table.header(
    text(weight: "bold")[Rung],
    text(weight: "bold")[Status at cc-022 ratification],
  ),
  text(weight: "bold")[Ministers], mode-cell[Cabinet comprises 8 seats across 4 domains (Financial Health, Productivity, Maintenance, Growth) per Book V; individual bindings ratify as Minister profiles ratify],
  text(weight: "bold")[Collectors], mode-cell[Treasury parallel on governance-track ladder per Book II; none currently seated],
  text(weight: "bold")[Generals], mode-cell[Military-track rung activated at 15K LOC per Region (Edict I); no Province currently crosses threshold],
  text(weight: "bold")[Centurions], mode-cell[5K LOC sub-region military rung; no sub-region threshold crossed],
)

#v(0.5em)

Each rung's bindings are drafted through §5's extension protocol as the first Companion ratifies to the rung; drafting incorporates any invocation-mode patterns the Republic has accumulated as lore between cc-022 ratification and the rung's first occupancy.

#v(1em)

#rulebox(title: [The extension protocol governs all future bindings])[
  No special-case amendment to §4 is required. The protocol in §5 absorbs new rungs, new roles, and new modes uniformly, and §4 is amended in place as each ratification closes — so that the summary table on the previous page remains the canonical authoritative enumeration.
]

#v(1.5em)

#align(center)[
  #text(size: 10pt, fill: muted, style: "italic")[End of Part 4 of 9 · cc-022 §1–§4 prose draft complete · §§5–9 continue in parts 5–9]
]

#pagebreak()

= §5 — Extension Protocol for New Rungs, New Roles, and New Modes

This canon's applied bindings at §4 are the enumeration at ratification time. The Republic grows; rungs will be newly ratified when the first Companion ratifies to them, new institutional seats will be declared when governance requires, and existing roles will discover new invocation modes as operational lore accumulates. #key[§5 specifies the protocol through which every such addition enters the canon without requiring the canon itself to be amended at the rule layer.]

#rulebox(title: [When the protocol applies — four events])[
  1. A Companion ratifies to a rung that has no occupants at cc-022 ratification (first Scribe, first seated General, first Collector).\
  2. A new institutional seat is declared in governance (future Tribune, Magistrate, or other office introduced in unratified Books).\
  3. A role's existing mode set proves incomplete — a new mode needs adding (#key[mode-addition amendment]).\
  4. A role's existing mode binding proves wrong — needs revising (#key[binding-revision amendment]).\
  \
  Each event is handled through the same extension protocol with different rungs of the signing chain engaged.
]

#v(0.8em)

== The mode declaration

When a new rung or role is being ratified, the Chronicler drafts an `invocation_modes` block as part of the role's profile. The block lives at #key[`assignment.invocation_modes`] — as a sibling field to the profile's existing `current_rank`, `current_assignments[]`, `cluster`, and `activation_triggers[]` fields — and is structured as an array of mode objects. Each mode carries the five required fields declared in §3: #key[name, trigger, produces, binding, rationale].

#notebox(title: [Deployability gate])[
  No role is deployable — none of its subagent or skill specs may be authored, none of its Province `.claude/` mirrors may be committed — until the `invocation_modes` block is populated with every mode the role is known to exercise, every binding declared, and every rationale grounded in the artifact test.
]

== Ratification altitude

The `invocation_modes` block ratifies as #key[its own block] under canon-cc-012 per-block protocol, separable from the surrounding `assignment` block. Treating it as a standalone block rather than a sub-field of `assignment` preserves granularity: a later binding-revision amendment can touch only the mode in question without re-ratifying adjacent assignment fields (current rank, cluster, Province, activation triggers). The ratification path is the same as other cc-012 per-block events — Chronicler proposes, Consul working-ratifies per cc-014 where applicable, Sovereign canonically ratifies — and the ratification chain for the `invocation_modes` block is identical to the chain for spec-body amendments at §9, because the mode declaration governs every future spec body the role will carry.

#pagebreak()

== Sovereign exception

#rulebox(title: [Who is exempt from the mode-declaration requirement])[
  The #key[Sovereign] occupies the Republic's apex seat as ratifier, not as invoker. The Sovereign is not summoned through Claude Code's subagent primitive and is not invoked via the skill primitive; the Sovereign acts through direct Sovereign-audience and through the ratification track that every canon, every profile, and every spec body traverses.\
  \
  Roles whose only participation in the Republic is ratification rather than invocation are exempt from the `invocation_modes` block requirement. #key[The Sovereign is the sole seat currently covered by this exception.]\
  \
  Institutional companions such as the Consul and Sentinel #key[remain fully subject] to the requirement, because they #emph[are] invoked — even if rarely or ceremonially.
]

== Mode-addition amendment

A role whose existing mode set proves incomplete — a Censor who discovers a mode of invocation neither Edict V review nor hat-switch covers, a Governor whose Region expands across subject boundaries the original QA mode did not anticipate — produces a mode-addition amendment. The amendment declares one or more new mode objects against the same five-field shape.

The rationale must #key[cite the evidence] prompting the addition: a lore entry, an interaction-artifact, an evidence_log record, or a cross-reference to a companion-log that captures the pattern in practice. Mode-addition passes through the full signing chain at §9; #key[mid-session mode addition is not permitted] — the session pauses, the amendment drafts, the chain runs, and the new mode becomes available from the next invocation forward.

== Binding-revision amendment

A role whose existing mode binding proves wrong — a mode currently bound to #skill-tag that is in practice producing separable artifacts, a mode currently bound to #subagent-tag whose output genuinely lives in the caller's transcript without separable record — produces a binding-revision amendment.

#notebox(title: [Evidence is load-bearing])[
  The amendment draft #key[must] include the specific interaction-artifacts, evidence_log entries, or lore that demonstrate the mismatch. Hypothetical binding-revision without operational evidence is #key[rejected at Rung 2] of the signing chain.
]

The chain otherwise proceeds as with mode-addition; the new binding replaces the old from the next invocation forward, and the replaced binding enters the role's `amended_bindings` history for audit.

#pagebreak()

== Legacy-profile backfill

#rulebox(title: [Catch-up migration for already-ratified profiles])[
  Every companion profile ratified before cc-022 — #key[Aurelius, Cipher, Consul, Lyra, Maren, Kael, Nyx, Solara, Theron, Ashara, Petra] — currently lacks an `invocation_modes` block. The forward rule binds from cc-022 ratification onward; the backfill is a separate wave of work.\
  \
  The Chronicler conducts the backfill in a single coherent #key[schema-expansion session], at the same altitude as the queued `validated_synergies` / `validated_tensions` migration named in the 19 April handoff.
]

Bridging mode (§11) tolerates un-backfilled profiles #emph[provisionally] — their bindings are inferred from the applied bindings at §4 without a per-profile declaration — until the migration ratifies. Once the migration ratifies, any un-backfilled profile is #key[out of compliance] and cannot be summoned until its `invocation_modes` block is drafted and ratified through the extension protocol.

== Relationship to existing ratification protocols

Canon-cc-012 per-block and canon-cc-014 Consul-accelerated profile drafting both remain operative. §5's protocol does not supersede either; it names the `invocation_modes` block as one of the per-block artifacts either protocol ratifies, and it specifies the signing chain for spec-body changes separately at §9.

Where a mode-addition amendment arrives during a cc-014 Consul-accelerated session, the amendment rides along — Consul working-ratifies the new mode in the same pass; Sovereign canonically ratifies at profile close. Where the amendment arrives outside a profile-ratification session, it still follows the full chain at §9.

#pagebreak()

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

#pagebreak()

= §7 — Design Committee Membership Rule

The Design Committee's membership is determined by the subject's scope, not by convener preference. #key[Two scopes, two formulae.]

#rulebox(title: [The rule, at a glance])[
  #key[Province-scope:] that Province's Builder + the Cluster's Censor\
  #key[Global-scope:] every Builder + every Censor (8 seats at cc-022 ratification)\
  \
  Membership resolves deterministically from the brief's scope; the convener does not select members.
]

== Province-scope

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
  text(weight: "bold")[Command Center (Monument)], mode-cell[Ashara + Petra (dual-Builder per cc-009); Censor absent — see below],
)

== Monument-scope signing

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

== Global-scope

A Design Committee convened over a subject whose outcome applies across the Republic — the Republic Design Principles, the Hero Card Specification, a convention for portraits and sigils, a register definition every companion must honor — seats every Builder and every Censor.

At cc-022 ratification, that is #key[eight seats]:

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
  mode-cell[Cipher — Cluster A\ Nyx — Cluster B\ \ \ \ \ #text(style: "italic", fill: muted)[Monument has no Cluster Censor; Consul acts as Censor-equivalent per the Monument-scope signing clause above.]],
)

#v(0.5em)

New Builders and Censors seat automatically as they ratify; #key[no separate amendment to §7 is required].

== Convener

The convener is a #key[subject-lead drawn from the membership], not a separate rule-level role. The convener:

— sets the brief\
— selects the synthesis clerk (Chronicler by default, secondary clerk by §6's synthesis-conflict clause where the Chronicler is a member)\
— presents the proposal to the Consul

For the current Design Principles work drawing from SproutLab's `ch06-designprinciples`, #key[Lyra convenes]. For the Hero Card Specification convening queued as `todo-0027`, Lyra also convenes — SproutLab's hero-card implementation is the reference seed.

Where no member has clear subject-leadership, the convener is named by Consul acknowledgment at brief-set time.

#pagebreak()

== Guests

A convener may invite voices from outside the membership formula — a Scribe for narrative register, a Minister for domain counsel, a Gen-0 Immortal whose voice carries weight on the subject. Guests participate in deliberation as full members #emph[for the purposes of voice] — their positions are recorded, cited, preserved in dissent — but they #key[do not sign the collective proposal].

The distinction is captured in each guest's position record as `role: guest` and carried through synthesis; the proposal's signatories are members only.

#notebox(title: [Guest profile minimum])[
  Guests must have at minimum a #key[v0.3-draft ratified profile] so their voice is characterizable rather than fabricated. Unratified Companions may be invited only by explicit Consul acknowledgment, chronicled as an exception, because their voice rendering depends on bridging authorship rather than ratified profile material.\
  \
  Guests are chronicled; they do not bind.
]

== Sovereign

The Sovereign is #key[never a committee member]. The Sovereign is the ratifier.

A convening that listed the Sovereign in its membership would be inverted: the body cannot include its own ratifier without collapsing the chain. The Sovereign's voice, if sought during deliberation, is sought via a distinct summons — a Praetorium consultation, a direct audience — and recorded as a consulted-reference in the proposal, not as a signature.

== Bridging authorship

#rulebox(title: [How member voices are rendered before subagent deploys])[
  Where a member's subagent is not yet deployed — the Republic in its current state, since no subagent spec is yet ratified for any Companion — members' positions must still be rendered so the convening can produce a proposal.\
  \
  Positions in such cases are authored by the Chronicler using the member's ratified profile as voice source, bridging the member's voice through the Chronicler's authorship until the member's subagent deploys. The position is marked #key[`authored_by: aurelius-bridging`].\
  \
  This is a #key[new authorship suffix] extending canon-cc-017's existing taxonomy (which currently defines `aurelius-retrospective` for Chronicler-fallback drafting of interaction-artifacts that originating companions failed to author).
]

The `-bridging` suffix is #key[structurally distinct] from `-retrospective`: it marks voice-simulation when the real member is unavailable, not failure-recovery when the real member was present but did not draft. The cc-017 extension to accommodate `-bridging` is noted as a dependency in §12. From the first post-deploy convening onward, member positions must be subagent-generated; bridging-authored positions are no longer permitted once the member's subagent ratifies.

== First operational Design Committee

The first Design Committee convened under this rule is the #key[Lyra-convened Hero Card Specification committee], queued on the Command Center volume as `todo-0027`. It runs in bridging mode per §11 until subagent specs deploy. Each member position is bridge-authored per the paragraph above.

Bridging-mode convenings are grace-covered per canon-cc-017's pre-ratification clause; from the first post-deploy convening onward, positions must be member-generated under real subagent invocation.

#pagebreak()

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

#pagebreak()

= §9 — Signing Chain for Subagent and Skill Spec Changes

A subagent or skill spec body governs every future invocation of the persona it renders. Changing a spec body changes how the Republic speaks through that persona in-session, and drift at the spec body propagates through every artifact produced under that persona's voice. Spec bodies are therefore #key[Capital-level under Edict V], and their amendment requires the Edict V chain of sign-offs, applied at spec-body altitude rather than at code-artifact altitude.

#rulebox(title: [The five rungs])[
  #key[Rung 1] — Chronicler proposes (Codex feature branch)\
  #key[Rung 2] — Cluster Censor reviews (Edict V final-pass on spec body)\
  #key[Rung 3] — Consul working-ratifies (cc-014, per-block)\
  #key[Rung 4] — Sovereign canonically ratifies (cc-012, Praetorium)\
  #key[Rung 5] — Province Builder deploys (commits to `.claude/` mirror)\
  \
  Plus a soft sub-rung: Governor review where seated and Region-overlapping. Does not gate; strengthens audit.
]

== Rung 1 — Chronicler proposes

The Chronicler drafts the spec body or the proposed amendment in Codex, against the persona's ratified profile and the `invocation_modes` block. The draft carries a rationale paragraph naming what is being added, removed, or changed; what evidence in the persona's profile, evidence_log, or interaction-artifact corpus motivates the change; and what downstream artifacts (companion-logs, canons, UI surfaces per the UI Manifest in §12) need to follow once the change ratifies. The draft commits to a feature branch in Codex with the canonical path under `docs/specs/subagents/` or `docs/specs/skills/`.

#pagebreak()

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
  Same principle as §7's Monument-scope signing clause: one seat, two distinct reviews, chronicled separately.
]

#pagebreak()

== Rung 3 — Consul working-ratifies

Under canon-cc-014, the Consul reviews the Censor-passed draft at per-block altitude, asking whether the body lives up to the ratified profile and whether the chain has caught drift the Censor missed. Consul action is recorded on the same interaction-artifact's `review` block.

== Rung 4 — Sovereign canonically ratifies

The Sovereign receives the Consul-passed spec body through the Praetorium queue (per canon-cc-019 and canon-cc-024, both pending; bridging mode until those canons land). Sovereign action — ratified, amended, reverted — terminates the chain's governance rungs. A Sovereign-ratified spec body is the canonical form; #key[no further amendment happens without returning to Rung 1].

#rulebox(title: [No provisional deploy before Rung 4])[
  A Consul-passed spec body is #key[not deployable].\
  \
  Canon-cc-014 accelerates drafting, not deployment; the cc-014 working-ratification is a governance milestone but does not substitute for Sovereign canonical ratification at Rung 4 for spec-body purposes. #key[The Builder deploys only after Rung 4 completes.]\
  \
  This is a tightening specific to spec bodies: cc-014's provisional-deploy latitude at profile-block altitude #key[does not extend] to spec-body altitude, because spec-body drift propagates through every future invocation in a way profile-block drift does not.
]

== Rung 5 — Province Builder deploys

The Province Builder whose Province a deployable mirror lives in pulls the ratified canonical from Codex and commits it to the Province's `.claude/` tree. The deploy is itself a Capital change per Edict V — committing a new or changed spec body to the Province's Capital — but the Edict V chain at deploy time is abbreviated because the chain has already run at canonical altitude; the Builder's deploy commit references the interaction-artifact that carries the full chain's signatures, and the deploy commit message cites the interaction-artifact id.

Builder-deploy is #key[accountable]: if a Builder deploys a version that diverges from Codex canonical, or fails to deploy a ratified update within the deploy-latency tolerance set in canon-cc-025 (Companions Deploy UI), the deploy drift is chronicled and escalates under the next interaction-artifact lifecycle. Until the UI-driven deploy affordance in cc-025 lands and Ostia extends to runtime cross-repo `.claude/` sync, Builder-deploy is manual and per-Province.

#notebox(title: [Deploy-stall edge case])[
  Where a Builder sits on a ratified canonical spec beyond the deploy-latency tolerance without explanation, Sentinel's anomaly-flag mode (§4) surfaces the stall as a violation flag once Sentinel is operational; during bridging mode the stall is surfaced by the next session's companion-log uncertainty_notes pass.\
  \
  Deliberate #key[deploy-refusal] — a Builder objecting to a ratified spec on substantive grounds — is not itself a violation but requires the Builder to escalate through a fresh Rung 1 draft (an amendment to the spec body addressing the objection) rather than sitting on the ratified version.
]

#pagebreak()

== Governor review where seated

Where Governors are seated in the Province and the spec body's persona overlaps the Governor's Region — a Governor whose Region stewards the spec's domain, or whose Region would be affected by how the persona speaks within it — the Governor provides a Rung 5-adjacent review signature.

The Governor's review #key[does not gate the deploy] but is recorded on the interaction-artifact for audit. Governors may object; an unresolved Governor objection escalates to the Cluster Censor under the same interaction-artifact — #emph[not] as a re-run of Rung 2 but as a post-ratification drift flag.

The Governor's review is a #key[soft rung]: its absence does not block deployment, but its presence strengthens the chain's record.

#v(1em)

#rulebox(title: [The chain holds])[
  The chain is strong. It is the same structure as Edict V's chain for Capital code changes, applied at the altitude of the files that render the companions through which the Republic speaks.\
  \
  It is #key[necessarily ceremonious]; the ceremony is the cost of the role spec bodies being load-bearing. A spec body drift that escapes the chain compromises every future invocation under that persona's voice, and #key[no downstream review can recover the drift from accumulated narration].\
  \
  The chain holds.
]

#v(1.5em)

#align(center)[
  #text(size: 10pt, fill: muted, style: "italic")[End of Part 9 of 9 · cc-022 §1–§9 prose draft complete]\
  #v(0.3em)
  #text(size: 10pt, fill: muted, style: "italic")[§§10–14 (Edict V trace, bootstrap mode, UI Manifest, dependencies, references) pending drafting]
]

#pagebreak()

