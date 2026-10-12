# Hidden Console Commands - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Hidden Console Commands > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines deliberately undocumented commands such as god mode, please, and I know Mippi as optional easter eggs.

> This page is the canonical technical documentation for **Hidden Console Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Current Hidden Set

`executeConsoleCommand()` defines:

```js
const hiddenCommands =
  new Set([
    'godmode',
    'god mode',
    'please',
    'i know mippi'
  ]);
```

## Telemetry

Player commands are passed to:

```js
telemetryRecordCommand(...)
```

with:

```js
hidden: hiddenCommands.has(command)
```

This allows the Player Model and Session Report to recognize hidden-command behavior.

## Godmode

Both aliases call:

```js
unlockAllAchievementsGodMode()
```

## Please

The command searches for:

```text
.shooting-star
```

If missing, it prints a warning.

If present:

- sets telemetry collection method to `please`,
- calls the star's click behavior.

## I Know Mippi

The command first requires:

```js
unlockedAchievements.size ===
ACHIEVEMENT_KEYS.length
```

If Legendary is already unlocked, it prints a flavor response.

Otherwise it calls:

```js
unlockLegendaryMode()
```

## Help Exclusion

None of these strings appear in `listCommands()`.

## QA

- run `help`, verify hidden commands absent,
- run each command directly,
- verify telemetry marks hidden usage,
- test `please` with and without star,
- test `i know mippi` before and after 10/10 Signals.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
