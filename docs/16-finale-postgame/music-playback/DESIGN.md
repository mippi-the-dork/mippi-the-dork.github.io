# Music Playback - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Playback > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Implements six selectable soundtrack slots with play/pause, previous/next navigation, automatic next-track playback, and graceful missing-file handling.

> This page is the canonical design documentation for **Music Playback** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player should be simple.

It is an endgame reward, not a media application.

The required playback vocabulary is:

- choose a song,
- play,
- pause,
- previous,
- next,
- see what is selected,
- know whether the file exists,
- continue to the next track automatically.

## Six Slots

The player always shows six tracks.

Current placeholder titles are:

```text
SONG 01
SONG 02
SONG 03
SONG 04
SONG 05
SONG 06
```

The file contract is stable even before final authored song names are installed.

## Missing Files

A track can exist as a visible slot without its MP3 file being present.

This is an intentional staging state.

The UI moves through statuses such as:

- checking track file,
- music file pending,
- ready,
- now playing,
- playback unavailable.

Trying to play a missing file does not throw the user into a broken audio state.

It simply says the file is not installed yet.

## Track Selection

Clicking a track selects it but does not automatically play it.

This gives the player a chance to browse the list without audio starting unexpectedly.

## Previous / Next

Previous and Next preserve the current playback intention.

If audio is currently playing, switching track attempts to autoplay the new selection.

If audio is paused, switching remains paused.

This behavior is more natural than always starting or always stopping.

## End of Track

When a song ends naturally:

- the next track is selected,
- playback automatically begins.

The track index wraps around after track six.

## Browser Autoplay Reality

Programmatic playback calls are wrapped in promise handling.

Browsers may reject autoplay.

The player should fail gracefully and let the user press Play.

## Collapse Continuity

Playback is independent from expanded/collapsed UI.

Collapsing does not pause.

## No Playback Persistence

v2.78 does not persist:

- current track index,
- playback position,
- playing/paused state.

Reload starts unlocked Music on track one, paused.

Only entitlement persists.

## Design Rules

- Six slots.
- Manual track click selects without autoplay.
- Play/Pause explicit.
- Prev/Next preserve playing vs paused intention.
- Ended track advances and autoplays.
- Index wraps.
- Missing file remains visible and safe.
- Collapse does not affect audio.
- Reload does not resume playback in v2.78.

## Success Criteria

The player behaves like a compact soundtrack reward with no surprising autoplay and no broken state when final music assets are absent.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
