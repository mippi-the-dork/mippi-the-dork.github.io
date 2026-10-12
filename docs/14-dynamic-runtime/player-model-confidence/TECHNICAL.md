# Player Model Confidence - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Player Model Confidence > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents the Player Model from claiming certainty before enough evidence exists and supports hybrid labels when the top two archetypes remain close.

> This page is the canonical technical documentation for **Player Model Confidence** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Evidence Formula

Current evidence is rounded from:

```text
sectionsVisited
+ achievementsFound
+ consoleCommands * .55
+ flyingCollected * .45
+ ufoDestroyed
+ flappyGamesStarted
+ dougClicks * .6
+ objectivesCompleted * 1.5
+ externalClicks * .8
```

## Ranked Scores

Archetype score entries are sorted descending.

The runtime identifies:

```text
primaryKey
primaryScore
secondaryKey
secondaryScore
```

## Enough Evidence

```js
const enoughEvidence =
  evidence>=8 &&
  primaryScore>=7;
```

If false:

- label is `FORMING`,
- primary is null,
- secondary is null.

## Hybrid Rule

```js
const closeRace =
  enoughEvidence &&
  secondaryScore>=7 &&
  primaryScore-
    secondaryScore<2.25;
```

If true:

```text
PRIMARY / SECONDARY
```

becomes the visible label.

## Forming Confidence

When evidence is insufficient:

```js
Math.min(
  47,
  Math.max(
    12,
    evidence*5
  )
);
```

Therefore current forming confidence range is:

```text
12 to 47 percent
```

## Classified Confidence

When enough evidence exists:

```js
Math.max(
  48,
  Math.min(
    96,
    Math.round(
      52
      + Math.min(
          22,
          scoreGap*5
        )
      + Math.min(
          22,
          evidence*1.2
        )
    )
  )
);
```

This gives:

- base 52,
- up to 22 points from top-score separation,
- up to 22 points from evidence,
- final clamp 48 to 96.

## Summary

FORMING summary:

```text
Keep exploring. The model needs more behavior before pretending it knows what you are doing.
```

Hybrid summary concatenates both archetype summaries.

Single-archetype result uses that archetype's summary.

## Persistence

Recorded evaluations update:

```text
sessionTelemetry.playerModel.confidence
sessionTelemetry.playerModel.evidence
```

Label transition history stores the confidence/evidence values at the time of transition.

## QA

- Create evidence 0 to 7 and verify FORMING.
- Reach evidence 8 with top score below 7 and verify FORMING.
- Cross both gates and verify at least 48 percent.
- Create two close archetype scores under 2.25 gap.
- Verify hybrid.
- Separate them by more than 2.25 and verify single label.
- Generate strong evidence and separation and confirm confidence never exceeds 96.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
