# Grand Tour - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Grand Tour > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards visiting all six major professional sections of the portfolio.

> This page is the canonical design documentation for **Grand Tour** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Grand Tour is the postgame achievement most directly tied to the professional portfolio.

It asks the player to actually visit the whole body of work.

The six sections are:

- Games
- Career
- Consulting
- Crafting Play
- Tools
- About

## Condition Philosophy

A section visit means the section meaningfully entered the viewport.

The player does not need to click every card.

The achievement is about broad professional exposure, not exhaustive reading analytics.

## Design Rules

- Hero is not one of the six.
- External links are not required.
- No game interaction inside a section is required.
- Persistent section history should count across reload.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
