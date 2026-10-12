# Console Attention Cue - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Attention Cue > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Pulses the Dev Console control when a meaningful console action such as a charged Wish or Blueprint repair is waiting.

> This page is the canonical technical documentation for **Console Attention Cue** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## State Function

`consoleAttentionState()` returns:

```text
null
wish
blueprint
```

as an object with:

- kind,
- label,
- title.

## Suppression

First check:

```js
if(devConsole?.classList.contains('open'))
  return null;
```

## Blueprint Priority

Blueprint repair condition:

```js
wishBlueprintErrorActive &&
!wishHasIsValid
```

Result label:

```text
FIX WISH // ~ DEV CONSOLE
```

## Wish Ready

Wish condition:

```js
hasWishCharge()
```

Result label:

```text
WISH READY // ~ DEV CONSOLE
```

The tooltip differs depending on whether the Blueprint is already valid.

## Application

`updateConsoleAttention()` toggles:

```text
attention-ready
attention-wish
attention-blueprint
```

on `#console-tip-button`.

It also updates:

- button text,
- title,
- `aria-label`.

## Theme Animation

Wish attention has separate rarity treatments.

Blueprint repair uses the dedicated semantic error treatment.

## Refresh Points

Attention is refreshed when:

- Console opens/closes,
- Wish charge changes,
- Blueprint enters error state,
- Blueprint repair changes,
- DEV attention commands force state.

## DEV Commands

```text
dev attention wish
dev attention blueprint
```

## QA

- no state: normal TIP label,
- charged Wish: WISH READY,
- open Console: pulse clears,
- close Console: cue returns,
- broken Blueprint with charge: FIX WISH wins,
- repair Blueprint: returns to WISH READY if charge remains.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
