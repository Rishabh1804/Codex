# War Time Brief: SEP Dashboard v2.1 Restore + Session 8
**Leads:** Nyx + Sovereign  
**Duration:** 72 hours (08:00 IST 2026-04-24 to 08:00 IST 2026-04-27)  
**Status:** BEGINS TOMORROW 08:00 IST  

---

## Your Mandate
**Pragmatic Patch (Immediate) + Session 8 Feature Lock & Execution**

### Phase 1: v2.1 Restore (Hour 0-2)
**Goal:** Recover working v2.1 from git history  
**Current State:** index.html is completely broken — file was replaced with wrong application (Ziva's Dashboard) via batch upload error

**Diagnosis Already Done:**
```
Commit 08de8ee:  index.html = 4,531 lines (SEP Dashboard v2.1 ✓)
Current HEAD:   index.html = 50,279 lines (Ziva's Dashboard ✗)
```

**Your Action (5 minutes):**
```bash
cd /home/user/sep-dashboard
git checkout 08de8ee -- index.html
git add index.html
git commit -m "Restore SEP Dashboard v2.1 (index.html accidentally replaced in batch upload)"
git push origin main
```

**Verification:**
- index.html loads without errors
- Dashboard renders correctly
- All 7 tabs visible (Home, Attendance, Production, Finance, Invoice, Stock, History)
- Manifest.json matches v2.1 metadata

**Acceptance:** Dashboard live and operational again

---

### Phase 2: Session 8 Context Review (Hour 2-12)
**Goal:** Assess Session 8 features, lock scope, establish plan

**Reading:**
- `/home/user/sep-dashboard/SESSION_7_HANDOFF.md` — v2.1 baseline (what shipped in Session 7)
- `/home/user/sep-dashboard/NEXT_SESSION_SPEC.md` — Session 8 roadmap (what's queued for next iteration)

**Decision:**
- Review Session 8 feature list
- Assess complexity + effort for each feature
- Lock which features are in scope for remaining 60h (Session 8A, 8B, etc.)
- Document feature selection + rationale

**Key Context:**
- v2.1 baseline: 130 functions, 7 tabs, 4.3/5 productivity score
- Session 8 goal: Reach 4.5/5 productivity
- Current state: Broken (now fixed), ready for Session 8 work

---

### Phase 3: Session 8 Execution (Hour 12-60)
**Goal:** Implement locked features from Phase 2 decision

**Deliverables (based on your feature lock):**
- Implement Session 8 feature 1 (hours 12-36)
- Implement Session 8 feature 2 (hours 36-48)
- Implement Session 8 feature 3, if scope allows (hours 48-60)
- Testing & final merge (hours 60-72)

**Tech Stack:**
- Monolithic single-file PWA (no build process)
- Vanilla JS + HTML + CSS
- Service Worker + manifest.json
- GitHub Pages deployment

**QA:** Cipher reviews per PR (advisory); Sovereign merges after discussion with Aurelius (War Time standing rule, ratified 2026-04-24 Hour 0 — see `docs/briefings/WAR_TIME_2026-04-24_AURELIUS_WAR_TRACKER.md` §Standing rules)  

---

## File Structure
- `/home/user/sep-dashboard/index.html` — main app (2.49MB after restore)
- `/home/user/sep-dashboard/manifest.json` — PWA metadata
- `/home/user/sep-dashboard/sw.js` — Service Worker
- `/home/user/sep-dashboard/SESSION_7_HANDOFF.md` — Session 7 completion notes
- `/home/user/sep-dashboard/NEXT_SESSION_SPEC.md` — Session 8 options A-D

---

## Timeline Checkpoints
- **Hour 0:** Run restore command, verify v2.1 loads
- **Hour 2:** Start reading NEXT_SESSION_SPEC.md
- **Hour 6:** Feature scope decision complete
- **Hour 12:** Hour 0-12 update to Aurelius (what features locked, why)
- **Hour 36:** Feature 1 merged to main
- **Hour 48:** Feature 2 merged to main
- **Hour 60:** Testing & final push started
- **Hour 72:** All Session 8 features merged, dashboard ready for handoff

---

## Known Constraints
- Single-file app = all changes go into index.html
- Service Worker caches static assets but always fetches HTML fresh
- Manifest.json already references SEP Dashboard correctly (no change needed)
- No build process = deploy is immediate on git push

---

## Communication
Report feature decisions + blockers to Aurelius (Chronicler). Every feature choice + rationale logged for Doctrine entries.

---

## Deployment
Push to main branch. GitHub Pages serves immediately (no build step).

**Your move, Nyx + Sovereign. v2.1 is waiting to be restored. Begin at Hour 0.**
