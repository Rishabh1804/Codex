// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/* Chapter status enum normalization (canon-0052 §Chapter Status Enum).
   Verifies the new enum is canonical in code, active-chapter count uses
   the new exclusion rule, icon mapping covers new states, and Settings
   surfaces drift for unknown values. */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name), 'utf8'));
}

/** Like the resolver spec's seeder, but injects a synthetic volume that
 *  exercises every new status plus one known-bad drift value. */
async function seedWithStatusMatrix(page) {
  const volumes = readJson('volumes.json');
  const canons = readJson('canons.json');
  const journal = readJson('journal.json');
  const companions = readJson('companions.json');

  /* Synthetic volume with one chapter per canonical status + one drift
     value. Active statuses expected: spec-drafting, spec-complete,
     in-progress, review, blocked. Inactive: planned, complete, paused,
     abandoned. */
  const statusMatrixVolume = {
    id: 'test-status-matrix',
    name: 'Status Matrix (test fixture)',
    shelf: 'active',
    _deleted: false,
    _deleted_date: null,
    chapters: [
      { id: 'ch-planned', name: 'Planned', status: 'planned', _deleted: false },
      { id: 'ch-spec-drafting', name: 'Spec drafting', status: 'spec-drafting', _deleted: false },
      { id: 'ch-spec-complete', name: 'Spec complete', status: 'spec-complete', _deleted: false },
      { id: 'ch-in-progress', name: 'In progress', status: 'in-progress', _deleted: false },
      { id: 'ch-review', name: 'In review', status: 'review', _deleted: false },
      { id: 'ch-complete', name: 'Complete', status: 'complete', _deleted: false },
      { id: 'ch-paused', name: 'Paused', status: 'paused', _deleted: false },
      { id: 'ch-blocked', name: 'Blocked', status: 'blocked', _deleted: false },
      { id: 'ch-abandoned', name: 'Abandoned', status: 'abandoned', _deleted: false },
      { id: 'ch-drift', name: 'Drift case', status: 'wat-is-this-even', _deleted: false },
    ],
    todos: [],
  };
  volumes.volumes = (volumes.volumes || []).concat([statusMatrixVolume]);

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

test.describe('chapter status enum (canon-0052)', () => {
  test.beforeEach(async ({ page }) => {
    await seedWithStatusMatrix(page);
  });

  test('CHAPTER_STATUSES enum contains all canon-0052 values', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    const enumValues = await page.evaluate(() => {
      // @ts-ignore - CHAPTER_STATUSES defined in data.js
      return { statuses: CHAPTER_STATUSES, inactive: INACTIVE_CHAPTER_STATUSES };
    });
    expect(enumValues.statuses).toEqual(
      expect.arrayContaining([
        'planned', 'spec-drafting', 'spec-complete', 'in-progress', 'review', 'complete', 'paused', 'blocked', 'abandoned'
      ])
    );
    expect(enumValues.inactive).toEqual(
      expect.arrayContaining(['planned', 'complete', 'paused', 'abandoned'])
    );
  });

  test('isActiveChapterStatus uses the canon-0052 exclusion rule', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    const result = await page.evaluate(() => {
      // @ts-ignore - isActiveChapterStatus defined in data.js
      return {
        planned: isActiveChapterStatus('planned'),
        specDrafting: isActiveChapterStatus('spec-drafting'),
        specComplete: isActiveChapterStatus('spec-complete'),
        inProgress: isActiveChapterStatus('in-progress'),
        review: isActiveChapterStatus('review'),
        complete: isActiveChapterStatus('complete'),
        paused: isActiveChapterStatus('paused'),
        blocked: isActiveChapterStatus('blocked'),
        abandoned: isActiveChapterStatus('abandoned'),
        drift: isActiveChapterStatus('wat-is-this-even'),
      };
    });
    // Active (5): spec-drafting, spec-complete, in-progress, review, blocked
    expect(result.specDrafting).toBe(true);
    expect(result.specComplete).toBe(true);
    expect(result.inProgress).toBe(true);
    expect(result.review).toBe(true);
    expect(result.blocked).toBe(true);
    // Inactive (4): planned, complete, paused, abandoned
    expect(result.planned).toBe(false);
    expect(result.complete).toBe(false);
    expect(result.paused).toBe(false);
    expect(result.abandoned).toBe(false);
    // Drift: not in canonical list → not active
    expect(result.drift).toBe(false);
  });

  test('Dashboard active-chapter count for the test matrix is 5', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // The dashboard renders active chapter counts per volume; the Status
    // Matrix fixture has 5 active (spec-drafting, spec-complete, in-progress,
    // review, blocked). Query the store directly to avoid brittle DOM coupling.
    const active = await page.evaluate(() => {
      // @ts-ignore
      const v = store.volumes.find(v => v.id === 'test-status-matrix');
      // @ts-ignore
      return (v.chapters || []).filter(c => isActiveChapterStatus(c.status)).length;
    });
    expect(active).toBe(5);
  });

  test('Settings surfaces drift for unknown chapter status', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    // detectChapterStatusDrift should find the synthetic drift chapter.
    const drift = await page.evaluate(() => {
      // @ts-ignore - detectChapterStatusDrift defined in views.js
      return detectChapterStatusDrift();
    });
    expect(drift.length).toBeGreaterThanOrEqual(1);
    const driftCh = drift.find(d => d.chapterId === 'ch-drift');
    expect(driftCh).toMatchObject({ status: 'wat-is-this-even', volumeId: 'test-status-matrix' });

    // Navigate to Settings and verify the warning card renders. Multiple
    // openSettings buttons exist on first-boot views (header icon + any
    // wizard-adjacent shortcut), so scope to the header.
    await page.locator('#appHeader [data-action="openSettings"]').click();
    await expect(page.locator('text=Unknown chapter status')).toBeVisible();
    await expect(page.locator('text=wat-is-this-even')).toBeVisible();
  });

  test('chapterStatusIcon maps every canonical status to a defined cx icon', async ({ page }) => {
    await page.goto('/index.html');
    await waitForBoot(page);

    const icons = await page.evaluate(() => {
      // @ts-ignore - CHAPTER_STATUSES and chapterStatusIcon defined
      return CHAPTER_STATUSES.map(s => ({ status: s, icon: chapterStatusIcon(s) }));
    });
    // Every canonical status resolves to a non-empty icon name.
    icons.forEach(({ status, icon }) => {
      expect(icon, `${status} → icon`).toBeTruthy();
    });
    // Unknown status falls through to bookmark (not an error).
    const driftIcon = await page.evaluate(() => {
      // @ts-ignore
      return chapterStatusIcon('wat-is-this-even');
    });
    expect(driftIcon).toBe('bookmark');
  });
});
