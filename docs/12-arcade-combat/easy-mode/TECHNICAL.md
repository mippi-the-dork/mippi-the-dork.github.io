# Easy Mode - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Easy Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Dramatically increases ambient opportunity spawning and serves as both an accessibility aid and a playful console modifier.

> This page is the canonical technical documentation for **Easy Mode** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let easyModeEnabled=false;
let easyModeTimer=null;
```

## Command

The player command:

```text
easy mode
```

toggles the state.

## Telemetry

Every toggle records:

```text
modes.easyModeToggles
```

Turning it on also records:

```text
assistance.easyModeUses
```

Meaningful event:

```text
easy_mode
```

with active state.

## Body Class

The mode toggles:

```text
easy-mode
```

on `body`.

## Additional Spawn Loop

When enabled:

1. an immediate forced standard pickup spawns,
2. an interval starts every:
   - 3200 ms.

Each interval:

```js
spawnGamePickup(
  null,
  true
);
```

Then one random roll is made.

If:

```text
roll < .16
```

a forced Shooting Star spawns.

Else if:

```text
roll < .27
```

a forced regular UFO spawns.

Therefore the extra interval has approximately:

```text
16 percent Shooting Star chance
11 percent UFO chance
```

per 3.2-second tick.

## Natural Delay Overrides

Easy Mode also changes native scheduler delays.

### Standard Pickups

```text
2.6 to 5.8 seconds
```

### Shooting Stars

```text
9 to 16 seconds
```

### Regular UFOs

```text
14 to 26 seconds
```

### Doug Bones

```text
3 to 7 seconds
```

when their prerequisite state is active.

## Director Neutralization

Helpers such as:

```js
directorFlightMultiplier()
directorHostileCadenceMultiplier()
directorProjectileDurationMultiplier()
directorTargetBonus()
```

return neutral values while Easy Mode is active.

Ambient authorization logic also treats Easy Mode as a strong permission override.

## Disable

Turning Easy Mode off:

```js
clearInterval(
  easyModeTimer
);
```

then sets the timer handle to null.

Natural schedulers continue using their ordinary pacing on future cycles.

## Persistence

No local or session storage key persists `easyModeEnabled`.

## QA

- Enable and verify immediate pickup.
- Observe 3.2-second forced loop.
- Verify occasional star/UFO injection.
- Compare natural pickup cadence.
- Turn off and verify forced loop stops.
- Reload and verify off.
- Inspect Player Model / telemetry and confirm assistance use is recorded.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
