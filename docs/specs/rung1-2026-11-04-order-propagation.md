# Rung 1 — Order propagation corrections to six spec bodies (2026-11-04)

**Chain:** canon-cc-027 (spec-body signing chain). This is the Rung 1 proposal. Rungs 2–4 are pending. Nothing here is deployable until Rung 4; no Province mirror may be updated before then.
**Kind:** factual propagation only. Each change brings a spec body into line with a canon or decree that is already ratified. No heuristic, voice, compass bearing or return shape is changed.
**Origin:** a cross-repository audit of the Order on 2026-11-04 against `data/companions.json`. Province mirrors of these specs were carrying the stale lines; the source of the drift was here.

## Changes

| Spec | Was | Now | Authority |
|---|---|---|---|
| `subagents/cipher.md` description and §Non-negotiables "Cluster scope" | Censor of Cluster A; "Cluster A only" | Cluster A, Cluster C (interim), and the SEP-Ops Edict V pass | canon-inst-003 (2026-05-24); Sovereign ruling 2026-09-01, decree 0023 |
| `subagents/cipher.md` §Per-repo lens, MSc | "no Builder yet seated" | CodeMike seated | canon-inst-005 (2026-05-21) |
| `subagents/cipher.md` §Per-repo lens | No entries for Cluster C or SEP-Ops; MyFin not named among the forwards to Nyx | Entries for Cluster C (interim) and the SEP-Ops exception; MyFin forwards to Nyx | as above; decree 0023 (Nyx, Cluster D) |
| `skills/cipher.md` trigger line | "Aurelius in Codex … MSc Builder seat pending" | Orinth in Codex; CodeMike seated | canon-inst-001; canon-inst-005 |
| `subagents/consul.md` "Do not summon" (b) | Cipher (A) or Nyx (B) | Cipher (A; C interim; SEP-Ops Edict V) or Nyx (B, D) | canon-inst-003; decree 0023 |
| `subagents/consul.md` §Per-repo lens, sep-dashboard | "Rune holds Stability" | Both Maintenance seats vacant; repository archived 2026-10-29 | canon-inst-002; canon-cc-011 |
| `subagents/consul.md` §Per-repo lens, command-center | "The Monument" | Monument-class Province in Cluster C | canon-inst-003 |
| `subagents/consul.md` §Per-repo lens | No entries for MSc, Temple of Mars, SEP-Ops, MyFin | Added, stating facts of record only | canon-inst-003/-005/-006/-007; decrees 0022, 0025, 0026 |
| `subagents/chronicler.md` §Per-repo lens | Five Provinces; "The Monument" | Adds MSc, Temple of Mars, SEP-Ops, MyFin; Monument as a class; sep-dashboard archived | as above; canon-inst-008 |
| `subagents/kael.md` header and §References; `skills/kael.md` §References | "Kael → Orinth planned reassessment" | Clause struck; no successor pre-named | canon-inst-001 (Corollary: Kael-succession clause struck) |

## Rung assignments

- **Rung 2.** Cipher's own spec goes to Nyx (§Censor-self-review case). Kael's specs go to Cipher, with Maren as peer reviewer under canon-cc-033. The Consul and Chronicler specs use institutional-spec collapse: the Consul performs both Rung 2 and Rung 3.
- **Rung 3.** The Consul gives working-ratification under canon-cc-014.
- **Rung 4.** The Sovereign ratifies.

## What follows ratification

Each Builder redeploys the ratified bodies byte-identical to their Province's `.claude/`. The audit found stale mirrors in SproutLab, MSc, SEP-Ops (`soma-internal`) and Command Center.

## Not in this proposal

- SproutLab's Ceres, Vela and Carina seats under canon-gen-001: no Codex record exists, so this waits on a Sovereign ruling.
- `subagents/lyra.md` "Monument-adjacent": its intent is unclear, so it is left for the Chronicler.
- The stale Cabinet in the Constitution itself (Book II Art. 4, Appendix C): writing a canon into the Constitution needs a decree (precedent: decree 0020).
