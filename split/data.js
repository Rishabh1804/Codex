/* CODEX — Data Layer (Phase 5: Chapter Detail + Apocrypha; Phase 1 Lore) */

var CODEX_VERSION = '1.1.0';
var CODEX_SCHEMA_VERSION = 1;
var OVERLAY_ANIM_MS = 300;
var TEXT_SIZES = { low: '12px', med: '14px', high: '17px' };
var TEXT_SIZE_POS = { low: 0, med: 50, high: 100 };
var SHELF_ORDER = ['active', 'paused', 'archived', 'abandoned'];
var SHELF_LABELS = { active: 'Active', paused: 'Paused', archived: 'Archived', abandoned: 'Abandoned' };
var CHAPTER_STATUSES = ['planned', 'in-progress', 'paused', 'complete', 'abandoned'];
var CANON_CATEGORIES = ['design', 'architecture', 'process'];
var TODO_STATUSES = ['open', 'resolved'];
var APOCRYPHA_STATUSES = ['fulfilled', 'foretold', 'forgotten'];
var LORE_CATEGORIES = ['edicts', 'origins', 'cautionary_tales', 'doctrines', 'chronicles'];
var LORE_CATEGORY_LABELS = { edicts: 'Edicts', origins: 'Origins', cautionary_tales: 'Cautionary Tales', doctrines: 'Doctrines', chronicles: 'Chronicles' };
var LORE_CATEGORY_VOICES = {
  edicts: 'We decree X because Y',
  origins: 'This is how it began',
  cautionary_tales: 'This is what went wrong',
  doctrines: 'This is what always works',
  chronicles: 'This is the context you need'
};
var LORE_SOURCE_TYPES = ['manual', 'prophecy_fulfilled', 'prophecy_defied', 'rite_released', 'ember_snuffed', 'socratic_response', 'chapter_abandoned', 'volume_archived', 'canon_superseded'];

/* Phase 2 globals */
var _isOffline = false;
var _initializing = true;
var _isRendering = false;

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
  if (parts.length < 3 || !parts[2]) return months[parts[1]-1] + ' ' + parts[0];
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
  if (idx === -1) return escHtml(text.substring(0, 80)) + '\u2026';
  var start = Math.max(0, idx - contextChars);
  var end = Math.min(text.length, idx + query.length + contextChars);
  var snippet = '';
  if (start > 0) snippet += '\u2026';
  snippet += text.substring(start, end);
  if (end < text.length) snippet += '\u2026';
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

