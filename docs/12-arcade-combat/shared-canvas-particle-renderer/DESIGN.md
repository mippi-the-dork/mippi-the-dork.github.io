# Shared Canvas Particle Renderer - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Shared Canvas Particle Renderer > Design

**Introduced:** v2.94. **Current documented version:** v2.94.

## Purpose and visual contract

A single full-viewport Canvas2D layer renders the game's existing square burst particles without creating a separate HTML element, CSS animation and timeout per particle. This replaces the expensive DOM emission pattern identified by v2.93 visual-isolation benchmarks.

**Preservation is the goal:** particle quantity, square silhouette, theme colors, spawn center, displacement range, easing, rotation, shrink, opacity fade, lifetime and stacking must remain visually equivalent to the original effects. This release does **not** intentionally simplify particle counts, reduce bursts, slow shooting, or change any damage or progression logic.

## Included effects

Every effect going through the shared `explodeAt()` helper: player/UFO projectile impacts, target hits, shooting stars, pickups, Doug interactions, Boss and Super Boss bursts, and Castle fireworks. It is **not** a redesign of Three.js scenes, cursor sparks or projectile animations.

Castle celebrations still use their larger authored settings: nine burst origins, 34 particles per burst, 33px squares, `radiusX:560`, `radiusY:450`, and `lifetime:2150` milliseconds. The existing 4/4 Castle click-to-claim and friendly pickup auto-collection remain unchanged.

## Renderer selection

**Canvas** is the default. `dev combat renderer dom` selects the original CSS `.arcade-pixel` implementation for fidelity and performance comparisons; `canvas` restores the shared renderer; `status` shows the selection. The mode is temporary (not persisted), cannot be switched mid-benchmark, and switching clears only outstanding *cosmetic* effects from the previous backend. A browser without a functioning Canvas2D context falls back to original DOM effects.

The Canvas sits over content at the existing particle layer, cannot intercept mouse/pointer input, and exists only while particles are alive. It releases the canvas and its animation loop when idle.

## Performance meaning

The v2.93 data showed a strong particle-emission bottleneck under artificial Legendary combined combat. v2.94 changes the **architecture** to test a less DOM-intensive renderer, not to proclaim an FPS fix. Automated syntax and headless smoke tests passed; **Windows Edge/Chrome A/B performance and visual parity are still to be validated**.

The five-scenario permanent Combat Lab and visual/geometry switches remain available.

## Acceptance

Canvas and DOM effects should have matching spread, color, shape, duration and layering in all themes. Both must preserve hit and reward behavior, large Castle fireworks, and accessibility. Long test sessions should not leave canvases/rAF loops or stale particle state. See [Technical](TECHNICAL.md) and [Combat Visual Rendering QA](../../QA/COMBAT_VISUAL_RENDERING_V2_94.md).