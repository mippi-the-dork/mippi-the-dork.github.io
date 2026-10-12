# Rainbow Bones - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Rainbow Bones > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Transforms active and newly spawned Doug Bones into rainbow-trailing pickups while Doug is in Cool Mode.

> This page is the canonical technical documentation for **Rainbow Bones** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Cool Class

A Rainbow Bone uses:

```text
cool-bone
```

on the `.doug-bone` root.

## Trail Ownership

Timers are tracked in:

```js
const dougBoneTrailTimers=
  new WeakMap();
```

This associates an interval with a Bone DOM node without preventing garbage collection after removal.

## Trail Particle

`emitDougRainbowTrail(bone)` first verifies:

```js
bone.isConnected
```

and:

```js
bone.classList.contains(
  'cool-bone'
)
```

It creates:

```html
<i class="doug-rainbow-particle">
```

at the current Bone screen position.

## Hue

The particle receives a dynamic hue based on:

- `performance.now()`,
- random offset.

This produces continuous rainbow variation.

## Particle Lifetime

Each trail particle removes itself after:

```text
760 ms
```

CSS animation duration is approximately:

```text
720 ms
```

## Trail Interval

`setDougBoneCoolVisual(bone,true)`:

1. adds `cool-bone`,
2. checks whether an interval already exists,
3. emits one immediate particle,
4. starts an interval every:
   - 85 ms.

## Cleanup

When active becomes false and an interval exists:

```js
clearInterval(existing);
dougBoneTrailTimers.delete(bone);
```

The interval also self-cleans if the Bone becomes disconnected.

## Global Synchronization

`syncDougBoneCoolVisuals(active)` iterates:

```js
document.querySelectorAll(
  '.doug-bone'
)
```

and applies the current Cool state.

This is called when Cool Mode:

- activates,
- fully ends.

## Spawn Integration

`spawnDougBone()` appends the Bone then immediately calls:

```js
setDougBoneCoolVisual(
  bone,
  dougCard?.classList.contains(
    'doug-star-cool'
  )
);
```

Therefore a new Bone spawned during Cool Mode becomes rainbow immediately.

## Collection Cleanup

Bone click handler calls:

```js
setDougBoneCoolVisual(
  bone,
  false
);
```

before removal.

## CSS

Cool Bones use:

```text
doug-cool-bone-rainbow
```

with animated hue rotation and glow.

Trail particles use:

```text
doug-rainbow-trail
```

and HSL custom-property colors.

## QA

- spawn Bone before Cool Mode,
- activate Cool Mode while it is still flying,
- verify existing Bone transforms,
- spawn new Bone during Cool Mode,
- verify immediate rainbow trail,
- collect Bone,
- verify trail stops,
- let Cool Mode expire with Bone still active,
- verify it returns to normal.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
