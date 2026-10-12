# Second-Person View - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Second-Person View > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps the Player under user control while moving the active camera onto an independently AI-controlled Companion NPC.

> This page is the canonical design documentation for **Second-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Second Person is the conceptual reason the visualizer exists.

The defining relationship is:

> You control one character, but you see through another character's perspective.

For Project Heavy Water, that camera owner is an NPC.

The player-controlled character and the camera source are intentionally different entities.

## Control Ownership

The visitor still drags:

`PLAYER`

The Companion NPC continues to move under its own AI behavior.

This matters.

If the visitor were directly moving the Companion camera, the demo would collapse back into a player-controlled camera system.

The second-person relationship depends on preserving the split:

```text
Player controls Player
AI controls Companion/camera
```

## Camera Ownership

In 2nd Person:

- camera X/Z comes from Companion NPC,
- camera yaw comes from Companion NPC,
- camera height remains eye-level.

The tactical FOV wedge therefore follows the moving Companion.

## Companion Orientation

The Companion continuously rotates to look toward the Player.

As the Player moves:

- the camera's view changes,
- the camera owner continues its path,
- the visitor has to understand the controlled character through someone else's moving viewpoint.

That is the Heavy Water design premise in miniature.

## Live Character Visibility

Because the camera is inside the Companion NPC:

- Companion body is hidden from the live view,
- Player body is rendered.

This is the inverse of the first-person visibility rule.

The player literally sees their own controlled character from another character's perspective.

## Default Mode

Second Person is the default mode on page load.

The button is active in the initial HTML and synchronized again in JavaScript.

The Project Heavy Water presentation therefore opens directly on its defining camera relationship.

## AI Motion

The Companion follows a continuous circular path.

This prevents the second-person view from behaving like a stationary security camera.

The moving viewpoint is a better representation of the intended gameplay problem:

- the player must act while camera framing belongs to someone else.

## Description

Player-facing text:

```text
The camera is NPC Controlled from that character's perspective.
```

## Achievement

The existing achievement is named:

`Second Perspective`

Any deliberate perspective selection can unlock it, but selecting 2nd Person remains the thematic center.

This avoids turning the demonstration into a hidden-button puzzle.

## Design Rules

- User controls Player only.
- Companion movement remains autonomous.
- Camera is attached to Companion.
- Companion looks toward Player.
- Player body is visible in live camera.
- Companion body is hidden in live camera.
- 2nd Person remains default.
- The mode must make camera ownership legible in both panels.

## Success Criteria

The visitor clearly understands that second person means controlling a character while the camera belongs to another character.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
