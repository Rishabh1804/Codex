# Scribe-Scout Survey — mit-management-courses

**Date:** 2026-05-24
**Province:** mit-management-courses (`/home/user/mit-management-courses`)
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey founding the mit-management-courses Province's archival profile.
> No existing volume entry in Codex's `data/volumes.json` (grep across all archive files
> returns 0). The Province is small, clean, scaffolded but learner-pass-empty — 48 commits
> in a single 41-minute founding burst on 2026-05-05, no activity since.

---

## 1. Identity & ownership

- **What it IS** — a personal repository that converts MIT Sloan Executive Education courses into "reusable skills, tools, prompts, frameworks, and project applications" (`/home/user/mit-management-courses/README.md:3`), explicitly framed as the management/leadership parallel to the MSc Data Science / AI repository (`/home/user/mit-management-courses/README.md:9-12`; `/home/user/mit-management-courses/CLAUDE.md:17-23`).
- **Builder candidate** — unstated in the repo. No companion is named in any file; CLAUDE.md is operating-style only, no persona binding (`/home/user/mit-management-courses/CLAUDE.md:1`). Git author is "Claude / noreply@anthropic.com". The current branch is `claude/codex-persona-registry-update-t3i7D`, suggesting Sovereign / Claude Code authorship rather than a seated companion. **Builder seat: unassigned and unproposed.**
- **Cluster proposal** — none stated locally. By analogy: MSc (the explicit parallel) is enrolled in Cluster A; CLAUDE.md root-context lists `mit-management-courses` among the "Out-of-MCP-scope repos" Sovereign surfaced 2026-05-05. Cluster assignment is a Constitutional question the local repo does not answer.
- **current_phase candidate** — `CLAUDE.md:52-56` states **"Current Active Course: Unlocking Your Leadership Signature"**; the README confirms only that course is `Active` (`/home/user/mit-management-courses/README.md:29`). Proposed `current_phase`: *Single active course — "Unlocking Your Leadership Signature" — Module 1–6 scaffold complete; learner outputs and reflection notes still blank.*
- **Last meaningful commit** — `9eac3d9 2026-05-05 14:48:44 +0530 Add repository operating guide`. All 48 commits land within a single 41-minute burst on **2026-05-05 14:07–14:48 +0530**. No commits since. The repository is effectively dormant after its founding burst.
- **CLAUDE.md / README.md** read — both present, both short, both authoritative for the survey (`/home/user/mit-management-courses/CLAUDE.md:1-61`; `/home/user/mit-management-courses/README.md:1-46`).

## 2. Active work — in-flight chapters/modules, TODOs

- **No TODOs file**, no checked/unchecked task lists anywhere, no in-flight markers. The "Current Active Course" line in `CLAUDE.md:54` is the only signal of active work.
- **Module scaffold for the active course** is complete-as-scaffold but **empty-as-content**. The six modules (`/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/syllabus.md:7-67`) each have a framework file, an assignment file, and templated output files. Output files (`outputs/leadership-signature-draft.md`, `outputs/leadership-story-final.md`, `outputs/leadership-development-plan.md`) carry **only template blanks** — no learner content filled in (e.g. `/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/outputs/leadership-signature-draft.md:5-27` shows empty bullets only).
- **Reflection journal, readings log, project-application tracker** are likewise pure templates (`/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/notes/reflections.md:9-28`; `notes/readings.md:9-22`; `notes/project-applications.md:9-17`).
- In-flight reading: the course is in a *"scaffolded, awaiting learner pass"* state. The Sovereign has built the loom; nothing is woven yet.

## 3. Canon-like artifacts (rules, conventions, study disciplines)

The Province carries **discipline canons, not architectural canons**. Strongest candidates for ingestion as Canons:

