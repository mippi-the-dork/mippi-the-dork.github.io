# Doug Executive Review Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Doug Executive Review Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets Doug perform an executive design review with bark-driven directives before approving the site for production.

> This page is the canonical design documentation for **Doug Executive Review Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Doug Wish makes Doug temporarily responsible for the project.

His official roles become:

- Chief Creative Officer,
- Executive Producer,
- Director of Treat Acquisition.

The joke is that the review is simultaneously absurd and uncomfortably recognizable as production feedback.

## Review Categories

Doug reviews:

- Art,
- Design,
- Engineering,
- Production,
- Morale,
- Bones.

Each category begins:

`REVIEWING...`

## Bark Directives

The review issues visible directives across the actual page.

Examples:

- MORE JUICE
- TOO MANY WORDS
- ENGINEERING LOOKS SUSPICIOUS
- BIGGER
- MORE BONES
- SHIP IT

The directives do not remain abstract.

Some temporarily change real site state.

## Temporary Effects

During review Doug can:

- enable Particle Boost,
- make the page presentation bigger,
- assume command state,
- spawn Doug Bones.

These effects give the review a mechanical presence instead of making it only an overlay.

## Gameplay Payoff

The review finishes by setting Coolness to maximum and activating Cool Mode.

That gameplay consequence persists as the meaningful reward of the sequence.

## Cleanup Philosophy

Temporary production-review state must restore what existed before the review.

If Particle Boost was already on, cleanup must not turn it off.

If Doug was already in command, cleanup must not remove command state.

This is state restoration, not blind reset.

## Final Approval

The page receives a large:

`APPROVED FOR PRODUCTION`

stamp.

The review remains visible until the player chooses:

`END EXECUTIVE REVIEW`

## Design Rules

- Doug review should affect the actual page temporarily.
- Prior mode state must be preserved.
- Review should leave Coolness maxed.
- Temporary barks and scale effects must clean up.
- Final approval remains until player closes.
- Doug remains funny but mechanically useful.

## Success Criteria

The Wish feels like Doug actually took over the production review, rather than the site merely displaying a dog-themed toast.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
