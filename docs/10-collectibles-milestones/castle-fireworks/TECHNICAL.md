# Castle Fireworks - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Fireworks > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the Castle reward celebration using larger particles for readability without increasing particle count.

> This page is the canonical technical documentation for **Castle Fireworks** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Function

Castle celebration is:

```js
castleRunFireworks()
```

## Burst Points

Current positions are based on viewport size:

```js
[
  [18%,34%],
  [36%,22%],
  [54%,30%],
  [72%,20%],
  [84%,36%]
]
```

These are calculated from:

```js
window.innerWidth
window.innerHeight
```

at claim time.

## Timing

Each point is delayed by:

```text
180 ms * index
```

creating a short sequential wave.

## Explosion Call

Each point calls:

```js
explodeAt(x,y,34,11)
```

The code comment explicitly states:

```text
Same particle count, substantially larger pixels so the reward reads across the viewport.
```

The extra argument is used by the shared explosion presentation to increase particle size.

## Claim Integration

`claimCastleReward()` runs:

```js
castleRunFireworks();
awardRupees(
  3,
  {
    source:'castle_run',
    announce:'silent'
  }
);
```

Then shows completion toast and Console feedback.

## Cleanup

Individual explosion particles are owned by the shared explosion helper and remove themselves after their animation.

The Castle system does not create a persistent fireworks container.

## QA

- claim Castle run on 1080p,
- claim on 1440p/4K,
- verify burst locations span viewport,
- confirm size is readable,
- confirm no extra burst count was introduced,
- confirm page interaction remains responsive.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.81 Castle claim has nine burst locations with 34 particles each, 33px particles and 115ms stagger. `castleAutoCollectWindow()` snapshots existing `.game-pickup`, `.doug-bone`, `.shooting-star` and triggers their normal click callbacks progressively in ~0–920ms; no later arrivals/hostiles. v2.82 optional `explodeAt(...,{radiusX:560,radiusY:450,lifetime:2150})` widens Castle fireworks while ordinary projectile effects retain defaults. Claim still awards 3 Rupees and requires meter click.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).


## v2.93–v2.94 Current Update

v2.94 routes the existing nine Castle `explodeAt()` bursts through the default shared Canvas particle renderer. Each burst still requests 34 squares of size 33 with `radiusX:560`, `radiusY:450`, and `lifetime:2150`ms, preserving click-to-claim, 3 Rupees and already-airborne friendly auto-collection. `dev combat renderer dom` uses the original DOM/CSS animation for comparison. No change to Castle progression or burst counts.
