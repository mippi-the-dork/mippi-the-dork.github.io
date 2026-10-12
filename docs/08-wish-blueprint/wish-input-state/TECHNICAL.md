# Wish Input State - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Input State > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Transforms the console from normal command mode into an explicit prompt that waits for the player's Wish text.

> This page is the canonical technical documentation for **Wish Input State** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Pending State

The Console uses:

```js
let consolePending = null;
```

The Wish command sets:

```js
consolePending = 'wish';
```

and prints:

```text
What is your wish? // CELESTIAL CHARGE 1/1
```

## Parser Priority

`executeConsoleCommand()` checks pending state before normal command normalization.

When:

```js
consolePending === 'wish'
```

the function:

1. clears `consolePending`,
2. stores the raw submitted line as `wishText`,
3. records Wish-attempt telemetry,
4. prints `Your wish is being granted.`,
5. creates a Console progress bar,
6. starts the validation presentation,
7. returns without parsing the text as a command.

## Command-Like Wish Text

Because pending Wish is handled before:

```js
raw.toLowerCase()
```

command resolution, text such as:

```text
help
game
doug
wish
```

is treated as Wish text.

This is intentional.

## Progress Bar

The function creates:

```html
<div class="console-progress">
  <i></i>
</div>
```

Progress begins at 0.

Every 120 ms it increments by:

```text
8 to 22 percentage points
```

approximately.

The bar is clamped to 100 percent.

## Completion Delay

After progress reaches at least 100, the function waits another:

```text
220 ms
```

before processing validation.

## Valid Path

If:

```js
wishHasIsValid
```

is true:

```js
grantValidatedWish(wishText);
```

runs.

## Invalid Path

Otherwise the system:

- increments failed Wish telemetry,
- records `wish_failed` with reason `invalid_reference`,
- sets `wishBlueprintErrorActive=true`,
- refreshes Console attention,
- prints Accessed None output,
- prints repair suggestion,
- prints clickable `[FIX NOW] Open Blueprint`,
- prints charge-preserved confirmation,
- refreshes Meta Trace.

## Input Cleanup

After creating the sequence:

```js
consoleInput.value='';
```

The input returns to normal command behavior because `consolePending` has already been cleared.

## QA

- charge Wish,
- run `wish`,
- submit `help`,
- verify it becomes Wish text rather than Help,
- repeat with `game`,
- test invalid Blueprint,
- repair,
- retry,
- verify next input returns to ordinary command parsing after resolution.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
