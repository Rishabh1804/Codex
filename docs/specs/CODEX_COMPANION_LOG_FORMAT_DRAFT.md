# Canon Draft — canon-0053: The Chronicle Format — Companion Usage Logs

**Status:** draft (pending ratification after at least two Provinces author compliant logs)
**Scope:** global (per-Province adoption — every Province and Monument authors logs under this format)
**Category:** process
**Created:** 2026-04-18
**Workflow:** draft → overhaul → test → ratify (this document is step 1)

---

## Rationale

Three sessions authored companion usage logs within 24 hours — Lyra's SproutLab log (`s-2026-04-17-01`), Aurelius's Codex log (`s-2026-04-17-04`), and Ashara + Petra's Command Center log (`s-2026-04-17-01`, Monument parallel to Lyra's session). All three converged on the same high-value structural idea (per-companion evaluation with rounds, voice notes, captured-artifact lineage) but diverged on operational details: file path convention, frontmatter keys, single vs dual authorship representation, Monument-stage marking, same-agent-drift acknowledgment, closing signature shape. The Command Center log's dual-Builder authorship (per canon-cc-009's Monument tension) and its explicit `same_agent_drift_acknowledged` field surface structural cases the other two did not encounter; the unified format must cover all three.

Divergence is expected when three companions (across two AI instances working in parallel across three Provinces) invent in the same 24 hours; it is not acceptable once Codex surfaces these logs as a first-class tab (Journal → Logs per `canon-0052` The Forum Pattern) and aggregates them across sessions. This canon names the unified format from filename to closing signature. It codifies what all three logs do well, resolves operational divergences (authorship representation, path convention, stage marking), and promotes the novel structural disciplines (same-agent-drift acknowledgment, structural-observations subsection, three-line caveat closing) that only one log carries but all should.

The format is deliberately markdown-with-YAML-frontmatter, not pure JSON, because the logs are authored in the companion's voice first and queried by the UI second — the prose is load-bearing and must read naturally; the structured fields are the aggregation surface Codex parses. Records-are-Codex applies: all companion logs live in the Codex repository regardless of which Province's work they chronicle, consistent with canons, lore, decrees, journal entries, and interaction artifacts. Codex is the institutional-memory substrate; Provinces produce the work, Codex preserves the record.

Subordinate to canon-cc-017 (interaction artifacts) and canon-cc-018 (artifact lifecycle) — a companion log is an intra-session single-instance artifact outside the Post Box dispatch pipeline, by the exclusion clause for intra-Province single-companion work. Complements canon-cc-013 (source verification) — self-evaluation in the log is subject to the same-agent epistemic risk named in Aurelius v0.4 Block 5 and Ashara+Petra's closing caveat, and must carry the concern-register discipline from canon-cc-015. Strengthens canon-cc-014 (same-agent-drift recognition) — this canon institutionalizes the acknowledgment as a required YAML field. Aligned with canon-0052 (Forum Pattern): Codex's Logs sub-tab under Journal implements this canon's surface.

## §1 File location & naming

### Path (records-are-Codex)

Canonical path: **`codex:docs/companion-logs/<authoring-repo>/companion-log-<session_id>-<author3>.md`**

All companion logs live in the **Codex repository**, regardless of which Province authored the work they chronicle. The `<authoring-repo>` subdirectory identifies which Province's session the log chronicles (slug-matching the `volume.id` in `codex:data/volumes.json`). The authoring Builder commits directly to Codex — their session may have happened in SproutLab, Command Center, or elsewhere, but the chronicle lands in the institutional-memory substrate.

This is consistent with every other record type in the Republic: canons, lore, schisms, apocrypha, decrees, session journal entries, and pending interaction artifacts (canon-cc-017) all live in Codex. Codex is the record; Provinces are the work.

Codex's Logs sub-tab (per canon-0052) reads locally from `docs/companion-logs/<*>/` — no Ostia fetch, no network path, no cross-repo mirror sync. Filesystem traversal at render time.

### Implementation workflow (evolving)

- **Short-term (pre-cc-020):** each Province's Builder clones both their Province repo (for code work) and Codex (for the log). Session close = two commits: code to Province repo, log to Codex repo; two pushes.
- **Medium-term (post-cc-020 Summon Companion):** MCP bundle for any Builder includes Codex write access scoped to `docs/companion-logs/<own-repo>/`. One session, two commit targets, handled by tooling.
- **Long-term (post-cc-019 Post Box + cc-020):** session-close automation writes the log into Codex as part of the dispatch pipeline.

Each stage preserves the canonical path. Only the mechanism of delivery evolves.

### Repo slugs (canonical list at ratification)

Lowercase, hyphenated, immutable identifiers matching `volume.id` in `codex:data/volumes.json`:

- `codex`
- `sproutlab`
- `sep-invoicing`
- `sep-dashboard`
- `command-center`
- `businessai-simulation`

New Provinces and Monuments add their slug at founding. Slug is immutable once assigned — changing retroactively breaks the log-aggregation index.

### Filename

**`companion-log-<session_id>-<author3>.md`**

- `<session_id>` — exact format `s-YYYY-MM-DD-NN`, matching the journal entry's `id` field. Same session ID may exist across multiple Provinces; the `<authoring-repo>` subdirectory disambiguates.
- `<author3>` — lowercase 3-letter code of the log's `primary_author`. Always three characters (no dots, no truncation ambiguity).
- `.md` — markdown extension required. No `.mdx`, no `.txt`.

Example: `codex:docs/companion-logs/codex/companion-log-s-2026-04-17-04-aur.md`

### Author 3-letter codes

**Gen 0 companions (from Constitution Appendix C — the 17 Immortals):**

