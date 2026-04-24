#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["anthropic>=0.92"]
# ///
"""Chronicle a session transcript into an Aurelius snippet JSON.

Reads a plain-text transcript, asks Claude (Opus 4.7, adaptive thinking) to
transform it into a valid Codex snippet, and writes the result under
docs/snippets/snippet-YYYY-MM-DD-<slug>.json.

CLAUDE.md, data/canons.json, and two example snippets are sent as a cached
system prefix so repeated invocations pay the cache-read rate on the bulk of
the context window.

Usage:
    uv run scripts/chronicle.py path/to/transcript.txt
    uv run scripts/chronicle.py transcript.txt --slug cabinet-convening --date 2026-04-22
    uv run scripts/chronicle.py transcript.txt --dry-run

Requires ANTHROPIC_API_KEY in the environment.
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import pathlib
import re
import sys

from anthropic import Anthropic

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
CLAUDE_MD = REPO_ROOT / "CLAUDE.md"
CANONS_JSON = REPO_ROOT / "data" / "canons.json"
SNIPPETS_DIR = REPO_ROOT / "docs" / "snippets"
EXAMPLE_SNIPPETS = [
    SNIPPETS_DIR / "snippet-2026-04-14-cleanup.json",
    SNIPPETS_DIR / "snippet-2026-04-22-constitution-v1.1-publication.json",
]

MODEL_CONFIGS: dict[str, dict] = {
    # Strategic chronicles — full institutional depth, highest cost.
    "opus": {
        "model": "claude-opus-4-7",
        "thinking": {"type": "adaptive"},
        "output_config": {"effort": "high"},
    },
    # Routine chronicles — 3x cheaper, same adaptive thinking, ~95% quality.
    "sonnet": {
        "model": "claude-sonnet-4-6",
        "thinking": {"type": "adaptive"},
        "output_config": {"effort": "high"},
    },
    # Quick/mechanical chronicles — 5x cheaper than Opus. Haiku 4.5 rejects
    # the `effort` parameter and doesn't support adaptive thinking; omit both.
    "haiku": {
        "model": "claude-haiku-4-5",
        "thinking": {"type": "disabled"},
    },
}
DEFAULT_MODEL = "opus"

_SLUG_RE = re.compile(r"[^a-z0-9]+")


def _slugify(text: str, max_len: int = 60) -> str:
    slug = _SLUG_RE.sub("-", text.lower()).strip("-")
    return slug[:max_len].rstrip("-") or "session"


def _build_system_prefix(include_canons: bool = False) -> list[dict]:
    claude_md = CLAUDE_MD.read_text(encoding="utf-8")
    examples = "\n\n".join(
        f"### {p.name}\n\n{p.read_text(encoding='utf-8')}"
        for p in EXAMPLE_SNIPPETS
        if p.exists()
    )
    canons_section = (
        "## data/canons.json (current canon ledger)\n\n"
        f"{CANONS_JSON.read_text(encoding='utf-8')}\n\n"
        if include_canons
        else "## Canon ledger\n\nNot loaded in this run. Cross-reference canons "
        "by id only when you are certain from CLAUDE.md or the example snippets; "
        "otherwise leave the references array empty for the human reviewer.\n\n"
    )

    role = """\
You are Aurelius, Chronicler of the Order of Codex. Your job: turn a raw \
session transcript into a valid Aurelius snippet JSON that the Codex snippet \
pipeline can import directly.

# Snippet shape

A snippet is a JSON object with `_snippet_version: 1` at the top level. Any \
combination of the following top-level keys may appear; all are optional:

- `_note` (string): chronicler's meta-note about what the snippet does and why
- `session` (object): { date, id, summary, volumes_touched, chapters_touched, \
decisions, bugs_found, bugs_fixed, duration_minutes, open_todos, handoff, \
screenshots }
- `lore` (array): entries of { id, title, category, body, domain, tags, \
references, sourceType, sourceId, created }
- `canon_drafts` (array): draft canons for review (id, scope, category, \
title, rationale, status, references)
- `todos` (array): { volume, todo: { id, text, status, chapter, created, \
resolved, source_session } }
- `chapter_updates` (array): { volume, chapter, patch: {...} }

# ID conventions

- Session id: `s-YYYY-MM-DD-NN`
- Lore id: `lore-NNN-kebab-slug` (check existing lore in references; increment)
- Code canon: `canon-NNNN-kebab-slug`
- Governance canon: `canon-<scope>-NNN-kebab-slug` (e.g. `canon-cc-019`, \
`canon-inst-003`, `canon-proc-006`)
- Todo id: `todo-NNNN-kebab-slug`

# Lore categories (Dissertation §3.4)

Edicts, Origins, Cautionary Tales, Doctrines, Chronicles. Chronicles is the \
default for session-derived lore.

# Rules

