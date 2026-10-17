# Boss UFO - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Boss UFO > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the normal multi-hit boss encounter and satisfies the normal Finale's boss requirement.

> This page is the canonical technical documentation for **Boss UFO** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Spawn

Normal Boss creation:

```js
spawnBossUfo(force=false)
```

sets:

```js
ufoBossActive=true;
```

then refreshes the Invasion meter.

## Flight

The Boss uses:

```js
randomEdgeFlight(180)
```

with base duration:

```text
15 to 19 seconds
```

before shared:

- Director,
- Slowpoke,
- Slowmo

flight multipliers.

## Health

Local state:

```js
let hp=6;
```

The card contains:

```text
BOSS
health bar
CORE 6 / 6
```

`updateHp()` updates:

- bar width,
- integrity text,
- `data-hp`,
- accessible label.

## Fire Cadence

Boss volley interval:

```text
610 to 779 ms
```

before:

```js
directorHostileCadenceMultiplier()
```

The first volley is scheduled after:

```text
320 ms
```

## Volley Patterns

### HP 5 to 6

```text
center shot
second center shot after 150 ms
```

### HP 3 to 4

```text
left offset  -46
right offset +46 after 120 ms
center after 240 ms
```

### HP 1 to 2

```text
left  -82, Y +18
center Y -26 after 95 ms
right +82, Y +18 after 190 ms
```

All shots use the standard hostile projectile implementation.

## Hit

Each click or compatible alternate collection:

```js
hp--;
```

and records:

```text
arcade.bossHits
arcade.bossHitMethods.<method>
```

## Star Power

If collection method is:

```text
star_power
```

the combo telemetry and first-time System Combo announcement run.

The shared Star Power targeting logic allows another contact after about 700 ms if the Boss is still alive.

## Defeat

At zero:

- `defeated=true`,
- calm window set to 8 seconds,
- Boss defeat telemetry records,
- Finale Boss state is persisted,
- 3 Rupees are awarded,
- success feedback displays,
- Boss is removed.

Persistent Finale key:

```text
mippi-finale-boss-v1
```

## Escape

On animation end before defeat:

- boss-escape telemetry records,
- `nextBossKillThreshold` is shortened to at most:
  - `ufoKills+4`,
- calm window becomes 3 seconds,
- Boss is removed,
- next Boss opportunity is checked later.

## Cleanup

`stopBoss()`:

- clears attack interval,
- removes Boss if necessary,
- clears `ufoBossActive`,
- schedules another Boss-threshold check after 900 ms.

## QA

- Spawn Boss at 6 HP.
- Verify visible bar and CORE text.
- Observe all three health-dependent volley phases.
- Defeat and verify +3 Rupees.
- Verify normal Finale Boss requirement.
- Let Boss escape and confirm shortened reacquisition.
- Test Star Power repeated contact and 700 ms lockout.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current v3.01 Behavior

v3.01 regular Boss follows top/right/bottom/left diamond movement until killed or its escape timer, and takes six hits. Guaranteed Heart and physical Rupee drops spawn on defeat. Earlier generic fly-across descriptions are historical.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.


## Current v3.04 Specification

v3.03 regular Boss authored three-lap diamond duration is ~34,000–42,600ms, double v3.01's ~17,000–21,300ms. Its 6 HP, projectile/fire, escape, rewards and hit callbacks remain unchanged.
