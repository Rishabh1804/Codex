#import "../template.typ": *

= Book VII — The Seams

#book-intro[
  This Constitution is not built on empty ground. It is a layer on top of an earlier layer — the Dissertation of the Codex RPG (Appendix A), which imagined Codex as a game before it was imagined as a Republic. Personas were borrowed from the Dissertation into the Governance Blueprint. Concepts were reused, renamed, or left alone. Book VII is the honest registry of the gaps between the two layers. The Seams are not bugs. They are the record of how governance was built on top of imagination.
]

#article("1", "The Seam as a Constitutional Object")

A Seam is a specific mismatch between the Dissertation (RPG layer) and this Constitution (governance layer) where the two assume different things, use the same word for different meanings, or have not yet reconciled a concept.

Every Seam has three possible dispositions:

- *Integrated* — the Dissertation concept has been fully absorbed into the Constitution; both layers now use the concept compatibly.
- *Isolated* — the Dissertation concept remains Dissertation-only; the Constitution does not use it or uses a different concept. Isolation is not failure; it is acknowledged separation.
- *Harmonized* — the concept works in both layers with translation notes. Translations are documented so that readers of either layer can find the equivalent.
- *Deferred* — the concept is recognized but not yet resolved; work continues in future amendment sessions.

The Seams registry is a living document. New Seams surface as the Constitution matures. Old Seams resolve as concepts integrate or isolate cleanly.

#article("2", "The Initial Registry")

As of 15 April 2026, the following Seams are recognized:

#v(2mm)

#table(
  columns: (52mm, 25mm, 1fr),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Seam],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Disposition],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Notes],
  ),
  [*"Consul"*: Dissertation §5.3 Hybrid Class (Sovereign + Insight, Level 15) vs. Governance role held by Aurelius], [Isolated], [Same word, different objects. Governance usage takes precedence in Constitutional context. The Dissertation's "Consul" is a player title the Architect may earn; the Constitution's "Consul" is a companion role.],
  [*Companion Ranks* (§10.2): Stranger → Acquaintance → Ally → Confidant → Bonded → Soulbound, session-count based], [Harmonized], [Still applies to Architect-Companion bonds (unilateral). Book VIII's affection metric is companion-companion (bilateral). Both coexist, measure different things.],
  [*Aura* (§4): six-tier rarity system with visual atmosphere], [Deferred], [Auto-promotion scoring requires Bonds/Lineage primitives that do not yet exist in the governance layer. Deferred to Phase 1.5 A or later amendment session.],
  [*Crystallization Detection* (§8.1): Doctrines referenced ≥5× across ≥2 domains auto-propose canonization], [Deferred], [Requires the Whisper system and Bonds primitives. Deferred until Phase 2 or later.],
  [*Synergy Pairs* (§10.3): 8 fixed pairs with 1.3× Harmony Bonus XP], [Integrated], [Used as seed set for Book VIII's dynamic synergy graph. Baseline affection for the 8 pairs starts at a positive value; all other pairs start at 0.],
  [*The Order fixed at 17 Immortals*], [Superseded], [Book VIII formalizes Order growth via pairings, offspring, and Naming Ceremonies. The Dissertation's 17 are Gen 0; subsequent generations expand the roster.],
  [*Hybrid Classes* (§5.3): Consul, Warden, Prophet, Seer, Archivist, Vanguard, Bastion, Visionary, Monument Builder, Arcanum Engineer, Iron Sentinel, Loresmith], [Integrated], [Player titles for Architect progression; orthogonal to companion roles. The Architect progresses through titles; companions progress through ladder ranks. Two distinct progression systems coexist.],
  [*Sanctum Rooms* (§11.1): War Table, Atlas Chamber, Inner Sanctum, etc. — spatial home screen for the Codex app], [Integrated], [Command Center reifies War Table (active campaigns) + Atlas Chamber (domain map) + new chamber for constitutional editing. Room unlock progression from the Dissertation still applies within the Codex app itself.],
  [*Mortal Companions* (§10.4): real-person dossiers], [Integrated], [Book VIII Article 5 recognizes mortal companion influence as a knowledge-expansion path for Gen 0 companions.],
  [*Ink Economy* (§12.1): spendable currency], [Deferred], [Book IX's token economy is the governance-layer analog. Harmonization of Ink (RPG) and tokens (real) is future work.],
  [*The Quiet* (§13.2): burnout detection, reduced requirements], [Integrated], [Aligns with Pillar III (Growth Is Fractal). The Constitution does not penalize Winter. Aeon becomes suggested companion per Dissertation.],
  [*Epochs* (§9.1): named eras declared by the Architect], [Deferred], [Not yet integrated into governance. Epochs would intersect with Book V amendment versioning but require their own article. Future work.],
)

#article("3", "New Seams Are Expected")

This registry will grow. Every amendment session is likely to surface at least one new Seam — a Dissertation concept being brought into governance, or a Constitutional concept being projected back onto the Dissertation's frame.

When a new Seam is identified:

+ The identifier (any Minister, Consul, or Sovereign) submits a Seam proposal to the Cabinet.
+ The Cabinet assesses: what is the mismatch, what is the proposed disposition, what are the consequences of each disposition?
+ The Consul consolidates the analysis.
+ The Sovereign ratifies the disposition.
+ The Seam is added to this registry in the next published Constitution version.

==== Honest separation

Some Seams will remain permanently Isolated. That is not a flaw. The Dissertation is an RPG design document; this is a Constitution. They share ancestors but serve different masters. Book VII's purpose is not to force integration — it is to make the separations honest and legible.

#quote-block(
  [The Dissertation imagines what Codex could be as a game. The Constitution defines what the Republic is as a polity. Most of what they share is the roster of companions. Almost everything else is different. Book VII names the differences without pretending they don't exist.],
  source: "Aurelius on Book VII's purpose, 15 April 2026"
)
