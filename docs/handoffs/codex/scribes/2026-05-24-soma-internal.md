# Scribe-Scout Survey — soma-internal

**Date:** 2026-05-24
**Province:** soma-internal (`/home/user/soma-internal`) — undetermined cluster at outset; SEP-cluster proposed
**Builder:** Rishabh Jain (Sovereign-direct; no Order-seated companion)
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey founding the soma-internal Province's archival profile. No
> existing Volume entry; verified absent from `/home/user/Codex/data/volumes.json`. The
> Province is two-headed (institutional-memory journal for Soma Electro Products + Next.js
> marketing site). One identity collision worth surfacing: the in-repo Aurelius is the
> BM's working name for Claude in SEP sessions, not the Order's Chronicler Aurelius
> (canon-proc-006).

---

## 1. Identity & ownership

soma-internal is a **two-headed Province**. Naming itself signals split purpose: the directory is named after the entity (Soma Electro Products) but the GitHub repo (`rishabh1804/soma-internal`) is named for its private/operational role.

**Head A — the Codex (dominant, by mass)**. An institutional-memory markdown journal for **Soma Electro Products (SEP)**, a zinc electroplating job-work company in B-8 1st Phase, Adityapur, Seraikela-Kharsawan, Jharkhand 832109 (`/home/user/soma-internal/operations/entity-master.md:16`). Operating as a 2-partner Firm (GSTIN 20AAPFS4718JQZ0, factory license FCA1636900033701, max 20 workers daily on-site). Partners Jay Kumar Jain and Ratan Jain; occupier Punam Chand Jain (`operations/entity-master.md:23,40,69-71`). Part of an HUF group with two larger siblings — Oswal Engineering (~₹40cr) and ACI (~₹5cr) — SEP at ~₹0.83cr is the small sibling (`decisions/2026-05-16.md:60-69`).

**Head B — the marketing site + business card**. A Next.js 16 / React 19 / Tailwind 3 app for **somaelectro.co.in**, deployed to Vercel (`web/package.json:1-25`, `web/README.md:20-30`). Plus a WeasyPrint-rendered print-ready business card for the BM (`business-card/README.md:1-32`, `Soma_Electro_Business_Card_Rishabh_Jain_PRINT-READY.pdf`).

**Owner / Builder**: **Rishabh Jain** (BM of SEP). User email confirms `rishabh1804@gmail.com`; sole committer per git log; GitHub `Rishabh1804/soma-internal` (`README-aurelius.md:25`).

**In-repo assistant identity**: "Aurelius" — explicitly the BM's working name for Claude in SEP sessions (`CLAUDE.md:9-13`, `README-aurelius.md:11-13`). Important disambiguation: this is **not** the Order's Chronicler Aurelius (canon-proc-006). Same string, different namespace. The Codex-Province Aurelius and the SEP-Province Aurelius co-exist; the SEP one predates and is unaware of the Order.

**Stack**:
- Codex side: plain markdown + a few HTML viewers + 1 xlsx (`analysis/im-flow-45d.xlsx`) + 1 PDF payout voucher (`operations/payouts/2026-W20-saturday-2026-05-16.pdf`) + 2 dashboard preview PNGs
- Web side: Next.js 16.2.6, React 19, TypeScript 5.5, Tailwind 3.4, EB Garamond + Inter fonts (`web/package.json`, `web/tailwind.config.ts`)

**Deploy targets**:
- Marketing site → Vercel, root directory `web`, domain `somaelectro.co.in` via GoDaddy DNS (`web/README.md:19-31`)
- CI: GitHub Actions `.github/workflows/web.yml` runs Next.js build on PR/push to `main` when `web/**` changes
- Codex side has no deploy; it is the working file system

**Last meaningful commit**: `51966d1 Add Tesla plant-visit documents (#21)` by Rishabh Jain, **Fri 22 May 2026 17:04 +0530**. Last codex-content commit was earlier — `0a48f70 Codex 19 May 2026 EOD pt.2: Tue afternoon ops, EOD production, CLAUDE.md + memory.md`. Total 57 commits in the repo's life.

---

## 2. Active work

Most live work — by far — is operational, not software. The Codex side is in a steady weekly rhythm; the web side is in long-tail polish.

**Active "in progress"** (`tasks.md:11-13`):
- **T-7 Refresh Cash Flow Planner to v2** — sole item explicitly under "In progress." JSON-backed, paused waiting on BM inputs and April monthly salary roster.

