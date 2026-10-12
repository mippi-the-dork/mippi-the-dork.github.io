# Help Command - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Help Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lists player-facing commands by category and supports direct command execution by clicking command names.

> This page is the canonical technical documentation for **Help Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entry Point

The command registry contains:

```js
help(){ listCommands(); }
```

## Groups

`listCommands()` prints:

### CORE

```text
help
clear
version
about
home
top
inspect
design, when unlocked
theme
debug
```

### NAV

```text
games
career
consulting
crafting
tools
resumes
projects
hero
```

### LINKS

```text
github
fab
steam
unreal source
learning
```

### PROJECT

```text
heavywater
azure
unmark
nda
```

### SYSTEM

```text
achievements
reset
cheat
stats
particles
```

### FUN

```text
doug
shipit
joke
ufo
twinkle
shroom
rupee
shop
hey listen
stars
wish
vibe
play
```

### UNREAL

```text
stat fps
stat unit
stat none
blueprint
compile
slowmo
easy mode
lumen
nanite
```

## Rendering

`consolePrintCommandGroup(label, commands)` creates:

```html
<div class="console-line console-help-line">
```

with a category span and one button per command.

Each button receives:

```js
button.dataset.consoleCommand = command;
```

## Click Execution

`#console-output` uses delegated click handling:

```js
const button =
  event.target.closest?.('[data-console-command]');
```

The command is passed directly into:

```js
executeConsoleCommand(command);
```

This keeps typed and clicked commands on one execution path.

## DEV Exclusion

`listCommands()` does not include any DEV category in v2.78.

The `dev` command still exists and can be typed manually.

This is deliberate.

## Dynamic Design Command

The CORE group includes:

```js
...(designModeUnlocked ? ['design'] : [])
```

so Design Mode appears only after entitlement.

## QA

- run `help`,
- verify all seven categories,
- verify no DEV category,
- click every safe navigation command,
- verify typed and clicked commands both echo into history,
- unlock Design Mode,
- reopen Help,
- verify `design` appears.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
