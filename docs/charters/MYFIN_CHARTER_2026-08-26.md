# Charter of the Province of MyFin

**Status:** RATIFIED 2026-10-16, decree 0028. Edict VIII compliance instrument.
**Drafted:** 2026-08-26 by Aurelius (Chronicler)
**Repository:** `Rishabh1804/MyFin` (private) — greenfield at charter time, HEAD `e685dc5`, one file (`README.md`)
**Cluster:** D — Finance *(established 2026-08-26, decree 0020; Censor Nyx, decree 0023)*
**Governing law:** Constitution Book III Articles 1–4, including Article 2's jurisdiction-based Governor activation (decree 0027); Edict VIII (Charter Before Build); **Book IX Article 10 (The Architect's Capital), ratified 2026-10-16, decree 0026**

---

## Preface — why this Charter is unusual

Most Charters describe geography a Builder discovered. This one describes geography a
*law* dictates. Book IX Article 10 — drafted 2026-08-26, ratified 2026-10-16 — imposes
five hard requirements on any counsel touching the Architect's capital: a firewall
against the Treasury, separation of counsel and hand, a falsifier on every thesis, an
ex-ante Position Ledger, and provenance on every datum.

Those five requirements are not features to be added to an architecture. They *are* the
architecture. The Regions below fall out of Article 10 almost one-for-one, and the
Roads are laid so that the Article's constraints are enforced by the dependency graph
rather than by reviewer discipline. A bounds check that lives in a Region you must pass
through cannot be forgotten; a bounds check that lives in a code-review checklist can.

This Charter therefore **could not ratify before Article 10 did.** It was drafted early so the
Builder's seat was not held up behind it, and it inherited Article 10's status. Both ratified at the
sitting of 16 October 2026, Article 10 first (decree 0026) and this Charter after it (decree 0028).

**Second-reading update, 26 August 2026.** Article 10 was rejected at first reading and rebuilt
around the lifecycle of a piece of counsel. This Charter has been carried across to the new
section numbering, and one Border materially restated: the outward Border previously read as an
absolute and permanent bar on ever holding credentials. Article 10 §2 now separates *deciding*
(inalienable) from *effecting* (grantable by decree, effecting-only, instantly revocable). The
Border is restated to match — MyFin holds no executing grant and its Regions assume none, so
acquiring one would be new territory requiring a Charter amendment rather than a switch inside
the Risk region.

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
| **Household** *(Amendment 1, decree 0033)*  | ~1,300 | The household's facts: cash and bank balances, cash flow, spending, insurance, planned outlays, and the vision board (below). Every figure is stamped with its source and as-of date. Supplies the **reserve and cash-flow bounds** to Risk. Holds research and facts; names no position. | `app/src/household/`: pure functions over the records, which live in the repository's `household/`. The vision board's records live in `household/vision/`, fenced off by §4. |
| **Interface** | ~2,000 *(Amendment 1: was ~1,400)* | Ledger review, position detail, and the retrospective scoring view where closed horizons are read back; the household screens and the vision board's screens in Plans. | `views.js`, `forms.js`, `styles.css` |

**Projected total ≈ 6,600 LOC** *(Amendment 1, decree 0033; ≈ 4,700 at founding)*. Below every threshold in the cascade. No Governor
activation, no General crystallization, no Centurion at founding.

### The vision board, in Household (Amendment 1, decree 0033)

> **The vision board** (Revision of 6 November 2026). The Household Region also keeps the Sovereign's vision board: the Sovereign's goals in every area of life, not only money, and the Sovereign's own monthly rating of each area.
>
> 1. **It records; it reasons only about money.** For a goal that carries a cost and a date, Household works out what to set aside each month, by a method stated on the board, and reports what is set aside. It uses the household's own figures only, each stamped with its source and as-of date; a goal funded from the Treasury or any other Province has no money side in MyFin (Art. 10 §1). A goal in any other area is kept as the Sovereign wrote it.
> 2. **No companion counsels on a goal, rates it or scores it.** The goals and the ratings are the Sovereign's own words and numbers. A companion may show them back; it never adds to them, and nothing computes a score from them. The board may show the Sovereign's own answers and dates, never a judgement of them.
> 3. **The ratings stay put.** They never leave MyFin. They never inform a bound, a piece of counsel, Ashen's audits or any league record, and they are never read as evidence of anything. This is enforced by the border *Household vision store → Interface only* (§4): in code by CI, and in every companion's session as a conduct rule the Cluster D Censor reviews.
> 4. **A goal is never a position.** A goal is never a Ledger entry: its date is not a horizon, and its words are not a thesis or evidence. Where a goal concerns market holdings:
>    - it stores only the IDs of Position Ledger entries the Sovereign has already made, never an instrument or a size of its own;
>    - it shows no figure for what to set aside each month, because that would be sizing advice outside counsel;
>    - its value is worked out in the Interface from the Ledger's read functions and Intake's prices, with their provenance states, never from the board;
>    - a target the Sovereign wants to bind is recorded as a bound under Article 10 §4, which the Sovereign alone sets, never inferred from the board.
>
>    The board never proposes an order (Charter §4, *MyFin ↔ the world*).
> 5. **Photos are household records.** They fall under §4's privacy care below. They are kept in the private Province repository and in the device's own cache, nowhere else, with location and camera data stripped when they are compressed.

