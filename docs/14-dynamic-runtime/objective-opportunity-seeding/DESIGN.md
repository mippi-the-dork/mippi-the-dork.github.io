# Objective Opportunity Seeding - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Opportunity Seeding > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Quietly creates fair target opportunities for timed objectives so success does not depend entirely on ambient random schedules.

> This page is the canonical design documentation for **Objective Opportunity Seeding** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

A timed objective is unfair if the player can do everything correctly and still fail because the required random object never appeared.

Opportunity Seeding fixes that.

When a challenge requires an ambient target, the objective quietly makes sure a reasonable opportunity enters the play space.

The challenge is still:

- notice it,
- react,
- collect or destroy it correctly.

The challenge is not:

- hope the random scheduler cooperates.

## Invisible Support

The system does not announce:

`I spawned this because of your objective.`

The object simply appears naturally within the objective window.

This preserves the fiction that the site's ambient systems are still alive.

## Supported Seeds

Current objective seeding supports:

- generic friendly pickups,
- Hearts,
- Rupees,
- Doug Bones,
- regular UFOs,
- Legendary-shot targets,
- active Castle placement.

## Multi-Target Objectives

Objectives requiring two interactions can seed a second opportunity later in the timer.

Examples:

- two pickups,
- two pickup types,
- two Doug Bones,
- two UFOs,
- two Legendary shots.

The second seed is delayed.

This prevents both required objects from spawning at exactly the same time and overwhelming the player.

## Star Power Contact

The Star Power UFO-contact challenge is deliberately aggressive.

Its timer is only six seconds.

The seeded UFO attempt begins after roughly 220 ms rather than the ordinary 900 ms seeding delay.

This gives the player a real chance to use the active temporary power before it expires.

## Attention Budget

Seeding still respects focused-attention blocking.

If a high-attention overlay is active:

- the seed retries,
- it does not silently appear underneath the overlay.

Current retry behavior allows several attempts before giving up.

This avoids creating unfair invisible targets.

## Forced Opportunity vs Automatic Success

Seeded objects use forced spawn routes where necessary so normal long cooldowns do not block them.

They are not auto-collected.

The player still has to perform the challenge.

This is a crucial distinction.

## Existing Target Detection

The seeder checks whether an appropriate target is already present.

If one exists, it does not necessarily create a duplicate.

This reduces clutter and preserves ambient readability.

## Design Rules

- Seed opportunity, never success.
- Respect focused-attention blocking.
- Avoid duplicate target families when a usable target already exists.
- Multi-target challenges can seed later follow-ups.
- Temporary-power objectives seed quickly.
- Reduced-motion eligibility should prevent incompatible flying objectives from being offered in the first place.
- Seeded targets should use the same real interaction routes as natural targets.

## Success Criteria

A player can fail a timed objective because they missed the challenge, not because the required game object never appeared.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
