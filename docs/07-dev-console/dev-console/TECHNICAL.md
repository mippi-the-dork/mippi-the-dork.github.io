# Dev Console - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Dev Console > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the site's command-line interaction surface for navigation, toys, debugging, progression hooks, and secret systems.

> This page is the canonical technical documentation for **Dev Console** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM Structure

The Console is defined in `index.html` as:

```html
<div class="dev-console"
     id="dev-console"
     aria-hidden="true">

  <div class="console-output"
       id="console-output"
       aria-live="polite">
    <div>Type <b>help</b> for commands.</div>
  </div>

  <form class="console-input-row"
        id="console-form">
    <span>&gt;</span>
    <input id="console-input"
           autocomplete="off"
           spellcheck="false"
           aria-label="Developer console command" />
  </form>
</div>
```

A separate visible dock control uses:

```text
#console-tip-button
```

## Runtime References

`script.js` caches:

```js
const devConsole = document.querySelector('#dev-console');
const consoleClose = document.querySelector('#console-close');
const consoleForm = document.querySelector('#console-form');
const consoleInput = document.querySelector('#console-input');
const consoleOutput = document.querySelector('#console-output');
const consoleTipButton = document.querySelector('#console-tip-button');
```

## Open / Close

`openConsole(open = true)`:

- toggles `.open`,
- updates `aria-hidden`,
- records open/close telemetry,
- records meaningful `console_opened`,
- refreshes Console attention,
- focuses the input after a 60 ms delay when opening.

## Command Registry

Player commands live in the curated:

```js
const COMMANDS = { ... }
```

object.

There is no `eval`, `Function`, shell bridge, or arbitrary code execution path.

## Execution

`executeConsoleCommand(raw, {recordHistory=true})`:

1. trims input,
2. optionally records history,
3. echoes the command with `>`,
4. resolves any pending multi-step state,
5. normalizes whitespace and case,
6. detects DEV prefix,
7. records player-command telemetry except DEV,
8. runs the matching command handler,
9. prints an unknown-command warning if missing,
10. clears the input.

## Keyboard Shortcut

Global keydown handling toggles the Console when the user presses:

```text
`
~
```

provided the Console input itself is not currently focused.

Escape closes the Console after higher-priority popup checks.

## CSS

The Console begins off-screen with transform and opacity.

`.dev-console.open` moves it into view and restores pointer interaction.

The output area has a fixed maximum height with scrolling.

The Console follows global rarity theme styling.

## Output

`consolePrint(text, cls='')` creates:

```html
<div class="console-line ...">
```

with `textContent`, preventing injected HTML from ordinary command strings.

## Telemetry

Non-DEV commands are recorded through the Console telemetry system.

Hidden command usage can also be tracked.

DEV commands deliberately bypass normal command telemetry because QA forcing should not pollute the player model.

## QA

- open with visible control,
- open with tilde,
- close with X,
- close with Escape,
- run valid command,
- run unknown command,
- inspect history,
- click Help command button,
- verify no arbitrary JavaScript string executes,
- verify theme presentation in Rare, Epic, Legendary.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
