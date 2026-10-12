# Player Model Confidence - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Player Model Confidence > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents the Player Model from claiming certainty before enough evidence exists and supports hybrid labels when the top two archetypes remain close.

> This page is the canonical design documentation for **Player Model Confidence** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

A playful classification system can become irritating if it announces a confident conclusion after three clicks.

Confidence exists to keep the model honest.

The model should be able to say:

`FORMING`

for as long as the session does not contain enough evidence.

Once enough evidence exists, confidence should represent:

- amount of behavior observed,
- separation between the strongest and second-strongest archetypes.

## Evidence Gate

The model does not assign a real primary archetype until both of these are true:

- evidence score is high enough,
- top archetype score is high enough.

This prevents a session with one extremely weighted event from immediately becoming a permanent label.

## Forming Confidence

While forming, confidence remains below 48 percent.

The current minimum is 12 percent.

As evidence grows, the value can approach 47 percent without crossing into a claimed archetype.

This creates a clean presentation boundary.

## Classified Confidence

Once enough evidence exists, confidence starts at a minimum of 48 percent.

It rises with:

- more evidence,
- a larger score gap between first and second place.

The hard maximum is 96 percent.

The model intentionally never reports 100 percent certainty.

## Hybrid Rule

If:

- evidence is sufficient,
- the second archetype also has a meaningful score,
- the score gap is small,

the model reports both.

This is a better representation of ambiguous behavior.

Example:

```text
EXPLORER / TINKERER
```

## Confidence Is Descriptive

Confidence does not:

- change progression,
- change Director state,
- alter rewards,
- lock the final debrief.

It is only a communication layer for the behavioral interpretation.

## Design Rules

- Weak evidence must report FORMING.
- Confidence below 48 belongs to FORMING.
- Classified confidence begins at 48.
- Never report 100 percent.
- Close top scores can produce hybrid label.
- Confidence can rise or fall as recent behavior changes.
- Confidence never gates gameplay.

## Success Criteria

The model communicates uncertainty in a way that makes its playful conclusions feel fair instead of arbitrary.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
