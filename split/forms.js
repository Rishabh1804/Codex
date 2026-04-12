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
    try { store.deleteChapter(volumeId, chapterId); showToast('Chapter deleted', 'success'); closeOverlay(); closeConfirmDialog(); renderCurrentView(); }
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
