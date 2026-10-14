# Music Playback - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Playback > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Provides the finished 12-song soundtrack with direct selection, play/pause, previous/next, repeat, shuffle, and editable LRC lyrics.

> This page is the canonical technical documentation for **Music Playback** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
- [Music Lyrics Authoring Guide](../../MUSIC_LYRICS_AUTHORING_GUIDE.md)

## Track Registry

`MUSIC_TRACKS` contains 12 objects:

```js
{title:'Literally Unplayable',src:'assets/music/song-01.mp3'}
...
{title:'L-E-A-R-N',src:'assets/music/song-12.mp3'}
```

The array controls:

- playlist order,
- title labels,
- current-track title,
- current-track count,
- MP3 path,
- derived LRC path.

## Persistent Options

```text
MUSIC_REPEAT_KEY  = mippi-music-repeat-v1
MUSIC_SHUFFLE_KEY = mippi-music-shuffle-v1
```

Repeat modes:

```js
['off','playlist','track']
```

Invalid/missing repeat state defaults to `off`.

Shuffle loads true only when the stored value is `1`.

## Runtime State

Important fields:

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
```

## Shuffle Bag

`musicShuffleOrder(exclude)`:

- builds all track indexes except the excluded current track,
- applies Fisher-Yates randomization,
- returns the randomized bag.

`resetMusicShuffleHistory()` resets history to the current track and rebuilds the bag.

## Central Track Switching

`musicSwitchTrack(index,{autoplay,shuffleHistory})` replaces the older direct switching flow.

It:

1. updates Shuffle history when appropriate,
2. sets `musicTrackIndex`,
3. clears availability,
4. stores the pending autoplay intention,
5. updates title/count/status,
6. updates download state,
7. rerenders the track list,
8. pauses old audio,
9. changes `audio.src`,
10. loads the new MP3,
11. refreshes lyrics if the lyrics panel is already open.

## Deferred Autoplay

When `autoplay=true`:

```text
musicPlayWhenReady = true
```

Playback waits until `loadedmetadata`.

On successful metadata load:

- mark current file available,
- show READY,
- update download,
- if `musicPlayWhenReady`, clear it and call `play()`.

On audio error:

- clear pending autoplay,
- mark unavailable,
- show MUSIC FILE PENDING,
- disable download.

## Next Selection

`musicChooseNext({automatic})` implements sequential and Shuffle rules.

### Sequential

- next in-range index -> next track,
- end of list + manual Next -> track 0,
- end of list + LOOP ALL automatic -> track 0,
- end of list + LOOP OFF automatic -> `null`.

### Shuffle

- if user previously moved backward, Next walks forward through visited history,
- otherwise pop the next index from the bag,
- empty bag + LOOP ALL automatic -> build a new bag,
- empty bag + LOOP OFF automatic -> `null`.

## Previous

Sequential mode wraps through normal direct selection.

Shuffle mode walks backward through `musicShuffleHistory`.

If there is no earlier shuffled history entry, Previous restarts the current audio at zero.

## Ended Event

```text
if repeat mode == track
  currentTime = 0
  play same MP3
else
  musicNextTrack({automatic:true})
```

## Lyrics Parsing

`parseMusicLrc(raw)` supports:

- UTF-8 BOM removal,
- blank-line removal,
- `[offset:+/-N]` milliseconds,
- ignored metadata tags `ti/ar/al/au/by/length/re/ve`,
- timestamps with 1 to 3 minute digits,
- exactly 2 second digits,
- optional 1 to 3 fractional digits,
- multiple timestamps per source line,
- untimed text,
- section labels such as `[Verse 2]`,
- chronological sort of timed entries.

Seconds above 59 are ignored.

If a timestamp offset would make time negative, it clamps to zero.

## Lyrics Loading

`openMusicLyrics(index)` derives the LRC path by replacing `.mp3` with `.lrc`.

It fetches with:

```js
{cache:'no-store'}
```

A monotonically increasing request ID prevents stale lyric responses from winning when the visitor switches rapidly.

## Safe Rendering

Lyric text is assigned with `textContent`.

The LRC is never injected as HTML.

## Lyrics Synchronization

`updateMusicLyricsSync()` runs on:

```text
timeupdate
seeked
```

It synchronizes only when:

- lyrics data exists,
- lyrics track matches selected track,
- audio exists,
- panel is open,
- file contains timestamps.

The active line is the latest timed entry whose time has passed.

The corresponding row receives `.current` and the lyrics well scrolls internally to keep it visible.

## Empty and Missing Lyrics

Metadata-only templates produce:

```text
Lyrics coming soon.
```

Missing/unavailable LRC produces a separate unavailable-file fallback.

Neither case interrupts audio.

## Startup

When Music is unlocked:

```text
track 01 selected
paused
repeat restored
shuffle restored
shuffle order/history rebuilt if Shuffle is enabled
```

## QA

- Verify all 12 title/path pairs.
- Verify metadata-delayed autoplay between tracks.
- Test all three Repeat states.
- Test Shuffle with LOOP OFF and LOOP ALL.
- Verify no premature repeat in one Shuffle bag.
- Verify Previous/Next history behavior.
- Verify manual row selection remains separate from `?`.
- Verify metadata-only LRC shows Lyrics coming soon.
- Verify timed LRC highlights and seeks correctly.
- Verify missing LRC never breaks audio.
- Verify HTML-like lyric text renders literally.
- Verify reload restores only entitlement/options, not playback position/history.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)


## Superseding Implementation Notes (v2.81–v2.89)

v2.81's `musicSetIcon`, `musicSyncPlayIcon`, `musicSyncProgress`, `musicSyncLyricsMode`, `#music-seek`, `#music-current-time`, `#music-duration` and `#music-lyrics-toggle` now own accessible toolbar and seek. Enhanced LRC inline `<mm:ss.xx>` segments become `entries[].words` with `{text,time}`, safely rendered by `textContent`, not HTML; timestamps never appear in UI. Separate companion lives beside player, with Full/Single modes and forced Single while collapsed. v2.83 `ResizeObserver` tracks player height. v2.85 authoritative repeat modes are `['off','track','playlist']`; expanded buttons order Download, Previous, Play/Pause, Next, Loop, Shuffle, Lyrics. The public MP3/LRC registry is unchanged.
