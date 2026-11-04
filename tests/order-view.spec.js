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

  test('Order tab is reachable, Roster renders every companion in companions.json', async ({ page }) => {
    // Expectations derive from the archive, not hardcoded counts: the roster
    // grows by ceremony and admission (CodeMike canon-inst-005; SEP-Ops's five
    // province-native companions decree 0022; Aven + Ashen decrees 0029/0030),
    // and each growth broke a literal here.
    const roster = readJson('companions.json').companions;
    const countClass = (cls) => roster.filter((c) => c.companion_class === cls).length;
    expect(roster.length).toBeGreaterThan(0);

    await page.goto('/index.html');
    await waitForBoot(page);

    // Tap Order tab (7th tab).
    await page.locator('[data-action="switchTab"][data-tab="order"]').click();
    await expect(page).toHaveURL(/#\/order/);

    // Hero title + stats: Companions · Generational · Institutional.
    await expect(page.locator('.cx-page-title')).toContainText('The Order');
    const stats = page.locator('.cx-order-stat-value');
    await expect(stats.nth(0)).toHaveText(String(roster.length));
    await expect(stats.nth(1)).toHaveText(String(countClass('generational')));
    await expect(stats.nth(2)).toHaveText(String(countClass('institutional')));

    // One card per companion, and every rostered name present.
    await expect(page.locator('.cx-companion-card')).toHaveCount(roster.length);
    for (const c of roster) {
      const name = (c.identity && c.identity.name) || c.id;
      await expect(page.locator('.cx-companion-card').filter({ hasText: name }).first()).toBeVisible();
    }
  });

  test('Cabinet subtab: seats filled and vacant as companions.json records them', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);

    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="cabinet"]').click();

    // The seat structure is constitutional (Book II Art. 4) and lives in the
    // view as CABINET_STRUCTURE — read it from the page rather than mirror it.
    // @ts-ignore
    const structure = await page.evaluate(() => CABINET_STRUCTURE);
    expect(structure.length).toBe(4);

    // Occupancy comes from each companion's current_assignments, in the
    // "Minister: <Portfolio> (<Domain> domain)" form the view parses. Derived
    // independently here so the test checks the render against the archive.
    // At the time of writing: Treasury (Ashara), Budget (Vex), Efficiency
    // (Petra), Innovation (Bard) seated; Stability vacant (canon-inst-002, Rune
    // to Priest), Debt vacant (canon-cc-011, Theron unassigned), Expansion
    // vacant (canon-inst-001, Orinth to Codex Builder), Output vacant
    // (canon-inst-003, Ignis to Temple of Mars Builder).
    const occupant = {};
    for (const c of readJson('companions.json').companions) {
      for (const a of (c.assignment && c.assignment.current_assignments) || []) {
        const m = /Minister:\s*([A-Za-z]+)\s*\(([^)]+)\)/.exec(a);
        if (!m) continue;
        for (const d of structure) {
          if (d.portfolios.includes(m[1]) && m[2].includes(d.domain)) {
            occupant[d.domain + '|' + m[1]] = (c.identity && c.identity.name) || c.id;
          }
        }
      }
    }
    const seats = structure.flatMap((d) => d.portfolios.map((p) => ({ domain: d.domain, portfolio: p })));
    const filledCount = seats.filter((s) => occupant[s.domain + '|' + s.portfolio]).length;
    // Guard: if the assignment format drifts, the parse finds nobody and an
    // all-vacant Cabinet would otherwise pass silently.
    expect(filledCount).toBeGreaterThan(0);

    for (const d of structure) {
      await expect(page.locator('.cx-cabinet-domain-title').filter({ hasText: d.domain })).toBeVisible();
    }

    await expect(page.locator('.cx-cabinet-summary'))
      .toContainText(`${filledCount} of ${seats.length} Ministerial seats filled`);
    await expect(page.locator('.cx-cabinet-seat')).toHaveCount(seats.length);
    await expect(page.locator('.cx-cabinet-seat-vacant')).toHaveCount(seats.length - filledCount);

    // Each seat, in render order, shows its occupant or its vacancy.
    const rendered = page.locator('.cx-cabinet-seat');
    for (let i = 0; i < seats.length; i++) {
      const s = seats[i];
      const seat = rendered.nth(i);
      await expect(seat.locator('.cx-cabinet-seat-portfolio')).toHaveText(`Minister: ${s.portfolio}`);
      const name = occupant[s.domain + '|' + s.portfolio];
      if (name) {
        await expect(seat).not.toHaveClass(/cx-cabinet-seat-vacant/);
        await expect(seat.locator('.cx-cabinet-seat-name')).toHaveText(name);
      } else {
        await expect(seat).toHaveClass(/cx-cabinet-seat-vacant/);
        await expect(seat.locator('.cx-cabinet-seat-name')).toContainText('Vacant');
      }
    }
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

  test('Ladder subtab: Sovereign → Scribes Worker Tier row', async ({ page }) => {
    await page.goto('/index.html#/order');
    await waitForBoot(page);
    await page.locator('[data-action="setSubTab"][data-tab="order"][data-key="ladder"]').click();

    await expect(page.locator('.cx-ladder-row').filter({ hasText: 'Sovereign' })).toContainText('The Architect');
    for (const rank of ['Consul', 'Censors', 'Builders', 'Governors']) {
      await expect(page.locator('.cx-ladder-row').filter({ hasText: rank })).toBeVisible();
    }
    // The Scribes row surfaces the Worker Tier (canon-proc-006) — an unrostered
    // rank-form, not named individuals.
    await expect(page.locator('.cx-ladder-row').filter({ hasText: 'Scribes' })).toContainText(/Worker Tier/i);
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

  test('Orinth detail: v0.4 profile renders Voice/Mind/Shadow blocks, no raw JSON', async ({ page }) => {
    await page.goto('/index.html#/companion/orinth');
    await waitForBoot(page);

    await expect(page.locator('.cx-page-title')).toContainText('Orinth');
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Assignment' })).toBeVisible();

    // Orinth was lifted from v0.0-stub to a full profile when his
    // canon-proc-003 onboarding completed, then ratified v0.4 at profile
    // close — the voice/mind/shadow blocks render, none an empty debug dump.
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Voice' })).toBeVisible();
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Mind' })).toBeVisible();
    await expect(page.locator('.cx-companion-block-title').filter({ hasText: 'Shadow' })).toBeVisible();
    await expect(page.locator('.cx-companion-pre')).toHaveCount(0);

    // Profile-version chip reads v0.4 (ratified — no 'stub'/'draft' suffix).
    await expect(page.locator('.cx-chip-version-ratified').filter({ hasText: /0\.4/ })).toBeVisible();
  });

  test('Design-principles chip renders on Volume cards (canon-proc-002)', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // Dashboard shows Volume cards with a design-principles chip on each.
    // Codex is 'ratified' (v1.0, 2026-05-22, canon-proc-002) → green + check.
    const codexCard = page.locator('.cx-vol-card').filter({ hasText: 'Codex' }).first();
    await expect(codexCard.locator('.cx-dp-chip')).toBeVisible();
    await expect(codexCard.locator('.cx-dp-ratified')).toBeVisible();

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