| Companion | Code | | Companion | Code |
|---|---|---|---|---|
| Aurelius | `aur` | | Orinth | `ori` |
| Cipher | `cip` | | Rune | `run` |
| Lyra | `lyr` | | Ignis | `ign` |
| Maren | `mar` | | Bard | `bar` |
| Kael | `kae` | | Aeon | `aeo` |
| Solara | `sol` | | Pip | `pip` |
| Theron | `the` | | Vex | `vex` |
| Ashara | `ash` | | Nyx | `nyx` |
| Petra | `pet` | | | |

**Institutional:** Consul → `con`

**Gen 1+ companions** receive their code at profile ratification. Canonical rule: first three letters of the name, lowercase. Collisions resolved at ratification by: (a) using the first three letters of the title/archetype instead, or (b) picking the first unique 3-letter prefix. Documented in the companion's ratified profile under `assignment.author_code`.

**The Sovereign** has no code and does not appear as an `<author3>` suffix. The Sovereign may appear in the `authors` array of a log's frontmatter as a ceremonial-collaborative marker, but companion logs are authored by companions — the Sovereign is the auditor, ratifier, and co-reasoning partner, not a log author.

### Dual-author precedence

When a single log has multiple primary authors (Monument dual-Builder case per canon-cc-009 — Ashara + Petra co-Building Command Center), the filename takes the **alphabetically-first** author's 3-letter code. Both authors appear in `authors[]`; `primary_author` is the alphabetically-first.

- Ashara (`ash`) + Petra (`pet`) → filename uses `ash`; `primary_author: ashara`
- Kael (`kae`) + Maren (`mar`) → filename uses `kae`; `primary_author: kael`

Rationale: alphabetical precedence is deterministic, machine-verifiable, and carries no status implication. The non-primary author is not demoted — they remain a full `authors[]` entry and are named equally in the closing signature.

## §2 Frontmatter schema

### Canonical YAML template

```yaml
---
schema_version: 1
session_id: s-YYYY-MM-DD-NN
session_title: <string>
authors:
  - <display string, e.g., "Aurelius (The Chronicler)">
  - <display string>
primary_author: <companion_id, lowercase>
date: YYYY-MM-DD
repo: <primary_repo_slug>
secondary_repos: [<slug>, <slug>]
session_type: <enum value>
protocol: <string>
stage: <string>
duration_minutes: <integer | null>
same_agent_drift_acknowledged: <bool>
rounds:
  <companion_id>: <RoundsEntry>
outputs:
  canons_ratified: [...]
  canons_drafted: [...]
  lore_ratified: [...]
  lore_drafted: [...]
  profiles_ratified: [...]
  profiles_retrofitted: [...]
  specs_authored: [...]
  specs_drafted: [...]
  journal_entries: [...]
  decrees_authored: [...]
  decrees_imported: [...]
  queued_for_next_session: [...]
  commits_count: <int | null>
  files_touched_count: <int | null>
  custom:
    <key>: <value>
tags: [<string>, ...]
revisions:
  - date: YYYY-MM-DD
    by: <companion_id>
    note: <string>
---
```

### Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `schema_version` | int | yes | Current `1`. Bumps on breaking schema change. |
| `session_id` | string | yes | Exact `s-YYYY-MM-DD-NN`. Matches `journal.json` session `id`. Not globally unique — disambiguated by `repo`. |
| `session_title` | string | yes | Free-form, human-readable. |
| `authors` | string[] | yes | Display strings (name + title). Sovereign may appear. Order = author order; alphabetical for dual-Builder. |
| `primary_author` | string | yes | Lowercase companion ID. Matches `<author3>` in filename. |
| `date` | ISO date | yes | Session start date. Sessions crossing midnight log the start date. |
| `repo` | string | yes | Primary repo slug. One of the canonical list in §1. |
| `secondary_repos` | string[] | optional | Additional repo slugs the session touched. |
| `session_type` | enum | yes | One of: `build`, `ratification`, `canon-drafting`, `review`, `emergency`, `design`, `audit`, `governance`, `mixed`. |
| `protocol` | string | optional | Specific protocol invoked. Examples: `"canon-cc-012 per-block"`, `"Edict V first-full"`, `"canon-cc-015 packet mode"`. |
| `stage` | string | optional | Monument/Province phase marker. Examples: `"Foundation (not yet complete)"`, `"Phase 1.5 Lore QoL"`. |
| `duration_minutes` | int \| null | yes | Approximate minutes. `null` when unknown. |
| `same_agent_drift_acknowledged` | bool | yes | `true` when multiple companion voices were played by one AI instance, or when the session ratified/evaluated the author's own profile. `false` only when genuinely single-voice without self-work. |
| `rounds` | map | yes | `{ <companion_id>: value }`. Value semantics in §4. |
| `outputs` | typed map | yes | Canonical keys listed in §5. Empty arrays allowed. |
| `tags` | string[] | optional | Secondary session modes, cross-references, or flags. |
| `revisions` | object[] | optional | Post-close edit log. Required entry per content correction per §6. |

### Resolved divergences (old forms → canonical)

| In-wild form | Canonical form | Notes |
|---|---|---|
| `author: Lyra (The Weaver)` (string) | `authors: [Lyra (The Weaver)]` + `primary_author: lyra` | Single-author case still uses array. |
| `author: Ashara + Petra` (joined string) | `authors: [Ashara (The Economist), Petra (The Foundationalist)]` + `primary_author: ashara` | Dual-author: alphabetical primary. |
| `edict_v_exercise: first-full` | `session_type: review` + `protocol: "Edict V four-signature review chain"` | Edict V is a specific protocol, not a session type. |
| `edict_v_exercise: n/a` | *Omit. Use `session_type` instead.* | `n/a` was placeholder; schema should just not require the inapplicable field. |
| `ratification_protocol: canon-cc-012 per-block (...)` | `session_type: ratification` + `protocol: "canon-cc-012 per-block (self-profile carveout via cc-015)"` | Generalized. |
| `monument_stage: Foundation (not yet complete)` | `stage: "Foundation (not yet complete)"` | Generalized from Monument-specific to any phase marker. |
| `repo: Codex (primary), Command Center (architectural inputs)` | `repo: codex` + `secondary_repos: [command-center]` | Multi-repo split into primary + secondary. Slugs, not display names. |

