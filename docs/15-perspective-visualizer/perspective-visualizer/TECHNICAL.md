# Perspective Visualizer - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Visualizer > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the interactive Project Heavy Water demonstration that compares first-, second-, and third-person camera ownership using the same live tactical scene.

> This page is the canonical technical documentation for **Perspective Visualizer** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Files

The visualizer is split across:

```text
index.html
style.css
perspective-demo.js
```

The JavaScript file is loaded independently:

```html
<script
  defer
  src="perspective-demo.js?v=2.78">
</script>
```

## Canvas Resolution

Both canvases use an internal coordinate size of:

```text
480 x 420
```

Constants:

```js
const W=480;
const H=420;
```

CSS scales those fixed-resolution canvases responsively.

## Initial Mode

Runtime starts with:

```js
let mode='2nd';
```

The HTML also marks the 2nd Person button active by default.

At initialization:

```js
selectMode(mode);
```

synchronizes button state and description.

## Mode Text

Canonical descriptions:

```text
1st:
The camera is Player Controlled from your character's perspective.

2nd:
The camera is NPC Controlled from that character's perspective.

3rd:
The camera is Player Controlled from outside of your character's perspective.
```

## Mode Selection

Buttons are selected through:

```js
document.querySelectorAll(
  '[data-mode]'
);
```

A deliberate click calls:

```js
selectMode(
  b.dataset.mode,
  {user:true}
);
```

The helper:

- updates `mode`,
- toggles `.active`,
- updates `aria-pressed`,
- updates `#viewDescription`,
- dispatches a custom event when user initiated.

## Achievement Event

The custom event is:

```text
mippi:perspective-change
```

Detail:

```js
{
  mode: next
}
```

The main script listens globally.

It records:

```text
portfolio.perspectiveModes.<mode>
```

For 2nd Person specifically it also increments:

```text
portfolio.secondPersonToggles
```

Every deliberate mode change calls:

```js
showAchievement(
  'secondPerson'
);
```

## Dependency Model

`perspective-demo.js` uses:

- DOM APIs,
- Canvas 2D,
- requestAnimationFrame,
- Pointer Events,
- CustomEvent.

It has no imported library and no dependency on the site's Three.js runtime.

## Theme Detection

`themePalette()` reads body classes.

Legendary:

```text
theme-legendary
```

Epic:

```text
theme-complete
```

Rare is fallback.

The function returns local colors for:

- accent,
- Player,
- field-of-view fill/stroke,
- tower palette,
- grid,
- floor,
- deep floor.

## Render Loop

One continuous requestAnimationFrame loop:

```js
function frame(time){
  ...
  const cam=
    activeCam();

  renderMap(cam);
  renderView(cam);

  requestAnimationFrame(frame);
}
```

The same camera object feeds both views on every frame.

## Responsive CSS

Desktop:

```css
grid-template-columns:
  repeat(2,minmax(0,1fr));
```

At:

```text
820 px
```

or narrower:

```css
grid-template-columns:1fr;
```

At smaller widths the container, panel, and HUD padding are reduced.

## Interact Mode

CSS explicitly disables visualizer canvases when the body has:

```text
interaction-hunt
```

through:

```css
body.interaction-hunt
.perspective-demo canvas {
  pointer-events:none !important;
}
```

## QA

- Load page before Three.js succeeds and verify this visualizer still operates.
- Verify default 2nd Person state.
- Click all three modes.
- Confirm button and description synchronization.
- Drag Player while switching modes.
- Switch Rare, Epic, Legendary while animation is running.
- Resize below 820 px and verify vertical stacking.
- Enable Interact Mode and confirm map interaction is disabled.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
