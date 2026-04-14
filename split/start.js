/* CODEX — Start (Phase 5: Chapter Detail + Apocrypha) */

(function() {

/* --- Delegation (Phase 2: added wizard, GitHub, sync actions) --- */
var _delegationReady = false;
function setupDelegation() {
  if (_delegationReady) return;
  _delegationReady = true;
  document.addEventListener('click', function(e) {
    // Phase 4: Dismiss sync panel on outside click
    var syncPanel = document.getElementById('syncDetailPanel');
    if (syncPanel && !syncPanel.contains(e.target) && !e.target.closest('#syncIndicator')) {
      syncPanel.remove();
    }

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
      case 'editChapterDetail': openEditChapter(_currentViewParams.volumeId, _currentViewParams.chapterId); break;
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

      // Phase 2: GitHub Settings
      case 'validateAndSaveGitHub': handleSettingsGitHubSave(); break;
      case 'syncNow': handleSyncNow(); break;
      case 'disconnectGitHub': handleDisconnectGitHub(); break;

      // Phase 2: Wizard
      case 'wizardNext': _wizardStep = 2; renderWizard(); break;
      case 'wizardValidateGitHub': handleWizardValidate(); break;
      case 'wizardSkipGitHub':
        localStorage.setItem(KEYS.WIZARD_DONE, 'skipped');
        _wizardStep = 3;
        renderWizard();
        break;
      case 'wizardSelectTheme':
        var theme = el.dataset.value;
        localStorage.setItem(KEYS.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
        var tc = document.querySelector('meta[name="theme-color"]');
        if (tc) tc.setAttribute('content', theme === 'dark' ? '#1A1610' : '#FAF6F1');
        _wizardStep = 3;
        renderWizard();
        break;
      case 'wizardThemeNext': _wizardStep = 4; renderWizard(); break;
      case 'wizardFinish':
        localStorage.setItem(KEYS.WIZARD_DONE, 'true');
        document.getElementById('tabBar').hidden = false;
        _wizardStep = 1;
        initializeApp();
        break;

      // Phase 4: Search
      case 'openSearch': openSearch(); break;
      case 'closeSearch': closeSearch(); break;
      case 'searchNavigate': closeSearch(); navigate(el.dataset.route); break;

      // Phase 4: Heatmap
      case 'heatmapTap':
        var hDate = el.dataset.date;
        var hasSessions = store.journal.some(function(d) { return d.date === hDate && (d.sessions || []).length > 0; });
        if (hasSessions) {
          _journalFilters.range = 'all';
          _journalLoadMoreCount = 999;
          navigate('#/journal');
        } else {
          showToast('No sessions on ' + formatAbsoluteDate(hDate), 'info');
        }
        break;

      // Phase 4: Sub-settings
      case 'viewTrash': renderTrashView(); break;
      case 'viewErrorLog': renderErrorLogView(); break;
      case 'viewStorage': renderStorageUsage(); break;
      case 'clearErrorLog': localStorage.removeItem(KEYS.ERROR_LOG); renderErrorLogView(); showToast('Log cleared', 'success'); break;

      // Phase 4: Trash actions
      case 'restoreCanon':
        var rc = store.canons.find(function(c) { return c.id === id; });
        if (rc) { rc._deleted = false; rc._deleted_date = null; store._createWalEntry('update', 'canon', id, 'canons.json', { _deleted: false, _deleted_date: null }); store._fireChange(); showToast('Canon restored', 'success'); renderTrashView(); }
        break;
      case 'restoreChapter':
        var rcv = store.volumes.find(function(v) { return v.id === vol; });
        if (rcv) { var rch = (rcv.chapters || []).find(function(c) { return c.id === id; }); if (rch) { rch._deleted = false; rch._deleted_date = null; store._createWalEntry('update', 'chapter', id, 'volumes.json', { _deleted: false, _deleted_date: null }, vol); store._fireChange(); showToast('Chapter restored', 'success'); renderTrashView(); } }
        break;
      case 'permanentDeleteCanon':
        showConfirmDialog('Permanently Delete', 'This cannot be undone. Are you sure?', function() {
          store.canons = store.canons.filter(function(c) { return c.id !== id; });
          store._createWalEntry('delete', 'canon', id, 'canons.json', { _permanent: true });
          store._fireChange();
          showToast('Permanently deleted', 'success');
          closeConfirmDialog();
          renderTrashView();
        }, { danger: true, label: 'Delete Forever' });
        break;
      case 'permanentDeleteChapter':
        showConfirmDialog('Permanently Delete', 'This cannot be undone. Are you sure?', function() {
          var pdv = store.volumes.find(function(v) { return v.id === vol; });
          if (pdv) {
            pdv.chapters = (pdv.chapters || []).filter(function(c) { return c.id !== id; });
            store._createWalEntry('delete', 'chapter', id, 'volumes.json', { _permanent: true }, vol);
            store._fireChange();
          }
          showToast('Permanently deleted', 'success');
          closeConfirmDialog();
          renderTrashView();
        }, { danger: true, label: 'Delete Forever' });
        break;
      case 'restoreApocryphon':
        var ra = store.apocrypha.find(function(a) { return a.id === id; });
        if (ra) { ra._deleted = false; ra._deleted_date = null; store._createWalEntry('update', 'apocryphon', id, 'canons.json', { _deleted: false, _deleted_date: null }); store._fireChange(); showToast('Apocryphon restored', 'success'); renderTrashView(); }
        break;
      case 'permanentDeleteApocryphon':
        showConfirmDialog('Permanently Delete', 'This cannot be undone. Are you sure?', function() {
          store.apocrypha = store.apocrypha.filter(function(a) { return a.id !== id; });
          store._createWalEntry('delete', 'apocryphon', id, 'canons.json', { _permanent: true });
          store._fireChange();
          showToast('Permanently deleted', 'success');
          closeConfirmDialog();
          renderTrashView();
        }, { danger: true, label: 'Delete Forever' });
        break;

      // Phase 4: Sync panel
      case 'closeSyncPanel':
        var sp = document.getElementById('syncDetailPanel');
        if (sp) sp.remove();
        break;
      case 'forceSyncFromPanel':
        var spp = document.getElementById('syncDetailPanel');
        if (spp) spp.remove();
        handleSyncNow();
        break;

      // Phase 3: Journal
      case 'setJournalRange': _journalFilters.range = el.dataset.value; _journalLoadMoreCount = 30; renderCurrentView(); break;
      case 'loadMoreJournal': _journalLoadMoreCount += 30; renderCurrentView(); break;
      case 'setJournalVolume':
        _journalFilters.volume = el.dataset.value || null;
        _journalLoadMoreCount = 30;
        renderCurrentView();
        break;
      case 'openCreateSession': openCreateSession(); break;
      case 'handleSaveSession': handleSaveSession(); break;
      case 'deleteSession': handleDeleteSession(el.dataset.date, id); break;

      // Phase 3: Canons
      case 'goToCanon': navigate('#/canon/' + encodeURIComponent(id)); break;
      case 'toggleCanonFilter':
        var key = el.dataset.key;
        var val = el.dataset.value;
        _canonFilters[key] = val || null;
        _canonPage = 1;
        renderCurrentView();
        break;
      case 'setCanonSort':
        _canonSort = el.dataset.value || 'newest';
        _canonPage = 1;
        renderCurrentView();
        break;
      case 'changePage': _canonPage = parseInt(el.dataset.page, 10) || 1; renderCurrentView(); document.getElementById('viewContainer').scrollTop = 0; break;

      // Phase 5: Apocrypha
      case 'toggleApocrypha':
        var apoSec = document.getElementById('apocryphaSection');
        var apoToggle = document.getElementById('apocryphaToggle');
        if (apoSec) { apoSec.hidden = !apoSec.hidden; if (apoToggle) apoToggle.textContent = apoSec.hidden ? '\u25B6' : '\u25BC'; }
        break;

      case 'openCreateCanon': openCreateCanon(); break;
      case 'editCanon': openEditCanon(id); break;
      case 'handleSaveCanon': handleSaveCanon(id || null); break;
      case 'deleteCanon': handleDeleteCanon(id); break;
      case 'copyCanonId': handleCopyCanonId(id); break;
      case 'copyCanonJson': handleCopyCanonJson(id); break;

      // Apocrypha edit/delete
      case 'editApocryphon': openEditApocryphon(id); break;
      case 'handleSaveApocryphon': handleSaveApocryphon(id); break;
      case 'deleteApocryphonAction': handleDeleteApocryphon(id); break;

      // Phase 3: Schisms
      case 'openCreateSchism': openCreateSchism(); break;
      case 'handleSaveSchism': handleSaveSchism(); break;

      // Phase 3: Snippet Import
      case 'openSnippetImport': openSnippetImport(); break;
      case 'previewSnippet': handlePreviewSnippet(); break;
      case 'importSnippet': handleImportSnippet(); break;

      // Phase 3: Expand/Collapse text
      case 'expandText': handleExpandText(el); break;
      case 'collapseText': handleCollapseText(el); break;
      case 'toggleExpand':
        var container = el.closest('[data-expandable]');
        if (container) {
          var content = container.querySelector('.cx-expandable-content');
          var isExpanded = container.dataset.expanded === 'true';
          if (isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(function() { content.style.maxHeight = '0'; });
            container.dataset.expanded = 'false';
            el.classList.remove('cx-expand-open');
          } else {
            content.style.maxHeight = '0';
            requestAnimationFrame(function() {
              content.style.maxHeight = content.scrollHeight + 'px';
            });
            container.dataset.expanded = 'true';
            el.classList.add('cx-expand-open');
            setTimeout(function() { if (container.dataset.expanded === 'true') content.style.maxHeight = 'none'; }, 200);
          }
        }
        break;

      // Coming soon
      case 'comingSoon': showToast('Coming soon', 'info'); break;
    }
  });

  // Overlay backdrop close
  document.getElementById('overlayBackdrop').addEventListener('click', closeOverlay);
  document.getElementById('confirmBackdrop').addEventListener('click', closeConfirmDialog);

  // Sync indicator — Phase 4: real panel
  var syncDot = document.getElementById('syncIndicator');
  if (syncDot) syncDot.addEventListener('click', toggleSyncDetailPanel);
}

/* --- Escape handler --- */
function _escapeHandler(e) {
  if (e.key !== 'Escape') return;
  if (!document.getElementById('confirmContainer').hidden) { closeConfirmDialog(); return; }
  if (!document.getElementById('overlayContainer').hidden) { closeOverlay(); return; }
  // Phase 4: search overlay
  if (!document.getElementById('searchOverlay').hidden) { closeSearch(); return; }
  // Phase 4: sync panel
  var sp = document.getElementById('syncDetailPanel');
  if (sp) { sp.remove(); return; }
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

/* --- Phase 2: Service Worker --- */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('sw.js?v=7', { scope: './' })
    .then(function(reg) {
      reg.addEventListener('updatefound', function() {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function() {
          if (nw.state === 'activated' && navigator.serviceWorker.controller) {
            showToast('New version available \u2014 refresh', 'info');
          }
        });
      });
    })
    .catch(function(err) { logError('sw', 'Registration failed', err.message); });
}

/* --- Phase 2: bfcache handler --- */
function handlePageShow(event) {
  if (!event.persisted) return;
  var repoUrl = localStorage.getItem(KEYS.REPO_URL);
  if (repoUrl) {
    fetchAll().then(function(f) {
      populateStore(f['volumes.json'], f['canons.json'], f['journal.json']);
      replayWal(store._wal);
      renderCurrentView();
    });
  }
}

/* --- Phase 2: Wizard Handlers --- */
function handleWizardValidate() {
  var repoInput = document.getElementById('field-wizard-repo');
  var tokenInput = document.getElementById('field-wizard-token');
  var statusEl = document.getElementById('wizard-validation-status');
  if (!repoInput || !tokenInput) return;

  var rawUrl = repoInput.value.trim();
  var token = tokenInput.value.trim();

  if (!rawUrl || !token) {
    if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">Both fields are required</div>';
    return;
  }

  var normalized = normalizeRepoUrl(rawUrl);
  if (!normalized) {
    if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">Invalid repository URL. Use: owner/repo</div>';
    return;
  }

  if (statusEl) statusEl.innerHTML = '<div class="cx-settings-hint">Validating\u2026</div>';

  validateToken(normalized, token).then(function(result) {
    if (result.valid) {
      localStorage.setItem(KEYS.REPO_URL, normalized);
      localStorage.setItem(KEYS.TOKEN, token);
      localStorage.setItem(KEYS.DEFAULT_BRANCH, result.defaultBranch || 'main');
      localStorage.setItem(KEYS.WIZARD_DONE, 'true');
      if (statusEl) statusEl.innerHTML = '<div style="color:var(--success)">' + cx('check') + ' Connected to ' + escHtml(result.repoFullName) + '</div>';
      setTimeout(function() { _wizardStep = 3; renderWizard(); }, 800);
    } else {
      if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">' + escHtml(result.reason) + '</div>';
    }
  });
}

/* --- Phase 2: Settings GitHub Handlers --- */
function handleSettingsGitHubSave() {
  var repoInput = document.getElementById('field-settings-repo');
  var tokenInput = document.getElementById('field-settings-token');
  var statusEl = document.getElementById('github-validation-status');
  if (!repoInput || !tokenInput) return;

  var rawUrl = repoInput.value.trim();
  var token = tokenInput.value.trim();

  if (!rawUrl || !token) {
    if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">Both fields are required</div>';
    return;
  }

  var normalized = normalizeRepoUrl(rawUrl);
  if (!normalized) {
    if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">Invalid format. Use: owner/repo</div>';
    return;
  }

  if (statusEl) statusEl.innerHTML = '<div class="cx-settings-hint">Validating\u2026</div>';

  validateToken(normalized, token).then(function(result) {
    if (result.valid) {
      localStorage.setItem(KEYS.REPO_URL, normalized);
      localStorage.setItem(KEYS.TOKEN, token);
      localStorage.setItem(KEYS.DEFAULT_BRANCH, result.defaultBranch || 'main');
      showToast('Connected to ' + result.repoFullName, 'success');
      setOfflineStatus(false);
      // Sync existing local data to the repo
      flushQueue();
      renderSettings();
    } else {
      if (statusEl) statusEl.innerHTML = '<div class="cx-form-error" style="display:block">' + escHtml(result.reason) + '</div>';
    }
  });
}

function handleSyncNow() {
  if (!localStorage.getItem(KEYS.REPO_URL)) {
    showToast('No GitHub repo connected', 'info');
    return;
  }
  showToast('Syncing\u2026', 'info');
  fetchAll().then(function(fetched) {
    populateStore(fetched['volumes.json'], fetched['canons.json'], fetched['journal.json']);
    replayWal(store._wal);
    return flushQueue();
  }).then(function() {
    renderCurrentView();
    showToast('Sync complete', 'success');
  }).catch(function(e) {
    logError('syncNow', e.message);
    showToast('Sync failed', 'error');
  });
}

function handleDisconnectGitHub() {
  showConfirmDialog('Disconnect GitHub?',
    'Your data will remain locally. You can reconnect anytime.',
    function() {
      localStorage.removeItem(KEYS.REPO_URL);
      localStorage.removeItem(KEYS.TOKEN);
      localStorage.removeItem(KEYS.DEFAULT_BRANCH);
      localStorage.removeItem(KEYS.SHA_VOLUMES);
      localStorage.removeItem(KEYS.SHA_CANONS);
      localStorage.removeItem(KEYS.SHA_JOURNAL);
      store._meta.shas = { volumes: null, canons: null, journal: null };
      // Clear synced WAL entries; keep pending/failed
      store._wal = store._wal.filter(function(e) {
        return e.status === 'pending' || e.status === 'failed';
      });
      try { localStorage.setItem(KEYS.WAL, JSON.stringify(store._wal)); } catch(e) {}
      setOfflineStatus(false);
      showToast('Disconnected from GitHub', 'success');
      renderSettings();
    },
    { danger: true, label: 'Disconnect' }
  );
}

/* ============================================================
   Swipe Navigation (canon from SproutLab SWIPE_NAVIGATION_REFERENCE)
   ============================================================ */
var TAB_ORDER = ['dashboard', 'journal', 'canons', 'todos'];
var _swipeStartX = 0, _swipeStartY = 0, _swipeTarget = null;

function setupSwipeNavigation() {
  var vc = document.getElementById('viewContainer');
  if (!vc) return;

  vc.addEventListener('touchstart', function(e) {
    var touch = e.changedTouches[0];
    _swipeStartX = touch.screenX;
    _swipeStartY = touch.screenY;
    _swipeTarget = e.target;
  }, { passive: true });

  vc.addEventListener('touchend', function(e) {
    var touch = e.changedTouches[0];
    var dx = touch.screenX - _swipeStartX;
    var dy = touch.screenY - _swipeStartY;

    // Must be horizontal dominant (canon: |dx| > 60, |dy| < |dx| * 0.7)
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7) return;

    // Suppress during text input
    var active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) return;

    // Suppress during overlays
    if (!document.getElementById('overlayContainer').hidden) return;
    if (!document.getElementById('confirmContainer').hidden) return;

    // Only swipe on tab-level views
    var tabIndex = TAB_ORDER.indexOf(_currentView);
    if (tabIndex === -1) return;

    // Suppress inside horizontally scrollable elements (canon: scrollWidth > clientWidth + 2)
    var el = _swipeTarget;
    while (el && el !== vc) {
      if (el.scrollWidth > el.clientWidth + 2) {
        var style = getComputedStyle(el);
        if (style.overflowX !== 'hidden' && style.overflowX !== 'visible') return;
      }
      el = el.parentElement;
    }

    if (dx < -60 && tabIndex < TAB_ORDER.length - 1) {
      handleSwitchTab(TAB_ORDER[tabIndex + 1]);
    } else if (dx > 60 && tabIndex > 0) {
      handleSwitchTab(TAB_ORDER[tabIndex - 1]);
    }
  }, { passive: true });
}

