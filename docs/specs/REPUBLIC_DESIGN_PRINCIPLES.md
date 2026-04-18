# REPUBLIC_DESIGN_PRINCIPLES.md — Draft v0.1

**Status:** draft skeleton (extracted from `CODEX_DESIGN_PRINCIPLES.md` §9.1; pending contribution from SproutLab + Command Center + SEP before ratification)
**Scope:** Universal design and interaction discipline that applies to every Province and Monument in the Republic of Codex. Province-specific adaptations (palettes, icon catalogs, entity types) live in each Province's own design-principles document; this document holds only the subset that is invariant across Provinces.
**Authority:** Once ratified, this document is peer to the Constitution's Book III/IV governance layer and peer to the ratified canon ledger. Conflicts with the Constitution defer to the Constitution; conflicts with per-Province principles are resolved in this document's favor (the Republic-wide rule supersedes local adaptation).
**Host:** Codex repository per records-are-Codex (HR-C-07). Every Province imports this document by reference and documents its local adaptations separately.

---

## 0. Why this document exists

The Republic has multiple Provinces each building in their own repository (Codex, SproutLab, SEP Invoicing, SEP Dashboard) plus a Monument Project (Command Center). Each grows its own codebase, its own idiom, its own rituals. Without a named Republic-wide baseline, drift accumulates: SproutLab's Hard Rules are referenced by Codex via canon cross-reference, but the inheritance is implicit; Command Center adopted its own icon set and color language without a formal comparison to what already exists; SEP has a nine-domain dashboard palette that was never cross-checked against the other Provinces' conventions.

