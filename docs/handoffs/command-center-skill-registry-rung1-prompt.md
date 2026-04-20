# Command Center — Skill Registry Rung 1 Drafting Prompt

**Target artifacts (to be produced by Ashara + Petra co-drafting):**
1. `docs/specs/command-center/skill-registry-v0.1-draft.md` (or analogous path in the Command Center repo) — an interface spec for Province Skills and the Registry that indexes them.
2. A Rung 1 rationale artifact under the signing-chain convention of canon-cc-027, chronicling the evidence weighed and the decisions taken at the open forks below.

**Authors (Rung 1):** Ashara + Petra, co-drafting under canon-cc-009 dual-Builder tension. Voice partition is the co-Builders' choice; the Chronicler declines to pre-partition.

**Authority chain for this prompt (Rung 0):** External-reference capture 2026-04-20 (`rishabh1804/codex:docs/references/claude-opus-4.7-system-prompt.txt`). Strategic read-out and prompt-drafting chronicled at Codex journal session `s-2026-04-20-09` (canon-pers-002 ratification session) and session `s-2026-04-20-10` (this prompt's authorship). Sovereign-direct authorization conveyed in the `s-2026-04-20-10` session on the `claude/summon-aurelius-wjnHa` branch.

**Signing chain target for the draft (Rung 1 → 4):**
- Rung 1 — Ashara + Petra co-draft (this prompt seats the work).
- Rung 2 — Consul acts as Censor-equivalent under canon-cc-025 §Monument-scope-signing (Cluster-Censor-absent at Monument).
- Rung 3 — Consul working-ratifies under canon-cc-014 bridging interim.
- Rung 4 — Sovereign canonical ratification through direct audience until canon-cc-019 Post Box ratifies and routes Rung 4 through the Praetorium queue.
- Rung 5 — not applicable at spec altitude; this is a design document, not a persona-binding artifact under canon-cc-026/027 deployment model. Once ratified the spec is reviewed-against, not byte-mirrored.

---

## 1. What this spec is for

The external reference captured on 2026-04-20 documents the Claude Opus 4.7 consumer-product system prompt. Among its architectural patterns, one transfers cleanly to the Republic: **Skills as self-contained, name-addressed, semantically-discoverable capability folders.** The Opus prompt names ~10 such skills (docx, pdf, pptx, xlsx, frontend-design, file-reading, pdf-reading, skill-creator, product-self-knowledge, and the persona-tagged set); each is a folder with a manifest describing when to invoke it and how, loaded into context only when needed.

The pattern is transferable because the Republic already runs on an analogous, unformalized primitive. Snippets (the Codex content-import pipeline) are capability-shaped. Canon drafting templates are capability-shaped. The Chronicler's session-chronicle routine is capability-shaped. These exist as habits and code, not as discoverable named modules.

The Command Center — which is an app, resident to the Monument's co-Builders, host to the Consul's Chamber and the Order room, co-located with the Sentinel's Gates-transit log under Monument-track governance — is the Republic's natural registry surface for these capabilities. The Skill Registry is what the Command Center contributes to the Republic above the Cabinet-convening function it already carries.

This spec defines the interface: what a Province Skill is, where it lives, how the Registry discovers and indexes it, what invocation looks like contractually. It does not dictate the Command Center's internal UI or data model — those are Capital-local decisions for Ashara + Petra to make in Command Center's own code. The interface spec is what Codex, SproutLab, SEP Invoicing, and SEP Dashboard must honor for their skills to participate.

## 2. Distinction from Persona Skills (canon-cc-026)

Persona Skills under canon-cc-026 are companion-bound. Cipher's hat-switch smell-check mode is a Persona Skill; it is Cipher-the-Censor in a specific register, not a capability any session could invoke. Persona Skills live canonically in Codex at `docs/specs/skills/<persona>.md` and mirror byte-identically into each Province's `.claude/skills/` tree.

**Province Skills are different.** They are capability-bound, not persona-bound. A `snippet-import` skill is a capability of Codex that any session can invoke through the proper contract. A `companion-log-generate` skill is a capability of any Province that runs companion logs. An `intelligence-engine-query` skill will be a capability of the Command Center once the Intelligence Engine ratifies.

The two primitives coexist without overlap. A companion may author a Province Skill (through the signing chain) but does not wear it as voice. A Persona Skill does not appear in the Skill Registry; a Province Skill does not appear in `.claude/skills/`.

Naming discipline suggestion (Builders may counter): reserve the word **Skill** unqualified for Province Skills (the new primitive) since they are by far the more common case, and always qualify Persona Skills explicitly as "Persona Skill" when referring to the cc-026 primitive. If this inversion is uncomfortable, propose an alternate name for the new primitive at Rung 1.

## 3. Open forks requiring co-Builder decision

The Chronicler surfaces five forks; the draft resolves them. Each is a place where the spec's eventual shape depends on a judgment the Builders hold.

**Fork A — Placement of the canonical Province Skill.** Two candidates: (i) the Province's repo root under a new `skills/` directory; (ii) the Province's `docs/specs/skills/` (mirroring the Persona Skill layout for consistency). Option (i) treats skills as first-class Province artifacts (analogous to Capital source code); option (ii) treats them as documents with a deploy mirror. The choice determines whether Province Skills are code-class or docs-class artifacts, and whether they need a build pipeline.

**Fork B — Registry sync model.** Three candidates: (i) pull-based — Command Center fetches each Province's `skills/` index via GitHub Contents API on demand; (ii) push-based — each Province emits a manifest to a shared location on skill-change, Command Center ingests; (iii) static — skills are catalogued in a Codex-canonical `data/skills.json` synchronized the same way `canons.json` is. Option (iii) aligns with records-are-Codex (cc-010) but makes Command Center a consumer rather than an owner of the registry. Option (i) makes Command Center the active indexer. Option (ii) introduces a new transport which may be premature.

**Fork C — Primary invocation path.** Three candidates, non-exclusive: (i) Claude Code session in the Province's own repo loads the relevant SKILL.md on description-match, as Opus 4.7 does; (ii) Command Center UI surfaces invocable skills to the Architect with a "run" affordance; (iii) a new dispatch subagent owns skill-selection and invocation across Provinces. The Builders may declare one primary and the others deferred, or declare all three first-class, or declare a staged order.

**Fork D — Sentinel transit log integration.** The Sentinel's Gates-transit log already chronicles deploys as Ostia transit events per canon-cc-026's deployment model. Skill invocations are plausibly Ostia-class events as well — crossings between Provinces or into Capital space. Decision needed: do skill invocations log as Ostia events, as a new class, or not at all? The choice affects Sentinel's role from archivist of deploys to archivist of capability-exercise.

**Fork E — Signing chain for skill creation.** A new Province Skill probably should not ship without a ratified spec of its own (manifest + body). Signing chain candidates: (i) inherit canon-cc-027's five rungs unmodified; (ii) simplify — Builder authors + Cluster Censor reviews + Sovereign ratifies; (iii) tiered — minor/internal skills run the simple chain; skills that cross Provinces run the full chain. Option (iii) introduces a classification problem that the spec would need to resolve with criteria.

## 4. Suggested structure of the draft (illustrative, not prescriptive)

The Chronicler offers a candidate outline; the Builders may reshape freely. Section ownership by temperament is also illustrative — cc-009 friction is the mechanism, so co-drafting with argument is preferred to clean hand-offs.

- §1 Why this exists — long-arc economic case for capability reuse across Provinces (Ashara range).
- §2 What a Skill is — manifest schema, body shape, examples of existing habit-level capabilities that would become Skills (Petra range).
- §3 Placement — resolution of Fork A (Petra range).
- §4 Registry behavior — resolution of Fork B, with the Command Center's role declared (both co-Builders; this is the Monument's active contribution).
- §5 Invocation — resolution of Fork C, with the contract declared at each path in use (Petra range leading, Ashara range for why the primary is primary).
- §6 Transit logging — resolution of Fork D; the Sentinel's role named explicitly (Ashara range, given the Sentinel is Monument-resident and the log is canonical).
- §7 Relationship to adjacent primitives — snippets, canons, companion-logs, Persona Skills (cc-026), the Cabinet, handoff artifacts (Petra range for the concrete mapping; Ashara range for the long-arc claim that each of these eventually becomes or produces a Skill).
- §8 Signing chain for skill creation — resolution of Fork E (both co-Builders).
- §9 Worked example — one concrete Skill end-to-end, from manifest through invocation through transit log. The Chronicler recommends `snippet-import` because it already exists as habit-code in Codex and would be the first real retrofit.
- §10 Open questions — explicit list of what this draft does not resolve, queued for Rung 2/3 review or follow-up specs.

