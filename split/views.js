/* CODEX — Views (from spec CODEBASE_VIEWS) */

/* --- Dashboard --- */
function renderDashboard() {
  var vc = document.getElementById('viewContainer');
  var snap = store.getSnapshot();
  var html = renderConnectGitHubCta();

  var hasAny = false;
  SHELF_ORDER.forEach(function(shelf) {
    var vols = snap.volumes.filter(function(v) { return v.shelf === shelf; });
    if (vols.length === 0) return;
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
      if (meta.length > 0) html += '<div class="cx-card-meta">' + cx('clock') + ' ' + escHtml(meta.join(' · ')) + '</div>';
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

/* --- Volume Detail --- */
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
      if (meta.length > 0) html += '<div class="cx-chapter-meta">' + escHtml(meta.join(' · ')) + '</div>';
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
        + '<div class="cx-timeline-text">' + escHtml(SHELF_LABELS[sh.shelf] || sh.shelf) + (sh.reason ? ' — ' + escHtml(sh.reason) : '') + '</div>'
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
  html += '<div class="cx-todo-meta">' + escHtml(meta.join(' · ')) + '</div>';
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

/* --- Settings --- */
function renderSettings() {
  var vc = document.getElementById('viewContainer');
  var currentTheme = localStorage.getItem(KEYS.THEME) || 'dark';
  var currentSize = localStorage.getItem(KEYS.TEXT_SIZE) || 'med';
  var isLight = currentTheme === 'light';
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
  ['low','med','high'].forEach(function(s) {
    html += '<span class="cx-slider-label' + (currentSize === s ? ' cx-slider-label-active' : '') + '" data-action="setTextSize" data-size="' + s + '">' + s.toUpperCase() + '</span>';
  });
  html += '</div></div>';
  html += '<div class="cx-preview-pill"><span style="font-family:var(--ff-heading);font-size:var(--fs-lg)">Aa</span> — <span style="font-size:var(--fs-sm)">This is how text will look</span></div>';
  html += '</div></div>';

  // Data
  html += '<div class="cx-settings-section"><div class="cx-section-title">Data</div><div class="cx-card">';
  html += '<div class="cx-settings-row"><div class="cx-settings-left">' + cx('lock') + '<div><div class="cx-settings-label">GitHub Sync</div><div class="cx-settings-hint">Coming in Phase 2</div></div></div></div>';
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
