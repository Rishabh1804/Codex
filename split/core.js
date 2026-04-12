/* CODEX — Core (Phase 2: GitHub sync + WAL replay) */

/* --- cx() Icons — Style C (design session locked) --- */
function cx(name) {
  var icons = {
    'book':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/><circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.3"/></svg>',
    'bookmark':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4z"/><path d="M9 2h6v5l-3-2-3 2V2z" fill="currentColor" opacity="0.25"/></svg>',
    'scroll':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8a2 2 0 0 0 2-2v-2H6v2a2 2 0 0 0 2 2z"/><path d="M6 17V5a2 2 0 0 1 2-2h4"/><path d="M18 17V7a2 2 0 0 0-2-2h-4"/><path d="M10 3v2"/></svg>',
    'quill':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    'shelf':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    'search':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>',
    'check':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    'clock':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    'lock':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.3"/></svg>',
    'sun':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    'moon':'<svg viewBox="0 0 24 24" fill="currentColor" opacity="0.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    'plus':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    'trash':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>',
    'arrow-left':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    'link':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07.5l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.07-.5l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'alert':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>',
    'close':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    'download':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
    'info':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>',
    'github':'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>',
    'refresh':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    'gear':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };
  return icons[name] || '<span class="cx-missing"></span>';
}

/* --- Toast (from spec) --- */
var _toastTimer = null;
function showToast(message, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var iconName = type === 'success' ? 'check' : type === 'error' ? 'alert' : type === 'warning' ? 'alert' : 'info';
  var toast = document.createElement('div');
  toast.className = 'cx-toast cx-toast-' + type;
  toast.innerHTML = cx(iconName) + '<span>' + escHtml(message) + '</span>';
  container.appendChild(toast);
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() {
    toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)'; toast.style.transition = 'all 0.2s';
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 200);
  }, 2500);
}

/* --- Overlay (from spec) --- */
var _currentDraftKey = null;

function openOverlay(title, bodyHtml, footerHtml) {
  var backdrop = document.getElementById('overlayBackdrop');
  var overlay = document.getElementById('overlayContainer');
  var header = '<div class="cx-overlay-header"><div class="cx-overlay-title">' + escHtml(title) + '</div>'
    + '<button data-action="closeOverlay" class="cx-btn-icon">' + cx('close') + '</button></div>';
  var body = '<div class="cx-overlay-body">' + bodyHtml + '</div>';
  var footer = footerHtml ? '<div class="cx-overlay-footer">' + footerHtml + '</div>' : '';
  overlay.innerHTML = header + body + footer;
  backdrop.hidden = false; overlay.hidden = false;
  requestAnimationFrame(function() { backdrop.dataset.visible = 'true'; overlay.dataset.visible = 'true'; });
  store._overlayCount++;
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  var backdrop = document.getElementById('overlayBackdrop');
  var overlay = document.getElementById('overlayContainer');
  backdrop.dataset.visible = 'false'; overlay.dataset.visible = 'false';
  _currentDraftKey = null;
  store._overlayCount--;
  if (store._overlayCount <= 0) { store._overlayCount = 0; document.body.style.overflow = ''; }
  setTimeout(function() { backdrop.hidden = true; overlay.hidden = true; overlay.innerHTML = ''; }, OVERLAY_ANIM_MS);
}

/* --- Confirm (from spec) --- */
var _confirmResolve = null;
function showConfirmDialog(title, message, onConfirm, options) {
  options = options || {};
  var backdrop = document.getElementById('confirmBackdrop');
  var dialog = document.getElementById('confirmContainer');
  var btnClass = options.danger ? 'cx-btn-danger' : 'cx-btn-primary';
  var label = options.label || 'Confirm';
  dialog.innerHTML = '<div class="cx-confirm-title">' + escHtml(title) + '</div>'
    + '<div class="cx-confirm-body">' + escHtml(message) + '</div>'
    + '<div class="cx-confirm-actions">'
    + '<button data-action="confirmCancel" class="cx-btn-secondary">Cancel</button>'
    + '<button data-action="confirmOk" class="' + btnClass + '">' + escHtml(label) + '</button></div>';
  backdrop.hidden = false; dialog.hidden = false;
  requestAnimationFrame(function() { backdrop.dataset.visible = 'true'; dialog.dataset.visible = 'true'; });
  _confirmResolve = onConfirm;
}