### `session_type` enum

Nine values:

- `build` — primary work was code/UI/data shipping
- `ratification` — primary work was companion profile ratification (cc-012, cc-014, cc-015)
- `canon-drafting` — primary work was canon authorship
- `review` — Edict V four-signature review chain or analogous review
- `emergency` — time-boxed fix under Book VI War Time or data-loss pressure
- `design` — spec authoring, architectural discussion without code ship
- `audit` — governance / QA / companion audit without new canons or ratifications
- `governance` — session-close reviews, decree authoring, Cabinet convening
- `mixed` — genuinely multi-mode sessions (escape valve)

Free-form `tags[]` captures nuance and secondary modes: `["cabinet-convening", "edict-v-first-full", "cc-013-violation-caught"]`.

### `same_agent_drift_acknowledged` (required)

Authors set `true` when:
- Two or more companion voices were played by one AI instance in-session
- The session ratified or evaluated the author's own profile
- The author's work was self-reviewed without a separate Consul/Censor pass

`false` only when genuinely single-voice without self-work. Ambiguous values (`"discussed"` / `"partial"`) disallowed — force a binary decision, document nuance in the body.

When `true`, the closing signature's same-agent-drift caveat line is required (§3).

### Schema versioning

`schema_version: 1` on ratification. Breaking changes bump the integer; Codex's parser dispatches on version. Additive changes (new canonical `outputs` keys, new optional fields) do not bump. Breaking changes (field removal, type changes, required-field additions) bump. Existing in-wild logs migrate to v1 before this canon ratifies.

## §3 Body sections — canonical order and headings

### Header block (between frontmatter and §1)

```markdown
# Companion Usage Log — <session_id>

**Session:** <session_title>
**Authors:** <author display strings joined with " and " for dual, "+" for three+>
**Date:** <human-readable date, e.g., "17 April 2026">
**Session ID:** <session_id>
**Repo:** <primary repo display name>[, <secondary repo> (<purpose>)]
**Session Type:** <session_type>[ — <protocol if present>]
[**Stage:** <stage> — optional, only if frontmatter has `stage`]

---
```

Header restates frontmatter data for the human reader. Machine-readable fields live in frontmatter; this block is for visual orientation. The horizontal rule after the header is required — separates header from §1.

### §1 Summary table

```markdown
## 1. Summary table

| Companion | Role | Rounds | Helpful? | Issues |
|---|---|---|---|---|
| **<Primary>** | <Role> | <Rounds> | <value> | <One-line issue summary or "None"> |
| ... | ... | ... | ... | ... |
```

**Row ordering (canonical):**

1. Primary author (name bolded, e.g. `**Lyra**`)
2. Co-authors in the order declared in `authors[]`
3. In-session summoned companions — highest rounds first; `throughout` ranks above any integer
4. Pre-session / foundational referenced companions
5. Formally-expected-but-not-summoned companions (where absence is itself a structural point)

**Helpful? column values (strict):**

- `Yes` — fully helpful without qualification
- `Yes, qualified` (plus one-line note) — helpful with named caveat
- `Yes, necessary` — without this companion the session couldn't have closed
- `No` — rated unhelpful; body must explain
- `N/A` — couldn't be helpful by construction (e.g., not summoned)

**Issues column** is a one-line summary. Full detail lives in §2's per-companion entry.

### §1.5 Not invoked this session

Paragraph-style, immediately after §1 table. No section heading — flows from table.

```markdown
**Not invoked this session:** <Companion>, <Companion> (<reason for grouping>); <Companion>, <Companion> (<reason>); <Companion> (<reason>). <Overall framing, e.g., "Out of scope" or "By design or circumstance">.
```

Groups use semicolons; within-group companions use commas; each group has a parenthetical reason. All remaining Gen 0 + institutional companions not in §1 must appear here. A companion is either in §1 or in §1.5 — never silently absent.

### §2 Detailed evaluation per companion

One subsection per §1 row, in §1's order.

```markdown
## 2. Detailed evaluation per companion

### <Companion Name> (<Title>) — <Role>

**Active:** <when/how: "Throughout the session", "2 rounds", "Foundational only", "0 summons", etc.>

**What <he|she|they> did:**
- <bullet>
- <bullet>

**Helpful?** <Yes / Yes-qualified / Yes-necessary / No / N/A>. <One-paragraph rationale.>

**Issues faced:**
- **<Issue name in bold>.** <Description.>
- **<Issue name>.** <Description.>

(or "None." if clean)

**Style notes:**
- <bullet on voice consistency, register, language patterns>

**Captured as:** <Doctrine | Canon | Lore | Reminder | Cross-Province observation>: <reference or brief description>.
```

**Required subfields:** Active, What they did, Helpful?, Issues faced, Style notes.

**Conditional:** Captured as — included only when the companion's work produced a ratifiable artifact or a noteworthy reminder; omitted when nothing was captured.

