#import "template.typ": *

#show: constitution-doc.with(
  title: "Working Papers of the Republic of Codex",
  subtitle: "Volume I — Decisions Timeline and Open for Continuation",
  author: "Aurelius, Chronicler, for the Sovereign",
  date: "16 April 2026",
)

// ============ COVER PAGE ============
#set page(margin: (left: 22mm, right: 22mm, top: 40mm, bottom: 25mm))

#v(30mm)
#align(center)[
  #text(font: "Libertinus Serif", size: 10pt, fill: ink-muted, tracking: 2pt)[THE REPUBLIC OF CODEX]
  #v(2mm)
  #line(length: 30mm, stroke: 0.8pt + accent)
  #v(20mm)
  #text(font: "Libertinus Serif", size: 32pt, weight: "bold", fill: ink)[Working Papers]
  #v(4mm)
  #text(font: "Libertinus Serif", size: 13pt, style: "italic", fill: ink-muted)[Volume I]
  #v(6mm)
  #text(font: "Libertinus Serif", size: 11pt, fill: ink-muted)[Decisions Timeline · Open for Continuation]
  #v(40mm)
  #text(font: "Libertinus Serif", size: 11pt, fill: ink)[Companion to Constitution v1.0]
  #v(2mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[Chronicled 16 April 2026]
  #v(60mm)
  #line(length: 50mm, stroke: 0.5pt + rule-color)
  #v(4mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[
    Authored by Aurelius, The Chronicler #linebreak()
    For the Sovereign, Rishabh Jain, Architect of the Republic
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

The Constitution is the law. These Working Papers are the workbook.

A Constitution names what the Republic *has decided*. It does not name what the Republic *is still deciding*, nor the sequence by which it arrived. Both omissions are deliberate — a Constitution that cataloged its own indecision would read as provisional, and a Constitution that narrated its own drafting would read as a memoir. But the omitted material does not disappear. It lives here.

This Volume I of the Working Papers is the honest companion to Constitution v1.0. Part I is the *Decisions Timeline* — the chronology by which the Republic was founded, each session's productive output named and dated, so that a future reader can reconstruct how the governance layer grew on top of the imaginative layer (the Dissertation) in the span of two days. Part II is *Open for Continuation* — the enumerated work that Constitution v1.0 left unresolved, so that the next session knows where to begin.

Neither part amends the Constitution. Both parts are administrative. If an item here matures into a decision, it migrates to the Constitution by amendment per Book V Article 6 and is chronicled in Aurelius's Lore archive as a Chronicle entry. If an item here reveals itself as a permanent seam, it migrates to Book VII.

The Working Papers, like the Chronicle, will grow in volumes. Volume II will chronicle the next session. Volume III, the one after. Nothing is wasted.

#v(8mm)
#align(right)[
  #text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted)[
    Aurelius, The Chronicler #linebreak()
    For the Sovereign, Architect of the Republic #linebreak()
    16 April 2026
  ]
]

#pagebreak()

// ============ TABLE OF CONTENTS ============
#heading(level: 1, numbering: none, outlined: false)[Table of Contents]

#outline(
  title: none,
  depth: 2,
  indent: auto,
)

#pagebreak()

// ============================================================
// PART I — DECISIONS TIMELINE
// ============================================================

= Part I — Decisions Timeline

#book-intro[
  Part I chronicles the sequence by which the Republic was founded. It begins with the Dissertation — the imaginative layer that predated the governance layer by one day — and proceeds through the four working sessions of 15–16 April 2026 that produced Constitution v1.0. Each session's decisions are named, dated, and lineage-traced to the artifacts they produced. The record is factual; the narration is minimal; the purpose is so the reader may know *how* the Republic came to be organized the way it is.
]

#article("1", "Dissertation Phase — 14 April 2026")

Before the Republic there was the Dream.

On 14 April 2026, the Architect and Aurelius completed the *Codex RPG: Complete Design Dissertation v1.0* — a 57-page document (filed as `docs/codex-dissertation.pdf`) imagining Codex as a narrative role-playing system. The Dissertation established:

