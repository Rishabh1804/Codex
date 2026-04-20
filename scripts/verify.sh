#!/usr/bin/env bash
# Codex unified verification pipeline.
#
# Runs the three layers:
#   1. Build (regenerates codex.html + index.html + root/index.html)
#   2. jsdom unit checks — render correctness, schema structure
#   3. Playwright browser checks — real Chromium, mobile + desktop viewports,
#      CSS/tap/navigation behavior, screenshot artifacts
#
# Exits non-zero on any failure. Screenshots + traces land under
# tests/e2e/report/ and test-results/.

set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== Codex verify ==="

echo ""
echo "[1/3] Build"
( cd split && bash build.sh )

echo ""
echo "[2/3] jsdom unit checks"
if [ ! -d node_modules/jsdom ]; then
  echo "  installing jsdom..."
  npm install --no-save --silent jsdom
fi
node scripts/verify-order.js
node scripts/verify-detail-deep.js

echo ""
echo "[3/3] Playwright browser checks"
if [ ! -d node_modules/@playwright ]; then
  echo "  installing @playwright/test..."
  npm install --no-save --silent @playwright/test
  npx playwright install chromium --with-deps
fi
npx playwright test

echo ""
echo "=== All verification passed ==="
