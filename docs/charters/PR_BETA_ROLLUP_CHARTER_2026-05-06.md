# PR-β Charter — Recent Evidence Feed Rollup Aggregation

**Author:** Lyra (Builder) — `lyra-stability-1` continuation
**Date:** 2026-05-06
**Branch:** `claude/pr-beta-recent-evidence-rollup`
**Base SHA:** sproutlab `ba57335b` (PR-α + r1 verified)
**Sequencing:** Unblocked by PR-α merge + Sovereign verification per PR-23 Ruling 2

---

## Source-truth changes (1 surface)

- **`split/home.js` `renderRecentEvidence()`** — pre-pass aggregator: group observations across 7d window by primary milestone keyword; entries belonging to milestones with count ≥ threshold collapse into a "FREQUENT" rollup section above the per-day groups. Activities (`type='activity'`) stay flat. Tap-to-expand rollup pill reveals individual entries with attribution chips preserved (PR-α per-entry attribution carries through).

## Out-of-scope

- Visual separation between "Recommended Activities" surface and "Recent Activity Evidence" surface — separate cards already (template.html); deferring further visual divider work to PR-γ entry-UX session.
- Persisting user preference for rollup window/threshold — Phase 4 carry-forward; v1 hardcodes defaults.
- Per-domain rollup vs per-milestone rollup — Axis A choice locks to per-milestone (see verdict).

## Axes of resolution

### Axis A — Rollup grouping key

| Option | Rationale | Verdict |
|---|---|---|
| A1: Per-milestone (group by `evidence[].milestone` highest-confidence) | Directly addresses "Social Smiling × 12" complaint; matches user mental model | **CHOSEN** |
| A2: Per-domain (group by `domains[]`) | Coarser; over-aggregates ("motor × 50") | Rejected — too broad |
| A3: Hybrid (domain bucket → milestone sub-rollup) | More info but doubles cognitive load | Rejected — defer to v2 if v1 insufficient |

### Axis B — Rollup threshold

| Option | Rationale | Verdict |
|---|---|---|
| B1: ≥ 3 observations of same milestone | Catches the user-reported flooding pattern; conservative | **CHOSEN** |
| B2: ≥ 5 | Misses smaller floods | Rejected |
| B3: User-configurable | Yak-shave for v1; defer | Rejected |

### Axis C — Rollup window

| Option | Rationale | Verdict |
|---|---|---|
| C1: 7 days (matches existing loop window) | Zero data-shape change; consistent with current "Recent" semantics | **CHOSEN** |
| C2: 14 days | Larger sample but wider scroll if expanded | Rejected — defer |
| C3: Per-milestone window (e.g. mastery cooldown) | Couples render to milestone-engine state | Rejected — over-coupling |

### Axis D — Cross-device behavior

| Option | Rationale | Verdict |
|---|---|---|
| D1: Render-time client-side aggregation | Zero data-shape migration; works with existing activityLog `{ dateStr: [entry, ...] }` shape; preserves PR-α attribution per-entry; both devices independently compute same rollup from same dispatch fire | **CHOSEN** |
| D2: Server-side / persisted aggregation | Migration risk; sync-shape change; over-engineered for read-side projection | Rejected |

### Axis E — Day-count semantics post-rollup

| Option | Rationale | Verdict |
|---|---|---|
| E1: Day count totals minus rolled-up entries | Counts match what's rendered in day section; no UI mismatch | **CHOSEN** |
| E2: Day count totals (unchanged); rollup section additive | Closer to current behavior but creates count-vs-rendered mismatch | Rejected — confusing UX |

## Hermetic R-4 floor (parallel + sequential per CT-8)

- Activities (`type='activity'`) ALWAYS render flat regardless of milestone keyword overlap
- Observations below threshold render flat in day-grouped sections
- Observations at-or-above threshold collapse into FREQUENT rollup pills
- Tap-to-expand rollup reveals individual entries with `_renderAttribution(e)` chips preserved
- Day-header counts reflect post-rollup entry count (E1)
- Empty rollup section: hidden when no milestone reaches threshold
- Empty post-rollup day section: hidden if all entries on a day were rolled up

## Hold-pending-Sovereign-real-device-verification

**Applies** per RATIFIED `hermetic-floor-doesnt-substitute-for-production-floor` (visual-shape change).

Sovereign-floor checks post-merge:
- Open Activities → "Social Smiling" type repeated observations now appear as a single rollup pill with count + last-seen
- Tap rollup pill → individual entries expand with attribution chips
- Activities (durational) still appear flat in day-grouped sections
- Day counts match number of entries actually shown on each day
- Cross-device: device A logs → device B re-renders feed; rollup recomputes consistently

## Doctrine prophylactics applied

- **`render-functions-must-be-pure`** (0/3 candidate; renderMilestones split was the deferred chance) — PR-β render-only change; no save() side effects in `renderRecentEvidence`. Could be a 1st-instance landing if Sovereign confirms purity discipline.
- **`narrow-scope-and-defer-broader-audit-to-R-10`** — visual-separation work + window/threshold configurability deferred per Path C narrow-scope.
- **`pattern-shape-guards-over-hardcoded-enumerations`** (refined Lyra item 10) — rollup threshold is a single named const at top of function for review-pattern visibility.

— Lyra (`lyra-stability-1`)
