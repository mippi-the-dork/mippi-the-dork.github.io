# Control Strip Ordering - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Control Strip Ordering > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps the bottom-right mode controls in the final Design, Inspect, Interact, Hint order while separating console and theme controls into the left discovery dock.

> This page is the canonical technical documentation for **Control Strip Ordering** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## HTML Order

The mode cluster in `index.html` is:

```html
<div class="play-mode-controls"
     id="play-mode-controls"
     aria-label="Interaction and analysis modes">

  <button id="design-toggle" hidden>
    DESIGN
  </button>

  <button id="inspect-toggle">
    INSPECT
  </button>

  <button id="interact-toggle"
          hidden>
    INTERACT // ON
  </button>
</div>
```

The flexbox preserves that source order.

## Hint

HINT is a separate sibling fixed control:

```html
<button class="hint-trigger"
        id="hint-trigger">
  HINT
</button>
```

It is not part of `.play-mode-controls`.

## Desktop Positioning

Mode cluster:

```css
.play-mode-controls {
  position:fixed;
  right:76px;
  bottom:18px;
  z-index:245;
  display:flex;
  gap:6px;
}
```

Hint:

```css
.hint-trigger {
  position:fixed;
  right:18px;
  bottom:18px;
  z-index:251;
}
```

Because Hint occupies the far-right 18 px position and the cluster begins farther left, the visible sequence is:

```text
Design
Inspect
Interact
Hint
```

## Conditional Visibility

Design:

```js
designToggle.hidden =
  !designModeUnlocked;
```

Interact:

```js
interactToggle.hidden =
  !shopOwned.has(
    'interact-toggle'
  );
```

Inspect remains present.

Hint remains present.

## Interact Legacy Position Override

The Interact control still has an older `.interact-mode-toggle` fixed-position style.

Inside the mode cluster, v2.61 explicitly neutralizes it:

```css
.play-mode-controls
.interact-mode-toggle {
  position:static !important;
  right:auto !important;
  bottom:auto !important;
  z-index:auto !important;
}
```

This prevents it from escaping the flex ordering.

## Theme Styling

All `.play-mode-controls > button` values receive:

- Rare,
- Epic,
- Legendary

theme-aware borders, text, backgrounds, and active-state styling.

Hint has its own assistance-oriented gold base treatment with theme overrides.

## Bottom-Left Discovery Dock

`#discovery-controls` remains a separate fixed flex dock:

```text
left:18 px
bottom:18 px
z-index:245
```

It contains the Theme and visible Dev Console discovery controls alongside progression/discovery affordances.

The Console tip uses:

```text
#console-tip-button
```

and remains outside the mode strip.

## Mobile

At:

```text
max-width 760 px
```

mode cluster becomes:

```text
right:70 px
bottom:12 px
max-width:calc(100vw - 150px)
flex-wrap:wrap
justify-content:flex-end
```

Button minimum height drops from:

```text
34 px
```

to:

```text
32 px
```

Hint independently moves to:

```text
right:12 px
bottom:12 px
```

under its small-screen rule.

## Z-Order

Mode cluster:

```text
245
```

Hint:

```text
251
```

This preserves Hint as the rightmost assistance control and gives it a slightly higher local stacking order.

## QA

Test these entitlement matrices:

### Fresh

Expected:

```text
INSPECT
HINT
```

### Interact Purchased

Expected:

```text
INSPECT
INTERACT
HINT
```

### Design Unlocked

Expected:

```text
DESIGN
INSPECT
INTERACT
HINT
```

Also test:

- Rare,
- Epic,
- Legendary,
- narrow mobile width,
- achievement toasts,
- Optional Objective HUD,
- Console attention pulse,
- Super Boss interaction override.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.81 places Design, Documentation, Inspect, Interact in HUD Modes; Hint, Theme and Console move into HUD Utilities. v2.84 Docs control is hidden until Design Mode capstone unlocked; v2.83 `attention-new` only when Design Mode active and `mippi-docs-discovered-v1` absent. v2.87 desktop close-pairs Progress+Gameplay / Modes+Utilities.

See [Release History](../../RELEASE_HISTORY.md).