- **The Course Conversion Pipeline (5 stages)** — `/home/user/mit-management-courses/LEARNING_SYSTEM.md:7-27`: Understand → Decompose → Operationalize → Apply → Skillify. Reads as a process canon.
- **Required Outputs Per Course (8 artifacts)** — `/home/user/mit-management-courses/LEARNING_SYSTEM.md:29-41`: course-brief, syllabus, module-map, frameworks, assignments, tools, project-applications, ai-skill-card. A canonical artifact list.
- **Standard Course Processing Flow (9 steps)** — `/home/user/mit-management-courses/CLAUDE.md:25-37`.
- **Working Style — 7 extracts per course** — `/home/user/mit-management-courses/CLAUDE.md:7-15`: core concepts · frameworks · decision tools · reflection exercises · business applications · assistant-ready skills · prompts and workflows.
- **Output Philosophy (8 forms)** — `/home/user/mit-management-courses/CLAUDE.md:41-50`: prompt · checklist · decision framework · diagnostic tool · meeting format · leadership behavior · project workflow · reusable skill.
- **Core Principle (6 mandatory outputs)** — `/home/user/mit-management-courses/README.md:17-23`.
- **Module 4-pass conversion logic** — `/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/module-map.md:14-19`: Concept → Reflection → Tool → Application.

Categorization note: these are *study disciplines* and *artifact recipes*, not Republic-level Canons. They may best ingest as **Province-scope Canons** or as a single **Doctrine Ledger entry** ("the MIT-courses conversion discipline"). Aurelius's call.

## 4. Schism-like artifacts (rejected approaches)

**None found.** No file mentions rejected approaches, "instead of", "we considered but", or alternatives-not-taken. The Province has no record of paths refused — likely because it is young (single 41-minute founding burst) and has not yet faced architectural choice. The closest implicit schism is the framing in `CLAUDE.md:7` *"Do not treat course material as passive notes"* — a rejection of the passive-notes mode, but no named alternative.

## 5. Lore-like artifacts (Origins, Cautionary Tales, Doctrines, Chronicles)

- **Origins** — none found in narrative form. The closest origin signal is the README's framing of repo purpose (`/home/user/mit-management-courses/README.md:3-12`) and the parallel to MSc (`CLAUDE.md:17-23`). No "the day this was founded" narrative exists.
- **Doctrines (management doctrines)** — strong harvest. The seven framework files in `courses/unlocking-your-leadership-signature/frameworks/` each codify a Doctrine in the management sense:
  - **Leadership Signature** — `frameworks/leadership-signature.md:1-23`
  - **Authenticity Paradox** — `frameworks/authenticity-paradox.md:1-22`
  - **Family Systems Model** — `frameworks/family-systems-model.md:1-26`
  - **4-CAP+ Model (Visioning/Relating/Inventing/Sensemaking + Personal Grounding)** — `frameworks/4-cap-plus-model.md:1-39`
  - **Immunity to Change** — `frameworks/immunity-to-change.md:1-28`
  - **Provisional Self Framework** — `frameworks/provisional-self-framework.md:1-23`
  - **Future Self Framework** — `frameworks/future-self-framework.md:1-22`
  Each carries Purpose · Core Idea/Structure · Template/Reflection Questions · Business Application — the shape of an ingestible Doctrine entry.
- **Cautionary Tales** — none found explicitly. *Implicit* cautionary content exists in the project applications: "Common Patterns" in family business (authority implicit instead of explicit, conflict avoided to preserve harmony) at `/home/user/mit-management-courses/projects/applications/family-business-leadership.md:7-15`; "Common delegation failure modes" at `/home/user/mit-management-courses/projects/applications/delegation-system.md:7-17`. These read as cautionary inventories, not as tales (no narrative arc). Categorization is ambiguous: ingest as cautionary tales **or** as part of the Doctrine entries.
- **Chronicles** — none found. No session logs, no narrative pass-throughs, no "Aurelius-08 session" equivalents.

## 6. Apocrypha-like artifacts (foretold / forgotten / fulfilled)

- **Foretold** — `/home/user/mit-management-courses/COURSE_INDEX.md:23-33` ("Planned Course Processing") lists artifact types every future course should produce — a foretelling of structure, not of content. `/home/user/mit-management-courses/README.md:25-29` foretells additional courses by leaving the *Current Courses* table extensible (only one row populated).
- **Forgotten** — none found. No archived/abandoned courses, no orphaned drafts. The 41-minute founding burst has not yet had time to forget anything.
- **Fulfilled** — none found in the Apocrypha sense (a prophecy realized). The skill-card output exists (`outputs/ai-skill-card.md:1-49`) but as artifact, not as fulfilled prophecy.

Categorization is ambiguous — the Province is too young to have meaningful Apocrypha. The COURSE_INDEX foretelling is the only candidate.

## 7. Specs (specs/ dir, course plans)

