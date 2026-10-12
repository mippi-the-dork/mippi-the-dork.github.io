# Music Player Persistence - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Persistence > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Persists Music Player entitlement plus Repeat and Shuffle preferences while leaving playback position, random order, and lyric-view state temporary.

> This page is the canonical design documentation for **Music Player Persistence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)

## Design Intent

The final reward should remain unlocked after leaving and returning to the site.

Small playback preferences can also persist when they are predictable user choices.

Transient listening state should not.

## What Persists

v2.80 persists:

### Music entitlement

```text
mippi-music-player-unlocked-v1
```

### Repeat preference

```text
mippi-music-repeat-v1
```

Values:

```text
off
playlist
track
```

### Shuffle preference

```text
mippi-music-shuffle-v1
```

Values:

```text
1
0
```

## What Does Not Persist

The player intentionally rebuilds these on reload:

- selected song,
- playback position,
- playing/paused state,
- Shuffle bag,
- Shuffle navigation history,
- open lyrics song,
- lyric highlight position,
- collapsed/expanded state,
- track availability cache.

Track 01 is selected again at fresh initialization.

## Why Shuffle Order Is Temporary

Shuffle preference means:

> I want random playback.

It does not mean:

> Restore the exact random sequence I happened to receive last time.

Rebuilding the bag/history keeps persistence simple and avoids stale sequence state.

## Reset Boundary

The normal Console `reset` clears all Mippi-owned local/session storage keys.

That includes:

- Music entitlement,
- Repeat preference,
- Shuffle preference.

Reset returns the Music Player to a completely locked first-visit state.

## Theme Independence

Music storage is independent from Rare/Epic/Legendary theme selection.

Changing theme never changes Music entitlement or playback preferences.

## Design Rules

- Persist entitlement.
- Persist Repeat choice.
- Persist Shuffle on/off choice.
- Do not persist exact playback session.
- Do not persist exact randomized order/history.
- Do not persist lyrics-view state.
- Full reset clears all Music persistence.
- Browser storage remains local to the current origin/profile.

## Success Criteria

Returning visitors retain the final reward and their broad playback preferences without the site pretending it can resume an old listening session exactly where they left it.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
