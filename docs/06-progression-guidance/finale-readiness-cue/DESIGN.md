# Finale Readiness Cue - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Finale Readiness Cue > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Mippi header identity glow when the normal Finale is ready to be started.

> This page is the canonical design documentation for **Finale Readiness Cue** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The normal Finale should not begin automatically.

The player should choose when to enter the ending.

The Mippi header logo becomes the invitation.

This works because the logo is already a learned interactive surface from Curious Mind.

The system reuses an interaction the player already understands.

## Readiness Meaning

The glow means:

> You have done enough to see the ending.

It does not mean:

> You have completed everything.

That distinction is central to the site's ending structure.

## Broad Finale Requirements

The normal Finale currently requires broad engagement across several systems, including:

- all 10 original Signals,
- Legendary unlocked,
- at least one successful validated Wish,
- at least one UFO Boss defeat,
- five-Heart reward completed,
- at least one Shop item owned,
- at least five of six major sections visited.

This is deliberately less demanding than postgame mastery.

## Player Control

When the glow appears:

- nothing auto-opens,
- scrolling remains available,
- the player can continue exploring,
- clicking the Mippi mark begins the Finale.

## Attention Budget

The cue should not appear at the worst possible moment.

If a major overlay or encounter currently owns attention, the Finale cue can wait until the page is calm enough.

This avoids stacking the ending invitation on top of:

- Wish result,
- Boss encounter,
- Shop,
- other high-attention states.

## Theme Behavior

The cue must work in:

- Rare,
- Epic,
- Legendary.

Legendary requires explicit gold/teal treatment.

A previous regression made the cue effectively disappear in Legendary, so parity across themes is a release requirement.

## Design Rules

- Finale never auto-starts.
- Cue only appears when eligibility is complete.
- Cue remains available until Finale begins.
- Cue works in every theme.
- Logo click starts Finale when ready.
- Early Curious Mind behavior no longer takes priority once Finale-ready.
- Postgame mastery is not required.

## Success Criteria

The player notices that the site has an ending available and can deliberately choose when to enter it.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
