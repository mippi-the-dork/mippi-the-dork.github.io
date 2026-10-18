# Mippi Bird Damage Feedback - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Damage Feedback > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Communicates shield loss, invulnerability, crashes, and recovery clearly during the minigame.

> This page is the canonical technical documentation for **Mippi Bird Damage Feedback** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Collision Gate

Both pipe and boundary collision check:

```js
performance.now()>=
  s.invulnerableUntil
```

before attempting damage.

## Absorb Function

```js
absorbFlappyHit(
  reason
)
```

returns:

```text
true  if a life absorbed the hit
false if no life was available
```

## Life Priority

Inside absorption:

1. Shop shield.
2. Mushroom bank.
3. No source.

## Invulnerability

On success:

```js
s.invulnerableUntil=
  performance.now()+1650;
```

## Recovery Velocity

```js
s.vy=-2.8;
```

## Position Clamp

```js
s.y=
  Math.max(
    28,
    Math.min(
      flappyCanvas.height-28,
      s.y
    )
  );
```

## Footer Message

Shop shield:

```text
EXTRA LIFE //
SHOP SHIELD SPENT //
INVULNERABLE
```

Mushroom life:

```text
EXTRA LIFE //
MUSHROOM LIFE SPENT //
INVULNERABLE
```

## Console

The Console prints:

```text
MIPPI BIRD HIT //
<SHOP|MUSHROOM> EXTRA LIFE USED //
BANK N
```

## Blink

During draw:

```js
const invulnerable=
  performance.now()<
  s.invulnerableUntil;

const blinkVisible=
  !invulnerable ||
  Math.floor(
    performance.now()/90
  )%2===0;
```

Therefore the player logo toggles visibility about every 90 ms during invulnerability.

## Fatal Collision

If `absorbFlappyHit()` returns false:

```js
s.gameOver=true;
```

The game-over transition records:

```text
flappy.deaths
meaningful: flappy_game_over
```

with score.

## Game-Over Rendering

The canvas draws:

```text
GAME OVER
CLICK TO RESTART
```

Footer becomes:

```text
CRASHED AT N //
CLICK GAME TO RESTART
```

## Restart

Pointerdown while `gameOver`:

1. calls `resetFlappyGame()`,
2. immediately marks new run started,
3. records game start,
4. applies jump strength.

## QA

- Pipe hit with Shop shield.
- Boundary hit with Shop shield.
- Mushroom-life hit.
- Hit repeatedly during the 1.65-second invulnerability window.
- Confirm only one life is consumed.
- Verify blink cadence.
- Verify safe-position clamp.
- Exhaust all lives and confirm Game Over.
- Click once and confirm immediate restart.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current implementation correction (v3.25.2)

Worker `hit` events contain source, collision reason, remaining Lives and updated bank. Main-thread HUD/persistence/telemetry consumes those events. Surviving hits grant 1.65 seconds of immunity; final hit emits one `ended` event. Rendering uses the snapshot's invulnerability value.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).
