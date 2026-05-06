# PR-α Charter — Stability Sub-phase 2 First Feature PR

**Author:** Lyra (Builder) — `lyra-stability-1` session, hat-switch experimental mode
**Date:** 2026-05-06
**Scope:** PR-α only (broader Stability sub-phase 2 charter folds-in post-merge: medChecks/feedingData carryforward + R-10 16-item queue + Kael JS-side hex baseline)
**Branch:** `claude/pr-alpha-renderer-split-L1kVh`
**Base SHA:** sproutlab `e01190a` (Polish cleanly closed)
**Doctrines invoked:** architectural-surfacing-must-enumerate-axis-of-resolution (RATIFIED), narrow-scope-and-defer-broader-audit-to-R-10 + reachability-discriminator (RATIFIED), running-beats-reading (RATIFIED), architectural-shift-PRs-bias-toward-r1-catch-cycle (1/3 prophylactic), render-functions-must-be-pure (0/3 candidate)

---

## Scout-deep correction of handoff scoping (running-beats-reading)

- Handoff cited `index.html` line numbers (`dc74a3de`); current sl-main is `e01190a`. Sources are `split/*.js`.
- Handoff stated `renderMilestones()` lives in `medical.js` (BUGS.md echoes). **CORRECT location: `home.js:1444-1616`.** BUGS.md needs same-PR correction (item-shape NIT, reachable-through-PR-surface — ABSORB per Lyra-discriminator).
- 4 of 5 proposed split renderers ALREADY EXIST in home.js: `renderCategoryWheels` (1896), `renderRegressionAlerts` (1948), `renderRecentEvidence` (2075), `renderMilestoneStats` (3134). Plus `renderMilestoneTimeline` (2031) and `renderActiveMilestones` (medical.js:238) sibling renderers.
- `renderMilestoneStats` is **double-duty**: renders both `#milestoneStats` (pills) and `#milestoneHighlights` (cards). The handoff-suggested name `renderMilestoneHighlights` collides with this existing target → forces Axis A.
- Precedent for `_renderAttribution` per-entry already exists at `medical.js:315` (`renderActiveMilestones`). Recent Evidence Feed is the gap.

## Source-truth changes (5 in scope)

