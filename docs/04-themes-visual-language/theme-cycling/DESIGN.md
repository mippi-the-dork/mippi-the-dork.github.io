# Theme Cycling - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Theme Cycling > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Allows unlocked rarity themes to be changed without altering the player's actual progression state.

> This page is the canonical design documentation for **Theme Cycling** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Theme Cycling gives the player ownership over the portfolio's visual state after rarities are earned.

Unlocking a theme should feel like gaining a permanent presentation option, not being forced to live in the newest palette forever.

## Interaction Model

The theme control displays the current rarity:

- Theme: Rare
- Theme: Epic
- Theme: Legendary

Clicking cycles through currently unlocked modes.

The order is:

```text
Rare -> Epic -> Legendary -> Rare
```

Unavailable modes are skipped.

## Locked-State Communication

Before Epic is unlocked, clicking the control does not fake a theme switch.

Instead, the site explains that more themes can be unlocked through exploration.

After Epic but before Legendary, the tooltip communicates that something rarer still exists.

After Legendary, the control clearly states that all three can be cycled.

## Cosmetic Meaning

The selector changes presentation only.

It does not:

- remove Shop unlocks,
- disable Shooting Stars,
- hide Legendary cursor gameplay,
- reset achievements,
- change Finale eligibility,
- remove postgame state.

This is the most important design contract of the control.

## Persistence

The selected visual preference is remembered.

A returning player who has Legendary unlocked can still return directly in Rare if that is what they last selected.

If stored theme state is no longer valid for the player's unlocked progression, the runtime falls back safely.

## Design Rules

- Current theme must be readable from the control.
- Locked rarities must never be applied through the normal selector.
- Cycling must remain deterministic.
- The control should not feel like a difficulty selector.
- Changing theme should not require reload.
- 3D scenes and theme-aware UI should update immediately.

## Success Criteria

A completionist can use the site in whichever unlocked visual identity they prefer without losing any gameplay functionality.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
