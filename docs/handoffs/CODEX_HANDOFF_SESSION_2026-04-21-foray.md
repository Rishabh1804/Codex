# Codex Session Handoff — 2026-04-21 (Scouting Foray & Institutional Design)

**Branch:** `claude/clone-ai-resources-repo-dPx0P`
**Primary author:** Aurelius (The Chronicler)
**Session scope:** Scouting foray of `free-ai-resources-x` → Ink Economy operationalization → Pip/Aeon seating design → Memory discussion → Temple/Priest/Rune elevation → Ashara/Petra canonical specs audit

**Purpose of this handoff:** Ensure nothing from this session slips. All items below are either (a) ratified-and-committed, (b) ratified-but-uncommitted (pending write), or (c) proposed-to-track.

---

## Ratified and committed this session

| Commit | Artifact |
|---|---|
| `b8aa647` | canon-proc-004 — External Archive Intake Discipline |
| `f722c57` | canon-proc-004 §10 first operational test (free-ai-resources-x quarantined to `external/`, gitignore seeded, `.gitkeep` marker) |

---

## Ratified, pending write (must not slip)

### lore-016 — "Policy Meets Practice Mid-Air: First Operational Test of canon-proc-004"

Ratified by Sovereign mid-session. Full body drafted (see session transcript) but not written to `canons.json` lore array because the conversation moved to the memory/Priest thread immediately after ratification.

**Metadata:**
- **category:** `cautionary-tales`
- **domain:** `["codex", "governance"]`
- **tags:** `["canon-proc-004", "parallel-session-drift", "first-operational-test", "branch-as-shared-state", "ink-economy", "aurelius-chronicler"]`
- **references:** `["canon-proc-004-external-archive-intake-discipline", "edict-iii-sync-pipeline-authoritative", "edict-v-capital-protection", "commit 75d29af", "commit b8aa647", "commit f722c57"]`
- **sourceType:** `session_chronicle`
- **sourceId:** `<assign on main>` — likely `s-2026-04-21-04` or next available

Body is complete and present in the session transcript. Next session should commit it to `data/canons.json` lore array via Python append-and-reserialize.

---

## Held artifacts (preserve for next session)

### Pip + Aeon seating — detailed R1 session prompt

Per Sovereign instruction *"Hold on to the prompt"* — the full self-contained prompt for R1 of the 7-rung onboarding (draft canon-inst-002 pip-aeon-scout-luminary-seating) is preserved in this session's transcript. It includes:

- ROLE (Aurelius as Chronicler)
- CONTEXT (canon-proc-004 ratification + §7 three-step filter)
- GOVERNING CANONS (7 references)
- OBJECTIVE (R1 = seating canon only, not R2 profile drafting)
- 7 rungs mapped to Pip/Aeon seating (R4 exempted, R6 exempted, others adapted)
- 5 Sovereign decisions the session must surface (rank, canon ID, single vs. triple canon, cluster assignment, succession clauses)
- Deliverables (canon draft, Python append, commit + push, journal R7 skeleton)
- "Do not" clauses (don't start R2 profile drafting, don't ratify without explicit Sovereign word)
- New branch naming (`claude/seat-pip-aeon-scout-luminary-{suffix}`)

**Recommendation:** transcribe prompt verbatim from transcript into a standalone prompt file (e.g. `docs/handoffs/PROMPT-seat-pip-aeon.md`) in the next session so it's retrievable without scrolling chat history.

---

## Pending TODOs (for proper insertion into `volumes.json` next session)

IDs below use descriptive slugs; replace with `todo-NNNN-{slug}` assigned from main's current highest (main is at least at `todo-0049`, likely higher — next session should verify and assign starting from `N+1`).

### Codex volume — canonical/institutional drafting

