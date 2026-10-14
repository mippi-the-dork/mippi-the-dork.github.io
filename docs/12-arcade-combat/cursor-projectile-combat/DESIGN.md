# Cursor Projectile Combat - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Cursor Projectile Combat > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player fire upward-moving cursor projectiles that collide with boss targets and adds.

> This page is the canonical design documentation for **Cursor Projectile Combat** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Cursor projectile combat gives the Super Boss a complete, simple shooting vocabulary:

- move cursor,
- line up horizontally,
- click,
- projectile travels upward,
- hit an Add or the Boss core.

The player does not aim through a separate reticle mode or keyboard control.

The same pointer used for dodging is also the firing origin.

## Vertical Shot Rule

Super Boss shots travel straight upward.

They do not home.

This creates a readable positional challenge.

To hit something, the player must place the gameplay cursor underneath it and fire.

That decision matters because the cursor is also where enemy attacks are trying to hit.

## Collision Priority

Adds are checked before the Boss core.

This matters because an Add orbiting in front of the core can absorb the shot.

The player can intentionally clear the supporting enemies before focusing the Boss.

## Fast Projectile Safety

Shots move quickly.

Collision uses the traveled line segment between the previous and next frame rather than checking only the projectile's final point.

This prevents fast bullets from tunneling through small targets.

## Add Hit

An Add is destroyed in one player shot.

It explodes at its current world position.

## Boss Hit

A core hit removes one of the Boss's 18 HP.

The shot is consumed immediately.

## Slowmo

Player shots are slower while Slowmo is active.

This keeps the encounter's overall timing language coherent.

## Legendary Separation

The Super Boss version of cursor projectile combat always exists.

It does not require Legendary progression or Golden Trigger.

Outside the Super Boss, Legendary progression provides a separate cursor-shot system for normal airborne targets.

The two systems intentionally use different aiming models:

### General Legendary Shot

Finds a nearby target and travels toward it.

### Super Boss Shot

Travels straight upward from the gameplay cursor.

## Design Rules

- Left click fires one shot.
- Shot travels upward only.
- No Legendary requirement inside Super Boss.
- Adds take one hit.
- Core takes 18 total hits.
- Segment collision prevents tunneling.
- Shot disappears on first collision.
- Shot disappears after leaving top of screen or safety lifetime.
- Exit button click must never fire a shot.

## Success Criteria

The player can understand the Super Boss weapon within one click and can deliberately line up shots while dodging hostile fire.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current Release Note (v2.89)

v2.82 through v2.85 reworked Legendary mouse shots to share one updater, cap 14 active projectiles and retain homing/reward behavior. Latest v2.85 uses predictive target interpolation for smoother motion under delayed frames. Real Windows/browser FPS was not confirmed fixed; don't confuse the feel goal with the measured diagnostic result.
