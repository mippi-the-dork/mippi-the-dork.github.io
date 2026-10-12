# Castle Claim State - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Claim State > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Castles HUD pulse at 4 out of 4 and waits for the player to click it before firing the completion reward.

> This page is the canonical technical documentation for **Castle Claim State** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Update Function

`updateCastleMeter()` calculates:

```js
const display=
  Math.max(
    0,
    Math.min(
      4,
      castleRunProgress
    )
  );

const rewardReady=
  display>=4;
```

## Visibility

The meter is visible when any Castle activity exists:

```js
castleRunProgress>0 ||
castleQuestActive ||
!!activeCastle
```

## Claim Class

When complete:

```text
reward-ready
```

is applied.

## Enabled State

Complete:

```js
castleMeter.disabled=false;
aria-disabled="false";
```

Incomplete:

```js
castleMeter.disabled=true;
aria-disabled="true";
```

## Value

Complete:

```text
CLAIM
```

Incomplete:

```text
N / 4
```

## Fill

Progress bar width:

```js
display/4*100
```

percent.

## Tooltip

Ready:

```text
CASTLES 4/4 // Click to claim fireworks and 3 Rupees.
```

Incomplete:

```text
Check four Castles to complete a Castle Run.
```

## Click

Listener:

```js
if(castleRunProgress>=4)
  claimCastleReward();
```

## Persistence

No separate claim-state key exists.

The state reconstructs from:

```text
mippi-castle-run-progress-v1
```

with value 4.

## Shared Styling

Castle claim uses the same shared milestone animation family as Hearts.

Its Rare border accent is cyan rather than Heart pink.

Epic and Legendary use their theme-specific pulse animations.

## QA

- force Castle 3,
- verify meter disabled,
- reach 4,
- verify CLAIM,
- reload before clicking,
- verify state returns,
- click,
- verify reset and pulse removal,
- test Rare, Epic, Legendary.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
