# Stat Overlay - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Stat Overlay > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides Unreal-style `stat fps` and `stat unit` overlays with live browser FPS sampling and intentionally simulated engine timing values.

> This page is the canonical technical documentation for **Stat Overlay** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let statOverlay=null;
let statTimer=null;
let statMode=null;
```

FPS sampling adds:

```js
let statFpsRaf=null;
let statFpsFrames=0;
let statFpsWindowStart=0;
let statFpsMeasured=null;
let statFpsMeasuredAt=0;
```

## Lazy DOM Creation

`ensureStatOverlay()` creates:

```html
<div class="fps-stat"
     id="fps-stat">
```

and appends it to `body`.

The overlay is reused across mode changes.

## Commands

### FPS

```text
stat fps
```

sets:

```text
fps
```

unless FPS is already active, in which case it turns the overlay off.

### Unit

```text
stat unit
```

uses the same toggle behavior for `unit`.

### None

```text
stat none
```

always calls:

```js
setStatMode(null);
```

## Mode Transition

`setStatMode(mode)`:

1. ensures overlay exists,
2. clears the 180 ms update interval,
3. stops the FPS RAF sampler,
4. stores new mode,
5. hides overlay if null,
6. starts FPS sampler if needed,
7. updates immediately,
8. starts display interval.

## Display Update

The overlay refresh timer is:

```text
180 ms
```

## Real FPS Sampler

`startRealFpsSampler()` uses `requestAnimationFrame`.

It samples over windows of at least:

```text
500 ms
```

then calculates:

```text
frames * 1000 / elapsed
```

A sample is considered fresh when it is less than:

```text
1600 ms
```

old.

## FPS Fallback

When no recent sample exists:

```js
58 +
Math.random()*4
```

is displayed.

That produces approximately:

```text
58 to 62 FPS
```

and the label:

```text
STAT FPS // EST
```

## Unit Values

Current simulated ranges:

```text
Frame   15.60 to 17.80 ms
Game     3.70 to 5.60 ms
Draw     5.10 to 7.20 ms
GPU     10.80 to 13.90 ms
RHIT     1.00 to 2.10 ms
```

Morale is real runtime data:

```text
N bone / bones
```

from:

```js
dougBoneCount
```

## CSS

The overlay is fixed:

```text
right 14 px
top   92 px
```

Minimum width:

```text
170 px
```

It uses:

```text
pointer-events:none
white-space:pre
```

## Theme

The base later styling uses rarity custom properties.

Explicit color overrides:

```text
Epic       #ff86d7
Legendary  #72e9e4
```

Rare uses the active rarity secondary color.

## Persistence

No storage key exists for `statMode`.

## QA

- Toggle FPS on.
- Wait for LIVE label.
- Background tab long enough to make sample stale.
- Return and observe EST then LIVE recovery.
- Switch directly from FPS to Unit.
- Verify FPS RAF stops.
- Toggle Unit off by repeating command.
- Use `stat none`.
- Test all three themes.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
