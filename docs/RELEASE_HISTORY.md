# Release History

**Current documented state:** Mippi Portfolio v2.80

This page records documentation-relevant changes after the original comprehensive v2.78 documentation pass.

The v2.79 and v2.80 releases changed the postgame Music Player. They did not redesign the broader portfolio progression, Three.js scenes, arcade systems, Unreal Tools presentation, or Project Heavy Water Perspective Visualizer.

## v2.79 - Complete 12-Song Soundtrack

v2.79 replaced the six placeholder Music Player entries with the finished 12-song soundtrack.

Canonical order:

| # | Track | Audio asset |
| ---: | --- | --- |
| 01 | Literally Unplayable | assets/music/song-01.mp3 |
| 02 | Just Add Gameplay | assets/music/song-02.mp3 |
| 03 | Great Again | assets/music/song-03.mp3 |
| 04 | Inside My Head | assets/music/song-04.mp3 |
| 05 | I Made This | assets/music/song-05.mp3 |
| 06 | Come Back | assets/music/song-06.mp3 |
| 07 | Stat FPS | assets/music/song-07.mp3 |
| 08 | Every Byte | assets/music/song-08.mp3 |
| 09 | She Was Almost Gold | assets/music/song-09.mp3 |
| 10 | Everybody's Right | assets/music/song-10.mp3 |
| 11 | One Player Too Many | assets/music/song-11.mp3 |
| 12 | L-E-A-R-N | assets/music/song-12.mp3 |

The MUSIC_TRACKS array remains the playlist authority. No external playlist manifest or audio service was introduced.

v2.79 also added musicPlayWhenReady. Automatic track changes now wait for the new MP3's loadedmetadata event before attempting playback. This prevents an autoplay transition from racing the new audio source.

### What v2.79 did not introduce

The following behaviors already existed before v2.79 and remain documented under their earlier history:

- Music Player unlock through Legendary 100% Complete.
- Unlock persistence until the normal reset command.
- Sticky-header placement.
- Left alignment with the Mippi logo square.
- Downward expansion from a fixed top edge.
- Collapsed mode.
- Rare, Epic, and Legendary theme treatments.

v2.79 did not add a new music achievement, progression gate, or postgame step.

## v2.80 - Repeat, Shuffle, and Editable Lyrics

v2.80 extended the existing 12-track player with three major additions.

### Repeat

The #music-repeat control cycles:

~~~text
LOOP OFF
LOOP ALL
LOOP 1
~~~

Internal values:

~~~text
off
playlist
track
~~~

Automatic end-of-track behavior:

| Mode | Automatic behavior |
| --- | --- |
| off | Stop after the final sequential track or after the current shuffle cycle. |
| playlist | Start the playlist again, or build another shuffle cycle. |
| track | Restart the same track from 0. |

LOOP 1 takes priority over Shuffle when a song ends.

Persistent setting:

~~~text
mippi-music-repeat-v1
~~~

### Shuffle

The #music-shuffle control toggles independently between:

~~~text
SHUFFLE OFF
SHUFFLE ON
~~~

Persistent setting:

~~~text
mippi-music-shuffle-v1
~~~

Shuffle uses a Fisher-Yates bag of the other track indexes. A normal shuffle cycle does not intentionally repeat a track before the bag is exhausted.

The runtime also keeps an in-memory listening history so Previous follows the tracks the visitor actually heard.

Only the Shuffle preference persists. The generated order and history are rebuilt after reload.

### Lyrics Viewer

Every playlist row now exposes two independent actions:

1. Select the song.
2. Open its circled ? lyrics control.

Opening lyrics for another song does not change or start playback.

Each MP3 maps to an LRC file with the same numeric basename:

~~~text
assets/music/song-01.mp3
assets/music/song-01.lrc

...

assets/music/song-12.mp3
assets/music/song-12.lrc
~~~

All twelve v2.80 LRC files currently contain metadata-only templates. They do not ship with completed song lyrics or synchronization timestamps.

The player supports:

- untimed lyric lines,
- [mm:ss.xx] timestamps,
- multiple timestamps on one source line,
- standard LRC metadata,
- global [offset:] in milliseconds,
- UTF-8 BOM,
- section labels such as [Verse 2],
- current-line highlighting,
- lyrics-panel-local auto-scroll,
- graceful missing-file fallback.

The implementation uses DOM elements and textContent for lyric text. LRC content is not injected as HTML.

See [Music Lyrics Authoring Guide](MUSIC_LYRICS_AUTHORING_GUIDE.md).

### Downloads

v2.80 also gives the selected download a human-readable filename based on the song title.

Invalid filename characters are replaced with a hyphen.

The downloaded source remains the numbered MP3 asset.

### Static fallback correction

v2.79 runtime JavaScript displayed the correct 12-track count, but its literal fallback HTML still said:

~~~text
TRACK 1 / 6
~~~

v2.80 corrected the static fallback to:

~~~text
TRACK 1 / 12
~~~

## Persistence Added in v2.80

| Key | Values | Purpose |
| --- | --- | --- |
| mippi-music-repeat-v1 | off, playlist, track | Repeat preference |
| mippi-music-shuffle-v1 | 1, 0 | Shuffle preference |

Both share the existing Mippi storage namespace and are cleared by the normal full reset.

Still not persisted:

- current track,
- playback position,
- playing/paused state,
- shuffle bag,
- shuffle history,
- open lyric panel,
- active lyric line.

## Scope of These Releases

No v2.79 or v2.80 changes were made to the underlying:

- Three.js scene behavior,
- achievement or progression algorithms,
- non-music arcade systems,
- Unreal Tools assets,
- Perspective Visualizer.

Documentation outside the affected Music Player, persistence, UI, and QA areas should not attribute older behavior to these releases.
