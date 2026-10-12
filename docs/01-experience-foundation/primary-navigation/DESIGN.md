# Primary Navigation - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Primary Navigation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides direct navigation between the six major portfolio sections while remaining compatible with the site game layer.

> This page is the canonical design documentation for **Primary Navigation** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Primary navigation is the professional escape hatch. No matter how elaborate the hidden systems become, a visitor must always have a conventional way to reach the main work.

The navigation therefore avoids game-specific terminology and uses direct section names.

## Destinations

The six primary destinations are:

1. Games
2. Career
3. Consulting
4. Crafting Play
5. Tools
6. About

These labels mirror the major page sections and do not change based on progression.

## Design Rules

- Primary navigation is always professional-first.
- Game progression must not remove or rename navigation destinations.
- Theme changes may restyle navigation but not change its structure.
- Navigation must not require Three.js.
- Hero signal navigation may duplicate these destinations, but never replace them.
- The navigation should close itself after a destination is selected on compact layouts.
- Links should remain recognizable as navigation rather than being disguised as game UI.

## Desktop Behavior

At desktop widths the six links remain visible in the sticky header.

The visual treatment is deliberately quiet so the header does not compete with the Hero.

Hover and keyboard focus increase contrast and add a subtle border/background.

## Compact Behavior

At narrower widths the six links collapse behind a Menu button.

The Menu button must:

- clearly indicate that it opens navigation,
- update its expanded state for assistive technology,
- reveal full-width tap targets,
- close after a destination is selected.

## Relationship to the Game Layer

Some systems can temporarily suppress ordinary portfolio interaction, such as Interact Mode or focused encounters. Those systems may temporarily affect navigation clickability, but they do not alter the navigation information architecture.

The Super Boss can temporarily own interaction state, but the navigation returns to normal after the encounter.

## Success Criteria

A first-time professional visitor should be able to ignore every game mechanic and still navigate the site without explanation.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