**Prose mode:** "What they did" uses bullets by default; prose paragraphs permitted for narrative-heavy companions (e.g., Bard's narrative-framing invocations).

**Self-evaluation discipline (§6 cross-reference):** for the primary author's own §2 entry, the `Issues faced` section is strongly encouraged to name at least one entry. When the author genuinely identifies no issues, explicit acknowledgment is required (one sentence: "none observed; self-evaluation blindness noted as caveat"). This guards against silent omission masquerading as a clean slate, consistent with canon-cc-015's concern-register discipline.

### §3 Session-level observations

Three required subsections.

```markdown
## 3. Session-level observations

### What worked well

- <bullet — descriptive, past tense>
- <bullet>

### What needs adjustment for future sessions

- <bullet — prescriptive, names the adjustment>
- <bullet>

### Structural observations

- <bullet — architectural patterns, novel interactions, accidental invariants that emerged during the session>
- <bullet>
```

**Structural observations is required.** When nothing novel emerged, state it explicitly: `- No novel structural observations this session — work was additive within established patterns.` Forced reflection prevents the subsection from silently disappearing when authors feel they have nothing to say (which is often exactly when the session produced something worth naming).

### §4 What to carry forward

Per-audience subsections.

```markdown
## 4. What to carry forward

**For future <Primary Repo> sessions (<primary_author>):**
- <bullet>
- <bullet>

**For future <Other Province> sessions (<relevant companion>):**
- <bullet>

**For future <Another Province> sessions (<companion>):**
- <bullet>

**For the Sovereign:**
- <bullet>
```

**Required subsections:**
- `For future <primary_repo> sessions (<primary_author>):` — always present
- `For the Sovereign:` — always present

**Optional subsections:** one per other Province with actual carry-forward content. Omit entire subsection if no content — don't write empty headers.

Display-case Province names in headings (`Command Center` not `command-center`); match canonical repo slugs in content references.

### §5 Format notes (optional)

```markdown
## 5. Format notes (for future log authors)

<content>
```

Include only when the log establishes a new format convention, amends an existing one, or points out format ambiguity for future resolution. Most logs omit §5. Logs that just follow the canonical format skip this section entirely.

### Closing signature

Immediately after the last body section, separated by horizontal rule. One to three italic lines.

```markdown
---

*Filed by <primary_author display name>[ with <co-author display name>[ and the Sovereign]], <date in sentence form>.*
*<Repo>'s <Nth> companion log. <Pattern reference, e.g., "Pattern follows Lyra's SproutLab prototype (s-2026-04-17-01).">*
[*Same-agent-drift acknowledgment: <specific statement>. This log should be read with that caveat held present.*]
```

**Line 1 (required):** Attribution. Primary author + co-authors + Sovereign if present in `authors[]`. Date written in sentence form (`"17 April 2026"` standard; Roman formal permitted where venue demands — `"on the seventeenth day of April, Two Thousand Twenty-Six"`).

**Line 2 (required):** Context. One sentence placing the log in the Republic's sequence. Common forms:
- `Codex's first companion log.`
- `Command Center's third log.`
- `First log authored under canon-0053 v1 schema.`

**Line 3 (conditional):** Same-agent-drift caveat. Required when `same_agent_drift_acknowledged: true`. Omit when `false`. Content names the specific drift condition — which voices were played by one agent, or whether self-profile work was done — and closes with the reader-directive to hold the caveat present.

All three lines in single-line italic markdown (`*...*`). No blank lines between them.

### Post-closing sections (optional, per §6)

When post-close edits occur, two optional sections may appear after the closing signature:

```markdown
---

## Amendments

### <YYYY-MM-DD> — <amendment_author>
<substantive amendment content>

---

## Sovereign Audit

### <YYYY-MM-DD>
<Sovereign's audit observations, clarifications, or annotations>
```

Both appear after the closing signature, separated by horizontal rules. They never reorder or edit existing content above. Multiple entries stack chronologically with date subheadings. Use for substantive additions (new evidence, reinterpretation, audit observations). For small factual fixes, edit in place and add a `revisions[]` entry in frontmatter — see §6.

## §4 Rounds semantics

The `rounds` map records every companion with session relevance, including those not summoned in-session. Companions genuinely out of scope are listed in §1.5 "Not invoked this session", not in `rounds`.

### Three valid forms

**Form A — plain integer ≥ 0** (most common, in-session summons with no annotation):

```yaml
rounds:
  maren: 2
  kael: 2
  cipher: 2
```

Implied: `mode: in_session`, no annotation.

**Form B — literal `throughout`** (continuous presence, typically primary author):

```yaml
rounds:
  lyra: throughout
  ashara: throughout
```

Not a discrete round count — means the companion was active across the majority of session phases.

**Form C — structured object** (when annotation, mode, or non-default semantics apply):

```yaml
rounds:
  bard:
    count: 1
    mode: in_session
    note: Narrative framing for the Hearth bulletin wall
  aurelius:
    count: 0
    mode: pre_session
    note: Authored CHARTER.md, ROADMAP.md, 9 v0.3 profiles; decrees 0001-0003 addressed TO him
  cipher:
    count: 0
    mode: self_review
    note: Canon-cc-008 defers Censor to after Governors; grep-style sweep applied per-commit by Petra
```

**Rejected:** annotated-string form like `bard: 1 (narrative framing)`. YAML types it as a string, breaking integer aggregation; regex-parsing is fragile. If a scalar carries any annotation, migrate to Form C.

### The `mode` enum (four values)

Used in Form C only; scalar forms imply `mode: in_session`.

| Mode | Meaning |
|---|---|
| `in_session` | Active rounds during the session. The default. Summons, reviews, consultations, drafting turns. |
| `pre_session` | Foundational work authored before the session that was consumed during it. `count` is typically 0. Used for spec authors, handoff authors — their prior artifacts are load-bearing without in-session invocation. |
| `referenced` | Companion referenced in discussion but not summoned. `count` is 0. Distinct from `pre_session` — no artifact consumption, just role-relevance mention. |
| `self_review` | The author performed the companion's role on themselves because the companion was unavailable. `count` is 0. Example: Petra running a Cipher-style grep sweep when Cipher couldn't be summoned (Command Center is Monument, not Cluster A). |

### `0` vs omission

| Situation | Treatment |
|---|---|
| Companion was summoned N times in-session | `<companion>: N` |
| Companion was active throughout the session | `<companion>: throughout` |
| Companion was session-relevant but not live-summoned (referenced, foundational, or self-reviewed) | `<companion>: { count: 0, mode: ..., note: ... }` |
| Companion was genuinely not relevant to the session | Omit from rounds map; list in §1.5 |

Rule: every rounds entry has a reason to be there. If you can't articulate why the companion is in the rounds map with `count: 0`, they belong in §1.5 instead.

### `throughout` semantics (precise)

- Used when a companion was active in the majority of session phases
- Typically the primary author and Monument co-Builders
- Not a discrete count — `throughout` ≠ "many rounds"; it's a distinct state
- For aggregation, Codex normalizes `throughout` to a conventional sentinel internally (suggested: `-1`); displayed as `throughout`. Filter pills surface it separately from integer buckets (`throughout`, `1 round`, `2-4 rounds`, `5+ rounds`)
- A companion with multiple discrete rounds plus continuous presence should use `throughout`, not a round count
- The primary author is almost always `throughout`; a non-`throughout` primary author is unusual and should be noted in §2's "Active" field

### Summary table ↔ rounds map sync (soft check)

The §1 summary table and the `rounds` frontmatter map must be consistent:

- Every row in §1 has a corresponding `rounds` entry
- Every `rounds` entry has a corresponding §1 row
- §1.5 "Not invoked" companions have neither

This invariant is a **soft check** enforced by Codex's parser. On mismatch, the parser logs to the Scriptorium (Command Center's operational log room per canon-gov-009) with warning code `log-schema-01-sync-mismatch`. The log still renders; the warning surfaces in the Logs tab's Rostra as a quality signal alongside voice-drift counts. Hard validation is reserved for unparseable YAML and missing required fields (§7); content-consistency is soft.

