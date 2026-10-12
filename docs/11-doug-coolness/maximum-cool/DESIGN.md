# Maximum Cool - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Maximum Cool > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Records the first time Doug reaches 100 percent Coolness as a lasting mastery milestone used by the postgame achievement system.

> This page is the canonical design documentation for **Maximum Cool** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Maximum Cool is the historical meaning behind the temporary Cool Mode.

Cool Mode comes and goes.

Maximum Cool answers:

> Has the player ever reached Doug's limit?

That historical fact is what matters for postgame mastery.

## Why Historical State

If the postgame achievement checked the current meter, the player would have to reveal the postgame Ledger during the brief Cool Mode window.

That would be unreasonable.

The milestone is therefore recorded the first time the meter reaches maximum.

Once achieved, it remains true until full reset.

## Player-Facing Achievement

After the normal Finale reveal, the Epic achievement:

`Maximum Cool`

is awarded when the historical max-Cool state is true.

If the player had already reached Cool Mode before the postgame tier was revealed, the achievement should resolve immediately when the tier becomes available.

## Difference from Cool Mode

Cool Mode:

- temporary,
- runtime behavior,
- drains.

Maximum Cool:

- persistent historical flag,
- postgame condition,
- never drains.

The two concepts should not be conflated.

## Doug Wish Interaction

The Doug Executive Review Wish sets Coolness to maximum and activates Cool Mode.

That qualifies for Maximum Cool.

The postgame achievement does not care whether max Coolness came from:

- normal Bones,
- Star Power Bone acceleration,
- Doug Wish review,
- DEV forcing during QA.

Natural player progression still expects the systemic route.

## Design Rules

- Record milestone the first time Coolness reaches 100.
- Do not clear milestone when Coolness drains.
- Recognize pre-postgame completion.
- Full reset removes it.
- The postgame achievement checks the historical flag, not current meter value.

## Success Criteria

The player never has to repeat max Coolness simply because the postgame achievement tier was revealed later.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