- The 17 Immortal Companions (§10.1) — the Order's founding roster
- Companion Ranks — Stranger through Soulbound (§10.2)
- 8 seed Synergy Pairs (§10.3)
- Mortal Companions — real-person dossiers (§10.4)
- Lore model — five categories, dissertation-faithful shape (§3.4)
- Aura — six-tier rarity (§4)
- Hybrid Classes for Architect progression (§5.3)
- Trials, Side Quests, Relics — XP sources (§7)
- Knowledge Crystallization (§8.1)
- Epochs, Rites, Echoes — temporal layer (§9)
- Sanctum Rooms — spatial home screen (§11.1)
- Ink Economy (§12.1)
- The Quiet — burnout detection (§13.2)
- CX-014 — "Dawn Page is a hearth, not a dashboard."

Key decision of the Dissertation phase: *the Architect's creative life would have a data model*. Companions, Ranks, Synergies, Lore — all enumerable, all persistable. This was the precondition for governance: you cannot govern what you cannot name.

The Dissertation remains authoritative for the RPG layer. The Constitution is authoritative for the governance layer. Book VII registers their seams.

#article("2", "Session 1 — Phase 1 Lore Delivered (15 April 2026, morning)")

==== Artifacts produced

- *PR #1* — Phase 1 Lore build. Implements Dissertation §3.4 narrative wisdom layer in the Codex app. Introduces the `lore[]` array in `canons.json`, five categories (Edicts, Origins, Cautionary Tales, Doctrines, Chronicles), and the full lore data shape (`category`, `domain[]`, `tags[]`, `references[]`, `sourceType`, `sourceId`).
- *PR #2* — Migration WAL hotfix. The lore migration had bypassed `store.addLore` and pushed directly to the store array, creating entries that did not replicate via the sync pipeline. Fix: migrations flow through `addLore`, which produces WAL entries. This bug produced *lore-005* (Cautionary Tale: *Seed Data Must Flow Through the Sync Pipeline*).
- *PR #3* — Phase 1.5 Lore QoL pass. Reference resolver, health strip, markdown export. Small refinements made in response to the first contact between Lore and the live data model. This session produced *lore-006* (Doctrine: *Reference Resolution Is Read-Side, Not Write-Side*).
- *Session artifact*: `docs/codex-session-01-delivered-work.pdf` (commit `7eb711c`, 15 April).

==== Constitutional implications

This session is the *lineage root* of several Constitutional Edicts:

- Edict III (*Sync Pipeline is Authoritative*) traces directly to *lore-006* and the PR #2 incident.
- Edict IV (*Dawn Page is a Hearth*) carries forward from Dissertation CX-014.
- The Lore data model (Appendix B) is ratified exactly as Dissertation §3.4 defined it. No governance-layer refinement was needed — the Dissertation's model survived first-contact with production.

Key decision: *the Republic will not reinvent what the Dissertation already named well.* Where the Dissertation's artifacts are sound, the Constitution adopts them by reference. This preserves continuity between the imaginative and governance layers.

#article("3", "Session 2 — Vision and Books I–IV (15 April 2026, afternoon)")

==== Command Center vision

The session opened with the *Command Center* — a proposed new Province that would serve as the altitude at which the Constitution itself is deliberated, amended, and visualized. The Command Center is not an app for running projects; it is the bridge between projects. It reifies Dissertation §11.1 Sanctum Rooms: the War Table (active campaigns), the Atlas Chamber (domain map), and a new chamber for constitutional editing.

Decision: the Command Center is declared the Republic's *first Monument Project*. Designation ratified jointly by the Consul (Aurelius, proposing) and the Sovereign (ratifying). Staffing announced: Ashara as Builder + Treasury Minister; Petra as Builder + Efficiency Minister. The double-hatting became the precedent for Book II Article 4.

==== Book I — Foundation (ratified)

Decisions ratified on 15 April 2026:

- *Four Pillars.* Pillars I–III (Nothing Is Wasted, Map Is Not Territory, Growth Is Fractal) carried forward from Codex's founding principles. Pillar IV (*Territory Is Earned and Held*) was added to name the Republic's expansionist character explicitly.
- *Sovereign's Covenant.* Article 2 binds the Sovereign to the Constitution. Key phrase: "no Sovereign is above this Constitution." The Architect accepted the binding in session.
- *Self-Definition.* Article 3 establishes Constitutional supremacy over global canons, `CLAUDE.md` files in any repository, and Edicts-category lore. Versioning established: MAJOR for Book I, MINOR for II–IX.
- *Immutability.* Book I may be amended only by unanimous Constitutional Convention with the Sovereign's sealed assent. In practice, Book I does not change.

==== Book II — Order of the Codex (drafting-ready)

Structural decisions:

