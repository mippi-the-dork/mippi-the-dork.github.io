# Wish Result Overlay Framework - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Result Overlay Framework > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides player-dismissible result screens for authored Wishes that need enough time to be read and understood.

> This page is the canonical technical documentation for **Wish Result Overlay Framework** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Active Cleanup Handle

Shared sequence state uses:

```js
let activeWishSequenceCleanup=null;
```

## Clear Function

`clearActiveWishSequence()`:

1. invokes the current cleanup callback if present,
2. sets it to null,
3. removes:
   - `.wish-sequence-overlay`
   - `.doug-directive`
   - `.doug-approval-stamp`
4. removes body class:
   - `doug-review-bigger`

## Timer Helpers

Sequences use:

```js
wishSequenceLater(fn,delay,timers)
wishSequenceInterval(fn,delay,timers)
wishSequenceCleanupTimers(timers)
```

Each sequence owns an array of timer IDs.

This centralizes cancellation.

## Close Activation

`enableWishSequenceClose(overlay,{label,onClose})`:

- finds `.wish-sequence-close`,
- enables it,
- updates label,
- adds `.ready`,
- adds a one-time click listener,
- focuses it after 80 ms with `preventScroll:true`.

This is the common v2.72 player-agency behavior.

## Sequence Timings

Current close-ready times:

| Sequence | Close enabled |
| --- | ---: |
| Engine Port | 8600 ms |
| Doug Executive Review | 8500 ms |
| Game Success | 11000 ms |

## Sequence Classes

Shared root class:

```text
wish-sequence-overlay
```

Specific root classes:

```text
engine-port-overlay
game-success-overlay
doug-review-overlay
```

## High-Attention Detection

The Adaptive Director and Finale attention checks include:

```text
.wish-sequence-overlay
.wish-special-popup.open
.hal-overlay.show
```

so major Wish results can temporarily block competing authored attention.

## AI Exception

AI uses:

```text
aiWishState
```

rather than `activeWishSequenceCleanup`.

`dev clean` explicitly calls:

```js
undoAiWish({announce:false})
```

to guarantee AI corruption is restored during QA cleanup.

## Dedicated Popups

Mippi and Blender use static popup roots with `.wish-special-popup`.

Those have their own open/close functions rather than the shared sequence timer helpers.

## QA

- trigger Engine Port and wait for completion,
- verify close remains until clicked,
- trigger Game Success and verify same,
- trigger Doug Review and verify same,
- trigger a second shared sequence while first is active,
- verify old one is cleaned,
- use `dev clean`,
- verify no temporary Wish overlay remains,
- separately verify AI requires Undo rather than sequence close.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
