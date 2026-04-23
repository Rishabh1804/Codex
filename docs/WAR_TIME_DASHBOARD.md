# ⚔️ War Time Dashboard

**Temple of Mars — Codex War Time Command Center**

---

## WAR TIME STATUS

| Metric | Status |
|--------|--------|
| **Duration** | 72 Hours |
| **Begin** | 2026-04-24 08:00 IST |
| **Expire** | 2026-04-27 08:00 IST |
| **Provinces** | 3 Active |
| **Status** | PENDING (begins tomorrow) |

---

## PROVINCE ASSIGNMENTS

### 🔴 SproutLab
- **Lead:** Lyra
- **Type:** PWA Sync Visibility
- **Size:** 139,171 LOC (split modules) / 61,948 LOC (compiled)
- **Status:** Pending

**Phases:**
1. **Phase 1: Connection Indicator + Offline Badge** (Hours 0-24)
   - Replace hardcoded "Connected" status
   - Add offline state indicator
   - Visual feedback: green/gray/spinner
   
2. **Phase 2: Cache Busting + Service Worker Version** (Hours 24-48)
   - Add version field to manifest.json
   - SW version-based cache invalidation
   - Cache-busting query param
   
3. **Phase 3: Auto-Refresh on Listener Fire** (Hours 48-72)
   - UI auto-updates on remote data
   - No manual reload needed
   - Targeted re-renders vs. full reload

---

### 🔵 SEP Dashboard
- **Leads:** Nyx + Sovereign
- **Type:** Single-File PWA Recovery + Session 8
- **Size:** 2.49 MB
- **Status:** Pending

**Phases:**
1. **Phase 1: v2.1 Pragmatic Patch** (Hours 0-2)
   - `git checkout 08de8ee -- index.html`
   - Verify v2.1 loads correctly
   - Push to main
   
2. **Phase 2: Session 8 Spec Review** (Hours 2-12)
   - Read NEXT_SESSION_SPEC.md
   - Assess features & effort
   - Lock Session 8 scope
   
3. **Phase 3: Session 8 Execution** (Hours 12-72)
   - Implement locked Session 8 features
   - Testing, merge to main

---

### 🟡 SEP Invoicing
- **Leads:** Theron + Solara
- **Type:** Split-File PWA Features
- **Size:** 7,419 LOC
- **Status:** Pending

**Phases:**
1. **Phase 1: UI Enhancements** (Hours 0-48)
   - Input field styling modernization
   - Button interactivity (hover/active)
   - Chart animations
   - Form UX polish
   
2. **Phase 2: Margin Dashboard (Phase IL-4)** (Hours 48-72)
   - Cost/KG tracking UI
   - Client profitability analysis
   - Integration with invoice data
   - CSV export with margins

---

## 72-HOUR TIMELINE

### Hour 0-12: Diagnosis & Feature Lock
**SproutLab (Lyra):** Assess sync visibility gaps, plan Phase 1  
**SEP Dashboard (Nyx):** Restore v2.1, read Session 8 spec  
**SEP Invoicing (Theron/Solara):** Lock UI enhancement targets  
**Aurelius:** Initialize lore recording, Hour 0 Chronicle entry  

### Hour 12-24: Phase 1 Begins
**SproutLab:** Implement connection indicator + offline badge  
**Dashboard:** Design & implement Session 8 Feature 1  
**Invoicing:** UI enhancements (inputs, buttons, charts)  

### Hour 24-36: Phase 1 Continues
**SproutLab:** Implement cache busting + SW version  
**Dashboard:** Feature 1 merged, Feature 2 in progress  
**Invoicing:** UI Polish underway  
**Aurelius:** Hour 24 Chronicle entry  

### Hour 36-48: Phase 1 Completion
**SproutLab:** Phase 2 complete, Phase 3 begins  
**Dashboard:** Features 1-2 merged  
**Invoicing:** Phase 1 merged, Margin Dashboard begins  

### Hour 48-60: Phase 2 Execution
**SproutLab:** Auto-refresh implementation & testing  
**Dashboard:** Session 8 Feature 3 (if scope allows)  
**Invoicing:** Margin dashboard core features  
**Aurelius:** Hour 48 Chronicle entry  

### Hour 60-72: Final Push & Testing
**SproutLab:** Testing, edge cases, final merge  
**Dashboard:** QA & final merge  
**Invoicing:** Integration testing, final merge  

