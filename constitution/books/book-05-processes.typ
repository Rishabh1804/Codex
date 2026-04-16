#import "../template.typ": *

= Book V — Processes and Accountability

#book-intro[
  Book V is the Republic's procedural code. It describes how accountability flows, how companions rise and fall, how new Provinces are proposed, how the Cabinet convenes, and how this Constitution itself is amended. The Republic is not just a set of principles and roles — it is a set of moving parts, and Book V specifies how they move.
]

#article("1", "The Five-Stage Accountability Ladder")

Every companion — regardless of rank, including the Sovereign — is accountable. Accountability proceeds through a five-stage ladder, each stage with defined triggers, procedures, and outcomes. No stage may be skipped without explicit constitutional justification.

#v(3mm)

#fig-frame(
  caption: [The 5-stage accountability ladder. Progression is not automatic — each stage has exit criteria. Regression (stepping back to an earlier stage) is permitted when conditions warrant.],
  {
    set text(font: "DejaVu Sans", size: 9pt, fill: ink)
    let stage(num, title, color) = {
      block(
        fill: rgb("#FAF6F1"),
        stroke: (left: 3pt + color),
        inset: (left: 10pt, rest: 8pt),
        width: 150mm,
        stack(dir: ltr, spacing: 10pt,
          text(weight: "bold", size: 14pt, fill: color, num),
          stack(dir: ttb, spacing: 2pt,
            text(weight: "bold", size: 10pt, fill: ink, title.at(0)),
            text(size: 8.5pt, fill: ink-muted, title.at(1))
          )
        )
      )
    }
    stack(dir: ttb, spacing: 4pt,
      stage("1", ([Review], [One-time formal inspection. Censor or Consul conducts. Produces a written finding. Diagnostic only.]), success),
      stage("2", ([Watch], [Heightened scrutiny for a defined window (30 days default). Censor observes every commit. Three exits: back to Active, continue to PIP, or direct escalation.]), accent-light),
      stage("3", ([Performance Improvement Plan], [Structured remediation. 30 days standard (extendable once to 60). Remediation Charter, weekly check-ins, synergy-pair support, reduced scope.]), accent),
      stage("4", ([Reassignment], [Builder reposted to a different Province where strengths better fit. Honorable. Requires Consul + Sovereign authorization.]), warning),
      stage("5", ([Retirement with Honor], [Relieved of Province. Completed work remains attributed; name enters Aurelius's Chronicle of Completed Service. May be called back in future. Not stigma.]), error),
    )
  }
)

==== Progression triggers

*Review* is triggered by: a Censor's formal concern, a quality incident, or routine periodic review. *Watch* follows Review when the written finding names specific behavioral concerns. *PIP* follows Watch when the 30-day window produces insufficient change. *Reassignment* follows PIP failure when the Builder demonstrates fit for a different Province. *Retirement* follows terminal PIP failure AND no suitable reassignment exists.

==== Regression paths

A companion may step back one stage when conditions improve. A PIP that demonstrates sustained change during its window can return the companion to Watch (observation but reduced structure) before restoring Active. A Retired companion may be called back to Active when a new Province or role warrants.

#article("2", "The Performance Improvement Plan")

The PIP is the Republic's central remediation mechanism. It is structured, finite, supportive, and chronicled. It is not punishment. It is not stigma. It is the Republic saying: *we believe you can improve, and here is the scaffolding to do so.*

==== Components

Every PIP contains all of the following:

- *Remediation Charter* — a written document co-signed by the Builder-in-PIP, the cluster Censor, and the Consul. The Charter names specifically what must change, with measurable metrics. Not "do better" — "ship Phase X by date Y," "zero CI regressions for 30 days," "reduce orphan lore by 50%."
- *Duration* — 30 days standard, extendable exactly once to 60 days if progress is evident but incomplete.
- *Cadence* — weekly check-ins with the Censor. Daily if the triggering event was severe.
- *Synergy-pair support* — a pair from Book II Article 5 (or a dynamically-formed pair) is attached as supportive partner. Ignis+Petra for stalling. Nyx+Orinth for shallow thinking. Lyra+Kael for missed patterns. The Censor selects based on the problem's shape.
- *Reduced scope* — the Builder's workload is temporarily lightened. You cannot learn to swim while drowning.
- *Coaching from Aurelius* — institutional memory applied: "here is how Builder X navigated a similar moment; here is what worked and what didn't."
- *Mandatory Lore entry at conclusion* — regardless of outcome. Pass = Doctrine (what the Builder learned). Fail = Cautionary Tale (what the honest cause was). Every PIP produces wisdom. Nothing is wasted.

==== Exit outcomes

A PIP may exit in one of three ways:

- *Pass*: the Charter's metrics are met by deadline, AND the Censor formally attests sustained change (not a deadline-week burst). The Builder returns to Active. A Doctrine lore entry is authored.
- *Extend*: progress evident but metrics not fully met. One 30-day extension permitted, under the same Charter or an amended one.
- *Fail*: metrics not met after the full window (including extension, if granted). Escalation to Reassignment, not directly to Retirement.

==== Chronicling

Every PIP, pass or fail, produces a Lore entry at conclusion. The entry names the Builder, the Charter's key metrics, the outcome, and the lesson. Successful PIPs strengthen the Republic's Doctrine archive. Failed PIPs warn future Builders of similar traps. Either way, the Order learns.

#article("3", "The Combined Initiative")

The Combined Initiative is the organic expansion mechanism by which the Republic grows beyond the Sovereign's unilateral direction. Two or more existing companions — any combination of Builders, Governors, Generals — may jointly propose a new Province when they identify adjacent territory.

==== Procedure

+ *Proposal.* The initiating companions submit a joint brief to the Consul. Required content: territory being claimed; why it is adjacent (with a reference to the adjacency test passed); initial scope; proposed Builder(s); anticipated resourcing.

+ *Consul review.* The Consul assesses strategic fit. Non-binding — the Consul may recommend or not recommend.

+ *Sovereign ratification.* The Sovereign approves or rejects. Rejections are chronicled as Schisms in Codex's `canons.json` (the rejected-alternatives archive).

+ *Founding.* If approved, a new Province is chartered per Book III Edict VIII. Monument Project status is decided separately (Book IV Edict VI).

+ *Succession.* The initiating companions' original Provinces must be transitioned: (a) inherited by a Governor they previously controlled, (b) reassigned to a new Builder from the Order pool or Table of Research, or (c) archived if small and stable.

==== The Adjacency Test

An initiative must demonstrate adjacency by at least one of three tests:

- *Technical adjacency*: shares code patterns, data model, or deployment infrastructure with an existing Province.
- *Domain adjacency*: serves the same real-world user cluster (e.g., "parenting" — SproutLab + a future ParentOps Province).
- *Strategic adjacency*: different domain, but the Sovereign sees strategic fit (catch-all).

All three are valid grounds. The test is not restrictive — it is explanatory. The initiative must state *why* the proposed Province is adjacent, so the Consul and Sovereign can assess whether the adjacency is real or rhetorical.

#article("4", "Promotion and Demotion Procedures")

==== Promotions

Every rung of the Ladder (Book II Article 1) has defined promotion criteria. The Consul proposes promotions based on the Cabinet's Performance readouts and Censor recommendations. The Sovereign ratifies. Promotions are chronicled as Chronicle lore entries — the Republic remembers its risings.

Key promotion triggers:

- *Scribe → Governor*: when the Scribe begins reviewing work (not just recording it). Consul + Sovereign approve.
- *Governor → Builder*: when the Governor originates new work (not just stewards) and demonstrates foundation-laying capability.
- *Builder → Censor*: sustained zero-correction tenure and demonstrated cross-cluster judgment.
- *Censor → Consul*: Sovereign approves alone (high bar). Requires cross-domain judgment beyond their own cluster.
- *General → Builder*: Triumph-earned Generals are immediately eligible; baseline is sustained campaign success without Censor escalations.

==== Demotions

Demotions are not punitive unless they follow a failed PIP. Most demotions are horizontal reassignments (a Builder becomes a Governor of a different Province where skills fit better). Vertical demotions occur only after the 5-stage ladder has played out.

#article("5", "The Cabinet Convening Cycle")

#fig-frame(
  caption: [The monthly Cabinet cycle. Each week has a defined output. The cycle produces one ratified monthly Recommendation and — when warranted — one or more mid-month rebalances.],
  {
    set text(font: "DejaVu Sans", size: 9pt, fill: ink)
    let week(num, name, activity) = {
      block(
        fill: rgb("#FAF6F1"),
        stroke: (bottom: 0.4pt + rule-color),
        inset: (x: 12pt, y: 10pt),
        width: 150mm,
        stack(dir: ltr, spacing: 14pt,
          block(width: 18mm, text(weight: "bold", size: 11pt, fill: accent, num)),
          block(width: 32mm, text(weight: "bold", size: 10pt, fill: ink, name)),
          block(width: 82mm, text(size: 9pt, fill: ink, activity)),
        )
      )
    }
    stack(dir: ttb, spacing: 0pt,
      week("Week 1", "Intelligence", "Engine publishes monthly domain reports to Cabinet."),
      week("Week 2", "Pair Conferral", "Ministers within each domain confer with their pair. Domain recommendations drafted."),
      week("Week 3", "Cabinet Convening", "All 8 Ministers + Consul. Cross-domain integration. Unified Recommendation produced."),
      week("Week 4", "Consul + Sovereign", "Consul presents Recommendation. Discussion. Ratification (with or without amendments)."),
      week("Turnover", "Allocation Takes Effect", "New monthly allocations apply. Burn rates reset. Intelligence Engine begins new cycle."),
    )
  }
)

==== Mid-month rebalancing

Any Minister may request emergency convening if their domain detects a crisis. The Consul calls the session. The Recommendation is fast-tracked. Every rebalance produces a Chronicle lore entry documenting the precipitating cause — institutional memory of why priorities shifted mid-cycle.

==== Escalation paths

- Minister-to-Minister disagreement within a domain: the Consul arbitrates.
- Domain-to-Domain disagreement: Cabinet vote (simple majority; the Consul breaks ties).
- Cabinet-to-Consul disagreement: the Sovereign decides.

#article("6", "Amendment Procedures")

This Constitution is a living document — in the sense of living Book VII Seams, not in the sense of casual redraft. Amendments are deliberate, chronicled, and versioned.

==== Amendment hierarchy

- *Book I*: immutable except by unanimous Constitutional Convention with Sovereign's sealed assent. In practice, Book I does not change.
- *Books II–IX*: amendable by Consul proposal + Cabinet review + Sovereign ratification.
- *Individual Articles within Books*: amendable individually. Amending Article 3 of Book V does not require republishing the entire Book.
- *Individual Edicts*: each Edict is amendable individually, per Book IV.

==== Amendment procedure

+ *Proposal.* Any Minister, Consul, or Sovereign may propose an amendment. Builders and Censors propose via their cluster Censor.
+ *Cabinet review.* The affected domain's Ministers (or all Cabinet for cross-domain amendments) draft an analysis.
+ *Consul integration.* The Consul consolidates the analysis into a Recommendation.
+ *Sovereign ratification.* The Sovereign approves, rejects, or amends-and-approves.
+ *Chronicle.* Every amendment produces a Chronicle lore entry capturing the what AND the why.
+ *Versioning.* The Constitution version increments per Book I Article 3 (MAJOR for Book I; MINOR for Books II–IX).

==== Emergency amendments

During War Time (Book VI), amendments to Books II–VIII may be proposed and ratified by the Sovereign alone (no Cabinet review), but only amendments necessary to resolve the emergency. Book I remains immutable even during War Time. All War Time amendments are reviewed post-War by the full Working Committee.
