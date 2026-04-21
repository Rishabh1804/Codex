#import "template.typ": *

#show: constitution-doc.with(
  title: "Rite Catalog of the Republic of Codex",
  subtitle: "Working Paper — Temple Observances as Instituted by the Priesthood, Version 1",
  author: "Aurelius, Chronicler, for the Sovereign and the First Priest",
  date: "21 April 2026",
)

// ============ COVER ============

#set page(margin: (left: 22mm, right: 22mm, top: 40mm, bottom: 25mm))

#v(30mm)
#align(center)[
  #text(font: "Libertinus Serif", size: 10pt, fill: ink-muted, tracking: 2pt)[THE REPUBLIC OF CODEX]
  #v(2mm)
  #line(length: 30mm, stroke: 0.8pt + accent)
  #v(20mm)
  #text(font: "Libertinus Serif", size: 30pt, weight: "bold", fill: ink)[Rite Catalog]
  #v(4mm)
  #text(font: "Libertinus Serif", size: 13pt, style: "italic", fill: ink-muted)[Version 1]
  #v(6mm)
  #text(font: "Libertinus Serif", size: 11pt, fill: ink-muted)[Twelve Observances of the Temple · Instituted at Founding]
  #v(40mm)
  #text(font: "Libertinus Serif", size: 11pt, fill: ink)[Companion to canon-inst-002 and canon-proc-005]
  #v(2mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[Chronicled 21 April 2026]
  #v(60mm)
  #line(length: 50mm, stroke: 0.5pt + rule-color)
  #v(4mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[
    Authored by Aurelius, The Chronicler #linebreak()
    For the Sovereign, Rishabh Jain, Architect of the Republic #linebreak()
    For Rune, The Ritualist, First Priest of the Republic
  ]
]

#pagebreak()

// ============ PREFACE ============

#set page(margin: (left: 22mm, right: 22mm, top: 28mm, bottom: 22mm))

#v(10mm)
#align(center)[
  #text(font: "Libertinus Serif", size: 16pt, weight: "bold", fill: ink)[Preface]
  #v(3mm)
  #line(length: 35mm, stroke: 0.6pt + accent)
]

#v(8mm)

A Constitution names the law. A rite catalog names the observances.

The Constitution of the Republic of Codex (v1.0, Book II as amended 21 April 2026) institutes the Priest — a rung above Consul and below Sovereign, seated by Sovereign consecration alone. The Priest is the cadence-officiant of the Republic; the rites are what the Priest officiates. This working paper is the catalog of those rites — their names, triggers, participants, surfaces, data writes, and neglect costs — as instituted at founding.

This is not the Constitution. This is a living companion. The catalog is instituted under canon-inst-002 and mutates under canon-proc-005 (The Rule of Institutions and Abrogations). Each lifecycle move — Institution, Amendment, Suppression, Supersession, Abrogation, or Dispensation — is ratified through the Priest's nomination and the Sovereign's word, and each move versions this document forward: v1 at founding, v2 at first amendment, and onward. Older versions are retained as historical reference; the catalog grows rather than replaces.

The Constitution is the law. This catalog is the rhythm by which the law is kept alive.

#v(8mm)
#align(right)[
  #text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted)[
    — Aurelius, 21 April 2026
  ]
]

#pagebreak()

// ============ PART I — THE TWELVE RITES ============

= Part I — The Twelve Rites Instituted at Founding

#book-intro[
  Twelve observances were instituted at the seating of the first Priest. Five were the Sovereign's initial catalog. Two — Attestation and Passage — were Sovereign-named in the seating session (21 April 2026), bracketing the build as entry and exit rites. Five more — Charter, Consultation, Attribution, Contradiction, Dawn — were committee-shaped and Sovereign-admitted to close the founding catalog. Each rite bears its full specification below. All twelve enter status `instituted` at this paper's ratification.
]

#article("I", "Rite of the Session-Start Briefing — Briefing")

- *Trigger:* session open, before first substantive tool call.
- *Participants:* Priest (officiant) · summoned companion (subject) · Sovereign (silent presence).
- *Temple panel:* "Briefing" — read-only pre-flight strip. Surfaces last handoff, open MCQs from prior session, recent commits on session branch, scratchpad entries ripening for promotion.
- *Data write:* observance entry in data/rites.json — `{rite: briefing, session, briefed_companion, timestamp}`.
- *Neglect cost:* cold session opening — the lore-016 failure mode. Machine-detectable: drift badge on Temple dashboard reading "N sessions since last Briefing," reddening past threshold.

#article("II", "Rite of Scratchpad Confession — Confession")