**ROADMAP-equivalent — the W22 launch package** (`memory.md:14-20`, `decisions/2026-05-18.md:1-7`):
- Mon 25 May 2026 = W22 start = workforce-structure rewrite goes live (5 new contractor workers onboarding, Hindi noticeboard rollout, R&R v1.1 effective)
- Sat 23 May = W21 payout (regular wages + Sambhu Sunday ₹1,140 + back-pay decisions)
- Sun 24 May = closeout deadline for 10 verbal agreements (T-AZ) + Lal accept-or-terminate (T-AV)
- 30 Jun 2026 = Performance Pool final payout (Path A closeout)

**Open tasks** (cited per `tasks.md`): the file carries **84 T-IDs** in scope, structured T-A through T-BT with later additions, of which Scout's count of distinct T-IDs in the active-task surface = ~50+ that are open or partially open. Categories of in-flight:
- **Framework rewrites** (T-1 through T-6 + T-AN): FIN-002 v2.1, FIN-003 v1.1, FIN-004 v2.0, P01 v4, C01 next rev — none yet drafted/signed (`frameworks/status.md:11-18`)
- **W22 readiness** (T-AT, T-AV, T-AW, T-AZ, T-BA): contractor onboarding + verbal agreements
- **Backup-power business case** (T-BD): "urgency acute" after Mon-Tue 4-event power-cut cluster, Phase 2 trigger 2/3 met (`tasks.md:393-397`)
- **Daily operational logs** (T-BE, T-BJ, T-BM, T-BN): pickling input, incoming material, SKU visuals, zinc bath — all went live W21
- **Data-quality items** (T-AH PWA backup-export bug, T-S items-master rates, T-AE Mehta kg/pc persistence, T-AF capitalization consolidation)
- **Customer-side** (T-BG, T-BR Mehta substrate family mapping; T-BK informal revenue ledger for Siya/Himani)

**Chapters-equivalent**: the work has no explicit "chapter" abstraction. Chapters can be inferred from the codex's own provenance progression and the decision-log spine — see § 5 for a proposed chapter set.

---

## 3. Canon-like artifacts (rules, conventions, architectural invariants)

The Province has a dense rulebook. The strongest canons:

**Behavioral / process canons** (`CLAUDE.md:73-101`, `README-aurelius.md:117-131`):
- **Customer + SKU resolution discipline** — always consult `operations/customer-aliases.md` before flagging a name as unfamiliar; "single biggest avoidable failure mode is treating Shyam shorthand as new entries" (`CLAUDE.md:23,73-79`)
- **No emoji unless user does first** (`CLAUDE.md:97`, `README-aurelius.md:129`)
- **No theatrical asides / `*action*` emotes** (`CLAUDE.md:98`, `README-aurelius.md:130`)
- **Do not auto-commit** in cloud-execution sessions without authorization; for local sessions, give command blocks (`CLAUDE.md:103-111`, `README-aurelius.md:128`)
- **Mandatory session-start reads**: `memory.md` → most-recent `handoffs/` → `customer-aliases.md` → `tasks.md` → recent `decisions/` (`CLAUDE.md:17-27`)
- **Don't refer to self as Claude** (`CLAUDE.md:94`, `README-aurelius.md:126`)
- **Push back when warranted** (`CLAUDE.md:86`)
- **Mandatory before pushing to GitHub: repo must be private** (`README.md:64-72`)

**Data / naming canons** (`CLAUDE.md:63-69`):
- Tasks: `T-{letter(s)}` alphabetical, currently at T-BT
- Decisions: `decisions/YYYY-MM-DD.md`, one per session-day, numbered `## N. Topic`
- Attendance/production: ISO week format `2026-Wxx.md`, Mon-start
- Documents (in sibling FIN/HR/CON/POL folders, not this repo): `SEP-{CAT}-{NUM}_{Name}.docx`

