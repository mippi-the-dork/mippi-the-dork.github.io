# Music Player Expansion - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Expansion > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Lets the unlocked header player collapse to a compact title bar and expand downward without interrupting playback, playlist options, or lyrics state.

> This page is the canonical design documentation for **Music Player Expansion** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)

## Design Intent

The Music Player is persistent, but it should not permanently occupy a large part of the viewport.

Collapse and expansion solve that tension without changing media state.

## Expanded State

The v2.80 expanded player can show:

- current track status,
- current track count,
- transport controls,
- download,
- Loop control,
- Shuffle control,
- 12-track list,
- lyrics panel when opened.

## Collapsed State

The player keeps only its compact header identity:

- 100% COMPLETE // MUSIC PLAYER,
- current track title,
- expand button.

Playback continues.

## Top-Edge Stability

The player remains attached beneath the sticky header.

Expansion grows downward from the same fixed top edge.

That spatial rule existed before v2.79 and remains unchanged.

## Lyrics Relationship

The lyrics panel is part of the expanded content.

Collapsing hides it visually without changing the selected audio track or playback position.

The currently open lyric-view state is runtime-only and does not need to become a persistence setting.

## Playback Continuity

Collapsing must not:

- pause audio,
- reset the selected track,
- rebuild the Shuffle history,
- change Repeat mode,
- rewind,
- clear track availability.

## Button Language

Expanded:

```text
−
Collapse music player
```

Collapsed:

```text
+
Expand music player
```

## Persistence

Collapsed/expanded preference is still not persisted in v2.80.

Reloading an unlocked player starts from the normal expanded initialization state.

## Design Rules

- Expanded state exposes all current Music Player controls.
- Collapsed state keeps track identity visible.
- Top edge remains fixed.
- Playback continues while collapsed.
- Repeat/Shuffle preferences are not altered by collapse.
- Lyrics content is hidden with the expanded body.
- Collapse state itself does not persist.

## Success Criteria

The player can keep audio running while reducing itself to a compact header-attached control, then restore the full 12-track, playback-option, and lyrics interface without loss of media state.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Superseding Implementation Notes (v2.81–v2.89)

v2.81 expanded/collapsed state gained a seek progress bar and retained Play/Pause + Next alongside title when collapsed, not only a +/- header. Lyrics is now a sibling Full/Single companion panel. v2.82 equalized collapsed and expanded desktop width (~326px). v2.83 aligns Play/Next/Expand in one 28px-tall flex row rather than independent offsets, and synchronizes companion panel height with the player's actual height. Collapse temporarily forces Single lyrics, then restores user's Full/Single preference on re-expansion.