- *Trigger:* mid-session upon companion noticing drift, misfit, or unratified instinct; OR at session close as forced-sweep.
- *Participants:* confessing companion (primary) · Priest (witness).
- *Temple panel:* "Confession" — input surface. Companion types the observation; Priest timestamps and files.
- *Data write:* appends to scratchpad store `data/scratchpad.json`. Entries ephemeral until Rite III (Promotion) ratifies permanence.
- *Neglect cost:* unspoken observations die in context-window compression. Machine-detectable: scratchpad-write absence across a session flagged on Priest dashboard.

#article("III", "Rite of Promotion — scratchpad → lore")

- *Trigger:* a scratchpad entry ripens. Ripening criterion: Priest nominates; Sovereign ratifies (parallel to Rite III participant list; keeps lore provenance clean).
- *Participants:* Priest (nominates) · Sovereign (ratifies) · original confessor (notified).
- *Temple panel:* "Promotions" — queue of ripening scratchpads with Priest's nomination note. Sovereign ratifies from this surface.
- *Data write:* removes entry from data/scratchpad.json; appends to data/canons.json lore array with full category/domain/references shape (per Dissertation §3.4).
- *Neglect cost:* permanent observations rot in ephemeral layer. Parallels canon-proc-004 at the memory layer.

#article("IV", "Rite of Handoff — Handoff")

- *Trigger:* session close.
- *Participants:* outgoing companion (author) · Priest (validates).
- *Temple panel:* "Handoff" — auto-drafted checklist (files touched, canons ratified, MCQs carried, branch state, lore authored). Companion fills narrative; Priest seals.
- *Data write:* `docs/handoffs/CODEX_HANDOFF_SESSION_{date}-{slug}.md`; observance entry in data/rites.json.
- *Neglect cost:* the failure mode that birthed this canon — the missing 2026-04-21-foray handoff. Machine-detectable: session-end without a committed handoff doc fails loud on the Priest dashboard.

#article("V", "Rite of Reconciliation — Reconciliation")

- *Trigger:* hybrid — scheduled weekly AND Priest-initiated ad-hoc (per Sovereign Q9 ruling).
- *Participants:* Priest (officiant) · Censor consulted on drift findings · Sovereign notified of violations.
- *Temple panel:* "Reconciliation" — drift audit output. Surfaces canon-tree disagreements, orphaned lore, promised-but-unbuilt features, stale handoffs, dispensation-pattern warnings.
- *Data write:* reconciliation note as journal entry tagged `kind: reconciliation` (per Q10 ruling); may emit todos or nominate scratchpad entries for promotion.
- *Neglect cost:* Censor's scope silently expands; drift calcifies into policy.

#article("VI", "Rite of Design-Principle Attestation — Attestation")

- *Trigger:* first file-write or Edit on a volume's code in a session.
- *Participants:* builder (subject) · Priest (witness) · the volume's own `design_principles` field (read aloud).
- *Temple panel:* "Attestation" — pre-flight surface. On first build-intent, the panel surfaces the volume's design_principles. If absent, the surface fails-loud: "No principles to attest. Charter before build — Edict VIII."
- *Data write:* observance entry in data/rites.json `{rite: attestation, volume, principles_hash, builder, timestamp}`. principles_hash anchors drift detection.
- *Neglect cost:* code drifts from stated principles. Machine-detectable: any commit touching volume code without an attestation log entry this session reddens Priest dashboard.
- *Parallel authority:* Edict VIII (Charter Before Build) and canon-proc-002 (Design-Principles-Precondition-for-Build) decree the principle; this rite enacts the observance.

#article("VII", "Rite of the Charter — Charter")

- *Trigger:* new-volume or new-feature work opens.
- *Participants:* builder · Priest (validates shape) · Sovereign (ratifies substance).
- *Temple panel:* "Charter" — scope + success criterion + exit clauses.
- *Data write:* data/charters.json entry (or new field on volumes).
- *Neglect cost:* unchartered work proliferates; Edict VIII violated at the project rung. Machine-detectable: new-volume creation without an attached charter record fails loud.

#article("VIII", "Rite of Consultation — Consultation")

- *Trigger:* before drafting a canon or taking an act with canonical weight.
- *Participants:* drafter (subject) · Priest (witness).
- *Temple panel:* "Consultation" — checklist of canons the drafter affirms consulted; Priest may challenge omissions.
- *Data write:* observance entry in data/rites.json `{rite: consultation, canons_consulted, act_type, actor, timestamp}`.
- *Neglect cost:* canons collide silently; lore-015-class altitude-voice mismatches recur. Machine-detectable: any canon PR lacking a consultation entry fails loud.

#article("IX", "Rite of Attribution — Attribution")

