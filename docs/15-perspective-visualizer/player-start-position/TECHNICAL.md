# Player Start Position - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Player Start Position > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places the Player near the center of the tactical map's bottom-right quarter so the default second-person camera composition is immediately readable.

> This page is the canonical technical documentation for **Player Start Position** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Initialization

The Player object is created as:

```js
const player={
  x:120,
  z:105,
  yaw:0,
  targetYaw:0
};
```

## Map Conversion

The tactical map function is:

```js
mapPt(
  x,
  z
) => ({
  x:W/2+x,
  y:H-z
});
```

With:

```text
W = 480
H = 420
```

the initial point becomes:

```text
map X = 240 + 120 = 360
map Y = 420 - 105 = 315
```

## Composition Reference

`PERSPECTIVE_VISUALIZER_DEV.md` explicitly documents this as the v2.72 composition change.

The stated goal is:

- center of the bottom-right quarter,
- clearer initial camera wedge,
- closer match to the intended composition reference.

## Initial Facing

Player starts:

```text
yaw       = 0
targetYaw = 0
```

This means initial forward direction is positive world Z.

The Player's facing changes only after drag motion creates a meaningful velocity direction.

## Drag Bounds

After pointer drag begins, Player coordinates are clamped.

X:

```js
-W/2+17
to
W/2-17
```

Equivalent:

```text
-223 to 223
```

Z:

```text
17 to H-17
```

Equivalent:

```text
17 to 403
```

The initial `(120,105)` lies comfortably inside those bounds.

## Reset Behavior

v2.78 does not expose a dedicated reset button inside the visualizer.

The initial position is recreated when the page runtime reloads.

A full site reset also reloads the page and therefore restores the visualizer start.

## QA

- Fresh load.
- Confirm Player tactical marker at approximately `(360,315)`.
- Confirm default camera remains second-person Companion camera.
- Compare initial composition against Player-at-center regression.
- Drag Player to each legal edge.
- Reload and confirm initial position returns.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
