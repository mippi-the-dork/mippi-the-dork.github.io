# BP_WishManager - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > BP_WishManager > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the deliberately broken Blueprint-themed repair screen used as the central Epic-to-Legendary progression puzzle.

> This page is the canonical technical documentation for **BP_WishManager** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The root is:

```html
<div class="blueprint-popup"
     id="blueprint-popup"
     aria-hidden="true">
```

The window uses:

```html
role="dialog"
aria-modal="true"
aria-labelledby="blueprint-title"
```

Title:

```text
BP_WishManager // Event Graph
```

## Graph Nodes

Current static nodes:

### Event

```text
Wish Event
Wish Text
Exec out
```

### Validation

```text
Is Valid
WishFulfillment
Exec in
Is Valid exec out
```

### Grant

```text
Grant Wish
Wish Text
Exec in
```

## Insert Button

The repair button is:

```html
<button id="blueprint-add-valid"
        aria-label="Insert Is Valid node"
        aria-describedby="blueprint-add-hint">
```

Visible glyph:

```text
+
```

Hint:

```text
CLICK + TO INSERT Is Valid
```

## State Key

Validation uses session storage:

```text
mippiWishHasIsValid
```

At startup:

```js
wishHasIsValid =
  sessionStorage.getItem(WISH_VALID_KEY) === '1';
```

## Error State

Separate runtime state:

```js
wishBlueprintErrorActive
```

is initialized from failed Wish telemetry plus current validity.

This state drives Console attention and Help error styling.

## Open Function

`openBlueprint()`:

- records `blueprintOpens`,
- records meaningful `blueprint_opened`,
- adds `.open`,
- sets `aria-hidden=false`,
- calls `updateBlueprintState()`,
- recalculates wire geometry after nested animation frames.

## Wire Geometry

The wire paths are not hardcoded.

`updateBlueprintWires()` reads actual execution-pin screen positions and generates cubic Bezier paths through:

```js
blueprintSpline(from,to)
```

This avoids graph wires becoming incorrect after responsive or layout changes.

## Broken Layout

The direct wire path is always computed:

```text
Wish Event -> Grant Wish
```

## Validated Layout

When `wishHasIsValid` is true, two additional wires are rendered:

```text
Wish Event -> Is Valid
Is Valid -> Grant Wish
```

CSS validated state determines the visual emphasis of the repaired path.

## Responsive Update

Window resize calls:

```js
updateBlueprintWires()
```

while the popup is open.

## Close

The popup closes through:

- titlebar close button,
- background click,
- Escape key.

Closing does not clear `wishHasIsValid`.

## QA

- open before any failure,
- inspect broken status,
- resize popup/window,
- verify wires still connect pins,
- insert Is Valid,
- verify validated status,
- close/reopen,
- verify same-session repair remains,
- reload same tab,
- verify sessionStorage behavior,
- begin a new browser session and verify session-scoped repair resets.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