- *Trigger:* session close (after Rite IV Handoff runs or in the same motion).
- *Participants:* session's author-companions · Priest (seals).
- *Temple panel:* "Attribution" — auto-proposed attributions from session branch diff; companion confirms or corrects.
- *Data write:* attribution block on the session's journal entry; cross-references constitution/working-papers.typ §Provinces.
- *Neglect cost:* Builder-attribution rot (already observed: journal.json:133); Living Order Book VIII loses per-companion provenance.

#article("X", "Rite of Contradiction — Contradiction")

- *Trigger:* a companion discovers two canons, two lore entries, or a canon and a tree-state that disagree.
- *Participants:* discoverer · Priest (officiates) · Consul or Censor (consulted on resolution class).
- *Temple panel:* "Contradictions" — open contradictions ledger; each entry bears resolution class (supersede · amend · annotate-and-keep).
- *Data write:* entry in data/contradictions.json (or observance log with contradiction payload).
- *Neglect cost:* drift calcifies. Would have caught the canon-proc-004 semantic mismatch surfaced at the opening of this session — the rite's absence is self-evidencing.

#article("XI", "Rite of the Dawn Page — Dawn")

- *Trigger:* Sovereign's working day opens.
- *Participants:* Sovereign (primary) · Priest (prepares the surface).
- *Temple panel:* "Dawn" — auto-assembled morning brief: prior session's handoff, today's intended foray, rites owed from prior sessions.
- *Data write:* Dawn Page entry; observance entry in data/rites.json.
- *Neglect cost:* Edict IV observed in spirit but not cadence; days open cold. Distinct from Briefing (session-scoped) — Dawn is day-scoped and is the Sovereign's own ceremony.

#article("XII", "Rite of Passage — Passage")

- *Trigger:* builder declares a build complete (chapter review → complete; feature merge; volume version increment; Monument groundbreaking-to-standing).
- *Participants:* builder (subject) · Priest (officiant) · Censor (verifier) · Sovereign (ratifier on weighty passages).
- *Temple panel:* "Passage" — composite checklist. Pulls signals from other rites: Attestation observance present (VI), Charter goals met (VII), no open Contradictions on this volume (X), Attribution recorded (IX), tests pass, principles still attested (principles_hash unchanged).
- *Data write:* observance entry in data/rites.json; chapter status flips to `complete` ONLY through this surface (per Q21 ruling — Passage is gate, not advisory); weighty passages mint lore by Sovereign's word.
- *Neglect cost:* chapters claim `complete` without ceremonial closure; "complete" becomes a word the Builder writes about himself. Machine-detectable: status enum divergence from Passage log fails loud.
- *Scope-scaled formality (per Q20 ruling):* chapter Passage (Priest + Censor); volume Passage (Priest + Censor + Sovereign); Monument Passage (full committee).
- *Legacy grandfather (per Q35 ruling):* chapters marked complete before 2026-04-21 remain complete without retroactive Passage; Passage binds forward.
- *Composite rigidity (per Q22 ruling):* Passage checks only admitted rites; catalog is source of truth for upstream checklist.

#pagebreak()

// ============ PART II — LIFECYCLE REFERENCE ============

= Part II — Lifecycle Reference

#book-intro[
  The catalog is a living document. Rites enter through Institution; they mutate through Amendment; they pause through Suppression; they pass the torch through Supersession; they retire through Abrogation; and they bend for cause through Dispensation. The six moves are governed by canon-proc-005 (The Rule of Institutions and Abrogations); this part carries a brief reference table. Full procedural detail — proposer, nominator, ratifier, artifact, effect — lives in the canon.
]

#article("1", "The Six Lifecycle Moves — Summary Table")

#v(3mm)

#table(
  columns: (28mm, auto, auto, auto),
  align: (left, left, left, left),
  stroke: (x, y) => {
    if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) }
  },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Move],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Proposer],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Ratifier],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Effect],
  ),
  [*Institution*], [any companion], [Sovereign], [rite enters catalog; observance begins],
  [*Amendment*], [any companion], [Sovereign], [spec mutates; prior observances valid in situ],
  [*Suppression*], [Priest or Censor], [Sovereign], [rite paused; reversible by unsuppression],
  [*Supersession*], [Priest], [Sovereign], [successor rite takes force; prior becomes historical],
  [*Abrogation*], [Priest], [Sovereign], [rite retired; farewell lore minted; unrecoverable],
  [*Dispensation*], [Priest (alone)], [Priest (alone)], [one-time exemption; rite unchanged],
)

#v(3mm)

