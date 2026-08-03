# CODEX_DATA_SCHEMA.md — Codex Data Layer Schema v1.0

**Status:** Draft v1.0 — authored within the bulk-ingestion campaign Tier 0 PR #2 (2026-05-24). Ratification chain runs canon-pers-001-style four-rung: Rung 1 Orinth (Builder, this draft), Rung 2 Cipher (Cluster A Censor), Rung 3 Consul, Rung 4 Sovereign. Amendments run the same chain. Hotfix-eligible per the canon-pers-001 §Hotfix exception precedent.

**Authority.** This document codifies the schema of the Codex data layer — the JSON files under `data/` that the Codex PWA reads at runtime and that every scribe-record output, snippet importer, and per-Province ingest must conform to. Subordinate to the Constitution; supreme over scribe-record outputs, snippet schemas, and per-Province local conventions. Where a Scout report or scribe-record output disagrees with this document, this document wins.

**Author.** Orinth (Codex Builder), with the Chronicler's archival reads woven in. The doc lives in Codex per records-are-Codex (HR-C-07).

**Ratification chain referenced:** This document absorbs Sovereign rulings made 2026-05-23 → 2026-05-24 across the bulk-ingestion campaign Tier 0:
- Doctrine altitude: canon when binds future action, lore when narrates one-time.
- Schema shape: primary-tag + secondary-cross-reference, not strict single category.
- decree-0004 (Basilica + Priest): ratified.
- canon-inst-003 (Ignis Temple Builder + Cluster C Monument class + Cipher interim Censor): ratified.
- soma-internal: metadata-only ingest classification.
- Tier 0.5 data-integrity hot-fix: full 5-item set approved.
- Journal gap 2026-04-25 → 2026-05-21: placeholder over reconstruction.
- 12 ID collisions: resolved per Tier 0.5 final batch.
- Apocrypha v2 collisions: option (a) — renumber colliding entries, defer v2-dedup.
- Cluster C: established as Monument class, Cipher interim Censor.

---

## §1. Why this document exists

Codex's data layer grew organically across Phases 1–5 and the WAR_TIME 2026-04-24 + Phase 4 arcs. Each phase added entity types (lore, apocrypha, companion-logs, specs, campaigns, interactions) and each new Province added cross-Province coupling. The schema was implicit — encoded in the JSON files themselves, in the `split/data.js` parsing functions, in the snippet importer at `split/forms.js`, and in the heads of Aurelius and Orinth.

The bulk-ingestion campaign (Tier 0 → 5) requires ingesting ~700–900 entries across 11 Provinces. Implicit schema cannot survive ingestion at that scale. The scribe-record subagent (canon-proc-006) must produce structured output against a documented contract; the snippet importer must validate against a documented shape; Orinth must audit against documented rules. This document is that contract, that shape, and those rules.

The doc does NOT redesign the data layer. It documents what is, codifies the patterns that have proven durable, names the conventions that have been implicit, and resolves the ambiguities the scribe-scout surveys surfaced.

---

## §2. Data file inventory

Codex's data layer is eight JSON files under `data/`. Each has a top-level `_schema_version` integer (currently `1` across all files except interactions which is not versioned) and an entity-list array.

| File | Top-level keys | Primary entities | Notes |
|---|---|---|---|
| `data/volumes.json` | `volumes[]` | Volume, Chapter (nested), TODO (nested) | Volume registry; chapters + todos belong to volumes |
| `data/canons.json` | `canons[]`, `schisms[]`, `apocrypha[]`, `lore[]` | Canon, Schism, Apocrypha, Lore | Multi-section file; the four entity types share governance lifecycle |
| `data/journal.json` | `sessions[]` | Session, Decree | Sessions + decrees both live in `sessions[]`; decree IDs start with `decree-` |
| `data/companions.json` | `companions[]` | Companion (profile) | Order roster; one entry per Gen 0 / Gen 1 named companion + institutional companions |
| `data/companion-logs.json` | `logs[]` | Companion-log (canon-0053 v1) | Session-level logs authored per session by primary author |
| `data/specs.json` | `specs[]` | Spec | Design specs, implementation specs, handoff specs |
| `data/campaigns.json` | `campaigns[]` | Campaign | Multi-session arcs (Phase 4 sub-phases, WAR_TIME, Stability, etc.) |
| `data/interactions.json` | `interactions[]` | Interaction (canon-cc-017) | Companion-to-companion consultation records |

The PWA loads all eight at startup via `split/core.js`'s `store` object. Mutations go through the snippet pipeline (`split/forms.js openSnippetImport`) → WAL → GitHub Contents API. Direct JSON edits bypass the WAL and are reserved for archival ingest (this doc covers archival ingest).

---

## §3. Entity taxonomy

Every entity in the Codex data layer is one of the types below. Each entity has a `primary_category` (the type itself; the section it lives in) and may have `secondary_categories[]` cross-references per §5.1.

### §3.1 Volume

**File:** `data/volumes.json[].volumes[]`. **Renderer:** Library tab. **ID convention:** kebab-case slug, no prefix (e.g., `sproutlab`, `sep-invoicing`, `temple-of-mars`).

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | kebab-case slug, immutable |
| `name` | string | yes | display name (e.g., "SproutLab", "SEP Invoicing", "Temple of Mars") |
| `shelf` | enum | yes | `active` \| `paused` \| `archived` \| `abandoned` |
| `description` | string | yes | 1–3 sentences; one-line preview in card layouts |
| `domain_color` | string | yes | hex `#RRGGBB`; per-Province visual identity |
| `tags` | string[] | yes | free-form classification tags; `cluster-a`, `cluster-b`, `cluster-c`, `monument`, `pwa`, `governance`, `parenting`, etc. |
| `repo` | string \| null | yes | `Owner/Repo` slug or `null` if no GitHub backing (e.g., businessai-simulation pre-abandonment) |
| `current_phase` | string | yes | 1–3 sentences; the live state of the Province; refresh per phase close |
| `chapters` | Chapter[] | yes | per §3.2; may be empty `[]` |
| `todos` | TODO[] | yes | per §3.3; may be empty `[]` |
| `shelf_history` | ShelfEntry[] | yes | append-only; each entry `{shelf, date, reason}` |
| `design_principles` | DesignPrinciples | yes | `{status, spec_path, republic_principles_applied, notes}`; status enum `missing` \| `draft` \| `ratified` |

