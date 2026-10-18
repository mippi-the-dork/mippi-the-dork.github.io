# Shop Availability Rules - Technical Documentation

## Current v3.25.2 verified update

`shopItemAvailable(item)` checks `requires` (Epic, Legendary, shop-master), not the rarity label alone. Epic means ten Rare achievements; Legendary checks Legendary entitlement; Shop-master requires Legendary and all other non-consumable purchases. The Bird refill requires Epic; the per-round Bird passive and production discount have no explicit `requires` metadata. Equipment toggles are independent of purchase availability.

---

## Original historical reference

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Availability Rules > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Gates selected inventory behind Epic, Legendary, or Shop mastery progression rather than exposing every item immediately.

> This page is the canonical technical documentation for **Shop Availability Rules** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Requirement Field

Inventory can define:

```text
requires
```

Current values:

```text
epic
legendary
shop-master
```

Items without `requires` are available.

## Availability Function

```js
function shopItemAvailable(item){
  if(!item.requires) return true;

  if(item.requires==='legendary')
    return legendaryUnlocked;

  if(item.requires==='epic')
    return unlockedAchievements.size===
           ACHIEVEMENT_KEYS.length;

  if(item.requires==='shop-master')
    return legendaryUnlocked &&
           allOtherShopItemsOwned(item.id);

  return false;
}
```

## Shop Mastery

```js
allOtherShopItemsOwned(
  exceptId='design-mode-unlock'
)
```

checks every inventory item except the supplied ID.

This prevents the capstone from requiring itself.

## Locked Description

Current text:

Epic:

```text
Unlock Epic Mode to unlock this item.
```

Legendary:

```text
Unlock Legendary Mode to unlock this item.
```

Shop Master:

```text
Own every other shop item to reveal this capstone.
```

## Locked Card

`renderShopCard()` uses:

```js
locked=!shopItemAvailable(item);
```

When locked:

- displayed name becomes `???`,
- price becomes `???`,
- button is disabled,
- action becomes `locked`,
- lock-specific tag/description replaces item data.

## Capstone Reveal

The capstone becomes available only when:

```js
legendaryUnlocked &&
allOtherShopItemsOwned('design-mode-unlock')
```

The Meta Trace also recognizes this state and says:

```text
The final Shop item is revealed. 10 Rupees unlock Design Mode.
```

## QA

- clean Shop: check always-available items,
- 9/10 Signals: Epic-gated items locked,
- 10/10: Epic-gated items reveal,
- no Legendary: Golden Trigger locked,
- Legendary: Golden Trigger reveals,
- own all except capstone: Design Mode item reveals,
- remove one owned item in DEV: capstone locks again.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
