// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/* Codex smoketest harness. Single-browser (desktop Chromium) is enough for
   the Forum Pattern overhaul — Codex is a PWA served as a static HTML file,
   runtime behavior is browser-engine-agnostic for the surfaces we care about.
   python3 -m http.server is the file server (no npm web framework needed). */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:8765',
    trace: 'retain-on-failure',
    actionTimeout: 5000,
    navigationTimeout: 10000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'python3 -m http.server 8765',
    url: 'http://127.0.0.1:8765/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
