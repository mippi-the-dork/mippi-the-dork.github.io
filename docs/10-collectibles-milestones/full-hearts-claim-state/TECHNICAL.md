# Full Hearts Claim State - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Full Hearts Claim State > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Hearts HUD pulse at 5 out of 5 and requires the player to click the meter before the reward is granted.

> This page is the canonical technical documentation for **Full Hearts Claim State** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Derived State

`updateHeartMeter()` calculates:

```js
const rewardReady =
  heartCount>=5 &&
  !heartRewardShown;
```

## Class

The button receives:

```text
reward-ready
```

when true.

## Enabled State

When ready:

```js
heartMeter.disabled=false;
heartMeter.setAttribute(
  'aria-disabled',
  'false'
);
```

Otherwise the meter is disabled.

## Accessible Label

Ready:

```text
Heart pickups: 5 of 5. Reward ready. Click to claim.
```

Normal count:

```text
Heart pickups: N of 5
```

Claimed state appends:

```text
Reward claimed.
```

## Tooltip

Ready:

```text
FULL HEARTS // Click to claim the Unreal Source reward.
```

Claimed:

```text
Full Hearts reward claimed.
```

Incomplete:

```text
Collect Heart pickups hidden around the site.
```

## Click

The button listener only calls claim when:

```js
heartCount>=5 &&
!heartRewardShown
```

## Styling

Shared claim-ready CSS targets:

```css
.heart-meter.reward-ready
```

and Castle equivalent.

Base animation:

```text
milestone-claim-ready-rare
```

Epic:

```text
milestone-claim-ready-epic
```

Legendary:

```text
milestone-claim-ready-legendary
```

Heart specifically uses a pink/red Heart accent in the Rare state while the surrounding glow still uses the shared theme language.

## Persistence

No separate `reward-ready` storage key exists.

On reload it reconstructs from:

```text
mippi-heart-pickups-v1
mippi-heart-reward-v1
```

## QA

- force 4/5,
- collect fifth,
- verify button enables,
- verify pulse,
- do not click and reload,
- verify pulse returns,
- click,
- verify pulse and enabled state clear,
- test all three site themes.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
