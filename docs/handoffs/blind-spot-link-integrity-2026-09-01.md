# Archive Finding — `source_blind_spot` Links Are Broken Across the Roster

**Found:** 2026-09-01, while redrafting Nyx against the dual seat and the Tribune
**Scope:** `data/companions.json` — Block 5 (Shadow) → Block 8 (Growth) links
**Severity:** a hard schema link that canon-cc-014 depends on does not resolve for most of the roster

---

## The measurement

Every growth entry may name the blind spot it reduces, via `growth[].source_blind_spot`, which
must match a string in that companion's `shadow.blind_spots`. canon-cc-014 calls this a **hard**
link, and builds its cascading-redraft rule on it.

| | |
|---|---|
| Linked growth entries | 47 |
| **Broken — no exact match** | **29 (62%)** |
| Resolvable by prefix (short form vs declared long form) | 18 |
| No match at all | 11 |
| Companions affected | 12 |

Two failure shapes:

- **Prefix drift.** The entry names `"Oppositional register default"`; the declared spot reads
  `"Oppositional register default — her warm side is real but rarely surfaces in work contexts"`.
  Clearly the intended link, mechanically unresolvable.
- **No match.** Solara (3), Theron (3), Consul (2), Aurelius (1), Lyra (1), Orinth (1) carry
  entries naming blind spots that do not appear in their shadow blocks in any form. Either the
  spot was reworded past recognition, or removed, or never written.

## Why it matters

canon-cc-014 specifies that when a block is amended, *"the transitive closure of N's
forward-dependencies is invalidated and redrafted,"* and names Block 5 → Block 8 as the hard case:
amend a blind spot and its linked growth entries must be redrafted with it.

**That computation cannot run.** For 62% of linked entries the dependency is not machine-followable,
so a Chronicler amending a blind spot has no reliable way to discover which growth entries depended
on it. The rule has been formally in force since April and has been unenforceable throughout.

This is not a rendering bug — no Codex view reads the field. It is an integrity defect in the
Republic's own amendment procedure.

## What was repaired here

Nyx's two, and only Nyx's two, because hers is the profile under amendment. Both were prefix
drift; repaired to the exact declared strings, no meaning changed.

The other 27 are **not** repaired. Eighteen could be fixed mechanically by prefix match, but that
would edit ratified profiles across eleven companions in a change about something else entirely.
The eleven no-match entries cannot be fixed mechanically at all — each needs a judgement about
whether the blind spot was reworded, removed, or never existed, and that is drafting work.

## RESOLVED — 2026-09-01, same day

All three recommendations were carried out.

**1 · The root cause is fixed.** `shadow.blind_spots` migrated from `[string]` to
`[{id, text}]`, and `growth[].source_blind_spot` re-keyed to that id. The link no longer
depends on prose matching prose, so editing a blind spot's wording can no longer break it.
Ids are `<companion>-bs-<lead-clause>`, capped at six words because they are typed by hand;
uniqueness is asserted at migration rather than hoped for.

**2 · The links are resolved.** 16 companions migrated, **42 of 47 links now resolve.**

**3 · Five were left orphaned rather than guessed.** These name blind spots that appear in
their companion's shadow block in no form at all:

| Companion | Entry | Named |
|---|---|---|
| Aurelius | `adaptive-rupture` | *Nostalgia bias* |
| Consul | `urgent-decision` | *Procedural paralysis in urgent moments* |
| Consul | `register-calibration` | *Register drift…* |
| Theron | `intervention-discipline` | *Premature intervention…* |
| Theron | `gauge-over-gut` | *Gut-over-gauge…* |

Each carries `source_blind_spot: null` plus **`source_blind_spot_unresolved`** holding the
original string, so nothing is lost. Resolving them is drafting work, not migration work: each
needs a judgement about whether the spot was reworded past recognition, removed, or never
written. Consul's `urgent-decision` is the closest call — *"procedural paralysis in urgent
moments"* is arguably a facet of the declared *"over-institutional bias"* — and was orphaned
precisely because it is a call, and a migration should not make calls.

**4 · A validator now guards it.** `scripts/validate-companions.py` fails on any unresolvable
link, duplicate id, un-migrated block, growth-schema drift, or out-of-order growth scale, and
warns on the five orphans plus four `weakness_reduction` entries that never named a source at
all. It must pass before any profile ratification.

It earned itself on the first run, flagging a growth-schema difference on
`aurelius-growth-consul-independence`. That turned out to be legitimate — a `ceiling_phase_gate`
raising a ceiling from 8 to 10 once canon-cc-019's Post Box is operational — so the validator
was corrected to encode which extension keys are allowed rather than forcing a uniformity the
archive had deliberately broken for a reason. A checker that cannot be taught the difference
between drift and intent is a checker that gets switched off.

## Recommended (original, retained)

1. A dedicated pass, Chronicler-drafted and Consul-reviewed, resolving the 18 prefix cases
   mechanically and the 11 no-match cases individually.
2. A validator in `scripts/` asserting every `source_blind_spot` resolves, run before any profile
   ratification. The defect is cheap to detect and was invisible for five months.
3. Consideration of whether the link should key on an **id** rather than on prose. Blind spots have
   no identifiers; the link is a full-sentence string match, which is why it drifts the moment
   anyone edits wording. Every other cross-reference in this archive uses ids.

Recommendation 3 is the root cause. The other two treat symptoms.
