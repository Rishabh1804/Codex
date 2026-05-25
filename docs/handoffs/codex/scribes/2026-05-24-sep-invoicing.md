# Scribe-Scout Survey — sep-invoicing

**Date:** 2026-05-24
**Province:** sep-invoicing (`/home/user/sep-invoicing`) — Cluster B, Censor: Nyx
**Builder:** Solara, The Strategist
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey of the SEP Invoicing Province. The Province is fresh, working, and
> substantially under-chronicled — the campaign cadence (`inv-1-2` polish slate) has outrun
> the archive by ~5 weeks. Two pieces of standing uncertainty named at close: the
> shared-storage contract (not on disk in this Province) and the design-principles
> promotion (doc exists but predates Republic v1.0).

---

## 1. Identity & ownership

- **Builder:** Solara, The Strategist (CA-precision register, "every invoice is a financial instrument"). Province-resident, summons posture on-demand. `/home/user/sep-invoicing/CLAUDE.md:2`, `/home/user/sep-invoicing/CLAUDE.md:10`; `/home/user/Codex/data/companions.json:4240-4253`.
- **Cluster:** B. **Censor:** Nyx (formally ratified 2026-04-19, supersedes the legacy "Cipher across all repos" snapshot). `/home/user/Codex/data/companions.json:3027-3034`, `:3144-3149`. Note the **stale claim** in `/home/user/sep-invoicing/CLAUDE.md:12` and `/home/user/sep-invoicing/PERSONA_REGISTRY.md:191` which still names Cipher as the SEP Invoicing Censor — pre-Cluster B ratification text.
- **current_phase (Codex's record):** `"Phase 8D in progress — Desktop mode. Stats + History rework complete."` `/home/user/Codex/data/volumes.json:325`. **This is stale** — see §9.
- **last meaningful commit:** `5488e3e` — `inv-1-2 P9.1: bump SW cache version + sync Google Fonts URL` (2026-05-07), with a substantial rationale body about Canon 0034 / canon-gov-012 cache discipline.
- **Stack:** Single-file PWA. Source authored as 22 split-modules under `/home/user/sep-invoicing/split/` (build.sh concatenates → `sep-invoicing.html` → `index.html`). Vanilla JS (ES5-compatible `var`, named functions per AGENTS.md), no framework, no backend. Playwright e2e harness (`@playwright/test ^1.59.1`) armed 2026-04-24 — `/home/user/sep-invoicing/package.json`, `/home/user/sep-invoicing/playwright.config.ts`.
- **Deploy:** GitHub Pages at `rishabh1804.github.io/sep-invoicing/`. Per canon-sep-0001 + canon-0050 errata: structured-zip → `unzip -o` → `mv` (not cp) `sep-invoicing.html` → `index.html` → push. `/home/user/sep-invoicing/README.md:5`, `/home/user/sep-invoicing/CLAUDE.md:54-68`, `/home/user/Codex/data/canons.json:982`.

## 2. Active work

The repo has shipped 10 PRs since the volume's last journaled session (s-2026-04-15-sep-8e), all on a campaign-shaped track:

- **Charter:** `f29b35a inv-1-1` — "reconcile index.html drift + lock polish slate" — corresponds to campaign `invoicing-phase-1 / inv-1-1` in `/home/user/Codex/data/campaigns.json:277-281`.
- **In-flight chapter (uncodexed):** `inv-1-2` series — P1 through P9.1, leads Theron+Solara per `/home/user/Codex/data/campaigns.json:271-274`. Eight PRs delivered: invoice button rename, IM rate formatCurrency, Home/Stats empty-state CTAs, piece-mode NOS affordance, desktop UI triage, trend-chart compaction + IBM Plex Mono digits + TML cert corrections, trend granularity chips, SW cache version bump.
- **Earlier untracked:** `505a689 IL-4 Phase 1: default cost per KG plumbing` — corresponds to queued campaign `invoicing-phase-2 / inv-2-1 Margin Dashboard (IL-4)` in `/home/user/Codex/data/campaigns.json:291-318`.

**Open TODOs in the Codex volume entry** (`/home/user/Codex/data/volumes.json:412-449`, four entries):
- `todo-0010-sep-placeholder-icons` (open) — *appears genuinely open: icons exist on disk but are placeholder per chapter content*.
- `todo-0011-sep-design-principles` — marked `resolved`. **Real on disk** — `/home/user/sep-invoicing/docs/SEP_INVOICING_DESIGN_PRINCIPLES.md` (436 lines).
- `todo-0012-items-master-build` — marked `open`. **Reality: shipped** — `cfe2866 Phase 6` + `docs/SEP_ITEMS_MASTER_SPEC.md` marked "Built — Phase 6 integrated into split architecture" (line 4).
- `todo-0033-sep-invoicing-design-principles` — `open`, demands a Republic-aligned v0.1 by 2026-05-19 deadline. Today is 2026-05-24 — **deadline missed**. The on-disk design-principles doc *predates* Republic v1.0 (dated 2026-04-13, v1.0) and was not authored against the Republic obligation; ambiguity flagged in §7.

**Source-side TODO/FIXME markers in /split/ and /docs/:** none found.

## 3. Canon-like artifacts (rules, conventions, invariants)

Concentrated in `/home/user/sep-invoicing/docs/SEP_INVOICING_DESIGN_PRINCIPLES.md` and reflected in CLAUDE.md / AGENTS.md.

- **HR-1 through HR-8** — the 8 Hard Rules, source of truth at DP §1, lines 11-38. Restated in CLAUDE.md:70-83.
  - HR-1 no inline styles; HR-2 no inline onclick (data-action only); HR-3 `inv-` prefix on every class (263+ classes); HR-4 no emojis; HR-5 escHtml() on all user-data innerHTML; HR-6 design tokens only (no raw px/rem/hex); HR-7 dark mode coverage; HR-8 `gstRound()` for all currency (`Math.round(val * 100) / 100`).
  - **Known HR-6 exceptions** explicitly enumerated (CLAUDE.md:84; DP §1 lines 29-33): 44px touch targets, 20px SVG icons, print raw colors. Phase 8B added two more HR exceptions logged inline in journal decisions (`/home/user/Codex/data/journal.json:1770`, `:1796`): drag-handle `style.width` HR-1 waiver; 7-column desktop table widths HR-6 waiver.
- **Architectural invariants:**
  - **Billing Spine vs Logistics Spine** — IM is billing, GC is logistics; parallel not sequential. Critical concept per CLAUDE.md:97-98; Memory.md:57. Promoted to Memory.md "Architectural Decisions Log."
  - **localStorage-only** persistence at key `sep_invoicing_state`; no backend, no GitHub JSON sync (deliberate). DP §6, line 191; codified as Canon-equivalent in Codex via rej-0008.
  - **9-step switchTab protocol** ("DP v0.2") — DP §2, line 61.
  - **9-domain color system** with light/dark variants — DP §4, lines 138-153.
  - **3 billing modes** (weight / piece passthrough / nos_to_weight) — DP §5, lines 163-171.
  - **z-index hierarchy** (10 named layers, base→print overlay 510) — DP §7, lines 219-232.
  - **Invoice lifecycle states** (`created → dispatched → delivered → filed`; orthogonal `status: cancelled`) — DP §8, lines 238-248.
  - **Concat order is a Road** — dependency graph in `/home/user/sep-invoicing/docs/ARCHITECTURE.md:44-55`, CLAUDE.md:51.
- **Cross-tool agent canons** (AGENTS.md:19-28): split-file architecture inviolable; no inline styles/handlers; escHtml at boundaries; **SWs never cache HTML** (= Republic Canon 0034); timezone-safe dates (`new Date(y, m-1, d)`); `git --no-pager`; spec-before-build (8-pass); QA-until-cosmetic.
- **Codex-side canons scoped to sep-invoicing:**
  - `canon-sep-0001-deploy-workflow` — `/home/user/Codex/data/canons.json:582-594`.
  - `canon-0035-pull-before-unzip` — `/home/user/Codex/data/canons.json:823-836`.
  - `canon-0050-sep-0001-mv-errata` — `/home/user/Codex/data/canons.json:976-991`.
  - Implicit: Canon 0034 SW-no-HTML-cache is actively enforced in `/home/user/sep-invoicing/sw.js:2-4`.

## 4. Schism-like artifacts (rejected approaches)

All currently held in Codex `canons.json`. Categorization: each is a clear sep-invoicing-scoped rejection.

- `rej-0008-github-data-sync` — GitHub JSON sync rejected for localStorage-only. Linked to canon-0033-gitignore-data-protection. `/home/user/Codex/data/canons.json:1968-1979`.
- `rej-0009-items-8th-tab` — 8th tab rejected for Clients sub-view toggle. `:1980-1991`.
- `rej-sep-0001-responsive-css-only` — responsive CSS-only rejected for separate desktop render functions. `:2064-2075`.
- `rej-sep-0002-matchmedia-detection` — matchMedia rejected for debounced ResizeObserver. `:2076-2087`.
- `rej-0001-responsive-css-only` (Phase 8A duplicate-ish entry of the above). `:2088-2099`.
- `rej-0002-auto-select-first-row` — empty state chosen over auto-select in detail panel. `:2100-2111`.
- `rej-0003-row-level-action` — row-level data-action rejected for cell-level. `:2112-2123`.
- `rej-0004-detail-as-edit-form` — inline edit rejected for read-only detail + overlay-edit. `:2124-2135`.
- `rej-0005-toggle-inside-master` — toggle-in-master rejected for toggle-above-wrapper. `:2136-2147`.

No on-disk repo file enumerates these; they live only in the Codex archive.

## 5. Lore-like artifacts (Origins · Cautionary Tales · Doctrines · Chronicles · Edicts)

The repo itself carries lore-shaped content in prose, not yet ingested as Codex lore entries:

- **Origins / Chronicles in volume chapter content** (`/home/user/Codex/data/volumes.json:338, 352, 366, 392, 406`) — the "Why a Separate App" passage (origin), the "21 Bugs Three Rounds" chronicle, the "Billing Spine" origin paragraph, Phase 7/8 narratives. These are already inside the volume but not promoted to `lore[]`.
- **Cautionary Tale candidates on disk:**
  - The Phase 6→9 cache-stale chain documented in the body of commit `5488e3e` (the verbatim Cipher/process note: "bumping CACHE_NAME on every asset-affecting commit is the canonical PWA discipline. P6→P9 should each have included a CACHE_NAME bump") is a textbook Cautionary Tale awaiting promotion. **Categorization uncertainty:** could equally seat as a Doctrine (the rule to bump on every asset change) or remain a Tale (the lapse that taught it). Recommend Tale + a linked Doctrine canon.
  - The `cert-issues.json` shop-data convention in `/home/user/sep-invoicing/docs/test-certificates/cert-issues.json` + commit `fe72232`'s SSSMehta certs is a small Origin for the cert-generation surface.
- **Doctrine candidates:**
  - "Billing Spine vs Logistics Spine" (CLAUDE.md:97-98, Memory.md:57) — formally cross-cutting; appears in `Memory.md` table but no Codex `lore[]` or `canon[]` entry of family `philo` or `design`.
  - The "spec-before-build" / "QA until cosmetic" pair (AGENTS.md:26-27) — already implicit in SproutLab-originated Doctrines; sep-invoicing's contribution is the first commercial-app application (per volume narrative line 338).
- **Existing Codex apocrypha citing sep-invoicing:** `apo-gov-001-the-naming` mentions Solara's seating; `apo-gov-003-why-30k` uses sep-invoicing LOC as the comparator anecdote. `/home/user/Codex/data/canons.json:2617-2654`. These already exist; not new ingestion candidates.
- **Lore already authored in /home/user/Codex covering this Province but never seeded:** the *third-paragraph-of-lore-001 anecdote* (`/home/user/Codex/data/canons.json:2583` — "the first commit to the wrong repo — sep-invoicing, because the directory didn't exist yet — was caught and corrected") is a Chronicle fragment that names sep-invoicing as the site of an Origin-grade mistake.

## 6. Apocrypha-like artifacts (foretold / forgotten / fulfilled)

- **Foretold (planned but unbuilt):**
  - **Gate Challan module** — "architected but not built" per Memory.md:42. Origin of the Billing-vs-Logistics Spine separation. Strong Apocrypha candidate.
  - **Client-scoped items** — explicitly listed as "future phase" in Items Master spec §1, line 13, and §7 prefs notes; HANDOFF_PHASE6.md:32 line "What Was NOT Built."
  - **Margin Dashboard IL-4** — Phase 1 plumbing landed (`505a689`); full dashboard queued as `invoicing-phase-2` in `/home/user/Codex/data/campaigns.json:291-318`.
  - **Branded PWA icons** replacing the placeholders — todo-0010, still open since 2026-04-13.
- **Fulfilled:**
  - **Items Master Phase 6** — fulfilled but mismarked open (todo-0012). The shipping receipt is `cfe2866` + `docs/SEP_ITEMS_MASTER_SPEC.md` v1.1 status="Built".
  - **Items Master 8-pass spec process** — first commercial-app application of the 8-pass per the volume narrative; fulfilled as a methodology Apocrypha.
  - **Phase 7 Stats/History rework, Phase 8A–8E desktop mode** — all fulfilled per journal sessions s-2026-04-14-sep-8a through s-2026-04-15-sep-8e.
- **Forgotten / superseded:** no clear "forgotten" entries surface; the repo's chapter list is conservative and tracks what was built.

## 7. Specs / design docs

On-disk artifacts in `/home/user/sep-invoicing/docs/`:

- `ARCHITECTURE.md` — split-architecture module map (66 lines).
- `SEP_INVOICING_DESIGN_PRINCIPLES.md` — **the design-principles document. Real, on disk, 436 lines, v1.0 dated 2026-04-13.** 20 sections covering hard rules, architecture, design tokens, domain colors, business logic, data model, z-index, lifecycle states, all the way to session conventions.
- `SEP_ITEMS_MASTER_SPEC.md` — 196 lines, v1.1, status="Built". 9 sections incl. 8-pass review table.
- `HANDOFF_PHASE6.md` — 107 lines, Phase 6 handoff doc.
- `test-certificates/` — `generate.py` (cert generator), `cert-shop-data.json`, `cert-issues.json`, and 4 generated cert HTML+PDF pairs for SSSMehta 2026-04-15.

**Design-principles confirmation (the explicit ask of this survey):**

The Codex volume entry currently reads `"design_principles": { "status": "missing", "spec_path": null, "republic_principles_applied": true, "notes": "Per todo-0033 — Solara to draft..." }` at `/home/user/Codex/data/volumes.json:457-462`. The instruction was to *promote to "draft"* because a real DP doc exists.

**Confirmed: a DP doc exists on disk** at `/home/user/sep-invoicing/docs/SEP_INVOICING_DESIGN_PRINCIPLES.md` (436 lines). However — and Scout names this uncertainty before stating the position — the on-disk doc was authored 2026-04-13 (predating the Republic Design Principles v1.0 ratified 2026-04-19), and todo-0033's text (`/home/user/Codex/data/volumes.json:442`) demands a *Republic-aligned v0.1 importing Republic by reference* by 2026-05-19. The on-disk DP does not import Republic by reference and does not document the Republic obligations enumerated in todo-0033 (HR-11 currency surface, small-modifier button cases, etc.).

**Position:** the promotion to `"draft"` is justified — there is a substantive DP document — but the Codex `notes` field should also record that this doc predates the Republic obligation and that todo-0033's Republic-import deliverable remains unmet (deadline 2026-05-19 has passed; today is 2026-05-24). `spec_path` should become `"docs/SEP_INVOICING_DESIGN_PRINCIPLES.md"`.

**Specs missing from disk that the volume implies should exist:**

- `docs/PHASE8_DESKTOP_SPEC.md` — referenced in `/home/user/Codex/data/volumes.json:405` as `spec_url` for the Phase 8 chapter, but the file is not present in `/home/user/sep-invoicing/docs/`. Data-integrity drift.

## 8. Companion-log-like artifacts (handoffs, session notes)

- **On-disk handoff:** `/home/user/sep-invoicing/docs/HANDOFF_PHASE6.md` (107 lines, "What Was Built / What Was NOT Built / Deploy Steps / QA Checklist / Codex Snippet").
- **Memory carrier:** `/home/user/sep-invoicing/Memory.md` (82 lines) is a portfolio-wide overseer's memory, not Solara-specific; lists SEP Invoicing's status at section line 38-43.
- **Persona registry:** `/home/user/sep-invoicing/PERSONA_REGISTRY.md` (256 lines) — full Order roster, governance hierarchy, Cipher's per-repo lens table, synergy pairs, reassignment process. Substantial doctrine-shaped content not yet in Codex `lore[]` other than fragments.
- **AGENTS.md:** cross-tool instructions, ~80 lines.
- **No `docs/companion-logs/sep-invoicing/` directory** — canon-0053 Province-log compliance is unmet for sep-invoicing. Codex has logs only for codex/, sproutlab/, command-center/ (per `/home/user/Codex/data/companion-logs.json` cross-province enumeration `:317`). Cluster B's Province logs are unborn — a known gap (`/home/user/Codex/data/journal.json:52` records the Cluster A-only deploy of the Scribe Worker Tier and explicitly owes "replication of the tier to Cluster B (sep-invoicing, sep-dashboard)").
- **No `.claude/agents/` directory** in `/home/user/sep-invoicing/` — no subagent specs deployed. canon-cc-026 Province-mirror wave (todo-0045) still owes sep-invoicing four mirrors (consul + chronicler subagent + chronicler skill + scribe tier).
- **PR commit bodies as session notes:** the long-form commit body on `5488e3e` (the SW cache fix) reads as a session note + Cipher process note. Worth promoting to a companion-log entry once the Province-log structure lands.

## 9. Volume metadata for sep-invoicing — staleness assessment

Current entry at `/home/user/Codex/data/volumes.json:313-462`.

| Field | Stored value | Reality | Verdict |
|---|---|---|---|
| `shelf` | `"active"` | Yes — 10 PRs since 2026-04-24 + IL-4 plumbing | **fresh** |
| `current_phase` | `"Phase 8D in progress — Desktop mode. Stats + History rework complete."` (line 325) | Phase 8E shipped (`8e29abe`), governance docs landed (`b960949`), IL-4 Phase 1 plumbing landed (`505a689`), and the entire `inv-1-2` PR slate P1→P9.1 shipped under WAR_TIME campaign `invoicing-phase-1` | **STALE** |
| `chapters[]` last entry | `phase-8-desktop` status `in-progress` (line 400) | Phase 8D *and* 8E shipped; campaign `inv-1-2` PR series is an uncodexed chapter; IL-4 Phase 1 is an uncodexed chapter | **STALE** |
| `todos[]` | 4 entries; todo-0011 resolved, todo-0010/0012/0033 open | todo-0012 should be resolved (Items Master built); todo-0033 deadline (2026-05-19) has passed; todo-0010 likely still genuinely open | **STALE — three updates needed** |
| `design_principles.status` | `"missing"` | DP doc exists on disk, 436 lines | **STALE — promote to `"draft"`** (see §7) |
| `design_principles.spec_path` | `null` | should be `"docs/SEP_INVOICING_DESIGN_PRINCIPLES.md"` | **STALE** |
| `shelf_history[]` | one entry, 2026-04-01 | accurate (Province has never left active shelf) | fresh |
| `repo` | `null` | should be `"Rishabh1804/sep-invoicing"` (cf. Codex's own `:475` `"Rishabh1804/Codex"`) | **STALE — minor** |

**Proposed updates (preview, not authored):**
- Promote `current_phase` to something like: `"Phase 8 complete (8A-8E shipped). WAR-TIME inv-1-2 polish slate P1-P9.1 merged. Next: Margin Dashboard IL-4 Phase 2."`
- Resolve todo-0012 with reference to commit `cfe2866` + `docs/SEP_ITEMS_MASTER_SPEC.md` v1.1.
- Flip `design_principles.status` → `"draft"`, set `spec_path`, and amend `notes` to record the Republic-alignment gap rather than absence-of-doc.
- Add new chapters for `phase-8e` (complete), `governance-docs-landing` (complete), `inv-1-2-polish-slate` (complete), `il-4-margin-dashboard` (in-progress).
- Set `repo: "Rishabh1804/sep-invoicing"`.

## 10. Cross-volume references — particularly the SEP-invoicing ↔ SEP-dashboard shared-storage contract

**Cluster B membership is solid:**
- `/home/user/Codex/data/canons.json:1249` (canon-cc-016 residency table): Solara → sep-invoicing, Theron → sep-dashboard, both Cluster B, Nyx as CC-resident Censor.
- `/home/user/Codex/data/companions.json:4245` notes the **operational split**: "Solara owns the commercial surface of the same company, Theron owns the operational surface. Two Builders, one company, two repos."
- `/home/user/Codex/data/companions.json:4710-4719`: Theron's profile reinforces — "sep-invoicing: Adjacent, not his. Solara owns this. He consults when operational cost changes (chemistry, throughput) need to flow into rate-card re-pricing."
- WAR-TIME campaign `war-time-2026-04-24` runs paired phases: `dashboard-phase-1/2/3` + `invoicing-phase-1/2`, with leads `theron, solara` on the invoicing phases (`/home/user/Codex/data/campaigns.json:271-318`).

**Shared-storage contract — uncertainty named first:** the brief calls this "known cross-cutting." Scout searched the sep-invoicing repo for any localStorage-key sharing, cross-export contract, schema-import, or named cross-Province contract. **No such contract surfaces on disk in sep-invoicing.** The only localStorage keys are sep-invoicing-private: `sep_invoicing_state`, `sep_inv_view_prefs`, `sep_inv_gemini_key` (DP §6, lines 191-216). No `sep_dashboard_state` reference, no shared-key prefix, no JSON-export contract spec, no "data flowing to Theron" code path. `/home/user/sep-invoicing/docs/SEP_INVOICING_DESIGN_PRINCIPLES.md:48,191`; `/home/user/sep-invoicing/split/state.js:2`; grep across `/home/user/sep-invoicing/` for `sep-dashboard|shared.storage|sep[-_].*shared` returned only governance-doc mentions of the *companion split*, not a data contract.

**The closest thing to a contract is verbal:** the Theron profile note quoted above (`/home/user/Codex/data/companions.json:4719`) and Solara's profile field (`/home/user/Codex/data/companions.json:4253`) describe a *consultation pattern* — operational cost data from the Dashboard should *flow back* into invoicing's rate cards when chemistry/throughput shifts. **This is policy, not a data contract.** No file, no schema, no canon enforces it.

**Position:** if a shared-storage contract is presumed to exist by the campaign brief, it is **either not yet drafted, or it lives only in sep-dashboard** (out of scope for this survey — cross-validate against the sep-dashboard Scout's findings, which DO surface a contract at `docs/SESSION_12_DESIGN_LOCK.md:655-676`). If the contract is yet to be authored *from the invoicing side*, the gap itself is a candidate Apocrypha (Foretold) or a TODO.

**Other cross-volume references found:**
- canon-pers-001 four-rung signing chain explicitly enumerates sep-invoicing as a Province requiring its own Province-persona briefing (`/home/user/Codex/data/canons.json:2179`).
- canon-cc-025 Design Committee formula seats Solara + Nyx for SEP Invoicing Province-scope convenings (`/home/user/Codex/data/canons.json:1493`).
- canon-cc-016 residency enumerates `sep-invoicing` as a residence enum value (`/home/user/Codex/data/canons.json:1249`).
- WAR-TIME campaign cross-references in `/home/user/Codex/data/campaigns.json:11-15`.
- todo-0045 Province-mirror wave names sep-invoicing as owing byte-identical mirrors of the three institutional specs (`/home/user/Codex/data/journal.json:865`).

## 11. Data-integrity surprises (Codex archive vs reality)

Compiled in one place; each cited:

1. **`current_phase` drift** — stored at Phase 8D in-progress; reality is post-Phase 8E + 10 polish PRs + IL-4 Phase 1. `/home/user/Codex/data/volumes.json:325`.
2. **`design_principles.status: "missing"` is wrong** — the doc is on disk at 436 lines. `/home/user/Codex/data/volumes.json:458` vs `/home/user/sep-invoicing/docs/SEP_INVOICING_DESIGN_PRINCIPLES.md`.
3. **todo-0012-items-master-build** marked open; reality: built and shipped in `cfe2866` + spec v1.1 marked Built. `/home/user/Codex/data/volumes.json:431-439`.
4. **Phase 8 spec_url broken** — `"docs/PHASE8_DESKTOP_SPEC.md"` referenced but no such file in `/home/user/sep-invoicing/docs/`. `/home/user/Codex/data/volumes.json:405`.
5. **Censor name drift** — `/home/user/sep-invoicing/CLAUDE.md:12` and `/home/user/sep-invoicing/PERSONA_REGISTRY.md:171-194` name Cipher as the SEP Invoicing Censor; ratified reality is Nyx as Cluster B Censor (2026-04-19). `/home/user/Codex/data/companions.json:3149`.
6. **Persona-binding suite under canon-pers-001 unbuilt for sep-invoicing** — no `.claude/agents/` directory exists in the Province; the byte-identical mirror obligation (todo-0045) remains unsatisfied.
7. **No Cluster B companion logs** — canon-0053 v1 logs exist for codex/, sproutlab/, command-center/ only. sep-invoicing has none. Acknowledged owed (`/home/user/Codex/data/journal.json:52`).
8. **Phase chapter ordering drift** — chapters in volume use `order: 1..4, 8, 8` (skipping 5-7, with phase-7 and phase-8 both at `order: 8`). `/home/user/Codex/data/volumes.json:339, 353, 367, 379, 393, 406`. Three intermediate phases (Phase 3/4/5, Phase 6, Phase 6b) shipped on disk per git log (`a10db2b`, `cfe2866`, `1bba7ba`) but never got chapter entries.
9. **No `repo` field** on the volume despite a known GitHub URL. `/home/user/Codex/data/volumes.json:324`.
10. **canon-sep-0001 deploy workflow rationale still says `cp` despite canon-0050 amendment instruction** — canon-0050 explicitly orders the amendment but canon-sep-0001's rationale text (`/home/user/Codex/data/canons.json:587`) was never updated. The amendment canon ratified the change but no editor applied it.
11. **Codex Memory.md is outdated** for the SEP section: claims "Phase 8D complete" + "Gate Challan architected but not built" + "SEP constitutional restructuring (effective 1 Apr 2026) largely complete." Phase 8E shipped and Gate Challan status is unchanged but the cadence has moved on. `/home/user/sep-invoicing/Memory.md:40-43`.

## 12. Counts — approximate per entity type to ingest

These are **scribe estimates**, not authored entries.

| Entity type | Count | Notes |
|---|---|---|
| **Chapters** (new) | 4 | phase-6b (shipped), phase-8e (shipped), inv-1-2-polish-slate (shipped, 10 PRs), il-4-margin-dashboard (in-progress) |
| **Chapter updates** | 2-3 | phase-8-desktop → complete; spec_url corrected or nulled; phase-6/items-master content tightened with shipping refs |
| **TODOs** | 2 close, 0 new (urgent) | Resolve todo-0012; resolve todo-0011 (already marked resolved but `chapter: "github-deploy"` may be miscategorized); todo-0033 status to address (overdue) |
| **Canons** | 2-3 candidates | Doctrine "bump SW CACHE_NAME on every asset-affecting commit" (from `5488e3e` body); possible canon for "Playwright e2e arming" pattern; possible canon for "test-certificates pipeline" |
| **Schisms** | 0-1 | All Phase 8 schisms already captured. Possible new schism around IBM Plex Mono digit-only vs full-body adoption (P8) if a rejected alternative was named in PR review |
| **Lore** | 4-6 | (1) Cautionary Tale — SW cache-stale chain P6→P9.1; (2) Doctrine — Billing-vs-Logistics Spine (promote from Memory.md); (3) Chronicle — Phase 8 desktop-mode 5-sub-phase arc; (4) Chronicle — WAR-TIME `inv-1-2` polish-slate close; (5) Origin — Items Master as first commercial 8-pass; (6) Origin — test-certificate generator subsystem |
| **Apocrypha** | 3 | Foretold: Gate Challan module; Foretold: client-scoped items; Foretold: Margin Dashboard IL-4 full delivery. Possibly: Fulfilled — Items Master |
| **Specs** | 2-3 | `docs/SEP_INVOICING_DESIGN_PRINCIPLES.md` (design-spec); `docs/SEP_ITEMS_MASTER_SPEC.md` (impl-spec, status implemented); `docs/HANDOFF_PHASE6.md` (handoff) |
| **Companion-logs** | 0 today | Canonical path `docs/companion-logs/sep-invoicing/` does not exist; first log to be authored under canon-0053. Will eventually carry one entry per Solara session. |
| **Doctrine-ledger entries** | 1-2 | "bump CACHE_NAME on every asset-affecting commit" (high confidence from `5488e3e`); "structured-zip + unzip -o + mv" already canonized but worth ledger-cite |
| **Volume metadata updates** | 1 | Single edit to the volume entry covering current_phase, design_principles, repo, todos, chapters |
| **Companion-profile updates** | 1 | Solara `current_state` field can be updated to reflect WAR-TIME involvement and the IL-4 work; Cluster B Censor reconciliation (Cipher→Nyx) in `/home/user/sep-invoicing/CLAUDE.md` and `PERSONA_REGISTRY.md` is repo-side, not Codex-side |

**Rough total ingestion surface for sep-invoicing: ~20-25 entries** across all categories, plus one volume-metadata refresh.

---

## Open rulings for the Chronicler

1. **design_principles promotion** — promote to `"draft"` with the gap-note: the on-disk doc predates Republic v1.0 (authored 2026-04-13 vs Republic ratified 2026-04-19) and does not import Republic by reference. todo-0033 deadline (2026-05-19) overdue. Promote-and-note, not promote-and-forget.
2. **Shared-storage contract** — confirmed living only in sep-dashboard (`docs/SESSION_12_DESIGN_LOCK.md:655-676` per the sep-dashboard Scout). Decision: cross-link from sep-invoicing volume, draft a complementary invoicing-side spec, or accept asymmetric ownership?
3. **Censor name drift** in repo-side files (CLAUDE.md, PERSONA_REGISTRY.md) — sub-Tier-2 cleanup. Sched to Tier 4 ingestion PR.
4. **canon-pers-001 persona-binding suite for sep-invoicing** — `.claude/agents/` directory missing. todo-0045 Province-mirror wave. Sched to a later tier.
5. **Cluster B companion-logs** — directory `docs/companion-logs/sep-invoicing/` missing. canon-0053 unmet. Sched separately from this campaign or absorbed?
6. **Phase chapter ordering drift** (order 1..4, 8, 8 — skipping 5-7) — fix during volume-metadata refresh or accept the historical ordering?
7. **canon-sep-0001 rationale text update** (canon-0050 errata ratified but never applied to rationale) — mechanical fix during Tier 1 (data integrity) PR.
8. **Cautionary Tale vs Doctrine** for the SW cache-stale chain — Scout recommends Tale + linked Doctrine canon. Confirm.

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
