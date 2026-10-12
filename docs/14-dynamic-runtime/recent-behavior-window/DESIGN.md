# Recent Behavior Window - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Recent Behavior Window > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds a four-minute recency-weighted layer to Player Model scoring so later behavior can meaningfully change the current archetype.

> This page is the canonical design documentation for **Recent Behavior Window** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The original Player Model behaved too much like a lifetime scoreboard.

If the player spent the first ten minutes reading professionally, then spent the next ten minutes deeply using the Console and arcade systems, the Professional score already had so much accumulated history that the model could become slow to change.

That undermined the promise that this was a model of current session behavior.

The Recent Behavior Window fixes that.

## Four-Minute Window

The model looks at meaningful timeline events from the last:

```text
4 minutes
```

Recent events contribute strong archetype momentum.

Older events still matter through cumulative session counters.

They simply stop receiving the extra recency bonus.

## Age Weighting

A brand-new event receives full recent weight.

An event approaching four minutes old still contributes some momentum, but much less.

This creates a smooth fade rather than a hard cliff at the four-minute boundary.

## Mutable Identity

The intended result is that a player can genuinely move through labels.

Example:

```text
PROFESSIONAL
-> EXPLORER
-> TINKERER
-> ARCADE RAT
```

if the way they use the site changes.

The model does not need to preserve the first label out of loyalty.

## Event Semantics

The recent window uses meaningful event types, not raw clicks.

Examples:

### Explorer

- section first visit,
- Hero Signal,
- Inspect target,
- Castle check.

### Professional

- section first visit,
- external link.

### Completionist

- achievement,
- objective completion,
- Heart.

### Tinkerer

- Console,
- Inspect/Design modes,
- Blueprint,
- theme changes,
- valid/invalid commands.

### Arcade

- UFO/Boss collection,
- Boss wins,
- Mippi Bird.

### Correct

- Doug interaction,
- petting,
- Cool Mode.

### Speedrunner / Chaos

- hidden commands,
- God Mode,
- Easy Mode,
- Cheat.

## Design Rules

- Four-minute window.
- Recent events receive stronger momentum.
- Older cumulative behavior still matters.
- Weight decays smoothly with age.
- Meaningful events only, not raw click spam.
- The model should be able to change labels in one session.
- Stats explicitly tells the player the model can change.

## Success Criteria

The Player Model describes how the player has been behaving lately instead of becoming permanently anchored to the first phase of the session.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
