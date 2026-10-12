# Castle Progression - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Progression > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks the repeated Castle-check loop and turns the fourth completed Castle into a claim-ready milestone.

> This page is the canonical technical documentation for **Castle Progression** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent Progress

Castle run uses:

```text
mippi-castle-run-progress-v1
```

Startup clamps value to:

```text
0 through 4
```

## Runtime State

Related variables:

```js
let castleRunProgress=0;
let castleQuestActive=false;
let activeCastle=null;
```

## Boundaries

Potential Castle parent sections:

```js
const castleBoundaries=[
  'games',
  'career',
  'consulting',
  'crafting',
  'tools',
  'about'
];
```

## Persistence Helper

`persistCastleRun()` writes the current value then refreshes:

- Castle meter,
- overall progress HUD visibility.

## Castle Spawn

`spawnCastle()`:

1. verifies a Castle quest is active,
2. chooses a random major section,
3. creates a semantic button,
4. positions it with a randomized percentage offset,
5. appends it to that section,
6. stores `activeCastle`.

## Castle Click

Clicking Castle:

- records `economy.castlesChecked`,
- records meaningful `castle_checked`,
- removes the Castle,
- clears active Castle state,
- increments Castle run,
- shows intermediate or completion feedback.

## Increment

`advanceCastleRun()` clamps:

```js
castleRunProgress=
  Math.min(
    4,
    castleRunProgress+1
  );
```

At 4:

```js
completeCastleRun();
```

## Completion

`completeCastleRun()` sets:

```js
castleRunProgress=4;
```

and persists.

It also records historical postgame completion:

```text
mippi-postgame-castle-complete-v1
```

the first time.

Telemetry:

```text
economy.castleRunsCompleted
meaningful: castle_run_complete
```

Then it tells the player to click the Castle panel.

## Claim

Claiming is handled separately by `claimCastleReward()`.

That function:

- plays fireworks,
- awards 3 Rupees,
- shows reward feedback,
- resets `castleRunProgress=0`,
- persists.

## DEV

Examples:

```text
dev castle 0
dev castle 3
dev castle 4
dev castle key
```

## QA

- run from 0 to 4 naturally,
- reload at 2/4,
- reload at 4/4 before claim,
- claim,
- verify reset to 0,
- start a second run,
- verify postgame historical completion remains.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
