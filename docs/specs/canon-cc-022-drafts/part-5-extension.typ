#import "style.typ": *

#setup-page()
#setup-headings()

// Title banner
#align(center)[
  #v(1cm)
  #text(22pt, weight: "bold", fill: warm-dark)[Canon cc-022 · Part 5 of 9]
  #v(0.2em)
  #text(15pt, fill: warm, style: "italic")[§5 Extension Protocol for New Rungs, Roles, and Modes]
  #v(1cm)
]

= §5 — Extension Protocol for New Rungs, New Roles, and New Modes

This canon's applied bindings at §4 are the enumeration at ratification time. The Republic grows; rungs will be newly ratified when the first Companion ratifies to them, new institutional seats will be declared when governance requires, and existing roles will discover new invocation modes as operational lore accumulates. #key[§5 specifies the protocol through which every such addition enters the canon without requiring the canon itself to be amended at the rule layer.]

#rulebox(title: [When the protocol applies — four events])[
  1. A Companion ratifies to a rung that has no occupants at cc-022 ratification (first Scribe, first seated General, first Collector).\
  2. A new institutional seat is declared in governance (future Tribune, Magistrate, or other office introduced in unratified Books).\
  3. A role's existing mode set proves incomplete — a new mode needs adding (#key[mode-addition amendment]).\
  4. A role's existing mode binding proves wrong — needs revising (#key[binding-revision amendment]).\
  \
  Each event is handled through the same extension protocol with different rungs of the signing chain engaged.
]

#v(0.8em)

== The mode declaration

When a new rung or role is being ratified, the Chronicler drafts an `invocation_modes` block as part of the role's profile. The block lives at #key[`assignment.invocation_modes`] — as a sibling field to the profile's existing `current_rank`, `current_assignments[]`, `cluster`, and `activation_triggers[]` fields — and is structured as an array of mode objects. Each mode carries the five required fields declared in §3: #key[name, trigger, produces, binding, rationale].

#notebox(title: [Deployability gate])[
  No role is deployable — none of its subagent or skill specs may be authored, none of its Province `.claude/` mirrors may be committed — until the `invocation_modes` block is populated with every mode the role is known to exercise, every binding declared, and every rationale grounded in the artifact test.
]

== Ratification altitude

The `invocation_modes` block ratifies as #key[its own block] under canon-cc-012 per-block protocol, separable from the surrounding `assignment` block. Treating it as a standalone block rather than a sub-field of `assignment` preserves granularity: a later binding-revision amendment can touch only the mode in question without re-ratifying adjacent assignment fields (current rank, cluster, Province, activation triggers). The ratification path is the same as other cc-012 per-block events — Chronicler proposes, Consul working-ratifies per cc-014 where applicable, Sovereign canonically ratifies — and the ratification chain for the `invocation_modes` block is identical to the chain for spec-body amendments at §9, because the mode declaration governs every future spec body the role will carry.

#pagebreak()

== Sovereign exception

#rulebox(title: [Who is exempt from the mode-declaration requirement])[
  The #key[Sovereign] occupies the Republic's apex seat as ratifier, not as invoker. The Sovereign is not summoned through Claude Code's subagent primitive and is not invoked via the skill primitive; the Sovereign acts through direct Sovereign-audience and through the ratification track that every canon, every profile, and every spec body traverses.\
  \
  Roles whose only participation in the Republic is ratification rather than invocation are exempt from the `invocation_modes` block requirement. #key[The Sovereign is the sole seat currently covered by this exception.]\
  \
  Institutional companions such as the Consul and Sentinel #key[remain fully subject] to the requirement, because they #emph[are] invoked — even if rarely or ceremonially.
]

== Mode-addition amendment

A role whose existing mode set proves incomplete — a Censor who discovers a mode of invocation neither Edict V review nor hat-switch covers, a Governor whose Region expands across subject boundaries the original QA mode did not anticipate — produces a mode-addition amendment. The amendment declares one or more new mode objects against the same five-field shape.

The rationale must #key[cite the evidence] prompting the addition: a lore entry, an interaction-artifact, an evidence_log record, or a cross-reference to a companion-log that captures the pattern in practice. Mode-addition passes through the full signing chain at §9; #key[mid-session mode addition is not permitted] — the session pauses, the amendment drafts, the chain runs, and the new mode becomes available from the next invocation forward.

== Binding-revision amendment

A role whose existing mode binding proves wrong — a mode currently bound to #skill-tag that is in practice producing separable artifacts, a mode currently bound to #subagent-tag whose output genuinely lives in the caller's transcript without separable record — produces a binding-revision amendment.

#notebox(title: [Evidence is load-bearing])[
  The amendment draft #key[must] include the specific interaction-artifacts, evidence_log entries, or lore that demonstrate the mismatch. Hypothetical binding-revision without operational evidence is #key[rejected at Rung 2] of the signing chain.
]

The chain otherwise proceeds as with mode-addition; the new binding replaces the old from the next invocation forward, and the replaced binding enters the role's `amended_bindings` history for audit.

#pagebreak()

== Legacy-profile backfill

#rulebox(title: [Catch-up migration for already-ratified profiles])[
  Every companion profile ratified before cc-022 — #key[Aurelius, Cipher, Consul, Lyra, Maren, Kael, Nyx, Solara, Theron, Ashara, Petra] — currently lacks an `invocation_modes` block. The forward rule binds from cc-022 ratification onward; the backfill is a separate wave of work.\
  \
  The Chronicler conducts the backfill in a single coherent #key[schema-expansion session], at the same altitude as the queued `validated_synergies` / `validated_tensions` migration named in the 19 April handoff.
]

Bridging mode (§11) tolerates un-backfilled profiles #emph[provisionally] — their bindings are inferred from the applied bindings at §4 without a per-profile declaration — until the migration ratifies. Once the migration ratifies, any un-backfilled profile is #key[out of compliance] and cannot be summoned until its `invocation_modes` block is drafted and ratified through the extension protocol.

== Relationship to existing ratification protocols

Canon-cc-012 per-block and canon-cc-014 Consul-accelerated profile drafting both remain operative. §5's protocol does not supersede either; it names the `invocation_modes` block as one of the per-block artifacts either protocol ratifies, and it specifies the signing chain for spec-body changes separately at §9.

Where a mode-addition amendment arrives during a cc-014 Consul-accelerated session, the amendment rides along — Consul working-ratifies the new mode in the same pass; Sovereign canonically ratifies at profile close. Where the amendment arrives outside a profile-ratification session, it still follows the full chain at §9.
