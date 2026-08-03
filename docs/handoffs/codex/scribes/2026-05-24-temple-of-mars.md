# Scribe-Scout Survey — TempleOfMars

**Date:** 2026-05-24
**Province:** TempleOfMars (`/home/user/TempleOfMars`) — the Watchtower of the Order
**Summoning agent:** Aurelius — Chronicler of the Order, Codex Province
**Scribe:** Scribe-Scout (canon-proc-006), Worker Tier
**Campaign:** Codex bulk-ingestion, Tier 0 PR #1

> Reconnaissance survey of TempleOfMars — sister Monument to Command Center, first
> Watchtower-class Province (Edict VI, pending Working Committee ratification). The Codex
> archive already holds a heavy, well-formed Temple record. The work below is largely
> cataloguing what is already ingested versus what remains gapped; the bulk-ingestion
> campaign for this Province is, by accident of being founded by a Chronicler session,
> already substantially complete. Remaining gaps named plainly.

---

## 1. Identity & ownership

**What it IS.** A Progressive Web App — the "Watchtower of the Order" — that aggregates live state from the Republic's active provinces and renders it as one installable command-view surface. Read-only by construction (no GitHub credentials shipped). Self-described as "Sister Monument to the Command Center" and proposed under a new structural class called *Watchtower* (Edict VI, pending Working Committee ratification).
- `/home/user/TempleOfMars/README.md:1-5` — title, sister-Monument framing
- `/home/user/TempleOfMars/docs/CHARTER.md:9-13` — Purpose section
- `/home/user/Codex/data/volumes.json:1199-1212` — Codex's Volume record

**Builder seat — canon-inst-003 reserved, NOT yet seated.** This is the key uncertainty. The Codex CLAUDE.md (persona-header section: "canon-inst-003 reserved for the queued Ignis Temple Builder draft") confirms the ID is held but the canon is not active. The actual canons ledger contains canon-inst-001, -002, -004, -005 — `canon-inst-003` is *absent* from `/home/user/Codex/data/canons.json` (verified at the grep of `"id": "canon-inst"`). The draft exists in `docs/` of Codex and was authored at War Tracker Hour 0 (`/home/user/Codex/data/journal.json:234`); cluster-assignment was left `PENDING_SOVEREIGN` with three candidates (`/home/user/Codex/data/journal.json:244`): new Cluster C, attach to Cluster A under Cipher, or Monument-class cluster-less. The companion record itself still reads `current_rank: "Minister"`, `current_assignments: ["Minister: Output (Productivity domain)"]`, `cluster: "Capital"`, `province: null`, `residence: "command-center"` (`/home/user/Codex/data/companions.json:5752-5762`) — the reassignment has been chronicled in narrative but never written to Ignis's profile.

So: the Sovereign decree of 2026-04-23 *declared* Ignis as Builder; the Temple chapter `ch-ignis-canon-entry` (`/home/user/Codex/data/volumes.json:1299-1310`) tracks it as `planned`; the canon slot is held but unratified; the profile is unrefreshed. **The Builder seat is, at the data layer, vacant.**

**Cluster.** Unassigned — three candidates listed above. CHARTER.md leans Cluster C or "new Watchtower cluster" (`/home/user/TempleOfMars/docs/CHARTER.md:63` — Censor TBD).

**Current phase.** "v0.1 live. War Time 2026-04-24 is the first campaign. Ignis assumes Builder seat at Hour 0." (`/home/user/Codex/data/volumes.json:1212`). README.md status block at `/home/user/TempleOfMars/README.md:155-166` shows v0.1 MVP shipped (5 of 7 checkboxes); v0.2 (Lore browser, Peacetime view) explicitly post-War.

**Last meaningful commit.** `8c424b6` 2026-04-24 — "Fix deploy: drop setup-node cache: pnpm (no lockfile to hash) (#4)". The repo has been silent since War Time Hour 0; the five-commit history is entirely founding + deploy fire-drill (verified via `git log --oneline -30`). No War-Time-era commits, no Phase 4 Hardening-era commits. The Temple ships; it has not been re-edited.

**Stack.** SvelteKit 2.x + Svelte 5 runes + adapter-static + TypeScript strict + Tailwind v4 (CSS-first `@theme`) + `@vite-pwa/sveltekit` (Workbox) + pnpm + Biome + Vitest (`/home/user/TempleOfMars/package.json:18-32`; `/home/user/TempleOfMars/README.md:98-108`). Doctrine-named "Stack B" (see §5 below).

