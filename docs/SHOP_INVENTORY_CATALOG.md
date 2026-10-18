# Shop Inventory Catalog

**Verified current runtime:** Mippi Portfolio v3.25.2 (`script.js` `SHOP_ITEMS`). This is the **current** authoritative inventory, not the historical v2.78 table. For successive changes see [Systems Integration](V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md) and [Release History](RELEASE_HISTORY.md).

## Current inventory (13 definitions)

| ID | Display name | Base cost | Rarity | Type | Availability | Active effect |
| --- | --- | ---: | --- | --- | --- | --- |
| `insert-coin` | Insert Coin | 6 | Rare | Equippable | Immediate | Unlocks natural UFO encounters and upward shooting before Epic; regular UFO spawn interval ×0.25 while equipped |
| `dog-whistle` | Dog Whistle | 4 | Rare | Equippable | Immediate | Doug Bones spawn more frequently after Doug assumes command |
| `star-extender` | Star Extender | 5 | Rare | Equippable | Immediate | Star Power duration increases by about two seconds |
| `slowpoke` | Slowpoke | 6 | Rare | Equippable | Immediate | New flying objects remain onscreen approximately 35% longer |
| `dev-console` | Dev Console | 8 | Epic | Owned passive | Epic | Console ownership and Shooting Star eligibility |
| `interact-toggle` | Interact Toggle | 8 | Epic | Owned passive | Epic | Player-controlled suppression of ordinary portfolio interactions |
| `bird-extra-life` | Mippi Bird | 8 | Epic | Owned passive | Item availability, no explicit `requires` | One extra Life per Bird round; refill purchase offered on its card |
| `production-discount` | Production Discount | 11 | Epic | Owned passive | Item availability, no explicit `requires` | 25% discount rounded down, minimum one Rupee, on qualifying unowned stock |
| `celestial-beacon` | Celestial Beacon | 13 | Epic | Equippable | Epic | Shorter shooting-star spawn delay and longer flight while equipped |
| `arcade-bounty` | Arcade Bounty | 10 | Epic | Equippable | Epic | Regular UFO Rupee drop probability 30% → 45% while equipped |
| `golden-trigger` | Golden Trigger | 11 | Legendary | Equippable | Legendary | Upward projectiles travel faster (1380 versus 1050 speed units) |
| `bird-life-refill` | Mippi Bird Life Refill | 7 | Epic | Repeatable consumable | Epic | Adds one Life to the persisted Bird refill bank |
| `design-mode-unlock` | Design Mode Unlocked | 21 | Legendary | Owned passive | Legendary plus owning all other permanent items | Unlocks persistent Design commentary layer |

**Inventory counts:** 13 item definitions, comprising 7 equippable gameplay upgrades, 5 owned passive/capstone upgrades and 1 repeatable consumable. The consumable is not a unique permanent item for Shop completion. Availability depends on actual `requires` metadata, which is not identical for all Epic-rarity products.

## Equipment, ownership and action model

Purchasing a gameplay modifier automatically equips it. Owned gameplay upgrades can coexist: the UI offers **EQUIP** and **UNEQUIP** independently per item, and the summary offers **UNEQUIP ALL**. Equipping one item no longer unequips another. Ownership persists even when an effect is turned off; passive upgrades use ownership, and the refill is a consumable rather than equipment.

`shopEquipped` is a `Set` of active IDs. The persisted `mippi-shop-state-v1` `equipped` value is an **array**, not the historical single string. When reading an older single-string save, migrate it into an array-backed set. Older owned `galaga-warranty` maps to `bird-extra-life`, while `tractor-beam` maps to `interact-toggle`; invalid obsolete equipped IDs are excluded. For legacy saves, previously owned Celestial Beacon and Arcade Bounty are automatically put in the equipped set to retain their former always-on behavior, but can subsequently be unequipped.

```json
{
  "owned": ["insert-coin", "arcade-bounty", "celestial-beacon"],
  "equipped": ["insert-coin", "arcade-bounty", "celestial-beacon"]
}
```

This is an **illustrative** saved state, not a claim that every user owns these items.

## Economy and interactions

The Rupee wallet uses `mippi-rupee-wallet-v1`; initial Shop discovery is tracked separately. The Shop's affordable-item attention depends on discovery, actual discounted price, prerequisites, ownership, and whether the Shop is already open.

`arcade-bounty` applies only to qualifying regular UFO defeats. The chance change is **+15 percentage points**, *not* an additional 45 percentage points or a 45% multiplier.

`insert-coin` operates before Epic when equipped but does **not** grant Epic achievements, Dev Console or Legendary status. Unequipping it before Epic removes the natural-spawn and shooting permission. The natural schedule is adjusted when the item is toggled.

`celestial-beacon` uses equipped state (not just ownership) in both shooting-star duration and natural delay calculations. Natural star eligibility still respects the Dev Console and progression gates.

## Shop item presentation and labels

Item identities use inline SVGs from `SHOP_ICON_PATHS` and `shopItemIcon`. Rarity identity stays with individual cards, independent of the active world theme. Unavailable products show a locked state; owned passives show `PASSIVE // ACTIVE`; owned equipment offers its own active/inactive control. Mippi Bird's combined card includes the separate repeatable REFILL action.

Use **Life/Lives**, never a current Bird `Shield` or `Spare Lives` HUD label. The temporary split Shield/Spare wording belongs only to the historical v3.25.0 release.

## Historical adjustments

- v3.15 lowered contemporary Shop prices; those historical products and costs should not be reconstructed from today's list.
- v3.17 introduced Bounty as a permanent owned passive, from 30% to 45% regular UFO Rupee-drop chance.
- v3.18 added Insert Coin and reworked Dev Console and Bird purchases.
- v3.21 changed equipped Insert Coin's delay factor from 0.60 to 0.25.
- PR #50 allowed Insert Coin to unlock arcade combat before Epic.
- PR #51 removed the single gameplay slot and converted Bounty/Beacon to independently equippable gear, preserving legacy passive ownership effects.

## Acceptance checks

- [ ] Prices, ownership, availability, rarity and labels match the 13 runtime definitions.
- [ ] Purchase automatically equips a gameplay upgrade but does not remove other equipped items.
- [ ] Independent UNEQUIP and UNEQUIP ALL preserve ownership; effects and HUD reflect toggles.
- [ ] Legacy string `equipped` saves, old renamed product IDs and previously passive Bounty/Beacon behave correctly.
- [ ] Insert Coin early-combat eligibility and 0.25 wave delay apply only while equipped.
- [ ] Celestial Beacon and Bounty behave differently when owned-but-unequipped.
- [ ] Repeatable refill increases the Bird bank and is excluded from unique-item completion.
- [ ] Readable cards, controls and multi-item equipped summary in all themes and on mobile.

**QA status:** Source-derived specification. These checks are not claims of completed live browser testing.
