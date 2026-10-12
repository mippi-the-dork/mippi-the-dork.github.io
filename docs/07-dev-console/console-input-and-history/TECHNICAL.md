# Console Input and History - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Input and History > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Handles command submission, command history, scrolling, focus, and pending multi-step command states.

> This page is the canonical technical documentation for **Console Input and History** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

Current variables:

```js
let consoleHistory = [];
let consoleHistoryIndex = 0;
let consolePending = null;
```

History is memory-only.

## Submission

The form listener:

```js
consoleForm?.addEventListener('submit', event => {
  event.preventDefault();
  executeConsoleCommand(consoleInput?.value || '');
});
```

The browser never navigates or reloads because of form submission.

## Empty Commands

`executeConsoleCommand()` begins by trimming the raw string.

If empty:

```js
if(!raw) return;
```

## History Recording

When `recordHistory` is true:

```js
consoleHistory.push(raw);
consoleHistoryIndex = consoleHistory.length;
```

Clicked Help commands currently use the normal execution path, so they also participate in history.

## Arrow Navigation

Input keydown handling:

```js
ArrowUp
ArrowDown
```

uses `preventDefault()` and updates the input value.

Up:

```js
consoleHistoryIndex =
  Math.max(0, consoleHistoryIndex - 1);
```

Down:

```js
consoleHistoryIndex =
  Math.min(consoleHistory.length,
           consoleHistoryIndex + 1);
```

## Normalization

After pending-state checks:

```js
const normalized =
  raw.toLowerCase()
     .replace(/\s+/g,' ')
     .trim();
```

This means commands are case-insensitive and whitespace-tolerant.

## Multi-Word Resolution

The parser first checks whether the full normalized string is a key in `COMMANDS`.

If not, it falls back to the first word.

This allows exact multi-word commands such as:

```text
stat fps
stat unit
stat none
easy mode
unreal source
god mode
i know mippi
hey listen
```

while preserving first-word command families such as `dev`.

## Pending Reset

When:

```js
consolePending === 'reset_confirmation'
```

the next input is consumed as confirmation text.

It does not continue through ordinary command parsing.

## Pending Wish

When:

```js
consolePending === 'wish'
```

the next submitted line becomes Wish text.

It is not interpreted as a command.

## Focus

`openConsole(true)` schedules:

```js
window.setTimeout(
  () => consoleInput?.focus(),
  60
);
```

## QA

- submit empty input,
- submit with mixed case,
- submit with multiple spaces,
- run multi-word commands,
- navigate history past first/last entries,
- start Wish and type a string matching a command,
- confirm it is treated as Wish text,
- start Reset and type a normal command,
- confirm it is treated as cancellation text.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