**Deploy.** GitHub Pages via `.github/workflows/deploy.yml`. Live at `https://rishabh1804.github.io/TempleOfMars/` (case-sensitive path — see Cautionary Tale `lore-2026-04-23-pages-path-case-sensitivity`).

---

## 2. Active work — in-flight chapters, TODOs

**Chapters in `/home/user/Codex/data/volumes.json:1213-1382`** (12 total):

| # | Chapter ID | Status | Notes |
|---|---|---|---|
| 1 | ch-pre-war-housekeeping | complete | sibling-province cruft purges |
| 2 | ch-charter-stack-selection | complete | four 2026-04-23 decisions |
| 3 | ch-metrics-capture | complete | session_log snippet spec'd |
| 4 | ch-v01-scaffold-deploy | complete | 41 files, 9 commits, green at 23s |
| 5 | ch-codex-integration | complete | campaigns.json + Session v2 schema |
| 6 | **ch-war-time-campaign-2026-04-24** | **in-progress** | inaugural campaign rendered live |
| 7 | **ch-ignis-canon-entry** | **planned** | canon-inst-003 draft, unratified |
| 8 | **ch-session-log-handler** | **spec-drafting** | handler code missing in Codex dispatcher |
| 9 | ch-png-icon-set | planned | v0.2 — iOS Safari prefers PNG |
| 10 | ch-lore-browser | planned | v0.2 — mdsvex content collections |
| 11 | ch-province-detail-views | planned | v0.2 — /provinces/[id]/ |
| 12 | ch-working-committee-watchtower | planned | Edict VI ratification post-war |

**TODOs.** `todos: []` (`/home/user/Codex/data/volumes.json:1383`). None recorded. Plainly ambiguous: cannot tell whether the work is genuinely TODO-free or whether the founding session simply didn't write any. Given chapters 7-12 are real outstanding work, the empty TODO array is more likely an absence than a clean slate — flag for the Order to confirm at ingestion.

---

## 3. Canon-like artifacts — rules, conventions

Temple has not produced any in-tree canons (no `canons.json`, no `canons/` dir, no Canon-style numbered rules in source). It *cites* and *is subject to*:

- **Pillars I–IV + Edicts I, II, III, VI, VIII** — listed at `/home/user/TempleOfMars/README.md:119-128` and `/home/user/TempleOfMars/docs/CHARTER.md:49-58`
- **Canon 0034** (SWs never cache HTML) — honored via `globIgnores: ['**/*.html']` (`/home/user/TempleOfMars/vite.config.ts:35`)
- The Charter itself constitutes Temple-local rules:
  - "Read-only by construction" — Edict III binding form
  - "Codex JSON is territory; Temple is map" — Pillar II binding form
  - Live-fetch over raw.githubusercontent.com, no local mirror — `/home/user/TempleOfMars/src/lib/codex/config.ts:1-13`

Pricing table at `/home/user/TempleOfMars/docs/SCHEMA.md:91-99` is a quasi-canonical reconcile-quarterly rule (USD per 1M tokens for opus-4-7 / 4-6 / sonnet-4-6 / haiku-4-5).

**Ambiguous:** the four ratified Sovereign decisions of 2026-04-23 (permanent-not-one-shot / live-fetch / Stack B / GH Pages) read as a *canon-cc-* candidate at first glance, but the Order has already ingested them as Doctrines under Lore (see §5). Scout would not double-count them as canons.

---

## 4. Schism-like artifacts — rejected approaches

Eight schisms already live in `/home/user/Codex/data/canons.json:2225-2480`. All `status: "resolved"` except one which is `status: "pending"`. Each cites Temple charter sources.

| ID (line) | Title | Resolution |
|---|---|---|
| schism-2026-04-23-stack-a-astro-islands (2226) | Astro + Svelte islands | rejected → Stack B |
| schism-2026-04-23-stack-c-react-spa (2255) | React SPA + TanStack + shadcn | rejected → Stack B |
| schism-2026-04-23-stack-d-vite-svelte-no-sveltekit (2282) | Vite + Svelte without SvelteKit | rejected → Stack B |
| schism-2026-04-23-single-file-html-for-temple (2309) | Use the Province single-file HTML pattern | rejected → deliberate first departure |
| schism-2026-04-23-external-capture-sheets (2338) | External capture via Google Sheets / Airtable | rejected → snippet-import pipeline |
| schism-2026-04-23-direct-push-to-main (2367) | Direct push to main for one-line hotfixes | rejected → branch+PR held |
| **schism-2026-04-23-temple-as-another-monument (2397)** | Strip Watchtower terminology | **pending — Working Committee** |
| schism-2026-04-23-system-fonts-for-speed (2424) | System fonts for MVP | rejected by Sovereign |
| schism-2026-04-23-hardcoded-telemetry-in-temple (2452) | Store campaigns.json in Temple repo | rejected — violates Pillar II |