function closeConfirmDialog() {
  var backdrop = document.getElementById('confirmBackdrop');
  var dialog = document.getElementById('confirmContainer');
  backdrop.dataset.visible = 'false'; dialog.dataset.visible = 'false';
  setTimeout(function() { backdrop.hidden = true; dialog.hidden = true; dialog.innerHTML = ''; }, OVERLAY_ANIM_MS);
  _confirmResolve = null;
}

/* --- Routing (from spec) --- */
var _currentView = 'dashboard';
var _currentViewParams = {};
var _navigating = false;
var _scrollPositions = {};
var _pendingFilter = null;

function parseRoute(hash) {
  var parts = (hash || '#/').replace('#/', '').split('/');
  if (parts[0] === 'volume' && parts[1]) return { view: 'volume-detail', id: decodeURIComponent(parts[1]) };
  if (parts[0] === 'canon' && parts[1]) return { view: 'canon-detail', id: decodeURIComponent(parts[1]) };
  if (['dashboard','journal','canons','todos','settings'].indexOf(parts[0]) !== -1) return { view: parts[0] };
  return { view: 'dashboard' };
}

function navigate(hash) {
  _navigating = true;
  location.hash = hash;
  handleRouteChange(hash, true);
  _navigating = false;
}

function handleRouteChange(hash, scrollToTop) {
  var route = parseRoute(hash);
  _scrollPositions[_currentView] = (document.getElementById('viewContainer') || {}).scrollTop || 0;
  _currentView = route.view;
  _currentViewParams = route;
  updateTabBarActive(route.view);
  renderBreadcrumbForRoute(route);
  updateFab(route.view);
  renderCurrentView();
  var vc = document.getElementById('viewContainer');
  if (vc) vc.scrollTop = scrollToTop ? 0 : (_scrollPositions[route.view] || 0);
}

function handleSwitchTab(tabName) {
  _pendingFilter = null;
  var map = { dashboard: '#/dashboard', journal: '#/journal', canons: '#/canons', todos: '#/todos' };
  navigate(map[tabName] || '#/dashboard');
}

function updateTabBarActive(view) {
  var map = { dashboard:'dashboard', journal:'journal', canons:'canons', todos:'todos', 'volume-detail':'dashboard', 'canon-detail':'canons', settings:null };
  var active = map[view];
  var btns = document.querySelectorAll('.cx-tab-btn');
  for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('cx-tab-active', btns[i].dataset.tab === active);
}

/* --- Breadcrumb (from spec) --- */
function renderBreadcrumbForRoute(route) {
  var segments = [];
  if (route.view === 'volume-detail') {
    var vol = store.volumes.find(function(v) { return v.id === route.id; });
    segments = [{ label: 'Library', route: '#/dashboard' }, { label: vol ? vol.name : route.id, route: null }];
  }
  renderBreadcrumb(segments);
}

function renderBreadcrumb(segments) {
  var bar = document.getElementById('breadcrumbBar');
  if (!bar) return;
  bar.hidden = segments.length <= 1;
  if (bar.hidden) return;
  bar.innerHTML = segments.map(function(seg, i) {
    var isLast = i === segments.length - 1;
    var sep = i > 0 ? '<span class="cx-breadcrumb-sep">\u203A</span>' : '';
    return sep + (isLast
      ? '<span class="cx-breadcrumb-current">' + escHtml(seg.label) + '</span>'
      : '<a data-action="navigate" data-route="' + escAttr(seg.route) + '" class="cx-breadcrumb-link">' + escHtml(seg.label) + '</a>');
  }).join('');
}

