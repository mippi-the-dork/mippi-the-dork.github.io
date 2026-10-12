# Third-Person View - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Third-Person View > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places a player-controlled follow camera behind the Player to provide the familiar external-camera comparison case.

> This page is the canonical design documentation for **Third-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Third Person is the second familiar reference mode.

It demonstrates:

> You still control the Player, and the camera is still yours, but the camera is outside the character.

This matters because second person can otherwise be mistaken for:

`third person, but farther away`

The tactical view makes the difference explicit.

Third Person camera follows the Player.

Second Person camera belongs to the NPC.

## Follow Relationship

The third-person camera sits behind the Player based on current Player yaw.

As the Player rotates, the camera rotates around with the same orientation relationship.

The camera is therefore mechanically attached to the controlled character.

## Camera Height

Third Person uses a slightly higher camera:

```text
Y = 72
```

compared with the 61-unit eye-level cameras used by First and Second Person.

This helps the external perspective read more naturally.

## Follow Distance

Current back distance:

```text
110 world units
```

This is enough to show the Player body clearly without making the camera so distant that the comparison becomes an overhead view.

## Tactical Relationship Line

The top-down map draws a dashed line from:

- third-person camera,
- Player.

This is unique to 3rd Person.

It visually says:

> this camera follows this character.

That relationship line is one of the simplest ways to contrast third-person camera ownership with second person.

## Live Visibility

Third Person renders both:

- Player,
- Companion NPC

when they are inside the camera frustum.

This reinforces that the active camera belongs to neither visible body.

It is an external player-controlled viewpoint.

## Shared Facing

The camera yaw equals Player yaw.

Dragging the Player changes target facing.

The camera follows the smoothed Player orientation.

## Description

Player-facing text:

```text
The camera is Player Controlled from outside of your character's perspective.
```

## Design Rules

- Camera belongs to Player, not NPC.
- Camera sits behind Player.
- Camera is slightly elevated.
- Camera yaw follows Player yaw.
- Player remains visible.
- Companion remains visible when in frame.
- Tactical map shows camera-to-Player relationship line.
- Follow offset stays consistent as Player rotates.

## Success Criteria

The visitor sees that third person still has player-owned camera control, which makes the ownership difference in second person unmistakable.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
