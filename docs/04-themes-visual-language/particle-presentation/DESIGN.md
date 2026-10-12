# Particle Presentation - Design Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Particle Presentation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the optional screen-space and event-driven particle treatments used to reinforce milestones and playful console effects.

> This page is the canonical design documentation for **Particle Presentation** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Particles are presentation spice.

They exist to:

- celebrate,
- reinforce theme,
- make special console states feel systemic,
- add movement to authored moments,
- give progression events visible texture.

They should not become constant visual noise.

## Particle Families

The site uses several particle approaches.

### Three.js Scene Particles

Hero, Ambient, and About scenes include their own point fields.

These are part of the 3D presentation layer.

### Command Particle Field

The `particles` console command enables a screen-space DOM particle field.

This is deliberately excessive compared with the normal page.

It is a toy and presentation modifier.

### Cursor Sparks

Epic completion presentation can create cursor-adjacent spark effects.

### Doug Particles

Doug systems can spawn paw and rainbow-particle effects.

### Castle Fireworks

Castle completion uses a celebratory burst.

Particle size was intentionally increased so the event is noticeable without increasing the number of particles.

### Wish / Finale / Event Effects

Selected authored sequences can use temporary particles or pulses as part of their presentation.

## Theme Identity

Particle palettes follow the active page theme.

Rare:

- blue,
- cyan,
- pale blue,
- white.

Epic:

- violet,
- hot pink,
- cyan,
- white.

Legendary:

- gold,
- orange,
- teal,
- pale gold.

This lets a temporary particle event feel like it belongs to the current world state.

## Density Philosophy

More particles are not always better.

The Castle fireworks change demonstrates the intended approach:

> improve readability through particle size before automatically increasing particle count.

This helps control both performance and visual clutter.

## Particle Boost

The Console `particles` command intentionally increases activity.

The state is reversible.

It should feel like a knowingly excessive visual mode rather than the normal baseline.

The Ambient Three.js layer can also respond to Particle Boost so the effect is not limited to DOM particles.

## Interaction Rule

Particles are visual.

They should generally use:

```text
pointer-events: none
```

and should never obstruct the user's ability to click professional content.

## Motion Policy

The current portfolio does not silently disable particles based on operating-system reduced-motion preference because the site treats motion as an authored gameplay/presentation layer.

If a dedicated in-site motion-accessibility mode is introduced later, particle behavior should be designed explicitly as part of that system.

## Design Rules

- Use particles to reinforce meaningful state.
- Keep normal particle density lower than special-event density.
- Prefer larger readable particles before multiplying count.
- Follow current theme palette.
- Do not intercept input.
- Remove temporary particles after their animation.
- Avoid creating unbounded particle DOM growth.
- Particle Boost should be reversible and obvious.

## Success Criteria

Particles make special moments feel richer without reducing the readability or usability of the professional page.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
