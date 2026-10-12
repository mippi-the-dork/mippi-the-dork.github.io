# Interact Toggle Shop Item - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Interact Toggle Shop Item > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that unlocks the Interact Mode control.

> This page is the canonical technical documentation for **Interact Toggle Shop Item** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'interact-toggle',
  cost:4,
  slot:'passive',
  rarity:'epic',
  tag:'FOCUS',
  requires:'epic'
}
```

## Ownership Check

`syncInteractToggle()` uses:

```js
const unlocked =
  shopOwned.has('interact-toggle');
```

Then:

```js
interactToggle.hidden=!unlocked;
```

## Interaction State

The player's own preference is:

```js
let interactModeEnabled=false;
```

Effective suppression is:

```js
superBossInteractOverride ||
(
  interactModeEnabled &&
  shopOwned.has('interact-toggle')
)
```

## Body Class

The effective state toggles:

```text
interaction-hunt
```

on `body`.

CSS uses this to disable normal content interaction.

## Control Text

Effective normal interaction off:

```text
INTERACT // OFF
```

Normal content restored:

```text
INTERACT // ON
```

## Manual Toggle

`setInteractMode(active)` rejects use when item is not owned.

During Super Boss override, it shows a toast explaining that encounter state temporarily owns the control.

## Telemetry

Manual toggles record:

```text
modes.interactModeToggles
meaningful: interact_mode
```

## QA

- before ownership: control hidden,
- purchase after Epic: control appears,
- toggle OFF: normal links suppressed,
- game pickups remain active,
- toggle ON: normal content restored,
- start Super Boss from each prior setting,
- verify temporary override and restoration.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
