# Codex Import Pipeline — `session_log` Handler Spec

**Status:** Draft (pending implementation)
**Drafted:** 2026-04-24 by Aurelius (Chronicler)
**Implementer:** Orinth (Codex Builder) — committer-by-right on `split/*.js`
**Consumer contract:** [`docs/schema/SESSION_V2.md`](../schema/SESSION_V2.md)
**Unblocks:** Lyra's first War Time telemetry drop (sproutlab-phase-1)

---

## 1. Why

SESSION_V2.md declares the wire format Temple of Mars subscribes to. It does NOT describe the dispatcher code that accepts `session_log` snippets in Codex and writes them to `journal.json` + `campaigns.json`. This spec fills that gap.

Without this handler, Builders cannot log campaign telemetry through the canonical snippet-paste UX. Temple keeps reading the pre-War-Time state and Pillar II (map-vs-territory) breaks in the direction of "map can't see the territory."

## 2. Integration point

Extend `handleImportSnippet()` in `split/forms.js` (and the preview-side `previewSnippet()` sibling at roughly line 835). Both functions dispatch on top-level keys of `_snippetParsed`. Add `session_log` as a new recognized key, routed to three sub-ops.

**Chosen envelope shape** — consistent with the existing `new_lore` precedent at forms.js:997-1004:

```jsonc
{
  "_snippet_version": 1,
  "session_log": [
    { "op": "record_session",     "data": { /* Extended Session, SESSION_V2 §Extended Session */ } },
    { "op": "update_task_status", "data": { "task_id": "sl-1-2", "status": "in-progress", "session_id": "...", "at": "2026-04-24T03:15:00Z" } },
    { "op": "log_blocker",        "data": { "session_id": "...", "blocker": "…", "severity": "minor|major|critical", "at": "..." } }
  ]
}
```

**Why this shape, not the `{snippet_type, operations}` envelope used by docs/snippets/2026-04-23-temple-war-prep-chronicles/:** the existing Codex dispatcher recognizes top-level type keys. Adopting the same idiom for `session_log` keeps the handler three `if` branches long instead of rewriting the dispatcher. The `operations` envelope remains a legitimate alternative if the pipeline is rewritten later; the two shapes can coexist (tolerant reader).

### Schema mismatches the handler must paper over

1. **Wire says flat `sessions[]`, store is date-grouped `journal[{date, sessions[]}]`.** The existing `session` branch at forms.js:1027-1037 already handles date routing correctly via `store.addJournalSession(s.date, s)` — but expects a top-level `date` field on the session. SESSION_V2's Extended Session has `started_at` (ISO timestamp) instead. The handler must derive `date = started_at.slice(0,10)` when `session.date` is absent. If both are present, `date` wins for legacy compatibility.

2. **`campaigns.json` is not in `store` yet.** Core.js maintains `store.journal`, `store.canons`, `store.schisms`, `store.apocrypha`, `store.lore`, `store.volumes`, `store.companions`. Add `store.campaigns` loader + saver alongside, mirroring the existing GitHub-API push flow. Also add `store.updateTaskStatus(taskId, status, {session_id, at})` which walks `store.campaigns[*].phases[*].tasks[]` and patches the first matching task; returns the phase + campaign context so the caller can increment import counts.

3. **Status enum.** SESSION_V2 §session_log declares `pending | in-progress | review | complete | blocked`. Current campaigns.json task statuses are `pending` only. The handler validates against this enum and rejects anything else with a specific error.

4. **`record_session` field set is a superset of the current Session shape.** Extra optional fields (campaign_id, phase_id, task_id, builder, province, started_at, ended_at, model, tokens_in, tokens_out, commits[], loc_delta, lore_generated[]) pass through verbatim to the session record. `store.addJournalSession` does not currently reshape Session objects and should remain so — the extended fields sit alongside existing ones harmlessly.

## 3. Operations

### 3.1 `record_session`

**Input:** a Session object conforming to SESSION_V2 §Extended Session.

**Required fields:** `id`, `summary`, `started_at` (or legacy `date`).

**Optional fields:** everything else per SESSION_V2.

