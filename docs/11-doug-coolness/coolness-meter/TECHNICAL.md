# Coolness Meter - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Coolness Meter > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes Doug's morale progression visible as a persistent 0 to 100 percent HUD track.

> This page is the canonical technical documentation for **Coolness Meter** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The HUD element is:

```html
<div class="cool-meter"
     id="cool-meter"
     aria-label="Doug coolness: 0 percent">
  <div class="cool-meter-top">
    <span>COOLNESS</span>
    <b id="cool-meter-value">0%</b>
  </div>
  <div class="cool-meter-track">
    <i id="cool-meter-fill"></i>
  </div>
</div>
```

## Runtime State

Current progress:

```js
let dougCoolProgress=0;
```

Active limit state:

```js
let dougCoolActive=false;
```

Current-session Bone count:

```js
let dougBoneCount=
  Number(
    sessionTelemetry.economy?.bonesCollected
  )||0;
```

## Session Load

Progress loads from:

```text
mippi-doug-cool-progress-v1
```

and is clamped:

```js
Math.max(
  0,
  Math.min(
    100,
    Number(...)
  )
)
```

## Visibility

`updateCoolMeter()` calculates:

```js
const visible =
  dougCoolProgress>0 ||
  dougCoolActive ||
  dougBoneCount>0;
```

It toggles:

```text
visible
```

on the meter.

## Limit Class

The active state toggles:

```text
limit-ready
```

based on:

```js
dougCoolActive
```

## Text

Normal:

```text
N%
```

Active:

```text
COOL!
```

## Fill

The meter fill width is:

```js
`${value}%`
```

where `value` is rounded current Coolness.

## Accessible Label

Normal:

```text
Doug coolness: N percent
```

Active:

```text
Doug coolness full. Cool mode active.
```

## Rarity Styling

Rare uses a blue/cyan gradient.

Epic uses:

- violet,
- pink,
- cyan.

Legendary uses:

- orange,
- gold,
- teal.

## Limit Override

v2.59 hardens the active limit state so the rainbow fill wins in all three themes.

Selectors explicitly target:

```text
.cool-meter.limit-ready
```

under Rare, Epic, and Legendary.

This fixed a regression where Epic theme styling could override the full-meter rainbow.

## Width

The meter is intentionally narrower than the broader Meta Trace.

Desktop target width is approximately:

```text
142 px
```

in the persistent progression HUD.

## Persistence Helper

`persistDougCoolProgress()` writes the rounded clamped value into session storage.

It is called after:

- normal Coolness gain,
- Cool Mode activation,
- each drain step,
- final zero reset.

## QA

- fresh state: hidden,
- collect first Bone: visible,
- verify 25 percent,
- collect second: 50 percent,
- activate Star Power and collect Bone: +50,
- reach 100 and verify `COOL!`,
- test Rare/Epic/Legendary limit presentation,
- reload mid-progress in same session,
- verify numeric progress restores.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
