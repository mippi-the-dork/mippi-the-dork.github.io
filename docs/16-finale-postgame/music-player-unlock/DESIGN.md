# Music Player Unlock - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Unlock > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Unlocks the finished 12-song soundtrack player as the persistent reward for the Legendary 100% Complete achievement.

> This page is the canonical design documentation for **Music Player Unlock** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
- [Release History](../../../RELEASE_HISTORY.md)

## Design Intent

The Music Player is the tangible reward for fully beating the website.

It is intentionally not another progression meter.

Once unlocked, it becomes a permanent utility and soundtrack surface.

## Unlock Source

The canonical natural unlock remains:

```text
Legendary achievement:
100% Complete
```

v2.79 and v2.80 do not change that requirement.

The player does not earn Music merely by:

- reaching Legendary,
- reaching the normal Finale,
- revealing postgame,
- completing eight of nine Epic challenges.

## Finished Soundtrack

v2.79 replaced the six placeholder slots with 12 installed authored tracks.

The player now unlocks this complete playlist:

1. Literally Unplayable
2. Just Add Gameplay
3. Great Again
4. Inside My Head
5. I Made This
6. Come Back
7. Stat FPS
8. Every Byte
9. She Was Almost Gold
10. Everybody's Right
11. One Player Too Many
12. L-E-A-R-N

This order is canonical.

## v2.80 Additions

Once unlocked, the same reward now also includes:

- three-mode repeat,
- independent Shuffle,
- a per-track lyrics viewer,
- editable LRC lyric files,
- synchronized line highlighting when timestamps are authored,
- human-readable download filenames.

These additions do not introduce a second unlock gate.

## Persistent Entitlement

After unlock, the player remains available across later visits until the normal full reset.

The repeat and Shuffle preferences also persist independently after v2.80.

## First-Unlock Celebration

The first natural unlock produces:

- Legendary reward toast,
- Console message,
- temporary glow animation,
- immediate header availability.

The v2.80 reward copy correctly describes twelve soundtrack tracks.

## Audio Availability

The shipped v2.80 package contains all 12 MP3 files.

The runtime still preserves graceful unavailable-file handling for robustness, but the normal shipped state is a fully installed soundtrack rather than placeholder/pending content.

## QA Unlock

`dev music` can expose the player directly for QA without falsely adding the natural Legendary capstone progression.

## Design Rules

- Natural unlock belongs only to 100% Complete.
- Twelve soundtrack tracks are part of the reward.
- Track order is fixed unless Shuffle changes playback order.
- Repeat and Shuffle do not require additional progression.
- Lyrics are part of the unlocked player, but actual lyric text is optional authored content.
- Entitlement persists until full reset.
- Unlock never starts audio automatically.

## Success Criteria

True Completion produces a persistent, finished soundtrack reward with playback options and editable lyric support, while preserving the original postgame unlock contract.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
- [Music Lyrics Authoring Guide](../../../MUSIC_LYRICS_AUTHORING_GUIDE.md)
