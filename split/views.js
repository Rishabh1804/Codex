/* CODEX — Views (Phase 3: Journal, Canons, Canon Detail, Snippet Import) */

/* --- Phase 3 State --- */
var _journalFilters = { range: '30d', volume: null };
var _journalLoadMoreCount = 30;
var _canonPage = 1;
var _canonFilters = { scope: null, category: null, status: null };
var CANONS_PER_PAGE = 10;

/* --- Shared Helpers --- */

function renderTruncated(text, maxChars, entityId, field) {
  if (!text || text.length <= maxChars) return '<span class="cx-truncated-container">' + escHtml(text || '') + '</span>';
  var truncated = text.substring(0, maxChars).replace(/\s+\S*$/, '');
  return '<span class="cx-truncated-container" data-max="' + maxChars + '">' + escHtml(truncated) + '\u2026 <button class="cx-link-btn" data-action="expandText" data-id="' + escAttr(entityId) + '" data-field="' + escAttr(field) + '">Read more</button></span>';
}

function getEntityFieldText(id, field) {
  // Search sessions
  for (var i = 0; i < store.journal.length; i++) {
    var day = store.journal[i];
    for (var j = 0; j < (day.sessions || []).length; j++) {
      var s = day.sessions[j];
      if (s.id === id) return s[field] || '';
    }
  }
  // Search canons
  var canon = store.canons.find(function(c) { return c.id === id; });
  if (canon) return canon[field] || '';
  // Search rejections
  var rej = store.rejections.find(function(r) { return r.id === id; });
  if (rej) return rej[field] || '';
  return '';
}

function handleExpandText(el) {
  var id = el.dataset.id;
  var field = el.dataset.field;
  var container = el.closest('.cx-truncated-container');
  if (!container) return;
  var full = getEntityFieldText(id, field);
  container.innerHTML = escHtml(full) + ' <button data-action="collapseText" data-id="' + escAttr(id) + '" data-field="' + escAttr(field) + '" class="cx-link-btn">Show less</button>';
}

function handleCollapseText(el) {
  var id = el.dataset.id;
  var field = el.dataset.field;
  var container = el.closest('.cx-truncated-container');
  if (!container) return;
  var maxChars = parseInt(container.dataset.max, 10) || 120;
  var full = getEntityFieldText(id, field);
  var truncated = full.substring(0, maxChars).replace(/\s+\S*$/, '');
  container.innerHTML = escHtml(truncated) + '\u2026 <button data-action="expandText" data-id="' + escAttr(id) + '" data-field="' + escAttr(field) + '" class="cx-link-btn">Read more</button>';
}

function renderDayHeader(dateStr) {
  var today = localDateStr();
  var yd = new Date(); yd.setDate(yd.getDate() - 1);
  var yesterday = localDateStr(yd);
  var label = dateStr === today ? 'Today' : dateStr === yesterday ? 'Yesterday' : formatAbsoluteDate(dateStr);
  return '<div class="cx-day-header">' + escHtml(label) + '</div>';
}

/* --- Last Active Date (for dashboard sort — spec bug #97) --- */
function getLastActiveDate(volumeId) {
  for (var i = 0; i < store.journal.length; i++) {
    var day = store.journal[i];
    for (var j = 0; j < (day.sessions || []).length; j++) {
      if ((day.sessions[j].volumes_touched || []).includes(volumeId)) return day.date;
    }
  }
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (vol && vol.shelf_history && vol.shelf_history.length > 0) {
    return vol.shelf_history[vol.shelf_history.length - 1].date;
  }
  return null;
}

/* ============================================================
   JOURNAL VIEW
   ============================================================ */

function renderJournal() {
  var vc = document.getElementById('viewContainer');
  var html = '';

  // Filter bar: range chips
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Range:</span>';
  var ranges = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: 'all', label: 'All' }
  ];
  ranges.forEach(function(r) {
    var active = _journalFilters.range === r.value ? ' cx-chip-active' : '';
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="setJournalRange" data-value="' + escAttr(r.value) + '">' + escHtml(r.label) + '</button>';
  });
  html += '</div>';

  // Volume filter chips
  var activeVols = filterActive(store.volumes);
  if (activeVols.length > 1) {
    html += '<div class="cx-filter-bar">';
    html += '<span class="cx-filter-label">Volume:</span>';
    html += '<button class="cx-chip cx-chip-sm' + (!_journalFilters.volume ? ' cx-chip-active' : '') + '" data-action="setJournalVolume" data-value="">All</button>';
    activeVols.forEach(function(v) {
      var active = _journalFilters.volume === v.id ? ' cx-chip-active' : '';
      html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="setJournalVolume" data-value="' + escAttr(v.id) + '">' + escHtml(v.name) + '</button>';
    });
    html += '</div>';
  }

  // Filter sessions
  var cutoffDate = null;
  if (_journalFilters.range === '7d') cutoffDate = daysAgo(7);
  else if (_journalFilters.range === '30d') cutoffDate = daysAgo(30);
  else if (_journalFilters.range === '90d') cutoffDate = daysAgo(90);

  var filteredDays = [];
  store.journal.forEach(function(day) {
    if (cutoffDate && day.date < cutoffDate) return;
    var sessions = day.sessions || [];
    if (_journalFilters.volume) {
      sessions = sessions.filter(function(s) {
        return (s.volumes_touched || []).indexOf(_journalFilters.volume) !== -1;
      });
    }
    if (sessions.length > 0) {
      filteredDays.push({ date: day.date, sessions: sessions });
    }
  });

  // Sort newest first (store.journal is already sorted, but filtered copy may not be)
  filteredDays.sort(function(a, b) { return b.date.localeCompare(a.date); });

  if (filteredDays.length === 0) {
    html += renderEmptyState('scroll', 'No sessions found', _journalFilters.volume || cutoffDate ? 'Try adjusting filters' : 'Log your first build session', 'New Session', 'openCreateSession');
    vc.innerHTML = html;
    return;
  }

  // Flatten to count total sessions
  var totalSessions = 0;
  filteredDays.forEach(function(d) { totalSessions += d.sessions.length; });

  // Paginate by _journalLoadMoreCount (session count)
  var sessionsRendered = 0;
  var daysToRender = [];
  for (var di = 0; di < filteredDays.length && sessionsRendered < _journalLoadMoreCount; di++) {
    var day = filteredDays[di];
    var sessionsForDay = [];
    for (var si = 0; si < day.sessions.length && sessionsRendered < _journalLoadMoreCount; si++) {
      sessionsForDay.push(day.sessions[si]);
      sessionsRendered++;
    }
    daysToRender.push({ date: day.date, sessions: sessionsForDay });
  }

  // Render day groups
  daysToRender.forEach(function(day) {
    html += renderDayHeader(day.date);
    day.sessions.forEach(function(session) {
      html += renderSessionCard(session, day.date);
    });
  });

  // Load more button
  if (sessionsRendered < totalSessions) {
    html += '<div class="cx-center"><button class="cx-btn-secondary" data-action="loadMoreJournal">Load more (' + (totalSessions - sessionsRendered) + ' remaining)</button></div>';
  }

  vc.innerHTML = html;
}

