# Lumen Visualization - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Lumen Visualization > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a deliberately unstable faux Lumen lighting visualization with screen-space light and dark artifacts.

> This page is the canonical technical documentation for **Lumen Visualization** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let lumenLayer=null;
let lumenEnabled=false;
let lumenRandomTimers=
  new Set();
```

## Command

Player-facing:

```text
lumen
```

toggles:

```js
setLumen(
  !lumenEnabled
);
```

Console output:

```text
LUMEN VISUALIZATION ON // sample quality questionable.
```

or:

```text
LUMEN VISUALIZATION OFF // sample quality normal.
```

## Layer Creation

`ensureLumenLayer()` lazily creates:

```html
<div class="lumen-artifacts"
     aria-hidden="true">
```

It then creates:

```text
22
```

blob elements.

Alternating classes:

```text
lumen-blob light
lumen-blob dark
```

## Blob Layout

Each blob gets randomized:

- left position,
- top position,
- width,
- height,
- negative animation delay,
- animation duration.

Current sizes are roughly:

```text
width  180 to 610 px
height 145 to 505 px
```

## Activation

`setLumen(active)` toggles:

```text
active
```

on the layer and:

```text
lumen-mode
```

on `body`.

It also clears all prior random state timers.

## Random Instability

Each blob receives a recursive timeout through:

```js
scheduleLumenRandomCut(blob)
```

Wait range:

```text
450 to 3550 ms
```

approximately.

At each event:

```js
blob.classList.toggle(
  'lumen-cut',
  Math.random()>.42
);
```

A hot state is applied with approximately:

```text
28 percent
```

chance.

## Cut State

`lumen-cut` forces opacity to zero and pauses the breathing animation.

## Hot State

`lumen-hot` increases:

- opacity,
- saturation,
- brightness,

and reduces blur slightly.

## Base Animation

The current hardened animation is:

```text
lumen-breathe-v255
```

with randomized per-blob duration between approximately:

```text
3.2 and 12.2 seconds
```

## Shutdown Warning

`setLumen()` stores the previous state.

If:

```js
was &&
!active
```

then:

```js
showLightingRebuildWarning();
```

runs.

The warning stays through a:

```text
4.2 second
```

animation.

## Theme CSS

Light colors:

```text
Rare       rgba(111,201,255,.23)
Epic       rgba(213,121,255,.20)
Legendary  rgba(255,193,83,.19)
```

Legendary dark blobs use:

```text
rgba(15,8,1,.52)
```

## Telemetry

A changed state increments:

```text
modes.lumenToggles
```

## Persistence

No local or session key persists the mode.

## QA

- Toggle on in each rarity.
- Verify 22-blob layer appears.
- Observe random cut/hot behavior.
- Toggle off and verify all randomness stops.
- Confirm rebuild warning.
- Toggle repeatedly and verify old timers do not accumulate.
- Reload and verify disabled startup.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
