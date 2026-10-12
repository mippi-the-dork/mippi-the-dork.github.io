# Interact Mode - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Interact Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets the player suppress ordinary portfolio interaction while keeping game-layer targets available for focused hunting and combat.

> This page is the canonical technical documentation for **Interact Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entitlement

The control is unlocked by Shop ownership:

```text
interact-toggle
```

`syncInteractToggle()` checks:

```js
const unlocked =
  shopOwned.has(
    'interact-toggle'
  );
```

Then:

```js
interactToggle.hidden =
  !unlocked;
```

## Runtime Player Preference

The player's manual mode state is:

```js
let interactModeEnabled=false;
```

This is runtime state in v2.78.

The Shop ownership that exposes the control is persistent, but the manual ON/OFF preference itself is not stored in a dedicated local-storage key.

## Encounter Override

A separate runtime flag is:

```js
let superBossInteractOverride=false;
```

The effective interaction-suppression state is derived from:

```js
function contentInteractionSuppressed(){
  return (
    superBossInteractOverride ||
    (
      interactModeEnabled &&
      shopOwned.has(
        'interact-toggle'
      )
    )
  );
}
```

## UI Synchronization

`syncInteractToggle()` calculates the effective suppressed state and updates:

```text
hidden
active
textContent
title
aria-pressed
```

Visible labels:

```text
INTERACT // ON
INTERACT // OFF
```

The body receives:

```text
interaction-hunt
```

when ordinary content interaction is suppressed.

## Toggle

Click:

```js
interactToggle?.addEventListener(
  'click',
  () =>
    setInteractMode(
      !interactModeEnabled
    )
);
```

`setInteractMode(active)` rejects the operation when:

- the Shop item is not owned,
- the Super Boss currently owns the temporary override.

## CSS Suppression

The main content receives:

```css
body.interaction-hunt main {
  opacity:.34;
  filter:
    brightness(.58)
    saturate(.70);
}
```

Ordinary interactive descendants are disabled:

```text
main a
main button
main input
main select
main textarea
main [role="button"]
```

through:

```css
pointer-events:none !important;
```

## Explicit Game Exceptions

Section Castles are restored:

```css
body.interaction-hunt
main
.section-castle {
  pointer-events:auto !important;
}
```

Additional later rules visually suppress normal interactive canvases and explicitly preserve game-layer surfaces such as `.doug-peek`.

## Super Boss

At Super Boss start:

```js
const interactionWasSuppressed =
  contentInteractionSuppressed();

const forcedInteractOff =
  !interactionWasSuppressed;
```

If needed:

```js
superBossInteractOverride=true;
syncInteractToggle();
```

At encounter end, only a temporary override created by that encounter is removed.

## Telemetry

Manual changes record:

```text
modes.interactModeToggles
meaningful: interact_mode
```

## DEV

```text
dev mode interact on
dev mode interact off
```

can force the mode for QA.

## QA

- Control hidden without Shop item.
- Purchase Interact Toggle.
- Verify control appears.
- Toggle OFF and test ordinary links.
- Verify Castle remains clickable.
- Verify game-layer pickups remain usable.
- Toggle ON and restore normal browsing.
- Start Super Boss from both ON and OFF player states.
- Exit encounter and confirm exact prior state restoration.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
