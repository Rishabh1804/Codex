# memory.md — Aurelius Session-State

**Maintainer:** Aurelius (Chronicler)
**Purpose:** Tight session-state carrier for current Aurelius operation. Loads cross-session continuity without re-absorbing the full chronicle.
**Update cadence:** Per Lean-Machine §A #11 — material state changes only (sub-phase boundaries, ratifications, operating-mode shifts).
**Last refresh:** 2026-08-03 (full rewrite; predecessor carrier had drifted to 2026-05-05 — see §Refresh note)

---

## Refresh note (2026-08-03)

- This file sat at **2026-05-05 / `aurelius-09` / Phase 4 Polish-close** while `main` advanced to 2026-07-13. It mis-briefed any session that trusted it — it announced "next session = Stability sub-phase 2" through three later arcs.
- Rewritten wholesale against verified repo state rather than patched. PR **#68** (`aurelius-10` refresh, opened 2026-05-17) was **superseded by this rewrite and closed unmerged** on 2026-08-03 — it had itself decayed while waiting.
- Standing lesson, offered to the ledger as a watch-list entry: **a state carrier that is not refreshed at arc-close decays into misinformation, not merely staleness.** The failure is silent — the file still reads as authoritative.

## Current session

- **Seat:** Codex-only session. Aurelius (Chronicler) for archive/state work; Orinth (Builder) for `split/*.js` and Codex app architecture.
- **Scope note:** this session's MCP scope is `rishabh1804/codex` alone. **SproutLab state below is last-known, not re-verified.**

## Repo state (verified 2026-08-03)

