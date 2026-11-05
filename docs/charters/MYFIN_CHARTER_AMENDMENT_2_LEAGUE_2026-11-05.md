# MyFin Charter: Amendment 2, the Sandbox League

**Status: DRAFT, not ratified.** Drafted by Aurelius (Chronicler), 5 November 2026, at the Sovereign's direction ("Draft decree and check the codex to fill out the lore and every other section, as needed for this").
**Amends:** `docs/charters/MYFIN_CHARTER_2026-08-26.md` (decree 0028): §4 Borders and §6 Ashen's seat.
**Carries:** the draft decree for the league (below), and canon-inst-009 (`data/canons.json`, status *pending*).
**Chain:**
1. Ashen reviews, for his seat and his new office.
2. Nyx signs off (Cluster D Censor, Edict V).
3. The Sovereign decrees.

**Decree number:** assigned at the sitting. MyFin Charter Amendment 1 (the Household Region, drafted 3 Nov 2026) also awaits a decree; whichever is decreed first takes 0032.

## At a glance

**The Sovereign has made MyFin's points sandbox a league, and the league needs two things only the Codex can grant:**
- **an office for Ashen** outside his risk seat, because Charter §6 gives the Governor of Risk "these matters and no others";
- **a door for every other Province's companions**, because cross-Province work is a Codex matter (Book III).

The amendment creates the office and opens the door. It changes nothing in Ashen's six risk matters, and it gives no player any hold on real capital.

## Why

On 5 November 2026 the Sovereign ruled:
- the Sovereign plays in MyFin's points sandbox (APP_PLAN §10, stage 1);
- the real portfolio is shown beside the players as points;
- the sandbox becomes a league;
- companions of every Province may play;
- Ashen governs it.

The league's rules are drafted in the MyFin repo at `docs/SANDBOX_LEAGUE.md` (draft 0.3). They set a financial-year season of 38 weekly rounds, a Premier Division of 20, a top-5 play-off, and promotion and relegation.

Both of MyFin's review seats found the same gap when they reviewed those rules:
- **Ashen** (*clears with conditions*): "§3 is outside my seat as written. Charter §6 says the Governor of Risk governs 'these matters and no others', and running a league is not one of the six." He asked for the office to be recorded by decree as a separate one.
- **Nyx** (*amended*) found the same, and added that opening the league to every Province is a Codex matter. She also recused herself from playing, because she hears the appeals.

Neither seat can grant this itself. Charter §6 says its list is "amendable by the authority that declared the activation", which is the Sovereign by decree (0030). So the Sovereign must decree the office. The league rules cannot be ratified until that decree is made.

## Amendment text

### §6: after "Enumerated jurisdiction", add

> **A separate office: governing body of the MyFin Sandbox League** (Amendment 2). The Governor of Risk also holds the office of governing body of the league kept in MyFin's points sandbox (`docs/SANDBOX_LEAGUE.md`, as ratified). The office is not a seventh risk matter. It adds nothing to the six above and takes nothing from them. Its duties and limits are those the league rules set: Ashen checks orders against the rules, signs the ledger the scorer writes, publishes the tables and reports, and rules on disputes. He does not play, change a rule, or touch a player's order. His league duties never inform his audits of counsel, and those audits never use the league table. The evidence of skill shown beside counsel is the scorer's computed record, never his report. He staffs the office from his own Scribe detail (Book II Art. 3-bis). An agent beyond that needs his case to the Sovereign.

### §4 Borders: add one row

> | **MyFin ↔ every other Province: the league** | A seated companion of any Province may hold one account in MyFin's Sandbox League and play under its rules. Play is not counsel: a player from another Province builds a league record only. That record is never shown beside counsel and never confers any part of MyFin's mandate, which stays with the companions this Charter names (Art. 10 §7). Points are not Treasury currency and not the Architect's capital; no point is spent, moved or converted into either. The league reaches no other Province's territory. Its players come to it. |

### §6: one line on appeals