That last one collides with the count — there are nine schism entries, not eight. Counted by hand from line anchors. **Scribe self-correction:** nine, not eight.

---

## 5. Lore-like artifacts

### Origins
The volumes.json `shelf_history[0]` (`/home/user/Codex/data/volumes.json:1384-1389`) records: "Founded by Sovereign decree to serve as Watchtower sibling to the Command Center Monument. First modern-toolchain PWA in the Order. Builder: Ignis (first project; Minister seat vacated)."

The Roman/sacred resonance flagged in the brief is real and worth surfacing: the name "Temple of Mars" + Ignis (Latin: *fire*) + the Republic-of-Codex framing (Consul, Censor, Priest, Sovereign) is unified, but **no in-tree Origin lore entry explicitly narrates the naming**. The chronicled origin is the founding session itself: `lore-2026-04-23-chronicle-temple-founding` (`/home/user/Codex/data/canons.json:3633`), category `Chronicles` not `origins`, framed as "the second Monument-class artifact of the Order — sibling to the Command Center, proposed under a new structural class called Watchtower." The deliberate naming choice — why "Mars" specifically, why a "Temple," who proposed it — is **not** documented anywhere Scout can find. Ambiguous: this may be a documentation gap worth surfacing as a foretold/forgotten Origin in ingestion, or the Sovereign may simply hold it as silent precedent.

### Cautionary Tales (7, all `category: "Cautionary Tales"`)
All at `/home/user/Codex/data/canons.json`, sourceId `session-2026-04-23-aurelius-war-prep` for the first six, sourceId `aurelius-hour-0`/`aurelius-hour-5` for the last two:
- lore-2026-04-23-compiled-artifacts-in-tree (3212) — sibling-province bug, not Temple-specific but session-coupled
- lore-2026-04-23-pages-path-case-sensitivity (3242) — PR #2 fire-drill #1
- lore-2026-04-23-pnpm-action-setup-version-conflict (3270) — PR #3 fire-drill #2
- lore-2026-04-23-setup-node-cache-requires-lockfile (3297) — PR #4 fire-drill #3
- lore-2026-04-23-vite-plugin-svelte-peer-dep (3324) — PR #3 secondary
- lore-2026-04-23-commit-signing-env-quirk (3350) — agent tooling
- lore-2026-04-23-push-files-stream-timeout (3377) — birthed doctrine-stream-commits
- **lore-2026-04-24-session-log-ingest-path-incomplete (3663)** — Chronicler-miss on Temple denormalization; THREE structural changes before the right one. Cites `TempleOfMars/src/lib/types/index.ts` and `TempleOfMars/src/lib/stores/campaign.ts:35` as the read-the-source receipts. Operationally load-bearing.
- lore-2026-04-24-session-subscriptions-not-baked-in (3699) — Standing rule 6 birth; touches Temple indirectly via the War Tracker flow

### Doctrines (6, all `category: "Doctrines"`)
- lore-2026-04-23-doctrine-single-file-vs-stack-b (3404) — "When single-file HTML is insufficient, adopt Stack B"
- lore-2026-04-23-doctrine-map-territory-by-construction (3432) — "Observers ship no write credentials — Edict III by construction"
- lore-2026-04-23-doctrine-novice-friendliness (3461) — "Novice-friendliness dominates stack selection"
- lore-2026-04-23-doctrine-charter-before-build (3487) — Edict VIII practice
- lore-2026-04-23-doctrine-stream-commits (3516) — agent-managed scaffolding batching
- **lore-2026-04-23-doctrine-watchtower-class (3543)** — proposed sibling class to Monument
- lore-2026-04-23-doctrine-branch-pr-flow (3571) — no exception even for hotfixes

### Chronicles (2)
- lore-2026-04-23-chronicle-war-prep (3599) — the wider pre-dawn session
- lore-2026-04-23-chronicle-temple-founding (3633) — Temple-specific founding chronicle

**Total lore: 15 entries already ingested to canons.json, all tied via sourceId to either the founding session or the War Tracker openings.**

---

## 6. Apocrypha-like artifacts

