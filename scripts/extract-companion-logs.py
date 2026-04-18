#!/usr/bin/env python3
"""Extract YAML frontmatter from every companion log under docs/companion-logs/
and write a single JSON index at data/companion-logs.json.

Canon-0053 §1 says the canonical path is
codex:docs/companion-logs/<repo>/companion-log-<session_id>-<author3>.md and
specifies the v1 frontmatter schema. This script reads the frontmatter only
(not the body); body lives on disk and the Codex Logs sub-tab links into it
via a per-log path.

Output shape:
{
  "_schema_version": 1,
  "logs": [ { ...frontmatter..., "path": "docs/companion-logs/<repo>/<file>" } ]
}

Content-addressable: the file changes only when logs change. A "when was
this regenerated" timestamp is deliberately omitted — it would rewrite the
file on every build.sh invocation and force uncommitted-change churn even
when no log content moved.

Wired into split/build.sh — runs before the HTML concat step so the JSON
index reflects the current on-disk logs whenever build.sh is invoked.
"""

import json
import os
import sys

try:
    import yaml
except ImportError:
    sys.stderr.write("PyYAML required: pip install pyyaml\n")
    sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS_DIR = os.path.join(ROOT, "docs", "companion-logs")
OUTPUT = os.path.join(ROOT, "data", "companion-logs.json")


def extract_frontmatter(path):
    """Return the parsed YAML frontmatter dict, or None if the file doesn't
    have a valid leading frontmatter block."""
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    if not text.startswith("---"):
        return None
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None
    try:
        return yaml.safe_load(parts[1])
    except yaml.YAMLError as exc:
        sys.stderr.write(f"YAML parse error in {path}: {exc}\n")
        return None


def main():
    if not os.path.isdir(LOGS_DIR):
        sys.stderr.write(f"No logs directory at {LOGS_DIR}\n")
        sys.exit(1)
    logs = []
    for repo in sorted(os.listdir(LOGS_DIR)):
        repo_path = os.path.join(LOGS_DIR, repo)
        if not os.path.isdir(repo_path):
            continue
        for filename in sorted(os.listdir(repo_path)):
            if not filename.endswith(".md"):
                continue
            full = os.path.join(repo_path, filename)
            fm = extract_frontmatter(full)
            if fm is None:
                continue
            rel_path = os.path.relpath(full, ROOT).replace(os.sep, "/")
            entry = dict(fm)
            entry["path"] = rel_path
            logs.append(entry)

    output = {
        "_schema_version": 1,
        "logs": logs,
    }
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, sort_keys=False, default=str)
        f.write("\n")
    print(f"Indexed {len(logs)} companion log(s) → {OUTPUT}")


if __name__ == "__main__":
    main()
