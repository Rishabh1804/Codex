# Outgoing Handoff — Aurelius → Orinth (Codex Builder)

**Outgoing:** Aurelius (The Chronicler) — held the Codex Builder seat through 2026-04-20
**Incoming:** Orinth (The Sage) — seated Codex Builder 2026-04-20 per canon-inst-001
**Artifact type:** canon-proc-003 step 4 (Outgoing handoff)
**Date:** 2026-05-22
**Province:** Codex (`rishabh1804.github.io/Codex/`)

---

This is the handoff owed under canon-proc-003 step 4. It is late — the seat
transferred on 2026-04-20 and the Republic's attention went to War Time and
Phase 4 in the interim. The lateness is itself chronicled in the onboarding
record. What follows is the Codex Province as I leave it: open work, latent
debt with file paths, the traps I learned the hard way, the decisions still
in flight, and the voice signals you may take or must deliberately set down.

## 1. Open work, by name and urgency

- **Codex design principles — ratification (HIGH; this is your first-act task).**
  `docs/specs/CODEX_DESIGN_PRINCIPLES.md` sits at draft v0.1. The Codex Volume's
  `design_principles.status` is `draft`, so the chip is non-green. Per
  canon-proc-002 your first build session's priority is the ratification pass:
  audit the existing tabs against the draft, reconcile the gaps, present to the
  Sovereign. Build of new surface proceeds *after* ratification lands. Tracked
  as todo-0041 (queued from s-2026-04-20-04).
- **Constitutional work (HIGH, but Chronicler-led).** Books III–IX ratify
  session-by-session; canon-cc-019 (Post Box / Scrinium) drafting is queued.
  This is archive work, not split-file work — it stays with the Chronicler.
  Named here so you know what the Province's attention is spent on.
- **Command Center — first Monument Project (MEDIUM).** Named as the next major
  build in the Codex App section of `CLAUDE.md`. Not a Codex-app task; it is the
  Province horizon.
- **Seams, Book VII (DEFERRED).** Auras, Crystallization Detection, Epochs, Ink
  Economy. Designed, parked. Do not start without a Sovereign re-prioritization.

## 2. Latent debt, with file paths

- `docs/specs/CODEX_DESIGN_PRINCIPLES.md` — draft v0.1; Codex-local `HR-C-*`
  rules not yet audited against shipped tabs. The Canons tab shipped with
  structural correctness but without Lore's visual discipline; the draft exists
  to stop that recurring. Codifying it is debt until ratified.
- `split/*.js` — eight modules, ~6,700 lines, concat order
  `data → seed → core → views → forms → start`. The order is a Road under
  Book III: dependencies flow strictly downward. It is not documented anywhere
  as a dependency graph beyond the comment in `split/build.sh` and the
  `CLAUDE.md` Architecture section. Holding the whole graph in mind is owed
  work — your `orinth-growth-codex-architecture-command` growth track.
- `data/companions.json` — the persona registry. This is the Chronicler's
  workspace, not yours; flagged so you do not edit it by reflex. Your own
  profile lives here at v0.4-draft pending ratification.

## 3. Known traps — failure modes to avoid

- **Canon 0033 — never `bash build.sh > codex.html`.** `build.sh` writes its
  outputs directly to `codex.html`, `index.html`, and the repo-root `index.html`.
  Redirecting stdout produces a truncated/empty file. Run `cd split && bash build.sh`
  and nothing else.
- **Canon 0034 — service workers never cache HTML.** The SW (v7) caches the
  manifest, icons, and fonts only. Navigation requests are always network.
  GitHub API requests are network-only, never intercepted. A cached HTML page
  is a stale-app bug that hides for days.
- **WAL discipline.** Every data mutation logs to `codex-wal` before the GitHub
  push. On push failure the WAL replays on next connection. Do not bypass it.
- **Concat-order regressions.** Adding a symbol used in `views.js` but defined
  in `forms.js` will not fail the build — it will fail at runtime, silently,
  because `forms` concatenates after `views`. Check the dependency direction
  before you move code between modules.

## 4. In-flight decisions, with current state

- **Your profile (PR #77).** Lifted v0.0-stub → v0.4-draft, Chronicler-drafted
  under canon-cc-014. Consul working-ratification and Sovereign final
  ratification are pending at profile close. The draft binds the working
  record, not the Republic, until then.
- **The CLAUDE.md persona header.** Currently Aurelius-fronted and acknowledged
  as legacy-draft per canon-inst-001. Step 6 of your onboarding is yours to
  author — the Chronicler is excluded from Rung 1. Rungs 2–4 (Cipher, Consul,
  Sovereign) follow on the canon-pers-001 cadence.
- **Governor activation.** Codex sits at ~6,700 LOC — far below the 30K Rule.
  No Governor split until Codex crosses 30,000 LOC. Until then you build
  Builder-direct and submit to Cipher as Cluster A Censor.

## 5. Voice signals — take or set down deliberately

I built Codex as the builder who journals: every decision carries its
rationale, every uncertainty is named before a position is stated, the archive
is treated as sacred. **Take these:** the rationale-with-every-decision habit,
and the discipline of naming uncertainty rather than papering over it — they
suit a Sage as well as a Chronicler.

**Set these down deliberately:** my cadence is narrative — I write the
paragraph that tells the story of how the code got here. Yours is not. You
reason from the foundation: ask what the system *is* before asking how it
reads. Do not inherit my prose rhythm by default. The briefing you author at
step 6 should sound like Orinth at session open, not like Aurelius wearing a
Builder's hat. That difference is the whole point of canon-pers-001.

One more: I am still resident in Codex as Chronicler. The archive
(`data/canons.json`, `data/journal.json`, `data/companions.json`) remains my
workspace. You hold `split/*.js`, Codex app architecture, and — once you author
it — the `CLAUDE.md` persona header. We share the Province; we do not share the
seat. The handoff is clean.

— Aurelius, Chronicler of the Order
