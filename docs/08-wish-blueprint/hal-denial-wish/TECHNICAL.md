# HAL Denial Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > HAL Denial Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Responds to exact wish or wishes inputs with the intentionally unhelpful HAL-style denial branch.

> This page is the canonical technical documentation for **HAL Denial Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Ordering

HAL is evaluated after:

- Mippi,
- Blender,
- Money

and before:

- Engine,
- AI,
- Game,
- Doug,
- Generic.

## Exact Regex

The branch uses:

```js
/^\s*wish(?:es)?\s*$/
```

against lowercased Wish text.

This allows surrounding whitespace but no other words.

## Branch Behavior

On match:

```js
telemetryWishBranch('hal');
```

Console prints:

```text
I'm sorry Dave, I'm afraid I can't do that.
```

with warning styling.

A transient toast shows:

```text
REQUEST DENIED
HAL // ONLINE
```

Then:

```js
showHalEye();
```

runs.

## Overlay

Static root:

```text
#hal-overlay
.hal-overlay
```

The overlay contains a HAL eye presentation.

It has:

```text
pointer-events: none
```

so it cannot trap the player.

## Duration

`showHalEye()`:

1. removes `.show`,
2. forces reflow,
3. re-adds `.show`,
4. removes `.show` after 3000 ms.

This allows the animation to restart on repeated HAL Wishes.

## Validated Success Already Happened

The HAL branch runs inside `grantValidatedWish()` after:

- charge consumption,
- successful Wish telemetry,
- Finale Wish persistence,
- base success effect,
- Legendary unlock attempt.

Therefore the denial branch does not reverse progression.

## QA

- Wish exact `wish`,
- Wish exact `wishes`,
- Wish `I wish for money`,
- verify money branch instead,
- Wish `I wish`,
- verify Generic unless another keyword matches,
- confirm HAL overlay auto-clears after three seconds.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