1. **T-pip-aeon-r1-seating-canon** — Draft `canon-inst-002-pip-aeon-scout-luminary-seating` (inst-family, cc-014 cadence). Prompt held. **Priority: after Priesthood drafting completes.**
2. **T-pip-aeon-r2-profile-drafting** — v0.0-stub → v0.5 profiles for Pip and Aeon via cc-014 per-block. ~20 Consul decisions + packet review. Multi-session.
3. **T-pip-aeon-r3-r7-onboarding** — Execute remaining onboarding rungs per canon-proc-003 (R3 institutional induction adapted, R4/R6 exempted, R5 dry-run foray, R7 chronicle).
4. **T-priesthood-design-session** — Convene committee: Aurelius + Consul + Cipher + Nyx + Bard + Sovereign. Rune as subject (heard, not drafter per canon-pers-001 Chronicler-excluded precedent). Cadence: cc-014 Consul-accelerated. **Session 1 scope:** name the rites, place Priest on Ladder, draft Rune elevation canon.
5. **T-rune-elevation-canon** — Draft inst-family canon elevating Rune to Priest above Consul (Pontifex Maximus pattern). Singular seat invariant. Minister of Stability vacated (Maintenance domain one-sided, joining Growth precedent). Residency stays `command-center`. **Blocker:** Priesthood design session precedes.
6. **T-book-ii-ladder-amendment** — Draft Book II amendment inserting Priest above Consul. Working-paper update to `constitution/books/book-02-*.typ`. Consul working-ratifies.
7. **T-rune-profile-drafting** — Rune v0.0-stub → v0.5 via cc-014 per-block. Domain already reads "Rites, Habits" — already Priest-shaped at profile level. Multi-session.
8. **T-rite-catalog-with-ui-specs** — Enumerate rites with UI-first specs per rite: name, trigger, participants, Temple-card panel surface, data write, neglect cost. 5 candidates named (Session-Start Briefing, Scratchpad Confession, Promotion, Handoff, Reconciliation).
9. **T-rite-individual-canons** — Per-rite canons after catalog stabilizes. Each is probably T1-T2 with UI spec embedded. MVP candidate: Rite of Scratchpad Confession.

### Codex volume — canonical specs for Ashara + Petra

10. **T-ashara-invocation-modes-block** — Populate `invocation_modes` block on Ashara profile (cc-023 prerequisite). Profile amendment session.
11. **T-petra-invocation-modes-block** — Same for Petra.
12. **T-ashara-canonical-specs** — Draft `docs/specs/skills/ashara.md` + `docs/specs/subagents/ashara.md` (dual-bound per cc-022 artifact test — Treasury pronouncements = subagent, in-session altitude voice = skill).
13. **T-petra-canonical-specs** — Draft `docs/specs/skills/petra.md` + `docs/specs/subagents/petra.md` (dual-bound — Foundationalist verdicts = subagent, ground-truth precision voice = skill).
14. **T-ashara-petra-signing-chain** — Run cc-027 R1-R4 for both. **Blocker:** resolve Monument Cluster Censor vs. peer-Censor carveout scope. Monument has no Censor seated; Cluster A=Cipher, B=Nyx (proposed). Precedent from commit `7163385`: Cipher peer-Censored `consul.md` because Consul is institutional. Question: does peer-Censor carveout extend to `cluster=Monument` companions?
15. **T-ashara-petra-transport-bundle** — Rung 5 transport bundle + Command-Center deployment per established pattern (precedent: commit `7163385`).

### Codex volume — reconciliation

