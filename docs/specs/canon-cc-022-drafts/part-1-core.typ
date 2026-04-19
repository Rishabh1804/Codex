#import "style.typ": *

#setup-page()
#setup-headings()

// ============================================================
// Title block
// ============================================================

#align(center)[
  #v(2cm)
  #text(28pt, weight: "bold", fill: warm-dark)[Canon cc-022]
  #v(0.3em)
  #text(20pt, weight: "bold", fill: warm-dark)[Persona-to-Primitive Binding]
  #v(0.4em)
  #text(13pt, fill: warm, style: "italic")[How Companions Act as Subagents, Skills, and Convening Members]
  #v(1.5cm)
]

#meta-table(
  [*Status*], [draft v0.1 — revised against QA audit; awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Part 1 of 4 covers*], [§1 (why this canon exists), §2 (the binding rule)],
  [*Other parts*], [Part 2: §3 modes + §4 ladder rungs · Part 3: §4 institutional seats · Part 4: §4 taxonomy + summary + closing],
  [*Not yet drafted*], [§5 extension protocol, §6 convening, §7 Design Committee, §8 placement, §9 signing chain, §10 Edict V trace, §11 bootstrap, §12 UI Manifest, §13 pending deps, §14 references],
)

#v(1em)

#rulebox(title: [Reader's note])[
  This draft covers the governance-rule core of canon cc-022. The structural clauses (§§5–9) and supporting sections (§§10–14) are separately drafted and under revision. Areas of architectural importance are highlighted with a warm-cream callout. Primitive bindings are color-coded throughout: #subagent-tag  #skill-tag  #none-tag.
]

#pagebreak()

// ============================================================
// §1 — Why this canon exists
// ============================================================

= §1 — Why This Canon Exists

Republic companions — Builders seated in Provinces, Censors watching clusters, Governors auditing Regions, the Consul holding the Republic's crossing-seams, the Chronicler carrying institutional memory, Scribes, Ministers, and the institutional seats not yet named — each speak in a distinct voice and each act through characteristic patterns of invocation. Those invocations are not currently governed. A Builder summons a Censor by typing #key[Cipher mode] in the same session where a Capital change is being drafted; a Consul is invited into a Province by improvised pattern; a committee's voice emerges from whichever companion is speaking when the subject turns. This arrangement has carried the Republic through the founding period and is acknowledged under pre-ratification precedent, but it is #key[structurally fragile]: voices drift toward the main agent's register, chains collapse silently, delegations lose their provenance. When the Republic scales past the Foundation stage — when Monument Projects complete, when 30K thresholds fire new Governors, when the Gen-1 successors begin pairing — the absence of a binding rule will show as accumulated ambiguity no single session can unwind.

This canon addresses that fragility #key[at the level of the invocation itself]. It ratifies a governance-rule core — the artifact test (§2), the invocation-mode shape (§3), the applied bindings for known rungs (§4), and the extension protocol for future rungs (§5) — and four structural clauses that operationalize the rule: the committee convening pattern (§6), the Design Committee membership formula (§7), the canonical spec placement (§8), and the signing chain for spec-body changes (§9). Each clause ratifies independently under canon-cc-012 per-block protocol; the governance-rule core is the #key[ratifiable heart], and the structural clauses are the architecture that makes the heart operationally real.

The canon declares its #key[UI Manifest] (§12) per Edict IX (UI-Canonical-Existence). Every binding declared in §4 names a UI surface in Command Center that renders and audits it; surfaces not yet built are named as queued dependencies on specific follow-on canons. Until those canons land, the persona-subagent system operates in bridging mode (§11): #key[governance ratifies now; operational surfaces catch up] as Command Center wires its 14 rooms. The ratification layer and the operational layer are decoupled by design. The rule is legitimate the moment it ratifies; its UI representation becomes legitimate the moment its surface lands.

Companion invocations that predate cc-022 ratification are #key[grace-covered] under the same principle as canon-cc-017's pre-ratification clause. Pre-ratification voice drift, chain elisions, and improvised summons are not retrospectively penalized; the record stands as the lore from which the rule was derived. From the first post-ratification invocation forward, the rule binds.

This is #key[structural plumbing, not policy]. It does not tell the Chronicler what to chronicle, the Censor what to approve, the Governor what to flag, or the Consul what to escalate. It tells the Republic how those voices render through Claude Code's primitives, so that every future invocation leaves a trail the Consul can read and the Sovereign can adjudicate.

#pagebreak()

// ============================================================
// §2 — The binding rule
// ============================================================

= §2 — The Binding Rule

The #key[unit of binding is the invocation mode], not the role. A single role may carry several modes, each rendered through a different primitive; a single mode binds to exactly one primitive; the binding is determined by the mode's output shape, not by the role's ladder position.

For any invocation mode, the draft author applies the #key[artifact test]:

#rulebox(title: [The artifact test])[
  #text(13pt, weight: "bold")[
    Does this invocation produce an output that must exist as a separable, attributable, auditable artifact — one that lives outside the caller's transcript, carries a named originator, and is available to subsequent review?
  ]
  #v(0.5em)
  — If #key[yes] → the mode binds to #subagent-tag.
  #linebreak()
  — If #key[no] (output lands as voice/register inside the caller's transcript, no binding force) → the mode binds to #skill-tag.
  #linebreak()
  — If #key[both, by context] → the role is dual-bound (one mode per primitive).
]

If yes, the mode binds to #subagent-tag. Claude Code's subagent primitive runs in isolated context, receives a bounded brief, and returns a structured result that the Republic can record as a first-class interaction-artifact under canon-cc-017. Subagent bindings apply to modes that sign, gate, escalate, attest, or otherwise produce a record whose provenance is load-bearing: Edict V final-pass review, Governor QA findings, Consul working-ratification, committee member positions, Sentinel movement logs. #key["Signed"] in the Edict V chain sense is one special case of attributability; attribution covers witness and observer outputs as well.

If no — if the mode's output lands as voice or register inside the caller's active transcript, carrying no binding force, contributing to the caller's current work without producing a separable record — the mode binds to #skill-tag. Skills are invoked via Claude Code's skill primitive, serve the caller's active session, and produce in-transcript output that becomes part of the caller's own authored record. Skill bindings apply to modes that serve, speak, capture, or render: Chronicler's journal-authoring voice, Cipher's hat-switch smell-check, Scribe peer-support, Sentinel's continuity query.

If the same role answers differently in different contexts — if one context produces a separable artifact and another lands as in-transcript voice — the role binds to #key[both primitives, one per mode]. This is #key[dual-binding]. Dual-binding is #key[common, not exceptional]: Censors are dual-bound (Edict V final-pass as #subagent-tag, hat-switch as #skill-tag); the Chronicler is dual-bound (authoring voice as #skill-tag, synthesis-clerk as #subagent-tag); Sentinel is dual-bound (logging and flagging as #subagent-tag, continuity query as #skill-tag). The role's profile enumerates every mode and declares each binding explicitly.

#notebox(title: [Heuristics — tells, not rules])[
  — Gating, signing, escalating, witness-attributing outputs → trend #subagent-tag\
  — Serving, speaking, capturing, register-switching outputs → trend #skill-tag\
  — Territorial roles (with jurisdiction) → trend #subagent-tag\
  — Non-territorial roles → trend #skill-tag\
  — Edict V rank-chain participation → #key[cannot bind to skill] (no separable signature)\
  \
  #key[Where heuristics and the artifact test disagree, the artifact test governs.]
]
