# Golden Trigger - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Golden Trigger > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** A Legendary gameplay item that improves Legendary cursor targeting range and projectile speed.

> This page is the canonical design documentation for **Golden Trigger** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Golden Trigger is the Legendary gameplay-slot item.

It enhances a mechanic the player already earned through Legendary progression:

cursor-fired projectiles that can acquire moving game-layer targets.

The item should feel like a precision upgrade, not a requirement to make Legendary cursor shooting functional at all.

## Effect

When equipped:

- target acquisition range increases,
- player projectile travel speed increases.

This helps the player hit:

- Shooting Stars,
- UFO targets,
- friendly flying pickups,
- Doug Bones.

## Theme Independence

The item description explicitly states:

`in every visual theme`.

That matters.

Legendary cursor gameplay belongs to Legendary progression.

The player can switch the site to Rare or Epic presentation and still use Golden Trigger.

## Slot

Golden Trigger is a gameplay item.

It competes with Rare gameplay modifiers.

This creates a late-game choice:

- stronger targeting,
- slower pickups,
- longer Star Power,
- more collectible bias,
- more Doug Bones.

## Cost

```text
5 Rupees
```

## Requirement

Legendary progression.

## Design Rules

- Requires Legendary progression, not Legendary active theme.
- Only works while equipped.
- Base Legendary shooting remains functional without it.
- Improve range and speed, not damage.
- Does not auto-fire.
- Preserve one gameplay slot rule.

## Success Criteria

Golden Trigger makes Legendary cursor play feel sharper without becoming mandatory for the mechanic to be enjoyable.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
