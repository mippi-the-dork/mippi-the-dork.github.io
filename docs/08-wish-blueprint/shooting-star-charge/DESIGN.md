# Shooting Star Charge - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Shooting Star Charge > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Introduces a catchable celestial event that grants the single-use charge required to make a Wish.

> This page is the canonical design documentation for **Shooting Star Charge** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Shooting Star is the physical bridge between Epic progression and the Wish system.

A player should not be able to make unlimited Wishes simply because they discovered the `wish` command.

The site instead treats Wishes as a consumable celestial opportunity:

1. Epic progression makes Shooting Stars possible.
2. A Shooting Star crosses the screen.
3. The player catches it.
4. The player gains one Wish charge.
5. One successful validated Wish consumes that charge.

This gives the Wish system a visible world-state prerequisite rather than making it a pure Console command.

## Discovery Philosophy

The player can learn about the Shooting Star from several directions:

- natural Epic airspace play,
- the Progression Trace HUD,
- the Hint system,
- the `stars` command,
- trying `wish` without a charge.

The Console deliberately helps create recovery.

If the player types `wish` with no charge, the system answers that "something just noticed the request" and schedules a Shooting Star shortly afterward.

This means curiosity can bootstrap the progression path without turning the star into an unlimited callable resource.

## Catchability

The Shooting Star is intentionally fast enough to feel special but slow enough to be caught.

Its lifetime can be improved through:

- Celestial Beacon,
- Slowpoke,
- Slowmo.

Celestial Beacon specifically exists to make repeat Wishes practical after the player has understood the system.

## One-Charge Limit

The charge capacity is one.

The site does not create an inventory of banked Wishes.

This keeps the progression readable:

```text
CELESTIAL CHARGE // 0 / 1
CELESTIAL CHARGE // 1 / 1
```

The player always knows whether they can make a Wish.

## First Catch

The first successful Shooting Star catch does two things:

- fills the charge,
- permanently unlocks the `wish` command concept.

This is presented as:

`SECRET COMMAND UNLOCKED`

The first catch therefore teaches both resource and destination.

## Repeat Catches

Natural stars do not normally spawn while the charge is already full.

Forced stars used by testing or other authored systems can still be caught while full, but they do not increase the cap beyond one.

## Relationship to Epic

Shooting Stars are Epic-progression content.

Their natural availability comes from completing the original Rare discovery layer.

This is progression state, not visual theme.

A player can select Rare presentation after Epic is unlocked and Shooting Stars still belong to the active game state.

## Design Rules

- Natural Shooting Stars require Epic gameplay progression.
- Only one celestial charge can be stored.
- A successful validated Wish consumes the charge.
- The intended Blueprint failure does not.
- Missing a star has low cost because another can appear.
- Natural spawn should not occur while already fully charged.
- Trying `wish` uncharged should provide a recovery path.
- Celestial Beacon improves repeat-Wish practicality.
- Shooting Stars must remain optional to professional portfolio access.

## Success Criteria

The player understands that a Shooting Star is a meaningful consumable opportunity and that catching one creates a clear next step in the Dev Console.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
