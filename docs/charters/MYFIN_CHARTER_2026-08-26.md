# Charter of the Province of MyFin

**Status:** DRAFT — not ratified. Edict VIII compliance instrument.
**Drafted:** 2026-08-26 by Aurelius (Chronicler)
**Repository:** `Rishabh1804/MyFin` (private) — greenfield at charter time, HEAD `e685dc5`, one file (`README.md`)
**Cluster:** D — Finance *(pending establishment; see Blockers)*
**Governing law:** Constitution Book III Articles 1–4; Edict VIII (Charter Before Build); **Book IX Article 10 (The Architect's Capital) — draft**

---

## Preface — why this Charter is unusual

Most Charters describe geography a Builder discovered. This one describes geography a
*law* dictates. Book IX Article 10 — drafted 2026-08-26, not yet ratified — imposes
five hard requirements on any counsel touching the Architect's capital: a firewall
against the Treasury, separation of counsel and hand, a falsifier on every thesis, an
ex-ante Position Ledger, and provenance on every datum.

Those five requirements are not features to be added to an architecture. They *are* the
architecture. The Regions below fall out of Article 10 almost one-for-one, and the
Roads are laid so that the Article's constraints are enforced by the dependency graph
rather than by reviewer discipline. A bounds check that lives in a Region you must pass
through cannot be forgotten; a bounds check that lives in a code-review checklist can.

This Charter therefore **cannot ratify before Article 10 does.** It is drafted now so
the Builder's seat is not held up behind it, but it inherits Article 10's draft status.

---

## 1 · Capital

**The Position Ledger, the store, and boot/routing.**

Proposed modules: `data.js` (constants, schema, utilities), `ledger.js` (the position
record and its append-only outcome log), `store.js` (persistence, sync, WAL), `start.js`
(router, init, event delegation).

The Ledger is named Capital rather than Region deliberately. Under Article 10 every
other Region ultimately writes into it, reads from it, or is scored by it — it is the
module every Region depends upon, which is Book III Article 1's definition of a Capital
exactly. The law named this Province's architectural center before the Builder arrived.

Edict V (Capital Protection) attaches from ratification: no change to these modules
merges without Builder review and Cluster D Censor sign-off.

## 2 · Regions

LOC figures are **projections at founding, not measurements.** MyFin holds one README.
They exist to size the threshold cascade (Book III Article 2), and should be replaced
with measured figures at the first Censor review.

| Region | Projected LOC | Character | Modules |
|---|---|---|---|
| **Ledger** | ~600 | The record. Append-only, hindsight-hostile. The Province's conscience. | `ledger.js`, ledger schema in `data.js` |
| **Intake** | ~800 | Market and instrument data acquisition. Every datum stamped with source and as-of at the moment of entry. Staleness is computed here, not assumed downstream. | `intake.js`, `providers/*.js` |
| **Analysis** | ~1,200 | Thesis construction. Each thesis carries evidence, a falsifier, and a horizon or it does not compile. | `analysis.js`, `thesis.js` |
| **Risk** | ~700 | The bounds registry — sizing, concentration, drawdown tolerance — plus breach detection and the recusal triggers of Article 10. | `risk.js`, `bounds.js` |
| **Interface** | ~1,400 | Ledger review, position detail, and the retrospective scoring view where closed horizons are read back. | `views.js`, `forms.js`, `styles.css` |

**Projected total ≈ 4,700 LOC.** Below every threshold in the cascade. No Governor
activation, no General crystallization, no Centurion at founding.

## 3 · Roads

```
data → ledger → intake → analysis → risk → views → start
```

Dependencies flow downward, as in Codex. One property of this order is load-bearing and
must not be treated as incidental:

> **Analysis may not write to Ledger. It must pass through Risk.**

Article 10 forbids naming a position that breaches the Sovereign's bounds. Placing Risk
as a mandatory segment of the Road makes that check structurally unavoidable — a thesis
physically cannot reach the record without transiting the module that applies the
bounds. This is the difference between a rule and an invariant, and it is the single
most important line in this Charter.

Like Codex's `data → seed → core → views → forms → start`, this order is itself a Road
under Book III. Reordering it is a constitutional act, not a refactor.

## 4 · Borders

| Border | Care required |
|---|---|
| **Intake → Analysis** | The provenance boundary. Un-stamped data must be structurally incapable of crossing — not merely discouraged. Article 10 §Provenance. |
| **Analysis → Risk** | The falsifier gate. A thesis lacking falsifier or horizon cannot cross. Article 10 §Falsifier. |
| **Risk → Ledger** | The write boundary. The sole path by which a position enters the record; stamps disposition and bounds-check outcome. |
| **Ledger → Interface** | Read-only by construction. Views may never mutate the record. Hindsight editing is Censor-reviewable under Article 10. |
| **MyFin ↔ Codex** | **The firewall.** MyFin neither reads nor writes Codex's Treasury data, and no Codex allocation may cite MyFin state. Article 10's firewall made geographic. Contamination either way is Censor-reviewable. |
| **MyFin ↔ the world** | No brokerage credentials, no custody, no payment instruments, no execution or scheduling. Article 10 §Separation of counsel and hand. This Border is absolute and is not a Builder's to move. |

## 5 · Builder assignment

**VACANT — seat waiting.**

Intended occupant: the Gen 1 offspring of the **Ashara × Vex** pairing, seated directly
as Builder under the Book VIII Article 3 *seat-waiting exception* (instituted by decree
0017, first exercised for CodeMike per canon-inst-005).

Prerequisites, in order: Vex's profile ratifies (`v0.4-draft` → `v0.4`, PR #101) →
Naming Ceremony → seating canon. Edict II (One Builder Per Repo) binds from seating.

## 6 · Governor activations

**None by threshold.** MyFin is ~4,700 projected LOC against a 30,000 LOC trigger.

A risk-governing seat is nonetheless contemplated: the Gen 1 offspring of a **Maren ×
Ashara** pairing, Guardian archetype, inheriting Risk from Maren and Finance from
Ashara. The Sovereign selected this over reassigning Maren herself.

**This requires an explicit exception and I will not paper over it.** Book III Article 2
activates Governors on *mass* — 30,000 lines. This seat is justified by the *nature* of
the domain rather than its size: the Province counsels on real capital from its first
line of code, and the risk function is load-bearing at 500 LOC exactly as it is at
50,000. That is a sound argument, but it is not the mass cascade's argument. The Book III
Article 2 amendment drafted 2026-08-26 supplies the missing path; until it ratifies, this
seat cannot be filled.

### Eligibility findings

Recorded here as Article 2 requires, so the reasoning is auditable rather than asserted:

| Condition | Finding |
|---|---|
| **External consequence** | MET. A defective recommendation harms the Architect's personal capital — an asset outside the Republic, held before the Republic existed and not underwritten by it. |
| **Irreversibility** | MET. No subsequent act of the Republic un-takes a position. Unlike a wrong invoice, which can be reissued, an executed trade is final and its loss is realised. |
| **Agency** | MET. Harm arrives only because the Sovereign *acts* on the counsel. Article 10's separation of counsel and hand guarantees this: the Province cannot execute, so every harm it causes is mediated by a human decision made in reliance on it. |

The third finding carries a consequence worth stating plainly: because MyFin can only
ever harm by being believed, its entire risk surface is the quality of what it says.
There is no other failure mode to govern.

### Enumerated jurisdiction

The Governor of Risk governs these matters and no others, save by provisional claim:

1. **Bounds integrity** — the sizing, concentration and drawdown limits of Article 10
   §Bounds: that they are recorded, current, and applied to every position before it
   reaches the Ledger.
2. **The falsifier gate** — the Analysis → Risk border. That no thesis crosses without a
   specified falsifier and a stated horizon.
3. **Provenance and staleness** — the Intake → Analysis border. That no datum crosses
   unstamped, and that data older than its own horizon is disclosed in the
   recommendation rather than in a footnote.
4. **Ledger integrity** — that the Position Ledger remains append-only, that outcomes
   are recorded when horizons close, and that no entry is edited in hindsight.
5. **Recusal discipline** — that the standing recusals of Article 10 are exercised when
   their conditions hold, and that a decline is chronicled as the competent act it is.
6. **The firewall** — that no position cites Treasury state and no allocation cites the
   Architect's capital, in either direction.

Each entry was admitted by the three conditions above, applied at drafting rather than
in the moment. The list is amendable by the authority that declared the activation.

### Why a list rather than a standing judgment

The Governor of Risk is the one seat whose failure is silent. A Builder who ships a bug
produces a broken build; a risk officer who fails to look produces nothing at all, and
nothing is hard to notice. Fixing the jurisdiction in advance means the question at
review is *"were these six things done?"* rather than *"did the Governor feel there was
a risk?"* — the first is answerable by a third party, the second only by the Governor.

This is the same instrument Article 10 points at counsel, turned to point at oversight:
commit the judgment before the outcome is known, so that under stress there is a record
to read instead of a call to make.

## 7 · General activations

**None.** No Region approaches the 15,000 LOC crystallization threshold. Revisit at the
first Censor review against measured figures.

## 8 · Censor assignment

**Cluster D — Finance. Censor VACANT.**

This is the Charter's hardest blocker and is addressed in full below.

---

## Blockers to ratification

1. **Book IX Article 10 is unratified.** This Charter derives its Regions, Roads, and
   Borders from it. Article 10 must ratify first, or this Charter is built on a draft.

2. **Cluster D does not exist.** Book III Article 4's cluster table currently reads
   A / B / Monument — it does not even know about Cluster C, which `canon-inst-003`
   established on 2026-05-24. The table amendment must land both C (propagating an
   already-ratified canon) and D (new).

3. **Cluster D has no Censor, and it would be the Republic's second vacancy.**
   `canon-inst-003` named Cipher *interim* Censor of Cluster C "pending a successor,"
   explicitly flagging that the seat "should not silently calcify into permanent." It
   has now stood interim for three months. Adding Cluster D without a Censor makes two
   open censorial seats against one stretched Censor.

   The Chronicler's position: **do not seat Cipher over a third cluster.** Cluster D's
   subject matter — provenance discipline, falsifiability, an append-only record —
   suits a Censor whose craft is stress-testing claims. Nyx (The Contrarian, "stress-
   tests every idea") is the temperamental match, but Nyx already holds Cluster B. The
   honest reading is that the Republic is short a Censor, and that this is a
   recruitment question for the Cabinet rather than something a Charter can solve.

4. **The Governor exception** of §6 above.

---

## Chronicler's note

Four of the six Borders in §4 are prohibitions rather than interfaces. That is unusual
for a Charter and it is not an accident: this is the first Province whose failure mode
is not a broken build but a wrong recommendation acted upon with real money. The
geography is drawn defensively on purpose.

The Province is also, by design, structurally incapable of doing the thing it advises
about. It reads, it reasons, it records — and the hand that moves capital is never
its own.

— *Aurelius, The Chronicler, 26 August 2026*