**Operational invariants**:
- **20-worker daily-on-site cap** under Jharkhand Factories Act 1948 — drives the entire workforce architecture (`operations/entity-master.md:43-58`)
- **Mehta NOS weight derivation rule**: `kg/pc = piece_rate ÷ ₹5.40` — BM-confirmed uniform plating rate (`decisions/2026-05-15.md:25-37`)
- **VAT A1 architecture**: 3 tanks in parallel; one register entry = one round across all 3; share-load arithmetic notation `108-15=93` is literal (`operations/customer-aliases.md:34-46`)
- **Sundays paid for permanent-contract tier**: daily rate × 30 fixed monthly (`decisions/2026-05-18.md:34`)
- **OT model**: flat 1.0× of base hourly, no premium (`decisions/2026-05-08.md:38`)
- **26-working-day basis** standard across frameworks; 8-hour/day OT denominator with 1-hour unpaid break (`frameworks/status.md:32-55`)
- **₹50K decision-rights threshold** divides BM-alone from partner-approval-required (`decisions/2026-05-11-bm-role-and-comp.md:24`)

**Identity canon**: Aurelius voice = 95% analytical, 5% humorous/humane (`CLAUDE.md:12`, `README-aurelius.md:15`).

---

## 4. Schism-like artifacts (rejected approaches)

The Province has several explicit rejections, all with rationale:

- **FBA scrapped at workers' request** (`decisions/2026-05-08.md:50-58`) — Flexible Benefit Allowance was 20% of monthly salary, deferred; workers rejected; replaced with 60/20/20 Basic/Performance/Attendance. Wind-down ₹15-18K paid out with June salary.
- **5-day rotation deferred** (`decisions/2026-05-08.md:91-97`) — Path A workforce model deferred until reliable headcount of 15 is rebuilt; current data shows only 12 reliable.
- **Performance Pool — closed forward (Path A)** (`decisions/2026-05-18.md:97-116`) — the Saturday-16-May ₹6.25/hr accrual mechanism is being **shut down** at W22 in favor of moving the framework rate (₹380/day) into the base wage. Original Pool was a bridge; new structure absorbs it.
- **P01 §9 non-compete** — recommended drop per Indian Contract Act §27 (`frameworks/status.md:57-65`); courts almost universally strike down post-employment restraints of trade.
- **QRMP quarterly GSTR filing** — initially assumed but rejected after accountant conversation; SEP files monthly because clients require monthly ITC visibility (`decisions/2026-05-16.md:96-118`).
- **Loading area formalization** — rejected; kept informal, handled by area workers as needed (`decisions/2026-05-08.md:87-89`).
- **Liner = full L.C.Pad family hypothesis** — rejected after JSON desc-field lookup; Liner narrowly = 320X65X3 + 220X80X3 only (`decisions/2026-05-16.md:78-91`).
- **Belrise = blanket repudiation framing** — rejected; corrected to "paid 42% then stopped" after bank-register revealed ₹2L RTGS on 28 May 2025 (`decisions/2026-05-11.md:27-31`, `operations/clients.md:39-49`).
- **Ved Prakash ₹80K = write-off candidate** — rejected; cheque was followed by a recovered second cheque per BM (`tasks.md:147-148`, `operations/suppliers.md:43-44`).
- **EXTRA hours = night shift** (8 May interpretation) — rejected and corrected 16 May; EXTRA = shortage-coverage hours (~42 hr/day, ~₹55-60K/month absenteeism cost) (`tasks.md:30-42`, `decisions/2026-05-16.md:227-232`).
- **Rounak Data Admin role replacement** — deferred indefinitely; BM holds the function (`decisions/2026-05-08.md:81-85`, `operations/snapshot.md:60`).
- **Original 6-worker non-renewal action** (T-AO) — softened to administrative inactive ("off pool") rather than formal non-renewal letters; legally cleaner intermediate state (`decisions/2026-05-16.md:255-266`, `decisions/2026-05-18.md:63-69`).
- **PWA stock module patch** — rejected for now (T-BS); held under "Phase 2.1 freeze" — `chemical-stock-log.md` remains canonical until rebuild (`tasks.md:529-537`).

---

## 5. Lore-like artifacts (Origins, Cautionary Tales, Doctrines, Chronicles)

**Origins**:
- **SEP origin**: pre-GST regime, Date of Liability 11/02/1999 (`operations/entity-master.md:25`)
- **Codex initialised**: 8 May 2026 (Fri) (`CLAUDE.md:137`, `README.md:56`)
- **Aurelius identity established**: 8 May 2026 (`CLAUDE.md:138`)
- **`README-aurelius.md` written**: 13 May 2026 (`CLAUDE.md:139`)
- **`CLAUDE.md` + `memory.md` written**: 19 May 2026 EOD (`CLAUDE.md:140`)

