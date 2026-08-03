# Mira — Phase 1 Headshot Batch Kit

> Companion to `mira-identity-v0.1.md` (§C Lock procedure, step 1).
> Six generations: 3 angles × 2 seeds. Run all six with the SAME settings
> except seed and the one angle line. Do not restyle between runs.

## Fixed scaffolding (all six runs)

Prepend the **canonical prompt anchor** from `mira-identity-v0.1.md` §B
verbatim, then append:

```
Neutral relaxed expression, mouth closed, eyes to camera. Hair down in
canonical default style. No visible makeup emphasis. Flat diffuse studio
light, plain mid-grey background, 85mm portrait lens, head-and-shoulders
crop, photorealistic.
```

Append the negative guards from §B. Fix all generator parameters (sampler,
steps, CFG/guidance, resolution) and record them below in the run log.

## The six runs

| Run | Angle line (append after scaffolding)          | Seed   |
|-----|------------------------------------------------|--------|
| A1  | `Facing camera directly, head level.`          | seed 1 |
| A2  | `Facing camera directly, head level.`          | seed 2 |
| B1  | `Three-quarter view, face turned to her left.`  | seed 1 |
| B2  | `Three-quarter view, face turned to her left.`  | seed 2 |
| C1  | `Three-quarter view, face turned to her right.` | seed 1 |
| C2  | `Three-quarter view, face turned to her right.` | seed 2 |

Use the same two seed values across angle pairs (A1/B1/C1 share seed 1,
etc.) so seed-driven identity pull is visible across angles.

**File naming:** `mira-p1-<run>-<seed>.png` (e.g. `mira-p1-b2-77341.png`).

## Run log (fill in before generating)

- Generator + version: ______
- Resolution: ______  Sampler/steps: ______  Guidance: ______
- Seed 1: ______  Seed 2: ______
- Date: ______

## Audit checklist (per candidate, tiers in order — stop at first FAIL)

Tier 1 — structure: [ ] soft oval, slightly long midface [ ] rounded chin,
subtle dimple [ ] mid-cheek fullness, not sharp [ ] widow's peak offset
left [ ] fractionally wide-set eyes

Tier 2 — features: [ ] almond eyes, straight lower lid, slight upward
outer cant [ ] dark brown iris, amber inner ring [ ] full near-straight
low-arch brows, left ~1mm higher [ ] straight nose, slight downward tip,
no upturn [ ] balanced lips, shallow cupid's bow, corners slightly down

Tier 3 — surface: [ ] beauty mark ~4mm below RIGHT eye outer corner
[ ] sparse nose-bridge freckles only [ ] warm medium skin, golden
undertone [ ] near-black hair, straight crown, waves below ears

Verdict per candidate: PASS / FAIL@tier-N (note the first violated item).

## Selection rule

Exactly one PASS candidate is promoted to **Canonical Seed 0** by explicit
approval. Record its filename, seed, and full parameters in the run log
above, then bump the identity spec to v1.0 (locked). If zero candidates
pass, adjust ONLY the anchor wording for the most-violated tier item and
re-run the full batch — never hand-pick a "close enough" candidate.
