# Finale Sequence - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Sequence > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Runs the authored full-screen ending, records Finale history, and presents either Continue Exploring or the optional Session Report.

> This page is the canonical technical documentation for **Finale Sequence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Start Guard

`startFinale()` returns when:

```text
finaleRunning
not finaleReady
missing finale overlay
```

## Seen State

On valid start:

```js
finaleRunning=true;
finaleSeen=true;
```

Persistent key:

```text
mippi-finale-seen-v1
```

is written immediately.

## Player Model

```js
const model=
  computePlayerModel();
```

Telemetry:

```text
finale_started
```

with:

```text
model: model.label
```

## Body and Overlay

The runtime adds:

```text
finale-active
```

to `body`.

The overlay:

```text
#finale-overlay
```

receives:

```text
show
```

and:

```text
aria-hidden=false
```

The `identity` class is removed at sequence start.

## Control State

`#finale-controls` is hidden before sequence playback.

## Timed Beats

### 650 ms

```text
THANKS FOR PLAYING.
```

### 2350 ms

```text
THANKS FOR PLAYING.
This was supposed to be a portfolio.
```

### 4050 ms

```text
THANKS FOR PLAYING.
It got away from us.
```

### 5700 ms

```text
MIPPI THE DORK
GAME DESIGNER
PLAYER PROFILE // <model.label>
```

At 5700 ms:

```text
identity
```

class is added and Finale controls become visible.

## Input Lock

CSS:

```css
body.finale-active
>*:not(.finale-overlay){
  pointer-events:none!important;
}
```

## Cursor Restoration

v2.72 adds:

```css
body.finale-active
.final e-overlay,
body.finale-active
.final e-overlay *{
  cursor:auto !important;
}
```

In the actual stylesheet the selector is `.finale-overlay` without spacing.

The custom `.power-cursor` is hidden.

Finale buttons explicitly use pointer cursor.

## End

```js
function endFinale(){
  finaleRunning=false;

  finaleOverlay?.classList.remove(
    'show',
    'identity'
  );

  finaleOverlay?.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'finale-active'
  );

  if(finaleControls)
    finaleControls.hidden=true;
}
```

## No Escape Handler

v2.78 does not define a dedicated Escape-to-close path for the Finale.

The intended exit is through the two authored final controls.

## QA

- Start Finale.
- Verify controls stay hidden for first 5.7 seconds.
- Compare exact text at each beat.
- Verify Player Model label.
- Test with enlarged Mushroom/custom cursor state and confirm normal cursor.
- Try clicking page beneath overlay.
- Verify no underlying pointer interaction.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