/* --- Phase 2: Base64 (UTF-8 safe — never raw btoa/atob) --- */
function utf8ToBase64(str) {
  var encoder = new TextEncoder();
  var bytes = encoder.encode(str);
  var binary = '';
  bytes.forEach(function(b) { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function base64ToUtf8(base64) {
  var binary = atob(base64);
  var bytes = Uint8Array.from(binary, function(c) { return c.charCodeAt(0); });
  return new TextDecoder().decode(bytes);
}

/* --- Phase 2: API Throttle --- */
function createThrottle(minIntervalMs) {
  var lastCall = 0;
  return function throttled(fn) {
    var now = Date.now();
    var elapsed = now - lastCall;
    if (elapsed < minIntervalMs) {
      return new Promise(function(resolve) {
        setTimeout(function() { lastCall = Date.now(); resolve(fn()); }, minIntervalMs - elapsed);
      });
    }
    lastCall = Date.now();
    return Promise.resolve(fn());
  };
}
var apiThrottle = createThrottle(500);

/* --- Error Logging --- */
function logError(category, message, detail) {
  try {
    var log = JSON.parse(localStorage.getItem(KEYS.ERROR_LOG) || '[]');
    log.unshift({ ts: new Date().toISOString(), v: CODEX_VERSION, cat: category, msg: message,
      detail: typeof detail === 'string' ? detail : JSON.stringify(detail || null).substring(0, 500) });
    if (log.length > 50) log = log.slice(0, 50);
    localStorage.setItem(KEYS.ERROR_LOG, JSON.stringify(log));
  } catch(e) { console.error('logError failed:', e); }
  console.error('[Codex ' + category + '] ' + message, detail);
}

function safeParseLocalStorage(key) {
  try { var raw = localStorage.getItem(key); if (!raw) return null; return JSON.parse(raw); }
  catch(e) { localStorage.removeItem(key); return null; }
}

/* --- Store (Phase 2: WAL-aware mutations) --- */
var store = {
  volumes: [],
  canons: [],
  schisms: [],
  apocrypha: [],
  lore: [],
  journal: [],
  _wal: [],
  _meta: {
    shas: { volumes: null, canons: null, journal: null },
    lastFetch: null,
    schemaVersions: { volumes: 1, canons: 1, journal: 1 }
  },
  _listeners: [],
  _walListeners: [],
  _overlayCount: 0,
  _flushTimer: null,

  onChange: function(fn) { store._listeners.push(fn); },
  onWalChange: function(fn) { store._walListeners.push(fn); },

  _fireChange: function() {
    if (_initializing || _isRendering) return;
    store._cacheToLocalStorage();
    for (var i = 0; i < store._listeners.length; i++) {
      try { store._listeners[i](); } catch(e) { logError('onChange', e.message); }
    }
  },

  _fireWalChange: function() {
    for (var i = 0; i < store._walListeners.length; i++) {
      try { store._walListeners[i](); } catch(e) { logError('onWalChange', e.message); }
    }
  },

  _createWalEntry: function(action, entityType, entityId, targetFile, payload, parentId) {
    var entry = {
      id: 'wal-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      _schema_version: CODEX_SCHEMA_VERSION,
      action: action,
      entity_type: entityType,
      entity_id: entityId,
      target_file: targetFile,
      parent_id: parentId || null,
      payload: payload ? deepClone(payload) : null,
      status: 'pending',
      error: null
    };
    store._wal.push(entry);
    try {
      localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal));
    } catch(e) {
      store._wal.pop();
      showToast('Storage full \u2014 change not saved!', 'error');
      throw new Error('WAL_STORAGE_FULL');
    }
    store._fireWalChange();
    if (!_isOffline && localStorage.getItem(KEYS.REPO_URL)) store._scheduleFlush();
  },

  _scheduleFlush: function() {
    if (store._flushTimer) return;
    store._flushTimer = setTimeout(function() {
      store._flushTimer = null;
      if (typeof flushQueue === 'function') flushQueue();
    }, 1000);
  },

  _cacheToLocalStorage: function() {
    try {
      localStorage.setItem(KEYS.CACHE_VOLUMES, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, volumes: store.volumes }));
      localStorage.setItem(KEYS.CACHE_CANONS, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, canons: store.canons, schisms: store.schisms, apocrypha: store.apocrypha, lore: store.lore }));
      localStorage.setItem(KEYS.CACHE_JOURNAL, JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, journal: store.journal }));
    } catch(e) { logError('cache', 'Cache write failed', e.message); }
  },

  getSnapshot: function() { return deepClone({ volumes: store.volumes, canons: store.canons, schisms: store.schisms, apocrypha: store.apocrypha, lore: store.lore, journal: store.journal }); },

  /* --- Volume --- */
  addVolume: function(vol) {
    if (!vol.id || !vol.name) throw new Error('Volume requires id and name');
    if (store.volumes.some(function(v) { return v.id === vol.id; })) throw new Error('Duplicate volume ID: ' + vol.id);
    var entry = { id: vol.id, name: vol.name, shelf: vol.shelf || 'active', description: vol.description || '',
      domain_color: vol.domain_color || '#8B7355', tags: vol.tags || [], repo: vol.repo || null,
      current_phase: vol.current_phase || '', chapters: [], todos: [],
      shelf_history: [{ shelf: vol.shelf || 'active', date: localDateStr(), reason: 'Created' }] };
    store.volumes.push(entry);
    store._createWalEntry('create', 'volume', entry.id, 'volumes.json', entry);
    store._fireChange();
    return entry;
  },
  updateVolume: function(id, patch) {
    var vol = store.volumes.find(function(v) { return v.id === id; });
    if (!vol) throw new Error('Volume not found: ' + id);
    delete patch.id;
    ['name','description','domain_color','tags','repo','current_phase'].forEach(function(k) { if (patch.hasOwnProperty(k)) vol[k] = patch[k]; });
    store._createWalEntry('update', 'volume', id, 'volumes.json', patch);
    store._fireChange();
  },
  deleteVolume: function(id) {
    var vol = store.volumes.find(function(v) { return v.id === id; });
    if (!vol) throw new Error('Volume not found');
    var active = filterActive(vol.chapters || []);
    if (active.length > 0 || (vol.todos || []).length > 0) throw new Error('Remove chapters and TODOs first');
    store.volumes = store.volumes.filter(function(v) { return v.id !== id; });
    store._createWalEntry('delete', 'volume', id, 'volumes.json', null);
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
    store._createWalEntry('shelf_transition', 'volume', volumeId, 'volumes.json', { shelf: newShelf, reason: reason || null });
    store._fireChange();
  },

  /* --- Chapter --- */
  addChapter: function(volumeId, ch) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    if (!ch.id || !ch.name) throw new Error('Chapter requires id and name');
    if ((vol.chapters || []).some(function(c) { return c.id === ch.id; })) throw new Error('Duplicate chapter');
    var entry = { id: ch.id, name: ch.name, status: ch.status || 'planned', started: ch.started || null,
      completed: ch.completed || null, ended: ch.ended || null, summary: ch.summary || '',
      spec_url: ch.spec_url || null, content: ch.content || '',
      order: ch.order != null ? ch.order : filterActive(vol.chapters || []).length,
      _deleted: false, _deleted_date: null };
    if (entry.status === 'in-progress' && !entry.started) entry.started = localDateStr();
    if (entry.status === 'complete' && !entry.completed) entry.completed = localDateStr();
    if (!vol.chapters) vol.chapters = [];
    vol.chapters.push(entry);
    store._createWalEntry('create', 'chapter', entry.id, 'volumes.json', entry, volumeId);
    store._fireChange();
    return entry;
  },
  updateChapter: function(volumeId, chapterId, patch) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    var ch = (vol.chapters || []).find(function(c) { return c.id === chapterId; });
    if (!ch) throw new Error('Chapter not found');
    ['name','status','started','summary','spec_url','content','order'].forEach(function(k) { if (patch.hasOwnProperty(k)) ch[k] = patch[k]; });
    if (patch.status === 'complete' && !ch.completed) ch.completed = localDateStr();
    if (patch.status === 'abandoned' && !ch.ended) ch.ended = localDateStr();
    if (patch.status === 'in-progress' && !ch.started) ch.started = localDateStr();
    if (patch.status && patch.status !== 'complete') ch.completed = null;
    if (patch.status && patch.status !== 'abandoned') ch.ended = null;
    store._createWalEntry('update', 'chapter', chapterId, 'volumes.json', patch, volumeId);
    store._fireChange();
  },
  deleteChapter: function(volumeId, chapterId) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    var ch = (vol.chapters || []).find(function(c) { return c.id === chapterId; });
    if (!ch) throw new Error('Chapter not found');
    ch._deleted = true; ch._deleted_date = localDateStr();
    store._createWalEntry('delete', 'chapter', chapterId, 'volumes.json', null, volumeId);
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
    store._createWalEntry('create', 'todo', entry.id, 'volumes.json', entry, volumeId);
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
    store._createWalEntry('update', 'todo', todoId, 'volumes.json', patch, volumeId);
    store._fireChange();
  },
  deleteTodo: function(volumeId, todoId) {
    var vol = store.volumes.find(function(v) { return v.id === volumeId; });
    if (!vol) throw new Error('Volume not found');
    vol.todos = (vol.todos || []).filter(function(t) { return t.id !== todoId; });
    store._createWalEntry('delete', 'todo', todoId, 'volumes.json', null, volumeId);
    store._fireChange();
  },

  /* --- Canon --- */
  addCanon: function(c) {
    if (!c.id || !c.title) throw new Error('Canon requires id and title');
    store.canons.push(c);
    store._createWalEntry('create', 'canon', c.id, 'canons.json', c);
    store._fireChange();
  },
  updateCanon: function(id, patch) {
    var canon = store.canons.find(function(c) { return c.id === id; });
    if (!canon) throw new Error('Canon not found');
    delete patch.id;
    ['title','scope','category','status','superseded_by','rationale','references','created'].forEach(function(k) { if (patch.hasOwnProperty(k)) canon[k] = patch[k]; });
    store._createWalEntry('update', 'canon', id, 'canons.json', patch);
    store._fireChange();
  },
  deleteCanon: function(id) {
    var canon = store.canons.find(function(c) { return c.id === id; });
    if (!canon) throw new Error('Canon not found');
    canon._deleted = true;
    canon._deleted_date = localDateStr();
    store._createWalEntry('delete', 'canon', id, 'canons.json', null);
    store._fireChange();
  },

  /* --- Schism --- */
  addSchism: function(r) {
    if (!r.id) throw new Error('Schism requires id');
    store.schisms.push(r);
    store._createWalEntry('create', 'schism', r.id, 'canons.json', r);
    store._fireChange();
  },

  /* --- Apocrypha --- */
  addApocryphon: function(a) {
    if (!a.id || !a.title) throw new Error('Apocryphon requires id and title');
    if (store.apocrypha.some(function(x) { return x.id === a.id; })) throw new Error('Duplicate apocryphon');
    var entry = { id: a.id, title: a.title, narrative: a.narrative || '', volumes: a.volumes || [],
      date: a.date || localDateStr(), status: a.status || 'foretold', _deleted: false, _deleted_date: null };
    store.apocrypha.push(entry);
    store._createWalEntry('create', 'apocryphon', entry.id, 'canons.json', entry);
    store._fireChange();
    return entry;
  },
  updateApocryphon: function(id, patch) {
    var a = store.apocrypha.find(function(x) { return x.id === id; });
    if (!a) throw new Error('Apocryphon not found');
    delete patch.id;
    ['title','narrative','volumes','date','status'].forEach(function(k) { if (patch.hasOwnProperty(k)) a[k] = patch[k]; });
    store._createWalEntry('update', 'apocryphon', id, 'canons.json', patch);
    store._fireChange();
  },
  deleteApocryphon: function(id) {
    var a = store.apocrypha.find(function(x) { return x.id === id; });
    if (!a) throw new Error('Apocryphon not found');
    a._deleted = true; a._deleted_date = localDateStr();
    store._createWalEntry('delete', 'apocryphon', id, 'canons.json', null);
    store._fireChange();
  },

  /* --- Lore (Phase 1: dissertation §3.4) --- */
  addLore: function(l) {
    if (!l.id || !l.title) throw new Error('Lore requires id and title');
    if (!l.category || LORE_CATEGORIES.indexOf(l.category) === -1) throw new Error('Lore category invalid');
    if (store.lore.some(function(x) { return x.id === l.id; })) throw new Error('Duplicate lore id: ' + l.id);
    var now = localDateStr();
    var entry = {
      id: l.id, title: l.title, category: l.category,
      body: l.body || '',
      domain: Array.isArray(l.domain) ? l.domain : [],
      tags: Array.isArray(l.tags) ? l.tags : [],
      references: Array.isArray(l.references) ? l.references : [],
      created: l.created || now,
      updated: l.updated || now,
      sourceType: l.sourceType || 'manual',
      sourceId: l.sourceId || null,
      _deleted: false, _deleted_date: null
    };
    store.lore.push(entry);
    store._createWalEntry('create', 'lore', entry.id, 'canons.json', entry);
    store._fireChange();
    return entry;
  },
  updateLore: function(id, patch) {
    var l = store.lore.find(function(x) { return x.id === id; });
    if (!l) throw new Error('Lore not found: ' + id);
    delete patch.id;
    ['title','category','body','domain','tags','references','sourceType','sourceId','created'].forEach(function(k) { if (patch.hasOwnProperty(k)) l[k] = patch[k]; });
    l.updated = localDateStr();
    store._createWalEntry('update', 'lore', id, 'canons.json', patch);
    store._fireChange();
  },
  deleteLore: function(id) {
    var l = store.lore.find(function(x) { return x.id === id; });
    if (!l) throw new Error('Lore not found');
    l._deleted = true; l._deleted_date = localDateStr();
    store._createWalEntry('delete', 'lore', id, 'canons.json', null);
    store._fireChange();
  },

  /* --- Journal --- */
  addJournalSession: function(date, session) {
    var day = store.journal.find(function(d) { return d.date === date; });
    if (!day) {
      day = { date: date, sessions: [] };
      store.journal.push(day);
      store.journal.sort(function(a, b) { return b.date.localeCompare(a.date); });
    }
    if (!session.id) {
      var suffix = 1;
      if (day.sessions.length > 0) {
        var suffixes = day.sessions.map(function(s) { var m = s.id.match(/-(\d+)$/); return m ? parseInt(m[1], 10) : 0; });
        suffix = Math.max.apply(null, [0].concat(suffixes)) + 1;
      }
      session.id = 's-' + date + '-' + String(suffix).padStart(2, '0');
    }
    day.sessions.push(session);
    store._createWalEntry('create', 'session', session.id, 'journal.json', session, date);
    store._fireChange();
  },
  deleteSession: function(date, sessionId) {
    var day = store.journal.find(function(d) { return d.date === date; });
    if (!day) throw new Error('Day not found');
    day.sessions = (day.sessions || []).filter(function(s) { return s.id !== sessionId; });
    if (day.sessions.length === 0) {
      store.journal = store.journal.filter(function(d) { return d.date !== date; });
    }
    store._createWalEntry('delete', 'session', sessionId, 'journal.json', null, date);
    store._fireChange();
  },

  /* --- Helpers --- */
  getScopeOptions: function() {
    var opts = ['global'];
    store.volumes.forEach(function(v) { opts.push(v.id); });
    return opts;
  }
};

