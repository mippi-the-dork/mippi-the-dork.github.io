# Music Playback - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Playback > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Provides the finished 12-song soundtrack with direct selection, play/pause, previous/next, repeat, shuffle, and editable LRC lyrics.

> This page is the canonical design documentation for **Music Playback** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
- [Music Lyrics Authoring Guide](../../../MUSIC_LYRICS_AUTHORING_GUIDE.md)
- [Release History](../../../RELEASE_HISTORY.md)

## Design Intent

The Music Player is the reward for fully beating the website.

Its v2.80 role is to provide a complete soundtrack experience without turning into a full media application.

## Canonical 12-Track Order

| # | Track |
| ---: | --- |
| 01 | Literally Unplayable |
| 02 | Just Add Gameplay |
| 03 | Great Again |
| 04 | Inside My Head |
| 05 | I Made This |
| 06 | Come Back |
| 07 | Stat FPS |
| 08 | Every Byte |
| 09 | She Was Almost Gold |
| 10 | Everybody's Right |
| 11 | One Player Too Many |
| 12 | L-E-A-R-N |

All 12 MP3s ship with v2.80.

## Track Selection

Clicking a song title/row selects that song.

It does not automatically play if the player was paused.

Each playlist row also has an independent circled `?` control for lyrics.

Clicking `?` does not select or start that track.

## Play and Pause

Play and Pause use the native HTML audio element.

Browser autoplay restrictions are handled gracefully rather than bypassed.

## Deferred Autoplay

When automatic navigation changes tracks, playback waits until the new file's metadata has loaded.

This avoids racing a new `audio.src`.

## Repeat

The Repeat control cycles:

```text
LOOP OFF
LOOP ALL
LOOP 1
```

### LOOP OFF

Automatic playback stops after:

- the last sequential track,
- or the current Shuffle cycle.

Manual Next can still choose another track.

### LOOP ALL

Sequential playback wraps to track 01.

Shuffle starts a new randomized cycle.

### LOOP 1

The current MP3 restarts from zero.

LOOP 1 takes priority over Shuffle at automatic end-of-track.

## Shuffle

Shuffle is independent from Repeat.

When enabled, it:

- builds a randomized bag of other tracks,
- avoids intentionally repeating tracks within a cycle,
- remembers visited tracks in runtime history,
- lets Previous walk backward through that history,
- lets Next walk forward through existing history before choosing a new track.

The randomly generated order/history does not persist after reload.

## Lyrics Viewer

Every track has a matching `.lrc` path.

The viewer can display:

- untimed lyric lines,
- timed lines,
- timestamps,
- current-line highlight,
- panel-local auto-scroll.

The v2.80 shipped LRC files are metadata-only templates, so the normal current state is **Lyrics coming soon** until lyric text is authored.

## End of Track

Automatic end handling follows this priority:

1. LOOP 1 repeats the same track.
2. Otherwise choose the next sequential or shuffled track.
3. LOOP ALL allows a new pass after the list/cycle ends.
4. LOOP OFF reports playlist completion and stops.

## Persistence

v2.80 persists:

- Music entitlement,
- Repeat mode,
- Shuffle enabled/disabled.

It does not persist:

- selected track,
- playback time,
- playing/paused state,
- Shuffle bag,
- Shuffle history,
- open lyric panel,
- active lyric line.

Reload selects track 01 again.

## Design Rules

- Twelve tracks in canonical order.
- Song selection and lyrics opening are separate actions.
- Play/Pause is explicit.
- Previous/Next respect Shuffle history.
- LOOP 1 wins over Shuffle at song end.
- LOOP OFF stops automatic continuation after the current pass.
- Lyrics remain optional content and cannot break audio.
- Reload never resumes in the middle of a song.

## Success Criteria

The player feels like a compact but complete postgame soundtrack surface with predictable manual navigation, deliberate repeat/shuffle behavior, and editable lyric support.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
