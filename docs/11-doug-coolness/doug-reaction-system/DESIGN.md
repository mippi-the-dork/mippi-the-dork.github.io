# Doug Reaction System - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Reaction System > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Coordinates Doug's changing text, paw effects, image variants, offscreen responses, Console flavor, and system feedback across multiple Doug interactions.

> This page is the canonical design documentation for **Doug Reaction System** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Doug's personality should be systemic.

The same character appears in many different parts of the experience:

- About card,
- petting chain,
- achievement,
- Bones,
- Coolness,
- popup cameo,
- Shop,
- Wish branch,
- Dev Console,
- Player Model,
- Session Report.

The reaction system keeps those appearances feeling like one character instead of unrelated dog jokes.

## Reaction Sources

Doug can react to:

- direct petting,
- popup petting,
- Bone acquisition,
- maximum Coolness,
- command-state air traffic,
- Dev Console `doug`,
- Doug Executive Review Wish,
- Star Power combinations.

The response style changes, but the character identity stays consistent.

## Text Reactions

The pet chain escalates from noticing the player to production-management jokes.

This supports two design goals:

- repeated input has variation,
- Doug's eventual command state feels foreshadowed by the copy.

## Paw Particles

Paw bursts are the immediate physical feedback for petting and Bone approval.

They are lightweight and theme-aware.

They should read as feedback rather than a persistent effect.

## Image Variants

Doug uses distinct source images for:

- Rare,
- Epic,
- Legendary.

Cool Mode uses a second set of theme-specific images.

The image source itself changes instead of relying only on CSS tinting.

This preserves the intended authored photo treatment.

## Current Theme Images

Normal:

- Rare: `assets/doug.jpg`
- Epic: `assets/doug-complete.webp`
- Legendary: `assets/doug-legendary.jpg`

Cool:

- Rare: `assets/doug-cool-rare.jpg`
- Epic: `assets/doug-cool-epic.jpg`
- Legendary: `assets/doug-cool-legendary.png`

## Offscreen Continuity

When Doug is not visible, Bone collection produces the popup cameo.

The reaction system therefore keeps character feedback geographically independent from the About section.

## Console Doug

Typing:

`doug`

does not alter core progression.

It produces a random Doug status line, paw feedback, and Console flavor.

This gives Console-oriented players a character interaction without replacing the pet chain.

## Player Model Relationship

Doug petting and Bone collection are meaningful telemetry inputs.

A player who spends substantial time with Doug can push the Player Model toward the behavior archetype associated with morale and correct prioritization.

## Design Rules

- Reactions should be short.
- Repeated pets should not repeat one identical line forever.
- Visual feedback should originate from the relevant Doug surface.
- Image choice follows rarity plus Cool state.
- Offscreen feedback remains interactive.
- Console flavor should not secretly grant Best Boy.
- Doug systems should reinforce one personality across features.

## Success Criteria

Doug feels like a small systemic character woven through the portfolio rather than a static About-section photograph.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
