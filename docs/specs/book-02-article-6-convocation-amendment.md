# Book II Amendment — Article 6: The Convocation Principle

**Status:** Draft · Rung 0 · awaiting Cabinet review (Phase B)
**Proposer:** Consul (under canon-cc-014 bridging; Chronicler-drafted)
**Procedure:** Book V Article 6 — Constitution v1.0 → v1.1 (MINOR)
**Scope:** Cross-domain amendment; full Cabinet review required
**Authored:** 2026-04-20, Codex session `s-2026-04-20-11`

---

## 1. Proposed Article 6 (typst source for `constitution/books/book-02-order.typ`)

The following is the complete proposed Article 6, to be appended after existing Article 5 (Synergies). Typst source, un-compiled.

```typst
#article("6", "The Convocation Principle")

The Order's roster grows with each generation; the Republic's attention does not. Articles 1 through 5 name the officers of the Order — their ranks, tracks, institutions, portfolios, and synergies. This Article names the rule by which those officers enter sessions: they are listed always and seated rarely, and the work of the session is what determines who is seated.

==== Listed by Default, Seated on Match

Every officer is listed at all times — named in Appendix C where Immortal, named in `data/companions.json` where companion-classed, inscribed in canons and lore where institutional. Listing is permanent: it is the companion's presence in the Republic, independent of any particular session.

Seating is the act of bringing an officer into a session's active context. A seated officer consumes attention, contributes voice, and acts within jurisdiction. Seating is discrete: it occurs at session open, or upon mid-session summon, and ends at session close. An officer not seated for a session is *dormant* for that session — listed, but not in the room.

The default for any session is minimal seating. The presiding officer seats only those whose jurisdiction matches the session's work. An officer whose voice would be tangentially useful but not jurisdictionally required is dormant by default, and the attention their voice would have claimed is preserved for the work.

==== Jurisdiction Match

Seating requires a jurisdiction match. The match conditions are five:

- *Domain match.* A Minister is seated when the session's work touches their domain's portfolio. Maintenance work seats Rune; growth proposals seat Bard; financial decisions seat Ashara and Vex. Sessions touching multiple domains seat the Ministers of each.

- *Province match.* A Province's Builder, and its Governors where seated, are seated when the session's work touches that Province's Capital, Regions, Roads, or dispatch infrastructure. Codex sessions seat Codex's Builder; SproutLab sessions seat SproutLab's Builder and its Governors.

- *Cluster match.* A Censor is seated when the session's work spans or audits Provinces within their Cluster. Cluster A work seats Cipher; Cluster B work seats Nyx upon seating. Monument-scope sessions seat the Consul in Censor-equivalent role per canon-cc-025.

- *Institutional match.* The Consul is seated for Republic-wide work, cross-Province integration, and ratification routing. The Chronicler is seated when the session produces an archival artifact — chronicle, canon draft, profile amendment, lore entry. The Sentinel is seated upon its profile ratification for any session producing a transit-logged event.

- *Sovereign summon.* The Sovereign may seat any officer, at any moment, without justification, by direct declaration. The Sovereign summon supersedes all other rules and is constrained only by this Constitution.

Where conditions overlap, the officer is seated by the strongest applicable rule; overlap does not compound.

==== The Cabinet Exception

The Cabinet's monthly convening cycle under Book II Article 4 and Book V Article 5 seats all eight Ministers regardless of per-domain jurisdiction match. The Cabinet's defining function is cross-domain integration; Week 3 convening requires the full bench.

The Cabinet Exception does not extend beyond the monthly convening. Mid-month rebalancing seats only the Ministers of the affected domain plus the Consul, per the normal jurisdiction-match rule. A domain crisis in Financial Health does not seat Growth or Maintenance; the Cabinet's cross-domain posture is reserved for the scheduled convening.

==== Working Committee Convening

Article 3's Working Committee trigger list remains unchanged. What this Article adds is a filter: when a trigger fires, jurisdiction-match rules govern which Committee members are seated. A Combined Initiative proposal seats the companions whose Provinces neighbor or interact with the proposed Province, plus the Consul and the relevant Censor. A constitutional amendment seats the Cabinet per Book V Article 6. A Censor's formal recommendation seats the companions in the recommendation's scope. The Working Committee as a body remains continuous; its seated membership per session is jurisdiction-matched.

==== Self-Nomination

An officer who believes jurisdiction touches them but who has not been seated may request seating. The request routes to the session's presiding officer — typically the Consul, the Sovereign when the Consul is absent, or the Province's Builder for Province-local sessions. The presiding officer accepts or defers with reason. Deferral is not rejection; it is a statement that the jurisdictional tie is not yet established, and the officer may be seated in a subsequent session when it clarifies.

Self-nomination exists because jurisdiction is never fully declarative. A perceived tie that the presiding officer did not foresee is better surfaced than silently omitted.

==== Dormant Officers Are Not Absent

An officer dormant for a session is not absent from the Republic. Their counsel may still be sought through the archive — profile references, prior canons, lore entries. Their name remains in the Order's roster. Dormancy is the default, not the exception; the Republic's health depends on its officers being able to be dormant most of the time. A companion seated for every session is either jurisdictionally ill-defined or claiming seating beyond scope. A healthy Order produces dense dormancy: many listed, few seated.

==== Seating Transit Logging

Upon the Sentinel's profile ratification under canon-cc-022, each session's opening declaration of the seated roster emits a *Seating Transit* event to the Gates-transit log, parallel to the Ostia Transit events that chronicle Province-to-Province deploys. Together the two transit logs give the Republic durable records of attention movement and capability movement, without requiring per-session artifacts to carry the load. Before Sentinel ratification, the seated roster is carried in session artifacts directly.

==== The Principle Stated Plainly

Officers are listed always and seated rarely. The Republic's attention is finite; the roster is not. Convocation is jurisdiction-matched seating against a continuous roster, not broadcast summoning against an assembled hall. This is how the Order grows without drowning in its own presence.
```