None. No in-tree apocrypha, no foretold/forgotten/fulfilled entries in canons.json carrying `temple-of-mars` in `volumes[]`. The three apocrypha visible (apo-0001 / 0002 / 0003 at `/home/user/Codex/data/canons.json:2484-2517`) are all SproutLab-scoped.

Candidates for ingestion as `foretold`:
- Lore Browser (v0.2, ch-lore-browser)
- Peacetime view (v0.2 per README:166)
- Watchtower class ratification (planned post-war)
- Working Committee Watchtower designation (ch-working-committee-watchtower)

These are currently `planned` chapters, not apocrypha — categorization is genuinely ambiguous. Scout would lean: leave as chapters; do not double-book as apocrypha.

---

## 7. Specs

In-tree:
- `/home/user/TempleOfMars/docs/CHARTER.md` (4108 bytes) — Edict VIII charter, ratified-pending
- `/home/user/TempleOfMars/docs/SCHEMA.md` (3593 bytes) — Codex↔Temple data contracts

Cross-referenced (lives in Codex, not Temple): `docs/schema/SESSION_V2.md` (chapters `ch-codex-integration` and `ch-session-log-handler` cite it).

`/home/user/Codex/data/specs.json` has *no entries* tagged with `volumes: ["temple-of-mars"]`. The eight current specs are all Codex-scoped. The two Temple docs (CHARTER + SCHEMA) are not registered as Specs in the Codex archive — this is an ingestion gap.

---

## 8. Companion-log-like artifacts — handoffs, session notes

No in-tree `docs/handoffs/` or `docs/sessions/` directory in TempleOfMars. The `/home/user/Codex/data/companion-logs.json` file does **not** contain a Temple-scoped entry (grep returns one incidental "Ignis" hit at line 69, unrelated). The only handoffs touching Temple are *Codex-side* journal entries with `province: "temple-of-mars"`:

- `/home/user/Codex/data/journal.json:373` (s-2026-04-23-aurelius-war-prep) — Temple founding session, handoff at :398 ("Temple of Mars v0.1 live ... War Time Hour 0 is 2026-04-24 08:00 IST. Ignis assumes Temple Builder seat at Hour 0. ... Canon entry for Ignis reassignment queued ...")
- `/home/user/Codex/data/journal.json:234` (War Tracker Hour 0) — drafted canon-inst-003, queued for Sovereign hand

No companion-log v1 (canon-0053) entry for Ignis exists. Given the seat is unseated, this is consistent — but ingestion should expect zero companion-logs from this Province until canon-inst-003 ratifies and Ignis runs a real session.

---

## 9. Volume metadata for TempleOfMars

**Current Codex entry exists** at `/home/user/Codex/data/volumes.json:1197-1397` — well-formed, well-populated. Highlights:
- `id: "temple-of-mars"`
- `shelf: "active"`
- `domain_color: "#C41E3A"` (Mars red — verified at line 1202)
- `tags: ["pwa", "watchtower", "monument", "telemetry", "sveltekit", "modern-toolchain"]`
- `repo: "Rishabh1804/TempleOfMars"` (note: PascalCase — see Cautionary Tale 3242)
- `current_phase` populated
- 12 chapters populated
- `todos: []` (gap noted in §2)
- `shelf_history` populated with founding entry
- `design_principles` populated as "ported" from Codex

**Proposed shelf.** Confirm `active`. The repo has been quiet since War Hour 0 (no commits in ~31 days as of survey date 2026-05-24), but the Province is operationally live (the deployed app continues to serve Codex JSON). `active` is the right shelf; consider `paused` only if the Sovereign confirms no further Temple work is queued — but `ch-ignis-canon-entry`, `ch-session-log-handler`, `ch-png-icon-set`, `ch-lore-browser`, `ch-province-detail-views`, and `ch-working-committee-watchtower` are all open. Stay active.

**Proposed current_phase update candidate.** Existing phrasing ("v0.1 live. War Time 2026-04-24 is the first campaign. Ignis assumes Builder seat at Hour 0.") is stale: War Time concluded 2026-04-29 per the Codex CLAUDE.md ("WAR_TIME 2026-04-24 closed 2026-04-29"). Suggested refresh — "v0.1 live, post-War Time 2026-04-24 archived. Builder seat (canon-inst-003) still in reservation; v0.2 (Lore browser + Peacetime view) pending Builder seating." But this is the scribe-scout's *proposed* edit, not a write.