- **No `specs/` directory.** `find /home/user/mit-management-courses -type d` lists no specs path.
- **Course-plan equivalents** are spec-shaped, however:
  - **Course Brief** — `/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/course-brief.md:1-37` (provider, faculty, duration, core promise, practical interpretation, final output)
  - **Syllabus** — `courses/unlocking-your-leadership-signature/syllabus.md:1-67`
  - **Module Map** — `courses/unlocking-your-leadership-signature/module-map.md:1-20`
  - **Learning Objectives** — `courses/unlocking-your-leadership-signature/learning-objectives.md:1-22`
  - **Skill spec** — `/home/user/mit-management-courses/skills/leadership-signature/skill.md:1-34` (capability · inputs · workflow · output format)

These are *programmatic specs* — what the course must produce, what the skill must do — and can be ingested as Specs if Codex's specs[] entity supports non-engineering specs.

## 8. Companion-log-like artifacts (handoffs, session notes)

**None found.** No handoff documents, no session notes, no "this is where we left off" markers. The closest analog is the empty Weekly Reflection Template at `/home/user/mit-management-courses/courses/unlocking-your-leadership-signature/notes/reflections.md:5-28` — a stub for what would become companion-logs once a learner pass begins. No companion is named in any file (see §1).

## 9. Volume metadata for mit-management-courses

Proposed registration shape, modeled on the MSc entry (`/home/user/Codex/data/volumes.json:1399-1426`):

- **id** — `mit-management-courses`
- **name** — `MIT Management Courses`
- **shelf** — `active` (founded 2026-05-05; not abandoned, but **note dormancy**: no commits since founding burst — the case for `paused` is real. Local files claim active: `/home/user/mit-management-courses/README.md:29`)
- **description** (proposed) — *"The MIT Sloan Executive Education capability workspace — converting management, leadership, strategy, organizations, decision-making, and execution courses into reusable frameworks, tools, prompts, and AI skill cards. The management/leadership parallel to MSc (Cluster A capability surface). Repo rishabh1804/mit-management-courses."*
- **proposed current_phase** — *"Single active course — 'Unlocking Your Leadership Signature' (MIT Sloan Exec Ed, Deborah Ancona, 6 weeks). All six module scaffolds, seven frameworks, six assignments, five tools, five project-applications, and the Leadership Signature skill card landed in the 2026-05-05 founding burst. Awaiting learner pass — outputs/ files and notes/ files are template blanks."*
- **tags** (proposed) — `["capability-workspace", "management-education", "leadership", "cluster-a"]` (cluster-a contingent on Cluster assignment ratification)
- **repo** — `rishabh1804/mit-management-courses` (confirmed via `git remote -v`)
- **shelf_history** — single entry, `2026-05-05`, *"Founded in single-burst commit run 14:07–14:48 IST 2026-05-05 by Sovereign-direct authorship. No Builder seated. No Codex registration at founding. Volume entry created by canon-proc-006 scribe-scout campaign."*
- **chapters[]** — empty at registration; first chapter candidate = *"Founding burst 2026-05-05"* covering the 48-commit scaffold.
- **todos[]** — empty at registration. Candidate first TODO: *"Seat a Builder for mit-management-courses (no companion currently assigned)."*

- **domain_color: maroon — confirm / counter**:
  Existing Cluster A palette: SproutLab `#E8B4B8` (rose), Codex `#C4A87A` (gold/parchment), MSc `#7C9CBF` (blue-grey). Cluster B: SEP Dashboard `#7A9E7E` (sage), SEP Invoicing `#6B8EAD` (steel blue). Monument: Command Center `#8b7355` (taupe). Temple of Mars `#C41E3A` (true red). BusinessAI `#A08870` (umber).
  **Maroon** sits adjacent to Temple of Mars `#C41E3A` (true red) and Codex `#C4A87A` (parchment-gold) — there is **palette risk** of collision with Mars, but maroon (darker, brown-toned red) is meaningfully distinguishable from Mars's vivid crimson, and is unoccupied territory.
  **Recommendation: confirm maroon, but precision matters.** Propose a specific maroon hex such as `#7A2E3B` (deep wine-maroon) or `#8B3A4A` (muted maroon) — both clearly distinct from Mars `#C41E3A`. Maroon also carries the right tonal weight for *executive education / leadership gravity* and reads as a parallel-but-distinct sibling to MSc's blue-grey scholarly tone — both Cluster A capability workspaces, but management (warm) vs. technical (cool). **Scout supports the prior maroon proposal**; the choice of specific hex is the open question.