/* --- Header (from spec) --- */
function updateHeader(route) {
  var header = document.getElementById('appHeader');
  if (!header) return;
  if (route && (route.view === 'volume-detail' || route.view === 'settings')) {
    var title = route.view === 'settings' ? 'Settings' : (function() { var v = store.volumes.find(function(x) { return x.id === route.id; }); return v ? v.name : 'Volume'; })();
    header.innerHTML = '<button data-action="goBack" class="cx-btn-icon">' + cx('arrow-left') + '</button>'
      + '<span class="cx-app-title">' + escHtml(title) + '</span>'
      + '<div class="cx-header-actions">'
      + (route.view === 'volume-detail' ? '<button data-action="editVolume" class="cx-btn-icon">' + cx('quill') + '</button>' : '')
      + '</div>';
  } else {
    header.innerHTML = '<span class="cx-app-title">Codex</span>'
      + '<div class="cx-header-actions">'
      + '<button data-action="openSearch" class="cx-btn-icon">' + cx('search') + '</button>'
      + '<button data-action="openSettings" class="cx-btn-icon">' + cx('gear') + '</button></div>';
  }
}

/* --- FAB --- */
function updateFab(view) {
  var fab = document.getElementById('fabButton');
  if (!fab) return;
  var show = ['dashboard', 'volume-detail', 'todos'].indexOf(view) !== -1;
  fab.classList.toggle('cx-fab-hidden', !show);
  fab.innerHTML = cx('plus');
}

/* --- Tab Icons --- */
function initTabIcons() {
  var btns = document.querySelectorAll('.cx-tab-btn');
  var icons = { dashboard: 'book', journal: 'scroll', canons: 'bookmark', todos: 'check' };
  var labels = { dashboard: 'Library', journal: 'Journal', canons: 'Canons', todos: 'TODOs' };
  for (var i = 0; i < btns.length; i++) {
    var tab = btns[i].dataset.tab;
    btns[i].innerHTML = cx(icons[tab] || 'book') + '<span class="cx-tab-label">' + (labels[tab] || tab) + '</span>';
  }
}

/* --- Render Current View --- */
function renderCurrentView() {
  _isRendering = true;
  try {
    updateHeader(_currentViewParams);
    var renderers = {
      dashboard: renderDashboard, 'volume-detail': renderVolumeDetail,
      settings: renderSettings, todos: renderTodos,
      journal: renderComingSoon.bind(null, 'Journal', 'Phase 3'),
      canons: renderComingSoon.bind(null, 'Canons', 'Phase 3')
    };
    var fn = renderers[_currentView];
    if (fn) fn(_currentViewParams);
    else renderDashboard();
  } catch(e) {
    logError('render', e.message, e.stack);
    var vc = document.getElementById('viewContainer');
    if (vc) vc.innerHTML = '<div class="cx-error-state">' + cx('alert') + '<p class="cx-error-message">' + escHtml(e.message) + '</p></div>';
  }
  _isRendering = false;
}

function renderComingSoon(name, phase) {
  var vc = document.getElementById('viewContainer');
  if (vc) vc.innerHTML = '<div class="cx-empty-state">' + cx('book') + '<p class="cx-empty-title">' + escHtml(name) + '</p><p class="cx-empty-subtitle">Coming in ' + escHtml(phase) + '</p></div>';
}

/* --- Form Field Renderers (from spec CODEBASE_VIEWS) --- */
function renderTextField(name, label, value, options) {
  options = options || {};
  var req = options.required ? ' *' : '';
  var ph = options.placeholder || '';
  var ro = options.readonly ? ' readonly' : '';
  var roCls = options.readonly ? ' cx-form-readonly' : '';
  var type = options.type || 'text';
  return '<div class="cx-form-group"><label class="cx-form-label" for="field-' + name + '">' + escHtml(label) + req + '</label>'
    + '<input type="' + escAttr(type) + '" id="field-' + name + '" name="' + name + '" value="' + escAttr(value || '') + '"'
    + (options.maxlength ? ' maxlength="' + options.maxlength + '"' : '')
    + ' placeholder="' + escAttr(ph) + '"' + ro + ' class="cx-form-input' + roCls + '">'
    + '<span class="cx-form-error" id="error-' + name + '" hidden></span></div>';
}

