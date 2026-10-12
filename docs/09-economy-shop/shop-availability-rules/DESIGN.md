# Shop Availability Rules - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Availability Rules > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Gates selected inventory behind Epic, Legendary, or Shop mastery progression rather than exposing every item immediately.

> This page is the canonical design documentation for **Shop Availability Rules** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Shop should evolve with the game.

If every item were fully readable on first discovery:

- Epic progression would lose surprise,
- Legendary would feel less special,
- Design Mode capstone would be spoiled immediately.

Availability rules let the Shop foreshadow future content without revealing it.

## Availability Types

### Always Available

Most early items can be seen and purchased as soon as the Shop is opened.

### Epic-Gated

Selected items require all 10 original Rare Signals.

Current Epic-gated items:

- Interact Toggle,
- Celestial Beacon.

### Legendary-Gated

Golden Trigger requires Legendary progression.

### Shop Mastery

Design Mode Unlocked requires:

- Legendary progression,
- ownership of every other Shop item.

## Locked Presentation

Locked cards show:

```text
???
```

instead of item name.

They display broad lock tags such as:

- EPIC // LOCKED
- LEGENDARY // LOCKED
- CAPSTONE // LOCKED

The description explains the progression requirement.

This gives the player a clear goal without spoiling the item identity.

## Why Some Epic Items Are Not Epic-Gated

Mippi Bird Extra Life and Production Discount are Epic-rarity items but have no explicit progression requirement in v2.78.

Their rarity is semantic presentation, while availability is a separate data property.

This distinction is intentional in the current implementation.

Rarity and gating are not automatically equivalent.

## Capstone Philosophy

Design Mode stays hidden by mastery because it is not merely another utility upgrade.

It is the final Shop completion reward and a deeper portfolio-commentary layer.

## Design Rules

- Rarity does not automatically mean locked.
- Requirement is data-driven.
- Locked cards remain visible as mystery.
- Shop Mastery excludes the capstone itself from the ownership check.
- Visual theme does not satisfy progression requirements.
- Availability uses authoritative progression state.

## Success Criteria

The Shop gains new meaning as progression advances without needing separate store screens.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
