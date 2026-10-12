# Slowmo - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Slowmo > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Applies a slower timing model to flying objects, hostile projectiles, and selected arcade physics.

> This page is the canonical technical documentation for **Slowmo** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let slowmoEnabled=false;
```

## Command

Player-facing:

```text
slowmo
```

calls:

```js
setSlowmo(
  !slowmoEnabled
);
```

Console text reports:

```text
0.5x
```

or:

```text
1.0x
```

## Body Class

Slowmo toggles:

```text
slowmo-mode
```

on `body`.

## Existing Flying Objects

`setSlowmo()` iterates:

```text
.shooting-star
.galaga-secret
.game-pickup
.doug-bone
```

For each object with:

```text
data-base-duration
```

it recalculates CSS `--dur`.

Formula:

```text
base duration
* Director flight multiplier
* Slowpoke multiplier
* Slowmo multiplier
```

Slowmo multiplier:

```text
2
```

## New Flying Objects

`setFlightDuration()` uses the same formula when an object is spawned.

## Regular Hostile Projectiles

`fireUfoProjectile()` multiplies standard projectile duration by:

```text
2
```

when Slowmo is active.

The first observed slowed hostile shot announces:

```text
Slowmo + UFO
```

## Super Boss Projectile Movement

`superBossProjectile()` uses:

```js
timeScale=
  slowmoEnabled
    ? .55
    : 1;
```

## Super Boss Cadence

Current encounter values include:

| System | Normal | Slowmo |
| --- | ---: | ---: |
| Boss fire | 760 ms | 1200 ms |
| Add fire | 1080 ms | 1650 ms |
| Rocket repeat | 2650 ms | 3900 ms |
| Laser repeat | 5350 ms | 7600 ms |
| Laser charge | 900 ms | 1250 ms |
| Laser active | 1750 ms | 2300 ms |
| Laser turn | .88 rad/s | .62 rad/s |
| Player shot | 1500 px/s | 1050 px/s |

## Mippi Bird

Helpers:

```js
function flappyJumpStrength(){
  return slowmoEnabled
    ? -5.25
    : -6.9;
}

function flappyGravity(){
  return slowmoEnabled
    ? .24
    : .36;
}
```

## Telemetry

Toggle records:

```text
modes.slowmoToggles
meaningful: slowmo
```

## QA

- Toggle while a regular UFO is already flying.
- Toggle while a pickup is already flying.
- Spawn new UFO and compare projectile travel.
- Verify first Slowmo + UFO combo.
- Start Super Boss with Slowmo active and inspect pacing.
- Play Mippi Bird with and without Slowmo.
- Reload and verify Slowmo returns to off.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
