# Rung 1 Rationale — The Compass Sections

**Canon-cc-027 Rung 1 artifact.** Chronicler-proposed amendments to five subagent spec bodies, entering the Edict V signing chain at spec-body altitude. This document accompanies the `## Compass — session-earned bearings` sections added to `docs/specs/subagents/{cipher,chronicler,lyra,maren,kael}.md` and names what is being added, what evidence motivates it, and what must follow once the chain ratifies.

**Placement note.** Precedent for a single-persona Rung 1 artifact is `docs/specs/subagents/cipher-rung1-rationale.md`. This batch spans five personas and both spec trees in intent, so it sits one level up at `docs/specs/`. If Rung 2 prefers per-persona rationale files, this document splits cleanly along its §5 rows.

---

## 1. What is being added

One new section per spec body, inserted immediately after `## Heuristics` and before each spec's lens section:

| Spec | Section | Bearings |
|---|---|---|
| `subagents/cipher.md` | `## Compass — session-earned bearings` | 7 |
| `subagents/chronicler.md` | `## Compass — session-earned bearings` | 6 |
| `subagents/lyra.md` | `## Compass — session-earned bearings` | 6 |
| `subagents/maren.md` | `## Compass — session-earned bearings` | 5 |
| `subagents/kael.md` | `## Compass — session-earned bearings` | 6 |

**Nothing is removed. No existing line is changed.** Every edit is a pure insertion; the frontmatter, voice, heuristics, lens, return shape, non-negotiables, failure modes, modulator reference, and references sections of all five files are untouched.

## 2. What motivates it

The standing directive of the 2026-07-11 sitting, recorded at `docs/sessions/2026-07-11_THE_NIGHT_OF_THE_BORDERS_CHRONICLE.md` §8 (Open Threads):

> **Compass edits** to Companion / skill specs — this session's standing directive: give each spec a session-earned "compass" of navigational bearings, alongside its fixed north-star identity.

## 3. The north-star / compass distinction

The distinction is load-bearing and is stated in each inserted section's preamble so no future reader collapses it:

- **North star — fixed.** Voice, Heuristics, Non-negotiables. These are identity. They were true before the persona ran a single session and they do not move because a session went badly. They derive from the persona's ratified profile in `data/companions.json` under canon-cc-012.
- **Compass — earned.** Operational bearings accumulated from the Republic's own record. Each is dated, each cites its source, each is actionable at invocation time. The compass is expected to grow; the north star is not.

Placement after `## Heuristics` is deliberate: the chronicle's phrasing is "alongside its fixed north-star identity," and Heuristics is the craft core of that identity. Adjacency makes the contrast legible in a single screen.

## 4. Why these five personas

Selection is evidence-bound, not alphabetical. A compass bearing must cite a real instance from the Republic's record; a persona with no accumulated operational corpus would receive invented bearings, which is precisely the drift canon-cc-027 exists to prevent.

The five drafted here are the personas with substantial entries in `docs/doctrine-ledger.md`, the WAR_TIME and Phase 4 chronicles, and the 2026-07-11 ASI gap table.

**Deliberately deferred to a later Rung 1** — no sufficient evidence base yet, or a governance question first:

- `subagents/consul.md` — Consul operates under the canon-cc-014 interim; bearings should wait until the interim resolves.
- `subagents/vela.md` — canonical specs ratified 2026-05-23 (canon-gen-001); operational corpus is thin.
- `subagents/scribe-{scout,draft,verify,record}.md` — the Scribe Worker Tier was established 2026-05-22 (canon-proc-006) and Scribes absorb the voice of whoever they serve (Book VIII Art. 4). Whether a Scribe carries a *persistent* compass at all, or inherits its principal's, is a genuine governance question and belongs to Rung 3, not to a Chronicler's assumption.
- All eight `docs/specs/skills/*.md` bodies — the skill mode is an in-transcript register-flip, not a separable-artifact mode. Whether a hat-switch body should carry the same compass as its subagent twin, or a compressed form, is a canon-cc-023 binding question worth asking explicitly rather than answering by symmetry.

## 5. Evidence per bearing

Every bearing traces to a committed artifact. No bearing is authored from session memory alone.