function renderTextarea(name, label, value, options) {
  options = options || {};
  var req = options.required ? ' *' : '';
  return '<div class="cx-form-group"><label class="cx-form-label" for="field-' + name + '">' + escHtml(label) + req + '</label>'
    + '<textarea id="field-' + name + '" name="' + name + '" rows="' + (options.rows || 3) + '"'
    + (options.maxlength ? ' maxlength="' + options.maxlength + '"' : '')
    + ' placeholder="' + escAttr(options.placeholder || '') + '" class="cx-form-textarea">' + escHtml(value || '') + '</textarea>'
    + '<span class="cx-form-error" id="error-' + name + '" hidden></span></div>';
}

function renderSelect(name, label, value, optionsList, options) {
  options = options || {};
  var req = options.required ? ' *' : '';
  var opts = optionsList.map(function(o) {
    return '<option value="' + escAttr(o.value) + '"' + (o.value === value ? ' selected' : '') + '>' + escHtml(o.label) + '</option>';
  }).join('');
  return '<div class="cx-form-group"><label class="cx-form-label" for="field-' + name + '">' + escHtml(label) + req + '</label>'
    + '<select id="field-' + name + '" name="' + name + '" class="cx-form-select">' + opts + '</select>'
    + '<span class="cx-form-error" id="error-' + name + '" hidden></span></div>';
}

function renderDateField(name, label, value, options) {
  options = options || {};
  var req = options.required ? ' *' : '';
  return '<div class="cx-form-group"><label class="cx-form-label" for="field-' + name + '">' + escHtml(label) + req + '</label>'
    + '<input type="date" id="field-' + name + '" name="' + name + '" value="' + escAttr(value || '') + '" class="cx-form-input">'
    + '<span class="cx-form-error" id="error-' + name + '" hidden></span></div>';
}

function renderColorField(name, label, value) {
  return '<div class="cx-form-group"><label class="cx-form-label">' + escHtml(label) + '</label>'
    + '<input type="color" id="field-' + name + '" name="' + name + '" value="' + escAttr(value || '#8B7355') + '" class="cx-form-color"></div>';
}

/* --- Shared components --- */
function renderEmptyState(icon, title, subtitle, actionLabel, actionName) {
  return '<div class="cx-empty-state">' + cx(icon) + '<p class="cx-empty-title">' + escHtml(title) + '</p>'
    + '<p class="cx-empty-subtitle">' + escHtml(subtitle) + '</p>'
    + (actionLabel ? '<button data-action="' + escAttr(actionName) + '" class="cx-btn-primary">' + escHtml(actionLabel) + '</button>' : '') + '</div>';
}

function renderConnectGitHubCta() {
  if (localStorage.getItem(KEYS.REPO_URL)) return '';
  return '<div class="cx-connect-cta">' + cx('link') + '<span>Your data is local only.</span><button data-action="openSettings" class="cx-btn-primary cx-btn-sm">Connect GitHub</button></div>';
}

/* ============================================================
   PHASE 2: GitHub Sync Module
   ============================================================ */

var _currentFetchController = null;

