# Rarity-Isolated Components - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Rarity-Isolated Components > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps rarity-owned elements such as achievement rows and Shop cards visually tied to their own rarity regardless of the active global theme.

> This page is the canonical design documentation for **Rarity-Isolated Components** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Some components express the rarity of an object, not the rarity of the world.

Those components must not inherit the page theme in a way that changes their meaning.

This is the difference between:

- world theme,
- item rarity.

A Rare achievement is still Rare while the page is Legendary.

A Legendary Shop item is still Legendary while the page is Rare.

## Why Isolation Matters

If every component simply inherited the active theme:

- Rare achievements would turn gold in Legendary,
- Epic Shop items would look Rare when the page was Rare,
- the player could no longer visually distinguish rarity tiers,
- rarity would become cosmetic rather than semantic.

The system therefore isolates rarity-owned components from global theme recoloring.

## Current Isolated Families

### Achievement Ledger Entries

The Ledger frame follows the active page theme.

Individual achievement rows use their own rarity.

Original 10:

```text
Rare
```

Post-Finale set:

```text
Epic
```

100 Percent Complete:

```text
Legendary
```

Each row explicitly displays its rarity text.

### Shop Rarity Sections

The Shop frame can follow the active world theme.

Each rarity section uses its own local variables.

Rare remains blue.

Epic remains violet/pink/cyan.

Legendary remains gold/teal.

### Achievement Toasts

Unlock toasts can also apply a rarity class so the newly earned achievement is presented according to its semantic rarity.

## Visual Accessibility

Rarity isolation is not color-only.

Achievement rows include visible text such as:

- RARE
- EPIC
- LEGENDARY

This protects meaning for visitors who cannot reliably distinguish the palette.

## Design Rules

- Global theme may style the container.
- Semantic rarity styles the item.
- Item rarity should be visible in text when practical.
- Rarity should remain stable after unlock.
- Global theme selectors should not override rarity-isolated item rules.
- New systems with item rarities should adopt the same separation.

## Success Criteria

A screenshot of the Achievement Ledger or Shop should still communicate the rarity of every item even if the active page theme is unknown.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