**Cipher** — `docs/doctrine-ledger.md` RATIFIED rows (`hermetic-floor-doesnt-substitute-for-production-floor`; `architectural-sweep-PR-misses-sibling-sites`, 3/3 at PR-40), active candidates (`architectural-shift-PRs-bias-toward-r1-catch-cycle` 2/3; `Cipher-self-ack-as-doctrine-seed-cycle` 1/3), the watch-list entry `bulk-substitution-must-distinguish-string-quote-contexts-from-template-literals` (SproutLab PR #74 V-M-1), `canon-cc-034` rationale in `data/canons.json` (byte-identity necessary-not-sufficient), and the Cabinet-eligible meta-observation *Independent-jurisdictions-empirically-miss-Sovereign-floor-catches* (2026-05-05). The final bearing (clean textual merge ≠ clean semantic merge) is **first-instance, surfaced 2026-08-03** during the open-PR triage — per Lean-Machine §B it is a watch-list observation and carries no counter.

**Chronicler** — the carrier-decay bearing is **first-instance, surfaced 2026-08-03**, evidenced by `memory.md`'s own three-month drift and by PR #68 having sat unmerged since 2026-05-17; watch-list, no counter. The remaining bearings cite RATIFIED Phase 4 native #6 (`sub-phase-close-was-premature`, four close-shifts), Lean-Machine §B and §C, the Cabinet-eligible *Cross-cluster-doctrine-portability* observation (2026-05-16), and the deferred structured-records note in commit `b87c517`.

**Lyra** — ledger rows D6 (`builder-may-improve-on-prescription`), `running-beats-reading-even-from-Cipher's-side`, Phase 4 native #3 (`narrow-scope-and-defer-broader-audit-to-R-10`, with the 2026-05-03 Lyra item-8 reachability calibration), Phase 4 native #4 (`concurrent-operations-interfere-with-parallel-stress-matrix`), and the 2/3 candidate `manifest-auto-bump-guarantees-parallel-PR-rebase-conflicts`. The brief-drift bearing cites the 2026-07-11 chronicle §8 and is recorded as **open**, not resolved.

**Maren** — the Sovereign-locked Governor auto-invocation directive (PR-26), the 1/3 candidate `Kael-Mode-2-predictions-verify-empirically` read from the Maren side (Mode 1 audit catches as a distinct jurisdiction), the 2/3 umbrella `cross-Governor-jurisdictional-discipline` with its four observed shapes per the Aurelius PR-29 ruling, RATIFIED `hermetic-floor-doesnt-substitute-for-production-floor`, and the social-attestation clause of the 2026-07-11 defense doctrine (§4).

**Kael** — the Sovereign-locked auto-invocation directive (PR-26), the 1/3 candidate `Kael-Mode-2-predictions-verify-empirically` (F-35.1 and F-36.2 confirmations), the 2026-07-11 ASI gap table (crash circuit breaker named among the standing greens in §3; ASI06 memory-poisoning named the reddest cell with `core.js:639–658` cited), the Willison detection-is-not-a-defense reading (§2), and Phase 4 native #4.

## 6. Downstream artifacts that must follow ratification

- **Rung 5 deploy.** Under canon-cc-026 these five canonical bodies deploy byte-identical into each Province's `.claude/agents/`. Cipher's deploy list is Codex + SproutLab + MSc (MSc added 2026-05-19 per canon-inst-004); Lyra, Maren, and Kael are SproutLab-scoped; the Chronicler's deploy list follows its Invocation Modes Registry row. **No deployable mirror has been touched by this draft** — Codex's `.claude/agents/` currently carries only the four Scribe files, so no local drift is introduced. Deploy is Rung 5 Builder work, after ratification, and must be verified per canon-cc-034 (loader discovery, not merely an empty diff).
- **Doctrine ledger.** `docs/doctrine-ledger.md` is stale at 2026-05-16 and must be brought current before it can absorb the two first-instance watch-list entries this draft surfaces (Chronicler carrier-decay; Cipher semantic-merge). Both are recorded here so the ledger update has a source.
- **Interaction artifact.** Rung 2 Censor action records as an interaction-artifact under canon-cc-017 with this batch as the subject.
- **Companion logs.** If ratified, the compass shape is a change in how every future invocation of these five personas is briefed; canon-0053 companion-logs for the affected personas should note the shape change.

## 7. Chain state

| Rung | Who | Status |
|---|---|---|
| 1 — proposes | Chronicler (Aurelius) | **Complete** — this draft |
| 2 — Cluster Censor reviews | Cipher (Cluster A) | **Pending.** See conflict note below. |
| 3 — Consul working-ratification | Consul | Pending |
| 4 — Sovereign ratifies | Sovereign | Pending |
| 5 — Builder deploys mirrors | Orinth (Codex) / Lyra (SproutLab) | Pending |

**Rung 2 conflict note.** This batch includes `subagents/cipher.md`. Under canon-cc-027 §Censor-Self-Review-Case, Cipher may not review his own spec body — that portion falls to **Nyx** (Cluster B Censor), chronicled as exceptional. Two clean paths, and the choice belongs to Rung 3 rather than to the drafter:

- **(a) Split the batch** — Cipher reviews the chronicler/lyra/maren/kael compasses; Nyx reviews the Cipher compass alone.
- **(b) Route the whole batch to Nyx** — one reviewer, one interaction-artifact, at the cost of Cluster B reviewing four Cluster A bodies.

The Chronicler's recommendation is **(a)**: it keeps Cluster A bodies under Cluster A's Censor and confines the exception to exactly the clause that requires it.

— Rung 1 drafted by Aurelius, Chronicler of the Republic, 2026-08-03.
