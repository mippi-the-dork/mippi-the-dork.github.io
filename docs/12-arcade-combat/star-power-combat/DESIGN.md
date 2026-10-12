# Star Power Combat - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Star Power Combat > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets Star Power contact damage regular UFOs and interact with boss targets through explicit cooldown rules.

> This page is the canonical design documentation for **Star Power Combat** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Star Power temporarily changes the cursor from a pointer into a direct interaction surface.

For combat, that means:

- touch a regular UFO,
- destroy it,
- touch the normal Boss,
- deal one hit.

The player should feel temporarily overpowered without deleting a Boss instantly.

## Regular UFO

Star Power contact destroys a regular UFO through the same path as clicking it.

This means the kill still:

- increments invasion progress,
- rolls the Rupee reward,
- records the correct collection method.

The first discovery produces:

`SYSTEM COMBO // STAR POWER + UFO`

## Normal Boss

Star Power contact damages the six-HP Boss.

Because Star Power checks under the cursor every 70 ms, unrestricted contact would erase six health almost immediately.

The Boss therefore gets a repeat-contact cooldown.

A sustained overlap can deal repeated hits over time, but only about once every 700 ms.

## Super Boss Exclusion

The full-screen Super Boss does not use this contact-combat path.

It has its own gameplay cursor, player projectile system, and encounter rules.

This keeps the focused encounter readable.

## Combat as a System Combo

Star Power combat is one of the clearest examples of the site's cross-system design.

Star Power is not a separate combat mode with a bespoke enemy implementation.

It reuses existing target click paths and marks the collection method as `star_power`.

This lets independent systems acknowledge one another without duplicating reward logic.

## Design Rules

- Regular UFO dies on Star Power contact.
- Normal Boss takes one hit per legal contact window.
- Boss repeat-contact cooldown is approximately 700 ms.
- Underlying kill/reward logic remains shared.
- Super Boss remains on dedicated combat rules.
- First discoveries get System Combo feedback, not achievements.
- Star Power duration remains temporary.

## Success Criteria

Star Power feels genuinely powerful against the ambient arcade layer while the Boss still retains enough durability to remain an encounter.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
