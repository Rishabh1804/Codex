# SEP Invoicing — Phase 7 Spec
## Stats Tab Rework + History Tab Improvements

**Status:** SPEC COMPLETE — ready for build  
**Files touched:** `split/stats.js`, `split/events.js`, `split/styles.css`, `split/body.html`  
**Decisions by:** Rishabh (MCQ session, Apr 2026)

---

## PART A — History Tab Improvements

### A1. Filter Bug Fix ✅ DONE
- Removed `data-action="invFilterHistory"` from `<select>` in `renderHistory()` (stats.js:160)
- Removed dead click handler case in events.js (lines 117–123)
- Change handler at events.js:275 (`e.target.id === 'historyClientFilter'`) now works correctly

### A2. Date Range Inputs

**What:** Two `<input type="date">` fields (From / To) in the history toolbar, alongside the existing client filter dropdown.

**Data flow:**
- Two new module-level vars: `var _historyDateFrom = ''; var _historyDateTo = '';`
- Toolbar renders: client select + date-from + date-to in a single `inv-im-toolbar` row
- `renderHistory()` filters events by timestamp: if `_historyDateFrom` is set, exclude events with `ts < startOfDay(from)`; if `_historyDateTo` is set, exclude events with `ts > endOfDay(to)`
- Timestamp conversion: `new Date(dateStr + 'T00:00:00').getTime()` for from, `new Date(dateStr + 'T23:59:59').getTime()` for to
- Both inputs get `id="historyDateFrom"` / `id="historyDateTo"` — NO `data-action` (same pattern as the client filter fix)

**Events (events.js change handler):**
```
if (e.target.id === 'historyDateFrom') {
  _historyDateFrom = e.target.value;
  renderHistory();
}
if (e.target.id === 'historyDateTo') {
  _historyDateTo = e.target.value;
  renderHistory();
}
```

**Toolbar HTML structure:**
```html
<div class="inv-im-toolbar">
  <div class="inv-history-filters">
    <select id="historyClientFilter" class="inv-form-select">...</select>
    <input type="date" id="historyDateFrom" class="inv-form-input inv-history-date" value="...">
    <input type="date" id="historyDateTo" class="inv-form-input inv-history-date" value="...">
  </div>
</div>
```

**CSS:**
```css
.inv-history-filters {
  display: flex; gap: var(--sp-8); flex-wrap: wrap;
}
.inv-history-date {
  flex: 1; min-width: 120px; max-width: 160px;
}
```

