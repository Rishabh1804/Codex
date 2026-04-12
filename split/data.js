/* CODEX — Data Layer (from spec CODEBASE_REFERENCE) */

var CODEX_VERSION = '0.1.0';
var CODEX_SCHEMA_VERSION = 1;
var OVERLAY_ANIM_MS = 300;
var TEXT_SIZES = { low: '12px', med: '14px', high: '17px' };
var TEXT_SIZE_POS = { low: 0, med: 50, high: 100 };
var SHELF_ORDER = ['active', 'paused', 'archived', 'abandoned'];
var SHELF_LABELS = { active: 'Active', paused: 'Paused', archived: 'Archived', abandoned: 'Abandoned' };
var CHAPTER_STATUSES = ['planned', 'in-progress', 'paused', 'complete', 'abandoned'];
var CANON_CATEGORIES = ['design', 'architecture', 'process'];
var TODO_STATUSES = ['open', 'resolved'];

var KEYS = {
  THEME: 'codex-theme', TEXT_SIZE: 'codex-textSize', TOKEN: 'codex-token',
  REPO_URL: 'codex-repo-url', DISPLAY_NAME: 'codex-display-name',
  DEFAULT_SHELF: 'codex-default-shelf', DEFAULT_BRANCH: 'codex-default-branch',
  CACHE_VOLUMES: 'codex-cache-volumes', CACHE_CANONS: 'codex-cache-canons',
  CACHE_JOURNAL: 'codex-cache-journal', SHA_VOLUMES: 'codex-sha-volumes',
  SHA_CANONS: 'codex-sha-canons', SHA_JOURNAL: 'codex-sha-journal',
  WAL: 'codex-wal', ERROR_LOG: 'codex-errorlog',
  VISIT_COUNT: 'codex-visits', WIZARD_DONE: 'codex-wizard-done'
};

/* --- Utilities (exact from spec) --- */
function escHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escAttr(str) { return escHtml(str); }

function localDateStr(date) {
  var d = date || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function parseDateSafe(str) {
  if (!str) return null;
  var parts = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!parts) return null;
  return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
}

function formatRelativeTime(dateStr) {
  var now = new Date();
  var then = parseDateSafe(dateStr);
  if (!then) return dateStr || '';
  var diffMs = now - then;
  var diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return diffDays + ' days ago';
  return formatAbsoluteDate(dateStr);
}

function formatAbsoluteDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-').map(Number);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return months[parts[1]-1] + ' ' + parts[2] + ', ' + parts[0];
}

function daysAgo(n) {
  var d = new Date(); d.setDate(d.getDate() - n);
  return localDateStr(d);
}

function autoSlug(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 30).replace(/-$/g, '');
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  try { if (typeof structuredClone === 'function') return structuredClone(obj); } catch(e) {}
  return JSON.parse(JSON.stringify(obj));
}

function filterActive(arr) {
  if (!arr) return [];
  return arr.filter(function(item) { return !item._deleted; });
}

function generateId(prefix, existingIds) {
  var max = 0;
  var re = new RegExp('^' + prefix + '-(\\d{4})');
  for (var i = 0; i < existingIds.length; i++) {
    var m = existingIds[i].match(re);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return prefix + '-' + String(max + 1).padStart(4, '0');
}

function escapeRegex(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function highlightMatch(text, query) {
  if (!text || !query) return escHtml(text || '');
  var escaped = escHtml(text);
  var escapedQuery = escHtml(query);
  var regex = new RegExp('(' + escapeRegex(escapedQuery) + ')', 'gi');
  return escaped.replace(regex, '<mark class="cx-highlight">$1</mark>');
}

function buildSnippet(text, query, contextChars) {
  contextChars = contextChars || 40;
  if (!text) return '';
  var lowerText = text.toLowerCase();
  var lowerQuery = query.toLowerCase();
  var idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return escHtml(text.substring(0, 80)) + '…';
  var start = Math.max(0, idx - contextChars);
  var end = Math.min(text.length, idx + query.length + contextChars);
  var snippet = '';
  if (start > 0) snippet += '…';
  snippet += text.substring(start, end);
  if (end < text.length) snippet += '…';
  return highlightMatch(snippet, query);
}

function copyToClipboard(text, successMessage) {
  try {
    navigator.clipboard.writeText(text).then(function() {
      showToast(successMessage, 'success');
    }).catch(function() { _fallbackCopy(text, successMessage); });
  } catch(e) { _fallbackCopy(text, successMessage); }
}
function _fallbackCopy(text, msg) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); showToast(msg, 'success'); }
  catch(e) { showToast('Copy failed', 'error'); }
  document.body.removeChild(ta);
}

