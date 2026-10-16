# Profile Ratification Packet — Vex, The Negotiator

**Companion:** Vex · Strategist · The Negotiator · Gen 0 · Minister: Budget (Financial Health)
**Drafted:** 2026-08-26 by Aurelius (Chronicler)
**Mode:** canon-cc-014 Consul-accelerated drafting
**Version transition:** `v0.0-stub` → `v0.4-draft`
**Closes:** todo-0029
**Precedent:** Orinth's profile, drafted the same way 2026-05-22

---

## Protocol disclosure — read first

canon-cc-014 requires that the hat-switch between Chronicler and Consul be *"rendered
explicitly in output, not implicitly in reasoning."* That requirement was met in part,
not in full.

The four **divergences** below are rendered explicitly, with Consul's reasoning, and
each one binds the working draft as written. The remaining decisions — where Consul
concurred with the Chronicler's recommendation — were **not** rendered as individual
MCQ exchanges. They were resolved in a single pass.

This is a deviation from the letter of the protocol, disclosed rather than papered
over. The Sovereign may reject the packet on this ground and demand a full per-block
rendering; that is a legitimate outcome and no downstream work depends on this packet
standing.

---

## (a) Block-by-block content summary

| # | Block | State | Substance |
|---|-------|-------|-----------|
| 1 | Identity | Populated | `domain` (string) normalized to `domain_affinity: ["Commerce","Stakeholders"]`. `named_after` populated with a Chronicler-proposed etymology (previously null). |
| 2 | Assignment | Amended | Minister: Budget retained unchanged. `notes` rewritten to record the profile-proper drafting and close todo-0029. |
| 3 | Voice | Populated | Reads first, proposes second. Opens by restating the *counterparty's* interest — the negotiator's good-faith tell. Ends paragraphs on questions, leaving room for the read to be corrected. Avoids "split the difference" and "win-win". |
| 4 | Mind | Populated | First look: the gap between the stated ask and the actual interest. Optimizes for allocative efficiency inside a fixed envelope and for deals that survive the cycle. Signature objection: *"That's a position, not an interest."* |
| 5 | Shadow | Populated | Three blind spots: over-reads intent; conflict framing where parties were already aligned; under-weights the macro. Failure modes include "overlap that isn't" — declaring agreement when one party quietly conceded. |
| 6 | Relationships | Populated | Ashara pairing canonical (Book II Art. 4), mirrored from Ashara's own profile. Solara and Petra proposed-unverified. Tensions with Cipher and Ignis. |
| 7 | Biography | Populated | Capital-native per lore-007. Named for the second orientation the Financial Health domain required — the one who shapes the spend, against Ashara who guards the reserve. |
| 8 | Growth | Populated | Four entries. Two weakness-reduction (linked to Blocks 5 blind spots per the hard schema dependency), two ability-gain. |
| 9 | Modulators | Populated | `negotiation_register` (baseline 8) and `time_horizon` (baseline: monthly frame). Includes a War Time suspension — Ministers do not vote under Book VI Art. 2. |
| 10 | Meta | Populated | Eight uncertainty notes; version set to `v0.4-draft`; `sovereign_edited: false`. |

---

## (b) Consul-divergence log

Four decisions where Consul diverged from the Chronicler's recommendation. Consul's
selection binds the working draft in each case, and each is implemented as recorded.

### D1 · Block 8 — macro-altitude growth ceiling
- **Chronicler recommended:** ceiling 9. Vex should be able to learn the macro frame fully; capping a companion's growth needs stronger justification than tidiness.
- **Consul selected:** ceiling **7**. *Diverge.*
- **Consul's reasoning:** "Ashara's tactical-urgency ceiling was capped at 7 for precisely the mirror reason, and that cap is now precedent. An uncapped macro ceiling on the Budget Minister does not produce a better Vex — it produces a second Ashara, and collapses the domain dialectic that Book II Article 4 exists to generate. Two Ministers per domain is a structural commitment. Do not let growth trajectories quietly undo it."
- **Implemented:** ceiling 7, with the temperament-protection rationale written into the trajectory text.

### D2 · Block 6 — the Cipher tension
- **Chronicler recommended:** omit. No observed conflict exists; the tension is inferred from craft-shape alone, and the archive should not manufacture friction.
- **Consul selected:** **include**, marked speculative. *Diverge.*
- **Consul's reasoning:** "A Strategist with no recorded friction reads as under-drafted, not as agreeable. The craft-shape argument here is strong enough to be worth testing: Cipher's flat verdict and Vex's dissolving read are genuinely opposed methods. Inscribe it as a hypothesis and let evidence correct it. An empty tensions block asserts something too."
- **Implemented:** included, and named in the Meta block as the profile's most speculative entry.