function buildHeaders() {
  var headers = { 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
  var token = localStorage.getItem(KEYS.TOKEN);
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

function normalizeRepoUrl(input) {
  if (!input) return null;
  var url = input.trim()
    .replace(/^https?:\/\//, '')
    .replace(/^github\.com\//, '')
    .replace(/\/+$/, '')
    .replace(/\.git$/, '');
  var parts = url.split('/');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return url;
}

function fetchFile(filename, signal) {
  var repoUrl = localStorage.getItem(KEYS.REPO_URL);
  if (!repoUrl) return Promise.resolve({ data: null, sha: null });
  return fetch('https://api.github.com/repos/' + repoUrl + '/contents/data/' + filename, {
    headers: buildHeaders(), signal: signal
  }).then(function(res) {
    if (res.status === 404) return { data: null, sha: null };
    if (!res.ok) throw new Error('GitHub ' + res.status + ': ' + res.statusText);
    return res.json();
  }).then(function(json) {
    if (!json || !json.content) return { data: null, sha: null };
    var content = base64ToUtf8(json.content.replace(/\n/g, ''));
    var parsed = JSON.parse(content.replace(/^\uFEFF/, ''));
    return { data: parsed, sha: json.sha };
  });
}

function pushFile(filename, content, sha) {
  var repoUrl = localStorage.getItem(KEYS.REPO_URL);
  var branch = localStorage.getItem(KEYS.DEFAULT_BRANCH) || 'main';
  var body = { message: 'Update ' + filename, content: utf8ToBase64(content), branch: branch };
  if (sha) body.sha = sha;
  var controller = new AbortController();
  var timeout = setTimeout(function() { controller.abort(); }, 15000);
  return fetch('https://api.github.com/repos/' + repoUrl + '/contents/data/' + filename, {
    method: 'PUT', headers: buildHeaders(), body: JSON.stringify(body), signal: controller.signal
  }).then(function(res) {
    clearTimeout(timeout);
    if (res.status === 200 || res.status === 201) {
      return res.json().then(function(json) {
        return { success: true, sha: json.content.sha };
      });
    }
    if (res.status === 409) return { success: false, reason: 'conflict' };
    if (res.status === 401) return { success: false, reason: 'auth' };
    if (res.status === 403) return { success: false, reason: 'rate_limit', retryAfter: res.headers.get('Retry-After') };
    return { success: false, reason: 'unknown', status: res.status };
  }).catch(function(e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') return { success: false, reason: 'timeout' };
    return { success: false, reason: 'network' };
  });
}

function fetchAll() {
  if (_currentFetchController) _currentFetchController.abort();
  _currentFetchController = new AbortController();
  var signal = _currentFetchController.signal;
  var timeout = setTimeout(function() { _currentFetchController.abort(); }, 10000);

  var files = [
    { name: 'volumes.json', cacheKey: KEYS.CACHE_VOLUMES, shaKey: KEYS.SHA_VOLUMES },
    { name: 'canons.json', cacheKey: KEYS.CACHE_CANONS, shaKey: KEYS.SHA_CANONS },
    { name: 'journal.json', cacheKey: KEYS.CACHE_JOURNAL, shaKey: KEYS.SHA_JOURNAL }
  ];

  return Promise.allSettled(files.map(function(f) { return fetchFile(f.name, signal); }))
    .then(function(results) {
      clearTimeout(timeout);
      _currentFetchController = null;
      var fetched = {};
      var anySuccess = false, anyFailure = false;

      results.forEach(function(result, i) {
        var file = files[i];
        if (result.status === 'fulfilled') {
          fetched[file.name] = result.value;
          anySuccess = true;
          setOfflineStatus(false);
        } else {
          anyFailure = true;
          fetched[file.name] = {
            data: safeParseLocalStorage(file.cacheKey),
            sha: localStorage.getItem(file.shaKey) || null,
            fromCache: true
          };
          logError('fetch', 'Failed: ' + file.name, result.reason ? result.reason.message : 'unknown');
        }
      });

      if (!anySuccess) setOfflineStatus(true);
      if (anyFailure && anySuccess) showToast('Some data loaded from cache', 'info');
      return fetched;
    });
}

function validateToken(repoUrl, token) {
  return fetch('https://api.github.com/repos/' + repoUrl, {
    headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github.v3+json' },
    signal: AbortSignal.timeout(10000)
  }).then(function(res) {
    if (res.status === 401) return { valid: false, reason: 'Invalid token' };
    if (res.status === 404) return { valid: false, reason: 'Repository not found' };
    if (res.status === 403) return { valid: false, reason: 'Access denied' };
    if (!res.ok) return { valid: false, reason: 'GitHub returned ' + res.status };
    return res.json().then(function(data) {
      if (!data.permissions || !data.permissions.push) return { valid: false, reason: 'Token has read-only access' };
      return { valid: true, defaultBranch: data.default_branch || 'main', repoFullName: data.full_name };
    });
  }).catch(function(e) {
    if (e.name === 'AbortError' || e.name === 'TimeoutError') return { valid: false, reason: 'Connection timed out' };
    return { valid: false, reason: 'Network error' };
  });
}

function setOfflineStatus(offline) {
  if (offline === _isOffline) return;
  _isOffline = offline;
  var banner = document.getElementById('offlineBanner');
  if (banner) banner.hidden = !offline;
  if (!offline && localStorage.getItem(KEYS.REPO_URL)) flushQueue();
}

/* --- File Builders (rebuild entire file from current store) --- */
function buildVolumesFile() { return JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, volumes: store.volumes }, null, 2); }
function buildCanonsFile() { return JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, canons: store.canons, rejected_alternatives: store.rejections }, null, 2); }
function buildJournalFile() { return JSON.stringify({ _schema_version: CODEX_SCHEMA_VERSION, journal: store.journal }, null, 2); }

