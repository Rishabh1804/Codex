# Mira — Character Identity Spec

> **Status: v0.1 — UNLOCKED (Phase 1 in progress)**
> Original fictional character for visual novel / PWA production use.
> This spec is the canonical identity authority. When a generated image
> conflicts with this document, the document wins. No generated image may
> be used as an identity reference unless explicitly promoted to canonical
> (see §C Lock procedure).

**Working name:** Mira
**Canonical age band:** mid-20s
**Phase roadmap:** 1 Identity Lock (current) → 2 Face anchor sheet → 3 Body anchor → 4 Outfit library → 5 Pose library → 6 Production scenes. No phase advances without explicit approval.

---

## A. Identity hierarchy

Consistency lives in proportions first, features second, surface details
last. When a generation drifts, fix the highest violated tier — never patch
tier 3 to compensate for a tier 1 error.

### Tier 1 — Cranial structure & proportions (never negotiable)

- Face shape: soft oval with a **slightly long midface** — eyes-to-mouth
  distance reads a touch longer than average, giving a calm, unhurried look
- Jaw: gently tapered, **rounded chin with a subtle central dimple**
- Cheekbones: moderately high but not sharp — fullness sits in the
  mid-cheek, not the top
- Forehead: medium height, gentle rounding; hairline has a **soft widow's
  peak, offset slightly left of center**
- Eye spacing: fractionally wide-set (just over one eye-width apart)

### Tier 2 — Feature geometry (never negotiable)

- Eyes: **almond with a straight lower lid and modest upward cant** at the
  outer corner; medium-weight upper lid, no pronounced hood. Iris: **dark
  brown with a subtly lighter amber inner ring**
- Eyebrows: naturally full, **low arch, nearly straight**, tails taper
  cleanly; left brow sits ~1mm higher at rest
- Nose: **straight dorsal line with a very slight downward tip rotation**,
  medium-narrow bridge, softly defined tip — no upturn
- Lips: balanced upper/lower fullness (unusual — most faces are
  bottom-heavy), **defined but shallow cupid's bow**, neutral corners that
  rest very slightly downturned
- Ears: small, lobes attached

### Tier 3 — Surface & fixed marks (never negotiable, lowest repair priority)

- Skin: warm medium tone, golden undertone, matte-natural finish
- **Beauty mark: small, flat, ~4mm below the outer corner of the RIGHT
  eye** ← primary drift tripwire; cheapest single check that a generation
  is her
- Faint natural freckling across the nose bridge only (sparse, low-contrast)
- Hair (identity-adjacent, canonical default): near-black dark brown,
  **loose waves starting below the ear** (straight at crown),
  center-parted, mid-back length

### Session variables (free to change, never identity)

Expression, makeup weight, lighting, lens, hairstyle *arrangement* (updo,
braid — texture/color stay fixed), camera angle.

---

## B. Canonical prompt anchor (v0.1)

Compact, adjective-light, ordered by identity weight. Paste verbatim at the
head of every generation; append scene/expression after it.

```
A woman in her mid-20s, South Asian, soft oval face with slightly long midface,
rounded chin with subtle dimple, soft widow's peak offset left of center.
Wide-set almond eyes with straight lower lids and slight upward outer cant,
dark brown irises with faint amber inner ring. Full nearly-straight low-arch
eyebrows, left brow fractionally higher. Straight nose, slight downward tip,
medium-narrow bridge. Balanced lips with shallow cupid's bow, neutral slightly
downturned corners. Small flat beauty mark 4mm below outer corner of right eye.
Sparse faint freckles on nose bridge only. Warm medium skin, golden undertone.
Near-black dark brown hair, center part, straight at crown, loose waves below
the ears, mid-back length.
```

**Negative guards** (append per generator convention):

```
upturned nose, sharp cheekbones, hooded eyes, high-arched brows,
heart-shaped face, beauty mark on left side, heavy freckles,
glamour retouching
```

---

## C. Lock procedure

1. Generate **6 neutral headshots** from the anchor: front, 3/4 left,
   3/4 right — flat diffuse light, neutral expression, hair down, no makeup
   emphasis. Two seeds per angle.
2. Audit each against the tiers **in order** — a candidate with perfect
   eyes but a short midface fails; a candidate with right structure but the
   mark on the wrong side is a tier 3 retouch/reroll.
3. Exactly **one** approved image becomes **Canonical Seed 0**. From that
   moment it is the only approved *generated* reference; this spec text
   remains the authority when they conflict; no other generation is ever
   used as a reference without explicit promotion.
4. Spec is version-bumped to **v1.0 (locked)** with any corrections learned
   during the audit. Only then does Phase 2 begin (face anchor sheet:
   expression range + angle coverage from Seed 0).

---

## Provenance note

Mira is an original character defined by this written specification. She is
not modeled on, derived from, or intended to resemble any real person, and
no real person's photographs are or may become identity references for her.
