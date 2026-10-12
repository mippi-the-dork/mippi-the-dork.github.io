# Perspective Visualizer - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Visualizer > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the interactive Project Heavy Water demonstration that compares first-, second-, and third-person camera ownership using the same live tactical scene.

> This page is the canonical design documentation for **Perspective Visualizer** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Perspective Visualizer exists to make Project Heavy Water's central design premise understandable in seconds.

The project description says the game is built around second-person perspective.

That phrase is easy to misunderstand.

Rather than relying on a paragraph to define it, the visualizer lets the visitor compare all three perspective relationships in the same scene.

The core design question is:

> Who do you control, and whose eyes are you looking through?

The visualizer makes those two things independently visible.

## Comparative Structure

The same player, companion NPC, towers, and world coordinates exist in all three modes.

Only the active camera relationship changes.

This is important because it turns the visualizer into a controlled comparison.

The player is not comparing three separate scenes.

They are comparing three camera-control relationships applied to one shared scene.

## Three Modes

### First Person

The camera is player-controlled and located from the player's own character.

### Second Person

The player still controls the Player character, but the camera belongs to the Companion NPC.

The Companion NPC is AI controlled.

This is the conceptual center of the Project Heavy Water pitch.

### Third Person

The camera is player-controlled and follows from outside the Player character.

## Default Mode

The visualizer starts in:

```text
2ND PERSON
```

This is deliberate.

Project Heavy Water is the second-person project.

The familiar first- and third-person modes are present as comparison anchors.

The visitor lands on the unusual relationship first, then can switch outward to the familiar cases.

## Dual-Panel Layout

The visualizer uses two synchronized panels.

### Left

A top-down tactical representation.

It explains:

- where the Player is,
- where the Companion NPC is,
- where the active camera is,
- where the camera is facing,
- what the camera field of view covers.

### Right

A live rendered camera view.

It shows the world from the selected camera source.

The two panels update continuously together.

This is the main explanatory device.

The left panel explains the abstract camera ownership.

The right panel shows the actual consequence.

## Player Interaction

The visitor drags the Player on the top-down map.

Moving the Player changes:

- Player position,
- Player facing direction,
- the camera in first person,
- the followed camera position in third person,
- the target the Companion NPC looks toward,
- the live perspective view.

The Companion NPC continues moving independently.

This creates a real second-person condition.

The player-controlled character is not the camera owner.

## Dependency-Free Presentation

The visualizer deliberately does not use Three.js or an external 3D library.

It is a self-contained Canvas 2D demonstration.

That makes it more robust than a heavier scene and ensures the Heavy Water explanation does not disappear if the site's decorative 3D runtime fails.

This is especially valuable because the visualizer is professional project communication, not only decoration.

## Achievement Relationship

Any deliberate perspective-mode button press dispatches the perspective-change event used by the existing Rare achievement:

`Second Perspective`

The 2nd Person button remains the conceptual center of the demonstration, but the achievement is about intentionally using the visualizer rather than guessing one required button.

## Theme Integration

The visualizer follows all three site rarity themes.

The content remains semantically the same, but:

- Player color,
- field-of-view wedge,
- tower palette,
- grid,
- floor,
- active button treatment

adapt to the current theme.

The Companion NPC remains a neutral gray to preserve the distinction between controlled Player and AI companion.

## Responsive Layout

At wide sizes, tactical map and live camera are side by side.

At narrower widths, they stack vertically.

This preserves the comparison without making either canvas unreadably small.

## Interaction Mode Relationship

When ordinary portfolio interaction is suppressed through Interact Mode, the Perspective Visualizer canvases stop receiving pointer input.

This is intentional.

The visualizer is professional portfolio content, not a game-layer pickup.

## Design Rules

- Default to 2nd Person.
- Use one shared world for all three modes.
- Keep controlled character and camera owner visually distinct.
- The Companion NPC must continue moving in every mode.
- Player drag must update both panels live.
- Tactical map must show active camera source and field of view.
- Live view must reflect the same camera state.
- Visualizer must not depend on Three.js.
- Any user-selected perspective mode can trigger the discovery achievement.
- Theme changes affect presentation, not camera semantics.
- Responsive layout can stack, but must preserve both views.
- Interact Mode can disable the professional visualizer without affecting game-layer interactions elsewhere.

## Success Criteria

A visitor who has never heard the term second-person camera can switch among the three modes and understand why Heavy Water's camera relationship is different.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
