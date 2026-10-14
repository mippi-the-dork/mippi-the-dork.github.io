# Authored Flight Motion Geometry - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Authored Flight Motion Geometry > Design

**Introduced:** v2.92. **Documented target:** v2.92.

## Design intent

Combat bullets and explosions must respond to the **visible position** of a moving target, even when many CSS-animated objects are on screen. After v2.91 reduced repeated DOM measuring, v2.92 calculates positions for supported flying entities from their **authored motion paths** rather than making the browser repeatedly resolve animated bounding rectangles.

This improves the *potential* for smooth performance without simplifying visuals, reducing projectile count or altering hit rules. The aim is player-perceptible parity: targeting and effects should still line up exactly with visible UFOs, stars and pickups.

## Supported entities

Normal UFOs, the multi-hit UFO boss, shooting stars, ordinary flying pickups, Doug bones, and the Combat Lab's disposable targets/emitters. For other DOM targets, the existing browser-measured geometry fallback remains.

## Accuracy rules

- Reuse the same authored curve, displacement, angle, dimensions and duration as the CSS sprite animation, including UFO vertical drift and the right-pivot shooting-star rotation.
- Use the browser's CSS animation clock rather than guessed elapsed wall-time, so a delayed frame does not move target logic ahead of what the visitor sees.
- Explosion centers for supported entities follow this model, too.
- Slowmo and equipment-derived animation duration adjustments must keep timing synchronized.
- Benchmark toggles compare legacy and new geometry but must not change normal damage, rewards, particle counts or progression.

## Release caveat

Headless smoke runs and sampled geometry alignment support basic correctness, **not** proof of 60 FPS or a resolved Windows performance regression. Visual parity must be checked on the actual browser/hardware.

See [Technical](TECHNICAL.md) and [Combat Geometry Caching](../combat-geometry-caching/DESIGN.md).