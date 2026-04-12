/* CODEX — Core (from spec CODEBASE_SHELL) */

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
    'info':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>'
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
  } else if (route.view === 'settings') {
    segments = [{ label: 'Library', route: '#/dashboard' }, { label: 'Settings', route: null }];
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
    var sep = i > 0 ? '<span class="cx-breadcrumb-sep">›</span>' : '';
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
      + '<button data-action="openSettings" class="cx-btn-icon">' + cx('lock') + '</button></div>';
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
var _isRendering = false;
var _initializing = true;

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
