#!/bin/bash
# Codex Build Script — concat order: data → seed → core → views → forms → start
# Output: split/codex.html + split/index.html + repo root index.html
SPLIT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$SPLIT_DIR/.."
OUTPUT="$SPLIT_DIR/codex.html"

# canon-0053: rebuild the companion-logs JSON index from on-disk markdown
# before bundling, so the Logs sub-tab reflects the current state of
# docs/companion-logs/<repo>/.
if [ -f "$REPO_ROOT/scripts/extract-companion-logs.py" ]; then
  python3 "$REPO_ROOT/scripts/extract-companion-logs.py" || {
    echo "Warning: companion-logs extraction failed; built HTML may carry stale logs index" >&2
  }
fi

{
cat "$SPLIT_DIR/template.html"
echo '<style>'
cat "$SPLIT_DIR/styles.css"
echo '</style>'
echo '<script>'
cat "$SPLIT_DIR/data.js"
echo ''
cat "$SPLIT_DIR/seed.js"
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
} > "$OUTPUT"

# canon-0033: root index.html must always be the build output
cp "$OUTPUT" "$SPLIT_DIR/index.html"
cp "$OUTPUT" "$REPO_ROOT/index.html"

echo "Built: $(wc -l < "$OUTPUT") lines → codex.html + index.html + root/index.html"
