# CODEX_DESIGN_PRINCIPLES.md — Draft v0.1

**Status:** draft (pending codification, audit of existing tabs, ratification)
**Scope:** Codex PWA visual + interaction discipline. Extends and adapts the Republic-wide principles that originated in SproutLab's `docs/chapters/ch06-designprinciples.json` (the Hard Rules HR-1..HR-12). Codex-specific rules are numbered `HR-C-*` to keep the namespaces distinct.
**Workflow:** draft → codify (this document) → audit existing tabs for compliance → ratify as Codex's constitution → extract a `REPUBLIC_DESIGN_PRINCIPLES.md` for the universal subset.

---

## 0. Why this document exists

The Republic's first design constitution lives at SproutLab. It was written retroactively — patterns extracted from what worked in a mature 55K-line codebase and declared law. Codex has been building without its equivalent, which is how the Canons tab shipped with structural correctness but without Lore's visual discipline: colored category left borders, filled chips, per-category Rostra dots, row labels. The polish was "later" in my head instead of "non-negotiable." This document fixes that by codifying the discipline up front.

This is also a Republic move. SproutLab's HRs are Province-specific in some places (zi() icon function, rose/indigo/peach domain colors for baby-care) but universal in others (escHtml at render boundaries, data-action delegation, no inline styles). Codex can import the universals by reference, adapt the Province-specific rules to Codex's palette and idiom, and name its own additions. The final form: two documents — a Republic-wide doc holding the universals, a per-Province doc for the local adaptations. This draft is the per-Province doc; the Republic-wide extract is scheduled as a follow-up (see §10).

---

## 1. Hard Rules

### 1.1 Republic-wide (inherited from SproutLab HR-1..HR-12 — canons 0001..0012)

Every HR below applies to Codex unchanged unless noted. Cross-referenced in `data/canons.json` under `canon-0001` through `canon-0012`. These are greppable disciplines — each one can be audited in a single grep sweep.

| # | Rule | Codex applicability |
|---|---|---|
| HR-1 | No emojis. All iconography via icon-system function (returns SVG). | Applies as-is. Codex uses `cx()` instead of SproutLab's `zi()`. Canon-0001. |
| HR-2 | No inline styles. All styling through CSS classes + custom properties. | Applies as-is. **Exception documented explicitly:** category color mapping for dynamically-selected per-entity colors may use inline `style="background:..."` when the data itself carries the color (e.g. volume `domain_color` for Rostra dots). Every such use is a local HR-2 waiver and must be reviewed. |
| HR-3 | No inline event handlers. All interactivity via `data-action` delegation. | Applies as-is. Single delegation root in `start.js`. Canon-0003. |
| HR-4 | `escHtml()` at all render boundaries. Every user-supplied string sanitized before innerHTML. | Applies as-is. Canon-0004. |
| HR-5 | All spacing, font sizes, radii via CSS tokens — no magic numbers. `--sp-*`, `--fs-*`, `--r-*` exclusively. | Applies as-is. Canon-0005. |
| HR-6 | `data-action` names follow verb-noun or domain-verb-noun convention. Every action name greppable. | Applies as-is. Codex has some drift here (`goToCanon` vs `openCreateCanon` vs `setCanonSort`) — to be audited. Canon-0006. |
| HR-7 | Icon system returns SVG HTML strings, set via `innerHTML`. Never `textContent`. | Applies as-is. Canon-0007. |
| HR-8 | Stub features show "Coming soon" via toast. No dead buttons, no silent no-ops. | Applies as-is. Canon-0008. |
| HR-9 | Post-build multi-round QA audit. Continue until only cosmetic bugs remain. | Applies as-is. Codex's Playwright harness is the mechanical layer; visual audit against this document is the second layer. Canon-0009. |
| HR-10 | No text-overflow ellipsis. Truncation hides meaning. Always find a layout solution, or a "Read more" affordance. | Applies as-is. Codex uses `renderTruncated()` with "Read more" button. Canon-0010. |
| HR-11 | `Math.floor` for all currency values. Never round up on money. | **Not applicable to Codex.** Codex does not handle currency. Keep the rule cross-referenced for symmetry but no enforcement surface. Canon-0011. |
| HR-12 | Timezone-safe dates via `localDateStr()`. Never raw ISO date slicing. | Applies as-is. Codex's `localDateStr()` in `data.js` mirrors SproutLab's. Canon-0012. |

### 1.2 Codex-specific (HR-C-*)

| # | Rule | Canon |
|---|---|---|
| HR-C-01 | `build.sh` outputs directly to files. Never `bash build.sh > codex.html`. | canon-0033 |
| HR-C-02 | Service worker never caches HTML. Navigation requests always network. | canon-0034 |
| HR-C-03 | Merge to main is the deploy step. Branch pushes are rehearsal. Every merge to main is a distinct Sovereign-authorized act — `git checkout main; git merge; git push origin main` — not a subsidiary of a branch merge. | canon-gov-011 |
| HR-C-04 | Deploy handoffs on Android-installed PWAs must include the pull-to-refresh instruction explicitly. "Merged to main" is the deploy report; "pull-to-refresh on your device" is the verification handoff. | canon-gov-012 |
| HR-C-05 | Every top-level tab follows the Forum Pattern: Rostra → Notice Boards → Filtered Count → Stalls, with Sub-Tabs when multiple entity types share a tab. | canon-0052 (draft) |
| HR-C-06 | Every `references[]` field renders through `renderReferenceLink()` (core.js). Plain-text joining of reference IDs is a cross-cutting violation. | canon-0052 (draft) §Cross-Cutting Discipline |
| HR-C-07 | Records-are-Codex: all institutional records (canons, lore, schisms, apocrypha, decrees, journal entries, specs, companion logs, interaction artifacts) live in the Codex repository regardless of authoring Province. | canon-0052 (draft) + canon-0053 (draft) §1 |
| HR-C-08 | Filter pills and Rostra dots are **derived from data**, never hard-coded enums. Adding a new value to data adds a pill/dot automatically. | canon-0052 (draft) §Notice Boards |
| HR-C-09 | Every card that carries a primary classification (category, status, type) renders a **colored left border** and a **filled chip** in that classification's color — matching the Lore reference implementation. Plain outline chips are reserved for secondary metadata (scope, volume, tag). | this document, §5 + §3 |
| HR-C-10 | Filter rows carry a small-caps row label (e.g. `CATEGORY:`) when the tab has three or more filter rows. Lore and the TODOs overhaul are exempt — TODOs because two pills read as self-evident, Lore because the labels are already there. | this document, §5 |

