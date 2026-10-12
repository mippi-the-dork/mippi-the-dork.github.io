# Ambient 3D Layer - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Ambient 3D Layer > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds supporting ambient 3D motion and depth outside the primary hero interaction.

> This page is the canonical design documentation for **Ambient 3D Layer** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Ambient 3D Layer makes the site feel like one continuous interactive system instead of a static page with a single isolated 3D demo at the top.

It should remain subtle.

The ambient layer is not a background video and not a gameplay surface.

Its job is to provide:

- depth,
- motion,
- rarity atmosphere,
- continuity between sections.

## Presentation Priority

The ambient layer is intentionally lower priority than:

- professional text,
- navigation,
- Hero interaction,
- progression HUD,
- modal events.

It sits behind the page content and never receives pointer input.

If a visitor explicitly notices the ambient layer, that is acceptable, but it should not make reading harder.

## Rare Presentation

Rare uses restrained blue particles and wireframe objects.

Motion is slow.

The layer should feel technical and atmospheric rather than celebratory.

## Epic Presentation

Epic increases visual energy.

Changes include:

- purple and pink signal colors,
- more visible overdrive particles,
- stronger motion,
- stronger mouse response.

This makes Epic feel like the site has entered an overdrive state.

## Legendary Presentation

Legendary shifts toward:

- gold,
- amber,
- teal.

The layer should feel materially upgraded while staying behind content.

## Particle Boost

The Dev Console particle effect can temporarily increase ambient visibility.

The ambient layer is a natural place for that effect because it can make the whole site feel more active without adding new DOM particles everywhere.

## Scroll and Pointer Response

The ambient root responds subtly to scroll position.

In higher rarity states it can also react more visibly to pointer position.

These effects create continuity between the visitor's movement and the background without turning the layer into a control.

## Interaction Rule

The ambient canvas is permanently noninteractive.

It must never intercept:

- links,
- buttons,
- text selection,
- game pickups,
- console controls.

## Performance Rule

The ambient layer uses a lower-power renderer configuration than the Hero.

It avoids antialiasing and clamps pixel ratio aggressively.

The visual design accepts lower fidelity because the canvas is deliberately low-opacity and behind content.

## Success Criteria

The ambient layer succeeds when the page feels more alive without making the visitor think they need to interact with the background.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
