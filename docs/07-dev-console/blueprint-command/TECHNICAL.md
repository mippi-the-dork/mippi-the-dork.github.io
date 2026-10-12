# Blueprint Command - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Blueprint Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Opens BP_WishManager and becomes visually urgent when the Wish path is broken.

> This page is the canonical technical documentation for **Blueprint Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command Handler

The command registry contains:

```js
blueprint(){
  openBlueprint();
  consolePrint(
    'Opening BP_WishManager. There may be a familiar runtime problem in here.'
  );
}
```

## Error State

Runtime state includes:

```js
let wishBlueprintErrorActive =
  (Number(sessionTelemetry.wish?.failed)||0) > 0 &&
  !wishHasIsValid;
```

## Attention

When broken, Blueprint affects:

- Help command class,
- Help command title,
- Console dock attention.

## Wish Failure

If Wish validation fails:

```js
wishBlueprintErrorActive = true;
updateConsoleAttention();
```

The Console prints:

```text
ERROR: Blueprint Runtime Error: Accessed None trying to read property WishFulfillment.
```

then a repair suggestion.

## Inline Repair Action

The Console creates a clickable action:

```text
[FIX NOW] Open Blueprint
```

using `consolePrintAction()`.

## DEV Commands

```text
dev blueprint broken
dev blueprint fixed
```

Both use the same Wish state forcing and open BP_WishManager.

## QA

- open Blueprint in clean state,
- force broken state,
- verify Help styling,
- verify FIX WISH dock,
- click inline FIX NOW,
- repair state,
- verify Blueprint error visuals clear.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