/* --- Flush Queue (push pending WAL entries to GitHub) --- */
var _flushing = false;

function flushQueue() {
  if (_flushing || _isOffline) return Promise.resolve();
  if (!localStorage.getItem(KEYS.REPO_URL)) return Promise.resolve();

  var pending = store._wal.filter(function(e) { return e.status === 'pending' || e.status === 'failed'; });
  if (pending.length === 0) return Promise.resolve();

  _flushing = true;
  pending.forEach(function(e) { e.status = 'syncing'; });
  try { localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal)); } catch(e) {}
  store._fireWalChange();

  var dirtyFiles = {};
  pending.forEach(function(e) { dirtyFiles[e.target_file] = true; });

  var pushOrder = ['volumes.json', 'canons.json', 'journal.json'];
  var shaKeyMap = { 'volumes.json': 'volumes', 'canons.json': 'canons', 'journal.json': 'journal' };
  var lsKeyMap = { 'volumes.json': KEYS.SHA_VOLUMES, 'canons.json': KEYS.SHA_CANONS, 'journal.json': KEYS.SHA_JOURNAL };
  var builderMap = { 'volumes.json': buildVolumesFile, 'canons.json': buildCanonsFile, 'journal.json': buildJournalFile };

  var chain = Promise.resolve();
  pushOrder.forEach(function(file) {
    if (!dirtyFiles[file]) return;
    chain = chain.then(function() {
      var content = builderMap[file]();
      var sha = store._meta.shas[shaKeyMap[file]] || localStorage.getItem(lsKeyMap[file]) || null;
      return apiThrottle(function() { return pushFile(file, content, sha); }).then(function(result) {
        var fileEntries = pending.filter(function(e) { return e.target_file === file; });
        if (result.success) {
          store._meta.shas[shaKeyMap[file]] = result.sha;
          localStorage.setItem(lsKeyMap[file], result.sha);
          fileEntries.forEach(function(e) { e.status = 'synced'; });
          store._cacheToLocalStorage();
        } else {
          fileEntries.forEach(function(e) { e.status = 'failed'; e.error = result.reason; });
          if (result.reason === 'conflict') {
            showToast('Sync conflict \u2014 refreshing data', 'warning');
          } else if (result.reason === 'auth') {
            showToast('GitHub token expired or invalid', 'error');
          } else {
            showToast('Sync failed: ' + (result.reason || 'unknown'), 'error');
          }
          logError('flush', 'Push failed: ' + file, result.reason);
        }
      });
    });
  });

  return chain.then(function() {
    _flushing = false;
    try { localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal)); } catch(e) {}
    store._fireWalChange();
    purgeOldWalEntries();
  }).catch(function(e) {
    _flushing = false;
    logError('flush', 'flushQueue error', e.message);
    pending.forEach(function(en) { if (en.status === 'syncing') en.status = 'failed'; });
    try { localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal)); } catch(ex) {}
    store._fireWalChange();
  });
}

