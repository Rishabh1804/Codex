// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Reference resolver smoketest (canon-0052 cross-cutting extraction).

   Exercises renderReferenceLink via the Lore detail view. A real Lore entry
   with a resolvable canon reference is clicked through, and the reference
   button's navigation target is verified. If resolveReference or the render
   helper regresses, this test fails at the assertion. */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name), 'utf8'));
}

/** Seed localStorage with on-disk data before the app boots. The app loads
 *  from the codex-cache-* keys when no GitHub repo is configured. */
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
      // Skip the first-visit wizard so boot reaches populateStore.
      localStorage.setItem('codex-wizard-done', '1');
    },
    { volumes, canons, journal, companions }
  );
}

/** Wait until the app's store is hydrated — the tab bar is un-hidden after
 *  populateStore runs. */
async function waitForBoot(page) {
  await page.waitForFunction(() => {
    const bar = document.getElementById('tabBar');
    // @ts-ignore - store is defined in core.js
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.lore) && store.lore.length > 0;
  }, { timeout: 10000 });
}

test.describe('reference resolver (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedAppData(page);
  });

  test('Lore detail renders reference as a navigate button, click routes to canon detail', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // Switch to Lore tab.
    await page.locator('[data-action="switchTab"][data-tab="lore"]').click();

    // lore-003-the-30k-threshold has a single resolvable reference: canon-gov-001-30k-rule.
    const loreCard = page.locator('[data-action="goToLore"][data-id="lore-003-the-30k-threshold"]');
    await expect(loreCard).toBeVisible();
    await loreCard.click();

    // Reference section should render a button (not a plain span) for the canon.
    const refButton = page.locator(
      'button.cx-link-btn[data-action="navigate"][data-route="#/canon/canon-gov-001-30k-rule"]'
    );
    await expect(refButton).toBeVisible();
    await expect(refButton).toHaveText(/30K/);

    // Click it — should route to canon detail.
    await refButton.click();
    await expect(page).toHaveURL(/#\/canon\/canon-gov-001-30k-rule/);
  });

  test('Unknown reference ID renders as a plain span (no button)', async ({ page }) => {
    // This test uses the resolver directly via page.evaluate — no need to
    // synthesize a lore entry with a bad reference, and keeps the test
    // isolated from seed churn.
    await page.goto('/index.html');
    await waitForBoot(page);

    const result = await page.evaluate(() => {
      // @ts-ignore - renderReferenceLink is defined on window scope in core.js
      const html = renderReferenceLink('this-id-does-not-exist-anywhere');
      return { hasButton: html.includes('<button'), hasSpan: html.includes('<span>'), raw: html };
    });
    expect(result.hasButton).toBe(false);
    expect(result.hasSpan).toBe(true);
    expect(result.raw).toContain('this-id-does-not-exist-anywhere');
  });

  test('resolveReference returns typed descriptor for each known entity', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('#viewContainer')).not.toBeEmpty();

    const descriptors = await page.evaluate(() => {
      // @ts-ignore - resolveReference defined on window scope
      return {
        canon: resolveReference('canon-gov-001-30k-rule'),
        lore: resolveReference('lore-003-the-30k-threshold'),
        unknown: resolveReference('not-a-real-id'),
        empty: resolveReference(''),
        nully: resolveReference(null),
      };
    });
    expect(descriptors.canon).toMatchObject({ type: 'canon', id: 'canon-gov-001-30k-rule' });
    expect(descriptors.canon.route).toBe('#/canon/canon-gov-001-30k-rule');
    expect(descriptors.lore).toMatchObject({ type: 'lore', id: 'lore-003-the-30k-threshold' });
    expect(descriptors.unknown).toBeNull();
    expect(descriptors.empty).toBeNull();
    expect(descriptors.nully).toBeNull();
  });
});
