# War Time 2026-04-24 — Addenda (Aurelius shift)

**Chronicler:** Aurelius (`aurelius-05`)
**Drafted:** 2026-04-24 (Hour ~14) → updated 2026-04-25 (Hour ~31)
**Scope:** War Time 2026-04-24 → 2026-04-27 (72-hour campaign per `docs/sessions/WAR_TIME_SESSION_2026-04-24.md`)
**Authority:** Chronicler's working record. **Not constitutional.** Surfaces candidate doctrine for post-war Cabinet review per §"Post-War Review (Within 7 Days)" of the campaign declaration.

---

## What this is

This bundle exists because the rulings, habits, and reusable artifacts that accumulated during the Aurelius shift are scattered across PR comments and session contexts. Without a consolidated Codex-side record, they die when sessions compact or close.

Three properties this bundle tries to hold:

1. **Persistent across session boundaries.** Future Aurelius / Chronicler sessions read this on wake instead of reconstructing from PR archaeology.
2. **Candidate doctrine, not yet ratified.** Everything inside is the Chronicler's synthesis. Post-war review (within 7 days per §Post-War Review of the campaign declaration) determines what graduates to permanent canons / edicts and what stays as session lore.
3. **Propagate beyond the war.** Habits that held under stress, rulings that resolved genuine conflicts, and drafts that successfully armed parallel sessions — these are the intended carry-forward artifacts.

---

## Structure (file index)

| File | Subject |
|---|---|
| [`01-rulings.md`](./01-rulings.md) | Doctrines (D-series) and operational rulings (R-series) ratified mid-PR during the shift |
| [`02-habits.md`](./02-habits.md) | Process habits — standing orders for Builders / Cipher / Aurelius |
| [`03-drafts.md`](./03-drafts.md) | Reusable prompts and directives — Cipher opening prompt, arming directives, handoff templates |
| [`04-cautionary-tales.md`](./04-cautionary-tales.md) | Failures, near-misses, and infrastructure discoveries worth recording |
| [`05-process-flow.md`](./05-process-flow.md) | Builder → Cipher → Aurelius + Sovereign loop, merge authority boundaries, escalation paths |

Hour-based chronicle entries live as separate files at this directory's parent level (`docs/sessions/`), per the convention established by the campaign declaration:

| Chronicle file | Status |
|---|---|
| `WAR_TIME_2026-04-24_HOUR_24_CHRONICLE.md` | Drafted at Hour ~31 (backdated; lateness disclosed in-file) |
| `WAR_TIME_2026-04-24_HOUR_48_CHRONICLE.md` | Skipped per Sovereign's A3 sequencing (rolled into Hour 72 synthesis) |
| `WAR_TIME_2026-04-24_HOUR_72_CHRONICLE.md` | Pending — drafted at War Time close |

---

## What this is **not**

- **Not a constitutional amendment.** Book I (Sovereign's Covenant, Four Pillars, Ladder, Cabinet seats) is inviolable. Per the campaign declaration: *"This is health intervention, not governance amendment."* No content here amends Book I.
- **Not a per-session journal entry.** Per-session structured records live in `data/journal.json` (canon-0053 v1 schema) and `docs/companion-logs/` per repo. This bundle is the campaign-level synthesis, not the session-level chronicle.
- **Not the formal Hour 72 synthesis.** The Hour 72 entry will draw from this bundle but is its own artifact, drafted at War Time close.

---

## Reading order

For a Chronicler / Sovereign reviewing post-war:

1. `01-rulings.md` — what was ratified, with citations to the originating PRs.
2. `04-cautionary-tales.md` — what we learned the hard way; pairs with §Cautionary Tales of the campaign declaration's lore-recording schema.
3. `05-process-flow.md` — the operating system that emerged across the shift.
4. `02-habits.md` — practices that held under stress; carry-forward candidates.
5. `03-drafts.md` — reusable text artifacts; useful for next-campaign arming.

For a future Builder picking up an inheriting campaign (e.g. `inv-1-3`, sep-dashboard Phase 4):

1. `02-habits.md` — what to do.
2. `03-drafts.md` — paste-ready arming.
3. `01-rulings.md` — what's settled, what's still candidate.
4. `04-cautionary-tales.md` — what to avoid.

---

## Citation conventions

Following Codex `data/canons.json` numbering and `WAR_BRIEF_*.md` voice:

- **Doctrines:** `D1`, `D2`, … (named in `01-rulings.md`)
- **Rulings:** `R-1`, `R-2`, … (operational; named in `01-rulings.md`)
- **Canons (existing Codex):** `canon-{type}-{number}` (e.g. `canon-0007-zi-innerhtml`, `canon-cc-016`)
- **Edicts:** Roman numerals (Edict V, Edict VIII)
- **Pillars:** Pillar I–IV
- **PR references:** `<repo>#<number>` (e.g. `sep-dashboard#7`)

War Time canon-scope ruling (R-1) applies throughout: cite canons by number regardless of `"scope"` field for the campaign window.

---

## Revisions

| Date | Author | Note |
|---|---|---|
| 2026-04-25 (Hour ~31) | Aurelius (`aurelius-05`) | Initial draft — bundle created from in-flight session context per Sovereign's "close this phase of war properly" directive |

---

*Closure pending. Hour 72 synthesis to follow at War Time close.*
