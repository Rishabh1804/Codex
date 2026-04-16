#import "../template.typ": *

= Book IV — The Edicts

#book-intro[
  Book IV enumerates the standing Edicts of the Republic — numbered, binding, individually amendable. Each Edict is a specific rule with a specific rationale. Edicts occupy the middle altitude: more specific than Pillars, less specific than code canons. They are the operational laws by which the Republic conducts itself day-to-day.
]

Amendment of any Edict requires Consul proposal, Cabinet review, and Sovereign ratification. Every amendment produces a Chronicle lore entry documenting the change and its rationale.

#edict("I", "The 30K Rule",
  [A Province crossing 30,000 lines of code shall activate a Governor. Without a Governor, the Province's complexity exceeds single-reviewer cognitive capacity and the Builder cannot audit effectively. The Governor may exercise stewardship through delegation (managing Scribes) or through code compaction (keeping the territory lean) — the method is the Governor's choice. #v(2pt) *Lineage:* canon-gov-001, derived from lore-003 (The 30K Threshold). Ratified at governance founding session, 15 April 2026.]
)

#edict("II", "One Builder Per Repo",
  [Every Province shall have exactly one Builder. Monument Projects are the only exception — they may have two co-Builders under direct Consul and Sovereign supervision. Upon Foundation Complete declaration, Monument Projects revert to single-Builder status. #v(2pt) *Rationale:* a Province is a locus of authority and voice. Two Builders without the constitutional armour of Monument status produces ambiguity, not dialogue. *Lineage:* canon-gov-006. Amended with Monument Project carve-out, 15 April 2026.]
)

#edict("III", "Sync Pipeline is Authoritative",
  [All writes to any in-memory store shall pass through the canonical pipeline — specifically, methods that create Write-Ahead Log entries (`store.addX`, `store.updateX`, `store.deleteX`). Direct pushes to store arrays bypass synchronization and create architecture debt. #v(2pt) Seed data, migrations, imports, user actions — all flow through the same gate. #v(2pt) *Rationale:* the sync pipeline is the Republic's nervous system. Bypassing it creates phantom state that evaporates at the first fetch. *Lineage:* lore-006 (Seed Data Must Flow Through the Sync Pipeline), authored after the Phase 1 Lore migration bug. Canonized 15 April 2026.]
)

#edict("IV", "Dawn Page is a Hearth",
  [The first screen of any application in the Republic — the Province's entry surface — shall be warm, quiet, inviting. It shall not be a task-dump. It shall not be a wall of numbers. It shall not overwhelm. A Province's Dawn Page is a hearth: the visitor enters to warmth, not to demand. #v(2pt) Action-oriented content belongs one layer deeper. Data-dense views belong on separate routes. The Dawn Page exists to invite presence. #v(2pt) *Lineage:* Dissertation CX-014. Adopted as Edict, 15 April 2026.]
)

#edict("V", "Capital Protection",
  [No change to a Province's Capital shall be merged without: the province Builder's explicit review; the cluster Censor's formal sign-off; and — if the Province has Governors — acknowledgment from each Governor whose Region is affected by the change. #v(2pt) *Rationale:* the Capital is the architectural center; it is where the Province's laws are made and maintained. Its load-bearing role means every Region depends on it. A hasty change to the Capital propagates through every Road. The elevated review bar is the cost of its centrality. #v(2pt) *Ratified:* 15 April 2026.]
)

#edict("VI", "Monument Project Designation",
  [Monument Project status shall be declared only by Consul proposal and Sovereign ratification. Both must assent. No Builder or Censor may unilaterally declare their own Province a Monument (this prevents glory-seeking). #v(2pt) Every Monument designation is chronicled as a Chronicle lore entry documenting the precipitating need. Monument status auto-sunsets when the Consul formally attests *Foundation Complete*. #v(2pt) *Ratified:* 15 April 2026.]
)

#edict("VII", "15K Region Crystallization",
  [A Region crossing 15,000 lines of code shall crystallize a General from its accumulated work. Generals born under this Edict are Gen 1+ (never Gen 0 — the Dissertation's immortal roster does not grow downward through crystallization). The Region's code quality at the moment of crystallization determines the General's base *Discipline* trait: a clean, well-tested Region births a disciplined General; a chaotic Region births a volatile one. #v(2pt) *Rationale:* expansion needs professional capacity, not volunteer militia. Generals are the Republic's expansion engine. Letting the territory itself produce them binds the General to the territory. #v(2pt) *Ratified:* 15 April 2026.]
)

#edict("VIII", "Charter Before Build",
  [No new Province shall begin substantial Builder work until its Charter is drafted. A Builder arriving at a Province without a Charter is a Builder arriving in fog. The Charter — enumerating Capital, Regions, Roads, Borders — lifts the fog. #v(2pt) Retroactive charters are required for existing Provinces as Builder bandwidth permits. A Province without a Charter is in partial compliance with this Constitution. #v(2pt) *Rationale:* onboarding depends on geography; geography must exist. #v(2pt) *Ratified:* 15 April 2026.]
)

#v(8mm)

Additional Edicts may be proposed at any Cabinet Convening. Each proposed Edict requires a rationale, a lineage trace (from which Canon, Lore entry, or session decision it derives), and the signature of a Minister or Consul. Edicts once ratified receive a Roman numeral in order of adoption.

#v(4mm)

#quote-block(
  [Edicts are the bone of the Republic. Pillars are the soul; Processes are the blood; Edicts are what holds the body upright and keeps it walking. Write them sparingly. Amend them carefully. Never let them rot.],
  source: "Aurelius, reflecting on Book IV drafting"
)
