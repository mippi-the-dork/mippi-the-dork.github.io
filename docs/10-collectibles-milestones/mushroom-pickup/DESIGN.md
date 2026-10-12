# Mushroom Pickup - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Mushroom Pickup > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Advances cursor power and Mippi Bird extra-life progression through the Mushroom collectible.

> This page is the canonical design documentation for **Mushroom Pickup** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Mushroom has two parallel progression roles.

It creates an immediate silly cursor power cycle and also contributes to a longer-term Mippi Bird Extra Life bank.

This makes each pickup useful even after the cursor-size joke has already been seen.

## Cursor Power Cycle

Mushroom cursor state cycles through three levels:

```text
Normal
Big
Very Big
Normal
```

Each Mushroom advances one step.

The cursor-size power itself is not long-term progression.

It is a playful runtime state.

## Legendary Combination

When Legendary presentation is active and cursor power is above zero, a larger cursor also increases Legendary target acquisition.

The site announces:

`Mushroom + Legendary`

as a system combo.

This is one example of cross-system interaction rather than a wholly separate mechanic.

## Mippi Bird Life Progress

Every Mushroom also advances:

```text
SHROOMS N / 20
```

After 20 Mushrooms:

- progress rolls over by 20,
- one banked Mippi Bird Extra Life is added.

This longer progression is persistent.

## Why 20

Twenty makes Mushrooms a recurring long-term collectible without making a single Extra Life trivial.

The Shop's Mippi Bird Extra Life remains a separate once-per-round shield.

Mushroom lives are consumable banked lives.

## Extra Life Priority

During Mippi Bird collision:

1. Shop shield is spent first,
2. Mushroom bank is spent second.

This protects earned Mushroom lives when the player already bought the permanent Shop utility.

## Persistence Split

Persistent:

- Mushroom progress toward 20,
- banked Mippi Bird lives.

Not persistent:

- current cursor size level.

This is intentional.

The long-term reward survives reload.

The silly cursor power resets with the runtime.

## Design Rules

- Every Mushroom advances both systems.
- Cursor power wraps after Very Big.
- Persistent progress converts every 20 Mushrooms.
- Banked lives are consumable.
- Shop shield is consumed before Mushroom lives.
- Cursor power is not a save-state requirement.
- Mushroom + Legendary combo remains optional.

## Success Criteria

A Mushroom is funny immediately and still meaningful on the twentieth collection.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
