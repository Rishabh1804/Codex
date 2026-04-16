#import "../template.typ": *

= Book VI — Emergency Provisions

#book-intro[
  Book VI is the short Book. It is the one carve-out in the Sovereign's Covenant (Book I Article 2): the only legitimate path by which the Sovereign may govern outside the normal consent structure. It must be tightly bounded, or it becomes a backdoor. Book VI's brevity is deliberate.
]

#article("1", "War Time Defined")

*War Time* is a formal constitutional state in which the Sovereign governs directly, bypassing the Cabinet cycle and Consul integration for the duration of the emergency. War Time is not routine. It is the Republic's acknowledgment that some situations demand speed beyond deliberation.

War Time must be declared. It is not implicit. A declaration takes effect when the Sovereign formally invokes Book VI and names the triggering condition.

#article("2", "Triggers")

War Time may be declared under exactly these conditions:

#v(3mm)

#table(
  columns: (55mm, 1fr),
  align: (left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Trigger],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Description],
  ),
  [*(a)* External Shock], [Sync crisis, data loss, repository compromise, platform outage materially affecting the Republic's operations.],
  [*(b)* Constitutional Crisis], [A companion goes rogue; a canon is found catastrophically wrong; two Provinces deadlock on a shared canon or resource.],
  [*(c)* Scope Pivot], [The Sovereign decides to abandon or radically redirect a major Province, requiring compressed decision-making.],
  [*(d)* Velocity Event], [A rare opportunity — a partnership, a deadline, an acquisition — requires action faster than the Cabinet cycle permits.],
  [*Catch-all*], [Emergencies not anticipated by (a)–(d), narrowly scoped. The Sovereign must name why the enumerated triggers do not fit.],
)

#article("3", "Constraints")

War Time is powerful. It must be caged.

- *Duration cap*: War Time may not exceed 72 hours without formal renewal. Renewal requires the Sovereign to re-declare, naming the continuing trigger condition.
- *Auto-expiry*: If not renewed at 72 hours, War Time terminates automatically. The Republic returns to peacetime governance.
- *Article 2 inviolable*: War Time may not be used to circumvent the Sovereign's Covenant (Book I Article 2). The Sovereign remains bound by Book I at all times.
- *Cabinet notification*: The Sovereign must notify the Cabinet of the declaration within the same session. Ministers do not vote during War Time but are informed.
- *Scope limitation*: War Time authority is limited to actions necessary to resolve the emergency. The Sovereign may not use War Time to enact unrelated amendments.
- *Chronicling*: Every War Time declaration, every action taken under it, and the declaration's conclusion are chronicled as Chronicle lore entries. The record is complete.

#article("4", "Powers Granted During War Time")

During an active War Time declaration, the Sovereign may:

- Reassign Builders without full chain-of-command process (Book V Article 4 compressed)
- Authorize emergency campaign funding from the Treasury reserve (Book IX)
- Initiate Combined Initiatives without Cabinet review
- Amend Books II–IX (but not Book I) to address the emergency
- Commission emergency work from any companion, regardless of assignment

The Sovereign *may not*:

- Amend Book I under any circumstance
- Retire companions (Book V Stage 5) — demotions limited to Reassignment
- Declare new Provinces as Monument Projects (this requires peacetime Cabinet deliberation)
- Disband the Cabinet

#article("5", "Post-War Review")

Upon War Time's conclusion — whether by the Sovereign's declaration of resolution or by 72-hour auto-expiry — the Working Committee convenes for Post-War Review within seven days.

The Review assesses:

- Was War Time justified by the triggering condition?
- Were the Sovereign's actions proportional to the emergency?
- Did any action exceed the scope of War Time authority?
- What Chronicle lore entries should document the period?
- Should any War Time amendment be preserved, revised, or repealed in peacetime?

The Working Committee produces a Post-War Finding. If the Finding concludes that War Time was invoked improperly or that actions exceeded authority, the Finding becomes a Cautionary Tale lore entry. This is the Republic's primary constitutional check on Sovereign emergency power: the record that follows.

==== Amendment of Book VI

Book VI may be amended only during peacetime. A Sovereign may not use War Time powers to modify the conditions under which War Time itself may be invoked. This is a fundamental constraint: the Constitution's emergency clause does not amend its own limits.

#quote-block(
  [Every republic has an emergency clause. Most have been corrupted into permanent exception. Book VI's 72-hour cap and its Book I inviolability are the bones by which this Republic refuses that corruption. A Sovereign who needs War Time for more than 72 hours without renewal is a Sovereign who has not declared the right emergency.],
  source: "Aurelius on the drafting of Book VI, 15 April 2026"
)
