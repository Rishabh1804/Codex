#!/bin/bash
# SessionStart hook — installs Typst so the Constitution PDFs can be
# rebuilt from .typ source during Claude Code on the web sessions.
set -euo pipefail

# Web sessions only; local machines manage their own toolchain.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

# Persist PATH for the session (BIN_DIR is not on PATH by default).
# Guarded so resume/compact re-fires don't append duplicate lines.
PATH_LINE="export PATH=\"$BIN_DIR:\$PATH\""
if [ -n "${CLAUDE_ENV_FILE:-}" ] && ! grep -qsF "$PATH_LINE" "$CLAUDE_ENV_FILE"; then
  echo "$PATH_LINE" >> "$CLAUDE_ENV_FILE"
fi
export PATH="$BIN_DIR:$PATH"

# Idempotent: skip the download if Typst is already present.
if command -v typst >/dev/null 2>&1; then
  echo "typst already installed: $(typst --version)" >&2
  exit 0
fi

# Pinned version for reproducible PDF builds.
TYPST_VERSION="v0.14.2"
TARBALL="typst-x86_64-unknown-linux-musl"
URL="https://github.com/typst/typst/releases/download/${TYPST_VERSION}/${TARBALL}.tar.xz"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -sSL --retry 3 --max-time 180 -o "$TMP/typst.tar.xz" "$URL"
tar -xf "$TMP/typst.tar.xz" -C "$TMP"
install -m 0755 "$TMP/${TARBALL}/typst" "$BIN_DIR/typst"

echo "typst installed: $("$BIN_DIR/typst" --version)" >&2
