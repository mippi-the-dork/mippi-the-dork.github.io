# Music Downloads - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Downloads > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Enables per-track download for the currently selected soundtrack slot only when that track file has been confirmed available.

> This page is the canonical technical documentation for **Music Downloads** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

```html
<a
  id="music-download"
  href="#"
  download
  aria-disabled="true">
  DOWNLOAD
</a>
```

## Update Function

```js
function updateMusicDownload(){
  if(!musicDownload)
    return;

  const track=
    MUSIC_TRACKS[
      musicTrackIndex
    ];

  musicDownload.href=
    musicCurrentAvailable
      ? track.src
      : '#';

  musicDownload.setAttribute(
    'aria-disabled',
    musicCurrentAvailable
      ? 'false'
      : 'true'
  );

  musicDownload.classList.toggle(
    'disabled',
    !musicCurrentAvailable
  );
}
```

## Availability Source

The same audio element used for playback verifies the track.

On:

```text
loadedmetadata
```

the runtime sets:

```js
musicCurrentAvailable=true;
```

then calls:

```js
updateMusicDownload();
```

On:

```text
error
```

it sets the value false and refreshes download state.

## Track Change

Immediately after any selection:

```js
musicCurrentAvailable=false;
```

Download is disabled before the new file is loaded.

This prevents the link from temporarily pointing to the prior track's availability state.

## Disabled Click

```js
musicDownload
  ?.addEventListener(
    'click',
    event => {
      if(
        !musicCurrentAvailable
      ){
        event.preventDefault();

        musicTrackStatus.textContent=
          'TRACK FILE NOT INSTALLED YET';
      }
    }
  );
```

## CSS

Disabled state:

```css
.music-controls
a.disabled{
  opacity:.42;
  cursor:not-allowed;
}
```

## Per-Track File Mapping

```text
Track 1 -> assets/music/song-01.mp3
Track 2 -> assets/music/song-02.mp3
Track 3 -> assets/music/song-03.mp3
Track 4 -> assets/music/song-04.mp3
Track 5 -> assets/music/song-05.mp3
Track 6 -> assets/music/song-06.mp3
```

## Filename Behavior

The anchor does not provide an explicit alternate `download="<filename>"` value.

The browser therefore uses the linked resource's filename behavior.

## QA

- Missing file: verify href effectively disabled.
- Available file: verify href points at correct MP3.
- Select another missing track: verify link disables immediately.
- Install all six and validate each mapping.
- Test on GitHub Pages/static hosting.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
