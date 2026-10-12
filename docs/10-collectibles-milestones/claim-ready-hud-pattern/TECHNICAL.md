# Claim-Ready HUD Pattern - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Claim-Ready HUD Pattern > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the consistent glowing HUD behavior used when a completed meter is waiting for an explicit player claim.

> This page is the canonical technical documentation for **Claim-Ready HUD Pattern** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Current Consumers

Shared CSS targets:

```css
.heart-meter
.progress-hud .castle-meter
```

## Button Normalization

Both use:

```css
appearance:none;
-webkit-appearance:none;
margin:0;
text-align:inherit;
```

## Disabled State

```css
.heart-meter:disabled,
.progress-hud .castle-meter:disabled{
  opacity:1;
  cursor:default;
}
```

This prevents normal disabled-button styling from making a progress meter look inactive or broken.

## Ready State

Shared selector:

```css
.heart-meter.reward-ready,
.progress-hud .castle-meter.reward-ready
```

adds:

- pointer cursor,
- pointer events,
- milestone claim animation.

## Rare Animation

```text
milestone-claim-ready-rare
```

The animation increases:

- brightness,
- cyan glow,
- small secondary warm glow,
- drop shadow.

## Epic Animation

When:

```text
body.theme-complete
:not(.theme-legendary)
```

the animation switches to:

```text
milestone-claim-ready-epic
```

using hot pink and cyan.

## Legendary Animation

When:

```text
body.theme-complete.theme-legendary
```

the animation switches to:

```text
milestone-claim-ready-legendary
```

using gold and teal.

## Hearts Integration

Derived ready condition:

```js
heartCount>=5 &&
!heartRewardShown
```

Ready Heart:

- enables button,
- updates ARIA,
- updates tooltip,
- claims Unreal Source reward.

## Castle Integration

Derived ready condition:

```js
castleRunProgress>=4
```

Ready Castle:

- enables button,
- changes visible count to `CLAIM`,
- updates ARIA,
- updates tooltip,
- claims fireworks and Rupees.

## Persistence

The UI class itself is not persisted.

Each system reconstructs readiness from authoritative state on startup.

This prevents stale UI after rule changes.

## QA

For Hearts and Castles:

1. verify progressing state is disabled but visible,
2. reach completion,
3. verify enabled claim state,
4. reload before claim,
5. verify state reconstructs,
6. test Rare/Epic/Legendary,
7. claim,
8. verify pulse stops immediately.

When adding a future claimable meter, verify it follows the same state and accessibility contract rather than copying only the animation class.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
