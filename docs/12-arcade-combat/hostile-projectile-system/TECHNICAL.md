# Hostile Projectile System - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Hostile Projectile System > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets UFOs and bosses fire at the player while ensuring impacts, misses, and cleanup do not leave stale projectiles on screen.

> This page is the canonical technical documentation for **Hostile Projectile System** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Standard Projectile Function

Regular UFO and normal Boss fire use:

```js
fireUfoProjectile(
  ship,
  {
    offsetX=0,
    offsetY=0
  }
)
```

## Initial Aim

At fire time:

```js
const tx=
  latestPointer.x+offsetX;

const ty=
  latestPointer.y+offsetY;
```

The projectile travels toward this fixed target point.

## Duration

Standard duration:

```js
Math.max(
  .24,
  Math.min(
    .95,
    distance/820
  )
)
*
directorProjectileDurationMultiplier()
*
(slowmoEnabled?2:1)
```

Speed is then calculated from:

```text
distance / duration
```

## Motion

Movement is JavaScript-driven with requestAnimationFrame.

Each frame:

- calculates remaining distance,
- advances toward fixed target,
- rotates projectile along path,
- checks live cursor collision.

## Live Cursor Collision

Hit test:

```js
Math.hypot(
  px-latestPointer.x,
  py-latestPointer.y
)<=18
```

The current cursor position is used.

This allows active dodging.

## Standard Hit

On hit:

```js
showArcadeCursorHit(
  px,
  py
);
```

That function:

- increments cursor-hit telemetry,
- records meaningful event,
- adds a short `.arcade-hit-flash`,
- creates an explosion,
- prints the cosmetic-damage joke on the first hit.

No wallet, health, achievement, or progression state is reduced.

## Miss / Endpoint

When the projectile reaches its fixed target point or its normal duration expires:

- it creates a small explosion,
- cleans itself up.

## Absolute Guard

An additional timeout fires after approximately:

```text
duration + 700 ms
```

and forcibly cleans the projectile if it somehow survived.

This is the v2.61 hardening that prevents stale projectiles.

## Source Removal

If the source ship disappears, the projectile can continue briefly enough to resolve its existing path, but is then guaranteed to clean up.

## CSS

v2.61 removes the old projectile CSS animation:

```css
.ufo-projectile{
  animation:none !important;
}
```

The projectile transform is now owned by JavaScript.

A later readability override keeps hostile regular shots white/cyan across themes.

## Slowmo Combo

When Slowmo is active at standard projectile spawn:

```js
telemetryCount(
  'combos',
  'slowmoHostileShots'
);
```

and:

```js
announceSystemCombo(
  'slowmo-hostile-fire',
  'Slowmo + UFO',
  'Hostile projectiles are slowed too. Fair is fair.'
);
```

runs once per session.

## Super Boss Projectile Function

The full-screen encounter uses:

```js
superBossProjectile({...})
```

It supports:

- direct bullets,
- add bullets,
- homing rockets.

## Super Boss Time Scale

Per-frame projectile movement uses:

```js
const timeScale=
  slowmoEnabled
    ? .55
    : 1;
```

## Homing

Rockets blend existing velocity toward the live gameplay cursor vector:

```text
94 percent current velocity
6 percent new target direction
```

then normalize back to configured speed.

## Super Boss Cleanup

A Super Boss projectile removes when:

- it hits gameplay cursor,
- lifetime expires,
- it leaves viewport bounds plus margin,
- encounter ends,
- absolute timeout fires.

## QA

- Fire regular UFO shots and dodge them.
- Move back into a projectile path and verify live collision.
- Let shots reach their target point.
- Destroy source UFO while shots are in flight.
- Verify every projectile disappears.
- Toggle Slowmo and compare travel.
- Run a long UFO session and confirm no stale projectile nodes remain.
- Test Super Boss bullets and rockets with encounter exit and victory cleanup.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.93–v2.94 Current Update

v2.93 hiding `ufo` paint does not disable hostile projectile rAF, collision, cursor hit or cleanup. `explosions off` suppresses impact particle emission without removing the actual collision/hit event. v2.94 changes the shared `explodeAt()` particle rendering to Canvas2D default with DOM fallback; the projectile's own simulation/DOM mechanics remain unchanged.
