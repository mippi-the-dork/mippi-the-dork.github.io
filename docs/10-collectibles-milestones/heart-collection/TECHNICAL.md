# Heart Collection - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Heart Collection > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks up to five Hearts as a visible collectible progression meter.

> This page is the canonical technical documentation for **Heart Collection** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Storage

Heart count:

```text
mippi-heart-pickups-v1
```

Heart reward claimed:

```text
mippi-heart-reward-v1
```

## Startup

```js
heartCount=
  Math.max(
    0,
    Math.min(
      5,
      Number(localStorage.getItem(HEART_KEY)||0)
    )
  );
```

Reward state:

```js
heartRewardShown=
  localStorage.getItem(
    HEART_REWARD_KEY
  )==='1';
```

## HUD Update

`updateHeartMeter()` finds the five child spans.

For each index:

```js
heart.textContent =
  index < heartCount
    ? '♥'
    : '♡';
```

It also toggles:

```text
filled
```

## Collection

`collectHeart()` records:

```text
economy.heartsCollected
meaningful: heart_collected
```

If below five:

```js
heartCount++;
```

then persists the count and refreshes HUD.

If already full, the function keeps count unchanged.

## Fifth-Heart Feedback

When:

```js
heartCount>=5 &&
!heartRewardShown
```

the system shows:

```text
FULL HEARTS
5 / 5 // CLAIM READY
```

and prints that the Hearts panel should be clicked.

## HUD Visibility

The Heart meter is visible when:

```js
heartCount>0
```

through `updateProgressHudVisibility()`.

## Postgame

`post_hearts` evaluates true when:

```js
heartCount>=5
```

Claiming the Unreal Source reward is not required for the postgame Full Hearts achievement condition itself.

## DEV

```text
dev hearts 0
dev hearts 5
dev pickup heart
```

## QA

- 0 Hearts: meter hidden,
- collect first: meter visible with 1 filled,
- collect through 5,
- verify count clamps,
- reload at 5 unclaimed,
- verify reward-ready state reconstructs,
- claim reward,
- collect another Heart,
- verify count remains 5.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

Since v2.81 `collectHeart()` sends each Heart collected **after** first five to the existing Mippi Bird life bank via `persistMushroomLives()`, not a sixth heart or duplicate claim. Economy telemetry adds `heartBirdLivesEarned`. Post-five natural Heart candidate reintroduction: 20% in non-key selection without Lucky Charm; reduced relative weight one with Lucky Charm, not absolute spawn frequency. v2.85 fixes `updateHeartMeter()` filtering direct span glyph children and excluding `.hud-attention-ring`.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).
