# 3D Interaction Input - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > 3D Interaction Input > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines drag, hover, click, pointer, and viewport behavior shared by the site's interactive 3D scenes.

> This page is the canonical technical documentation for **3D Interaction Input** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Hero Pointer State

The Hero owns:

```js
const pointer = new THREE.Vector2(0, 0);
let hovered = null;
let dragX = 0;
let dragY = 0;
let lastX = 0;
let lastY = 0;
let dragging = false;
```

These variables are local to `initScene()`.

## Pointer Coordinate Conversion

```js
function setPointer(event) {
  const rect = canvas.getBoundingClientRect();

  pointer.x =
    ((event.clientX - rect.left) / rect.width) * 2 - 1;

  pointer.y =
    -((event.clientY - rect.top) / rect.height) * 2 + 1;
}
```

This converts browser client coordinates to Three.js normalized device coordinates.

Using the canvas rectangle is required because the Hero canvas does not necessarily equal the full viewport.

## Pointer Down

On `pointerdown`:

```js
dragging = true;
lastX = event.clientX;
lastY = event.clientY;
setPointer(event);
canvas.setPointerCapture?.(event.pointerId);
```

Pointer capture allows the drag to remain coherent if the pointer temporarily leaves the canvas.

## Pointer Move

Every pointer move updates normalized pointer position.

While dragging:

```js
dragX += (event.clientX - lastX) * 0.004;
dragY += (event.clientY - lastY) * 0.003;
```

Then `lastX` and `lastY` are updated.

`dragX` and `dragY` are accumulated rather than clamped.

## Pointer Up

On release:

```js
dragging = false;
setPointer(event);
raycaster.setFromCamera(pointer, camera);
const hits = raycaster.intersectObjects(clickable, false);
```

If a hit exists and Interact Mode is not suppressing professional interaction, the linked section is scrolled into view.

## Pointer Cancel

```js
canvas.addEventListener(
  'pointercancel',
  () => dragging = false
);
```

This prevents the scene remaining in a stuck drag state after browser-level cancellation.

## Passive Pointer Response

Inside the animation loop, Hero root orientation eases toward a combination of:

- current normalized pointer coordinates,
- accumulated drag offsets.

Current targets:

```js
root.rotation.y +=
  (pointer.x * 0.12 + dragX - root.rotation.y) * 0.025;

root.rotation.x +=
  (-pointer.y * 0.06 + dragY - root.rotation.x) * 0.025;
```

This gives the scene subtle response before drag input begins.

## Hover Raycast

The animation loop raycasts every frame.

The nearest hit determines hover state.

On hover transition:

- prior mesh scale returns to 1,
- new mesh scale becomes 1.14,
- cursor switches between `pointer` and `grab`,
- readout text updates.

## Current Click-vs-Drag Limitation

The implementation does not record:

- pointer-down object,
- total drag distance,
- elapsed press duration.

Therefore a drag that ends over a clickable mesh can still execute navigation.

If QA identifies this as a practical problem, add a movement threshold such as:

```text
less than 6 to 10 CSS pixels
```

before treating pointer-up as a click.

## Touch Behavior

Hero canvas CSS:

```css
touch-action: pan-y;
```

This preserves browser vertical panning.

The site is still desktop-first, so touch 3D manipulation is not treated as the primary interaction path.

## Ambient Pointer Response

Ambient does not listen on its canvas.

Instead it listens passively to:

```js
window.pointermove
```

and converts client position into normalized viewport values.

Because the canvas has `pointer-events: none`, the listener cannot block page interaction.

## About Input

About canvas uses:

```css
pointer-events: none;
```

It owns no pointer listeners.

## Interact Mode

Interact Mode CSS applies:

```css
body.interaction-hunt #hero-canvas,
body.interaction-hunt .hero-scene-wrap {
  pointer-events: none !important;
}
```

The pointer-up navigation path also checks:

```js
document.body.classList.contains('interaction-hunt')
```

This is intentional defense in depth.

## Resize and Input Accuracy

Hero:

- `ResizeObserver`
- pointer coordinates use current canvas rectangle

About:

- `ResizeObserver`
- no direct pointer input

Ambient:

- full-window resize handler
- pointer response normalized to viewport

## Accessibility

The Hero scene wrapper is `aria-hidden="true"`.

Semantic alternatives exist through:

- Primary Navigation.
- Hero Explore Work action.
- normal section links.

No keyboard navigation is currently mapped directly onto the 3D Signal meshes because their destinations already exist as standard HTML controls.

## QA

### Mouse

- move across open scene,
- hover all Signals,
- drag in several directions,
- click all Signals,
- drag and release over a Signal,
- drag outside canvas while captured.

### Touch / Pointer

- verify vertical page panning still works,
- test tap on Signals where practical,
- test pointer cancellation.

### Mode Interaction

- enable Interact Mode,
- confirm Hero canvas no longer accepts navigation,
- disable mode,
- confirm interaction returns.

### Resize

- resize while pointer is over a Signal,
- verify raycast still matches visible geometry,
- test browser zoom.

### Accessibility

- navigate the page without using the canvas,
- confirm all Signal destinations remain available through standard HTML.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
