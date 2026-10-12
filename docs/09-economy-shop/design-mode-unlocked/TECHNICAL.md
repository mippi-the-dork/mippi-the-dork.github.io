# Design Mode Unlocked - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Design Mode Unlocked > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** The Legendary Shop capstone appears after Shop mastery and permanently unlocks Design Mode.

> This page is the canonical technical documentation for **Design Mode Unlocked** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'design-mode-unlock',
  name:'Design Mode Unlocked',
  cost:10,
  slot:'passive',
  rarity:'legendary',
  tag:'CAPSTONE',
  requires:'shop-master'
}
```

## Availability

`shopItemAvailable()` requires:

```js
legendaryUnlocked &&
allOtherShopItemsOwned(item.id)
```

## Price Exclusion

`shopPrice()` explicitly excludes:

```text
design-mode-unlock
```

from Production Discount.

Effective price remains:

```text
10
```

## Entitlement Key

Persistent entitlement uses:

```text
mippi-design-mode-unlocked-v1
```

## Purchase

When purchasing the capstone:

```js
designModeUnlocked=true;
localStorage.setItem(
  DESIGN_UNLOCK_KEY,
  '1'
);
updateDesignModeAvailability();
```

## Startup Migration

If Shop ownership already contains:

```text
design-mode-unlock
```

startup forces:

```js
designModeUnlocked=true;
```

and rewrites the entitlement key.

This keeps ownership and entitlement consistent.

## UI Feedback

Purchase toast:

```text
DESIGN MODE UNLOCKED
```

explains that the commentary layer is now available beside Inspect in the bottom-right controls.

Console output also explains the `design` command.

## Help Integration

Normal Console Help conditionally includes:

```text
design
```

only when:

```js
designModeUnlocked
```

is true.

## Postgame

`Buy the Store` checks every canonical Shop item:

```js
SHOP_ITEMS.every(
  item=>shopOwned.has(item.id)
)
```

Therefore the capstone is part of full Shop completion.

## QA

- own all except one non-capstone item: capstone remains locked,
- own last non-capstone: capstone reveals,
- buy Production Discount first: capstone still costs 10,
- purchase capstone,
- verify Design control,
- verify `design` appears in Help,
- reload,
- verify entitlement,
- full reset,
- verify control and entitlement disappear.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
