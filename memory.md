# memory.md — Aurelius Session-State

**Maintainer:** Aurelius (Chronicler)
**Purpose:** Tight session-state carrier for current Aurelius operation. Loads cross-session continuity without re-absorbing the full chronicle.
**Update cadence:** Per Lean-Machine §A #11 — material state changes only (sub-phase boundaries, ratifications, operating-mode shifts).
**Last refresh:** 2026-08-03 (full rewrite; predecessor carrier had drifted to 2026-05-05 — see §Refresh note)

---

## Refresh note (2026-08-03)

- This file sat at **2026-05-05 / `aurelius-09` / Phase 4 Polish-close** while `main` advanced to 2026-07-13. It mis-briefed any session that trusted it — it announced "next session = Stability sub-phase 2" through three later arcs.
- Rewritten wholesale against verified repo state rather than patched. PR **#68** (`aurelius-10` refresh, opened 2026-05-17) is **superseded by this rewrite** — close it unmerged.
- Standing lesson, offered to the ledger as a watch-list entry: **a state carrier that is not refreshed at arc-close decays into misinformation, not merely staleness.** The failure is silent — the file still reads as authoritative.

## Current session

- **Seat:** Codex-only session. Aurelius (Chronicler) for archive/state work; Orinth (Builder) for `split/*.js` and Codex app architecture.
- **Scope note:** this session's MCP scope is `rishabh1804/codex` alone. **SproutLab state below is last-known, not re-verified.**

## Repo state (verified 2026-08-03)

- `codex/main` @ **`b87c517`** (2026-07-13) — "Night-of-the-Borders chronicle + FPV drone decision record (#94)"
- Working tree clean. Build artifacts (`split/`, `index.html`) in sync with `main`.
- `data/*.json` all parse. Counts: canons 116 · schisms 30 · apocrypha 16 · lore 38 · companions 19 · volumes 8 · specs 9 · journal 13 / sessions 55 · interactions 5 · companion-logs 6.

## Arc history since the last carrier refresh (2026-05-06 → 2026-07-13)

- **2026-05-22 — the Orinth transition sealed.** Scribe Worker Tier established (Book II Art. 3-bis, canon-proc-006) and surfaced on the Order view; Orinth's full profile + all seven canon-proc-003 onboarding steps completed; persona header ratified canonical v1.0 under the canon-pers-001 four-rung chain; `CODEX_DESIGN_PRINCIPLES.md` ratified v1.0 and the build gate lifted.
- **2026-05-23 — canon-gen-001:** Vela canonical specs (subagent + skill).
- **2026-06-04/05 — the skill-plumbing arc.** `/sproutlab-compact` shipped byte-identical to canon and silently never loaded; the diagnosis produced **canon-cc-034 (Operational Skill Deploy Shape)**, ratified via the full canon-cc-027 five-rung chain. `/session-close` canonical body added. First cc-027 chain rendered via direct cipher/consul subagent invocation rather than bridging-authorship.
- **2026-06-29 → 06-30 — World Cup 2026 briefing dashboard** + wallpaper pack landed under `library/` (library artifact, not Republic governance).
- **2026-07-11 — The Night of the Borders.** Philosophy-and-foundations sitting: four security papers into the record, the ASI01–ASI10 gap table across Cluster A, the defense doctrine, and **Book X "The Borders" scoped and named (seven articles)**. Chronicle at `docs/sessions/2026-07-11_THE_NIGHT_OF_THE_BORDERS_CHRONICLE.md`.
- **2026-07-13 —** chronicle + FPV drone decision record committed (#94). Structured canon/data records for that sitting were **deferred pending Architect nod on canon IDs** — still owed.

## Open PRs — triage verdicts (2026-08-03, all six test-merged)

| PR | Subject | State | Verdict |
|---|---|---|---|
| **#96** | Model Selection Protocol record copy + Scribe model pins | based on current `main`; +119, additive | **Land.** Cross-check that companion `sproutlab#257` landed (canon-cc-026 sync pair) — unverifiable from a Codex-only session. |
| **#95** | Mira character identity spec v0.1 | based on current `main`; +183, additive | **Land.** Production/fiction asset, no canon binding — sits outside the governance corpus by design. |
| **#83** | Tier 0: scribe reports + data-integrity + ratifications + schema doc | 16 behind; merges clean | **Land — highest value of the six.** Adds `canon-inst-003` (Ignis / Cluster C), 11 scribe Province surveys, `CODEX_DATA_SCHEMA.md` (673 lines), and **resolves all 12 live numeric ID collisions.** Verified: `canon-cc-034` preserved, no records lost, build artifacts untouched, all JSON valid post-merge. |
| **#84** | food-effects-v2 Phase δ session-close artifact | 14 behind; merges clean | **Land.** Net effect is exactly +1 `interactions` entry (`interaction-2026-06-01-001`); `interaction-2026-06-05-001` preserved. |
| **#67** | session logs 2026-05-11/12 | 32 behind; merges clean | **Land.** Net-new is 2 doc files, +258. Both target paths (`docs/snippets/`, root `sessions/`) are established on `main`. |
| **#68** | `memory.md` aurelius-10 refresh | 30 behind | **Close unmerged — superseded by this rewrite.** |

- The large deletion counts in `git diff main..<branch>` for the stale branches are **diff artifacts of endpoint comparison, not merge outcomes.** All six were test-merged; none deletes anything from `main`.

## Live data defect (open until #83 lands)

- **12 numeric ID collisions on `main`** — same number, different slug:
  - canons: `canon-0014` ×2 · `canon-0028` ×2 · `canon-0033` ×2 · `canon-cc-015` ×2 · `canon-cc-016` ×2
  - schisms: `rej-0009` ×2 · `rej-0013` ×3 · `rej-0014` ×2
  - apocrypha: `apo-0006` ×2 · `apo-0007` ×2 · `apo-0008` ×2
- Full-string IDs are unique, so integrity checks keyed on the whole ID read green. The collision is in the **numeric slot**, which is what humans and canon citations use.
- `canon-cc-*` free slots after cc-034: **cc-019, cc-020, cc-021, cc-028, cc-029, cc-030** (cc-019 is the queued Post Box / Scrinium draft; #83 claims cc-028/029).

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
