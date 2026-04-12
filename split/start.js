/* CODEX — Start (from spec CODEBASE_SHELL) */

(function() {

/* --- Delegation (spec: 7 roots, Phase 1 uses document-level with spec action names) --- */
function setupDelegation() {
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;
    var id = el.dataset.id || '';
    var vol = el.dataset.vol || '';

    switch (action) {
      // Navigation
      case 'switchTab': handleSwitchTab(el.dataset.tab); break;
      case 'goToVolume': navigate('#/volume/' + encodeURIComponent(id)); break;
      case 'goBack': window.history.back(); break;
      case 'navigate': navigate(el.dataset.route); break;
      case 'openSettings': navigate('#/settings'); break;

      // FAB
      case 'fabAction': handleFabAction(); break;
      case 'fabAddChapter': closeOverlay(); setTimeout(function() { openAddChapter(vol); }, OVERLAY_ANIM_MS + 50); break;
      case 'fabAddTodo': closeOverlay(); setTimeout(function() { openCreateTodo(vol); }, OVERLAY_ANIM_MS + 50); break;

      // Overlay / Confirm
      case 'closeOverlay': closeOverlay(); break;
      case 'confirmOk': if (_confirmResolve) { var fn = _confirmResolve; _confirmResolve = null; fn(); } else { closeConfirmDialog(); } break;
      case 'confirmCancel': closeConfirmDialog(); break;

      // Volume
      case 'editVolume': openEditVolume(_currentViewParams.id); break;
      case 'handleSaveVolume': handleSaveVolume(id || null); break;
      case 'deleteVolume': handleDeleteVolume(id); break;
      case 'openShelfTransition': openShelfTransition(id); break;
      case 'handleConfirmShelfTransition': handleConfirmShelfTransition(id); break;

      // Chapter
      case 'editChapter': openEditChapter(vol, id); break;
      case 'handleSaveChapter': handleSaveChapter(vol, id || null); break;
      case 'handleDeleteChapter': handleDeleteChapter(vol, id); break;

      // TODO
      case 'handleSaveTodo': handleSaveTodo(vol); break;
      case 'toggleTodo': handleToggleTodo(vol, id); break;
      case 'deleteTodo': handleDeleteTodo(vol, id); break;

      // Settings
      case 'toggleTheme':
        var cur = localStorage.getItem(KEYS.THEME) || 'dark';
        var next = cur === 'dark' ? 'light' : 'dark';
        localStorage.setItem(KEYS.THEME, next);
        document.documentElement.setAttribute('data-theme', next);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', next === 'dark' ? '#1A1610' : '#FAF6F1');
        renderCurrentView();
        break;
      case 'setTextSize': applyTextSize(el.dataset.size); break;
      case 'exportData': handleExportData(); break;

      // Search (Phase 4 stub)
      case 'openSearch': showToast('Search coming in Phase 4', 'info'); break;

      // Coming soon
      case 'comingSoon': showToast('Coming soon', 'info'); break;
    }
  });

  // Overlay backdrop close
  document.getElementById('overlayBackdrop').addEventListener('click', closeOverlay);
  document.getElementById('confirmBackdrop').addEventListener('click', closeConfirmDialog);
}

/* --- Escape handler --- */
function _escapeHandler(e) {
  if (e.key !== 'Escape') return;
  if (!document.getElementById('confirmContainer').hidden) { closeConfirmDialog(); return; }
  if (!document.getElementById('overlayContainer').hidden) { closeOverlay(); return; }
}

/* --- Global error handlers --- */
window.addEventListener('error', function(event) {
  logError('uncaught', event.message, { filename: event.filename, lineno: event.lineno });
  try { showToast('Something went wrong', 'error'); } catch(e) {}
});
window.addEventListener('unhandledrejection', function(event) {
  logError('promise', event.reason ? event.reason.message || String(event.reason) : 'unknown');
});

/* --- localStorage test --- */
function testLocalStorage() {
  try { localStorage.setItem('codex-test', '1'); localStorage.removeItem('codex-test'); return true; } catch(e) { return false; }
}

/* --- Initialize (from spec — Phase 1: local-only, no GitHub fetch) --- */
function initialize() {
  if (!testLocalStorage()) {
    document.getElementById('viewContainer').innerHTML = '<div class="cx-blocker"><p>Codex requires local storage.</p></div>';
    return;
  }

  initTabIcons();

  // Load from localStorage cache
  var volData = safeParseLocalStorage(KEYS.CACHE_VOLUMES);
  var canonData = safeParseLocalStorage(KEYS.CACHE_CANONS);
  var journalData = safeParseLocalStorage(KEYS.CACHE_JOURNAL);

  // Seed on first visit OR when seed version is newer (Phase 1 only — removed once GitHub sync is live)
  var currentSeedVer = typeof SEED_VERSION === 'number' ? SEED_VERSION : 0;
  var storedSeedVer = parseInt(localStorage.getItem('codex-seed-version') || '0', 10);
  var needsSeed = (!volData && !canonData && !journalData) || (currentSeedVer > storedSeedVer);
  if (needsSeed && typeof getSeedVolumes === 'function') {
    volData = getSeedVolumes();
    canonData = getSeedCanons();
    journalData = getSeedJournal();
  }

  populateStore(
    { data: volData, sha: null },
    { data: canonData, sha: null },
    { data: journalData, sha: null }
  );

  // Persist seed data to localStorage
  if (needsSeed) {
    store._cacheToLocalStorage();
    localStorage.setItem('codex-seed-version', String(currentSeedVer));
  }

  // Register listeners
  store.onChange(function() {
    if (!_initializing) renderCurrentView();
  });

  // Parse initial route
  var route = parseRoute(location.hash);
  _currentView = route.view;
  _currentViewParams = route;
  updateTabBarActive(route.view);
  renderBreadcrumbForRoute(route);
  updateFab(route.view);

  // Initial render
  _initializing = false;
  renderCurrentView();

  // Setup interaction
  setupDelegation();
  document.addEventListener('keydown', _escapeHandler);
  window.addEventListener('hashchange', function() {
    if (_navigating) return;
    handleRouteChange(location.hash, true);
  });

  // Visit count
  var visits = parseInt(localStorage.getItem(KEYS.VISIT_COUNT) || '0', 10) + 1;
  localStorage.setItem(KEYS.VISIT_COUNT, String(visits));
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

})();
