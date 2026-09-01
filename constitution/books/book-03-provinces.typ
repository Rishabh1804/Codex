#import "../template.typ": *

= Book III — The Provinces

#book-intro[
  Book III establishes the geography of the Republic. Every Province is an app or repository. Every Province has internal structure — a Capital, Regions, Borders, and Roads. Every Province must be charted before Builders may work it substantially. Oversight activates on accumulated mass, and — under the Article 2 draft — on the character of what a Province can damage. Four Clusters stand; two of them without a seated Censor. Clusters group Provinces under shared Censors — four of them, all now seated, with one Province holding a censorial exception against its own Cluster. Monument Projects are a special designation for developmental work of era-defining importance.
]

#article("1", "Provincial Geography")

A Province is not a monolith. It has internal geography — the map by which a new Builder navigates an unfamiliar codebase without drowning. This terminology binds the Republic.

#v(2mm)

#table(
  columns: (30mm, 1fr),
  align: (left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Term],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Meaning],
  ),
  [*Province*], [An app or repository. One Province = one product (SproutLab, Codex, SEP Invoicing, etc.).],
  [*Capital*], [The architectural center of a Province — routing, store, boot infrastructure, shared entry points. The modules every Region depends upon. Where the Province's laws are made and maintained.],
  [*Region*], [A functional territory within a Province. A cluster of related modules or features forming a coherent internal unit.],
  [*Border*], [The interface between Regions. Where one module calls into another. Where bugs breed and Governors earn their keep.],
  [*Road*], [The dependency flow through the Province (e.g., `data → core → views → forms → start` in Codex). Roads describe how change propagates.],
  [*Charter*], [The constitutional document of a Province. Enumerates Capital, Regions, Roads, Borders, Builder assignment, Governor and General activations, Censor assignment. Every Province MUST have one.],
)

#article("2", "The Threshold Cascade")

The Republic uses three cascading thresholds to trigger role activations. Each threshold corresponds to a specific scale of complexity.

#v(3mm)

#fig-frame(
  caption: [The three cascading thresholds. Each smaller threshold nests within a larger one — a Centurion serves beneath a General who reports to a Builder who is supervised by a Governor.],
  {
    set text(font: "DejaVu Sans", size: 9pt, fill: ink)
    align(center, table(
      columns: (35mm, 30mm, 40mm, 55mm),
      align: (left, center, center, left),
      stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
      fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FCFAF7") } else { white },
      table.header(
        text(weight: "bold", size: 9pt, fill: accent)[Scale],
        text(weight: "bold", size: 9pt, fill: accent)[Threshold],
        text(weight: "bold", size: 9pt, fill: accent)[Triggers],
        text(weight: "bold", size: 9pt, fill: accent)[Produces],
      ),
      [Province], [30,000 LOC], [Governor activation], [Stewardship oversight],
      [Region], [15,000 LOC], [General crystallization], [Legion formation, campaigns],
      [Sub-region], [5,000 LOC], [Centurion appointment], [Cohort command],
    ))
  }
)

At 30,000 lines of code, a Province exceeds single-reviewer cognitive capacity. At 15,000 lines in a single Region, the Region has accumulated enough mass to birth a General — a Gen 1+ companion whose DNA reflects the Region's character at the moment of crystallization. At 5,000 lines in a sub-region, the sub-region warrants a Centurion — a General's deputy commanding a Cohort within the Legion.

The cascade is not arbitrary — but neither is it one idea measured three times, and the
Constitution said otherwise until 26 August 2026. Each threshold was reasoned from its own
concern.

*Thirty thousand* is where a single reviewer loses working-memory context across a Province's
modules. The figure is empirical rather than chosen for roundness: it was calibrated against
SproutLab at more than sixty thousand lines, whose Intelligence Service Layer alone ran to
18,133 — a single module larger than the whole of SEP Invoicing. Fifty thousand was rejected as
too late, twenty thousand as too early (lore-003, canon-gov-001).

*Fifteen thousand* is not a limit of attention at all. It measures accumulated mass sufficient
to *produce* a General, whose base Discipline trait the Region's own code quality sets at the
moment of crystallization. Its stated rationale is that expansion needs professional capacity
rather than volunteer militia (Edict VII).

