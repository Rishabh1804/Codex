// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Library (Dashboard) overhaul to Forum Pattern (canon-0052 §Library).
   Verifies the Rostra, derived Shelf + Cluster pills, filter narrowing,
   and cluster derivation from volume id. */

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
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.volumes) && store.volumes.length > 0;
  }, { timeout: 10000 });
}

test.describe('Library (Dashboard) Forum Pattern (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedAppData(page);
  });

  test('getVolumeCluster derives the canon-cc-016 residency mapping', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    const map = await page.evaluate(() => {
      return {
        codex: getVolumeCluster('codex'),
        sproutlab: getVolumeCluster('sproutlab'),
        sepInv: getVolumeCluster('sep-invoicing'),
        sepDash: getVolumeCluster('sep-dashboard'),
        cc: getVolumeCluster('command-center'),
        unknown: getVolumeCluster('businessai-simulation'),
      };
    });
    expect(map.codex).toBe('A');
    expect(map.sproutlab).toBe('A');
    expect(map.sepInv).toBe('B');
    expect(map.sepDash).toBe('B');
    expect(map.cc).toBe('Monument');
    expect(map.unknown).toBeNull();
  });

  test('Rostra renders volume count + shelf dots + cluster line + signals', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    // Dashboard is the default view on boot.
    await expect(page.locator('.cx-rostra')).toBeVisible();
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/volumes/i);
    // Per-shelf dots.
    await expect(page.locator('.cx-rostra-dot.cx-shelf-active').first()).toBeVisible();
    // Cluster stat line.
    await expect(page.locator('.cx-rostra-stats').filter({ hasText: 'Cluster:' })).toBeVisible();
    // Signals stat line (active ch, TODOs, sessions/mo, canons).
    await expect(page.locator('.cx-rostra-stats').filter({ hasText: 'Signals:' })).toBeVisible();
  });

  test('Shelf filter pill narrows the visible set', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // "Paused" shelf pill exists because shipped data has paused volumes.
    const pausedPill = page.locator('.cx-filter-pill[data-action="setLibraryShelfFilter"][data-key="paused"]');
    await expect(pausedPill).toBeVisible();
    await pausedPill.click();
    await expect(page.locator('.cx-filter-count')).toContainText(/Showing/);
  });

  test('Cluster filter pill derives from data and narrows the set', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // Cluster A pill exists.
    const clusterAPill = page.locator('.cx-filter-pill[data-action="setLibraryClusterFilter"][data-key="A"]');
    await expect(clusterAPill).toBeVisible();
    await clusterAPill.click();
    await expect(clusterAPill).toHaveClass(/cx-filter-pill-active/);
    // Only codex + sproutlab cards should render.
    const cards = page.locator('.cx-vol-card');
    const count = await cards.count();
    expect(count).toBe(2);
  });
});
