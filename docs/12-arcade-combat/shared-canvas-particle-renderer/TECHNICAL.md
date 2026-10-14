# Shared Canvas Particle Renderer - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Shared Canvas Particle Renderer > Technical

**Introduced:** v2.94. **Current documented version:** v2.94.

## Module ownership and initialization

`particle-renderer.js` owns the shared Canvas2D layer, the numeric particle records and the single active rAF scheduler. `script.js` retains the production `explodeAt()` interface and routes to Canvas by default, falling back to existing per-particle `.arcade-pixel` DOM emission if Canvas2D cannot be initialized or the user selects DOM. `combat-lab.js` owns backend selection and counts; `perf-lab.js` measures timings and exports.

**Runtime dependency:** load `particle-renderer.js` before `script.js`, with `perf-lab.js` and `combat-lab.js` also initialized ahead of gameplay script. This is a runtime asset, not a documentation-only file.

## Canvas setup and lifecycle

A single fixed-position layer uses `pointer-events:none`, `aria-hidden:true`, and `z-index:70`. CSS dimensions match the viewport; the backing resolution uses device pixel ratio capped at 2. Resize/DPR changes synchronize on the next active draw. The canvas is created on the first emission, removed after the last particle expires, and has no active rAF scheduler when idle.

Particle records store numeric position, displacement, size, color, age/lifetime, spin/scale/opacity data rather than HTML nodes, individual CSS animations or timers. A single rAF updates and draws all active records; expired records are removed from the active array. Background-tab pauses do not continue a dedicated particle timeout loop; elapsed wall-time determines expiration on resume.

## CSS parity

The existing `arcade-burst` CSS ease-out curve is approximated via a **257-entry cubic-bezier lookup**. Position at progress `t` is start center `(x+size/2, y+size/2)` plus the authored eased `(dx,dy)` displacement. Squares rotate 180 degrees, shrink to 20% scale and fade to zero by expiry.

The same color palette, counts and parameters flow through `explodeAt(x,y,count,size,{radiusX,radiusY,lifetime})`, including existing Castle settings (34 particles, 33px, radii 560/450, 2150ms). Canvas and DOM can have minor raster/compositing differences that require browser visual review, not unapproved simplification.

## Console and compatibility

```text
dev combat renderer status
dev combat renderer canvas
dev combat renderer dom
dev combat visual explosions off
dev combat visual explosionpaint off
dev combat visual all on
dev profile reset
```

`canvas` is default after a fresh page load. Mode switching outside an active benchmark clears **only** the prior backend's cosmetic particles. Mode is not persisted and cannot change during a run. `dev profile reset` restores visual isolates to ON without changing selected renderer or geometry mode. `explosions off` suppresses emission across either backend; `explosionpaint off` hides the visuals while their particle lifecycle continues.

## Metrics and interpretation

`window.MippiParticleRenderer.snapshot()` exposes `active`, `canvasMounted`, `totals`, `sessionAgeMs`. Cumulative totals: `bursts`, `spawned`, `expired`, `frames`, `drawn`, `maxActive`, `rafMs`, `maxFrameMs`. Benchmark counts are run-specific, so do not compare them directly to page-cumulative values without accounting for resets.

Profiler scopes `combat.particles.canvasSpawn` and `combat.particles.canvasFrame` measure synchronous JS enqueue/draw costs, **not GPU-present or compositor time**. Combat exports add `rendererMode`, `effectCanvasParticles`, `effectDomParticles`, `canvasParticles` active/peak, and `sessionAgeMs`; version and filename specify v2.94 and `renderer-dom` or `renderer-canvas`.

Legacy `effectElementsEmitted` now means **logical particle emission**, not physical DOM nodes in Canvas mode.

## Boundaries and QA

Player/UFO projectile mechanics, firing cadence, target acquisition, damage, collision, scores, achievements, Invasion, rewards, Wish, music and Three.js scene systems remain outside this change. No new storage keys. User-authored LRC/MP3 files are untouched. Run [v2.94 visual/performance QA](../../QA/COMBAT_VISUAL_RENDERING_V2_94.md) on real Windows hardware before claiming a frame-performance gain.