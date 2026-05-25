# Scribe-Scout Survey — SproutLab

**Date:** 2026-05-24
**Province:** SproutLab (`/home/user/sproutlab`) — Cluster A, Builder: Lyra, Censor: Cipher
**Governors:** Maren (Care, 23,491 LOC) + Kael (Intelligence, ~29,829 LOC)
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey of the densest doctrine-producing Province in the Republic.
> SproutLab does not carry a `docs/doctrine-ledger.md` of its own (only Codex does);
> SproutLab's doctrine record is distributed across the Phase 4 charter and close-artifacts,
> with cross-cluster doctrines landing in Codex's ledger via Aurelius invocation. The HR
> drift question is named and characterized at §11 — Scout's position: this is not drift
> but the intended promotion path.

---

## 1. Identity & ownership

- **Builder:** Lyra (The Weaver) — `/home/user/sproutlab/CLAUDE.md:2`, `:8-11`; persona registry at `/home/user/sproutlab/PERSONA_REGISTRY.md:81-94`.
- **Cluster:** A (with Codex). Cipher is the Cluster A Censor, mirrored into the Province at `/home/user/sproutlab/.claude/agents/cipher.md` per canon-cc-026 — `/home/user/sproutlab/CLAUDE.md:23-32`.
- **Governors (jurisdictional, 30K Rule):** Maren (Care: home + diet + medical, 23,491 LOC) and Kael (Intelligence: 7-file intelligence-* set + core + data + sync + config + start, ~29,829 LOC at last refresh) — `/home/user/sproutlab/CLAUDE.md:12-19`, `/home/user/sproutlab/PERSONA_REGISTRY.md:112-165`.
- **Current phase:** Phase 4 (Hardening + Foundation) — six sub-phases: Polish → Stability → Tally → Reward → Launcher → Spark (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CHARTER.md:6`). Polish sub-phase actual-final-close is at PR-39 merge per the third declared close (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:133-143`). **Stability sub-phase has not formally opened** as of 2026-05-22; the latest handoff (`/home/user/sproutlab/docs/SESSION_HANDOFF.md:1-58`) chronicles 8 post-Polish PRs (#88–#95) and PR-N (food-chemistry DB + educational tips) as on-hold, suggesting an interim "post-Polish hardening" cadence rather than a charter'd Stability open.
- **Last meaningful commit:** `5a3fb22 2026-05-22 Track→Sleep: collapsed Night/Nap log card` (head of main). The "Scribe Worker Tier" deploy itself landed `5a44f1d 2026-05-22 Deploy the Scribe Worker Tier subagents (canon-proc-006) (#97)`.
- **Stack / deploy:** Split-file HTML PWA, 17 modules, ~65,725 LOC composed (`/home/user/sproutlab/CLAUDE.md:50-82`). localStorage + Firestore sync, no backend. `package.json` is dev-only (Playwright 1.48.2 + pnpm@10.33.0; `/home/user/sproutlab/package.json:5-16`). Build via `split/build.sh` to `sproutlab.html` then mirror to `index.html`. Deployed to `https://rishabh1804.github.io/SproutLab/`. Per `/home/user/sproutlab/README.md:1-3`, the public README is one-line — CLAUDE.md is the load-bearing brief.

---

## 2. Active work

- **Polish sub-phase status:** *Functionally* closed (third declared close, post-PR-39). Original PR-32 close (Polish-8) was superseded by Polish-10 reopen (PR-37); PR-37 close was superseded by Polish-10d hotfix (PR-38). Per `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:135-141`, *"actual final close at PR-39 merge."*
- **In-flight (the last week of 2026-05-21/22):** A burst of PRs not in the Polish/Stability charter taxonomy — PR-J (trend-pill SVG leak hotfix), PR-K (4-phase Home redesign incl. "Today for Ziva" hero + vaccination Gantt reshape + 4-mode alert model + safety-lock), PR-N (food-chemistry DB + educational tips, **on hold, not started**). Source: `/home/user/sproutlab/docs/SESSION_HANDOFF.md:9-48`. Cadence has shifted to lettered feature PRs without an explicit sub-phase charter — categorization ambiguous; this may be informal "between sub-phases" work or the operational shape Stability has taken.
- **Open TODOs (highest signal):**
  - PR-N (food-chemistry DB + educational tips) on hold (`/home/user/sproutlab/docs/SESSION_HANDOFF.md:31-43`). Maren must audit the clinical content.
  - `mealSlot` data field on food entries (`/home/user/sproutlab/docs/SESSION_HANDOFF.md:46`).
  - "Genuinely rewarding streak views" — meal-logging-streak win routes to a generic breakdown card (`:47`).
  - Stability sub-phase charter authoring still pending Sovereign green-light (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:166-178`).
  - **R-10 hygiene queue: 16 items** carry-forward into Stability (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:99-105`).
  - Sovereign verification stack: **9 PRs** awaiting real-device verification (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:121-129`).
  - Reserved Polish-A1 (PR-β, Aurelius activities-tab fold-in) pending Stability-PR-α (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CLOSE.md:139-143`).
- **Older roadmap TODOs (likely stale but worth ingesting as historical context):** Device Sync, Snapshot Sharing, EVIDENCE_PATTERNS Expansion, CareTickets Phase 2 — `/home/user/sproutlab/docs/SPROUTLAB_ROADMAP.md:82-114` (Roadmap was last revised 11 Apr 2026 v7.0; v6.0 is dated 10 Apr 2026, v7.0 also dated 11 Apr 2026 — minor changelog inconsistency at `:270-272`).
- **No `docs/sessions/` directory exists** (verified via `ls`). Session-close docs all live under `docs/handoffs/`.

---

## 3. Canon-like artifacts (code-level rules / HRs)

- **The 12 Hard Rules (HR-1 through HR-12):** Authoritative table at `/home/user/sproutlab/CLAUDE.md:97-114`. These are the canonical origin of canons 0001–0012 now resident in Codex's `data/canons.json:5-191` (see §11 for drift characterization).
- **HR-13 and HR-14 — candidates only:** Both staged during the 2026-04-17 sync-emergency session and not yet promoted. HR-13 (schema invariant: SYNC_KEYS values use `null` never `undefined`) and HR-14 (Reconcile Sync Invariant — synchronous-region invariant in reconcile) — `/home/user/sproutlab/docs/handoffs/session-2026-04-17-final-chronicle.md:153-156`, `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-apocrypha.json` apo-sync-006.
- **The 30K Rule** (Governor split threshold) — `/home/user/sproutlab/PERSONA_REGISTRY.md:42-62`. SproutLab is the canonical example; Codex carries this as `canon-gov-001-30k-rule`.
- **One Builder Per Repo** — referenced as `canon-gov-006` in `/home/user/sproutlab/docs/companion-logs/companion-log-s-2026-04-17-01.md:50`.
- **Architectural invariants enumerated in `/home/user/sproutlab/AGENTS.md:18-28`:** split-file architecture, escHtml() at all render boundaries, SWs never cache HTML (canon-0034 in Codex), timezone-safe dates (`new Date(y, m-1, d)`), `git --no-pager` for Termux, spec-before-build (8-pass), QA until cosmetic.
- **Province-local invariants formalized post-2026-04-17:**
  - canon-sync-001-shadow-is-observation-not-intent (drafted, 72h-canary-deferred) — `/home/user/sproutlab/docs/snippets/canon-sync-001-draft.json:12-27`.
  - canon-sync-002-firestore-merge-nests-not-dots (drafted, joint-gated with canon-sync-001) — `/home/user/sproutlab/docs/snippets/canon-sync-002-draft.json:12-23`. **Both are still drafts on the Province side**; whether they were ever promoted to Codex via snippet import is not verifiable from SproutLab alone (ingest task would need to cross-check Codex `canons.json`).
- **canon-cc-008-A — Per-subsystem module layout:** Surfaced from PR-G intelligence.js split; Cipher verdict NOW; canon body lives in Codex per cc-026 (`/home/user/sproutlab/docs/handoffs/session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md:139-153`).
- **Doctrine artifacts (Phase 4 native ratifications, 3/3):** 4 RATIFIED within Polish sub-phase — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CLOSE.md:79-87`:
  1. `subscription-only / no-poll-on-wake` (RATIFIED PR-22; pre-Polish, operational throughout)
  2. `r2-stress-rerun-elective-on-pure-doc-text-correction` (RATIFIED PR-23)
  3. `narrow-scope-and-defer-broader-audit-to-R-10` (RATIFIED PR-26)
  4. `concurrent-operations-interfere-with-parallel-stress-matrix` (RATIFIED PR-30)
- **Candidate doctrines at 1/3 after Polish-10d** — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:66-72`:
  - `architectural-sweep-PR-misses-sibling-sites` (1/3)
  - `sub-phase-close-was-premature` (1/3)
- **First-instance observationals + watch-list seeds** (counter starts at 2nd-instance per Lean-Machine §B): defensive-fallback-needs-shape-homogeneity-verification, visible-bug-deferral-bounds-bypass-narrow-scope-discipline, pattern-shape-guards-over-hardcoded-enumerations — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:73-84`.
- **`audit-emoji.sh` DIRECTION-BADGE narrowing** — first formal Governor-initiated rule refinement (Maren self-endorsed per canon-cc-027 Rung 3) — `/home/user/sproutlab/docs/handoffs/session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md:117`, `:155-157`.

---

## 4. Schism-like artifacts (rejected approaches)

- **Pre-formal snippet (April 2026 sync session)** — 6 explicit schisms at `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-schisms.json`:
  - `rej-sync-0001-delete-household-over-abandon`
  - `rej-sync-0002-fix-6-reconcile-lite-in-c0`
  - `rej-sync-0003-blanket-empty-guard-over-allowlist` (Maren's BLOCKER-2)
  - `rej-sync-0004-syncing-as-wife-hypothesis` (Lyra over-indexing on identity confusion)
  - `rej-sync-0005-immediate-hr-14-promotion`
  - `rej-sync-0006-skip-hierarchy-to-save-time`
- **Pre-existing rej-* citations in volume narrative** (Codex's existing sproutlab volume narrative references them as established): rej-0001 (horizontal scrolling timeline rejected for Today So Far) and rej-0002 (Service Worker push notifications rejected for CareTickets, canon-0045) — `/home/user/Codex/data/volumes.json` sproutlab `today-so-far` and `caretickets` chapters. These are foundational Province schisms that pre-date the snippet format.
- **rej-0017-reconcile-listener-queue** — rejected Option A (explicit listener queue) in favor of Option B (event-loop-is-the-lock) for HR-14. Embedded in `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-aurelius-device-sync-reconcile-r3.json:58+`.
- **PR-EF "3.5/10 verdict" roundtable** — `/home/user/sproutlab/docs/handoffs/session-2026-05-19-02-design-roundtable-and-amendment.md:37-77`. This is a schism-of-its-own: the originally-proposed PR-H (Tier 1/2/3/4 cross-tab design continuation) was **withdrawn** by Cipher because it assumed PR-EF's design was sound enough to extend. Lyra's self-diagnosed root cause was *"toolkit-fit error"* — choosing viz primitives by asking *"what's in our toolkit?"* rather than *"what does this data look like?"*. Three canon candidates surfaced (C1 viz primitive precedes toolkit fit; C2 tab-level information hierarchy requires designated primary surface; C3 cozy-nursery brief is a Care-Region promise) — these are schism-adjacent and lore-adjacent both.
- **Stale Option A patterns** rejected within Phase 4: "Execute literally" the Phase 2 cache-busting bullets (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_2_CHARTER.md:69-75`) — explicitly verdict'd "not recommended" with empirical scout findings.