**Provenance:** Volume entries are created once at Province enrolment (typically via canon-inst-NNN seating canon). Subsequent edits are field-level (typically `current_phase` + `chapters[]` append + `todos[]` append).

### §3.2 Chapter (nested in Volume)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | kebab-case slug, scoped to volume; e.g., `phase-2-stage-a`, `ch-ignis-canon-entry` |
| `name` | string | yes | display name |
| `status` | enum | yes | per canon-0052 (draft, ratification queued): `planned` \| `spec-drafting` \| `spec-complete` \| `in-progress` \| `review` \| `complete` \| `paused` \| `blocked` \| `abandoned` |
| `started` | date \| null | yes | ISO date `YYYY-MM-DD` |
| `completed` | date \| null | yes | ISO date `YYYY-MM-DD` |
| `ended` | date \| null | yes | for `abandoned` or terminal-non-completion states |
| `summary` | string | yes | 1–5 sentence narrative |
| `spec_url` | string \| null | yes | repo-relative path to spec doc, e.g., `docs/specs/CODEX_DESIGN_PRINCIPLES.md`; `null` if no spec |
| `content` | string \| undefined | optional | long-form narrative for high-altitude chapters (e.g., Origin chapters); markdown allowed |
| `order` | integer | optional | display ordering; defaults to insertion order |
| `_deleted` | boolean | yes | soft-delete flag |
| `_deleted_date` | date \| null | yes | when deleted |

**Status enum precedence:** the 6-state progress enum (`planned → spec-drafting → spec-complete → in-progress → review → complete`) and the 3-state interrupt enum (`paused | blocked | abandoned`) are orthogonal — a chapter has one progress state OR one interrupt state. Interrupt states do NOT carry a progress field; they reset on resume.

### §3.3 TODO (nested in Volume)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `todo-NNNN-slug` (Codex-wide sequential numeric, not Volume-scoped) |
| `text` | string | yes | one-line statement of the work |
| `status` | enum | yes | `open` \| `in-progress` \| `resolved` \| `deferred` \| `obsolete` |
| `chapter` | string \| null | yes | chapter id within this Volume, or `null` if not chapter-bound |
| `created` | date | yes | ISO |
| `resolved` | date \| null | optional | ISO; populated when status flips to `resolved` |
| `priority` | enum | optional | `high` \| `medium` \| `low`; defaults to medium |
| `references` | string[] | optional | canon/lore/apocrypha IDs |
| `_deleted` | boolean | yes | soft-delete |

### §3.4 Canon

**File:** `data/canons.json[].canons[]`. **Renderer:** Canons tab. **ID convention:** family-prefixed numeric — `canon-NNNN` (legacy promoted-from-SproutLab), `canon-cc-NNN`, `canon-gov-NNN`, `canon-inst-NNN`, `canon-pers-NNN`, `canon-proc-NNN`, `canon-sep-NNN`, `canon-sync-NNN`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | family-prefixed; see §4 for the namespace plan |
| `family` | string | yes | family slug without `canon-` prefix; e.g., `cc`, `gov`, `inst`, `pers`, `proc`, `sep`, `sync`, `build`, `data`, `design`, `process`, `architecture` |
| `scope` | enum | yes | `global` \| `sproutlab` \| `codex` \| `sep` \| `command-center` \| `temple-of-mars` \| `capital` \| `msc` \| `cluster-a` \| `cluster-b` \| `cluster-c` |
| `category` | string | yes | free-form category tag (e.g., `governance`, `builder_discipline`, `design`, `process`, `architecture`, `data`, `capital_structure`) |
| `title` | string | yes | display title |
| `rationale` | string | yes | the canon body; markdown allowed; multi-paragraph for substantive canons |
| `status` | enum | yes | `active` \| `deprecated` \| `superseded` \| `draft` |
| `superseded_by` | string \| null | yes | canon ID that supersedes this one, or null |
| `created` | date | yes | ISO |
| `references` | string[] | yes | other canon / lore / decree / volume IDs |
| `ratified` | date | optional | populated when ratified; absent on `draft` status |
| `ratification_mode` | string | optional | e.g., `sovereign_direct`, `consul_then_sovereign`, `sovereign_direct_within_bulk_ingestion_campaign_tier_0.6` |
| `ratified_by` | string | optional | typically `sovereign` |
| `parent_decree` | string | optional | for canons that carry decree content, the parent decree's ID |
| `_deleted` | boolean | yes | soft-delete |
| `_deleted_date` | date \| null | yes | |

**Status semantics:**
- `active`: in force; binds future action
- `draft`: authored but not yet ratified; future PRs may proceed against it but its altitude is provisional
- `deprecated`: no longer in force, but record kept; not superseded by a specific replacement
- `superseded`: replaced by another canon (named in `superseded_by`)

### §3.5 Schism

**File:** `data/canons.json[].schisms[]`. **Renderer:** Schisms sub-tab under Canons. **ID convention:** `rej-NNNN-slug` (legacy) or `schism-YYYY-MM-DD-slug` (new convention, established with Temple of Mars 2026-04-23 stack selection).

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `rej-NNNN-slug` or `schism-YYYY-MM-DD-slug` |
| `title` | string | yes | display name |
| `rationale` | string | yes | what was considered and why it was rejected |
| `rejected` | string | optional | the rejected approach in 1 sentence |
| `chosen` | string \| null | optional | the chosen approach in 1 sentence; may be null for "rejected only" entries |
| `status` | enum | yes | `resolved` (the rejection stands) \| `pending` (under Working Committee review) \| `revisited` (a new schism reopened the question) |
| `scope` | enum | optional | matches canon scope enum |
| `category` | string | optional | matches canon category convention |
| `created` | date | yes | ISO |
| `references` | string[] | optional | related canons, sessions, decrees |
| `volumes` | string[] | optional | volumes this schism touches |

