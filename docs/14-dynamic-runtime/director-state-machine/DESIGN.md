# Director State Machine - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Director State Machine > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Classifies the current session into Quiet, Curious, Engaged, Struggling, or Mastery and uses hysteresis to prevent rapid state flipping.

> This page is the canonical design documentation for **Director State Machine** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Adaptive pacing only works if the classification is stable.

A player can:

- collect one pickup,
- miss the next,
- open a resume,
- fight a UFO,
- read for a minute.

If the Director changed state on every action, the site's pacing would oscillate constantly.

The state machine therefore asks two questions:

1. What state currently fits the session?
2. Has that state remained appropriate long enough to justify changing pacing?

## Five States

### Quiet

For visitors primarily reading professional content or spending significant time with almost no game engagement.

Goal:

- reduce interruption.

### Curious

The baseline.

For visitors who are exploring but have not shown a strong pattern yet.

Goal:

- preserve authored default pacing.

### Engaged

For active game-layer participation.

Goal:

- modestly increase opportunity cadence.

### Struggling

For players who have actually attempted systems and are repeatedly missing.

Goal:

- increase generosity.

Crucially, ignoring an object does not immediately mean struggling.

There must be evidence of participation.

### Mastery

For sustained high engagement with strong collection or arcade performance.

Goal:

- increase pace modestly,
- slightly tighten target windows,
- increase arcade pressure.

Rewards do not increase.

## Struggle Is Not Disinterest

This is the most important classification principle.

A professional visitor who ignores all flying objects is not "bad at the game."

The Director should make the site quieter for them, not enter accessibility assistance because they never intended to play.

Struggling therefore requires:

- real game engagement,
- at least some successful interaction,
- enough natural attempts,
- a low success rate.

## Hysteresis

A new candidate state must remain the classification result for about nine seconds.

The current state must also have existed for at least about fourteen seconds.

Both conditions are required before transition.

This creates a stable pacing identity.

## Design Rules

- Curious is the fallback.
- Quiet can represent professional reading, not failure.
- Struggling requires attempts.
- Mastery requires both engagement and performance.
- No instant transition on one event.
- State can move in either direction later.
- State is session behavior, not player identity.

## Success Criteria

The Director adapts slowly enough that the player experiences coherent pacing rather than invisible difficulty flicker.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