/* ============================================================
   Pull-to-Refresh
   ============================================================ */
var _pullStartY = 0, _pullable = false;

function setupPullToRefresh() {
  var vc = document.getElementById('viewContainer');
  if (!vc) return;

  // Create pull indicator (outside viewContainer so it persists across renders)
  var indicator = document.createElement('div');
  indicator.id = 'pullIndicator';
  indicator.className = 'cx-pull-indicator';
  indicator.innerHTML = '<div class="cx-pull-spinner">' + cx('refresh') + '</div>';
  vc.parentNode.insertBefore(indicator, vc);

  var THRESHOLD = 80;

  vc.addEventListener('touchstart', function(e) {
    _pullable = (vc.scrollTop <= 0);
    if (_pullable) _pullStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  vc.addEventListener('touchmove', function(e) {
    if (!_pullable) return;
    if (!document.getElementById('overlayContainer').hidden) return;
    var dy = e.changedTouches[0].screenY - _pullStartY;
    var dx = e.changedTouches[0].screenX - _swipeStartX;
    if (dy <= 0 || Math.abs(dx) > dy * 0.5) {
      indicator.style.height = '0';
      indicator.style.opacity = '0';
      return;
    }
    // Resistance feel: dampen the pull
    var pull = Math.min(dy * 0.4, 60);
    indicator.style.height = pull + 'px';
    indicator.style.opacity = String(Math.min(dy / THRESHOLD, 1));
    var spinner = indicator.querySelector('.cx-pull-spinner');
    if (spinner) {
      var rotation = Math.min((dy / THRESHOLD) * 360, 360);
      spinner.style.transform = 'rotate(' + rotation + 'deg)';
      indicator.classList.toggle('cx-pull-ready', dy >= THRESHOLD);
    }
  }, { passive: true });

  vc.addEventListener('touchend', function(e) {
    if (!_pullable) return;
    _pullable = false;
    var dy = e.changedTouches[0].screenY - _pullStartY;
    var dx = e.changedTouches[0].screenX - _swipeStartX;

    if (dy >= THRESHOLD && Math.abs(dx) < dy * 0.5) {
      // Trigger refresh — hold indicator open with spin animation
      indicator.classList.add('cx-pull-refreshing');
      indicator.classList.remove('cx-pull-ready');
      indicator.style.height = '48px';
      indicator.style.opacity = '1';
      handlePullRefresh().then(function() { collapsePullIndicator(indicator); });
    } else {
      // Cancelled — collapse
      collapsePullIndicator(indicator);
    }
  }, { passive: true });
}

function collapsePullIndicator(indicator) {
  if (!indicator) indicator = document.getElementById('pullIndicator');
  if (!indicator) return;
  indicator.style.transition = 'height 0.3s ease, opacity 0.3s ease';
  indicator.style.height = '0';
  indicator.style.opacity = '0';
  indicator.classList.remove('cx-pull-refreshing', 'cx-pull-ready');
  var spinner = indicator.querySelector('.cx-pull-spinner');
  if (spinner) spinner.style.transform = '';
  setTimeout(function() { indicator.style.transition = ''; }, 300);
}

function handlePullRefresh() {
  if (!localStorage.getItem(KEYS.REPO_URL)) {
    renderCurrentView();
    return Promise.resolve();
  }
  return fetchAll().then(function(f) {
    populateStore(f['volumes.json'], f['canons.json'], f['journal.json']);
    replayWal(store._wal);
    renderCurrentView();
    showToast('Synced', 'success');
  }).catch(function() {
    showToast('Refresh failed', 'error');
  });
}

var _gesturesReady = false;
function setupGestures() {
  if (_gesturesReady) return;
  _gesturesReady = true;
  setupSwipeNavigation();
  setupPullToRefresh();
}

/* --- Initialize (Phase 2: full 15-step lifecycle) --- */
function initializeApp() {
  if (!testLocalStorage()) {
    document.getElementById('viewContainer').innerHTML = '<div class="cx-blocker"><p>Codex requires local storage.</p></div>';
    return;
  }

  // Register service worker (async, non-blocking)
  registerServiceWorker();

  initTabIcons();

  // Step 5: Check if wizard needed
  var repoUrl = localStorage.getItem(KEYS.REPO_URL);
  var wizardDone = localStorage.getItem(KEYS.WIZARD_DONE);
  if (!repoUrl && !wizardDone) {
    document.getElementById('tabBar').hidden = true;
    var fab = document.getElementById('fabButton');
    if (fab) fab.classList.add('cx-fab-hidden');
    renderWizard();
    setupDelegation();
    document.addEventListener('keydown', _escapeHandler);
    return;
  }

  // Step 7: Load WAL from localStorage
  try { store._wal = JSON.parse(localStorage.getItem(KEYS.WAL) || '[]'); } catch(e) { store._wal = []; }
  store._wal.forEach(function(e) { if (e.status === 'syncing') e.status = 'pending'; });

  // Step 8-10: Fetch or load from cache
  var bootPromise;
  if (repoUrl) {
    bootPromise = fetchAllWithProgressiveMessages();
  } else {
    // Local-only mode: load from cache
    bootPromise = Promise.resolve({
      'volumes.json': { data: safeParseLocalStorage(KEYS.CACHE_VOLUMES), sha: null, fromCache: true },
      'canons.json': { data: safeParseLocalStorage(KEYS.CACHE_CANONS), sha: null, fromCache: true },
      'journal.json': { data: safeParseLocalStorage(KEYS.CACHE_JOURNAL), sha: null, fromCache: true }
    });
  }

  bootPromise.then(function(fetched) {
    // Seed on first visit (local-only mode, Phase 1 compat)
    var volData = fetched['volumes.json'].data;
    var canonData = fetched['canons.json'].data;
    var journalData = fetched['journal.json'].data;

    if (!repoUrl) {
      var currentSeedVer = typeof SEED_VERSION === 'number' ? SEED_VERSION : 0;
      var storedSeedVer = parseInt(localStorage.getItem('codex-seed-version') || '0', 10);
      var needsSeed = (!volData && !canonData && !journalData) || (currentSeedVer > storedSeedVer);
      if (needsSeed && typeof getSeedVolumes === 'function') {
        fetched['volumes.json'] = { data: getSeedVolumes(), sha: null };
        fetched['canons.json'] = { data: getSeedCanons(), sha: null };
        fetched['journal.json'] = { data: getSeedJournal(), sha: null };
        localStorage.setItem('codex-seed-version', String(currentSeedVer));
      }
    }

    // Step 10: Populate store
    populateStore(fetched['volumes.json'], fetched['canons.json'], fetched['journal.json']);

    // Step 11: Replay WAL
    replayWal(store._wal);

    // Step 11.5: Run migrations (Phase 5)
    if (typeof CODEX_MIGRATIONS !== 'undefined') {
      var _applied = JSON.parse(localStorage.getItem('codex-migrations') || '[]');
      CODEX_MIGRATIONS.forEach(function(m) {
        if (_applied.indexOf(m.id) !== -1) return;
        try { m.run(); _applied.push(m.id); }
        catch(e) { logError('migration', m.id, e.message); }
      });
      localStorage.setItem('codex-migrations', JSON.stringify(_applied));
      store._cacheToLocalStorage();
    }

    // Step 12: Register listeners
    store.onChange(function() {
      if (!_initializing) renderCurrentView();
    });
    store.onWalChange(function() {
      renderSyncIndicator();
      renderTabBadge();
    });

    // Step 13-14: Parse route and render
    var route = parseRoute(location.hash);
    _currentView = route.view;
    _currentViewParams = route;
    document.getElementById('tabBar').hidden = false;
    updateTabBarActive(route.view);
    renderBreadcrumbForRoute(route);
    updateFab(route.view);

    // Step 15: Finish initialization
    _initializing = false;
    renderCurrentView();

    // Post-init
    purgeOldWalEntries();
    renderSyncIndicator();
    renderTabBadge();
    setupGestures();

    var visits = parseInt(localStorage.getItem(KEYS.VISIT_COUNT) || '0', 10) + 1;
    localStorage.setItem(KEYS.VISIT_COUNT, String(visits));
  }).catch(function(e) {
    logError('init', 'Boot failed', e.message);
    _initializing = false;
    // Fall back to cached data
    populateStore(
      { data: safeParseLocalStorage(KEYS.CACHE_VOLUMES), sha: null },
      { data: safeParseLocalStorage(KEYS.CACHE_CANONS), sha: null },
      { data: safeParseLocalStorage(KEYS.CACHE_JOURNAL), sha: null }
    );
    renderCurrentView();
    showToast('Loaded from cache \u2014 some data may be stale', 'warning');
  });

  // Setup interaction (immediate, before async boot completes)
  setupDelegation();
  document.addEventListener('keydown', _escapeHandler);
  window.addEventListener('hashchange', function() {
    if (_navigating) return;
    handleRouteChange(location.hash, true);
  });
  window.addEventListener('pageshow', handlePageShow);
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

})();
