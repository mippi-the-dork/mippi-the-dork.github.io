# Slowmo - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Slowmo > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Applies a slower timing model to flying objects, hostile projectiles, and selected arcade physics.

> This page is the canonical design documentation for **Slowmo** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Slowmo is both:

- a playful Unreal-style Console command,
- a real accessibility modifier.

The command should make fast-moving game-layer interactions easier to read without freezing the professional site.

## Player-Facing Command

The Console command is:

```text
slowmo
```

It toggles between:

```text
SLOWMO 0.5x
SLOWMO 1.0x
```

The label is conceptual.

Individual systems implement the slower state in ways appropriate to their mechanics rather than applying one global browser time scale.

## Flying Objects

Supported flying objects receive double flight duration.

This includes:

- regular UFOs,
- normal Boss flight,
- pickups,
- Shooting Stars,
- Doug Bones.

Existing supported flying objects are updated when Slowmo is toggled.

This is important because the player should not have to wait for newly spawned objects before seeing the effect.

## Hostile Fire

New regular UFO/normal Boss projectiles take twice as long to reach their destination.

This can trigger:

`Slowmo + UFO`

as a System Combo.

## Super Boss

The focused encounter has its own Slowmo tuning.

It slows:

- hostile projectile motion,
- core firing cadence,
- Add firing cadence,
- rocket cadence,
- laser cadence,
- Mega Laser tracking,
- player shot speed.

The values are tuned rather than blindly multiplied by exactly two.

## Mippi Bird

Slowmo changes the one-button physics curve.

Normal:

```text
Jump velocity -6.9
Gravity 0.36
```

Slowmo:

```text
Jump velocity -5.25
Gravity 0.24
```

This softens vertical movement.

The pipe scroll speed is not globally halved.

## No Persistence

Slowmo is a runtime mode.

Reloading returns the site to normal timing.

This keeps it as an intentional current-session modifier rather than hidden permanent save state.

## Design Rules

- Toggle is reversible.
- Existing supported flying objects update immediately.
- Newly spawned supported objects inherit Slowmo.
- Hostile shots become easier to dodge.
- Super Boss uses encounter-specific Slowmo tuning.
- Mippi Bird uses softer physics rather than a global browser clock.
- Slowmo does not change professional page scroll speed.
- System Combo feedback only appears once per session.

## Success Criteria

Slowmo makes the site's game layer noticeably more forgiving while preserving the identity and pacing of each subsystem.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
