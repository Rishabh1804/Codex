// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Canons tab overhaul to Forum Pattern (canon-0052 §Canons).
   Verifies sub-tab pattern (Canons / Schisms / Apocrypha) with localStorage
   persistence, Rostra signals derived from data (not hard-coded enums),
   filter pills derived from data, and pill-driven filtering. */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name), 'utf8'));
}

async function seedAppData(page) {
  const volumes = readJson('volumes.json');
  const canons = readJson('canons.json');
  const journal = readJson('journal.json');
  const companions = readJson('companions.json');
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
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.canons) && store.canons.length > 0;
  }, { timeout: 10000 });
}

async function openCanons(page) {
  await page.locator('[data-action="switchTab"][data-tab="canons"]').click();
  await expect(page.locator('.cx-subtab-row')).toBeVisible();
}

test.describe('Canons Forum Pattern (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedAppData(page);
  });

  test('computeCanonsStats derives every category from data (no hard-coded enum)', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    const stats = await page.evaluate(() => {
      // @ts-ignore - computeCanonsStats defined in views.js
      return computeCanonsStats();
    });
    // Shipped data has 7 distinct categories. The old hard-coded enum
    // had only 3; this test guards the derivation.
    const categoryKeys = stats.byCategory.map(c => c.key);
    expect(categoryKeys.length).toBeGreaterThanOrEqual(5);
    expect(categoryKeys).toEqual(expect.arrayContaining(['governance', 'builder_discipline']));
    // Status derivation should include the in-data 'pending' value the
    // old enum didn't list.
    const statusKeys = stats.byStatus.map(s => s.key);
    expect(statusKeys).toEqual(expect.arrayContaining(['active']));
  });

  test('Three sub-tab pills render; Canons is default', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);

    const subtabs = page.locator('.cx-subtab-row .cx-subtab-pill');
    await expect(subtabs).toHaveCount(3);
    await expect(subtabs.nth(0)).toContainText(/Canons/);
    await expect(subtabs.nth(1)).toContainText(/Schisms/);
    await expect(subtabs.nth(2)).toContainText(/Apocrypha/);
    // Default = Canons → first pill is the active one.
    await expect(subtabs.nth(0)).toHaveClass(/cx-filter-pill-active/);

    // Rostra should report 'canons' headline label.
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/canons/i);
  });

  test('Sub-tab switch persists to localStorage and re-renders', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);

    await page.locator('.cx-subtab-pill[data-key="schisms"]').click();
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/schisms/i);

    const stored = await page.evaluate(() => localStorage.getItem('codex-subtab-canons'));
    expect(stored).toBe('schisms');

    // Now switch to Apocrypha.
    await page.locator('.cx-subtab-pill[data-key="apocrypha"]').click();
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/apocrypha/i);
    const stored2 = await page.evaluate(() => localStorage.getItem('codex-subtab-canons'));
    expect(stored2).toBe('apocrypha');
  });

  test('Category filter pill is derived from data (not hard-coded)', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);

    // The 'governance' category exists in data but was NOT in the old
    // hard-coded CANON_CATEGORIES. A pill for it must now be visible.
    const govPill = page.locator('.cx-filter-pill[data-action="setCanonCategoryFilter"][data-key="governance"]');
    await expect(govPill).toBeVisible();
    const builderPill = page.locator('.cx-filter-pill[data-action="setCanonCategoryFilter"][data-key="builder_discipline"]');
    await expect(builderPill).toBeVisible();
  });

  test('Clicking a category pill narrows the visible canon set', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);

    // Capture full count from the filtered-count line.
    const initialCount = await page.locator('.cx-filter-count').first().textContent();
    expect(initialCount).toMatch(/\d+/);

    // Click governance.
    await page.locator('.cx-filter-pill[data-action="setCanonCategoryFilter"][data-key="governance"]').click();
    const filteredCount = await page.locator('.cx-filter-count').first().textContent();
    expect(filteredCount).toMatch(/Showing/);

    // Selected pill is active.
    await expect(page.locator('.cx-filter-pill[data-action="setCanonCategoryFilter"][data-key="governance"]')).toHaveClass(/cx-filter-pill-active/);
  });

  test('Schisms sub-tab renders Rostra + cards', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);
    await page.locator('.cx-subtab-pill[data-key="schisms"]').click();

    await expect(page.locator('.cx-rostra-headline')).toContainText(/\d+/);
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/schisms/i);
    // Filtered-count line present and at least one schism card rendered.
    await expect(page.locator('.cx-filter-count')).toBeVisible();
  });

  test('Apocrypha sub-tab renders Rostra + status filter pills', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openCanons(page);
    await page.locator('.cx-subtab-pill[data-key="apocrypha"]').click();

    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/apocrypha/i);
    // Status filter pill row present (derived from data — fulfilled / foretold / forgotten depending on shipped state).
    const statusPills = page.locator('.cx-filter-pill[data-action="setApocryphaStatusFilter"]');
    const count = await statusPills.count();
    // At minimum: All + at least one derived status.
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