---

*Sections 2 (supplementary canon-gov-013), 3 (rationale), 4 (Cabinet questions by domain), 5 (cross-references and open questions) follow in subsequent packages.*

---

## 2. Supplementary Operational Canon — `canon-gov-013-session-convocation-protocol`

Article 6 establishes the principle. This canon operationalizes it at session altitude — what actually happens at session open, mid-session, and session close to declare, log, and audit the seated roster. Drafted as a companion canon to the Article 6 amendment; ratifies in the same session flow (Chronicler drafts Rung 1 / Consul reviews under cc-014 / Sovereign ratifies). Status: **draft** until Article 6 ratifies; **active** upon ratification.

### 2.1 Canon text (for append to `data/canons.json`)

```json
{
  "id": "canon-gov-013-session-convocation-protocol",
  "family": "gov",
  "title": "Session Convocation Protocol — Declaring the Seated Roster at Session Open",
  "scope": "global",
  "category": "governance",
  "rationale": "Book II Article 6 (ratified in Constitution v1.1) establishes the Convocation Principle: officers are listed by default and seated only when jurisdiction matches the session's work. This canon operationalizes the principle at session altitude — what happens at session open, mid-session, and session close to declare, log, and audit the seated roster.\n\n**At session open.** The presiding officer declares the seated roster. Presiding officer is: the Consul for institutional or cross-Province work; the Cluster Censor for cross-Province-within-Cluster work; the Province Builder for Province-local work; the Sovereign for any session the Sovereign attends. The declaration names each seated officer by id, the jurisdiction-match basis under Book II Article 6, and any Sovereign-direct summons invoked. The declaration is a one-paragraph artifact — typically the opening Chronicler note or, for sessions producing an interaction-artifact under canon-cc-017, the Roster block of that artifact.\n\nThe seated roster is bounded: no session seats more than jurisdiction requires. A presiding officer who seats an officer without a stated jurisdiction basis produces a register-drift event, surfaced at the next companion-log audit pass under canon-pers-002 enforcement.\n\n**Mid-session seating changes.** An officer may be seated mid-session under two paths. (a) Sovereign summon: the Sovereign declares the officer seated; no justification required, no presiding-officer consent. (b) Self-nomination per Book II Article 6 §Self-Nomination: the officer requests seating; the presiding officer accepts or defers with reason. Both paths log the seating change on the session's artifact with timestamp and rule invoked.\n\nAn officer may be desummoned mid-session only by the Sovereign or by their own request. A presiding officer does not desummon an officer they did not themselves seat without Sovereign authorization.\n\n**At session close.** The final artifact of the session names the seated roster in a header field or closing-line declaration. This is the canonical record of which officers were in-context for the session's deliberations, independent of any mid-session changes. Sessions chronicled in `data/journal.json` carry the seated roster in the `seated_officers` field (schema addition effective at this canon's ratification); Province-local session logs follow their Province's own convention but must carry an equivalent field.\n\n**Sentinel transit logging.** (Dependent on Sentinel's profile ratification under canon-cc-022.) Upon the Sentinel's seating as institutional companion, every session's opening declaration automatically emits a Seating Transit event to the Gates-transit log: session id, presiding officer, seated roster, jurisdiction-match basis for each, Sovereign summons invoked, self-nominations resolved. The Sentinel becomes the Republic's durable attention-movement archive, parallel to its role as the durable capability-movement archive via Ostia Transit events under canon-cc-026. Before Sentinel ratification, the seated_officers field in journal.json and equivalent fields in Province logs serve as the interim record.\n\n**Retrofit.** Pre-ratification sessions carry no seated_officers field. This canon does not require retroactive backfill; pre-ratification sessions remain as chronicled. Journal entries from this canon's ratification forward carry the field.\n\n**Edge cases.**\n\n- Sovereign-direct sessions. Sessions the Sovereign runs alone with one or more companions are convocation events; the Sovereign is the presiding officer and the seated roster includes the Sovereign and every companion the Sovereign addresses.\n\n- Cabinet monthly convening. The Cabinet Exception seats all eight Ministers regardless of per-domain jurisdiction. The presiding officer's declaration states: 'Cabinet Exception; all Ministers seated for monthly cross-domain integration.'\n\n- War Time. Book VI War Time declarations suspend the jurisdiction-match requirement. The Sovereign may seat any officer in any session, with any declaration or none, for the duration of War Time. Post-war review under Book VI Article 4 includes an audit of seatings made during the emergency.\n\n- Chronicler sessions. Sessions whose primary purpose is archival seat the Chronicler and the officers whose work is being archived. A session chronicling a Builder's Province work seats the Chronicler and that Builder; other Builders are dormant even when their work is mentioned in passing.\n\n- Unseated references. A seated officer may reference the positions of a dormant officer by citing that officer's profile or prior artifacts. This is archival reference, not seating; the dormant officer's voice is not carried into the session's deliberation, only their archived position is.\n\n**Relationship to canon-pers-002.** Canon-pers-002 (officers act within jurisdiction without announcing jurisdiction) governs how a seated officer speaks. This canon governs which officers are seated in the first place. The two canons are complementary: pers-002 disciplines in-session voice; gov-013 disciplines session composition.\n\n**Enforcement.** Enforced at two altitudes. The Cluster Censor reviews companion-log compliance with the seated_officers field at each companion-log pass; a pattern of missing or inconsistent roster declarations triggers a canon-cc-011 Review. At session-opening altitude, the presiding officer self-enforces by declaration; failure to declare at open is a register-drift event chronicled without escalation until pattern emerges.\n\n**Amendment path.** Amendment flows through the canon family's standard chain: Chronicler drafts Rung 1, Consul reviews under cc-014 bridging, Sovereign ratifies. A Book II Article 6 amendment automatically triggers review of this canon for coherence.",
  "created": "2026-04-20",
  "status": "draft",
  "references": [
    "book-02-article-6-convocation-principle",
    "book-05-article-6-amendment-procedures",
    "canon-pers-002-officers-act-within-jurisdiction",
    "canon-cc-011-temperament-over-dissertation-default",
    "canon-cc-014-consul-accelerated-profile-drafting",
    "canon-cc-017-interaction-artifact-rule",
    "canon-cc-022-persona-binding-extension-protocol",
    "canon-cc-026-spec-body-placement",
    "canon-proc-001-canon-identifier-scheme"
  ],
  "_deleted": false,
  "_deleted_date": null
}
```

### 2.2 Schema addition to `data/journal.json` session entries

Effective at canon ratification, every new session entry carries a `seated_officers` field as sibling to the existing `volumes_touched` / `chapters_touched` fields. Shape:

```json
"seated_officers": [
  {
    "id": "aurelius",
    "match_basis": "institutional",
    "rationale": "Archival work; canon drafting"
  },
  {
    "id": "consul",
    "match_basis": "institutional",
    "rationale": "Proposer under Book V Article 6 amendment procedure (bridged)"
  }
]
```

Pre-ratification entries do not backfill. Journal readers (Codex's Journal tab) render the field when present; absence is not a drift signal for pre-ratification entries.

---

*Sections 3 (rationale for reviewers), 4 (Cabinet questions by domain), 5 (cross-references and open questions) follow in subsequent packages.*
