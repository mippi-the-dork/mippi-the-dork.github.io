# Motion Policy - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Motion Policy > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines which motion is gameplay-critical and establishes that browser or operating-system reduced-motion preferences do not silently disable the site's playable layer.

> This page is the canonical design documentation for **Motion Policy** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Decision

The portfolio intentionally does **not** change its playable behavior based on the operating system or browser `prefers-reduced-motion` preference.

This is a deliberate current product decision.

## Why

Motion is not only decoration in this experience. It is used as:

- gameplay,
- timing,
- opportunity presentation,
- navigation feedback,
- combat behavior,
- progression signaling.

Earlier reduced-motion behavior could silently remove or suppress important systems. A visitor could enter a state where the site offered less playable content without explaining why.

Examples of systems that depend on motion include:

- ambient particles,
- flying pickups,
- UFO encounters,
- Shooting Stars,
- Doug Bones,
- Dynamic Optional Objective opportunities,
- Hero scene movement,
- About scene movement,
- cursor and combat effects.

Silently disabling those systems creates an accessibility problem of its own because progression can become confusing or unavailable.

## Replacement Philosophy

Pacing changes should be explicit and understandable inside the site.

Current authored alternatives include:

- `slowmo` for slower timing,
- `easy mode` for increased opportunities,
- the Adaptive Director for lower or higher interruption density,
- player-controlled Interact Mode,
- voluntary exit from focused encounters.

If a future Quiet or Presentation mode is introduced, it should be visible, reversible, and described in the site.

## Design Rules

- OS/browser reduced-motion settings do not alter core gameplay.
- A hidden external preference must not make achievements or progression impossible.
- Player-facing pacing controls should clearly communicate what they change.
- Decorative motion should still be reviewed for readability and comfort even when it is not automatically suppressed.
- New motion-heavy systems should provide an authored exit if they take over attention.
- Motion should never be required to access basic professional information.

## Accessibility Note

This policy is not a claim that motion sensitivity is unimportant.

It is a statement that the current site treats motion as functional gameplay and therefore avoids silently disabling it through a browser preference that the game systems cannot explain.

A future dedicated motion-accessibility mode should be designed as a coherent in-site system, not as scattered CSS suppression.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
