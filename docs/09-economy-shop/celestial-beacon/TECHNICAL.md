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
