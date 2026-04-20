# Rung 1 Rationale — Cipher Subagent + Skill Spec Bodies

**Canon-cc-027 Rung 1 artifact.** Chronicler-proposed spec body drafts for Cipher, entering the Edict V signing chain at spec-body altitude. This document accompanies `docs/specs/subagents/cipher.md` and `docs/specs/skills/cipher.md` and names what is being added, what evidence in Cipher's profile and the Republic's operational corpus motivates these drafts, and what downstream artifacts need to follow once the chain ratifies them.

---

## 1. What is being added

Two new canonical spec body files and no amendments to existing files:

- `docs/specs/subagents/cipher.md` — covers Cipher's two subagent modes per the Invocation Modes Registry §Censor row: the _Edict V final-pass review_ mode and the _committee delegate_ mode.
- `docs/specs/skills/cipher.md` — covers Cipher's one skill mode per the same registry row: the _hat-switch smell-check_ mode.

The pair is the canonical form for a dual-bound role per canon-cc-026. Neither file existed before this commit; both land together so that the artifact-test division between subagent modes (separable verdict) and skill mode (in-transcript register-flip) is instantiated at the file boundary and not merely stated in prose.

Nothing is being removed. Nothing existing is being changed. This is the inaugural spec-body drafting for any Republic Companion.

## 2. Why Cipher first

The 19 April handoff (s-2026-04-19-02) and the 20 April completion handoff (s-2026-04-20-01) both named Cipher as the recommended inaugural case for Rung 1. Three reasons grounded the recommendation:

- **Dual-binding stress-tests both primitives at once.** Cipher is the archetypal dual-bound role per canon-cc-023's commentary and the Invocation Modes Registry's §Censor language ("the archetypal case"). Drafting both files simultaneously forces the artifact-test division (separable-verdict subagent versus in-transcript-voice skill) into an operational split from day one, rather than letting a single-mode role mask the ambiguity.
- **Peer-Censor review exercises the self-review exception early.** Canon-cc-027 §Censor-Self-Review-Case says that when a Censor's own spec body is under review, Rung 2 falls to the other cluster's Censor. Drafting Cipher first puts Nyx (Cluster B Censor, ratified 19 April) into the cross-cluster reviewer seat immediately — a structural pattern the Republic will rely on indefinitely, surfaced and stress-tested before it ossifies into assumption.
- **Ratification-risk is bounded.** Cipher's profile is v0.4 at highest fidelity; Cipher's voice has been operational since founding; Cipher's heuristics and per-repo lens are canon-grade (canon-cc-008, canon-gov-002, the Hard Rules, Codex canons 0033 / 0034). The drafting does not invent voice; it consolidates voice that has been ratified and lived-in for weeks.

## 3. Evidence in Cipher's profile

Each section of the draft traces to specific profile fields in `data/companions.json`:

- **Voice.** The draft's opener/closer patterns, vocabulary signatures, rhythm, and avoidance list come verbatim or near-verbatim from Cipher's `voice.characteristic_opener`, `voice.characteristic_closer`, `voice.vocabulary_signatures`, `voice.vocabulary_avoids`, and `voice.rhythm`.
- **Heuristics.** The spec's heuristics list is Cipher's `mind.core_heuristics` plus `mind.first_look` distilled into a sentence. The "rename before you refactor" heuristic is drawn from `voice.vocabulary_signatures`.
- **Per-repo lens.** The three-Province lens (Codex, SproutLab, sep-invoicing) comes from `assignment.per_repo_lens`. The spec declines Cluster B work cleanly rather than reproducing the sep-invoicing lens line, because Cluster B is Nyx's jurisdiction; the profile's sep-invoicing entry is retained there for historical completeness, not as live scope.
- **Non-negotiables.** Review-only discipline is canon-gov-002 (Censors do not build) crossed with `assignment.runs_after_governors` and the profile's cluster binding. Self-review prohibition is canon-cc-027 §Censor-Self-Review-Case; the spec explicitly names the Nyx substitution so the rule is readable in-context.
- **Failure modes.** The "guard against" section draws directly from `shadow.failure_modes` (over-refactoring, asceticism, voice flatness) and names the modulator contexts in `modulators` that correct each failure (pair_work for voice flatness, teaching_junior_scribe for warmth).
- **Modulator quick reference.** The five named contexts come from `modulators[].modulations[]` with their delta / mode annotations preserved. This section exists so the Claude-Code invocation can read the modulator state without loading the full profile JSON.

## 4. Evidence from operational corpus