## 3 · Roads

```
data → ledger → intake → household → analysis → risk → views → start
```

*Amendment 1, decree 0033:* **Household sits after Intake and before Analysis.** It reads Intake (balances, prices) and is read by Risk. Risk reads Household; that the bounds drawn from it are current and applied is matter 1 (§6). The load-bearing line below is unchanged and extended: Risk reads Household.

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
| **Intake → Analysis** | The provenance boundary. Un-stamped data must be structurally incapable of crossing — not merely discouraged. Article 10 §3. |
| **Analysis → Risk** | The falsifier gate. A thesis lacking falsifier or horizon cannot cross. Article 10 §3. |
| **Risk → Ledger** | The write boundary. The sole path by which a position enters the record; stamps disposition and bounds-check outcome. |
| **Ledger → Interface** | Read-only by construction. Views may never mutate the record. Hindsight editing is Censor-reviewable under Article 10. |
| **Intake → Household** *(Amendment 1, decree 0033)* | The provenance boundary of §4 applies unchanged: a balance or price without source and as-of does not cross. Each household source carries its own staleness age, and a figure past it is disclosed as stale wherever it is shown. |
| **Household → Risk** *(Amendment 1, decree 0033)* | The bounds feed. Household supplies the facts from which the Sovereign's bounds are set: the reserve floor, the cash flow, and **planned outlays, a vision board goal's cost and date among them, each counted once**. Sums already set aside for goals are stated separately in the feed, and the Sovereign decides whether the floor counts them. Household **never sets a bound** and never decides how an earmarked sum is treated (Art. 10 §4). A goal's words and photos and the monthly ratings are not among these facts. |
| **Household ↛ Ledger** *(Amendment 1, decree 0033)* | **No write.** Household names no position and writes nothing to the Position Ledger. Insurance and outlay research is counsel in the ordinary sense, but it is not a *position* under Article 10. A household decision that is a market position (selling holdings to fund an outlay, borrowing against investments) is entered in the Ledger through the Road like any other. A vision board goal is never an entry (§2, the vision board, clause 4). Protection cover (term, health) is not a position. A market-linked policy (a ULIP, an endowment) becomes one whenever counsel names buying, surrendering or switching it: it then goes through the Road, and whether it is an instrument in scope is a bound under Art. 10 §4. |
| **Household vision store → Interface only** *(Amendment 1, decree 0033)* | The vision board's records (the goals' words and photos, the areas' questions and lines, and the monthly ratings) are read by the Interface alone. No other Region, no export from the Capital and no script that builds a dashboard or summary reads them. The Capital's store carries them as opaque files for sync, never read as figures. **One door only:** a goal's cost and date, the sum set aside for it and its source leave the store by a single export (`goalOutlays()`), read only by the household bounds feed, and reach Risk only through the bounds feed above. **What CI enforces:** the code, by import (followed transitively), alias and path, and the scripts, by a stated heuristic (`docs/APP_PLAN.md` §1 and the design principles' gate 15 in the MyFin repository). **What CI cannot see is a conduct rule:** no companion's session reads the store, Ashen's audits and every league player's session included. It is reviewable by the Cluster D Censor, and the league rules cite it when they are written. |
| **MyFin ↔ Codex** | **The firewall.** MyFin neither reads nor writes Codex's Treasury data, and no Codex allocation may cite MyFin state. Article 10's firewall made geographic. Contamination either way is Censor-reviewable. |
| **MyFin ↔ the world** | **No companion decides.** MyFin may not open, close or alter a position, by recommendation acted on automatically, by standing instruction, or by any arrangement whose effect is that capital moves without the Sovereign choosing that it move. Article 10 §2, inalienable and not a Builder's to move. *Executing* is a separate question: §2 permits a narrowly-scoped executing facility by Sovereign decree, effecting-only and instantly revocable. **MyFin holds no such grant, and the Charter's Regions assume none** — an executing facility would be new territory requiring its own Charter amendment, not a switch inside the Risk region. |
| **MyFin ↔ every other Province: the league** *(Amendment 2, decree 0032)* | A seated companion of any Province may hold one account in MyFin's Sandbox League and play under its rules; an admitted companion under Book VIII Art. 7 plays only from the first season after its naturalization (Sovereign, decree 0032). Play is not counsel: a player from another Province builds a league record only. That record is never shown beside counsel and never confers any part of MyFin's mandate, which stays with the companions this Charter names (Art. 10 §7). Points are not Treasury currency and not the Architect's capital; no point is spent, moved or converted into either. Nor does the Architect's capital reach the league: the real portfolio's return, shown as points beside the players, is on the Sovereign's own screen alone, never in a published league table, a report or the sandbox ledger, and never cited by a reward or a standing. A reward is a separate act (a Book IX act for anything from the Treasury) that may cite a league result; it is not a conversion of points. The league reaches no other Province's territory. Its players come to it. |