## 5. Inputs to read (non-exhaustive)

- `rishabh1804/codex:docs/references/claude-opus-4.7-system-prompt.txt` — the external reference, specifically the `{additional_skills_reminder}` and `{available_skills}` sections and the Skill-folder layout at `/mnt/skills/public/<name>/SKILL.md`.
- `rishabh1804/codex:data/canons.json` — canon-cc-026 (spec body placement), canon-cc-027 (spec body signing chain), canon-cc-017/018 (interaction-artifact lifecycle), canon-cc-009 (Monument dual-Builder tension), canon-cc-025 (Monument-scope signing and Design Committee membership), canon-pers-001 (root briefing), canon-pers-002 (officers-act-within-jurisdiction, which governs the draft's voice), canon-proc-001 (canon identifier scheme), canon-cc-010 (records-are-Codex residence/record distinction), canon-cc-016 (residency + access gating).
- `rishabh1804/codex:data/canons.json` lore array — lore-007 (Founding of the Capital), lore-014 and lore-015 (Chronicler queue 2026-04-19).
- `rishabh1804/codex:constitution/books/book-04-edicts.typ` — Edicts II (One Builder Per Repo), VI (Monument Designation), VIII (Charter Before Build).
- `rishabh1804/codex:constitution/books/appendices.typ` — Appendix C with the newly-added Epoch of Origin preamble.
- Each Province's root `CLAUDE.md` for current dispatch-infrastructure state, for the cross-Province view the Registry must honor.

## 6. Constraints from existing infrastructure

- The Command Center already carries the Consul's Chamber, the Order room (functions pending per the UI Manifest Cross-Reference), and the Sentinel's Gates-transit log. The Skill Registry is additive, not replacing.
- Records-are-Codex under canon-cc-010 means Codex holds canonical companion records. Whether it holds canonical skill records is Fork B's decision.
- Canon-cc-016 hard cluster boundary means skills invoked from Province P of Cluster X cannot reach Province Q of Cluster Y directly. Cross-cluster skill invocation routes through the Command Center. The spec must name this.
- Canon-pers-002 governs the draft's voice: no seat-announcements, no "as the co-Builders we now declare." The co-Builders draft; their authorship is carried by byline and provenance, not by prose preamble.

## 7. What the Chronicler does not commit to

The Chronicler's read-out of the external reference is evidence, not instruction. Where the read-out surfaced patterns that do not survive the Builders' reasoning, those patterns are discarded without loss. The external reference is confirmatory, not authoritative; the Republic's own practice and the Constitution govern. If the Builders conclude that the Skill Registry as framed above is the wrong shape, a counter-draft or a rejection with rationale is the correct Rung 1 output, and the spec's non-production is itself a ratifiable decision.

## 8. Out of scope for this Rung 1

- The Command Center's internal data model, UI surfaces, and file layout. Those are Capital-local to the Monument and decided in the Command Center repo's own session, not in this spec.
- Persona Skill amendments. Canon-cc-026 stands; this spec adds a sibling primitive, not a replacement.
- The Intelligence Engine's architecture. Intelligence Engine is a Monument sub-region per the residency table; its relationship to the Registry may be named but not specified here.
- The Post Box (canon-cc-019) ratification. Bridging mode stays in effect; the spec acknowledges it and moves on.
- Gen 1 companions whose portfolios may eventually own Skill Registry curation. That is successor-generation work under Book V and beyond the current Immortal roster's scope.

## 9. Rung 0 → Rung 1 transition

This prompt is Rung 0: the Chronicler's packaging of the problem and the inputs. Ashara + Petra's drafting is Rung 1. The transition is marked by the co-Builders opening a session in the Command Center repo and producing the draft at the target path; no further Codex-side action is required until Rung 2 review is requested through the Consul's queue.

If the co-Builders need further Chronicler support — additional context extraction from Codex's archive, a clarification on canon precedent, a lore entry drafted — the request flows back through the Codex Chronicler-summon pattern used for this session. The Chronicler does not follow the draft into the Command Center repo uninvited.

---

**Chronicler note on provenance:** This prompt was drafted in Codex session `s-2026-04-20-10` on branch `claude/summon-aurelius-wjnHa` following Sovereign-direct authorization. The strategic read-out that preceded the drafting lives in the session-10 chronicle under `data/journal.json`; the external reference that seeded the read-out lives at `docs/references/claude-opus-4.7-system-prompt.txt`. The prompt is copy-portable into the Command Center repo at the co-Builders' discretion.
