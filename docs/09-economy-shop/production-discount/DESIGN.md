# Production Discount - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Production Discount > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that permanently reduces the price of remaining unowned Shop inventory.

> This page is the canonical design documentation for **Production Discount** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Production Discount is the Shop's economy strategy item.

It asks the player to spend more now to reduce later costs.

This creates an actual decision in a tiny economy.

## Cost

Base price:

```text
6 Rupees
```

## Effect

After ownership, eligible remaining items cost:

```text
75 percent of base cost, rounded down
```

with a minimum of 1 Rupee.

In practical terms, v2.78 calculates:

```text
floor(base * 0.75)
```

## Exclusions

Production Discount does not discount:

- itself,
- Design Mode Unlocked capstone.

The capstone remains exactly 10 Rupees.

This protects the final mastery requirement from being trivialized by the discount.

## Permanent Passive

Once purchased, the Discount is always active.

It does not occupy the gameplay slot.

## Retroactivity

Already purchased items are not refunded.

The effect only changes prices of currently unowned eligible inventory.

## Affordability Relationship

The Rupee HUD affordability cue uses discounted effective prices.

This means buying Production Discount can immediately make another item affordable and trigger the wallet pulse.

## Presentation

Discounted cards should show both values:

```text
BASE -> CURRENT RUPEES
```

so the player understands why the price changed.

## Design Rules

- 25 percent nominal reduction through floor(base * 0.75).
- Minimum price 1.
- No refunds.
- Does not discount itself.
- Does not discount Design Mode capstone.
- Permanent passive.
- Affordability uses discounted price.

## Success Criteria

The player can recognize Production Discount as an investment choice rather than just another small immediate buff.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
