# Wish Input State - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Input State > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Transforms the console from normal command mode into an explicit prompt that waits for the player's Wish text.

> This page is the canonical design documentation for **Wish Input State** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Dev Console normally interprets every line as a command.

A Wish needs a different interaction model.

After entering `wish`, the next line should be treated as freeform Wish text, not as another Console command.

This creates a simple two-step exchange:

```text
> wish
What is your wish?

> I wish my game was successful
Your wish is being granted.
```

## Why a Pending State

Freeform Wish input can contain words that are also real commands.

Examples:

- game
- doug
- blueprint
- help
- wish

The site must not interpret those words as Console commands while it is waiting for Wish text.

A dedicated pending state makes the interaction unambiguous.

## Charge Gate

The Console enters Wish input state only when a celestial charge exists.

Without one, the command schedules a Shooting Star instead.

## Progress Presentation

Submitting Wish text starts a fake progress bar.

This moment is intentionally theatrical.

The system already knows whether BP_WishManager is valid, but the delay creates time for the player to anticipate whether reality will survive.

## Validation Outcome

At completion:

### Blueprint Valid

The Wish enters `grantValidatedWish()`.

### Blueprint Invalid

The system produces the Accessed None error, preserves the charge, and points the player to BP_WishManager.

## Design Rules

- The next line after a charged `wish` is always Wish text.
- Wish text can contain command names.
- Empty Console submission remains ignored by the normal input system.
- Pending state resolves after one Wish text submission.
- Validation result appears only after the progress sequence.
- Failed validation preserves charge.
- The player can retry after repair by running `wish` again.

## Success Criteria

The player clearly understands when the Console is asking for a command versus asking for the content of a Wish.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
