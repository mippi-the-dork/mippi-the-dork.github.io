# Super UFO Boss - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Super UFO Boss > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the late-game multi-phase boss encounter required by the Air Superiority Epic achievement.

> This page is the canonical design documentation for **Super UFO Boss** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Super UFO Boss is the highest-intensity optional game encounter in the portfolio.

It exists for players who have deliberately kept pushing the arcade thread beyond the normal Boss.

Unlike the regular UFO layer, this encounter temporarily takes over the screen.

That increased commitment is justified because:

- the player has already opted deeply into the arcade system,
- the encounter is reversible at any time,
- the reward supports postgame mastery rather than core portfolio access.

## Trigger

The Super Boss occupies every third successful Boss-victory slot.

The intended arc is:

```text
Boss win
Boss win
Super Boss
```

If the player exits the encounter:

- it does not count as defeated,
- the next reacquired large contact remains the Super Boss.

## Core Health

The Super Boss has:

```text
18 HP
```

The full-screen header shows:

- SUPER BOSS,
- health bar,
- CORE X / 18.

## Supporting Adds

Four one-hit adds orbit the Boss.

They increase pressure by firing independently.

The player can remove them to reduce incoming fire.

Destroying adds does not directly damage the Boss core.

## Enemy Kit

The encounter uses four major threat types.

### Boss Bullets

Direct projectiles from the core.

The number per volley rises as core health drops.

### Add Bullets

One living add periodically fires at the gameplay cursor.

### Homing Rockets

Slow projectiles continuously curve toward the gameplay cursor.

### Mega Laser

A telegraphed beam freezes Boss translation, then slowly rotates toward the cursor during its active window.

## Cursor Knockback

Enemy impacts push the gameplay cursor away from the source.

The operating-system mouse pointer is not moved.

This creates mechanical displacement without unsafe browser behavior.

## Player Weapon

Left click always fires an upward projectile from the gameplay cursor.

This works even if Legendary progression has never been unlocked.

The Super Boss therefore contains its own complete combat vocabulary.

## Escape

`EXIT BOSS FIGHT` is permanently visible in the bottom-right.

Escape also exits before victory.

Leaving:

- has no Rupee cost,
- has no achievement penalty,
- shortens reacquisition,
- restores prior interaction state.

## Victory

Defeat awards:

```text
8 Rupees
```

and records:

- normal Finale Boss satisfaction,
- Super Boss historical completion,
- postgame Air Superiority condition.

The encounter then freezes into a dedicated Victory screen for about 2.35 seconds before returning to the portfolio.

## Design Rules

- 18 HP core.
- Four one-hit adds.
- Exit is always available before victory.
- Leaving has no punitive progression cost.
- Player fire is always available.
- Cursor knockback uses a gameplay cursor, never OS-pointer repositioning.
- Victory awards 8 Rupees.
- Victory satisfies Air Superiority history.
- The final Victory screen must suppress continued combat.
- Theme treatment follows Rare, Epic, and Legendary world presentation.

## Success Criteria

The Super Boss feels like a real late-game encounter while remaining safe enough to live inside a professional static portfolio.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current v3.01 Behavior

v3.00 enlarged the authored super-boss.svg core and resized Boss-art adds. v3.01 introduces top horizontal panning with occasional reversals and six orbiting adds; parent and orbit freeze during Mega Laser. The Boss has its own upward shot mode and existing player-facing hazard/reward mechanics.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.