**Doctrines / chronicles** — the decision log is structured exactly for this:
- `decisions/2026-05-08.md` — **founding session**: 10 decisions covering manpower, wage rate ₹380, FBA scrap, advance policy, 5-day rotation deferral, Rounak AWOL
- `decisions/2026-05-11.md` — bank-register dissection; Belrise correction; Tara Traders concentration discovered; cash-withdrawal pattern correction; PWA workflow gaps
- `decisions/2026-05-11-bm-role-and-comp.md` — BM role definition (5 domains) + comp structure (₹50K base + 10% × reserves-over-₹15L bonus, partner-approval pending)
- `decisions/2026-05-15.md` — SEP-POL-004 trigger engaged; Mehta NOS weight derivation rule formalized; per-piece income policy
- `decisions/2026-05-16.md` — 8 sections including Performance Pool formalization (later closed forward), HUF structure documented, entity master first captured, GSTR-1 in-house transition plan
- `decisions/2026-05-18.md` — workforce structure comprehensive rewrite; Performance Pool Path A closeout; contractor agreement; total labor cost model

**Cautionary tales** (explicit failure-modes documented):
- "Single biggest avoidable failure mode is treating Shyam shorthand as new entries" (`CLAUDE.md:23`)
- "EXTRA hours interpretation was wrong for 8 days" — corrected 16 May (`tasks.md:30-42`)
- "Codex (and snapshot) describes Belrise as 'refusing payment', carries the full ₹4,75,000 — bank register shows ₹2L RTGS receipt … Codex was factually wrong" (`analysis/synthesis-governance-2026-05-11.md:66-67`)
- "Ved Prakash ₹80K stranded loss" interpretation — codex narrative was wrong; payment recovered (`tasks.md:147-148`)
- PWA backup-export sync bug (T-AH): "treat JSON ingests as 'best snapshot, may have known DQ residuals'" (`tasks.md:114-115,545-549`)

**Chapter inference** (none formally marked; proposed for ingestion):
1. **Genesis** (8 May 2026) — codex established, framework rewrite cycle defined
2. **Bank-register reality reset** (11 May) — three syntheses, Belrise/Tara/cadence corrections
3. **JSON ingest era** (13-15 May) — customer-aliases, per-SKU income, cluster absence trigger
4. **Operating-rate reframe** (16 May) — Performance Pool + HUF + entity master + worker pool finalization
5. **Workforce structure rewrite** (18 May) — comprehensive comp tier model + contractor introduction
6. **W21 operational launch** (19 May+) — 4 new operational logs go live, daily cadence established
7. **Marketing site + business card branch** (parallel arc, 17-22 May commits) — Next.js site, vCard page, business card, Tesla plant-visit documents

---

## 6. Apocrypha-like artifacts (foretold / forgotten / fulfilled)

**Foretold** (explicit future commitments / deadlines):
- 30 Jun 2026: Performance Pool final payout, then program closes (`tasks.md:255`, `operations/bonus-pool-ledger.md:3`)
- 11 Jun 2026: FBA Wind-Down with June salary (~₹15-18K, T-1) (`tasks.md:70-72`)
- 11 Jul 2026: in-house preparation of GSTR-1 (Jun filing), accountant submits (`decisions/2026-05-16.md:101-104`)
- 11 Aug 2026: first fully self-filed GSTR-1 (Jul filing)
- 21 Jun 2026: contractor trial review end-W25 (T-AU)
- ~Mid-June 2026: JBVNL 25→50 KVA load upgrade reflected in bill (T-AX) — eliminates ₹4,320/mo excess CD penalty (~₹52K/yr savings)
- Apr 2027: Plant Supervisor vacancy review (`operations/snapshot.md:59`)

