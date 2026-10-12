# Ambient 3D Layer - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Ambient 3D Layer > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds supporting ambient 3D motion and depth outside the primary hero interaction.

> This page is the canonical technical documentation for **Ambient 3D Layer** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The ambient canvas is near the top of `body`:

```html
<canvas id="ambient-canvas" aria-hidden="true"></canvas>
```

It appears before the sticky header and main content.

## CSS Layering

The canvas is fixed:

```css
#ambient-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: .22;
}
```

Important content layers are raised above it:

```css
.site-header,
main,
.site-footer,
.achievement,
.skip-link {
  position: relative;
  z-index: 1;
}
```

## Initialization

`initAmbientScene()` exits when:

```js
mippiRuntimeHealth.three.ambient
```

is already true.

It also exits if the ambient canvas is missing.

The function currently contains:

```js
if (!ambientCanvas || reduceMotion) return;
```

but `reduceMotion` is hard-coded false under the site's current Motion Policy.

## Renderer

```js
new THREE.WebGLRenderer({
  canvas: ambientCanvas,
  alpha: true,
  antialias: false,
  powerPreference: 'low-power'
});
```

The renderer uses transparent clear color.

Successful creation sets:

```js
mippiRuntimeHealth.three.ambient = true;
```

## Camera

The ambient scene uses:

```js
new THREE.PerspectiveCamera(46, 1, 0.1, 100);
camera.position.set(0, 0, 12);
```

## Main Particle Layer

The base layer creates:

```text
170 points
```

with positions randomized across a broad volume.

Rare material defaults:

```js
color: 0x2f93ff
size: .042
opacity: .38
```

## Signal Particle Layer

A second sparse layer creates:

```text
36 points
```

with larger point size and lower opacity.

This layer becomes more visible in higher rarity states.

## Overdrive Layer

Epic and Particle Boost use an additional pool of:

```text
260 points
```

The material starts at opacity 0.

Its target opacity changes each frame based on:

- Epic completion class,
- Particle Boost state.

## Wireframe Objects

The ambient scene creates eight random wireframe objects.

The geometry alternates between:

- OctahedronGeometry
- IcosahedronGeometry

Each object receives:

```js
userData.speed
```

with randomized sign and speed.

Theme and progression change their color and animation multiplier.

## Pointer Response

A passive global `pointermove` listener records target mouse coordinates normalized to the full viewport.

The animation loop eases current mouse values toward those targets.

In Epic/Legendary completion states, the ambient root responds more visibly to pointer position.

## Scroll Response

Each frame calculates:

```js
window.scrollY /
(document.documentElement.scrollHeight || 1)
```

and uses it to influence root X rotation.

This creates a subtle relationship between page traversal and ambient orientation.

## Theme Updates

Every frame reads:

```js
theme-complete
theme-legendary
particle-boost
```

and updates:

- ambient point color,
- signal color,
- overdrive color,
- opacity,
- point size,
- rotation speed,
- wireframe color.

No scene reconstruction is required on theme change.

## Resize

`resizeAmbient()` uses:

```js
window.innerWidth
window.innerHeight
```

The renderer pixel ratio is capped at 1.25.

The function is called once and then on the window `resize` event.

Unlike Hero and About, Ambient does not use `ResizeObserver` because it is full viewport.

## Render Loop

The scene calls `requestAnimationFrame(frame)` continuously after successful initialization.

There is currently no explicit scene disposal or pause when the tab is hidden.

Browser scheduling generally throttles hidden-tab animation frames.

## Error Behavior

Scene construction is wrapped in `try/catch`.

Failure logs:

```text
Ambient Three.js layer unavailable.
```

No visible user-facing error is shown because the ambient layer is nonessential.

## QA

- Confirm canvas never intercepts clicks.
- Verify Rare opacity remains subtle.
- Switch to Epic and Legendary and inspect colors.
- Toggle Particle Boost.
- Scroll through the page and inspect subtle movement.
- Move pointer and inspect higher-rarity response.
- Resize repeatedly.
- Block Three.js and confirm page content remains unchanged.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
