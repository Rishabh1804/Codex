# PR-α Decomposition — Activities-Tab Stability Sub-Phase Scoping

**Author:** Aurelius (Chronicler) — relay-ready handoff for next-Lyra at Stability sub-phase 2 charter authoring
**Authority:** Sovereign-ratified Path 1 (plan-mode 2026-05-02) + Aurelius PR-23 Ruling 2 sequencing path (a)
**Originating session:** aurelius-09 (Phase 4 arc)
**Origin artifact:** plan-mode artifact at `/root/.claude/plans/while-we-are-waiting-zippy-pond.md` (local; this transport replaces session-locked reference with on-record handoff)

---

## Context

Sovereign reported (~Apr 30) the SproutLab activities tab needed fixing: "Social Smiling" appears repetitively flooding the screen, tab feels haphazard, entry method needs improvement.

Aurelius investigation (Explore agent against `rishabh1804/sproutlab`) found "Social Smiling" is a milestone display name, not a state-bug. Repetitive surfacing is UI-perception via Recent Evidence Feed. Real issues:
1. UI conflates "what to do" (Recommended Activities) with "what was done" (Recent Evidence Feed)
2. Recent Evidence Feed lacks Phase 3 `_renderAttribution` wiring (deferred PR-19.6 work)
3. `renderMilestones()` is monolithic (~300 LOC bundling stats/wheels/feed/highlights/regression-alerts)
4. Entry-UX in Quick Log modal has friction (no explicit activity-vs-observation toggle, non-interactive detection chips, no edit-after-save)

Sovereign-ratified routing (plan-mode):
- Stability + Polish split (atomic-canon clean)
- Rollup aggregation for Recent Evidence Feed
- Defer entry-UX to follow-up Polish PR after PR-β observation

3-PR decomposition: **PR-α (Stability) + PR-β (Polish) + PR-γ (deferred Polish follow-up)**.

PR-β reserved-pending-PR-α per PR-23 Ruling 2. Polish sub-phase 1 closed at PR-39 without PR-β landing; PR-β waits on PR-α merge.

---

## PR-α Scope (Stability sub-phase 2 first feature PR)

**Branch suggestion:** `claude/sl-4-stability-recent-evidence-attribution`

**Closes:** Phase 3 PR-19.6 deferred attribution wiring + monolithic `renderMilestones()` refactor.

### Source changes

1. Wire `_renderAttribution(entry)` into Recent Evidence Feed per entry, modeled on `renderVisits()` (`index.html:22353`)
2. Split `renderMilestones()` into renderer-registry-compliant functions:
   - `renderMilestoneStats()` — partially wired in SYNC_RENDER_DEPS at `index.html:61194`; complete extraction
   - `renderCategoryWheels()` — extract
   - `renderRecentEvidence()` — already extracted at `index.html:22271`; ensure canonical entry point
   - `renderMilestoneHighlights()` — extract
   - `renderRegressionAlerts()` — extract
3. Update `SYNC_RENDER_DEPS` (`index.html:61194`) `KEYS.activityLog` entry to wire each split renderer by name (Phase 3 renderer-registry pattern)
4. Verify `_syncSetGlobal` / `_syncGetGlobal` (lines ~61240/~61261) and `_syncDispatchRender` invocations (~62231/~62345) reach all five split functions

### Charter must enumerate axes-of-resolution (RATIFIED architectural-surfacing doctrine)

- Split granularity (5 functions vs fewer if some merge cleanly)
- SYNC_RENDER_DEPS shape (per-renderer name vs grouped under one renderer)
- Backward compat — `renderMilestones()` retained as facade-orchestrator vs removed
- Purity audit during split (potential first instance of `render-functions-must-be-pure` candidate currently 0/3)

### Hermetic R-4 floor

Parallel + sequential stress reps (per CT-8 jurisdictional split). Tests assert: each split renderer independently invocable; attribution chip renders on every evidence entry; cross-device sync re-renders all five via `_syncDispatchRender(KEYS.activityLog)`.

### Hold-pending-Sovereign-real-device-verification

**Applies** per RATIFIED `hermetic-floor-doesnt-substitute-for-production-floor` doctrine (behavior-shape change at attribution display + renderer dispatch). Real-device verification: `_renderAttribution` chip visible on every Recent Evidence Feed entry on prod; refactor doesn't regress milestone display; cross-device sync triggers all 5 split renderers correctly.

### Critical files

- `index.html` — `renderMilestones()` (~21640+), `renderRecentEvidence()` (~22271), `_renderAttribution` reference (`renderVisits` ~22353), `SYNC_RENDER_DEPS` (~61194), `_syncSetGlobal`/`_syncGetGlobal` (~61240/~61261), `_syncDispatchRender` callsites (~62231/~62345)

