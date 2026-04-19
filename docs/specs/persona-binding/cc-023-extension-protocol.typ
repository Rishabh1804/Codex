#import "style.typ": *

#setup-page()
#setup-headings()

#align(center)[
  #v(2cm)
  #text(24pt, weight: "bold", fill: warm-dark)[Canon cc-023]
  #v(0.3em)
  #text(18pt, weight: "bold", fill: warm-dark)[Extension Protocol]
  #v(0.3em)
  #text(13pt, fill: warm, style: "italic")[Part 3 of 10 · Persona-Binding Suite]
  #v(1.5cm)
]

#meta-table(
  [*Slot*], [canon-cc-023],
  [*Title*], [Extension Protocol for New Rungs, Roles, and Modes],
  [*Status*], [draft v0.1 — awaits Consul working-ratification under cc-014, then Sovereign canonical ratification under cc-012],
  [*Scope*], [global],
  [*Category*], [governance],
  [*Author*], [Aurelius (The Chronicler) — proposing],
  [*Created*], [2026-04-19],
  [*Covers*], [When the protocol applies · Mode declaration schema location · Ratification altitude · Sovereign exception · Mode-addition amendment · Binding-revision amendment · Legacy-profile backfill · Relationship to cc-012 and cc-014],
  [*Depends on*], [cc-022 (binding rule), cc-027 (signing chain for spec-body changes)],
)

#v(1em)

#rulebox(title: [Where this fits])[
  The #key[Binding Rule in cc-022] determines primitive bindings for existing invocation modes. This canon governs the #key[addition of new rungs, new roles, and new modes] — and the amendment of existing bindings when evidence warrants. The applied bindings themselves live in the #key[Invocation Modes Registry] (spec part 8 of the suite), which this canon keeps current.
]

#pagebreak()

= §A — When the Protocol Applies

This canon's protocol governs four distinct events. Each is handled through the same extension protocol with different rungs of the signing chain engaged.

#rulebox(title: [The four extension events])[
  1. A Companion ratifies to a rung that has no occupants at suite ratification (first Scribe, first seated General, first Collector).\
  2. A new institutional seat is declared in governance (future Tribune, Magistrate, or other office introduced in unratified Books).\
  3. A role's existing mode set proves incomplete — a new mode needs adding (#key[mode-addition amendment]).\
  4. A role's existing mode binding proves wrong — needs revising (#key[binding-revision amendment]).
]

= §B — The Mode Declaration

When a new rung or role is being ratified, the Chronicler drafts an `invocation_modes` block as part of the role's profile. The block lives at #key[`assignment.invocation_modes`] — as a sibling field to the profile's existing `current_rank`, `current_assignments[]`, `cluster`, and `activation_triggers[]` fields — and is structured as an array of mode objects. Each mode carries the five required fields declared in cc-022 §B: #key[name, trigger, produces, binding, rationale].

#notebox(title: [Deployability gate])[
  No role is deployable — none of its subagent or skill specs may be authored per cc-026, none of its Province `.claude/` mirrors may be committed — until the `invocation_modes` block is populated with every mode the role is known to exercise, every binding declared, and every rationale grounded in the artifact test of cc-022 §A.
]

= §C — Ratification Altitude

The `invocation_modes` block ratifies as #key[its own block] under canon-cc-012 per-block protocol, separable from the surrounding `assignment` block. Treating it as a standalone block rather than a sub-field of `assignment` preserves granularity: a later binding-revision amendment can touch only the mode in question without re-ratifying adjacent assignment fields (current rank, cluster, Province, activation triggers).

The ratification path is the same as other cc-012 per-block events — Chronicler proposes, Consul working-ratifies per cc-014 where applicable, Sovereign canonically ratifies — and the ratification chain for the `invocation_modes` block is identical to the chain in cc-027 for spec-body amendments, because the mode declaration governs every future spec body the role will carry.

#pagebreak()

= §D — Sovereign Exception