Categorization note: the schism inventory in handoff docs is implicit (option A/B/C reasoning embedded in charters) rather than per-entry tagged. An ingest pass will need to extract these by hand or accept the lower-fidelity "charter mentions" boundary.

---

## 5. Lore-like artifacts

- **Origins (foundational Chronicles)** — `/home/user/Codex/data/volumes.json` sproutlab volume already carries 11 chapter narratives that are Lore-grade (Origins, Architecture Split, Intelligence, Today So Far, CareTickets, Bug Capture, etc.). Most of SproutLab's lore is *already chronicled in the Codex archive*; the Province itself does not carry separate Lore files. Confirm with Aurelius whether ingest should re-extract from Province sources or treat the volumes.json narratives as canonical.
- **April 2026 sync-emergency lore (5 entries in snippet form)** — `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-lore.json`:
  - `lore-sync-001-the-session-that-earned-its-scars` (Chronicles — First Edict V Exercise)
  - `lore-sync-002-the-footnote-that-was-the-bug` (Edicts — Why Kael Exists)
  - `lore-sync-003-the-consul-visits-the-nursery` (Doctrines — First Summons into a Province)
  - `lore-sync-004-the-canary-that-lied` (Edicts — multi-device canaries)
  - `lore-sync-005-the-invariants-heuristic` (Doctrines — count the invariants)
