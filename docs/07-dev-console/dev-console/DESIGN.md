# Dev Console - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Dev Console > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the site's command-line interaction surface for navigation, toys, debugging, progression hooks, and secret systems.

> This page is the canonical design documentation for **Dev Console** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Dev Console turns experimentation into a legitimate play style.

It exists for visitors who naturally learn systems by poking at them, typing commands, trying old Unreal habits, and looking for hidden responses.

The console is intentionally diegetic to the rest of the portfolio.

It feels like a development surface rather than a generic website terminal.

## Experience Role

The Console supports several kinds of interaction:

- professional navigation,
- external links,
- portfolio project shortcuts,
- system inspection,
- visual modes,
- toys,
- Unreal jokes,
- recovery paths,
- Wish progression,
- hidden commands,
- temporary QA commands.

The Console should feel broad enough that experimentation is rewarded, but structured enough that a player can understand the available command categories.

## Discoverability

The Console can be opened through:

- the visible `TIP // ~ DEV CONSOLE` control,
- the backtick or tilde keyboard shortcut.

The visible control matters because the console is not meant to be discoverable only by people who already know to press tilde.

## Design Language

The Console uses:

- monospace text,
- compact technical spacing,
- command prompts,
- status colors,
- Unreal-inspired command vocabulary,
- in-line clickable commands in Help,
- warning and success states.

The visual language changes with Rare, Epic, and Legendary themes while preserving terminal readability.

## No Arbitrary Code Execution

The Console is playful, not a real browser shell.

It accepts a curated command map.

It does not evaluate JavaScript, execute shell commands, or expose arbitrary code execution.

This keeps the system safe, deterministic, and compatible with a static GitHub Pages deployment.

## Command Categories

The player-facing command surface is grouped conceptually into:

- Core
- Navigation
- Links
- Project
- System
- Fun
- Unreal

The temporary `DEV` command family remains hidden from normal Help.

## Progression Relationship

The Console participates in several real progression systems:

- Wish command unlock,
- Blueprint repair,
- Cheat,
- Stats,
- Shop access,
- collectible spawning,
- Mippi Bird,
- hidden Legendary shortcut,
- optional modes.

This makes it more than a novelty.

## Attention State

The visible Console control can become actionable:

- `WISH READY // ~ DEV CONSOLE`
- `FIX WISH // ~ DEV CONSOLE`

The Console itself suppresses its external attention pulse while already open.

## Accessibility

The Console uses a real text input and form.

Output is exposed as a polite live region.

Visible command buttons in Help allow mouse or keyboard users to run commands without retyping them.

## Design Rules

- The Console never accepts arbitrary eval.
- Player-facing Help should remain organized.
- DEV commands remain hidden from normal Help.
- Core professional navigation must remain available outside the Console.
- Critical progression should have visual guidance outside the Console once it becomes relevant.
- Command output should explain state clearly enough to recover from mistakes.
- Destructive Reset requires explicit confirmation.
- Hidden commands should feel optional and playful, not mandatory.

## Success Criteria

The Dev Console succeeds when a curious visitor can spend several minutes exploring it, discover meaningful systems, and still understand that it is a curated portfolio interaction rather than a real developer shell.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