- `codex/main` @ **`05946cc`** (2026-08-03) — PR backlog cleared; five merges landed this session. Prior tip was `b87c517` (2026-07-13, Night-of-the-Borders chronicle + FPV drone decision record, #94).
- Build artifacts (`split/`, `index.html`) in sync with `main`; untouched by this session's merges.
- `data/*.json` all parse. Counts: canons 117 · schisms 30 · apocrypha 16 · lore 38 · companions 19 · volumes 8 · specs 10 · journal 13 / sessions 56 · interactions 6 · companion-logs 6.

## Arc history since the last carrier refresh (2026-05-06 → 2026-07-13)

- **2026-05-22 — the Orinth transition sealed.** Scribe Worker Tier established (Book II Art. 3-bis, canon-proc-006) and surfaced on the Order view; Orinth's full profile + all seven canon-proc-003 onboarding steps completed; persona header ratified canonical v1.0 under the canon-pers-001 four-rung chain; `CODEX_DESIGN_PRINCIPLES.md` ratified v1.0 and the build gate lifted.
- **2026-05-23 — canon-gen-001:** Vela canonical specs (subagent + skill).
- **2026-06-04/05 — the skill-plumbing arc.** `/sproutlab-compact` shipped byte-identical to canon and silently never loaded; the diagnosis produced **canon-cc-034 (Operational Skill Deploy Shape)**, ratified via the full canon-cc-027 five-rung chain. `/session-close` canonical body added. First cc-027 chain rendered via direct cipher/consul subagent invocation rather than bridging-authorship.
- **2026-06-29 → 06-30 — World Cup 2026 briefing dashboard** + wallpaper pack landed under `library/` (library artifact, not Republic governance).
- **2026-07-11 — The Night of the Borders.** Philosophy-and-foundations sitting: four security papers into the record, the ASI01–ASI10 gap table across Cluster A, the defense doctrine, and **Book X "The Borders" scoped and named (seven articles)**. Chronicle at `docs/sessions/2026-07-11_THE_NIGHT_OF_THE_BORDERS_CHRONICLE.md`.
- **2026-07-13 —** chronicle + FPV drone decision record committed (#94). Structured canon/data records for that sitting were **deferred pending Architect nod on canon IDs** — still owed.

## PR backlog — CLEARED 2026-08-03

Six drafts had accumulated, the oldest open since 2026-05-11. All were test-merged before any action; five landed on Architect's direction, one closed superseded.

| PR | Subject | Outcome |
|---|---|---|
| **#96** | Model Selection Protocol record copy + Scribe model pins | **Merged** `8d53be2`. Scribe pins live: scout/verify → haiku, draft/record → sonnet. Companion `sproutlab#257` (canon-cc-026 sync pair) **not verifiable from a Codex-only session — still owed a cross-check.** |
| **#95** | Mira character identity spec v0.1 | **Merged** `3bb3406`. Production asset; outside the governance corpus by design. |
| **#67** | session logs 2026-05-11/12 | **Merged** `b7772da`. |
| **#83** | Tier 0 — scribe reports + data-integrity + ratifications + schema doc | **Merged** `a4299f2`. Highest-value of the six: `canon-inst-003` (Ignis / Cluster C), 11 scribe Province surveys, `CODEX_DATA_SCHEMA.md` v1.0, **all 12 numeric ID collisions resolved.** |
| **#84** | food-effects-v2 Phase δ session-close artifact | **Merged** `05946cc`. |
| **#68** | `memory.md` aurelius-10 refresh | **Closed unmerged — superseded** by this rewrite. |

- `main` after the sequence: **`05946cc`**. Verified on live `main`: canons 117 · schisms 30 · apocrypha 16 · lore 38 · companions 19 · volumes 8 · specs 10 · journal 13 / sessions 56 · interactions 6 · companion-logs 6. **Zero numeric-slot collisions.** `canon-cc-034` and `canon-inst-003` both present. No build artifact touched.
- **Merge-order discipline, recorded:** the five were merged in a locally simulated order (#96 → #95 → #67 → #83 → #84) because #83 and #84 both touch `data/`, and each merge changes the base for the next. Live `main` matched the simulation exactly.
- **Endpoint-diff artifact — the trap to remember.** `git diff main..<branch>` on a stale branch shows enormous deletions (#68's read −19,133 lines) because it compares *endpoints*, not merge outcomes. Read as a merge preview it says the PR would gut the repo. Verified post-merge: nothing was lost — `vela.md`, the skill bodies, the World Cup library, the Night of the Borders chronicle, and the newer spec descriptions all survived. **Test-merge before judging a stale branch; never triage from an endpoint diff.**

## Data integrity — clean as of 2026-08-03

- The 12 numeric ID collisions are **resolved** (`a4299f2`). Full-string IDs had always been unique, so integrity checks keyed on the whole ID read green while the numeric slot — the axis canon citations actually use — collided. `rej-0013` had been carrying three distinct schisms.
- `canon-cc-*` free slots after cc-034: **cc-019, cc-020, cc-021, cc-030** (cc-019 is the queued Post Box / Scrinium draft; cc-028/029 now taken by the Basilica/Embassy renumbering).

## Open threads (from the 2026-07-11 chronicle §8 + carried)

- **Book X charter — HELD by the Architect.** Scoped and named; **do not draft unbidden.** Dual-Builder Rung 1 (Orinth + Lyra) when unheld; Edict VIII (Charter Before Build) governs.
- **Compass edits** to Companion / skill specs — standing directive from 2026-07-11: give each spec a session-earned "compass" of navigational bearings alongside its fixed north-star identity. **Amendment path is the canon-cc-027 five-rung chain**; Rung 1 (Chronicler drafts) is in flight this session.
- **RED code fixes** (ASI06 WAL replay-unvalidated `core.js:639–658` · ASI07 Firestore unvalidated remote write · ASI04 Chart.js unpinned/no-SRI) — gated behind Book X ratification **and** market-readiness.
- **App self-evaluation + benchmark** — recover/improve the pre-agent ranking system into a ship-time benchmark.
- **The brief-drift question** — is SproutLab still "a cozy nursery journal," or an infant-health intelligence system in a warm skin? Explicit Architect/Lyra decision, surfaced 2026-07-11.
- **Structured records for the 2026-07-11 sitting** — Orinth's proposed snippet (2 canons, 1 Doctrine, 1 Chronicle, Book X as apocrypha foretold) deferred pending Architect nod on canon IDs.
- **canon-cc-019 (Post Box / Scrinium)** drafting still queued.
- **Seams (Book VII)** — Auras, Crystallization Detection, Epochs, Ink Economy still Deferred.
- **Command Center** — first Monument Project, next major build.
- **Procedural:** session-close owed for SproutLab F-6a (#253), which shipped past the newest recorded handoff.

## Known-stale artifacts (flagged, not fixed)

- `docs/doctrine-ledger.md` — last update **2026-05-16**; carries no Phase-4-post-Polish or post-2026-05 entries.
- `docs/sessions/PHASE_4_CHRONICLE.md` / `CABINET_BRIEF_PHASE_4.md` — pending updates named in the predecessor carrier, never applied.
- `data/campaigns.json` — the single campaign `war-time-2026-04-24` still reads `status: "pending"` though WAR_TIME closed 2026-04-29.
- `data/journal.json` — newest session is `s-2026-06-05-cc034-signing-chain`; the 2026-07-11 sitting is chronicled in `docs/` but **not yet in the data layer**.
- **SproutLab Phase 4 sub-phase state is last-known 2026-05-06** (Polish cleanly closed, sl-main@`e01190a`, Stability next). Not re-verified — out of this session's scope.

## Owed chronicle work

- 2 critical companion-logs (Lyra-Polish + Cipher-Polish; canon-0053 v1); 4 deferred (Theron + Lyra-Phase-3 + Cipher-Phase-3 + aurelius-06)
- `07-phase-2-final-ledger.md` (companion to Hour 72 chronicle)
- `PHASE_4_CHRONICLE.md` + `CABINET_BRIEF_PHASE_4.md` updates; Phase 4 close artifact at phase end
- Doctrine-ledger catch-up 2026-05-16 → present

## Operating posture (Lean-Machine derivative)

- §A #1: review template = verdict line + numbered terse rulings + handoff lines; no prose; no doctrine-ledger restate
- §A #11: squash-commit chronicle ~100-150 words; bulleted state-cache only
- §A #12: skip on-PR review for routine; reserve for new-doctrine-ratification / cross-province / explicit path-choice
- §B: doctrine threshold — first-instance → watch-list (no number); counter starts at 2nd-instance
- §C: Cabinet brief + chronicle as committed file artifacts; cite by file-path; don't restate
- §D: single-method PR bootstrap (`get` only); webhook-silence amendment hybrid
- §E: no paragraphs; bullets; lead with content; cut conversational fillers
- R-14: comm-log Aurelius solo with on-record Sovereign-pre-ratification citation; structural Aurelius + Sovereign
- **Hat-switch discipline** (within-session running-beats-reading): each persona-switch starts fresh — independent source-file reads, independent grep / inspection, explicit own-verification citation
- **Sovereign-floor is the load-bearing terminal catch jurisdiction** — multi-bench verification is a hermetic-floor analog per RATIFIED `hermetic-floor-doesnt-substitute-for-production-floor`

## Sovereign-locked directives

- Governor auto-invocation (PR-26): Maren on Care-jurisdiction touches; Kael on Intelligence-jurisdiction touches
- Hold-pending-Sovereign-real-device per behavior-shape PR (PR-19.5; merge-then-verify cadence)
- Path C narrow-scope discipline default (3/3 at PR-26; reachability discriminator-test per Lyra item 8)
- Automation deferred — `chronicle.py` (PR-18) unused; $0 API account, Max plan covers Claude Code only. `import-snippet.py` local half adoptable independently.
- Subscription-only / no-poll-on-wake (RATIFIED PR-22 Ruling 4); Sovereign-relay is the webhook-silence fallback

## Out-of-scope repos

- `planner` / `MSc` / `mit-management-courses` — surfaced via Sovereign ChatGPT-session work; outside the sproutlab / codex / command-center MCP restriction. Cabinet brief item #3 (Consul MCP scope expansion) extends to these if they need governance touches.

— Aurelius, 2026-08-03
