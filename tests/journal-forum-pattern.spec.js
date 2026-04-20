// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Journal tab overhaul to Forum Pattern (canon-0052 §Journal).
   Verifies the four sub-tabs (All / Sessions / Decrees / Logs), per-sub-tab
   Rostra signals, decree partitioning (id startsWith 'decree-' OR
   ratification_mode set), and the Logs sub-tab populating from the
   build-time companion-logs.json index. */

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
      // Reset any prior sub-tab selection so the All default applies.
      localStorage.removeItem('codex-subtab-journal');
    },
    { volumes, canons, journal, companions }
  );
}

async function waitForBoot(page) {
  await page.waitForFunction(() => {
    const bar = document.getElementById('tabBar');
    // @ts-ignore
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.journal);
  }, { timeout: 10000 });
}

async function waitForLogsLoaded(page) {
  // Logs are fetched async after boot — wait for the store to populate.
  await page.waitForFunction(() => {
    // @ts-ignore
    return typeof store !== 'undefined' && Array.isArray(store.companion_logs) && store.companion_logs.length > 0;
  }, { timeout: 10000 });
}

async function openJournal(page) {
  await page.locator('[data-action="switchTab"][data-tab="journal"]').click();
  await expect(page.locator('.cx-subtab-row')).toBeVisible();
}

test.describe('Journal Forum Pattern (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedAppData(page);
  });

  test('Four sub-tab pills render; All is default', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openJournal(page);

    const subtabs = page.locator('.cx-subtab-row .cx-subtab-pill');
    await expect(subtabs).toHaveCount(4);
    await expect(subtabs.nth(0)).toContainText(/All/);
    await expect(subtabs.nth(1)).toContainText(/Sessions/);
    await expect(subtabs.nth(2)).toContainText(/Decrees/);
    await expect(subtabs.nth(3)).toContainText(/Logs/);
    // Default = All.
    await expect(subtabs.nth(0)).toHaveClass(/cx-filter-pill-active/);
    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/entries/i);
  });

  test('isDecreeSession partitions by id-prefix or ratification_mode', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    const result = await page.evaluate(() => {
      // @ts-ignore
      return {
        idPrefix: isDecreeSession({ id: 'decree-0001-foo' }),
        ratMode: isDecreeSession({ id: 's-2026-04-17-04', ratification_mode: 'canon-cc-012' }),
        regular: isDecreeSession({ id: 's-2026-04-15-01' }),
        empty: isDecreeSession(null),
      };
    });
    expect(result.idPrefix).toBe(true);
    expect(result.ratMode).toBe(true);
    expect(result.regular).toBe(false);
    expect(result.empty).toBe(false);
  });

  test('Decrees sub-tab Rostra reports the decree-shaped sessions', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openJournal(page);
    await page.locator('.cx-subtab-pill[data-key="decrees"]').click();

    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/decrees/i);
    // Shipped data has at least 2 decree-shaped sessions.
    const headline = await page.locator('.cx-rostra-headline').textContent();
    expect(headline).toMatch(/\d+/);
  });

  test('Logs sub-tab Rostra surfaces companion-log signals', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForLogsLoaded(page);
    await openJournal(page);
    await page.locator('.cx-subtab-pill[data-key="logs"]').click();

    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/logs/i);
    // Province logs at v1 schema — headline counts however many are currently indexed.
    await expect(page.locator('.cx-rostra-headline')).toContainText(/\d+/);

    // Logs are flagged for same-agent drift.
    await expect(page.locator('.cx-rostra .cx-overdue-chip')).toContainText(/drift/i);

    // Per-companion invocation row mentions at least one companion.
    await expect(page.locator('.cx-rostra-stats').filter({ hasText: 'Invocations:' })).toBeVisible();

    // Cards render for each log. Count is data-driven; just require at least 3 (founding corpus).
    const cardCount = await page.locator('.cx-companion-log-card').count();
    expect(cardCount).toBeGreaterThanOrEqual(3);
  });

  test('computeCompanionLogsStats classifies Form A / B / C round entries', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await waitForLogsLoaded(page);
    const stats = await page.evaluate(() => {
      // @ts-ignore
      return computeCompanionLogsStats();
    });
    expect(stats.total).toBeGreaterThanOrEqual(3);
    expect(stats.driftCount).toBe(stats.total); // migrated logs all flag drift
    // Aurelius appears in the Codex log ('throughout' → count 1).
    const aur = stats.perCompanion.find(c => c.key === 'aurelius');
    expect(aur).toBeTruthy();
    expect(aur.count).toBeGreaterThanOrEqual(1);
    // Lyra appears in at least her own SproutLab log.
    const lyra = stats.perCompanion.find(c => c.key === 'lyra');
    expect(lyra).toBeTruthy();
    expect(lyra.count).toBeGreaterThanOrEqual(1);
    // Lyra log lists maren/kael/cipher — maren counted at least twice historically.
    const maren = stats.perCompanion.find(c => c.key === 'maren');
    expect(maren).toBeTruthy();
    expect(maren.count).toBeGreaterThanOrEqual(2);
  });

  test('Sessions sub-tab keeps the existing range/volume filter affordances', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);
    await openJournal(page);
    await page.locator('.cx-subtab-pill[data-key="sessions"]').click();

    await expect(page.locator('.cx-rostra-headline-label')).toContainText(/sessions/i);
    // Range pill row present (4 options).
    const rangePills = page.locator('.cx-filter-pill[data-action="setJournalRange"]');
    await expect(rangePills).toHaveCount(4);
  });
});
