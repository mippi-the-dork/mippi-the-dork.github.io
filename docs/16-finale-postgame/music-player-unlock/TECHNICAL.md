# Music Player Unlock - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Unlock > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Unlocks the finished 12-song soundtrack player as the persistent reward for the Legendary 100% Complete achievement.

> This page is the canonical technical documentation for **Music Player Unlock** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
- [Release History](../../RELEASE_HISTORY.md)

## Persistent Key

```text
mippi-music-player-unlocked-v1
```

Loaded at startup into:

```js
let musicPlayerUnlocked=false;
```

## Natural Unlock Path

Music Player entitlement remains coupled to the first unlock of the Legendary postgame capstone:

```text
postgame revealed
+
Finale seen
+
all 9 Epic postgame achievements
=
100% Complete
=
Music Player unlock
```

v2.79 and v2.80 do not alter this progression path.

## Unlock Function

`unlockMusicPlayer()`:

- sets `musicPlayerUnlocked=true`,
- writes `mippi-music-player-unlocked-v1=1`,
- unhides `#music-player`,
- applies first-unlock presentation,
- renders the 12-track list,
- prepares the current track when the audio element has no source.

## First-Unlock Feedback

Current reward copy:

```text
MUSIC PLAYER UNLOCKED
100% complete. Twelve soundtrack tracks are now permanently available until reset.
```

Console:

```text
LEGENDARY REWARD // MUSIC PLAYER UNLOCKED // persists until reset.
```

## Track Registry

The unlocked surface is driven by the 12-entry `MUSIC_TRACKS` array.

No separate playlist manifest was added.

## Startup

`initMusicPlayer()` sets visibility from the entitlement and initializes track 01 when already unlocked.

It does not autoplay.

Repeat and Shuffle preferences are read separately from localStorage before Music Player initialization.

## DEV

```text
dev music
```

calls the unlock helper without natural unlock announcement.

## Recovery Nuance

The Music unlock key remains the direct entitlement authority.

A manually corrupted storage combination where the Legendary capstone is stored but the Music unlock key is absent is not part of the normal player flow and should be treated as corrupted-storage QA.

## QA

- Unlock naturally through 100% Complete.
- Confirm twelve tracks are available.
- Reload and confirm entitlement persists.
- Confirm repeat/shuffle preferences restore independently.
- Confirm no autoplay on startup.
- Run full reset and confirm entitlement and Music preferences clear.
- Force `dev music` and verify it does not fabricate postgame completion.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
- [Music Player Persistence](../music-player-persistence/TECHNICAL.md)
