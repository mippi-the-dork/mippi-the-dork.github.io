# Mippi Bird Extra Lives - Technical Documentation

## Current implementation correction (v3.25.2)

The Bird worker owns `baseLife`, `shopLife` and `bank`. Its `lives()` sums them and `hit()` spends Shop, then bank, then base Life. At zero it sets ended and emits a single completion event. The main script persists the bank using `mippi-bird-mushroom-lives-v1` for compatibility. The worker has no native storage access.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Extra Lives > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Combines the Shop shield and Mushroom progression to give Mippi Bird additional survivability.

> This page is the canonical technical documentation for **Mippi Bird Extra Lives** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Shop Source

Shop item ID:

```text
bird-extra-life
```

At round reset:

```js
shopLifeAvailable:
  shopOwns(
    'bird-extra-life'
  )
```

This is a per-round boolean.

## Mushroom Storage

Progress:

```text
mippi-mushroom-progress-v1
```

Bank:

```text
mippi-bird-mushroom-lives-v1
```

Every 20 Mushroom collections:

```js
mushroomLifeProgress-=20;
mushroomBankLives++;
```

## HUD

`updateFlappyLivesHud()` builds:

```text
EXTRA LIVES //
SHOP 1 or SHOP 0
· BANK N
· SHROOMS M/20
```

It adds:

```text
has-life
```

when either:

- Shop shield is available,
- Mushroom bank is above zero.

## Absorb Order

`absorbFlappyHit(reason)`:

```js
if(s.shopLifeAvailable){
  s.shopLifeAvailable=false;
  source='shop';
}
else if(mushroomBankLives>0){
  mushroomBankLives--;
  source='mushroom';
}
```

This guarantees Shop-first priority.

## Persistence

Using a Mushroom life immediately calls:

```js
persistMushroomLives();
```

Shop shield use does not need persistence because it belongs only to the current round.

## Telemetry

Shop source:

```text
flappy.shopLivesUsed
```

Mushroom source:

```text
flappy.mushroomLivesUsed
economy.mushroomLivesSpent
```

Any absorbed hit:

```text
flappy.hitsAbsorbed
meaningful: flappy_extra_life_used
```

## Round Recharge

Any `resetFlappyGame()` recreates `shopLifeAvailable` from current Shop ownership.

Therefore:

- new game,
- game-over restart,
- reopening the minigame

all restore the Shop shield.

## QA

- No lives: collision ends run.
- Shop item only: first collision survives, second kills.
- Mushroom bank only: collision spends one banked life.
- Both: Shop shield is spent first.
- Restart round: Shop shield returns, Mushroom bank stays reduced.
- Reload: Mushroom bank persists.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
