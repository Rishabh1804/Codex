# MyFin Charter: Amendment 1, the Household Region

**Status: DRAFT, not ratified.** Drafted by Aurelius (Chronicler), 3 November 2026, at the
Sovereign's direction: Sovereign MCQ on 3 Nov 2026, "Amend: Household Region".
**Revised 6 November 2026:**
- the vision board clause was added to §2, at the Sovereign's direction ("Write the clause"), after the Sovereign chose MyFin's Plans door as the board's home;
- review round 1 was folded (Aven *revise*, Ashen *clears with conditions*; see *Review*).

**Amends:** `docs/charters/MYFIN_CHARTER_2026-08-26.md` (decree 0028): §2 Regions, §3 Roads, §4 Borders and §6 Ashen's seat.
**Carries:** the draft decree (below).
**Decree number:** 0033, the next free number when this draft was revised. It is provisional until the decree is made.
**Ratification path:**
1. Builder review by **Aven**.
2. **Ashen** reviews, for his seat: this amendment extends two of his six matters (§6) and draws the bounds feed (§4).
3. Cluster D Censor sign-off by **Nyx** (Edict V).
4. Sovereign decree.

Aven's seat is *appointed*, so the Sovereign discharges what the Builder cannot yet. Reordering the Road is a constitutional act under Book III (Charter §3), which is why this is an amendment and not a refactor. Ashen joins the path on the Amendment 2 precedent: an amendment that touches his seat is reviewed by him.

---

## At a glance

**MyFin gains a Household Region for the Architect's capital outside markets, and the vision board that gives its outlays their reasons.**
- **Household** holds balances, cash flow, spending, insurance and planned outlays, every figure stamped with its source and date. It sits in the Road after Intake and before Analysis.
- **It supplies facts to Risk and never sets a bound.** A goal's cost and date reach Risk as a planned outlay.
- **It names no position and writes nothing to the Ledger.**
- **The vision board** records the Sovereign's goals in every area of life and a monthly rating of each. MyFin reasons only about their money. No companion counsels on a goal, rates it or scores it.
- **The ratings and a goal's words and photos are read by the Interface alone**, enforced by an import rule (§4).
- **Ashen's seat extends to the new borders:** provenance and staleness reach every household figure, and bounds integrity reaches the bounds feed (§6).

---

## Why

The Charter mapped the Regions that counsel on market positions. It left out the Architect's
capital that sits outside markets, and the facts every bound is drawn from:

- **cash and bank balances;**
- **the monthly cash flow:** income, committed outflows, spending;
- **the reserve floor;**
- **insurance;**
- **planned large outlays;**
- **the goals those outlays serve.** On 6 Nov 2026 the Sovereign asked for a vision board and chose MyFin's Plans door as its home: one board, in the app opened every day, giving the reason behind every outlay and saving.

That material already exists in the repository (`household/`), with nowhere to sit in the Charter's map. That has three consequences:

1. **The bounds of Article 10 §4 have no source.** Sizing, concentration and drawdown tolerance are set by the Sovereign, but they are set *against household facts*: how many months of spending the liquid reserve covers, and whether the month runs a surplus or a shortfall. Risk cannot check a position against bounds it cannot read.
2. **Personal capital outside markets is unmapped.** Bank and cash balances, broker cash and insurance cover are the Architect's capital as much as a share holding is.
3. **Unmapped material escapes governance.** Without a Region, it has:
   - no Builder accountable for it;
   - no Censor review;
   - no fixed place in the Road.

   Yet it already drives figures put before the Sovereign, among them the months of reserve.

---

## Amendment text

### §2 Regions: add one row, revise one

| Region | Projected LOC | Character | Modules |
|---|---|---|---|
| **Household** | ~1,300 | The household's facts: cash and bank balances, cash flow, spending, insurance, planned outlays, and the vision board (below). Every figure is stamped with its source and as-of date. Supplies the **reserve and cash-flow bounds** to Risk. Holds research and facts; names no position. | `app/src/household/`: pure functions over the records, which live in the repository's `household/`. The vision board's records live in `household/vision/`, fenced off by §4. |
| **Interface** *(revised)* | ~2,000 | As before, plus the household screens and the vision board's screens in Plans. | As before |

Projected total becomes **≈ 6,600 LOC** (4,700, plus Household's 1,300, plus 600 for the
Interface), still below every threshold in the cascade. Measured at drafting: `household/`
holds records and documents, plus three scripts of 526 lines (`scripts/`), which generate
the household dashboard and summaries.

### §2: the vision board, in Household

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

### §3 Roads: the Road becomes

```
data → ledger → intake → household → analysis → risk → views → start
```

**Household sits after Intake and before Analysis.** It reads Intake (balances, prices) and
is read by Risk. Risk reads Household; that the bounds drawn from it are current and applied
is matter 1 (§6). The Charter's load-bearing line is unchanged and extended:

> **Analysis may not write to Ledger. It must pass through Risk.** Risk reads Household.

### §4 Borders: add four rows

