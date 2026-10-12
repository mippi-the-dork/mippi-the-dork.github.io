# Star Extender - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Star Extender > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases Star Power duration.

> This page is the canonical technical documentation for **Star Extender** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'star-extender',
  cost:3,
  slot:'gameplay',
  rarity:'rare',
  tag:'POWER-UP'
}
```

## Star Power Duration

The activation code uses:

```js
const starPowerDuration =
  shopHasEquipped('star-extender')
    ? 5600
    : 3600;
```

Values are milliseconds.

## Scope

The item changes the lifetime of the Star Power state.

It does not modify the flying Star pickup duration.

That is controlled by the shared flying-object timing system and Slowpoke.

## Equipment Query

Effect uses:

```js
shopHasEquipped('star-extender')
```

so ownership alone is not enough.

## QA

- spawn Star without item,
- time active state,
- equip Star Extender,
- spawn another,
- compare roughly 3.6 vs 5.6 seconds,
- own but unequip item,
- verify normal duration.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