/* --- Store Population (Phase 2: tracks _meta SHAs) --- */
function populateStore(volResult, canonResult, journalResult) {
  var vData = (volResult && volResult.data) || { _schema_version: 1, volumes: [] };
  store.volumes = vData.volumes || [];
  store._meta.schemaVersions.volumes = vData._schema_version || 1;
  store._meta.shas.volumes = (volResult && volResult.sha) || null;

  var cData = (canonResult && canonResult.data) || { _schema_version: 1, canons: [], schisms: [], apocrypha: [], lore: [] };
  store.canons = cData.canons || [];
  store.schisms = cData.schisms || cData.rejected_alternatives || [];
  store.apocrypha = cData.apocrypha || [];
  store.lore = cData.lore || [];
  store._meta.schemaVersions.canons = cData._schema_version || 1;
  store._meta.shas.canons = (canonResult && canonResult.sha) || null;

  var jData = (journalResult && journalResult.data) || { _schema_version: 1, journal: [] };
  store.journal = jData.journal || [];
  store._meta.schemaVersions.journal = jData._schema_version || 1;
  store._meta.shas.journal = (journalResult && journalResult.sha) || null;

  store.journal.sort(function(a, b) { return b.date.localeCompare(a.date); });

  try {
    localStorage.setItem(KEYS.CACHE_VOLUMES, JSON.stringify(vData));
    localStorage.setItem(KEYS.CACHE_CANONS, JSON.stringify(cData));
    localStorage.setItem(KEYS.CACHE_JOURNAL, JSON.stringify(jData));
    if (volResult && volResult.sha) localStorage.setItem(KEYS.SHA_VOLUMES, volResult.sha);
    if (canonResult && canonResult.sha) localStorage.setItem(KEYS.SHA_CANONS, canonResult.sha);
    if (journalResult && journalResult.sha) localStorage.setItem(KEYS.SHA_JOURNAL, journalResult.sha);
  } catch(e) { logError('cache', 'Failed to cache', e.message); }

  store._meta.lastFetch = new Date().toISOString();
}

function getStoreSnapshot() {
  return JSON.parse(JSON.stringify({
    volumes: store.volumes, canons: store.canons,
    schisms: store.schisms, apocrypha: store.apocrypha,
    lore: store.lore, journal: store.journal
  }));
}
