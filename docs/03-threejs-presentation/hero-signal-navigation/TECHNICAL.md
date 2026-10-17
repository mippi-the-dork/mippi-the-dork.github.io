# Hero Signal Navigation - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Hero Signal Navigation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns hero-scene 3D objects into navigational signals that jump to meaningful portfolio sections.

> This page is the canonical technical documentation for **Hero Signal Navigation** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Node Construction

Hero section Signals are created from four records:

```js
[
  { key:'games', ... },
  { key:'consulting', ... },
  { key:'career', ... },
  { key:'tools', ... }
]
```

Each record creates:

- a `THREE.Group`,
- one visible mesh,
- one halo torus.

The group and mesh both receive:

```js
userData.key
```

The mesh is added to:

```js
clickable
```

for raycasting.

## Readout Labels

The current labels are:

```js
const sceneLabels = {
  games: 'GAMES // CLICK TO JUMP',
  career: 'CAREER // CLICK TO JUMP',
  consulting: 'CONSULTING // CLICK TO JUMP',
  tools: 'UNREAL TOOLS // CLICK TO JUMP'
};
```

The visible readout element is:

```html
<strong id="scene-readout">SELECT A SIGNAL</strong>
```

## Raycaster

The Hero owns:

```js
const pointer = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();
```

`setPointer(event)` converts client coordinates to normalized device coordinates using the Hero canvas bounding rectangle.

## Pointer Down

On `pointerdown`:

- `dragging = true`,
- last pointer coordinates are stored,
- normalized pointer position is updated,
- pointer capture is requested when available.

## Pointer Move

On `pointermove`:

- normalized pointer position is updated,
- if dragging, drag deltas accumulate into `dragX` and `dragY`.

Current sensitivity:

```js
dragX += deltaX * 0.004;
dragY += deltaY * 0.003;
```

## Pointer Up

On `pointerup`:

1. dragging becomes false,
2. normalized pointer position is updated,
3. raycaster is projected from camera,
4. `clickable` meshes are intersected,
5. the first hit is used.

If `body.interaction-hunt` is active, navigation returns early.

Otherwise the hit:

- increments `portfolio.heroSignalClicks`,
- records meaningful event `hero_signal`,
- awards `showAchievement('signal')`,
- calls `scrollIntoView()` on the matching section ID.

The section ID is read from `object.userData.key`.

## Hover Loop

Every animation frame:

1. raycaster is updated from current pointer and camera,
2. clickable meshes are intersected,
3. first hit becomes `next`,
4. prior hovered mesh is restored to scale 1,
5. next mesh is scaled to 1.14,
6. canvas cursor becomes `pointer` or `grab`,
7. readout text changes.

The hover system is therefore frame-driven rather than event-driven.

## Theme Readout

When no node is hovered:

- Rare: `SELECT A SIGNAL`
- Epic: `SYSTEM COMPLETE // OVERDRIVE`
- Legendary: `LEGENDARY SIGNAL // WISH FULFILLED`

Hover text overrides those idle messages.

## Interact Mode CSS

In addition to the JavaScript early return, Interact Mode applies:

```css
body.interaction-hunt #hero-canvas,
body.interaction-hunt .hero-scene-wrap {
  pointer-events: none !important;
}
```

This prevents the custom canvas from bypassing the same suppression applied to normal portfolio links.

## Telemetry

The Hero Signal path records:

```text
portfolio.heroSignalClicks
meaningful event: hero_signal
```

with the target key.

The Rare achievement system separately persists `Signal Acquired`.

## Known Interaction Edge

The current pointer-up handler does not compare total drag distance.

A release over a clickable mesh after a drag can still be treated as a navigation hit.

If this becomes noticeable in QA, add:

- accumulated movement threshold,
- or pointer-down target plus maximum displacement,
- or a short click-vs-drag classifier.

That would be a behavioral refinement, not a navigation architecture change.

## QA

- Hover all four nodes and verify labels.
- Click each node and verify correct section.
- Confirm `Signal Acquired` unlocks on first successful Signal use.
- Drag the scene and release away from a node.
- Drag across a node and release to check accidental navigation.
- Enable Interact Mode and confirm Hero navigation is suppressed.
- Disable Interact Mode and confirm it returns.
- Verify standard header navigation works when Hero 3D is disabled.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.05–v3.10 Current Specification

v3.07 adds real anchor-based fallback signals for Games, Career, Consulting and Tools. `activateHeroFallback(reason)` reveals `#scene-fallback`, hides failed `#hero-canvas`, preserves target IDs and calls `telemetryMeaningful('hero_signal',{target:key,fallback:true})` plus `showAchievement('signal')`, unless interaction-hunt is active. See [Hero Navigation Fallback](../hero-navigation-fallback/TECHNICAL.md).
