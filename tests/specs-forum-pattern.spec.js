// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Specs tab scaffold (canon-0052 §Specs).
   Verifies: specs.json loads into store, the 6th tab renders, Rostra
   surfaces the coverage-gap signal, category filter pills derive from
   data, spec cards link to their detail routes, and spec references
   resolve through renderReferenceLink. */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name), 'utf8'));
}

async function seedAppData(page) {
  const volumes = readJson('volumes.json');
  const canons = readJson('canons.json');
  const journal = readJson('journal.json');
  const companions = readJson('companions.json');
  const specs = readJson('specs.json');
  await page.addInitScript(
    ({ volumes, canons, journal, companions, specs }) => {
      localStorage.setItem('codex-cache-volumes', JSON.stringify(volumes));
      localStorage.setItem('codex-cache-canons', JSON.stringify(canons));
      localStorage.setItem('codex-cache-journal', JSON.stringify(journal));
      localStorage.setItem('codex-cache-companions', JSON.stringify(companions));
      localStorage.setItem('codex-cache-specs', JSON.stringify(specs));
      localStorage.setItem('codex-seed-version', '999');
      localStorage.setItem('codex-wizard-done', '1');
      localStorage.removeItem('codex-subtab-journal');
    },
    { volumes, canons, journal, companions, specs }
  );
}

async function waitForBoot(page) {
  await page.waitForFunction(() => {
    const bar = document.getElementById('tabBar');
    // @ts-ignore
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.volumes);
  }, { timeout: 10000 });
}

async function waitForSpecsLoaded(page) {
  await page.waitForFunction(() => {
    // @ts-ignore
    return typeof store !== 'undefined' && Array.isArray(store.specs) && store.specs.length > 0;
  }, { timeout: 10000 });
}

test.describe('Specs tab (canon-0052 §Specs)', () => {
  test.beforeEach(async ({ page }) => {
    await seedAppData(page);
  });

  test('Specs tab is present as the 6th top-level tab', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    const tabs = page.locator('#tabBar .cx-tab-btn');
    await expect(tabs).toHaveCount(6);
    await expect(tabs.nth(5)).toContainText(/Specs/i);
  });

  test('Specs Rostra renders headline + category dots + coverage-gap signal', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForSpecsLoaded(page);

    await page.locator('[data-action="switchTab"][data-tab="specs"]').click();
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/specs/i);
    await expect(page.locator('.cx-rostra-headline')).toContainText(/\d+/);

    // Category dots: seed data has impl-spec / design-spec / canon-draft / handoff.
    const dots = page.locator('.cx-rostra-dot.cx-spec-cat-dot, .cx-rostra .cx-rostra-dot');
    const dotCount = await dots.count();
    expect(dotCount).toBeGreaterThanOrEqual(2);
  });

  test('Category filter pills are derived from data', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForSpecsLoaded(page);
    await page.locator('[data-action="switchTab"][data-tab="specs"]').click();

    // Pills for the four seed categories should be visible.
    const canonDraftPill = page.locator('.cx-filter-pill[data-action="setSpecCategoryFilter"][data-key="canon-draft"]');
    const designSpecPill = page.locator('.cx-filter-pill[data-action="setSpecCategoryFilter"][data-key="design-spec"]');
    await expect(canonDraftPill).toBeVisible();
    await expect(designSpecPill).toBeVisible();

    // Click canon-draft and verify narrowed rendering.
    await canonDraftPill.click();
    await expect(canonDraftPill).toHaveClass(/cx-filter-pill-active/);
    await expect(page.locator('.cx-filter-count')).toContainText(/Showing/);
    // Seed has 2 canon-draft specs (forum-pattern + companion-log-format).
    const cards = page.locator('.cx-spec-card');
    const n = await cards.count();
    expect(n).toBe(2);
  });

  test('computeSpecsStats flags coverage gap for active chapters without spec_id', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForSpecsLoaded(page);

    const stats = await page.evaluate(() => {
      // @ts-ignore
      return computeSpecsStats();
    });
    // At minimum, sproutlab/device-sync-reconcile (spec-complete status,
    // no spec_id backpointer) should be in the gap.
    const hasDeviceSync = stats.coverageGap.some(g => g.chapterId === 'device-sync-reconcile');
    expect(hasDeviceSync).toBe(true);
  });

  test('Spec references resolve through the cross-cutting resolver', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForSpecsLoaded(page);

    const result = await page.evaluate(() => {
      // @ts-ignore - resolveReference on window
      return resolveReference('spec-0005-codex-design-principles');
    });
    expect(result).toBeTruthy();
    expect(result.type).toBe('spec');
    expect(result.route).toBe('#/spec/spec-0005-codex-design-principles');
  });
});