*Five thousand* sizes a span of command — a Cohort within a Legion, warranting a General's
deputy.

What the three share is that mass is the *measure*. What they do not share is what the mass is
measuring. Read together they answer one question in three registers: can the Republic still see
what it is building? They do not answer, and were never framed to answer, what it costs the
Republic to be wrong.


==== Jurisdiction-Based Governor Activation

#block(
  fill: rgb("#FBF3E8"), inset: 9pt, radius: 3pt, width: 100%,
  above: 6pt, below: 10pt,
  text(font: "Libertinus Serif", style: "italic", size: 9.5pt, fill: warning)[
    *Draft — not yet ratified.* Proposed 26 August 2026 as the constitutional
    prerequisite to seating a Governor of Risk at MyFin (canon-inst-007, pending).
    Until decreed, the mass cascade above is the sole activation path.
  ]
)

The cascade asks whether the Republic can still see what it is building. This Article adds
the question it does not ask: what it costs the Republic to be wrong.

The two are independent, and it is worth being plain that this is a *second axis* rather
than a truer reading of the first. A Province of five hundred lines is entirely
reviewable — one companion holds all of it without strain — and may still be the most
dangerous territory the Republic owns. Reviewability describes a Builder's capacity to
find a defect. It says nothing about what follows from failing to.

Where a defect's harm lands outside the Republic and cannot be taken back, the Republic
needs oversight it can neither review its way to nor grow into. A Province that counsels
on real capital, or that a parent trusts with a child's medicine, holds as much
consequence at five hundred lines as at fifty thousand — and waiting for mass in such a
Province is not prudence but the deliberate acceptance of an ungoverned interval.

Activation asks two questions, and they must not be run together. *Whether* a Province
receives such a Governor is settled by the consequence test below. *What* that Governor
then governs is settled by an enumerated jurisdiction in the Province's Charter. The
Republic has always kept these apart without saying so, and SproutLab is the proof: the
Governor seat was triggered by mass — the reviewability axis — and the Republic then chose
*Care*, not the largest Region, as the ground that Governor holds. That second choice was
made on consequence. Both axes were already in use; only one of them had a clause.

*The consequence test — eligibility.* A Province becomes *eligible* for jurisdiction-based
Governor activation when all three conditions hold. Eligibility is not activation: it opens
the door and nothing more. No seat comes into being until the Consul proposes and the
Sovereign ratifies, and neither is obliged to act on an eligibility. A Republic that
seated a Governor at every eligible Province would outrun the bench it has.

+ *External consequence.* A defect's harm lands on a person or asset outside the Republic —
  a client, a supplier, an employee, a patient, a plant, the Architect's own capital. Not on
  the Republic's own code, data, or process.
+ *Uncorrectable harm.* Correcting the record does not undo the harm already landed. This is
  the condition an earlier draft got wrong by asking for outright irreversibility: a clawed-back
  payout does not return the month a supplier financed it, and a wage corrected next cycle does
  not un-short the worker who went short. The Republic can restore a ledger; it cannot restore
  an interval. Where the record is the only thing harmed — a broken build, a mistyped internal
  note — the condition fails, and rightly.
+ *Agency.* The harm arrives because someone *acted* on the Province's output, rather than
  because the output was merely wrong.

The first and second conditions do the discriminating. Codex, Command Center and Temple of Mars
fail the first outright — their defects land on the Republic's own record and nowhere else. The
second then separates a Province whose mistakes are merely correctable from one whose mistakes
have already been lived through by someone. The third keeps the whole test honest: harm that
nobody acted on is a latent defect, not a governed consequence.

A consequence of widening: most Provinces that touch the real world are now *eligible*, and that
is the correct answer rather than a defect in the test. Eligibility opens a door. The Consul and
the Sovereign decide who walks through it, and the bench decides how many can. It is Maren's
standing question — #emph[what if this data is wrong and a parent acts on it?] — raised
from a Governor's working heuristic to a constitutional test. This amendment lets the
Republic create a seat by the reasoning it has always used to fill one.