- **design_principles** (proposed) — `{ "status": "implicit", "spec_path": "LEARNING_SYSTEM.md + CLAUDE.md", "republic_principles_applied": false, "notes": "Discipline canons exist in CLAUDE.md and LEARNING_SYSTEM.md but are not consolidated into a design-principles spec. Edict VIII Charter satisfaction requires a charter pass." }`

## 10. Cross-volume references — overlap with MSc

- **Explicit parallel asserted** in two places: `/home/user/mit-management-courses/README.md:9-12` (*"This repo is parallel to the MSc Data Science / AI repo. — MSc repo: technical AI, data science, machine learning, and analytics capability — MIT Management Courses repo: leadership, strategy, organizations, decision-making, execution, and management capability"*) and `/home/user/mit-management-courses/CLAUDE.md:19-23` (*"This repo is parallel to the MSc Data Science and AI repo. The MSc repo builds technical capabilities. This repo builds management, leadership, and organizational capabilities."*).
- **Pattern overlap with MSc** — both are explicitly framed as **capability workspaces** that produce **reusable skills**. MSc's volume description (`/home/user/Codex/data/volumes.json:1402`) uses the exact phrasing *"A skill forge: every module produces reusable capability."* — mit-management-courses uses the parallel phrasing *"converts MIT management and executive education courses into reusable skills, tools, prompts, frameworks, and project applications"* (`README.md:3`). The two Provinces share an architectural archetype: **module → framework → tool → skill-card**.
- **No specific entity cross-references** — no companion is shared (none named in either), no canon is cited cross-Province, no chapter references the other. The cross-volume link is **structural-parallel**, not entity-level.
- The CLAUDE.md root-context at `/home/user/Codex/CLAUDE.md` lists both `MSc` and `mit-management-courses` together under "Out-of-MCP-scope repos (2026-05-05)" — Sovereign-surfaced together, registered together-implicitly.

## 11. Data-integrity surprises

