# Adaptive Game Director - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Adaptive Game Director > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses local session behavior to invisibly adjust ambient pacing and arcade generosity without changing professional content, rewards, or progression validity.

> This page is the canonical technical documentation for **Adaptive Game Director** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Profiles

The Director uses five profile objects:

```text
quiet
curious
engaged
struggling
mastery
```

Each defines multipliers for:

```text
pickupDelay
secretDelay
ufoDelay
boneDelay
flight
hostileCadence
projectileDuration
targetBonus
```

## v2.78 Profile Values

| State | Pickup | Star | UFO | Bone | Flight | Hostile cadence | Projectile duration | Target bonus |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Quiet | 1.14 | 1.16 | 1.24 | 1.12 | 1.05 | 1.08 | 1.04 | 0 |
| Curious | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 0 |
| Engaged | .84 | .94 | .86 | .90 | 1.02 | .94 | 1.00 | 10 |
| Struggling | .70 | .86 | 1.08 | .78 | 1.32 | 1.28 | 1.18 | 42 |
| Mastery | .72 | .84 | .73 | .82 | .92 | .82 | .92 | 0 |

Delay values below 1 mean faster opportunities.

Flight values above 1 mean longer target windows.

Hostile cadence values above 1 mean slower firing intervals.

Projectile duration above 1 means slower hostile projectile travel.

## Runtime State

```js
const directorRuntime={
  state:...,
  stateSince:Date.now(),
  candidate:null,
  candidateSince:0,
  lastEvaluation:0,
  lastOpportunityAt:0,
  lastStateAccounting:
    Date.now(),
  blockedAmbient:{
    pickup:0,
    bone:0,
    shooting_star:0,
    ufo:0
  },
  lastFriendlyAmbientAt:0,
  lastLegendaryGuaranteeAt:0
};
```

## Startup

Initial state is restored from session telemetry when valid.

Otherwise:

```text
curious
```

is used.

`startAdaptiveDirector()`:

- writes `data-director-state`,
- evaluates after 4.5 seconds,
- evaluates every 8 seconds,
- flushes deferred ambient / checks Legendary guarantee every 900 ms,
- accounts final state time on pagehide.

## Metrics

`directorMetrics()` derives:

- collected/missed/forced/spawned flying totals,
- natural collection rate,
- UFO kill rate,
- achievement count,
- gameScore,
- sections visited,
- professional dwell,
- professional actions,
- active time,
- recent game events in the last 90 seconds,
- time since last meaningful event.

## QA Hook

Real DevTools:

```js
window.__MIPPI_DIRECTOR__
  .snapshot()
```

returns:

- current state,
- current profile,
- current metrics,
- Director telemetry.

## Easy Mode

Helper functions such as:

```text
directorDelay
directorFlightMultiplier
directorHostileCadenceMultiplier
directorProjectileDurationMultiplier
directorTargetBonus
```

return neutral Director modifiers when Easy Mode is active.

## QA

- Force each state with DEV commands.
- Verify each multiplier affects the correct system.
- Compare natural pickup and UFO cadence.
- Compare Struggling vs Mastery target lifetime.
- Verify rewards and progression rules remain identical across states.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
