# Doug Popup Cameo - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Popup Cameo > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Summons an interactive offscreen Doug cameo after Bone pickups so Doug can react even when his About card is not visible.

> This page is the canonical technical documentation for **Doug Popup Cameo** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## Visibility Test

`dougIsVisible()` reads the Doug card bounding rectangle and checks intersection with the viewport.

It returns true when the card overlaps the visible window.

## Popup Creation

`showDougPeek()` reuses one existing `.doug-peek` when available.

If absent, it creates:

```html
<button class="doug-peek"
        aria-label="Pet Doug">
```

with:

- heart row,
- Doug image,
- reaction label.

The button is appended directly to:

```js
document.body
```

rather than nested in a portfolio section.

## Shared Pet Handler

The popup click calls:

```js
petDoug(
  'peek',
  peek
);
```

This means popup petting uses the same:

- counter,
- achievement,
- reaction chain,
- command logic

as the main card.

## Label State

Normal:

```text
Doug approves this acquisition. Pet Doug.
```

Star Power:

```text
STAR POWER // Coolness surged. Pet the cool dog.
```

Cool Mode:

```text
COOL MODE // Doug has reached maximum cool. Pet Doug.
```

## Cool Class

The popup receives:

```text
star-cool
```

when either:

- `starPowered`,
- `coolMode`

is true.

`syncDougThemeVisuals()` then chooses the correct theme-specific image.

## Show Timing

The function forces animation restart by:

1. removing `show`,
2. forcing layout through `offsetWidth`,
3. re-adding `show`.

Auto-hide:

```text
4300 ms
```

## Pet Timing

When a popup is petted, `petDoug()`:

- changes the popup label to the current Doug reaction,
- adds `.petted`,
- removes `.petted` after 280 ms,
- replaces the hide timer with:
  - 2400 ms.

## Interaction Layer

v2.49 hardening gives `.doug-peek`:

```text
z-index:10070
```

and strips:

- border,
- padding,
- background,
- native appearance.

Children receive:

```text
pointer-events:none
```

so the entire visible image behaves as one button.

The root only enables pointer events while `.show`.

## Interact Mode

`body.interaction-hunt .doug-peek` explicitly remains:

- fully opaque,
- brighter,
- saturated,
- highlighted by a theme-aware radial glow.

This prevents popup Doug from looking disabled while still being a valid game-layer action.

## QA

- collect Bone with Doug card visible: no popup,
- collect Bone while About is offscreen: popup,
- pet popup,
- verify shared reaction/count,
- enable Interact Mode and collect Bone,
- verify popup remains lit and clickable,
- test normal, Star Power, and Cool Mode labels,
- test keyboard focus outline in all themes.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
