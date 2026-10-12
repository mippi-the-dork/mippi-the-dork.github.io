# Shop Rarity Presentation - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Rarity Presentation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps Rare, Epic, and Legendary Shop cards tied to their item rarity instead of inheriting the active site theme.

> This page is the canonical design documentation for **Shop Rarity Presentation** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Shop rarity communicates item identity.

The global page theme communicates world state.

Those are different concepts.

A Rare Shop item must remain visibly Rare even if the player is currently using Legendary page presentation.

## Rarity Palette

### Rare

- blue,
- cyan,
- cool white.

### Epic

- violet,
- hot pink,
- cyan.

### Legendary

- orange/gold,
- teal,
- pale gold.

## Container vs Item

The overall Shop modal can follow the active global theme.

Each rarity section and card uses local rarity variables.

This allows the Shop to feel part of the current world while preserving inventory semantics.

## Why This Matters

Without isolation:

- a Rare item would turn gold under Legendary,
- item rarity would become ambiguous,
- Shop browsing would no longer communicate tier structure.

## Text Labels

Rarity is not communicated by color alone.

Each card explicitly displays:

- RARE,
- EPIC,
- LEGENDARY.

Each section also has its own tier header.

## Owned and Equipped States

Owned and equipped states should still preserve rarity identity.

Equipped state adds stronger local secondary accents rather than replacing the item's palette with generic success green.

## Locked State

Locked cards can use more neutral/muted styling because their identity is intentionally hidden.

The rarity section still communicates the broad tier.

## Design Rules

- Item rarity beats world theme inside card.
- Rarity text is always visible.
- Hover uses local rarity.
- Focus uses local rarity.
- Owned/equipped use local rarity.
- Global theme can style surrounding Shop chrome.
- Legendary cards use teal as cool complement.

## Success Criteria

The Shop remains semantically readable in any global theme.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
