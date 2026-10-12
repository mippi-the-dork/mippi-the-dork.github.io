# Anti-Drought System - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Anti-Drought System > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Creates an extra friendly opportunity after long periods without meaningful ambient activity while preserving the requirement that the player still interact successfully.

> This page is the canonical technical documentation for **Anti-Drought System** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entry

The Director calls:

```js
directorMaybeBreakDrought(
  metrics
);
```

after every Director evaluation.

Director evaluation runs every:

```text
8 seconds
```

after an initial 4.5-second evaluation.

## Early Returns

No anti-drought assist when:

```text
Easy Mode enabled
Epic gameplay locked
attention blocked
ambient target already visible
```

## Thresholds

```js
const threshold =
  legendaryGameplayUnlocked()
    ? 24000
    : state==='struggling'
      ? 45000
      : state==='engaged'
        ? 60000
        : state==='mastery'
          ? 66000
          : state==='quiet'
            ? 72000
            : 68000;
```

Therefore:

| State | Threshold |
| --- | ---: |
| Legendary override | 24s |
| Struggling | 45s |
| Engaged | 60s |
| Mastery | 66s |
| Curious | 68s |
| Quiet | 72s |

## Opportunity Timer

The system checks:

```js
now-
directorRuntime.lastOpportunityAt
```

against the threshold.

If not enough time has passed, it returns.

## Meaningful-Activity Guard

For:

- non-Struggling,
- non-Legendary

sessions, it also returns when:

```js
metrics.lastMeaningfulAgo <
  threshold*.55
```

This avoids inserting extra ambient activity while the player is already meaningfully engaged elsewhere.

## Assist

On drought:

```js
directorRuntime.lastOpportunityAt =
  now;
```

Telemetry increments:

```text
director.droughtAssists
```

Then:

```js
directorSpawnOpportunityByPriority(
  null,
  {force:false}
);
```

attempts one legal opportunity.

Because `force:false`, ordinary legality and attention rules still apply.

## Priority Helper

The general opportunity helper can attempt:

- uncharged Shooting Star when available,
- Doug Bone if Doug is in command,
- standard pickup,
- regular UFO when legal.

It returns after the first successful spawn.

## Legendary Relationship

Legendary sessions also have a separate 2.6-second hard opportunity guarantee.

That system is documented separately.

The 24-second Legendary drought threshold remains part of the general Director function but is usually superseded by the stronger guarantee during truly empty calm windows.

## QA

- Force Engaged and suppress natural schedulers long enough for drought.
- Verify one opportunity appears around the expected threshold.
- Repeat in Quiet and compare.
- Perform meaningful actions shortly before threshold and confirm non-Struggling help can defer.
- Place an ambient object on screen and verify no drought assist.
- Enable Easy Mode and verify this path does not run.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
