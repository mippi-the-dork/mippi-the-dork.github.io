# Music Downloads - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Downloads > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Enables per-track download for the currently selected soundtrack slot only when that track file has been confirmed available.

> This page is the canonical design documentation for **Music Downloads** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player is not only a streaming toy.

The user-authored songs are intended to be downloadable individually.

The player therefore includes a direct:

`DOWNLOAD`

action.

## Selected-Track Model

The download control applies to the currently selected track.

To download another song:

1. select its track slot,
2. wait for availability check,
3. use Download.

This keeps the compact UI from needing six separate download buttons.

It still provides individual per-track downloads.

## Availability Gate

Download must never point to a file the player has already determined is missing.

Before metadata confirms the selected MP3 exists:

- link points to `#`,
- `aria-disabled=true`,
- disabled styling applies.

Clicking it is intercepted.

The status line explains that the track file is not installed yet.

## Native Download Attribute

The player uses a normal HTML anchor with the `download` attribute.

There is no custom fetch/blob download system.

This keeps the feature compatible with static hosting.

## Direct Asset Contract

Once available, the download href is simply the track's MP3 path.

Current file contract:

```text
assets/music/song-01.mp3
...
assets/music/song-06.mp3
```

## Missing-File Transparency

A missing soundtrack file is treated as content pending, not as a broken player.

The slot stays visible.

The user can still inspect all six intended tracks.

## Design Rules

- Download selected track only.
- Require confirmed file availability.
- Use normal static-host download link.
- Missing file cannot download.
- Disabled state must be visible and accessible.
- Do not hide missing slots.
- File path contract remains predictable.

## Success Criteria

Once authored MP3s are installed, each song can be selected and downloaded directly without changing the Music Player architecture.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
