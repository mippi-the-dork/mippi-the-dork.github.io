# Boss Adds - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Boss Adds > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides supporting enemies that can be shot and explode in place during the Super Boss encounter.

> This page is the canonical design documentation for **Boss Adds** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Boss Adds divide player attention.

Without Adds, the Super Boss would mostly be:

- line up under core,
- fire repeatedly,
- dodge core attacks.

The four supporting enemies introduce a tactical question:

> Do I keep damaging the Boss, or reduce the incoming fire first?

## Count

The encounter begins with:

```text
4 Adds
```

Each Add requires one player shot.

## Orbit

Adds move around the Boss in a loose orbit.

Their relative movement makes lining up player shots less trivial than shooting the large central core.

## Fire Pressure

A recurring Add-fire scheduler chooses one random living Add and fires at the gameplay cursor.

As Adds are destroyed, the number of possible firing sources shrinks.

The player therefore receives a real combat benefit for clearing them.

## One-Hit Durability

Adds are deliberately fragile.

Their job is attention division, not additional health grind.

## Death Position

When an Add dies:

- it explodes exactly where it currently is,
- its visual fades at that position,
- it does not snap toward the arena origin.

This was a specific v2.68 correction.

The earlier implementation could lose the movement transform when applying the destroyed style.

## Core Blocking

Player projectile collision checks Adds before the Boss core.

An Add can therefore intercept a shot that passes through its radius.

This makes its orbit spatially meaningful.

## Reward

Adds do not give Rupees directly.

The payoff is reduced pressure and a cleaner path to Boss damage.

Their destruction is still tracked in telemetry.

## Design Rules

- Four Adds at encounter start.
- One hit each.
- Adds orbit around the Boss.
- Living Adds contribute fire.
- Adds are valid player-shot blockers.
- Death explosion stays at world position.
- No direct Rupee reward.
- Destroyed Adds never resume firing.

## Success Criteria

The player can immediately understand that removing Adds makes the fight easier and sees each one die cleanly where it was shot.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current v3.01 Behavior

v3.01 Super Boss uses SIX equally spaced Boss-art adds in a circular orbit around its moving core. Their orbit pauses with the parent movement clock during Mega Laser. Earlier descriptions of four adds or generic paths are superseded.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.
