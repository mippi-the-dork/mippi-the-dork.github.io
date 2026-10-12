# Session Statistics - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Session Statistics > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents a readable snapshot of the current local play session through the `stats` Dev Console command.

> This page is the canonical technical documentation for **Session Statistics** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command

Player-facing:

```text
stats
```

calls:

```js
printSessionStats();
```

## Snapshot Function

`sessionStatsSnapshot()` first:

```js
telemetryCommitActive();
```

then recomputes Player Model with:

```text
record:true
```

so the displayed classification reflects the latest behavior.

## Major Returned Fields

The snapshot includes:

```text
duration
sectionsVisited
sectionsTotal
signals
signalsTotal
flyingCollected
ufoDestroyed
bossDefeated
superBossDefeated
bones
coolness
hearts
mushrooms
mushroomProgress
birdLivesBank
rupeesEarned
rupeesSpent
wallet
shopOwned
flappyHigh
consoleCommands
wishes
wishCharge
objectives
themes
assistance
model
```

## Current Major Section Count

Stats uses:

```text
6
```

professional major sections:

- Games,
- Career,
- Consulting,
- Crafting,
- Tools,
- About.

Hero is excluded from the player-facing `Sections Visited N / 6` value.

## Active Duration Formatting

`formatSessionDuration()` displays:

- `Ns` under one minute,
- `Nm SSs` once minutes exist.

## Flying Objects

The value is the sum of all:

```text
sessionTelemetry.flying.collected
```

object-family counts.

## Mippi Bird High Score

Stats uses the maximum of:

- telemetry high score,
- current runtime high score.

This avoids a stale display if the latest frame has not yet persisted.

## Themes

`availableThemeModes().length` reports:

```text
1 to 3
```

rather than current active theme.

## Assistance Output

The Console builds a readable list only for nonzero used assistance.

Examples:

```text
Easy Mode
Hints x3
Cheat x1
God Mode
```

If none:

```text
ASSISTANCE // None
```

## Player Model

Console output includes:

```text
PLAYER MODEL // <label>
<summary>
MODEL CONFIDENCE // N%
MODEL WINDOW // recent behavior is weighted heavily; this profile can change.
```

## QA

- Run Stats on fresh page.
- Run after long professional-only session.
- Run after arcade-heavy session.
- Verify Rupee earned/spent/current values.
- Verify sections denominator is 6.
- Compare Stats model to `window.__MIPPI_PLAYER_MODEL__.snapshot()`.
- Open Finale Session Debrief and compare major values.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
