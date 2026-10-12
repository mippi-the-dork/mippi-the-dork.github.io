# Shooting Star Charge - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Shooting Star Charge > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Introduces a catchable celestial event that grants the single-use charge required to make a Wish.

> This page is the canonical technical documentation for **Shooting Star Charge** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Natural Spawn Gate

`spawnShootingStar(force=false)` rejects a natural spawn when:

```js
!epicGameplayUnlocked()
```

or when motion is disabled by runtime policy, unless `force` is true.

It also rejects natural spawn when:

```js
hasWishCharge()
```

is already true.

Finally it asks the Adaptive Director:

```js
directorAllowsAmbient('shooting_star',{force})
```

before creating the object.

## DOM Object

The star is a semantic button:

```js
const star=document.createElement('button');
star.className='shooting-star fly';
star.type='button';
star.setAttribute('aria-label','A bright shooting star');
star.dataset.telemetryKind='shooting_star';
```

This makes the flying object keyboard-semantic even though its moving nature is primarily pointer-oriented.

## Flight Path

The star uses:

```js
randomEdgeFlight(240)
```

which chooses one of four viewport edges and generates:

- start position,
- end position,
- X/Y travel distance,
- rotation angle.

The CSS flight animation reads custom properties:

```text
--dx
--dy
--angle
--dur
```

## Base Duration

Without Celestial Beacon:

```text
2.05 seconds + random 0 to 1.15 seconds
```

With Celestial Beacon:

```text
3.4 seconds + random 0 to 1.55 seconds
```

The duration is then passed through the shared flying-object duration system.

That system can further apply:

- Director flight multiplier,
- Slowpoke modifier,
- Slowmo multiplier.

## Collection

Clicking the star:

1. records collection telemetry,
2. creates an explosion at the star position,
3. checks whether this is the first Wish unlock,
4. calls `grantWishCharge('CELESTIAL SIGNAL')`,
5. prints repeat collection output when applicable,
6. removes the star.

## First Unlock

`grantWishCharge()` checks:

```js
const firstCommand=!hasWish();
```

If true, it persists:

```text
mippiWishUnlocked
```

and records Wish command unlock telemetry.

The player receives a `SECRET COMMAND UNLOCKED` toast and Console output.

## Charge Capacity

`grantWishCharge()` always sets:

```js
wishCharge=1;
```

There is no value above one.

## Natural Scheduling

The natural scheduler uses:

```js
nextNaturalShootingStarDelay()
```

Current timing:

### Easy Mode

```text
9 to 16 seconds
```

### Normal without Celestial Beacon

Director-adjusted:

```text
28 to 62 seconds
```

### Normal with Celestial Beacon

Director-adjusted:

```text
18 to 38 seconds
```

## Deferred Opportunities

If the scheduled spawn is blocked, the system retries sooner rather than discarding the opportunity for a full new cycle.

Current retry examples:

- Epic not unlocked: 5 seconds
- charge already full: 14 seconds
- attention blocked: 2.6 seconds
- other failure: 6.5 seconds

## Uncharged `wish` Recovery

`scheduleWishShootingStar()` waits 1500 ms, then force-spawns a star if:

- no charge exists,
- no Shooting Star is already on screen.

It prints:

```text
CELESTIAL RESPONSE // Shooting Star inbound.
```

## Telemetry

Relevant counters include:

```text
shootingStarsSpawned
shootingStarsCollected
commandUnlocks
chargesSpent
```

The flying-object telemetry system also records spawn, collect, and miss behavior.

## QA

1. Fresh Epic state, no charge.
2. Wait for natural star.
3. Miss it and verify charge remains zero.
4. Catch next star and verify charge becomes 1/1.
5. Verify first catch unlocks Wish command.
6. Wait while charged and confirm natural stars are suppressed.
7. Spend Wish charge and verify natural star scheduling resumes.
8. Buy Celestial Beacon and compare timing/lifetime.
9. Toggle Slowmo and Slowpoke and verify catch window changes.
10. Run `wish` uncharged and verify forced star arrives after roughly 1.5 seconds.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