### 1.3 Rule priority (when HRs conflict)

Ladder, in descending authority:

1. Constitution of the Republic of Codex v1.0 (Books I–IX)
2. Republic-wide Hard Rules (canon-0001..0012)
3. Codex-specific Hard Rules (HR-C-*)
4. Forum Pattern and cross-cutting canons (canon-0052, canon-0053 while draft; subject to priority shifts on ratification)
5. This document (Codex design principles — once ratified, peer to the canon layer)
6. Per-session judgment

When a local HR-C rule conflicts with a Republic-wide HR, the Republic-wide rule wins and the HR-C is revised. When a canon conflicts with the Constitution, the Constitution wins. When this document conflicts with a ratified canon, the canon wins until this document is ratified.

---


## 8. Deploy Chain Discipline

The end-to-end chain that gets a change from a keystroke onto the Sovereign's Android screen. Every step is required; skipping any step produces "legible uncertainty" (canon-gov-011's phrase).

### 8.1 The four required steps

1. **Build.** `cd split && bash build.sh`. Extracts companion logs, concatenates the 6 JS modules + CSS into `codex.html`, copies to `index.html` + `root/index.html`. Direct output, never `>` redirect (HR-C-01 / canon-0033).
2. **Commit.** Stage + commit on the session branch. Commit message includes canon references + rationale in full sentences. No auto-commit, no batched "changes" — each commit tells a story.
3. **Merge to main.** Distinct Sovereign-authorized act (HR-C-03 / canon-gov-011). `git checkout main; git pull; git merge --no-ff <branch>; git push origin main`. Branch-only pushes are rehearsal, not deploy. The merge commit names what it merges and what lands on main.
4. **User-side cache invalidation.** Pull-to-refresh on Android (HR-C-04 / canon-gov-012). Service Worker v7 doesn't cache HTML (canon-0034) but Chrome's webview cache on installed PWAs does. Deploy handoffs must include this step explicitly — "Merged to main. Pull-to-refresh on your device to see the change."

### 8.2 Verification discipline

**Test harness coverage** (steps 1–3): the Playwright suite at `tests/*.spec.js` validates the built `index.html` against primed localStorage. `npm run verify` runs before every merge to main. 26 cases as of this draft.

**Visual verification** (step 4): requires the Sovereign's device. Automation stops at the browser cache; the final step is always a manual eye on the deployed app. This is why the handoff sentence matters — it names the un-automatable step.

### 8.3 When a deploy reports "wrong"

Before investigating a bug:

1. Confirm the commit is on main (not just on a session branch) — `git log origin/main --oneline`.
2. Confirm the user performed the pull-to-refresh gesture. If not, the report is browser cache state, not deploy state.
3. Only after both confirmations, treat the report as a deploy failure worth investigating.

Canon-gov-012 §Corollaries names this discipline precisely. A session that investigates a ghost bug because a step was skipped has wasted the Sovereign's attention — Edict VIII territory.

---

## 9. Republic-wide Candidates

Sections of this document that should be promoted into `REPUBLIC_DESIGN_PRINCIPLES.md` — the universal doc other Provinces (SproutLab, Command Center, SEP) can import. The Codex-specific remainder stays here.

### 9.1 Promote (Republic-wide)

- **§1.1 Hard Rules HR-1..HR-12** — already Republic-wide by virtue of canons 0001..0012; the Republic-wide doc centralizes their English-prose exposition. Codex's per-HR applicability notes stay here.
- **§1.2 HR-C-03 (merge-is-deploy, canon-gov-011)** — applies to every Province with a deployed branch. The specific deploy branch name (`main`) is Province-local but the discipline is universal.
- **§1.2 HR-C-04 (Android PWA cache handoff, canon-gov-012)** — every PWA-deployed Province needs this. iOS WebKit semantics documented per-Province.
- **§1.2 HR-C-05 (Forum Pattern structure)** — the `Rostra → Notice Boards → Filtered Count → Stalls` pattern applies to any Province's record-browsing UI. SproutLab's SmartQA surfaces, Command Center's Senate/Treasury rooms, SEP Dashboard's grids — all candidates.
- **§1.2 HR-C-06 (reference resolver)** — any Province with references between record types benefits.
- **§1.2 HR-C-07 (records-are-Codex)** — already Republic-wide by rule; the Republic doc names the invariant formally.
- **§1.2 HR-C-08 (derived-from-data filters)** — universal anti-enum-drift discipline.
- **§2 Design Tokens** — the *structure* (spacing scale, size scale, radii, animation) is universal; the specific values (`--sp-12: 12px`) are per-Province. Document the scale structure in the Republic doc.
- **§4.1–4.2, 4.5 Icon System discipline** — every Province uses a stroke-based SVG icon function (`cx()` for Codex, `zi()` for SproutLab, etc.). The style (1.5 stroke, 24×24, currentColor, rounded caps) is universal; the catalog is per-Province.
- **§5.7 Button class discipline** — primary / secondary / danger / icon / link conventions apply Republic-wide with per-Province palette substitution.
- **§7.5 Records-are-Codex** — the literal list of record types is partly Codex-specific, but the principle (Province produces work, Codex preserves record) is Republic-level.
- **§8 Deploy Chain Discipline** — every PWA Province deploys this way.

### 9.2 Keep Codex-local

