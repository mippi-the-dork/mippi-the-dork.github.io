# Combat Geometry Caching - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Combat Geometry Caching > Design

**Introduced:** v2.91. **Current documented specification:** v2.92.

## Problem and intention

Several combat actions need the visible center of the same moving object: acquiring a target, steering a Legendary shot, or launching a hostile projectile from a UFO. Calling browser layout measurement repeatedly for the same short-lived position can create spikes when DOM transforms and animations are active.

v2.91 consolidates these reads into a shared, short-lived geometry coordinator. It is an engineering improvement, **not** a new aiming ability or player-facing feature. It must preserve projectile count, speed, lifetime, homing accuracy, collisions and reward callbacks.

## Comparison behavior

The hidden `dev combat geometry on/off` switch supports controlled A/B tests. In v2.91, `on` uses short-lived cached bounding rectangles; `off` uses the v2.90 original reads. The v2.92 `on` mode first tries authored motion for supported flying objects, falling back to the v2.91 cache. `off` still restores v2.90 legacy reads.

This is local to the current page and does not persist or award anything. It cannot be changed during a running benchmark.

## What should remain perceptually unchanged

- Shots seek and hit the correct moving targets, including moving UFOs/pickups.
- UFO shots visibly originate from the firing ship and head toward the cursor snapshot.
- Homing updates respect fast movement and long frames without causing impossible jumps.
- Game rewards, damage, upgrades and theme visuals are unchanged.

## Acceptance

Compare on/off under the same v2.92 `combined` workload on real Windows Edge; confirm accuracy through manual gameplay. Avoid FPS claims from headless software-rendering tests. See [Technical](TECHNICAL.md) and [Authored Flight Motion Geometry](../authored-flight-motion-geometry/DESIGN.md).