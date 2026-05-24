# Scribe-Scout Survey — sep-dashboard

**Date:** 2026-05-24
**Province:** sep-dashboard (`/home/user/sep-dashboard`) — Cluster B, Censor: Nyx
**Builder:** Theron
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey of SEP Dashboard. The Province is in mid-transit between two
> strategic identities — v2.1 single-file PWA (live in production, with construction
> overlay) and a Phase 2.0 modular esbuild bundle that landed PR #12 on 2026-05-07 (Stage A
> only of an 8-stage data-capture-first reframe). The Codex volume entry was last
> meaningfully updated when SEP Dashboard was just "v2.0 stable" and is now several arcs
> stale. Most of the ingestion corpus lives in the new `docs/architecture/` directory and
> the long composite CLAUDE.md, not in the volumes.json record.

---

## 1. Identity & ownership

- **Builder:** Theron (cited as "Builder, sep-dashboard, War Time 2026-04-24" at `/home/user/sep-dashboard/docs/SESSION_8_READING.md:4`; companion-side cross-reference at `/home/user/Codex/data/companions.json:4245` and `:4256`).
- **Cluster:** B (Codex-side companions.json `:3029` and `:4239`; canonical per Codex CLAUDE.md cluster table).
- **Censor:** Nyx (companions.json `:3149` — "Censor, Cluster B … formal Censor authority active over SEP Invoicing and SEP Dashboard").
- **Current build state — drifted:** Codex volumes.json `:252` says `"v2.0 stable, restructuring data reconciliation in progress"`. Reality: Stage A of Phase 2.0 modular bundle has landed (PR #12, commit `82a7c48` on 2026-05-07), with v2.1 single-file overlay still on production. See §9 for the proposed restate.
- **Last meaningful commit:** `82a7c48` `feat(phase-2.0): Stage A — modular bundle, esbuild, Jest, layered src/ (#12)` (per `git log`). The two HEAD-tip "Add files via upload" commits (`109e40e`, `1ffb549`) are non-architectural file uploads of `bm-role.html`.
- **Stack:** vanilla JS + esbuild + Jest + Playwright; 7-layer module tree under `src/`; ES modules; pnpm 10.33.0; Node 22 per `.github/workflows/ci.yml`. Listed dev-deps at `/home/user/sep-dashboard/package.json:18-24`.
- **Deploy:** PWA via GitHub Pages at `https://rishabh1804.github.io/sep-dashboard/` (CLAUDE.md `:120`, `:182`; SESSION_7_HANDOFF.md `:14`). `repo` field in Codex volumes.json `:251` is `null` — drift; the GitHub Pages repo plainly exists.
- **CLAUDE.md:** `/home/user/sep-dashboard/CLAUDE.md` (692 lines, Aurelius-authored — *not* Theron-fronted, predates canon-pers-001's Builder-voice rule; falls under the legacy-draft / audit wave todo-0037).
- **README.md:** **none found** at repo root.

## 2. Active work

- **In-flight chapter (Codex volume):** `restructuring` — `status: "in-progress"`, started 2026-04-01, summary cites DIGITAL-001 v5, KB-006, KPI-001..007, salary confirmations. This is the *business-side* restructuring chapter, not the *app-side* Phase 2.0 work.
- **Active code-side chapter (not in Codex volumes.json):** Phase 2.0 — Stage A complete; Stages B–H pending. Source: `/home/user/sep-dashboard/CLAUDE.md:596-691` (Session 13 Stage A closeout) and `/home/user/sep-dashboard/SESSION_13_KICKOFF.md`.
- **TODOs (in Codex volumes.json for sep-dashboard):** exactly 1 — `todo-0034-sep-dashboard-design-principles` at `/home/user/Codex/data/volumes.json:285-292` (overdue: time-bound by 2026-05-19; today is 2026-05-24).
- **TODOs surfaced in CLAUDE.md / PROJECT_REFERENCE.md but not in Codex:** the "Still Pending" table at `/home/user/sep-dashboard/PROJECT_REFERENCE.md:291-299` (HIGH: month-lock enforcement on edit; MEDIUM × 4). Largely closed by PRs #7 (month-lock A1+A4), #8 (validation guards A2 inv-layer), #9 (validation guards A2 ops-layer), #10 (CSV export B2). Survivors as of now: editable past production days (C1) and bidirectional CW↔Production sync (C2). Categorization note: these are arguably already-closed and should not become new TODO ingestions.
- **Open architecture follow-ups (from Stage A closeout, `/home/user/sep-dashboard/CLAUDE.md:647-653`):** template-emitted onclick refactor (~70 sites); TypeScript adoption; layer-rule lint check; Stages B–H of Session 13 (~35h). These are Phase 2.0-internal and are candidates for new ingested TODOs.
- **In-source TODO/FIXME comments:** none found via `grep TODO src/` — clean.

## 3. Canon-like artifacts (rules, conventions, invariants)

Multiple competing rule-sets co-exist in this Province. Categorization is genuinely ambiguous; Scout lays them out.

- **"Build Rules" 1–10** at `/home/user/sep-dashboard/PROJECT_REFERENCE.md:201-219`. Rule #1 was Sovereign-amended 2026-04-24 via the Playwright-arming PR (cited inline at `:209-210`) — this gives it canon-like status. Rules 2–10 are stylistic/architectural invariants (no raw px; mobile-first; localStorage for state; never `text-overflow: ellipsis`; `sepRound()` for all currency; `localDateStr()` for all dates; never `toISOString()`; `ff-mono` for JS-rendered numerics).
- **Locked architectural decisions (Session 8 charter)** at `/home/user/sep-dashboard/CLAUDE.md:42-90`: single-file deployment (now superseded), token compliance, mobile-first, `sepRound()` for paisa, `localDateStr()`, 3-period production model, month-close lock, esbuild + ES Modules, Jest→Playwright migration, v2.1 storage key compatibility, CSS-into-4-files, **7-layer JS architecture with downward-only imports** (this last is canon-grade and load-bearing).
- **Architecture-file conventions** at `/home/user/sep-dashboard/docs/architecture/INDEX.md:73-93`: status-tag discipline, 9-section file template, cross-reference style, update cadence, *and the explicit rule "When code conflicts with an architecture file, the architecture file is authoritative."*
- **Session 11 Charter Resolutions** at `/home/user/sep-dashboard/CLAUDE.md:335-345`: STATE option C (singleton in Layer 2 via `getState/setState`); promote payroll calcs to Layer 1. Both ratified.
- **CSS token system and 7-principle design system** at `/home/user/sep-dashboard/PROJECT_REFERENCE.md:14-31` — domain-color palette, 5-tier card system, 9-step type scale, 3 typographic voices. Likely "design canon" but no formal DP doc on disk (see §7).
- **Sovereign-floor / WAR_TIME inheritance:** PR #3 commit message references "Build Rule #1 amendment" — confirmed canon-level provenance.
- Cross-references at `/home/user/sep-dashboard/CLAUDE.md:209-210` to the Sovereign amendment make at least one of these qualify as a *ratified* canon rather than just a doc-rule.

## 4. Schism-like artifacts (rejected approaches)

Rich corpus, mostly inside `docs/architecture/DECISION_LOG.md` and CLAUDE.md.

- **p5.js as primary viz library** — rejected in favor of Konva.js for the floor view (`/home/user/sep-dashboard/CLAUDE.md:273-286`). p5.js *retained* for analytics layer — so this is a partial schism.
- **Webpack** — implicitly rejected vs esbuild on rebuild-time grounds (`CLAUDE.md:44-48`).
- **Option A (storage carve-out) and Option B (full pubsub)** — rejected in favor of option C in `CLAUDE.md:341`.
- **Construction overlay migration** — rejected ("delete, do not migrate"; `CLAUDE.md:343`); now executed in Stage A.
- **WhatsApp URL-via-token transport** — superseded by QR-in-person in Phase 8 (`docs/architecture/DECISION_LOG.md:149`; `docs/architecture/HANDLER_PROVISIONING.md`).
- **Voice notes as primary form input** — rejected for alpha at `docs/architecture/HANDLER_FORMS.md:221` and `docs/architecture/EXCELLENT_DATA_CAPTURE.md:169`; preserved as a Phase 7 deliberate divergence-from-adversary at `docs/architecture/DECISION_LOG.md:124`.
- **Check-in/out top-bar one-tap chip** — rejected for form-based audit (`docs/architecture/DECISION_LOG.md:121`; deliberate divergence from adversary).
- **GitHub-backed JSON sync** and **stay single-device** — both considered, both rejected in favor of Firebase Firestore (`CLAUDE.md:294-301`).
- **Custom version-field OCC** — rejected for online edits in favor of Firestore transactions (`docs/architecture/DECISION_LOG.md:72`).
- **Adversary's "always-add as default" schema discipline** — overridden by Builder's "full 5-layer machinery as routine" (Phase 6 deliberate divergence; `DECISION_LOG.md:111-114`).
- **Original Session 12 floor-view-first MVP** — reframed to data-capture-first per Cowork Session 12+ (`docs/SESSION_HANDLER_ARCH.md:27-31`; `DECISION_LOG.md:25`).

The DECISION_LOG is essentially a structured schism-roll already. Ambiguity: many "rejected" items are local micro-decisions (anomaly thresholds, picker primitive variants) — Aurelius/Chronicler will need to decide what altitude qualifies for Schism ingestion.

## 5. Lore-like artifacts (Origins, Cautionary Tales, Doctrines, Chronicles)

- **Origins:** the existing `v1-v2-builds` chapter content at `/home/user/Codex/data/volumes.json:265` (the early-2024 single-file genesis, v1→v9 feature accumulation, the v1.4 constitutional rebuild, factory-floor design philosophy). This is already in-volume; not new.
- **Cautionary Tale candidate — Stage A file-corruption episode:** `/home/user/sep-dashboard/CLAUDE.md:136-154` documents three blocking issues from Session 10 (Edit tool on large file corruption, corrupted .git, PAT scope). Doctrinal payload: "Use Write for >5000-line files; Edit for targeted changes only." Direct sibling of Codex's known compiled-artifacts-in-tree Cautionary Tale.
- **Cautionary Tale already on record (cross-province):** the SEP Dashboard v2.1 baseline-bloat episode at `/home/user/Codex/data/volumes.json:1226` — "restored `index.html` from the 50,279-line bloat back to the 4,531-line v2.1 build." Listed in the Codex Temple-of-Mars volume but its lessons belong to sep-dashboard's lore too. Cross-volume reference.
- **Doctrine candidates:**
  - "Excellent data capture is the unit" (`/home/user/sep-dashboard/docs/SESSION_HANDLER_ARCH.md:27-33`; the seven-dimension measurable bar at `docs/architecture/EXCELLENT_DATA_CAPTURE.md`).
  - "Documentation as first-class architecture — files for principles, not buried in code" (`CLAUDE.md:539`).
  - "Adversarial pattern as new workflow convention" (`CLAUDE.md:553-557`): for every load-bearing decision phase, spin up adversarial reviewer with severity-tagged findings; 16 BLOCKER + ~50 HIGH/MEDIUM absorbed across Phases 4-8.
  - "Resilience principle — invoicing failure must not break dispatch and vice versa" (`docs/SESSION_12_DESIGN_LOCK.md:669-674`). Doctrinal; spans Provinces.
- **Chronicles:** the Session N closeout entries in CLAUDE.md (Sessions 8, 10, 11, 12, Cowork Session 12+, Session 13 Stage A). These are session-log shaped — could be ingested as Chronicles or as companion-logs (§8). Ambiguity flagged.
- **Cross-Province Lore reference:** SproutLab's `migration-m1-m2-m3` chapter at `/home/user/Codex/data/volumes.json:183` explicitly names SEP Dashboard ("SproutLab's monolith migration was painful enough that every subsequent project (SEP Dashboard, SEP Invoicing, Codex) started with split modules and build.sh from the first commit") — though sep-dashboard's actual history contradicts this; v1.4 was a single-file rebuild, not a split-modules-from-day-one start. Drift worth noting.

## 6. Apocrypha-like artifacts (foretold / forgotten / fulfilled)

Codex's apocrypha enum is `fulfilled | foretold | forgotten`. Mapping candidates:

- **Fulfilled prophecies:**
  - "May 10 launch target" (CLAUDE.md `:127`, `:178`, `:430`, `:539`) — *quietly forgotten* would be a more accurate tag; the date has passed without an alpha ship per the 2026-05-05 delta report. Ambiguous: is fulfillment "the launch shipped"? Or "the target as a deadline expired"? Both readings recorded.
  - "Phase 2 modularization completes" — partially fulfilled (Stage A landed; B–H pending).
  - "Construction overlay deleted" — fulfilled in Stage A (`CLAUDE.md:607,613`).
- **Foretold (banked for future):** `CLAUDE.md:464-472` and `:580-590` — camera placement & type, quality cert generation, letterhead/branding artwork, time-travel/replay, anomaly flagging, audit trail, worker-vs-supervisor view, PWA push notifications, initial inventory bootstrap, per-room interior layouts (Barrel Room, Pickling Area 4). All "for Phase 2.1+ or post-2.0."
- **Foretold from Session 12 §11:** mood/health rendering (schema-ready but gated), DFT-fail queue, productivity rollup. Cited at `docs/SESSION_12_DESIGN_LOCK.md:653` and `:824`.
- **Forgotten:** the `bm-role.html` file at repo root (10,958 bytes, uploaded in commits `1ffb549` / `109e40e`) is mentioned nowhere in CLAUDE.md or any session doc — orphan artifact. Possibly a "forgotten" Apocryphon candidate, or simple cruft. Ambiguity flagged.
- **`docs/floor-plan.png`** also exists as `/home/user/sep-dashboard/dist/` parent-sibling at repo root `floor-plan.png`? Session 12+ closeout at `CLAUDE.md:588` says "duplicate at repo root flagged for cleanup" — that duplicate is a known dangling artifact, possibly Apocrypha.

## 7. Specs / design-principles doc on disk

- **`docs/specs/` directory:** **does not exist** (`bfs: error: /home/user/sep-dashboard/docs/specs: No such file or directory`).
- **`docs/SESSION_12_DESIGN_LOCK.md`** (905 lines) — *de facto* design lock document for the Phase 2 floor view, but covers visual/interaction design, not the formal "Design Principles" framing.
- **`docs/architecture/`** (21 .md files, ~3,650 lines) — locked architecture decisions per phase. The `INDEX.md` routing surface + `DECISION_LOG.md` journal. This is closer to a spec corpus than a design-principles doc.
- **`docs/reference/SCHEMA.md`** (624 lines) — canonical entity reference.
- **No file matches `*DESIGN_PRINCIPLES*` or `*design-principles*`** anywhere under `/home/user/sep-dashboard`. The "7 design principles all scored 4.5/5" reference at `PROJECT_REFERENCE.md:16-31` is a *score table*, not a principles document.

**Confirmation request answered:** the briefing told Scout to confirm a real Design Principles doc exists here and that the Codex volume entry's `design_principles.status` is being promoted to `"draft"`. **Scout cannot confirm this — no such doc is present on disk.** The Codex entry's current `design_principles` block at `/home/user/Codex/data/volumes.json:306-311` reads:

```
"design_principles": {
  "status": "missing",
  "spec_path": null,
  "republic_principles_applied": true,
  "notes": "Per todo-0034 — Theron to draft SEP Dashboard design principles. Republic-wide HR-1..HR-12 apply in the interim. Priority task for next Theron session per canon-proc-002."
}
```

That `"missing"` matches reality. The todo-0034 deadline (2026-05-19) has lapsed; today is 2026-05-24. **Recommend: do NOT promote to `"draft"`** — instead, flag todo-0034 as overdue. Naming uncertainty: it is possible "reportedly exists" refers to a doc Aurelius/Theron drafted out-of-tree (in a private location, in a session not yet committed); in that case the recommendation would be to leave status as-is until the doc lands in `docs/specs/`. Either way, the on-disk reality is "no DP doc."

## 8. Companion-log-like artifacts (handoffs, session notes)

- `/home/user/sep-dashboard/SESSION_7_HANDOFF.md` — formal handoff document for Session 7 → Session 8.
- `/home/user/sep-dashboard/NEXT_SESSION_SPEC.md` — Session 8 options menu (Theron's `dash-2-1` reading deliverable at `/home/user/sep-dashboard/docs/SESSION_8_READING.md`).
- `/home/user/sep-dashboard/SESSION_13_KICKOFF.md` — executable handoff Cowork → Claude Code for Phase 2.0 (362 lines).
- `/home/user/sep-dashboard/SESSION_DELTA_2026-05-05.md` — scheduled-agent delta report (50 lines).
- `/home/user/sep-dashboard/docs/SESSION_HANDLER_ARCH.md` — synthesis bridge from Cowork architecture work to Claude Code implementation (418 lines).
- `/home/user/sep-dashboard/docs/SESSION_8_READING.md` — Theron's War-Time reading + 3-feature charter.
- `/home/user/sep-dashboard/docs/SESSION_12_DESIGN_LOCK.md` — Session 12 design lock (905 lines).
- The CLAUDE.md Session N entries (8, 10, 11, 12, 12+, 13 Stage A) are inlined session chronicles.

Ambiguity: these straddle the Chronicler "session chronicle" boundary and the companion-log "handoff" boundary. Scout's read is that SESSION_*_HANDOFF, SESSION_*_KICKOFF, SESSION_DELTA, and SESSION_HANDLER_ARCH belong with companion-logs (Theron→Theron and Aurelius→Theron handoffs); the SESSION_*_DESIGN_LOCK and CLAUDE.md inline entries belong with Chronicles.

## 9. Volume metadata for sep-dashboard — staleness & proposed updates

Cited from `/home/user/Codex/data/volumes.json:241-312`.

| Field | Current value | Reality on disk | Proposed update |
|---|---|---|---|
| `shelf` (`:243`) | `"paused"` | The shelf-history records a 2026-04-18 pause, but PRs #1–#12 landed 2026-04-21 → 2026-05-07 inclusive, with Stage A merging 2026-05-07. The Province is provably active. | Promote to `"active"`. Add `shelf_history` entry: `{shelf: "active", date: "2026-04-21", reason: "War Time 2026-04-24 reactivation under Theron + Sovereign Phase 2"}` (or similar). |
| `description` (`:244`) | "Single-file PWA … 7-principle design system, 21-worker roster, full wage calculation engine." | Worker count is **20** total per `CLAUDE.md:263-269` (12 part-time + 7 full-time + 1 guard). Single-file framing is mid-transition. | Update to acknowledge Phase 2.0 modular bundle + dashboard/handler dual-PWA topology; correct count to 20. |
| `current_phase` (`:252`) | "v2.0 stable, restructuring data reconciliation in progress" | v2.1 in production with construction overlay; Phase 2.0 Stage A landed; Stages B–H pending; Cowork Session 12+ architecture locked. | Restate as: "Phase 2.0 Stage A complete (modular esbuild bundle, 7-layer src/, Jest + Playwright). Stages B–H (Firebase + handler PWA + dashboard viewer + Cloud Functions + adoption) pending. v2.1 + construction overlay still on production. Data-capture-first reframe locked 2026-05-07." |
| `repo` (`:251`) | `null` | Repo demonstrably exists; GitHub Pages deploys to `rishabh1804.github.io/sep-dashboard/`. | Set to `"rishabh1804/sep-dashboard"`. |
| `chapters` (`:253-282`) | Two chapters: `v1-v2-builds` (complete), `restructuring` (in-progress, business-side). | Missing: the entire Phase 2 / Session 8 → 13 / Cowork Session 12+ arc. | Add chapters: `phase-2-charter` (Sessions 8–11), `floor-as-game-design-lock` (Session 12), `handler-arch-cowork-12-plus` (Cowork Session 12+), `phase-2-stage-a` (Session 13 Stage A merged). Each maps cleanly to existing in-tree session docs. |
| `todos` (`:283-293`) | One TODO (todo-0034 design principles, deadline 2026-05-19). | Deadline lapsed 5 days ago. Several PR follow-ups are open: template-emit onclick refactor (~70 sites), TS adoption, layer-rule lint, Stages B–H. | Mark todo-0034 overdue; consider new TODOs for the Stage A deferreds and Stages B–H. |
| `design_principles` (`:306-311`) | `status: "missing"` | Confirmed missing. (See §7.) | **Leave as missing.** Do not promote to draft. Add note that todo-0034 is overdue. |

## 10. Cross-volume references

- **SEP-dashboard ↔ SEP-invoicing shared-storage contract — found.** Lives in `/home/user/sep-dashboard/docs/SESSION_12_DESIGN_LOCK.md:655-676` (§6.1 "Sep-Invoicing Integration Contract") and is restated in:
  - `/home/user/sep-dashboard/CLAUDE.md:304-308` and `:511`
  - `/home/user/sep-dashboard/docs/architecture/HANDLER_FORMS.md:107`
  - `/home/user/sep-dashboard/docs/SESSION_HANDLER_ARCH.md:136`
  - `/home/user/sep-dashboard/SESSION_13_KICKOFF.md:203`
  - `/home/user/sep-dashboard/docs/reference/SCHEMA.md:41,77,341` (the `sep_invoicing_customer_id` FK on `Customer` and `invoice_id` FK on `Job` / `DispatchEvent`, plus the `invoice_status` enum: `pending-check | linked | missing-alert-sent | invoicing-down`).
  - The authoritative locked text is **`docs/SESSION_12_DESIGN_LOCK.md:655-676`**; everything else cites or restates it.
  - Resilience principles (locked): (1) invoicing failure must not break dispatch; (2) dashboard failure must not break invoicing; (3) no cross-app blocking writes; (4) audit log records every integration attempt.
  - Phase 2.0 ships `DispatchEvent` schema + manual link fields; Phase 2.1 ships automatic check-and-link.
- **Same-origin storage primitive** at `CLAUDE.md:306-308` (Session 11 closeout): "Same-origin means both apps can share storage primitives directly (localStorage, IndexedDB, BroadcastChannel) without a formal API. The 'link' is a shared data namespace, not a request/response integration." This was Session 11's framing; the Cowork Session 12+ refinement at `SESSION_12_DESIGN_LOCK.md:655-676` is the now-authoritative replacement.
- **SproutLab → SEP Dashboard genealogy** at `Codex/data/volumes.json:183` cites SEP Dashboard as having "started with split modules and build.sh from the first commit" — empirically wrong per `/home/user/sep-dashboard/PROJECT_REFERENCE.md:201-219` and `Codex/data/volumes.json:265` (v1.4 was a single-file rebuild). Worth correcting in SproutLab's chapter content during a wider lore-sweep.
- **Temple of Mars campaign** (`Codex/data/volumes.json:1291-1296`) lists SEP Dashboard as a War Time 2026-04-24 Province with Nyx + Sovereign as leads — cross-references Phase 2 reactivation timing.
- **No formal cross-volume contract** documented for SEP-dashboard ↔ Codex or SEP-dashboard ↔ SproutLab beyond conventional Cluster-B / Republic governance citation.

## 11. Data-integrity surprises (drift between Codex and reality)

Material drift, in declining severity:

1. **`shelf: "paused"`** but Province has shipped 12 PRs since the recorded 2026-04-18 pause. (Detail in §9.)
2. **`current_phase`** is two arcs stale (says "v2.0 stable"; actually Phase 2.0 Stage A merged + Cowork Session 12+ architecture locked).
3. **`chapters: []` is missing the entire Phase 2 arc** — Sessions 8 through 13 Stage A, plus Cowork Session 12+. Roughly 4–5 chapters absent.
4. **`repo: null`** when the repo exists and is the live PWA host.
5. **`design_principles.status: "missing"`** is *correct on disk*, but the briefing pretext (a real DP doc exists) is *incorrect* — confirming the missing status, not promoting it, is the integrity-preserving move.
6. **Worker count** off by one (volume description says 21; v2.1 reality is 20 per `CLAUDE.md:263-269` and `PROJECT_REFERENCE.md:129`; the 21st was Rounak, deactivated, per `PROJECT_REFERENCE.md:143`).
7. **`bm-role.html`** at repo root (10,958 bytes) is uncommented-on in any session log — orphan artifact, possibly Apocrypha-forgotten, possibly cruft.
8. **Cross-volume drift:** SproutLab's `migration-m1-m2-m3` chapter claims SEP Dashboard "started with split modules and build.sh from the first commit." Demonstrably false.
9. **`canon-pers-001` audit-wave applies here:** the SEP Dashboard CLAUDE.md is Aurelius-fronted ("Aurelius — Session 8+ Planning"), not Theron-fronted. Per `Codex/data/volumes.json:938-945` (todo-0037), it is on the Province-root-briefing audit wave. Pre-canon legacy artifact under canon-cc-015 legacy-draft-ratification precedent — not a violation, but flagged.

## 12. Counts — approximate ingestion volume

Numbers are best-effort. Scout names uncertainty: "candidates" rather than "definitives," because the boundary between Chronicle / companion-log / Doctrine / Apocrypha is judgement-laden.

| Entity type | Existing in Codex | New candidates from this Province | Notes |
|---|---:|---:|---|
| Chapters | 2 | **+4 to +5** | phase-2-charter, floor-as-game-design-lock, handler-arch-cowork-12-plus, phase-2-stage-a; optionally a session-7-pwa chapter to cover v2.1 ship |
| TODOs | 1 | **+3 to +6** | Stage A deferreds (template-emit onclick refactor, TS adoption, layer-rule lint); Stages B–H of Session 13; the 2 PROJECT_REFERENCE.md "Still Pending" survivors (C1, C2) if not already closed |
| Canons | (none specifically attributed) | **~10–12** | Build Rules #1–#10 (formal candidates); the 7-layer downward-import rule; STATE option-C decision; "architecture file is authoritative" rule; "Excellent data capture" north star; resilience principle (cross-Province) |
| Schisms | (none specifically attributed) | **~10–14** | p5.js (partial); Webpack; STATE options A & B; construction-overlay migration; WhatsApp token transport; voice-notes primary; check-in/out chip; GitHub JSON sync; single-device sync; custom OCC; floor-view-first MVP; adversary's "always-add as default"; ~3 deliberate divergences from adversary recommendations |
| Lore | (the 2 chapter `content` blobs effectively already-Origins) | **+5 to +8** | Stage A file-corruption Cautionary Tale; v2.1 baseline-bloat Cautionary Tale (already cross-cited in Codex volume); "Documentation as first-class architecture" Doctrine; "Adversarial pattern" Doctrine; "Excellent data capture is the unit" Doctrine; resilience-principle Doctrine; Phase 2.0 Stage A Chronicle; Cowork Session 12+ Chronicle |
| Apocrypha | (none) | **~8–10** | Foretold: camera placement, quality cert, letterhead, time-travel, anomaly flagging, audit trail, push notifications, per-room interior layouts. Fulfilled/forgotten: May-10 launch target; construction-overlay deletion (fulfilled). Orphan: `bm-role.html`, duplicate `floor-plan.png` at root |
| Specs | 0 in Codex | **0 confirmed on disk; ~1 owed (design-principles per todo-0034)** | The 21-file `docs/architecture/` corpus is candidate spec material; whether each file becomes a Codex spec or whether the corpus becomes one omnibus spec is Aurelius's call |
| Companion-logs | (count not surveyed in volumes.json snippet I read) | **~6 to 8** | SESSION_7_HANDOFF; NEXT_SESSION_SPEC (Session 8 menu); SESSION_8_READING (Theron War-Time charter); SESSION_13_KICKOFF; SESSION_DELTA 2026-05-05; SESSION_HANDLER_ARCH; possibly an Aurelius-Stage-A closeout log |
| Doctrine-ledger entries | (Codex-side concern) | **~4 candidate Province-native doctrines** | Per §5 — Excellent-data-capture; documentation-as-first-class-architecture; adversarial-pattern-as-convention; resilience-principle |

Rough ingestion total for sep-dashboard: **~50–65 entries** (chapters, TODOs, canons, schisms, lore, apocrypha, companion-logs, doctrines). Sits comfortably inside the campaign-wide ~400 budget.

---

## Open rulings for the Chronicler

1. **design_principles — DO NOT PROMOTE.** Scout explicitly counter-recommends the prior plan's promotion to "draft." No DP doc exists on disk. Confirm `status: "missing"` and flag todo-0034 as overdue (deadline 2026-05-19, today 2026-05-24).
2. **shelf promotion** — `paused` → `active`. The Province has shipped 12 PRs since the recorded pause. Mechanical fix.
3. **current_phase rewrite** — two arcs stale.
4. **chapters[] backfill** — entire Phase 2 arc absent (phase-2-charter, floor-as-game-design-lock, handler-arch-cowork-12-plus, phase-2-stage-a).
5. **repo field** — `null` → `"rishabh1804/sep-dashboard"`. Mechanical.
6. **Worker count drift** — description says 21, reality is 20. Mechanical.
7. **`bm-role.html` orphan** — apocrypha-forgotten, cruft, or accept? File uploaded with no context in CLAUDE.md or any session doc.
8. **canon-pers-001 audit wave (todo-0037)** — SEP Dashboard CLAUDE.md is Aurelius-fronted; should be Theron. Cross-Province root-briefing audit; sched separately.
9. **SproutLab cross-volume drift** — claims SEP Dashboard "started with split modules and build.sh from the first commit" — empirically false. Worth correcting during a wider lore-sweep.
10. **DECISION_LOG altitude** — which "rejected" items in `docs/architecture/DECISION_LOG.md` qualify as schism-altitude vs Province-local micro-decisions?
11. **`docs/architecture/` corpus** — 21 files, ~3,650 lines. Per-file specs[] entries or one omnibus spec?

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
