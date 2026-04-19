# REPUBLIC_DESIGN_PRINCIPLES.md — Ratified v1.0

**Status:** **ratified v1.0** on 2026-04-19 by Sovereign-direct action following Design Committee convening under canon-cc-025 rule-A (global-scope, 8 seats, Lyra convening, Solara synthesis clerk). See interaction-artifact `interaction-2026-04-19-001`.
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

*Provenance: HR-1 through HR-12 originated in SproutLab's `docs/chapters/ch06-designprinciples.json` and are promoted here as Republic law with SproutLab's explicit consent-to-promote, recorded at v1.0 ratification on 2026-04-19.*

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

### 4.0 Cross-Cluster stress-test

Republic-wide design discipline proposals pass **cross-Cluster stress-testing** before ratification: a Censor from each seated cluster reads the proposal for Cluster-angle failure modes. Cipher (Cluster A) and Nyx (Cluster B) perform this function today; future Clusters seat their Censors into the same discipline automatically. The stress-test ensures Republic baselines do not privilege one Cluster's altitude (library / operational / ceremonial) over another's. This clause originated with Nyx's premise-audit role in the v1.0 ratifying convening and is canonized as structural discipline here.

### 4.1 Reference resolver

Every Province that has cross-references between record types (canon → lore, session → canon, companion-log → session, invoice → client) must provide a `resolveReference(id) → { type, label, route }` utility and render every reference through it. Plain-text joining of reference IDs is a cross-cutting violation.

Codex implementation: `renderReferenceLink(id)` in `split/core.js`.

### 4.2 Records-are-Codex

All institutional records — canons, lore, schisms, apocrypha, decrees, journal entries, interaction artifacts, specs, companion logs, and subagent/skill spec bodies per canon-cc-026 — live in the Codex repository regardless of authoring Province or Cluster. Provinces produce work; Codex preserves the record. Per-Province repositories hold only operational state (application runtime data, user-facing records that don't constitute institutional memory).

**Cluster preservation clause.** Institutional records remain Republic-shared under records-are-Codex regardless of authoring Cluster; operational state (Province-level runtime data) remains per-Province per-Cluster. Records-are-Codex does not collapse Cluster identity — it preserves cross-Cluster provenance and protects against institutional capture by any single Cluster's chronicling patterns. (Clause origin: Nyx's Cluster B stress-test at the v1.0 ratifying convening.)

**Canon references:** canon-0052 (draft) §Cross-Cutting Discipline, canon-0053 (draft) §1, canon-cc-017 (interaction-artifacts), canon-cc-018 (artifact lifecycle), canon-cc-022 (persona-primitive binding), canon-cc-024 (committee convening pattern), canon-cc-025 (Design Committee membership), canon-cc-026 (spec body placement), canon-cc-027 (signing chain). The persona-binding suite (cc-022–cc-027) extends records-are-Codex to subagent and skill spec bodies: canonical specs in `Codex/docs/specs/subagents|skills/`, per-Province deployable mirrors in each Province's `.claude/` tree.

**Grace clause.** Design-discipline violations that predate this document's v1.0 ratification on 2026-04-19 are grace-covered under the same principle as canon-cc-017's and canon-cc-022's pre-ratification clauses. From v1.0 forward, the rules bind; prior patterns stand as the lore from which the rules were derived.

### 4.3 Filter derivation

Filter pills, Rostra dots, and category-adjacent UI elements must be **derived from data**, never hard-coded enums. Adding a new value to data adds the UI surface automatically. The Canons tab's pre-overhaul state — a 3-value hard-coded enum that missed 4 of the 7 actual categories in data — is the canonical drift case this rule prevents.

---

## 5. Design Tokens (scale structure)

Every Province defines its palette and spacing independently. The *structure* of the token scale is Republic-wide.

### 5.1 Spacing scale

Per-Province values differ; the scale shape does not. Codex uses `--sp-{2,4,6,8,10,12,16,20,24,32}`. SproutLab uses a similar ramp with different specific values. SEP Invoicing and SEP Dashboard use denser ramps reflecting their operational-altitude surfaces. Every token value must be encoded in its name (so `--sp-12` is unambiguously 12px, not "medium").

**Use-case framing** (non-rule observation): spacing-value choice aligns with Province altitude — **library** altitude (Codex's loose spacing for reading), **operational** altitude (SEP Dashboard and SEP Invoicing dense-row state watched at plant-floor tempo), **ceremonial** altitude (Command Center's civic register). The scale-structure principle is invariant; the spacing-value choice reflects the altitude the Province serves.

### 5.2 Font-size scale

Derived from `--fs-base` via `calc()`. Provinces choose their base (Codex: 14px default, user-adjustable via text-size slider). The derivative tokens `--fs-{2xs,xs,sm,md,lg,xl,2xl,3xl}` express relative sizes. Any hard-coded `font-size: 14px` breaks user-level text-size adjustment.