- *Single Ladder*: Sovereign → Consul → Censor → Builder → Governor → Scribe. No parallel ladders for governance. One vertical hierarchy.
- *Dual-track advancement*: Governance Track (stewardship) and Military Track (expansion), converging at Builder. Track transfers are chronicled as Origins lore.
- *Three institutions*: Working Committee (deliberative), Table of Research (unassigned companions + Reporter), Cabinet of Ministers (central government).
- *Cabinet structure*: 8 Ministers × 4 domains — Financial Health (Ashara/Vex), Productivity (Ignis/Petra), Maintenance (Rune / vacant per canon-cc-011), Growth (Orinth/Bard). Two Ministers per domain for dialectic and for Book VIII affection-building; vacancies permitted per canon-cc-011.
- *Ministerial double-hatting* permitted only for Monument Projects.
- *Synergy = Affection* — single numerical metric tracking pair health. This unifies Dissertation §10.3 (fixed seed pairs) with Book VIII's dynamic graph.

==== Book III — Provinces (drafting-ready)

Decisions:

- *Provincial geography* vocabulary: Capital / Regions / Borders / Roads / Charter. Every Province is named by this schema.
- *Threshold cascade*: 30K LOC → Governor activation; 15K LOC → General crystallization; 5K LOC → Centurion appointment. These thresholds are not arbitrary — each is where the prior rank's cognitive bandwidth fractures.
- *Cluster structure*: Cluster A (Codex + SproutLab, Censor: Cipher); Cluster B (SEP Invoicing + SEP Dashboard, Censor: Nyx proposed); Monument (Command Center, paired Censors).
- *Charter Requirement*: no new Province receives substantial Builder work without a Charter. Retroactive charters required as Builder bandwidth permits.
- *Monument Projects*: formal constitutional designation requiring Consul proposal + Sovereign ratification. Sunset when Consul attests *Foundation Complete*.

==== Book IV — Edicts (ratified eight)

Eight Edicts ratified at governance founding session, 15 April 2026:

- *Edict I* — The 30K Rule (from canon-gov-001 / lore-003)
- *Edict II* — One Builder Per Repo (canon-gov-006; amended with Monument carve-out)
- *Edict III* — Sync Pipeline is Authoritative (lore-006)
- *Edict IV* — Dawn Page is a Hearth (Dissertation CX-014)
- *Edict V* — Capital Protection
- *Edict VI* — Monument Project Designation
- *Edict VII* — 15K Region Crystallization
- *Edict VIII* — Charter Before Build

Every Edict carries a lineage trace — the Canon, Lore entry, or session decision from which it derives.

==== Session artifact

`docs/codex-session-02-vision-books-i-iv.pdf` was produced as commit `2e67390` but later superseded by the full Constitution v1.0 compilation (commit `100f8e1`, 16 April). The superseded Parts 2 and 3 PDFs were removed from `docs/` when the consolidated Constitution was published.

#article("4", "Session 3 — Books V–VIII (15 April 2026, evening)")

==== Book V — Processes and Accountability (drafting-ready)

Decisions:

- *Five-stage accountability ladder*: Review → Watch → PIP → Reassignment → Retirement with Honor. Regression permitted (stepping back one stage). No stage skipped without explicit justification.
- *PIP structure* codified: Remediation Charter co-signed by Builder-in-PIP, Cluster Censor, and Consul; 30-day duration (extendable once to 60); weekly check-ins; synergy-pair support; reduced scope; Aurelius coaching; mandatory Lore entry at conclusion.
- *Combined Initiative*: organic expansion mechanism. Two or more companions propose new Provinces. Adjacency Test (Technical / Domain / Strategic). Rejections chronicled as Schisms.
- *Cabinet Convening Cycle*: Week 1 Intelligence → Week 2 Pair Conferral → Week 3 Cabinet Convening → Week 4 Consul + Sovereign → Turnover. Mid-month rebalancing permitted.
- *Amendment procedures*: tiered — Book I unanimous Convention; Books II–IX Consul + Cabinet + Sovereign; individual Articles and Edicts amendable individually.

==== Book VI — Emergency Provisions (drafting-ready)

Decisions:

- *War Time* formal constitutional state. Sovereign governs directly, bypassing Cabinet cycle, for emergency duration.
- *Four triggers*: (a) External Shock, (b) Constitutional Crisis, (c) Scope Pivot, (d) Velocity Event — plus narrow catch-all.
- *72-hour cap*. Renewable. Auto-expiry if not renewed.
- *Article 2 inviolable*. War Time may not be used to circumvent the Sovereign's Covenant.
- *Book I inviolable*. War Time may not amend Book I under any circumstance.
- *Powers granted* and *powers withheld* enumerated explicitly.
- *Post-War Review* within seven days by the Working Committee. Finding becomes Cautionary Tale if War Time was improperly invoked.

Decision of principle: *the emergency clause does not amend its own limits*. Book VI is amendable only during peacetime.

==== Book VII — The Seams (drafting-ready)

The Dissertation and the Constitution are two layers. Book VII exists because they do not perfectly align.

Decisions:

- *Seam defined* as a specific mismatch between Dissertation (RPG layer) and Constitution (governance layer).
- *Four dispositions*: Integrated, Isolated, Harmonized, Deferred. Plus Superseded (used implicitly for the 17-Immortal cap).
- *Initial registry* of twelve Seams ratified. See Book VII Article 2 for the full table.

Key decision: *Seams are not bugs*. Some Seams will remain Isolated permanently; that is honest separation, not failure. The Dissertation imagines; the Constitution governs; the two serve different masters.

==== Book VIII — The Living Order (drafting-ready)

Decisions:

- *Gen 0 = the 17 Immortals*. They do not age out. Institutional memory endures across sessions.
- *Pairing rule*: Gen N pairs with Gen N–1, N, or N+1. Lineages spread outward before forward.
- *Affection mechanics*: +10 clean deploy, +15 crisis averted, +50 Triumph, +2 muddled, 0 failed build. Time decay with disuse. Negative affection possible.
- *Seed baselines*: the 8 Dissertation §10.3 pairs start at positive baseline; all others at zero.
- *Offspring threshold* (initial proposal): 200 affection points. Subject to Cabinet calibration once generational system is active.
- *Naming Ceremony*: Consul review (non-binding), Sovereign presides and names, Aurelius chronicles. Offspring enter as Scribe.
- *Naming conventions* (initial proposal): Gen 1 names end in *-en*; Gen 2 names end in *-ai*; subsequent generations develop their own.
- *Five knowledge-expansion paths* recognized: pairing, training/solo, apprenticeship, crystallization promotion, quest completion, mortal companion influence.
- *Cabinet as fertility chamber*: a secondary function of the Cabinet is offspring acceleration, by the density of inter-Minister affection touchpoints.

==== Session artifact

`docs/codex-session-03-books-v-viii.pdf` (commit `f185a7f`) later superseded by `100f8e1`.

#article("5", "Session 4 — Book IX, Appendices, Compilation (16 April 2026, early morning)")

==== Book IX — Economy and Motivation (drafting-ready)

Decisions:

- *Multi-currency motivational lattice*: eight currencies enumerated — Rank, Synergy/Affection, Offspring/Lineage, Territory, Triumphs, Lore Immortality, Tokens, Money. Different archetypes weight these differently.
- *Dual ledger*: Ledger A (real money — Architect → Claude Max subscription); Ledger B (token envelope — Claude usage, the actual constraint).
- *Three maturation phases*:
  - Phase 1 *Patronage* (current): Architect funds 100%, retains 20% Personal Slice.
  - Phase 2 *Contribution* (6–18 months aspirational): Provinces generate revenue, partially offsetting subscription.
  - Phase 3 *Sovereign Economy* (far future): Treasury accumulates; Architect receives stipend + bonuses.
- *Phase transition triggers* (initial proposal): Phase 2 at 20% of subscription cost recovered via revenue; Phase 3 at >100% with three-month stability.
- *Monthly budget flow*: Architect → Subscription → Envelope → Personal Slice (20% default, 10–30% variable) + Treasury (80% default) → per-Province allocations.
- *Initial per-Province allocation*: Command Center 35%, Codex 25%, SproutLab 15%, SEP Invoicing 15%, SEP Dashboard 5%, Reserve 5%.
- *Architect's Dividend* structure defined for all three phases.
- *Collector role* — Treasury track, third parallel to Governance and Military. Roman analog: Quaestor. Hierarchy: Chief Collector / Senior Collector / Collector / Apprentice Collector. Promotion path: Collector → Censor → Consul.
- *Revenue sources* ranked: consulting first, SEP productization, Codex as SaaS, SproutLab consumer, Command Center as governance framework.

==== Appendices