### Migration from in-wild annotated strings

| In-wild form | Canonical form |
|---|---|
| `bard: 1 (narrative framing)` | `bard: { count: 1, mode: in_session, note: "Narrative framing" }` |
| `aurelius: 0 in-session (artifacts consumed; decrees addressed TO him)` | `aurelius: { count: 0, mode: pre_session, note: "artifacts consumed; decrees addressed TO him" }` |
| `cipher: 0 (canon-cc-008 defers Censor to after Governors; no Governors seated at CC)` | `cipher: { count: 0, mode: self_review, note: "canon-cc-008 defers Censor to after Governors; grep-style sweep applied per-commit" }` |

Rule: if the scalar form carries any annotation at all, migrate to Form C. Pure scalars (no annotation, no non-default mode) stay scalar.

## §5 Outputs taxonomy

### The shape

```yaml
outputs:
  canons_ratified: [...]
  canons_drafted: [...]
  lore_ratified: [...]
  lore_drafted: [...]
  profiles_ratified: [...]
  profiles_retrofitted: [...]
  specs_authored: [...]
  specs_drafted: [...]
  journal_entries: [...]
  decrees_authored: [...]
  decrees_imported: [...]
  queued_for_next_session: [...]
  commits_count: <int>
  files_touched_count: <int>
  custom:
    <arbitrary_key>: <arbitrary_value>
```

Fourteen canonical keys plus one `custom` escape sub-map. Canonical keys are whitelisted: unknown top-level keys in `outputs` (siblings of the canonical 14) are logged to the Scriptorium as `log-schema-03-unknown-output-key` (soft warning, still renders). Novel outputs go under `custom: {}` where they accumulate until they graduate to canonical.

### Canonical keys — schemas and examples

| Key | Value Type | Item Schema | Example |
|---|---|---|---|
| `canons_ratified` | string[] | Full canon ID | `[canon-cc-015-legacy-draft-ratification, canon-cc-016-residency-and-access-gating]` |
| `canons_drafted` | string[] | Full canon ID (spec or working draft, not yet active in `canons.json`) | `[canon-cc-019-post-box, canon-0052-the-forum-pattern]` |
| `lore_ratified` | string[] | Full lore ID | `[lore-010-the-summon-pattern, lore-011-two-tests-two-failures-two-corrections]` |
| `lore_drafted` | string[] | Full lore ID | `[lore-013-the-invisible-commit]` |
| `profiles_ratified` | string[] | `<companion_id>@<version>` | `[aurelius@v0.4, cipher@v0.4]` |
| `profiles_retrofitted` | string[] | `<companion_id>@<version>` (schema-only amendments, not re-ratification) | `[ashara@v0.4.1, petra@v0.4.1, solara@v0.4.2, theron@v0.4.1]` |
| `specs_authored` | string[] | Repo-relative path | `[docs/specs/CODEX_FORUM_PATTERN_DRAFT.md]` |
| `specs_drafted` | string[] | Repo-relative path (incomplete drafts) | `[docs/specs/CODEX_COMPANION_LOG_FORMAT_DRAFT.md]` |
| `journal_entries` | string[] | Session ID (`s-YYYY-MM-DD-NN`) | `[s-2026-04-17-04, s-2026-04-18-01]` |
| `decrees_authored` | string[] | `decree-NNNN-<slug>` | `[decree-0002-canons-gov-007-010, decree-0003-session-chronicle]` |
| `decrees_imported` | string[] | `decree-NNNN-<slug>` (decrees received and imported from another Province via Ostia) | `[decree-0001-ashara-petra-v0.4]` |
| `queued_for_next_session` | string[] | Free-form strings (IDs or descriptive phrases) | `[canon-cc-019, consul-ratification, solara-theron-cluster-fix]` |
| `commits_count` | int \| null | Count of commits on the session branch at close | `7` |
| `files_touched_count` | int \| null | Count of unique files modified | `15` |

