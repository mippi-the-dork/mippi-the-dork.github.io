# Hero Signal Navigation - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Hero Signal Navigation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns hero-scene 3D objects into navigational signals that jump to meaningful portfolio sections.

> This page is the canonical design documentation for **Hero Signal Navigation** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Hero Signal Navigation turns the opening 3D scene from visual decoration into useful spatial navigation.

It is one of the clearest examples of the site's additive-play principle:

- conventional navigation remains available,
- Hero buttons remain available,
- the 3D scene offers a playful third route.

A visitor should never be forced to understand raycasting in order to reach the work.

## Current Destinations

The Hero contains four navigational Signals:

- Games
- Career
- Consulting
- Unreal Tools

These are chosen because they represent broad professional destinations.

The Hero does not contain all six primary navigation destinations.

About and Crafting Play remain available through standard navigation.

This prevents the opening scene from becoming cluttered.

## Hover Communication

Hovering a Signal should clearly communicate that it is interactive.

Current feedback includes:

- mesh scale increase,
- pointer cursor,
- scene readout text.

Examples:

`GAMES // CLICK TO JUMP`

`CAREER // CLICK TO JUMP`

This is important because an abstract geometric mesh does not naturally communicate "link."

## Click Behavior

Clicking a Signal:

1. records the interaction,
2. awards the Rare achievement `Signal Acquired`,
3. smoothly scrolls to the linked section.

The navigation itself remains useful after the achievement has already been earned.

## Achievement Design

`Signal Acquired` teaches an important rule:

> the Three.js scene is functional.

This achievement is therefore both reward and onboarding.

The achievement is not attached to a random hidden object. It is attached to a meaningful interaction the user may naturally try.

## Interact Mode

When Interact Mode suppresses normal portfolio interactions, Hero navigation should also be suppressed.

The 3D Signal meshes are navigation, not game-layer targets.

This keeps the mode's meaning consistent with ordinary links and buttons.

## Drag vs Click

The scene supports drag rotation and click navigation on the same canvas.

The intended user model is:

- drag anywhere to rotate,
- hover a node,
- release/click over a node to navigate.

The system should avoid making small pointer movement feel like an accidental navigation when possible.

The current implementation does not use a dedicated drag-distance threshold, so this remains a QA edge case.

## Redundancy Rule

Hero Signal Navigation must always remain redundant with normal HTML navigation.

If raycasting, WebGL, pointer input, or the entire scene fails, the visitor can still use:

- header navigation,
- Explore Work,
- normal section anchors.

## Success Criteria

A curious visitor should be rewarded for interacting with the scene, but a recruiter should never need to interact with it.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
