# Nanite Visualization - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Nanite Visualization > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Replaces eligible Three.js scene materials with per-triangle debug colors to imitate a Nanite-style triangle visualization.

> This page is the canonical technical documentation for **Nanite Visualization** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let naniteEnabled=false;
const naniteControllers=[];
```

## Command

Player-facing:

```text
nanite
```

toggles:

```js
setNanite(
  !naniteEnabled
);
```

Console output:

```text
NANITE TRIANGLE VISUALIZATION ON
```

or:

```text
OFF
```

## Scene Registration

Three.js scenes call:

```js
registerNaniteScene(
  scene,
  THREE
);
```

v2.78 contains registrations in the Hero and About scene initialization flows.

## Traversal

The registration helper traverses the whole scene.

An object is skipped unless all of these are true:

```text
obj.isMesh
geometry has position attribute
material is not an array
material has no texture map
material.userData.skipNanite is not set
```

## Replacement Geometry

For eligible meshes:

```js
const geometry =
  originalGeometry.index
    ? originalGeometry.toNonIndexed()
    : originalGeometry.clone();
```

Converting indexed geometry to non-indexed geometry makes it straightforward to assign one color to each triangle's three vertices.

## Per-Triangle Color

The helper allocates:

```js
new Float32Array(
  positionCount*3
);
```

It advances vertices in groups of three.

One palette color is chosen per group and copied to all three vertices.

Current palette:

```text
0xff4f9a
0x35a7ff
0x67e8ff
0xa868ff
0xffd166
0x65d46e
0xff7a59
0xe5f1ff
```

## Debug Material

Replacement material:

```js
new THREE.MeshBasicMaterial({
  vertexColors:true,
  side:THREE.DoubleSide,
  transparent:
    originalMaterial?.transparent ||
    false,
  opacity:
    originalMaterial?.opacity ?? 1
});
```

It is intentionally unlit.

## Stored Entry

Each eligible mesh stores:

```text
object
originalGeometry
originalMaterial
replacementGeometry
replacementMaterial
```

inside a closure-local entry list.

## Scene Controller

Registration creates:

```js
const apply =
  active =>
    entries.forEach(...);
```

The function swaps every eligible object between original and replacement state.

It is pushed into:

```js
naniteControllers
```

then immediately called with the current `naniteEnabled` value.

## Global Toggle

`setNanite(active)`:

- increments telemetry on change,
- stores runtime state,
- toggles:
  - `nanite-mode` on body,
- invokes every registered scene controller.

## Persistence

No storage key exists for Nanite state.

## QA

- Toggle before all Three.js scenes finish initializing.
- Confirm later scene registration inherits active state.
- Inspect Hero and About.
- Verify textured objects are not incorrectly replaced.
- Toggle off and compare geometry/material appearance.
- Repeat on/off several times and verify no material drift.
- Reload and verify normal view.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
