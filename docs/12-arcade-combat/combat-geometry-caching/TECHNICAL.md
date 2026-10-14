# Combat Geometry Caching - Technical Documentation

**Introduced:** v2.91; **extended by authored motion in v2.92**.

## Core coordinator

`combatGeometry` lives in `script.js` and is exposed selectively through `window.MippiCombatHooks`. In v2.91 it uses a Map for target coordinates and a WeakMap for ship coordinates with `performance.now()` measurement stamps. Resize/scroll invalidates the data and stale/disconnected targets are not reused.

`nearestFlyingTarget()` and `sampleLegendaryTargets()` share `targetCandidates()` / `targetCenter()`; target discovery refreshes at most about every **125ms**, except when the list is empty. Cached target/emitter center measurements expire around **115ms**. Predictive target velocity is bounded at **1.8px/ms**, extrapolated no more than **110ms**. These are private tuning parameters, not UI options.

Hostile projectiles use `combatGeometry.emitterCenter(ship)` before appending projectile DOM. In the synthetic `ufo`/ `combined` volley, `combat-lab.js` `prepareVolley()` prewarms **all four emitter centers** before writes begin, avoiding repeated read/write alternation.

## A/B switch

`dev combat geometry on` enables the current optimized coordinator. `off` bypasses it and uses v2.90 bounding boxes / v2.90 player target sampler, as a legacy experimental control. Default is on, no persistence, and changing mode during active test is blocked.

In v2.92, `on` prefers `motionCenter()` for **registered** flying objects and uses this v2.91 cache only for unsupported ones. The original direct-read legacy comparison remains available.

## Profiling

Names: `combat.geometry.target.read`, `combat.geometry.emitter.read`, `combat.geometry.targets.query`, `combat.ufoProjectile.geometry`, `combat.ufoProjectile.create`, `combat.ufoProjectile.append`. These are nested within larger `combat.ufoProjectile.spawn` or player-target tick costs. Do not add inclusive durations twice.

The ordinary per-hostile-projectile rAF callbacks remain unchanged in v2.91 and v2.92. This is **geometry-cost optimization**, not pooling or consolidating hostile projectile simulation.

## Acceptance and caveats

Use comparative Windows capture with identical theme, viewport and test mode, check cache misses/invalidation on scroll, resize and object disappearance, then verify moving-target accuracy. A 30-second combined stress result is not equivalent to natural gameplay or GPU-present FPS. See [Combat Benchmark QA](../../QA/COMBAT_BENCHMARK_V2_92.md).