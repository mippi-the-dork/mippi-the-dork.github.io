# Top-Down Play Area - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Top-Down Play Area > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Shows the shared tactical world, controlled Player, AI Companion NPC, towers, active camera, and field-of-view wedge.

> This page is the canonical technical documentation for **Top-Down Play Area** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canvas

HTML:

```html
<canvas
  id="mapCanvas"
  width="480"
  height="420">
</canvas>
```

## World-to-Map Conversion

```js
const mapPt =
  (x,z) => ({
    x:W/2+x,
    y:H-z
  });
```

The world X origin is horizontally centered.

World Z increases upward in world space and is inverted into canvas Y.

## Grid

`renderMap()` fills the canvas then draws:

```text
vertical line every 40 px
horizontal line every 40 px
```

## Field of View

Constants:

```text
FOV   68 degrees
reach 255
```

The camera's yaw is converted into Canvas 2D arc angles.

The wedge is:

- filled with theme-local low-opacity color,
- outlined with theme-local stronger color.

## Towers

Canonical tower data:

```js
[
  {
    x:-112,
    z:300,
    size:38,
    height:115
  },
  {
    x:10,
    z:325,
    size:44,
    height:155
  },
  {
    x:118,
    z:258,
    size:36,
    height:135
  }
]
```

The tactical view draws square footprints using the theme tower palette.

## Character Markers

Both actors use a:

```text
14 px radius circle
```

plus the shared `arrow()` function.

Labels:

```text
PLAYER
COMPANION NPC
```

## Drag Ring

While:

```js
dragging===true
```

the map draws a:

```text
21 px radius
```

accent-colored ring around the Player.

## Third-Person Line

When:

```js
mode==='3rd'
```

a dashed line connects the active camera map position to the Player.

Dash:

```text
5,5
```

## Camera Icon

Every mode draws a small white square centered at the camera position.

The drawing context is rotated by camera yaw.

A darker inner square creates the simple camera/readout silhouette.

## Canvas Instruction

Bottom-level tactical text is drawn at:

```text
12,12
```

as:

```text
TOP VIEW · DRAG PLAYER
```

## Cursor and Touch

CSS:

```css
#mapCanvas {
  touch-action:none;
  cursor:grab;
  user-select:none;
}

#mapCanvas:active {
  cursor:grabbing;
}
```

`touch-action:none` allows Pointer Event dragging without the browser interpreting the gesture as touch scrolling inside the canvas.

## QA

- Inspect camera icon in all three modes.
- Confirm FOV wedge origin changes correctly.
- Confirm Player and NPC arrows update continuously.
- Confirm third-person dashed relationship line only appears in 3rd Person.
- Confirm tower positions stay static.
- Test mouse and touch/pointer dragging.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