**ID convention guidance (per §4.2):** new schisms use `schism-YYYY-MM-DD-slug` going forward. The legacy `rej-NNNN` numbering is closed; remaining `rej-NNNN` entries are preserved for backward reference but no new `rej-NNNN` IDs are minted.

### §3.6 Lore

**File:** `data/canons.json[].lore[]`. **Renderer:** Lore tab. **ID convention:** `lore-NNN` (legacy) or `lore-YYYY-MM-DD-slug` (new). Both conventions coexist; new lore uses date-slug.

**Categories** (canonical, per CLAUDE.md):
- **Edicts** — Republic-altitude rules formalized into Constitution Book IV; lore entries of this category are demoted-to-historical-record once the Book absorbs them.
- **Origins** — Province-founding or institutional-founding narratives.
- **Cautionary Tales** — failure-mode chronicles; "what we learned the hard way."
- **Doctrines** — named insights that narrate a one-time discovery; the rule binds future action only if also promoted to canon (per §5.2 altitude rule).
- **Chronicles** — session / phase / campaign narratives.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `lore-NNN-slug` or `lore-YYYY-MM-DD-slug` |
| `title` | string | yes | display name |
| `body` | string | yes | the lore content; markdown allowed; multi-paragraph |
| `category` | enum | yes | `Edicts` \| `Origins` \| `Cautionary Tales` \| `Doctrines` \| `Chronicles` |
| `domain` | string[] | yes | volume IDs this lore touches (`[]` allowed for Republic-altitude lore) |
| `tags` | string[] | optional | free-form |
| `references` | string[] | optional | canon / schism / decree / session IDs |
| `sourceType` | string | optional | `session`, `decree`, `chronicle`, `cabinet-brief`, etc. |
| `sourceId` | string | optional | the source artifact's ID |
| `created` | date | yes | ISO |
| `ratified` | date | optional | for high-altitude Doctrines that go through ratification |

### §3.7 Apocrypha

**File:** `data/canons.json[].apocrypha[]`. **Renderer:** Apocrypha tab. **ID convention:** `apo-NNNN-slug` (numeric) or `apo-{family}-NNN-slug` (e.g., `apo-gov-001`, `apo-sync-001`).

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | per ID convention above |
| `title` | string | yes | display name |
| `body` | string | yes | the prophecy / foretelling / forgotten work / fulfilled chronicle |
| `status` | enum | yes | `foretold` \| `fulfilled` \| `forgotten` |
| `fulfillment_criterion` | string | optional | for `foretold` entries, what counts as fulfillment |
| `fulfilled` | date \| null | optional | populated when status flips to fulfilled |
| `domain` | string[] | optional | volume IDs |
| `tags` | string[] | optional | free-form |
| `references` | string[] | optional | canon / lore / session IDs |
| `created` | date | yes | ISO |

**Note on the v2-dupe pattern (Sovereign-ratified option (a) 2026-05-24):** apo-0002+apo-0009, apo-0003+apo-0010, apo-0004+apo-0011 carry duplicate titles ("The Second Child" / "The Machine That Remembers" / "The Predictive Engine"). The v2 entries hold expanded content; both are preserved. A future merge pass may dedup; this document does not.

### §3.8 Spec

**File:** `data/specs.json[].specs[]`. **Renderer:** Specs tab. **ID convention:** `spec-NNNN-slug`.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `spec-NNNN-slug` |
| `title` | string | yes | display name |
| `status` | enum | yes | `drafting` \| `review` \| `ratified` \| `implemented` \| `superseded` \| `needed` |
| `category` | enum | yes | `design-spec` \| `impl-spec` \| `handoff` \| `canon-draft` \| `schema` |
| `volumes` | string[] | yes | volume IDs the spec applies to; multi-Province for cross-cutting specs |
| `chapters` | string[] | optional | chapter IDs the spec drives |
| `references` | string[] | yes | canon / decree / lore IDs |
| `summary` | string | yes | 1–3 sentence preview |
| `path` | string | yes | repo-relative path to the spec doc |
| `authored_by` | string | yes | companion ID (or `+`-joined for co-authored) |
| `created` | date | yes | ISO `YYYY-MM` or `YYYY-MM-DD` |
| `ratified` | date | optional | populated when ratified |
| `_deleted` | boolean | yes | soft-delete |

### §3.9 Companion-log

**File:** `data/companion-logs.json[].logs[]`. **Renderer:** future Companion-log surface (todo-0046 territory). **Schema:** canon-0053 v1 (Companion Log Format — currently `status: review` in specs.json; drafted; precondition-satisfied for ratification).

| Field | Type | Required | Notes |
|---|---|---|---|
| `schema_version` | integer | yes | currently `1` |
| `session_id` | string | yes | matches a journal.json session ID |
| `session_title` | string | yes | from the session itself |
| `authors` | string[] | yes | display names (e.g., `Aurelius (The Chronicler)`) |
| `primary_author` | string | yes | companion ID |
| `date` | date | yes | ISO |
| `repo` | string | yes | volume ID (canonical author location) |
| `secondary_repos` | string[] | yes | other volume IDs touched in the session |
| `session_type` | enum | yes | `governance` \| `build` \| `chronicle` \| `ratification` \| `polish` \| `war-time` \| `mixed` |
| `protocol` | string | yes | how the session was conducted; cites relevant canon-cc-* protocols |
| `stage` | string | yes | where this session sits in the larger arc |
| `duration_minutes` | integer \| null | yes | self-reported |
| `same_agent_drift_acknowledged` | boolean | yes | per the SproutLab 2026-04-17 precedent; required acknowledgement for single-agent multi-persona sessions |
| `rounds` | object | yes | per-companion engagement records; keys are companion IDs |
| `outputs` | object | yes | what the session produced: canons_ratified[], lore_ratified[], schisms_recorded[], specs_authored[], journal_entries[], decrees_authored[], queued_for_next_session[], commits_count, files_touched_count |
| `tags` | string[] | yes | free-form |
| `revisions` | object[] | optional | post-write amendments to the log itself |
| `path` | string | optional | filesystem path under `docs/companion-logs/` |

