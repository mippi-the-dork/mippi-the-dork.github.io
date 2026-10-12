# Perspective Camera Controls - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Camera Controls > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Implements Player dragging, filtered facing rotation, autonomous Companion motion, mode switching, and the camera calculations that keep both canvases synchronized.

> This page is the canonical technical documentation for **Perspective Camera Controls** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Pointer-to-World

`pointerWorld(e)` converts browser coordinates into internal canvas world coordinates.

It uses the canvas bounding rectangle to account for responsive CSS scaling.

X result:

```js
(e.clientX-r.left)
*W/r.width
-W/2
```

Z result:

```js
H-
(e.clientY-r.top)
*H/r.height
```

Both are clamped inside a 17-unit boundary.

## Drag Start Radius

Pointerdown first measures:

```js
Math.hypot(
  p.x-player.x,
  p.z-player.z
)
```

Drag begins only when that distance is:

```text
25 units or less
```

## Pointer Capture

On valid drag:

```js
map.setPointerCapture(
  e.pointerId
);
```

The runtime stores:

- pointer ID,
- initial grab offset,
- filtered motion state,
- last pointer timestamp.

## Grab Offset

```js
grab={
  x:player.x-p.x,
  z:player.z-p.z
};
```

This avoids snapping the Player center directly to the pointer when the user grabs near its edge.

## Filtered Motion

Runtime state:

```js
const motion={
  x:0,
  z:0
};
```

Pointer delta time is clamped:

```text
1/240 s
to
0.08 s
```

When movement distance exceeds:

```text
0.65 units
```

the code calculates velocity and eases the filtered motion toward it.

Response speed:

```text
9
```

## Target Yaw Gate

Target yaw only updates when filtered velocity magnitude exceeds:

```text
8
```

Then:

```js
player.targetYaw=
  Math.atan2(
    motion.x,
    motion.z
  );
```

## Drag End

The runtime listens for:

- `pointerup`,
- `pointercancel`,
- `lostpointercapture`.

Each clears active drag state.

## Shortest Arc

```js
const shortest =
  (a,b) =>
    Math.atan2(
      Math.sin(b-a),
      Math.cos(b-a)
    );
```

This prevents long rotation around the wrong angular direction when crossing the -PI/PI boundary.

## Frame Delta

Each animation frame clamps delta time to:

```text
0.05 seconds
```

to avoid huge jumps after temporary stalls.

## Player Rotation

First Person:

```text
ease speed 7.5
max step 5.0 rad/s
```

Second/Third:

```text
ease speed 5.2
max step 3.1 rad/s
```

## Companion Path

Path values:

```text
center X -85
center Z 185
radius   65
speed    .42 rad/s
```

Position is updated from cosine/sine every frame.

## Companion Facing

Companion targets the current Player coordinate and rotates with:

```text
ease speed 14
```

through the same shortest-arc helper.

## Projection Constants

Live-view renderer:

```text
NEAR    5
FOCAL   345
HORIZON H * .46
```

With:

```text
H = 420
```

the horizon is approximately:

```text
193.2 px
```

## Near Clipping

Faces are clipped against:

```text
Z = 5
```

before projection.

Projected screen point:

```js
x =
  W/2+
  FOCAL*p.x/p.z;

y =
  HORIZON-
  FOCAL*p.y/p.z;
```

## Depth Sorting

Rendered geometry is accumulated in `faces`.

Each face stores average camera-space depth.

Faces are sorted:

```js
b.depth-a.depth
```

before drawing.

## Camera Rotation Scope

Camera-space conversion only applies yaw.

The implementation deliberately has no pitch or roll.

A small center crosshair is drawn in the live view.

## QA

- Drag from center of Player marker.
- Drag from near Player edge and verify no snap.
- Pointerdown outside 25-unit radius and verify no drag.
- Drag rapidly in opposing directions and inspect yaw smoothing.
- Cross angular wrap boundary and verify shortest rotation.
- Compare First Person turn speed against Third Person.
- Change mode during active Companion movement.
- Resize canvas through responsive layout and verify pointer-to-world mapping remains correct.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