### 5.3 Radii + animation durations

Same pattern: each Province defines its radii (`--r-*`) and animation (`--anim-*`) tokens. No inline pixel radii, no inline millisecond durations. Transitions always reference a token.

### 5.4 Touch target baseline

**44px minimum hit area** for mobile tap targets, aligned with WCAG 2.1 Success Criterion 2.5.5 (Target Size). **32px is permitted in dense-context rows** (Rostra pills, filter pills, SEP's list-heavy invoice and client rosters, dashboard grid cells) with documented accessibility justification — the waiver is local, reviewable, and chronicled in the Province's design-principles document. Lower than 32px requires explicit Sovereign authorization.

---

## 6. Icon System discipline

Every Province uses a stroke-based SVG icon function. The style is universal:

- 24×24 viewBox
- `stroke="currentColor"` (inherits container color; themes automatically)
- `stroke-width="1.5"`
- `stroke-linecap="round"`, `stroke-linejoin="round"`
- `fill="none"` default; partial fills at 0.15 or 0.3 opacity as decorative accents

Province-specific catalogs differ (Codex has library glyphs — book, tome, scroll, quill; SproutLab has care glyphs — bottle, crib, stethoscope; SEP Dashboard carries data-domain glyphs for plant-floor state; Command Center carries civic glyphs). The style is invariant. Mixing icon styles (varying stroke weights or fill approaches) within a single Province or across the Republic is drift.

**Per-Province icon-function naming.** Each Province's icon catalog is accessed through a named function following the `<province-prefix>()` convention: `cx()` for Codex, `zi()` for SproutLab, Province-specific names for SEP Invoicing / SEP Dashboard / Command Center. The prefix is documented in each Province's design-principles document alongside the catalog.

**Data-domain glyph requirement.** For Provinces whose icon catalog represents operational data domains rather than navigation (SEP Dashboard's alkaline zinc bath chemistry, Uniglo 2015 plating line, NCZ temperature control), each glyph must be **readable at 16px** and must **render meaningfully to readers unfamiliar with the domain**. Abstract domain-icons become noise at plant-floor tempo; concrete-symbolic icons survive that tempo. The requirement is Province-side consideration when icons carry operational-state meaning, not just navigational meaning.

---

## 7. Button class discipline

Every Province provides these button variants:

- **Primary CTA** — solid accent background, white text.
- **Secondary action** — transparent background, accent border + text.
- **Danger / destructive** — solid error background, white text.
- **Icon-only** — no background, 44×44 min hit area.
- **Small modifier** — reduced padding + height for dense contexts (Rostra pills, filter pills, SEP invoice-row actions, dashboard grid-cell buttons). Small modifier triggers the 32px touch-target waiver per §5.4; permitted, not default.
- **Link-style** — inline text button (no background, accent color, underline).

Class names and exact palette differ per Province; variant set is Republic-wide.

---

## 8. Record retention + soft-delete

**Soft-delete default.** Every destructive action on an institutional record (canons, lore, journal entries, interaction-artifacts, todos, specs, companion-logs, companion profiles) is a soft-delete at the data layer: sets `_deleted: true` and `_deleted_date: <ISO>` on the record object. The record remains queryable, is surfaced in the Province's Trash room / equivalent, and is recoverable.

**Trash room affordance.** Every Province hosting deletable record classes provides a Trash view surfacing deleted records with restore action. Restore flips `_deleted` back to `false` and clears `_deleted_date`. The Trash view is always reachable from the Province's settings or equivalent navigation root.

**30-day auto-purge.** Records in `_deleted: true` state with `_deleted_date` more than 30 days prior are auto-purged — permanently removed from data. Auto-purge runs on Province startup or on-demand via a Province audit. The 30-day window gives the Republic a recoverable soft-delete surface without long-term bloat in the data files.

**Explicit permanent-delete.** Permanent-delete before the 30-day window requires explicit user action from the Trash view: a confirm-dialog naming the record, its creation date, and its deletion date, with a "Permanently delete" action separate from the default "Restore." Permanent-delete is logged in the Province's companion-log as an uncertainty_notes entry for the next session's review.

**Rationale Lyra preserved as dissent.** Lyra's preferred amendment during the v1.0 ratifying convening was deletion of §8 from the ratified document until canon-0052 implementation landed. The convening's synthesis (Aurelius, Petra, Cipher converging on substantive-inline + implementation deferred) proceeded over Lyra's preference. If canon-0052's implementation in Codex exposes a conflict with the above language, the conflict is resolved by amendment to this §8; Lyra's dissent is chronicled on `interaction-2026-04-19-001`.

**Implementation surface marker.** The canonical implementation of the above principles lands in canon-0052 (currently draft in Codex). Until canon-0052 ratifies, each Province implements soft-delete per its own code layer, honoring the above principles at minimum.

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
| Command Center | — | **blocking Foundation criterion** — first Monument Project cannot declare Foundation complete without a ratified `COMMAND_CENTER_DESIGN_PRINCIPLES.md`; tracked in the Command Center volume's Foundation milestone criteria. Ashara + Petra co-authored. |
| SEP Invoicing | — | **in progress** — Solara authoring `SEP_INVOICING_DESIGN_PRINCIPLES.md` v0.1 within 30 days of Republic v1.0 ratification (commitment chronicled on `interaction-2026-04-19-001`; tracked as `todo-0033`). |
| SEP Dashboard | — | **in progress** — Theron authoring `SEP_DASHBOARD_DESIGN_PRINCIPLES.md` v0.1 within 30 days of Republic v1.0 ratification (commitment chronicled on `interaction-2026-04-19-001`; tracked as `todo-0034`). |

---

## 10. Resolutions (from v0.1 Open Questions)

v0.1 presented eight open questions. The v1.0 ratifying convening resolved six inline and escalated two to the Consul as follow-up work. Each resolution below carries the member-basis from `interaction-2026-04-19-001`.

### 10.1 SproutLab v3 migration — ESCALATED

The SproutLab design principles v3 lives in SproutLab's repo at `docs/chapters/ch06-designprinciples.json` (or linked chapter content) and must be imported into the Codex repository per records-are-Codex. **Escalated to Consul** for ownership assignment and time-bound. Lyra is the most likely owner as SproutLab Builder; Consul disposition pending. Tracked as `todo-0031`.

### 10.2 Palette-collision policy — RESOLVED

When entity categories exceed palette slots, the Province applies the following **three-tier decision tree** (Theron's position):

1. **Accept collision** if categories are semantically adjacent and users read them from context (e.g., two adjacent status values sharing a warm tone).
2. **Expand palette** by adding secondary-tone slots if category count ≤ palette × 1.5 (e.g., 6 → 9 via mid-tones).
3. **Restructure categories** (group into super-categories with icon-secondary distinction) if palette × 1.5 is exceeded.

The decision is documented in the Province's design-principles document with the category-to-tier mapping and the rationale. The tree is Republic-wide; the Province-local decision is per-case.

### 10.3 Icon-catalog sharing — RESOLVED

**Intra-Cluster Provinces share a common base icon set + Province-specific additions.** Codex and SproutLab (Cluster A) share a Cluster A base catalog; SEP Invoicing and SEP Dashboard (Cluster B) share a Cluster B base catalog. **Monument operates an independent catalog** per Edict II's direct-supervision structure — Command Center's civic register is distinct enough from either cluster's idiom that sharing would produce drift. Per-Cluster base catalogs are maintained by the Cluster's Censor (Cipher for A, Nyx for B); Province additions are maintained by the Province's Builder.

### 10.4 HR-11 enforcement scope — RESOLVED

HR-11 (`Math.floor` for currency values) is a **Republic-wide rule**. The rule binds every Province; enforcement audits each Province-with-currency-surface where one exists. Currently SEP Invoicing and SEP Dashboard have currency surfaces; BusinessAI-Simulation will re-activate with one; Codex and Command Center will acquire one under Book IX's economy phases. The rule's scope is Republic; the audit surface expands as currency surfaces expand. The current no-enforcement-surface note is a fact about present deployment, not a scope limit.

### 10.5 Republic typography — RESOLVED: no mandate

The Republic **does not mandate typography**. Each Province chooses its own typography as part of its voice — Codex's Playfair Display + Work Sans (library theme); SproutLab's forthcoming choice (care theme); Command Center's civic register; SEP's data-dense reader; each documented in the Province's design-principles document. Typography mandate would over-reach: a Province's type family is part of its identity, not the Republic's law.

### 10.6 Dark-mode-as-default — RESOLVED: codified

**Dark mode is the Republic-wide default theme.** Provinces default to dark; light theme is toggleable by the user or environment. Province-local departures from dark-default (e.g., a Province whose use-case demands light-first) are chronicled as adaptations in the Province's design-principles document, not as drift. The codification prevents per-Province drift from default-theme coherence while preserving use-case flexibility.

### 10.7 Accessibility baseline — RESOLVED: WCAG 2.1 AA

**WCAG 2.1 Level AA is the Republic-wide accessibility baseline.** Every Province's user-facing surface is audited against WCAG 2.1 AA criteria — touch target (SC 2.5.5, aligned with §5.4), contrast ratio (SC 1.4.3 for text, SC 1.4.11 for non-text), focus visibility, keyboard operability. **Critical text contrast targets WCAG 2.1 Level AAA** (SC 1.4.6) — navigation labels, error states, primary CTAs. The baseline is binding at v1.0 ratification; pre-ratification violations are grace-covered per §4.2; post-ratification violations are audit findings routed to the Province's Governor (where seated) or the Province's Builder.

### 10.8 Print styles — ESCALATED

Whether print CSS is a Republic-wide concern (minimum requirements, default print behavior) or a per-Province choice is **escalated to Consul as a lightweight follow-up canon**. Non-blocking for v1.0 ratification. Consul disposition pending; tracked as `todo-0032`.

### Cross-Cluster stress-test report (Nyx, Cluster B Censor)

Nyx's Cluster B stress-test at the ratifying convening confirmed: the Republic-wide baseline does not privilege Cluster A's library-altitude register over Cluster B's operational-altitude register. The conditional-reject condition (≥3 open questions remaining at ratification) did not fire — all eight questions are resolved, with two escalations carrying named follow-up TODOs.

---

## 11. Ratification path

This path describes how **future amendments to this document** (post-v1.0) are ratified. The v1.0 ratification itself ran the path in compressed form — the Design Committee convening under canon-cc-025 served as Province contribution + Consul synthesis in one session.

1. **Draft publication.** Codex publishes the amendment draft with rationale. Amendments are proposed by any Builder, any Censor, or the Consul. Drafts cite the specific sections touched and what evidence motivates the change.

2. **Province contribution window — 14 days.** Each Province's Builder (or a Sovereign-appointed proxy) reads the draft and submits a structured position naming affirmations, proposed amendments, escalations, and dissents. Positions are authored as interaction-artifacts under canon-cc-017. **Time-bound: 14 days from draft publication to close of contribution window.** Positions submitted after the window may be noted but do not block synthesis.

3. **Consul review — via canon-cc-018 escalated path.** Every Province contribution enters the canon-cc-018 lifecycle at `pending_review`. Consul reviews each contribution individually — action: noted / amended / linked / escalated / rejected — per cc-018's review block schema. This step ensures every Province position is adjudicated before synthesis rather than flattened by it.

4. **Consul synthesis — 7 days.** Consul produces v(n+1) draft integrating Province amendments, preserving dissent inline per canon-cc-024 §C, flagging irreconcilable conflicts to Sovereign. **Time-bound: 7 days from contribution window close to synthesis draft.**

5. **Sovereign ratification — canonical.** Sovereign reviews the v(n+1) draft under **canon-cc-012 per-block protocol** (Sovereign-direct per-section MCQ) or **canon-cc-014 Consul-accelerated path** (Consul working-ratifies blocks in synthesis; Sovereign canonical pass at close). Sovereign action: ratified / amended / reverted. Published as ratified v(n+1).

6. **Per-Province audit pass.** Every Province audits its codebase against the newly ratified rules; gaps become follow-up work logged as TODOs on the Province volume. Audit findings route to the Province's Governor (where seated per Edict I's 30K / 15K thresholds) or to the Province's Builder.

7. **Audit-synthesis step — Republic-wide.** After Province audits close, Consul synthesizes audit-results across Provinces. Patterns that repeat across three or more Provinces become Republic-wide follow-up canons (queued under canon-cc-023's extension protocol or under new canon slots). Patterns local to a single Province remain Province-local adjustments. This step captures cross-Province audit signal before it dissipates.

8. **Amendment protocol.** Post-ratification changes require a documented rationale, Consul review, and Sovereign authorization. Mirrors canon-cc-012's per-block discipline with canon-cc-014 acceleration where appropriate. The amendment path returns to step 1.

### v1.0 ratification record

- **Convening:** Lyra-convened Design Committee under canon-cc-025 rule-A, global-scope (8 seats, hard cap exactly filled).
- **Synthesis clerk:** Solara (SEP Invoicing Builder), dual-role chronicled per session-open exception.
- **Interaction-artifact:** `interaction-2026-04-19-001`.
- **Consul review:** escalated to Sovereign for canonical ratification (action: `escalated`).
- **Sovereign action:** ratified, 2026-04-19.
- **Dissents preserved:** Lyra (partial, §8 delete vs substantive-inline); Nyx (conditional-reject on ≥3 open questions, non-fired).
- **Commitments chronicled:** Solara + Theron for SEP design-principles docs (30-day time-bound); Ashara + Petra for Command Center Monument doc (Foundation milestone).
- **Escalations routed to Consul:** §10.1 SproutLab v3 migration (`todo-0031`); §10.8 print styles (`todo-0032`).

---

*v1.0 ratified 2026-04-19 by Sovereign-direct action following the Design Committee convening. This document is Republic law until next amendment.*
