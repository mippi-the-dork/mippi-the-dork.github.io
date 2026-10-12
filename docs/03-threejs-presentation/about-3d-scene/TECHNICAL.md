# About 3D Scene - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > About 3D Scene > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the dedicated interactive 3D presentation used in the About section.

> This page is the canonical technical documentation for **About 3D Scene** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The About scene lives inside `.about-callout`:

```html
<canvas id="about-canvas" aria-hidden="true"></canvas>
```

The callout also contains:

```text
.about-watermark
.about-years
.about-scene-label
```

The canvas is presentation-only.

## CSS

```css
#about-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: .34;
}
```

`.about-years` is raised above the canvas.

Later theme rules increase the canvas opacity and adjust filtering.

## Initialization

`initAboutScene()` exits when:

```js
mippiRuntimeHealth.three.about
```

is already true.

It returns if `#about-canvas` is missing.

After shared Three.js loads, it creates the renderer.

## Renderer

```js
new THREE.WebGLRenderer({
  canvas: aboutCanvas,
  alpha: true,
  antialias: true,
  powerPreference: 'low-power'
});
```

Successful construction sets:

```js
mippiRuntimeHealth.three.about = true;
```

## Scene and Camera

The About scene uses:

```js
new THREE.PerspectiveCamera(42, 1, .1, 50);
camera.position.set(0, 0, 8);
```

The root group is offset:

```js
root.position.set(2.15, 0, 0);
```

This moves the 3D focus away from the text-heavy left side.

## Lighting

The scene uses one:

```js
THREE.AmbientLight
```

The light color changes in Legendary.

## Rings

Two torus meshes create the orbital structure.

The first uses a base `ringMat`.

The second clones the material so it can receive an independent theme color.

## Node Geometry

The scene creates four orbiting meshes using:

- BoxGeometry
- OctahedronGeometry
- TetrahedronGeometry
- IcosahedronGeometry

Each receives:

```js
userData.phase
```

so their orbital motion is offset.

## Particles

The About scene creates:

```text
110 points
```

in a compact volume.

The points change:

- color,
- opacity,
- size

based on Epic and Legendary state.

## Theme Logic

Each frame checks:

```js
theme-complete
theme-legendary
```

Rare uses the original blue palette.

Epic uses:

- purple,
- pink,
- cyan.

Legendary uses:

- orange,
- gold,
- teal,
- pale gold.

Material emissive colors are updated to match their current node colors.

## Motion

When motion is enabled by the current site policy:

- torus rings rotate,
- particles rotate,
- node meshes orbit,
- nodes rotate independently.

Epic increases the motion multiplier.

The global `reduceMotion` flag is currently fixed false.

## Resize

About uses:

```js
new ResizeObserver(resize).observe(aboutCanvas);
```

The resize function measures the actual canvas bounding box.

Pixel ratio is capped at 1.5.

This is appropriate because About is embedded in a section rather than full viewport.

## Nanite Integration

The scene calls:

```js
registerNaniteScene(scene, THREE)
```

Compatible untextured meshes can therefore participate in the fake Nanite visualization.

## Failure Behavior

Errors are caught and logged as:

```text
About Three.js scene unavailable.
```

No visible error is shown.

The About section remains usable because:

- text is normal DOM,
- external links are normal anchors,
- Mippi watermark is a normal image,
- Doug is normal DOM.

## QA

- Verify About scene initializes.
- Verify text remains above the canvas.
- Verify pointer events pass through.
- Switch Rare, Epic, and Legendary.
- Toggle Nanite.
- Resize the About panel.
- Block Three.js and confirm static About content remains intact.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