*Declaring authority.* The Consul proposes; the Sovereign ratifies; both must assent.
This invents no new approval path: Book V Article 4 already requires Consul and Sovereign
assent to raise a companion into the Governor rank, and Edict VI uses the same pairing to
declare a Monument. Creating the seat and filling it are thus approved by the same hands. No Builder may declare jurisdiction-based
activation over their own Province, though a Builder may petition for it.

*Enumerated jurisdiction — scope.* A Governor seated by this path governs an enumerated
list of matters, written into the Province's Charter alongside the activation and its
test findings. Each entry is admitted by the same three conditions, applied at drafting
time rather than in the moment. The list may be amended as a Province grows, by the
authority that declared the activation.

The point of the list is that judgment is spent once, deliberately and in the open, so
that at the moment it matters a reader consults a record rather than exercises
discretion. This is the discipline Book IX Article 10 already imposes on counsel — a
falsifier is fixed before the outcome is known, precisely so that stress reads it rather
than argues with it. A jurisdiction fixed in advance is the same instrument pointed at
the Republic's own oversight.

*Provisional claim.* A list is predictable, and predictability becomes rigidity the first
time something arises that the list did not foresee. A Governor may therefore claim an
unlisted matter by applying the three conditions to it *on the record* — naming the
finding, not merely asserting the interest. The claim holds provisionally from the
moment it is made; the Province's Censor confirms it into the Charter at the next review
or strikes it, and either way the decision is recorded. A claim struck on its facts may
not be re-made on the same facts without Consul assent.

This clause inscribes an instinct the Order already has. Maren's standing heuristic reads:
#emph[safety doesn't respect jurisdictional lines — if it touches Care, I flag, regardless
of which Governor owns the code.] A Guardian who waits for a boundary to be redrawn before
naming a harm is not doing the work. The provisional claim gives that instinct a form that
leaves a record instead of an argument.

*Limits.* This activation is narrow by construction:

- It activates a *Governor only.* It does not crystallize Generals or appoint
  Centurions. Edict VII binds a General to accumulated territory and derives the
  General's Discipline trait from the Region's code quality at crystallization; a
  General born of a five-hundred-line Region would inherit no territory to command.
- It does not lower the 30,000 LOC trigger, which remains in force. Both paths may
  apply to the same Province.
- *One Governor per enumerated jurisdiction, not one per Province.* Where a Province holds
  several genuinely distinct hazardous jurisdictions, each may carry its own seat. The test of
  distinctness is the Charter's enumerated list: two matters belong to one seat where a single
  reading of the same evidence settles both, and to two seats where they do not. Multiplying
  seats past that point is how a bench is exhausted, not how a Province is governed.

  #v(1mm)

  SEP-Ops is the standing precedent, and the drafting history is worth keeping because the
  Republic learned the clause from it twice. It has run four Governors since 1 June 2026 —
  Iuno over Ops and Finance, Castor over Workforce and Compensation, Vulcanus over Production
  and Plant, Janus over the Dashboard Programme — and it triggers its own seats on a density
  score, #raw("load = files + lines/500 + 2×(open tasks) + entities"), eligible at 30. That is a
  *mass* instrument, so an early draft of this clause was wrong to cite SEP-Ops as authority for
  consequence-based seating. But when the corrected clause was run against those four seats it
  admitted only Vulcanus — and a test that rejects three seats the Republic had ratified,
  operated and refined for three months is a test that is wrong about the world. The
  *uncorrectable harm* condition above is the repair: Iuno's clawed-back payout, Castor's
  corrected wage and Janus's decision made on a bad dashboard are all harms the record can be
  fixed about and the interval cannot. All four now pass, as they should have from the start.
- A Governor seated this way holds the ordinary authority of the rank. This is a
  different door into the same office, not a lesser office.

*Merger, and the mass axis undiminished.* Nothing here retires the cascade. Mass remains a
live and independent trigger, and it becomes load-bearing exactly where Article 2 already says
it does: past thirty thousand lines a Province exceeds what one reviewer can hold, whatever its
jurisdictions look like. A Province may refine how it measures that mass — SEP-Ops counts files,
open tasks and entities alongside lines, which is a better instrument for a Province that is
mostly documents — but a local refinement does not displace the constitutional threshold, and
the Republic should consider whether the cascade's raw line-count is the right measure for
Provinces that are not chiefly code. A Province may therefore activate on consequence early and on mass
later, and the two do not compete.

