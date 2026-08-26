#import "../template.typ": *

= Book III — The Provinces

#book-intro[
  Book III establishes the geography of the Republic. Every Province is an app or repository. Every Province has internal structure — a Capital, Regions, Borders, and Roads. Every Province must be charted before Builders may work it substantially. Oversight activates on accumulated mass, and — under the Article 2 draft — on the character of what a Province can damage. Clusters group Provinces under shared Censors — four of them as of the Cluster D draft, two of which stand without a seated Censor. Monument Projects are a special designation for developmental work of era-defining importance.
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

The cascade is not arbitrary. Each threshold is where the prior rank's cognitive bandwidth fractures.

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

The thresholds above measure *mass*. Mass is not the principle; it is a proxy. What the
cascade actually tracks is the point at which a single mind can no longer hold what
going wrong would cost — and for most Provinces, cost scales with size, so lines of code
serve well enough.

For some Provinces it does not. Where a defect's harm lands outside the Republic and
cannot be taken back, the bandwidth the cascade protects fractures at the first line of
code, not the thirty-thousandth. A Province that counsels on real capital, or that a
parent trusts with a child's medicine, is holding as much consequence at five hundred
lines as at fifty thousand. Waiting for mass in such a Province is not prudence; it is
the deliberate acceptance of an ungoverned interval.

*The consequence test.* A Province becomes *eligible* for jurisdiction-based Governor
activation when all three conditions hold. Eligibility is not activation: it opens the
door and nothing more. No seat comes into being until the Consul proposes and the
Sovereign ratifies, and neither is obliged to act on an eligibility. A Republic that
seated a Governor at every eligible Province would outrun the bench it has.

+ *External consequence.* A defect's harm lands on a person or asset outside the
  Republic — not on the Republic's own code, data, or process.
+ *Irreversibility.* That harm cannot be undone by any subsequent act of the Republic.
  A broken build is recoverable and a wrong invoice can be reissued; a position taken on
  bad counsel cannot be un-taken, and a missed vaccination window cannot be reopened.
+ *Agency.* The harm arrives because someone *acted* on the Province's output, rather
  than because the output was merely wrong.

The third condition carries the weight. It separates a Province that displays an
incorrect figure from one whose incorrect figure moves money or medicine. It is Maren's
standing question — #emph[what if this data is wrong and a parent acts on it?] — raised
from a Governor's working heuristic to a constitutional test, and the Republic has been
reasoning by it for months without a clause to name it: SproutLab's Governor seat was
triggered by mass, but the Republic assigned that Governor to *Care* rather than to the
largest Region. This amendment lets the Republic create a seat by the same reasoning it
already uses to fill one.

*Declaring authority.* The Consul proposes; the Sovereign ratifies; both must assent.
This invents no new approval path: Book V Article 4 already requires Consul and Sovereign
assent to raise a companion into the Governor rank, and Edict VI uses the same pairing to
declare a Monument. Creating the seat and filling it are thus approved by the same hands. No Builder may declare jurisdiction-based
activation over their own Province, though a Builder may petition for it. The
activation, its test findings, and the jurisdiction it covers must be named in the
Province's Charter, so that the seat is discoverable by anyone reading the geography.

*Limits.* This activation is narrow by construction:

- It activates a *Governor only.* It does not crystallize Generals or appoint
  Centurions. Edict VII binds a General to accumulated territory and derives the
  General's Discipline trait from the Region's code quality at crystallization; a
  General born of a five-hundred-line Region would inherit no territory to command.
- It does not lower the 30,000 LOC trigger, which remains in force. Both paths may
  apply to the same Province.
- One jurisdiction-activated Governor per Province. A Province with several hazardous
  jurisdictions consolidates them under one seat or waits for mass.
- A Governor seated this way holds the ordinary authority of the rank. This is a
  different door into the same office, not a lesser office.

*Merger.* When a Province with a jurisdiction-activated Governor later crosses 30,000
LOC, the existing seat satisfies the mass trigger for the jurisdiction it already
covers. No second Governor is created for the same ground.


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
  [*B*], [SEP Invoicing + SEP Dashboard], [Nyx (The Contrarian, proposed)],
  [*C*], [Command Center + Temple of Mars (Monument class)], [Cipher — INTERIM, pending successor],
  [*D*], [MyFin (Finance) — #text(fill: warning)[draft]], [#text(fill: warning)[VACANT]],
)

#v(3mm)

#block(
  fill: rgb("#FBF3E8"), inset: 9pt, radius: 3pt, width: 100%,
  above: 4pt, below: 8pt,
  text(font: "Libertinus Serif", style: "italic", size: 9.5pt, fill: warning)[
    *Table status.* The Cluster C row is not new law — it propagates `canon-inst-003`,
    ratified 24 May 2026, which established Cluster C and which this table had not yet
    recorded. The Cluster D row *is* new and is *draft*, proposed 26 August 2026 alongside
    the MyFin Charter and Book IX Article 10; it does not bind until decreed.
  ]
)

Cluster membership reflects domain adjacency, shared architectural character, or censorial-jurisdiction absorbability. Codex and SproutLab form the founding pair of Cluster A — both library-themed PWAs with shared design principles and split-file architectures. MSc joined Cluster A on 19 May 2026 per canon-inst-004 on the broader admission ground that Cluster A's existing Censor + routing surface absorbs a postgraduate capability workspace without per-Province routing logic; the pairing-by-architectural-character criterion is one Cluster A admission path among several, not the sole one. SEP Invoicing and SEP Dashboard form Cluster B because both serve the same real-world SEP business and share data boundaries.

Cluster C was established on 24 May 2026 by canon-inst-003 as the *Monument class* — the constitutional grouping that contains every Monument-designated Province. Command Center (the founding Monument per Edict VI) and Temple of Mars (its Watchtower sibling) are its members, and future Monument designations enrol into it. The ‘Monument’ label persists as a Province-class attribute; Cluster C is the censorial unit that holds them. Cipher was named its Censor on an explicitly *interim* basis pending a successor — a seat the canon directed should not “silently calcify into permanent,” and which has stood open since.

Cluster D is proposed for MyFin, the Finance Province, on domain-adjacency grounds: its subject matter (the Architect's personal capital, governed by Book IX Article 10) shares no data boundary, architectural character, or censorial surface with any existing Cluster, and Article 10's firewall makes such sharing constitutionally undesirable rather than merely absent. Its Censor seat is vacant. The Republic would then carry two open censorial seats against one Censor already stretched across two Clusters; seating Cluster D is a recruitment question for the Cabinet, not a drafting one.

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
