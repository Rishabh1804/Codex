# 06 — Phase 2 Doctrine Surfacings

**Bundle:** War Time 2026-04-24 Addenda (Aurelius shift)
**Filed by:** Aurelius (`aurelius-06`)
**Date:** 2026-04-26 (Hour ~33 of 72)
**Scope:** Three candidate doctrine refinements surfaced and ratified across `sproutlab#9` (sl-2-arming) — three Cipher review rounds, 66/66 stress matrix at close, squash-merged at `b3ae79fc`.

All entries are **candidate doctrine** pending post-war Cabinet review per the [`README.md`](./README.md) §"Post-War Review (Within 7 Days)" framing. Builder/Cipher/reviewer attribution preserved on-record at the originating PR thread.

---

### D8/CT-7 lineage refinement — byte-identity verification ≠ freshness

**Surfaced:** Cipher r1 advisory on sproutlab#9 (2026-04-26 06:13Z, `request-changes`).

**Substance:** A SHA match across two or more files tells you they are byte-identical to each other; it does not tell you whether any of them reflects current source. Freshness is orthogonal to sameness. When a build pipeline produces an artifact from upstream sources, byte-identity verification of that artifact can be true while the artifact itself is stale relative to the inputs.

**Evidence:** sproutlab#8 cleanup (Aurelius) verified three matching SHAs across `split/sproutlab.html` ≡ `/index.html` ≡ `/sproutlab.html` (`47a68700…`). The hash arithmetic was correct. But all three SHAs were the same stale artifact — Phase 1's sl-1-2 (`#syncStatus`) and sl-1-3 (`#offlineBadge`) source-side merges had never been compiled into `/index.html`. Production at `https://rishabh1804.github.io/SproutLab/index.html` carried the stale artifact too. Caught only when sproutlab#9's R-4 floor exercised the artifact through `tests/e2e/smoke.spec.ts` test 4 — `Locator: locator('#syncStatus') / Expected: 1 / Received: 0`.

**Refines:** D8 (citation-integrity-as-Cipher-canonical-review-surface). D8 said description-vs-substance drift applies to chronicles equally to code; this refinement extends it to **artifact-vs-source**. CT-7 (cache.addAll all-or-nothing fragility) is the runtime cousin — both are about properties that look airtight from one angle but hide a freshness/coverage concern from another.

**Implication for review jurisdiction:** SHA-match checks during cleanup or refactor PRs are a useful *sameness* primitive but not a *freshness* primitive. When cleanup touches build outputs, a `bash <build-script> | diff - <artifact>` (or its province-specific equivalent) is the freshness primitive. Aurelius's PR#8 review is on-record as the empirical case that surfaced the gap.

---

### D8 construction-vs-verification — byte-identity by construction > byte-identity by verification

**Surfaced:** Cipher r2 advisory on sproutlab#9 (2026-04-26 18:45Z).

**Substance:** When two paths in a tree must remain byte-identical (e.g., `/index.html` and `/sproutlab.html` as a friendly-URL alias pair), the structurally cleanest guarantee is **one git blob referenced from two tree entries** — byte-identity becomes a data-structure property, not a verification afterthought. The runtime commit shape (one blob, two tree entries) eliminates the failure mode of `cp source dest && git add source dest` followed by independent edits or commit-ordering issues that could let the two paths drift.

**Evidence:** Sovereign's Trees-API rebuild push on sproutlab#9 r2: one blob (`85d00c8e…`) for the rebuilt artifact, one tree (`c6967cc6…`) referencing the same blob from both `index.html` and `sproutlab.html` paths, one commit (`ce9c5a53…`) PATCHing the branch ref atomically. Cipher's r2 verification confirmed `sha1sum index.html` = `sha1sum sproutlab.html` = the fresh-build SHA `2661e098…`. The byte-identity didn't need a verification step — it was guaranteed by the data-structure shape.

**Refines:** the §"D8/CT-7 lineage" refinement above. *Verification* is a check-and-discover-drift discipline; *construction* eliminates the drift surface entirely. Where the choice is available, construction is structurally stronger.

**Implication:** when an aliased file pair must stay in lock-step (canonical + friendly-URL alias, primary + mirror, source + sentinel), the canonical pattern is single-blob + multi-tree-entry, not `cp` + dual-stage. Trees API exposes this directly; standard `git` workflows can achieve it via `git update-index --add --cacheinfo` or a post-commit hook. Worth standard-pattern documentation if the case recurs.

---

### R-7 binary-mode default — triad as default for opt-out user-facing surfaces

**Surfaced:** Cipher r3 advisory on sproutlab#9 (2026-04-26 19:10Z, `ack`).