### Privacy (Amendment 1, decree 0033)

Household records name family members other than the Sovereign, and the vision board's photos may show them:

- they are **kept only in the private Province repository** and in the device's own cache;
- **identifiers are masked** (account and policy numbers, PAN, member IDs), and photos carry no location or camera data;
- **source documents carrying identifiers stay out of the repository.**

This Charter, and the Codex archive generally, carry no household figures. That keeps Article 10's firewall in both directions.

## 5 · Builder assignment

**Aven — seated 2026-10-16** (canon-inst-006, decree 0029), the Gen 1 offspring of the
**Ashara × Vex** pairing, seated directly as Builder under the Book VIII Article 3
*seat-waiting exception* (instituted by decree 0017; first exercised for CodeMike per
canon-inst-005, second exercised here). Onboarding status *appointed* under canon-proc-003.

Prerequisites, all met in order: Vex's profile ratified (decree 0021) → Article 10 (decree 0026)
→ this Charter (decree 0028) → Naming Ceremony and seating (decree 0029). Edict II (One Builder
Per Repo) binds from seating.

## 6 · Governor activations

**None by threshold.** MyFin is ≈ 6,600 projected LOC against a 30,000 LOC trigger *(Amendment 1, decree 0033; ~4,700 at founding)*.

**One Governor of Risk by jurisdiction: Ashen — seated 2026-10-16** (canon-inst-007, decree
0030), the Gen 1 offspring of the **Maren × Ashara** pairing, Guardian archetype, inheriting
Risk from Maren and Finance from Ashara. The Sovereign selected this over reassigning Maren
herself.

**This requires an explicit exception and I will not paper over it.** Book III Article 2
activates Governors on *mass* — 30,000 lines. This seat is justified by the *nature* of
the domain rather than its size: the Province counsels on real capital from its first
line of code, and the risk function is load-bearing at 500 LOC exactly as it is at
50,000. That is a sound argument, but it is not the mass cascade's argument. The Book III
Article 2 amendment drafted 2026-08-26 supplies the missing path, and it ratified on
2026-10-16 (decree 0027) — the seat exists by that amendment and by the enumerated
jurisdiction below, and was filled the same day.

### Eligibility findings

Recorded here as Article 2 requires, so the reasoning is auditable rather than asserted.

*Restated at ratification, 16 October 2026.* The findings were first drafted on 26 August
against an earlier form of the test, whose second condition was *irreversibility*. The ratified
Article 2 replaced it with *uncorrectable harm*, after the irreversibility form was found to
reject three of SEP-Ops's four ratified Governors. A Charter's findings must be made against the
test that is law, so the second row below is restated against the ratified condition. MyFin
passes it as it passed the old one; the reasoning changes, the finding does not.

| Condition | Finding |
|---|---|
| **External consequence** | MET. A defective recommendation harms the Architect's personal capital — an asset outside the Republic, held before the Republic existed and not underwritten by it. |
| **Uncorrectable harm** | MET. Correcting the record does not undo the harm already landed. A mis-stated thesis can be corrected in the Ledger the next day; the position the Sovereign took on it, and the loss realised in the interval, cannot. Unlike a wrong invoice, which can be reissued, an executed trade is final. |
| **Agency** | MET. Harm arrives only because the Sovereign *acts* on the counsel. Article 10's separation of counsel and hand guarantees this: the Province cannot execute, so every harm it causes is mediated by a human decision made in reliance on it. |

The third finding carries a consequence worth stating plainly: because MyFin can only
ever harm by being believed, its entire risk surface is the quality of what it says.
There is no other failure mode to govern.