/* ============================================================
   PHASE 2: WAL Replay
   ============================================================ */

function replayWal(wal) {
  var errors = [];
  for (var i = 0; i < wal.length; i++) {
    var entry = wal[i];
    if (entry.status === 'syncing') entry.status = 'pending';
    if (entry.status !== 'pending' && entry.status !== 'failed') continue;
    try {
      switch (entry.action) {
        case 'create': replayCreate(entry); break;
        case 'update': replayUpdate(entry); break;
        case 'delete': replayDelete(entry); break;
        case 'shelf_transition': replayShelfTransition(entry); break;
      }
    } catch(e) { errors.push({ entry: entry, error: e.message }); }
  }
  if (errors.length > 0) {
    logError('WAL replay', errors.length + ' entries failed', errors);
    showToast(errors.length + ' pending changes could not be applied', 'error');
  }
}

function replayCreate(entry) {
  var existing = findEntity(entry.entity_type, entry.entity_id, entry.parent_id);
  if (existing) {
    var existingTime = existing.created || existing._lastModified || '1970-01-01';
    if (entry.timestamp > existingTime) Object.assign(existing, entry.payload);
    entry.status = 'resolved';
    return;
  }
  insertEntity(entry.entity_type, entry.payload, entry.parent_id);
}

function replayUpdate(entry) {
  var existing = findEntity(entry.entity_type, entry.entity_id, entry.parent_id);
  if (!existing) { entry.status = 'resolved'; return; }
  if (existing._deleted) { entry.status = 'resolved'; return; }
  Object.assign(existing, entry.payload);
}

function replayDelete(entry) {
  var existing = findEntity(entry.entity_type, entry.entity_id, entry.parent_id);
  if (!existing) { entry.status = 'resolved'; return; }
  if (entry.payload && entry.payload._permanent) {
    removeEntity(entry.entity_type, entry.entity_id, entry.parent_id);
  } else {
    existing._deleted = true;
    existing._deleted_date = existing._deleted_date || localDateStr();
  }
}

function replayShelfTransition(entry) {
  var volume = store.volumes.find(function(v) { return v.id === entry.entity_id; });
  if (!volume) { entry.status = 'resolved'; return; }
  volume.shelf = entry.payload.shelf;
  if (!volume.shelf_history) volume.shelf_history = [];
  var last = volume.shelf_history[volume.shelf_history.length - 1];
  var entryDate = entry.timestamp.substring(0, 10);
  if (!last || last.shelf !== entry.payload.shelf || last.date !== entryDate) {
    volume.shelf_history.push({ shelf: entry.payload.shelf, date: entryDate, reason: entry.payload.reason || null });
  }
}

function findEntity(type, id, parentId) {
  switch (type) {
    case 'volume': return store.volumes.find(function(v) { return v.id === id; });
    case 'canon': return store.canons.find(function(c) { return c.id === id; });
    case 'rejection': return store.rejections.find(function(r) { return r.id === id; });
    case 'chapter': var vc = store.volumes.find(function(v) { return v.id === parentId; }); return vc ? (vc.chapters || []).find(function(c) { return c.id === id; }) : undefined;
    case 'todo': var vt = store.volumes.find(function(v) { return v.id === parentId; }); return vt ? (vt.todos || []).find(function(t) { return t.id === id; }) : undefined;
    case 'session': var d = store.journal.find(function(d) { return d.date === parentId; }); return d ? (d.sessions || []).find(function(s) { return s.id === id; }) : undefined;
  }
}

function insertEntity(type, payload, parentId) {
  switch (type) {
    case 'volume': store.volumes.push(payload); break;
    case 'canon': store.canons.push(payload); break;
    case 'rejection': store.rejections.push(payload); break;
    case 'chapter': var vc = store.volumes.find(function(v) { return v.id === parentId; }); if (vc) { if (!vc.chapters) vc.chapters = []; vc.chapters.push(payload); } break;
    case 'todo': var vt = store.volumes.find(function(v) { return v.id === parentId; }); if (vt) { if (!vt.todos) vt.todos = []; vt.todos.push(payload); } break;
    case 'session': var d = store.journal.find(function(x) { return x.date === parentId; }); if (!d) { d = { date: parentId, sessions: [] }; store.journal.push(d); } d.sessions.push(payload); break;
  }
}

