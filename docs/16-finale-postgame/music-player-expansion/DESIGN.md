# Music Player Expansion - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Expansion > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the unlocked header player collapse to a compact title bar and expand downward without stopping or resetting playback.

> This page is the canonical design documentation for **Music Player Expansion** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player is persistent, but it should not permanently occupy a large piece of the viewport.

Collapse/expand solves that tension.

### Expanded

The player shows:

- current track status,
- track count,
- transport controls,
- download,
- six-track list.

### Collapsed

The player shows only the header:

- 100 percent complete label,
- current track title,
- expand button.

This preserves access while minimizing visual footprint.

## Top-Edge Stability

The most important expansion rule is:

> the top edge does not move.

The player is attached under the header.

Collapse and expansion change what exists below the header row.

This keeps the player's spatial relationship with the navigation stable.

## Playback Continuity

Collapsing is visual only.

It must not:

- pause audio,
- reset selected track,
- rewind,
- clear availability state.

A player should be able to start a song, collapse the interface, and continue browsing.

## Button Language

Expanded button:

```text
−
```

Accessible label:

```text
Collapse music player
```

Collapsed button:

```text
+
```

Accessible label:

```text
Expand music player
```

The symbol changes but accessibility text remains explicit.

## Collapse Persistence

v2.78 does not persist collapsed/expanded preference.

Reloading an unlocked player starts expanded.

This is acceptable because collapse is a temporary layout preference, not progression.

## Design Rules

- Expanded state shows all controls.
- Collapsed state keeps track title visible.
- Top edge remains fixed.
- Playback continues while collapsed.
- Selected track remains unchanged.
- Do not persist collapse state in v2.78.
- Accessible label must match current action.

## Success Criteria

The player can leave music running while reducing the interface to a compact header-attached control.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
