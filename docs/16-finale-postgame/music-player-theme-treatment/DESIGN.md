# Music Player Theme Treatment - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Theme Treatment > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Styles the unlocked 12-track Music Player, playback options, playlist rows, and lyrics viewer to match the selected Rare, Epic, or Legendary site theme without changing music entitlement.

> This page is the canonical design documentation for **Music Player Theme Treatment** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)

## Design Intent

The Music Player is a permanent postgame utility.

It should feel integrated with whichever rarity presentation the visitor chooses.

The same unlocked player therefore adapts to:

### Rare

Blue/cyan.

### Epic

Violet/hot pink/cyan.

### Legendary

Gold/amber/teal.

## Theme Is Presentation

Music entitlement remains independent from active theme.

A player can:

- earn 100 percent,
- unlock Music,
- switch to Rare,
- keep the Music Player,
- keep all 12 tracks,
- keep Repeat and Shuffle,
- keep the lyrics viewer.

## v2.80 Shared Theme Surfaces

The v2.80 additions use the same theme-aware Music variables as the rest of the player.

Theme treatment now covers:

- Repeat button,
- Shuffle button,
- active playback-option state,
- track select rows,
- 23x23 circled lyrics `?`,
- lyrics panel border,
- lyrics header,
- lyric timestamps,
- current-line highlight.

The feature does not create separate theme-specific functionality.

## Active Track and Active Lyric

The selected track uses stronger border/background emphasis.

The currently synchronized lyric line uses the active Music highlight color and stronger weight.

These are two different states:

- selected track,
- current timed lyric.

## Accessibility

Hover and focus states remain visible in every rarity.

Repeat and Shuffle also expose state through text and ARIA, so color is not the only signal.

## Design Rules

- Rare uses blue/cyan.
- Epic uses violet/pink/cyan.
- Legendary uses gold/teal.
- Entitlement never depends on active theme.
- Repeat, Shuffle, playlist controls, and lyrics share the current Music palette.
- Selected track remains clearly readable.
- Current lyric remains clearly distinguishable.
- Focus and active state must remain understandable without relying on color alone.

## Success Criteria

The expanded v2.80 Music Player feels native to all three rarity themes while preserving one consistent feature set and one persistent reward.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
