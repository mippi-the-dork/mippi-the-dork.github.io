# Shop - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the persistent upgrade store, inventory rules, wallet display, ownership state, and item purchase interactions.

> This page is the canonical design documentation for **Shop** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Shop turns Rupees into long-term system choices.

It is intentionally small enough to read in one session but broad enough to touch many parts of the site.

The inventory contains:

- gameplay modifiers,
- permanent passive unlocks,
- progression-gated Epic gear,
- Legendary gear,
- a final Design Mode capstone.

## Merchant Tone

The Shopkeeper copy treats the existence of the store as an escalating design mistake.

The humor changes based on state:

- no money,
- almost enough money,
- wealthy wallet,
- Production Discount active,
- current inventory cleared,
- everything purchased.

This gives the Shop personality without requiring a character portrait.

## Inventory Structure

The Shop is grouped into three rarity sections:

### Rare

Field Gear.

### Epic

System Gear.

### Legendary

Masterworks.

Locked progression items remain visible as mystery cards so the player understands that more inventory exists without seeing exact details too early.

## Gameplay Slot

Gameplay items share one equip slot.

Only one can be active at a time.

Current gameplay items:

- Lucky Charm,
- Dog Whistle,
- Star Extender,
- Slowpoke,
- Golden Trigger.

This creates actual choice.

## Passive Items

Passive items are permanently active once purchased.

They do not consume the gameplay slot.

Current passives:

- Interact Toggle,
- Mippi Bird Extra Life,
- Production Discount,
- Celestial Beacon,
- Design Mode Unlocked.

## Ownership

Purchases are permanent until full reset.

Gameplay items can be swapped freely after purchase.

There is no resale.

## Locked Inventory

Some items are progression-gated.

Locked cards deliberately hide the item name with:

```text
???
```

while still showing the rarity tier and a broad lock reason.

## Design Rules

- One gameplay item equipped at a time.
- Passives activate permanently on purchase.
- Owned gameplay items can be re-equipped for free.
- Locked items cannot be purchased.
- Insufficient funds produce explicit feedback.
- Prices update immediately after Production Discount purchase.
- Shop rarity remains semantic.
- Shop does not auto-open when the player can afford something.
- Full ownership supports postgame Buy the Store.

## Success Criteria

The Shop creates meaningful small decisions without becoming complicated enough to distract from the portfolio.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## v3.14 Current Behavior

v3.13 Shop holds **11 listed items**: ten permanent purchases plus repeatable Epic Mippi Bird Life Refill. Refill adds one banked Bird life for base 10 Rupees (7 with Production Discount), remains available after purchase, and does not count for Buy the Store or capstone eligibility. Design Mode base cost is 30 Rupees; other permanent prices were revised with the increased Rupee supply.
