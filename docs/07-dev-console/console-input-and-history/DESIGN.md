# Console Input and History - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Input and History > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Handles command submission, command history, scrolling, focus, and pending multi-step command states.

> This page is the canonical design documentation for **Console Input and History** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Console input should behave like a lightweight developer terminal.

Players who already understand command lines should find familiar behavior.

Players who do not should still be able to use Help and clickable commands.

## Input Model

Commands are submitted as text.

The system normalizes:

- leading/trailing whitespace,
- repeated spaces,
- case.

This makes commands forgiving without creating fuzzy command matching.

## Command History

Up and Down arrows navigate previously submitted commands.

This supports:

- repeated testing,
- quick toggles,
- iterative Console play.

History is session-local runtime state.

It is not persisted across page reloads.

## Output Scrolling

New Console output automatically scrolls to the bottom.

This is important for multi-line command responses such as:

- Help,
- DEV Help,
- Wish progress,
- Stats,
- Reset confirmation.

## Focus

Opening the Console moves keyboard focus to the command input after a short delay.

This allows:

1. press tilde,
2. type immediately.

The delay allows the open animation and DOM state to settle first.

## Pending Multi-Step States

Some commands temporarily reinterpret the next line of input.

Current examples:

- Reset confirmation.
- Wish text entry.

The input still looks like the same Console, but the parser knows that the next line is data for the pending interaction rather than a normal command.

## Design Rules

- Up/Down history should never submit commands.
- Empty input does nothing.
- Unknown commands provide useful feedback.
- Multi-step state should always resolve or cancel cleanly.
- Console focus should not permanently trap the user.
- Escape remains a clear close action.

## Success Criteria

Typing in the Console feels predictable enough that repeated command use does not become friction.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
