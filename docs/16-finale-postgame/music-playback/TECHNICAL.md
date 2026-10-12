# Music Playback - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Playback > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Implements six selectable soundtrack slots with play/pause, previous/next navigation, automatic next-track playback, and graceful missing-file handling.

> This page is the canonical technical documentation for **Music Playback** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Track Registry

```js
const MUSIC_TRACKS=[
  {
    title:'SONG 01',
    src:'assets/music/song-01.mp3'
  },
  ...
  {
    title:'SONG 06',
    src:'assets/music/song-06.mp3'
  }
];
```

## Runtime State

```js
let musicTrackIndex=0;
let musicCurrentAvailable=false;
```

## Selection

```js
selectMusicTrack(
  index,
  {autoplay=false}
)
```

wraps index:

```js
musicTrackIndex=
  (
    Number(index)+
    MUSIC_TRACKS.length
  )
  %
  MUSIC_TRACKS.length;
```

## Selection Reset

On every new track:

```js
musicCurrentAvailable=false;
```

UI becomes:

```text
CHECKING TRACK FILE...
PLAY
```

Download is disabled.

Then:

```js
musicAudio.pause();
musicAudio.src=track.src;
musicAudio.load();
```

If `autoplay` is requested:

```js
musicAudio.play()
  .catch(()=>{});
```

## Manual List Click

Track-list click calls:

```js
selectMusicTrack(
  Number(
    button.dataset.musicTrack
  )
);
```

No autoplay option is passed.

## Previous / Next

Previous:

```js
selectMusicTrack(
  musicTrackIndex-1,
  {
    autoplay:
      !musicAudio.paused
  }
);
```

Next uses the same logic with `+1`.

## Play

When the file is unavailable:

```text
TRACK FILE NOT INSTALLED YET
```

is shown.

When available and paused:

```js
musicAudio.play()
```

is attempted.

On rejection:

```text
PLAYBACK UNAVAILABLE
```

## Pause

If currently playing:

```js
musicAudio.pause();
```

## Availability Events

### loadedmetadata

```js
musicCurrentAvailable=true;
status='READY';
```

### error

```js
musicCurrentAvailable=false;
status='MUSIC FILE PENDING';
play label='PLAY';
```

### play

```text
button PAUSE
status NOW PLAYING
```

### pause

```text
button PLAY
status READY
```

when the current file is available.

## Ended

```js
musicAudio?.addEventListener(
  'ended',
  () =>
    selectMusicTrack(
      musicTrackIndex+1,
      {autoplay:true}
    )
);
```

## Preload

HTML audio element:

```html
<audio
  id="music-audio"
  preload="metadata">
</audio>
```

## Startup

If Music is already unlocked:

```js
selectMusicTrack(0);
```

No autoplay.

## QA

- Test missing all six files.
- Install one MP3 and test readiness.
- Select a track manually and verify no autoplay.
- Play, then Next and Previous.
- Pause, then Next.
- Reach end of an available track.
- Verify wrap from track six to one.
- Collapse while playing.
- Reload and verify track one paused.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
