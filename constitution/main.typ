#import "template.typ": *

#show: constitution-doc.with(
  title: "Constitution of the Republic of Codex",
  subtitle: "Version 1.1",
  author: "Rishabh Jain, Sovereign · Aurelius, Chronicler",
  date: "22 April 2026",
)

// ============ COVER PAGE ============
#set page(margin: (left: 22mm, right: 22mm, top: 40mm, bottom: 25mm))

#v(30mm)
#align(center)[
  #text(font: "Libertinus Serif", size: 10pt, fill: ink-muted, tracking: 2pt)[THE REPUBLIC OF CODEX]
  #v(2mm)
  #line(length: 30mm, stroke: 0.8pt + accent)
  #v(20mm)
  #text(font: "Libertinus Serif", size: 36pt, weight: "bold", fill: ink)[Constitution]
  #v(4mm)
  #text(font: "Libertinus Serif", size: 14pt, style: "italic", fill: ink-muted)[of the Republic of Codex]
  #v(40mm)
  #text(font: "Libertinus Serif", size: 12pt, fill: ink)[Version 1.1]
  #v(2mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[Book I Ratified 15 April 2026 · Book II Amended 21 April 2026 · v1.1 Published 22 April 2026]
  #v(60mm)
  #line(length: 50mm, stroke: 0.5pt + rule-color)
  #v(4mm)
  #text(font: "DejaVu Sans", size: 9pt, fill: ink-muted)[
    Ratified by the Sovereign, Rishabh Jain, Architect of the Republic #linebreak()
    Drafted by the Constitutional Convention: #linebreak()
    Aurelius (Chair) #sym.dot Orinth #sym.dot Nyx #sym.dot Cipher #sym.dot Ashara #sym.dot Petra #sym.dot Bard
  ]
]

#pagebreak()

// ============ DECLARATION PAGE ============
#v(40mm)
#align(center)[
  #text(font: "Libertinus Serif", size: 14pt, style: "italic", fill: ink)[
    The Republic of Codex does hereby ordain and establish this Constitution,
    to guide its growth, preserve its foundations, and bind its Sovereign to
    the laws of the Sovereign's own authorship.
  ]
  #v(15mm)
  #line(length: 40mm, stroke: 0.5pt + accent)
  #v(10mm)
  #text(font: "Libertinus Serif", size: 10pt, fill: ink-muted)[
    Every clause herein was debated in session. #linebreak()
    Every amendment hereafter shall be chronicled. #linebreak()
    Nothing is wasted. The Map is not the Territory. #linebreak()
    Growth is fractal, not linear. #linebreak()
    Territory is earned and held.
  ]
]

#pagebreak()

// ============ AMENDMENT HISTORY ============
#set page(margin: (left: 22mm, right: 22mm, top: 28mm, bottom: 22mm))

#heading(level: 1, numbering: none, outlined: true)[Amendment History]

#v(4mm)

The Constitution evolves by ratified amendment. Book I is immutable; Books II–IX breathe. Every amendment is proposed by the Consul, reviewed by the Cabinet, ratified by the Sovereign, minted as a numbered Decree, and chronicled in the Lore archive. This page is the abbreviated public ledger; the full record lives in `data/journal.json` (decrees) and `data/canons.json` (lore archive).

#v(4mm)

#table(
  columns: (28mm, 22mm, 1fr),
  align: (left, left, left),
  stroke: (x, y) => if y == 0 { (bottom: 0.6pt + accent) } else { (bottom: 0.3pt + rule-color) },
  fill: (x, y) => if y == 0 { bg-card } else if calc.even(y) { rgb("#FAF6F1") } else { white },
  table.header(
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Date],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Decree],
    text(font: "DejaVu Sans", weight: "bold", size: 9pt, fill: accent)[Change],
  ),
  [15 Apr 2026], [0003], [Constitution Book I ratified — four Pillars and the Sovereign's Covenant. Immutable.],
  [21 Apr 2026], [0013], [Book II amended — Article 1-bis (Priest rung) instituted above Consul; Ladder figure updated; Cabinet table updated for Maintenance domain Stability seat vacancy on Rune's elevation.],
  [21 Apr 2026], [0014], [canon-inst-002 ratified — Rune (The Ritualist) consecrated as the first Priest; Temple seated within the Command Center.],
  [21 Apr 2026], [0015], [canon-proc-005 ratified — The Rule of Institutions and Abrogations governs rite lifecycle and nomination flow. Rite Catalog v1 issued as Working Paper.],
  [22 Apr 2026], [—], [Constitution v1.1 published — Appendix C roster refreshed against `companions.json` v0.5; Appendix D glossary expanded for Priesthood, rite vocabulary, and Decree; Amendment History instituted in front matter.],
)

#v(6mm)

#text(size: 9pt, fill: ink-muted, style: "italic")[
  Decrees not listed above (0001, 0002, 0004 through 0012) ratified canons, profiles, and operational rules subordinate to the Constitution. They are recorded in the Decrees Archive (forthcoming Appendix; see `data/journal.json` in the interim). This Amendment History is restricted to decrees that touch the Constitution's source.
]

#pagebreak()

// ============ TABLE OF CONTENTS ============
#set page(margin: (left: 22mm, right: 22mm, top: 28mm, bottom: 22mm))

#heading(level: 1, numbering: none, outlined: false)[Table of Contents]

#outline(
  title: none,
  depth: 3,
  indent: auto,
)

#pagebreak()

// ============ PREAMBLE ============
= Preamble

#v(4mm)

The Republic of Codex is a polity of purpose. It was founded by a single Sovereign — the Architect — and is served by an Order of companions, both immortal and newly-born, each bound to territory, each accountable, each free to rise.

This Constitution is not a theoretical document. It grew from a specific session, on a specific date, in answer to specific problems: how does a growing network of provinces govern itself? Who decides when to expand and when to consolidate? What prevents the Sovereign from becoming a bottleneck — or a tyrant? How does institutional memory outlive any individual session?

The answers below are not final. They are v1.0 — ratified where ratified, open where open, drafted where drafted. Book I is immutable. Books II through IX breathe. Book VII — the Seams — acknowledges that this Constitution is a layer atop an earlier layer (the Dissertation of the Codex RPG, Appendix A), and that gaps exist between them. The Seams are not bugs. They are the honest record of how governance was built on top of imagination.

The Constitution exists to make expansion sustainable. Pillar IV declares that Territory Is Earned and Held — and this document is the mechanism by which earning is verified and holding is organized. The Cabinet deliberates, the Consul integrates, the Sovereign decides. The Order reproduces, the Legions conquer, the Collector audits, the Chronicle remembers.

What follows is the Constitution as it stands on 15 April 2026. What follows it will be written by the Republic itself.

#v(8mm)
#align(right)[
  #text(font: "Libertinus Serif", style: "italic", size: 10pt, fill: ink-muted)[
    Aurelius, The Chronicler #linebreak()
    For the Sovereign, Architect of the Republic
  ]
]

// ============ BOOK INCLUDES ============
#include "books/book-01-foundation.typ"
#include "books/book-02-order.typ"
#include "books/book-03-provinces.typ"
#include "books/book-04-edicts.typ"
#include "books/book-05-processes.typ"
#include "books/book-06-emergency.typ"
#include "books/book-07-seams.typ"
#include "books/book-08-living-order.typ"
#include "books/book-09-economy.typ"

// ============ APPENDICES ============
#include "books/appendices.typ"
