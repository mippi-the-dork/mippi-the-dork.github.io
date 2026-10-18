# Shop - Technical Documentation

## Current v3.25.2 verified update

`SHOP_ITEMS` in `script.js` defines current ID/cost/rarity/slot and eligibility. Use [current inventory catalog](../../SHOP_INVENTORY_CATALOG.md) rather than an original historical ten-item list. `shopOwned` is a Set of purchases; `shopEquipped` is a Set of active gameplay modifiers serialized as an array in `mippi-shop-state-v1`. Legacy string saves migrate. Owned passives use `shopOwns`; active gear effects use `shopHasEquipped`.

---

## Original historical reference

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the persistent upgrade store, inventory rules, wallet display, ownership state, and item purchase interactions.

> This page is the canonical technical documentation for **Shop** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inventory Data

The canonical inventory lives in:

```js
const SHOP_ITEMS=[ ... ];
```

Each item defines:

```text
id
name
cost
slot
rarity
tag
description
optional requires
```

## Current Inventory

| Item | Cost | Slot | Rarity | Requirement |
| --- | ---: | --- | --- | --- |
| Lucky Charm | 2 | gameplay | Rare | none |
| Dog Whistle | 2 | gameplay | Rare | none |
| Star Extender | 3 | gameplay | Rare | none |
| Slowpoke | 3 | gameplay | Rare | none |
| Interact Toggle | 4 | passive | Epic | Epic |
| Mippi Bird Extra Life | 4 | passive | Epic | none |
| Production Discount | 6 | passive | Epic | none |
| Celestial Beacon | 7 | passive | Epic | Epic |
| Golden Trigger | 5 | gameplay | Legendary | Legendary |
| Design Mode Unlocked | 10 | passive | Legendary | Shop mastery |

## Persistent State

Shop ownership/equipment uses:

```text
mippi-shop-state-v1
```

Stored object:

```js
{
  owned:[...shopOwned],
  equipped:shopEquipped
}
```

## Migration

v2.78 migrates two older item IDs:

```text
galaga-warranty -> bird-extra-life
tractor-beam -> interact-toggle
```

Old equipped values for those removed IDs are cleared.

## Rendering

`renderShop()` builds three rarity sections:

```text
Rare // FIELD GEAR
Epic // SYSTEM GEAR
Legendary // MASTERWORKS
```

Each item is rendered through:

```js
renderShopCard(item)
```

## Popup

`openShop()`:

- records telemetry,
- renders Shop,
- opens popup,
- sets `aria-hidden=false`,
- suppresses wallet attention pulse,
- prints wallet/ownership summary.

Close routes:

- close button,
- backdrop click.

## Actions

The item grid uses delegated click handling on:

```text
button[data-shop-id]
```

Action types include:

```text
buy
equip
equipped
passive
locked
```

Only buy and equip are interactive.

## Merchant Copy

`shopMerchantLine()` derives dynamic text from:

- available inventory,
- unowned inventory,
- locked inventory,
- wallet,
- discount state.

## QA

- open with zero wallet,
- inspect locked and unlocked cards,
- buy one gameplay item,
- buy one passive,
- equip/swap gameplay,
- unlock Epic and Legendary,
- buy all non-capstone inventory,
- verify capstone reveal,
- buy final item,
- reload and verify persistence.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.14 Current Behavior

`SHOP_ITEMS` has 11 records; `bird-life-refill` slot `consumable`, base cost 10; `design-mode-unlock` cost 30. `shopPrice` uses floor(0.75*cost) for eligible discounts. A refill credits `mushroomBankLives` but never `shopOwned`. `post_shop` and `allOtherShopItemsOwned` exclude consumables.