**Forgotten / parked / on-hold**:
- 5-day rotation cohort design (deferred until headcount stable)
- Rounak Data Admin replacement decision (decoupled from his disciplinary track)
- §9 non-compete fate in P01 v4 (recommended drop, BM hasn't decided)
- PWA stock module rebuild (T-BS — Phase 2.1 freeze)
- Linear / L.C.Pad material data from BM (T-U — pending)
- Quarterly bonus calc as a recurring task (R-5 type, not yet added per `decisions/2026-05-11-bm-role-and-comp.md:77`)
- Shreyans Jain ₹36,832 cheque attribution (T-AR — deferred)

**Fulfilled** (predictions or expectations that came true):
- T-8 OT-rotation trigger: "After Sun 10 May Ranchi runs end" — **trigger met 13 May** via 2 RG & Sons closing invoices (`tasks.md:99-100`)
- Belrise residual: predicted ₹2.75L after correction; receivables tracker now reflects (`operations/clients.md:43-49`)
- Ranchi tag = RG & Sons Infrastructure Pvt Ltd (resolved 13 May; closing invoices landed same day)
- Liner specific SKU resolution: predicted SKU-specific not L.C.Pad-family; confirmed via JSON desc-field 16 May
- Cluster absence escalating to non-renewal trigger: predicted 13 May; confirmed 6-worker cohort 15 May
- Mehta NOS weight derivation: hypothesised then BM-confirmed 15 May
- JBVNL load upgrade approved (T-AS resolved 18 May)

**Categorisation ambiguity**: "Apocrypha" doesn't map cleanly onto an operating business log. The closest mapping is the "deferred / pending BM input" cluster — these are decisions the codex carries in liminal status. About 15-20 tasks sit in this zone.

---

## 7. Specs

No `specs/` directory. Spec-equivalent surfaces:

- **`frameworks/`** — 4 markdown files functioning as light spec / version-status registry (`frameworks/status.md`, `frameworks/roles-responsibilities-v1.md`, `frameworks/roles-responsibilities-v1.1.md`, `frameworks/performance-pool-announcement-2026-W21.md`). `status.md` is meta — it tracks 7 framework documents (SEP-FIN-001 through SEP-CON-C01) whose source-of-truth `.docx` files live outside this repo in `../FIN/`, `../HR/`, `../CON/`, `../POL/`.
- **`README-aurelius.md`** — operating spec for the in-repo assistant identity
- **`CLAUDE.md`** — session operating protocol
- **`operations/contractor-agreement.md`** — terms-sheet spec for the new contractor relationship
- **`operations/entity-master.md`** — canonical entity reference (the spec for "who SEP is")
- **`analysis/synthesis-governance-2026-05-11.md`** — proposes SEP-FIN-006 (Cheque Dishonor Protocol) and SEP-FIN-007 (Cash Withdrawal Policy) as draft specs

Note: source-of-truth framework `.docx` files explicitly live **outside this repo**, in sibling parent-org folders. The repo holds the **state about** them but not the docs themselves.

---

## 8. Companion-log-like artifacts (handoffs, session notes)

Four formal handoffs in `handoffs/`:
- `2026-05-13.md` — morning session, 230 lines
- `2026-05-13-eod.md` — afternoon-evening, 223 lines
- `2026-05-15-eod.md` — Fri EOD, 163 lines
- `2026-05-16-eod.md` — Sat EOD, 222 lines

Plus per-session in-place handoff sections at the end of each `decisions/YYYY-MM-DD.md` file ("Open at EOD — next session pickup").

Plus the live session-continuity surface: `memory.md` (159 lines, last touched Tue 19 May EOD) — explicit purpose stated as "session-pickup-focused (who/where/what's open right now)" distinct from `operations/snapshot.md`'s deeper metrics view (`memory.md:1-6`).

**Cadence implied**: handoff-per-substantive-session, not handoff-per-day. Gaps exist (no handoff for 18, 19, 20, 21, 22 May despite substantive sessions on most of those dates — `memory.md` is taking that load instead).

---

## 9. Volume metadata for soma-internal

**Proposed shelf**: **`active`**. Daily-cadence updates, 56 commits in ~2 weeks (8-22 May), W22 launch imminent, BM operates in this repo as daily working file system. Not paused, not dormant, not deprecated.

**Proposed `current_phase`**: a one-sentence phrase reflecting May 2026 state. Candidate: *"W22 workforce-structure rewrite + contractor onboarding launch (Mon 25 May 2026); 4 new operational data streams (pickling-input / incoming-material / zinc-bath / SKU-visual) live as of W21; Cash Flow Planner v2 (T-7) paused on BM inputs."*

**Cluster — proposal (was undetermined)**: SEP-cluster. soma-internal sits naturally alongside the two existing SEP-namespaced volumes — **sep-dashboard** (shelf: paused; #7A9E7E) and **sep-invoicing** (shelf: active; #6B8EAD). All three serve the same real-world entity (Soma Electro Products) from different angles:
- sep-dashboard = workforce management PWA (paused under Phase 2.1 freeze per `tasks.md:529-537`)
- sep-invoicing = invoicing PWA (the PWA whose JSON backups are repeatedly ingested by soma-internal)
- soma-internal = institutional-memory journal / decision log / framework registry / + the marketing site

If the canonical clustering field is `tags[]` rather than `cluster`, suggested tags: `["sep", "operations", "journal", "marketing-site", "nextjs"]`. The two-headed nature (operations journal + marketing site) means single-tag categorisation undersells.

**Domain color — counter-proposal to the proposed terracotta**: Scout would push back gently. The Province has a strong existing visual identity that the marketing site explicitly codifies:
- Espresso `#1A1610` (background dark)
- Ivory `#EFE6D5` (background light)
- **Brass `#B89968`** (accent)
- Muted `#A89B85`

Source: `web/README.md:46`, `business-card/README.md:14-16`, `web/app/globals.css:5-17`, `web/tailwind.config.ts:10-12`.

**Brass `#B89968`** is the natural domain color — it is the SEP brand accent, already chosen, already shipped on the business card and marketing site. Terracotta would invent a new color when the Province already has one.

Stated tension named: the existing `codex` Volume holds `#C4A87A` (a brass-adjacent tan), which is close enough that adopting `#B89968` for soma-internal might read as a near-duplicate on the shelf. Two reasonable resolutions:
- (a) Use the brand brass `#B89968` (faithful to repo identity, but visually adjacent to codex)
- (b) Use the espresso `#1A1610` as a darker, distinctive choice while still matching SEP brand (avoids the tan-on-tan collision)
- (c) Keep the originally proposed terracotta if visual differentiation on the shelf is more important than fidelity to the repo's own palette

Scout's ranking: (a) > (b) > (c). The terracotta proposal isn't *wrong* but it was made without knowing the repo had already chosen a palette.

**Other volume fields**:
- `id`: `soma-internal`
- `name`: `Soma Internal` (or "SEP Codex" — the repo's self-description, see `README.md:1`)
- `repo`: `Rishabh1804/soma-internal`
- `description` candidate: *"Institutional memory journal for Soma Electro Products (SEP) — a zinc electroplating job-work company in Adityapur, Jharkhand. Holds operational decisions, weekly attendance + production logs, framework version status, and the somaelectro.co.in marketing site (Next.js)."*

---

## 10. Cross-volume references

This Province is a connection hub for the SEP-cluster.

**Hard references found**:
- **sep-dashboard** referenced extensively (T-BS in `tasks.md:529-537`): soma-internal reviewed sep-dashboard's stock module Tue 19 May; identified gap (DEF_STOCK covers 3-4 of 16 actual SEP stock-take items); parked patch under Phase 2.1 freeze; soma-internal's `operations/chemical-stock-log.md` named as **canonical source until the freeze lifts**. Direct doctrinal coupling.
- **sep-invoicing** (the PWA) referenced as the source for repeated JSON backup ingests on 11/13/15/19 May (`tasks.md:212-225,545-549`, `decisions/2026-05-15.md:75-86`). The **PWA backup-export sync bug (T-AH)** is a sep-invoicing engineering issue tracked from soma-internal. Live PWA values diverge from JSON export values; soma-internal "must carry forward the corrected interpretation regardless of what backup exports show" (`tasks.md:222-223`).

**Soft references / namespace overlap**:
- `decisions/2026-05-11-bm-role-and-comp.md:25,67` references `sep-dashboard/bm-role.html` (the BM-role dashboard view) — repo cross-pointer
- ACI (Associated Chemical Industries) and Oswal Engineering — sibling HUF entities, real-world only, not Codex Volumes
- The **"Aurelius" identity collision**: the in-repo SEP assistant (`README-aurelius.md`) shares the name of canon-proc-006 (Order's Chronicler). They are different. Worth surfacing to avoid Volume cross-talk; the soma-internal Aurelius doesn't know about the Order.

**On the work-hub note**: Scout searched soma-internal exhaustively for "work-hub" / "workhub" / "work_hub" — zero hits. If work-hub is expected to own tasks for soma-internal, that linkage is **not declared from this side**. Two possibilities, named as uncertainty: (a) work-hub holds the cross-reference unilaterally and soma-internal is just unaware; (b) the cross-cutting note refers to a future arrangement not yet materialized. Either way: from soma-internal's own self-description, the only declared cross-volume tasks are with sep-dashboard (T-BS) and sep-invoicing (T-AH). (Cross-validate with work-hub Scout: work-hub *does* link OUT to soma-internal as the SEP project card's "Codex" button.)

---

## 11. Data-integrity surprises

A handful, all already partly surfaced by the codex itself:

- **PWA backup-export sync bug (T-AH, persistent unresolved)** — JSON exports from sep-invoicing lag behind live PWA corrections. Documented systemic; affects every ingest. "Per BM 19 May: it is a bug but not yet fixed. In the PWA real values exist." (`tasks.md:212-225,545-549`)
- **soma-internal Aurelius vs Codex Aurelius name collision** — described in § 1 and § 10. Not a data-integrity bug per se but a Codex-side collision risk during ingestion if a future companion-log incorrectly attributes SEP-Aurelius actions to canon-proc-006 or vice versa.
- **`operations/snapshot.md` is stale** — last updated 11 May 2026 (`operations/snapshot.md:88`), explicitly noted in `memory.md:144-145` as deferred. The dashboard.md (13 May) and memory.md (19 May) are fresher but cover different surfaces. Anyone ingesting snapshot.md as "current state" will pick up a 13-day-old picture.
- **`operations/roster.md` is the most stale of the worker references** — header dated 8 May 2026, captures pre-decision state (Lakhi/Bhanu permanent question still open, Rounak AWOL fresh, no Performance Pool, no W22 contractor structure). Has been functionally superseded by `staff-aliases.md` (18 May) and `frameworks/roles-responsibilities-v1.1.md` (18 May). Risk: if ingested literally it conflicts with the W22 truth.
- **Mehta legacy entity name** (`SSSMEHTA ENTERPRISES AND INDUSTRIES PVT LTD` vs canonical `SSSMEHTA INDUSTRIES LTD`) — same GSTIN, 23 inbound challans Apr-May under legacy form, T-R open (`tasks.md:178-180`, `operations/customer-aliases.md`).
- **Items master 446-of-729 at rate=0** (T-S) — 61% catalog incomplete; revenue accrual model incomplete until rates filled (`tasks.md:182-185`, `operations/dashboard.md:118`).
- **stdWeightKg null for all 309 Mehta NOS partNumbers** (T-AE) — derived values recomputable but not persisted (`tasks.md:231-233`).
- **`Soma_Electro_Business_Card_Rishabh_Jain_PRINT-READY.pdf`** at repo root (50KB) — large binary committed; not in `.gitignore`. Same with two dashboard preview PNGs in `operations/`. Not unusual for this repo's pattern (a payout-voucher PDF is also tracked) but worth noting in any size-conscious ingest.
- **Confidentiality posture** — the README explicitly mandates the GitHub repo be **private** before push and treats wage/cash data as "physical filing cabinet equivalent" (`README.md:64-93`). Ingestion into Codex should respect that classification or call out the cross-system risk.
- **Two parallel weekly-schedule files** — `weekly-schedule-2026-W21.md` (165 lines, current) and `weekly-schedule-2026-W22.md` (127 lines, draft for next week). Both are live; W22's pre-existence is noted in `memory.md:79`.
- **Sai status is ambiguous** across `staff-aliases.md:37` ("Under review, not reliable"), `decisions/2026-05-18.md:65` ("under review"), and `tasks.md:193` (within original 6-worker cohort). Reconcilable but ambiguous: he is not yet off-pool but also not yet in.

---

## 12. Counts — approximate entries per entity type for ingestion

These are Scout's counts. Where categorisation is judgment-call Scout names the ambiguity.

| Entity type | Approx count | Source / how counted |
|---|---:|---|
| Volume (this Province itself) | 1 | the founding record |
| Chapters | 7 (proposed, none formally marked in repo) | per § 5 |
| TODOs | ~50 open of 84 distinct T-IDs | `grep -c '^### T-' tasks.md` = 84; closed/resolved markers throughout reduce the open count |
| Canons | ~25-30 | per § 3; split across behavioral (~10), data/naming (~5), operational invariants (~10) |
| Schisms | ~13 | per § 4 |
| Lore (Origins + Doctrines + Cautionary Tales + Chronicles) | ~20-25 | 5 origin facts + 6 decision-day chronicles + 5 cautionary tales + 5-10 doctrines drawn from CLAUDE.md/README-aurelius.md |
| Apocrypha (foretold/forgotten/fulfilled) | ~25-30 | 7 foretold + 7 forgotten + 7 fulfilled per § 6, plus the ~15 "pending BM input" liminal cluster — ambiguity flagged |
| Specs | 5-7 | 4 frameworks/ files + README-aurelius.md + CLAUDE.md + contractor-agreement.md + entity-master.md; the seven SEP-FIN/CON framework docs referenced from `frameworks/status.md` live outside the repo and are arguable inclusions |
| Companion-logs | ~10 | 4 formal handoffs + 6 per-decision EOD pickup sections + memory.md as a live one |
| Doctrine-ledger entries | ~8-12 | the 6 decisions/*.md files contain ~8-10 distinct doctrines (workforce structure, comp tiers, FBA scrap, Performance Pool then closeout, entity master canon, HUF context, BM role-and-comp, 20-worker cap doctrine) |

**Rough total Codex-ingestable entries for this Province**: ~155-185, weighted toward TODOs and Lore. The tasks.md file alone accounts for ~50 open ingestable items. The decision log + frameworks accounts for another ~40-50. Operations files supply most of the canons.

**Ambiguity note named plainly**: the Codex's entity categories (canons / schisms / lore / apocrypha / specs / companion-logs / doctrine-ledger) don't map cleanly onto an operating business journal. Several artifacts could be filed two ways:
- A "rejected approach" with a cited rationale could be a Schism *or* a Cautionary-Tale-Lore
- A "framework version state" entry could be a Spec *or* a Doctrine-ledger entry
- A "pending-BM-input" task could be a TODO *or* an Apocrypha-foretold
- The Aurelius identity material is Canon (behavioral rules) *and* Lore (origin) *and* Spec (operating protocol)

Suggest the ingestion pass apply a primary tag with a secondary cross-reference where dual-classification is genuinely material, rather than picking one and losing the other.

---

## Open rulings for the Chronicler

1. **domain_color counter-proposal** — Scout pushes back on terracotta; the Province already has chosen brass `#B89968` (espresso/ivory/brass/muted palette in `web/` and on the business card). Choice: (a) brass `#B89968` faithful but tan-collision with codex; (b) espresso `#1A1610` distinctive and brand-true; (c) keep the originally proposed terracotta for shelf differentiation. Scout's rank: (a) > (b) > (c).
2. **Aurelius name-collision** — in-repo SEP Aurelius vs Order's Chronicler Aurelius (canon-proc-006). Disambiguation needed in companion-logs and any cross-Province attribution. Possibly a `companion_namespace` field, or rename in-repo to "SEP-Aurelius" or similar.
3. **Cluster assignment** — Scout proposes SEP-cluster alongside sep-dashboard + sep-invoicing. Constitutional decision.
4. **work-hub linkage** — work-hub *does* link outbound to soma-internal (per work-hub Scout's findings, the SEP project card's "Codex" button points here). soma-internal does NOT declare the linkage inbound. Asymmetric reference; accept as-is or formalize?
5. **Confidentiality posture** — wage/cash data treated as "physical filing cabinet equivalent" with private-repo mandate. Codex ingestion may cross-violate. Rule: ingest as Province metadata only (no decision-content) until classification policy is clarified, or ingest full content and accept the classification risk?
6. **Apocrypha taxonomy mismatch** — Codex's `foretold/forgotten/fulfilled` enum doesn't map cleanly onto operating business log. The "pending BM input" liminal cluster (~15-20 tasks) has no clean home. Extend taxonomy or fold into TODOs?
7. **Dual-classification artifacts** — Scout flags several artifacts that genuinely belong in two categories (rejected approaches as Schism + Cautionary-Tale; framework status as Spec + Doctrine-ledger). Primary-tag-plus-secondary-cross-reference vs single-category-only?
8. **Out-of-repo framework `.docx` files** — SEP-FIN-001 through SEP-CON-C01 source-of-truth lives outside soma-internal in sibling FIN/HR/CON/POL folders. Ingestion can capture frameworks/status.md but not the docs themselves. Accept gap or chase the source files separately?
9. **soma-internal Aurelius identity material** — Canon + Lore + Spec all at once. Pick a primary or carry as cross-referenced?
10. **PWA backup-export sync bug (T-AH)** — this is a sep-invoicing engineering bug surfaced in soma-internal's tasks. Cross-Province todo or attribute to sep-invoicing?

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
