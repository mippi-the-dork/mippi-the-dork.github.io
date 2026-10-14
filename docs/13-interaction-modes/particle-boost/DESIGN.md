# Particle Boost - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Particle Boost > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds a high-density screen-space particle field and strengthens the ambient Three.js particle presentation.

> This page is the canonical design documentation for **Particle Boost** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Particle Boost is the straightforward answer to:

> What if the portfolio had more particles?

It is deliberately excessive.

The mode exists because some players enjoy turning every presentation dial up simply because the control is there.

It is not a performance optimization mode.

It is a spectacle toggle.

## Two-Layer Effect

Particle Boost affects two presentation systems.

### Screen-Space Field

Small glowing particles rise through the lower portion of the viewport.

An initial burst makes activation immediately visible.

A continuing emitter keeps the field alive.

### Ambient Three.js Scene

The full-page ambient Three.js particle system becomes:

- brighter,
- larger,
- more visible.

Additional overdrive points can also become more pronounced depending on the current rarity state.

The mode therefore feels connected to the site's existing 3D presentation instead of being only a DOM confetti layer.

## Theme Palette

Screen-space particles follow the active rarity.

### Rare

- blue,
- cyan,
- pale blue,
- white.

### Epic

- purple,
- pink,
- cyan,
- white.

### Legendary

- gold,
- orange,
- teal,
- pale gold.

## Runtime State

Particle Boost is a temporary presentation mode.

It is not persistent.

The player can toggle it repeatedly from the Console.

## Doug Wish Relationship

Doug Executive Review can temporarily force Particle Boost as part of the:

`MORE JUICE`

directive.

The Wish sequence records whether Particle Boost was already on.

Cleanup turns it off only if the Wish itself enabled it.

This protects the player's preexisting preference.

## Performance Consideration

The mode intentionally creates more DOM work.

Particles self-remove quickly.

The system uses one repeating interval rather than accumulating separate persistent emitters on every toggle.

Turning the mode off clears the interval immediately.

## Design Rules

- Immediate visible activation.
- Continuing field while enabled.
- Theme-aware palette.
- Strengthen ambient Three.js particles.
- Runtime-only.
- Turning off must stop future particle emission.
- Existing short-lived particles may finish naturally.
- Authored sequences that borrow Particle Boost must restore prior state.
- Never gate progression behind the mode.

## Success Criteria

The mode creates an obvious "more juice" transformation without leaving permanent particle emitters behind after it is disabled.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current Release Note (v2.89)

After v2.85 Particle Boost survives internally for effect sequences, but there is no longer a public `particles` Console command. This feature page describes an implementation-driven visual modifier rather than a discoverable command.
