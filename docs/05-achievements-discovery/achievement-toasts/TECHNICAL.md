# Achievement Toasts - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement Toasts > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides transient achievement, hint, and system notifications without requiring the Ledger to be open.

> This page is the canonical technical documentation for **Achievement Toasts** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Surface

The achievement toast is a persistent DOM surface reused for multiple notifications.

The system updates content and rarity state when a new achievement is shown.

## Rarity Reset

Before applying a new achievement rarity, the toast removes:

```text
rarity-rare
rarity-epic
rarity-legendary
```

This prevents a prior unlock from visually contaminating the next one.

## Rarity Application

The newly unlocked achievement adds one rarity class based on its metadata.

The CSS uses the toast rarity class rather than only body theme.

## Z-Order

The toast is positioned as fixed UI above normal document content.

It must remain below focused full-screen or modal experiences where those systems intentionally own attention.

## Interaction

The toast itself is not required for progression.

Unlock state is persisted before or independently of the toast animation.

If the toast animation is interrupted, the achievement remains earned.

## Reuse

The same notification infrastructure may be used for some transient system hints, but achievement rarity-specific styling should only be applied when appropriate.

## Timing

Show/hide timing is controlled in JavaScript through classes and timers.

New toast requests should clear or replace stale timers so a second unlock does not immediately inherit the previous hide timeout.

## Theme Interaction

The frame can still respond to world theme in subtle ways, but rarity classes have higher semantic priority for the unlocked item.

## QA

- unlock one Rare achievement,
- unlock one Epic achievement,
- unlock Legendary capstone,
- verify each toast uses correct rarity,
- switch page theme between tests,
- confirm rarity does not change,
- trigger two unlocks close together,
- verify no stale class or hide timer corrupts the second toast.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
