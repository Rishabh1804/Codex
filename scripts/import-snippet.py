#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Apply an Aurelius snippet JSON directly to data/*.json.

Closes the second half of the snippet pipeline. The chronicler (chronicle.py)
turns transcripts into snippets; this script turns snippets into live data.
The Codex app reads data/canons.json + data/volumes.json + data/journal.json
on startup and syncs via the GitHub Contents API per Edict III.

Operations supported (any combination per snippet, all optional):
  - lore[]            -> data/canons.json .lore[]
  - canon_drafts[]    -> data/canons.json .canons[]
  - session           -> data/journal.json (matched by date)
  - todos[]           -> data/volumes.json (per volume)
  - chapter_updates[] -> data/volumes.json (per volume + chapter, patch-merged)

Idempotent: existing IDs are skipped, never overwritten. Run --dry-run first
to preview what would change.

Usage:
    python scripts/import-snippet.py docs/snippets/snippet-2026-04-22-foo.json
    python scripts/import-snippet.py docs/snippets/snippet-*.json --dry-run
    python scripts/import-snippet.py path/to/snippet.json --backup
"""

from __future__ import annotations

import argparse
import datetime as _dt
import glob
import json
import pathlib
import shutil
import sys
from typing import Any

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data"
CANONS_PATH = DATA_DIR / "canons.json"
VOLUMES_PATH = DATA_DIR / "volumes.json"
JOURNAL_PATH = DATA_DIR / "journal.json"


def _load(path: pathlib.Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _write(path: pathlib.Path, data: dict) -> None:
    path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def _ids(items: list[dict]) -> set[str]:
    return {item["id"] for item in items if isinstance(item, dict) and "id" in item}


def apply_lore(canons: dict, entries: list[dict]) -> tuple[list[str], list[str]]:
    existing = _ids(canons.setdefault("lore", []))
    added, skipped = [], []
    for entry in entries:
        if not isinstance(entry, dict) or "id" not in entry:
            skipped.append(f"<malformed lore entry: {entry!r}>")
            continue
        if entry["id"] in existing:
            skipped.append(entry["id"])
            continue
        canons["lore"].append(entry)
        existing.add(entry["id"])
        added.append(entry["id"])
    return added, skipped


def apply_canon_drafts(canons: dict, drafts: list[dict]) -> tuple[list[str], list[str]]:
    existing = _ids(canons.setdefault("canons", []))
    added, skipped = [], []
    for draft in drafts:
        if not isinstance(draft, dict) or "id" not in draft:
            skipped.append(f"<malformed canon draft: {draft!r}>")
            continue
        if draft["id"] in existing:
            skipped.append(draft["id"])
            continue
        canons["canons"].append(draft)
        existing.add(draft["id"])
        added.append(draft["id"])
    return added, skipped


def _strip_meta(d: dict) -> dict:
    return {k: v for k, v in d.items() if not k.startswith("_")}


def apply_session(journal: dict, session: dict) -> tuple[list[str], list[str]]:
    if not isinstance(session, dict) or "id" not in session or "date" not in session:
        return [], [f"<malformed session: missing id or date>"]

    session = _strip_meta(session)
    days = journal.setdefault("journal", [])

    # Find existing day, or create
    day = next((d for d in days if d.get("date") == session["date"]), None)
    if day is None:
        day = {"date": session["date"], "sessions": []}
        days.append(day)
        days.sort(key=lambda d: d.get("date", ""), reverse=True)

    sessions = day.setdefault("sessions", [])
    if any(s.get("id") == session["id"] for s in sessions):
        return [], [session["id"]]
    sessions.append(session)
    return [session["id"]], []


def apply_todos(volumes: dict, todo_ops: list[dict]) -> tuple[list[str], list[str]]:
    vols = volumes.setdefault("volumes", [])
    by_id = {v["id"]: v for v in vols if isinstance(v, dict)}
    added, skipped = [], []
    for op in todo_ops:
        if not isinstance(op, dict):
            skipped.append(f"<malformed todo op: {op!r}>")
            continue
        vol_id = op.get("volume")
        todo = op.get("todo")
        if not vol_id or not isinstance(todo, dict) or "id" not in todo:
            skipped.append(f"<malformed todo op: {op!r}>")
            continue
        vol = by_id.get(vol_id)
        if vol is None:
            skipped.append(f"<unknown volume {vol_id} for todo {todo['id']}>")
            continue
        existing = _ids(vol.setdefault("todos", []))
        if todo["id"] in existing:
            skipped.append(todo["id"])
            continue
        vol["todos"].append(todo)
        added.append(f"{vol_id}/{todo['id']}")
    return added, skipped


def _merge_patch(target: dict, patch: dict) -> None:
    """Shallow merge: patch values overwrite target values key-by-key."""
    for key, value in patch.items():
        target[key] = value


def apply_chapter_updates(
    volumes: dict, updates: list[dict]
) -> tuple[list[str], list[str]]:
    vols = volumes.setdefault("volumes", [])
    by_id = {v["id"]: v for v in vols if isinstance(v, dict)}
    applied, skipped = [], []
    for op in updates:
        if not isinstance(op, dict):
            skipped.append(f"<malformed chapter update: {op!r}>")
            continue
        vol_id = op.get("volume")
        chapter_id = op.get("chapter")
        patch = op.get("patch")
        if not vol_id or not chapter_id or not isinstance(patch, dict):
            skipped.append(f"<malformed chapter update: {op!r}>")
            continue
        vol = by_id.get(vol_id)
        if vol is None:
            skipped.append(f"<unknown volume {vol_id} for chapter {chapter_id}>")
            continue
        chapters = vol.setdefault("chapters", [])
        chapter = next((c for c in chapters if c.get("id") == chapter_id), None)
        if chapter is None:
            skipped.append(f"<unknown chapter {vol_id}/{chapter_id}>")
            continue
        _merge_patch(chapter, patch)
        applied.append(f"{vol_id}/{chapter_id}")
    return applied, skipped


def import_snippet(
    snippet: dict,
    canons: dict,
    volumes: dict,
    journal: dict,
) -> dict[str, dict[str, list[str]]]:
    if snippet.get("_snippet_version") != 1:
        raise ValueError(
            f"snippet missing _snippet_version: 1 (got {snippet.get('_snippet_version')!r})"
        )

    summary: dict[str, dict[str, list[str]]] = {}

    if "lore" in snippet:
        added, skipped = apply_lore(canons, snippet["lore"])
        summary["lore"] = {"added": added, "skipped": skipped}

    if "canon_drafts" in snippet:
        added, skipped = apply_canon_drafts(canons, snippet["canon_drafts"])
        summary["canons"] = {"added": added, "skipped": skipped}

    if "session" in snippet:
        added, skipped = apply_session(journal, snippet["session"])
        summary["sessions"] = {"added": added, "skipped": skipped}

    if "todos" in snippet:
        added, skipped = apply_todos(volumes, snippet["todos"])
        summary["todos"] = {"added": added, "skipped": skipped}

    if "chapter_updates" in snippet:
        added, skipped = apply_chapter_updates(volumes, snippet["chapter_updates"])
        summary["chapter_updates"] = {"applied": added, "skipped": skipped}

    return summary


def _print_summary(snippet_path: pathlib.Path, summary: dict) -> None:
    print(f"\n=== {snippet_path.name} ===")
    if not summary:
        print("  (no recognized operations in snippet)")
        return
    for kind, result in summary.items():
        for action, ids in result.items():
            if not ids:
                continue
            print(f"  {kind} {action}: {len(ids)}")
            for ident in ids[:10]:
                print(f"    - {ident}")
            if len(ids) > 10:
                print(f"    ... and {len(ids) - 10} more")


def _backup(paths: list[pathlib.Path]) -> pathlib.Path:
    stamp = _dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_dir = REPO_ROOT / ".import-backups" / stamp
    backup_dir.mkdir(parents=True, exist_ok=True)
    for p in paths:
        if p.exists():
            shutil.copy2(p, backup_dir / p.name)
    return backup_dir


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Apply Aurelius snippet JSON(s) to data/*.json."
    )
    parser.add_argument(
        "snippets",
        nargs="+",
        help="One or more snippet JSON paths (globs OK).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would change without writing.",
    )
    parser.add_argument(
        "--backup",
        action="store_true",
        help="Copy data/*.json to .import-backups/<stamp>/ before writing.",
    )
    args = parser.parse_args()

    # Expand globs (PowerShell doesn't expand them for us)
    snippet_paths: list[pathlib.Path] = []
    for pattern in args.snippets:
        matched = sorted(glob.glob(pattern))
        if not matched:
            if pathlib.Path(pattern).exists():
                snippet_paths.append(pathlib.Path(pattern))
            else:
                print(f"error: no snippets match {pattern}", file=sys.stderr)
                return 1
        else:
            snippet_paths.extend(pathlib.Path(p) for p in matched)

    # Skip the _drafts/ subdirectory and any non-JSON
    snippet_paths = [
        p
        for p in snippet_paths
        if p.suffix == ".json" and "_drafts" not in p.parts
    ]
    if not snippet_paths:
        print("error: no JSON snippets to import", file=sys.stderr)
        return 1

    canons = _load(CANONS_PATH)
    volumes = _load(VOLUMES_PATH)
    journal = _load(JOURNAL_PATH)

    any_changes = False
    for snippet_path in snippet_paths:
        try:
            snippet = _load(snippet_path)
        except json.JSONDecodeError as exc:
            print(f"error: {snippet_path}: invalid JSON: {exc}", file=sys.stderr)
            return 1
        try:
            summary = import_snippet(snippet, canons, volumes, journal)
        except ValueError as exc:
            print(f"error: {snippet_path}: {exc}", file=sys.stderr)
            return 1

        _print_summary(snippet_path, summary)
        if any(
            v
            for kind in summary.values()
            for action, v in kind.items()
            if action in ("added", "applied") and v
        ):
            any_changes = True

    if not any_changes:
        print("\nNo changes to write.")
        return 0

    if args.dry_run:
        print("\n[dry-run] would write data/canons.json, data/volumes.json, data/journal.json")
        return 0

    if args.backup:
        backup_dir = _backup([CANONS_PATH, VOLUMES_PATH, JOURNAL_PATH])
        print(f"\nBacked up data files to {backup_dir.relative_to(REPO_ROOT)}")

    _write(CANONS_PATH, canons)
    _write(VOLUMES_PATH, volumes)
    _write(JOURNAL_PATH, journal)
    print("\nWrote data/canons.json, data/volumes.json, data/journal.json")
    print("Next: commit + push, the app picks up changes via GitHub sync on next load.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