### Enumerated jurisdiction

The Governor of Risk governs these matters and no others, save by provisional claim:

1. **Bounds integrity** — the sizing, concentration and drawdown limits of Article 10
   §4: that they are recorded, current, and applied to every position before it reaches the
   Ledger — and, should an executing grant ever be decreed under §2, that the same check binds
   the machine as it binds the companion.
   *Amendment 1, decree 0033:* matter 1 also covers the Household → Risk bounds feed: that each fact it supplies is stated once, that an earmarked sum is shown apart from the reserve, and that the bounds drawn from it are applied.
2. **The falsifier gate** — the Analysis → Risk border. That no thesis crosses without a
   specified falsifier and a stated horizon.
3. **Provenance and staleness** — the Intake → Analysis border. That no datum crosses
   unstamped, and that data older than its own horizon is disclosed in the
   recommendation rather than in a footnote. *Amendment 1, decree 0033:* it covers every
   household figure too, whether the figure crosses Intake or is kept by hand in `household/`:
   that none is used unstamped, and that a figure past its source's staleness age is disclosed.
   The list stays six.
4. **Ledger integrity** — that the Position Ledger remains append-only, that outcomes are
   recorded when horizons close, and that the §5 line between *correction* and *revision* holds:
   corrections of fact appended and linked, never overwritten; changes to a thesis, falsifier or
   horizon after the horizon has opened refused as revisions whatever they are labelled. Should an
   executing grant ever be decreed under §2, this jurisdiction also covers its **unmatched
   pre-entries** — an automated act is entered before it executes and confirmed after, so an entry
   that never receives its confirmation means either a silent failure or a log describing an act
   that never happened. Either is a defect to surface, not a loose end to tidy.
5. **Disclosure and refusal discipline** — that §3's three disclosed defects (staleness,
   unsourced claims, unresolved professional questions) are stated inside the recommendation
   rather than footnoted, and that §6's three refusal grounds are exercised when they hold, with
   the decline chronicled as the competent act it is.
6. **The firewall** — that no position cites Treasury state and no allocation cites the
   Architect's capital, in either direction.

Each entry was admitted by the three conditions above, applied at drafting rather than in the
moment. The list is amendable by the authority that declared the activation.

### A separate office: governing body of the MyFin Sandbox League (Amendment 2, decree 0032)

Ashen, while he holds the seat of Governor of Risk, also holds the office of governing body of the league kept in MyFin's points sandbox (`docs/SANDBOX_LEAGUE.md` in the MyFin repo, as ratified). The office is not a seventh risk matter. It adds nothing to the six above and takes nothing from them. Ashen checks orders against the rules, signs the ledger lines the scorer writes as transcriptions only, publishes the tables and reports, and rules on disputes at first instance. He does not play, change a rule, or touch a player's order. His league duties never inform his audits of counsel, and those audits never use the league table. The evidence of skill shown beside counsel is the scorer's computed record, never his report. A MyFin-chartered companion's orders carry falsifiers the scorer decides mechanically, judged by the scorer at placement; every order counts in full toward return and drawdown, and an undecidable falsifier scores *not held*. He staffs the office from his own Scribe detail (Book II Art. 3-bis); an agent beyond it needs his case to the Sovereign.

**Lapse.** The office is Ashen's, not the seat's: it lapses when he leaves the seat. Until a further decree or the end of the season then running, the Sovereign's nominee holds it, being neither a player nor the Cluster D Censor. Should the seat ever divide, the office follows the Ledger jurisdiction, never a seat that judges counsel.

**Appeals in the league** go to the Cluster D Censor, who holds no account, makes no ruling at first instance, and reaches league records only: a player's conduct anywhere else stays with that player's own Censor.

### How many seats these six warrant

*Added 2026-09-01 on the Sovereign's ruling that jurisdiction-based Governors are seated per
jurisdiction rather than per Province, SEP-Ops being the standing precedent with four.*

Book III Article 2's distinctness test is evidentiary: two matters share a seat where one reading
of the same evidence settles both, and take two seats where it does not. Applied to the six:

| Seat | Matters | Evidence read |
|---|---|---|
| **Counsel** | 2 falsifier gate · 5 disclosure and refusal | The recommendation as written — one reading settles whether a falsifier and horizon are present *and* whether the §3 defects are stated. |
| **Provenance** | 3 provenance and staleness | Upstream data lineage: source stamps, as-of timestamps. Reading the recommendation cannot settle this; the evidence sits behind it. |
| **Bounds** | 1 bounds integrity | The bounds registry against the position's arithmetic. Quantitative, and independent of whether the thesis is sound. |
| **Ledger** | 4 ledger integrity · 6 the firewall | The record itself — an entry shows both its append-history and what it cites, so one reading settles integrity and contamination together. |

