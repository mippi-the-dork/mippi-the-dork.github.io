# Help Command - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Help Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lists player-facing commands by category and supports direct command execution by clicking command names.

> This page is the canonical design documentation for **Help Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Help should make the Console explorable without flattening every secret.

It is a curated player-facing command index.

The visible categories are:

- CORE
- NAV
- LINKS
- PROJECT
- SYSTEM
- FUN
- UNREAL

The temporary DEV command family is intentionally absent.

## Clickable Help

Every visible command is a button.

This serves several purposes:

- reduces typing friction,
- makes the Console usable with pointer input,
- makes command categories feel like an interactive command palette,
- preserves text-command behavior for keyboard users.

The buttons execute the same command path as typed input.

## Progressive Visibility

Some commands can appear only when the player is entitled to them.

For example, Design Mode is included in CORE only when Design Mode has been unlocked.

This lets Help reflect current capabilities without pretending unavailable systems are usable.

## Secret Preservation

Help intentionally does not list:

- hidden commands,
- DEV commands.

The Console remains discoverable without becoming exhaustive.

## Design Rules

- Categories should remain stable.
- Commands should be grouped by player intent.
- Clicking and typing must behave equivalently.
- Hidden commands stay hidden.
- DEV stays hidden.
- Current state can change styling without changing command meaning.
- Help should remain readable in every rarity theme.

## Success Criteria

A visitor can type `help`, understand the Console's main capabilities, and run a command without knowing terminal syntax.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
