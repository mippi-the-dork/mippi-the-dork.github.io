# Mega Laser - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mega Laser > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the Super Boss beam attack that pauses boss movement while continuously tracking the player's cursor at a controlled rate.

> This page is the canonical design documentation for **Mega Laser** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Mega Laser is the Super Boss's signature attack.

It should not behave like a snapshot beam that the player dodges once.

It should create continuous positional pressure.

The intended behavior is:

1. Boss stops translating.
2. Beam begins charging toward the player's current cursor.
3. Beam becomes active.
4. Boss remains stationary.
5. Beam slowly rotates toward the moving cursor.
6. Player must continue moving.
7. Beam ends.
8. Boss resumes movement from the same movement phase.

## Why the Boss Stops

A moving Boss plus a tracking beam creates difficult-to-read combined motion.

Freezing Boss translation lets the player understand the beam as one deliberate tracking threat.

It also fixes a previous technical problem where the Boss movement phase continued invisibly during the beam and then teleported to a new sine position when the attack ended.

The current design pauses the Boss movement clock itself.

## Controlled Tracking

The beam does not snap directly to the cursor every frame.

It rotates toward the cursor at a capped angular rate.

This makes the attack dodgeable.

The player can continuously outrun the beam by moving intelligently.

## Charge Telegraph

The beam begins in a narrow charging state.

The player can see:

- origin,
- approximate direction,
- impending attack.

Only after the charge period does the beam become the thick damaging laser.

## Collision

The active beam checks the gameplay cursor's distance from the beam line.

If the cursor enters the beam width, it applies the strong Mega Laser knockback response.

A short general Super Boss hit lock prevents absurd repeated impact spam every animation frame.

## Slowmo

Slowmo makes the attack more forgiving by changing several variables together:

- longer charge,
- longer active duration,
- slower angular tracking.

The beam stays alive longer, but its movement becomes easier to read and evade.

## Design Rules

- Boss translation freezes for entire beam sequence.
- Movement phase pauses rather than continuing invisibly.
- Beam tracks continuously.
- Tracking is capped, not instant.
- Charge is visible before damage.
- Collision uses gameplay cursor.
- Slowmo changes charge, active duration, and turn rate.
- Beam removes itself cleanly at completion or encounter end.

## Success Criteria

The player has to keep dodging throughout the active beam and never sees the Boss teleport when normal movement resumes.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
