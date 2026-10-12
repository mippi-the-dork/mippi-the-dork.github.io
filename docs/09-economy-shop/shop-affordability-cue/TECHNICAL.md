# Shop Affordability Cue - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Affordability Cue > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Rupee HUD pulse when at least one currently available unowned item can be afforded.

> This page is the canonical technical documentation for **Shop Affordability Cue** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Affordable Query

```js
function affordableShopItems(){
  return SHOP_ITEMS.filter(
    item =>
      shopItemAvailable(item) &&
      !shopOwned.has(item.id) &&
      shopPrice(item) <= rupeeWallet
  );
}
```

## Cue Function

`updateRupeeAttention()`:

1. gets affordable list,
2. checks `rupeeDiscovered`,
3. checks list length,
4. checks Shop is not open,
5. toggles `.shop-ready`,
6. writes affordable count,
7. updates title/ARIA.

## Condition

```js
const active =
  rupeeDiscovered &&
  affordable.length>0 &&
  !shopPopup?.classList.contains('open');
```

## Cheapest Price

When active:

```js
const cheapest =
  Math.min(...affordable.map(shopPrice));
```

The tooltip includes that value.

## Discount Correctness

Because `affordableShopItems()` calls:

```js
shopPrice(item)
```

the cue automatically respects Production Discount.

## Refresh Triggers

The cue is refreshed on:

- wallet update,
- purchase,
- Shop open,
- Shop close,
- progression changes that alter item availability,
- startup state reconstruction.

## DEV

Use:

```text
dev attention rupees
```

for direct cue validation.

Also test naturally with actual wallet thresholds.

## QA

- wallet below all prices: no cue,
- wallet equals cheapest available price: cue,
- only affordable item is locked: no cue,
- only affordable item already owned: no cue,
- Production Discount drops price into range: cue,
- Shop open: cue off,
- close: cue on.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
