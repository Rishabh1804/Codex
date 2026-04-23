# War Time Brief: SEP Invoicing UI + Margin Dashboard
**Leads:** Theron + Solara (co-leads)  
**Duration:** 72 hours (08:00 IST 2026-04-24 to 08:00 IST 2026-04-27)  
**Status:** BEGINS TOMORROW 08:00 IST  

---

## Your Mandate
**Two-Phase Feature Delivery:** UI Enhancements (Phase 1) → Margin Dashboard (Phase 2)

### Current State Assessment
- **Mature codebase:** 22-module split-file PWA (7,419 LOC)
- **13 features shipped:** Home, Create, IM, Scanner (Gemini Vision), Clients, Items, Register, Stats, Print, Settings, Exports
- **UI state:** Modern, clean — no staleness detected
- **Design system:** 381 CSS classes, 54 tokens, full dark mode, 9 color domains
- **Storage:** localStorage only (no cloud sync)
- **Testing:** No automated tests, manual QA process
- **Tech:** Vanilla JS + HTML + CSS, localStorage state mgmt, Termux-based build

---

## Phase 1: UI Enhancements (Hours 0-48)
**Goal:** Modernize UI with improved input fields, button interactivity, and chart animations

### Deliverables
1. **Input Field Styling Modernization**
   - Current: Functional but minimal
   - Goal: Modern border, focus ring, hover states
   - Scope: All form inputs across Create, IM Form, Clients, Items modules
   - Files: `/home/user/sep-invoicing/split/styles.css` (inv-* classes)

2. **Button Interactivity Enhancement**
   - Current: Opacity-based feedback
   - Goal: More engaging hover/active states
   - Scope: All action buttons (Create, Save, Delete, Export, Print)
   - Files: `styles.css` (button classes)

3. **Chart Animations**
   - Current: Static SVG charts (bar, line/area)
   - Goal: Add animation on data update, smooth transitions
   - Scope: Stats dashboard (bar charts for revenue/clients/items), Analytics tab
   - Files: `/home/user/sep-invoicing/split/stats.js` (472 LOC)

**Acceptance Criteria:**
- Input fields visually modern + responsive
- Buttons have clear hover/active feedback
- Charts animate smoothly on render/update
- No regressions in existing functionality
- All changes merged to main by hour 48

---

## Phase 2: Margin Dashboard (Hours 48-72)
**Goal:** Implement Phase IL-4 feature — cost/KG tracking + client profitability analysis

### Why This Feature?
- **Infrastructure already in place:** `S.defaultCostPerKg = 5.46` (state mgmt)
- **Design prepared:** Feature is fully spec'd in codebase (Memory.md + CLAUDE.md)
- **High-value:** Unlocks margin analysis + profitability insights
- **Phase sequence:** IL-4 is next logical phase after Phase 9 foundation

### Deliverables
1. **Cost/KG Tracking UI**
   - Cost per KG input field (settings or item master)
   - Cost tracking per invoice line item
   - Total cost calculation + margin per invoice
   - Files: `/home/user/sep-invoicing/split/settings.js` (152 LOC) for cost config
           `/home/user/sep-invoicing/split/items.js` (933 LOC) for item master updates
           `/home/user/sep-invoicing/split/invoice-ops.js` (912 LOC) for invoice calculations

2. **Client Profitability Dashboard**
   - Revenue per client (sum of invoices)
   - Cost per client (KG × cost × quantity)
   - Margin per client (revenue - cost)
   - Top/bottom performing clients by margin
   - Files: `/home/user/sep-invoicing/split/stats.js` (472 LOC) for analytics

3. **Integration with Existing Invoice Data**
   - Link item master to cost tracking
   - Calculate total cost on invoice save
   - Display margin in invoice detail view
   - Export cost/margin data to CSV

**Acceptance Criteria:**
- Cost/KG configured in settings
- Client profitability dashboard displays correctly
- Margins calculated accurately (revenue - cost)
- CSV export includes margin data
- All changes merged to main by hour 72

---

## Architecture Notes
- **Modular split architecture:** Changes in `split/` modules, concat via `build.sh`
- **State management:** All state in localStorage (S object in core.js)
- **Design system:** Use existing `inv-*` CSS classes + 54 tokens (no new styles)
- **No external APIs:** No new API calls (no Gemini, etc.)
- **gstRound() constraint:** All currency calculations use `Math.round(val * 100) / 100`

---

## Build & Deploy
```bash
cd /home/user/sep-invoicing/split
bash build.sh > ../sep-invoicing.html
cp ../sep-invoicing.html ../index.html
git add -A && git commit -m "UI enhancements + margin dashboard (IL-4)"
git push origin main
```

**Live site:** https://rishabh1804.github.io/sep-invoicing/

---

## QA Strategy
- Cipher reviews each merge (per-merge, no continuous cadence)
- Manual testing: Both UI changes (visual) + Margin Dashboard (calculations)
- Regression check: Existing features (Create, Register, Stats) unaffected
- Cross-browser: Chrome (Termux) + Desktop (if available)

---

## Timeline Checkpoints
- **Hour 0:** Review this brief, assess split/ module structure
- **Hour 6:** UI enhancements Phase 1 starts (inputs → buttons → charts)
- **Hour 12:** Hour 0-12 update to Aurelius (design decisions made)
- **Hour 24:** Input styling complete & tested
- **Hour 36:** Button interactivity complete, chart animations in progress
- **Hour 48:** Phase 1 merged to main, Phase 2 (margin dashboard) starts
- **Hour 48:** Hour 24-48 update to Aurelius (Phase 1 summary + Phase 2 plan)
- **Hour 60:** Margin dashboard foundation complete, integrations in progress
- **Hour 72:** All merged to main, ready for handoff

---

## Key Files Reference
- Build: `/home/user/sep-invoicing/split/build.sh`
- Styles: `/home/user/sep-invoicing/split/styles.css` (381 inv-* classes)
- State: `/home/user/sep-invoicing/split/core.js` (localStorage, gstRound)
- UI Modules: 
  - Create: `create.js` (303 LOC)
  - Invoice Ops: `invoice-ops.js` (912 LOC)
  - Stats: `stats.js` (472 LOC)
  - Items: `items.js` (933 LOC)
  - Settings: `settings.js` (152 LOC)

---

## Known Constraints
- **No automated tests:** Manual QA process required
- **Single build target:** index.html (monolithic)
- **localStorage-only:** No cloud sync, no backend
- **Design system locked:** 381 CSS classes, 54 tokens — don't add new styles
- **gstRound() for all currency:** Math.round(val * 100) / 100

---

## Communication
Report design decisions + blockers to Aurelius (Chronicler). Every UI pattern + feature decision logged for Doctrine entries.

---

## Deployment
Push to main branch. GitHub Pages serves via automatic build reference.

**Your move, Theron + Solara. UI first, margin dashboard second. Begin at Hour 0.**