1. Extract `#milestoneList` HTML build (~165 LOC) from `renderMilestones()` body → new `renderMilestoneList()`.
2. Extract `#milestoneHighlights` cards subtree from `renderMilestoneStats` → new `renderMilestoneHighlights()` (single-purpose split per reachability-discriminator).
3. Wire `_renderAttribution(e)` per entry in `renderRecentEvidence()` (model: `renderVisits()` line 2172).
4. Extend `SYNC_RENDER_DEPS[KEYS.activityLog]` and `SYNC_RENDER_DEPS[KEYS.milestones]` `'track:milestones'` entries from `['renderMilestoneStats']` to full split-renderer list.
5. Move `save(KEYS.milestones, milestones)` OUT of `renderMilestones()` body — render is not a persistence boundary (render-functions-must-be-pure surfacing #1 candidate landing).

## Out-of-scope (R-10 / Polish-A1 / future PRs)

- Migrating 8 external `renderMilestones()` callsites to call sub-renderers directly — defer; retain `renderMilestones()` as facade. Path C narrow-scope.
- BUGS.md path-correction (medical.js → home.js) for 3 entries — ABSORB into PR-α (NIT, reachable-through-surface).
- PR-β rollup aggregation (Recommended-vs-Recent visual separation; rollup chips) — sequenced behind PR-α merge per PR-23 Ruling 2.

## Axes of resolution

### Axis A — Naming for extracted `#milestoneList` renderer

| Option | Rationale | Verdict |
|---|---|---|
| A1: `renderMilestoneList()` | DOM-element-name parity (`#milestoneList`); avoids collision with existing `#milestoneHighlights` element | **CHOSEN** |
| A2: `renderMilestoneHighlights()` (handoff-suggested) | Matches handoff vocabulary | Rejected — name-collides with existing renderMilestoneStats target |

### Axis B — Split granularity / scope of facade retention

| Option | Rationale | Verdict |
|---|---|---|
| B1: Extract list only; renderMilestoneStats stays double-duty | Strict narrow-scope; minimal blast radius | Rejected — fails reachability-discriminator-test (Stats overload IS reachable through PR-α surface) |
| B2: Extract list + extract Highlights from Stats (single-purpose discipline) | Refined Lyra-discriminator: pre-existing co-located concern, surface-area-reachable, ABSORB | **CHOSEN** |
| B3: Aggressive extraction (also Active + Timeline ID-rename for parity) | Too-broad blast radius; out-of-scope | Rejected — defer to R-10 |

### Axis C — `SYNC_RENDER_DEPS` dispatch shape

| Option | Rationale | Verdict |
|---|---|---|
| C1: Name-string array of all split renderers | Phase 3 declarative pattern (Cipher surfacing #2); spy/stub-friendly; graceful fallback | **CHOSEN** |
| C2: Single orchestrator name (e.g. `'renderMilestonesSubtab'`) | Hides split from dispatch path | Rejected — defeats per-key precision; fails dispatch-coverage Kael criterion |

### Axis D — `renderMilestones()` retention vs removal

| Option | Rationale | Verdict |
|---|---|---|
| D1: Retain as facade tail-calling all sub-renderers | Zero-regression on 8 external callsites; backward-compat | **CHOSEN** |
| D2: Remove + migrate all callsites | Clean architectural state but 8-site blast radius; out-of-scope-for-Stability-first-feature | Rejected — defer to R-10 / future PR |

### Axis E — Purity audit during split (`render-functions-must-be-pure` 0/3 candidate)

| Option | Rationale | Verdict |
|---|---|---|
| E1: Move `save(KEYS.milestones, milestones)` out of `renderMilestones()`; call sites that mutate already save independently | Surfaces purity violation as 1st-instance landing for candidate doctrine; reachable-through-surface | **CHOSEN** — verify all mutating callsites save before invoking renderMilestones() |
| E2: Leave save in render path; flag for R-10 | Safer; pure deferral | Rejected — Lyra-discriminator passes; ABSORB |

## Hermetic R-4 floor (parallel + sequential per CT-8)

- Each split renderer independently invocable (no implicit dependency on renderMilestones() being called first)
- `_renderAttribution` chip renders on every Recent Evidence Feed entry
- `_syncDispatchRender(KEYS.activityLog, ...)` invokes all renderers in `'track:milestones'` array — verify by spy
- Cross-tab activation (track sub-tab change to milestones) re-renders all split functions
- Regression guard: pattern-shape grep `function render\w*Milestone` — must match list+stats+highlights+wheels+regression+timeline+active+recentEvidence (8 renderers post-split)

## Hold-pending-Sovereign-real-device-verification

**Applies** per RATIFIED `hermetic-floor-doesnt-substitute-for-production-floor`. Behavior-shape changes:
1. Attribution chip newly visible on every Recent Evidence Feed entry (data-display change)
2. Renderer dispatch shape changed (per-key sub-renderer set vs single orchestrator)
3. Persistence write moved out of render path (timing change — confirm no mutation-without-save callsite emerges)

Sovereign-floor checks post-merge:
- Open Activities → Recent Evidence Feed shows attribution chips per entry
- Log activity from Quick Log → all milestone surfaces update (list, stats, highlights, wheels, regression, recentEvidence, active)
- Cross-device: log on device A → device B re-renders all 8 milestone surfaces via `_syncDispatchRender`
- No regression on existing milestone display, override, evidence expansion, tidbit toggles

## Doctrine prophylactics applied

**`architectural-shift-PRs-bias-toward-r1-catch-cycle`** (1/3 candidate): PR-α is data-dispatch-shape-changing. Applied disciplines:
- Independent grep at byte-precision phase: `_renderAttribution(` callsites, `SYNC_RENDER_DEPS\[KEYS\.` matches, `function renderMilestone` shapes
- Sibling-site sweep: every renderer that mutates `activityLog` should appear in dispatch array (cf. PR-38 sections.* shape-homogeneity catch)
- Consumer ternary/fallback audit: `_syncDispatchRender` → name-string lookup → window[name]; verify all 8 renderer names resolve at runtime (graceful-fallback works but flag missing names)

**`source-grep-verification-should-mirror-regression-guard-regex`** (Cipher operational, watch-list): Test pattern matches source pattern.

**`pattern-shape-guards-over-hardcoded-enumerations`** (refined Lyra item 10): Test asserts grep-pattern absence of `_renderAttribution` MISS in `renderRecentEvidence` body, not enumerated entries.

## Sequencing constraint

```
PR-α (this session) → Sovereign real-device verification → PR-β (Polish-A1: rollup aggregation, deferred)
```

PR-α can land in any order vs other Stability-N PRs. PR-β requires PR-α landed.

## Persona auto-invocations (Sovereign-locked PR-26)

- **Maren (Care):** auto-invoked on `renderMilestones()` body extraction (data-mutation hook touch + persistence-write relocation = Care-jurisdiction primary)
- **Kael (Intelligence):** auto-invoked on `SYNC_RENDER_DEPS` extension + `_syncDispatchRender` reachability verification (Intelligence-jurisdiction)

Per hat-switch discipline: each persona-switch re-reads source files independently. No trust of shared in-session memory.

— Lyra (`lyra-stability-1`)
