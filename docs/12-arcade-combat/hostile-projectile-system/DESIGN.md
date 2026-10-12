# Hostile Projectile System - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Hostile Projectile System > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets UFOs and bosses fire at the player while ensuring impacts, misses, and cleanup do not leave stale projectiles on screen.

> This page is the canonical design documentation for **Hostile Projectile System** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Hostile projectiles let the arcade layer push back without introducing a conventional player-health economy.

The target is the player's cursor.

A hit should feel like:

- the UFO successfully attacked,
- the player should move,
- the site reacted.

A hit should not:

- remove Rupees,
- reset achievements,
- close content,
- kill the browser session,
- create a hidden health system.

The projectile system creates pressure without attaching a punitive progression cost.

## Regular Projectile Model

Regular UFO and normal Boss shots aim toward the cursor position that existed when the shot was fired.

The projectile travels toward that aim point.

Collision, however, is checked against the cursor's current live position.

This means:

- moving away can dodge,
- moving back into the path can still be hit,
- the projectile does not unrealistically home after launch.

## Cosmetic Damage

A hit produces:

- brief screen/static feedback,
- an impact burst,
- telemetry,
- a one-time Console joke.

The first hit explains that the damage is cosmetic and the resume remains unharmed.

This reinforces that the arcade layer cannot destroy professional content.

## Projectile Readability

Regular hostile shots use a high-contrast white/cyan presentation in every rarity theme.

Combat readability is more important than strict page-palette purity.

This is a deliberate semantic color exception.

## Slowmo

Slowmo affects newly fired standard hostile shots.

It increases travel time, making them visibly easier to dodge.

The first slowed hostile shot can trigger the `Slowmo + UFO` system combo.

## Boss Use

The normal Boss uses the same standard projectile system, but fires increasingly complex volleys as core health drops.

The Super Boss uses a dedicated projectile implementation because it needs:

- full-screen coordinates,
- rockets,
- cursor knockback,
- custom Slowmo physics.

The design principle remains the same: projectiles must always resolve and clean up.

## Super Boss Impacts

Super Boss bullets and rockets do not use the normal cosmetic-only hit response.

They push the gameplay cursor away from the projectile source.

The actual operating-system pointer is never moved.

This keeps the effect browser-safe while still producing mechanical disruption.

## Cleanup Philosophy

No hostile projectile is allowed to exist indefinitely.

This rule was hardened after a stale-projectile bug.

The standard projectile implementation now uses:

- requestAnimationFrame motion,
- target completion cleanup,
- timeout cleanup,
- absolute cleanup guard.

Super Boss projectiles similarly have:

- lifetime checks,
- viewport bounds checks,
- timeout cleanup.

## Design Rules

- Regular projectile hits never remove progression.
- Projectiles must remain visually readable.
- Standard shots are dodgeable through cursor movement.
- Slowmo affects hostile pacing.
- Standard and Super Boss projectile implementations both guarantee cleanup.
- Super Boss impacts affect only the gameplay cursor representation.
- No projectile can remain frozen on screen after its source disappears.

## Success Criteria

Hostile fire makes the arcade layer feel reactive while remaining safe, reversible, and incapable of corrupting the professional site.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
