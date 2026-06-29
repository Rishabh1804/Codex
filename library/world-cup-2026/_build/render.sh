#!/usr/bin/env bash
# Regenerate the World Cup 2026 wallpaper pack.
#
# Renders each design in wallpaper-template.html to PNG at Android + iOS
# resolutions using the pre-installed chrome-headless-shell (old-headless mode,
# which supports --virtual-time-budget for reliable async font/image settling).
#
# Assets are LOCAL (flags/ + fonts/) so rendering works fully offline and is
# deterministic — the headless browser does not trust the agent proxy's TLS, so
# remote fetches fail. Refresh local assets with fetch-assets.sh if needed.
set -euo pipefail
cd "$(dirname "$0")"

SHELL_BIN="${PW_HEADLESS_SHELL:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}"
TPL="file://$(pwd)/wallpaper-template.html"
DESIGNS=(road-to-final golden-boot 48-nations bracket host-cities champions-path)

declare -A SIZES=( [android]="1080,2340" [ios]="1170,2532" )
for device in android ios; do
  mkdir -p "../wallpapers/$device"
  for d in "${DESIGNS[@]}"; do
    "$SHELL_BIN" --no-sandbox --disable-gpu --hide-scrollbars \
      --force-device-scale-factor=1 --window-size="${SIZES[$device]}" \
      --virtual-time-budget=8000 \
      --screenshot="../wallpapers/$device/$d.png" "${TPL}?d=$d" >/dev/null 2>&1
    echo "✓ $device/$d.png"
  done
done
echo "Wallpaper pack regenerated."
