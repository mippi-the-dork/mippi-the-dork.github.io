# Player Model - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Player Model > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets local session behavior as a mutable play-style archetype without treating the result as a personality test.

> This page is the canonical technical documentation for **Player Model** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Archetype Registry

```js
const PLAYER_ARCHETYPES={
  explorer:{...},
  completionist:{...},
  tinkerer:{...},
  arcade:{...},
  chaos:{...},
  professional:{...},
  correct:{...},
  speedrunner:{...}
};
```

Each contains:

- display label,
- one-line summary.

## Metric Builder

`playerModelMetrics()` calculates:

- six major sections visited,
- professional section dwell,
- flying objects collected,
- forced spawns,
- hidden command count,
- resume clicks,
- external clicks,
- unique Console commands,
- theme/debug action count,
- total game activity,
- live active session time.

## Score Inputs

`computePlayerModel()` then uses those metrics plus session telemetry branches.

Examples:

### Explorer

Strong signals include:

- sections visited,
- Hero Signals,
- Azure gallery,
- inspected targets,
- Castles,
- some flying collection,
- recent Explorer momentum.

### Completionist

Includes:

- achievements,
- objectives,
- Hearts,
- Keys,
- hints,
- Shop purchases,
- recent Completionist momentum.

### Tinkerer

Includes:

- Console volume,
- unique commands,
- invalid commands,
- inspected targets,
- debug/theme actions,
- Blueprint opens/repair,
- Shop equips/unequips,
- recent Tinkerer momentum.

### Arcade

Includes:

- UFO kills,
- Boss/Super Boss wins,
- player hits,
- Mippi Bird,
- Star Power UFO kills,
- recent Arcade momentum.

### Chaos

Includes:

- hidden commands,
- God Mode,
- invalid commands,
- theme churn,
- forced spawns,
- high raw click volume,
- Particles/Vibe toggles,
- recent Chaos momentum.

### Professional

Includes:

- sections visited,
- section dwell,
- external links,
- resume clicks,
- a bonus for low game activity,
- recent Professional momentum.

### Correct

Includes:

- Doug Bones,
- Doug clicks,
- Console `doug`,
- a smaller Heart contribution,
- recent Correct momentum.

### Speedrunner

Includes:

- Cheat,
- God Mode,
- hidden commands,
- Easy Mode,
- fast high achievement count,
- recent Speedrunner momentum.

## Evaluation Cadence

The model is recomputed with recording every:

```text
15 seconds
```

through:

```js
setInterval(
  () =>
    computePlayerModel({
      record:true
    }),
  15000
);
```

`stats` also triggers a recorded computation.

QA snapshot uses:

```text
record:false
```

## Stored Model Branch

Session telemetry stores:

```text
evaluations
label
primary
secondary
confidence
evidence
lastUpdatedAt
history
```

History is bounded to:

```text
20
```

label transitions.

## QA Hook

Real browser DevTools:

```js
window.__MIPPI_PLAYER_MODEL__
  .snapshot()
```

returns:

- current label,
- primary/secondary keys,
- confidence,
- evidence,
- rounded raw scores,
- summary,
- derived metrics,
- recent momentum.

## Separation from Director

The Director does not simply read:

```text
sessionTelemetry.playerModel.label
```

as its state.

It has a separate classifier designed specifically for pacing.

This avoids making the comedic archetype label control difficulty directly.

## QA

Create strongly biased sessions for all eight archetypes.

Then change behavior for several minutes and verify recent activity can move the classification.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
