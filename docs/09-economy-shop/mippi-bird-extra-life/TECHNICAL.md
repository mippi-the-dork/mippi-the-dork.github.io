# Mippi Bird Extra Life - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Mippi Bird Extra Life > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that gives each Mippi Bird round a rechargeable hit shield.

> This page is the canonical technical documentation for **Mippi Bird Extra Life** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'bird-extra-life',
  cost:4,
  slot:'passive',
  rarity:'epic',
  tag:'MIPPI BIRD'
}
```

## Round Initialization

`resetFlappyGame()` creates:

```js
flappyState={
  ...,
  shopLifeAvailable:
    shopOwns('bird-extra-life'),
  invulnerableUntil:0
}
```

Therefore the Shop shield refreshes every reset/new round.

## HUD

Mippi Bird life display includes:

```text
SHOP 1 / SHOP 0
BANK <mushroomBankLives>
SHROOMS <progress>/20
```

## Collision Absorption

`absorbFlappyHit()` checks:

```js
if(s.shopLifeAvailable){
  s.shopLifeAvailable=false;
  source='shop';
}
else if(mushroomBankLives>0){
  ...
}
```

The Shop shield therefore has priority over Mushroom lives.

## Invulnerability

After a shielded collision:

```js
s.invulnerableUntil =
  performance.now()+1650;
```

The bird receives a recovery vertical velocity and clamped position.

## Telemetry

Shop shield usage records:

```text
flappy.shopLivesUsed
flappy.hitsAbsorbed
meaningful: flappy_extra_life_used
```

## QA

- play without item: first collision ends run,
- buy item,
- new round shows SHOP 1,
- collide: run survives, SHOP 0,
- collide after invulnerability: normal failure or Mushroom life,
- start new round: SHOP 1 returns.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
