# Combat Performance Lab - Technical Documentation

**Introduced:** v2.90. **Current documented specification:** v2.92.

## Runtime ownership and loading

The deployed runtime must load **`perf-lab.js`, then `combat-lab.js`, then `script.js`**. `window.MippiPerfLab` collects frame/timer/rAF/DOM measurements and exports JSON. `window.MippiCombatLab` owns transient targets, emitters, counters, schedules and cleanup. `window.MippiCombatHooks` is a frozen adapter from real gameplay `script.js` exposing production `fireLegendaryPlayerShot`, `nearestFlyingTarget`, `fireUfoProjectile`, and `explodeAt`, with diagnostic flags to prevent rewards/telemetry. No copied projectile implementation lives in the lab.

These tools are permanent site features, albeit hidden from ordinary Console `help`. The user-authored audio/LRC files and regular game configuration are not changed by lab runs.

## Commands

```text
dev combat
dev combat run idle 30
dev combat run player 30
dev combat run ufo 30
dev combat run combined 30
dev combat run explosions 30
dev combat stop
dev combat report
dev combat export
dev combat geometry on
dev combat geometry off
```

The supported `run` duration is 10–45 seconds, default 30. Geometry switching is blocked during active runs. `on` is the default on each page load; the toggle is per-page and not persisted. For profiler output, `dev profile report` and `dev profile export` are also supported.

## Workload and lifecycle

`idle`: no synthetic shots. `player`: up to four moving targets, shot every ~95ms. `ufo`: six fixed emitters, four hostile shots each volley about 240ms. `combined`: both. `explosions`: 28 CSS particles about every 190ms.

Sequence: command -> Console closes -> short settle -> profiler begins -> test entities and 1Hz snapshots start -> deadline/manual stop -> recording ends **before cleanup** -> remove benchmark-tagged targets, emitters and shots; keep latest report available. Stopping during pending shots records their population at stop; teardown afterward is **not a leak**.

Ambient Director's non-forced spawns are suppressed while the lab runs, then resume. Benchmark entity hits skip ordinary player/UFO damage, progression and telemetry callbacks.

## Data contract

Keep the inherited profiler fields: `version`, `diagnosticHarness`, `capturedAt`, `viewport`, `summary`, `raw.frames`, `raw.longTasks`, `raw.longFrames`, `raw.systems`, `raw.spikes`, `raw.timerEvents`.

Since v2.90: `raw.combatInitial`, `raw.combatSnapshots` (1Hz), `raw.combatFinal`, counters for `playerSpawn`, `playerCleanup`, `playerHit`, `ufoSpawn`, `ufoCleanup`, `explosions`, `particles`, active/peak populations; named `combat.ufoProjectile.step/spawn/cleanup`, `combat.playerProjectile.tick/spawn/cleanup`, `combat.playerAcquire`, `combat.explosion.spawn`.

Since v2.91: snapshots/report expose `geometryMode`, `combat.geometry.target.read`, `combat.geometry.emitter.read`, `combat.geometry.targets.query`, `combat.ufoProjectile.geometry/create/append`, with source measurements reused between targeting and homing. Since v2.92: `combat.geometry.target.modelHit`, `combat.geometry.emitter.modelHit`, `combat.geometry.effect.modelHit`, `combat.geometry.animation.lookup`.

Use **v2.92** as JSON `version`; export filenames should be `mippi-profile-v2.92-<theme>.json`. Nested costs are inclusive and must not be summed as though independent.

## Important bug fix

v2.90 deferred the initial telemetry-visible-section scan until after `POSTGAME_EPIC_KEYS` initialization to avoid a startup temporal-dead-zone ReferenceError. The profiler's wrapped timeout must not access a stopped session after `dev combat` ends recording from inside a timeout.

## Interpretation and limits

The RAF frame intervals are not GPU-present timings. The fixed UFO emitters do not simulate full roaming enemy AI. Controlled cursor input does not represent the entire real player experience. Repeat runs; compare actual spawned/removed/hit and peak counts to ensure equal work. v2.78 was not instrumented with the identical Combat Lab load, so direct synthetic-performance claims about v2.78 are unsupported.

See [Combat Benchmark QA](../../QA/COMBAT_BENCHMARK_V2_92.md) for repeatable workload and accuracy testing.