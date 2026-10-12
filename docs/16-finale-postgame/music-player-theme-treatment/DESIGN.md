# Music Player Theme Treatment - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Theme Treatment > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Styles the unlocked Music Player to match the currently selected Rare, Epic, or Legendary site theme without changing music entitlement.

> This page is the canonical design documentation for **Music Player Theme Treatment** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player is a permanent postgame utility.

It should feel integrated with whichever world presentation the player chooses.

The same unlocked player therefore has three visual treatments.

### Rare

Blue/cyan technical panel.

### Epic

Violet/hot pink/cyan.

### Legendary

Gold/amber/teal.

## Theme Is Presentation

Music entitlement is independent from active theme.

A player can:

- earn 100 percent,
- unlock Music,
- switch back to Rare,
- keep the Music Player.

The player should not disappear because the site is no longer visually Legendary.

This follows the broader progression/theme separation rule.

## Shared Structure

All themes retain the same:

- title,
- controls,
- track list,
- status line,
- collapse behavior,
- download behavior.

Only palette changes.

This avoids creating theme-specific functionality.

## Active Track

The selected track receives a stronger local border/background treatment matching the current world rarity.

Track numbering uses the cool secondary color of the theme.

## Hover and Focus

Transport and download controls adapt their border and text colors by theme.

Focus remains obvious in every palette.

## Legendary Identity

Although the Music Player is a Legendary reward, its appearance is not permanently gold.

This is intentional.

Reward rarity explains how it was earned.

Current world theme explains how the interface is being presented now.

## Design Rules

- Rare uses blue/cyan.
- Epic uses violet/pink/cyan.
- Legendary uses gold/teal.
- Entitlement does not depend on theme.
- Track list structure never changes by theme.
- Active track remains clearly selected.
- Focus and hover remain readable.
- Missing-file state should remain visible in every theme.

## Success Criteria

The Music Player looks native to every active theme while remaining the same persistent postgame reward.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
