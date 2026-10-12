# Golden Trigger - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Golden Trigger > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Legendary gameplay item that improves Legendary cursor targeting range and projectile speed.

> This page is the canonical technical documentation for **Golden Trigger** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'golden-trigger',
  cost:5,
  slot:'gameplay',
  rarity:'legendary',
  tag:'WEAPON',
  requires:'legendary'
}
```

## Target Acquisition

`nearestFlyingTarget()` calculates base range:

Without Golden Trigger:

```text
365 px
```

With Golden Trigger:

```text
485 px
```

Then adds:

```js
cursorPowerLevel*55
```

and Director target bonus.

## Projectile Speed

`fireLegendaryPlayerShot()` uses:

Without Golden Trigger:

```text
1050 px/s
```

With Golden Trigger:

```text
1380 px/s
```

approximately, based on frame delta.

## Progression Gate

Pointer firing itself checks:

```js
legendaryGameplayUnlocked()
```

not the active page theme.

Golden Trigger merely modifies the already-unlocked system.

## Equipment Gate

Both range and speed use:

```js
shopHasEquipped('golden-trigger')
```

Ownership without equip has no effect.

## Target Types

The targeting query includes:

```text
.shooting-star
.galaga-secret
.game-pickup
.doug-bone
```

## QA

- unlock Legendary without Golden Trigger,
- measure approximate acquisition distance,
- equip Golden Trigger,
- test farther target,
- compare projectile travel time,
- switch to Rare visual theme,
- confirm effect remains,
- unequip, verify base values restore.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