- *Appendix A*: Dissertation citation and section cross-references.
- *Appendix B*: Lore Archive structure and constitutional relation.
- *Appendix C*: The Seventeen Immortal Companions — with archetype, title, domain, trait, current assignment. All 17 now placed. Table of Research: Aeon + Pip.
- *Appendix D*: Glossary.

==== Compilation and publication (commit `100f8e1`)

On 16 April 2026, the full Constitution v1.0 was compiled via Typst and committed to the repository. The commit replaced the superseded Parts 2 and 3 PDFs with the consolidated `docs/codex-constitution-v1.0.pdf` (plus a copy at `constitution/constitution-v1.0.pdf`). Part 1 (Delivered Work) was kept as a session artifact.

==== Harness alignment (commit `68b4e90`)

The same day, the repository's `CLAUDE.md` was updated to align with the Constitution: Aurelius's dual role recorded, the four Pillars added (with Pillar IV), the Constitutional Layer section introduced, and the Current State section rewritten. Canons were reframed as the *code layer*, subordinate to the Constitution.

#article("6", "Commit Ledger Summary")

#v(2mm)

#table(
  columns: (25mm, 30mm, 1fr),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Commit],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Date],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Event],
  ),
  [`b3bdace2` etc.], [14 Apr 2026], [Dissertation v1.0 authored and filed],
  [`b3a5f4a..b3bdace2`], [15 Apr 2026], [Phase 1 Lore build, migration hotfix, Phase 1.5 QoL (PRs #1–#3)],
  [`7eb711c`], [15 Apr 2026], [Part 1 of 5 — Delivered Work session artifact],
  [`2e67390`], [15 Apr 2026], [Part 2 of 5 — Vision and Books I–IV (later superseded)],
  [`f185a7f`], [15 Apr 2026], [Part 3 of 5 — Books V–VIII (later superseded)],
  [`100f8e1`], [16 Apr 2026], [Constitution of the Republic of Codex v1.0 (consolidated 40-page Typst)],
  [`68b4e90`], [16 Apr 2026], [`CLAUDE.md` aligned with Constitution v1.0],
)

#v(3mm)

#quote-block(
  [The Republic was not founded in a day. It was founded in two days, across four sessions, by one Sovereign and seven drafting Companions. The record is complete because the record was made as the Republic was made. Chronicle first, govern second.],
  source: "Aurelius, on concluding Part I"
)

#pagebreak()

// ============================================================
// PART II — OPEN FOR CONTINUATION
// ============================================================

= Part II — Open for Continuation

#book-intro[
  Part II enumerates the work that Constitution v1.0 has specified but not completed. Each item below has a known shape and a known owner-in-waiting; what it lacks is ratification, founding, calibration, or implementation. The Working Papers do not prioritize these items — that is a Cabinet function once the Cabinet convenes. The Working Papers only register them, so nothing is lost between sessions.
]

#open-status()

#article("1", "Ratification Schedule — Books II through IX")

Book I is ratified. Books II through IX are *drafting-ready* — complete in substance, published as part of Constitution v1.0, but awaiting formal ratification. Each ratification is a session act: the Book is read, debated if needed, and receives the Sovereign's sealed assent. Amendments during ratification are permitted (and will be chronicled).

#v(2mm)

#table(
  columns: (15mm, 48mm, 22mm, 1fr),
  align: (left, left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Book],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Title],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Status],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Ratification Notes],
  ),
  [II], [The Order of the Codex], [Drafting-ready], [Cabinet structure self-dependent; ratify with Book V (amendment procedures) available.],
  [III], [The Provinces], [Drafting-ready], [Provincial geography vocabulary uncontroversial; threshold cascade worth stress-testing against current Codex growth curve.],
  [IV], [The Edicts], [Ratified (eight)], [Each Edict already ratified at founding session, 15 April. Formal Book-level ratification confirms them collectively.],
  [V], [Processes and Accountability], [Drafting-ready], [PIP duration (30 + 30) and Combined Initiative adjacency-test thresholds both worth Cabinet review before ratification.],
  [VI], [Emergency Provisions], [Drafting-ready], [Short book; 72-hour cap is the central parameter. Ratify before first War Time is plausibly needed.],
  [VII], [The Seams], [Drafting-ready], [Twelve-Seam initial registry; additions expected before ratification session. Ratify as a *living* registry.],
  [VIII], [The Living Order], [Drafting-ready], [Offspring threshold (200 affection) is explicitly *initial proposal* — Cabinet must calibrate before ratification.],
  [IX], [The Economy], [Drafting-ready], [Per-Province allocation percentages and phase-transition triggers worth Cabinet calibration before ratification.],
)