| Border | Care required |
|---|---|
| **Intake → Household** | The provenance boundary of §4 applies unchanged: a balance or price without source and as-of does not cross. Each household source carries its own staleness age, and a figure past it is disclosed as stale wherever it is shown. |
| **Household → Risk** | The bounds feed. Household supplies the facts from which the Sovereign's bounds are set: the reserve floor, the cash flow, and **planned outlays, a vision board goal's cost and date among them, each counted once**. Sums already set aside for goals are stated separately in the feed, and the Sovereign decides whether the floor counts them. Household **never sets a bound** and never decides how an earmarked sum is treated (Art. 10 §4). A goal's words and photos and the monthly ratings are not among these facts. |
| **Household ↛ Ledger** | **No write.** Household names no position and writes nothing to the Position Ledger. Insurance and outlay research is counsel in the ordinary sense, but it is not a *position* under Article 10. A household decision that is a market position (selling holdings to fund an outlay, borrowing against investments) is entered in the Ledger through the Road like any other. A vision board goal is never an entry (§2, the vision board, clause 4). Protection cover (term, health) is not a position. A market-linked policy (a ULIP, an endowment) becomes one whenever counsel names buying, surrendering or switching it: it then goes through the Road, and whether it is an instrument in scope is a bound under Art. 10 §4. |
| **Household vision store → Interface only** | The vision board's records (the goals' words and photos, the areas' questions and lines, and the monthly ratings) are read by the Interface alone. No other Region, no export from the Capital and no script that builds a dashboard or summary reads them. The Capital's store carries them as opaque files for sync, never read as figures. **One door only:** a goal's cost and date, the sum set aside for it and its source leave the store by a single export (`goalOutlays()`), read only by the household bounds feed, and reach Risk only through the bounds feed above. **What CI enforces:** the code, by import (followed transitively), alias and path, and the scripts, by a stated heuristic (`docs/APP_PLAN.md` §1 and the design principles' gate 15 in the MyFin repository). **What CI cannot see is a conduct rule:** no companion's session reads the store, Ashen's audits and every league player's session included. It is reviewable by the Cluster D Censor, and the league rules cite it when they are written. |

### §4: one further care, privacy

Household records name family members other than the Sovereign, and the vision board's photos may show them:

- they are **kept only in the private Province repository** and in the device's own cache;
- **identifiers are masked** (account and policy numbers, PAN, member IDs), and photos carry no location or camera data;
- **source documents carrying identifiers stay out of the repository.**

This Charter, and the Codex archive generally, carry no household figures. That keeps Article 10's firewall in both directions.

### §6 Enumerated jurisdiction: two matters extended

Two of the Governor of Risk's six matters reach the new borders. They are not new matters; the list stays six, "these matters and no others".

- **Matter 1, bounds integrity,** also covers the Household → Risk bounds feed: that each fact it supplies is stated once, that an earmarked sum is shown apart from the reserve, and that the bounds drawn from it are applied.
- **Matter 3, provenance and staleness,** covers every household figure as it covers Intake → Analysis, whether the figure crosses Intake or is kept by hand in `household/` (`accounts.csv`, `settings.json`): that none is used unstamped, and that a figure past its source's staleness age is disclosed.

§6's opening finding is restated for the new size: MyFin is ≈ 6,600 projected LOC against a 30,000 LOC trigger, so still none by threshold.

---

## What this amendment does not do

- It does not touch **Capital**: Ledger, `data.js`, `store.js`, `start.js`. Edict V attaches to Capital and is unaffected. The import rule of the vision store border is added to the Road's CI rules, which are Capital; that addition is signed off by the Cluster D Censor under Edict V.
- It grants **no executing facility** (§4, *MyFin ↔ the world*). Household records payments the Sovereign has made; it makes none.
- It **does not widen MyFin's mandate.** The vision board records goals in every area of life, but MyFin reasons only about their money. Health, family, faith and the rest are the Sovereign's own record, and no companion counsels on them.
- It **seats no one.** Household falls under the Builder (Aven). Its integrity questions, provenance and staleness and the bounds feed, fall under Ashen's seat as §6 extends it. No new seat is warranted at ~1,300 LOC.

---

## The decree (draft)

> **Decree 0033 (draft): MyFin Charter Amendment 1, the Household Region.**
>
> The Sovereign, amending the MyFin Charter (decree 0028) on its own terms (reordering the Road is a constitutional act under Book III, Charter §3, and the §6 list is amendable only by the authority that activated the seat, decree 0030), and recording the act in decree shape under canon-proc-004, decrees:
>
> 1. **The Household Region** is added to MyFin, with the Road, borders and privacy care of this amendment.
> 2. **The vision board** is kept in the Household Region on the terms of §2, the vision board: it records and reasons only about money; no companion counsels on, rates or scores a goal; the ratings stay in MyFin and are read by the Interface alone; a goal is never a position, and the Sovereign alone sets any bound it inspires (Art. 10 §4).
> 3. **The Governor of Risk's matters 1 and 3** reach the bounds feed and every household figure. The list stays six.
> 4. **What this does not move:** Article 10 §2's inalienable limit, the revision prohibition of §5 and the firewall of §1.

