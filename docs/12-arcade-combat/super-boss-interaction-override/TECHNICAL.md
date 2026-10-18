# Super Boss Interaction Override - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Super Boss Interaction Override > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily manages Interact Mode and cursor behavior so the Super Boss remains playable regardless of the player's previous interaction setting.

> This page is the canonical technical documentation for **Super Boss Interaction Override** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Shared Interaction State

The underlying helper is:

```js
contentInteractionSuppressed()
```

which returns true when either:

```js
superBossInteractOverride
```

or the player's owned Interact Mode setting is suppressing content.

## Encounter Start

`spawnSuperBoss()` captures:

```js
const interactionWasSuppressed=
  contentInteractionSuppressed();

const forcedInteractOff=
  !interactionWasSuppressed;
```

If the site was not already suppressed:

```js
superBossInteractOverride=true;
syncInteractToggle();
```

## What This Means

### Already Off

```text
forcedInteractOff = false
```

No temporary override is created.

The player's own Interact Mode remains the authority.

### Previously On

```text
forcedInteractOff = true
```

The encounter creates a temporary override.

That fact is stored in the Super Boss runtime state.

## Manual Interact Toggle

`setInteractMode()` checks:

```js
if(superBossInteractOverride)
```

and rejects the change.

The toast explains:

```text
The Super Boss temporarily owns interaction state.
Your previous setting will be restored afterward.
```

## Body State

`syncInteractToggle()` toggles:

```text
interaction-hunt
```

on `body`.

The Super Boss arena remains the top combat surface above that suppressed page.

## End Restoration

`endSuperBoss()` checks:

```js
if(s.forcedInteractOff){
  superBossInteractOverride=false;
  syncInteractToggle();
}
```

Therefore only an override created by this encounter is removed.

The player's pre-existing Interact Mode preference is not modified.

## Cursor

CSS on:

```text
.superboss-arena
```

uses:

```text
cursor:none
```

The encounter renders:

```text
.superboss-cursor
```

instead.

## Pointer Input

Arena `pointermove` writes:

```js
state.pointerX=e.clientX;
state.pointerY=e.clientY;
```

The render loop derives gameplay cursor position from:

```text
pointer + knockback
```

and clamps it to the viewport.

## Player Fire

Arena `pointerdown`:

- requires left button,
- ignores `.superboss-exit`,
- calls `preventDefault()`,
- fires the dedicated upward shot.

No Legendary check exists in this encounter input path.

## Wheel

The arena adds:

```js
wheel
```

listener with:

```js
preventDefault()
```

and `passive:false`.

## Escape

A document key handler exits on Escape while Victory is not already being shown.

## QA

Test four cases:

1. Interact Toggle not owned, encounter starts.
2. Interact Toggle owned and normal content ON.
3. Interact Toggle owned and player already set content OFF.
4. Encounter exits through Victory.

For each, verify post-encounter interaction state exactly matches the pre-encounter player preference.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current implementation correction (v3.25.2)

`contentInteractionSuppressed()` returns true for `superBossInteractOverride` independently from owned player `interact-toggle`. `syncInteractToggle` displays effective OFF state. `setInteractMode` rejects changing it during the encounter; teardown removes the override and re-syncs controls without mutating the player preference.

Earlier sections are historical where they conflict with this current specification. See [release evolution](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).
