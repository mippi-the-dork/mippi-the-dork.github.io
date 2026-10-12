# Star Pickup and Star Power - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Star Pickup and Star Power > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Grants a temporary power state that affects movement, arcade interactions, and selected system-combo behavior.

> This page is the canonical technical documentation for **Star Pickup and Star Power** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Collection

Standard Star pickup routes to:

```js
activateStarPower();
```

Telemetry also increments:

```text
economy.starsCollected
```

## Activation

`activateStarPower()`:

1. records mode activation telemetry,
2. records meaningful `star_power`,
3. removes and re-adds `star-power` body class to restart presentation,
4. clears prior Star Power timers,
5. emits nine startup rainbow cursor sparks,
6. starts a repeating contact/spark interval,
7. schedules Star Power end.

## Contact Loop

Every:

```text
70 ms
```

the active interval:

- emits a rainbow cursor spark,
- calls `collectStarPowerHoverTarget()`.

## Target Query

The hover collector checks:

```text
.shooting-star
.galaga-secret
.game-pickup
.doug-bone
```

under:

```js
document.elementFromPoint(
  latestPointer.x,
  latestPointer.y
)
```

## Collection Method

Before clicking the target it writes:

```text
data-telemetry-collect-method="star_power"
```

and uses the target's existing click route.

This preserves the underlying feature reward.

## Repeat Boss Lockout

Boss targets are treated as repeatable.

After a Star Power hit:

```text
data-star-power-hit
```

is cleared after roughly 700 ms.

This prevents the 70 ms contact loop from dealing uncontrolled continuous damage.

## Duration

Base:

```text
3600 ms
```

Star Extender:

```text
5600 ms
```

At end:

- body class is removed,
- contact interval is cleared.

## Combo Telemetry

Known counters include:

```text
starPowerUfoKills
starPowerBossHits
starPowerDoug
```

One-time combo announcements use:

```js
announceSystemCombo(...)
```

## Visual CSS

`body.star-power` changes the completion cursor aura into a rapidly rotating rainbow ring.

Cursor spark particles use the class:

```text
rainbow-cursor-spark
```

## QA

- collect Star,
- touch a normal pickup with cursor,
- verify auto-collection,
- touch Shooting Star,
- touch UFO,
- touch Boss,
- collect Doug Bone,
- verify +50 Coolness,
- equip Star Extender,
- compare duration,
- collect second Star while active and verify timer restarts.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