- **WAR_TIME 2026-04-24 Chronicle** — SproutLab participated in this Codex-led campaign; charters reference *"WAR_TIME 2026-04-24, Hour ~32 of 72"* for Phase 2 and *"Hour ~37 of 72"* for Phase 3 — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_2_CHARTER.md:6`, `/home/user/sproutlab/docs/SPROUTLAB_PHASE_3_CHARTER.md:6`. **No standalone WAR_TIME chronicle file exists in SproutLab**; the canonical chronicle lives in Codex (`/home/user/Codex/docs/WAR_TIME_DASHBOARD.md`).
- **PHASE_4_CHRONICLE** — also explicitly an out-of-scope-rename Codex artifact, not in SproutLab — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CHARTER.md:262`.
- **Phase 4 Polish doctrine harvest (Cautionary Tales / Doctrines):**
  - 4 native ratifications (listed in §3)
  - 8th sustainment of `hermetic-floor-doesnt-substitute-for-production-floor` (Polish-10d) — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:62`. This is the dominant Cautionary Tale of Polish — *Sovereign-floor catches what hermetic-floor misses*, dramatized by the *"bowl literal"* visible bug 48 hours after the second close-declaration.
  - "HR drift is a known cautionary tale" framing: empirically, the sprite-count drift (54 → 62 → 109 zi() symbols), the LOC drift (CLAUDE.md monolith-form metric vs. file-pickable structural-intent metric), and the 30K Rule discharge "architecturally not metrically" all instance the same Cautionary Tale — `/home/user/sproutlab/docs/handoffs/session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md:119`.
- **Cross-cluster doctrines harvested by Cluster A from SproutLab** (filed in Codex's `doctrine-ledger.md`): methodology-debt-codification, builder-mechanical-pass-as-Censor-fallback, jurisdiction-overrides-regex-scope, bulk-substitution-quote-context — `/home/user/Codex/docs/doctrine-ledger.md:87-90, :107`. These originated in SproutLab PR #74 (HR-1 total closure session) and landed in Codex's ledger via cross-cluster Aurelius invocation.

---

## 6. Apocrypha-like artifacts (foretold / forgotten / fulfilled)

- **6 Foretold Works snippet** (April 2026 sync session) — `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-apocrypha.json`:
  - `apo-sync-001-the-reconcile-session` (status: foretold — fulfillment criterion: spec §12 C1–C6 land in sync.js)
  - `apo-sync-002-the-two-canons-promoted-together` (canon-sync-001 + canon-sync-002 joint promotion)
  - `apo-sync-003-the-month-partition-horizon` (foretold — 500KB or 1-year trigger)
  - `apo-sync-004-the-crdt-conversion` (foretold — multi-volume)
  - `apo-sync-005-the-observability-layer` (foretold — v1.2 territory)
  - `apo-sync-006-the-hr-promotion-pair` (HR-13 + HR-14)
- **Foretold "The Second Child" prophecy** — already in Codex's volume narrative (`/home/user/Codex/data/canons.json:2547`). Lore-tier and apocrypha-tier both.
- **Charter-deferred foretelling:**
  - Stability sub-phase (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_10D_CLOSE.md:166-178`)
  - Tally / Reward / Launcher / Spark sub-phases (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CHARTER.md:6`)
  - PR-α / PR-β / PR-γ activities-tab decomposition (Aurelius scoped, slot reserved in Polish, not started)
- **Stale handoff proposals (possibly forgotten works):**
  - DEVICE_SYNC_SPEC.md (37 KB) — older spec; Session 1 reconcile partly built (C0 v3, C0 v3.1); full C1–C6 implementation may have lapsed (not commit-verifiable in this scope).
  - SYNC_VISIBILITY_GAP_AUDIT.md (11 KB) — referenced nowhere in recent handoffs.
  - VISUAL_AUDIT.md (8 KB) — pre-dates Phase 4 charters.
- **Fulfilled foretellings:** Roadmap v7.0 (`/home/user/sproutlab/docs/SPROUTLAB_ROADMAP.md:17-49`) lists CareTickets v1 Phases A–D as shipped, Activity Logging Upgrade v2.42 as shipped, UX Cleanup v2.40 as shipped. Many of the original "build queue" items have been overtaken by Phase 4 hardening.

---

## 7. Specs

**Top-level specs at `/home/user/sproutlab/docs/`:**
- CARETICKETS_SPEC_v5.md (45 KB)
- DEVICE_SYNC_SPEC.md (37 KB)
- DESIGN_PRINCIPLES.md (32 KB) — imported into CLAUDE.md
- SHARED_API.md (35 KB)
- SPEC_ITERATION_PROCESS.md (13 KB) — the 8-pass framework
- QA_GATE_SPEC.md (16 KB)
- SPROUTLAB_PHASE_2_CHARTER.md / PHASE_3_CHARTER.md / PHASE_4_POLISH_CHARTER.md / PHASE_4_POLISH_CLOSE.md / PHASE_4_POLISH_10D_CLOSE.md
- SPROUTLAB_ROADMAP.md, REVISED_ROADMAP-10.md (older revision; date-stamp anomaly: v7.0 dated *11 Apr 2026* sits below v6.0 dated *10 Apr 2026*, but v6.0 entry follows the v5.0 entry in the table — see §11)
- spec-2026-04-17-aurelius-device-sync-reconcile.md (30 KB; cross-Province authorship — Aurelius drafted, lives in SproutLab)
- SPROUTLAB_PATENT_CLAIMS_SUMMARY.md (13 KB) — unusual; categorization ambiguous (legal-flavored)

**`docs/specs/` subdirectory** (Lyra spec authoring under canon-cc-027 chain):
- lyra-pr-epsilon-0-foundation.md (101 KB)
- lyra-pr-epsilon-0-pseudocode.md (59 KB)
- lyra-spec-2026-05-11-symptom-checker-hr1-dry.md (29 KB)
- lyra-spec-2026-05-11-symptom-checker-ux-vision.md (70 KB)
- lyra-spec-2026-05-13-symptom-checker-d1-polish.md (51 KB)
- lyra-spec-2026-05-13-symptom-checker-weave-isl.md (40 KB)
- lyra-spec-2026-05-14-symptom-checker-d2-structural.md (92 KB)

**Total:** ~24 spec-grade docs across both locations. The Lyra-authored Symptom Checker spec corpus (7,261 lines total) is itself a substantial ingest surface.

---

## 8. Companion-log-like artifacts

- **`docs/companion-logs/`:** Only 1 file — `companion-log-s-2026-04-17-01.md` (15 KB), the canonical first-Edict-V-exercise companion log under PERSONA_REGISTRY v1.1.
- **`docs/handoffs/`: 14 session/handoff files** — the dense session-close inventory. Naming conventions are mixed (older: `SESSION_HANDOFF_*`, `handoff-*`; newer: `session-YYYY-MM-DD-*`):
  - `SESSION_HANDOFF_9APR2026_ARCH.md` (oldest, pre-Phase-4)
  - `handoff-2026-04-17-aurelius-to-lyra-device-sync-session-1.md` + `-v2.md`
  - `session-2026-04-17-final-chronicle.md` (Lyra chronicle of sync emergency)
  - `session-2026-04-17-lyra-c0-deploy.md`
  - `session-2026-05-16-lyra-hr-1-total-closure.md` (PR #74 HR-1 sweep)
  - `session-2026-05-17-lyra-poop-color-zi-escape-sweep.md`
  - `session-2026-05-17-mode2-maren-spec-consult.md`
  - `session-2026-05-18-bilateral-rung2-discharge.md`
  - `session-2026-05-18-discharge-arc-closure.md`
  - `session-2026-05-18-pr-a-pr-b-closure.md`
  - `session-2026-05-18-vk29-disposition.md`
  - `session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md`
  - `session-2026-05-19-02-design-roundtable-and-amendment.md`
- **Top-level `docs/SESSION_HANDOFF.md`:** "live" current-session handoff, dated 2026-05-22 — `/home/user/sproutlab/docs/SESSION_HANDOFF.md:1-58`. This is the canonical current-state pointer.
- **Naming-pattern observation:** `lyra-session-close-*` and `cipher-session-close-*` naming patterns (called out in the campaign brief) are **not present** in SproutLab. The Province uses `session-YYYY-MM-DD-*` shape, with author/topic in the slug rather than persona-prefix. Categorization-flag this for the ingest mapper.

---

## 9. Volume metadata for SproutLab

A Codex volume entry already exists at `/home/user/Codex/data/volumes.json` sproutlab entry. Comparing proposed vs. existing:

| Field | Existing in Codex | Proposed updates |
|---|---|---|
| `id` | `sproutlab` | unchanged |
| `name` | `SproutLab` | unchanged |
| `shelf` | `active` | unchanged (correct — Phase 4 in-flight) |
| `description` | "Single-file PWA tracking feeding, sleep, growth, milestones, and medical data for Ziva. Wife Mode default." | Consider refresh: post-PR-G split is no longer a "single-file" architecture (it's split → built into one HTML). Also "Wife Mode" now renames to "Essential Mode" per Polish-9 atomic-canon (see §11). |
| `domain_color` | `#E8B4B8` (soft rose-pink) | Reasonable, but CLAUDE.md identifies **sage** `#b5d5c5` as the diet/positive accent and **rose** `#f2a8b8` as the medical-alert accent (`/home/user/sproutlab/CLAUDE.md:127-133`). The cozy-nursery brief leans warm/sage; rose `#f2a8b8` would match the medical-alert sub-brand; sage `#b5d5c5` would match the calm-nursery primary. Categorization ambiguous — `#E8B4B8` is close to rose-but-warmer, and reads as the "baby" tonal anchor. Scout would leave it. |
| `tags` | `["pwa","health","parenting"]` | consider adding `"phase-4-hardening"`, `"care"`, `"intelligence-split"` |
| `repo` | `rishabh1804/sproutlab` | unchanged |
| `current_phase` | **STALE**: *"Device Sync Reconcile — Session 1 spec R3-locked. Lyra to implement C1–C6..."* | Should refresh to: *"Phase 4 sub-phase 1 (Polish) closed at PR-39 (third declared close per `sub-phase-close-was-premature` 1/3); 8 post-Polish PRs (#88–#95) merged; Stability sub-phase charter pending Sovereign green-light; PR-N (food-chemistry DB + educational tips) on hold."* |
- **Mascot / theme:** "cozy nursery journal, not a clinical health app" — `/home/user/sproutlab/CLAUDE.md:44`. The persona is Lyra The Weaver; the lyre constellation is the visual metaphor (`/home/user/sproutlab/PERSONA_REGISTRY.md:87`).

---

## 10. Cross-volume references

- **Codex (constitutional grounding):** Dense. CLAUDE.md §Companion-Set Invocation Surface routes to `Codex/docs/specs/subagents/` and `…/skills/` for canonical spec bodies (`/home/user/sproutlab/CLAUDE.md:23-32`). Doctrine ledger lives in Codex (`/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CHARTER.md:262`). canon-cc-008-A canonization is a Codex amendment (`/home/user/sproutlab/docs/handoffs/session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md:151`). 24 Codex canons currently reference SproutLab (counted via Python scan of Codex `canons.json`).
- **MSc (newly enrolled in Cluster A 2026-05-19 per canon-inst-004):** Commit `2a072fd 2026-05-21 cipher: re-sync deployed copies to canonical (MSc added to Cluster A) (#89)` confirms the cross-Province ripple — Cipher's Cluster A jurisdiction expanded to include MSc, and the Province-mirror sync cascaded into SproutLab's .claude/ tree.
- **SEP Invoicing / SEP Dashboard:** Mentioned in cross-Republic doctrine framing (`/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-apocrypha.json` apo-sync-004 — "SEP's billing spine will likely need versioned writes for invoice amendments regardless"), but no direct code/doc dependency.
- **Command Center / Capital:** First Consul summons into the Province happened in SproutLab (April 2026 sync session) — `/home/user/sproutlab/docs/snippets/snippet-2026-04-17-session-lore.json` lore-sync-003. SproutLab is the canonical "first Province summons" precedent.
- **AGENTS.md is a shared cross-tool brief** (Claude Code, Codex CLI, Gemini CLI) — `/home/user/sproutlab/AGENTS.md:1-3`.

---

## 11. Data-integrity surprises (and the known HR drift)

This section is the one the campaign brief most asked Scout to characterize. Position only after naming the uncertainty.

- **The HR drift (canon-0001 through canon-0012):**
  - *Origin:* HRs were authored in SproutLab as the Province's 12 Hard Rules — `/home/user/sproutlab/CLAUDE.md:97-114`, also chronicled at `/home/user/sproutlab/Memory.md:54-57` (*"HR-1→12 sproutlab — 12 hard rules, originated in SproutLab, inform all repos"*).
  - *Current state:* They now live in `/home/user/Codex/data/canons.json:5-191` as canons 0001–0012 with `scope: global` (verified by grep — canon-0001-no-emojis, canon-0002-no-inline-styles, …, canon-0012-timezone-safe-dates). Codex *also* carries canons 0013–0019 which are global extensions/clarifications (canon-0013-no-ellipsis, canon-0014-eschtml-boundary-global, canon-0015-data-action-delegation-global, etc.).
  - *Drift characterization (Scout's position, named as a position):* This is **not** a drift — it is the **intended promotion path**. Codex's volume metadata for SproutLab explicitly says (`/home/user/Codex/data/volumes.json` sproutlab.design_principles.notes): *"SproutLab originated HR-1..HR-12 which were promoted to Republic scale on 2026-04-19. A Province-local extension is pending — SproutLab inherits the Republic principles directly but has not yet published a SproutLab-specific addendum."* So the architecture is: the HRs **originated** in SproutLab, were **ratified to Republic scale** at Codex on 2026-04-19, and the Province inherits via the Republic. The CLAUDE.md table at SproutLab is the **operational rendering** of the Republic-scale canons; both should agree on the 12 rules and they do.
  - *Where there IS minor drift to flag for ingest:* (a) HR-13 and HR-14 are **candidate** at SproutLab (per `/home/user/sproutlab/docs/handoffs/session-2026-04-17-final-chronicle.md:153-156`) and **not** present in Codex's canons.json as canons 0013/0014 — Codex's 0013/0014 are *different* canons (no-ellipsis, eschtml-boundary-global). The Province's HR-13/14 candidate naming will collide with Codex's 0013/0014 if promoted under the legacy "HR-N → canon-000N" mapping. Surface for Aurelius — this is a real naming collision risk.
- **Sub-phase close declarations superseded twice:** Polish sub-phase has been declared closed three times — PR-32, PR-37, and PR-39. The Province now tracks `sub-phase-close-was-premature` as a candidate doctrine (1/3). Anyone consuming the close artifacts must read §0 (Amendment notices) on each — `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CLOSE.md:13-25` for the first supersession.
- **Roadmap changelog inconsistency:** `/home/user/sproutlab/docs/SPROUTLAB_ROADMAP.md:269-272` — v6.0 dated *10 Apr 2026* sits below v5.0 also dated *11 Apr 2026*, and v7.0 is also dated *11 Apr 2026*. The dates likely reflect intended sequencing being broken in editing. Minor.
- **Codex's stored sproutlab volume `current_phase` is severely stale.** It says *"Device Sync Reconcile — Session 1 spec R3-locked"* — that's April 2026. Reality is end-of-Polish post-PR-39. The bulk-ingest is the moment to refresh.
- **Wife Mode → Essential Mode rename (Polish-9 atomic-canon).** Codex's volume description still says *"Wife Mode default"*. The Province has renamed throughout — `localStorage['ziva_simple_mode']` → `ziva_essential_mode`, function names `isSimpleMode/toggleSimpleMode/initSimpleMode → *EssentialMode`. `/home/user/sproutlab/docs/SPROUTLAB_PHASE_4_POLISH_CHARTER.md:258`.
- **Sprite-count drift:** 54 → 62 → 109 zi() symbols, with CLAUDE.md amendments lagging the source. Most recent refresh at commit `181494c 2026-05-19 docs(claude.md): Cipher Edict V amendment — refresh zi() sprite count (62 → 109)`. Now in sync.
- **The 30K Rule redefinition** (file-pickable + per-file <5K + composed-tractable > monolith-under-30K) has not yet propagated to AGENTS.md or PERSONA_REGISTRY.md — `/home/user/sproutlab/docs/handoffs/session-2026-05-19-01-info-tab-rich-viz-and-intelligence-split.md:215-219`. AGENTS.md (`:14-16`) still cites the LOC metric.
- **`docs/doctrine-ledger.md` does not exist in SproutLab.** The campaign brief expected it as "canonical pattern." Confirmed Codex-only. SproutLab's doctrine record is distributed across the Phase 4 charter+close-artifact pair (`SPROUTLAB_PHASE_4_POLISH_CHARTER.md` + `_CLOSE.md` + `_10D_CLOSE.md`).
- **PR-EF "3.5/10" gap:** The QA chain (canon-cc-008) cleared a feature PR that the Architect then judged 3.5/10 on design-quality. This is the most interesting *meta*-finding in recent history — the audit chain doesn't audit "good," only "compliant." Three canon candidates surfaced from this; categorization-flag for Aurelius (whether they get canonized at Codex altitude or stay as Province-local design-principles).
- **canon-sync-001 + canon-sync-002 promotion status unverifiable from Province alone:** Drafts are still drafts at `docs/snippets/`. Whether they ever crossed into Codex's canons.json post-72h-canary is the cross-volume reconciliation Aurelius can confirm.
- **Spec authorship cross-Province:** `spec-2026-04-17-aurelius-device-sync-reconcile.md` is Aurelius-authored but lives in SproutLab. The filename convention adopts `spec-YYYY-MM-DD-author-subject.md`. The Lyra `lyra-pr-epsilon-0-*` specs in `docs/specs/` use a different convention (`lyra-pr-{name}-{phase}.md`). Authorial provenance is recoverable but the convention is inconsistent.

---

## 12. Counts (approximate, for ingest sizing)

| Entity type | Province-internal count | Notes |
|---|--:|---|
| Volume metadata | 1 | existing in Codex; needs phase+description refresh |
| Chapters (existing in Codex sproutlab volume) | 14 | already chronicled; add ~3 new for Phase 4 work (Polish sub-phase, Intelligence split / canon-cc-008-A, Home design refresh PR-K) |
| Chapters (new candidates from this survey) | ~3–5 | Phase 4 Polish sub-phase; Intelligence split / 30K-Rule structural discharge; Symptom Checker (Lyra spec corpus); Post-Polish hardening burst (PRs #88–#95); PR-N food-chemistry (foretold) |
| TODOs (Province-internal open) | ~10–15 | live: PR-N, mealSlot, streak views, Stability charter author, 16 R-10 hygiene items, 9 Sovereign verification PRs, Polish-A1 (PR-β), HR-13/14 promotion, canon-sync-001/002 promotion, 30K-Rule redefinition propagation to AGENTS.md |
| Canons (HR-derived, already in Codex) | 12 | 0001–0012; **do not re-ingest** as new |
| Canons (Province-local candidates not yet in Codex) | ~5 | canon-sync-001, canon-sync-002, C1/C2/C3 (viz-primitive / info-hierarchy / cozy-nursery-as-care-promise) from 3.5/10 roundtable |
| Schisms | ~10–12 | 6 from sync-snippet + rej-0001 + rej-0002 + rej-0017 + PR-H withdraw + Phase 2 Option A reject + ~2 more inferrable from charters |
| Lore (Chronicles + Edicts + Doctrines + Cautionary Tales) | ~15–20 | 5 from sync-snippet + 4 Phase-4 native ratifications + 8th hermetic-floor sustainment + 4 cross-cluster doctrines (already in Codex ledger) + ~3 from PR-EF 3.5/10 roundtable + Origins (already in Codex narrative) |
| Apocrypha | ~10 | 6 from sync-snippet + Stability/Tally/Reward/Launcher/Spark sub-phase forecasts + Second Child prophecy (already in Codex) + Polish-A1 reserved slot |
| Specs | ~24 | 17 top-level + 7 in docs/specs/; Symptom Checker corpus alone is 7,261 lines |
| Companion-logs | 1 explicit + 14 handoff/session-close artifacts | The single explicit companion-log is the Edict-V-first-exercise canonical; handoffs serve as the de-facto companion log substrate |
| Doctrine-ledger entries (Province contribution) | 4 RATIFIED + 2 at 1/3 + ~6 first-instance observationals + ~4 cross-cluster doctrines (already in Codex ledger) | Province has no own ledger file; harvested from Phase 4 charter/close docs |
| **Rough total entries this Province surface adds to ingest** | **~80–100** | At the high end of Aurelius's *"~400 entries across 11 Provinces"* per-Province average (~36). SproutLab is doctrine-rich as predicted. |

---

## Open rulings for the Chronicler

- **PERSONA_REGISTRY.md altitude** at SproutLab carries cross-repo Memory-style content (Aurelius/Lyra/Solara/Cipher/Consul) that should live at Codex/Republic altitude under cc-026, not in a Province briefing. Categorization ambiguous — may be legacy pre-cc-026 artifact, or deliberate operational mirror. Aurelius's eye needed on whether this is Province-canonical or Province-mirror-of-Republic.
- **HR drift framing.** Position: this is not a drift but the intended promotion path. Real near-term collision risk is HR-13/HR-14 candidate naming vs. existing Codex canons 0013/0014 (no-ellipsis, eschtml-boundary-global).
- **The 3.5/10 roundtable arc** (`session-2026-05-19-02`) is the single most interesting governance event for ingest — surfaces the audit-chain-doesn't-audit-good gap, generates 3 canon candidates, withdraws a feature PR post-merge, reshapes next-PR direction. Canonical Lore. Three canon candidates (C1 viz-primitive-precedes-toolkit-fit; C2 tab-level-information-hierarchy-requires-designated-primary-surface; C3 cozy-nursery-brief-is-Care-Region-promise) need altitude decision: Codex or Province-local?
- **Stale Codex volume entry for sproutlab** — highest-priority ingest fix; `current_phase` ~6 weeks behind reality.
- **canon-sync-001 + canon-sync-002 promotion** — still drafts in SproutLab snippets; verify against Codex `canons.json` whether they crossed post-72h-canary.
- **HR-13 / HR-14 candidate promotion** — pending; collision risk with Codex canons 0013/0014.
- **"Wife Mode → Essential Mode" volume description refresh** (Polish-9 atomic-canon rename).
- **30K Rule redefinition propagation** to AGENTS.md + PERSONA_REGISTRY.md (still cites LOC metric).
- **Spec-corpus ingestion (~24 specs, 7,261 lines for Symptom Checker alone)** — atomize or one-spec-per-file?
- **Doctrine-ledger watch-list (4 ratified + 2 candidate + 6 observationals + 4 cross-cluster)** — track as own entity type or fold into lore/canons?

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
