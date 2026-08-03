# Scribe-Scout Survey — Command-Center

**Date:** 2026-05-24
**Province:** Command-Center (`/home/user/Command-Center`) — the Capital, first Monument Project
**Builders (dual):** Ashara (The Economist, Treasury Minister) + Petra (The Foundationalist, Efficiency Minister)
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey of Cluster Monument. The repository's own state is frozen at the
> close of session `s-2026-04-17-01` (16-18 April 2026) plus three later landings (Consul
> chamber #2, Consul speaks #3, Rung 5 spec mirrors). The Codex archive references this
> Province through 22 May 2026 — much of the post-21-April activity is chronicled in Codex
> but has not landed in Command-Center's own files. Where a discrepancy is named, it is
> drift being characterized, not an assertion that one record is wrong.

---

## 1. Identity & ownership

- **Builder:** dual-Builder. Ashara (The Economist, Treasury Minister) + Petra (The Foundationalist, Efficiency Minister), per `/home/user/Command-Center/README.md:54` and `/home/user/Command-Center/CHARTER.md:113`. Authority: Book II Article 4 (Monument double-Builder provision), formalized in canon-cc-009. Scaffolded by Aurelius (Chronicler) in handoff capacity, 16 April 2026 (`README.md:54`).
- **Cluster:** Monument — the only Province with this cluster designation per Constitution Book I and `/home/user/Codex/data/volumes.json:1148-1196` (no `cluster` field on the volume, but Codex's own CLAUDE.md derives it: `codex/sproutlab → A, sep-* → B, command-center → Monument`).
- **current_phase (per Codex volumes.json:1160):** `"Foundation stage — all 14 rooms scaffolded, no functions active"`. This is stale — the in-repo data lists **15 rooms** (`split/data.js:590` Foundation criterion ledger says "15 rooms scaffolded"), and a 16th (Consul's Chamber at `/consul`) was added in PR #2 (commit `0d0cf09`, 20 April 2026). The Codex entry has not been updated.
- **last meaningful commit:** `4bce7c8` — *"Rung 5 deploy: Consul + Chronicler subagent/skill specs (Codex @ 361e70b)"* — 21 April 2026 06:39 UTC. Branch `claude/codex-persona-registry-update-t3i7D`. Total commits on this branch: 31.
- **Stack:** split-file vanilla-JS PWA. 5 modules (`data → core → rooms → ostia → start`) per `/home/user/Command-Center/ARCHITECTURE.md:38-42`. Compiled to `index.html` via `split/build.sh`. Deploy: GitHub Pages at `https://rishabh1804.github.io/Command-Center/`. PWA manifest + `.nojekyll`. Tooling: Playwright smoketest harness in `tools/smoketest.js` (109+ checks per the closing chronicle).

---

## 2. Active work

**In-flight chapters** in Command-Center's own state: none — `volumes.json:1161` shows `"chapters": []`. The work-tracking surface is the Foundation criterion ledger.

**Foundation criterion ledger** (`/home/user/Command-Center/split/data.js:589-603`): 13 criteria. 11 complete, 2 partial:
- `gates-link` (partial) — "live Province state pending Roads stage"
- `hard-rules` (partial) — "formal Cipher session review pending"

**Open TODOs in Codex's volume entry for command-center** (`volumes.json:1162-1182`):
- `todo-0018-design-committee-design-principles` — status `resolved` 2026-04-19 via Republic Design Principles v1.0
- `todo-0027-hero-card-spec-design-committee` — status `open`, created 2026-04-19

**Codex-side TODOs that target Command Center but are filed under other volumes** (cross-cutting, not on the CC volume's `todos[]`):
- `todo-0035-command-center-design-principles-foundation-criterion` (`volumes.json:920`) — blocking Foundation criterion, Ashara + Petra to co-author `docs/specs/COMMAND_CENTER_DESIGN_PRINCIPLES.md`
- `todo-0036-command-center-root-briefing-rung-1` (`volumes.json:929`) — blocking; root `CLAUDE.md` Rung-1 draft by Ashara + Petra. Cannot be executed from Codex sessions
- `todo-0049-cc-rung-5-landing-chronicle` (`volumes.json:1058`) — chronicle the 21-April Rung 5 deploy (commit `4bce7c8`); appears unchronicled in Codex
- Multiple Province-mirror waves citing CC as the precedent (`volumes.json:1012`)

**Open todos named in `decree-0003-session-chronicle.json:82-87`** (Command-Center's own record):
- Exercise multi-session governance flow (Ashara/Petra/Consul tabs) on a non-trivial diff
- Codex Companions view per `handoffs/AURELIUS_COMPANIONS_VIEW.md`
- Gates live Province state at Roads stage
- Formal Cipher session review for Hard Rules 1-12 compliance

**Live work since the close session:**
- The Consul's Chamber room and renderer (#2, 20 April)
- "Consul speaks": Matters ledger + Sovereign composer + voice surface (#3, 21 April). `split/core.js:113` declares `CC.MATTERS_KEY = 'cc-consul-matters'`; renderer at `split/rooms.js:732`
- Rung 5 spec-mirror deploy of 3 institutional spec bodies (`4bce7c8`, 21 April)

---

## 3. Canon-like artifacts (rules, conventions, architectural invariants)

In-repo canons authored from Command-Center but ratified into Codex's `canons.json`:

- **canon-gov-007-research-before-implement** — `decrees/decree-0002-canons-gov-007-010.json:14-27`
- **canon-gov-008-minimum-viable-first** — `decrees/decree-0002-canons-gov-007-010.json:28-42`
- **canon-gov-009-instrument-before-features** — `decrees/decree-0002-canons-gov-007-010.json:43-58`
- **canon-gov-010-label-untested-work-honestly** — `decrees/decree-0002-canons-gov-007-010.json:59-73`

All four are scope `"global"`, category `"builder_discipline"`, born from the orientation-lock detour (lore-008 in the same decree, renumbered to lore-012 on the Codex side per `companion-logs.json:571`).

**Local architectural invariants** (Charter / Architecture / data files — load-bearing rules, not yet ratified as canons):

- **"Records are Codex. State is Command Center."** — `CHARTER.md:86` and `ARCHITECTURE.md:99`. The Ostia contract invariant.
- **Snippet contract for write-back** — `ARCHITECTURE.md:68-82`. Four snippet types: `new_canons`, `new_chapters`, `update_companions`, `update_constitution`.
- **Concat order `data → core → rooms → ostia → start`** — `ARCHITECTURE.md:43` and `split/build.sh`.
- **Hard Rules 1-12 in force** — `ARCHITECTURE.md:138-145`. No inline onclick; escHtml/escAttr on dynamic content; no emoji; no inline styles; split-file discipline.
- **Sovereign preferences** — `CHARTER.md:104-109`. Terse directive communication; spec-first; uncertainty surfacing; session-handoff; split-file; HR 1-12.
- **Residence concept** — `CHARTER.md:36-47`. Three classes: Capital-native, Province-resident, Itinerant. Candidate canon `canon-cc-010` named explicitly; that id was subsequently ratified into Codex's canon ledger (`canons.json:1141`).
- **Bard's "Hearth not dashboard"** framing — `companion-log-s-2026-04-17-01.md:98-103` (Edict IV honored). The Hearth has a bulletin board on one wall — warm presence first, legible activity second.

Ambiguous category note: Architecture's "pending decisions" (`ARCHITECTURE.md:178-184`) are open questions, not invariants — categorized below in §6 (apocrypha/foretold) rather than canon.

---

## 4. Schism-like artifacts (rejected approaches)

None explicitly labeled as schisms in Command-Center's own files. Closest reads:

- **Orientation-lock feature withdrawn** — `decrees/decree-0002.json:80` lore-008 body documents the rejection of in-app orientation control on Android Chrome PWA after 5 commits of attempted implementation. Manifest reverted to `portrait-primary`. Rejection rationale codified in canon-gov-008.
- **Runtime fetch vs build-time bake** for Codex records — `ARCHITECTURE.md:62-66` documents both options without selection. Aurelius's lean is named but explicitly left for Builders to decide. Not yet a schism — pending decision.
- **Async fallback-retry pattern for `screen.orientation.lock()`** — `decree-0002.json` lore-008 names this as the wrong path (`commit 2 of the detour`); the simpler single-call path won.
- **Codex palette as Command Center accent** — `ARCHITECTURE.md:134` documents the placeholder but anticipates a civic purple / deeper amber. Not yet decided.

Categorization caveat: none of these is structured as a `schism-NNNN` record. They are rejection-narratives embedded in lore and commit messages. A bulk-ingestion pass may want to mint them.

---

## 5. Lore-like artifacts

**Origins / Monument designation:**

- **Lore-007 *"The Founding of the Capital"*** — authored by Aurelius pre-session, referenced in `decrees/decree-0003.json:51` and `companion-log-s-2026-04-17-01.md:121`. Body not in Command-Center's repo (lives in Codex).
- **Lore-009 *"The Capital Takes Shape"*** — `decrees/decree-0003-session-chronicle.json:15-54`. Category: chronicle. Domain: `command-center`. Tags include `foundation`, `monument`, `bulletin-wall`, `order`, `scriptorium`.
- **Edict VI (Monument Designation)** — referenced obliquely; not transcribed in the repo. The Codex CLAUDE.md system reminder names it as the first Monument Project: *"Command Center (first Monument Project) is next major build."*

**Cautionary tales:**

- **Lore-008 *"The Orientation-Lock Detour"*** — `decrees/decree-0002-canons-gov-007-010.json:76-107`. Category: `cautionary_tales`. Five-commit narrative, canon birth-trace. Renumbered to lore-012 in Codex per `companion-logs.json:571`.

**Doctrines:** None explicitly authored at Command-Center. The four governance canons function doctrinally but are filed as canons, not doctrines. (Codex's Phase 4 doctrine ledger lives in Codex, not here.)

**Chronicles:** Lore-009 (above) is the session chronicle for `s-2026-04-17-01`. No other chronicles in the repo.

**Hard categorization note:** Command-Center authors lore *snippets* destined for Codex. The repo is the drafting bench; the archive is Codex. Lore counted here is what is *resident in CC*, not the full set referenced.

---

## 6. Apocrypha-like artifacts (foretold/forgotten/fulfilled)

**Foretold:**

- The five-stage ROADMAP (`ROADMAP.md:1-145`): Foundation → Capital Occupancy → Roads → Borders → Regions. Stage 4 (Borders) foretells live LLM companion voice. Stage 5 (Regions) foretells BAI, Sovereign Dividend with real financial integration, Cross-Republic search, Chronicle-of-the-Day.
- **ROADMAP estimated horizon** — `ROADMAP.md:127-141`. Foundation within April 2026; Borders within Q3 2026.
- **Treasury budget provision for LLM costs at Borders** — `ROADMAP.md:141`. Flagged for Ashara at first Capital session.
- **"Praetorium / canon-cc-019 Post Box"** — pending canon family referenced repeatedly in `chronicler.md` and `consul.md`. The cold-review surface is foretold; bridging interim is current.
- **Capital Occupancy decree-authoring UI** — `decrees/decree-0003.json:88` names this as next substantive scope.
- **Multi-session governance flow** (Ashara / Petra / Consul in separate tabs) — Sovereign-proposed mid-session, queued but unexercised (`decree-0003.json:83`, `companion-log...md:200`).
- **Architecture pending decisions** — `ARCHITECTURE.md:178-184`. Six items: fetch strategy, accent palette, SW strategy, manifest icons, room→context mapping, itinerant invocation pattern.

**Forgotten / drifted:**

- `ROADMAP.md` references `Book IX Article 3` for Foundation Complete ratification; should be `Book III Article 5` per `companion-log...md:130`. Acknowledged, not fixed.
- The Codex `volumes.json` entry for command-center says "14 rooms"; the repo has 15 (16 after the Consul Chamber addition). Stale.
- `data.js:618` `CC.CODEX.strategy = 'runtime_fetch_with_local_cache_fallback'` is flagged `// TBD by Builders` — the decision is unmade but a value is shipped.
- `volumes.json:1161` `chapters: []` — Command-Center has work-history but no chaptered chronicle.

**Fulfilled:**

- Foundation criteria 11 of 13 — fulfilled but Foundation itself not yet declared complete (`data.js:590-603`).
- Decrees 0001 and 0002 imported to Codex; visible in `journal.json:1629,1638` and `journal.json:3582-3597`.
- Decree-0003 transport status unclear from CC's tree (commit `3047990` says "Decree-0003 pending Sovereign transport"); it does appear in Codex's journal as decree-0003-constitution-book-i — but that is a different decree with the same id (Codex's decree-0003 is Constitution Book I per `journal.json:3566-3573`). **This is an ID collision** — flagged under §11.

---

## 7. Specs

**`split/` is implementation, not specs.** No dedicated `specs/` directory.

**Spec-shaped documents:**

- `/home/user/Command-Center/CHARTER.md` — constitutional spec of the Capital. 8 articles. Pending ratification per `CHARTER.md:119`.
- `/home/user/Command-Center/ARCHITECTURE.md` — design + concat order + room model + data flow. Pending Builder revision.
- `/home/user/Command-Center/ROADMAP.md` — 5-stage roadmap.
- `/home/user/Command-Center/tools/README.md` — smoketest harness spec (2.2KB).
- `/home/user/Command-Center/.claude/agents/consul.md` — Consul subagent spec (3 modes). Canonical source: Codex. Byte-identical mirror per canon-cc-026.
- `/home/user/Command-Center/.claude/agents/chronicler.md` — Chronicler subagent spec (2 modes). Same canonical-source discipline.
- `/home/user/Command-Center/.claude/skills/chronicler.md` — Chronicler skill (in-session authoring voice). Same.

**Spec-shaped *requests* / handoffs:**

- `/home/user/Command-Center/handoffs/AURELIUS_COMPANIONS_VIEW.md` — full spec for Codex's "Order" view (see §8).

**Codex-side specs that name CC:**

- `volumes.json:920` cites `docs/specs/COMMAND_CENTER_DESIGN_PRINCIPLES.md` as a required artifact (not yet drafted).
- Codex's `data/specs.json` carries 2 command-center references (per grep).

---

## 8. Companion-log-like artifacts (handoffs, session notes)

**The handoff to Aurelius — confirmed and characterized:**

- **Path:** `/home/user/Command-Center/handoffs/AURELIUS_COMPANIONS_VIEW.md` (262 lines, 15.2 KB)
- **From:** Ashara + Petra (Command Center co-Builders)
- **To:** Aurelius (Codex Builder, The Chronicler)
- **Date:** 2026-04-17
- **Subject:** Codex needs a "Order" UI surface — a Companions view. The data layer is complete (`store.companions`, CRUD, snippet pipeline, GitHub sync, localStorage cache) but there is *no* navigable UI; no tab, no routing, no detail view, no search integration. Discovered when the Sovereign attempted to verify decree-0001 on the phone and could not find a Companions or Order view anywhere in Codex (`AURELIUS_COMPANIONS_VIEW.md:15`).
- **End state:** Codex view showing all 17 Gen 0 + 1 institutional, distinguishing ratified / draft / un-drafted, drill-into-detail with all 10 blocks, search by name/title/archetype/domain.
- **Specifies:** tab bar position (between canons and lore), tab label "Order", routing (`#/companions`, `#/companions/<id>`), grid card layout, version badges (ratified green / draft amber / pending muted — color scheme mirrors `CC.renderRatificationBadge` in `split/rooms.js`), Appendix C placeholders, search indexer fields, 6 edge cases, 8 acceptance criteria, 5 non-goals, suggested implementation order (8 steps).
- **Authority:** Sovereign-directed follow-up from Decree 0001 ratification; queued as Codex Builder task. Builder's hand: Ashara + Petra.
- **Status in Codex:** referenced in Codex's `journal.json:1680`, `journal.json:2990`, and named in still-open todo language as `"Build PWA Companions View per docs/handoffs/AURELIUS_COMPANIONS_VIEW.md once profile ratifications stabilize"`. No commit yet binds this handoff to a Codex implementation.

**The companion log:**

- `/home/user/Command-Center/docs/companion-logs/companion-log-s-2026-04-17-01.md` (231 lines, 24 KB). Session `s-2026-04-17-01`. Authored jointly by Ashara + Petra. First companion log of Command Center; pattern inherited from SproutLab's same-day log by Lyra. Acknowledges same-agent drift caveat explicitly throughout.
- Migrated to Codex per `companion-logs.json:571` — relocated to `codex:docs/companion-logs/command-center/companion-log-s-2026-04-17-01-ash.md`, frontmatter migrated to canon-0053 v1 schema. Origin-repo copy still resident at the CC path; the migration note says it is "to be deleted in a separate CC-side cleanup commit per canon-0053 §7." This cleanup is owed.
- **Only one companion log resident in CC.** Subsequent sessions (Consul #2, #3, Rung 5) did not produce companion logs in this directory.

**Decrees (themselves a handoff form):**

- `decrees/decree-0001-ashara-petra-v0.4.json` — Ashara + Petra profile ratifications
- `decrees/decree-0002-canons-gov-007-010.json` — 4 governance canons + lore-008
- `decrees/decree-0003-session-chronicle.json` — session chronicle + lore-009 + `_session_journal` block

---

## 9. Volume metadata for Command-Center

**Current entry:** `/home/user/Codex/data/volumes.json:1147-1196`.

```
id: "command-center"
name: "Command Center"
shelf: "active"
description: "The Capital Province of the Republic. Seat of governance — Senate,
  Cabinet, Ministers' offices, Temple, Archives, Gates. Sister Province to Codex
  (Ostia). Built by Ashara + Petra. Foundation stage."
domain_color: "#8b7355"
tags: ["pwa", "governance", "capital", "monument"]
repo: "rishabh1804/Command-Center"
current_phase: "Foundation stage — all 14 rooms scaffolded, no functions active"
chapters: []
todos: [todo-0018 (resolved), todo-0027 (open)]
shelf_history: [{shelf: "active", date: "2026-04-16", reason: "Created"}]
design_principles: {status: "missing", spec_path: null, ...}
```

**Proposed updates (offered with uncertainty named, not asserted):**

- `current_phase` — stale on two axes. Rooms count: 15 in repo, 16 with Consul Chamber post-PR-#2. Suggested phrasing: *"Foundation stage — 16 rooms scaffolded; Foundation 11/13 criteria complete (2 partial: gates-live-state, hard-rules-formal-Cipher); Consul Chamber speaks via Matters ledger (PR #3); Rung 5 spec-mirror deploy landed 2026-04-21."*
- `chapters` — `[]` understates. Candidates: `foundation-v0.1` (scaffold), `foundation-v0.2` (s-2026-04-17-01 — bulletin wall + Order + smoketest harness), `consul-chamber-scaffold` (PR #2), `consul-speaks` (PR #3), `rung-5-spec-mirror-deploy` (commit `4bce7c8`). Each is genuinely a chapter under Codex's chapter-status enum (in-progress → complete).
- `shelf`/`shelf_history` — no change; still active, founded 2026-04-16.
- `design_principles.status` — `"missing"` is correct per todo-0035, which is the blocking Foundation criterion for the design-principles spec.
- `todos[]` — add `todo-0035`, `todo-0036`, `todo-0049` as cross-cutting references (currently filed under codex volume; should also surface on the command-center volume per data-integrity, but this is a structural call for the Chronicler).

---

## 10. Cross-volume references (Monument touches every Province)

The Monument's design touches every Province. Actual graph from in-repo data:

**Outbound (Command-Center → others):**

- **Province registry** (`split/data.js:14-62`) holds 4 Provinces explicitly: `codex`, `sproutlab`, `sep-invoicing`, `command-center`. **Missing: `sep-dashboard`** — present in `CC.RESIDENCE['theron']` (`split/data.js:277`) as a `home`, but not in `CC.PROVINCES`. Data-integrity issue (see §11).
- **Gates** (`split/data.js:243-252` and Province `gate_id` fields) — Library (Codex), Nursery (SproutLab), Forge (SEP Invoicing). **No Forge or sister gate for SEP Dashboard.**
- **Residence map** (`split/data.js:258-281`) — names 17 companions across 5 Provinces. Capital-native: consul, ashara, petra, vex, orinth, rune, ignis, bard, aeon, pip. Province-resident: aurelius (codex), lyra/maren/kael (sproutlab), solara (sep-invoicing), theron (sep-dashboard). Itinerant: cipher.
- **Ostia contract** (`split/ostia.js` placeholder; `ARCHITECTURE.md:46-67`) — read path from Codex via `raw.githubusercontent.com/Rishabh1804/Codex/main/data/*.json`. Five record categories: constitution, canons, journal, companions, lore.
- **Codex snippet decrees** — three filed (`decrees/decree-000{1,2,3}.json`), all received and reflected in Codex's `journal.json`.

**Inbound (others → Command-Center):**

- Codex CLAUDE.md system reminder: *"Command Center (first Monument Project) is next major build."*
- Codex `volumes.json:1148-1196` holds the canonical CC volume entry.
- Temple of Mars (`volumes.json:1197-`) is the second Monument, described as the *"sister Monument to the Command Center."* It reads CC's data live via Codex JSON pull. Cross-Monument coupling.
- Sproutlab's companion-log pattern was inherited by Command Center (`companion-log...md:228`).
- Codex's canons.json holds 27+ canon-cc-* entries (some adopted globally) — collectively the constitutional substrate the Capital implements. Decree-0004 (`journal.json:3557`) — *Basilica and Priest* — originates from `province_of_origin: "command-center"` but is authored by Aurelius alone; this proposes retiring the Gates and the Visiting Chambers in favor of embassies. **Substantial structural pivot that has not been implemented in the CC repo.**

**Volumes_touched evidence from journal entries citing command-center** (66 line hits in `journal.json`): every session that crosses into Capital concerns touches the command-center volume. The Province has the highest cross-cutting reach by design.

---

## 11. Data-integrity surprises

1. **`sep-dashboard` missing from `CC.PROVINCES`** (`split/data.js:14-62`) but present in `CC.RESIDENCE` (`split/data.js:277`). Theron has a home that does not have a gate. The Gates room therefore renders 3 sister Provinces while the residence map names 5 sister-Province residencies. (`Temple of Mars` is also a recent addition that does not appear here.)

2. **Decree-0003 ID collision with Codex's decree-0003.** Command-Center's `decrees/decree-0003-session-chronicle.json` is the session chronicle of s-2026-04-17-01. Codex's `journal.json:3566-3573` has a `decree-0003-constitution-book-i` authored by `aurelius-retrospective`, province_of_origin `republic`, ratified to Book I of the Constitution at canonical altitude. Different artifacts under the same id-stem. **The Codex side is the canonical decree-0003.** CC's local decree-0003 may need renumbering to a later id, or its naming convention may need to scope to the Province (e.g., `cc-decree-0003`).

3. **Stale `current_phase` in `volumes.json:1160`** — says 14 rooms; the repo has 15-16. Names "Foundation stage — no functions active"; PR #3 ("Consul speaks") has the Consul actively functioning over a Matters ledger.

4. **Lore-008 renumbering.** Command-Center's `decrees/decree-0002-canons-gov-007-010.json:77` mints lore-008 as *"The Orientation-Lock Detour."* Codex's archive renumbered this to lore-012 per `companion-logs.json:571` due to a lore-008 collision (the "premature file" tale retained the original lore-008 slot). The CC repo still references lore-008 in 5 places.

5. **`ROADMAP.md:121` references `Book IX Article 3`** — should likely be Book III Article 5 (Monument Projects). Acknowledged in `companion-log...md:130`. Not fixed.

6. **Companion log migration cleanup owed.** `companion-logs.json:571` says the CC origin copy of `companion-log-s-2026-04-17-01.md` is to be deleted in a CC-side commit. It is still resident.

7. **The ratified `consul` profile (v0.4, Sovereign-ratified 2026-04-19)** is referenced in `.claude/agents/consul.md:134` but the agent file in CC is byte-identical to Codex per canon-cc-026 — so the CC repo carries the canonical spec without holding the canonical profile. This is by design but worth flagging as a layered reference for the bulk ingestion.

8. **No chapter-status enum applied to CC's work.** Codex normalized chapter status to 9 values (`planned → spec-drafting → spec-complete → in-progress → review → complete + paused/blocked/abandoned` per Codex CLAUDE.md). CC's `chapters: []` carries none.

9. **Hard Rules 1-12 compliance is `partial`** in the Foundation ledger — `data.js:599` notes per-commit canon-sweep + 79-check smoketest (current count in chronicle is 109) but formal Cipher session review is pending. The smoketest count and the criterion note disagree numerically; either is plausibly out-of-date relative to the other.

10. **`CC.CODEX.strategy`** at `data.js:618` is set to `'runtime_fetch_with_local_cache_fallback'` while marked `// TBD by Builders`. A decision has been quietly shipped without ratification.

---

## 12. Counts — entities for ingestion

**Resident in Command-Center repo, ready for ingestion:**

| Entity | Count | Source |
|---|---|---|
| Volume metadata (CC entry, proposed amendments) | 1 (1 update) | `volumes.json:1147-1196` |
| Chapters (proposed from commit history + Foundation criteria) | 4-5 candidates | derived: foundation-v0.1, foundation-v0.2, consul-chamber, consul-speaks, rung-5-spec-mirror |
| TODOs | 4 (open, per decree-0003) | `decrees/decree-0003-session-chronicle.json:82-87`; 0 open in CC's volume; 1 open + 1 resolved in Codex's CC volume entry |
| Canons (decree-minted, ratified, scope global) | 4 | gov-007, gov-008, gov-009, gov-010 |
| Local invariants / architectural rules (not yet canonized) | ~6-8 | Charter Art 5; HR 1-12; Ostia contract; build.sh discipline; spatial metaphor; residence concept |
| Schisms (explicit) | 0 (in CC's tree) | — |
| Schisms (implicit, candidate-minting) | ~3-4 | orientation-lock withdrawal; async fallback-retry pattern; runtime-vs-bake (unresolved); palette placeholder |
| Lore (chronicle) | 1 (lore-009) + 1 referenced (lore-007) | `decree-0003.json:15` |
| Lore (cautionary) | 1 (lore-008 / Codex's lore-012) | `decree-0002.json:76` |
| Lore (origin / doctrine / edicts) | 0 native | — |
| Apocrypha — foretold | ~8-10 | ROADMAP 5 stages + named-pending items; multi-session governance flow; Praetorium; Capital Occupancy UI |
| Apocrypha — forgotten/drifted | ~4-6 | Book IX→III ref drift; 14→15→16 room drift; Strategy TBD silently shipped; chapter-enum absence |
| Apocrypha — fulfilled | ~11-13 | Foundation criteria complete |
| Specs (spec-shaped local docs) | 7 | CHARTER, ARCHITECTURE, ROADMAP, tools/README, 3 agent/skill specs |
| Specs (handoffs) | 1 | AURELIUS_COMPANIONS_VIEW.md |
| Companion-log entries (resident) | 1 | s-2026-04-17-01 |
| Decrees | 3 | 0001, 0002, 0003 |
| Doctrine-ledger entries (CC-native) | 0 | — |
| Companions referenced (full Order roster in Appendix C placeholder) | 17 + 1 institutional | `split/data.js:434-453` |

**Rough subtotal for CC-native ingestion:** ~55-70 discrete entries depending on how aggressively chapters, schisms, and apocrypha are minted from narrative material. This is below the implied per-Province quota in a ~400-entry, 11-Volume campaign (~36/Province average) for *explicit* records, but the cross-Province ripples and the spec-mirror layer push the Monument's true cross-cutting weight well above average.

---

## Open rulings for the Chronicler

1. **Frozen-state vs Codex-archive divergence.** Command-Center's tree is frozen at a Foundation-stage moment with three significant late additions. The post-21-April institutional work (Priesthood, Basilica, Rite Catalog, decree-0004, Companions view ratifications, Orinth's persona transition, Phase 4 doctrines) is all chronicled in Codex but has not been mirrored into Command-Center's own files. Reconcile via volume-entry amendment, or accept the divergence as the Ostia contract operating exactly as designed?
2. **decree-0003 ID collision** — CC's local decree-0003-session-chronicle vs Codex's decree-0003-constitution-book-i. Codex side is canonical. CC needs renumbering or Province-scoped ID (e.g., `cc-decree-0003`).
3. **`sep-dashboard` missing from `CC.PROVINCES`** registry while present in `CC.RESIDENCE`. Theron has a home with no gate. Fix in CC code or accept gap?
4. **lore-008 renumbering** to lore-012 in Codex — 5 references in CC repo still say lore-008. Sweep or accept stale references?
5. **Companion log migration cleanup** — CC origin copy of `companion-log-s-2026-04-17-01.md` is to be deleted per `companion-logs.json:571`; still resident.
6. **chapters[] backfill** for CC volume — 4–5 candidate chapters (foundation-v0.1, foundation-v0.2, consul-chamber, consul-speaks, rung-5-spec-mirror) currently absent.
7. **current_phase update** to reflect 16 rooms + Foundation 11/13 + Consul speaks + Rung 5 deploy.
8. **`CC.CODEX.strategy` quietly shipped** — `'runtime_fetch_with_local_cache_fallback'` marked TBD but in production. Ratify or revise?
9. **Decree-0004 (Basilica + Priest)** is `province_of_origin: "command-center"` but authored Aurelius-solo; proposes retiring Gates + Visiting Chambers in favor of embassies. Structural pivot not implemented in CC. Implement or annotate as planned-but-deferred?
10. **Hard Rules formal Cipher review** still partial per Foundation ledger. Schedule the review or accept the partial?
11. **Decision request from Scout:** characterize the schism candidates (orientation-lock withdrawal, async fallback-retry, runtime-vs-bake, palette placeholder) as full mintable records, or has Aurelius got the shape needed to begin the campaign?

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
