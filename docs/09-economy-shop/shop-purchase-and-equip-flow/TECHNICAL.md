# Shop Purchase and Equip Flow - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Purchase and Equip Flow > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Handles buying items, equipping gameplay modifiers, unequipping them, and persisting ownership.

> This page is the canonical technical documentation for **Shop Purchase and Equip Flow** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## State

```js
let shopOwned=new Set();
let shopEquipped=null;
```

## Persistence

`persistShopState()` writes:

```js
{
  owned:[...shopOwned],
  equipped:shopEquipped
}
```

to:

```text
mippi-shop-state-v1
```

It also updates telemetry snapshot state.

## Purchase

`purchaseShopItem(id)`:

1. resolves item,
2. rejects unavailable item,
3. if already owned:
   - equips if gameplay,
   - returns,
4. calculates effective price,
5. rejects insufficient wallet,
6. subtracts price,
7. adds ownership,
8. records telemetry,
9. persists wallet,
10. persists Shop state,
11. auto-equips gameplay item,
12. applies passive state,
13. handles Design Mode entitlement,
14. refreshes HUD/Shop/Trace/Ledger/Interact state/postgame,
15. prints confirmation/toast.

## Auto Equip

For gameplay item purchase:

```js
equipShopItem(
  id,
  {announce:false}
);
```

## Equip

`equipShopItem()` requires:

- valid item,
- gameplay slot,
- ownership,
- current availability.

It writes:

```js
shopEquipped=id;
```

then persists and applies state.

## Body State

`applyShopEquipmentState()` writes:

```js
document.body.dataset.shopEquipped =
  shopEquipped || '';
```

This gives CSS and other systems a simple current-loadout hook.

## Unequip

`unequipShopItem()`:

- stores previous item,
- clears `shopEquipped`,
- persists,
- refreshes Shop,
- records telemetry,
- prints confirmation.

## Telemetry

Purchase:

```text
economy.rupeesSpent
economy.shopPurchases
economy.shopOwnedItems
meaningful: shop_purchase
```

Equip:

```text
economy.shopEquips
economy.shopEquippedItems
meaningful: shop_equip
```

Unequip:

```text
economy.shopUnequips
meaningful: shop_unequip
```

## QA

- buy passive,
- buy gameplay,
- verify auto-equip,
- buy second gameplay,
- verify it replaces first,
- re-equip first for free,
- unequip,
- reload after each state,
- verify ownership/equipment persistence.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