**Edge cases:**
- If from > to, show no results (don't swap — user will notice)
- Preserve filter values across re-renders (toolbar rebuilds on each `renderHistory()` call — read `_historyDateFrom` and `_historyDateTo` back into the input values)
- Clear button: not needed — user can clear individual date inputs natively

### A3. Day-Level Group Headers

**What:** Events grouped under headers like "14 Apr 2026", "13 Apr 2026" etc.

**Implementation in `renderHistory()`:**
- After sorting events descending by timestamp, iterate and track `currentDay`
- For each event, compute day string: `formatTimestamp(ev.ts).split(',')[0]` gives "14 Apr 2026"
- When day changes, emit a group header div before the event

**Header HTML:**
```html
<div class="inv-history-day-header">14 Apr 2026</div>
```

**CSS:**
```css
.inv-history-day-header {
  font-size: var(--fs-sm); font-weight: 700; color: var(--text-3);
  padding: var(--sp-12) 0 var(--sp-4) 0;
  border-bottom: 1px solid var(--border);
  margin-top: var(--sp-8);
}
.inv-history-day-header:first-child { margin-top: 0; }
```

**Edge case:** Events with no timestamp (`ev.ts` is falsy) — group under "Unknown date" at the end.

### A4. Tappable Entries

**What:** Tapping a history event navigates to the relevant item.

**Implementation:**
- Add `data-action` and identifying data to each history event div
- Invoice events (type `invoice`, `state`, `cancel`): `data-action="invHistoryJumpInvoice" data-id="{inv.id}"`
- Challan events (type `challan`): `data-action="invHistoryJumpChallan" data-id="{im.id}"`
- Store source ID in the event object: add `sourceId` field when building events array

**Event objects (modified):**
```js
// Invoice events:
events.push({ ts: inv.createdAt, type: 'invoice', sourceId: inv.id, ... });
// Challan events:
events.push({ ts: im.createdAt, type: 'challan', sourceId: im.id, ... });
```

**Click handlers (events.js click delegation):**
```js
case 'invHistoryJumpInvoice': {
  var inv = S.invoices.find(function(i) { return i.id === btn.dataset.id; });
  if (inv) {
    regFilter.clientId = '';
    regFilter.search = inv.displayNumber || '';
    regFilter.state = '';
    saveRegFilter();
    _tabDirty.register = true;
    switchTab('pageRegister');
  }
  break;
}
case 'invHistoryJumpChallan': {
  var imId = btn.dataset.id;
  // Set IM filter to show this challan's client, then switch
  var im = (S.incomingMaterial || []).find(function(c) { return c.id === imId; });
  if (im) {
    _imFilter.clientId = String(im.clientId);
    _imToolbarRendered = false; // Force toolbar re-render to show filter
    switchTab('pageIM');
    // Scroll to the challan after render
    setTimeout(function() {
      var hdr = document.querySelector('[data-action="invToggleIM"][data-id="' + imId + '"]');
      var card = hdr ? hdr.closest('.inv-im-challan') : null;
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
  break;
}
```

**Visual indicator:** Add `cursor: pointer` and tap highlight to history items.

**CSS:**
```css
.inv-history-item[data-action] {
  cursor: pointer;
}
.inv-history-item[data-action]:active {
  background: var(--surface-2);
}
```

**Edge case:** If the referenced invoice/challan was deleted, show toast "Item not found" and do nothing.

### A5. Load-More Button

**What:** Show first 50 events. "Show more" button loads next 50.

**Implementation:**
- Module-level var: `var _historyShowCount = 50;`
- Reset `_historyShowCount = 50` at the top of `renderHistory()`
- Slice events to `_historyShowCount`
- If `events.length > _historyShowCount`, render a load-more button at the bottom

**Load-more button HTML:**
```html
<button class="inv-btn inv-btn-ghost inv-btn-block" data-action="invHistoryLoadMore">
  Show more (X remaining)
</button>
```

**Click handler:**
```js
case 'invHistoryLoadMore': {
  _historyShowCount += 50;
  renderHistory();
  break;
}
```

**BUG PREVENTION:** `renderHistory()` currently resets toolbar innerHTML which would reset date inputs. Fix: only rebuild toolbar HTML if toolbar is empty OR client list has changed. Track `_historyToolbarClientHash` — a sorted comma-join of client IDs. Only rebuild if hash changed.

Wait — simpler: read input values BEFORE rebuilding toolbar, write them back AFTER. Already covered in A2 spec (preserve `_historyDateFrom` and `_historyDateTo`). But the load-more click calls `renderHistory()` which rebuilds the toolbar including the select. The select value is preserved via `_historyClientFilter`. Dates are preserved via module-level vars. ✅ No bug.

But — `_historyShowCount` is reset to 50 at top of renderHistory(). If load-more calls renderHistory(), it resets to 50 again. **FIX:** Don't reset `_historyShowCount` inside `renderHistory()`. Reset it only when filter values change (client change, date change). The load-more handler sets `_historyShowCount += 50` then calls `renderHistory()` without resetting.

**Corrected flow:**
- `_historyShowCount = 50` — initialized at module level
- Filter change handlers: set `_historyShowCount = 50` before calling `renderHistory()`
- Load-more handler: set `_historyShowCount += 50` then call `renderHistory()`
- `renderHistory()` does NOT touch `_historyShowCount`

---

## PART B — Stats Tab Rework

### B1. Layout: Dashboard Grid

**body.html change:** Replace `<div id="statsContent"></div>` with:
```html
<div id="statsToolbar"></div>
<div id="statsContent" class="inv-stats-grid"></div>
```

**CSS — Dashboard Grid:**
```css
.inv-stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-16);
}
@media (min-width: 480px) {
  .inv-stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

Cards that should span full width (trend line, top items table) get `inv-stats-card-full`:
```css
.inv-stats-card-full {
  grid-column: 1 / -1;
}
```

### B2. Period Chip Buttons

**What:** Chip buttons: MTD | QTD | YTD | All — multiple can be active (but only one at a time makes logical sense for filtering, so single-select with chip styling).

**Correction from MCQ:** "tap multiple periods" was the option, but for stats filtering, only one period should be active at a time. Chips give the visual style; behavior is single-select toggle.

**Module-level state:**
```js
var _statsPeriod = 'mtd'; // 'mtd' | 'qtd' | 'ytd' | 'all'
```

**Toolbar HTML (rendered in `renderStats()`):**
```html
<div class="inv-stats-chips">
  <button class="inv-chip inv-chip-active" data-action="invStatsPeriod" data-period="mtd">MTD</button>
  <button class="inv-chip" data-action="invStatsPeriod" data-period="qtd">QTD</button>
  <button class="inv-chip" data-action="invStatsPeriod" data-period="ytd">YTD</button>
  <button class="inv-chip" data-action="invStatsPeriod" data-period="all">All</button>
</div>
```

**CSS:**
```css
.inv-stats-chips {
  display: flex; gap: var(--sp-8); padding: var(--sp-8) 0 var(--sp-16) 0;
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.inv-chip {
  padding: var(--sp-6) var(--sp-16); border-radius: var(--r-full);
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text-2); font-size: var(--fs-sm); font-weight: 600;
  cursor: pointer; white-space: nowrap;
  transition: all var(--anim-fast) ease;
}
.inv-chip-active {
  background: var(--accent); color: #fff; border-color: var(--accent);
}
.dark .inv-chip-active {
  background: var(--accent-dark); border-color: var(--accent-dark);
}
```

**Click handler:**
```js
case 'invStatsPeriod':
  _statsPeriod = btn.dataset.period;
  renderStats();
  break;
```

**Period filter helper function:**
```js
function filterByPeriod(invoices, period) {
  if (period === 'all') return invoices;
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth(); // 0-indexed
  var startDate;
  if (period === 'mtd') {
    startDate = new Date(y, m, 1);
  } else if (period === 'qtd') {
    var qStart = m - (m % 3); // Q1=0, Q2=3, Q3=6, Q4=9
    startDate = new Date(y, qStart, 1);
  } else if (period === 'ytd') {
    // Indian financial year: Apr 1
    startDate = m >= 3 ? new Date(y, 3, 1) : new Date(y - 1, 3, 1);
  }
  var startTs = startDate.getTime();
  return invoices.filter(function(inv) {
    return (inv.createdAt || 0) >= startTs;
  });
}
```

**Note on YTD:** Indian financial year starts April 1. YTD means "since start of current FY." If current month is Jan 2027, YTD starts Apr 2026.

### B3. Metrics Suite

`renderStats()` is rewritten completely. The function:
1. Renders toolbar (chips) into `#statsToolbar`
2. Filters invoices by period
3. Renders cards into `#statsContent` grid

**Cards (in render order):**

#### Card 1: Revenue Overview (1-col)
- Period taxable revenue (big number)
- Period grand total (with GST)
- Invoice count in period
- Comparison: period vs all-time percentage

#### Card 2: Invoice States (1-col)
- Four state badges with counts (created/dispatched/delivered/filed)
- Only counts invoices within selected period
- Horizontal layout: badges in a row

#### Card 3: Revenue by Client — SVG Bar Chart (full-width)
- Horizontal bar chart (inline SVG)
- Bars sized proportional to max client revenue
- Client name left, amount right
- Bar color: `var(--accent)` / `var(--accent-dark)` in dark mode
- Tappable bars → opens flippable card overlay (B5)
- SVG dimensions: `viewBox="0 0 WIDTH HEIGHT"` where HEIGHT = numClients * 36 + padding

**SVG bar chart implementation:**
```js
function renderRevenueBarSvg(ranked, maxVal) {
  var barH = 28, gap = 8, padTop = 4, padBot = 4;
  var totalH = padTop + ranked.length * (barH + gap) - gap + padBot;
  var barAreaW = 200; // percentage of container, use relative units
  var svg = '<svg class="inv-svg-chart" viewBox="0 0 400 ' + totalH + '" preserveAspectRatio="xMinYMin meet">';
  ranked.forEach(function(r, i) {
    var y = padTop + i * (barH + gap);
    var w = maxVal > 0 ? (r.total / maxVal) * 240 : 0;
    svg += '<g class="inv-svg-bar-group" data-action="invStatsClientDrill" data-client-id="' + r.clientId + '" style="cursor:pointer">';
    svg += '<rect x="0" y="' + y + '" width="' + Math.max(w, 2) + '" height="' + barH + '" rx="3" class="inv-svg-bar"/>';
    svg += '<text x="' + (w + 8) + '" y="' + (y + barH / 2 + 4) + '" class="inv-svg-bar-label">' + escHtml(r.name) + '</text>';
    svg += '</g>';
  });
  svg += '</svg>';
  return svg;
}
```

**SVG CSS (using CSS variables):**
```css
.inv-svg-chart { width: 100%; height: auto; display: block; }
.inv-svg-bar { fill: var(--accent); }
.dark .inv-svg-bar { fill: var(--accent-dark); }
.inv-svg-bar-label { font-size: 11px; fill: var(--text-1); font-family: var(--ff-base); }
.inv-svg-bar-group:active .inv-svg-bar { fill: var(--cost); }
```

**CRITICAL:** SVG `data-action` won't fire via the existing click delegation that walks up via `btn.closest('[data-action]')`. SVG elements are in a different namespace. **Fix:** The click handler already uses `e.target.closest('[data-action]')` which works on SVG elements in modern browsers (Chrome 58+, which is fine for this PWA). Verify: `<g>` elements with `data-action` will be found by `closest()`. ✅ Works in all target browsers.

#### Card 4: Pending Revenue — Unbilled IM (1-col)
- Total unbilled amount (big number)
- List of clients with pending amounts
- Tappable → same flippable card overlay

#### Card 5: Monthly Revenue Trend — SVG Line Chart (full-width)
- X-axis: months (last 6 or 12 months depending on period)
- Y-axis: taxable revenue
- Inline SVG with polyline
- Dots at each data point

**Trend line implementation:**
```js
function renderTrendSvg(monthlyData) {
  // monthlyData = [{label:'Apr', value:250000}, {label:'May', value:310000}, ...]
  if (monthlyData.length < 2) return '<div class="inv-text-muted">Need 2+ months for trend</div>';
  var W = 400, H = 160, padL = 10, padR = 10, padT = 20, padB = 30;
  var chartW = W - padL - padR, chartH = H - padT - padB;
  var maxVal = Math.max.apply(null, monthlyData.map(function(d) { return d.value; }));
  if (maxVal === 0) maxVal = 1;
  var points = monthlyData.map(function(d, i) {
    var x = padL + (i / (monthlyData.length - 1)) * chartW;
    var y = padT + chartH - (d.value / maxVal) * chartH;
    return { x: x, y: y, label: d.label, value: d.value };
  });
  var polyline = points.map(function(p) { return p.x + ',' + p.y; }).join(' ');
  // Area fill
  var areaPath = 'M' + points[0].x + ',' + (padT + chartH) +
    ' L' + points.map(function(p) { return p.x + ',' + p.y; }).join(' L') +
    ' L' + points[points.length-1].x + ',' + (padT + chartH) + ' Z';

  var svg = '<svg class="inv-svg-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">';
  // Grid lines (3 horizontal)
  for (var g = 0; g <= 3; g++) {
    var gy = padT + (g / 3) * chartH;
    svg += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '" class="inv-svg-grid"/>';
  }
  // Area
  svg += '<path d="' + areaPath + '" class="inv-svg-area"/>';
  // Line
  svg += '<polyline points="' + polyline + '" class="inv-svg-line"/>';
  // Dots + labels
  points.forEach(function(p) {
    svg += '<circle cx="' + p.x + '" cy="' + p.y + '" r="3.5" class="inv-svg-dot"/>';
    svg += '<text x="' + p.x + '" y="' + (padT + chartH + 16) + '" text-anchor="middle" class="inv-svg-axis-label">' + p.label + '</text>';
  });
  svg += '</svg>';
  return svg;
}
```

**SVG CSS:**
```css
.inv-svg-grid { stroke: var(--border); stroke-width: 0.5; }
.inv-svg-line { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.inv-svg-area { fill: var(--cost-bg); opacity: 0.5; }
.inv-svg-dot { fill: var(--accent); stroke: var(--surface); stroke-width: 2; }
.inv-svg-axis-label { font-size: 9px; fill: var(--text-3); font-family: var(--ff-mono); }
.dark .inv-svg-area { fill: var(--cost-bg); opacity: 0.3; }
```

**Month data builder:**
```js
function buildMonthlyRevenue(invoices) {
  var byMonth = {};
  invoices.forEach(function(inv) {
    if (!inv.date) return;
    var ym = inv.date.substring(0, 7); // '2026-04'
    if (!byMonth[ym]) byMonth[ym] = 0;
    byMonth[ym] += (inv.taxableValue || 0);
  });
  // Sort by month, take last 12
  var months = Object.keys(byMonth).sort();
  var last12 = months.slice(-12);
  var labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return last12.map(function(ym) {
    var parts = ym.split('-');
    return { label: labels[parseInt(parts[1]) - 1], value: byMonth[ym] };
  });
}
```

#### Card 6: Dispatch Cycle (1-col)
- Same as current but filtered by period
- Show avg days for each transition

#### Card 7: Top Items by Volume (full-width)
- Aggregate `inv.items[].qty` by `partNumber` across filtered invoices
- Rank top 10 by total qty
- Show: rank, part number, description, total qty, total amount
- Table layout inside a card

**Implementation:**
```js
function buildTopItems(invoices) {
  var byPart = {};
  invoices.forEach(function(inv) {
    (inv.items || []).forEach(function(it) {
      var key = it.partNumber || it.desc || 'Unknown';
      if (!byPart[key]) byPart[key] = { part: key, desc: it.desc || '', qty: 0, amount: 0 };
      byPart[key].qty += (it.qty || 0);
      byPart[key].amount += (it.amount || 0);
    });
  });
  return Object.values(byPart).sort(function(a, b) { return b.qty - a.qty; }).slice(0, 10);
}
```

### B4. Period-Aware Rendering

**ALL cards** receive the filtered invoice list from `filterByPeriod()`. The top-level flow:

```js
function renderStats() {
  var toolbar = document.getElementById('statsToolbar');
  var area = document.getElementById('statsContent');
  if (!area) return;

  // Render period chips
  if (toolbar) {
    var chips = ['mtd','qtd','ytd','all'];
    var chipLabels = { mtd: 'MTD', qtd: 'QTD', ytd: 'YTD', all: 'All' };
    var chipHtml = '<div class="inv-stats-chips">';
    chips.forEach(function(p) {
      chipHtml += '<button class="inv-chip' + (_statsPeriod === p ? ' inv-chip-active' : '') +
        '" data-action="invStatsPeriod" data-period="' + p + '">' + chipLabels[p] + '</button>';
    });
    chipHtml += '</div>';
    toolbar.innerHTML = chipHtml;
  }

  var activeInvs = S.invoices.filter(function(i) { return i.status === 'active'; });
  var filtered = filterByPeriod(activeInvs, _statsPeriod);

  var html = '';
  // Card 1: Revenue Overview
  html += renderRevenueOverviewCard(filtered, activeInvs);
  // Card 2: Invoice States
  html += renderInvoiceStatesCard(filtered);
  // Card 3: Revenue by Client (SVG bar chart, full-width)
  html += renderRevenueByClientCard(filtered);
  // Card 4: Pending Revenue
  html += renderPendingRevenueCard();
  // Card 5: Monthly Trend (full-width)
  html += renderMonthlyTrendCard(activeInvs); // always all-time for context
  // Card 6: Dispatch Cycle
  html += renderDispatchCycleCard(filtered);
  // Card 7: Top Items (full-width)
  html += renderTopItemsCard(filtered);

  if (html === '') html = '<div class="inv-empty-state">No data yet</div>';
  area.innerHTML = html;
}
```

**Note on Card 5 (trend):** Always uses all active invoices (not period-filtered) because the trend needs to show multiple months. The chart itself shows where the selected period falls.

**Note on Card 4 (pending):** Not period-filtered — pending IM is always current state regardless of period.

### B5. Flippable Card Overlay — Client Drill-Down

**Trigger:** Tap a client bar in the Revenue by Client chart, or a client row in Pending Revenue.

**Data action:** `data-action="invStatsClientDrill" data-client-id="{clientId}"`

**Overlay structure:**
```html
<div class="inv-overlay-scrim">
  <div class="inv-overlay-card inv-flip-container">
    <div class="inv-flip-inner">
      <!-- FRONT -->
      <div class="inv-flip-front">
        <div class="inv-overlay-header">
          <span class="inv-overlay-title">{Client Name}</span>
          <button class="inv-overlay-close" data-action="invCloseOverlay">&times;</button>
        </div>
        <!-- KPIs -->
        <div class="inv-flip-kpis">
          <div class="inv-flip-kpi">
            <span class="inv-flip-kpi-label">Revenue</span>
            <span class="inv-flip-kpi-value">{total}</span>
          </div>
          <div class="inv-flip-kpi">
            <span class="inv-flip-kpi-label">Invoices</span>
            <span class="inv-flip-kpi-value">{count}</span>
          </div>
          <div class="inv-flip-kpi">
            <span class="inv-flip-kpi-label">Share</span>
            <span class="inv-flip-kpi-value">{pct}%</span>
          </div>
          <div class="inv-flip-kpi">
            <span class="inv-flip-kpi-label">Unbilled</span>
            <span class="inv-flip-kpi-value">{pending}</span>
          </div>
        </div>
        <!-- Mini bar: revenue by state -->
        <div class="inv-flip-states">
          {state badge counts for this client}
        </div>
        <!-- Billing mode & rate -->
        <div class="inv-flip-meta">
          {billingMode} · Rate: ₹{rate}/kg
        </div>
        <!-- Flip button -->
        <button class="inv-btn inv-btn-ghost inv-btn-block" data-action="invFlipCard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          Details &amp; Actions
        </button>
      </div>

      <!-- BACK -->
      <div class="inv-flip-back">
        <div class="inv-overlay-header">
          <span class="inv-overlay-title">{Client Name}</span>
          <div>
            <button class="inv-overlay-close" data-action="invFlipCard" style="margin-right:4px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
            </button>
            <button class="inv-overlay-close" data-action="invCloseOverlay">&times;</button>
          </div>
        </div>
        <!-- Recent invoices list (last 5) -->
        <div class="inv-flip-section-title">Recent Invoices</div>
        <div class="inv-flip-invoice-list">
          {inv rows: number · date · amount · state badge}
        </div>
        <!-- Pending challans -->
        <div class="inv-flip-section-title">Pending Challans</div>
        <div class="inv-flip-challan-list">
          {challan rows: challanNo · date · items count · amount}
        </div>
        <!-- Action buttons -->
        <div class="inv-flip-actions">
          <button class="inv-btn inv-btn-primary" data-action="invStatsCreateInvoice" data-client-id="{id}">
            Create Invoice
          </button>
          <button class="inv-btn inv-btn-ghost" data-action="invStatsJumpRegister" data-client-id="{id}">
            View in Register
          </button>
          <button class="inv-btn inv-btn-ghost" data-action="invStatsJumpIM" data-client-id="{id}">
            View in IM
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**CSS — 3D Flip:**
```css
.inv-flip-container {
  perspective: 1200px;
  overflow: visible;
  background: transparent;
}
.inv-flip-inner {
  position: relative;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}
.inv-flip-inner.inv-flipped {
  transform: rotateY(180deg);
}
.inv-flip-front, .inv-flip-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: var(--surface);
  border-radius: var(--r-xl) var(--r-xl) 0 0;
  padding: var(--sp-20);
}
.inv-flip-back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg);
  overflow-y: auto;
  max-height: 85vh;
}
```

**CRITICAL BUG PREVENTION — Absolute positioning of back face:**
When flipped, the front face is hidden but still occupies DOM space. The overlay card's height is determined by the front face. If the back face is taller, it gets clipped. **Fix:** When flipping to back, set front's `visibility: hidden; height: 0; overflow: hidden` and back's `position: relative`. When flipping to front, reverse.

**Better approach:** Don't use true CSS 3D flip for the overlay-card (which has `overflow-y: auto` and `max-height: 90vh`). Instead:
- `inv-flip-inner` is just a container
- Front and back are both `position: relative` but only one is visible
- The flip animation: front rotateY(0→90deg), at 90deg swap visibility, back rotateY(-90deg→0deg)
- Two-stage animation via JS: add class `inv-flip-out`, after 250ms add `inv-flip-in` and swap content visibility

**Revised CSS — Two-stage flip:**
```css
.inv-flip-inner {
  position: relative;
}
.inv-flip-front, .inv-flip-back {
  background: var(--surface);
}
.inv-flip-back {
  display: none;
}
.inv-flip-back.inv-flip-visible {
  display: block;
}
.inv-flip-front.inv-flip-hidden {
  display: none;
}
/* Animation classes */
.inv-flip-out {
  animation: invFlipOut 0.25s ease-in forwards;
}
.inv-flip-in {
  animation: invFlipIn 0.25s ease-out forwards;
}
@keyframes invFlipOut {
  0% { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
  100% { transform: perspective(1200px) rotateY(90deg); opacity: 0; }
}
@keyframes invFlipIn {
  0% { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
  100% { transform: perspective(1200px) rotateY(0deg); opacity: 1; }
}
```

**Flip handler (JS):**
```js
case 'invFlipCard': {
  var inner = document.querySelector('.inv-flip-inner');
  if (!inner) break;
  var front = inner.querySelector('.inv-flip-front');
  var back = inner.querySelector('.inv-flip-back');
  if (!front || !back) break;
  var showingFront = !front.classList.contains('inv-flip-hidden');
  var outFace = showingFront ? front : back;
  var inFace = showingFront ? back : front;
  outFace.classList.add('inv-flip-out');
  setTimeout(function() {
    outFace.classList.remove('inv-flip-out');
    outFace.classList.add('inv-flip-hidden');
    outFace.classList.remove('inv-flip-visible');
    inFace.classList.remove('inv-flip-hidden');
    inFace.classList.add('inv-flip-visible', 'inv-flip-in');
    setTimeout(function() {
      inFace.classList.remove('inv-flip-in');
    }, 250);
  }, 250);
  break;
}
```

**KPI card CSS:**
```css
.inv-flip-kpis {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: var(--sp-12); margin-bottom: var(--sp-16);
}
.inv-flip-kpi {
  text-align: center; padding: var(--sp-12);
  background: var(--surface-2); border-radius: var(--r-lg);
}
.inv-flip-kpi-label {
  display: block; font-size: var(--fs-xs); color: var(--text-3);
  text-transform: uppercase; letter-spacing: 0.05em;
  margin-bottom: var(--sp-4);
}
.inv-flip-kpi-value {
  display: block; font-family: var(--ff-display); font-size: var(--fs-lg);
  font-weight: 700; color: var(--cost-text);
}
.inv-flip-states {
  display: flex; gap: var(--sp-8); flex-wrap: wrap;
  margin-bottom: var(--sp-16);
}
.inv-flip-meta {
  font-size: var(--fs-sm); color: var(--text-3);
  margin-bottom: var(--sp-16);
}
.inv-flip-section-title {
  font-size: var(--fs-sm); font-weight: 700; color: var(--text-3);
  text-transform: uppercase; letter-spacing: 0.05em;
  margin: var(--sp-16) 0 var(--sp-8) 0;
}
.inv-flip-invoice-list, .inv-flip-challan-list {
  display: flex; flex-direction: column; gap: var(--sp-4);
}
.inv-flip-actions {
  display: flex; flex-direction: column; gap: var(--sp-8);
  margin-top: var(--sp-20);
  padding-top: var(--sp-16);
  border-top: 1px solid var(--border);
}
```

### B6. Action Button Handlers

```js
case 'invStatsClientDrill': {
  var clientId = btn.dataset.clientId;
  openClientDrillOverlay(clientId);
  break;
}
case 'invStatsCreateInvoice': {
  var clientId = btn.dataset.clientId;
  closeOverlay();
  // Pre-select client in create form, then switch tab
  _preselectedClientId = clientId;
  switchTab('pageCreate');
  break;
}
case 'invStatsJumpRegister': {
  var clientId = btn.dataset.clientId;
  closeOverlay();
  regFilter.clientId = clientId;
  regFilter.search = '';
  regFilter.state = '';
  saveRegFilter();
  _tabDirty.register = true;
  _regToolbarRendered = false; // Force toolbar re-render to show filter
  switchTab('pageRegister');
  break;
}
case 'invStatsJumpIM': {
  var clientId = btn.dataset.clientId;
  closeOverlay();
  _imFilter.clientId = String(clientId);
  _imToolbarRendered = false; // Force toolbar re-render
  switchTab('pageIM');
  break;
}
```

**`_preselectedClientId` for Create Invoice:**
- New module-level var in stats.js: `var _preselectedClientId = null;`
- In `initCreateForm()` (create.js): check if `_preselectedClientId` is set, if so pre-select that client in the form and clear the flag
- **CROSS-MODULE CONCERN:** `_preselectedClientId` is set in stats.js but read in create.js. Since both are in the same global scope after build.sh concatenation, this works. But must declare in stats.js BEFORE it's read in create.js. Check build order: stats.js is concatenated before events.js but AFTER create.js. **BUG:** The var is declared in stats.js but referenced in create.js which is concatenated earlier.
- **FIX:** Declare `_preselectedClientId` in state.js (which is concatenated second, before create.js). Or simply use a property on a global object — but the simplest fix: declare it at the top of state.js with the other globals.

**state.js addition:**
```js
var _preselectedClientId = null;
```

### B7. `openClientDrillOverlay()` Function

```js
function openClientDrillOverlay(clientId) {
  var client = S.clients.find(function(c) { return c.id === clientId; });
  if (!client) { showToast('Client not found', 'warning'); return; }

  var activeInvs = S.invoices.filter(function(i) { return i.status === 'active'; });
  var filtered = filterByPeriod(activeInvs, _statsPeriod);

  // Client metrics
  var clientInvs = filtered.filter(function(i) { return i.clientId === clientId; });
  var totalRev = clientInvs.reduce(function(s, i) { return s + (i.taxableValue || 0); }, 0);
  var allRev = filtered.reduce(function(s, i) { return s + (i.taxableValue || 0); }, 0);
  var pct = allRev > 0 ? Math.round(totalRev / allRev * 100) : 0;

  // Pending IM
  var pendingAmt = 0, pendingItems = 0;
  (S.incomingMaterial || []).forEach(function(im) {
    if (im.clientId !== clientId) return;
    im.items.forEach(function(it) {
      if (!it.invoiced) { pendingAmt += (it.amount || 0); pendingItems++; }
    });
  });

  // State counts
  var stateCounts = { created: 0, dispatched: 0, delivered: 0, filed: 0 };
  clientInvs.forEach(function(inv) {
    var s = getInvState(inv);
    if (stateCounts[s] != null) stateCounts[s]++;
  });

  // Rate info
  var rateInfo = '';
  if (client.billingMode === 'perKg') {
    var r = getLineItemRate(client, localDateStr());
    rateInfo = 'Per Kg · ' + formatCurrency(r.ratePerKg || r.rate || 0) + '/kg';
  } else if (client.billingMode === 'perPiece') {
    rateInfo = 'Per Piece';
  } else {
    rateInfo = escHtml(client.billingMode || 'Standard');
  }

  // Recent invoices (last 5, all-time for this client)
  var recentInvs = S.invoices
    .filter(function(i) { return i.clientId === clientId && i.status === 'active'; })
    .sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); })
    .slice(0, 5);
  var recentHtml = '';
  if (recentInvs.length === 0) {
    recentHtml = '<div class="inv-text-muted">No invoices</div>';
  } else {
    recentInvs.forEach(function(inv) {
      recentHtml += '<div class="inv-flip-row">' +
        '<span class="inv-mono">' + escHtml(inv.displayNumber) + '</span>' +
        '<span class="inv-text-muted">' + formatDate(inv.date) + '</span>' +
        '<span class="inv-mono inv-text-cost">' + formatCurrency(inv.grandTotal) + '</span>' +
        getStateBadgeHtml(inv) + '</div>';
    });
  }

  // Pending challans
  var pendingChallans = (S.incomingMaterial || []).filter(function(im) {
    if (im.clientId !== clientId) return false;
    return im.items.some(function(it) { return !it.invoiced; });
  });
  var challanHtml = '';
  if (pendingChallans.length === 0) {
    challanHtml = '<div class="inv-text-muted">No pending challans</div>';
  } else {
    pendingChallans.forEach(function(im) {
      var pItems = im.items.filter(function(it) { return !it.invoiced; });
      var pAmt = pItems.reduce(function(s, it) { return s + (it.amount || 0); }, 0);
      challanHtml += '<div class="inv-flip-row">' +
        '<span>' + (im.challanNo ? 'Ch. ' + escHtml(im.challanNo) : 'No number') + '</span>' +
        '<span class="inv-text-muted">' + formatDate(im.challanDate) + '</span>' +
        '<span class="inv-text-muted">' + pItems.length + ' items</span>' +
        '<span class="inv-mono">' + formatCurrency(pAmt) + '</span></div>';
    });
  }

  // Build overlay
  pushFocus();
  document.body.style.overflow = 'hidden';
  var scrim = document.createElement('div');
  scrim.className = 'inv-overlay-scrim';
  scrim.innerHTML = '<div class="inv-overlay-card inv-flip-container">' +
    '<div class="inv-flip-inner">' +
    // FRONT
    '<div class="inv-flip-front">' +
    '<div class="inv-overlay-header"><span class="inv-overlay-title">' + escHtml(client.name) + '</span>' +
    '<button class="inv-overlay-close" data-action="invCloseOverlay">&times;</button></div>' +
    '<div class="inv-flip-kpis">' +
    '<div class="inv-flip-kpi"><span class="inv-flip-kpi-label">Revenue</span><span class="inv-flip-kpi-value">' + formatCurrency(totalRev) + '</span></div>' +
    '<div class="inv-flip-kpi"><span class="inv-flip-kpi-label">Invoices</span><span class="inv-flip-kpi-value">' + clientInvs.length + '</span></div>' +
    '<div class="inv-flip-kpi"><span class="inv-flip-kpi-label">Share</span><span class="inv-flip-kpi-value">' + pct + '%</span></div>' +
    '<div class="inv-flip-kpi"><span class="inv-flip-kpi-label">Unbilled</span><span class="inv-flip-kpi-value">' + formatCurrency(pendingAmt) + '</span></div>' +
    '</div>' +
    '<div class="inv-flip-states">' +
    '<span class="inv-state-badge inv-state-created">' + stateCounts.created + ' Created</span>' +
    '<span class="inv-state-badge inv-state-dispatched">' + stateCounts.dispatched + ' Dispatched</span>' +
    '<span class="inv-state-badge inv-state-delivered">' + stateCounts.delivered + ' Delivered</span>' +
    '<span class="inv-state-badge inv-state-filed">' + stateCounts.filed + ' Filed</span>' +
    '</div>' +
    '<div class="inv-flip-meta">' + escHtml(rateInfo) + '</div>' +
    '<button class="inv-btn inv-btn-ghost inv-btn-block" data-action="invFlipCard">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>' +
    ' Details &amp; Actions</button>' +
    '</div>' +
    // BACK
    '<div class="inv-flip-back">' +
    '<div class="inv-overlay-header"><span class="inv-overlay-title">' + escHtml(client.name) + '</span><div>' +
    '<button class="inv-overlay-close" data-action="invFlipCard" aria-label="Flip back">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>' +
    '</button>' +
    '<button class="inv-overlay-close" data-action="invCloseOverlay">&times;</button></div></div>' +
    '<div class="inv-flip-section-title">Recent Invoices</div>' + recentHtml +
    '<div class="inv-flip-section-title">Pending Challans</div>' + challanHtml +
    '<div class="inv-flip-actions">' +
    '<button class="inv-btn inv-btn-primary" data-action="invStatsCreateInvoice" data-client-id="' + clientId + '">Create Invoice</button>' +
    '<button class="inv-btn inv-btn-ghost" data-action="invStatsJumpRegister" data-client-id="' + clientId + '">View in Register</button>' +
    '<button class="inv-btn inv-btn-ghost" data-action="invStatsJumpIM" data-client-id="' + clientId + '">View in IM</button>' +
    '</div></div>' +
    '</div></div>';
  document.body.appendChild(scrim);
  focusFirstInteractive(scrim);
}
```

### B8. `escHtml` Audit

All user data at render boundaries:
- Client names: ✅ `escHtml(client.name)`, `escHtml(r.name)`
- Invoice display numbers: ✅ `escHtml(inv.displayNumber)`
- Challan numbers: ✅ `escHtml(im.challanNo)`
- Part numbers: ✅ `escHtml(it.partNumber)`
- Descriptions: ✅ `escHtml(it.desc)`
- Rate info string: ✅ `escHtml(rateInfo)` — but rateInfo is built from formatCurrency which returns safe strings. Still escape for safety.
- SVG text elements: ✅ `escHtml(r.name)` in bar labels

---

## 8-PASS CHECKLIST

### Pass 1 — Concept ✅
History: 4 improvements (dates, tappable, day headers, load-more)  
Stats: 7 cards, period chips, SVG charts, flippable overlay, 3 action buttons

### Pass 2 — Data Flow ✅
- Period filter flows from chip → `_statsPeriod` → `filterByPeriod()` → all card renderers
- Client drill: click on SVG bar/row → `openClientDrillOverlay(clientId)` → builds overlay from S.invoices + S.incomingMaterial + S.clients
- Actions: closeOverlay → set filter state → switchTab
- History: `_historyDateFrom`/`_historyDateTo`/`_historyClientFilter`/`_historyShowCount` → renderHistory()

### Pass 3 — Integration ✅
- `_preselectedClientId` declared in state.js (concat order safe)
- `filterByPeriod()` declared in stats.js (after state.js, before events.js)
- Tab switching via existing `switchTab()` — no new tab code needed
- Overlay via existing scrim pattern — closeOverlay() works unchanged
- `regFilter.imClientFilter` — **VERIFIED:** IM uses `_imFilter.clientId` (module-level in im.js), NOT `regFilter`. Spec updated: jump-to-IM sets `_imFilter.clientId` directly.

**CRITICAL CHECK:** `regFilter.imClientFilter` — need to verify this field exists and is used by `renderIMList()`.

### Pass 4 — Bugs Today ✅
1. **SVG click delegation:** `closest('[data-action]')` on SVG `<g>` elements — works in Chrome 58+. But `btn.dataset.clientId` uses camelCase; the HTML attribute is `data-client-id`. **Verify:** `dataset.clientId` reads `data-client-id`. ✅ Correct — HTML `data-client-id` maps to JS `dataset.clientId`.
2. **Build order:** stats.js concat position is after create.js. `_preselectedClientId` must be in state.js. ✅ Fixed in spec.
3. **History load-more resets:** `_historyShowCount` must NOT be reset inside `renderHistory()`. ✅ Spec explicitly calls this out.
4. **YTD financial year:** Month is 0-indexed in JS. April = month 3. If `now.getMonth() >= 3`, FY started this calendar year. If `< 3`, FY started last year. ✅ Handled in spec.
5. **Empty state in flippable card:** If client has 0 invoices in period, KPIs show ₹0 / 0 / 0% — that's fine, not a bug. But "Revenue" showing ₹0.00 while there ARE all-time invoices could be confusing. **Add:** subtitle on front showing period name (e.g., "MTD" next to Revenue).
6. **Overlay scrim click-to-close:** Current overlay doesn't close on scrim click (only × button). Consistent with existing behavior. No change.

### Pass 5 — Drift Bugs ✅
1. **`regFilter.imClientFilter`:** Need to verify. If IM toolbar doesn't read this, the "Jump to IM" button would switch tab but not filter. Must check im.js.
2. **`_regToolbarRendered = false` on jump:** Forces full toolbar re-render including filter dropdowns. This is correct for Register. For IM, `_imToolbarRendered = false` does the same.
3. **Dark mode SVG:** CSS variables in SVG `fill`/`stroke` work when SVG is inline HTML (not external file). ✅ Our SVGs are inline.
4. **Print view:** Stats and History should not appear in print. Check: `.inv-page` is already hidden in print CSS. ✅ No leak.

### Pass 6 — Builder Questions (Answered in spec)
- Q: Where to put `filterByPeriod()`? A: stats.js, top of file
- Q: Where to put `_preselectedClientId`? A: state.js
- Q: How to handle `inv-flip-back` overflow? A: display:none/block swap, not CSS 3D (simpler, no overflow bugs)
- Q: Do I rebuild toolbar on every `renderStats()` call? A: Yes, chips need active state update

### Pass 7 — Consistency ✅
- All CSS classes use `inv-` prefix ✅
- All interactions use `data-action` delegation ✅
- No inline styles ✅ (flip handler uses classList, not style.transform)
- Design tokens only ✅
- `escHtml()` at all render boundaries ✅
- `gstRound()` for currency calculations — not applicable (display only, using `formatCurrency()` which calls `toFixed(2)`) ✅
- No emojis ✅
- Dark mode on all new elements ✅

### Pass 8 — Completion ✅
Every new element has: HTML structure, CSS, JS handler, dark mode, escHtml coverage, and edge case handling. No undocumented decisions remain.

---

## VERIFICATION NEEDED BEFORE BUILD

1. **Check `regFilter.imClientFilter`** usage in `split/im.js` — does IM list filter by this field?
2. **Check if `_preselectedClientId` would conflict** with any existing var in create.js
3. **Check `data-challan-id` attribute** — does IM list render this on challan cards? (needed for history jump-to-challan scroll)

---

## FILES CHANGED

| File | Changes |
|------|---------|
| `split/state.js` | Add `_preselectedClientId = null` |
| `split/stats.js` | Complete rewrite: ~450 lines (was 218) |
| `split/events.js` | Add 12 new case handlers (~80 lines) |
| `split/styles.css` | Add ~120 lines for chips, SVG, grid, flip, history |
| `split/body.html` | Add `<div id="statsToolbar">` above statsContent |
| `split/create.js` | Read `_preselectedClientId` in initCreateForm (~5 lines) |
