# Console Attention Cue - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Attention Cue > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Pulses the Dev Console control when a meaningful console action such as a charged Wish or Blueprint repair is waiting.

> This page is the canonical design documentation for **Console Attention Cue** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Console should not constantly demand attention.

It should call attention only when the player has a meaningful reason to open it.

There are currently two high-value states.

## Wish Ready

When the player catches a Shooting Star:

```text
WISH READY // ~ DEV CONSOLE
```

appears.

This tells the player:

- a charge exists,
- the Console is the next relevant destination.

## Blueprint Repair

After a failed Wish caused by the broken reference:

```text
FIX WISH // ~ DEV CONSOLE
```

appears.

This is a more urgent repair state.

It uses warmer error language than the normal rarity palette.

## Priority

Blueprint repair takes priority over Wish-ready.

This is important because the player may still have a preserved Wish charge while the Blueprint is broken.

The next useful action is repair, not another failed Wish.

## Open Suppression

When the Console is already open, the external dock stops pulsing.

The player is already in the relevant destination.

## Design Rules

- Only pulse for actionable state.
- Blueprint repair outranks Wish ready.
- Stop pulsing while Console is open.
- Restore correct cue after closing if state remains unresolved.
- Use theme-specific Wish treatment.
- Preserve semantic warning treatment for Blueprint error.
- Pair visual pulse with text and accessible label.

## Success Criteria

A player can recover from the Wish progression without needing to remember that the Console was involved.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
