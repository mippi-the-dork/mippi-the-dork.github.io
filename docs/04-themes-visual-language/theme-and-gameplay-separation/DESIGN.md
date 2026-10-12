# Theme and Gameplay Separation - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Theme and Gameplay Separation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Ensures changing visual rarity themes never grants or removes gameplay progression or feature unlocks.

> This page is the canonical design documentation for **Theme and Gameplay Separation** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Rarity theme and gameplay progression are related, but they are not the same state.

Unlocking Epic or Legendary proves progression.

Displaying Epic or Legendary is a visual choice.

The system must preserve that distinction everywhere.

## Why Separation Matters

Without separation, a player could accidentally disable gameplay by choosing a visual preference.

For example:

- switching from Epic back to Rare must not stop airborne interactions,
- switching from Legendary back to Epic must not remove Legendary cursor shooting,
- returning to Rare must not lock Legendary Shop items already earned,
- Finale or postgame progression must not depend on the color theme currently displayed.

That would turn a cosmetic selector into an invisible difficulty/progression switch.

## Progression Authority

Progression should be derived from authoritative state such as:

- original achievement completion,
- `legendaryUnlocked`,
- Shop ownership,
- Wish state,
- Boss state,
- postgame state.

It should not be derived from:

- `theme-complete`,
- `theme-legendary`,
- active theme text,
- palette color.

## Theme Authority

The active theme should answer only:

> How should the site look right now?

It should not answer:

> What has the player earned?

## Examples

### Epic Airspace

Airborne systems unlock because the 10 Rare Signals are complete.

They remain active in Rare presentation.

### Legendary Cursor Shooting

Legendary cursor shooting is available because Legendary progression was unlocked.

It remains available in Rare or Epic presentation.

### Shop

A Legendary item remains Legendary and usable when the active page theme is Rare.

### Music Player

The Music Player unlock belongs to true completion.

Its visual treatment follows the current theme, but its availability does not.

## Design Rules

- Never use current theme class as the sole progression check.
- Never revoke an unlocked mechanic because visual theme changed.
- Visual rarity can communicate progression but cannot be the source of truth.
- Rarity-owned items keep semantic rarity independent of global theme.
- Theme selector must remain safe to use at any progression stage.

## Success Criteria

The player can freely cycle all unlocked themes without changing what the website allows them to do.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
