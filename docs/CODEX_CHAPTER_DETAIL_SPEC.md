# CODEX — Chapter Detail View Spec
**Version:** Draft 1 · **Date:** 13 April 2026
**Scope:** Data model expansion + new view + backfill pipeline

---

## 1. Problem

Chapters are currently metadata stubs: name, status, one-line summary. Tapping a chapter opens an edit form. There's no way to read a chapter — no narrative, no linked context, no story arc. A reader can't understand what happened during a chapter without leaving Codex.

## 2. Vision

Tap a chapter → opens like a chapter in a book. Rich content: what was built, why, what decisions were made, what broke, how the world changed. Previous/next chapter navigation. Linked canons, sessions, TODOs. A new Aurelius instance (or future Rishabh) can read chapters in sequence and understand the full arc of a volume.

---

## 3. Data Model Changes

### Current chapter shape
```json
{
  "id": "caretickets",
  "name": "CareTickets",
  "status": "complete",
  "started": "2026-04-06",
  "completed": "2026-04-10",
  "ended": null,
  "summary": "Concern tracking with notification-driven follow-ups",
  "spec_url": "https://...",
  "_deleted": false,
  "_deleted_date": null
}
```

### Proposed additions
```json
{
  "...existing fields...",
  
  "content": "Long-form narrative markdown. The story of this chapter...",
  
  "sections": [
    {
      "heading": "What Was Built",
      "body": "CareTickets is a concern tracking system..."
    },
    {
      "heading": "Key Decisions",
      "body": "Notification architecture chose main-thread scheduling..."
    },
    {
      "heading": "What Broke",
      "body": "12 bugs found during QA, all fixed..."
    },
    {
      "heading": "State of the World After",
      "body": "SproutLab now has 7 intelligence domains..."
    }
  ],
  
  "linked_canons": ["canon-0045-notification-arch"],
  "linked_sessions": ["s-2026-04-06-01", "s-2026-04-07-01", "s-2026-04-10-01"],
  "order": 5
}
```

### Design questions for the session
- **`content` vs `sections`?** Single markdown blob gives flexibility. Structured sections give consistent rendering. Could support both: `sections` if present, else render `content` as markdown. Or just use `content` with `## headings` parsed client-side.
- **`linked_canons` / `linked_sessions`** — explicit links vs auto-derived? Auto-derived: canons created in sessions that touched this chapter. Explicit: manually curated. Could do both (auto + manual overrides).
- **`order` field** — chapters don't currently have an explicit sort order. They render in array order. Adding `order` enables prev/next navigation and intentional sequencing.
- **Storage budget** — long-form content adds significant size to volumes.json. A single chapter narrative could be 2-5KB. With 20 chapters across 5 volumes, that's 100-200KB added. Within localStorage limits but worth monitoring.

---

## 4. Chapter Detail View

### Route
`#/chapter/:volumeId/:chapterId` (new route, needs adding to parseRoute + viewRenderers)

### Layout (top to bottom)
```
┌─────────────────────────────┐
│ ← Volume Name    [Edit]    │  ← header with back to volume
├─────────────────────────────┤
│ Chapter Name                │  ← ff-heading, fs-xl
│ ● in-progress  Started 7d  │  ← status chip + dates
│ ago                         │
├─────────────────────────────┤
│ "One-line summary as        │  ← summary as subtitle/tagline
│  subtitle"                  │
├─────────────────────────────┤
│                             │
│ Section 1: What Was Built   │  ← cx-section-title
│ Long paragraph of narrative │  ← prose, fs-sm, line-height 1.6
│ content describing what     │
│ happened...                 │
│                             │
│ Section 2: Key Decisions    │
│ Content...                  │
│                             │
│ Section 3: What Broke       │
│ Content...                  │
│                             │
├─────────────────────────────┤
│ LINKED CANONS (3)           │  ← auto-derived + manual
│ ┌ canon card ─────────────┐ │
│ │ No text-overflow...     │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ SESSIONS (4)                │  ← sessions that touched this ch
│ ┌ session mini-card ──────┐ │
│ │ s-2026-04-06-01 · 180m  │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ TODOS (2 open)              │
│ ○ Fix ctStorageWarning...   │
├─────────────────────────────┤
│                             │
│  ← Phase 2       Phase 4 → │  ← prev/next chapter nav
│  Persistence     Polish     │
│                             │
├─────────────────────────────┤
│ [Edit] [Delete]             │  ← action bar
└─────────────────────────────┘
```