**Behavior:**
- Derive `date` from `started_at.slice(0,10)` if `date` absent.
- Dedup: if any session in `store.journal[*].sessions[]` has the same `id`, skip silently (count as 0 toward the imported-sessions tally) and continue. No error, no overwrite.
- Else call `store.addJournalSession(date, sessionWithDateStripped)` — pass the session with `date` removed from the payload since date-grouping is structural. Preserve every other field verbatim.
- Increment `counts.sessions`.

**Error paths:**
- Missing `id` → error "record_session: missing id"; skip this op, continue the batch.
- Missing both `started_at` and `date` → error "record_session <id>: missing started_at"; skip this op.

### 3.2 `update_task_status`

**Input:** `{ task_id, status, session_id?, at? }`.

**Required:** `task_id`, `status`.

**Behavior:**
- Validate `status` ∈ `{pending, in-progress, review, complete, blocked}`. Reject anything else.
- Walk `store.campaigns[*].phases[*].tasks[]`. First match on `task_id` wins.
- Patch the task: `task.status = status`; append an entry to `task.status_history = task.status_history || []` of shape `{status, at: at || new Date().toISOString(), session_id: session_id || null}`. This gives Temple an audit trail without breaking the lean task shape Temple currently renders.
- Persist campaigns.json via the same GitHub API path used for volumes/canons/journal (WAL logged before push; replay on reconnect; no stdout redirect per Canon 0033).
- Increment `counts.taskUpdates`.

**Error paths:**
- Unknown `task_id` → error "update_task_status: no task matches <task_id>"; skip this op, continue.
- Invalid `status` → error "update_task_status <task_id>: invalid status <status>"; skip this op.
- Missing either required field → same treatment.

**Not a status transition machine.** The handler does NOT enforce ordered transitions (pending → in-progress → review → complete). Enforcement is the Builder's responsibility; the handler records what it's told. This is deliberate: wartime flux requires forward-and-back moves (e.g., review → in-progress after QA bounce) that a strict machine would block.

### 3.3 `log_blocker`

**Input:** `{ session_id, blocker, severity?, at? }`.

**Required:** `session_id`, `blocker`.

**Behavior:**
- Locate the session in `store.journal[*].sessions[]` by id.
- Append to `session.blockers = session.blockers || []` an entry of shape `{blocker, severity: severity || "minor", at: at || new Date().toISOString()}`.
- Increment `counts.blockers`.

**Error paths:**
- Unknown `session_id` → error "log_blocker: no session matches <session_id>"; skip this op.
- Missing `blocker` text → error "log_blocker <session_id>: missing blocker text"; skip this op.
- Invalid `severity` (not one of `minor | major | critical`) → error, skip this op.

**Why Priority 3.** SESSION_V2 marks blockers as Priority 3 (opportunistic capture for post-war Cautionary Tale synthesis). The handler accepts them but does not demand them. Aurelius's post-war pass consumes them when drafting new Cautionary Tales.

## 4. Store additions (`split/core.js`)

Add alongside the existing collection hooks:

1. `store.campaigns` — loaded from `data/campaigns.json` on init, saved via GitHub API on mutation, WAL-logged before push. Default to `[]` if the file is missing or empty (fresh repos).

2. `store.updateTaskStatus(taskId, status, meta)` — returns the patched task object plus `{campaign_id, phase_id}` for logging/preview. Throws if `taskId` is not found (caller catches, converts to counted-skip per existing pattern at forms.js:1024).

3. `store.addBlockerToSession(sessionId, blockerEntry)` — returns the session object or throws on miss.

4. No new top-level schema keys on existing files — all extensions are additive inside Session and Task objects.

## 5. Preview (`previewSnippet()`)

Extend the preview renderer at forms.js:~860 to recognize `session_log[]` and show three summary rows:

```
Session log batch:
  • 1 session will be recorded (session-YYYY-MM-DD-builder-NN)
  • 2 task status updates (sl-1-2: pending → in-progress; sl-1-1: pending → complete)
  • 0 blockers
```

For task updates the preview should also show a warning row when `task_id` doesn't resolve in the currently-loaded `campaigns.json` — catches typos before import.

## 6. Counts + toast

