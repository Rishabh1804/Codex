#!/bin/bash
# Codex Build Script — concat order: data → core → views → forms → start
SPLIT_DIR="$(cd "$(dirname "$0")" && pwd)"
cat "$SPLIT_DIR/template.html"
echo '<style>'
cat "$SPLIT_DIR/styles.css"
echo '</style>'
echo '<script>'
cat "$SPLIT_DIR/data.js"
echo ''
cat "$SPLIT_DIR/core.js"
echo ''
cat "$SPLIT_DIR/views.js"
echo ''
cat "$SPLIT_DIR/forms.js"
echo ''
cat "$SPLIT_DIR/start.js"
echo '</script>'
echo '</body>'
echo '</html>'