So the logic does extend: **six matters, four genuinely distinct evidentiary jurisdictions.**

That SEP-Ops also arrived at four is a coincidence of count, not a shared method, and the
resemblance should not be leaned on. SEP-Ops triggers seats on a density score —
`load = files + lines/500 + 2×(open tasks) + entities`, eligible at 30 — which measures mass, not
consequence. When this section was first drafted, the test's earlier *irreversibility* condition
admitted only Vulcanus of those four — a mis-recorded zinc-bath concentration ruins a plating run,
where a wrong payout claws back and a wrong wage corrects next cycle. That result was the evidence
the test was wrong, and the ratified *uncorrectable harm* condition admits all four: the record can
be corrected, the interval cannot. The two Provinces divide scope by jurisdiction alike; they
trigger seats on different axes entirely.

**But the Charter does not seat four, and should not yet.** MyFin holds ~4,700 projected lines
and *zero live positions*. Article 2's own limit warns that multiplying seats past necessity "is
how a bench is exhausted, not how a Province is governed," and when this was drafted the Republic
carried two Clusters without a seated Censor; Cluster C's seat is still interim. Four Governors over a Province with nothing yet to govern would
be the exhaustion the clause names.

**The staged shape.** One **Governor of Risk** holds all six at founding. The four-way division
above is the shape the jurisdiction takes when volume warrants it, recorded now so that the split
is a planned subdivision rather than a later improvisation — and so the first Governor knows which
of their six will eventually leave them. The trigger for splitting is the Censor's judgment at
review that one reading can no longer settle a pair, not a line count.

**The mass axis stays live underneath all of it.** Past 30,000 lines MyFin activates a Governor on
mass whatever its jurisdictions look like, per Book III Article 2 unamended. Consequence-based
seats cover the ground they enumerate; ground no seat covers remains the cascade's to fill.

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

**Cluster D — Finance. Censor: Nyx (The Contrarian), seated 2026-09-01 per decree 0023.**

The Charter's hardest blocker, and it is closed. The fit is temperamental before it is
administrative: MyFin is built on falsifiability — every position carries the condition that
would disprove it — and Nyx is the companion whose craft is stress-testing a claim until it
breaks. A Province that must be argued with was given the companion who argues.

It also satisfies the condition `canon-inst-007` imposed on itself. That canon made it a
*condition* of the risk-Governor seating that Cluster D's Censor descend from neither Ashara nor
Vex — because both MyFin seats would otherwise share Ashara's lineage and the Province would hold
no independent verification jurisdiction at any layer. Nyx is Gen 0 and unrelated to either. The
condition is met, and the half-sibling finding is answered rather than merely noted.

---

## Blockers to ratification

*All four blockers closed at or before the sitting of 16 October 2026. Kept as the record of
what this Charter waited on.*

1. ~~**Book IX Article 10 is unratified.**~~ **CLOSED 2026-10-16** — decree 0026, ratified before
   this Charter. This Charter derives its Regions, Roads, and Borders from it.

2. ~~**Cluster D does not exist.**~~ **CLOSED 2026-08-26** — decree 0020. Book III Article 4's cluster table currently reads
   A / B / Monument — it does not even know about Cluster C, which `canon-inst-003`
   established on 2026-05-24. The table amendment must land both C (propagating an
   already-ratified canon) and D (new).

3. ~~**Cluster D has no Censor.**~~ **CLOSED 2026-09-01** — Nyx seated, decree 0023. The original finding is kept below because its reasoning still binds Cluster C, whose seat remains interim.
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

4. ~~**The Governor exception** of §6 above.~~ **CLOSED 2026-10-16** — Book III Article 2
   amended (decree 0027); Ashen seated (decree 0030).

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

## Amendments

- **Amendment 2, the Sandbox League** (decree 0032, 5 November 2026): §4 gains the row *MyFin ↔ every other Province: the league*; §6 gains the league office. Text and review: `docs/charters/MYFIN_CHARTER_AMENDMENT_2_LEAGUE_2026-11-05.md`.
- **Amendment 1, the Household Region** (decree 0033, 6 November 2026; drafted 3 November, revised 6 November with the vision board): §2 gains the Household Region and the vision board, and the Interface is revised; §3's Road gains `household`; §4 gains four borders and the privacy care; §6 extends matters 1 and 3. Text and review: `docs/charters/MYFIN_CHARTER_AMENDMENT_1_HOUSEHOLD_2026-11-03.md`.