function renderSessionCard(session, date) {
  var html = '<div class="cx-card cx-session-card">';

  // Header: session ID + duration + delete
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-meta">' + escHtml(session.id);
  if (session.duration_minutes) html += ' \u00B7 ' + escHtml(session.duration_minutes) + ' min';
  html += '</div>';
  html += '<button class="cx-btn-icon cx-btn-danger-icon" data-action="deleteSession" data-date="' + escAttr(date) + '" data-id="' + escAttr(session.id) + '">' + cx('trash') + '</button>';
  html += '</div>';

  // Summary (truncated)
  if (session.summary) {
    html += '<div class="cx-session-summary">' + renderTruncated(session.summary, 120, session.id, 'summary') + '</div>';
  }

  // Volume chips
  if (session.volumes_touched && session.volumes_touched.length > 0) {
    html += '<div class="cx-chip-row">';
    session.volumes_touched.forEach(function(vid) {
      var vol = store.volumes.find(function(v) { return v.id === vid; });
      var color = vol ? vol.domain_color : '#8B7355';
      var name = vol ? vol.name : vid;
      html += '<span class="cx-chip cx-chip-sm cx-vol-chip" style="border-color:' + escAttr(color) + ';color:' + escAttr(color) + '" data-action="goToVolume" data-id="' + escAttr(vid) + '">' + escHtml(name) + '</span>';
    });
    html += '</div>';
  }

  // Chapter chips
  if (session.chapters_touched && session.chapters_touched.length > 0) {
    html += '<div class="cx-chip-row">';
    session.chapters_touched.forEach(function(ch) {
      html += '<span class="cx-chip cx-chip-sm">' + cx('bookmark') + ' ' + escHtml(ch) + '</span>';
    });
    html += '</div>';
  }

  // Expandable details section
  var hasDetails = (session.bugs_found > 0 || session.bugs_fixed > 0) ||
    (session.decisions && session.decisions.length > 0) ||
    (session.open_todos && session.open_todos.length > 0) ||
    session.handoff;

  if (hasDetails) {
    html += '<div data-expandable="true" data-expanded="false">';
    html += '<button class="cx-expand-header cx-link-btn" data-action="toggleExpand"><span class="cx-expand-toggle">\u25B6</span> Details</button>';
    html += '<div class="cx-expandable-content">';

    // Bugs
    if (session.bugs_found > 0 || session.bugs_fixed > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Bugs:</span> ' + escHtml(session.bugs_found || 0) + ' found, ' + escHtml(session.bugs_fixed || 0) + ' fixed</div>';
    }

    // Decisions
    if (session.decisions && session.decisions.length > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Decisions:</span>';
      session.decisions.forEach(function(d) {
        // Check if it's a canon reference (starts with canon-)
        if (d.match && d.match(/^canon-/)) {
          html += '<div class="cx-session-decision"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(d) + '">' + escHtml(d) + '</button></div>';
        } else {
          html += '<div class="cx-session-decision">' + escHtml(d) + '</div>';
        }
      });
      html += '</div>';
    }

    // Open TODOs (historical snapshot)
    if (session.open_todos && session.open_todos.length > 0) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Open TODOs:</span>';
      session.open_todos.forEach(function(t) {
        html += '<div class="cx-session-todo-item">\u2022 ' + escHtml(t) + '</div>';
      });
      html += '</div>';
    }

    // Handoff
    if (session.handoff) {
      html += '<div class="cx-session-detail-section"><span class="cx-session-detail-label">Handoff:</span> ' + renderTruncated(session.handoff, 200, session.id, 'handoff') + '</div>';
    }

    html += '</div></div>'; // expandable
  }

  html += '</div>'; // card
  return html;
}


/* ============================================================
   CANONS VIEW
   ============================================================ */