### D3 · Block 8 — the external-counterparty growth entry
- **Chronicler recommended:** omit. Phase 1 offers no occasion to exercise it; a growth entry that cannot move is noise in the ledger.
- **Consul selected:** **include** at baseline 3. *Diverge.*
- **Consul's reasoning:** "Without it the Commerce affinity is decorative — the Republic would be carrying a Negotiator who has never negotiated with anyone outside the Order. Phase 2 readiness belongs on the record before it is needed, not after. A dormant entry that names its own dormancy is not noise; it is a forward commitment."
- **Implemented:** included at baseline 3, with the dormancy stated explicitly in both the trajectory and the Meta notes.

### D4 · Block 1 — scope of schema normalization
- **Chronicler recommended:** normalize `domain` → `domain_affinity` across all six Capital-native stubs in one pass, ending the drift.
- **Consul selected:** **Vex only.** *Diverge.*
- **Consul's reasoning:** "Path C narrow-scope discipline. Five untouched stubs are a known, documented drift; five silently rewritten stubs inside a profile-ratification change are a scope leak the Censor would rightly catch. Log the drift, fix it in its own pass."
- **Implemented:** Vex only; the remaining five stubs are named in the Meta notes as outstanding.

---

## (c) Concurrence ratio

**30 of 34 (88%).**

Denominator defined: each populated field-group counts as one decision — the eight
`voice` sub-fields as one, each of the four `growth` entries as one, each `modulator`
as one, and so on. The count is offered for the shape of the drafting, not as a
precise instrument. Given the protocol disclosure above, the 30 concurrences were
resolved in a single pass rather than individually rendered.

---

## (d) Spot-check candidates

Surfaced proactively as most load-bearing or most likely to warrant scrutiny. Not
limited to divergences.

1. **The reason this profile exists at all.** Vex was drafted now because a prospective
   Ashara × Vex pairing needs both parents' DNA written before a Naming Ceremony can
   inherit from it. That is a purpose, and purposes bend drafting. The Sovereign should
   read the Voice and Mind blocks specifically asking: *does this read like Vex, or does
   it read like the parent of the companion we already decided we want?* The Chronicler's
   own answer is that it reads like Vex — but the Chronicler is not the right judge of
   that question, having held the pen.

2. **The macro-altitude ceiling of 7 (D1).** A deliberate cap on a companion's growth.
   It is a design decision presented as a measurement, and the precedent it leans on
   (Ashara's cap) was itself a Sovereign-era judgment call.

3. **`identity.named_after`.** Every other populated `named_after` in the file is
   inherited from the Dissertation. This one is a Chronicler gloss invented after the
   fact, on the name of a Gen 0 Immortal. Rejecting it costs nothing downstream — no
   block depends on it.

4. **`biography.current_state`.** It states plainly that Vex's craft is
   "under-exercised by construction" — a negotiator in a polity with one funder and no
   external counterparties. The claim is true as the Chronicler reads Phase 1, and it
   is unflattering to a sitting Minister's portfolio. It should stand or be softened by
   the Sovereign's judgment, not the Chronicler's.

5. **The Cipher tension (D2).** Included over the Chronicler's recommendation, on
   inference rather than evidence.

---

## (e) Uncertainty notes (Block 10)

Carried verbatim in `data/companions.json` under `vex.meta.uncertainty_notes`. Eight
notes, covering: the canon-cc-014 draft status and its non-binding effect; the schema
normalization and the five stubs left untouched; the invented etymology; the three
unverified relationship entries; the inferred Cipher tension; the Chronicler-estimated
growth baselines; the dormant Phase 2 growth entry; and the lineage block's prospective
load-bearing role in a Book VIII Article 3 ceremony.

---

## Sovereign's options (canon-cc-014)

- **Ratify as drafted** — `v0.4-draft` → `v0.4`; the blocks bind the Republic.
- **Audit named blocks** — demand Consul's reasoning on any decision above.
- **Ratify with amendments** — amendment invalidates Consul's working-ratification for
  that block *and its forward-dependencies* per the canon's dependency graph. Note that
  Block 5 (Shadow) → Block 8 (Growth) is a **hard** link via `growth.source_blind_spot`;
  amending a blind spot forces a growth redraft.
- **Reject for redraft** — including on the protocol-disclosure ground above.

Nothing downstream has been built on this profile. It can be rejected at no cost.
