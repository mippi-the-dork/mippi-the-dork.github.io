# Wish Charge Persistence - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Charge Persistence > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Preserves the celestial charge through the intended Blueprint failure so the player can repair the error and retry without waiting for another star.

> This page is the canonical design documentation for **Wish Charge Persistence** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Wish charge is valuable enough to create anticipation, but it should not become a punishment during the intended Blueprint repair puzzle.

The first attempted Wish is supposed to fail if BP_WishManager has not been repaired.

If that failure consumed the star, the player would learn the right lesson and then be forced to wait for another random celestial event before applying it.

That would add time without adding understanding.

The charge is therefore consumed only when a Wish successfully enters the validated Wish path.

## Persistence Goal

The charge survives:

- the intentional Blueprint runtime error,
- opening and closing BP_WishManager,
- inserting Is Valid,
- page reloads.

This allows the player to fail, repair, and retry.

## Capacity

The charge is binary:

```text
0 or 1
```

There is no stack of celestial charges.

## Long-Term Persistence

The charge is stored in local browser persistence.

That is intentionally stronger than Blueprint validation, which uses session storage.

A returning player can still have a Shooting Star charge even if their session-specific repair state is no longer present.

In that case, the site can naturally re-enter the repair path.

## Consumption Rule

Charge consumption belongs to the validated Wish function, not to the act of submitting Wish text.

This architecture directly enforces the design intent.

## Failure Rule

The invalid-reference path explicitly tells the player:

`CELESTIAL CHARGE PRESERVED // fix the reference and try wish again.`

The system should never silently consume the charge on this path.

## Full Reset

A full reset removes Wish charge like every other Mippi-owned persistent state.

## Design Rules

- Capacity is exactly one.
- Invalid Blueprint validation never consumes charge.
- Successful validated Wish consumes charge before branch resolution.
- Reload preserves the charge.
- Full reset clears it.
- The visible Console attention state should update immediately when the charge changes.
- A second forced charge while already full does not increase capacity.

## Success Criteria

The player can discover the broken Blueprint, repair it, and retry the Wish without waiting for another celestial event.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