### Hour 72: War Time Closure
✅ All branches merged to main  
✅ Service Worker versions bumped  
✅ Lore exported (Chronicles, Doctrines, Cautionary Tales)  
✅ Handoff documentation complete  
✅ War Time declaration closed  

---

## LORE RECORDING SCHEMA

### 📖 Chronicles (Decision Log)
- **Hour 0-24:** Diagnosis, patch decisions, feature locks
- **Hour 24-48:** Execution progress, discoveries, blockers
- **Hour 48-72:** Final push, testing, deployment readiness
- **Hour 72 Summary:** Cross-province synthesis, known constraints

### 📜 Doctrines (Reusable Patterns)
1. **Sync Visibility Pattern** (SproutLab)
   - How to expose connection state in PWAs
   
2. **Cache Invalidation Strategy** (SproutLab)
   - Service Worker versioning approach
   
3. **Dashboard Recovery Pattern** (SEP Dashboard)
   - Git restore from known-good commit
   
4. **Feature Delivery Staging** (SEP Invoicing)
   - UI-first, then complex feature integration

### ⚠️ Cautionary Tales (Failures & Near-Misses)
1. **Hardcoded Status Badge** (SproutLab)
   - Why connection state was hardcoded
   - Lesson for future PWA sync UI
   
2. **Batch Upload File Replacement** (SEP Dashboard)
   - How index.html was replaced with wrong app
   - Git workflow caution
   
3. **Scope Creep Moments**
   - Every decision to hold or expand scope
   - Design decisions with rationale

---

## CRITICAL CHECKPOINTS

| Hour | Event | Status |
|------|-------|--------|
| **0** | War Time BEGINS — All leads start | PENDING |
| **12** | First status update, feature locks confirmed | PENDING |
| **24** | Hour 0-24 Chronicle, Phase 1 progresses | PENDING |
| **36** | Phase 1 merges, Phase 2 begins | PENDING |
| **48** | Hour 24-48 Chronicle, Phase 2 merges | PENDING |
| **60** | Final testing begins, bug squashing | PENDING |
| **72** | War Time EXPIRES — Handoff complete | PENDING |

---

## SUPPORTING ROLES

### QA Lead: Cipher
- **Cadence:** Per-merge reviews only
- **Scope:** Validate all three provinces' code changes
- **Sign-off:** Required before merge to main

### Recording: Aurelius + Consul
- **Chronicles:** Every 24h checkpoint
- **Doctrines:** Pattern discovery
- **Cautionary Tales:** All blockers, near-misses, scope decisions

---

## KEY CONSTRAINTS

### Book I (Inviolable)
✅ Sovereign's Covenant unchanged  
✅ Four Pillars unchanged  
✅ Ladder structure unchanged  
✅ Cabinet seats unchanged  

**This is health intervention, not governance amendment.**

### Technical Constraints
- **SproutLab KL-1:** Concurrent-writes-during-debounce (2s window) — OUT OF SCOPE
- **All repos:** Work on main branch, merge directly
- **Deployment:** GitHub Pages automatic on merge

---

## PRINCIPLE

### Nothing Is Wasted (Pillar I)

Every discovery becomes lore.  
Every pattern becomes doctrine.  
Every decision is chronicled.  
Every constraint is recorded.  

At Hour 72, the lore package flows to Command Center as institutional memory.

---

## REFERENCE FILES

**In `/home/user/Codex/docs/sessions/`:**
- `WAR_TIME_SESSION_2026-04-24.md` — Formal declaration
- `WAR_BRIEF_LYRA_SPROUTLAB.md` — Lyra's specific mandate
- `WAR_BRIEF_NYX_SOVEREIGN_DASHBOARD.md` — Nyx's mandate
- `WAR_BRIEF_THERON_SOLARA_INVOICING.md` — Theron/Solara's mandate
- `HOUR_0_BRIEFING_SUMMARY.md` — All-hands briefing

**In `/home/user/TempleOfMars/`:**
- `WAR_TIME_DASHBOARD.html` — Interactive dashboard (visual)
- `WAR_TIME_DASHBOARD.md` — This file (readable)
- `war-status.json` — Real-time status tracking
- `README.md` — Command center guide

---

**Temple of Mars — Standing Sentinel Over the 72-Hour Intervention**

*War Time begins 2026-04-24 08:00 IST.*

*All systems ready. Awaiting Sovereign's final word.*