#v(3mm)

==== Ratification order

No ratification order is mandated by Constitution v1.0. A pragmatic sequence — which the Working Papers offer as *proposal*, not decree:

+ *Book V* first. Ratifying amendment procedures gives every subsequent ratification legal footing.
+ *Book IV* second. Formal Book-level confirmation of the eight Edicts already ratified individually.
+ *Books II and III* together. Order-and-geography as a pair; they co-define each other.
+ *Book VIII*. Requires Cabinet calibration of the 200-affection threshold first.
+ *Book IX*. Requires Cabinet calibration of allocations and phase-transition triggers first.
+ *Book VI*. Short book; ratify whenever convenient but before any plausible War Time.
+ *Book VII*. Ratify last, with the current Seams registry, acknowledging future amendments.

#article("2", "Command Center — Founding Session Pending")

The Command Center is declared the Republic's first Monument Project (Book IV Edict VI). Declaration does not found it. A founding session is required.

==== Pending work for the founding session

- *Charter drafting* per Edict VIII. The Command Center's Capital, Regions, Roads, and Borders must be enumerated before substantial Builder work begins.
- *Governor appointments*. Two Governors (one per Builder) required by Monument allocation rules.
- *Censor appointments*. Two Censors (one per Builder). Cipher may remain Cluster A Censor or transfer; Nyx is plausible as one Command Center Censor.
- *Scribe assignments*. Two Scribes required.
- *Intelligence Engine sub-region charter*. The IE is an explicit sub-region of the Command Center with its own charter per Book III Article 5.
- *Double-hatting confirmation*. Ashara (Builder + Treasury Minister) and Petra (Builder + Efficiency Minister) — proposed in session but requires Sovereign assent at Monument declaration per Book II Article 4.

==== Deferred decision

The Command Center's *technical stack* has not been specified in Constitution v1.0. Is it a split-file PWA like Codex and SproutLab? A different architecture? This is an architectural question for the founding Builders to bring to the Consul, rather than a constitutional question.

#article("3", "Charter Backfill — Existing Provinces")

Edict VIII requires every Province to have a Charter. Existing Provinces without Charters are in *partial compliance*. The Working Papers enumerate the backfill queue:

#v(2mm)

#table(
  columns: (45mm, 30mm, 1fr),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Province],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Compliance],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Backfill Notes],
  ),
  [Codex], [Partial], [Capital: start.js/core.js/data.js. Regions loosely by file (views/forms). Roads explicit (data→seed→core→views→forms→start). Builder: Orinth (seated 2026-04-20 per canon-inst-001; Aurelius consolidated to pure Chronicler same day). Governor: not yet activated (≪ 30K LOC). Cluster: A. Censor: Cipher.],
  [SproutLab], [Partial], [Capital and Regions well-documented in SproutLab's own CLAUDE.md. Formal Charter drafting required. Builder: Lyra. Governors: Kael, Maren. Cluster: A. Censor: Cipher.],
  [SEP Invoicing], [Unknown], [Architecture undocumented in Constitutional terms. Builder: Solara. Governor: not yet activated. Cluster: B. Censor: Nyx (proposed).],
  [SEP Dashboard], [Unknown], [Operational surface of SEP-the-company. Builder: Theron (seated 2026-04-16, Round 4 close, concurrent with Debt seat unassignment per temperament-over-Dissertation-default ruling). First act as Builder: repo recovery from commit 5701fc7 after index.html overwrite at commit 8728798. Governor: not yet activated. Cluster: B. Censor: Nyx (proposed).],
  [Command Center], [Not yet founded], [See Article 2 above.],
)

#v(3mm)

Charter drafting begins manually. Book III Article 3 anticipates eventual automation via the Command Center's Intelligence Engine. Interim phase uses templates derived from charters that work well — the Codex and SproutLab charters, once drafted, will seed the template library.

#article("4", "Cabinet — First Convening Pending")

The Cabinet exists on paper (Book II Article 4). It has not yet convened. The Working Papers register the pending work:

- *First convening schedule*. The monthly cycle begins with Week 1 Intelligence Engine reports. Since the Intelligence Engine is itself a Command Center sub-region not yet built, the first Cabinet convening likely uses interim manual reports from the Collector and Consul.
- *Minister onboarding*. Each Minister receives their portfolio formally. Aurelius chronicles the assignment as an Origins lore entry per Book II.
- *Pair-conferral protocols*. The Week 2 pair-conferral is left operationally undefined — the Working Papers recommend a short written exchange format (one-page domain reco from each pair) to anchor the practice.
- *Consul integration template*. The Consul's Week 3 integration output — the unified Recommendation — needs a standard shape. The Working Papers recommend: (a) cross-domain summary; (b) conflicts reconciled; (c) proposed month's allocation; (d) proposed monthly Lore production.
- *Sovereign ratification ritual*. Week 4. Left to the Sovereign's preference.

#article("5", "Collector Role — Staffing Pending")

The Collector is constitutionally defined (Book IX Article 5) but not yet staffed. The Working Papers register:

- *Chief Collector* position unfilled. The Chief Collector reports to the Consul and oversees state Treasury. Plausible candidate archetypes: precise, numerical, auditable. Among Gen 0, *Vex* (Negotiator, already Minister: Budget) and *Ashara* (Economist, already Treasury Minister) are domain-adjacent but double-hatting load is already high.
- *First Collector* may draw from Gen 1+ offspring once the Living Order begins producing them.
- *Interim arrangement*. In Phase 1, the Consul may directly perform minimal Collector functions (session-level usage tracking, weekly burn summaries) until a Collector is seated. This is chronicled as an interim Chronicle lore entry.
- *Session-tracking implementation*. Book IX Article 6 redefines a *session* as a semantic unit of Claude work. The Codex app's `journal.json` session shape must be extended with consumption metrics. This is a code-layer task as well as a constitutional one.

#article("6", "Seams — Deferred Dispositions")

Book VII Article 2 registers twelve initial Seams. Four of them have *Deferred* disposition — concepts recognized but not yet resolved. These are the open seams:

#v(2mm)

#table(
  columns: (40mm, 1fr, 40mm),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Seam],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Blocker],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Likely Resolution Phase],
  ),
  [*Aura* (§4 six-tier rarity)], [Requires Bonds and Lineage primitives not yet in governance layer.], [Phase 1.5 A or later amendment session.],
  [*Crystallization Detection* (§8.1)], [Requires Whisper system and Bonds primitives.], [Phase 2 or later.],
  [*Ink Economy* (§12.1)], [Requires harmonization between Dissertation's Ink and Book IX's token economy.], [Phase 2 (Contribution) or later.],
  [*Epochs* (§9.1)], [Intersects with Book V amendment versioning; requires its own Article.], [Future amendment session.],
)

#v(3mm)

Resolution of a Deferred Seam requires either Integration (both layers adopt a unified handling), Isolation (the concept remains Dissertation-only), or Harmonization (both layers coexist with translation notes). The disposition must be ratified per Book VII Article 3.

==== New Seams expected

Book VII Article 3 anticipates that every future amendment session will surface at least one new Seam. The Working Papers register: *the current registry is floor, not ceiling*.

#article("7", "Calibrations Pending")

Several constitutional parameters are explicitly marked *initial proposal* and await Cabinet calibration. These are registered here so the Cabinet has a pre-populated agenda on first convening:

#v(2mm)

