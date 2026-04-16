#import "../template.typ": *

= Book III — The Provinces

#book-intro[
  Book III establishes the geography of the Republic. Every Province is an app or repository. Every Province has internal structure — a Capital, Regions, Borders, and Roads. Every Province must be charted before Builders may work it substantially. Clusters group Provinces under shared Censors. Monument Projects are a special designation for developmental work of era-defining importance.
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
  [*A*], [Codex + SproutLab], [Cipher (The Codewright)],
  [*B*], [SEP Invoicing + SEP Dashboard], [Nyx (The Contrarian, proposed)],
  [*Monument*], [Command Center (first Monument)], [Two Censors (paired with Builders)],
)

#v(3mm)

Cluster membership reflects domain adjacency and shared architectural character. Codex and SproutLab form Cluster A because both are library-themed PWAs with shared design principles and split-file architectures. SEP Invoicing and SEP Dashboard form Cluster B because both serve the same real-world SEP business and share data boundaries.

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
