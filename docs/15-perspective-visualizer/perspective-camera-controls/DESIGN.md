# Perspective Camera Controls - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Camera Controls > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Implements Player dragging, filtered facing rotation, autonomous Companion motion, mode switching, and the camera calculations that keep both canvases synchronized.

> This page is the canonical design documentation for **Perspective Camera Controls** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The visualizer uses intentionally simple controls.

The visitor should not need to learn:

- WASD,
- mouse-look,
- camera orbit keys,
- gamepad mappings.

There is one physical interaction:

> drag the Player.

There is one conceptual interaction:

> choose who owns the camera.

Everything else is automated.

## Dragging the Player

The visitor begins a drag only by pressing near the Player marker.

Clicking elsewhere on the tactical map does not teleport the Player.

This keeps the interaction readable.

The Player follows the pointer while preserving the initial grab offset.

## Facing from Motion

Player facing comes from drag movement direction.

The visualizer does not rotate the Player to point directly toward the pointer's absolute position.

It looks at movement velocity.

This makes the result feel like character movement rather than a turret aiming at the mouse.

## Jitter Filtering

Raw pointer movement is noisy.

Tiny pointer corrections should not make the Player and camera shake.

The visualizer filters movement velocity over a short interval.

Only sufficiently large filtered motion updates target yaw.

This makes the demonstration much easier to read.

## Smoothed Rotation

Player yaw does not snap to target yaw.

The runtime:

- calculates shortest angular difference,
- eases toward the target,
- caps maximum angular change per frame.

First Person uses a faster response.

Second and Third use a slower readable follow response.

## Autonomous Companion

The Companion NPC continuously walks a circle.

Its path does not stop when the visitor changes perspective.

The Companion also rotates toward the Player.

This is essential to the second-person comparison.

The camera owner behaves independently of the player's direct input.

## Mode Buttons

Three buttons select:

- 1ST PERSON,
- 2ND PERSON,
- 3RD PERSON.

They are real HTML buttons with `aria-pressed`.

Mode switching does not reset:

- Player position,
- Player yaw,
- Companion path.

The visitor can therefore change perspective mid-motion and compare the same exact world state.

## Pointer Capture

During drag, the tactical canvas captures the pointer.

This keeps dragging stable if the pointer moves rapidly or temporarily leaves the Player marker while the drag is active.

## Camera Model

All modes are yaw-only.

There is no camera:

- pitch,
- roll,
- zoom input.

This is intentional.

The visualizer is explaining ownership and perspective, not building a general-purpose camera editor.

## Projection

The right panel is a small custom perspective renderer.

It projects simple 3D cuboids and characters into Canvas 2D.

That gives the demonstration real camera-space behavior without external dependencies.

## Design Rules

- Drag Player only from near Player marker.
- Do not teleport on arbitrary map click.
- Preserve pointer grab offset.
- Derive facing from movement velocity.
- Filter pointer jitter.
- Use shortest-arc smoothed rotation.
- First Person rotates faster.
- Companion path is autonomous and continuous.
- Mode switching preserves world state.
- No pitch or roll.
- No camera-control complexity beyond what is necessary to explain perspective.

## Success Criteria

The controls disappear as a problem and the visitor spends their attention comparing camera ownership instead of learning a mini editor.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
