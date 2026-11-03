# MyFin Charter: Amendment 1, the Household Region

**Status: DRAFT, not ratified.** Drafted by Aurelius (Chronicler), 3 November 2026, at the
Sovereign's direction: Sovereign MCQ on 3 Nov 2026, "Amend: Household Region".
**Amends:** `docs/charters/MYFIN_CHARTER_2026-08-26.md` (decree 0028), §2 Regions, §3 Roads, §4 Borders.
**Ratification path:**
1. Builder review by **Aven**.
2. Cluster D Censor sign-off by **Nyx**.
3. Sovereign decree.

Aven's seat is *appointed*, so the Sovereign discharges what the Builder cannot yet. Reordering the Road is a constitutional act under Book III (Charter §3), which is why this is an amendment and not a refactor.

---

## Why

The Charter mapped the Regions that counsel on market positions. It left out the Architect's
capital that sits outside markets, and the facts every bound is drawn from:

- **cash and bank balances;**
- **the monthly cash flow:** income, committed outflows, spending;
- **the reserve floor;**
- **insurance;**
- **planned large outlays.**

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

### §2 Regions: add one row

| Region | Projected LOC | Character | Modules |
|---|---|---|---|
| **Household** | ~900 | The household's facts: cash and bank balances, cash flow, spending, insurance, planned outlays. Every figure is stamped with its source and as-of date. Supplies the **reserve and cash-flow bounds** to Risk. Holds research and facts; names no position. | `household.js`, `household/` (records and research) |

Projected total becomes **≈ 5,600 LOC**, still below every threshold in the cascade. Measured at
drafting: `household/` holds records and documents, plus three scripts of 526 lines
(`scripts/`), which generate the household dashboard and summaries.

### §3 Roads: the Road becomes

```
data → ledger → intake → household → analysis → risk → views → start
```

**Household sits after Intake and before Analysis.** It reads Intake (balances, prices) and
is read by Risk. No thesis can reach Risk, and so no position can reach the Ledger, without
the household bounds in place. The Charter's load-bearing line is unchanged and extended:

> **Analysis may not write to Ledger. It must pass through Risk.** Risk reads Household.

### §4 Borders: add three rows

| Border | Care required |
|---|---|
| **Intake → Household** | The provenance boundary of §4 applies unchanged: a balance or price without source and as-of does not cross. |
| **Household → Risk** | The bounds feed. Household supplies the reserve-floor and cash-flow figures from which the Sovereign's bounds are set. Household **never sets a bound**: it supplies the facts, and the Sovereign sets the bound (Art. 10 §4). |
| **Household ↛ Ledger** | **No write.** Household names no position and writes nothing to the Position Ledger. Insurance and outlay research is counsel in the ordinary sense, but it is not a *position* under Article 10. A household decision that is a market position (selling holdings to fund an outlay, borrowing against investments) is entered in the Ledger through the Road like any other. |

### §4: one further care, privacy

Household records name family members other than the Sovereign:

- they are **kept only in the private Province repository**;
- **identifiers are masked** (account and policy numbers, PAN, member IDs);
- **source documents carrying identifiers stay out of the repository.**

This Charter, and the Codex archive generally, carry no household figures. That keeps Article 10's firewall in both directions.

---

## What this amendment does not do

- It does not touch **Capital**: Ledger, `data.js`, `store.js`, `start.js`. Edict V attaches to Capital and is unaffected.
- It grants **no executing facility** (§4, *MyFin ↔ the world*). Household records payments the Sovereign has made; it makes none.
- It **seats no one.** Household falls under the Builder (Aven). Its integrity questions, provenance and staleness, fall under Ashen's existing jurisdiction (Charter §6). No new seat is warranted at ~900 LOC.

---

## Open for the reviewers

1. **Aven:** is `household.js` the right shape, or should the Household Region be records plus read-only views until the code Regions exist?
2. **Nyx:** is the "Household ↛ Ledger" line drawn correctly? In particular, is insurance cover a *position* under Article 10? This draft says it is not.
3. **Sovereign:** the decree.

*Drafted in the Codex archive, where constitutional records live. Nothing in MyFin is changed by this draft until it is ratified.*
