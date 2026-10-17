# Canvas-First 2D Cosmetic FX - Design

**Introduced:** v2.99. **Current documented version:** v3.01.

## Purpose

High-frequency glowing decorative sprites should not each require a new DOM node, independent CSS animation and removal timeout. v2.99 migrates these **cosmetic** effects to shared Canvas2D by default while keeping their gameplay triggers and theme design. v3.00 refines core/halo sprite rendering for a sharper appearance. This does not transfer game interactions, ordinary UI, enemies or Three.js scenes to Canvas.

## Effect ownership

| Effect | Canvas default | Preserved behavior |
| --- | --- | --- |
| Epic/Legendary cursor Trail | Yes | Color, spawn rhythm, motion and timed fade; `dev cursor trail off/on` |
| Star Power cursor rainbow sparks | Yes | Star Power duration, collection, interaction and independent spark toggle |
| Doug Bone Cool rainbow wake | Yes | Doug/Bone interaction, Coolness progress and authored palette |
| Command / Particle Boost glow dots | Yes | Existing activation cadence and in-game effect |
| Cursor Aura | **No**, stays one DOM element | Theme border/ring and Star Power aura; its position writes are batched |
| Combat impact and Castle fireworks | Different Canvas engine | `particle-renderer.js` owns combat bursts |

Two short-lived layers preserve approximate low/high stacking and never intercept pointer events. Canvas is the default on new visits; `dev fx renderer dom` keeps the old treatment for comparison and compatibility. These are diagnostic settings, not player rewards and not persisted.

## Visual and performance acceptance

Maintain a recognizably matching Rare/Epic/Legendary visual language and validate small bright cores, short halos, size, motion, count, lifetime and click-through. The v2.99 implementation was smoke-tested in Chromium; **no v2.99 Windows FPS or pixel-perfect parity claim is supported by the handoff**. The v3.00 art/FX refinement should be verified separately from Sprite artwork replacement.

See [Technical](TECHNICAL.md), [v2.99 FX QA](../../QA/CANVAS_FX_V2_99.md) and [Combat Canvas Particles](../../12-arcade-combat/shared-canvas-particle-renderer/DESIGN.md).
