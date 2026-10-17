# Authored Spawn Motion - Technical

**Introduced:** v3.01. **Current documented version:** v3.01.

## Single movement authority

New `spawn-motion.js` is loaded before `script.js` and exposes `window.MippiSpawnMotion`:

```text
register(element, {duration, width, height, panel, step, onEnd})
stop(element)
positionOf(element)
ground()
viewport()
setSlowmo(enabled)
snapshot()
```

An internal `Map` owns active actors. A shared rAF calls per-actor authored route/physics `step` functions, writes CSS transforms, ages lifetime and fires completion callbacks. A `WeakMap` caches eligible panel rectangles (~75ms). `positionOf` returns the modeled rendered center for registered actors, accounting for panel offsets. On pause or absence of active actors the driver should avoid unnecessary work.

The shared `combatGeometry.center()` checks `MippiSpawnMotion.positionOf()` **before** the previous authored/DOM position fallback for accurate projectile, Boss/ship emitter and explosion location tests. The Slowmo function forwards active state with `MippiSpawnMotion.setSlowmo`.

## Entity registration

`script.js` defines `SPAWN_PANEL_SELECTOR` targeting `.work-card:not(a)`, `.tool-card`, `.panel`, `.studio-card`, `.resume-panel`, `.about-panel`, `.consult-project-item`, `.card` with constraints on size, connection and containment. `spawnScreenPickup` creates a regular button and optionally attaches it inside `.mippi-spawn-panel-host`.

`spawnGroundDrop` uses gravity ~1150 px/s², bouncy velocity reversal and hotbar-derived `ground()`. `spawnBounceStar` uses sinusoidal hop height and horizontal traversals. `spawnPanelMushroom` steps along computed panel width and height. `spawnHiddenPanelKey` attaches a stationary button right:6px/bottom:6px (one per Castle quest). `spawnDougBone` rotates as it falls. UFO and Boss use separate authored per-actor route functions. Super Boss movement/orbit is coordinated in its encounter state and rAF, with movement clock frozen for Mega Laser.

## State/QA

Classes include `.mippi-motion`, `.mippi-panel-key`, `.mippi-ground-drop`, `.mippi-spawn-panel-host`. Removing an actor must call `stop()` and honor `onEnd` semantics without duplicating telemetry or overwriting rewards.

The v3.01 implementation passed JS syntax parsing; no attached Windows performance measurements confirm its actual frame cost. Pay special attention to scroll-parent geometry, clipped panel edges, Key pointer access, Star reversal at screen edges, collectible pileups near the hotbar, and Super Boss/add/beam movement consistency. Shooting Star routes remain untouched.

See [Design](DESIGN.md), [Gameplay QA](../../QA/V3_00_V3_01_GAMEPLAY_QA.md).
