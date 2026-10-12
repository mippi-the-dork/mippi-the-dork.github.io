# Design Mode Unlocked - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Design Mode Unlocked > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** The Legendary Shop capstone appears after Shop mastery and permanently unlocks Design Mode.

> This page is the canonical design documentation for **Design Mode Unlocked** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Design Mode Unlocked is the final Shop reward.

Unlike the other items, it does not mainly make the game layer easier or stronger.

It reveals a deeper commentary layer about why the portfolio itself was designed the way it was.

That makes it an appropriate capstone for buying the entire inventory.

## Reveal Requirement

The item stays hidden behind Shop mastery until:

- Legendary progression is unlocked,
- every other Shop item is owned.

Only then is the identity revealed.

This creates a meaningful final Shop moment.

## Cost

```text
10 Rupees
```

Production Discount does not reduce this price.

The player must bring the full amount.

## Permanent Entitlement

Once purchased:

- Design Mode becomes permanently available,
- the bottom-right Design control appears,
- the `design` Console command appears in Help,
- the player can toggle the commentary layer.

The item itself is passive.

## Why It Is Last

Design Mode is meta-commentary.

Revealing it early would expose too much of the site's construction before the player had explored the systems normally.

Locking it behind Shop mastery makes it a reward for someone who has already demonstrated broad curiosity.

## Postgame Relationship

Buying this item is required to fully own the Shop.

That contributes to:

`Buy the Store`.

The entitlement itself is also useful after 100 percent completion because the player can continue exploring the site's design commentary.

## Design Rules

- Requires Legendary.
- Requires ownership of every other Shop item.
- Costs exactly 10.
- Not discounted.
- Permanently unlocks Design Mode.
- Does not automatically force Design Mode on.
- Full reset removes entitlement.
- Help updates after entitlement.

## Success Criteria

The final Shop purchase feels like opening the site's commentary track rather than simply buying another numerical upgrade.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
