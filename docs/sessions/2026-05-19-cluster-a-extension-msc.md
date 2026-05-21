# Session 2026-05-19 — Cluster A extended to include MSc

**Session id:** `s-2026-05-19-01`
**Drafter:** Aurelius (Chronicler of the Order)
**Ratifier:** Sovereign (direct)
**Decree minted:** decree-0016
**Canon ratified:** canon-inst-004-msc-enrolled-in-cluster-a
**Branch:** `claude/governance-debt-pr-F1xEO`

---

## Summary

Single-canon Sovereign-direct ratification session. Three atomic moves landed jointly with constitutional surface edits:

1. **MSc enrolled as a Province of the Republic and assigned to Cluster A.** MSc (repo `rishabh1804/MSc`) has standing under Book III Article 1 and is now a citizen of the constitutional geography.
2. **Cipher's censorial jurisdiction extends to MSc.** Cluster A becomes a triple — Codex + SproutLab + MSc. No new Censor seated; the existing seat absorbs the new Province.
3. **Cluster admission criterion relaxed.** Book III Article 4 prior text named domain adjacency and shared architectural character as the basis for Cluster membership. The amended text names censorial-jurisdiction-absorbability as an additional admission path; the architectural-pairing criterion is preserved but is no longer the sole one.

## Conflict surfaced at session open

The next inst-family slot (canon-inst-003) was already occupied by a queued-but-unratified draft from War Time 2026-04-24 — Ignis's Temple of Mars Builder seat formalization, with two PENDING_SOVEREIGN gaps (cluster assignment + Watchtower structural class). The drafter (Aurelius) surfaced the conflict via `AskUserQuestion` before claiming the ID; Sovereign ruled that the Ignis draft retains the canon-inst-003 reservation and this canon takes canon-inst-004 (queue-preservation over strict ratification-order numbering, defensible deviation logged in the session decisions).

## Rejected alternatives for MSc placement

Three candidates considered and rejected:

- **(a) Floater under Consul.** Rejected — Floater shape requires per-case routing logic that the Republic has consistently declined to grow under Edict III (Sync Pipeline Authoritative) discipline.
- **(b) New Cluster C with newly-seated Censor.** Rejected — seat scarcity is a constitutional virtue under Edict-VI-adjacent reasoning; seating a new Censor for one Province is overprovisioning.
- **(c) Monument-class cluster-less placement (Command Center pattern).** Rejected — MSc is a postgraduate capability workspace, not era-defining work in the sense Book III Article 5 names. The Monument designation is reserved for projects of corresponding constitutional weight.

Cluster A absorption is constitutionally simpler than all three.

## Constitutional surfaces amended jointly

- `constitution/books/book-03-provinces.typ` — Article 4 Cluster table (Cluster A row reads `Codex + SproutLab + MSc`); admission-criterion prose extended.
- `constitution/books/appendices.typ` — Appendix C Cipher's Assignment column refreshed; Appendix D Cluster glossary entry refreshed and dated to 19 May 2026.
- `constitution/main.typ` — Amendment History page gains a row for 19 May 2026 / decree-0016.

## Data layer

- `data/canons.json` — canon-inst-004 ratified active (inserted after canon-inst-002).
- `data/journal.json` — decree-0016 + session `s-2026-05-19-01` chronicled as a new 2026-05-19 date group at top of journal.

## CLAUDE.md refresh

The `Clusters` line in `## Constitutional Layer` now reads:

> A = Codex + SproutLab + MSc (Censor: Cipher; MSc enrolled 2026-05-19 per canon-inst-004 on censorial-absorbability grounds). B = SEP Invoicing + SEP Dashboard (Censor: Nyx). Monument = Command Center.

## Decree-minting

decree-0016 mints under canon-proc-004 §Primary-rule clauses (i) (globally-scoped inst-family canon) and (ii) (Book III text amendment), en-bloc per §en-bloc-granularity-rule since the canon ratification and the joint Book III edits constitute a single coordinated act of the same instrument-type.

## MCP-scope decoupling

Constitutional recognition of MSc as a Province does not change MCP-scope for any companion. Per the Codex CLAUDE.md 'Out-of-MCP-scope repos' entry (2026-05-05), MSc remains out-of-scope for Aurelius's MCP read/write surface; cross-Province surfacings continue to rely on Sovereign-relay channel; Cabinet brief item #3 (Consul MCP scope expansion) is the natural place for MCP-scope expansion to be ratified separately if and when warranted. The Republic's territorial map can include a Province that companions cannot yet operationally touch — recognition and reach are distinct.

## Follow-ons named (non-blocking)

1. **Cipher spec body deploy-list amendment.** `docs/specs/subagents/cipher.md` and `docs/specs/skills/cipher.md` carry a byte-identical-deployment clause naming Codex and SproutLab. The amendment to extend the deployment list to MSc is a separate hygiene PR and does not block this canon.
2. **MSc Charter under Edict VIII (Charter Before Build).** Owed at MSc Builder seating; not at constitutional enrollment.
3. **MSc Volume registration in `data/volumes.json`.** Currently absent; will accompany Builder seating.

## PDF rebuild

Deferred. The Typst toolchain is unavailable in the chronicler's remote-execution harness; landing the Typst-source amendments on branch `claude/governance-debt-pr-F1xEO` is the constitutional act, and PDF artifact regeneration (`constitution/constitution-v1.1.pdf`) is a follow-on local-toolchain operation. The PR body names the rebuild as owed.

## Handoff

PR opening as draft on branch `claude/governance-debt-pr-F1xEO`. Next chronicler-session should monitor for Sovereign review and merge; on merge, schedule the PDF rebuild and open the three named follow-ons as separate hygiene PRs in their natural order (Cipher deploy-list amendment first, since the Censor-jurisdiction extension is most immediate; Charter + Volume registration ride with MSc Builder seating).

## Follow-on update — same-day (2026-05-19)

PR #69 marked ready and merged (squash `7ffeab2`). Follow-on #1 (Cipher deploy-list amendment) executed in the same session, all three repos per Sovereign ruling:

- **Codex** — canonical Cipher spec amended at `docs/specs/subagents/cipher.md` + `docs/specs/skills/cipher.md`: deploy clause extended to MSc; Cluster A enumeration refreshed (description, seated line, corporate parallel); Mode 1 scope extended; new MSc per-repo lens added (notebook hygiene, reproducibility, evaluation rigor, `charter/` + `operations/` register discipline, `cockpit/` PWA data-fetch correctness — derived from MSc's own CLAUDE.md "Use Cipher for" list). The sealed `cipher-rung1-rationale.md` (2026-04-20 historical artifact) is intentionally left untouched.
- **SproutLab** — `.claude/agents/cipher.md` + `.claude/skills/cipher.md` re-synced byte-identical to the amended canonical.
- **MSc** — `.claude/agents/cipher.md` + `.claude/skills/cipher.md` created byte-identical (new `.claude/` tree; MSc had no agent infra before this).

Three coordinated PRs on branch `claude/governance-debt-pr-F1xEO` (one per repo). Amendment provenance: canon-inst-004; Rung-1 redraft by Aurelius, Sovereign-authorized to land. Nyx Rung-2 cross-cluster review per canon-cc-027 §Censor-Self-Review-Case remains available if the Censor wants the new MSc lens stress-tested; the Sovereign-authorized landing did not block on it (no behavioral change — only Cluster A enumeration + the MSc lens, which maps existing review-domains to the new Province rather than inventing Censor behavior).

Remaining follow-ons unchanged: MSc Charter under Edict VIII and MSc Volume registration both ride with MSc Builder seating. PDF rebuild still owed.