> **Appeals in the league** go to the Cluster D Censor (Nyx), who holds no account. A ruling that touches a MyFin-chartered companion's record goes to her first.

## The decree (draft)

> **Decree [number at the sitting]: MyFin Charter Amendment 2, the Sandbox League; canon-inst-009.**
>
> The Sovereign, by the authority that activated the Governor of Risk's seat (decree 0030) and enumerated its jurisdiction (decree 0028), decrees:
>
> 1. **The league office.** Ashen, Governor of Risk of MyFin, holds the separate office of governing body of the MyFin Sandbox League. It adds nothing to his enumerated risk jurisdiction and takes nothing from it. He holds no account in the league.
> 2. **Open to every Province.** Any seated companion of any Province may play in the league, as a league record only and never as counsel on the Architect's capital.
> 3. **Appeals.** The Cluster D Censor hears appeals in the league and holds no account.
> 4. **What this does not move.** Nothing in this decree touches Article 10 §2's inalienable limit, the revision prohibition of §5, or the firewall of §1. A reward in which a companion decides with real capital stays outside any decree's reach (Art. 10 §7).
>
> The MyFin Charter is amended accordingly (Amendment 2). canon-inst-009 is active from this decree.

## What this amendment does not do

- **It does not ratify the league rules.** They ratify in the MyFin repo, after this decree, by the Sovereign. They are a Province document under this Charter.
- **It does not settle rewards.** The league rules leave rewards to the laws for the sandbox, with limits that hold now (league rules §10):
  - no reward in capital a companion decides with;
  - no reward priced in points;
  - a Treasury reward goes through Book IX.
- **It does not create a seat.** The office attaches to Ashen's seat and lapses with it. A successor in the seat succeeds to the office only by a further decree.
- **It does not change Ashen's six risk matters.**
- **It does not give any player a part in counsel.**

## What is recorded at ratification

When the Sovereign decrees, the Chronicler records it on these surfaces, following the 16 October precedent:
1. **This Charter:** Amendment 2 is merged into `MYFIN_CHARTER_2026-08-26.md` §4 and §6, with an amendment note.
2. **`constitution/main.typ` Amendment History:** a row for the decree.
3. **`data/journal.json`:** a `decree-00NN-myfin-charter-amendment-2-sandbox-league` record in the canonical v1 shape (canon-proc-004).
4. **`data/canons.json`:** canon-inst-009 moves from *pending* to *active*, with the decree in its references. The lore doctrine *An umpire does not play* moves from *pending* to *active*.
5. **`data/companions.json`:**
   - Ashen's `assignment.current_assignments` gains "Governing body, MyFin Sandbox League (Charter Amendment 2)";
   - Nyx's gains "Appeals, MyFin Sandbox League";
   - both are profile changes under canon-cc-012 per-block discipline, put to the Sovereign as blocks.
6. **`data/volumes.json`:** MyFin's *Sandbox League* chapter moves on, and its decree todo resolves.
7. **`CLAUDE.md` (Codex):** the Cluster D line in the Constitutional Layer names Ashen's league office and the league, under canon-pers-001's hotfix rule or its chain, whichever applies.
8. **`data/interactions.json`:** `interaction-2026-11-05-001` (the review rounds, retrospective) closes its review.
9. **The MyFin repo:**
   - `docs/SANDBOX_LEAGUE.md` §12 cites the decree;
   - its ratification follows;
   - design principles §15's league display rules lose their *provisional* mark when the rules ratify.

## Open for the reviewers

1. **Ashen:** is the office's text in §6 the office you asked for: separate, adding and taking nothing, with Scribe staffing?
2. **Nyx:**
   - Is a Charter amendment under decree 0030's authority the right instrument, or does cross-Province play need a Book III text too?
   - Is canon-inst-009 correctly decree-shaped under canon-proc-004 (global scope, since it crosses Provinces)?
3. **The Sovereign:** the decree, and whether the office should outlast a change of seat-holder.