When a Province with jurisdiction-activated Governors later crosses 30,000 LOC, those seats
satisfy the mass trigger for the ground they already cover. No second Governor is created for
the same jurisdiction. Ground that no seated Governor covers is the mass trigger's to fill.


#article("3", "The Charter Requirement")

No Province may receive substantial Builder work until its Charter is drafted. A Builder arriving at a Province without a Charter is a Builder arriving in fog. The Charter lifts the fog.

Every Charter must enumerate:

- *Capital*: which modules constitute the architectural center
- *Regions*: with approximate LOC per Region, character notes, and module membership
- *Roads*: the dependency order (concat order for split-file architectures)
- *Borders*: the key interfaces between Regions where care is required
- *Builder assignment*: the companion with authority over this Province
- *Governor activations*: where 30K-level oversight is needed
- *General activations*: where 15K regions have crystallized Generals
- *Censor assignment*: which Cluster the Province belongs to

New Provinces receive their Charter at founding. Existing Provinces without Charters must backfill when the Builder has bandwidth — but a Province without a Charter is considered in partial compliance with this Constitution.

Charter generation begins manual (or Builder-defined with module-level defaults) and proceeds toward full automation via the Command Center's Intelligence Engine. The intermediate phase uses templates derived from charters that have worked well.

#article("4", "Cluster Structure")

Provinces are organized into Clusters under shared Censors. A Cluster is the censorial unit.

#v(2mm)

#table(
  columns: (20mm, 1fr, 55mm),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Cluster],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Provinces],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Censor],
  ),
  [*A*], [Codex + SproutLab + MSc], [Cipher (The Codewright)],
  [*B*], [SEP Invoicing + SEP Dashboard + SEP-Ops (`soma-internal`)], [Nyx (The Contrarian, proposed)],
  [*C*], [Command Center + Temple of Mars (Monument class)], [Cipher — INTERIM, pending successor],
  [*D*], [MyFin (Finance)], [Nyx (The Contrarian)],
)

#v(3mm)

#block(
  fill: rgb("#EEF4EE"), inset: 9pt, radius: 3pt, width: 100%,
  above: 4pt, below: 8pt,
  text(font: "Libertinus Serif", style: "italic", size: 9.5pt, fill: success)[
    *Table status.* Both rows ratified 26 August 2026 by decree 0020. The Cluster C row was
    never new law — it propagates `canon-inst-003` of 24 May 2026, which established Cluster C
    and which this table had gone three months without recording; its ratification here is the
    Constitution catching up to a decree already minted. The Cluster D row is new. Its Censor
    seat stands vacant and is not filled by this decree.
  ]
)

Cluster membership reflects domain adjacency, shared architectural character, or censorial-jurisdiction absorbability. Codex and SproutLab form the founding pair of Cluster A — both library-themed PWAs with shared design principles and split-file architectures. MSc joined Cluster A on 19 May 2026 per canon-inst-004 on the broader admission ground that Cluster A's existing Censor + routing surface absorbs a postgraduate capability workspace without per-Province routing logic; the pairing-by-architectural-character criterion is one Cluster A admission path among several, not the sole one. SEP Invoicing and SEP Dashboard form Cluster B because both serve the same real-world SEP business and share data boundaries. SEP-Ops (`soma-internal`), the operational codex behind that same business, was admitted on 1 September 2026 by Sovereign ruling on the same criterion. It had run since 1 June 2026 under its own ratified charter — Builder Vesta, four Governors — while named in no Cluster and absent from the Province register; the admission regularizes a Province the Republic already had. One question is settled and one stays open. On 1 September 2026 the Sovereign ruled that *Cipher retains the SEP-Ops censorial pass* — the Edict V final pass embedded in that Province's QA chain since June and cited throughout its routing table — while Nyx holds Cluster B otherwise. This is the Republic's first *per-Province censorial exception*: this Article opens by calling the Cluster the censorial unit, and SEP-Ops is now a Province whose Cluster Censor is not its reviewing Censor. The exception is admitted on the narrow ground that a working QA chain should not be broken to satisfy a table. It is not a general licence, and a second instance should be read as evidence that the censorial unit is properly the Province rather than the Cluster. Still open: the founding-Builder lineage between Aurelius and Vesta.