#rulebox(title: [Who is exempt from the mode-declaration requirement])[
  The #key[Sovereign] occupies the Republic's apex seat as ratifier, not as invoker. The Sovereign is not summoned through Claude Code's subagent primitive and is not invoked via the skill primitive; the Sovereign acts through direct Sovereign-audience and through the ratification track that every canon, every profile, and every spec body traverses.\
  \
  Roles whose only participation in the Republic is ratification rather than invocation are exempt from the `invocation_modes` block requirement. #key[The Sovereign is the sole seat currently covered by this exception.]\
  \
  Institutional companions such as the Consul and Sentinel #key[remain fully subject] to the requirement, because they #emph[are] invoked — even if rarely or ceremonially.
]

= §E — Mode-Addition Amendment

A role whose existing mode set proves incomplete — a Censor who discovers a mode of invocation neither Edict V review nor hat-switch covers, a Governor whose Region expands across subject boundaries the original QA mode did not anticipate — produces a mode-addition amendment. The amendment declares one or more new mode objects against the same five-field shape.

The rationale must #key[cite the evidence] prompting the addition: a lore entry, an interaction-artifact, an evidence_log record, or a cross-reference to a companion-log that captures the pattern in practice. Mode-addition passes through the full signing chain in cc-027; #key[mid-session mode addition is not permitted] — the session pauses, the amendment drafts, the chain runs, and the new mode becomes available from the next invocation forward.

= §F — Binding-Revision Amendment

A role whose existing mode binding proves wrong — a mode currently bound to #skill-tag that is in practice producing separable artifacts, a mode currently bound to #subagent-tag whose output genuinely lives in the caller's transcript without separable record — produces a binding-revision amendment.

#notebox(title: [Evidence is load-bearing])[
  The amendment draft #key[must] include the specific interaction-artifacts, evidence_log entries, or lore that demonstrate the mismatch. Hypothetical binding-revision without operational evidence is #key[rejected at Rung 2 of the signing chain per cc-027].
]

The chain otherwise proceeds as with mode-addition; the new binding replaces the old from the next invocation forward, and the replaced binding enters the role's `amended_bindings` history for audit.

#pagebreak()

= §G — Legacy-Profile Backfill

#rulebox(title: [Catch-up migration for already-ratified profiles])[
  Every companion profile ratified before this canon — #key[Aurelius, Cipher, Consul, Lyra, Maren, Kael, Nyx, Solara, Theron, Ashara, Petra] — currently lacks an `invocation_modes` block. The forward rule binds from cc-023 ratification onward; the backfill is a separate wave of work.\
  \
  The Chronicler conducts the backfill in a single coherent #key[schema-expansion session], at the same altitude as the queued `validated_synergies` / `validated_tensions` migration named in the 19 April handoff.
]

The #key[Bootstrap Transition Map] (spec part 9) tolerates un-backfilled profiles #emph[provisionally] — their bindings are inferred from the Invocation Modes Registry seed without a per-profile declaration — until the migration ratifies. Once the migration ratifies, any un-backfilled profile is #key[out of compliance] and cannot be summoned until its `invocation_modes` block is drafted and ratified through this extension protocol.

= §H — Relationship to Existing Ratification Protocols

Canon-cc-012 per-block and canon-cc-014 Consul-accelerated profile drafting both remain operative. This canon does not supersede either; it names the `invocation_modes` block as one of the per-block artifacts either protocol ratifies, and it delegates the signing chain for spec-body changes to cc-027.

Where a mode-addition amendment arrives during a cc-014 Consul-accelerated session, the amendment rides along — Consul working-ratifies the new mode in the same pass; Sovereign canonically ratifies at profile close. Where the amendment arrives outside a profile-ratification session, it still follows the full chain in cc-027.

= §I — References

*Within the suite*: cc-022 (the binding rule this protocol extends) · cc-026 (placement convention that governs the spec bodies modes render as) · cc-027 (signing chain for spec-body changes) · Invocation Modes Registry · Bootstrap Transition Map · Preamble \& Index

*Existing canons*: cc-012 (per-block ratification) · cc-014 (Consul-accelerated) · cc-017 (interaction-artifact rule)