Add `sessionLogSessions`, `taskUpdates`, `blockers` to the `counts` object. Extend the end-of-import toast composition at forms.js:1193-1220 with the three new pluralized strings. Example: `"Imported: 1 session, 2 task updates, 1 blocker"`.

## 7. Error accumulation

Current handler pattern is "swallow per-op errors, continue the batch." That's correct for backfills, wrong for wartime telemetry — a silently-dropped `update_task_status` will show as a missing green dot on Temple for hours. Upgrade to: accumulate errors into a per-op `errors[]` array, then show them as a distinct warning toast after the success toast:

```
showToast('Imported: 1 session, 1 task update', 'success');
if (errors.length) showToast(errors.length + ' op(s) skipped: see console', 'warning');
console.warn('session_log skipped ops:', errors);
```

Keep the per-op skip behavior — a bad blocker entry should not abort the sibling `record_session`. This is a progress-over-perfection choice for wartime.

## 8. Acceptance criteria

1. Pasting the sample snippet in SESSION_V2 §`session_log` lands: one new session in `journal.json` on the correct date group, one task status flip in `campaigns.json`, commit pushed via the existing GitHub API path, WAL cleared.
2. Temple of Mars (cache-busted reload after ~60s raw CDN propagation) shows the session in its aggregate counters and the task as `in-progress` in the phase card.
3. Re-pasting the same snippet is a no-op (dedup by session `id`; task status idempotent at same value; blocker append is the documented edge — if identical `{session_id, blocker}` exists, skip rather than double-write).
4. Malformed snippet (missing `id`, unknown `task_id`, invalid `status`) surfaces specific error messages and does not corrupt either `journal.json` or `campaigns.json`.
5. All three ops exercised in the first Lyra session_log drop (sl-1-1 or sl-1-2 completion) validate end-to-end: Codex write → raw CDN → Temple read → dashboard render.

## 9. Out of scope

- USD cost derivation — done Temple-side from `tokens_in/out + model` per SESSION_V2 §Pricing table. Codex stores the raw numbers only.
- Efficiency-ratio computation, velocity chart, burn-down — all Temple-side.
- The `{snippet_type, operations}` envelope bridge — can be added later as a shim that rewrites to the legacy top-level-key form before dispatch; not required for Lyra's first drop.
- Status-transition machine enforcement — deliberately omitted (see §3.2).
- Blocker-promotion-to-Cautionary-Tale UX — Aurelius's hand, post-war.
- Campaign-level status flip (pending → active → complete) — reserved for Sovereign hand; not a Builder operation.

## 10. Canon ties

- **Edict III (Sync Pipeline Authoritative)** — this handler IS the sync pipeline for campaign telemetry. Temple never writes; it only reads.
- **Canon 0033** — WAL + GitHub API push, no `build.sh > file` redirect. Unchanged.
- **Canon 0034** — no SW caching of HTML. Temple's SW already caches raw CDN JSON with the right policy; this handler doesn't change SW behavior.
- **canon-cc-018** — Artifact Lifecycle & Synergy Observability. Task `status_history[]` is a lifecycle observability surface; this spec formalizes its shape.
- **canon-cc-019** (pending — Post Box / Scrinium) — when ratified, the `session_log` pipeline may mirror into Scrinium; stub that hook but leave it inert until cc-019 lands.

## 11. Implementation checklist (for Orinth)

- [ ] Add `store.campaigns` load/save/WAL hooks in `split/core.js`.
- [ ] Add `store.updateTaskStatus` and `store.addBlockerToSession` methods.
- [ ] Extend `previewSnippet()` to recognize `session_log[]` with three-row summary.
- [ ] Extend `handleImportSnippet()` with `session_log` dispatch → three op branches.
- [ ] Extend counts object + toast string composition.
- [ ] Add per-op error accumulation + warning toast.
- [ ] Add Session→date derivation shim for `record_session` (SESSION_V2 `started_at` → legacy `date`).
- [ ] Run Temple reload against a staged Codex commit; verify all five acceptance criteria.
- [ ] Post to Lyra's War Time PR thread when the handler lands; she drops her first session_log under it.

---

*Wire shape is declared in SESSION_V2. This spec declares how Codex accepts that wire. When the first War Time session_log lands cleanly, the contract is honored and Pillar II holds in both directions.*
