# Shop Purchase and Equip Flow - Design Documentation

## Current implementation correction (v3.25.2)

**Current design (v3.25.2).** Equipment has unlimited simultaneous capacity. Buying an equippable item auto-equips that item without switching off other owned modifiers. Each purchased gameplay card offers EQUIP or UNEQUIP; UNEQUIP ALL disables the active set without forfeiting ownership. Owned passives remain active without equipment slots; Bird refill is a repeatable consumable. Original single-item behavior is a historical rule, not the current design.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Purchase and Equip Flow > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Handles buying items, equipping gameplay modifiers, unequipping them, and persisting ownership.

> This page is the canonical design documentation for **Shop Purchase and Equip Flow** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Buying should be immediate.

Equipment should be flexible.

The Shop separates permanent ownership from currently active gameplay loadout.

## Purchase Flow

For a normal unlocked item:

1. player sees effective price,
2. presses Buy,
3. wallet is checked,
4. price is deducted,
5. ownership is persisted,
6. item activates according to slot type,
7. HUD and Shop refresh,
8. feedback confirms purchase.

## Gameplay Items

Gameplay items automatically equip on first purchase.

Only one gameplay item can be active.

Once owned, they can be swapped freely.

Current gameplay slot items:

- Lucky Charm,
- Dog Whistle,
- Star Extender,
- Slowpoke,
- Golden Trigger.

The Shop uses:

`ONE GAMEPLAY MODIFIER`

as the conceptual rule.

## Passive Items

Passives activate permanently when purchased.

They do not occupy the gameplay slot.

They cannot be manually unequipped through the Shop.

## Unequip

The currently equipped gameplay modifier can be cleared through a dedicated Unequip action.

The Console describes this as:

`Raw portfolio difficulty restored.`

## Insufficient Funds

A failed purchase:

- keeps wallet unchanged,
- prints explicit cost/wallet information,
- briefly shakes/highlights the card.

This avoids ambiguous button failure.

## Persistence

Ownership and equipped item survive reloads.

The equipment body data attribute is reconstructed from persisted state.

## Design Rules

- Purchase is immediate.
- No negative wallet.
- First purchase auto-equips gameplay item.
- Passive items activate immediately.
- Owned gameplay swaps are free.
- Unequip is always free.
- One gameplay item at a time.
- Locked item cannot be bought.
- Ownership is persistent until reset.

## Success Criteria

The player can understand purchase, ownership, and equipment state without reading a separate inventory tutorial.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