function renderCanons() {
  var vc = document.getElementById('viewContainer');
  var html = '';

  // Build scope options from data
  var scopeOptions = ['global'];
  filterActive(store.volumes).forEach(function(v) {
    if (filterActive(store.canons).some(function(c) { return c.scope === v.id; })) {
      scopeOptions.push(v.id);
    }
  });

  // Filter bar: scope
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Scope:</span>';
  html += '<button class="cx-chip cx-chip-sm' + (!_canonFilters.scope ? ' cx-chip-active' : '') + '" data-action="toggleCanonFilter" data-key="scope" data-value="">All</button>';
  scopeOptions.forEach(function(s) {
    var active = _canonFilters.scope === s ? ' cx-chip-active' : '';
    var label = s === 'global' ? 'Global' : (function() { var v = store.volumes.find(function(x) { return x.id === s; }); return v ? v.name : s; })();
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="toggleCanonFilter" data-key="scope" data-value="' + escAttr(s) + '">' + escHtml(label) + '</button>';
  });
  html += '</div>';

  // Filter bar: category
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Category:</span>';
  html += '<button class="cx-chip cx-chip-sm' + (!_canonFilters.category ? ' cx-chip-active' : '') + '" data-action="toggleCanonFilter" data-key="category" data-value="">All</button>';
  CANON_CATEGORIES.forEach(function(c) {
    var active = _canonFilters.category === c ? ' cx-chip-active' : '';
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="toggleCanonFilter" data-key="category" data-value="' + escAttr(c) + '">' + escHtml(c) + '</button>';
  });
  html += '</div>';

  // Filter bar: status
  html += '<div class="cx-filter-bar">';
  html += '<span class="cx-filter-label">Status:</span>';
  html += '<button class="cx-chip cx-chip-sm' + (!_canonFilters.status ? ' cx-chip-active' : '') + '" data-action="toggleCanonFilter" data-key="status" data-value="">All</button>';
  ['active', 'deprecated', 'superseded'].forEach(function(s) {
    var active = _canonFilters.status === s ? ' cx-chip-active' : '';
    html += '<button class="cx-chip cx-chip-sm' + active + '" data-action="toggleCanonFilter" data-key="status" data-value="' + escAttr(s) + '">' + escHtml(s) + '</button>';
  });
  html += '</div>';

  // Apply filters (intersection)
  var canons = filterActive(store.canons).filter(function(c) {
    if (_canonFilters.scope && c.scope !== _canonFilters.scope) return false;
    if (_canonFilters.category && c.category !== _canonFilters.category) return false;
    if (_canonFilters.status && c.status !== _canonFilters.status) return false;
    return true;
  });

  // Sort by ID descending (newest first)
  canons.sort(function(a, b) { return b.id.localeCompare(a.id); });

  // Paginate
  var totalPages = Math.max(1, Math.ceil(canons.length / CANONS_PER_PAGE));
  if (_canonPage > totalPages) _canonPage = totalPages;
  var startIdx = (_canonPage - 1) * CANONS_PER_PAGE;
  var pageCanons = canons.slice(startIdx, startIdx + CANONS_PER_PAGE);

  if (canons.length === 0) {
    html += renderEmptyState('bookmark', 'No canons match', 'Try adjusting filters or add a new canon', 'New Canon', 'openCreateCanon');
    vc.innerHTML = html;
    return;
  }

  html += '<div class="cx-card-meta" style="margin-bottom:var(--sp-8)">' + canons.length + ' canon' + (canons.length !== 1 ? 's' : '') + '</div>';

  // Canon cards
  pageCanons.forEach(function(canon) {
    html += renderCanonCard(canon);
  });

  // Pagination
  if (totalPages > 1) {
    html += renderPaginationHtml(_canonPage, totalPages);
  }

  // Rejections section (inline at bottom, not paginated)
  var rejections = filterActive(store.rejections);
  if (_canonFilters.scope) {
    rejections = rejections.filter(function(r) {
      return (r.volumes || []).indexOf(_canonFilters.scope) !== -1 || _canonFilters.scope === 'global';
    });
  }

  if (rejections.length > 0) {
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('alert') + ' Rejected Alternatives (' + rejections.length + ')</div>';
    rejections.forEach(function(rej) {
      html += renderRejectionCard(rej);
    });
  }

  vc.innerHTML = html;
}

function renderPaginationHtml(current, total) {
  return '<div class="cx-pagination">'
    + '<button data-action="changePage" data-page="' + (current - 1) + '" class="cx-btn-secondary cx-btn-sm"' + (current === 1 ? ' disabled' : '') + '>Prev</button>'
    + '<span class="cx-card-meta">Page ' + current + ' of ' + total + '</span>'
    + '<button data-action="changePage" data-page="' + (current + 1) + '" class="cx-btn-secondary cx-btn-sm"' + (current === total ? ' disabled' : '') + '>Next</button>'
    + '</div>';
}

function renderCanonCard(canon) {
  var html = '<div class="cx-card cx-card-clickable" data-action="goToCanon" data-id="' + escAttr(canon.id) + '">';
  html += '<div class="cx-card-header">';
  html += '<div class="cx-card-title">' + cx('bookmark') + escHtml(canon.title) + '</div>';
  html += '</div>';

  // Badges
  html += '<div class="cx-chip-row">';
  // Scope badge
  var scopeLabel = canon.scope === 'global' ? 'Global' : (function() { var v = store.volumes.find(function(x) { return x.id === canon.scope; }); return v ? v.name : canon.scope; })();
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(scopeLabel) + '</span>';
  // Category badge
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(canon.category) + '</span>';
  // Status badge
  html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(canon.status) + '">' + escHtml(canon.status) + '</span>';
  html += '</div>';

  // Rationale (truncated)
  if (canon.rationale) {
    html += '<div class="cx-card-body">' + renderTruncated(canon.rationale, 100, canon.id, 'rationale') + '</div>';
  }

  // References
  if (canon.references && canon.references.length > 0) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">Refs: ' + escHtml(canon.references.join(', ')) + '</div>';
  }

  // Created date
  if (canon.created) {
    html += '<div class="cx-card-meta">' + escHtml(formatAbsoluteDate(canon.created.length >= 10 ? canon.created : canon.created + '-01')) + '</div>';
  }

  html += '</div>';
  return html;
}