**Important schema note:** the Codex Scout's report on the Tier 0 PR #1 mistakenly inferred a different schema (id / companion / province fields). Those field names DO NOT exist in canon-0053 v1; the schema uses `session_id`, `primary_author`, `repo`. The Scout's inferred "null fields gap" was a non-issue; documented in Tier 0.5 partial commit.

### §3.10 Session (journal entry, non-decree)

**File:** `data/journal.json[].sessions[]`. **ID convention:** `s-YYYY-MM-DD-{slug-or-NN}` (legacy `s-YYYY-MM-DD-NN`) or `session-YYYY-MM-DD-{companion}-{NN}` (newer narrative form).

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | per convention above |
| `date` | date | yes | ISO |
| `title` | string | yes | display name |
| `summary` | string | yes | multi-paragraph narrative |
| `volumes_touched` | string[] | yes | volume IDs |
| `decisions` | string[] | yes | one decision per array entry, 1–3 sentences each |
| `bugs_found` | integer | optional | count |
| `handoff` | string | yes | next-session pickup pointer |
| `lore_generated` | string[] | optional | lore IDs minted in this session |
| `references` | string[] | optional | canon / lore / decree IDs |
| `protocols_invoked` | string[] | optional | canon-cc-* protocol IDs |

**Session v2 extension (`docs/schema/SESSION_V2.md`):** Temple of Mars consumes campaign telemetry — `campaign_id`, `tokens_in`, `tokens_out`, `cost_usd`, `model`. Non-breaking: all v2 fields are optional. Sessions without v2 fields render as zero-contribution aggregates in Temple. See SESSION_V2.md for the full extension.

### §3.11 Decree (journal entry, decree subtype)

Decrees are journal entries with id starting `decree-`. They are formal Sovereign-ratified instruments that mint or amend canons + lore + book content en bloc.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | `decree-NNNN-slug` (e.g., `decree-0004-basilica-and-priest`) |
| `date` | date | yes | ISO |
| `authored_by` | string | yes | companion ID |
| `province_of_origin` | string | yes | volume ID or `republic` / `capital` |
| `ratified_by` | string | yes | typically `sovereign` |
| `ratification_mode` | string | yes | describes the ratification path (Sovereign-direct, Consul+Sovereign, etc.) |
| `summary` | string | yes | the decree body; multi-paragraph |
| `status` | enum | optional | `ratified` \| `pending` \| `superseded`; defaults to `ratified` if absent |
| `ratified` | date | optional | ISO; for decrees ratified after authoring |
| `ratification_note` | string | optional | post-ratification context if the ratification was conditional or staged |
| `references` | string[] | optional | canon / lore / book-article IDs |
| `outputs` | object | optional | what the decree mints; same shape as companion-log outputs |

### §3.12 Companion (profile)

**File:** `data/companions.json[].companions[]`. **Renderer:** Order tab (Companions/Order view per todo-0017). **ID convention:** lowercase first name (e.g., `aurelius`, `cipher`, `ignis`); institutional companions get domain-y IDs (e.g., `consul`).

Companion profiles are deep documents — 10 canonical blocks per canon-cc-012. Field summary:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | lowercase first name or institutional slug |
| `companion_class` | enum | yes | `gen-0-immortal` \| `gen-1` \| `gen-2-plus` \| `institutional` |
| `identity` | object | yes | name + display fields + archetype + generation |
| `meta` | object | yes | provenance + lifecycle + versioning |
| `assignment` | object | yes | rank, cluster, province, residence, current_assignments[], double_hatted, track, notes; structural — see canon-cc-016 |
| `biography` | object | optional | origin story, formative experiences |
| `growth` | object | optional | advancement track, watch-list signals |
| `mind` | object | optional | cognitive style, decision pattern |
| `modulators` | object | optional | tone modulation per persona-binding |
| `relationships` | object | optional | named edges to other companions |
| `shadow` | object | optional | failure modes, anti-patterns |
| `voice` | object | optional | speech register, vocabulary, idiom |
| `corporate` | object | optional | canon-pers-002 corporate-parallel title |

