# Combat Visual Isolation - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Combat Visual Isolation > Design

**Introduced:** v2.93. **Current documented version:** v2.94.

## Purpose

Combat Visual Isolation adds persistent-in-product, opt-in developer diagnostics to the [Combat Performance Lab](../combat-performance-lab/DESIGN.md). It separates how the browser **draws** combat from gameplay simulation, targeting, collision, hit registration and progression. The controls remain hidden from ordinary player-facing Console Help, and none run automatically.

The player-facing effects, animations, projectile counts and encounter balance are unchanged in ordinary use. Disabling visuals is strictly an isolation test, not a gameplay configuration or accessibility mode.

## Isolation controls

| Toggle | Off-state test | What still runs |
| --- | --- | --- |
| `player` | Hide visible Legendary player bullets | Player shot DOM, shared animation update, aiming/homing, hits and cleanup |
| `ufo` | Hide hostile bullet paint | Enemy bullet DOM, individual animation updates, cursor collision, cleanup |
| `explosions` | Suppress cosmetic particle **emission** | Calls to the effect helper, impact/hit logic, reward and projectile cleanup |
| `explosionpaint` | Hide particles **without stopping their lifecycle** | Existing particle creation, motion updates and expiry; DOM animation/timers in DOM renderer, shared Canvas loop in Canvas renderer |
| `glow` | Remove targeted combat shadows, glow, filters and blending | Base silhouettes, position, color, movement, interactions |

Use `dev combat visual all on` to restore appearance; `dev combat visual status` reports current selections. Controls are independent of the geometry comparison mode. They are session-only and cannot change during an active Combat Lab run. `dev profile reset` restores visuals to on.

## v2.93 measurements and implications

With Legendary theme, 2151 × 1307, 30-second `combined` benchmark and optimized geometry, four tests recorded approximately **30.4 delivered rAF frames/s** with all visual effects, **49.8** when explosion emission was suppressed, **30.5** with player and enemy projectile paint hidden, and **24.3** in one glow-off recording. A fifth later, unbracketed explosion-paint-hidden run recorded **15.3**. These measure callback cadence, not independently measured GPU-present FPS.

The standout association is that *not creating thousands of independently animated particle DOM elements* coincided with a much smoother benchmark. Simply making those DOM elements invisible did not help in the later fifth test, but the timing confound prevents attributing that deterioration to `visibility:hidden` itself. Neither dataset isolates exact browser paint, layout, animation or compositor costs.

This motivated v2.94's new [Shared Canvas Particle Renderer](../../12-arcade-combat/shared-canvas-particle-renderer/DESIGN.md), not a reduction in effect quality.

## Acceptance

Each off-state must suppress only the intended visual cost, not disable damage, hit testing, progression, rewards or cleanup. A fresh load and `dev profile reset` restore all normal visuals. Benchmark reports label the chosen switches and renderer, and a verified Windows frame-rate improvement is **not** a prerequisite for keeping this diagnostic feature.

See [Technical](TECHNICAL.md), [Combat Lab](../combat-performance-lab/DESIGN.md) and [v2.94 QA](../../QA/COMBAT_VISUAL_RENDERING_V2_94.md).