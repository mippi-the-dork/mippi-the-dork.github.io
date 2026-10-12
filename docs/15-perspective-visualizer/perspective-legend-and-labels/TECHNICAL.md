# Perspective Legend and Labels - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Legend and Labels > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses explicit control, camera, and live-view labels so the demonstration does not rely on color or assumed perspective terminology.

> This page is the canonical technical documentation for **Perspective Legend and Labels** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## HTML Legend

```html
<div class="panel-legend">
  <div class="legend-item">
    <span class="
      dot
      player-dot">
    </span>
    PLAYER - Player Controlled
  </div>

  <div class="legend-item">
    <span class="
      dot
      companionNpc-dot">
    </span>
    COMPANION NPC - AI Controlled
  </div>
</div>
```

## Right HUD

Current HTML:

```html
<div class="hud-overlay">
  <div class="hud-top-left">
    PERSPECTIVE VIEW
  </div>

  <div class="hud-bottom-right">
    LIVE CAMERA
  </div>
</div>
```

There is intentionally no top-right or bottom-left text.

## Footer Description

```html
<div
  class="panel-footer"
  id="viewDescription">
  The camera is NPC Controlled from that character's perspective.
</div>
```

JavaScript updates this from the canonical `modes` object.

## Tactical Text

`renderMap()` draws:

```js
m.fillText(
  'TOP VIEW  ·  DRAG PLAYER',
  12,
  12
);
```

This is Canvas content rather than HTML panel header text.

## Camera Marker

`renderMap()` draws a small white square at the active camera position.

The drawing context rotates to camera yaw.

A dark 4 by 4 inner square adds contrast.

## Legend Colors

Base:

```text
Player       #0070e0
Companion    #8793a3
```

Epic Player override:

```text
#d96cff
```

Legendary Player override:

```text
#ffc43f
```

Companion dot remains:

```text
#8793a3
```

## HUD CSS

`.hud-overlay` is:

- absolute,
- inset to canvas wrapper,
- pointer-events none,
- monospaced,
- theme-aware through CSS variables.

Its children use translucent dark backing panels.

## Responsive

At narrow widths HUD font/padding shrinks.

Labels remain attached to their canvas corners.

## QA

- Compare exact legend capitalization and hyphen wording.
- Verify no redundant outer panel title/instruction returns.
- Verify right canvas has only top-left and bottom-right labels.
- Switch modes and verify footer copy updates.
- Switch themes and verify Player dot updates while Companion stays neutral.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
