# Canon Draft — canon-0052: The Forum Pattern

**Status:** draft (pending ratification after Codex reference-implementation overhaul)
**Scope:** global (per-Province adoption clause — no retroactive mandate)
**Category:** design
**Created:** 2026-04-18
**Workflow:** draft → overhaul → test → ratify (this document is step 1)

---

## Rationale

The Lore tab is the first Codex view that reads cleanly at a glance. Its structure — health strip, filtered count, content cards, footer chips — surfaces every signal the Sovereign needs to act without scrolling, hides nothing behind expand toggles, and self-diagnoses the archive's health (orphan counter). The other four tabs (Library, Journal, Canons, TODOs) carry varying amounts of legacy debt: incomplete filter pills, missing health strips, hidden delete affordances, decree/session entity-type mixing, raw reference IDs, no export parity.

This canon names the pattern Lore exemplifies, codifies its structural elements, mandates its application across every Codex tab, and establishes the universal disciplines (reference resolution, delete affordance, export policy, status-enum normalization) that the overhaul produces. Future Codex tabs (Companions View per `todo-0017`, Praetorium when canon-cc-019 lands) will pass on day one rather than incurring the same legacy debt.

The pattern is named the **Forum** after the Roman public square — the space citizens enter to read, query, and decide. Each tab is a forum. Each forum has its **rostra** (health strip — the speaker's platform from which the day's state is announced), its **notice boards** (filter rows), its **stalls** (content cards). The vocabulary is Roman because the Republic's interface is a Roman institution, not a generic dashboard.

## The Pattern

### 1. Header
Title + search affordance + settings icon. Already consistent across all tabs; this canon does not change it.

### 2. Rostra (Health Strip)
A single card at the top of the view. Contents:
- **Primary count** — the headline number (e.g. "13 LORE", "12 OPEN TODOS", "89 canons")
- **Distribution dots** — colored dots with per-category / per-status / per-volume counts. Dots are visual atmosphere first, label second; the eye reads the spread before the numbers.
- **Health signals** — domain-specific (orphan counter for Lore, overdue + stalled for TODOs, untreated drafts for Canons, etc.). Surface what the Sovereign should act on.
- **Actions** — primary action(s) for the tab: export, refresh, jump-to-create. Right-aligned within the card.

The Rostra is **always present**. An empty Rostra is a meaningful signal in itself ("no entries yet" is a state worth showing).

### 3. Notice Boards (Filter Rows)
Three pill-style filter rows, in this order:

1. **Primary classification** (Category / Type / Status — whichever is the strongest filter)
2. **Secondary classification** (Domain / Volume / Scope — narrows by belonging)
3. **Sort** (Newest / Oldest / Title / Category — order options)

Conventions:
- "All" pill is the default selection in each row, leftmost
- Pills wrap naturally; no horizontal scroll
- Active pill is filled with the accent color; inactive pills are stroked outline
- Filter pills are **derived from data**, not hard-coded — adding a new category to data adds a pill automatically (the canons-tab category-filter completeness gap is the legacy-debt example this rule prevents)

### 4. Filtered Count
Single line below filters: "N entries" (or "showing 5 of 13" when filters are active — to be settled during overhaul). Reinforces what's in view.

