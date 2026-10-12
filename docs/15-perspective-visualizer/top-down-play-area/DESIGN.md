# Top-Down Play Area - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Top-Down Play Area > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Shows the shared tactical world, controlled Player, AI Companion NPC, towers, active camera, and field-of-view wedge.

> This page is the canonical design documentation for **Top-Down Play Area** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The top-down panel is the explanatory half of the visualizer.

The live camera alone cannot answer:

- whose camera this is,
- where that camera is relative to the controlled character,
- whether the NPC is actually moving independently.

The tactical view makes those relationships explicit.

## Shared World

The play area contains:

- Player,
- Companion NPC,
- three tower landmarks,
- a visible grid,
- active camera icon,
- field-of-view wedge.

These objects exist in one shared world coordinate system.

Changing perspective does not move the towers into a different demonstration.

Only the camera relationship changes.

## Player Marker

The Player is shown as a colored circular marker.

Its current direction is shown with a white facing arrow.

Player color follows theme:

- Rare blue,
- Epic purple,
- Legendary gold.

The Player is draggable.

## Companion NPC Marker

The Companion NPC is shown as:

```text
neutral gray
```

with its own facing arrow.

It remains AI controlled in all three modes.

The neutral color helps prevent the visitor from confusing the NPC with the controlled Player when the current global theme changes.

## Active Camera Icon

The current camera position is marked explicitly with a small white camera square.

This is important because the second-person camera does not live on the Player.

The visualizer should never rely only on the field-of-view wedge to imply camera ownership.

## Field of View

The tactical map displays a wedge originating at the active camera.

Current angular field:

```text
68 degrees
```

Current tactical reach:

```text
255 world/canvas units
```

The wedge changes location depending on perspective:

- on Player in first person,
- on Companion NPC in second person,
- behind Player in third person.

## Third-Person Relationship Line

Third Person adds a dashed line between:

- follow camera,
- Player.

This makes the external follow relationship visually explicit.

The line is unnecessary in first person because the camera is on the Player.

It is also not used in second person because the Companion NPC marker itself already identifies the camera owner.

## Grid and Landmarks

The map uses a 40-pixel grid.

Three square tower footprints create fixed landmarks.

These are important because camera changes need static world references.

Without landmarks, the visitor would see characters moving but have less spatial evidence of what the live camera is doing.

## Drag Affordance

The canvas uses:

```text
grab
```

cursor normally and:

```text
grabbing
```

during drag.

When actively dragging, a ring appears around the Player marker.

The panel itself also draws:

```text
TOP VIEW · DRAG PLAYER
```

inside the map.

This instruction is deliberately inside the canvas rather than duplicated in surrounding panel chrome.

## Design Rules

- Keep the world coordinate relationship stable.
- Show Player and Companion simultaneously.
- Show facing direction for both.
- Always show active camera icon.
- Always show active FOV wedge.
- Show third-person follow relationship explicitly.
- Keep landmarks static.
- Player is the only draggable actor.
- Companion remains AI-driven.
- Drag instruction belongs inside the tactical view.

## Success Criteria

The visitor can glance at the map and identify all three roles independently: controlled character, AI character, and current camera.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
