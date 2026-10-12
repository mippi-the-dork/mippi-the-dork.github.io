# Slowpoke - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Slowpoke > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that keeps newly spawned flying objects on screen longer.

> This page is the canonical technical documentation for **Slowpoke** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'slowpoke',
  cost:3,
  slot:'gameplay',
  rarity:'rare',
  tag:'TIMING'
}
```

## Shared Duration Helper

`setFlightDuration(el,seconds)` applies:

```js
seconds *
directorFlightMultiplier() *
(shopHasEquipped('slowpoke') ? 1.35 : 1) *
(slowmoEnabled ? 2 : 1)
```

to CSS custom property:

```text
--dur
```

## Existing Duration Refresh

When Slowmo toggles, existing eligible flying objects with a readable base duration can have their duration property recalculated.

That refresh also incorporates Slowpoke state.

## Distinction from Spawn Delay

Slowpoke does not modify:

- natural pickup scheduler delay,
- Shooting Star scheduler delay,
- Doug Bone scheduler delay.

It changes object lifetime, not opportunity cadence.

## QA

- spawn pickup with no item,
- record approximate duration,
- equip Slowpoke,
- spawn same kind,
- verify about 35 percent increase,
- toggle Slowmo,
- verify combined multiplier,
- compare scheduler cadence and confirm it did not change solely because of Slowpoke.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
