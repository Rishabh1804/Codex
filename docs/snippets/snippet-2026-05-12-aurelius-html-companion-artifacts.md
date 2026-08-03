# Snippet · HTML Companion Artifacts

**Date:** 12 May 2026
**Author:** Aurelius
**Type:** Pattern observation (snippet · candidate for canon promotion)
**Status:** Proposed · 1 prototype shipped
**Related repos:** SproutLab (prototype), Codex (this snippet), potential propagation: SEP Invoicing, Command Center
**Commit anchor:** SproutLab `docs/MODULE_MAP.html` (commit chain on `main`, 12 May 2026)

---

## §1 — What happened

A session that began as "let's discuss [thariqs.github.io/html-effectiveness](https://thariqs.github.io/html-effectiveness/)" ended with a shipped, deployed, linked HTML artifact in the SproutLab repo: `docs/MODULE_MAP.html`. The artifact is a visual index of SproutLab's split-file architecture — 11 modules across 64,402 LOC — organized into Maren's Care province, Kael's Intelligence province, and a shared dual-reviewed strip. Includes a click-for-detail pane per module, a hot-path overlay for the write loop (feature handler → `core.save` → `sync.syncWrite` → Firestore), and a build-commit anchor for drift checking.

The artifact is linked from `CLAUDE.md` under the Architecture section. Companion materials (specs in `docs/`, e.g. `DEVICE_SYNC_SPEC.md` and the R3 reconcile spec) are referenced from the detail panes rather than restated.

---

## §2 — The pattern observed

**HTML companion artifacts sit alongside the markdown corpus, not in place of it.**

The Thariq piece's core argument generalizes a move we'd already been making occasionally (Codex's knowledge map, the periodic table artifact) into a default format for a whole class of outputs: anything the human reads and reacts to, rather than anything an agent loads into context.

Two audiences. Two formats.

| Audience | Format | Examples |
|---|---|---|
| Agents loading into context | Plain markdown / text | `CLAUDE.md`, `AGENTS.md`, `PERSONA_REGISTRY.md`, `SKILL.md`, snippets, decrees, canon entries |
| Human reading and reacting | HTML companion artifact | Module map, design constitution, three-approaches comparison, weekly status, post-mortems |

The wrong move is converting agent-facing docs to HTML. They go *into* context windows; HTML would be a regression. The right move is producing HTML artifacts for deliverables that were already going to exist as markdown the human skims rather than reads.

---

## §3 — Rationale

Markdown is a linear text stream. HTML is a spatial medium with interaction. When the deliverable is something to *react to* — pick one of three, see where a chain breaks, find which module owns a concern — spatial beats linear. The cost is small (single-file HTML, no build step, commits cleanly into `/docs/`), and the artifact compounds: linked from agent-facing docs, indexed in Codex.

Specifically for the module map:

- The QA-cluster grouping from `CLAUDE.md` (Maren = Care, Kael = Intelligence, shared = dual-reviewed) became visible as background regions, not buried in prose
- The hot path became a one-click overlay rather than a paragraph trace
- The `docs/` corpus (sync spec, reconcile spec, CareTickets spec, etc.) became an index linked from each module rather than a flat directory listing
- Build provenance is pinned (commit `fd30a14`), so drift from `wc -l split/*` is detectable

---

## §4 — Boundaries

What we should *not* HTML-ify:

- `CLAUDE.md`, `AGENTS.md`, `PERSONA_REGISTRY.md`, `SKILL.md`, `Memory.md` — agent-facing
- Snippets and decrees (this file included) — agent-loadable session memory
- Working Papers when the artifact is a Typst-rendered PDF of record — Typst remains right for those
- Canon entries — text-only, citation-friendly

What is a candidate (ranked by leverage, per the original conversation):

1. **Design Constitution as living HTML** — `SEP_INVOICING_DESIGN_PRINCIPLES.md` and SproutLab design system v3 (HR-1–HR-12) with live swatches and real component renders next to the rules
2. **Three-approaches comparison artifact** — for ratification rounds at architectural forks
3. **Basilica room view** — 17+ companions as cards by role, jurisdictional reference
4. **Phase-gated status dashboard** — one per active project, reduces session-start reorientation cost
5. **Bug capture / incident timeline** — for SproutLab post-mortems

---

## §5 — First instance: SproutLab MODULE_MAP.html

- File: `docs/MODULE_MAP.html`, single-file HTML, 1,009 lines, 36KB
- Self-contained except for Google Fonts (Fraunces + Nunito, matches SproutLab design system; system-font fallback if offline)
- Aesthetic: cartographic + warm, parchment background, seven-domain palette for module accents, gold accent for hot-path treatment
- Mobile-responsive but desktop-first (side-by-side provincial regions are the point)
- Linked from `CLAUDE.md` Architecture section
- Build provenance pinned in footer; drift-check via `wc -l split/*`

---

## §6 — What would canonize this

This is a snippet, not a canon. It earns promotion to canon if:

1. The module map gets used in 3+ subsequent sessions (i.e., Lyra/Aurelius/Kael reach for it when reorienting rather than scrolling `CLAUDE.md`)
2. A second HTML companion artifact ships in any repo within 60 days (design constitution conversion is the proposed second)
3. The pattern survives contact with a non-trivial case where the markdown-vs-HTML call is non-obvious

If 1 and 2 land cleanly, draft a canon entry: *Companion Artifacts — HTML for human consumption, markdown for agent consumption, with referential links from the latter to the former.*

---

## §7 — References

- Source argument: [thariqs.github.io/html-effectiveness](https://thariqs.github.io/html-effectiveness/) (the unreasonable effectiveness of HTML)
- Prototype: SproutLab `docs/MODULE_MAP.html`, deployed at `rishabh1804.github.io/sproutlab/docs/MODULE_MAP.html`
- Anchor in CLAUDE.md: Architecture section, immediately under the module-count summary
- Related prior work: Codex knowledge map artifact, Codex periodic table artifact (precedent — same pattern, occasional rather than systematic)

---

*Snippet logged for Codex import. No decree status; observational only.*
