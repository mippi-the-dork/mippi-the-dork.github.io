# Wish Command - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Wish Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Consumes or requests a celestial charge and enters the console's special Wish input state.

> This page is the canonical design documentation for **Wish Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

`wish` is one of the Console's most important progression commands.

It should feel special before the player fully understands why.

The command connects:

- Epic airspace,
- Shooting Stars,
- Console,
- Blueprint repair,
- authored Wish outcomes,
- Legendary unlock.

## No-Charge Behavior

If the player tries `wish` without a charge, the system does not simply say no.

It responds:

`Something just noticed the request.`

A Shooting Star is scheduled.

This turns curiosity into progression.

## Charged Behavior

With one celestial charge:

```text
What is your wish? // CELESTIAL CHARGE 1/1
```

appears.

The next submitted Console line is Wish text, not another command.

## Failed Validation

If BP_WishManager is still broken:

- the Wish fails,
- charge is preserved,
- repair instructions appear,
- the player can fix and try again.

Preserving the charge is important because forcing the player to wait for another Shooting Star after discovering the repair puzzle would add frustration without learning.

## Successful Validation

A valid Wish:

- resolves an authored or generic branch,
- records successful Wish progression,
- unlocks Legendary if appropriate,
- consumes the charge.

## Design Rules

- One Shooting Star powers one successful Wish.
- Failed Blueprint validation preserves the charge.
- Wish text is freeform.
- Special authored branches are optional.
- Generic Wish still succeeds after validation.
- Help styling makes Wish visually distinct.

## Success Criteria

The player experiences the Wish path as a connected chain of discovery rather than a sequence of unrelated easter eggs.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
