# Shop Affordability Cue - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Affordability Cue > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Rupee HUD pulse when at least one currently available unowned item can be afforded.

> This page is the canonical design documentation for **Shop Affordability Cue** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Currency is only useful when the player knows it can be spent.

The affordability cue closes that loop.

It should activate only when opening the Shop can immediately result in a purchase.

## Exact Meaning

The cue means:

> You can afford at least one Shop item that is currently available and not already owned.

It does not mean:

- the Shop has items,
- the wallet is nonzero,
- a locked item would be affordable if unlocked,
- the player can afford an already-owned item.

## Production Discount

The cue uses effective discounted prices.

This is important.

After Production Discount, the wallet can become actionable at a lower threshold than the item's displayed base cost.

The HUD must pulse based on what the player would actually pay.

## Shop-Open Suppression

The cue stops while the Shop is open.

Once the Shop closes, it is recalculated.

## Information

The tooltip communicates:

- number of affordable items,
- cheapest current price.

The accessible label communicates affordable item count.

## Theme Presentation

Rare uses blue/cyan.

Epic uses pink/violet/cyan.

Legendary uses gold/teal.

The semantic condition is identical across themes.

## Design Rules

- Use effective price.
- Ignore locked items.
- Ignore owned items.
- Stop while Shop open.
- Restart after close if still actionable.
- Pair animation with readable text/ARIA.
- Never pulse when the player cannot actually buy something.

## Success Criteria

The player's attention is drawn to the Shop only when there is a meaningful purchase decision available.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