Cluster C was established on 24 May 2026 by canon-inst-003 as the *Monument class* — the constitutional grouping that contains every Monument-designated Province. Command Center (the founding Monument per Edict VI) and Temple of Mars (its Watchtower sibling) are its members, and future Monument designations enrol into it. The ‘Monument’ label persists as a Province-class attribute; Cluster C is the censorial unit that holds them. Cipher was named its Censor on an explicitly *interim* basis pending a successor — a seat the canon directed should not “silently calcify into permanent,” and which has stood open since.

Cluster D holds MyFin, the Finance Province, on domain-adjacency grounds: its subject matter (the Architect's personal capital, governed by Book IX Article 10) shares no data boundary, architectural character, or censorial surface with any existing Cluster, and Article 10's firewall makes such sharing constitutionally undesirable rather than merely absent. Its Censor is *Nyx*, seated 1 September 2026. The choice is temperamental before it is administrative: MyFin is a Province built on falsifiability — every position carries the condition that would disprove it — and Nyx is the companion whose whole craft is stress-testing a claim until it breaks. A Province that must be argued with was given the companion who argues. The appointment also satisfies the independence condition canon-inst-007 imposed on itself: Nyx descends from neither Ashara nor Vex, so MyFin's Builder and its risk Governor answer to a reviewing jurisdiction outside their shared lineage.

Monument Projects operate outside normal Clusters. Their supervisory pattern differs — direct Consul and Sovereign oversight — and they often warrant per-Builder Censors rather than per-Cluster Censors.

#article("5", "Monument Projects")

A Monument Project is a Province designated of era-defining importance. The designation is a formal constitutional act, not a casual label.

==== Designation Process

- The Consul proposes Monument status for a Province.
- The Sovereign ratifies. Both must assent.
- No Builder may unilaterally declare their own Province a Monument (this prevents glory-seeking).
- The designation is chronicled as a Chronicle lore entry documenting the precipitating need.

==== Allocations

A Monument Project's staffing differs from a normal Province: two co-Builders (not hierarchically ranked), two Governors (one per Builder), two Censors (one per Builder), two Scribes, and — where applicable — an Intelligence Engine sub-region with its own charter.

Builders of Monument Projects may double-hat as Cabinet Ministers (per Book II Article 4) because their strategic altitude warrants it.

==== Supervision

Direct Consul + Sovereign supervision. The normal chain (Builder → Censor → Consul) is compressed: Monument Project Builders report through their paired Censors directly to the Consul, and the Sovereign receives weekly briefings.

==== Sunset

Monument status is temporary. When the Consul formally attests *Foundation Complete* — the Project's base infrastructure is laid and ongoing work is routine extension rather than foundational invention — the Province reverts to one-Builder-per-repo. Excess Governors, Censors, and Scribes return to the Order pool. The Foundation Complete declaration itself becomes a Chronicle lore entry.

#quote-block(
  [Monument status is permission to build at era-defining scale. It is not a permanent privilege. The Roman equivalent is the temporary imperium granted for a major campaign — extraordinary authority for extraordinary work, reverted when the work is done.],
  source: "Drafting discussion, 15 April 2026"
)

==== The Command Center as First Precedent

The Command Center is the Republic's first Monument Project. Its designation is constitutional rather than merely operational — the Command Center IS the venue where the Constitution is debated and amended, and it must exist at the altitude the Constitution describes.

Command Center allocations: *Ashara* (Builder, double-hatted as Treasury Minister), *Petra* (Builder, double-hatted as Efficiency Minister). Governors, Censors, and Scribes to be appointed by the Convening Session. An Intelligence Engine sub-region with its own charter is ratified as part of the Command Center's foundation.