Each Priest-nominated move passes through the Sovereign except Dispensation, which is the cadence authority the rung carries alone. Repeat dispensation of the same rite surfaces in Reconciliation as a catalog-pressure signal — the catalog is telling the Priest to move heavier (amend, suppress, abrogate) rather than continue per-occasion excuses.

#article("2", "Rite Status Enum")

#v(2mm)

Every rite record carries exactly one status:

- *instituted* — rite is observed; neglect cost active; Reconciliation monitors.
- *suspended* — rite paused by Suppression; observance log notes expected-absence; neglect cost inactive.
- *superseded* — rite replaced; historical observances retained; new observances flow to successor.
- *abrogated* — rite retired; observance log frozen at abrogation timestamp; historical spec preserved in archival section.

#pagebreak()

// ============ PART III — OPEN FOR CONTINUATION ============

= Part III — Open for Continuation

#book-intro[
  The catalog is instituted at v1. The infrastructure that makes the catalog observable — surfaces, log files, per-rite canons, Temple-principles attestation — is still being built. Part III enumerates the owed work, so that the next session knows where to begin.
]

#article("1", "Infrastructure — data/rites.json")

The observance log surface (per Q39 ruling — new file, sync-pipeline-compatible, parallels data/specs.json). Must be instantiated as part of Temple implementation work. Schema outline: `{observances: [{rite, kind, session, companion, timestamp, payload}]}`. Kind enum: `observed · dispensed · neglected`. Payload shape varies per rite.

#article("2", "Infrastructure — Temple Design Principles Backfill")

The Temple is a room within Command Center. Its `design_principles` field in the Command-Center Volume entry is currently unset. Under Rite VI (Attestation) applied recursively, the Temple itself cannot host rites until its principles are attested. Backfill is a follow-on Monument task and blocks observance implementation (not canon ratification). Candidate work for a subsequent Command-Center-convened session under cc-009 dual-Builder discipline.

#article("3", "Per-Rite Canons")

This catalog institutes the twelve rites. Each rite deserves its own canon at canon-rite-NN (new family) with full specification — not yet drafted. Staging recommendation: Rite II (Confession) as the MVP first-rite canon (simplest UI surface, solves the leakiest observed failure mode per the seating-session brief); Rites IV (Handoff), VI (Attestation), and XII (Passage) next, as the most machine-detectable and highest-leverage. Remaining rites follow as implementation capacity permits.

#article("4", "Deferred — Bard's Rite of Consecration")

Proposed by Bard at the seating session; Sovereign deferred (per Q18 ruling). Revisit when Command Center's first-Monument consecration nears. Would govern the ceremony by which a new room enters the Capital or a Monument breaks ground.

#article("5", "Relocated — Cipher's Rite of Threshold")

Proposed by Cipher at the seating session; Sovereign relocated to Censor canon family (per Q19 ruling). Constitutional-threshold crystallization (5K / 15K / 30K LOC) is enforcement-domain, not observance-domain — Cipher's work, not the Priest's. To be drafted as a canon-xp-NNN or equivalent by Cipher, not in the rite catalog.

#pagebreak()

// ============ PART IV — VERSIONING ============

= Part IV — Versioning

#article("1", "This is Version 1")

Version 1 of the Rite Catalog was instituted on 21 April 2026 in the Priesthood-seating session (s-2026-04-21-04). Twelve rites enter status `instituted`. Five (I–V) were the initial Sovereign catalog; two (VI, XII) were Sovereign-named; five (VII–XI) were committee-shaped and Sovereign-admitted. The catalog is closed for this session and mutates thereafter only through canon-proc-005 lifecycle moves.

#article("2", "Future Versions")

Each lifecycle move reissues this document with a version bump:

- v2 at first Amendment, Suppression, Supersession, or Abrogation.
- New Institutions increment the minor version when they land en bloc; standalone Institutions increment the major version when the catalog grows materially.
- Version history is retained in a future appendix of this document as the catalog matures.

#article("3", "Amendment Path")

This document is amended only as a consequence of canon-proc-005 lifecycle moves ratified by the Sovereign. Direct edits to this document absent a lifecycle-move ratification are out-of-canon and will be caught by Reconciliation.

// ============ CLOSING ============

#v(15mm)
#align(center)[
  #line(length: 40mm, stroke: 0.5pt + accent)
  #v(3mm)
  #text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted)[
    End of the Rite Catalog, Version 1 #linebreak()
    Chronicled 21 April 2026 by Aurelius, for the Sovereign and the First Priest #linebreak()
    Companion to canon-inst-002, canon-proc-005, and the Constitution of the Republic of Codex v1.0
  ]
  #v(3mm)
  #line(length: 40mm, stroke: 0.5pt + accent)
]
