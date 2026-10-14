# Authored Flight Motion Geometry - Technical Documentation

**Introduced:** v2.92. **Current documented specification:** v2.92.

## State and ownership

`script.js` defines `combatGeometry` with authored motion records in a **WeakMap keyed by the DOM element**. Records contain start coordinates, path displacement, curve family, angle, dimensions, effective duration and clock reference. Weak keys allow removed objects to be garbage-collected normally.

Key functions:

- `registerFlight(el, flight, kind)`: register a live CSS-path object after insertion.
- `registerLabTarget(el, x, y, period)`: record predictable laboratory oscillation.
- `registerStatic(el, x, y, kind)`: record stationary UFO emitters.
- `motionCenter(el, now)`: calculate displayed center from the authored path, synchronized with CSS `Animation.currentTime` (via Web Animations API).
- `targetCenter`, `emitterCenter`: try modeled position first when geometry mode is on, otherwise cached layout reader, or direct legacy reader when off.
- `effectCenter`: place click/explosion effect at modeled center where available, else real bounding rectangle.
- `retime`: coordinate trajectory duration when Slowmo/equipment speed changes.

The animation is looked up only once per flight; lookup cost is instrumented separately. Reading the browser animation clock may still have some cost but is not the same as forcing a rectangle measurement.

## Geometry behavior

The authored path matches CSS keyframes (including UFO vertical drift and shooting-star rotation around its right edge). v2.92 supports UFOs, six-hit boss, stars, pickups, Doug bones and lab sprites. Unregistered/future elements still use the v2.91 cache fallback with optimization on; `dev combat geometry off` reverts entirely to v2.90 original bounding measurements.

Particle count, hit radii, reward event path, shot cap, firing rates, speeds and source shot animation were **not intended to change**. Hits still click genuine DOM target handlers for natural objects; benchmark targets are flagged to avoid progression.

## Instrumentation

In addition to v2.91 `combat.geometry.*.read` and `combat.ufoProjectile.geometry`, v2.92 adds:

```text
combat.geometry.target.modelHit
combat.geometry.emitter.modelHit
combat.geometry.effect.modelHit
combat.geometry.animation.lookup
```

One 30-second combined user Windows profile of v2.91 had **1,629ms target geometry reads and 1,320ms emitter geometry reads**, motivating this approach. Those are observed timing totals, not a fixed expected improvement after v2.92. Existing `getBoundingClientRect()` path remains the accuracy/compatibility fallback.

## QA and limitations

The v2.92 handoff reports `node --check` success; headless combined 10-second tests counted **105 player shots and 164 UFO shots** in both geometry modes, with hit counts within one then equal on repeated runs; three CSS flight center comparisons matched observed bounds within rounding. Real Windows 30-second combined tests across rarity themes and moving-target accuracy are still pending.

If CSS keyframes change, the model curves must be changed in tandem, or a shared motion authority must replace duplicated authoring. Stalling may persist in per-hostile-shot animation or compositor paint even when layout reads decrease.

See [Combat Benchmark QA](../../QA/COMBAT_BENCHMARK_V2_92.md).