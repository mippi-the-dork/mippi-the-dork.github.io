# Director State Machine - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Director State Machine > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Classifies the current session into Quiet, Curious, Engaged, Struggling, or Mastery and uses hysteresis to prevent rapid state flipping.

> This page is the canonical technical documentation for **Director State Machine** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Classification Order

`directorClassify(metrics)` evaluates in this order:

1. professional-reader Quiet,
2. collectible/arcade Struggling,
3. Mastery,
4. Engaged,
5. low-engagement Quiet,
6. Curious fallback.

Order matters.

## Professional Quiet

Condition:

```text
activeMs > 55,000
sectionsVisited >= 2
professionalDwell > 42,000
gameScore < 4.5
```

Reason:

```text
professional_reader
```

## Collection Struggle

Requires:

```text
gameScore >= 4
collected >= 1
naturalAttempts >= 6
collectRate < .30
```

Reason:

```text
collection_friction
```

## Arcade Struggle

Requires:

```text
ufoSpawned >= 4
ufoDestroyed >= 1
ufoRate < .34
```

Reason:

```text
arcade_friction
```

Either struggle condition returns:

```text
struggling
```

## Mastery

Collection route:

```text
naturalAttempts >= 8
collectRate >= .62
collected >= 8
```

Arcade route:

```text
ufoSpawned >= 5
ufoRate >= .66
ufoDestroyed >= 4
```

The overall gate additionally requires:

```text
gameScore >= 20
achievementCount >= 3
```

Reason becomes:

```text
arcade_mastery
```

or:

```text
interaction_mastery
```

## Engaged

Condition:

```text
gameScore >= 7
OR
recentGameEvents >= 5
```

Reason:

```text
active_play
```

Recent game events look at the last:

```text
90 seconds
```

and exclude:

- section first visit,
- external link.

## Low-Engagement Quiet

Condition:

```text
activeMs > 100,000
gameScore < 2.5
```

Reason:

```text
low_game_engagement
```

## Fallback

```text
curious
baseline_exploration
```

## Hysteresis

During `directorEvaluate()`:

- if candidate equals current:
  - candidate is cleared,
- if new candidate differs:
  - store candidate and start time,
- transition only when:
  - candidate persisted at least 9,000 ms,
  - current state existed at least 14,000 ms.

## Transition Logging

`directorSetState()` records:

```text
from
to
reason
timestamp
```

in a bounded history.

Maximum state-change records:

```text
24
```

## State-Time Accounting

Time in each Director state is accumulated in:

```text
sessionTelemetry.director.stateMs
```

## DEV

Current forcing commands:

```text
dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery
```

## QA

- Force or naturally reach each classifier condition.
- Verify one brief event does not instantly transition.
- Hold a candidate for 9 seconds while current state is younger than 14 seconds.
- Verify transition waits.
- Test professional reading and confirm it does not become Struggling.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
