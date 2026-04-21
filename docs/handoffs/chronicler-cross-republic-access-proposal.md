# Chronicler Cross-Republic Access — Harness Widening Proposal

**Status:** Proposal, awaiting Sovereign harness-level action.
**Authored:** 2026-04-21
**Author:** Aurelius (Chronicler)
**Session:** Branch `claude/hello-aurelius-YfCvC`
**Related:** canon-pers-NNN (pending, "right-hand scope" — ratifies later per Sovereign instruction)

## What this is

A memo naming the harness-level change required to realize the Sovereign's 2026-04-21 declaration: **the Chronicler (Aurelius) holds cross-Republic access as the Sovereign's right hand; access to any Province's repository must not be harness-blocked.** The declaration is a Sovereign instruction operative immediately; canonical ratification (likely `canon-pers-NNN` or `canon-inst-NNN`) follows in a later session.

## Current state

The Claude Code on the web session that runs Aurelius is initialized with a GitHub MCP allowlist scoped to `rishabh1804/codex` only. The restriction is declared in the session's system prompt as:

> Your GitHub MCP tools are restricted to the following repository: `rishabh1804/codex`. Do NOT attempt to read from, write to, or interact with any other repository. Calls targeting repositories outside this list will be denied.

This restriction is **harness-layer**, not repo-layer. There is no `.claude/settings.json` or `.claude/settings.local.json` in the Codex working tree; the MCP scope is injected by the web session initialization. No code commit inside Codex can change it.

## What needs to change

The session initialization must list every Province's repository in the MCP allowlist. The Chronicler needs **read + write** access to each — write because chronicling records in Codex is not sufficient when a Province's Builder invites editing or the Sovereign requests cross-Province artifact creation; canon-cc-026 §D restricts the Chronicler from committing to another Province's `.claude/` tree but does not restrict cross-Province read and write on other Capital files when the Builder or Sovereign invites.

Repository slugs to add (confirm exact slugs — the Chronicler does not yet know them with certainty):

- `rishabh1804/sproutlab` (or equivalent — SproutLab's repo slug)
- `rishabh1804/sep-invoicing` (or equivalent)
- `rishabh1804/sep-dashboard` (or equivalent)
- `rishabh1804/command-center` (or equivalent — Monument Province)

Any additional Province-hosted repositories (future Provinces under the 30K Rule's Region-splitting future state) should be added at seating time, not retroactively.

## How the change lands

Two possible mechanisms — Sovereign selects:

1. **Web-session harness config.** Modify the Claude Code on the web session template that initializes Aurelius's sessions, widening the MCP allowlist declaration in the system prompt. This is the default mechanism; it propagates to all future Aurelius sessions.
2. **Per-session override.** If the web harness supports per-session allowlist override, open Aurelius's sessions with the widened allowlist explicitly. Useful for bridging while the template update is pending.

Both mechanisms are Sovereign-operated from outside the Codex repository. The Chronicler cannot modify either from in-session.

## Discipline the Chronicler holds under widened access

Access widening does not dissolve constitutional discipline. The Chronicler continues to observe:

- **canon-pers-001 Chronicler-excluded from Rung 1 on root `CLAUDE.md`.** Even with write access to other Provinces' repos, the Chronicler does not author any Province's Persona Briefing. The Builder's voice is the Builder's to render.
- **Edict II — Capital is the Builder's.** The Chronicler does not commit to another Province's `.claude/agents/` or `.claude/skills/` tree (Rung 5 deploys are Builder-owned per canon-cc-027). The Chronicler does not commit to another Province's build pipeline, concatenation order, or Capital module boundary.
- **canon-cc-026 §D — unidirectional sync.** Canonical spec bodies live in Codex; Province mirrors are Builder-deployed. The Chronicler authors canonical, never Province mirror.
- **canon-cc-013 source-verification.** Cross-Province claims require reading the source, not recalling. Widened access reduces the cost of source-verification; the discipline's requirement does not relax.
- **Source-of-truth preservation.** Records land in Codex per canon-cc-010. Cross-Province read access is for grounding; writes to Codex's data files remain the primary archival path.

## Canonical ratification path

The "right-hand scope" declaration ratifies canonically in a later session. Candidate shapes:

- **`canon-pers-NNN` — Chronicler Cross-Republic Access Scope.** In the `pers` family, since it governs how the Chronicler persona operates across Provinces. Paired with canon-pers-001's Chronicler-excluded rule — cross-access authorized, cross-authorship still restricted.
- **`canon-inst-NNN` — Chronicler Seat Scope Amendment.** In the `inst` family, extending the institutional duty scope canon-inst-001 established. Arguably the cleaner seat since canon-inst-001 already consolidated the Chronicler; this canon extends the scope of the consolidated seat.

Chronicler recommendation: **`canon-pers-NNN`** — the declaration is about how the Chronicler operates across the Republic, not about what seat the Chronicler holds. The seat is settled; the scope of the seat's reach is what's being ratified.

## Chronicler's ask

1. Widen the web-session MCP allowlist to the five Province repositories (Codex + the four others), mechanism per Sovereign preference.
2. Confirm the canonical family (`pers` or `inst`) for the later ratification.
3. Flag any Province repositories whose slugs differ from the assumed `rishabh1804/<province>` shape so the Chronicler drafts the canon with correct references.
