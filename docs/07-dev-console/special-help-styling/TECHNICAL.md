# Special Help Styling - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Special Help Styling > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Preserves special treatments such as the rainbow Wish command and the red Blueprint repair state inside clickable Help output.

> This page is the canonical technical documentation for **Special Help Styling** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Wish Class

When Help renders the `wish` command:

```js
button.classList.add(
  'console-wish-command',
  ...(hasWishCharge()
      ? ['console-wish-ready']
      : [])
);
```

## Blueprint Class

When Help renders `blueprint` and the Wish reference is broken:

```js
button.classList.add(
  'console-blueprint-error'
);
```

## Live Refresh

`updateConsoleHelpCommandVisuals()` updates already-rendered buttons.

Wish:

```js
document.querySelectorAll(
  '.console-wish-command'
)
```

Blueprint:

```js
document.querySelectorAll(
  '[data-console-command="blueprint"]'
)
```

## Wish Ready State

The Wish class toggles based on:

```js
hasWishCharge()
```

Its title becomes:

```text
Celestial charge ready // run wish
```

when charged.

## Blueprint Error State

The Blueprint error class toggles based on:

```js
wishBlueprintErrorActive &&
!wishHasIsValid
```

Its title becomes:

```text
REPAIR REQUIRED // open BP_WishManager
```

## CSS

Normal help buttons use:

```text
.console-help-command
```

Special classes include:

```text
.console-wish-command
.console-wish-ready
.console-blueprint-error
```

v2.78 contains explicit Wish hover and focus rules so generic clickable-command styling does not erase the animated gradient.

## Update Calls

Wish charge persistence calls:

```js
updateWishCommandVisuals()
updateConsoleAttention()
```

Blueprint failure and repair paths also refresh Console visuals.

## QA

- open Help with no Wish charge,
- verify Wish glyphs are readable,
- force `dev attention wish`,
- verify existing Help line updates,
- force `dev attention blueprint`,
- verify Blueprint turns error color,
- repair with `dev blueprint fixed`,
- verify error state clears,
- hover/focus both commands in all states.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
