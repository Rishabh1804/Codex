/* CODEX — Forms (from spec CODEBASE_VIEWS) */

/* --- Volume Create/Edit --- */
function openCreateVolume() { openVolumeForm(null); }
function openEditVolume(volumeId) { openVolumeForm(volumeId); }

function openVolumeForm(volumeId) {
  var isEdit = !!volumeId;
  var vol = isEdit ? store.volumes.find(function(v) { return v.id === volumeId; }) : null;

  var body = '';
  body += renderTextField('name', 'Name', vol ? vol.name : '', { required: true, placeholder: 'e.g. SproutLab' });
  body += renderTextarea('description', 'Description', vol ? vol.description : '', { placeholder: 'What is this project about?' });
  body += renderTextField('current_phase', 'Current Phase', vol ? vol.current_phase : '', { placeholder: 'e.g. Phase 1 — Core build' });
  body += renderColorField('domain_color', 'Domain Color', vol ? vol.domain_color : '#8B7355');
  body += renderTextField('tags', 'Tags (comma-separated)', vol ? (vol.tags || []).join(', ') : '', { placeholder: 'pwa, health, tracking' });
  body += renderTextField('repo', 'Repo', vol ? vol.repo || '' : '', { placeholder: 'owner/repo' });

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleSaveVolume" data-id="' + escAttr(volumeId || '') + '" class="cx-btn-primary" style="flex:1">'
    + cx('check') + ' ' + (isEdit ? 'Save' : 'Create') + '</button>';

  openOverlay(isEdit ? 'Edit Volume' : 'New Volume', body, footer);
  setTimeout(function() { var el = document.getElementById('field-name'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
}

function handleSaveVolume(volumeId) {
  var name = (document.getElementById('field-name') || {}).value || '';
  var desc = (document.getElementById('field-description') || {}).value || '';
  var phase = (document.getElementById('field-current_phase') || {}).value || '';
  var color = (document.getElementById('field-domain_color') || {}).value || '#8B7355';
  var tagsStr = (document.getElementById('field-tags') || {}).value || '';
  var repo = (document.getElementById('field-repo') || {}).value || '';

  name = name.trim();
  if (!name) { showToast('Name is required', 'error'); return; }

  var tags = tagsStr.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t.length > 0; });

  try {
    if (volumeId) {
      store.updateVolume(volumeId, { name: name, description: desc, current_phase: phase, domain_color: color, tags: tags, repo: repo || null });
      showToast('Volume updated', 'success');
    } else {
      var id = autoSlug(name);
      if (store.volumes.find(function(v) { return v.id === id; })) { showToast('Volume with this name already exists', 'error'); return; }
      store.addVolume({ id: id, name: name, description: desc, current_phase: phase, domain_color: color, tags: tags, repo: repo || null });
      showToast('Volume created', 'success');
    }
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

/* --- Chapter Create/Edit --- */
function openAddChapter(volumeId) { openChapterForm(volumeId, null); }
function openEditChapter(volumeId, chapterId) { openChapterForm(volumeId, chapterId); }

function openChapterForm(volumeId, chapterId) {
  var isEdit = !!chapterId;
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (!vol) return;
  var ch = isEdit ? (vol.chapters || []).find(function(c) { return c.id === chapterId; }) : null;

  var statusOpts = CHAPTER_STATUSES.map(function(s) { return { value: s, label: s }; });
  var body = '';
  body += renderTextField('ch_name', 'Name', ch ? ch.name : '', { required: true, placeholder: 'e.g. CareTickets' });
  body += renderSelect('ch_status', 'Status', ch ? ch.status : 'planned', statusOpts);
  body += renderTextarea('ch_summary', 'Summary', ch ? ch.summary : '', { placeholder: 'Brief description' });
  body += renderDateField('ch_started', 'Started', ch ? ch.started || '' : '');
  body += renderTextField('ch_spec_url', 'Spec URL', ch ? ch.spec_url || '' : '', { placeholder: 'https://...' });

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>';
  if (isEdit) {
    footer += '<button data-action="handleDeleteChapter" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(chapterId) + '" class="cx-btn-danger cx-btn-sm">' + cx('trash') + '</button>';
  }
  footer += '<button data-action="handleSaveChapter" data-vol="' + escAttr(volumeId) + '" data-id="' + escAttr(chapterId || '') + '" class="cx-btn-primary" style="flex:1">'
    + cx('check') + ' ' + (isEdit ? 'Save' : 'Add') + '</button>';

  openOverlay(isEdit ? 'Edit Chapter' : 'New Chapter', body, footer);
  setTimeout(function() { var el = document.getElementById('field-ch_name'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
}

function handleSaveChapter(volumeId, chapterId) {
  var name = (document.getElementById('field-ch_name') || {}).value || '';
  var status = (document.getElementById('field-ch_status') || {}).value || 'planned';
  var summary = (document.getElementById('field-ch_summary') || {}).value || '';
  var started = (document.getElementById('field-ch_started') || {}).value || null;
  var specUrl = (document.getElementById('field-ch_spec_url') || {}).value || null;
  name = name.trim();
  if (!name) { showToast('Name is required', 'error'); return; }
  try {
    if (chapterId) {
      store.updateChapter(volumeId, chapterId, { name: name, status: status, summary: summary, started: started, spec_url: specUrl });
      showToast('Chapter updated', 'success');
    } else {
      var id = autoSlug(name);
      store.addChapter(volumeId, { id: id, name: name, status: status, summary: summary, started: started, spec_url: specUrl });
      showToast('Chapter added', 'success');
    }
    closeOverlay(); renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

function handleDeleteChapter(volumeId, chapterId) {
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  var ch = vol ? (vol.chapters || []).find(function(c) { return c.id === chapterId; }) : null;
  if (!ch) return;
  showConfirmDialog('Delete Chapter', 'Delete "' + ch.name + '"? This is a soft delete.', function() {
    try {
      store.deleteChapter(volumeId, chapterId); showToast('Chapter deleted', 'success'); closeOverlay(); closeConfirmDialog();
      if (_currentView === 'chapter-detail') { navigate('#/volume/' + encodeURIComponent(volumeId)); } else { renderCurrentView(); }
    }
    catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* --- TODO Create --- */
function openCreateTodo(volumeId) {
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (!vol) { showToast('Volume not found', 'error'); return; }
  var chapters = filterActive(vol.chapters || []);
  var body = renderTextarea('todo_text', 'TODO', '', { required: true, placeholder: 'What needs to be done?' });
  if (chapters.length > 0) {
    var opts = [{ value: '', label: 'None' }].concat(chapters.map(function(c) { return { value: c.id, label: c.name }; }));
    body += renderSelect('todo_chapter', 'Chapter (optional)', '', opts);
  }
  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleSaveTodo" data-vol="' + escAttr(volumeId) + '" class="cx-btn-primary" style="flex:1">' + cx('check') + ' Add</button>';
  openOverlay('New TODO', body, footer);
  setTimeout(function() { var el = document.getElementById('field-todo_text'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
}

function handleSaveTodo(volumeId) {
  var text = (document.getElementById('field-todo_text') || {}).value || '';
  var chapter = (document.getElementById('field-todo_chapter') || {}).value || null;
  text = text.trim();
  if (!text) { showToast('Text is required', 'error'); return; }
  try {
    var ids = (store.volumes.find(function(v) { return v.id === volumeId; }).todos || []).map(function(t) { return t.id; });
    var id = generateId('todo', ids) + '-' + autoSlug(text).substring(0, 20);
    store.addTodo(volumeId, { id: id, text: text, chapter: chapter || null });
    showToast('TODO added', 'success'); closeOverlay(); renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

/* --- Toggle / Delete TODO --- */
function handleToggleTodo(volumeId, todoId) {
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (!vol) return;
  var todo = (vol.todos || []).find(function(t) { return t.id === todoId; });
  if (!todo) return;
  store.updateTodo(volumeId, todoId, { status: todo.status === 'open' ? 'resolved' : 'open' });
  renderCurrentView();
}

function handleDeleteTodo(volumeId, todoId) {
  showConfirmDialog('Delete TODO', 'Permanently delete this TODO?', function() {
    try { store.deleteTodo(volumeId, todoId); showToast('Deleted', 'success'); closeConfirmDialog(); renderCurrentView(); }
    catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* --- Shelf Transition --- */
function openShelfTransition(volumeId) {
  var vol = store.volumes.find(function(v) { return v.id === volumeId; });
  if (!vol) return;
  var opts = SHELF_ORDER.filter(function(s) { return s !== vol.shelf; }).map(function(s) { return { value: s, label: SHELF_LABELS[s] }; });
  var body = renderSelect('shelf', 'Move to', opts[0].value, opts);
  body += renderTextField('shelf_reason', 'Reason', '', { placeholder: 'Why? (required for Abandoned)' });
  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleConfirmShelfTransition" data-id="' + escAttr(volumeId) + '" class="cx-btn-primary" style="flex:1">' + cx('shelf') + ' Move</button>';
  openOverlay('Move Shelf — ' + vol.name, body, footer);
}

function handleConfirmShelfTransition(volumeId) {
  var shelf = (document.getElementById('field-shelf') || {}).value || '';
  var reason = (document.getElementById('field-shelf_reason') || {}).value || '';
  try {
    store.transitionShelf(volumeId, shelf, reason.trim() || null);
    showToast('Moved to ' + SHELF_LABELS[shelf], 'success');
    closeOverlay(); renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

/* --- Delete Volume --- */
function handleDeleteVolume(volumeId) {
  showConfirmDialog('Delete Volume', 'Remove all chapters and TODOs first, then delete.', function() {
    try { store.deleteVolume(volumeId); showToast('Deleted', 'success'); closeConfirmDialog(); navigate('#/dashboard'); }
    catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* --- FAB Context --- */
function handleFabAction() {
  if (_currentView === 'dashboard') { openCreateVolume(); }
  else if (_currentView === 'volume-detail' && _currentViewParams.id) { openFabChoice(_currentViewParams.id); }
  else if (_currentView === 'todos') { openTodoVolumeChoice(); }
  else if (_currentView === 'journal') { openCreateSession(); }
  else if (_currentView === 'canons') { openCanonFabChoice(); }
}

function openFabChoice(volumeId) {
  var body = '<div style="display:flex;flex-direction:column;gap:var(--sp-8)">';
  body += '<button class="cx-btn-secondary cx-full-width" data-action="fabAddChapter" data-vol="' + escAttr(volumeId) + '">' + cx('bookmark') + ' New Chapter</button>';
  body += '<button class="cx-btn-secondary cx-full-width" data-action="fabAddTodo" data-vol="' + escAttr(volumeId) + '">' + cx('check') + ' New TODO</button>';
  body += '</div>';
  openOverlay('Add to Volume', body, '');
}

function openTodoVolumeChoice() {
  var vols = store.volumes.filter(function(v) { return v.shelf === 'active'; });
  if (vols.length === 0) { showToast('No active volumes', 'warning'); return; }
  var body = '<div style="display:flex;flex-direction:column;gap:var(--sp-8)">';
  vols.forEach(function(v) {
    body += '<button class="cx-btn-secondary cx-full-width" data-action="fabAddTodo" data-vol="' + escAttr(v.id) + '">' + cx('book') + ' ' + escHtml(v.name) + '</button>';
  });
  body += '</div>';
  openOverlay('Add TODO to…', body, '');
}

/* --- Export --- */
function handleExportData() {
  var data = store.getSnapshot();
  data._exported = new Date().toISOString();
  data._version = CODEX_VERSION;
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'codex-export-' + localDateStr() + '.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('Exported', 'success');
}

/* --- Restore from Backup --- */
function openRestoreData() {
  var body = '<p style="color:var(--text-secondary);margin-bottom:var(--sp-12)">Select a Codex JSON export to restore all data. This replaces your current library.</p>';
  body += '<input type="file" id="restoreFileInput" accept=".json,application/json" style="display:none">';
  body += '<button data-action="triggerRestoreFile" class="cx-btn-secondary" style="width:100%;padding:var(--sp-16);margin-bottom:var(--sp-12)">' + cx('download') + ' Choose Backup File</button>';
  body += '<div id="restoreFileStatus" style="color:var(--text-secondary);font-size:var(--fs-sm)"></div>';

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleRestoreData" class="cx-btn-primary" style="flex:1" id="restoreBtn" disabled>' + cx('check') + ' Restore</button>';

  openOverlay('Restore from Backup', body, footer);
  setTimeout(function() {
    var input = document.getElementById('restoreFileInput');
    if (input) input.addEventListener('change', handleRestoreFileSelect);
  }, 50);
}

var _restoreParsed = null;

function triggerRestoreFile() {
  var input = document.getElementById('restoreFileInput');
  if (input) input.click();
}

function handleRestoreFileSelect(e) {
  var file = e.target.files[0];
  if (!file) return;
  var status = document.getElementById('restoreFileStatus');
  var btn = document.getElementById('restoreBtn');
  var reader = new FileReader();
  reader.onload = function(ev) {
    try {
      var data = JSON.parse(ev.target.result);
      if (!data.volumes || !Array.isArray(data.volumes)) {
        if (status) status.innerHTML = '<span style="color:var(--error)">Invalid backup: missing volumes array</span>';
        _restoreParsed = null;
        if (btn) btn.disabled = true;
        return;
      }
      _restoreParsed = data;
      var summary = data.volumes.length + ' volumes, ' + (data.canons || []).length + ' canons, '
        + (data.apocrypha || []).length + ' apocrypha, ' + (data.journal || []).flatMap(function(d) { return d.sessions || []; }).length + ' sessions';
      if (status) status.innerHTML = '<span style="color:var(--success)">' + cx('check') + ' ' + escHtml(file.name) + '</span><br><span style="color:var(--text-tertiary)">' + escHtml(summary) + '</span>';
      if (btn) btn.disabled = false;
    } catch(err) {
      if (status) status.innerHTML = '<span style="color:var(--error)">Invalid JSON: ' + escHtml(err.message) + '</span>';
      _restoreParsed = null;
      if (btn) btn.disabled = true;
    }
  };
  reader.readAsText(file);
}

function handleRestoreData() {
  if (!_restoreParsed) { showToast('Select a backup file first', 'warning'); return; }

  showConfirmDialog('Restore Data', 'This will replace ALL current data with the backup. Are you sure?', function() {
    try {
      store.volumes = _restoreParsed.volumes || [];
      store.canons = _restoreParsed.canons || [];
      store.schisms = _restoreParsed.schisms || [];
      store.apocrypha = _restoreParsed.apocrypha || [];
      store.journal = _restoreParsed.journal || [];
      store._cacheToLocalStorage();
      _restoreParsed = null;
      showToast('Data restored', 'success');
      closeConfirmDialog();
      closeOverlay();
      renderCurrentView();
    } catch(e) { showToast('Restore failed: ' + e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Restore' });
}

/* ============================================================
   PHASE 3: Session Create
   ============================================================ */

function openCreateSession() {
  var vols = filterActive(store.volumes);
  var body = '';
  body += renderDateField('session_date', 'Date', localDateStr(), { required: true });
  body += renderTextarea('session_summary', 'Summary', '', { required: true, placeholder: 'What happened in this session?', rows: 4 });

  // Volume checkboxes
  if (vols.length > 0) {
    body += '<div class="cx-form-group"><label class="cx-form-label">Volumes Touched</label><div class="cx-checkbox-group">';
    vols.forEach(function(v) {
      body += '<label class="cx-checkbox-item"><input type="checkbox" name="session_volumes" value="' + escAttr(v.id) + '"><span>' + escHtml(v.name) + '</span></label>';
    });
    body += '</div></div>';
  }

  body += renderTextField('session_chapters', 'Chapters Touched', '', { placeholder: 'Comma-separated chapter slugs' });
  body += renderTextField('session_decisions', 'Decisions', '', { placeholder: 'Comma-separated (canon IDs or descriptions)' });
  body += '<div style="display:flex;gap:var(--sp-8)">';
  body += renderTextField('session_bugs_found', 'Bugs Found', '', { type: 'number', min: '0' });
  body += renderTextField('session_bugs_fixed', 'Bugs Fixed', '', { type: 'number', min: '0' });
  body += '</div>';
  body += renderTextField('session_duration', 'Duration (minutes)', '', { type: 'number', min: '0' });
  body += renderTextarea('session_handoff', 'Handoff', '', { placeholder: 'What does the next session need to know?', rows: 2 });
  body += renderTextField('session_open_todos', 'Open TODOs (snapshot)', '', { placeholder: 'Comma-separated TODO texts' });

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleSaveSession" class="cx-btn-primary" style="flex:1">' + cx('check') + ' Log Session</button>';
  openOverlay('New Session', body, footer);
}

function handleSaveSession() {
  var date = (document.getElementById('field-session_date') || {}).value || '';
  var summary = (document.getElementById('field-session_summary') || {}).value || '';
  if (!date.trim()) { showToast('Date is required', 'error'); return; }
  if (!summary.trim()) { showToast('Summary is required', 'error'); return; }

  var volumeCheckboxes = document.querySelectorAll('input[name="session_volumes"]:checked');
  var volumes = [];
  for (var i = 0; i < volumeCheckboxes.length; i++) volumes.push(volumeCheckboxes[i].value);

  var chaptersStr = (document.getElementById('field-session_chapters') || {}).value || '';
  var chapters = chaptersStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  var decisionsStr = (document.getElementById('field-session_decisions') || {}).value || '';
  var decisions = decisionsStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  var bugsFound = parseInt((document.getElementById('field-session_bugs_found') || {}).value || '0', 10) || 0;
  var bugsFixed = parseInt((document.getElementById('field-session_bugs_fixed') || {}).value || '0', 10) || 0;
  var duration = parseInt((document.getElementById('field-session_duration') || {}).value || '0', 10) || null;

  var handoff = (document.getElementById('field-session_handoff') || {}).value || '';
  var todosStr = (document.getElementById('field-session_open_todos') || {}).value || '';
  var openTodos = todosStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  try {
    store.addJournalSession(date, {
      summary: summary.trim(),
      volumes_touched: volumes,
      chapters_touched: chapters,
      decisions: decisions,
      bugs_found: bugsFound,
      bugs_fixed: bugsFixed,
      duration_minutes: duration,
      open_todos: openTodos,
      handoff: handoff.trim() || null,
      screenshots: []
    });
    showToast('Session logged', 'success');
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

function handleDeleteSession(date, sessionId) {
  showConfirmDialog('Delete Session', 'Remove this session log?', function() {
    try {
      store.deleteSession(date, sessionId);
      showToast('Session deleted', 'success');
      closeConfirmDialog();
      renderCurrentView();
    } catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* ============================================================
   PHASE 3: Canon Create / Edit
   ============================================================ */

function openCanonFabChoice() {
  var body = '<div style="display:flex;flex-direction:column;gap:var(--sp-8)">';
  body += '<button class="cx-btn-secondary cx-full-width" data-action="openCreateCanon">' + cx('bookmark') + ' New Canon</button>';
  body += '<button class="cx-btn-secondary cx-full-width" data-action="openCreateSchism">' + cx('alert') + ' New Schism</button>';
  body += '</div>';
  openOverlay('Add to Canons', body, '');
}

function openCreateCanon() {
  closeOverlay();
  setTimeout(function() { openCanonForm(null); }, OVERLAY_ANIM_MS + 50);
}

function openEditCanon(canonId) { openCanonForm(canonId); }

function openCanonForm(canonId) {
  var isEdit = !!canonId;
  var canon = isEdit ? store.canons.find(function(c) { return c.id === canonId; }) : null;

  var scopeOpts = [{ value: 'global', label: 'Global' }];
  filterActive(store.volumes).forEach(function(v) {
    scopeOpts.push({ value: v.id, label: v.name });
  });

  var catOpts = CANON_CATEGORIES.map(function(c) { return { value: c, label: c }; });
  var statusOpts = [
    { value: 'active', label: 'Active' },
    { value: 'deprecated', label: 'Deprecated' },
    { value: 'superseded', label: 'Superseded' }
  ];

  var body = '';
  body += renderTextField('canon_title', 'Title', canon ? canon.title : '', { required: true, placeholder: 'e.g. No text-overflow ellipsis' });
  body += renderSelect('canon_scope', 'Scope', canon ? canon.scope : 'global', scopeOpts);
  body += renderSelect('canon_category', 'Category', canon ? canon.category : 'design', catOpts);
  if (isEdit) {
    body += renderSelect('canon_status', 'Status', canon ? canon.status : 'active', statusOpts);
    body += renderTextField('canon_superseded_by', 'Superseded By (canon ID)', canon ? canon.superseded_by || '' : '', { placeholder: 'canon-NNNN-slug' });
  }
  body += renderTextarea('canon_rationale', 'Rationale', canon ? canon.rationale : '', { required: true, placeholder: 'Why does this rule exist?', rows: 4 });
  body += renderTextField('canon_references', 'References', canon ? (canon.references || []).join(', ') : '', { placeholder: 'Comma-separated (e.g. HR-1, HR-7)' });
  body += renderTextField('canon_created', 'Created (YYYY-MM)', canon ? canon.created || '' : localDateStr().substring(0, 7), { placeholder: '2026-04' });

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleSaveCanon" data-id="' + escAttr(canonId || '') + '" class="cx-btn-primary" style="flex:1">'
    + cx('check') + ' ' + (isEdit ? 'Save' : 'Create') + '</button>';

  openOverlay(isEdit ? 'Edit Canon' : 'New Canon', body, footer);
  setTimeout(function() { var el = document.getElementById('field-canon_title'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
}

function handleSaveCanon(canonId) {
  var title = (document.getElementById('field-canon_title') || {}).value || '';
  var scope = (document.getElementById('field-canon_scope') || {}).value || 'global';
  var category = (document.getElementById('field-canon_category') || {}).value || 'design';
  var rationale = (document.getElementById('field-canon_rationale') || {}).value || '';
  var refsStr = (document.getElementById('field-canon_references') || {}).value || '';
  var created = (document.getElementById('field-canon_created') || {}).value || localDateStr().substring(0, 7);

  title = title.trim();
  if (!title) { showToast('Title is required', 'error'); return; }
  if (!rationale.trim()) { showToast('Rationale is required', 'error'); return; }

  var refs = refsStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  try {
    if (canonId) {
      // Edit existing canon
      var canon = store.canons.find(function(c) { return c.id === canonId; });
      if (!canon) { showToast('Canon not found', 'error'); return; }
      var status = (document.getElementById('field-canon_status') || {}).value || 'active';
      var supersededBy = (document.getElementById('field-canon_superseded_by') || {}).value || null;
      if (supersededBy) supersededBy = supersededBy.trim() || null;

      store.updateCanon(canonId, { title: title, scope: scope, category: category, status: status, superseded_by: supersededBy, rationale: rationale.trim(), references: refs, created: created });
      showToast('Canon updated', 'success');
    } else {
      // Create new canon
      var allIds = store.canons.map(function(c) { return c.id; });
      var id = generateId('canon', allIds) + '-' + autoSlug(title).substring(0, 20);
      var newCanon = {
        id: id, scope: scope, category: category, title: title,
        rationale: rationale.trim(), created: created, status: 'active',
        superseded_by: null, references: refs, _deleted: false, _deleted_date: null
      };
      store.addCanon(newCanon);
      showToast('Canon created', 'success');
    }
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

function handleDeleteCanon(canonId) {
  var canon = store.canons.find(function(c) { return c.id === canonId; });
  if (!canon) return;
  // Check if anything supersedes this
  var refs = store.canons.filter(function(c) { return c.superseded_by === canonId && !c._deleted; });
  var msg = 'Soft-delete "' + canon.title + '"?';
  if (refs.length > 0) msg += ' Warning: ' + refs.length + ' canon(s) reference this as superseded_by.';
  showConfirmDialog('Delete Canon', msg, function() {
    try {
      store.deleteCanon(canonId);
      showToast('Canon deleted', 'success');
      closeConfirmDialog();
      navigate('#/canons');
    } catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* ============================================================
   Apocrypha Edit / Delete
   ============================================================ */

function openEditApocryphon(apoId) {
  var apo = store.apocrypha.find(function(a) { return a.id === apoId; });
  if (!apo) { showToast('Apocryphon not found', 'error'); return; }

  var statusOpts = [
    { value: 'foretold', label: 'Foretold' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'forgotten', label: 'Forgotten' }
  ];

  var body = '';
  body += renderTextField('apo_title', 'Title', apo.title, { required: true });
  body += renderSelect('apo_status', 'Status', apo.status, statusOpts);
  body += renderTextarea('apo_narrative', 'Narrative', apo.narrative || '', { rows: 10, placeholder: 'The myth, the prophecy, the legend...' });
  body += renderTextField('apo_volumes', 'Volumes', (apo.volumes || []).join(', '), { placeholder: 'Comma-separated volume IDs' });
  body += renderTextField('apo_date', 'Date', apo.date || '', { placeholder: 'YYYY-MM-DD' });

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="handleSaveApocryphon" data-id="' + escAttr(apoId) + '" class="cx-btn-primary" style="flex:1">'
    + cx('check') + ' Save</button>';

  openOverlay('Edit Apocryphon', body, footer);
  setTimeout(function() { var el = document.getElementById('field-apo_title'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
}

function handleSaveApocryphon(apoId) {
  var title = (document.getElementById('field-apo_title') || {}).value || '';
  var status = (document.getElementById('field-apo_status') || {}).value || 'foretold';
  var narrative = (document.getElementById('field-apo_narrative') || {}).value || '';
  var volsStr = (document.getElementById('field-apo_volumes') || {}).value || '';
  var date = (document.getElementById('field-apo_date') || {}).value || '';

  title = title.trim();
  if (!title) { showToast('Title is required', 'error'); return; }

  var volumes = volsStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  try {
    store.updateApocryphon(apoId, { title: title, status: status, narrative: narrative.trim(), volumes: volumes, date: date || localDateStr() });
    showToast('Apocryphon updated', 'success');
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

function handleDeleteApocryphon(apoId) {
  var apo = store.apocrypha.find(function(a) { return a.id === apoId; });
  if (!apo) return;
  showConfirmDialog('Delete Apocryphon', 'Soft-delete "' + apo.title + '"? It will appear in Trash.', function() {
    try {
      store.deleteApocryphon(apoId);
      showToast('Apocryphon deleted', 'success');
      closeConfirmDialog();
      renderCurrentView();
    } catch(e) { showToast(e.message, 'error'); closeConfirmDialog(); }
  }, { danger: true, label: 'Delete' });
}

/* ============================================================
   PHASE 3: Schism Create
   ============================================================ */

function openCreateSchism() {
  closeOverlay();
  setTimeout(function() {
    var vols = filterActive(store.volumes);
    var body = '';
    body += renderTextField('rej_rejected', 'Rejected Option', '', { required: true, placeholder: 'What was rejected?' });
    body += renderTextField('rej_chosen', 'Chosen Instead', '', { required: true, placeholder: 'What was chosen?' });
    body += renderTextarea('rej_reason', 'Reason', '', { required: true, placeholder: 'Why was this rejected?', rows: 3 });
    body += renderTextField('rej_context', 'Context', '', { placeholder: 'e.g. Today So Far card design' });
    body += renderTextField('rej_volumes', 'Volumes (comma-separated IDs)', '', { placeholder: 'sproutlab, codex' });
    body += renderDateField('rej_date', 'Date', localDateStr());
    body += renderTextField('rej_canon_id', 'Linked Canon (optional)', '', { placeholder: 'canon-NNNN-slug' });

    var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
      + '<button data-action="handleSaveSchism" class="cx-btn-primary" style="flex:1">' + cx('check') + ' Add</button>';
    openOverlay('New Schism', body, footer);
    setTimeout(function() { var el = document.getElementById('field-rej_rejected'); if (el) el.focus(); }, OVERLAY_ANIM_MS);
  }, OVERLAY_ANIM_MS + 50);
}

function handleSaveSchism() {
  var rejected = (document.getElementById('field-rej_rejected') || {}).value || '';
  var chosen = (document.getElementById('field-rej_chosen') || {}).value || '';
  var reason = (document.getElementById('field-rej_reason') || {}).value || '';
  var context = (document.getElementById('field-rej_context') || {}).value || '';
  var volumesStr = (document.getElementById('field-rej_volumes') || {}).value || '';
  var date = (document.getElementById('field-rej_date') || {}).value || localDateStr();
  var canonId = (document.getElementById('field-rej_canon_id') || {}).value || null;

  rejected = rejected.trim(); chosen = chosen.trim(); reason = reason.trim();
  if (!rejected) { showToast('Rejected option is required', 'error'); return; }
  if (!chosen) { showToast('Chosen option is required', 'error'); return; }
  if (!reason) { showToast('Reason is required', 'error'); return; }

  var volumes = volumesStr.split(',').map(function(s) { return s.trim(); }).filter(Boolean);

  try {
    var allIds = store.schisms.map(function(r) { return r.id; });
    var id = generateId('rej', allIds) + '-' + autoSlug(rejected).substring(0, 20);
    store.addSchism({
      id: id, context: context.trim() || null, volumes: volumes,
      rejected: rejected, chosen: chosen, reason: reason,
      date: date, canon_id: (canonId && canonId.trim()) || null
    });
    showToast('Schism recorded', 'success');
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast(e.message, 'error'); }
}

/* ============================================================
   PHASE 3: Copy Canon Helpers
   ============================================================ */

function handleCopyCanonId(canonId) {
  copyToClipboard(canonId, 'Canon ID copied');
}

function handleCopyCanonJson(canonId) {
  var canon = store.canons.find(function(c) { return c.id === canonId; });
  if (!canon) return;
  var copy = deepClone(canon);
  delete copy._deleted;
  delete copy._deleted_date;
  copyToClipboard(JSON.stringify(copy, null, 2), 'Canon JSON copied');
}

/* ============================================================
   PHASE 3: Snippet Import
   ============================================================ */

var _snippetParsed = null;

function openSnippetImport() {
  _snippetParsed = null;
  var body = '<p style="font-size:var(--fs-xs);color:var(--text-secondary);margin-bottom:var(--sp-12)">Paste an Aurelius JSON snippet from a build session.</p>';
  body += '<textarea id="snippetInput" class="cx-form-textarea cx-snippet-input" rows="8" placeholder="Paste JSON here\u2026"></textarea>';
  body += '<div id="snippetPreview"></div>';

  var footer = '<button data-action="closeOverlay" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="previewSnippet" class="cx-btn-secondary">' + cx('search') + ' Preview</button>'
    + '<button data-action="importSnippet" class="cx-btn-primary" style="flex:1" disabled id="snippetImportBtn">' + cx('download') + ' Import</button>';
  openOverlay('Import Aurelius Snippet', body, footer);
}

function handlePreviewSnippet() {
  var input = document.getElementById('snippetInput');
  var preview = document.getElementById('snippetPreview');
  var importBtn = document.getElementById('snippetImportBtn');
  if (!input || !preview) return;

  var raw = input.value.trim();
  // Strip code fences
  raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');

  try {
    var parsed = JSON.parse(raw);
    _snippetParsed = parsed;
  } catch(e) {
    preview.innerHTML = '<div class="cx-form-error" style="display:block;margin-top:var(--sp-8)">Invalid JSON: ' + escHtml(e.message) + '</div>';
    if (importBtn) importBtn.disabled = true;
    return;
  }

  if (!_snippetParsed._snippet_version) {
    preview.innerHTML = '<div class="cx-form-error" style="display:block;margin-top:var(--sp-8)">Missing _snippet_version field</div>';
    if (importBtn) importBtn.disabled = true;
    return;
  }

  var html = '<div style="margin-top:var(--sp-12)">';

  // Preview session
  if (_snippetParsed.session) {
    var s = _snippetParsed.session;
    var exists = store.journal.some(function(d) {
      return d.date === s.date && (d.sessions || []).some(function(x) { return x.id === s.id; });
    });
    html += '<div class="cx-preview-item">' + (exists ? '<span class="cx-preview-skip">\u2717</span> Session (exists)' : '<span class="cx-preview-ok">\u2713</span> Session: ' + escHtml(s.date)) + '</div>';
  }

  // Preview canons
  if (_snippetParsed.canons && _snippetParsed.canons.length > 0) {
    _snippetParsed.canons.forEach(function(c) {
      var exists = store.canons.some(function(x) { return x.id === c.id; });
      html += '<div class="cx-preview-item">' + (exists ? '<span class="cx-preview-skip">\u2717</span> Canon ' + escHtml(c.id) + ' (exists)' : '<span class="cx-preview-ok">\u2713</span> Canon: ' + escHtml(c.title || c.id)) + '</div>';
    });
  }

  // Preview schisms
  var _previewSchisms = _snippetParsed.schisms || _snippetParsed.rejections;
  if (_previewSchisms && _previewSchisms.length > 0) {
    _previewSchisms.forEach(function(r) {
      var exists = store.schisms.some(function(x) { return x.id === r.id; });
      html += '<div class="cx-preview-item">' + (exists ? '<span class="cx-preview-skip">\u2717</span> Schism ' + escHtml(r.id) + ' (exists)' : '<span class="cx-preview-ok">\u2713</span> Schism: ' + escHtml(r.rejected || r.id)) + '</div>';
    });
  }

  // Preview todos
  if (_snippetParsed.todos && _snippetParsed.todos.length > 0) {
    _snippetParsed.todos.forEach(function(t) {
      var vol = store.volumes.find(function(v) { return v.id === t.volume; });
      var volName = vol ? vol.name : t.volume;
      html += '<div class="cx-preview-item"><span class="cx-preview-ok">\u2713</span> TODO in ' + escHtml(volName) + ': ' + escHtml(t.todo ? t.todo.text : '?') + '</div>';
    });
  }

  // Preview new_chapters (Phase 5)
  if (_snippetParsed.new_chapters && _snippetParsed.new_chapters.length > 0) {
    _snippetParsed.new_chapters.forEach(function(nc) {
      var pvol = store.volumes.find(function(v) { return v.id === nc.volume; });
      var exists = pvol && (pvol.chapters || []).some(function(c) { return c.id === nc.chapter.id; });
      html += '<div class="cx-preview-item">' + (exists
        ? '<span class="cx-preview-skip">\u2717</span> Chapter ' + escHtml(nc.chapter.name) + ' (exists)'
        : '<span class="cx-preview-ok">\u2713</span> New chapter: ' + escHtml(nc.chapter.name)) + '</div>';
    });
  }

  // Preview chapter_updates
  if (_snippetParsed.chapter_updates && _snippetParsed.chapter_updates.length > 0) {
    _snippetParsed.chapter_updates.forEach(function(cu) {
      var pvol = store.volumes.find(function(v) { return v.id === cu.volume; });
      var pch = pvol ? (pvol.chapters || []).find(function(c) { return c.id === cu.chapter; }) : null;
      html += '<div class="cx-preview-item">' + (pch
        ? '<span class="cx-preview-ok">\u2713</span> Update: ' + escHtml(pch.name)
        : '<span class="cx-preview-skip">\u2717</span> ' + escHtml(cu.chapter) + ' (not found)') + '</div>';
    });
  }

  // Preview canon_updates
  if (_snippetParsed.canon_updates && _snippetParsed.canon_updates.length > 0) {
    _snippetParsed.canon_updates.forEach(function(cu) {
      var pc = store.canons.find(function(c) { return c.id === cu.id; });
      html += '<div class="cx-preview-item">' + (pc
        ? '<span class="cx-preview-ok">\u2713</span> Update canon: ' + escHtml(pc.title || cu.id)
        : '<span class="cx-preview-skip">\u2717</span> Canon ' + escHtml(cu.id) + ' (not found)') + '</div>';
    });
  }

  // Preview todo_updates
  if (_snippetParsed.todo_updates && _snippetParsed.todo_updates.length > 0) {
    _snippetParsed.todo_updates.forEach(function(tu) {
      var tvol = store.volumes.find(function(v) { return v.id === tu.volume; });
      var ttodo = tvol ? (tvol.todos || []).find(function(t) { return t.id === tu.todo; }) : null;
      html += '<div class="cx-preview-item">' + (ttodo
        ? '<span class="cx-preview-ok">\u2713</span> Update TODO: ' + escHtml(ttodo.text || tu.todo)
        : '<span class="cx-preview-skip">\u2717</span> TODO ' + escHtml(tu.todo) + ' (not found)') + '</div>';
    });
  }

  // Preview apocrypha (Phase 5 — upsert)
  if (_snippetParsed.apocrypha && _snippetParsed.apocrypha.length > 0) {
    _snippetParsed.apocrypha.forEach(function(a) {
      var exists = store.apocrypha.some(function(x) { return x.id === a.id; });
      html += '<div class="cx-preview-item">' + (exists
        ? '<span class="cx-preview-ok">\u2713</span> Update apocryphon: ' + escHtml(a.title)
        : '<span class="cx-preview-ok">\u2713</span> Apocryphon: ' + escHtml(a.title)) + '</div>';
    });
  }

  html += '</div>';
  preview.innerHTML = html;
  if (importBtn) importBtn.disabled = false;
}

function handleImportSnippet() {
  if (!_snippetParsed) { showToast('Preview first', 'warning'); return; }
  var counts = { sessions: 0, canons: 0, schisms: 0, todos: 0, newChapters: 0, chapterUpdates: 0, canonUpdates: 0, todoUpdates: 0, apocrypha: 0 };

  try {
    // 1. Session
    if (_snippetParsed.session) {
      var s = _snippetParsed.session;
      var exists = store.journal.some(function(d) {
        return d.date === s.date && (d.sessions || []).some(function(x) { return x.id === s.id; });
      });
      if (!exists) {
        store.addJournalSession(s.date, s);
        counts.sessions++;
      }
    }

    // 2. Canons
    if (_snippetParsed.canons) {
      _snippetParsed.canons.forEach(function(c) {
        var exists = store.canons.some(function(x) { return x.id === c.id; });
        if (!exists) {
          if (!c._deleted) c._deleted = false;
          if (!c._deleted_date) c._deleted_date = null;
          store.addCanon(c);
          counts.canons++;
        }
      });
    }

    // 3. Schisms
    var _importSchisms = _snippetParsed.schisms || _snippetParsed.rejections;
    if (_importSchisms) {
      _importSchisms.forEach(function(r) {
        var exists = store.schisms.some(function(x) { return x.id === r.id; });
        if (!exists) {
          store.addSchism(r);
          counts.schisms++;
        }
      });
    }

    // 4. TODOs
    if (_snippetParsed.todos) {
      _snippetParsed.todos.forEach(function(t) {
        try {
          store.addTodo(t.volume, t.todo);
          counts.todos++;
        } catch(e) { /* skip if volume not found or duplicate */ }
      });
    }

    // 5. New chapters (Phase 5 — before chapter_updates)
    if (_snippetParsed.new_chapters) {
      _snippetParsed.new_chapters.forEach(function(nc) {
        try {
          store.addChapter(nc.volume, nc.chapter);
          counts.newChapters++;
        } catch(e) { /* skip if volume not found or duplicate */ }
      });
    }

    // 6. Chapter updates
    if (_snippetParsed.chapter_updates) {
      _snippetParsed.chapter_updates.forEach(function(cu) {
        try {
          store.updateChapter(cu.volume, cu.chapter, cu.patch);
          counts.chapterUpdates++;
        } catch(e) { /* skip if not found */ }
      });
    }

    // 6b. Canon updates
    if (_snippetParsed.canon_updates) {
      _snippetParsed.canon_updates.forEach(function(cu) {
        try {
          store.updateCanon(cu.id, cu.patch);
          counts.canonUpdates++;
        } catch(e) { /* skip if not found */ }
      });
    }

    // 6c. TODO updates
    if (_snippetParsed.todo_updates) {
      _snippetParsed.todo_updates.forEach(function(tu) {
        try {
          store.updateTodo(tu.volume, tu.todo, tu.patch);
          counts.todoUpdates++;
        } catch(e) { /* skip if not found */ }
      });
    }

    // 7. Apocrypha (Phase 5 — upsert: update if exists, create if not)
    if (_snippetParsed.apocrypha) {
      _snippetParsed.apocrypha.forEach(function(a) {
        var exists = store.apocrypha.some(function(x) { return x.id === a.id; });
        try {
          if (!exists) {
            store.addApocryphon(a);
          } else {
            store.updateApocryphon(a.id, a);
          }
          counts.apocrypha++;
        } catch(e) { /* skip */ }
      });
    }

    var parts = [];
    if (counts.sessions) parts.push(counts.sessions + ' session');
    if (counts.canons) parts.push(counts.canons + ' canon' + (counts.canons > 1 ? 's' : ''));
    if (counts.schisms) parts.push(counts.schisms + ' schism' + (counts.schisms > 1 ? 's' : ''));
    if (counts.todos) parts.push(counts.todos + ' TODO' + (counts.todos > 1 ? 's' : ''));
    if (counts.newChapters) parts.push(counts.newChapters + ' new chapter' + (counts.newChapters > 1 ? 's' : ''));
    if (counts.chapterUpdates) parts.push(counts.chapterUpdates + ' chapter update' + (counts.chapterUpdates > 1 ? 's' : ''));
    if (counts.canonUpdates) parts.push(counts.canonUpdates + ' canon update' + (counts.canonUpdates > 1 ? 's' : ''));
    if (counts.todoUpdates) parts.push(counts.todoUpdates + ' TODO update' + (counts.todoUpdates > 1 ? 's' : ''));
    if (counts.apocrypha) parts.push(counts.apocrypha + ' apocryphon' + (counts.apocrypha > 1 ? ' entries' : ''));

    showToast('Imported: ' + (parts.length > 0 ? parts.join(', ') : 'nothing new'), 'success');
    _snippetParsed = null;
    closeOverlay();
    renderCurrentView();
  } catch(e) { showToast('Import error: ' + e.message, 'error'); }
}
