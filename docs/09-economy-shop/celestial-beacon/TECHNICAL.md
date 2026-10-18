# Celestial Beacon - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Celestial Beacon > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that increases Shooting Star frequency and catchable duration after Epic unlock.

> This page is the canonical technical documentation for **Celestial Beacon** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'celestial-beacon',
  cost:7,
  slot:'passive',
  rarity:'epic',
  tag:'CELESTIAL',
  requires:'epic'
}
```

## Spawn Lifetime

`spawnShootingStar()` chooses base duration:

Without Beacon:

```text
2.05 + random 0 to 1.15 seconds
```

With Beacon:

```text
3.4 + random 0 to 1.55 seconds
```

Then `setFlightDuration()` applies shared multipliers such as Slowpoke and Slowmo.

## Natural Delay

`nextNaturalShootingStarDelay()`:

### Easy Mode

```text
9 to 16 seconds
```

### Normal with Beacon

Director-adjusted:

```text
18 to 38 seconds
```

### Normal without Beacon

Director-adjusted:

```text
28 to 62 seconds
```

## Ownership Query

Beacon uses:

```js
shopOwns('celestial-beacon')
```

rather than equipped state because it is passive.

## Charge Gate

Even with Beacon, natural stars remain suppressed while:

```js
hasWishCharge()
```

is true.

The item does not allow stockpiling beyond one charge.

## QA

- reach Epic,
- observe normal Shooting Star timing,
- buy Beacon,
- compare natural delay,
- compare on-screen duration,
- fill charge,
- verify natural stars stop,
- spend charge,
- verify faster schedule resumes.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current implementation correction (v3.25.2)

**Current implementation (v3.25.2).** The item metadata uses `slot:'gameplay'`; both `nextNaturalShootingStarDelay()` and `spawnShootingStar()` check `shopHasEquipped('celestial-beacon')`, not `shopOwns`. The equipped state triggers shorter natural-delay intervals (18–38 seconds rather than 28–62 seconds, before director modification) and longer Star flight times. Toggling this item reschedules the natural star timer. Old owned-passive saves migrate with Beacon equipped to preserve the former upgrade effect.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.
