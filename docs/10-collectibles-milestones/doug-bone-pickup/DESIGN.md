# Doug Bone Pickup - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Doug Bone Pickup > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Feeds the Doug Coolness progression and can trigger special Doug responses and system combinations.

> This page is the canonical design documentation for **Doug Bone Pickup** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Doug Bones are the recurring collectible for the morale progression system.

They become available only after Doug assumes command.

That prerequisite makes them feel like a consequence of deeper Doug interaction rather than another generic pickup.

## Base Reward

A normal Bone grants:

```text
+25 Coolness
```

Four normal Bones can therefore fill an empty Coolness meter.

## Star Power Reward

Collecting a Bone during Star Power grants:

```text
+50 Coolness
```

and discovers the:

`Star Power + Doug`

system combo.

## Cool Mode

When Coolness reaches 100:

- Doug enters Cool Mode,
- Bone visuals can become more energetic,
- the player receives a dedicated Cool Mode payoff.

Doug Coolness itself is documented in the Doug category.

The Bone is the main ambient fuel for that system.

## Doug Response

After collection, Doug reacts.

If Doug is currently visible:

- the main Doug card reacts,
- paw effects can burst around him.

If Doug is offscreen:

- a small Doug peek appears.

This ensures Bone feedback stays connected to the character regardless of scroll position.

## Bone Presentation

Bones use their own bone silhouette.

When Doug is in the special star-cool state, active Bones can gain:

- cool-bone class,
- rainbow trail particles.

The collectible itself therefore reflects Doug's current state.

## Natural Availability

Bones only naturally spawn while Doug is in command.

Dog Whistle makes them more frequent.

Easy Mode can make them more frequent again.

## Persistence

Bone count is tracked in session telemetry.

Coolness progress is session-scoped.

Historical max Coolness for postgame is stored separately.

The ambient Bone loop itself is therefore more session-oriented than Hearts or Castle progress.

## Design Rules

- No natural Bone before Doug command.
- Normal Bone grants 25 Coolness.
- Star-powered Bone grants 50.
- Dog Whistle changes cadence, not value.
- Doug reaction appears on or off screen.
- Bone miss has low cost.
- Bone continues to use shared flight timing modifiers.
- Star-powered Bone can trigger a one-time system combo.

## Success Criteria

Bones make Doug feel like an active game system and give players a visible route toward the Coolness payoff.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