function renderRejectionCard(rej) {
  var html = '<div class="cx-card cx-rejection-card">';
  html += '<div class="cx-card-header"><div class="cx-card-meta cx-rejection-title">Rejected: ' + escHtml(rej.rejected) + '</div></div>';
  html += '<div class="cx-card-body" style="font-size:var(--fs-xs)"><span style="color:var(--success)">Chosen:</span> ' + escHtml(rej.chosen) + '</div>';
  if (rej.reason) {
    html += '<div class="cx-card-body" style="font-size:var(--fs-xs);color:var(--text-secondary)">' + renderTruncated(rej.reason, 120, rej.id, 'reason') + '</div>';
  }

  // Context + volumes + date
  var meta = [];
  if (rej.context) meta.push(rej.context);
  if (rej.volumes && rej.volumes.length > 0) {
    var volNames = rej.volumes.map(function(vid) {
      var v = store.volumes.find(function(x) { return x.id === vid; });
      return v ? v.name : vid;
    });
    meta.push(volNames.join(', '));
  }
  if (rej.date) meta.push(formatAbsoluteDate(rej.date));
  if (meta.length > 0) {
    html += '<div class="cx-card-meta" style="margin-top:var(--sp-4)">' + escHtml(meta.join(' \u00B7 ')) + '</div>';
  }

  // Linked canon
  if (rej.canon_id) {
    html += '<div style="margin-top:var(--sp-4)"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(rej.canon_id) + '">Canon: ' + escHtml(rej.canon_id) + '</button></div>';
  }

  html += '</div>';
  return html;
}


/* ============================================================
   CANON DETAIL VIEW
   ============================================================ */

function renderCanonDetail(route) {
  var vc = document.getElementById('viewContainer');
  var canon = store.canons.find(function(c) { return c.id === route.id; });
  if (!canon) {
    vc.innerHTML = renderEmptyState('alert', 'Canon not found', 'This canon may have been deleted');
    return;
  }

  var html = '';

  // Title
  html += '<h1 class="cx-page-title">' + cx('bookmark') + ' ' + escHtml(canon.title) + '</h1>';

  // Badges row
  html += '<div class="cx-chip-row" style="margin-bottom:var(--sp-16)">';
  var scopeLabel = canon.scope === 'global' ? 'Global' : (function() { var v = store.volumes.find(function(x) { return x.id === canon.scope; }); return v ? v.name : canon.scope; })();
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(scopeLabel) + '</span>';
  html += '<span class="cx-chip cx-chip-sm">' + escHtml(canon.category) + '</span>';
  html += '<span class="cx-chip cx-chip-sm cx-status-' + escAttr(canon.status) + '">' + escHtml(canon.status) + '</span>';
  if (canon.created) {
    html += '<span class="cx-chip cx-chip-sm">' + escHtml(formatAbsoluteDate(canon.created.length >= 10 ? canon.created : canon.created + '-01')) + '</span>';
  }
  html += '</div>';

  // Rationale (full)
  if (canon.rationale) {
    html += '<div class="cx-section-title">Rationale</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0;line-height:1.6">' + escHtml(canon.rationale) + '</div></div>';
  }

  // References
  if (canon.references && canon.references.length > 0) {
    html += '<div class="cx-section-title">References</div>';
    html += '<div class="cx-card"><div class="cx-card-body" style="margin:0">' + escHtml(canon.references.join(', ')) + '</div></div>';
  }

  // Supersession Chain
  var chain = buildSupersessionChain(canon.id, store.canons);
  if (chain.length > 1) {
    html += '<div class="cx-section-title">Supersession Chain</div>';
    html += '<div class="cx-card">' + renderSupersessionChain(chain, canon.id) + '</div>';
  } else if (canon.superseded_by) {
    html += '<div class="cx-section-title">Superseded By</div>';
    html += '<div class="cx-card"><button class="cx-link-btn" data-action="goToCanon" data-id="' + escAttr(canon.superseded_by) + '">' + escHtml(canon.superseded_by) + '</button></div>';
  }

  // Linked Rejections
  var linkedRejs = filterActive(store.rejections).filter(function(r) { return r.canon_id === canon.id; });
  if (linkedRejs.length > 0) {
    html += '<div class="cx-section-title">Linked Rejections (' + linkedRejs.length + ')</div>';
    linkedRejs.forEach(function(rej) { html += renderRejectionCard(rej); });
  }

  // Action bar
  html += '<div class="cx-action-bar">';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="copyCanonId" data-id="' + escAttr(canon.id) + '">' + cx('link') + ' Copy ID</button>';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="copyCanonJson" data-id="' + escAttr(canon.id) + '">' + cx('download') + ' Copy JSON</button>';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="editCanon" data-id="' + escAttr(canon.id) + '">' + cx('quill') + ' Edit</button>';
  html += '<button class="cx-btn-danger cx-btn-sm" data-action="deleteCanon" data-id="' + escAttr(canon.id) + '">' + cx('trash') + ' Delete</button>';
  html += '</div>';

  vc.innerHTML = html;
}

function buildSupersessionChain(canonId, allCanons) {
  var active = filterActive(allCanons);
  var visited = {};

  // Walk backward for predecessors
  var predecessors = [];
  var currentId = canonId;
  var depth = 0;
  visited[canonId] = true;
  while (depth < 10) {
    var pred = active.find(function(c) { return c.superseded_by === currentId && !visited[c.id]; });
    if (!pred) break;
    visited[pred.id] = true;
    predecessors.unshift(pred.id);
    currentId = pred.id;
    depth++;
  }

  // Walk forward for successors
  var successors = [];
  var canon = active.find(function(c) { return c.id === canonId; });
  currentId = canon ? canon.superseded_by : null;
  depth = 0;
  while (currentId && depth < 10 && !visited[currentId]) {
    visited[currentId] = true;
    successors.push(currentId);
    var next = active.find(function(c) { return c.id === currentId; });
    currentId = next ? next.superseded_by : null;
    depth++;
  }

  // Full chain: predecessors → current → successors
  var chain = predecessors.concat([canonId]).concat(successors);
  return chain;
}

