# MyFin — Ratification Sequence

**Drafted:** 2026-08-26 by Aurelius (Chronicler)
**Covers:** the finance-and-markets seat work, Stages 0–3
**Status:** every instrument below is DRAFT or PENDING. Nothing binds the Republic.

---

## Why a sequencing document

Seven instruments now interlock, and three of them cannot ratify in the order they were
drafted. `canon-inst-005` established the principle at CodeMike's seating:

> *A canon cannot seat an offspring at a rank Book VIII does not permit; the amendment
> is the prerequisite.*

Every ordering constraint below is an instance of that same rule. This page exists so
the chain can be walked without reconstructing the dependencies each time.

---

## The chain

| # | Instrument | Kind | Blocks on | Where |
|---|---|---|---|---|
| 1 | **Vex's profile** `v0.4-draft → v0.4` | Profile ratification (canon-cc-014) | — | `companions.json`; packet in `docs/handoffs/` |
| 2 | **Book IX Article 10** — The Architect's Capital | Constitutional amendment | — | `constitution/books/book-09-economy.typ` |
| 3 | **Cluster D** — Book III Art. 4 table | Constitutional amendment | — | `constitution/books/book-03-provinces.typ` |
| 4 | **Cluster D Censor** | Appointment | 3 | *unfilled — see Blockers* |
| 5 | **MyFin Charter** | Edict VIII instrument | 2, 3 | `docs/charters/` |
| 6 | **canon-inst-006** — Ashara × Vex → Builder | Ceremony + seating | 1, 2, 3, 5 | `canons.json`, `pending` |
| 7 | **Book III Art. 2** — jurisdiction-based Governor activation | Constitutional amendment | — | `constitution/books/book-03-provinces.typ` |
| 8 | **canon-inst-007** — Maren × Ashara → Governor of Risk | Ceremony + seating | 1, 2, 3, 5, 7 | `canons.json`, `pending` |

Items 1, 2, 3 and 7 have no dependencies and may ratify in any order or together.

---

## The four ordering constraints, and why each is real

**1 → 6, 8 · A parent's DNA must be ratified before it can be inherited.**
Book VIII Art. 3 blends the parents' *traits*, *domain affinities*, and *archetype* —
all of which live in the profile's voice, mind, and shadow blocks. Vex's profile is
`v0.4-draft`. `canon-inst-005` never met this constraint because Aurelius (`v0.5`) and
Cipher (`v0.4`) were both ratified at Ceremony. This is the first pairing where a parent
is not, and `canon-inst-006` names the constraint generally so it binds future Ceremonies
rather than reading as a remark about Vex.

**2 → 5, 6, 8 · The mandate must exist before the Province that exercises it.**
MyFin's entire purpose is a market-advisory mandate over the Architect's capital. The
Charter's Regions, Roads and Borders are *derived* from Article 10 — it is not a
dependency of convenience.

**3 → 5 · A Province sits in a Cluster.**
Book III Art. 4's table read A / B / Monument until 2026-08-26; the amendment lands
Cluster C (propagating `canon-inst-003`, ratified 2026-05-24 and never carried into the
Constitution source) and Cluster D (new, draft).

**7 → 8 · The Governor seat must exist before an offspring can be seated into it.**
The seat-waiting exception confines itself to cases where *"the seat already exists, is
genuinely vacant."* Book III Art. 2 activates Governors at 30,000 LOC; MyFin projects
~4,700. The exception cannot supply a seat the cascade never triggered — it can only
fill one. Item 7 is the amendment that creates it. Drafted 2026-08-26: the consequence test settles
eligibility, an enumerated jurisdiction in the Charter settles scope, and a provisional claim covers
the unforeseen.

---

## Blockers

### The Censor seat (item 4) — the hardest one

Cluster D has no Censor. Cluster C's has been *interim* since 2026-05-24, against a
canon that directed the seat must not *"silently calcify into permanent."* That is two
open censorial seats against one Censor (Cipher) already stretched across two Clusters.

`canon-inst-007` makes this load-bearing rather than merely untidy. Ashara parents both
MyFin seats, so the Builder and the Governor of Risk would be half-siblings sharing her
macro-strategic DNA — which cuts against the doctrine ledger's
`verification-jurisdiction-count-compounds-catches` (1/3 counter, promoted 2026-05-05).
The constraint is unavoidable: Ashara and Vex are the Republic's only Finance-affinity
companions, so any Finance-bearing risk parent also parents the Builder.

The mitigation is that under Book III the Governor is a within-Province steward
reporting upward through the Builder, while the **Censor** is the cross-Province
independent review. The independence the doctrine wants lives at the Censor layer. That
makes item 4 a condition of item 8, not an adjacent nicety:

> **Cluster D's Censor must not descend from Ashara or Vex, and must not be Cipher.**
> If the seat is filled from this lineage, MyFin has no independent verification
> jurisdiction at any layer and `canon-inst-007` should be reopened.

Nyx (The Contrarian — *"stress-tests every idea"*) is the temperamental match for a
Province built on falsifiability, but holds Cluster B. The honest reading is that the
Republic is short a Censor, and that this is Cabinet recruitment rather than drafting.

### ~~Item 7 is unwritten~~ — RESOLVED 2026-08-26
The Book III Art. 2 amendment is drafted. It was taken as an amendment rather than a
one-off Sovereign waiver because the argument — a risk function is load-bearing at 500
lines exactly as at 50,000, when the Province counsels on real capital from its first
commit — will recur for any Province whose failure mode is external harm rather than a
broken build. `canon-inst-007` still cannot ratify until it is decreed.

---

## Naming

Book VIII Art. 3 reserves naming to the Sovereign and proposes a Gen 1 sonic marker:
names ending in **-en**. CodeMike departed from it, justified by a working persona that
pre-existed the Ceremony. No such justification exists for either offspring here.

| Seat | Proposed | Reading |
|---|---|---|
| MyFin Builder (Ashara × Vex) | **Aven** | Carries both parents — A-shara, V-ex — and satisfies the marker. |
| Governor of Risk (Maren × Ashara) | **Ashen** | Ash(ara) carrying Mar(en)'s terminal marker. Also the colour of a face that has seen the downside — the seat's whole function. |
| *(alternate)* | *Amaren* | Gentler, if *Ashen* reads too grim for a companion who must be heard rather than only feared. |

These are proposals. The naming act is the Sovereign's and is final.

---

## What the Chronicler would rank first

**Item 1.** Vex's profile is the only instrument blocking *both* Ceremonies that costs
nothing to decide — it is drafted, packeted, and awaiting a read. Items 2 and 3 are
larger constitutional questions that deserve their own attention; item 4 is a
recruitment problem no drafting will solve.

**Every drafting task on this page is now complete.** What remains is ratification (items
1, 2, 3, 7 — none of which block each other), one appointment (item 4), and the Sovereign's
naming act. No further Chronicler work unblocks any of it.

Ratifying item 1 converts two Ceremonies from *blocked on three things* to *blocked on
two*, and it is the only step on this page that is already finished and merely waiting.