- **§3 Color System** — palette is Codex's library theme. SproutLab has rose/indigo/peach/amber/sage/lavender for care domains; Command Center has Roman civic amber/terracotta; SEP has gray invoice palette + 9-domain dashboard. Each Province documents its own palette; the Republic doc names the *discipline* (role mapping, color-mix 15% recipe, left-border accent) but not the colors.
- **§3.4 Category mapping tables** — entirely Codex-specific to Codex's entity types (canons, lore, apocrypha, chapters). Each Province has its own entities.
- **§4.3 Icon Catalog** — Codex-specific (book/tome/scroll/quill/shelf). SproutLab's catalog is pediatric-themed.
- **§5 Component Library** — per-Province CSS implementation. Republic doc specifies the contract ("a filled category chip is one chip variant"), not the class names.
- **§6 Forum Pattern Per-Tab Application** — tables are Codex-specific. The Pattern itself (§6.1) promotes.
- **§7.3 Export filename convention** — `codex-` prefix is obviously Codex-local; the structure (`<province>-<tab>-YYYY-MM-DD.md`) promotes.
- **§7.4 Chapter status enum** — Codex-specific (chapters are a Codex entity type).

### 9.3 Promotion workflow (proposed)

1. This draft ratifies as Codex's design-principles constitution.
2. Sections tagged "Republic-wide" above are extracted into a new `REPUBLIC_DESIGN_PRINCIPLES.md` (Codex-hosted per HR-C-07).
3. The Republic doc is ratified at the Consul/Sovereign level — it's constitutionally-scoped content, peer to the Canons and Book III/IV governance layer, not a per-Province lockdown.
4. Each other Province authors a per-Province design-principles doc that imports the Republic doc by reference and documents only the per-Province adaptations (palette, catalog, entity-specific category maps).
5. When a new rule is drafted, authors decide at draft time whether it's Republic-wide or Province-specific and place it accordingly.

---

## 10. Open Questions

1. **Palette expansion.** Canon categories (7) exceed the palette (6). `design` and `deploy` currently share `--accent-light`. Options: (a) add `--accent-secondary` (a distinct hue like teal or terracotta) as a theme token, (b) accept collision and document, (c) reshape canon categories so there are never more than 6 live values. Current choice: (b) for now, revisit if `deploy` grows.
2. **Apocrypha card colors.** Apocrypha status chips use the chapter status classes (`cx-status-complete` etc.) but the card border is a uniform `--accent`. Should Apocrypha cards pick up per-status left borders like Lore and Canons?
3. **Schism card colors.** Same question — schisms currently render as a uniform muted block. Per-Province color might work, since each schism belongs to a volume.
4. **Companion Log card colors.** Should carry per-repo left border using each volume's `domain_color`?
5. **Filter-count phrasing.** "N entries" vs "Showing N of M when filtered" — this doc picks the TODOs overhaul's form. Canon-0052 §Open Questions #1 lists both; should codify which one wins across all tabs.
6. **Sub-tab "All" default.** Canon-0052 says "All" default leftmost. Canons overrode to `canons` because Rostra signals are incompatible. Is the override a one-off or a pattern? When does "All" make sense and when doesn't?
7. **Rostra action-button placement.** Right-aligned in Rostra is the proposal; Lore's export button is right-aligned in the health strip today. Confirm as discipline across all tabs.
8. **Touch target for filter pills.** 32px `min-height` is under the 44px floor. Acceptable in practice (pill density would be ugly at 44px) but documented as exemption. Is 32px still acceptable on the next iOS/Android update's accessibility audit?
9. **Sub-tab scroll position.** Switching sub-tabs currently scrolls the view to top. Should sub-tab switches preserve per-sub-tab scroll position (like browser tabs) or always reset (like navigation)? Current behavior: always reset.
10. **"Coming Soon" toast for non-shipped features.** HR-8 requires it; current state unaudited. Trash room, Specs tab, canon export — any of these currently show dead UI with no toast?

---

## 11. Audit checklist (for the ratification session)

Before this document ratifies, a single-session audit should:

- [ ] Grep `references.*\.join` → expect zero matches (HR-C-06).
- [ ] Grep `style="` in `split/views.js` + `split/forms.js` → audit every match; most should be HR-2 waivers (data-driven color) and nothing else.
- [ ] Grep `onclick=|onchange=` → expect zero (HR-3).
- [ ] Walk every tab visually in both light and dark mode, with filters at default and with filters applied. Capture screenshots for the audit chronicle.
- [ ] Confirm every card variant carries category color treatment where §3.4 specifies one. The Canons polish commit is the precedent — no entity-type card should ship without the left-border + filled chip treatment when a primary classification exists.
- [ ] Run `npx playwright test` — all cases green.
- [ ] Read CLAUDE.md and confirm the design-principles reference is wired in.

Audit findings become amendments to the draft before ratification. Post-ratification, this document's discipline is the baseline for every new feature.

---

*This is a working draft. It guides the audit; the audit refines the draft; the refined draft is what we ratify. Per the Republic's discipline, we do not legislate ahead of evidence.*


## 6. Forum Pattern (canon-0052 draft — summarized)

The Forum Pattern is Codex's tab-layer architecture. Full draft at `docs/specs/CODEX_FORUM_PATTERN_DRAFT.md`. This section summarizes the binding structural rules; the full draft is the authority until this document is ratified.

### 6.1 The five-layer structure

Every tab renders these layers top-to-bottom, always in this order:

1. **Header** — app title + search + settings. Sticky. No per-tab variation.
2. **Sub-tab pill row** — when the tab serves multiple entity types (Journal, Canons). Same visual language as filter pills; selection persists per primary-tab in `localStorage` under `codex-subtab-<tab>`. "All" default leftmost **when sub-tabs can meaningfully coexist** (Journal); default = primary entity when they can't (Canons — different Rostra shapes per sub-tab).
3. **Rostra** — health strip card (§5.4). Always present. An empty Rostra is a meaningful signal.
4. **Notice Boards** — three pill rows (canon-0052 base): primary classification / secondary / sort. Canons is the documented exception with four rows (Scope / Category / Status / Sort — per §Canons). Rows may carry a row label when there are 3+ rows (HR-C-10).
5. **Filtered count** — one italic line under the pills: "N entries" default, "Showing N of M" when filters narrow the view. This is the TODOs overhaul's resolution of the canon-0052 §Filtered Count open question — "Showing N of M" reads cleaner under active filters.
6. **Stalls** — the content cards. Per-entity structure (§5.1).