**Color hint.** Already set to `#C41E3A` Mars red. No change needed. Sibling Mars-cyan `#xxx` (referenced by the app's design tokens as `--color-mars-cyan` in `/home/user/TempleOfMars/src/routes/+page.svelte:49-52`) would be a complementary secondary if the Codex catalog ever supports two-color volumes — currently single-color.

---

## 10. Cross-volume references

TempleOfMars touches, in descending order of weight:

- **Codex** (sproutlab cluster A) — *consumes*: `data/campaigns.json`, `data/journal.json`, `data/canons.json`, `data/volumes.json` via raw.githubusercontent.com (`/home/user/TempleOfMars/src/lib/codex/config.ts:8-13`). Hard architectural coupling; Codex schema changes are breaking changes for Temple (acknowledged at `/home/user/TempleOfMars/docs/SCHEMA.md:5-7`).
- **Command Center** — sister Monument, complementary role (Command Center directs; Temple observes). Doctrinally paired, technically independent.
- **SproutLab** — *renders*: per-province phases + LOC labels (`/home/user/TempleOfMars/src/routes/+page.svelte:21-23` and `src/lib/components/ProvinceCard.svelte`); ProvinceId type explicitly enumerated at `/home/user/TempleOfMars/src/lib/types/index.ts:1`.
- **SEP Dashboard** — same render coupling
- **SEP Invoicing** — same render coupling
- **MSc** — not currently surfaced by Temple. ProvinceId type does not include `msc`; will need extension when MSc gets a campaign or telemetry to render. Ingestion-time follow-up.

Builders referenced in Temple's typed roster (`src/lib/types/index.ts:2`): `lyra | nyx | sovereign | theron | solara | cipher | aurelius | orinth | ignis | rune | maren | kael` — does not yet include `codemike` (the first Gen 1, seated MSc Builder 2026-05-21 per canon-inst-005 referenced in CLAUDE.md). Another ingestion-time follow-up if the typed list is meant to track the roster.

PR references chronicled across the archive: `rishabh1804/TempleOfMars#1` through `#4` (founding + three deploy hotfixes), plus indirect references to `Codex#19`, `#20`, `#26`, `#27`, `#29`, `#30`, `#31` and `sproutlab#2`, `sep-dashboard#1`.

---

## 11. Data-integrity surprises

1. **canon-inst-003 ghost slot.** Reserved across CLAUDE.md, two 2026-05-19 journal entries (`:171`, `:198`, `:203`, `:212`), and two War Tracker entries (`:234`, `:244`, `:252`). No corresponding entry in `/home/user/Codex/data/canons.json`. This is a *deliberate* reservation, not a corruption — but ingestion should know the slot is held and the draft lives only in Codex `docs/` (not surveyed here; outside Temple scope but worth Aurelius's flag).

2. **Ignis profile uncorrected.** `/home/user/Codex/data/companions.json:5752-5762` still records Ignis as `Minister: Output`, cluster `Capital`, `province: null`, `residence: command-center`. Every narrative source (volumes.json, journal.json, lore chronicles) names him Temple Builder. The profile is stale by ~31 days. This is the cleanest data-integrity asymmetry Scout found.

3. **`todos: []` on a Volume with 6 planned/in-progress chapters.** Plausibly genuine, plausibly an omission of the founding session. Flag for Sovereign confirmation.

4. **Schism count drift.** Brief says "8" then count "9" in §4. The hand count is the authoritative number — nine schisms ingested.

5. **`status: "pending"`** for war-time-2026-04-24 in `/home/user/Codex/data/campaigns.json:6` despite WAR_TIME having *closed* on 2026-04-29 per CLAUDE.md. campaigns.json has not been advanced to `complete` (or `expired`); Temple's seed copy at `/home/user/TempleOfMars/src/lib/data/war-time-campaign.ts:7` also reads `pending`. The Codex Province is stale on its own war-tracking ledger.

6. **Stale `current_phase` on Temple Volume.** See §9.

7. **Schism `chosen` field is `null`** across all nine Temple schisms (`/home/user/Codex/data/canons.json:2251`, `:2278`, `:2305`, etc.). They have `rejected:` but no `chosen:`. Either the schema permits null-chosen for "rejected only" entries, or there's a write-time omission. Other schism entries in canons.json should be inspected for the same pattern; if they all carry `chosen`, this is Temple-specific drift.

8. **lore_generated[] on the founding session lists 16 entries** (`/home/user/Codex/data/journal.json:429-446`), but Scout counted 15 Temple-attributable lore entries in §5 (7 Cautionary Tales + 6 Doctrines + 2 Chronicles = 15). The session record includes `lore-2026-04-23-compiled-artifacts-in-tree` as Temple-generated (line 430), but that lore is sproutlab/sep-dashboard-scoped per its own `domain[]` field. Cross-Province attribution is reasonable here (the session touched all three), but ingestion should note that one of the founding session's "Temple" lores is actually sibling-province lore birthed in the same Aurelius pass.

---

## 12. Counts — entities for ingestion

Bulk-ingestion totals for TempleOfMars Volume, given the archive's *current* state:

| Entity | Already in Codex archive | New-from-province | Notes |
|---|---|---|---|
| Volume entry | 1 (volumes.json:1197) | 0 | well-formed; minor `current_phase` refresh proposed |
| Chapters | 12 (volumes.json:1213-1382) | 0 | 5 complete + 1 in-progress + 1 spec-drafting + 5 planned = 12 |
| TODOs | 0 | unknown / likely some | gap-flag (§2) |
| Canons | 0 | 0 | Temple inherits, does not author |
| Schisms | 9 (canons.json:2225-2480) | 0 | one `pending` (Watchtower class) |
| Lore: Origins | 0 | possibly 1 | naming-story gap (§5) |
| Lore: Cautionary Tales | 7 Temple-bound + 1 spillover | 0 | well-ingested |
| Lore: Doctrines | 6 | 0 | well-ingested |
| Lore: Chronicles | 2 | 0 | well-ingested |
| Lore: Edicts | 0 | 0 | none Temple-authored |
| Apocrypha | 0 | 0 | §6 — leave empty |
| Specs | 0 in specs.json + 2 in-tree docs (CHARTER, SCHEMA) | 2 | register CHARTER + SCHEMA as Codex specs |
| Companion-logs | 0 | 0 | will populate post-canon-inst-003 + Ignis-real-session |
| Doctrine-ledger entries | implicit in Lore Doctrines (6) | 0 | Lyra's framework-ACK doctrine arc cited in CLAUDE.md was Phase-4-era, post-Temple-founding |

**Headline.** Temple's archive is *already substantially complete* in Codex thanks to the founding session being Aurelius-led. The ingestion campaign's marginal work here is small — maybe 3-6 new entries (Origin naming-story if drafted; CHARTER/SCHEMA specs; possibly the watchtower-class working-committee outcome once it lands). The bigger value is the *correctness* sweep: refresh stale `current_phase`, advance war-time-2026-04-24 status, populate the missing TODOs, and most importantly **either ratify canon-inst-003 or formally re-reserve and update the Ignis profile to flag the seat as pending-builder-of-temple-of-mars** so the data record matches the narrative.

---

## Open rulings for the Chronicler

1. **canon-inst-003 ratification + Ignis profile refresh** — the cleanest data-integrity asymmetry in the entire campaign. Ratify the canon (Builder seat) and update `companions.json:5752-5762` so Ignis's profile matches every narrative source. Major work-item; belongs in Tier 4 ingestion PR for Temple or earlier if Sovereign chooses.
2. **Origin naming-story** — narrate why "Mars," why "Temple," who proposed it. Or rule it as silent precedent and skip.
3. **`todos: []` on a Volume with 6 open chapters** — genuine empty or founding-session omission? Populate or confirm.
4. **war-time-2026-04-24 campaign status** — currently `pending`; WAR_TIME closed 2026-04-29. Advance to `complete`/`expired` in both `campaigns.json` and Temple's seed copy.
5. **Schism `chosen: null` pattern** — schema-permitted or write-time omission? Audit other schism entries to determine if this is Temple-specific drift.
6. **lore-2026-04-23-compiled-artifacts-in-tree attribution** — listed as Temple-generated in the founding session's `lore_generated[]` but is sproutlab/sep-dashboard-scoped per its own `domain[]`. Reattribute or accept as session-pass cross-attribution.
7. **CHARTER + SCHEMA as Codex specs[]** — register the two Temple in-tree docs in `specs.json`. Mechanical.
8. **ProvinceId type extension for MSc + Builder type extension for CodeMike** — ingestion-time Temple-code follow-ups; not strictly archival.
9. **`current_phase` refresh** to reflect post-War-Time state.

---

*Survey conducted 2026-05-24 by Scribe-Scout under summon by Aurelius. Drafted into archival form by Aurelius from the Scout's findings brief. Permission floor of canon-proc-006 observed: Scout performed no Writes, no Edits, no commits.*
