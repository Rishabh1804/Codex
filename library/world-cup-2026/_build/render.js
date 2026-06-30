// Renders each wallpaper design to PNG at Android + iOS resolutions using the
// pre-installed Chromium (no playwright install). Run: node _build/render.js
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DESIGNS = ['road-to-final','golden-boot','48-nations','bracket','host-cities','champions-path'];
const SIZES = {
  android: { w: 1080, h: 2340 },
  ios:     { w: 1170, h: 2532 },
};
const TEMPLATE = 'file://' + path.resolve(__dirname, 'wallpaper-template.html');
const OUT = path.resolve(__dirname, '..', 'wallpapers');

(async () => {
  const exe = process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium';
  const launch = fs.existsSync(exe) ? { executablePath: exe } : {};
  const browser = await chromium.launch(launch);
  for (const [device, size] of Object.entries(SIZES)) {
    fs.mkdirSync(path.join(OUT, device), { recursive: true });
    const ctx = await browser.newContext({
      viewport: { width: size.w, height: size.h },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const d of DESIGNS) {
      await page.goto(`${TEMPLATE}?d=${d}`, { waitUntil: 'load' });
      await page.waitForFunction('window.__ready === true', { timeout: 15000 }).catch(()=>{});
      await page.waitForTimeout(400);
      const file = path.join(OUT, device, `${d}.png`);
      await page.screenshot({ path: file, clip: { x:0, y:0, width:size.w, height:size.h } });
      console.log(`✓ ${device}/${d}.png  (${size.w}×${size.h})`);
    }
    await ctx.close();
  }
  await browser.close();
  console.log('All wallpapers rendered.');
})().catch(e => { console.error(e); process.exit(1); });
