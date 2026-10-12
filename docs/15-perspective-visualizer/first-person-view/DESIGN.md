# First-Person View - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > First-Person View > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places the active camera on the player-controlled character and uses the Player's facing direction for a conventional first-person reference.

> This page is the canonical design documentation for **First-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

First Person is the familiar reference case.

It exists so the visitor can compare the second-person relationship against something they already understand.

The defining rule is:

> You control the character, and the camera comes from that character's perspective.

## Camera Ownership

Both control and camera belong to the Player.

This creates the simplest relationship in the demo.

On the tactical map:

- active camera icon overlaps the Player,
- field-of-view wedge originates from the Player.

In the live camera:

- the Player body is hidden,
- the Companion NPC can be visible.

## Why Hide the Player Body

The live view represents an eye-level first-person camera.

Rendering the same full Player cuboid directly in front of that camera would create an incorrect self-body artifact.

The visualizer therefore does not render the Player character in first person.

## Facing from Drag

Dragging the Player changes the Player's target yaw based on movement direction.

The camera follows the smoothed Player yaw.

This means the visitor controls both:

- Player position,
- first-person view orientation

through the same drag action.

## Faster Turning

First Person uses a faster turn response than second and third person.

This was a deliberate tuning change.

A first-person camera feels unusually sluggish when it inherits the slower follow-style rotation used by the other two modes.

The current first-person turn is still smoothed but reacts more quickly.

## Comparison Role

First Person is not the main Heavy Water pitch.

It is a control condition.

It lets the visitor establish:

```text
Player control + Player camera
```

before or after comparing:

```text
Player control + NPC camera
```

in 2nd Person.

## Description

Player-facing text:

```text
The camera is Player Controlled from your character's perspective.
```

## Design Rules

- Camera position equals Player position.
- Camera yaw equals Player yaw.
- Camera height is eye-level.
- Player body is not rendered in first-person live view.
- Companion NPC remains visible when in camera view.
- Turning responds faster than the other modes.
- Player movement remains drag-controlled.

## Success Criteria

The first-person mode feels immediately familiar and gives the visitor a clean baseline for understanding what second person changes.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
