# Lucky Charm - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Lucky Charm > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases the relative appearance chance of Hearts, Keys, and Stars.

> This page is the canonical technical documentation for **Lucky Charm** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'lucky-charm',
  name:'Lucky Charm',
  cost:2,
  slot:'gameplay',
  rarity:'rare',
  tag:'DISCOVERY'
}
```

## Pickup Selection

`choosePickupDefinition()` checks:

```js
const lucky =
  shopHasEquipped('lucky-charm');
```

## Non-Key Weighting

Without Lucky Charm:

```js
return nonKeys[
  Math.floor(Math.random()*nonKeys.length)
];
```

With Lucky Charm, a weighted array is built.

Hearts and Stars receive:

```text
3 copies
```

Other non-Key entries receive:

```text
2 copies
```

This changes relative selection probability.

## Key Pity

Normal guaranteed Key threshold:

```text
pickupsSinceKey >= 3
```

Lucky Charm threshold:

```text
pickupsSinceKey >= 2
```

## Key Random Chance

Normal:

```text
0.26
```

Lucky Charm:

```text
0.36
```

## Castle Restriction

If:

```js
castleQuestActive || activeCastle
```

the chooser returns only a non-Key pickup.

Lucky Charm does not override the no-extra-Key rule while a Castle is waiting.

## QA

- equip Lucky Charm,
- force many natural pickup samples,
- compare distribution,
- verify no second natural Key during active Castle,
- unequip and verify normal thresholds restore.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
