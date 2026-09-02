#!/usr/bin/env python3
"""Integrity checks for data/companions.json. Run before any profile ratification.

Exists because canon-cc-014's Block 5 -> Block 8 hard link silently rotted for five
months: 27 of 47 growth entries named a blind spot that did not resolve, so the canon's
cascading-redraft rule could not be computed. Cheap to detect; nobody was detecting it.

Exit 0 = clean (warnings allowed). Exit 1 = a hard defect.
"""
import json, sys, collections

FAIL, WARN = [], []
d = json.load(open('data/companions.json', encoding='utf-8'))
cs = d['companions']

ref = next(c for c in cs if c['id'] == 'ashara')          # the reference full profile
ref_keys, ref_growth_keys = list(ref.keys()), set(ref['growth'][0])

# Keys a growth entry may legitimately carry beyond the reference shape.
#   source_blind_spot_unresolved — set by the id migration where a link could not be resolved
#   ceiling_phase_gate           — a ceiling raise gated on a future condition (aurelius, canon-cc-019)
OPTIONAL_GROWTH_KEYS = {'source_blind_spot_unresolved', 'ceiling_phase_gate'}

for c in cs:
    cid, stub = c['id'], c.get('meta', {}).get('profile_version', '').startswith('v0.0')

    if not stub and list(c.keys()) != ref_keys:
        FAIL.append(f"{cid}: top-level keys differ from the reference profile (ashara)")

    spots = (c.get('shadow') or {}).get('blind_spots') or []
    ids = []
    for i, sp in enumerate(spots):
        if not isinstance(sp, dict) or 'id' not in sp or 'text' not in sp:
            FAIL.append(f"{cid}: blind_spots[{i}] is not {{id, text}} — un-migrated")
            continue
        ids.append(sp['id'])
    for bid, n in collections.Counter(ids).items():
        if n > 1:
            FAIL.append(f"{cid}: duplicate blind-spot id {bid}")

    for g in c.get('growth') or []:
        gid = g.get('id', '?')
        if set(g) - OPTIONAL_GROWTH_KEYS != ref_growth_keys:
            FAIL.append(f"{cid}/{gid}: growth schema differs from the reference")
        s = g.get('source_blind_spot')
        if s is not None and s not in ids:
            FAIL.append(f"{cid}/{gid}: source_blind_spot {s!r} resolves to no declared blind spot")
        if g.get('source_blind_spot_unresolved'):
            WARN.append(f"{cid}/{gid}: orphaned link, originally named "
                        f"{g['source_blind_spot_unresolved'][:60]!r} — needs a drafting pass")
        if g.get('type') == 'weakness_reduction' and s is None and not g.get('source_blind_spot_unresolved'):
            WARN.append(f"{cid}/{gid}: weakness_reduction with no source blind spot")
        b, cur, ceil = g.get('baseline'), g.get('current'), g.get('ceiling')
        if None not in (b, cur, ceil) and not (b <= cur <= ceil):
            FAIL.append(f"{cid}/{gid}: baseline/current/ceiling out of order ({b}/{cur}/{ceil})")

meta_n = d['_meta'].get('companion_count')
if meta_n is not None and meta_n != len(cs):
    FAIL.append(f"_meta.companion_count is {meta_n}; the file holds {len(cs)}")

for w in WARN: print(f"WARN  {w}")
for f in FAIL: print(f"FAIL  {f}")
print(f"\n{len(cs)} companions · {len(FAIL)} failures · {len(WARN)} warnings")
sys.exit(1 if FAIL else 0)
