# MyFin: the Sandbox League decree

**Drafted:** 2026-11-05 by Aurelius (Chronicler)
**Covers:** MyFin Charter Amendment 2, canon-inst-009 and the MyFin league rules
**Status:** Amendment 2 and canon-inst-009 **RATIFIED** by decree 0032, 2026-11-05. The league rules (`docs/SANDBOX_LEAGUE.md` in the MyFin repo) are still a draft.

---

## How the chain ran, 5 November 2026

| # | Step | Seat | Outcome |
|---|---|---|---|
| 1 | The Sovereign makes the sandbox a league and Ashen its governing body | Sovereign | Ruled |
| 2 | League rules draft 0.1 reviewed | Ashen, Nyx | Both found the office outside Ashen's seat (Charter §6, "these matters and no others") and the cross-Province door a Codex matter |
| 3 | Amendment 2 and canon-inst-009 drafted | Aurelius | Codex PR #107 |
| 4 | Ashen reviews | Ashen | Clears with conditions, then **clears** |
| 5 | Nyx's Edict V pass | Nyx | Amended twice, then **LGTM** at `5a29ed6` |
| 6 | Decree | Sovereign | **Decree 0032.** Against the draft on one point: admitted companions play only from the first season after naturalization |

## What decree 0032 does

- **Ashen holds a separate office** as the league's governing body. It adds nothing to his six risk matters and takes nothing from them.
  - He does not play.
  - He signs the scorer's lines as transcriptions only.
  - He staffs the office from his Scribe detail.
  - The office lapses when he leaves the seat. Until a further decree, the Sovereign's nominee (neither a player nor the Censor) holds it.
- **Any seated companion of any Province may play**, as a league record only and never as counsel. An admitted companion (Book VIII Art. 7) plays only from the first season after its naturalization.
- **The Cluster D Censor hears appeals.** She never rules at first instance, her reach is league records only, and she holds no account.
- **The real portfolio's points** stay on the Sovereign's screen only.
- **Nothing in the decree moves Art. 10 §1, §2 or §5.**

## Recorded on

- `docs/charters/MYFIN_CHARTER_2026-08-26.md`: the §4 row, the §6 office, and an Amendments section.
- `docs/charters/MYFIN_CHARTER_AMENDMENT_2_LEAGUE_2026-11-05.md`: marked ratified, with the decree text.
- `data/journal.json`: `decree-0032-myfin-charter-amendment-2-sandbox-league`, and the session entry.
- `data/canons.json`:
  - canon-inst-009 is active, with its prose status corrected;
  - the doctrine *An umpire does not play* is active;
  - the chronicle is updated.
- `data/volumes.json`: MyFin's phase and its league chapter; todo-0066 resolved.
- `data/interactions.json`: `interaction-2026-11-05-001` archived.
- `CLAUDE.md`: the Cluster D line and the canons list.
- **Not** `constitution/main.typ`: the Amendment History table carries decrees that touch the Constitution's source, and this one does not. The PDF is not rebuilt.

## Still open

1. ~~Ashen's and Nyx's profile blocks.~~ **Approved by the Sovereign, 2026-11-05** (canon-cc-012, per block). Recorded in `data/companions.json`: Ashen's `current_assignments` gains the league office, and Nyx's gains league appeals.
2. **The league rules ratify in MyFin.** Five questions are open: the single-holding cap, play-off match lengths, qualifying theses, the foreign price source, and rewards.
3. **Charter Amendment 1 (the Household Region)** still needs Aven's review, Nyx's sign-off and a decree. It takes the next number.
4. **A foreign cost schedule** needs a CA check before foreign trades open (todo-0068).
