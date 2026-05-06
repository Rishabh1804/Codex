# Phase 4 Chronicle — Hardening + Foundation

**Chronicler:** Aurelius (`aurelius-09`)
**Sub-phases:** Polish · Stability · Tally · Reward · Launcher · Spark
**Operating mode:** Lean-Machine (per `LEAN_MACHINE_PHASE_4.md`)
**Sister artifacts:** `docs/doctrine-ledger.md` · `docs/sessions/CABINET_BRIEF_PHASE_4.md`

## Phase open
- Opens at codex/main@`dc74a3de` / sl-main@`5c21c62f` (post-Phase-3 close)
- Carries: 5 doctrine candidates from Phase 3 + 5-item R-10 hygiene queue + 2 Phase 4 carry-forwards (medChecks + feedingData object-keyed attribution)

---

## PR-22 (sproutlab#22) — sl-4-pr20-hygiene-sweep
- **Merged:** 2026-04-30; sl-main@`1bc64d31`
- **Shape:** 5-item R-10 queue flush; Phase 4 zero gate
- **R-4:** 583 stable / 0 silent flakes; cumulative 4,081/13
- **Cipher r1→r2:** D8 catches (inserted "state" word verbatim quote drift; "framing comment" compound-noun misattribution)
- **Doctrine:** D8 first Phase 4 instance; architectural-surfacing first Phase 4 sustainment
- **Aurelius rulings:** punctuation boundary Cabinet-eligible; r2-stress-rerun-elective candidate at 2/3; no-CI shape re-confirmed; `subscription-only / no-poll-on-wake` mode shift on-record (Ruling 4)

## PR-23 (sproutlab#23) — sl-4-polish-charter
- **Merged:** 2026-04-30; sl-main@`5a840330`
- **Shape:** Phase 4 sub-phase 1 (Polish) charter; pure docs (Edict VIII)
- **Cipher r1→r2:** 3 catches (Finding E count off-by-one 25→24; home.js:11828 bogus line→:1595; HR-1 audit undercount "two emoji" actual ≥18)
- **Consul:** clear; 4 non-blocking surfacings → Cabinet brief
- **Sovereign-ratified:** R-8 Option B + activities-tab fold-in 1 slot (PR-β only) deferred-pending-Stability-PR-α; HR-1 audit reframe path (a)
- **Doctrine RATIFIED:** `r2-stress-rerun-elective-on-pure-doc-text-correction` 3/3 (PR-9 + PR-22 + PR-23)
- **Operating mode:** subscription-only first failure mode observed (Cipher r1+r2 didn't webhook-deliver; Sovereign-directed re-check recovered)

## Lean-Machine adoption — 2026-04-30
- Sovereign ratified mid-flight token-spend reduction
- Artifacts authored: `LEAN_MACHINE_PHASE_4.md` + `doctrine-ledger.md` + `CABINET_BRIEF_PHASE_4.md` + this chronicle
- Stream-idle-timeout failure mode hit at multi-file authoring; recovered via per-file commit splitting (validates the per-call <8K discipline empirically in real-time)

---

## Sub-phase status

| Sub-phase | Charter | Features | Close |
|---|---|---|---|
| Polish | ratified PR-23 | Polish-1 through Polish-11 (26 PRs total; 4 close-shifts) | **CLOSED 2026-05-06** sl-main@`e01190a` |
| Stability | — | — (carries activities-tab PR-α + medChecks/feedingData carryforward) | — |
| Tally | — | — | — |
| Reward | — | — | — |
| Launcher | — | — | — |
| Spark | — | — (Phase 5 feature-flag mechanism scaffolding) | — |

## PR-40 (sproutlab#40) — Polish-11a: Sleep Score SVG-leak (HR-7)
- **Merged:** 2026-05-06; sl-main@`cbf7239` (corrupted) → `12140f8` (clean rebuild PR-41)
- **Shape:** 1-line JS fix (home.js:98); 2 regression guards
- **Root cause:** `sleepScorePill.textContent = \`${zi('moon')} ${avg}\`` — SVG HTML via textContent rendered as literal text
- **Fix:** `textContent = String(avg)` + `.hsp-icon.innerHTML = zi(icon)` (HR-7 compliant)
- **Doctrine RATIFIED:** `architectural-sweep-PR-misses-sibling-sites` **3/3** (Phase 4 native #5) — Sleep Score = 3rd instance after Polish-10a r1 + Polish-10d r1

## PR-41 (sproutlab#41) — Polish-11b: Growth gauge overflow + pill legibility + HR-4
- **Merged:** 2026-05-06 (clean rebuild)
- **Shape:** medical.js val/unit split + styles.css font-size + escHtml(pctText); 4 regression guards
- **Bug 2:** "70 cm" combined string at `--fs-xl` overflows 78px inner ring → split to `wtVal=String(wt)`, `wtUnit='kg'` (ft/in/cm modes all handled)
- **Bug 3a:** `.gh-gauge-pct` at `--fs-xs`≈9px sub-legible → `--fs-sm` + `padding:var(--sp-2) var(--sp-8)`
- **Bug 3b:** `pctText` unescaped in innerHTML — `calcPercentile` returns `"<3rd"/"">97th"` → `escHtml(pctText)` (HR-4)
- **Doctrine RATIFIED:** `sub-phase-close-was-premature` **3/3** (Phase 4 native #6) — Polish-11 = 4th close-shift

## PR-42 (sproutlab#42) — SW Canon 0034 enforcement
- **Merged:** 2026-05-06
- **Root cause:** SW cached `index.html` via stale-while-revalidate; corrupted HTML served indefinitely from cache blocking fix propagation
- **Fix:** remove `index.html` + `'./'` from PRECACHE_ASSETS; add `navigate` mode bypass in fetch handler
- **Infra lesson:** Canon 0034 ("SW never caches HTML") was violated in implementation; now enforced

## PR-43 (sproutlab#43) — syncReload HTTP cache-bust
- **Merged:** 2026-05-06
- **Root cause:** `location.reload()` respects browser HTTP cache; stale HTML served even after SW cache cleared
- **Fix:** `location.replace(pathname + '?_cb=' + Date.now())` — timestamp param forces fresh network fetch
- **Infra lesson:** update-toast reload must always cache-bust; `reload()` alone is insufficient

## PR-44 (sproutlab#44) — BUGS.md
- **Merged:** 2026-05-06; sl-main@`e01190a`
- **Shape:** docs-only; structured bug log (open P0/P1/P2 + fixed + R-10 queue + operational rules)

## Polish sub-phase CLOSE — 2026-05-06
- **4 close-shifts:** PR-32→PR-33 + PR-37→PR-38 + PR-39→Polish-11 + Polish-11 clean close
- **26 PRs total** across Polish sub-phase (charter + 10 features + 5 infrastructure + 1 amendment + 4 close-shifts + BUGS.md)
- **6 Phase 4 native RATIFIED doctrines** at close (4 carried from prior + 2 ratified this session)
- **Hat-switch experiment** (this session): Lyra-primary, Cipher/Aurelius/Maren/Kael as Skills — catches sustained; viable posture confirmed
- **Stability sub-phase 2 unblocked** — PR-α next (renderMilestones split + _renderAttribution wiring)

---

## Append protocol
- Append per merge to this file
- Per-PR commit messages cite section anchors (`[PR-N section]`), don't restate
- Section per PR: shape · key catches · doctrine touchpoints · sl-main SHA · cumulative R-4
