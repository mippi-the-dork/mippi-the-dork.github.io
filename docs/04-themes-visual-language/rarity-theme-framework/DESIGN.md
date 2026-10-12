# Rarity Theme Framework - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Rarity Theme Framework > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the three-tier visual rarity system and the shared rules for switching and persisting the active site theme.

> This page is the canonical design documentation for **Rarity Theme Framework** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The rarity framework gives the portfolio a progression language that can be understood visually before the player understands every underlying system.

The three visual tiers are:

1. Rare
2. Epic
3. Legendary

They are not difficulty modes.

They are not alternate save files.

They are not mutually exclusive progression branches.

They are presentation identities that become available as the player reaches meaningful progression milestones.

## Core Principle

Unlocking a rarity is permanent progression.

Selecting a rarity is cosmetic preference.

This distinction is critical.

A player can unlock Legendary, switch the page back to Rare because they prefer the blue palette, and still retain all Legendary gameplay capabilities.

The theme selector never removes progression.

## Rarity Meaning

### Rare

Rare is the starting world state.

It communicates:

- Unreal blue,
- cyan,
- cool graphite,
- technical white,
- restrained glow.

Rare is intentionally polished enough to feel complete.

It should not read as "unfinished" simply because higher rarities exist.

### Epic

Epic is the first major transformation.

It communicates:

- violet,
- hot pink,
- cyan,
- dark plum,
- stronger energy and motion.

Epic represents a completed first discovery layer.

The site should feel like it has entered overdrive.

### Legendary

Legendary is the rarest visual identity.

It communicates:

- gold,
- amber,
- orange,
- teal,
- warm graphite.

Legendary is not just a hue shift.

It should feel materially richer and more prestigious while staying consistent with the same site structure.

## World-State Philosophy

A rarity theme should feel like a complete world state.

The theme should affect:

- header,
- Hero,
- 3D scenes,
- cards,
- buttons,
- links,
- HUD,
- Dev Console,
- overlays,
- pickups,
- Shop chrome,
- Doug presentation,
- achievement presentation,
- visual effects.

A theme is considered incomplete if old colors leak through in ways that look accidental.

## Semantic Exceptions

Not every color should be overwritten by rarity.

Semantic exceptions are allowed when readability or reference identity is stronger than palette purity.

Examples include:

- HAL stays red.
- money-wish coins stay gold because they are coins.
- hostile projectiles can remain white/cyan for combat readability.
- Blueprint node headers preserve Unreal-like node semantics.
- warning and success states may retain semantic temperature.

The surrounding UI should still respect the active rarity.

## Unlock Philosophy

Rare is available immediately.

Epic unlocks after all 10 original Rare Signals are complete.

Legendary unlocks after the validated Wish progression.

The theme framework therefore visually reflects progression milestones the player already understands.

## Theme Selector Philosophy

The theme control is a preference switcher for unlocked visual identities.

It should communicate:

- current active theme,
- which themes are available,
- that more rarities may still be hidden.

The control should never imply that switching back to Rare resets or disables Epic/Legendary systems.

## Design Rules

- Every rarity should remain readable on its own.
- Theme changes must not change information hierarchy.
- Theme changes must not rewrite professional content.
- Gameplay unlocks must not depend on currently displayed theme.
- Rarity-owned components must keep their own rarity colors.
- New fixed UI surfaces should be audited in all three themes.
- Hover, focus, active, warning, success, disabled, locked, and modal states should all be themed intentionally.
- Semantic exceptions should be deliberate and documented.

## Success Criteria

The framework succeeds when:

- a player can recognize each rarity instantly,
- switching theme changes presentation without changing progression,
- Rare still feels professionally finished,
- Epic feels like a meaningful upgrade,
- Legendary feels prestigious and distinct,
- rarity-owned components remain semantically stable regardless of active theme.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