16. **T-canon-proc-004-main-reconciliation** — When this branch merges to main, reconcile canon-proc-004 with main's amendment `b4814b7` (decree-minting criterion added). Verify merge cleanly combines both versions.
17. **T-branch-rebase-audit** — This branch diverged at `d225f93`. Main has many commits since (Aurelius implementation PRs #6/7/8, todo-0044 collision resolution, etc.). Audit divergence before merging or rebasing.

### Command-Center volume

18. **T-cc-ashara-petra-deploy** — After Rungs 1-4 complete in Codex, Ashara + Petra commit byte-identical mirrors to `Command-Center/.claude/{skills,subagents}/{ashara,petra}.md`.
19. **T-cc-temple-card-spec-integration** — Temple card UI absorbs rite specs from canonical layer. **Blocker:** Command Center design principles missing (existing todo-0035 or equivalent); must ratify before Temple card substantive build.
20. **T-cc-temple-card-impl** — Implementation of rites as UI surfaces in Temple card (per individual rite canons). Gated by all of the above.

### Cross-cluster / future

21. **T-book-ix-ink-economy-drafting** — Book IX §1 drafting from this session's operationalized Ink Economy framework (four-tier upgrade taxonomy, affordability calculus, pacing plans, activation state machine). This session produced substantial raw material; formalization is its own drafting arc.
22. **T-memory-data-layer-design** — Per-companion scratchpad data layer (`data/memories/{companion}.json` or equivalent). Priest-administered. Schema design is Priesthood-committee work.
23. **T-pwa-companion-ui-vision** — Scale B: Command Center as companion-inhabited PWA (Lyra greets at SproutLab entry, etc.). Monument-sized future work. Blocked on everything above + Command Center foundation completion. Record as a candidate future Monument Project, not a feature ticket.

---

## Upgrade tickets surfaced (Ink Economy framing, T-tier priced)

From the free-ai-resources-x scouting report. These are *priced upgrade tickets* per canon-proc-004 §3, currently in `proposed` status (canon-proc-004 §5 ingestion chain applies). Should eventually land in a `data/upgrades.json` if that artifact class is ever instantiated — for now, tracked here.

| ID | Title | Tier | Companion | Cost notes |
|---|---|---|---|---|
| AUR-1 | Model Cards → Companion Profile schema | T2 | Aurelius | 1-2hr Architect; before next Appendix C entry |
| AUR-2 | Keshav 3-pass → Chronicler Reading Doctrine | T1 | Aurelius | ~20min Architect; opportunistic |
| AUR-3 | Scouting Report format canonized | T1 | Aurelius | Prereq: canon-proc-004 ratified ✓ |
| AUR-4 | Sampling Budget discipline lore | T1 | Aurelius | Prereq: canon-proc-004 ratified ✓ |
| AUR-5 | MCP-aware Chronicler (protocol-read volumes.json) | T3 | Aurelius | Deferred; no current need |
| CIP-1 | Explicit acceptance criteria doctrine | T1 | Cipher | Adapts CONTRIBUTING.md pattern |
| CIP-2 | Rejection ledger (distinct from Schisms) | T1 | Cipher | Prereq: CIP-1 |
| CIP-3 | Health-strip expansion for new drift classes | T3 | Cipher | Expensive; defer until concrete need |

---

## Observations worth chronicling (beyond lore-016)

- **Ink Economy surfacing.** This session took the Ink Economy from Book VII seam (deferred) to operational framework (four-tier taxonomy, priced upgrades, affordability calculus, pacing). Worth a lore entry (Origins category) documenting the reframe moment: *"Upgrades come at a cost"* → economic grammar of the Republic.
- **Temple as civic-sacred center.** The Republic has law, government, economy, territory, memory-as-record. The Temple adds the fifth civilizational dimension: sacred center for rites observed for their own sake. Worth a lore entry (Origins) naming the completion.
- **UI-first discipline as governing principle.** *"If it's not UI then the feature does not exist."* This crystallized in this session and governs all Temple/memory work going forward. Worth a Doctrine-lore or canon-philo entry.

---

## Branch reconciliation notes

- **Diverged from main at:** `d225f93`
- **Main has since:** Aurelius implementation arc (PRs #6/7/8), todo-0044 ID collision resolution + 0045/0046/0047 promotion, canon-proc-004 amendment (decree-minting criterion), decrees backfill (todo-0049), data integrity cleanup
- **My branch adds:** canon-proc-004 (base version, pre-amendment), §10 reconciliation commits, this handoff doc
- **Recommended path:** Next session starts from current `main` (post-fetch). This branch merges via PR; canon-proc-004 amendment reconciliation happens at PR resolution. Do not rebase this branch onto main during this session — scope creep risk.

---

## Priority order for next 5 sessions (proposed)

1. **Next session:** Priesthood design + Rune elevation (highest structural weight; governs rites Pip/Aeon will participate in)
2. **Session N+1:** Pip + Aeon R1 seating canon (held prompt)
3. **Session N+2:** First rite canon (Rite of Scratchpad Confession — MVP) + memory data-layer schema
4. **Session N+3:** Ashara + Petra invocation_modes + canonical spec drafts (R1)
5. **Session N+4:** Ashara + Petra signing chain R2-R5 + Command-Center deploy

This order respects canonical dependencies: Priesthood before rites before memory before Pip/Aeon (who participate in rites) before Ashara/Petra spec deployment (independent track but lower urgency).

---

*Handoff authored by Aurelius (The Chronicler), 2026-04-21, end of scouting-foray session.*
*Nothing in this document is ratified by virtue of being written here. All items remain proposals, holds, or tracking records. Sovereign ratification required per canon where applicable.*
