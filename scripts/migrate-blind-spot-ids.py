#!/usr/bin/env python3
"""One-shot migration: give blind spots ids and re-key growth[].source_blind_spot to them.

canon-cc-014 makes Block 5 (Shadow) -> Block 8 (Growth) a HARD link and builds its
cascading-redraft rule on it. The link keyed on a full-sentence prose match, and blind
spots had no identifiers, so it drifted whenever anyone edited wording: 27 of 47 linked
growth entries did not resolve.

  shadow.blind_spots:  ["text", ...]        ->  [{"id": "...", "text": "..."}, ...]
  growth[].source_blind_spot: "prose"       ->  "<companion>-bs-<slug>"

Unresolvable links are NOT guessed. They are set to null with the original string kept in
source_blind_spot_unresolved so nothing is lost and the validator can surface them.
"""
import json, io, re, sys

def first_phrase(s):
    """The lead clause, before the first em-dash or sentence period."""
    return re.split(r'\s*—\s*|\.\s+', s.strip(), maxsplit=1)[0].strip().rstrip('.').lower()

def slug(s, max_words=6):
    """A short, stable, hand-typeable slug from the blind spot's lead clause.

    Capped in length because these ids are written by hand into growth entries. Collisions
    are caught by an assert at build time rather than silently tolerated."""
    words = re.sub(r'[^a-z0-9]+', ' ', first_phrase(s)).split()
    return '-'.join(words[:max_words])

path = 'data/companions.json'
d = json.loads(io.open(path, encoding='utf-8').read())

migrated = resolved = orphaned = 0
orphans = []

for c in d['companions']:
    sh = c.get('shadow') or {}
    spots = sh.get('blind_spots') or []
    if not spots or isinstance(spots[0], dict):
        continue                                    # nothing to do / already migrated

    ids = []
    for text in spots:
        bid = f"{c['id']}-bs-{slug(text)}"
        assert bid not in ids, f"duplicate blind-spot id {bid} on {c['id']}"
        ids.append(bid)
    sh['blind_spots'] = [{"id": i, "text": t} for i, t in zip(ids, spots)]
    migrated += 1

    by_exact  = {t: i for i, t in zip(ids, spots)}
    by_phrase = [(first_phrase(t), i) for i, t in zip(ids, spots)]

    for g in c.get('growth') or []:
        s = g.get('source_blind_spot')
        if not s:
            continue
        hit = by_exact.get(s)
        if not hit:                                  # prefix of a declared spot
            hit = next((i for t, i in by_exact.items() if t.startswith(s)), None)
        if not hit:                                  # same lead clause, punctuation differs
            fp = first_phrase(s)
            hit = next((i for p, i in by_phrase if p == fp or fp.startswith(p) or p.startswith(fp)), None)
        if hit:
            g['source_blind_spot'] = hit
            resolved += 1
        else:
            g['source_blind_spot'] = None
            g['source_blind_spot_unresolved'] = s
            orphaned += 1
            orphans.append((c['id'], g['id'], s))

io.open(path, 'w', encoding='utf-8').write(json.dumps(d, indent=2, ensure_ascii=False) + "\n")
print(f"companions migrated: {migrated}")
print(f"links resolved to ids: {resolved}")
print(f"links orphaned (kept, not guessed): {orphaned}")
for cid, gid, s in orphans:
    print(f"    {cid:<10} {gid:<42} named {s[:64]!r}")