---

## What is recorded at ratification

When the Sovereign decrees, the Chronicler records it on these surfaces, following the 5 November precedent (decree 0032):
1. **The Charter:** Amendment 1 merged into `MYFIN_CHARTER_2026-08-26.md` §2, §3, §4 and §6, with its entry in the Amendments index.
2. **`data/journal.json`:** a `decree-0033-myfin-charter-amendment-1-household` record in the canonical v1 shape (canon-proc-004).
3. **`data/volumes.json`:** MyFin's household chapter moves on.
4. **`CLAUDE.md` (Codex):** the Cluster D line, if it names MyFin's Regions.
5. **`data/interactions.json`:** the review chain's interaction record (retrospective), closed at the decree.
6. **A handoff** for the ratification sequence, like `docs/handoffs/myfin-league-decree-2026-11-05.md`.
7. **The MyFin repo:** `docs/APP_PLAN.md` §0 and §1 (the Road and the import rule for the vision store), and the design principles' §10.1 loses its wait on this amendment.

---

## Review

**Aven, Builder (6 Nov 2026): revise.** The vision board clause is buildable, but the draft had four structural gaps. All are folded:
- Ashen's seat was bound to Intake → Analysis "and no others", so the draft's claim that Household's integrity questions already fell under it was wrong. §6 now extends matters 1 and 3, and Ashen joins the ratification path.
- The ratings were walled off in words only. The border *Household vision store → Interface only* now enforces it with an import rule.
- The Modules column now names `app/src/household/`, the records in `household/` and the fenced `household/vision/` (his answer to the old open question 1: code, not records plus read-only views).
- A goal "to build a holding" would have named a position. A goal now stores only Ledger entry IDs.

Also folded: the LOC figures (Household ~1,300, Interface ~2,000, total ≈ 6,600, the "does not do" line and §6's opening finding); photos in the device cache, with location and camera data stripped; the form of Amendment 2 (*At a glance*, a draft decree number, *Carries*, the recording list).

**Ashen, Governor of Risk (6 Nov 2026): clears with conditions.** On this amendment:
- A goal's cost and date are a planned outlay and reach Risk through the bounds feed, counted once. Earmarked sums are stated apart, and the Sovereign decides whether the floor counts them. Folded into the Household → Risk row.
- A goal is never a Ledger entry, its date is not a horizon, and a market goal shows no set-aside figure, with its value coming only through a Capital export (moved to the Interface at Nyx's review, below). A binding target is a bound. Folded into clause 4.
- The ratings need a mechanism, not words. Folded into clause 3 and the new border.
- A goal funded from the Treasury has no money side in MyFin. Folded into clause 1.
- Each household source needs a staleness age. Folded into Intake → Household and matter 3.

**Re-checks (6 Nov 2026):** Aven, *clears with conditions*; Ashen, *clears with conditions*. Both found that the vision store's border, as first drawn, cut off the bounds feed it was meant to supply, and that a read by path would slip past an import rule. Folded: the one door, `goalOutlays()`, named in the vision store row; CI enforcing the border by import, alias and path and in the scripts; no league player's session given the store. Ashen's further conditions (who sets a source's staleness age, a market goal's value shown alone, the surplus stamped) are design principles matters, folded there (1.1.2).

**Nyx, Cluster D Censor (6 Nov 2026): amended.** The instrument is right. Folded:
- the vision store border promised more than CI sees: CI enforces the code (imports followed transitively, alias, path) and the scripts (a heuristic, said so); what a session reads is a conduct rule she reviews, cited by the league rules when written;
- a market goal's value is worked out in the Interface, not exported from the Capital, which comes first in the Road and cannot read Intake;
- matter 3 covers every household figure, hand-kept ones included; matter 1 keeps "stated once, earmarked apart, applied";
- §3's claim about theses corrected; the decree's ground stated (the Charter's own terms, recorded in decree shape under canon-proc-004; corrected at her final check, LGTM once folded); Art. 10 §4 in decree clause 2; the interaction record and handoff in the recording list; "never a judgement" in clause 2; the store's files opaque to sync;
- her answer on insurance: protection cover is not a position, a market-linked policy becomes one when counsel names buying, surrendering or switching it. Added to the Household ↛ Ledger row.

Next: the Sovereign's decree.

## Open for the reviewers

1. **Nyx** (answered at her review, 6 Nov 2026):
   - Household ↛ Ledger is right for protection cover; a market-linked policy is a position when counsel names buying, surrendering or switching it (folded into the row).
   - Extending matters 1 and 3 is honest once each extension reads the same kind of evidence as the matter it extends (folded).
   - The import rule is necessary but not sufficient; the conduct rule completes it (folded).
2. **Sovereign:** the decree.

*Drafted in the Codex archive, where constitutional records live. Nothing in MyFin is changed by this draft until it is ratified.*
