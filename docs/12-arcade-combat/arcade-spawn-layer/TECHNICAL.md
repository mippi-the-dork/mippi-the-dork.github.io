# Arcade Spawn Layer - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Arcade Spawn Layer > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Schedules optional arcade threats and opportunities without allowing them to permanently block the professional portfolio experience.

> This page is the canonical technical documentation for **Arcade Spawn Layer** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Primary Runtime State

Important arcade variables include:

```js
let ufoKills=0;
let nextBossKillThreshold=10;
let ufoBossActive=false;
let superBossActive=false;
let superBossRuntime=null;
let ufoCalmUntil=0;
```

`ufoKills` tracks the current runtime regular-UFO kill cycle.

`nextBossKillThreshold` starts at 10.

## Natural UFO Scheduler

Natural regular UFO scheduling uses:

```js
nextNaturalGalagaDelay()
```

Normal pacing:

```text
Director-adjusted 52 to 130 seconds
```

Easy Mode:

```text
14 to 26 seconds
```

The scheduler calls:

```js
spawnGalaga(false)
```

and then schedules the next opportunity.

## Spawn Rejection

A normal UFO spawn can be rejected when:

- a normal Boss is active,
- a Super Boss is active through shared Boss state,
- the calm window is active,
- Epic gameplay is not unlocked,
- the motion policy blocks it,
- the Adaptive Director denies ambient opportunity.

DEV-forced spawns can bypass several of those normal restrictions.

## Deferred Retry

If natural spawn fails, the scheduler does not always wait another 52 to 130 seconds.

Current retry examples:

```text
Epic not unlocked     5.0 s
Reduced motion        15.0 s
Boss/calm window       3.5 s
Attention blocked      1.6 s
Other rejection        5.0 s
```

## Boss Threshold

Current cycle helper:

```js
function ufoCycleProgress(){
  const cycleStart=
    nextBossKillThreshold-10;

  return Math.max(
    0,
    Math.min(
      10,
      ufoKills-cycleStart
    )
  );
}
```

After each regular UFO defeat:

```js
ufoKills++;
```

then:

```js
maybeSpawnUfoBoss();
```

runs.

## Boss Spawn Test

A large contact is allowed when:

```js
ufoKills>=nextBossKillThreshold
```

and no Boss is already active.

Before the encounter is queued:

```js
nextBossKillThreshold+=10;
```

## Super Boss Choice

The next large contact becomes a Super Boss when:

```js
(totalBossVictories()+1)%3===0
```

where total Boss victories include:

- normal Boss wins,
- Super Boss wins.

Therefore the repeating pattern is:

```text
Boss
Boss
Super Boss
Boss
Boss
Super Boss
...
```

## Attention-Aware Boss Queue

Large contacts use:

```js
queueDirectorBossSpawn(
  900,
  superFight
)
```

If the page is still attention-blocked and Easy Mode is not active, the queue reschedules itself after another 900 ms rather than spawning over the focused experience.

## Calm Windows

Current values:

```text
Normal Boss defeated   8.0 s
Normal Boss escaped    3.0 s
Super Boss defeated   12.0 s
Super Boss exited      3.5 s
```

These write:

```js
ufoCalmUntil=
  Date.now()+...
```

## Escape Reacquisition

Normal Boss escape and Super Boss exit both use a shortened threshold pattern:

```js
nextBossKillThreshold=
  Math.min(
    nextBossKillThreshold,
    ufoKills+4
  );
```

This means the player generally needs at most four more regular UFO kills for another large contact.

## Current Reload Nuance

`ufoKills` is a runtime variable initialized to zero on page startup.

Boss-victory telemetry is session-persistent, but the in-progress regular-UFO contact count is not reconstructed from session telemetry.

Therefore a reload can preserve the broad Boss-victory stage while resetting the current 0-to-10 contact sub-cycle.

Treat this as current v2.78 behavior when testing persistence.

## DEV

Useful commands:

```text
dev ufo
dev boss
dev superboss
dev invasion 0
dev invasion 33
dev invasion 66
dev invasion near
```

## QA

- Validate natural UFOs do not appear before Epic.
- Validate regular spawns respect calm periods.
- Destroy 10 regular UFOs and verify Boss queue.
- Escape Boss and verify shortened reacquisition.
- Defeat two normal Bosses.
- Reach the third large-contact slot and verify Super Boss.
- Exit Super Boss and verify the next large contact is still a Super Boss.
- Defeat Super Boss and verify the arc resets toward the next three-victory sequence.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