/* --- Error Logging --- */
function logError(category, message, detail) {
  try {
    var log = JSON.parse(localStorage.getItem(KEYS.ERROR_LOG) || '[]');
    log.unshift({ ts: new Date().toISOString(), cat: category, msg: message, detail: detail || null });
    if (log.length > 50) log = log.slice(0, 50);
    localStorage.setItem(KEYS.ERROR_LOG, JSON.stringify(log));
  } catch(e) { console.error('logError failed:', e); }
}

function safeParseLocalStorage(key) {
  try { var raw = localStorage.getItem(key); if (!raw) return null; return JSON.parse(raw); }
  catch(e) { localStorage.removeItem(key); return null; }
}

/* --- Store --- */
var store = {
  volumes: [],
  canons: [],
  rejections: [],
  journal: [],
  _wal: [],
  _listeners: [],
  _walListeners: [],
  _overlayCount: 0,

  onChange: function(fn) { store._listeners.push(fn); },
  onWalChange: function(fn) { store._walListeners.push(fn); },

  _fireChange: function() {
    if (_initializing || _isRendering) return;
    store._cacheToLocalStorage();
    for (var i = 0; i < store._listeners.length; i++) {
      try { store._listeners[i](); } catch(e) { logError('onChange', e.message); }
    }
  },

  _cacheToLocalStorage: function() {
    try {
      localStorage.setItem(KEYS.CACHE_VOLUMES, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, volumes: store.volumes }));
      localStorage.setItem(KEYS.CACHE_CANONS, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, canons: store.canons, rejected_alternatives: store.rejections }));
      localStorage.setItem(KEYS.CACHE_JOURNAL, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, journal: store.journal }));
    } catch(e) { logError('cache', 'Cache write failed', e.message); }
  },

  getSnapshot: function() { return deepClone({ volumes: store.volumes, canons: store.canons, rejections: store.rejections, journal: store.journal }); },

  /* --- Volume --- */
  addVolume: function(vol) {
    if (!vol.id || !vol.name) throw new Error('Volume requires id and name');
    if (store.volumes.some(function(v) { return v.id === vol.id; })) throw new Error('Duplicate volume ID: ' + vol.id);
    var entry = { id: vol.id, name: vol.name, shelf: vol.shelf || 'active', description: vol.description || '',
      domain_color: vol.domain_color || '#8B7355', tags: vol.tags || [], repo: vol.repo || null,
      current_phase: vol.current_phase || '', chapters: [], todos: [],
      shelf_history: [{ shelf: vol.shelf || 'active', date: localDateStr(), reason: 'Created' }] };
    store.volumes.push(entry);
    store._fireChange();
    return entry;
  },
  updateVolume: function(id, patch) {
    var vol = store.volumes.find(function(v) { return v.id === id; });
    if (!vol) throw new Error('Volume not found: ' + id);
    ['name','description','domain_color','tags','repo','current_phase'].forEach(function(k) { if (patch.hasOwnProperty(k)) vol[k] = patch[k]; });
    store._fireChange();
  },
  deleteVolume: function(id) {
    var vol = store.volumes.find(function(v) { return v.id === id; });
    if (!vol) throw new Error('Volume not found');
    var active = filterActive(vol.chapters || []);
    if (active.length > 0 || (vol.todos || []).length > 0) throw new Error('Remove chapters and TODOs first');
    store.volumes = store.volumes.filter(function(v) { return v.id !== id; });
    store._fireChange();
  },
  transitionShelf: function(volumeId, newShelf, reason) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    if (SHELF_ORDER.indexOf(newShelf) === -1) throw new Error('Invalid shelf');
    if (newShelf === 'abandoned' && !reason) throw new Error('Abandoned requires a reason');
    vol.shelf = newShelf;
    if (!vol.shelf_history) vol.shelf_history = [];
    vol.shelf_history.push({ shelf: newShelf, date: localDateStr(), reason: reason || null });
    store._fireChange();
  },

  /* --- Chapter --- */
  addChapter: function(volumeId, ch) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    if (!ch.id || !ch.name) throw new Error('Chapter requires id and name');
    if ((vol.chapters || []).some(function(c) { return c.id === ch.id; })) throw new Error('Duplicate chapter');
    var entry = { id: ch.id, name: ch.name, status: ch.status || 'planned', started: ch.started || null,
      completed: null, ended: null, summary: ch.summary || '', spec_url: ch.spec_url || null, _deleted: false, _deleted_date: null };
    if (entry.status === 'in-progress' && !entry.started) entry.started = localDateStr();
    if (entry.status === 'complete') entry.completed = localDateStr();
    if (!vol.chapters) vol.chapters = [];
    vol.chapters.push(entry);
    store._fireChange();
    return entry;
  },
  updateChapter: function(volumeId, chapterId, patch) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    var ch = (vol.chapters || []).find(function(c) { return c.id === chapterId; });
    if (!ch) throw new Error('Chapter not found');
    ['name','status','started','summary','spec_url'].forEach(function(k) { if (patch.hasOwnProperty(k)) ch[k] = patch[k]; });
    if (patch.status === 'complete' && !ch.completed) ch.completed = localDateStr();
    if (patch.status === 'abandoned' && !ch.ended) ch.ended = localDateStr();
    if (patch.status === 'in-progress' && !ch.started) ch.started = localDateStr();
    if (patch.status && patch.status !== 'complete') ch.completed = null;
    if (patch.status && patch.status !== 'abandoned') ch.ended = null;
    store._fireChange();
  },
  deleteChapter: function(volumeId, chapterId) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    var ch = (vol.chapters || []).find(function(c) { return c.id === chapterId; });
    if (!ch) throw new Error('Chapter not found');
    ch._deleted = true; ch._deleted_date = localDateStr();
    store._fireChange();
  },

  /* --- TODO --- */
  addTodo: function(volumeId, todo) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    if (!todo.id || !todo.text) throw new Error('TODO requires id and text');
    var entry = { id: todo.id, text: todo.text, status: todo.status || 'open', chapter: todo.chapter || null,
      created: todo.created || localDateStr(), resolved: null, source_session: todo.source_session || null };
    if (!vol.todos) vol.todos = [];
    vol.todos.push(entry);
    store._fireChange();
    return entry;
  },
  updateTodo: function(volumeId, todoId, patch) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    var todo = (vol.todos || []).find(function(t) { return t.id === todoId; });
    if (!todo) throw new Error('TODO not found');
    if (patch.hasOwnProperty('text')) todo.text = patch.text;
    if (patch.hasOwnProperty('chapter')) todo.chapter = patch.chapter;
    if (patch.hasOwnProperty('status')) {
      todo.status = patch.status;
      if (patch.status === 'resolved' && !todo.resolved) todo.resolved = localDateStr();
      if (patch.status === 'open') todo.resolved = null;
    }
    store._fireChange();
  },
  deleteTodo: function(volumeId, todoId) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    vol.todos = (vol.todos || []).filter(function(t) { return t.id !== todoId; });
    store._fireChange();
  },

  /* --- Canon (stub for Phase 3) --- */
  addCanon: function(c) { if (!c.id || !c.title) throw new Error('Canon requires id and title'); store.canons.push(c); store._fireChange(); },

  /* --- Helpers --- */
  getScopeOptions: function() {
    var opts = ['global'];
    store.volumes.forEach(function(v) { opts.push(v.id); });
    return opts;
  }
};

function populateStore(volResult, canonResult, journalResult) {
  if (volResult && volResult.data) {
    store.volumes = volResult.data.volumes || [];
    if (volResult.sha) localStorage.setItem(KEYS.SHA_VOLUMES, volResult.sha);
  }
  if (canonResult && canonResult.data) {
    store.canons = canonResult.data.canons || [];
    store.rejections = canonResult.data.rejected_alternatives || [];
    if (canonResult.sha) localStorage.setItem(KEYS.SHA_CANONS, canonResult.sha);
  }
  if (journalResult && journalResult.data) {
    store.journal = journalResult.data.journal || [];
    if (journalResult.sha) localStorage.setItem(KEYS.SHA_JOURNAL, journalResult.sha);
  }
}