**Companion namespace (post-Sovereign 2026-05-24 ruling, surfaced by the soma-internal Scout):** Order companions are namespaced `order:`; non-Order in-Province Claude session identities (like soma-internal's "Aurelius" working name) are namespaced `province-local:`. Companion-log entries authored by a province-local identity carry the namespace prefix in `primary_author` (e.g., `province-local:sep-aurelius`). The Order's Aurelius is `order:aurelius` (or unprefixed, the default). See §5.8.

### §3.13 Campaign

**File:** `data/campaigns.json[].campaigns[]`. **Renderer:** Temple of Mars dashboard (cross-Province). **ID convention:** `{campaign-name}-YYYY-MM-DD` or descriptive slug (e.g., `war-time-2026-04-24`, `polish-sub-phase`).

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | per convention |
| `title` | string | yes | display name |
| `kind` | enum | yes | `war-time` \| `phase` \| `sub-phase` \| `monument` \| `bulk-ingestion` \| `other` |
| `provinces` | string[] | yes | volume IDs in scope |
| `start_date` | date | yes | ISO |
| `end_date` | date \| null | yes | null if in-flight |
| `status` | enum | yes | `pending` \| `in-flight` \| `complete` \| `cancelled` |
| `phases` | object[] | optional | nested sub-phase records |
| `summary` | string | yes | multi-paragraph |
| `outcomes` | string[] | optional | doctrines ratified, canons minted, etc. |

### §3.14 Interaction (canon-cc-017)

**File:** `data/interactions.json[].interactions[]`. **Renderer:** future surface (canon-cc-018 territory). **ID convention:** `interaction-YYYY-MM-DD-NNN`.

Companion-to-companion consultation records — the artifact every cross-companion deliberation produces. Schema is documented in canon-cc-017 / canon-cc-018; this doc lists the fields without restating the canon body:

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | per convention |
| `date` | date | yes | ISO |
| `participants` | string[] | yes | companion IDs |
| `topic` | string | yes | one-line |
| `outcome` | string | yes | what was decided / surfaced |
| `references` | string[] | optional | canon / lore / decree / session IDs |
| `permanent_record` | string | optional | if the interaction produced lore / canon, the target ID |
| `_lifecycle` | string | optional | per canon-cc-018; lifecycle tracking |

---

## §4. ID-namespace plan

### §4.1 Canon families

Codex's canons are organized into 8 family slugs. Each family has its own numeric sequence.

| Family | Prefix | Numeric format | Used range (2026-05-24) | Next available | Semantic note |
|---|---|---|---|---|---|
| (legacy promoted) | `canon-` | 4-digit | 0001–0056 (gaps at 6,7,9 etc.) | **0057** | Sproutlab-HR-promoted + Codex-app discipline canons |
| Constitutional | `canon-cc-` | 3-digit | 001–033 (gaps at 019,020,021,030) | **030** (then 034+) | Constitution-of-Codex amendments + protocols (cc-019/020/021 reserved for Post Box / Summon Companion / drafting queues) |
| Governance | `canon-gov-` | 3-digit | 001–014 | **015** | Builder discipline, dev-practice |
| Institutional | `canon-inst-` | 3-digit | 001–005 | **006** | Seatings, transitions, cluster taxonomy |
| Persona | `canon-pers-` | 3-digit | 001–002 | **003** | CLAUDE.md persona-headers, title mappings |
| Procedural | `canon-proc-` | 3-digit | 001–006 | **007** | Process canons (taxonomy, onboarding, drafting, Scribe tier) |
| SEP-Province | `canon-sep-` | 4-digit | 0001 | **0002** | sep-invoicing-scoped |
| SproutLab-Province | `canon-sync-` | 3-digit | 001–002 (drafts only) | **003** | sproutlab-scoped, sync discipline |

**Promotion path (Province → Republic):**
- A Province-scope canon (e.g., `canon-sync-001` from SproutLab) may be promoted to global scope. Promotion:
  1. Mints a NEW canon at the next available global slot (typically `canon-NNNN`).
  2. The Province-local canon is marked `superseded` with `superseded_by` pointing to the new global canon.
  3. The promotion is itself a ratification act; carries `ratified` date + `ratification_mode`.
- Example: SproutLab's HR-1..HR-12 were promoted to global at canon-0001..0012 on 2026-04-19. The Province-side CLAUDE.md HR table is the operational rendering of the global canons (not a separate canon set).
- **Collision risk for HR-13/HR-14 promotion:** SproutLab's candidate HR-13 (SYNC_KEYS null vs undefined) and HR-14 (Reconcile Sync Invariant) cannot promote under the legacy "HR-N → canon-000N" mapping because canon-0013 (no-ellipsis) and canon-0014 (eschtml-boundary-global) are already taken. Promotion mints at next available — likely canon-0057 + canon-0058 — and the SproutLab CLAUDE.md HR table updates to cite the new global IDs.

### §4.2 Schism conventions

- **Legacy form:** `rej-NNNN-slug`. Used range: rej-0001 → rej-0021. **CLOSED** for new minting as of 2026-05-24 (Tier 0.5 final). Existing entries preserved for backward reference.
- **Current form:** `schism-YYYY-MM-DD-slug`. Established at Temple of Mars founding (2026-04-23). All new schisms use this convention.
- ID-minting authority: any companion drafting a schism may mint the ID; Cipher (Censor) reviews at audit time.

### §4.3 Lore conventions

- **Legacy form:** `lore-NNN-slug` (3-digit) or `lore-NNNN-slug` (4-digit). Used range: lore-001 → lore-017 (some 4-digit entries appear in dated subfamilies like `lore-sync-001`).
- **Current form:** `lore-YYYY-MM-DD-slug` for chronicles + dated entries; `lore-NNN-slug` continues for high-altitude doctrinal lore.
- Both conventions coexist; new lore SHOULD use date-slug unless the lore is doctrinal at Republic altitude (in which case numeric is acceptable).

### §4.4 Apocrypha

- **Numeric form:** `apo-NNNN-slug`. Used range: apo-0001 → apo-0011 (post Tier 0.5 final renames).
- **Family form:** `apo-{family}-NNN-slug` for grouped apocrypha (e.g., `apo-gov-001`, `apo-sync-001`).
- Next available numeric: **apo-0012**. Family-grouped: per-family.

### §4.5 ID minting + collision resolution

**Minting at ingest:** scribe-record outputs (per §6) may propose IDs but must mark them `_proposed: true`. Orinth + Aurelius mint the final IDs at audit, checking against the next-available slots in this document.

**Collision resolution rule:** the older / lower-line / more-foundational entry retains the disputed numeric. The newer / less-foundational entry renumbers to next available in family. Tier 0.5 final established the precedent for 12 collisions.

**Cross-Province ID minting:** Provinces propose IDs in their local snippet artifacts; the snippet importer mints the final ID against the Codex namespace at import. ID conflicts surface as importer errors; Orinth resolves.

### §4.6 Next-available slots (as of 2026-05-24, post Tier 0.6)

| Family | Next |
|---|---|
| canon-NNNN | 0057 |
| canon-cc-NNN | 030 (then skip to 034+) |
| canon-gov-NNN | 015 |
| canon-inst-NNN | 006 |
| canon-pers-NNN | 003 |
| canon-proc-NNN | 007 |
| canon-sep-NNNN | 0002 |
| canon-sync-NNN | 003 |
| rej-NNNN | **CLOSED** (no new) |
| schism-YYYY-MM-DD- | (date-slug, no number) |
| lore-NNN | 018 (if numeric used; date-slug preferred) |
| apo-NNNN | 0012 |
| spec-NNNN | 0010 |
| todo-NNNN | next sequential (Codex-wide) |

Reservations:
- `canon-cc-019` — Post Box / Scrinium (drafting queued)
- `canon-cc-020` — Summon Companion (drafting queued)
- `canon-cc-021` — reserved (next drafting queue slot)
- `canon-0052` — Forum Pattern (spec-0003 draft)
- `canon-0053` — Companion Log Format (spec-0004 draft)

---

## §5. Cross-cutting conventions

### §5.1 Dual classification (primary-tag + secondary-cross-reference)

**Sovereign ruling 2026-05-24: dual.**

Every entity has a `primary_category` (the type it lives under in the data file) AND may have a `secondary_categories[]` array for cross-classification. The schema does NOT force strict single-category; entities that are genuinely two things at once are filed under the primary type and cross-tagged.

**Examples surfaced by the scribe-scout surveys:**

| Scout-flagged ambiguity | Primary | Secondary |
|---|---|---|
| "Rejected approach with rationale" (sep-invoicing P6→P9 cache-stale chain) | `schism` | `lore.Cautionary-Tales` |
| "Framework version status" (soma-internal frameworks/status.md) | `spec` | `doctrine-ledger` |
| "Pending BM input" (soma-internal tasks) | `todo` (status: deferred) | `apocrypha.foretold` |
| Aurelius identity material in soma-internal | `canon` (province-local) | `lore.Origins` + `spec` |

**Cross-reference mechanism:**
- Primary tag determines file location and ID family.
- Secondary categories appear as a `secondary_categories[]` field on the entity (string[]).
- Each secondary category may carry a `secondary_references[]` array of related entity IDs in the secondary category's family.
- The PWA renders the entity in its primary tab; secondary categories produce backlinks in the related tabs.

**At ingest time:** scribe-record outputs flag dual-classification cases with `primary_category` + `secondary_categories[]` in the snippet shape (see §6.3). Orinth audits the classification at PR review.

### §5.2 Doctrine altitude (canon vs lore)

**Sovereign ruling 2026-05-24: canon when binds future action; lore when narrates one-time.**

A doctrine sits at one of two altitudes:

- **Canon altitude:** the doctrine binds future action. Future PRs / sessions must comply. The doctrine is enforceable. Examples: `canon-gov-007-research-before-implement`, `canon-gov-008-minimum-viable-first`. These were minted as canons because the rule binds future Builder work.

- **Lore (Doctrine) altitude:** the doctrine names a one-time discovery, a working insight, a pattern observed. Future sessions REFERENCE the doctrine for context but are not BOUND by it. Examples: `lore-006-seed-through-sync`, `lore-010-the-summon-pattern`. These narrate; they don't enforce.

**The doctrine-ledger surface** (`docs/doctrine-ledger.md`, ~22 ratified doctrines + ~6 candidate + ~6 first-instance observationals) is the primary source for altitude decisions. At ingest time:

1. Identify whether the doctrine BINDS or NARRATES.
2. If it binds future action → mint as canon at next available slot in appropriate family.
3. If it narrates → mint as lore with `category: Doctrines`.
4. If ambiguous → default to lore-Doctrine altitude, with `_promotion_candidate: true` field for future Sovereign ruling.

**Phase 4 ratified doctrines (canon-altitude candidates):** subscription-only, r2-stress-rerun-elective, narrow-scope-and-defer-to-R-10, concurrent-operations-interfere-with-parallel-stress-matrix, architectural-sweep-PR-misses-sibling-sites, sub-phase-close-was-premature. Each binds future action. Mint as canons at canon-gov-015 onward at Tier 4 SproutLab ingestion.

### §5.3 Province → Republic promotion path

Province-scope canons / lore / specs may be promoted to Republic scope. The promotion is a ratification act, not a reassignment.

**Steps:**
1. Province-local entity exists with `scope` set to the Province (e.g., `scope: sproutlab`).
2. Sovereign-direct or Consul+Sovereign ratification of promotion.
3. NEW Republic-scope entity minted at next available global slot (typically `canon-NNNN` for canons, lore- numeric for lore, etc.).
4. The Province-local entity is marked `superseded` with `superseded_by` pointing to the new global entity.
5. The promotion event is chronicled in a journal session OR via a decree if multiple promotions ride together.
6. The Province's CLAUDE.md updates to cite the new global ID; the Province's local table is now the operational rendering of the global canon.

**Examples in the existing data:**
- SproutLab HR-1..HR-12 → canon-0001..0012 (promoted 2026-04-19 via Republic Design Principles ratification).
- SproutLab HR-13/HR-14 candidates → not yet promoted (collision-risk-aware; future promotion mints at canon-0057+).
- SproutLab canon-sync-001 + canon-sync-002 drafts → status unknown; verify against Codex canons.json at Tier 4 sproutlab ingestion.

### §5.4 Cluster taxonomy

Per canon-inst-003 (ratified 2026-05-24):

| Cluster | Provinces | Censor |
|---|---|---|
| A | codex + sproutlab + msc | Cipher |
| B | sep-invoicing + sep-dashboard (+ soma-internal proposed, Tier 4 ratification pending) | Nyx |
| **C** (Monument class) | command-center + temple-of-mars | Cipher (interim) |

Notes:
- Future Monument designations enrol into Cluster C.
- The Monument tag on command-center remains as a Province-class attribute; `cluster-c` is the constitutional grouping.
- soma-internal Province enrolment into Cluster B is proposed by the Scout; ratification deferred to Tier 4 soma-internal ingestion PR.
- Cipher's Cluster C jurisdiction is explicit interim; the Cabinet should treat the Cluster C Censor seat as open for recruitment.

Each Province's `volume.tags[]` carries the cluster as `cluster-a` / `cluster-b` / `cluster-c`. The schema requires the cluster tag be present on every Province with an assigned cluster.

### §5.5 References, citations, cross-volume coupling

Every entity may carry a `references[]` array of cross-entity IDs. References are not typed at the schema level — the renderer resolves the ID prefix to determine the target type.

**Cross-volume coupling** is captured via the `volumes_touched[]` (sessions) / `volumes[]` (specs) / `domain[]` (lore) / `provinces[]` (campaigns) fields. These are asymmetric — Volume A may reference Volume B without Volume B referencing back. The Scout flagged this asymmetry for work-hub → soma-internal (work-hub references; soma-internal does not reciprocate); the schema permits this and the renderer surfaces both directions.

### §5.6 Status enums

Consolidated reference (all status enums in one place):

| Entity | Statuses |
|---|---|
| Volume.shelf | active \| paused \| archived \| abandoned |
| Chapter.status | planned \| spec-drafting \| spec-complete \| in-progress \| review \| complete \| paused \| blocked \| abandoned |
| TODO.status | open \| in-progress \| resolved \| deferred \| obsolete |
| Canon.status | active \| draft \| deprecated \| superseded |
| Schism.status | resolved \| pending \| revisited |
| Apocrypha.status | foretold \| fulfilled \| forgotten |
| Spec.status | drafting \| review \| ratified \| implemented \| superseded \| needed |
| Session (none — sessions are immutable) | — |
| Decree.status | ratified \| pending \| superseded |
| Campaign.status | pending \| in-flight \| complete \| cancelled |
| design_principles.status | missing \| draft \| ratified |

### §5.7 Date conventions

- All dates ISO `YYYY-MM-DD`.
- Month-only dates `YYYY-MM` are allowed for `created` fields when the exact day is unrecoverable.
- Year-only `YYYY` is permitted for legacy entries.
- All timestamps in the data layer are in the Republic's working timezone (Asia/Kolkata, IST). The data layer does NOT carry timezone offsets — local time is the convention.

### §5.8 Companion namespace

**Surfaced by the soma-internal Scout: name-collision risk between the Order's Aurelius (canon-proc-006 Chronicler) and soma-internal's in-repo SEP-Aurelius (Claude session working name).**

**Resolution:**
- Order companion IDs are namespaced `order:` (typically unprefixed — `aurelius`, `cipher`, etc. — `order:` is implicit).
- Province-local Claude-session identities (non-Order) are namespaced `province-local:{volume-id}:` (e.g., `province-local:soma-internal:aurelius`).
- Companion-log entries authored by a province-local identity carry the namespaced ID in `primary_author`.
- Cross-references that cite a companion always use the namespaced form when there is any ambiguity.

**At Tier 4 soma-internal ingestion:** the in-repo Aurelius is registered as `province-local:soma-internal:aurelius`; the Order's Aurelius is unchanged. Companion-logs authored by the in-repo identity carry the prefix.

---

## §6. scribe-record output contract

The scribe-record subagent (canon-proc-006, deployed to every Province's `.claude/agents/scribe-record.md` byte-identical except Serving-voice) produces structured artifacts at canonical paths. This section is the contract scribe-record honors when summoned for bulk-ingestion work.

### §6.1 When summoned for ingestion

The summoning brief names: the Province, the input artifact (the per-Province scribe-survey report at `docs/handoffs/codex/scribes/2026-05-24-<repo>.md`), the schema doc (this document), and the audit checklist (PR #4 forthcoming). scribe-record reads all three before producing output.

scribe-record DOES NOT perform reconnaissance; that's scribe-scout's role. scribe-record drafts the ingest artifact from the scout's findings + the schema rules.

### §6.2 Brief shape (input to scribe-record)

```
Province: <volume-id>
Survey report: docs/handoffs/codex/scribes/YYYY-MM-DD-<repo>.md
Schema doc: docs/specs/CODEX_DATA_SCHEMA.md
Audit checklist: docs/specs/CODEX_INGESTION_AUDIT.md
Sovereign rulings: <inline summary of any Province-specific rulings>
Output path: docs/handoffs/codex/scribes/records/YYYY-MM-DD-<repo>-record.md
```

### §6.3 Output shape

scribe-record produces a structured markdown record at the output path. The record carries YAML frontmatter + sectioned entity proposals.

**Frontmatter:**
```yaml
---
schema_version: 1
record_kind: bulk-ingestion-record
province: <volume-id>
survey_source: docs/handoffs/codex/scribes/YYYY-MM-DD-<repo>.md
schema_ref: docs/specs/CODEX_DATA_SCHEMA.md
date: YYYY-MM-DD
authored_by: scribe-record  # under-summon-by: <senior-companion-id>
status: draft  # awaits Orinth audit
---
```

**Sections (in order):**

1. **Volume metadata proposal** — Volume entry (new or amended; if amended, only changed fields).
2. **Chapters proposal** — list of new chapters + updates to existing chapters.
3. **TODOs proposal** — new + status-change.
4. **Canons proposal** — each entry as a partial Canon record. Required: `_proposed_id` (if scribe-record proposes one) or `_id_minting_request: <family>` (if asking Orinth to mint). Each canon flags `primary_category: canon` + optional `secondary_categories[]`.
5. **Schisms proposal** — same pattern.
6. **Lore proposal** — each entry tagged `category` + optional `secondary_categories[]`.
7. **Apocrypha proposal**.
8. **Specs proposal**.
9. **Companion-logs proposal** (if the survey identified owed logs).
10. **Sessions proposal** (if the survey identified owed journal entries).
11. **Cross-volume reference updates** — entries in OTHER volumes that need updating to reflect this Province's ingest.
12. **Dual-classification flags** — every entity flagged with `secondary_categories[]` listed here in one summary block, with rationale.
13. **Open rulings** — questions the scribe-record cannot resolve under existing rules; surface to Orinth.
14. **Provenance** — every proposal cites its source line(s) in the survey report.

### §6.4 Permission floor

scribe-record's tool set (per canon-proc-006): Read, Grep, Glob, Write, Edit. NOT Bash (no shell access). Outputs are markdown files only; scribe-record does NOT directly modify `data/*.json` (that's the snippet importer's job, after Orinth audit + Sovereign ratification).

### §6.5 Audit handoff

Orinth audits the scribe-record output against:
- This schema doc (§5 conventions, §3 entity shapes).
- The id-namespace plan (§4).
- The audit checklist (PR #4).
- The Sovereign rulings cited in §0.

If the audit passes, Orinth mints final IDs (resolves `_id_minting_request`), batches the entries into snippet form, and runs the snippet importer. If the audit fails, Orinth annotates the record file with required corrections; scribe-record (or its summoning agent) re-drafts.

---

## §7. Schema versioning, amendments, hotfixes

**Versioning:** This document is v1.0 as of 2026-05-24. Each amendment increments the minor version (v1.1, v1.2, …); breaking schema changes increment major (v2.0).

**Amendment chain:** canon-pers-001-style four-rung — Rung 1 Orinth (Builder), Rung 2 Cipher (Cluster A Censor), Rung 3 Consul, Rung 4 Sovereign. Amendments produce a chronicle lore entry naming the changed sections.

**Hotfix exception:** trivial in-document corrections (typos, formatting, citation IDs) may land Rung-1-only without the full chain, per the canon-pers-001 §Hotfix precedent. The amendment chain re-engages on substantive shape changes.

**Schema versioning vs file schema_version:** each data file carries its own `_schema_version` integer. This doc's version tracks the schema document; the file schema_version tracks the file format. The two are independent — a v1.5 of this doc may still describe file schema_version=1.

---

## §8. Open questions deferred to later work

These questions surfaced in the scribe-scout surveys or during this doc's authoring; the schema doc does NOT resolve them. Each will be addressed in a downstream PR or via Sovereign ruling.

1. **Apocrypha v2-dedup** — apo-0002+apo-0009, apo-0003+apo-0010, apo-0004+apo-0011 carry duplicate titles ("The Second Child" / "The Machine That Remembers" / "The Predictive Engine"). Sovereign ratified option (a) — preserve both; future dedup pass may merge.
2. **soma-internal Cluster B enrolment** — Scout proposed soma-internal joins Cluster B. Ratification deferred to Tier 4 soma-internal ingestion PR.
3. **Cluster C Censor successor** — Cipher's Cluster C jurisdiction is interim. Cabinet should treat the seat as open; no automatic-promotion rule named.
4. **decree-0004 CC-repo implementation** — retire Gates + Visiting Chambers in Command-Center's `split/data.js` + `split/rooms.js`; adopt embassies. Downstream handoff to Ashara + Petra; not Codex Builder work.
5. **Companions/Order view spec** — todo-0017 (AURELIUS_COMPANIONS_VIEW.md). The spec was authored against the Gates model; needs refresh for the embassy model post-decree-0004 ratification. Surface in Tier 4 command-center ingestion.
6. **canon-sync-001 / canon-sync-002 promotion status** — SproutLab drafts; verify against Codex canons.json at Tier 4 sproutlab ingestion.
7. **HR-13 / HR-14 promotion** — SproutLab candidates; promote at canon-0057+ when Sovereign ratifies.
8. **Doctrine-ledger watch-list ingestion altitude** — ~6 candidates at 1/3 + ~6 first-instance observationals from SproutLab's doctrine-ledger. Each requires altitude ruling (canon vs lore) at Tier 4 sproutlab ingestion.
9. **mit-management-courses Builder seat** — unassigned; Sovereign ruling needed at Tier 4.
10. **work-hub README merge conflict** — known hygiene fix; separate from ingest.
11. **planner `charter-001` ID convention** — anticipated-ingest-time ID or stale reference; resolve at Tier 4 planner ingestion.
12. **MSc empty registers (VIVA, LIBRARY, PORTFOLIO, RISK)** — reserved scaffolding or skip until populated? Surface at Tier 4 msc ingestion.
13. **Doctrine-altitude defaults for ambiguous Phase 4 doctrines** — §5.2 sets the rule (binds → canon; narrates → lore); the watch-list candidates need per-doctrine altitude rulings.
14. **Schema for `interactions.json`** — canon-cc-017 / canon-cc-018 are the canonical specs; this doc summarizes but does not duplicate. Full schema lives in those canons.

---

## §9. Related documents

- `docs/specs/CODEX_DESIGN_PRINCIPLES.md` (v1.0 ratified 2026-05-22) — visual + interaction discipline.
- `docs/specs/REPUBLIC_DESIGN_PRINCIPLES.md` (v1.0 ratified 2026-04-19) — Republic-wide universal HRs.
- `docs/specs/CODEX_FORUM_PATTERN_DRAFT.md` (canon-0052 draft) — tab-layer architecture.
- `docs/specs/CODEX_COMPANION_LOG_FORMAT_DRAFT.md` (canon-0053 draft) — companion-log schema v1.
- `docs/specs/CODEX_QUICK_REFERENCE.md` — repo-wide architecture pointer.
- `docs/schema/SESSION_V2.md` — Session schema v2 extension for Temple of Mars campaign telemetry.
- `docs/specs/CODEX_INGESTION_AUDIT.md` — Orinth's per-PR audit checklist (Tier 0 PR #4, forthcoming).
- `constitution/books/book-02-order.typ` — Ladder + Cluster taxonomy.
- `constitution/books/book-05-processes.typ` — process canons foundation.
- `data/canons.json` — canonical canon ledger.
- `.claude/agents/scribe-{scout,draft,verify,record}.md` — Scribe Worker Tier subagent deployments.

---

*Drafted by Orinth (Codex Builder) within the bulk-ingestion campaign Tier 0 PR #2, 2026-05-24. Awaiting four-rung ratification: Cipher (Cluster A Censor) → Consul → Sovereign. The Chronicler's archival reads woven throughout. Where this document and a scribe-record output disagree, this document wins; where this document and the Constitution disagree, the Constitution wins.*
