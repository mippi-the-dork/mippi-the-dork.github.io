# Mippi Bird Life Refill - Technical Documentation

## Current implementation correction (v3.25.2)

**Current implementation (v3.25.2).** `purchaseShopItem('bird-life-refill')` increments the legacy-named `mushroomBankLives` field and persists it through `persistMushroomLives()`. The worker receives the bank at round reset, consumes banked Lives only after a per-round Shop Life (when present), and reports the remaining bank to the main thread for persistence. The worker does not have direct browser storage access. Repeatable refill is excluded from unique-item completion.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.

---

## Original historical specification (retained for provenance)

**Introduced:** v3.13. **Current documented version:** v3.14.

## Inventory and pricing

`SHOP_ITEMS` contains:
```js
{id:'bird-life-refill', name:'Mippi Bird Life Refill', cost:10,
 slot:'consumable', rarity:'epic', tag:'REPEATABLE', requires:'epic'}
```

Its cost is **10 base Rupees**. `shopPrice(item)` applies `Math.max(1, Math.floor(item.cost*.75))` when Production Discount is active, excluding only that discount item and the Design Mode capstone. Accordingly, an eligible refill costs **7** Rupees with Production Discount.

`shopItemAvailable()` requires Epic completion. `renderShopCard()` always shows the **REFILL** purchase action for this consumable when available and affordable, never the standard owned/equipped state. `affordableShopItems()` includes available affordable consumables in Rupee HUD attention.

## Purchase and persistence

`purchaseShopItem('bird-life-refill')` checks availability and current wallet, subtracts the price, **does not add the consumable to `shopOwned`**, increments `mushroomBankLives`, and calls `persistMushroomLives()`. It also saves the wallet, persists normal Shop snapshot/telemetry, updates Shop, HUD and Ledger, and announces the updated bank.

In Mippi Bird, `absorbFlappyHit()` checks `shopLifeAvailable` (the separate passive shield) first, otherwise consumes a `mushroomBankLives` life and persists the new bank; hit protection and invulnerability timing follow the existing rules.

## Completion exclusions

`allOtherShopItemsOwned()` and `postgameEpicCondition('post_shop')` filter out entries where `slot==='consumable'`. The Shop has **11 displayed entries**, but **only 10 permanent owned entries** are necessary for Buy the Store and for revealing Design Mode Unlocked. The capstone is **30** base Rupees and is not discounted by Production Discount.

The saved Shop ownership array does not accumulate one entry per refill; the bank lives are stored through the existing Mushroom bank persistence. Never include this consumable in the unique permanent-ownership count.

See [Design](DESIGN.md) and [v3.14 QA](../../QA/V3_11_TO_V3_14_REGRESSION_QA.md).
