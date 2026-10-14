# Music Player Theme Treatment - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Theme Treatment > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Styles the unlocked 12-track Music Player, playback options, playlist rows, and lyrics viewer to match the selected Rare, Epic, or Legendary site theme without changing music entitlement.

> This page is the canonical technical documentation for **Music Player Theme Treatment** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)

## Base Player

The existing header-specific player treatment remains authoritative.

The v2.80 addition introduces shared Music variables on the header player:

```css
.site-header > .music-player {
  --music-highlight:#67cfff;
  --music-highlight-rgb:47,147,255;
  --music-soft:#9abfdb;
}
```

## Epic Variables

```css
body.theme-complete:not(.theme-legendary)
.site-header > .music-player {
  --music-highlight:#ff68ce;
  --music-highlight-rgb:255,79,200;
  --music-soft:#d9b0e7;
}
```

## Legendary Variables

```css
body.theme-complete.theme-legendary
.site-header > .music-player {
  --music-highlight:#ffd15c;
  --music-highlight-rgb:255,200,61;
  --music-soft:#bbd9c6;
}
```

## Repeat and Shuffle

Playback option buttons use the shared highlight variables for:

- border,
- hover/focus,
- active `aria-pressed=true` state,
- inset accent.

The Repeat button uses `aria-pressed` whenever the current mode is not `off`.

The Shuffle button uses `aria-pressed` for its boolean state.

## Track Rows

Each row contains:

```text
.music-track-select
.music-track-info
```

The selected row gains the active Music highlight.

The lyrics info button is a 23x23 circular target and uses the same theme color for normal, hover, focus, and open state.

## Lyrics Panel

Theme variables apply to:

- panel border,
- header label,
- close button,
- lyric text,
- timestamp text,
- current-line border/background,
- current timestamp emphasis.

The current timed line uses:

```text
.music-lyric-line.current
```

## Mobile and Reduced Motion

At 760 px or below:

```text
music track list -> one column
```

Reduced-motion handling changes only the lyrics viewer presentation:

- smooth lyrics scrolling disabled,
- lyric-line transitions disabled.

Playback and sync timing remain unchanged.

## Dynamic Theme Response

The implementation remains CSS/body-class driven.

Changing site theme does not require reinitializing:

- audio,
- Shuffle,
- Repeat,
- lyrics,
- entitlement.

## QA

- Unlock Music.
- Cycle Rare, Epic, Legendary while paused.
- Repeat while playing.
- Verify option buttons recolor without changing their state.
- Verify active track recolors.
- Open timed lyrics and verify current line/timestamp recolor.
- Verify the player never hides or resets because of theme changes.
- Check keyboard focus for Repeat, Shuffle, track title, lyrics `?`, and close button.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.81 icon controls and companion lyrics adopt the active rarity CSS theme while entitlement is independent. v2.83 lyrics viewer matches Music Player height using `ResizeObserver` / `--music-companion-height`; final lyric text and placeholder styles use ~12px even when current line highlighted. The old in-player lyrics panel/per-track `?` selector descriptions are historical.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).