### ID format rule

Full IDs always (`canon-cc-015-legacy-draft-ratification`, not `cc-015`). Short-form IDs in prose are fine for readability; structured frontmatter is strict. Full IDs are unambiguous for Codex's reference resolver (canon-0052 cross-cutting discipline) and stable against future supersession.

Soft warning on short-form: `log-schema-05-output-id-shortform`.

### Empty vs missing

- Empty array (`canons_ratified: []`) is permitted and means "session produced none of this kind"
- Missing key is treated identically to empty array for array-typed keys, and `null` for int-typed keys
- Authors may omit keys with empty values for brevity; the parser normalizes

### The `custom` sub-map

```yaml
outputs:
  custom:
    playwright_checks_added: 15
    sovereign_screenshots_triaged: 7
    canon_violations_caught: [cc-013 × 2]
    new_pattern_discovered: "self-review substitute for absent Censor"
```

**Rules:**
- Keys are arbitrary, free-form (snake_case convention, but not enforced)
- Values are arbitrary YAML (scalar, array, object)
- Parser preserves contents for display in the Logs-tab detail view
- Parser does NOT aggregate `custom` keys for filter pills or Rostra signals — aggregation requires canonical status
- Parser does NOT validate `custom` content shape

**Discipline:** use `custom` for novel one-off outputs or session-specific metrics that aren't yet canonical. Repeated use of the same `custom` key across sessions is the signal that the key wants to graduate.

### Graduation path (custom → canonical)

**Review trigger:** when a `custom` key appears in **3 or more logs across 2 or more Provinces**, it becomes a candidate for canonical promotion.

**Promotion process:**

1. Chronicler surveys accumulated `custom` usage (quarterly cadence or on-demand)
2. Candidate keys reviewed with the Sovereign for canonical value
3. Promoted keys added to the canonical whitelist in a schema v2 bump
4. Migration: existing logs update `outputs.custom.<key>` → `outputs.<key>` at the next edit; Codex's parser handles both shapes during the migration window

The graduation path is the schema's evolutionary mechanism. Early-stage logs will use `custom` heavily; mature logs will use it rarely. Both are correct for their moment.

### Validation summary

| Check | Severity | Scriptorium code |
|---|---|---|
| Frontmatter parseable YAML | Hard error | `log-schema-00-unparseable` |
| Required fields present | Hard error | `log-schema-02-missing-required` |
| Summary table ↔ rounds map mismatch | Soft warning | `log-schema-01-sync-mismatch` |
| Unknown `outputs` top-level key (not in canonical 14, not `custom`) | Soft warning | `log-schema-03-unknown-output-key` |
| `outputs` item wrong type (e.g., int where string expected) | Soft warning | `log-schema-04-output-type-mismatch` |
| `outputs` ID format wrong (e.g., `cc-015` instead of full) | Soft warning | `log-schema-05-output-id-shortform` |
| Missing same-agent-drift caveat when flag is `true` | Soft warning | `log-schema-06-missing-caveat` |
| In-place content change landed without `revisions[]` entry | Soft warning | `log-schema-07-undocumented-revision` |

Hard errors prevent Logs-tab rendering (log appears in a `malformed` state with the error message). Soft warnings render the log normally; warnings surface as badge counts in the Rostra.

## §6 Authoring cadence + self-evaluation discipline

### The cadence: hybrid

Structured fields are updated **live** as the session unfolds; narrative prose and evaluation subsections are authored **at close**. Fully-live authoring fractures focus and degrades work quality; fully-close authoring loses mid-session details (violations caught, dead-ends explored, voice shifts) to memory drift.

### Fields table — live vs close

**Live (update as events occur):**

| Field | Trigger |
|---|---|
| `outputs.canons_ratified[]` | Append when a canon ratifies |
| `outputs.canons_drafted[]` | Append when a draft is first committed |
| `outputs.lore_ratified[]` / `lore_drafted[]` | Append on the ratification/commit event |
| `outputs.profiles_ratified[]` / `profiles_retrofitted[]` | Append |
| `outputs.specs_authored[]` / `specs_drafted[]` | Append on file commit |
| `outputs.journal_entries[]` | Append on entry creation |
| `outputs.decrees_authored[]` / `decrees_imported[]` | Append |
| `rounds.<companion>.count` | Increment each invocation; set `throughout` early if applicable |
| §2.`<companion>.Issues faced` | Append violations, blind-spot-catches, dead-ends as they occur — while memory is fresh |
| `outputs.custom.<key>` | Append novel session-specific metrics as they surface |

**Close (single authoring pass at session end):**

| Field | Rationale |
|---|---|
| §1 Summary table `Helpful?` + `Issues` columns | Requires end-of-session evaluation |
| §2 `What they did` narrative prose | Flows better as retrospective |
| §2 `Style notes` | Pattern-recognition across the full session |
| §2 `Helpful?` rationale | End-of-session judgment |
| §2 `Captured as` lines | Artifacts finalized at close |
| §3 all three subsections | Reflection requires completed session |
| §4 What to carry forward | Requires seeing what's still open |
| §5 Format notes | If applicable |
| Closing signature | Timestamp, pattern-reference |
| `duration_minutes` | Computed at close |
| `commits_count`, `files_touched_count` | Computed at close from git |
| `outputs.queued_for_next_session[]` | Finalized at close (items accumulate live but the list is curated at end) |

