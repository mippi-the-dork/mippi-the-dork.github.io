# About 3D Scene - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > About 3D Scene > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the dedicated interactive 3D presentation used in the About section.

> This page is the canonical design documentation for **About 3D Scene** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The About scene gives the last major professional section its own sense of motion without turning it into a second Hero.

It should communicate:

`EXPERIENCE // STILL IN MOTION`

The concept is that 25+ years of experience is not presented as a static endpoint.

The scene supports the idea that learning, making, and toolbuilding continue.

## Visual Role

The About scene lives inside the left callout panel.

The dominant professional content remains:

- 25+ years,
- game development,
- external profile links,
- Doug.

The 3D layer is supporting atmosphere.

It should never obscure the years callout.

## Composition

The scene uses a smaller abstract orbital system:

- two torus rings,
- four geometric nodes,
- particle field.

The motion is lighter and more compact than the Hero.

The root is offset to the right so the 25+ years copy has room.

## Theme Progression

Like the Hero and Ambient layers, About responds to rarity.

### Rare

Blue technical motion.

### Epic

Purple, pink, and cyan.

Motion and particle emphasis increase.

### Legendary

Gold and teal.

The scene remains recognizably the same composition rather than introducing another completely new system.

## Static Watermark

A very low-opacity Mippi logo remains in the About callout.

This supports the visual identity even if Three.js does not initialize.

## Interaction

The About scene does not accept pointer input.

It is intentionally presentation-only.

This prevents it from competing with:

- About links,
- Doug interaction,
- page scrolling.

## Performance Rule

The About scene must remain lighter than the Hero.

The page comment explicitly calls out that running two full-weight scenes would be the wrong performance tradeoff.

The scene therefore uses:

- low-power renderer preference,
- small geometry set,
- modest particle count,
- no raycasting,
- no interactive input listeners.

## Success Criteria

The About scene succeeds when the section feels visually connected to the rest of the site while still reading primarily as professional and personal content.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
