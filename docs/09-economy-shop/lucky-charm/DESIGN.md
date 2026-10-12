# Lucky Charm - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Lucky Charm > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Rare gameplay item that increases the relative appearance chance of Hearts, Keys, and Stars.

> This page is the canonical design documentation for **Lucky Charm** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Lucky Charm is the discovery-focused gameplay modifier.

It helps players who care more about collectible progression than raw currency or timing.

The effect should improve uncommon opportunity frequency without turning those objects into guaranteed spam.

## Effect

When equipped:

- Hearts become relatively more likely,
- Stars become relatively more likely,
- Keys receive a stronger pity schedule and higher direct chance.

The item does not increase:

- pickup lifetime,
- Rupee value,
- Star Power duration.

It changes selection weighting.

## Tradeoff

Because the non-Key pickup pool is reweighted, choosing Lucky Charm can reduce the relative frequency of other pickup types such as Rupees and Mushrooms.

This is desirable.

A gameplay slot choice should have character rather than being a universal buff.

## Slot

Lucky Charm is a gameplay item.

It competes with:

- Dog Whistle,
- Star Extender,
- Slowpoke,
- Golden Trigger.

## Cost

```text
2 Rupees
```

This makes it one of the cheapest early experiments.

## Design Rules

- Effect only while equipped.
- Improve odds, do not guarantee.
- Keys still obey Castle-state restrictions.
- Item remains useful after purchase without permanent activation.
- Swapping away restores normal weighting.

## Success Criteria

Players who want collectible progress can choose Lucky Charm and feel a noticeable but not deterministic improvement.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