- **Canon-cc-008** (Censor runs after Governors, not in parallel) — ratified and active. The subagent's "Non-negotiables" section enforces this at the prompt layer.
- **Canon-gov-002** (Censors are review-only, they do not build) — ratified and active. The `tools:` field in the subagent frontmatter grants `Read, Grep, Glob, Bash` only; no `Write` or `Edit` permission is granted. Review-only discipline is enforced at the tool-boundary, not merely stated in the body.
- **Canon-cc-017** / canon-cc-018 — the `review` block shape on the interaction-artifact is the return-shape the subagent's "Edict V final-pass review" mode produces. The spec's `verdict / summary / findings / amendments / rationale_if_rejected / escalation_target` enumeration matches the `review` schema's expected fields so the Edict V chain can consume the output without translation.
- **Canon-cc-022** (artifact test) — the spec's division between subagent and skill is the artifact test applied at the file level: the subagent produces a separable artifact, the skill produces in-transcript voice. The division is named explicitly in both files' "scope discipline" HTML comments so Rung 2 review can verify it without inferring.
- **Canon-cc-025** (Design Committee membership) — the subagent's "committee delegate" mode references Province-scope (Cluster A) and Global-scope convenings per rule-A. First operational Design Committee (Republic Design Principles, 19 April 2026) confirmed Cipher's seated role as a Cluster A Censor contributing bridging-authored positions; that mode is preserved here as a subagent binding per the Invocation Modes Registry seed.
- **Canon-cc-027 §Censor-Self-Review-Case** — the specs name Nyx as the Rung 2 reviewer for these drafts because self-review is forbidden. This is the first invocation of that clause since its ratification on 2026-04-20.

## 5. Downstream artifacts to follow when the chain ratifies

- **Interaction-artifact at Rung 2.** When Nyx reviews these drafts (cross-cluster self-review substitution per canon-cc-027), the review produces an interaction-artifact under canon-cc-017 with the two spec bodies as the subject. The artifact's `type` field rides on `cross-cluster-meeting` provisionally per cc-024's enum-extension note, until the type enum's `committee-proposal` extension ratifies.
- **Interaction-artifact at Rung 3.** Consul's working-ratification per canon-cc-014 lands on the same interaction-artifact's `review` block as a separate action.
- **Rung 4 Praetorium entry.** Sovereign canonical ratification arrives through the Praetorium queue per canon-cc-019 once Post Box drafting lands. Until then, bridging mode routes Rung 4 through direct Sovereign audience.
- **Rung 5 deploys.** Byte-identical copies to `Codex/.claude/agents/cipher.md`, `SproutLab/.claude/agents/cipher.md`, `Codex/.claude/skills/cipher.md`, and `SproutLab/.claude/skills/cipher.md`. Codex deploy commits from Aurelius (the Codex Builder, self-Builder for this spec); SproutLab deploy commits from Lyra. Neither `.claude/` tree exists at commit time — both will be created on deploy. The Monument Province is not a Cluster A resident and therefore does not carry `cipher.md`.
- **Companion-log at deploy.** Each Province's next session after deploy logs the deploy as a session-movement event in its companion-log per the bridging-mode surfacing clause in canon-cc-027 §Deploy-stall-edge-case.
- **UI Manifest Cross-Reference update.** Once the Companions Deploy UI canon lands and the `canonical_version` frontmatter field hardens per canon-cc-026 §File-format, these spec files receive the frontmatter field and the UI Manifest Cross-Reference updates to show Cipher's canonical version alongside the Province deploy state.
- **Legacy-profile backfill reconciliation.** Cipher's `assignment` block in `data/companions.json` does not currently carry an `invocation_modes` field per canon-cc-023 §Legacy-Profile-Backfill. This draft proceeds under the bridging-mode clause (Invocation Modes Registry seed infers bindings). When the backfill migration ratifies, Cipher's profile will gain the `invocation_modes` block and the ratified bindings must match the bindings this spec encodes; drift between the two is a violation that escalates under the standard interaction-artifact lifecycle.

## 6. Known gaps

- **No `canonical_version` frontmatter.** Per canon-cc-026 the field is a soft recommendation pending Companions Deploy UI canon. Not included in this draft.
- **No deploy at this ratification.** The Rung 5 deploy is a separate act per canon-cc-027. These drafts land in Codex canonical paths only; the Province `.claude/` trees are not touched.
- **No Monument deploy.** Cipher is not a Monument resident. Per canon-cc-026 §Per-Province-Layout, `cipher.md` does not appear in `command-center/.claude/`.
- **Tool permissions may tighten.** The `tools: Read, Grep, Glob, Bash` grant in the subagent frontmatter is the Chronicler's Rung 1 proposal. Nyx may amend at Rung 2 — Bash in particular carries write-adjacent risk if misused; if Nyx judges Bash too broad for review-only discipline, the amendment would drop it and leave `Read, Grep, Glob`.
- **No test harness cross-reference.** The 18 April Playwright harness (35/35 green) exists in Codex but is not referenced from these specs because the test harness is Builder-scope, not Censor-scope. Nyx may flag this at Rung 2 if cross-referencing is judged load-bearing.

## 7. Chain signatures expected

| Rung | Role | Expected Action | Status |
| --- | --- | --- | --- |
| 1 | Chronicler (Aurelius) | Propose | **Complete — this commit.** |
| 2 | Cluster B Censor (Nyx) | Architectural pass, cross-cluster per §Censor-Self-Review-Case | Pending |
| 3 | Consul | Working-ratify per canon-cc-014 | Pending |
| 4 | Sovereign | Canonical ratification via Praetorium (bridging: direct audience) | Pending |
| 5 | Codex Builder (Aurelius) + SproutLab Builder (Lyra) | Deploy byte-identical to each `.claude/` tree | Pending, after Rung 4 |

---

**Filed:** 2026-04-20 by Aurelius (The Chronicler).
**Session:** s-2026-04-20-02.
**Drafts covered:** `docs/specs/subagents/cipher.md`, `docs/specs/skills/cipher.md`.
**Next action:** Hand off to Nyx for Rung 2 cross-cluster architectural review.
