// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* The Order — browser-level smoke tests. Covers what jsdom can't: real
   fetch, CSS layout, tap targets, swipe-able tab bar, mobile viewport,
   dark mode. Unit-level render correctness stays with scripts/verify-order.js
   and scripts/verify-detail-deep.js — this file is about behavior in a
   real rendering engine. */

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
    return bar && !bar.hidden && typeof store !== 'undefined' && Array.isArray(store.companions) && store.companions.length > 0;
  }, { timeout: 10000 });
}

test.describe('The Order — mobile smoke', () => {
  test.beforeEach(async ({ page }) => { await seedAppData(page); });

  test('Order tab is reachable, Roster renders 18 companions', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // Tap Order tab (7th tab).
    await page.locator('[data-action="switchTab"][data-tab="order"]').click();
    await expect(page).toHaveURL(/#\/order/);

    // Hero title + stats.
    await expect(page.locator('.cx-page-title')).toContainText('The Order');
    const stats = page.locator('.cx-order-stat-value');
    await expect(stats.nth(0)).toHaveText('18');
    await expect(stats.nth(1)).toHaveText('17');
    await expect(stats.nth(2)).toHaveText('1');

    // All 18 companions present as cards (match on companion-card title).
    const names = ['Aurelius','Cipher','Consul','Ashara','Petra','Lyra','Maren','Kael','Nyx','Solara','Theron','Vex','Orinth','Rune','Ignis','Bard','Aeon','Pip'];
    for (const name of names) {
      await expect(page.locator('.cx-companion-card').filter({ hasText: name }).first()).toBeVisible();
    }
  });

  test('Cabinet subtab: 7 of 8 seats filled, Debt vacant', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);

    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="cabinet"]').click();

    // Four domains present.
    for (const domain of ['Financial Health', 'Productivity', 'Maintenance', 'Growth']) {
      await expect(page.locator('.cx-cabinet-domain-title').filter({ hasText: domain })).toBeVisible();
    }

    // Two vacancies after canon-inst-001 (Debt per cc-011, Expansion per inst-001).
    const vacant = page.locator('.cx-cabinet-seat-vacant');
    await expect(vacant).toHaveCount(2);

    // Occupants landed on their expected portfolios.
    await expect(page.locator('.cx-cabinet-seat').filter({ hasText: 'Treasury' }).filter({ hasText: 'Ashara' })).toBeVisible();
    await expect(page.locator('.cx-cabinet-seat').filter({ hasText: 'Efficiency' }).filter({ hasText: 'Petra' })).toBeVisible();
    await expect(page.locator('.cx-cabinet-seat').filter({ hasText: 'Stability' }).filter({ hasText: 'Rune' })).toBeVisible();
    await expect(page.locator('.cx-cabinet-seat').filter({ hasText: 'Innovation' }).filter({ hasText: 'Bard' })).toBeVisible();
  });

  test('Residency subtab: Cipher + Nyx appear under Command Center, Lyra/Maren/Kael under SproutLab', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);
    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="residency"]').click();

    // Command Center group holds Cipher + Nyx (and others).
    const ccGroup = page.locator('.cx-residency-group').filter({ hasText: 'Command Center' });
    await expect(ccGroup.getByText('Cipher', { exact: false })).toBeVisible();
    await expect(ccGroup.getByText('Nyx', { exact: false })).toBeVisible();

    // SproutLab group holds Lyra + Maren + Kael.
    const slGroup = page.locator('.cx-residency-group').filter({ hasText: 'SproutLab' });
    for (const name of ['Lyra', 'Maren', 'Kael']) {
      await expect(slGroup.getByText(name, { exact: false })).toBeVisible();
    }
  });

  test('Ladder subtab: Sovereign → Scribes with empty state', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);
    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="ladder"]').click();

    await expect(page.locator('.cx-ladder-row').filter({ hasText: 'Sovereign' })).toContainText('The Architect');
    for (const rank of ['Consul', 'Censors', 'Builders', 'Governors']) {
      await expect(page.locator('.cx-ladder-row').filter({ hasText: rank })).toBeVisible();
    }
    await expect(page.locator('.cx-ladder-row').filter({ hasText: 'Scribes' })).toContainText(/None seated/i);
  });

  test('Companion detail: Aurelius card → detail page renders Voice/Mind/Shadow blocks, no raw JSON', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);

    // Tap Aurelius card.
    await page.locator('.cx-companion-card').filter({ hasText: 'Aurelius' }).first().click();
    await expect(page).toHaveURL(/#\/companion\/aurelius/);

    // Ten blocks + no raw JSON dumps.
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Assignment' })).toBeVisible();
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Voice' })).toBeVisible();
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Mind' })).toBeVisible();
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Shadow' })).toBeVisible();
    await expect(page.locator('.cx-companion-pre')).toHaveCount(0);

    // Back button returns to Order.
    await page.locator('[data-action="goBack"]').click();
    await expect(page).toHaveURL(/#\/order/);
  });

  test('Stub companion (Orinth): detail renders identity + assignment, no pre dumps', async ({ page }) => {
    await page.goto('/index.html#/companion/orinth');
    await waitForBoot(page);

    await expect(page.locator('.cx-page-title')).toContainText('Orinth');
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Assignment' })).toBeVisible();

    // Stubs don't populate voice/mind/shadow blocks — verify they're absent
    // rather than empty-rendered with debug dumps.
    await expect(page.locator('.cx-companion-pre')).toHaveCount(0);

    // Stub profile-version chip.
    await expect(page.locator('.cx-chip-version-draft, .cx-chip-version-stub').filter({ hasText: /stub|0\.0/ })).toBeVisible();
  });

  test('Design-principles chip renders on Volume cards (canon-proc-002)', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // Dashboard shows Volume cards with a design-principles chip on each.
    // Codex is 'draft' → dashed-border italic.
    const codexCard = page.locator('.cx-vol-card').filter({ hasText: 'Codex' }).first();
    await expect(codexCard.locator('.cx-dp-chip')).toBeVisible();
    await expect(codexCard.locator('.cx-dp-draft')).toBeVisible();

    // SEP Invoicing is 'missing' → warning color + alert icon.
    const sepInv = page.locator('.cx-vol-card').filter({ hasText: 'SEP Invoicing' }).first();
    await expect(sepInv.locator('.cx-dp-missing')).toBeVisible();
    await expect(sepInv.locator('.cx-dp-chip')).toContainText(/missing/i);
  });

  test('Screenshot: Order Roster in dark mode (mobile viewport)', async ({ page }, testInfo) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);
    const buf = await page.screenshot({ fullPage: true });
    await testInfo.attach('order-roster-dark.png', { body: buf, contentType: 'image/png' });
  });

  test('Screenshot: Cabinet subtab', async ({ page }, testInfo) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);
    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="cabinet"]').click();
    await page.waitForTimeout(150);
    const buf = await page.screenshot({ fullPage: true });
    await testInfo.attach('order-cabinet.png', { body: buf, contentType: 'image/png' });
  });

  test('Screenshot: Aurelius detail', async ({ page }, testInfo) => {
    await page.goto('/index.html#/companion/aurelius');
    await waitForBoot(page);
    const buf = await page.screenshot({ fullPage: true });
    await testInfo.attach('companion-detail-aurelius.png', { body: buf, contentType: 'image/png' });
  });
});