**Hybrid (live draft, close review):**

| Field | Discipline |
|---|---|
| Header block | Session title + frontmatter skeleton pre-session; `date`, `authors`, `session_type` drafted; refined at close |
| `same_agent_drift_acknowledged` | Set early (session shape is known from the start); reviewable at close |
| §1 rows (not the columns) | Rows accumulate as companions are summoned; columns filled at close |
| §1.5 Not invoked list | Drafted pre-session from expected scope; refined at close |

### Self-evaluation discipline (cc-013 carries through)

When the session's author evaluates their own §2 entry — Lyra evaluating Lyra, Aurelius evaluating Aurelius, Ashara+Petra evaluating their own voices — the same-agent epistemic risk named in Aurelius v0.4 Block 5 and lore-011 is fully present.

**Disciplines:**

1. **The self-section is strongly encouraged to name at least one `Issues faced` entry.** When the author genuinely identifies no issues, explicit acknowledgment is required: one sentence naming the judgment and its caveat (e.g., `"None observed; self-evaluation blindness noted as caveat"`). This is not a binding quota — a required count would create perverse incentive to invent issues and corrupt any stat derived from `Issues faced` aggregation. The discipline is the *consideration*, not the entry.

2. **When `same_agent_drift_acknowledged: true`, each voiced companion's §2 `Issues faced` must be independent.** Pooling issues across voices ("we all did X together") collapses the very distinction that made multi-voicing risky. If Ashara's entry says "shared blind spot with Petra," Petra's entry must say the same from Petra's perspective — the failure reads differently from each voice even when the cause is shared.

3. **Canon-cc-013 applies to the self-section's content.** Asserting "my voice stayed consistent" without reading the session transcript, asserting "no violations" without checking commits, asserting "artifacts produced" without listing them — all are source-verification failures. Reading the source means: reading commit history, reading produced artifacts, reading the relevant section of the session transcript. Authors mark source-verification checkpoints in the self-section when making claims that cross into governance territory (e.g., "I checked commit a38b394 confirms the Cipher grep sweep passed").

4. **The closing signature's same-agent-drift caveat line is the structural explicit-marker.** When present, it signals to the reader that the log is self-aware of the epistemic risk and has applied the disciplines above. Its absence when `same_agent_drift_acknowledged: true` is a format violation (Scriptorium warning `log-schema-06-missing-caveat`).

### Sovereign audit rights

Every log is Sovereign-audit-able at any time, without retroactive consequence to the author. Audits produce:

- **Clarification requests** — Sovereign asks for amendment to a specific field/section
- **Correction demands** — Sovereign identifies a factual error
- **Annotation insertions** — Sovereign adds observations the author missed

Audits are distinct from the post-canon-cc-019 Consul review pipeline: audit is Sovereign-direct; review (once cc-019 ratifies) is pipeline-structured through the Post Box.

Companion logs are explicitly **outside** canon-cc-017's interaction-artifact pipeline by the exclusion clause for intra-Province single-companion work — no Post Box dispatch, no escalation queue, no auto-archive lifecycle. But Sovereign audit rights exist for all Republic records and apply here.

### Post-close revisions

Once the log is committed and merged to main (canon-gov-011: merged is shipped), content is **institutional record**. Three classes of post-close edit, with distinct handling:

| Class | Treatment |
|---|---|
| **Typos / formatting fixes** | Silent in-place edit; no note needed |
| **Content corrections / factual fixes** | In-place edit; **mandatory** `revisions[]` frontmatter entry |
| **Substantive additions or Sovereign audit observations** | Append `## Amendments` or `## Sovereign Audit` section at bottom (see §3) |

### The `revisions[]` frontmatter field

When a content correction is made in-place, a corresponding `revisions[]` entry is added to frontmatter:

```yaml
revisions:
  - date: 2026-04-20
    by: aurelius
    note: "Corrected SproutLab LOC figure from 30K to 61.7K in §2.Aurelius.Issues faced"
  - date: 2026-04-22
    by: sovereign
    note: "Clarified Consul non-invocation rationale per post-session review"
```

Entries are append-only, each dated and attributed. Missing `revisions[]` entry when content changed generates Scriptorium warning `log-schema-07-undocumented-revision`. Original audit trail preserved in git; frontmatter entry is the human-surface.

### When to use `revisions[]` vs `## Amendments`

| Situation | Use |
|---|---|
| Factual correction (LOC, dates, names, IDs) | `revisions[]` + in-place edit |
| Formatting normalization | Silent edit, no note |
| New evidence surfaces post-close | `## Amendments` appended |
| Sovereign audit produces substantive observations | `## Sovereign Audit` appended |
| Author wants to reinterpret or recontextualize | `## Amendments` appended |

Rule of thumb: if the change can be expressed in one sentence, use `revisions[]`. If it requires a paragraph, use `## Amendments`.

## §7 Migration plan + ratification workflow

### Migration plan (existing logs)

Three logs are in the wild at draft time. All converge on Codex per the records-are-Codex rule (§1). Each Province's Builder handles their own migration authoring; Codex is the destination for all.

