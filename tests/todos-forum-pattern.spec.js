// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* TODOs overhaul to Forum Pattern (canon-0052 §TODOs).
   Verifies the new Rostra signals, derived volume filter pills, sort
   options, status filter, overdue/stalled chip rendering, and that
   filtered-count line reflects the active selection. */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name), 'utf8'));
}

/** Inject a synthetic volume with TODOs covering each age class:
 *  fresh (0d), overdue-not-stalled (20d), stalled (40d), resolved (5d ago,
 *  resolved 2d ago). */
async function seedTodoMatrix(page) {
  const volumes = readJson('volumes.json');
  const canons = readJson('canons.json');
  const journal = readJson('journal.json');
  const companions = readJson('companions.json');

  function daysAgoIso(d) {
    const n = new Date(); n.setDate(n.getDate() - d);
    return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
  }
  const matrixVolume = {
    id: 'todo-matrix',
    name: 'TODO Matrix Fixture',
    shelf: 'active',
    domain_color: '#ABCDEF',
    _deleted: false,
    _deleted_date: null,
    chapters: [],
    todos: [
      { id: 'tm-fresh', text: 'Fresh open todo', status: 'open', chapter: null, created: daysAgoIso(0), resolved: null, source_session: null, _deleted: false },
      { id: 'tm-overdue', text: 'Overdue but not stalled', status: 'open', chapter: null, created: daysAgoIso(20), resolved: null, source_session: null, _deleted: false },
      { id: 'tm-stalled', text: 'Stalled todo', status: 'open', chapter: null, created: daysAgoIso(40), resolved: null, source_session: null, _deleted: false },
      { id: 'tm-resolved', text: 'Resolved recently', status: 'resolved', chapter: null, created: daysAgoIso(5), resolved: daysAgoIso(2), source_session: null, _deleted: false },
    ],
  };
  volumes.volumes = (volumes.volumes || []).concat([matrixVolume]);

  await page.addInitScript(
    ({ volumes, canons, journal, companions }) => {
      localStorage.setItem('codex-cache-volumes', JSON.stringify(volumes));
      localStorage.setItem('codex-cache-canons', JSON.stringify(canons));
      localStorage.setItem('codex-cache-journal', JSON.stringify(journal));
      localStorage.setItem('codex-cache-companions', JSON.stringify(companions));
      localStorage.setItem('codex-seed-version', '999');
      localStorage.setItem('codex-wizard-done', '1');
    },
    { volumes, canons, journal, companions }
  );
}

async function waitForBoot(page) {
  await page.waitForFunction(() => {
    const bar = document.getElementById('tabBar');
    // @ts-ignore
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.volumes) && store.volumes.length > 0;
  }, { timeout: 10000 });
}

async function openTodos(page) {
  await page.locator('[data-action="switchTab"][data-tab="todos"]').click();
  await expect(page.locator('.cx-rostra')).toBeVisible();
}

test.describe('TODOs Forum Pattern (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedTodoMatrix(page);
  });

  test('computeTodoStats classifies the age matrix correctly', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    const stats = await page.evaluate(() => {
      // @ts-ignore - computeTodoStats defined in views.js
      return computeTodoStats();
    });
    // Matrix contributes: 3 open (fresh + overdue + stalled) + 1 resolved.
    // Other shipped data also has TODOs, so these should be ≥, not ===.
    expect(stats.open).toBeGreaterThanOrEqual(3);
    expect(stats.resolvedLifetime).toBeGreaterThanOrEqual(1);
    // Overdue includes the 20d and the 40d-old; stalled is just the 40d-old.
    expect(stats.overdue).toBeGreaterThanOrEqual(2);
    expect(stats.stalled).toBeGreaterThanOrEqual(1);
    // Per-volume entry exists for the fixture and surfaces openCount=3.
    const matrixVol = stats.perVolume.find(v => v.volId === 'todo-matrix');
    expect(matrixVol).toBeTruthy();
    expect(matrixVol.openCount).toBe(3);
  });

  test('Rostra renders headline, dots, and overdue/stalled chips', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openTodos(page);
    // Headline open count visible.
    await expect(page.locator('.cx-rostra-headline')).toContainText(/\d+/);
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/open/i);
    // Per-volume dots present for the fixture.
    await expect(page.locator('.cx-rostra-dot').first()).toBeVisible();
    // Overdue + stalled chips render in the Rostra (matrix guarantees both > 0).
    await expect(page.locator('.cx-rostra .cx-overdue-chip')).toBeVisible();
    await expect(page.locator('.cx-rostra .cx-stalled-chip')).toBeVisible();
  });

  test('Filter pills derive from data and filter the visible cards', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openTodos(page);

    // A pill exists for the synthetic matrix volume (derived from data).
    const matrixPill = page.locator('.cx-filter-pill[data-action="setTodoVolumeFilter"][data-key="todo-matrix"]');
    await expect(matrixPill).toBeVisible();
    await expect(matrixPill).toContainText(/Matrix/i);

    // Click the matrix volume pill — filtered count line updates and only matrix TODOs render.
    await matrixPill.click();
    await expect(page.locator('.cx-filter-count')).toContainText(/Showing/i);
    await expect(page.locator('text=Stalled todo')).toBeVisible();
    // Other-volume TODOs should be filtered out — the codex test fixtures
    // include known TODOs with text we can search for.
    const codexTodoCount = await page.locator('text=Fix ctStorageWarning').count();
    expect(codexTodoCount).toBe(0);
  });

  test('Status: Resolved shows resolved entries; Open hides them', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openTodos(page);

    // Default = Open: the resolved fixture is hidden.
    await expect(page.locator('text=Resolved recently')).not.toBeVisible();

    // Switch to Resolved.
    await page.locator('.cx-filter-pill[data-action="setTodoStatusFilter"][data-key="resolved"]').click();
    await expect(page.locator('text=Resolved recently')).toBeVisible();
    // Open ones now hidden.
    await expect(page.locator('text=Stalled todo')).not.toBeVisible();
  });

  test('Card-level overdue/stalled chip renders on aged TODOs', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openTodos(page);

    // The matrix fixture: stalled card should carry the stalled chip.
    const stalledCard = page.locator('.cx-todo-item:has-text("Stalled todo")');
    await expect(stalledCard).toBeVisible();
    await expect(stalledCard.locator('.cx-stalled-chip')).toBeVisible();

    // Overdue-but-not-stalled card carries the overdue chip (no stalled chip).
    const overdueCard = page.locator('.cx-todo-item:has-text("Overdue but not stalled")');
    await expect(overdueCard.locator('.cx-overdue-chip')).toBeVisible();
    await expect(overdueCard.locator('.cx-stalled-chip')).not.toBeVisible();

    // Fresh card carries neither.
    const freshCard = page.locator('.cx-todo-item:has-text("Fresh open todo")');
    await expect(freshCard.locator('.cx-overdue-chip')).not.toBeVisible();
    await expect(freshCard.locator('.cx-stalled-chip')).not.toBeVisible();
  });
});
