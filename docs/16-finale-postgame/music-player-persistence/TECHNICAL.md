# Music Player Persistence - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Persistence > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Persists Music Player entitlement plus Repeat and Shuffle preferences while leaving playback position, random order, and lyric-view state temporary.

> This page is the canonical technical documentation for **Music Player Persistence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
- [Persistence Key Registry](../../PERSISTENCE_KEY_REGISTRY.md)

## Storage Keys

### Entitlement

```text
mippi-music-player-unlocked-v1
```

### Repeat

```text
mippi-music-repeat-v1
```

Valid values:

```text
off
playlist
track
```

Missing or invalid values default to `off`.

### Shuffle

```text
mippi-music-shuffle-v1
```

Values:

```text
1 = enabled
0 = disabled
```

Only `1` loads as enabled.

## Startup Load

Music entitlement is loaded with other postgame persistence.

Repeat and Shuffle are then read into:

```text
musicRepeatMode
musicShuffleEnabled
```

before Music Player initialization.

## Initialization

`initMusicPlayer()`:

- sets player visibility from entitlement,
- renders all 12 track rows,
- updates Repeat and Shuffle controls,
- rebuilds Shuffle bag/history if Shuffle is enabled,
- selects track 01 when already unlocked,
- does not autoplay.

## Writes

Repeat click writes the current mode directly to `mippi-music-repeat-v1`.

Shuffle click writes:

```text
1
0
```

to `mippi-music-shuffle-v1`, then resets the in-memory Shuffle history/bag.

## Nonpersistent Runtime Fields

Not written to storage:

```text
musicTrackIndex
musicCurrentAvailable
musicPlayWhenReady
musicShuffleBag
musicShuffleHistory
musicShuffleHistoryPosition
musicLyricsIndex
musicLyricsData
musicLyricsRequest
musicActiveLyricLine
collapsed class
audio currentTime
audio paused/playing state
```

## Full Reset

The public reset removes any key whose lowercased name begins with:

```text
mippi
```

All three Music persistence keys therefore clear together.

The subsequent real document reload removes the runtime-only listening state.

## Browser Scope

All Music persistence is browser-origin localStorage.

It is not cloud-synchronized across devices or browser profiles.

## QA

- Unlock Music and set LOOP ALL + Shuffle On.
- Reload and verify entitlement plus both preferences restore.
- Navigate a shuffled sequence, reload, and verify the exact sequence/history does not restore.
- Open lyrics, reload, and verify the lyric panel does not reopen automatically.
- Change selected track/playback time, reload, and verify track 01 paused.
- Run full reset and verify all three Music keys are gone.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