This document codifies what is universal: the rules whose violation in any Province would be a rules violation, not a local-choice. Province-specific design (Codex's Playfair Display library theme vs SproutLab's rose/indigo care palette vs Command Center's Roman civic amber) lives in each Province's local doc. The split is explicit so neither document pretends to be the other.

---

## 1. Universal Hard Rules (HR-1 through HR-12)

Originated in SproutLab's `docs/chapters/ch06-designprinciples.json` and promoted here as Republic law. Cross-referenced in `data/canons.json` (Codex-hosted) under `canon-0001` through `canon-0012`. Every Province's codebase is audited against these rules.

Each HR is greppable — violations can be detected by a single grep sweep. That property is what makes HRs enforceable rather than aspirational.

| # | Rule |
|---|---|
| HR-1 | **No emojis.** All iconography via the Province's icon-system function returning SVG markup. Emojis render inconsistently across devices, cannot be themed, do not inherit text color. |
| HR-2 | **No inline styles.** All styling via CSS classes and custom properties. Exception: inline `style=` may carry a single data-driven color property (e.g. `background: <hex>`) when the value is read from data at render time and cannot be class-encoded. Every such waiver is local and reviewable. |
| HR-3 | **No inline event handlers.** All interactivity via a `data-action` delegation pattern. A single delegation root per view makes behavior predictable and debuggable. |
| HR-4 | **`escHtml()` at all render boundaries.** Every user-supplied string sanitized before `innerHTML` insertion. Non-negotiable security practice. |
| HR-5 | **All spacing, font sizes, and radii via CSS tokens.** No magic numbers. The `--sp-*`, `--fs-*`, `--r-*` token families are the exclusive sources. Per-Province values differ; the discipline of token-only does not. |
| HR-6 | **`data-action` naming follows verb-noun or domain-verb-noun convention.** Every action name greppable. Examples: `openCreateCanon`, `toggleTodo`, `setCanonScopeFilter`. |
| HR-7 | **Icon-system functions return SVG HTML strings, set via `innerHTML`.** Never `textContent`. Province icon functions (`cx()`, `zi()`, etc.) all follow this contract. |
| HR-8 | **Stub features show "Coming soon" via toast.** No dead buttons, no silent no-ops. Every user-facing action either completes or explains why it can't. |
| HR-9 | **Post-build multi-round QA audit.** Continue until only cosmetic bugs remain. Mechanical test harnesses (Playwright, smoketests) are one layer; visual audit against the design-principles constitution is the second layer; Sovereign/Consul review is the third. |
| HR-10 | **No text-overflow ellipsis.** Truncation hides meaning. Every apparent overflow has either a layout solution or an explicit "Read more" affordance. |
| HR-11 | **`Math.floor` for all currency values.** Never round up on money. Applies to every Province that handles currency (SEP Invoicing, SEP Dashboard). Non-currency Provinces inherit the rule in the ledger but have no enforcement surface. |
| HR-12 | **Timezone-safe dates via the Province's `localDateStr()` equivalent.** Never raw ISO date slicing; never `new Date(iso).toISOString().slice(0,10)`. |

### Rule conflict resolution

Constitution v1.0 Books I–IX > Canons 0001–0012 (HRs) > Post-HR ratified canons > Republic-wide design principles (this document) > Per-Province design principles > Per-session judgment.

A new Republic-wide rule cannot contradict a Constitutional provision. A per-Province adaptation cannot override a Republic-wide rule. Conflicts that emerge are resolved by the Consul with Sovereign authorization, and the resolution lands as either a new canon or an amendment to this document.

---

## 2. Deploy Chain Discipline

Every Province whose production state is served from a specific branch deploys via this chain:

1. **Build.** Per-Province build step produces the deployable artifact. Direct output to committed paths, never stdout redirect.
2. **Commit.** Stage + commit on the session branch. Commit messages include canon references and rationale in full sentences.
3. **Merge to deploy branch.** Distinct, Sovereign-authorized act. `git checkout <deploy-branch>; git merge <session-branch>; git push origin <deploy-branch>`. Not a subsidiary of the branch merge. The merge commit names what it merges and what lands.
4. **User-side cache invalidation.** For installed PWAs on Android, pull-to-refresh. For iOS, uninstall-and-reinstall is more reliable. Deploy handoffs must name the gesture explicitly — "Merged to main" is the deploy report; "pull-to-refresh on your device" is the verification handoff.

**Canon references:** canon-gov-011 (merge-is-deploy), canon-gov-012 (Android PWA cache invalidation), canon-0034 (SWs never cache HTML).

The specific deploy branch name is Province-local (Codex: `main`; others may vary). The discipline is Republic-wide.

**Verification discipline:** before investigating a "wrong" deploy, confirm (a) the commit is on the deploy branch, (b) the user performed the cache-invalidation gesture. Reports that skip either are browser cache state or branch state, not deploy state.

---

## 3. Forum Pattern (canon-0052 draft — structural baseline)

Every Province's record-browsing UI follows this structure:

1. **Header** — Province identity + universal affordances (search, settings).
2. **Sub-tab pill row** — when a tab serves multiple entity types. Selection persists per primary-tab in `localStorage`.
3. **Rostra** (health strip) — always present; surfaces the count, distribution, and health signals the user should act on. An empty Rostra is itself a signal.
4. **Notice Boards** (filter rows) — three by default: primary classification / secondary / sort. Filters derived from data, never hard-coded enums.
5. **Filtered count** — one italic line: "N entries" default, "Showing N of M" when filters narrow.
6. **Stalls** (content cards) — per-entity structure.

**Province adaptation:** the structural layers are invariant. The entity types, Rostra signals, and card shapes are per-Province. Example mappings:

- Codex Lore/Canons/Journal/TODOs → codified in `CODEX_DESIGN_PRINCIPLES.md` §6
- SproutLab SmartQA / Scores / Timeline → pending adaptation
- Command Center Senate / Treasury / Hearth rooms → pending comparison
- SEP Dashboard domain grids → pending comparison

---

## 4. Cross-Cutting Disciplines

### 4.1 Reference resolver

Every Province that has cross-references between record types (canon → lore, session → canon, companion-log → session, invoice → client) must provide a `resolveReference(id) → { type, label, route }` utility and render every reference through it. Plain-text joining of reference IDs is a cross-cutting violation.

Codex implementation: `renderReferenceLink(id)` in `split/core.js`.

### 4.2 Records-are-Codex

All institutional records — canons, lore, schisms, apocrypha, decrees, journal entries, interaction artifacts, specs, companion logs — live in the Codex repository regardless of authoring Province. Provinces produce work; Codex preserves the record. Per-Province repositories hold only operational state (application runtime data, user-facing records that don't constitute institutional memory).

Canon references: canon-0052 (draft) §Cross-Cutting Discipline, canon-0053 (draft) §1, canon-cc-017 (interaction artifacts).

### 4.3 Filter derivation

Filter pills, Rostra dots, and category-adjacent UI elements must be **derived from data**, never hard-coded enums. Adding a new value to data adds the UI surface automatically. The Canons tab's pre-overhaul state — a 3-value hard-coded enum that missed 4 of the 7 actual categories in data — is the canonical drift case this rule prevents.

---

## 5. Design Tokens (scale structure)

Every Province defines its palette and spacing independently. The *structure* of the token scale is Republic-wide.

### 5.1 Spacing scale

Per-Province values differ; the scale shape does not. Codex uses `--sp-{2,4,6,8,10,12,16,20,24,32}`. SproutLab uses a similar ramp with different specific values. Every token value must be encoded in its name (so `--sp-12` is unambiguously 12px, not "medium").

### 5.2 Font-size scale

Derived from `--fs-base` via `calc()`. Provinces choose their base (Codex: 14px default, user-adjustable via text-size slider). The derivative tokens `--fs-{2xs,xs,sm,md,lg,xl,2xl,3xl}` express relative sizes. Any hard-coded `font-size: 14px` breaks user-level text-size adjustment.

### 5.3 Radii + animation durations

Same pattern: each Province defines its radii (`--r-*`) and animation (`--anim-*`) tokens. No inline pixel radii, no inline millisecond durations. Transitions always reference a token.

### 5.4 Touch target baseline

44px minimum hit area for mobile tap targets. Explicit exemptions (e.g. 32px for dense filter pill rows) are documented as local waivers with accessibility justification.

---

## 6. Icon System discipline

Every Province uses a stroke-based SVG icon function. The style is universal:

- 24×24 viewBox
- `stroke="currentColor"` (inherits container color; themes automatically)
- `stroke-width="1.5"`
- `stroke-linecap="round"`, `stroke-linejoin="round"`
- `fill="none"` default; partial fills at 0.15 or 0.3 opacity as decorative accents

Province-specific catalogs differ (Codex has library glyphs — book, tome, scroll, quill; SproutLab has care glyphs — bottle, crib, stethoscope). The style is invariant. Mixing icon styles (varying stroke weights or fill approaches) within a single Province or across the Republic is drift.

---

## 7. Button class discipline

Every Province provides these button variants:

- **Primary CTA** — solid accent background, white text.
- **Secondary action** — transparent background, accent border + text.
- **Danger / destructive** — solid error background, white text.
- **Icon-only** — no background, 44×44 min hit area.
- **Small modifier** — reduced padding + height for dense contexts (Rostra pills, filter pills).
- **Link-style** — inline text button (no background, accent color, underline).

Class names and exact palette differ per Province; variant set is Republic-wide.

---

## 8. Record retention + soft-delete

(Placeholder — pending completion of canon-0052 §Delete Affordance implementation in Codex, SproutLab's own pattern audit, and Command Center's Trash room.)

Draft principle: destructive actions are always soft-delete at the data layer (sets `_deleted: true` + `_deleted_date`). Trash room allows restore; auto-purge at 30 days. Permanent-delete is explicit, confirmed, post-Trash.

---

## 9. Per-Province Design-Principles Obligations

Each Province must maintain a document at `docs/specs/<PROVINCE>_DESIGN_PRINCIPLES.md` that:

1. **Imports this document by reference** and states which sections apply as-is vs with per-Province adaptation.
2. **Documents the Province's palette** — every color token's hex in light + dark (or equivalent theme) mode, every role mapping.
3. **Documents the Province's icon catalog** — every icon name, visual, semantic usage.
4. **Documents the Province's entity types and category mappings** — for every entity type that carries a category/status, a mapping table from category value to color, icon, voice (if narrative).
5. **Documents Province-specific HRs** (if any) numbered as `HR-<prefix>-*` where the prefix distinguishes the Province (HR-C-* for Codex, HR-SL-* for SproutLab, etc.).
6. **Documents a palette-collision policy** when entity types exceed palette slots.

### Current Province state

| Province | Doc exists | Status |
|---|---|---|
| Codex | `docs/specs/CODEX_DESIGN_PRINCIPLES.md` | draft v0.1 |
| SproutLab | `docs/chapters/ch06-designprinciples.json` (SproutLab-repo chapter) | shipped v3 (2,011 lines) — to be migrated to `<this repo>:docs/specs/SPROUTLAB_DESIGN_PRINCIPLES.md` per records-are-Codex |
| Command Center | — | **missing** — first Monument Project; design constitution should land in its Foundation criteria |
| SEP Invoicing | — | **missing** — Solara to author |
| SEP Dashboard | — | **missing** — Theron to author |

---

## 10. Open Questions

1. **SproutLab migration.** The SproutLab design principles v3 content lives in SproutLab's repo at `docs/chapters/ch06-designprinciples.json` (which is actually a Codex snippet imported into the Codex data layer about SproutLab's doc, not the doc itself). Where does the actual v3 document live? The chapter content refers to "the principles" as though they exist somewhere fully — find and import per records-are-Codex.
2. **Palette-collision policy.** When entity categories exceed palette slots (Canons with 7 categories, 6 palette colors), the Province must either accept collision, expand the palette, or restructure categories. Document the decision template in a future amendment.
3. **Icon catalog sharing.** Codex and SproutLab share Cluster A (Cipher as Censor). Should their icon catalogs share a common base set + Province-specific additions, or should each maintain a fully independent catalog? Currently independent; the duplication is cheap but inconsistency risk is real.
4. **HR-11 enforcement.** Currency discipline applies only to SEP Invoicing + SEP Dashboard today. When BusinessAI-Simulation becomes active or when Codex grows a monetary surface (Economy per Book IX?), the rule's surface expands.
5. **The Republic's typography.** Each Province uses its own typography. Codex: Playfair Display (heading) + Work Sans (body). SproutLab: TBD. Command Center: TBD. Should typography be a per-Province choice (document only) or should the Republic have a typography-discipline rule like "display serif + body sans-serif" or equivalent?
6. **Dark mode as default.** Most Provinces default to dark theme. Should the Republic codify dark-as-default as a discipline, or is it a per-Province aesthetic choice?
7. **Accessibility baseline.** WCAG 2.1 AA? AAA for text contrast? Nothing currently codified. High-priority gap.
8. **Print styles.** None of the Provinces currently define print CSS. Is print a Republic concern, or Province-local?

---

## 11. Ratification path

1. **This draft.** Codex publishes; Sovereign reads.
2. **Province contribution window.** Each Province's Builder (or Sovereign proxy) reads and proposes amendments based on their Province's idiom.
3. **Consul synthesis.** Consul integrates amendments into a v0.2; flags conflicts for Sovereign.
4. **Sovereign ratification.** Book III-style ratification act. Published as ratified v1.0.
5. **Per-Province audit pass.** Every Province audits its codebase against the ratified rules; gaps become follow-up work.
6. **Amendment protocol.** Post-ratification changes require a documented rationale, Consul review, Sovereign authorization. Mirrors canon-cc-012's per-block discipline.

---

*This is a working draft. The Province contributions and Consul synthesis are what make it the Republic's document, not this initial extraction. Extract is step one; ratification is a session's worth of work, minimum.*
