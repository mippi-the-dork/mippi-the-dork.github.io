# Cursor Projectile Combat - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Cursor Projectile Combat > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player fire upward-moving cursor projectiles that collide with boss targets and adds.

> This page is the canonical technical documentation for **Cursor Projectile Combat** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Super Boss Fire Function

The dedicated firing closure is:

```js
fireBossPlayerShot()
```

inside `spawnSuperBoss()`.

## Input

Arena pointerdown:

```js
if(
  e.button!==0 ||
  e.target.closest(
    '.superboss-exit'
  )
)
  return;
```

Then:

```js
e.preventDefault();
fireBossPlayerShot();
```

## Origin

Shot X:

```js
const x=
  state.cursorX;
```

Initial Y:

```js
let y=
  state.cursorY-10;
```

This uses the gameplay cursor after knockback, not the raw OS pointer position.

## Speed

Normal:

```text
1500 px/s
```

Slowmo:

```text
1050 px/s
```

## Segment Collision

Each frame calculates:

```js
const nextY=
  y-speed*dt;
```

Collision uses:

```js
distancePointToSegment(...)
```

against the vertical segment from:

```text
(x,y)
```

to:

```text
(x,nextY)
```

## Add Radius

Adds use collision radius:

```text
28 px
```

The first living Add whose center intersects the traveled segment is destroyed.

## Core Radius

Boss core uses collision radius:

```text
72 px
```

## Add Priority

The loop checks all living adds before checking the Boss core.

## Add Hit

On Add hit:

```js
telemetryCount(
  'arcade',
  'playerHits'
);

destroyAdd(hitAdd);
remove();
```

## Boss Hit

On core hit:

```js
telemetryCount(
  'arcade',
  'playerHits'
);

damageBoss(
  'superboss_player_shot'
);

remove();
```

## Lifetime

A shot removes when:

```text
Y < -40 px
```

or:

```text
older than 2600 ms
```

## Animation Ownership

Player shots use requestAnimationFrame.

RAF IDs are tracked in:

```js
state.shotRafs
```

so encounter cleanup can cancel all active shots.

## General Legendary Cursor Shots

Outside the encounter, the site also exposes:

```js
fireLegendaryPlayerShot(
  x,
  y,
  target
)
```

for Legendary gameplay.

That system:

- requires Legendary progression,
- acquires a nearby flying target,
- follows that moving target,
- uses:
  - 1050 px/s base,
  - 1380 px/s with Golden Trigger.

It is separate from the Super Boss's vertical firing model.

## QA

- Fire under an Add and verify one-hit kill.
- Fire under core and verify exactly one HP.
- Fire where an Add crosses the core and verify Add priority.
- Test high frame-rate and low frame-rate conditions for tunneling.
- Toggle Slowmo and compare shot speed.
- Click Exit Boss Fight and confirm no player bullet is created.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.82 replaced one rAF per Legendary projectile with shared `legendaryActiveShots` / `tickLegendaryShots` (14 cap, 1.8s lifetime). v2.84 added 75ms target-location caching and cheap solid paint. v2.85 latest: 50ms cached samples with predicted target velocity, 120ms delta clamp, per-shot speed cached when fired (1050px/s, 1380px/s Golden Trigger), 46ms CSS transform easing. Original target click handlers still grant rewards. No real-device FPS fix is asserted.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).


## v2.93–v2.94 Current Update

v2.93 `dev combat visual player off` hides Legendary player-shot paint only, leaving targeting, shared rAF, homing, impact, reward click and cleanup intact. `dev combat visual explosions off` suppresses cosmetic impact sprites only. v2.94 renders `explodeAt()` impact effects through shared Canvas2D by default while retaining DOM fallback; it does not convert projectile simulation to Canvas.


## v2.95–v2.97 Current Update

v2.95 cancels the shared Legendary player-projectile rAF immediately when no shots remain after benchmark teardown. v2.97 `dev cursor size` changes only the visual Mushroom cursor; real `cursorPowerLevel` and `55px * cursorPowerLevel` Legendary acquisition range are unchanged, as are player shot speeds and collisions.


## Current v3.01 Behavior

v3.00 replaced homing/lock-on Legendary shots with manual, upward enemy-only projectiles. Cool Mode fires angles -12/0/+12 degrees; Star Power pierces enemies; Golden Trigger increases speed. The current cap is 18 shots, not 14. The cursor ring is for proximity clicks, not a projectile-target acquisition range. Earlier cached homing behavior is historical only.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.
