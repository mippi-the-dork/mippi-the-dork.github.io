# Hero 3D Scene - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Hero 3D Scene > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the large interactive 3D hero presentation at the top of the site.

> This page is the canonical technical documentation for **Hero 3D Scene** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The Hero section contains:

```html
<section class="hero"
         aria-labelledby="hero-title">
```

The 3D wrapper is:

```html
<div class="hero-scene-wrap" aria-hidden="true">
  <canvas id="hero-canvas"></canvas>
  <div class="scene-fallback" id="scene-fallback">...</div>
</div>
```

The entire scene wrapper is `aria-hidden` because professional navigation and Hero actions remain normal HTML.

The visible scene guide is also `aria-hidden`.

## Hero Sizing

CSS hardens the Hero height:

```css
.hero {
  height: clamp(620px,
                calc(100svh - var(--header)),
                760px);
  min-height: 0;
}
```

At up to 760 px viewport width, the Hero uses a fixed 720 px height.

The canvas fills the Hero:

```css
#hero-canvas {
  width: 100%;
  height: 100%;
  display: block;
  touch-action: pan-y;
}
```

## Initialization

`initScene()` exits early when:

```js
mippiRuntimeHealth.three.hero
```

is already true.

Before Three.js initializes, `#scene-fallback` has `.show`.

On successful renderer creation:

```js
fallback.classList.remove('show');
fallback.classList.add('scene-live');
mippiRuntimeHealth.three.hero = true;
```

The fallback remains in the DOM with reduced opacity.

## Renderer

Hero renderer:

```js
new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
```

Additional configuration:

```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 0);
```

## Scene and Camera

Scene:

```js
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x090b10, 0.07);
```

Camera:

```js
new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(0, 1.5, 8.6);
```

Primary root group:

```js
root.position.set(3.05, 0.05, -0.2);
root.scale.setScalar(1.28);
```

The positive X root offset pushes the composition toward the right side of the Hero.

## Lighting

The Hero uses:

- HemisphereLight
- DirectionalLight
- PointLight

The lights are recolored at runtime based on Epic and Legendary body classes.

## Core

The central object is an `IcosahedronGeometry`.

The core uses `MeshStandardMaterial` with:

- metalness,
- roughness,
- emissive color,
- theme-aware material colors.

A slightly larger edge mesh supplies the wireframe outline.

## Mippi Logo Plane

The Hero loads:

```text
assets/mippi-logo-blue.png
```

through `TextureLoader`.

The logo is rendered on a plane using a custom `ShaderMaterial`.

The shader uses:

- logo texture,
- tint uniform,
- opacity uniform.

This allows the same source texture to be retinted for Rare, Epic, and Legendary.

The material includes:

```js
userData: { skipNanite: true }
```

so the fake Nanite visualization does not replace the logo material.

## Orbit Rings

The standard scene includes two torus meshes.

Legendary adds a separate `legendaryFx` group containing:

- wireframe icosahedral shell,
- gold torus,
- teal torus,
- 12 tetrahedral shards.

`legendaryFx.visible` is driven live by the Legendary theme class.

## Unreal Tool Orbit

The scene creates icon planes for:

- Hue
- Latch
- Lux
- Focus
- Link
- Digit

Each texture is loaded from `assets/tool-icons/`.

The planes are transparent, face the camera, float vertically, and share a slow group motion.

## Grid

The scene includes a `GridHelper`.

The code disables vertex colors on the grid material so theme tint does not leave stale blue lines.

Grid color and opacity update each frame based on rarity.

## Section Nodes

Four node records define:

```text
games
consulting
career
tools
```

Each record specifies:

- key,
- color,
- position,
- geometry.

Geometries include:

- Octahedron
- Box
- Cylinder
- Dodecahedron

Each node is wrapped in a group with a halo torus.

The mesh itself is added to the `clickable` array used for raycasting.

## Background Particles

The Hero creates 220 randomly positioned particles using `BufferGeometry` and `PointsMaterial`.

Color, size, and opacity update by rarity.

## Resize

The Hero uses `ResizeObserver` on the canvas.

Pixel ratio is capped at:

```js
window.innerWidth < 720 ? 1.35 : 1.8
```

The camera aspect is updated from the canvas bounding rectangle.

## Theme Updates

Every animation frame reads:

```js
document.body.classList.contains('theme-complete')
document.body.classList.contains('theme-legendary')
```

and updates:

- core color,
- emissive,
- rings,
- lights,
- fog,
- wireframe,
- logo tint,
- link lines,
- grid,
- section node colors,
- particles,
- Legendary geometry visibility.

This allows theme switching without scene reconstruction.

## Nanite Integration

The Hero calls:

```js
registerNaniteScene(scene, THREE)
```

This registers compatible mesh geometry with the fake Nanite visualization system.

Textured materials such as tool icons and the logo shader are excluded.

## Error Fallback

Any exception inside `initScene()` is caught.

On failure:

- warning is logged,
- `.scene-live` is removed,
- `.show` is added,
- Hero canvas receives `hidden`.

The professional Hero overlay remains present.

## QA

- Verify fallback is visible before renderer readiness.
- Confirm fallback fades after successful startup.
- Test Rare, Epic, and Legendary appearance.
- Toggle Nanite visualization.
- Toggle Slowmo and inspect node motion.
- Resize the window repeatedly.
- Test high-DPI and narrow widths.
- Block Three.js and verify Hero copy and conventional buttons remain usable.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.05–v3.10 Current Specification

**v3.10 current pose:** `HERO_OPENING_YAW=-0.36`, `HERO_OPENING_PITCH=0.03`; initialize root rotation and include both in idle target to avoid pose snapping (v3.06). `logoPlane.position.set(0,0,1.55)` is restored; a centered `THREE.Group` `logoOrbit` with `rotation.order='YXZ'`, `rotation.set(-0.35,-0.45,0)` parents the plane and is itself parented to root. This rotates the logo radially around the sphere instead of translating the plane (the v3.08 `(-0.67,0.53,1.40)` offset is superseded). Rings retain v3.08 `ringA.rotation.set(1.15,0.2,-0.12)` and `ringB.rotation.set(0.62,0.9,0.65)`. Keep small local logo bobbing separate from the parent orbital orientation. v3.07 accessible DOM fallback persists.