### 6.2 Per-tab application (current state)

| Tab | Status | Sub-tabs | Primary classification | Secondary | Export |
|---|---|---|---|---|---|
| Library (Dashboard) | **pending** overhaul | — | Shelf | Cluster | — |
| Journal | overhauled | All / Sessions / Decrees / Logs | Range | Volume | markdown chronicle (pending impl) |
| Canons | overhauled | Canons / Schisms / Apocrypha | Category | Scope + Status | markdown ledger (pending impl) |
| Lore | **reference implementation** | — | Category | Domain | markdown (shipped) |
| TODOs | overhauled | — | Status (open/resolved) | Volume | none (per §Export Policy) |
| Specs | **not yet built** | — | Category (impl-spec / design-spec / canon-draft / handoff) | Volume | markdown bundle (pending) |

### 6.3 Sub-tab pattern

Codified in §5.3. Selection persists per primary tab. Default sub-tab is:

- `all` when sub-tabs carry compatible Rostra signals (Journal)
- the primary entity's sub-tab when they don't (Canons defaults to `canons`)

The choice is per-tab. Document the default in the tab's implementation comment.

### 6.4 Three-row filter baseline

Per canon-0052 §Notice Boards:

1. Primary classification (Category / Type / Status — the strongest filter)
2. Secondary classification (Domain / Volume / Scope)
3. Sort

Tabs with more categories (Canons has 4) extend the baseline. Tabs with no secondary (TODOs effectively merges them) collapse to 2 rows. The baseline is the shape; the deviation is documented.

### 6.5 "All" leftmost discipline

Every filter row starts with an "All" pill that clears the filter when clicked. Derived-from-data pills follow, sorted by count descending (per the Lore reference).

Active-pill state: filled with `--accent`, white text, `--accent` border. Only one pill per row is active at a time — clicking another auto-clears the prior.

---

## 7. Cross-Cutting Disciplines

Rules that span every tab. Each one is either a HR-C (§1.2) or a canon-0052 discipline; this section gives the usage shape.

### 7.1 Reference resolver (HR-C-06, canon-0052)

Use `renderReferenceLink(id)` from `split/core.js` for every `references[]` rendering site. It returns either a clickable navigate button (resolved) or a plain `<span>` (unresolved).

**Never** do `escHtml(refs.join(', '))` — this is the pattern the Canons overhaul shipped with and the Canons polish commit corrected. A grep for `references.join` is the audit:

```
grep -rn 'references.*\.join' split/*.js
```

Zero matches is the goal state.

### 7.2 Delete affordance + Trash (canon-0052 §Delete Affordance — not yet implemented)

Planned pattern (defer to implementation commit):

- Trash icon **hidden by default** on cards
- Long-press (touch) or hover + "…" menu (desktop) reveals destructive actions
- Soft-delete only — sets `_deleted: true` + `_deleted_date`
- Soft-deleted entities move to a Trash room in Settings
- Trash auto-cleans entities where `_deleted_date > 30 days ago`, on app init
- Restore + Permanent Delete actions in Trash

Scope: TODOs, journal sessions, decrees, canons, schisms, apocrypha, lore, companions, volumes, chapters, specs, companion logs.

Current state: partial — canons/chapters already have soft-delete in the data layer, but the "hidden by default" UI affordance is inconsistent. Full pass pending.

### 7.3 Export policy (canon-0052 §Export Policy — partial)

| Tab | Export | Filename | Status |
|---|---|---|---|
| Lore | Markdown ledger | `codex-lore-YYYY-MM-DD.md` | shipped |
| Canons | Markdown ledger (category/scope/status grouping) | `codex-canons-YYYY-MM-DD.md` | **pending** |
| Journal | Markdown chronicle (sessions + decrees + logs as autobiography) | `codex-journal-YYYY-MM-DD.md` | **pending** |
| Specs | Markdown bundle + coverage-gap report prepended | `codex-specs-YYYY-MM-DD.md` | **pending** |
| TODOs | — | — | deliberately no export (operational, not institutional) |

Export is a right-aligned action button in the Rostra. Filename convention: `codex-<tab>-YYYY-MM-DD.md`.

### 7.4 Chapter status enum (canon-0052 — shipped)

Nine values; Dashboard active-count excludes `{complete, abandoned, paused, planned}`. Full mapping in §3.4.4. Unknown statuses surface as drift warnings in Settings via `detectChapterStatusDrift()`.

### 7.5 Records-are-Codex (HR-C-07)

Every institutional record lives in the Codex repo regardless of authoring Province:

- Canons, schisms, apocrypha, lore → `data/canons.json`
- Session journal entries, decrees → `data/journal.json`
- Volumes + chapters + TODOs → `data/volumes.json`
- Companion profiles → `data/companions.json`
- Companion logs → `docs/companion-logs/<repo>/companion-log-<id>-<author3>.md` (canon-0053)
- Specs → `docs/specs/<slug>.md` + `data/specs.json` (pending, per canon-0052 §Specs)
- Interaction artifacts → pending cc-017/cc-018 implementation

Provinces produce the work; Codex preserves the record.



## 5. Component Library

Each component below is a locked spec — deviations require documented rationale and a same-commit update to this section.

### 5.1 Cards

**Base class** `.cx-card`:
- `background: var(--bg-card)`
- `border-radius: var(--r-lg)` (12px)
- `padding: var(--sp-12) var(--sp-16)`
- `margin-bottom: var(--sp-8)`
- `box-shadow: var(--card-shadow)`

**Clickable variant** `.cx-card-clickable`:
- Same as base, cursor:pointer, subtle hover lift (when interaction affordance surfaces).

