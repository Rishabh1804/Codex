# Decision Record — Drone Direction: Build FPV

**Date:** 2026-07-11 · **Repo:** Codex (personal archive) · **Status:** **LOCKED (for the moment)**
**Pending before hardware spend:** cross-check FPV vs. a GPS camera-drone build against a working cinematic-FPV pilot's channel (Joshua Bardwell / Oscar Liang) — confirm the FPV-exceeds-DJI-for-directed-cinematography claim from a practitioner, not just spec-sheet reasoning.

## The decision
Pursue a **self-built FPV drone** as the path to aerial video/direction. Not DJI, not a GoPro, not a domestic entry-level buy.

## Why — the eliminations (so future-me doesn't re-research)
- **GoPro action cam — rejected.** The phone already covers ~90% of the use; only *underwater* is a genuine add, and we rarely do underwater activities. A better version of a tool already owned; no new dimension.
- **DJI — rejected (legal dead-end, not a quality problem).** India's DGFT notification (Feb 2022) bans importing foreign finished drones. Every DJI in India is therefore **grey-market**. Registering one exposes you: you cannot produce the DGFT import permission → flagged as false declaration → registration cancelled (DGCA began this Aug 2025) → the drone, an illegally-imported good, becomes **liable to seizure**. No official DJI service in India either. Buying = illegal-to-fly-if-unregistered *and* self-exposing-if-registered. Dead end.
- **Domestic entry-level buy (NOTDrones et al.) — rejected for *this* goal.** Genuinely solves the legal problem (made-in-India, sub-250g, lawful UIN, warranty + service), but it's **hobby/beginner tier** (~₹13–16k; 1080p/2K; 2-axis gimbal; WiFi transmission) — roughly 1/5 the price and a tier or two below a DJI Mini. Fine as a cheap legal *trainer*, but a **low ceiling**. (Note: NOTDrones claims a "prosumer" model with a 1"/1-2.3" sensor — worth a look, but likely still sub-DJI.)
- **Better-tier domestic supplier — does not exist.** India's serious drone industry (ideaForge ~50% share, Throttle, Paras, Asteria, Aereo, General Aeronautics) is **enterprise / defence / agriculture / mapping** — the PLI money (~₹2,000 Cr) flowed there. **No domestic maker builds a DJI-tier consumer cinematography drone.** A structural market hole, not an oversight. And even Western brands (Parrot, Freefly, Skydio) hit the *same* import wall — the ban is on all foreign finished drones, not only Chinese.

## Why FPV — the selection
- **Highest ceiling on the board.** Cinematic FPV (immersive, dynamic, single-take chase/dive shots) is footage a DJI physically cannot produce — what film crews rent FPV pilots for.
- **Legal by construction.** The import ban is on *finished* drones; **components are importable.** A self-built drone is the one fully-lawful route to a serious rig.
- **No industrial equipment.** A temperature-controlled soldering iron, M2 hex drivers, a multimeter, and a laptop for firmware. ~₹15–25k for the build (excl. radio + goggles). A desk hobby.
- **The "cost" is the hobby.** The self-service / software-tuning I flagged as a burden (Betaflight config, PID tuning, firmware, repairs) *is* FPV — it rewards exactly the steep-curve, self-service, high-ceiling temperament driving this decision.

## On-ramp (cheapest-risk-first)
1. **FPV simulator first** (Liftoff / Velocidrone / DRL Sim, ~₹500–1,500 + a cheap radio). Learn the sticks and confirm the love *before* any hardware. Tells you honestly within a week.
2. Then a cheap **sub-250g build** (skips the pilot licence).
3. Then a **cinewhoop + GoPro** for cinematic work.

## Regulatory footnotes (India)
- Any camera drone needs a **UIN on Digital Sky**.
- **Sub-250g** skips the Remote Pilot Certificate; **>250g** requires the RPC (~4 days theory + 3 practical).
- FPV goggle-flying technically wants a **visual observer** beside the pilot.

## Caveats on this record
Research-grounded, not yet flown — the FPV-vs-GPS cross-check (above) is the open gate before spending. If the decision survives that check and becomes an active pursuit, **graduate this record to a Codex Volume** ("FPV") with chapters (sim → first build → cinematic build) and todos.