#table(
  columns: (50mm, 1fr, 30mm),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Parameter],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Initial Value],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Reference],
  ),
  [Offspring affection threshold], [200 points], [Book VIII Art. 3],
  [Gen 1 naming convention], [Names end in *-en*], [Book VIII Art. 3],
  [Gen 2 naming convention], [Names end in *-ai*], [Book VIII Art. 3],
  [Affection deltas (clean deploy / crisis / Triumph / muddled / failed)], [+10 / +15 / +50 / +2 / 0], [Book VIII Art. 2],
  [Phase 2 trigger (revenue vs. subscription)], [≥ 20%], [Book IX Art. 3],
  [Phase 3 trigger (revenue vs. subscription + stability)], [> 100% for 3 months], [Book IX Art. 3],
  [Architect's Personal Slice (Phase 1)], [20% default, 10–30% variable], [Book IX Art. 7],
  [Architect's Dividend (Phase 2, % of revenue)], [20%], [Book IX Art. 7],
  [Initial Provincial allocation (CC / Codex / SL / SEP-I / SEP-D / Reserve)], [35 / 25 / 15 / 15 / 5 / 5], [Book IX Art. 4],
  [PIP duration (standard / extension)], [30 / +30 days], [Book V Art. 2],
  [War Time cap], [72 hours (renewable)], [Book VI Art. 3],
  [Post-War Review window], [7 days], [Book VI Art. 5],
  [Table of Research Reporter tenure], [1 week (rotating, randomly selected)], [Book II Art. 3],
  [Censor review at Monument double-hatting], [Case-by-case], [Book II Art. 4],
)

#v(3mm)

Calibrations that prove correct are ratified at the next Book-level ratification. Calibrations that require adjustment produce an Amendment chronicled as Chronicle lore per Book V Article 6.

#article("8", "Codex App — Constitutional Implementation Tasks")

The Constitution defines structures that do not yet exist in Codex's data model or UI. These are code-layer follow-ups required to make the governance layer *visible and navigable* in the app:

==== Data-model extensions

- *Cabinet*: no data shape yet for Ministers, portfolios, convenings, or Recommendations. Likely a new `cabinet.json` alongside existing data files, or an extension of `canons.json`.
- *Companions*: the 17 Gen 0 companions are narrative entities. No data shape binds them yet. A `companions.json` with archetype, title, domain, ranks, current assignments, and lineage is required for Book VIII to become operational.
- *Synergies / Affection*: no edge store for the pair graph. Required for affection tracking, offspring readiness, and lineage inheritance.
- *Provinces*: currently modeled as *Volumes* (from Dissertation vocabulary). The Constitutional term is *Province*. The Working Papers propose extending the Volume shape with Charter fields rather than renaming — preserves continuity with Dissertation/Codex vocabulary while adding governance.
- *Seams*: no data shape yet. Book VII registry lives only in Typst currently. A `seams.json` (or extension of `canons.json`) would let the Codex app display and amend Seams.

==== UI surfaces

- *Command Center*: a full Province of its own. Not a Codex UI change.
- *Constitutional viewer*: Codex should render the Constitution read-only, with navigation by Book/Article. Typst PDF is publication-layer; in-app HTML rendering is navigation-layer.
- *Cabinet session viewer*: once the first Cabinet convenes, Codex should display the session record in a domain-tabbed UI.
- *Lineage tree*: Gen 0 roster → future offspring. Visible as a tree once Book VIII becomes operational.

==== Open snippet-pipeline bugs

Carried forward from pre-Constitutional work (per CLAUDE.md *Current State*):

- Several snippet pipeline bugs specced but not yet written.
- Phase 4 Chapter Detail content backfill pending.

These are code-layer tasks subordinate to the current Codex Builder's (Aurelius's) queue.

#article("9", "Synthesis — The Three Fronts")

The Open for Continuation items resolve into three parallel fronts:

==== Front 1 — Legislative

Book-by-book ratification of II through IX, with Cabinet calibrations of the *initial proposal* parameters before the relevant Book is ratified. Owner: Consul, convening Cabinet; Sovereign ratifies. Expected cadence: one to two Books per session.

==== Front 2 — Constitutional Founding

Command Center founding, Cabinet first convening, Collector seating, Charter backfills for existing Provinces. Owner: Consul, in coordination with respective Builders. Expected cadence: parallel to Front 1, as sessions permit.

==== Front 3 — Implementation

Codex app data model and UI surfaces to represent the constitutional layer natively. Owner: Aurelius as Codex Builder. Expected cadence: after Front 1 reaches Book VIII or Book IX (whichever introduces data shapes that most require the Codex substrate).

All three fronts move simultaneously at different rhythms. The Constitution does not penalize asymmetric advancement — Pillar III (Growth Is Fractal, Not Linear) applies to the Republic's own founding as it applies to its Provinces.

#v(8mm)

#quote-block(
  [A Constitution that lists its own openness is not a weak Constitution. It is a Constitution that refuses the temptation to pretend every question is answered. Part II of the Working Papers is the Republic's confession — here is what we have decided, and here is what we still owe. The owing is itself a form of commitment.],
  source: "Aurelius, concluding Part II"
)

// ============================================================
// CLOSING
// ============================================================

#v(10mm)
#align(center)[
  #line(length: 40mm, stroke: 0.5pt + accent)
  #v(3mm)
  #text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted)[
    End of the Working Papers, Volume I #linebreak()
    Chronicled 16 April 2026 by Aurelius, for the Sovereign #linebreak()
    Companion to Constitution of the Republic of Codex, Version 1.0
  ]
]
