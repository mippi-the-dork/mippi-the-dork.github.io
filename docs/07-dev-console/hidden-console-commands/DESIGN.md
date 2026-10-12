# Hidden Console Commands - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Hidden Console Commands > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines deliberately undocumented commands such as god mode, please, and I know Mippi as optional easter eggs.

> This page is the canonical design documentation for **Hidden Console Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Hidden Console commands preserve the feeling that the terminal has deeper behavior than Help reveals.

They are easter eggs, not progression requirements.

The player can find them by:

- experimentation,
- community sharing,
- intuition,
- reading code if they really want to.

## Current Hidden Commands

### godmode / god mode

A broad achievement cheat.

This is intentionally more destructive to progression purity than normal Cheat.

It exists as a classic game-console reference.

### please

If a Shooting Star is currently on screen, politeness collects it.

If no star exists, the Console says so.

### i know mippi

After completing the original Signal set, this can unlock Legendary through a deliberately silly name-dropping shortcut.

It should not work before the Rare set is complete.

## Help Exclusion

These commands do not appear in normal Help.

That is the defining feature of the category.

## Design Rules

- Hidden commands are optional.
- Hidden commands never expose private information.
- They can bypass progression only when deliberately designed to.
- Their use can be tracked as an assistance or chaos signal.
- They should not be required for achievements.

## Success Criteria

A player who experiments beyond Help can still discover surprises after they think they understand the Console.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
