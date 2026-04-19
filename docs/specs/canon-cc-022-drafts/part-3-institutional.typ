#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 3 of 9]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§4 Institutional Seats (Consul, Chronicler, Sentinel)]
  #v(1cm)
]

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