- **Single 41-minute founding burst.** All 48 commits land 2026-05-05 14:07–14:48 +0530. No further commits. The Province is in a **freeze-state**: scaffolded then untouched. Surprise mostly for shelf classification (`active` per README but no activity since founding).
- **Builder unbound.** No companion is named anywhere in the Province. The CLAUDE.md is operating-style only; no persona-binding header (compare Codex CLAUDE.md's elaborate Orinth/Aurelius/Cipher binding). Registering this Volume **without seating a Builder** is unusual for the Republic but mirrors the pre-CodeMike state of MSc.
- **Branch on a Codex-related name.** Current local branch is `claude/codex-persona-registry-update-t3i7D`, suggesting this checkout was made in the context of a Codex-side task and the branch name is incidental. `origin/main` also exists. No drift between local and remote noted (`git status` clean).
- **Bundled zip in repo.** `/home/user/mit-management-courses/mit-management-courses.zip` (103 KB) sits at repo root and is tracked by git (initial commit `Add files via upload`). Possibly the original Sovereign-uploaded export the repo was unpacked from. **Recommend** flagging for ingestion — should it be excluded from canonical surfaces (gitignore candidate) or treated as an artifact (Apocrypha-forgotten?). Not inspected — read-only floor and unclear value.
- **CLAUDE.md mentions a "Guiding Question"** (`/home/user/mit-management-courses/CLAUDE.md:58-60`) — *"How can this course make the user better at running, organizing, scaling, or leading real projects?"* — this is a Province-shaping prompt worth surfacing as either a Volume-level note or an Origin lore entry. **Possible Apocrypha (foretold)** about the Province's intent.
- **SKILLS_REGISTRY.md is single-skill.** `/home/user/mit-management-courses/SKILLS_REGISTRY.md:7-22` registers only "Leadership Signature" (status: *In development*). The registry is foretold-extensible but not yet populated.

## 12. Counts — approximate per entity type to ingest

| Entity type | Count | Source files |
|---|---|---|
| **Volumes** | **1** (new) | this Province |
| **Chapters** | **1–2** | 1 founding-burst chapter; optionally split per-course (currently 1 course = 1 chapter) |
| **TODOs** | **0–3** | 0 explicit; 3 candidates: seat-a-Builder, complete-learner-pass-on-active-course, charter-pass-for-Edict-VIII |
| **Canons** | **6** | 5 study-discipline canons from CLAUDE.md + LEARNING_SYSTEM.md (Working Style, Course Processing Flow, Output Philosophy, Conversion Pipeline, Required Outputs); 1 module 4-pass conversion canon |
| **Schisms** | **0** | none found |
| **Lore (Doctrines)** | **7** | one per management framework: Leadership Signature, Authenticity Paradox, Family Systems Model, 4-CAP+, Immunity to Change, Provisional Self, Future Self |
| **Lore (Origins)** | **0–1** | 1 candidate: the Guiding Question + parallel-to-MSc framing as a Province-origin entry |
| **Lore (Cautionary Tales)** | **0–2** | optional: Family-business common patterns (`projects/applications/family-business-leadership.md:7-15`) and Delegation failure modes (`projects/applications/delegation-system.md:7-17`) — categorization ambiguous, may live inside Doctrines instead |
| **Lore (Chronicles)** | **0** | no session narratives |
| **Apocrypha** | **0–2** | foretold-candidates: COURSE_INDEX planned-processing list; SKILLS_REGISTRY extensibility |
| **Specs** | **5–6** | course-brief, syllabus, module-map, learning-objectives, skill spec (`skills/leadership-signature/skill.md`), plus optional skill-card spec |
| **Companion-logs** | **0** | none found |
| **Doctrine-ledger entries** | **0–1** | optional consolidated entry: *"The MIT Management Courses conversion discipline"* |
| **Applications (project-applications)** | **5** | conflict-resolution, family-business-leadership, team-meeting-design, delegation-system, founder-leadership-style — ambiguous: ingest as Specs? Lore? or a new application-class entity? **Flag for Aurelius decision.** |
| **Tools (templates)** | **5** | feedback-request-template, immunity-map-template, leadership-story-builder, leadership-signature-assessment, development-plan-template — similar categorization ambiguity; tools are template-skeletons, not yet doctrine, not yet companion-log |
| **Skill bundle artifacts** | **6** | skill.md, README.md, prompts.md, templates.md, workflows.md, examples.md (in `skills/leadership-signature/`) — likely ingest as a single Skill spec with sub-artifacts, not 6 separate entries |
| **Assignment files** | **6** | one per module — candidates for Spec-class entries or chapter-attached artifacts |
| **Note templates** | **3** | reflections, readings, project-applications (all empty) |
| **Output drafts** | **4** | leadership-signature-draft, leadership-story-final, leadership-development-plan, ai-skill-card (all template-blank) |

**Total ingestible entries: ~30–55**, depending on (a) whether project-applications + tools fold into Doctrines or ingest as their own class, (b) whether the 6 assignment files ingest individually or roll up to the active-course chapter, (c) whether template-blank outputs ingest at all or wait for learner content.

**The honest narrowest count**: 1 Volume + 1 Chapter + 6 Canons + 7 Doctrines + 1 Origin = **~16 first-pass entries**, with the assignment/tool/application surfaces deferred to a second sweep once Aurelius rules on their canonical class.

---

## Open rulings for the Chronicler

1. **Builder seat** — register Volume without a Builder, or seat one before ingesting? Scout flags the unbound seat as unusual but mirroring the pre-CodeMike MSc state.
2. **Cluster assignment** — MSc-parallel logic suggests Cluster A, but the local repo says nothing. Constitutional decision.
3. **domain_color specific hex** — maroon family confirmed. Suggested `#7A2E3B` (deep wine-maroon) or `#8B3A4A` (muted maroon). Pick one.
4. **Discipline-canons taxonomy** — ingest as Province-scope Canons or as a single Doctrine Ledger entry?
5. **Implicit Cautionary Tales** in family-business and delegation applications — separate `lore[]` Cautionary Tales, or fold into Doctrine bodies?
6. **`project-applications/` and `tools/` directories** — ingest as Specs, Lore, or new entity class?
7. **Assignment files (6)** — separate spec entries or roll up to active-course chapter?
8. **Template-blank outputs** — ingest as scaffolds now, or defer until learner content lands?
9. **`mit-management-courses.zip` at repo root** (103 KB, tracked) — apocrypha-forgotten, gitignore candidate, or canonical artifact?
10. **Shelf** — `active` per README, but dormancy since 2026-05-05 founding burst makes `paused` defensible. Default to `active`?

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
