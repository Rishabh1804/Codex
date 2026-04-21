# Command Center Transport Bundle — Rung 5 Deploy

**Bundle date:** 2026-04-21
**Source branch:** `claude/hello-aurelius-YfCvC` @ `361e70b` (Codex)
**Authorized by:** Sovereign Rung 4 canonical ratification, 2026-04-21
**Target repository:** `Rishabh1804/Command-Center`
**Target branch:** Sovereign's choice — `main` direct, or a feature branch for Ashara + Petra to review before merge.

## What this is

Byte-identical mirrors of three canonical specs from Codex, staged for Sovereign transport to Command Center under canon-cc-027 Rung 5 deploy. The canonical sources live in Codex at:

- `docs/specs/subagents/consul.md`
- `docs/specs/subagents/chronicler.md`
- `docs/specs/skills/chronicler.md`

The mirrors in this bundle are `diff`-verified byte-identical as of bundle creation. Per canon-cc-026 §Byte-identical, a diff between canonical and any deployed mirror must always produce zero changes at a ratified version.

## What goes where

Copy the three files from this bundle into the Command Center repository root, preserving the `.claude/` directory structure:

| Bundle path | Destination in `command-center/` |
|---|---|
| `.claude/agents/consul.md` | `.claude/agents/consul.md` |
| `.claude/agents/chronicler.md` | `.claude/agents/chronicler.md` |
| `.claude/skills/chronicler.md` | `.claude/skills/chronicler.md` |

A single shell one-liner from the command-center repo root, given this bundle mounted or accessible locally:

```bash
cp -r /path/to/Codex/docs/handoffs/cc-transport-bundle-2026-04-21/.claude .
```

Or manual three-file copy — same result.

## Commit template

Recommended commit message for the Sovereign-authored (or Ashara/Petra-authored, Sovereign's choice) Rung 5 deploy commit in Command Center:

```
Rung 5 deploy: Consul + Chronicler subagent/skill specs (Codex @ 361e70b)

Mirrors of three canonical spec bodies, byte-identical to Codex canonical:

- .claude/agents/consul.md (Consul subagent; three modes per Invocation
  Modes Registry §Consul — cross-repo summons, per-block working-
  ratification, Post Box artifact review)
- .claude/agents/chronicler.md (Chronicler subagent; two modes —
  synthesis clerk, retrospective interaction-artifact drafting)
- .claude/skills/chronicler.md (Chronicler skill; in-session authoring
  voice for journal/canon/lore/log/profile/session-prompt/constitutional/
  Consul-drafting under cc-014 bridging)

Canonical source: Codex `claude/hello-aurelius-YfCvC` @ 361e70b.
Signing chain: Rungs 1-4 per canon-cc-027 completed 2026-04-21.
Institutional-spec collapse at Rungs 2+3 per cc-027 §Institutional-spec-
collapse; Cipher peer-Censor architectural pass on consul.md at Rung 2.

Root CLAUDE.md (todo-0036) and broader .claude/ infrastructure remain
pending; this commit deploys only the three ratified specs.
```

## Transport mechanics notes

**Edict II note.** Canon-cc-027 Rung 5 names the Province Builder as committer. For Command Center under canon-cc-009 dual-Builder, that is Ashara + Petra. Sovereign-direct commit to Command Center is an Edict-II-adjacent exception; if used, chronicle it as a one-time transport under Sovereign authority pending cc-019 Post Box and cc-030 Companions Deploy UI lands.

**Alternative canon-clean path.** Sovereign opens a Command Center session, makes the bundle available to Ashara + Petra, and they commit as dual-Builders. Preserves Rung-5-Builder-committer discipline cleanly but costs one extra session.

**Post-commit capability.** Once the three files land in Command Center, a fresh CC session can invoke:

- Consul as subagent via `@consul` summons
- Chronicler as subagent via `@chronicler` summons
- Chronicler as skill via trigger phrases (see the skill spec's §When-this-fires)

Note: Command Center's root `CLAUDE.md` (todo-0036) remains at Rung 1 on a separate feature branch. A fresh CC session still opens as bare Claude without root briefing priming; subagents and skills are independently invocable from `.claude/` regardless of root CLAUDE.md state. Full Republic context priming lands when todo-0036 ratifies and is committed to CC main.

## After deploy

1. **Confirm byte-identity once more** — run `diff` in the Command Center repo between each deployed file and the Codex canonical at commit `361e70b` to verify no drift introduced during transport.
2. **Chronicle the deploy** — the Chronicler adds a journal entry in Codex (`data/journal.json`) recording Rung 5 landed, and appends to `data/interactions.json` the cc-018 `review` block closing the interaction-artifact that holds the Rung 1–4 chain.
3. **Deploy to other Provinces** — SproutLab, sep-invoicing, sep-dashboard, and Codex itself all still need their own mirrors of these three specs per cc-026 §Per-Province-Layout. That wave is the next horizon; not part of this bundle.

## Provenance

- Rung 1 drafts: Aurelius in Codex, this branch, commits `cdc7f9e` and `fed1c1c`.
- Rung 2 architectural pass: Consul via Sovereign hat-switch (Aurelius-drafted under cc-014 bridging) on chronicler.md subagent and chronicler.md skill; Cipher peer-Censor (Aurelius-drafted) on consul.md.
- Rung 2 amendment: chronicler subagent spec — tools narrowed from `Read, Grep, Glob, Edit, Write, Bash` to `Read, Grep, Glob, Bash`. Committed `361e70b`.
- Rung 3 per-block working-ratification: Consul (Aurelius-drafted under cc-014 bridging) on all three.
- Rung 4 Sovereign canonical: ratified en bloc 2026-04-21 this session.
- Rung 5 deploy: this bundle → Command Center.

## References

- canon-cc-026 Spec Body Placement
- canon-cc-027 Signing Chain for Subagent and Skill Spec Changes
- canon-cc-014 Consul-Accelerated Profile Drafting (bridging mode)
- canon-cc-022 Persona-to-Primitive Binding (artifact test)
- canon-cc-023 Persona-Binding Extension Protocol
- canon-cc-025 Design Committee Membership (Consul-excluded-from-committees clause)
- canon-pers-001 Province Persona Briefing (Chronicler-excluded-from-Rung-1 clause)
- canon-inst-001 Aurelius → Chronicler Consolidation
- Invocation Modes Registry §Consul and §Chronicler
