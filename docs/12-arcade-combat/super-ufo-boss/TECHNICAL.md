# Super UFO Boss - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Super UFO Boss > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the late-game multi-phase boss encounter required by the Air Superiority Epic achievement.

> This page is the canonical technical documentation for **Super UFO Boss** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Spawn

The encounter is created by:

```js
spawnSuperBoss(force=false)
```

It exits if either:

```js
superBossActive
ufoBossActive
```

is already true.

On spawn both become true.

## Arena

Dynamic root:

```text
.superboss-arena
```

with:

```html
aria-label="Super Boss arcade encounter"
```

The arena contains:

- vignette,
- encounter header,
- health bar,
- core,
- add layer,
- gameplay cursor,
- Exit Boss Fight button.

## State

Core runtime includes:

```js
{
  hp:18,
  maxHp:18,
  bossX,
  bossY,
  pointerX,
  pointerY,
  cursorX,
  cursorY,
  knockX:0,
  knockY:0,
  hitLockUntil:0,
  adds:[],
  timers:[],
  timeouts:[],
  shotRafs:new Set(),
  ended:false,
  laserActive:false,
  forcedInteractOff,
  bossMoveClock:0
}
```

## Adds

Exactly four adds are created.

Each receives:

```js
alive:true
```

and a quarter-turn phase offset.

## Boss Motion

The core moves using a dedicated encounter clock.

Horizontal:

```text
sin(clock * .00055)
```

with amplitude:

```text
min(230 px, 19 percent viewport width)
```

Vertical:

```text
sin(clock * .00115) * 22 px
```

around the upper portion of the viewport.

The clock pauses during Mega Laser.

## Add Motion

Adds orbit relative to the current Boss position.

Their phases alternate rotation direction.

## Boss Fire

Core volley interval:

```text
760 ms normal
1200 ms Slowmo
```

Shot count depends on HP:

```text
HP 13 to 18   1 bullet
HP 7 to 12    2 bullets
HP 1 to 6     3 bullets
```

## Add Fire

One random living add fires every:

```text
1080 ms normal
1650 ms Slowmo
```

## Rockets

First rocket:

```text
1200 ms after start
```

Recurring:

```text
2650 ms normal
3900 ms Slowmo
```

Rocket configuration includes:

```text
speed 255
collision radius 29
lifetime 7600 ms
homing true
```

## Laser

First Mega Laser:

```text
3300 ms after start
```

Recurring:

```text
5350 ms normal
7600 ms Slowmo
```

## Cursor Hit

`superBossImpact()` uses a:

```text
180 ms
```

hit lock.

Knockback is clamped to a maximum vector magnitude of:

```text
220 px
```

Approximate strengths:

```text
direct bullet   78
homing rocket  118
mega laser     165
```

## Victory

At zero HP:

- Super Boss defeat telemetry records,
- normal Finale Boss key is persisted,
- Super Boss postgame history key is persisted,
- postgame achievements are reevaluated,
- 8 Rupees are awarded,
- `showSuperBossVictory(state)` runs.

## Victory Screen

The state becomes ended.

Arena receives:

```text
victory
```

A dedicated panel shows:

```text
VICTORY
SUPER BOSS DEFEATED
+8 RUPEES // AIRSPACE CLEAR
```

After:

```text
2350 ms
```

the encounter ends with reason:

```text
defeated
```

## Exit

Exit button or Escape calls:

```js
endSuperBoss(
  'exit'
)
```

or:

```js
endSuperBoss(
  'escape'
)
```

before victory.

This:

- records exit telemetry,
- shortens Boss reacquisition,
- sets 3.5 second calm,
- restores interaction override when applicable.

## Postgame Key

Super Boss history persists through:

```text
mippi-postgame-superboss-v1
```

## QA Hook

The runtime exposes:

```js
window.__MIPPI_SUPERBOSS__.spawn()
window.__MIPPI_SUPERBOSS__.snapshot()
```

for browser-DevTools QA.

Normal ChatGPT DEV command:

```text
dev superboss
```

also opens the encounter.

## QA

- Validate all 18 HP.
- Destroy all four adds.
- Observe bullet-count escalation.
- Test rocket homing.
- Test cursor knockback.
- Exit by button.
- Exit by Escape.
- Defeat and verify 8 Rupees.
- Verify 2.35 second Victory screen.
- Verify Air Superiority historical state.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