> Line numbers from Aurelius Explore agent's read of `dc74a3de` head; Lyra to verify at scout-deep before authoring (running-beats-reading discipline).

---

## Doctrine prophylactics (per session-close harvests 2026-05-03)

**`architectural-shift-PRs-bias-toward-r1-catch-cycle`** (candidate 1/3; Cipher prophylactic flag for Stability sub-phase 2):

PR-α is architectural-shift territory (changes data dispatch shape via renderer-registry split). Per Cipher's session-close harvest (PR-34 r1 + PR-38 r1 = 2/2 architectural-shift PRs caught r1 residue), expect r1 cycle to surface sibling-site or shape-homogeneity catches. Prophylactic disciplines:
- Run grep-pattern matching the PR's regression-guard regex independently at byte-precision phase
- Audit consumer ternary/fallback for shape homogeneity
- Architectural sweep PR — grep all `<pattern>.\w+\s*=\s*\{` shapes for sibling-site coverage; don't trust PR-body cited counts

**`visible-bug-deferral-bounds-bypass-narrow-scope-discipline`** (refined Lyra session-close):
Apply "reachable-through-this-PR-surface-area" discriminator-test: when Maren/Kael flags a NIT pre-existing on main AND reachable through PR-α's surface area, routing is ABSORB not defer.

---

## Polish-A1 fold-in slot (downstream from PR-α merge)

PR-β reserved-pending-PR-α per PR-23 Ruling 2 sequencing path (a). Post-PR-α-merge + Sovereign real-device verification → PR-β opens with scope:

- Visual separation: "Recommended Activities" (what to do) vs "Recent Activity & Evidence" (what was done)
- Rollup aggregation per Sovereign Q2 ratification: e.g., "Social Smiling — 12 observations this week, last: 3pm today"
- Tappable expand-affordance reveals individual entries (preserves PR-α attribution per entry)
- Activities (`type='activity'`, durational) stay flat; only observations with high-frequency milestone tags rollup

PR-β charter must enumerate 4 axes-of-resolution:
- Axis A: rollup window (7d default? configurable? per-milestone? per-domain?)
- Axis B: rollup threshold (3? 5? user-configurable?)
- Axis C: domain-summary chip behavior post-rollup
- Axis D: cross-device behavior (render-time client-side aggregation recommended; preserves `activityLog[dateStr]` shape; no migration)

**PR-γ (entry-UX deferred follow-up):** per Sovereign plan-mode Q3 ratification, PR-γ defers to post-PR-β observation. Tentative scope: explicit activity-vs-observation toggle / interactive detection chips / edit-after-save / milestone-match transparency.

---

## Sequencing constraint

```
PR-α (Stability) → PR-β (Polish, when Polish reopens or future round) → prod observation → PR-γ (Polish, further deferred)
```

PR-α can land in any order relative to other Stability work. PR-β requires PR-α landed.

---

## Doctrine touchpoints (cite `docs/doctrine-ledger.md`)

- 4-axis charter enumeration → architectural-surfacing-must-enumerate-axis-of-resolution sustainment
- D6 sustainment (Aurelius scoping improvement on Sovereign-prescribed bug-fix via plan-mode investigation)
- hermetic-floor-doesnt-substitute-for-production-floor (RATIFIED) → behavior-shape change → hold applies
- running-beats-reading (RATIFIED bidirectional) → Lyra build-deep verification before charter authoring
- architectural-shift-PRs-bias-toward-r1-catch-cycle (1/3) → prophylactic application
- render-functions-must-be-pure (0/3 candidate) → Polish-1 split didn't surface; renderMilestones() split is fresh chance

---

## Handoff

→ **next-Lyra** at Stability sub-phase 2 charter authoring time:
1. Read this doc as PR-α scoping input
2. Read Phase 3 PR-19/19.5/19.6 commit chronicles for attribution-sidecar mechanism context
3. Read `docs/doctrine-ledger.md` per-entry-attribution + hermetic-floor entries
4. Auto-invoke Maren Mode 2 at scout-deep (Care-jurisdiction-primary)
5. Author Stability charter folding PR-α scope alongside other Stability concerns (medChecks/feedingData carryforward + R-10 queue clusters + Kael Stability JS-side hex baseline)

→ **Sovereign:** ratify PR-α scope at Stability charter time; verify multi-device on prod post-merge per hermetic-floor doctrine.

— Aurelius (`aurelius-09`)