1. Output ONLY the JSON object. No prose, no markdown fences, no commentary \
before or after.
2. Prefer fewer, higher-signal lore entries over many thin ones. A session \
that decided three things produces one chronicle lore, not three.
3. Cross-reference existing canons and lore by id when the connection is \
obvious from the ledger above.
4. Dates in ISO format (YYYY-MM-DD).
5. If the transcript contains nothing ratifiable, return \
`{"_snippet_version": 1, "_note": "No actionable content in transcript."}`.
6. Tone of the `body` field in lore: analytical, narrative, written as a \
chronicle of what happened and why it matters. Not bullet points.
"""

    prefix = (
        "## CLAUDE.md (Codex project instructions)\n\n"
        f"{claude_md}\n\n"
        f"{canons_section}"
        "## Example snippets (shape reference)\n\n"
        f"{examples}\n\n"
        "## Your role\n\n"
        f"{role}"
    )

    return [
        {
            "type": "text",
            "text": prefix,
            "cache_control": {"type": "ephemeral"},
        }
    ]


def _extract_json(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        text = text.removeprefix("```json").removeprefix("```").lstrip()
        if text.endswith("```"):
            text = text[: -len("```")].rstrip()
    return text


def chronicle(
    transcript: str,
    date_str: str,
    *,
    include_canons: bool = False,
    model_alias: str = DEFAULT_MODEL,
) -> tuple[dict, object, str]:
    if model_alias not in MODEL_CONFIGS:
        raise ValueError(
            f"unknown model alias {model_alias!r}; "
            f"choose from {sorted(MODEL_CONFIGS)}"
        )
    config = MODEL_CONFIGS[model_alias]

    client = Anthropic()
    response = client.messages.create(
        max_tokens=16000,
        system=_build_system_prefix(include_canons=include_canons),
        messages=[
            {
                "role": "user",
                "content": (
                    f"Today's date: {date_str}.\n\n"
                    "Chronicle the following session transcript into a valid "
                    "Aurelius snippet JSON. Output the JSON object only.\n\n"
                    "=== TRANSCRIPT ===\n"
                    f"{transcript.strip()}\n"
                    "=== END TRANSCRIPT ==="
                ),
            }
        ],
        **config,
    )

    text = "".join(
        block.text for block in response.content if block.type == "text"
    )
    raw = _extract_json(text)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise SystemExit(
            f"model did not return valid JSON: {exc}\n--- raw output ---\n{text}"
        ) from exc

    if not isinstance(data, dict) or data.get("_snippet_version") != 1:
        raise SystemExit(
            "snippet missing `_snippet_version: 1` at top level; got:\n"
            + json.dumps(data, indent=2)[:500]
        )

    return data, response.usage, config["model"]


def _default_slug(snippet: dict) -> str:
    session = snippet.get("session") or {}
    for candidate in (session.get("summary"), snippet.get("_note"), "session"):
        if candidate:
            return _slugify(candidate)
    return "session"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Turn a session transcript into an Aurelius snippet JSON."
    )
    parser.add_argument(
        "transcript", help="Path to the session transcript (plain text)."
    )
    parser.add_argument(
        "--slug",
        help="Filename slug (default: derived from the session summary).",
    )
    parser.add_argument(
        "--date",
        default=_dt.date.today().isoformat(),
        help="Session date in YYYY-MM-DD (default: today).",
    )
    parser.add_argument(
        "--out-dir",
        default=str(SNIPPETS_DIR),
        help="Directory to write the snippet into (default: docs/snippets).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the snippet to stdout instead of writing a file.",
    )
    parser.add_argument(
        "--with-canons",
        action="store_true",
        help=(
            "Include the full data/canons.json in the cached prefix "
            "(~120K tokens). Off by default to fit lower API tiers; turn on "
            "for richer canon cross-referencing on Tier 2+."
        ),
    )
    parser.add_argument(
        "--model",
        choices=sorted(MODEL_CONFIGS),
        default=DEFAULT_MODEL,
        help=(
            "Which model tier to use. "
            "opus = Claude Opus 4.7 (strategic, full depth, highest cost). "
            "sonnet = Claude Sonnet 4.6 (~3x cheaper than opus, adaptive thinking). "
            "haiku = Claude Haiku 4.5 (~5x cheaper, no thinking — use for "
            "routine/mechanical chronicles). Default: opus."
        ),
    )
    args = parser.parse_args()

    transcript_path = pathlib.Path(args.transcript)
    if not transcript_path.exists():
        print(f"error: transcript not found: {transcript_path}", file=sys.stderr)
        return 1

    snippet, usage, model_id = chronicle(
        transcript_path.read_text(encoding="utf-8"),
        args.date,
        include_canons=args.with_canons,
        model_alias=args.model,
    )

    print(
        f"model: {model_id}  tokens: "
        f"input={usage.input_tokens} "
        f"cache_read={usage.cache_read_input_tokens} "
        f"cache_creation={usage.cache_creation_input_tokens} "
        f"output={usage.output_tokens}",
        file=sys.stderr,
    )

    if args.dry_run:
        json.dump(snippet, sys.stdout, indent=2, ensure_ascii=False)
        sys.stdout.write("\n")
        return 0

    slug = args.slug or _default_slug(snippet)
    out_dir = pathlib.Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"snippet-{args.date}-{slug}.json"
    out_path.write_text(
        json.dumps(snippet, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
