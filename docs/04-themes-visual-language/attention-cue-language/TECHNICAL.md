# Attention Cue Language - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Attention Cue Language > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the shared blink, pulse, flash, and glow language used to direct attention toward actionable progression UI.

> This page is the canonical technical documentation for **Attention Cue Language** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Rupee Attention

State is calculated by:

```js
affordableShopItems()
```

and:

```js
updateRupeeAttention()
```

The active condition is:

```js
rupeeDiscovered &&
affordable.length > 0 &&
!shopPopup?.classList.contains('open')
```

When active:

```text
shop-ready
```

is applied to the Rupee meter.

The meter also receives:

- affordable-count data,
- tooltip text,
- expanded ARIA label.

## Rupee Animations

Rare:

```text
rupee-shop-ready
```

Epic:

```text
rupee-shop-ready-epic
```

Legendary:

```text
rupee-shop-ready-legendary
```

## Console Attention

`consoleAttentionState()` returns one of:

```text
null
wish
blueprint
```

Wish condition:

```js
hasWishCharge()
```

Blueprint condition:

```js
wishBlueprintErrorActive &&
!wishHasIsValid
```

If the Dev Console is already open, attention returns null.

## Console Classes

The control can receive:

```text
attention-ready
attention-wish
attention-blueprint
```

Current visible labels:

Wish:

```text
WISH READY // ~ DEV CONSOLE
```

Blueprint:

```text
FIX WISH // ~ DEV CONSOLE
```

## Console Animations

Rare Wish:

```text
console-attention-ready
```

Epic Wish:

```text
console-attention-epic
```

Legendary Wish:

```text
console-attention-legendary
```

Blueprint:

```text
console-attention-blueprint
```

Blueprint intentionally uses warm warning support regardless of rarity.

## Hearts

`updateHeartMeter()` sets:

```js
rewardReady =
  heartCount >= 5 &&
  !heartRewardShown;
```

When true:

```text
reward-ready
```

is applied.

The button becomes enabled and its text/ARIA state communicates claim readiness.

## Castles

`updateCastleMeter()` sets:

```js
rewardReady =
  display >= 4;
```

When true:

- `reward-ready` is applied,
- meter becomes enabled,
- value displays `CLAIM`,
- tooltip explains the fireworks and Rupee reward.

## Milestone Animations

Rare:

```text
milestone-claim-ready-rare
```

Epic:

```text
milestone-claim-ready-epic
```

Legendary:

```text
milestone-claim-ready-legendary
```

## Finale Attention

`updateFinaleReady()` adds:

```text
finale-ready
```

to `body`.

Rare/Epic use the base:

```text
finale-logo-pulse
```

Legendary has an explicit override:

```text
finale-logo-pulse-legendary
```

This was added after Legendary could visually lose the finale cue.

## DEV Commands

Useful attention tests:

```text
dev attention rupees
dev attention wish
dev attention blueprint
dev finale ready
```

Hearts/Castles can be forced with their relevant DEV progression commands.

## Accessibility

Attention functions update more than CSS.

Examples include:

- `title`,
- `aria-label`,
- enabled/disabled state,
- displayed value such as `CLAIM`.

The visual pulse is therefore not the sole communication channel.

## QA

For each attention cue:

1. create the actionable state,
2. verify animation,
3. open or resolve the destination,
4. verify animation stops,
5. switch Rare/Epic/Legendary,
6. verify semantic warning cues remain readable,
7. inspect keyboard focus,
8. inspect ARIA label.

Also verify two unrelated attention states do not accidentally share classes or stale text.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