### Previous/Next Navigation
- Chapters sorted by `order` field (or array index if no order)
- Previous = chapter with lower order in same volume
- Next = chapter with higher order in same volume
- Show chapter name + status icon in nav buttons
- Null at boundaries (no prev for first, no next for last)

### Linked Entities (auto-derived)
```javascript
// Canons: find canons created during sessions that touched this chapter
function getLinkedCanons(volumeId, chapterId) {
  var sessionIds = [];
  store.journal.forEach(function(day) {
    (day.sessions || []).forEach(function(s) {
      if ((s.chapters_touched || []).indexOf(chapterId) !== -1) {
        sessionIds.push(s.id);
        // Also collect canon IDs from session decisions
      }
    });
  });
  // Plus canons explicitly linked via chapter.linked_canons
}

// Sessions: sessions where chapters_touched includes this chapter
function getLinkedSessions(chapterId) {
  var results = [];
  store.journal.forEach(function(day) {
    (day.sessions || []).forEach(function(s) {
      if ((s.chapters_touched || []).indexOf(chapterId) !== -1) {
        results.push({ date: day.date, session: s });
      }
    });
  });
  return results;
}

// TODOs: todos with chapter field matching this chapter
function getLinkedTodos(volumeId, chapterId) {
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  return (vol.todos || []).filter(function(t) { return t.chapter === chapterId; });
}
```

---

## 5. Chapter Edit Expansion

Current edit form: name, status, summary, started, spec_url.

Add:
- **Content textarea** — large (rows=12), placeholder "Tell the story of this chapter..."
- **Sections builder** — optional structured sections (heading + body pairs), add/remove
- **Order field** — number input for sequencing
- **Linked canons** — tag-style multi-select from existing canons

Or simpler: just add a `content` textarea to the existing form. Sections can be `## headings` in the content. Linked entities auto-derived. Order = array position (reorderable later).

---

## 6. Backfill Strategy

### Phase 1: Codex self-tracking
Write real chapter content for Codex's own chapters:
- Spec & Design Session
- Design Session  
- Phase 1 — Core Build
- Phase 2 — Persistence Layer
- Phase 3 — Content Views
- Phase 4 — Polish (this session)

Source material: handoff documents from each session, canon decisions, session logs already in Codex.

### Phase 2: Other volumes
Generate snippets for SproutLab, SEP Dashboard, SEP Invoicing chapters using session history from Claude conversations.

### Backfill format
Use Aurelius snippets with `chapter_updates` containing content patches:
```json
{
  "chapter_updates": [
    {
      "volume": "codex",
      "chapter": "phase-1-core-build",
      "patch": {
        "content": "## What Was Built\n\nPhase 1 delivered the foundation...",
        "order": 3
      }
    }
  ]
}
```

---

## 7. Scope Decisions Needed

1. **Content format:** Plain text vs markdown rendering? Markdown adds a parser dependency but enables headings, bold, links, code blocks.
2. **Sections vs flat content:** Structured sections array vs single content string with ## headings?
3. **Edit UX:** Single big textarea vs section-by-section editor?
4. **Auto-link fidelity:** How aggressively to auto-derive links? Just sessions, or also canons from session decisions?
5. **Chapter ordering:** Explicit `order` field vs array position vs chronological by `started` date?
6. **Build scope:** Chapter Detail view + edit expansion + backfill in one session, or split across two?

---

*This spec is a starting point for discussion. The session should resolve the design questions before building.*
