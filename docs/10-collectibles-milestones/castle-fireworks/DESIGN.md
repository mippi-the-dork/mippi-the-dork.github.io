# Castle Fireworks - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Fireworks > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the Castle reward celebration using larger particles for readability without increasing particle count.

> This page is the canonical design documentation for **Castle Fireworks** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Castle fireworks are the visual payoff for repeating the Key and Castle joke four times.

The celebration should read across the viewport.

A previous version made the event more noticeable by increasing particle quantity.

The improved approach is to make each burst larger while keeping the overall burst count under control.

This improves readability without turning the page into unnecessary particle spam.

## Composition

The reward uses five burst locations spread across the upper-middle viewport.

The bursts fire in sequence rather than simultaneously.

This creates a short left-to-right celebration.

## Reward Pairing

Fireworks are paired with:

```text
+3 Rupees
```

The visual reward and economy reward happen together when the player claims the Castle meter.

## Player Control

Fireworks only occur after explicit claim.

They do not fire at the instant the fourth Castle is checked.

## Particle Philosophy

The design rule is:

> Prefer bigger readable particles before adding more particles.

This helps:

- performance,
- visual clarity,
- attention control.

## Design Rules

- Five burst origins.
- Sequential timing.
- Larger particle pixels.
- Do not increase burst count merely for intensity.
- Fireworks remain visual and noninteractive.
- Pair with Castle reward claim.

## Success Criteria

The Castle claim feels like a real celebration and is visible even on a large monitor without overwhelming the rest of the site.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current Release Note (v2.89)

Castle still requires the 4/4 meter claim. v2.81 adds nine bursts of 33px particles and ~1 second collection of existing airborne friendly rewards; v2.82 widens the fireworks with ~2150ms lifetime. No UFOs/Bosses/newly spawning items are auto-collected. Three Rupees still award separately.
