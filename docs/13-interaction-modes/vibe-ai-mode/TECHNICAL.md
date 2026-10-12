# Vibe AI Mode - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Vibe AI Mode > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the playful runtime AI Mode overlay with animated screen treatment and rotating overconfident status messages.

> This page is the canonical technical documentation for **Vibe AI Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

```js
let vibeEnabled=false;
let vibeTimer=null;
let vibeAgent=null;
```

## Command

Player-facing:

```text
vibe
```

calls:

```js
setVibe(
  !vibeEnabled
);
```

Console output:

```text
AI MODE ENABLED // confidence 93% // understanding pending
```

or:

```text
AI MODE DISABLED
```

## Body State

The mode toggles:

```text
vibe-mode
```

on `body`.

## Agent Creation

`ensureVibeAgent()` lazily creates:

```html
<div class="vibe-agent">
  <i></i>
  <span>AI MODE // ONLINE</span>
</div>
```

and appends it to `body`.

## Status Lines

The current pool contains 16 authored strings.

Examples:

```text
AI MODE // making it more scalable
AI MODE // fixed the bug, probably
AI MODE // 93% confidence, comprehension pending
AI MODE // found three bugs, introduced four
AI MODE // one more refactor before shipping
AI MODE // token economy stable, actual economy unclear
```

## Rotation

On enable:

```js
let i=0;
```

The first line is shown immediately.

Then:

```js
vibeTimer =
  window.setInterval(
    ...,
    2600
  );
```

rotates through the list in order.

## Disable

Every `setVibe()` call first:

```js
window.clearInterval(
  vibeTimer
);
```

Disabling removes the active class from the agent and body mode class.

The agent DOM may remain cached for reuse.

## CSS

`body.vibe-mode::before` creates:

- two large crossing grid bands,
- horizontal scan-line repetition,
- screen blend.

`body.vibe-mode::after` creates a moving scan-light layer.

The agent itself uses rarity variables and a bright animated rainbow text treatment.

Epic applies a hue rotation to the screen layer.

Legendary applies a sepia/saturation adjustment.

## Telemetry

A state change increments:

```text
modes.vibeToggles
```

The core `setVibe()` helper does not persist the state.

## AI Wish Integration

The AI Vibe Refactor sequence stores:

```js
aiWishState.wasVibe
```

then calls:

```js
setVibe(true);
```

On Undo it only disables Vibe if it had been off before the Wish.

## QA

- Toggle through Console.
- Verify agent appears.
- Observe message rotation beyond one full 16-line loop.
- Toggle off and verify timer stops.
- Reload while active and verify mode resets.
- Trigger AI Wish with Vibe off, then Undo.
- Trigger AI Wish with Vibe already on, then Undo.
- Confirm prior player state is preserved.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