**Entity-specific variants** each add a 3px left border in the category color (§3.3):
- `.cx-lore-card` + `.cx-lore-cat-<cat>`
- `.cx-canon-card` + `.cx-canon-cat-<cat>`
- `.cx-apocrypha-card` (variants not yet colored per-status — open question §10)
- `.cx-schism-card` (not yet following the pattern — backlog item)
- `.cx-companion-log-card` (new; inherits base; not yet category-bordered — open question §10)

**Canonical card structure** (order top to bottom, per canon-0052 §Stalls):

1. **Icon + Title row** — `cx()` glyph left, title text (Playfair Display, weight 700) right. Clickable to detail view.
2. **Chip row** — one filled category chip (primary classification) + outline chips for scope, status, volume, tags. Max ~4 chips visible; overflow goes into the detail view.
3. **Body preview** — italic for narrative entities (Lore, Apocrypha); plain for structural entities (Canons, TODOs). Truncate to ~100 chars with `renderTruncated()` + "Read more" affordance (HR-10: no ellipsis).
4. **References line** — "Refs: " + comma-separated `renderReferenceLink()` calls. Each reference is a clickable button (HR-C-06). Omitted when empty.
5. **Footer meta** — date (right-aligned when other meta is left-aligned), tags (#-prefixed), author. Smaller font (`--fs-xs`), `--text-tertiary` color.

### 5.2 Chips

**Base** `.cx-chip cx-chip-sm`:
- `display: inline-flex; align-items: center; gap: var(--sp-4)`
- `padding: var(--sp-2) var(--sp-8)` (or similar — exact spec in `styles.css`)
- `border-radius: var(--r-full)`
- `font-size: var(--fs-2xs)`

**Outline variant** (default):
- Transparent background, 1px border `--border`, `--text-secondary` foreground.

**Filled-tinted variant** (primary classification only — §3.5):
- `color-mix(in srgb, <color> 15%, transparent)` background
- `<color>` foreground
- `font-weight: 600`

**Status variants** (`.cx-status-<value>`):
- See §3.4 mapping tables. Status chips use foreground color only (no fill) for chapter and canon statuses; apocrypha status chips reuse the same classes.

**Special chips:**
- `.cx-overdue-chip`: `--warning` background, white text (TODOs overdue affordance)
- `.cx-stalled-chip`: `--error` background, white text, 85% opacity (TODOs stalled)
- `.cx-sync-badge`: connection state indicator in Settings

### 5.3 Filter pills + sub-tab pills

**Filter pill** `.cx-filter-pill`:
- `padding: var(--sp-4) var(--sp-12)`
- `border: 1px solid var(--border)`
- `border-radius: var(--r-full)`
- `background: transparent`
- `color: var(--text-secondary)`
- `font-size: var(--fs-xs)`
- `min-height: 32px` (under the 44px touch floor — acceptable for dense pill rows per explicit exemption)
- `font-weight: 500`

**Active state** `.cx-filter-pill-active`:
- `background: var(--accent)`
- `color: white`
- `border-color: var(--accent)`

**Filter row** `.cx-filter-row`:
- `display: flex; flex-wrap: wrap; gap: var(--sp-6)`
- Wraps naturally — never horizontal-scroll (HR-10 equivalent: don't hide options)

**Row label** `.cx-filter-label` (prefix in row):
- Small-caps (`text-transform: uppercase; letter-spacing: 0.5px`)
- `font-size: var(--fs-xs); font-weight: 700`
- `color: var(--text-secondary)`
- Applied when the tab has 3+ filter rows (HR-C-10)

**Sub-tab pill** `.cx-subtab-pill`:
- Inherits `.cx-filter-pill` styling
- Adds `font-weight: 600` for slightly stronger visual
- Lives in `.cx-subtab-row` which adds `border-bottom: 1px solid var(--border); padding-bottom: var(--sp-8)` to visually separate from the Notice Boards below.

### 5.4 Rostra

The health strip at the top of every Forum Pattern tab/sub-tab. §6 defines the structural role; this section defines the CSS primitives.

**Container** `.cx-rostra`:
- Same visual language as `.cx-card` (background, radius, padding, shadow).
- `margin-bottom: var(--sp-12)` — clear separation from the Notice Boards.

**Headline** `.cx-rostra-headline`:
- `font-family: var(--ff-heading)` (Playfair Display)
- `font-size: var(--fs-3xl)` (28px at default base)
- `line-height: 1.1`
- Large number + small-caps label: `13 CANONS`. The number is the big prose; `<span class="cx-rostra-headline-label">` wraps the label at `--fs-sm, weight 500, uppercase, letter-spacing 0.4px, --text-secondary`.

**Dots** `.cx-rostra-dots`:
- Flex-wrap row of dot + label pairs.
- Each dot: `.cx-rostra-dot` — 10×10 circle (`border-radius: --r-full`), background set via (a) `--text-tertiary` default, (b) per-category class (e.g. `.cx-rostra-dot.cx-canon-cat-<cat>`), or (c) inline `style="background: <hex>"` when the color is data-driven (volume `domain_color`).
- Dot label: `.cx-rostra-dot-label` — `--fs-xs, --text-secondary`. Shows category name + count.

**Stats** `.cx-rostra-stats`:
- One-line stat row. `--fs-xs, --text-secondary`.
- Optional prefix `.cx-rostra-stat-label` — uppercase, letter-spacing 0.3px, `--text-tertiary`, weight 600.
- Multiple stats separated by ` · ` middle-dot, not commas.

**Health signals** (per-tab — what the Sovereign should act on):
- Lore: orphan counter (lore without references)
- TODOs: overdue + stalled chip counts; resolution rate; avg resolution time
- Journal Logs: same-agent drift acknowledgment chip count
- Canons: scope coverage; pending drafts (future)
- Specs: coverage gap ("N in-progress chapters lack specs") — novel Rostra signal

Health signals always appear in the Rostra — never buried. They are what makes the Rostra earn its top-of-view real estate.

**Actions** (right-aligned in Rostra):
- Primary action(s) — export, refresh, jump-to-create.
- Current implementation places the Lore export button inline in the health strip; this document codifies right-aligned as the canonical position for all future tabs.

### 5.5 Forms

**Form group** `.cx-form-group`:
- `margin-bottom: var(--sp-16)`

**Label** `.cx-form-label`:
- Above the input (never beside)
- `--fs-xs, weight 600, --text-secondary, margin-bottom: var(--sp-4)`

**Input / textarea / select** `.cx-form-input / .cx-form-textarea / .cx-form-select`:
- `width: 100%; box-sizing: border-box`
- `padding: var(--sp-10) var(--sp-12)`
- `border: 1px solid var(--border); border-radius: var(--r-md)`
- `min-height: 44px` (touch target)
- Focus: `outline: 2px solid var(--focus-ring); outline-offset: 2px; border-color: var(--accent)`

**Validation states:**
- Error: `.cx-form-input-error` — `border-color: var(--error)`.
- Error message: `.cx-form-error` — `color: var(--error); font-size: var(--fs-xs); margin-top: var(--sp-4)`.
- No inline error messages — always below the field.

**Readonly** `.cx-form-readonly`:
- `background: var(--bg-secondary); color: var(--text-tertiary)`

### 5.6 Overlays

Two overlays — **main overlay** (create/edit forms) and **confirm dialog** (destructive confirmations). Both use the same mechanics:

**Backdrop** `#overlayBackdrop` / `#confirmBackdrop`:
- `.cx-overlay-backdrop` — fixed fullscreen, `background: rgba(0,0,0,0.5)`, fades in over `--anim-overlay`.

**Container**:
- Slide-up from bottom on mobile; centered modal on desktop.
- Max width constrained; body scroll locked while open.

**Lifecycle:**
- `openOverlay(title, bodyHtml, footerHtml)` / `closeOverlay()` in core.js.
- Escape key dismisses (only when no nested picker is open).
- Clicking outside the overlay dismisses (backdrop click).
- `closeOverlay()` waits for `--anim-overlay` duration before hiding — no jank.

**Confirm dialog:**
- `showConfirmDialog(title, message, onConfirm, options)`.
- `options.danger = true` renders the confirm button as `.cx-btn-danger`.
- `options.label` customizes the confirm button label (default: "Confirm").

### 5.7 Buttons

| Class | Role | Visual |
|---|---|---|
| `.cx-btn-primary` | Primary CTA | Solid `--accent` background, white text, 44px min-height |
| `.cx-btn-secondary` | Secondary action | Transparent background, `--accent` text + border |
| `.cx-btn-danger` | Destructive | Solid `--error` background, white text |
| `.cx-btn-icon` | Icon-only (header, card actions) | No background, 44×44 min, secondary text color |
| `.cx-btn-danger-icon` | Destructive icon | Icon-button with `--error` color |
| `.cx-btn-sm` | Compact modifier | 36px min-height, smaller padding |
| `.cx-link-btn` | Inline text-style button | No background, `--accent` color, underline |

Every button class uses token-based spacing + sizes (HR-5). Every button meets the 44px touch target (or 36px for explicit dense contexts with `.cx-btn-sm`).

### 5.8 Toast

`showToast(message, type)` in core.js.

- Types: `success`, `error`, `info`.
- Auto-dismisses after ~3 seconds (animation via `--anim-toast`).
- Positioned at top of viewport, below header.
- Color cues: success → `--success` accent bar, error → `--error`, info → `--accent`.
- HR-8: stub features show "Coming soon" toast (type: `info`), not silent no-ops.

### 5.9 Empty states

`renderEmptyState(icon, title, subtitle, ctaLabel?, ctaAction?)`:

- Centered content: cx() icon, title (`--fs-lg`, weight 600), subtitle (`--fs-sm, --text-secondary`), optional primary CTA button.
- Used when a filtered set returns zero results, or when the entity type has no entries yet.
- Always actionable when possible — prefer "Create First Canon" over a bare "No canons yet."



## 4. Icon System — `cx()`

### 4.1 Signature

```js
cx(name) → string  // SVG HTML, or '<span class="cx-missing"></span>' for unknown names
```

Called at render time, result inserted via `innerHTML` (HR-7). Returns raw SVG markup, not a DOM node. Never pass `cx()`'s return value through `escHtml` — escHtml is for user-supplied strings crossing the render boundary; cx() output is trusted framework markup.

### 4.2 Style — "Style C" locked

All cx() icons share:

- 24×24 viewBox
- `stroke="currentColor"` (inherits container color)
- `stroke-width="1.5"`
- `stroke-linecap="round"`, `stroke-linejoin="round"`
- `fill="none"` by default; `fill="currentColor"` with `opacity="0.15"` or `0.3` for filled variants

This is Codex's locked icon idiom. Not negotiable without a design session — don't import icons from other icon sets with different strokes/weights. Consistency of stroke weight is load-bearing for visual coherence.

### 4.3 Catalog (current)

23 icons in `split/core.js`:

| Name | Usage |
|---|---|
| `book` | Volume label in Library, default volume icon |
| `bookmark` | Canon card default; planned chapter status |
| `scroll` | Apocrypha; companion log cards; spec-complete chapter |
| `quill` | Edit action; spec-drafting chapter status |
| `shelf` | Shelf / library structural |
| `search` | Search action; review chapter status |
| `check` | Complete state; confirm |
| `clock` | Duration, paused, in-progress |
| `lock` | Blocked state, locked content |
| `sun` | Light theme toggle |
| `moon` | Dark theme toggle |
| `plus` | Create / add |
| `trash` | Delete (shown revealed when destructive affordance enabled) |
| `arrow-left` | Back navigation |
| `link` | External / reference link |
| `alert` | Error, warning, abandoned |
| `close` | Dismiss overlay / toast |
| `download` | Export, save |
| `info` | Informational |
| `github` | GitHub connection UI |
| `refresh` | Sync / reload |
| `gear` | Settings |
| `tome` | Lore entry default |

### 4.4 Adding a new icon

1. Design the SVG at 24×24 following Style C (stroke 1.5, `currentColor`, rounded caps/joins).
2. Add to the `icons` map in `split/core.js` `cx()` function.
3. Document in §4.3 table here in the same commit.
4. If the icon carries semantic weight (e.g. `blocked` mapping to `lock`), update the appropriate mapping helper (§3.4) so the semantic is preserved end-to-end.

### 4.5 Never

- **Never emoji** (HR-1). Emojis render inconsistently across devices, can't be themed, don't inherit currentColor, break the stroke-weight system.
- **Never text-as-icon fallback**. The middle-dot `·` placeholder in Aurelius's original CC scaffold (chronicled in canon-cc-018 lineage) is the counterexample — visually forgivable for a session but structurally a drift case. Every icon slot gets a real SVG glyph.
- **Never call `cx()` in untrusted contexts**. The icon name itself must not be derived from user input — the function returns SVG markup destined for `innerHTML`, and a name collision risk is trivial; the trust boundary is that the name is a developer constant.



## 3. Color System

Codex's palette is library-themed: warm earth tones (aged paper, leather, bronze) in both modes. Six functional color tokens plus three text-weight tokens. All tokens defined per-theme in `[data-theme="light"]` and `[data-theme="dark"]` blocks.

### 3.1 Palette (role-mapped)

| Token | Role | Light | Dark |
|---|---|---|---|
| `--accent` | Primary brand / gold / architectural | `#8B7355` | `#C4A87A` |
| `--accent-light` | Secondary / muted / design-facing | `#B09A7E` | `#A08C6A` |
| `--success` | Positive state / process complete / green | `#4A7C59` | `#6AAF7B` |
| `--warning` | Caution / overdue / governance | `#C4883A` | `#E0A850` |
| `--error` | Destructive / blocked / discipline | `#B84C4C` | `#D46A6A` |
| `--focus-ring` | Accessibility focus outline | `#5C4A35` | `#D4BC94` |
| `--text-primary` | Body text | `#2C2417` | `#E8E0D4` |
| `--text-secondary` | Meta, labels, secondary | `#6B5E50` | `#B0A494` |
| `--text-tertiary` | Tertiary, muted, disabled | `#9C8E7E` | `#7A6E60` |

Palette slots: six functional colors. This is **one fewer than SproutLab's six domain colors + accent** — Codex's six-slot system is tight for entity types with seven+ categories. When a category count exceeds six, either:

1. Collapse two semantically-close categories onto one color (and document the collision in the entity's mapping table below), or
2. Add a new theme token — e.g. a proposed `--accent-secondary` for a distinct hue — documented in a Schism (canon process for rejected alternatives) or a canon amendment.

**Current known collisions:** canon category `deploy` shares `--accent-light` with `design` (§3.4.2 below). Acceptable because `deploy` is rare (4 canons today) and semantically adjacent ("shipping concern" ↔ "design polish"). Revisit if `deploy` grows past ~10 entries.

### 3.2 Color-mix recipe for filled chips

Filled category chips use the same recipe everywhere:

```css
background: color-mix(in srgb, var(--<color>) 15%, transparent);
color: var(--<color>);
font-weight: 600;
```

The 15% tint gives a legible filled appearance without overwhelming the card; the foreground color matches the tint hue at full saturation. Chip examples: `.cx-lore-cat-edicts-chip`, `.cx-canon-cat-architecture-chip`. When adding a new chip category class, follow this recipe exactly — do not invent per-category percentages.

### 3.3 Card left-border accent

Cards that carry a primary classification use a 3px colored left border in the category color:

```css
.cx-<entity>-card { border-left: 3px solid var(--accent); transition: border-color 0.2s }
.cx-<entity>-card.cx-<entity>-cat-<category> { border-left-color: var(--<color>) }
```

Applied to Lore cards (reference), Apocrypha cards, and — as of the Canons polish commit — Canon cards. Schism cards and Companion Log cards should adopt the same pattern; open question §10.

### 3.4 Category color mapping tables

These tables are **the lockdown**. When a new category is added to data, this table must be updated in the same commit as the CSS class. Failing to update the table is how Canons shipped without colors for `governance` / `builder_discipline` / `philosophy` / `deploy`.

#### 3.4.1 Lore categories (5, reference implementation)

| Category | Color token | Voice |
|---|---|---|
| `edicts` | `--accent` | "We decree X because Y" |
| `origins` | `--success` | "This is how it began" |
| `cautionary_tales` | `--error` | "This is what went wrong" |
| `doctrines` | `--warning` | "This is what always works" |
| `chronicles` | `--accent-light` | "This is the context you need" |

#### 3.4.2 Canon categories (7, collision at `deploy`/`design`)

| Category | Color token | Rationale |
|---|---|---|
| `architecture` | `--accent` | Primary — structural law |
| `design` | `--accent-light` | Soft complement to architecture |
| `process` | `--success` | Reliable, repeatable |
| `governance` | `--warning` | Authority + caution-weighted |
| `builder_discipline` | `--error` | Discipline carries weight (accountability) |
| `philosophy` | `--text-tertiary` | Reflective, quiet |
| `deploy` | `--accent-light` | **Collision with `design`** — both "shipping concern"; revisit when `deploy` count > 10 |

#### 3.4.3 Apocrypha statuses (3)

| Status | Color class | Reused from |
|---|---|---|
| `fulfilled` | `cx-status-complete` (`--success`) | Chapter status mapping |
| `foretold` | `cx-status-in-progress` (`--accent`) | Chapter status mapping |
| `forgotten` | `cx-status-abandoned` (`--error`) | Chapter status mapping |

Reuse is deliberate — fulfilled/foretold/forgotten map naturally to the success/in-progress/abandoned semantic.

#### 3.4.4 Chapter statuses (9, canon-0052)

| Status | Color token | Icon |
|---|---|---|
| `planned` | `--text-tertiary` | bookmark |
| `spec-drafting` | `--accent` (0.85 opacity) | quill |
| `spec-complete` | `--accent` | scroll |
| `in-progress` | `--accent` | clock |
| `review` | `--warning` | search |
| `complete` | `--success` | check |
| `paused` | `--warning` | clock |
| `blocked` | `--error` (0.75 opacity) | lock |
| `abandoned` | `--error` | alert |

#### 3.4.5 Canon statuses (3, shipped data)

| Status | Color |
|---|---|
| `active` | chip: `cx-status-active` — filled green |
| `deprecated` | chip: `cx-status-deprecated` — muted |
| `superseded` | chip: `cx-status-superseded` — muted |
| `pending` (in data but not in original enum) | chip: neutral outline — **needs a color**, currently unstyled. Drift case. |

#### 3.4.6 Shelf states (volumes)

| State | Color | Token source |
|---|---|---|
| `active` | green | `--success` |
| `paused` | amber | `--warning` |
| `archived` | muted | `--text-tertiary` |
| `abandoned` | red | `--error` |

#### 3.4.7 Per-volume domain colors

Each volume carries a `domain_color` (hex) in `data/volumes.json`. Used for:

- Rostra per-volume dots (TODOs, Journal, Schisms)
- Volume-identifying chips in per-volume views
- Companion log per-repo dots (Logs sub-tab)

Inline `style="background: <hex>"` on Rostra dots is a documented HR-2 waiver (§1.1) because the color is data-driven, not a class enum.

### 3.5 Chip variants

Two variants, not five:

1. **Outline-neutral** (`cx-chip cx-chip-sm`): transparent background, border, secondary text color. Used for scope, volume, generic tags, stage chips.
2. **Filled-tinted** (`cx-chip cx-chip-sm cx-<entity>-cat-<category>-chip`): `color-mix` 15% tint + matching text color + bold (600). Used **only** for the primary classification on a card.

A card should carry **exactly one** filled chip. Multiple filled chips dilute the signal — the primary classification is the one loud thing; everything else is the outline supporting cast.

### 3.6 Status chip color coupling

Status colors (`.cx-status-active`, `.cx-status-complete`, `.cx-status-in-progress`, etc.) are shared across entity types — a chapter's `complete` and an apocryphon's `fulfilled` and a todo's `resolved` should all render with `--success`. Consistency across entity types reinforces that the color *means* something (positive terminal state) independent of entity.

### 3.7 Focus ring

`--focus-ring` is a dedicated token distinct from `--accent` so keyboard users can see focus even on already-accent elements. Applied via `outline: 2px solid var(--focus-ring); outline-offset: 2px` on focused inputs and buttons. Never remove focus outline — accessibility floor.



## 2. Design Tokens

All spacing, font sizes, radii, and animation durations live as CSS custom properties on `:root` in `split/styles.css`. HR-5 prohibits magic numbers — no rule in this section is aspirational.

### 2.1 Spacing scale

Ten steps. Token name encodes the pixel value:

```
--sp-2:  2px    (hairline — chip border, inline dot row gap)
--sp-4:  4px    (tight — chip padding, meta-line gap)
--sp-6:  6px    (chip row gap)
--sp-8:  8px    (base — card internal padding, filter row spacing)
--sp-10: 10px   (button vertical padding)
--sp-12: 12px   (card padding-horizontal, Rostra stat spacing)
--sp-16: 16px   (card horizontal, overlay padding)
--sp-20: 20px   (section margin)
--sp-24: 24px   (rare — overlay title margin)
--sp-32: 32px   (largest — top-level section separators)
```

New spacing values require a new token, not a local override. If a design calls for 14px that has no token, either use `--sp-12` or `--sp-16` (pick the closer one) or add `--sp-14` to `:root` with a justification. Do not inline `padding: 14px`.

### 2.2 Font-size scale

Relative to `--fs-base` (14px default, user-adjustable via Settings text-size slider low/med/high = 12/14/17px):

```
--fs-2xs: base − 4px  (chip text, filter pill, card meta)
--fs-xs:  base − 2px  (secondary meta, footer)
--fs-sm:  base        (body copy)
--fs-md:  base + 2px
--fs-lg:  base + 4px  (card titles, header app-title)
--fs-xl:  base + 6px  (page titles)
--fs-2xl: base + 10px (rare — settings row primary label)
--fs-3xl: base + 16px (Rostra headline, wizard hero)
```

The slider mutation at `:root` level means every token-using element scales proportionally. Any pixel value written inline (`font-size: 14px`) breaks the slider.

### 2.3 Border radii

```
--r-sm:   4px    (small chips — mostly unused)
--r-md:   8px    (buttons, inputs, inner cards)
--r-lg:   12px   (standard card, Rostra card)
--r-xl:   16px   (overlay)
--r-2xl:  20px   (hero card — rare)
--r-full: 9999px (pills, dots, circular avatars)
```

### 2.4 Animation durations

```
--anim-overlay:    300ms  (overlay open/close, confirm dialog)
--anim-toast:      200ms  (toast enter/exit)
--anim-tab-switch: 150ms  (tab-active color transition)
--anim-expand:     200ms  (Read more / collapsed section expand)
```

All transitions should reference one of these tokens. Never inline a duration.

### 2.5 Font families

```
--ff-heading: 'Playfair Display', Georgia, 'Times New Roman', serif
--ff-body:    'Work Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

Applied via `h1, h2, h3 { font-family: var(--ff-heading) }` and `body { font-family: var(--ff-body) }`. Italic Playfair Display is Codex's narrative-voice idiom (used for Lore body, Apocrypha narrative, voice subtitles).

### 2.6 Touch target minimum

44px minimum hit area for every tap target on mobile. Buttons and icon-buttons in `styles.css` hit this via `min-height: 44px` (or `min-height: 36px` for `cx-btn-sm` with explicit justification — the Sort pill row, filter pills, etc.). Sub-44px targets are HR-5-adjacent — they're not about tokens but about accessibility baseline.