function renderSupersessionChain(chain, currentId) {
  var html = '<div class="cx-chain">';
  for (var i = 0; i < chain.length; i++) {
    var nodeId = chain[i];
    var canon = store.canons.find(function(c) { return c.id === nodeId; });
    var title = canon ? canon.title : nodeId;
    var isCurrent = nodeId === currentId;

    if (i > 0) html += '<div class="cx-chain-line"></div>';

    html += '<div class="cx-chain-node' + (isCurrent ? ' cx-chain-current' : ' cx-chain-link') + '"'
      + (isCurrent ? '' : ' data-action="goToCanon" data-id="' + escAttr(nodeId) + '"') + '>';
    html += '<span class="cx-chain-marker">' + (isCurrent ? '\u25C9' : '\u25CB') + '</span>';
    html += '<span class="cx-chain-id">' + escHtml(title) + '</span>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}


/* ============================================================
   DASHBOARD (from Phase 1)
   ============================================================ */

function renderDashboard() {
  var vc = document.getElementById('viewContainer');
  var snap = store.getSnapshot();
  var html = renderConnectGitHubCta();

  var hasAny = false;
  SHELF_ORDER.forEach(function(shelf) {
    var vols = snap.volumes.filter(function(v) { return v.shelf === shelf; });
    if (vols.length === 0) return;
    vols.sort(function(a, b) {
      var dateA = getLastActiveDate(a.id) || '0000-00-00';
      var dateB = getLastActiveDate(b.id) || '0000-00-00';
      return dateB.localeCompare(dateA);
    });
    hasAny = true;
    html += '<div class="cx-shelf-group"><div class="cx-shelf-group-label">' + escHtml(SHELF_LABELS[shelf]) + ' (' + vols.length + ')</div>';
    vols.forEach(function(vol) {
      var chapters = filterActive(vol.chapters || []);
      var openTodos = (vol.todos || []).filter(function(t) { return t.status === 'open'; });
      var meta = [];
      if (chapters.length > 0) meta.push(chapters.length + ' ch');
      if (openTodos.length > 0) meta.push(openTodos.length + ' TODO');

      html += '<div class="cx-card cx-card-clickable cx-vol-card" data-action="goToVolume" data-id="' + escAttr(vol.id) + '">';
      html += '<div class="cx-vol-accent" style="background:' + escAttr(vol.domain_color || '#8B7355') + '"></div>';
      html += '<div class="cx-vol-card-content">';
      html += '<div class="cx-card-header"><div class="cx-card-title">' + cx('book') + escHtml(vol.name) + '</div>'
        + '<span class="cx-shelf-badge cx-shelf-' + escAttr(vol.shelf) + '">' + escHtml(vol.shelf) + '</span></div>';
      if (vol.current_phase) html += '<div class="cx-card-body" style="color:var(--accent);font-size:var(--fs-xs)">' + escHtml(vol.current_phase) + '</div>';
      if (vol.description) html += '<div class="cx-card-body" style="font-size:var(--fs-xs);color:var(--text-secondary)">' + escHtml(vol.description) + '</div>';
      if (meta.length > 0) html += '<div class="cx-card-meta">' + cx('clock') + ' ' + escHtml(meta.join(' \u00B7 ')) + '</div>';
      if (vol.tags && vol.tags.length > 0) {
        html += '<div class="cx-tag-inline">';
        vol.tags.forEach(function(t) { html += '<span class="cx-chip cx-chip-sm">' + escHtml(t) + '</span>'; });
        html += '</div>';
      }
      html += '</div></div>';
    });
    html += '</div>';
  });

  if (!hasAny) {
    html += renderEmptyState('book', 'The library is empty', 'Tap + to add your first volume', 'New Volume', 'fabAction');
  }
  vc.innerHTML = html;
}

/* --- Volume Detail (from Phase 1) --- */
function renderVolumeDetail(route) {
  var vc = document.getElementById('viewContainer');
  var vol = store.volumes.find(function(v) { return v.id === route.id; });
  if (!vol) {
    vc.innerHTML = renderEmptyState('alert', 'Volume not found', 'This volume may have been deleted');
    return;
  }

  var html = '';

  // Header
  html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-8)">';
  html += '<div class="cx-vol-accent" style="background:' + escAttr(vol.domain_color) + ';width:4px;height:28px;border-radius:2px"></div>';
  html += '<h1 class="cx-page-title" style="margin:0">' + escHtml(vol.name) + '</h1>';
  html += '<span class="cx-shelf-badge cx-shelf-' + escAttr(vol.shelf) + '">' + escHtml(vol.shelf) + '</span>';
  html += '</div>';
  if (vol.description) html += '<p style="color:var(--text-secondary);margin-bottom:var(--sp-12);line-height:1.6">' + escHtml(vol.description) + '</p>';
  if (vol.current_phase) html += '<p style="color:var(--accent);font-size:var(--fs-xs);font-weight:500;margin-bottom:var(--sp-12)">' + cx('info') + ' ' + escHtml(vol.current_phase) + '</p>';
  if (vol.tags && vol.tags.length > 0) {
    html += '<div class="cx-tag-inline" style="margin-bottom:var(--sp-12)">';
    vol.tags.forEach(function(t) { html += '<span class="cx-chip cx-chip-sm">' + escHtml(t) + '</span>'; });
    html += '</div>';
  }

  // Action bar
  html += '<div class="cx-action-bar">';
  html += '<button class="cx-btn-secondary cx-btn-sm" data-action="openShelfTransition" data-id="' + escAttr(vol.id) + '">' + cx('shelf') + ' Move Shelf</button>';
  html += '</div>';

  // TODOs
  var todos = vol.todos || [];
  var openTodos = todos.filter(function(t) { return t.status === 'open'; });
  var resolvedTodos = todos.filter(function(t) { return t.status === 'resolved'; });

  html += '<div class="cx-section-title">' + cx('check') + ' TODOs (' + openTodos.length + ' open)</div>';
  if (openTodos.length === 0 && resolvedTodos.length === 0) {
    html += '<p style="color:var(--text-tertiary);font-size:var(--fs-xs);margin-bottom:var(--sp-16)">No TODOs yet</p>';
  } else {
    html += '<div class="cx-card">';
    openTodos.forEach(function(t) { html += renderTodoItem(vol.id, t); });
    if (resolvedTodos.length > 0) {
      html += '<div class="cx-todo-chapter-label" style="margin-top:var(--sp-8)">Resolved (' + resolvedTodos.length + ')</div>';
      resolvedTodos.forEach(function(t) { html += renderTodoItem(vol.id, t); });
    }
    html += '</div>';
  }

  // Chapters
  var chapters = filterActive(vol.chapters || []);
  html += '<div class="cx-section-title">' + cx('bookmark') + ' Chapters (' + chapters.length + ')</div>';
  if (chapters.length === 0) {
    html += '<p style="color:var(--text-tertiary);font-size:var(--fs-xs);margin-bottom:var(--sp-16)">No chapters yet</p>';
  } else {
    html += '<div class="cx-card">';
    chapters.forEach(function(ch) {
      var icon = ch.status === 'complete' ? 'check' : ch.status === 'in-progress' ? 'clock' : ch.status === 'abandoned' ? 'alert' : ch.status === 'paused' ? 'clock' : 'bookmark';
      var meta = [];
      if (ch.started) meta.push('Started ' + formatRelativeTime(ch.started));
      if (ch.completed) meta.push('Done ' + formatRelativeTime(ch.completed));

      html += '<div class="cx-chapter-item" data-action="editChapter" data-vol="' + escAttr(vol.id) + '" data-id="' + escAttr(ch.id) + '">';
      html += '<span class="cx-status-' + escAttr(ch.status) + '">' + cx(icon) + '</span>';
      html += '<div><div class="cx-chapter-name">' + escHtml(ch.name) + '</div>';
      if (ch.summary) html += '<div class="cx-chapter-summary">' + escHtml(ch.summary) + '</div>';
      if (meta.length > 0) html += '<div class="cx-chapter-meta">' + escHtml(meta.join(' \u00B7 ')) + '</div>';
      html += '</div></div>';
    });
    html += '</div>';
  }

  // Shelf History
  var history = vol.shelf_history || [];
  if (history.length > 1) {
    html += '<div class="cx-divider"></div>';
    html += '<div class="cx-section-title">' + cx('clock') + ' Shelf History</div>';
    html += '<div class="cx-shelf-timeline">';
    for (var h = history.length - 1; h >= 0; h--) {
      var sh = history[h];
      html += '<div class="cx-timeline-entry"><div class="cx-timeline-dot"></div><div>'
        + '<div class="cx-timeline-text">' + escHtml(SHELF_LABELS[sh.shelf] || sh.shelf) + (sh.reason ? ' \u2014 ' + escHtml(sh.reason) : '') + '</div>'
        + '<div class="cx-timeline-date">' + escHtml(formatAbsoluteDate(sh.date)) + '</div></div></div>';
    }
    html += '</div>';
  }

  // Danger zone
  html += '<div class="cx-divider"></div>';
  html += '<div class="cx-section-title">Danger Zone</div>';
  html += '<button class="cx-btn-danger cx-full-width" data-action="deleteVolume" data-id="' + escAttr(vol.id) + '">' + cx('trash') + ' Delete Volume</button>';

  vc.innerHTML = html;
}

function renderTodoItem(volumeId, todo) {
  var done = todo.status === 'resolved';
  var cls = done ? ' cx-todo-resolved' : '';
  var html = '<div class="cx-todo-item' + cls + '">';
  html += '<button class="cx-todo-check' + (done ? ' cx-todo-checked' : '') + '" data-action="toggleTodo" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(todo.id) + '">';
  if (done) html += cx('check');
  html += '</button>';
  html += '<div class="cx-todo-content">';
  html += '<div class="' + (done ? 'cx-todo-text-done' : 'cx-todo-text') + '">' + escHtml(todo.text) + '</div>';
  var meta = [];
  if (todo.chapter) meta.push(todo.chapter);
  meta.push(formatRelativeTime(todo.created));
  html += '<div class="cx-todo-meta">' + escHtml(meta.join(' \u00B7 ')) + '</div>';
  html += '</div>';
  html += '<button class="cx-btn-icon cx-btn-danger-icon" data-action="deleteTodo" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(todo.id) + '">' + cx('trash') + '</button>';
  html += '</div>';
  return html;
}

/* --- TODOs (All) --- */
function renderTodos() {
  var vc = document.getElementById('viewContainer');
  var allTodos = [];
  store.volumes.forEach(function(vol) {
    (vol.todos || []).forEach(function(t) {
      if (t.status === 'open') allTodos.push({ volume: vol, todo: t });
    });
  });

  if (allTodos.length === 0) {
    vc.innerHTML = renderEmptyState('check', 'All clear', 'No open TODOs across any volume');
    return;
  }

  var html = '<div class="cx-section-title">' + allTodos.length + ' open TODO' + (allTodos.length !== 1 ? 's' : '') + '</div>';

  // Group by volume
  var grouped = {};
  allTodos.forEach(function(item) {
    if (!grouped[item.volume.id]) grouped[item.volume.id] = { volume: item.volume, todos: [] };
    grouped[item.volume.id].todos.push(item.todo);
  });

  Object.keys(grouped).forEach(function(volId) {
    var g = grouped[volId];
    html += '<div class="cx-card cx-todo-volume-group">';
    html += '<div class="cx-todo-volume-title" data-action="goToVolume" data-id="' + escAttr(volId) + '" style="cursor:pointer">' + cx('book') + escHtml(g.volume.name) + '</div>';
    g.todos.forEach(function(t) { html += renderTodoItem(volId, t); });
    html += '</div>';
  });

  vc.innerHTML = html;
}

/* --- Settings (Phase 2: GitHub connection) --- */
function renderSettings() {
  var vc = document.getElementById('viewContainer');
  var currentTheme = localStorage.getItem(KEYS.THEME) || 'dark';
  var currentSize = localStorage.getItem(KEYS.TEXT_SIZE) || 'med';
  var isLight = currentTheme === 'light';
  var repoUrl = localStorage.getItem(KEYS.REPO_URL) || '';
  var hasGitHub = !!repoUrl;
  var html = '';

  // Appearance
  html += '<div class="cx-settings-section"><div class="cx-section-title">Appearance</div><div class="cx-card">';
  html += '<div class="cx-settings-row" data-action="toggleTheme">';
  html += '<div class="cx-settings-left">' + cx(isLight ? 'sun' : 'moon') + '<div><div class="cx-settings-label">Theme</div><div class="cx-settings-hint">' + (isLight ? 'Light' : 'Dark') + ' mode</div></div></div>';
  html += '<div class="cx-settings-right">' + (isLight ? 'Light' : 'Dark') + '</div></div>';
  html += '</div></div>';

  // Text size
  html += '<div class="cx-settings-section"><div class="cx-card" style="padding:var(--sp-16)">';
  html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">' + cx('book') + '<div><div class="cx-settings-label">Text size</div><div class="cx-settings-hint">Adjust reading comfort</div></div></div>';
  html += '<div class="cx-slider-wrap"><div class="cx-slider-track" id="cxSliderTrack">';
  html += '<div class="cx-slider-fill" id="cxSliderFill" style="width:' + TEXT_SIZE_POS[currentSize] + '%"></div>';
  html += '<div class="cx-slider-thumb" id="cxSliderThumb" style="left:' + TEXT_SIZE_POS[currentSize] + '%"></div></div>';
  html += '<div class="cx-slider-labels">';
  ['low', 'med', 'high'].forEach(function(s) {
    html += '<span class="cx-slider-label' + (s === currentSize ? ' cx-slider-label-active' : '') + '" data-action="setTextSize" data-size="' + s + '">' + s.toUpperCase() + '</span>';
  });
  html += '</div></div>';
  html += '<div class="cx-preview-pill"><span style="font-family:var(--ff-heading);font-size:var(--fs-lg)">Aa</span> \u2014 <span style="font-size:var(--fs-sm)">This is how text will look</span></div>';
  html += '</div></div>';

  // GitHub Sync
  html += '<div class="cx-settings-section"><div class="cx-section-title">GitHub Sync</div><div class="cx-card" style="padding:var(--sp-16)">';
  if (hasGitHub) {
    html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">';
    html += '<span class="cx-sync-badge cx-sync-badge-connected">' + cx('check') + ' Connected</span>';
    html += '</div>';
    html += '<div class="cx-settings-hint" style="margin-bottom:var(--sp-12)">Repository: ' + escHtml(repoUrl) + '</div>';
    var pending = store._wal.filter(function(e) { return e.status === 'pending' || e.status === 'failed'; }).length;
    if (pending > 0) {
      html += '<div class="cx-settings-hint" style="color:var(--warning)">' + pending + ' pending change' + (pending !== 1 ? 's' : '') + '</div>';
    }
    html += '<div style="display:flex;gap:var(--sp-8);margin-top:var(--sp-12)">';
    html += '<button class="cx-btn-secondary cx-btn-sm" data-action="syncNow">' + cx('refresh') + ' Sync Now</button>';
    html += '<button class="cx-btn-secondary cx-btn-sm" data-action="disconnectGitHub">Disconnect</button>';
    html += '</div>';
  } else {
    html += '<div style="display:flex;align-items:center;gap:var(--sp-8);margin-bottom:var(--sp-12)">' + cx('github');
    html += '<div><div class="cx-settings-label">Connect GitHub</div><div class="cx-settings-hint">Sync data to a repository for backup and cross-device access</div></div></div>';
    html += renderTextField('settings-repo', 'Repository URL', '', { placeholder: 'owner/repo or https://github.com/owner/repo' });
    html += renderTextField('settings-token', 'Personal Access Token', '', { placeholder: 'ghp_...', type: 'password' });
    html += '<div class="cx-settings-hint" style="margin-bottom:var(--sp-12)">Token needs repo Contents read/write permission</div>';
    html += '<button class="cx-btn-primary" data-action="validateAndSaveGitHub">' + cx('check') + ' Connect</button>';
    html += '<div id="github-validation-status"></div>';
  }
  html += '</div></div>';

  // Data
  html += '<div class="cx-settings-section"><div class="cx-section-title">Data</div><div class="cx-card">';
  html += '<div class="cx-settings-row" data-action="openSnippetImport"><div class="cx-settings-left">' + cx('download') + '<div><div class="cx-settings-label">Import Aurelius Snippet</div><div class="cx-settings-hint">Paste JSON from build sessions</div></div></div></div>';
  html += '<div class="cx-settings-row" data-action="exportData"><div class="cx-settings-left">' + cx('download') + '<div><div class="cx-settings-label">Export Data</div><div class="cx-settings-hint">Download as JSON</div></div></div></div>';
  html += '</div></div>';

  // About
  html += '<div class="cx-settings-section"><div class="cx-section-title">About</div><div class="cx-card">';
  html += '<div class="cx-settings-row"><div class="cx-settings-left">' + cx('info') + '<div><div class="cx-settings-label">Codex v' + escHtml(CODEX_VERSION) + '</div><div class="cx-settings-hint">The builder who journals</div></div></div></div>';
  html += '</div></div>';

  vc.innerHTML = html;
  initTextSizeSlider();
}

function initTextSizeSlider() {
  var track = document.getElementById('cxSliderTrack');
  var thumb = document.getElementById('cxSliderThumb');
  if (!track || !thumb) return;

  function posToSize(x) {
    var rect = track.getBoundingClientRect();
    var pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    return pct < 25 ? 'low' : pct < 75 ? 'med' : 'high';
  }
  track.addEventListener('click', function(e) { applyTextSize(posToSize(e.clientX)); });
  var dragging = false;
  thumb.addEventListener('pointerdown', function(e) { dragging = true; thumb.setPointerCapture(e.pointerId); });
  document.addEventListener('pointermove', function(e) { if (dragging) applyTextSize(posToSize(e.clientX)); });
  document.addEventListener('pointerup', function() { dragging = false; });
}

function applyTextSize(size) {
  if (!TEXT_SIZES[size]) return;
  document.documentElement.style.setProperty('--fs-base', TEXT_SIZES[size]);
  localStorage.setItem(KEYS.TEXT_SIZE, size);
  var fill = document.getElementById('cxSliderFill');
  var thumb = document.getElementById('cxSliderThumb');
  if (fill) fill.style.width = TEXT_SIZE_POS[size] + '%';
  if (thumb) thumb.style.left = TEXT_SIZE_POS[size] + '%';
  var labels = document.querySelectorAll('.cx-slider-label');
  for (var i = 0; i < labels.length; i++) labels[i].classList.toggle('cx-slider-label-active', labels[i].dataset.size === size);
}

/* ============================================================
   PHASE 2: Onboarding Wizard (4 steps)
   ============================================================ */

var _wizardStep = 1;

function renderWizard() {
  var vc = document.getElementById('viewContainer');
  if (!vc) return;
  var steps = [null, renderWizardWelcome, renderWizardGitHub, renderWizardTheme, renderWizardDone];
  if (_wizardStep < 1 || _wizardStep > 4) _wizardStep = 1;
  vc.innerHTML = steps[_wizardStep]();
}

function renderWizardWelcome() {
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('book') + '</div>'
    + '<h1 class="cx-wizard-title">Welcome to Codex</h1>'
    + '<p class="cx-wizard-subtitle">The project library that remembers everything.</p>'
    + '<p class="cx-wizard-body">Codex tracks your volumes, chapters, canons, and decisions across every build session. '
    + 'Connect GitHub for cross-device sync, or use it locally.</p>'
    + '<div class="cx-wizard-progress">Step 1 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardNext">Get Started</button>'
    + '</div>';
}

function renderWizardGitHub() {
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('github') + '</div>'
    + '<h1 class="cx-wizard-title">Connect GitHub</h1>'
    + '<p class="cx-wizard-subtitle">Optional \u2014 sync your library to a repository for backup and cross-device access.</p>'
    + '<div class="cx-wizard-form">'
    + renderTextField('wizard-repo', 'Repository URL', '', { placeholder: 'owner/repo or https://github.com/owner/repo' })
    + renderTextField('wizard-token', 'Personal Access Token', '', { placeholder: 'ghp_...', type: 'password' })
    + '<div class="cx-settings-hint" style="margin-bottom:var(--sp-16)">Create a fine-grained token with Contents read/write on the target repo.</div>'
    + '<div id="wizard-validation-status"></div>'
    + '</div>'
    + '<div class="cx-wizard-progress">Step 2 of 4</div>'
    + '<div class="cx-wizard-actions">'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardValidateGitHub">' + cx('check') + ' Connect</button>'
    + '<button class="cx-btn-secondary cx-wizard-btn" data-action="wizardSkipGitHub">Skip \u2014 use locally</button>'
    + '</div></div>';
}

function renderWizardTheme() {
  var current = localStorage.getItem(KEYS.THEME) || 'dark';
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + (current === 'light' ? cx('sun') : cx('moon')) + '</div>'
    + '<h1 class="cx-wizard-title">Choose Your Theme</h1>'
    + '<div class="cx-wizard-theme-options">'
    + '<div class="cx-wizard-theme-card' + (current === 'light' ? ' cx-wizard-theme-active' : '') + '" data-action="wizardSelectTheme" data-value="light">'
    + cx('sun') + '<span>Light</span></div>'
    + '<div class="cx-wizard-theme-card' + (current === 'dark' ? ' cx-wizard-theme-active' : '') + '" data-action="wizardSelectTheme" data-value="dark">'
    + cx('moon') + '<span>Dark</span></div>'
    + '</div>'
    + '<div class="cx-wizard-progress">Step 3 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardThemeNext">Continue</button>'
    + '</div>';
}

function renderWizardDone() {
  var hasGitHub = !!localStorage.getItem(KEYS.REPO_URL);
  return '<div class="cx-wizard">'
    + '<div class="cx-wizard-icon">' + cx('check') + '</div>'
    + '<h1 class="cx-wizard-title">You\u2019re All Set</h1>'
    + '<p class="cx-wizard-subtitle">' + (hasGitHub
      ? 'Connected to GitHub. Your library will sync automatically.'
      : 'Running locally. You can connect GitHub anytime from Settings.') + '</p>'
    + '<div class="cx-wizard-progress">Step 4 of 4</div>'
    + '<button class="cx-btn-primary cx-wizard-btn" data-action="wizardFinish">Open Codex</button>'
    + '</div>';
}
