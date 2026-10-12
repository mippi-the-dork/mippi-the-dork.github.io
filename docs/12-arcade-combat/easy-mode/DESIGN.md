# Easy Mode - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Easy Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Dramatically increases ambient opportunity spawning and serves as both an accessibility aid and a playful console modifier.

> This page is the canonical design documentation for **Easy Mode** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Easy Mode is intentionally unsubtle.

Slowmo makes existing opportunities easier to interact with.

Easy Mode makes opportunities happen much more often.

It serves players who:

- want to discover systems quickly,
- are testing the site,
- missed too many ambient events,
- simply want the page to become chaotic.

## Console Tone

The command is:

```text
easy mode
```

When enabled, the site reports:

`ambient spawns dramatically increased`

When disabled:

`ambient spawn pacing restored`

The tone keeps the modifier playful, but its accessibility role is real.

## Immediate Effect

Turning Easy Mode on immediately spawns a standard pickup.

The player should see proof that the command did something instead of waiting for the next scheduler cycle.

## Continuous Boost

While active, the site runs an additional high-frequency opportunity loop.

Every few seconds:

- a standard pickup is force-spawned,
- there is a chance of a Shooting Star,
- otherwise a smaller chance of a regular UFO.

This sits on top of the natural scheduling systems.

## Natural Scheduler Changes

Easy Mode also shortens the ordinary scheduler delays for:

- standard pickups,
- Shooting Stars,
- regular UFOs,
- Doug Bones.

This means the system is intentionally high-traffic.

## Director Relationship

Easy Mode reduces the Adaptive Director's ability to slow the player down.

Several Director multipliers return to neutral while Easy Mode is active.

Ambient permission checks can also allow opportunities that would otherwise be denied by normal pacing.

Easy Mode is explicitly assistance.

It should not pretend to be the baseline authored pace.

## Progression Relationship

Easy Mode does not automatically unlock Epic or Legendary.

Its dedicated forced-spawn loop can create test-like opportunities more aggressively, but the actual progression systems still decide what collected objects do.

The command is therefore best understood as a pacing override rather than a progression skip.

## Persistence

Easy Mode is runtime-only.

A reload restores normal pacing.

## Player Model

Using Easy Mode is recorded as an assistance choice.

The Session Report and Player Model can account for that behavior.

This is not a penalty.

It is descriptive telemetry.

## Design Rules

- Immediate feedback on activation.
- Dramatically higher opportunity density.
- Reversible at any time.
- Runtime-only.
- Does not erase or reset progression.
- Counts as assistance telemetry.
- Should not be mistaken for the normal release pacing.
- Turning it off must stop the additional forced-spawn interval.

## Success Criteria

A player who wants less waiting can make the hidden game layer materially more available with one obvious command.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
