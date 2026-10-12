# Music Downloads - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Downloads > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Lets visitors download any of the 12 installed authored songs using readable title-based filenames.

> This page is the canonical technical documentation for **Music Downloads** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)

## Markup

The player uses:

```html
<a id="music-download" href="#" download aria-disabled="true">DOWNLOAD</a>
```

## Download Update

`updateMusicDownload()` uses the selected `MUSIC_TRACKS[musicTrackIndex]`.

When available:

```text
href = numbered MP3 source path
download = sanitized human-readable song title + .mp3
aria-disabled = false
```

When unavailable:

```text
href = #
aria-disabled = true
disabled class = true
```

## Filename Sanitization

Current v2.80 code:

```js
track.title.replace(/[\\/:*?"<>|]/g,'-')
```

then appends:

```text
.mp3
```

This replaces common invalid filename characters with a hyphen.

## Canonical Mapping

| Track | Source path |
| --- | --- |
| Literally Unplayable | `assets/music/song-01.mp3` |
| Just Add Gameplay | `assets/music/song-02.mp3` |
| Great Again | `assets/music/song-03.mp3` |
| Inside My Head | `assets/music/song-04.mp3` |
| I Made This | `assets/music/song-05.mp3` |
| Come Back | `assets/music/song-06.mp3` |
| Stat FPS | `assets/music/song-07.mp3` |
| Every Byte | `assets/music/song-08.mp3` |
| She Was Almost Gold | `assets/music/song-09.mp3` |
| Everybody's Right | `assets/music/song-10.mp3` |
| One Player Too Many | `assets/music/song-11.mp3` |
| L-E-A-R-N | `assets/music/song-12.mp3` |

## Availability Source

`loadedmetadata` marks the current audio available and calls `updateMusicDownload()`.

The `error` event marks it unavailable and disables the link.

## Track Change

Every `musicSwitchTrack()` starts by marking the new track unavailable until metadata succeeds.

That prevents stale availability from a prior source from keeping Download active incorrectly.

## Lyrics Independence

`musicLyricsIndex` does not control Download.

Viewing lyrics for another song does not change:

```text
musicTrackIndex
musicDownload.href
musicDownload.download
```

## Disabled Click

If the selected track is not currently available, the click is prevented and the track status reports that the file is not installed/available.

## QA

- Test all 12 source paths.
- Verify every installed MP3 enables Download.
- Verify the filename matches the human-readable title.
- Verify characters requiring sanitization become `-`.
- Open lyrics for a different song and confirm Download still targets the selected track.
- Simulate a missing MP3 and verify Download disables without affecting the rest of the player.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
