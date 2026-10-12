# Music Player Expansion - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Expansion > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the unlocked header player collapse to a compact title bar and expand downward without stopping or resetting playback.

> This page is the canonical technical documentation for **Music Player Expansion** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## State Representation

Collapse state is represented entirely by:

```text
collapsed
```

class on:

```text
#music-player
```

There is no dedicated runtime boolean.

## Toggle

```js
musicCollapse
  ?.addEventListener(
    'click',
    () => {
      musicPlayer.classList.toggle(
        'collapsed'
      );

      ...
    }
  );
```

## Symbol

Collapsed:

```text
+
```

Expanded:

```text
−
```

## ARIA Label

Collapsed:

```text
Expand music player
```

Expanded:

```text
Collapse music player
```

## Hidden Expanded Content

CSS:

```css
.music-player.collapsed
.music-now,

.music-player.collapsed
.music-controls,

.music-player.collapsed
.music-track-list{
  display:none;
}
```

The header remains visible.

## Header Border

Collapsed header removes extra bottom spacing and divider:

```text
padding-bottom 0
border-bottom 0
```

## Width

Header-specific collapsed width:

```text
min(
  266px,
  calc(100vw - 40px)
)
```

Expanded:

```text
min(
  326px,
  calc(100vw - 40px)
)
```

## Audio Continuity

The collapse click handler does not call:

```text
pause()
load()
selectMusicTrack()
```

Therefore current playback state is untouched.

## Track Continuity

`musicTrackIndex` is unchanged.

The same current title remains visible in collapsed header.

## Persistence

No storage key exists for collapsed state.

Startup does not reconstruct it.

## Mobile

At 760 px or below, expanded and collapsed variants both use the available width between 12 px side margins.

The collapsed class still hides internal content.

## QA

- Start an available track.
- Collapse.
- Verify audio continues.
- Expand.
- Verify same track and time continue.
- Select another track while paused.
- Collapse/reload.
- Verify reload returns expanded.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
