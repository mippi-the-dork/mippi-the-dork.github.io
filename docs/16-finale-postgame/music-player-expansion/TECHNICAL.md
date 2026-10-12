# Music Player Expansion - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Expansion > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Lets the unlocked header player collapse to a compact title bar and expand downward without interrupting playback, playlist options, or lyrics state.

> This page is the canonical technical documentation for **Music Player Expansion** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)

## State Representation

Collapse state remains the `collapsed` class on:

```text
#music-player
```

There is no dedicated persistence key.

## Toggle

The `#music-collapse` listener toggles `collapsed`, swaps `+` / `−`, and updates the ARIA label.

## Hidden Expanded Content

The pre-v2.80 expanded groups remain hidden while collapsed:

- `.music-now`,
- `.music-controls`,
- `.music-track-list`.

v2.80 additionally hides:

```css
.music-player.collapsed .music-play-options,
.music-player.collapsed .music-lyrics-panel {
  display:none;
}
```

This keeps Repeat, Shuffle, and lyrics within the expandable player body.

## Audio Continuity

Collapse does not call:

```text
pause()
load()
selectMusicTrack()
musicSwitchTrack()
resetMusicShuffleHistory()
```

Therefore it does not change:

- selected track,
- audio source,
- currentTime,
- paused/playing state,
- Repeat preference,
- Shuffle preference,
- Shuffle history.

## Width and Header Relationship

Desktop collapsed width remains the compact header-specific width.

Expanded width remains the larger header-attached player width.

At 760 px or below both use the available width between 12 px side margins.

## Persistence

No storage key exists for collapsed state.

Repeat and Shuffle have their own independent localStorage keys and are not part of collapse behavior.

## QA

- Start a track and collapse.
- Confirm audio continues.
- Turn Shuffle on, navigate several tracks, collapse/expand, and confirm history remains usable.
- Set LOOP 1, collapse/expand, and confirm mode remains.
- Open lyrics, collapse, expand, and confirm playback is unchanged.
- Reload and verify collapse itself returns to default initialization.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
