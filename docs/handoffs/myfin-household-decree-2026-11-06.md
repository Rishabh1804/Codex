# MyFin: the Household Region decree

**Drafted:** 2026-11-06 by Aurelius (Chronicler)
**Covers:** MyFin Charter Amendment 1 (the Household Region, with the vision board clause) and MyFin design principles amendment 1.1
**Status:** Amendment 1 **RATIFIED** by decree 0033, 2026-11-06. Design principles 1.1 **RATIFIED** the same day (Province-scoped, session-level). Design principles 1.2 (colours distinct across sets) to be drafted.

---

## How the chain ran, 6 November 2026

| # | Step | Seat | Outcome |
|---|---|---|---|
| 1 | The Sovereign asks for a vision board, chooses MyFin's Plans as its home, and rules on its shape and on mixed colours | Sovereign | Ruled |
| 2 | The vision board clause written into Amendment 1; design principles 1.1 drafted; the canvas drawn | Aurelius | Codex PR #109, MyFin PR #7 |
| 3 | Round 1 | Aven, Ashen | Aven: revise (Charter), clears with conditions (design). Ashen: clears with conditions |
| 4 | Re-checks | Aven, Ashen | Both found the vision-store border cut off the bounds feed; one door added (`goalOutlays()`). Ashen then **clears**; Aven's last condition (allowed imports rejected) fixed |
| 5 | Nyx's Edict V pass | Nyx | Amended twice (a re-export bypass, transitive imports, the market goal's value and the Road, the decree's ground), then **LGTM once folded** |
| 6 | Decree and ratification | Sovereign | **Decree 0033**; design principles 1.1 ratified; colours distinct **across sets** too, against Nyx's within-set reading |

## What decree 0033 does

- **MyFin gains a Household Region** for the Architect's capital outside markets: balances, cash flow, spending, insurance and planned outlays, each stamped with source and date. The Road becomes `data → ledger → intake → household → analysis → risk → views → start`.
- **Household supplies facts to Risk and never sets a bound.** A vision board goal's cost and date reach Risk as a planned outlay, counted once, by one door; earmarked sums are stated apart for the Sovereign to decide.
- **It names no position and writes nothing to the Ledger.** A market-linked insurance policy becomes a position when counsel names buying, surrendering or switching it.
- **The vision board** records goals in every area of life and a monthly rating of each, and reasons only about their money. No companion counsels on, rates or scores a goal. A goal is never a position.
- **The vision store is read by the Interface alone**: in code by CI (gate 15), in companions' sessions as a conduct rule the Cluster D Censor reviews.
- **Ashen's matters 1 and 3** reach the bounds feed and every household figure. The list stays six.

## Recorded

| Surface | Done |
|---|---|
| `docs/charters/MYFIN_CHARTER_2026-08-26.md` | §2, §3, §4, §6 merged; Amendments index entry |
| `docs/charters/MYFIN_CHARTER_AMENDMENT_1_HOUSEHOLD_2026-11-03.md` | Status RATIFIED; Decree section |
| `data/journal.json` | `decree-0033-myfin-charter-amendment-1-household`; session `s-2026-11-06-myfin-vision-board-and-household` |
| `data/volumes.json` | `myfin-household-region` complete; todo-0069 resolved; todo-0071 opened (design principles 1.2) |
| `data/interactions.json` | `interaction-2026-11-06-001`, archived |
| `CLAUDE.md` | The Cluster D line names decree 0033 |
| MyFin repo | APP_PLAN §0 and §1; design principles 1.1 ratified, §10.1's wait on the amendment lifted |

## Still open

1. **Design principles 1.2:** every area of life and every category its own colour across both sets. About 15 colours are needed; the primaries and their mixes give at most 13, so lighter or darker steps of a primary are added. Review by Aven, Ashen and Nyx.
2. **The league rules** are still in discussion (todo-0067), with the foreign cost schedule for a CA (todo-0068).
3. **App slice 1b** is now chartered: `store.ts`, then the household screens and the vision board.