### 5. Stalls (Content Cards)
Card structure (top to bottom):
- **Icon + Title** — left-aligned, category-coded color border (left edge)
- **Chip row** — category badge (filled) + secondary chips (scope, domain, volume, status — outline)
- **Body preview** — italic narrative voice for Lore; plain prose elsewhere; truncate with "Read more" affordance, not ellipsis
- **Footer row** — references (resolved per §Cross-Cutting), tags (#-prefixed), date (right-aligned)

Cards have hover/touch affordance (subtle background lift on dark mode) and a primary tap target that opens the detail view.

### 6. Sub-tabs (When Needed)
Some tabs serve multiple entity types (Journal: Sessions + Decrees; future Canons: Canons + Schisms + Apocrypha?). Sub-tabs are a **pill row directly below the primary tab bar**, same visual language as filter pills, with "All" default. Sub-tab selection is preserved per primary tab in localStorage. Each sub-tab independently goes through Rostra → Notice Boards → Stalls.

## Per-Tab Application

### Lore (Reference Implementation — already passes)
- Rostra: total + 5 category dots + orphan counter + markdown export
- Filters: Category / Domain / Sort
- Cards: italic body, category-colored left border, voice-subtitled detail view

This canon **codifies** what Lore already does — it is the reference, not the target.

### TODOs
**Rostra:**
- Open count (headline)
- Resolved counts: this week / this month / lifetime
- Resolution rate (rolling 30-day percentage)
- Average resolution time (created → resolved, lifetime mean)
- Overdue counter (open + created > 14 days ago)
- Stalled counter (open + created > 30 days ago + no recent activity)
- Per-volume colored dots
- No export action

**Filters:** Status (all/open/resolved) / Volume / Sort (newest/oldest/overdue/stalled)
**Sub-tabs:** none
**Cards:** existing TODO card structure refined with overdue/stalled pill when applicable

### Canons
**Rostra:**
- Total count (89 today)
- Category dots (design / architecture / process / governance / builder_discipline / etc. — derived from data)
- Status dots (active / deprecated / superseded)
- Scope coverage (global / codex / sproutlab / etc.)
- Markdown export action (canon ledger)

**Filters:** Scope / Category / Status / Sort — all derived from data, no hard-coded enums
**Sub-tabs:** Canons / Schisms / Apocrypha — each with its own Rostra
**Cards:** title, scope+category+status chips, body preview, refs (resolved), date

### Journal
**Sub-tabs:** Sessions / Decrees / All — three sub-tabs, default All
**Per sub-tab Rostra:**
- Sessions: count this week / month / total · bug counts · avg duration · per-volume dots · markdown export (chronicle)
- Decrees: count · per-province dots · ratification mode breakdown · export
- All: combined counts and dots

**Filters:** Range (7/30/90/All) / Volume / Sort — already present; complete and apply per sub-tab
**Cards:** session and decree cards visually distinguished (icon + accent color); body preview always visible (no Details expander hiding decisions/todos)

### Library (Dashboard)
**Rostra:**
- Volume count + per-shelf dots (active / paused / archived / abandoned)
- Per-cluster dots (A / B / Monument / Capital — per cc-016)
- Active chapter count (with `spec-complete` etc. fixed per Status Enum below)
- Open TODO count
- Sessions/month
- Canon count

**Filters:** Shelf / Cluster / Sort
**Heatmap:** trim or remove — currently spends vertical real estate for what's effectively a recency hint. Decision deferred to overhaul.
**Cards:** existing volume cards already pattern-aligned; minor refinements during overhaul

## Cross-Cutting Discipline

### Reference Resolver (Universal)
Lore's `references[]` resolver becomes a shared utility (`resolveReference(id) → { type, label, route }`). Every tab with a `references[]` field renders through it: clickable links to target entity, type-prefixed label, unknown-ID fallback to plain text.

Implementation: extract from current Lore-tab logic into core.js as a free function. Caller passes the ID; resolver returns either an `<a>` element with the right route or a plain-text fallback.

### Delete Affordance
- Trash icon **hidden by default** on all cards
- Long-press (touch) or hover-+-"…" menu (desktop) reveals destructive actions
- Delete is **always confirmed** via the existing confirm overlay
- Delete is **soft-delete only** — sets `_deleted: true` and `_deleted_date` on the entity
- Soft-deleted entities move to **Trash** room in Settings
- Trash auto-cleans entities where `_deleted_date` > 30 days ago, on app init
- Trash supports Restore (clears `_deleted` flag) and Permanent Delete (immediate purge)
- Applies to: TODOs, journal sessions, decrees, canons, schisms, apocrypha, lore, companions, volumes, chapters

### Export Policy
- **Lore:** markdown ledger (existing) — keep as-is
- **Canons:** markdown ledger (new) — canon audit trail with category/scope/status grouping, citation references, ratification dates
- **Journal:** markdown chronicle (new) — sessions and decrees as autobiography chapters, per the dissertation's "Binding" concept
- **TODOs:** no export — the TODO ledger is operational, not institutional

Export is a button in the Rostra, right-aligned. Filename convention: `codex-{tab}-YYYY-MM-DD.md`.

### Chapter Status Enum (Normalization)
Six progress states + three orthogonal interrupts:
- **Progress:** `planned → spec-drafting → spec-complete → in-progress → review → complete`
- **Interrupts:** `paused | blocked | abandoned`

Dashboard "active chapter count" = chapters where status not in `{complete, abandoned, paused, planned}`. This includes all of `spec-drafting`, `spec-complete`, `in-progress`, `review`, `blocked`.

Existing data with status `spec-complete` (sproutlab/device-sync-reconcile) is already correct under this enum; no data migration needed for that case. Future drift detection: any unrecognized status surfaces in Settings as "Unknown chapter status" warnings.

CLAUDE.md must be updated to reflect the new enum at ratification.

### Sub-Tab Pattern
- Pill row directly below the primary tab bar
- Same visual language as filter pills (outline default, filled active)
- "All" is the default leftmost option
- Selection persists per primary-tab in localStorage (`codex-subtab-{tab}`)
- Each sub-tab independently renders Rostra → Notice Boards → Stalls

## Open Questions (Resolve During Overhaul)

1. **Filtered count phrasing.** "12 entries" vs "showing 5 of 12" when filtered. Which reads cleaner? Test both during Canons overhaul.
2. **Library heatmap.** Cut entirely, or shrink to one row? Test removal first; restore if a Sovereign-felt absence emerges.
3. **Canons sub-tabs.** Schisms and Apocrypha currently route through the Canons view but have separate detail routes. Confirm sub-tab placement vs. dedicated tabs vs. status of sub-tabs at all.
4. **Journal "All" sub-tab.** Mixing sessions + decrees in chronological order — useful or noisy? Test default = All; flip if confusing.
5. **Per-volume dot color source.** Volumes have `domain_color` already set. Reuse for dot color across all per-volume distributions. Confirm contrast in dark mode.
6. **Export button discoverability.** Right-aligned in Rostra is the proposal. Risk: Rostra is busy. Alternative: a single "•••" menu in the header. Test both.

## References (when ratified)

- canon-0034-sw-no-html-cache (existing PWA discipline)
- canon-cc-013-source-verification-means-reading-the-source (governance overlap on data-derived filters)
- canon-cc-016-residency-and-access-gating (cluster vocabulary for Library filter)
- canon-cc-017-interaction-artifact-rule (decree/session split rationale)
- canon-cc-018-artifact-lifecycle-and-synergy-observability (informs Praetorium tab pattern)
- canon-gov-011-merge-is-the-deploy-step (overhaul ships via main, not branches)

## Promotion to canons.json

When this draft is ratified:
1. Promote to `canons.json` as `canon-0052-the-forum-pattern` with `status: active`
2. Strip the "Open Questions" section (resolved by then) and the "Workflow" header
3. Update CLAUDE.md to cite this canon and the new chapter status enum
4. Move this `.md` file to `docs/specs/_superseded/` for chronicle
5. Author lore entry chronicling the overhaul session(s) — pattern-emergence doctrine, not cautionary

---

*This is a working draft, not canonical law. It guides the overhaul; the overhaul refines the draft; the refined draft is what we ratify. Per the Republic's discipline, we do not legislate ahead of evidence.*
