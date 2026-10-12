# Production Discount - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Production Discount > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that permanently reduces the price of remaining unowned Shop inventory.

> This page is the canonical technical documentation for **Production Discount** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

```js
{
  id:'production-discount',
  cost:6,
  slot:'passive',
  rarity:'epic',
  tag:'ECONOMY'
}
```

## Activation

```js
function shopDiscountActive(){
  return shopOwned.has(
    'production-discount'
  );
}
```

Ownership is the entire passive state.

## Price Function

```js
function shopPrice(item){
  if(shopOwned.has(item.id))
    return 0;

  if(
    shopDiscountActive() &&
    item.id!=='production-discount' &&
    item.id!=='design-mode-unlock'
  ){
    return Math.max(
      1,
      Math.floor(item.cost*.75)
    );
  }

  return item.cost;
}
```

## Current Effective Examples

Examples after Discount:

| Base | Discounted |
| ---: | ---: |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 3 |
| 6 | 4 |
| 7 | 5 |
| 10 capstone | 10, excluded |

## Card Presentation

`renderShopCard()` checks:

```js
discount =
  shopDiscountActive() &&
  !owned &&
  item.id!=='production-discount' &&
  price<item.cost;
```

Price text becomes:

```text
<base> -> <effective> RUPEES
```

## Merchant

With Discount active, merchant copy can become:

```text
Production Discount active. Somehow procurement became progression.
```

## Affordability

`affordableShopItems()` calls `shopPrice(item)`, so discount automatically affects the Rupee HUD attention cue.

## QA

- record prices,
- buy Discount,
- verify every eligible unowned item recalculates,
- verify no refund,
- verify Discount and capstone exclusions,
- verify wallet pulse can change immediately after new effective prices.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