function removeEntity(type, id, parentId) {
  switch (type) {
    case 'volume': store.volumes = store.volumes.filter(function(v) { return v.id !== id; }); break;
    case 'canon': store.canons = store.canons.filter(function(c) { return c.id !== id; }); break;
    case 'rejection': store.rejections = store.rejections.filter(function(r) { return r.id !== id; }); break;
    case 'chapter': var vc = store.volumes.find(function(v) { return v.id === parentId; }); if (vc) vc.chapters = (vc.chapters || []).filter(function(c) { return c.id !== id; }); break;
    case 'todo': var vt = store.volumes.find(function(v) { return v.id === parentId; }); if (vt) vt.todos = (vt.todos || []).filter(function(t) { return t.id !== id; }); break;
    case 'session': var d = store.journal.find(function(x) { return x.date === parentId; }); if (d) { d.sessions = (d.sessions || []).filter(function(s) { return s.id !== id; }); if (d.sessions.length === 0) store.journal = store.journal.filter(function(x) { return x.date !== parentId; }); } break;
  }
}

function purgeOldWalEntries() {
  var now = Date.now();
  var DAY_MS = 24 * 60 * 60 * 1000;
  var before = store._wal.length;
  store._wal = store._wal.filter(function(entry) {
    if (entry.status === 'pending' || entry.status === 'failed' || entry.status === 'syncing') return true;
    var entryTime = new Date(entry.timestamp).getTime();
    return (now - entryTime) < DAY_MS;
  });
  if (before !== store._wal.length) {
    try { localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal)); } catch(e) {}
  }
}

/* ============================================================
   PHASE 2: Sync Indicator & Tab Badge
   ============================================================ */

function renderSyncIndicator() {
  var dot = document.getElementById('syncIndicator');
  if (!dot) return;
  var pending = store._wal.filter(function(e) { return e.status === 'pending'; }).length;
  var failed = store._wal.filter(function(e) { return e.status === 'failed'; }).length;
  var syncing = store._wal.filter(function(e) { return e.status === 'syncing'; }).length;
  dot.className = 'cx-sync-dot';
  if (failed > 0) { dot.classList.add('cx-sync-failed'); dot.setAttribute('aria-label', 'Sync failed: ' + failed); }
  else if (syncing > 0 || pending > 0) { dot.classList.add('cx-sync-pending'); dot.setAttribute('aria-label', (pending + syncing) + ' pending'); }
  else { dot.classList.add('cx-sync-synced'); dot.setAttribute('aria-label', 'Synced'); }
}

function renderTabBadge() {
  var tab = document.querySelector('[data-tab="todos"]');
  if (!tab) return;
  var count = store.volumes.reduce(function(s, v) {
    return s + (v.todos || []).filter(function(t) { return t.status === 'open'; }).length;
  }, 0);
  var badge = tab.querySelector('.cx-tab-badge');
  if (count === 0) { if (badge) badge.remove(); return; }
  if (!badge) { badge = document.createElement('span'); badge.className = 'cx-tab-badge'; tab.appendChild(badge); }
  badge.textContent = count > 99 ? '99+' : String(count);
}

/* --- Progressive fetch with loading messages --- */
function fetchAllWithProgressiveMessages() {
  var vc = document.getElementById('viewContainer');
  if (vc) vc.innerHTML = '<div class="cx-loading-state">' + cx('book')
    + '<p class="cx-loading-text">Opening the library\u2026</p></div>';

  return fetchAll().then(function(fetched) {
    if (vc) vc.innerHTML = '<div class="cx-loading-state">' + cx('book')
      + '<p class="cx-loading-text">Arranging the shelves\u2026</p></div>';
    return fetched;
  });
}
