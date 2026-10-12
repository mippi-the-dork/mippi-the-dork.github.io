# Music Downloads - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Downloads > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Lets visitors download any of the 12 installed authored songs using readable title-based filenames.

> This page is the canonical design documentation for **Music Downloads** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
- [Release History](../../../RELEASE_HISTORY.md)

## Design Intent

The Music Player is both a listening surface and a way to take the authored songs with you.

The current selected track owns the Download action.

## Installed Audio

All 12 MP3 files ship in v2.80.

Canonical source paths remain stable and numbered:

```text
assets/music/song-01.mp3
...
assets/music/song-12.mp3
```

The numbered path is implementation-facing.

The downloaded filename is player-facing.

## Human-Readable Filenames

v2.80 changes the download filename to use the selected song title.

Examples:

```text
Literally Unplayable.mp3
Stat FPS.mp3
One Player Too Many.mp3
```

Characters invalid in common filesystem names are replaced with hyphens.

## Selected-Track Model

The Download action always refers to the currently selected audio track.

Opening lyrics for another song with the circled `?` does not change the Download target because it does not change the selected track.

## Availability Gate

The runtime still verifies the selected MP3 through the audio element before enabling Download.

This protects against deployment or asset failures even though the normal v2.80 package includes all 12 files.

## Static Hosting

Download remains a native anchor using the HTML `download` attribute.

No custom server, blob pipeline, or audio API is required.

## Design Rules

- Download follows selected playback track, not viewed lyrics track.
- All 12 shipped songs should be downloadable.
- Human-readable filename uses the song title.
- Underlying source asset remains the stable numbered MP3.
- Unavailable audio disables Download gracefully.
- Downloading must not interrupt playback.

## Success Criteria

Each of the 12 installed tracks can be selected and downloaded as a clearly named MP3 while preserving the simple static-site architecture.

## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
