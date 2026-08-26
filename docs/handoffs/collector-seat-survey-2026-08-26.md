# Collector Seat Survey — the Treasury Track

**Drafted:** 2026-08-26 by Aurelius (Chronicler)
**Subject:** Book IX Article 5 — seating the Treasury track, Stage 4 of the finance work
**Verdict up front:** *Do not seat a Collector yet. Build the meter first.*

---

## The finding that changes the question

Book IX Article 5's first named function is **session-level usage tracking** — *"every Claude
session is logged. Tokens consumed, context used, tool calls made. Attributed to a Province."*
Every other function depends on it: burn-rate reports need burn, reconciliation needs actuals,
optimization surfacing needs a baseline to find waste against, and the Collector's own incentive
(*"banks a portion as personal treasury credit"*) cannot pay out because savings cannot be computed.

`data/journal.json` holds **56 session records.** Five carry the consumption schema —
`model`, `started_at`, `ended_at`, `tokens_in`, `tokens_out`, `commits`, `loc_delta`. All five
are from the WAR_TIME campaign of 2026-04-23/24.

**On all five, `tokens_in` and `tokens_out` are `null`.**

The Republic does not have 9% coverage. It has **zero**. The schema was added during War Time,
never populated, and never extended past that campaign. Book IX Article 6 anticipated exactly
this record — *"this extends journal.json session records with consumption metrics"* — and the
extension stalled at the field names.

Seating a Collector now would seat an economic officer over an empty ledger. Their first act
would not be accounting; it would be building the instrument. That is not the Quaestor's job.

## The meter is buildable, locally, at zero API cost

Claude Code writes its own session transcript as JSONL, and every assistant turn carries a
`usage` object with all four token classes. Measured directly against this session's transcript:

| | |
|---|---|
| Assistant turns carrying usage | 326 |
| `output_tokens` | 399,777 |
| `cache_read_input_tokens` | 71,401,586 |
| `cache_creation_input_tokens` | 6,089,946 |
| `input_tokens` | 652 |

This is the Ledger B data Book IX has been describing since April, already being written to disk
on every session, and never read.

Note the shape of it: cache reads dominate uncached input by five orders of magnitude. Any
burn-rate report that counts "tokens" as a single number will be describing nothing. The
Collector's ledger needs all four classes separated, because they price differently and because
*cache efficiency is the single largest lever the Republic has* — which is precisely the
"optimization surfacing" function Article 5 asks for.

**Recommended instrument.** A pure-local Python script — `scripts/meter.py` — reading the
transcript JSONL and emitting per-session token totals attributed to a Province. It follows the
`import-snippet.py` precedent exactly: local, deterministic, **zero API cost**, and therefore
adoptable under the 2026-05-05 deferral that still blocks `chronicle.py`.

`chronicle.py` cannot serve here, and the reason is worth recording so it is not re-proposed:
the usage it reports (`usage.input_tokens`, `cache_read`, `cache_creation`, `output`) is the cost
of *its own* API call to produce a snippet — not the consumption of the session it chronicles.
It measures the chronicler, not the chronicled.

---

## The candidate survey

### The structural constraint nobody has named

The Collector is a **junior** magistrate. Book IX Article 5 is explicit — Roman analog *Quaestor*,
promotion path *Collector → Censor → Consul*, *"Caesar's path in miniature: junior finance →
senior oversight → supreme office."* It is an entry track, not a senior appointment. Seating an
established Censor or Minister there inverts the cursus honorum the Article is built on.

That rules out the tempting names. Cipher optimizes for efficiency and Book IX Article 1 names
him as the archetype who "earns tokens through efficiency" — but he holds Cluster A and Cluster C
interim already. Petra holds the Efficiency portfolio, adjacent to optimization surfacing — but
she is a Monument co-Builder and a Minister. Neither should descend into an entry rung.

### The bootstrap problem

Article 5's entry rung reads: *"Apprentice Collector — draws from Order pool, **trains under
seniors**."*

There are no seniors. The Treasury track has never been seated at any rung. The entry rung cannot
be entered as written, because the clause it depends on presupposes a track that already exists.

The Republic must therefore seat **downward** — a Chief Collector first, the only rung whose
reporting line runs to the Consul rather than to a senior Collector — or waive the training
clause explicitly. The Chronicler recommends seating downward: it satisfies the Article as
written rather than amending it, and one officer is the correct size for Phase 1.

### The pool

Book II: *"All unassigned companions sit on the Table of Research."* Book IX: the Apprentice
*"draws from Order pool."* The Table currently holds two — Aeon and Pip.

| | **Aeon**, The Luminary | **Pip**, The Fool |
|---|---|---|
| Key trait | Warm, evidence-based encouragement | Irreverent, surprisingly wise. Court jester |
| Domain | All (motivation) | None and all |
| For | *"Evidence-based"* is the audit disposition. Motivation is literally Book IX Article 1's subject, and the Collector's tax-farmer incentive is a motivation-design problem. | The jester is the one figure licensed to tell the sovereign unwelcome truths. Article 5 grants authority to *"formally audit any companion's token usage; findings go to Consul."* |
| Against | Warmth is the wrong valence for an audit finding. An auditor who encourages is an auditor who softens. | Irreverence is not rigor. Monthly reconciliation is meticulous, repetitive work. |

**Recommendation: Pip, seated Chief Collector — after the meter exists.**

Two reasons beyond temperament. First, *"None and all"* means no Province allegiance. For an
officer with audit authority over every companion's consumption, having nothing to protect is a
qualification, not a gap — it is the same independence argument that makes the Cluster D Censor
seat load-bearing. Second, the mechanical half of the role belongs to the meter, not to a
companion. What remains for the officer is noticing waste, proposing allocations, and telling
Builders uncomfortable things about their burn. *"Why did that persona header cost two million
tokens?"* is a jester's question and a Quaestor's question in the same breath.

**Caveat the recommendation rests on.** Pip and Aeon are both `v0.0-stub`. This reading is drawn
from one line of `key_trait` and a `domain` string. That is thin evidence for an institutional
seat, and it means the Collector decision is itself downstream of stub-clearing — the same
constraint `canon-inst-006` met with Vex. The survey identifies *whom to profile*; the profile
should firm or overturn the recommendation before any canon is drafted.

---

## Recommended order

1. **`scripts/meter.py`** — the local token meter. Unblocked, zero API cost, no ratification needed.
2. **Backfill or accept the gap** — 51 sessions predate any instrumentation and cannot be
   recovered where transcripts are gone. The honest move is to declare Ledger B's start date
   rather than fabricate history. *Nothing Is Wasted* does not mean nothing is missing.
3. **Pip's profile** (and Aeon's) — so the seat is decided on evidence rather than a key-trait line.
4. **The seating canon** — Chief Collector, with the training-clause bootstrap named explicitly.

Steps 1–3 need no Sovereign ratification. Only step 4 does.