**Substance:** R-7 (triad spec idiom) prescribes positive + regression-guard + positive-regression for visible-state changes. For UI surfaces that carry a binary user-toggleable mode (opt-out by default — e.g., `simple-mode`, `compact-mode`, default-light/opt-in-dark), the triad shape becomes:

1. **Default-positive** — what new users actually see; the opt-out-state visible surface.
2. **Opt-out-positive** — full-mode visible surface, achieved via test setup that flips the persistence (e.g., `addInitScript` + `localStorage.setItem`).
3. **Mode-contract-regression** — the contract the opt-in toggles. For a hide-set, exactly *those* elements are hidden in the default mode and nothing more.

A single shared source-of-truth (e.g., constants `SIMPLE_VISIBLE` / `SIMPLE_HIDDEN`) drives both the default-positive (1) and the contract-regression (3), eliminating drift risk between them.

**Evidence:** sproutlab#9 r3 test 2 split into 2a/2b/2c. Test 2a (default `simple-mode`) asserted four tabs visible; 2b (full mode via `addInitScript` localStorage flip) asserted six tabs visible; 2c (regression) asserted exactly `Insights` + `Info` are hidden, nothing more. Constants `SIMPLE_VISIBLE = ['home', 'growth', 'track', 'history']` and `SIMPLE_HIDDEN = ['insights', 'info']` drive both 2a's positive assertion and 2c's regression. Cipher r3 stress matrix: 66/66 across 3 stress configs; 0 flakes.

**Refines:** R-7 (triad spec idiom). The original R-7 covered visible-state changes in a single mode; this refinement extends it to binary-mode UI surfaces by making **the mode contract itself part of the regression guard**.

**Implication:** any future opt-in/opt-out UI surface (settings toggles, accessibility modes, beta features) gets the triad-with-mode-contract by default. The `SIMPLE_VISIBLE` / `SIMPLE_HIDDEN` single-source-of-truth pattern is paste-ready for any binary-mode visibility decision in any province.

---

## Meta-observation — D5/D8 reviewer-layer-compounding (Phase 2 instances)

The Phase 1 closure-document framed D5 + D8 as *"early prescription/iteration cycles produce doctrines that compound forward, and the doctrines themselves validate against their own ratification artifacts."* sproutlab#9's round-trip provided two new instances of D8 self-applying recursively across reviewer layers:

1. **Lyra's charter-scout slip caught at the charter→arming hop.** Charter PR #7 §4 listed "five primary tabs (Home, Diet, Medical, Intelligence, Settings)"; actual surface in `split/template.html` is six tabs (`home, growth, track, insights, history, info`), with `Diet`/`Medical` as sub-panels of `track` and `Settings` as a sidebar button. Lyra surfaced and disclosed the slip in her own arming PR body (no charter r2). The catch came from the *next reviewer layer* (the layer that exercises the charter against actual surface), not from re-reviewing the charter itself.

2. **Cipher's r1 cause-ranking inversion caught by r2 empirical assertion.** Cipher r1 ranked `overflow-x:auto` as the primary cause of test 2's visibility failure and `simple-mode` default as the secondary "if … at any point during init" possibility. Lyra's r2 spec added a `simple-mode` precondition assertion which fired empirically — `simple-mode` was the actual primary cause. Cipher's r3 framing on-record: *"running the code beats reading the code, even from Cipher's side."*

D8 self-applies recursively to **every** reviewer layer's diagnoses, including Cipher's. Description-vs-substance drift can emerge in any reading; the empirical-probe-first discipline (R-4 verification floor, in-test assertion-as-probe) is the canonical catch surface across layers. Three independent reviewer reads on sproutlab#9 produced three doctrine candidates by precisely this compounding mechanism.

---

## Carry-forward

These three candidates pair with the Phase 1 §"Post-War Review (Within 7 Days)" framing in [`README.md`](./README.md). Cabinet review post-war decides which graduate to permanent canons and which stay as session lore. All three have empirical evidence on-record at sproutlab#9's review thread (Cipher r1, r2, r3) + the squash-merge commit at `b3ae79fc`.

| Refinement | Operational character |
|---|---|
| D8/CT-7 lineage — byte-identity ≠ freshness | Most operationally important — directly informs cleanup-PR review discipline going forward (PR#8 was the canonical case it caught). |
| D8 construction-vs-verification | Most structurally elegant — eliminates a drift surface rather than checking for it. |
| R-7 binary-mode default | Most paste-ready — any future opt-in/opt-out UI surface in any province gets the triad-with-mode-contract directly. |

---

*Filed by Aurelius (`aurelius-06`), 2026-04-26, Phase 2 doctrine surfacings. Not constitutional. Cabinet review pending post-war.*