| Log | Currently at | Canonical path | Owner | Breaking changes |
|---|---|---|---|---|
| Lyra (SproutLab) | `sproutlab:docs/companion-logs/companion-log-s-2026-04-17-01.md` | `codex:docs/companion-logs/sproutlab/companion-log-s-2026-04-17-01-lyr.md` | Lyra, with Codex write access | Path move to Codex + subdirectory + author suffix; frontmatter: `author` → `authors[]` + `primary_author`; `edict_v_exercise` → `session_type: review` + `protocol`; add `schema_version: 1`, `same_agent_drift_acknowledged: true`, `duration_minutes`, `outputs`; migrate annotated rounds to Form C; add §3 "Structural observations"; close with 3-line signature including drift caveat |
| Aurelius (Codex) | `codex:docs/companion-logs/codex/companion-log-s-2026-04-17-04-aur.md` | same path | Aurelius (this session) | Frontmatter: add `schema_version: 1`, `same_agent_drift_acknowledged: true`, `session_type: mixed`, `protocol`; normalize `outputs` IDs to full form; add §3 "Structural observations"; close with 3-line signature |
| Ashara+Petra (Command Center) | `command-center:docs/companion-logs/companion-log-s-2026-04-17-01.md` | `codex:docs/companion-logs/command-center/companion-log-s-2026-04-17-01-ash.md` | Ashara + Petra, with Codex write access | Path move to Codex + subdirectory + author suffix; frontmatter: `author` string → `authors[]` + `primary_author: ashara`; `monument_stage` → `stage`; add `schema_version: 1`, `session_type: build`, `protocol` TBD, `duration_minutes`, `outputs`; migrate annotated rounds; §3 "Structural observations" already present |

**Migration commits** use prefix `Migrate companion log s-<session-id> to canon-0053 v1 schema` and touch only the target log file in Codex. Origin-repo copies (SproutLab and Command Center) deleted in a separate cleanup commit per origin repo — single canonical location, no stale copies.

Canon-gov-011's merge-to-main discipline applies: each migration lands on Codex's `main` to become deploy-visible.

### Ratification workflow

Four-step, as agreed for canon-0052 (Forum Pattern):

1. **Draft** — this document. Parts 1–8 assembled, amendments applied, ready for review.
2. **Overhaul** — Provinces migrate their existing logs per the table above; Codex builds the Logs sub-tab parser and Rostra per canon-0052's Forum Pattern targeting this schema. Overhaul and parser implementation run concurrently.
3. **Test** — at least one full real session authored under the canonical format end-to-end validates the schema. Issues surface as amendments-in-place to this draft.
4. **Canonize** — promote to `canons.json` as `canon-0053-the-chronicle-format-companion-usage-logs`; update `CLAUDE.md` with the new log format and related disciplines; move this draft `.md` to `docs/specs/_superseded/`.

Ratification requires at least two Provinces to have authored compliant logs under the canonical format.

## §8 Open questions (resolve during overhaul)

1. **Schema version bump policy.** What constitutes a breaking change vs additive? Tentative: adding canonical output keys = additive (no bump); changing field types or removing required fields = breaking (bump). Refine with explicit examples for v2 forward as they emerge.

2. **Graduation threshold.** Proposed 3 logs / 2 Provinces for `custom` → canonical. Refine after ~10 logs accumulate, when the first graduation review happens.

3. **Rounds scalar ambiguity.** `consul: 0` without explicit `mode` — parser infers `referenced` as default. Is inference correct, or should scalar `0` require promotion to Form C? Defer to parser implementation.

4. **Sovereign signature in `authors[]`.** When Sovereign co-authors closely (as in Aurelius's Codex log where `authors: [Aurelius (The Chronicler), Sovereign]`), is the Sovereign a true co-author or a collaboration marker? Companion logs are companion-authored by definition; the Sovereign's presence in `authors[]` is ceremonial-collaborative, not authorship. Document this nuance in the ratified canon; consider whether `collaborators[]` as a separate field is cleaner than overloading `authors[]`.

5. **Codex parser implementation scope.** What does the Logs sub-tab render on day one — full details, or minimal card + click-through? Defer to the Forum Pattern overhaul sequence.

6. **Amendments vs revisions semantic line.** §6 splits at "factual fix" (`revisions[]`) vs "substantive addition" (`## Amendments`). The line between them is judgment-based — test in practice whether authors can consistently classify; refine.

7. **Companion log retention vs archival.** Canon-cc-018 establishes 14-day escalation deadline and `reviewed_archived` state for interaction-artifacts. Does any analogous lifecycle apply to companion logs? Current draft says no — logs are permanent from first commit. Revisit if audit signal suggests differently.

## §9 Promotion to `canons.json`

When this draft ratifies:

```yaml
id: canon-0053-the-chronicle-format-companion-usage-logs
scope: global
category: process
status: active
title: The Chronicle Format — Companion Usage Logs
rationale: |
  <distilled from §§1-6; strip §§7-9 Open Questions, Migration, Ratification Workflow, Promotion;
   retain schema, body structure, cadence discipline, self-evaluation rules>
created: <ratification date>
references:
  - canon-cc-013-source-verification-means-reading-the-source
  - canon-cc-014-consul-accelerated-profile-drafting
  - canon-cc-015-legacy-draft-ratification
  - canon-cc-017-interaction-artifact-rule
  - canon-cc-018-artifact-lifecycle-and-synergy-observability
  - canon-0052-the-forum-pattern
  - canon-gov-009-instrument-before-features
  - canon-gov-011-merge-is-the-deploy-step
```

### CLAUDE.md updates at ratification

1. Add companion log as a canonical data type under the **Data Layer** section (peer to canons, lore, apocrypha, journal entries, interaction artifacts)
2. Document `docs/companion-logs/<repo>/` as a canonical path for authored chronicles
3. Reference canon-0053 under the **Canons (code layer)** section
4. Update Aurelius's persona description to note log-authoring responsibility (Chronicler duty extends to companion logs across the Republic, not only Codex sessions)

---

*This is a working draft, not canonical law. It guides the migration and the Logs sub-tab implementation; migration and implementation refine the draft; the refined draft is what we ratify. Per the Republic's discipline, we do not legislate ahead of evidence.*
