# 09. Rupee Economy and Shop

**Hierarchy:** Documentation Home > Rupee Economy and Shop

Documents Rupee earning and spending, Shop discovery, item availability, affordability signaling, equipment, rarity presentation, and the Design Mode capstone.

## Purpose

This category groups the canonical documentation for **Rupee Economy and Shop**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Rupee Economy** | Defines how Rupees are earned, stored, spent, surfaced in the HUD, and connected to arcade and exploration systems. | [Design](rupee-economy/DESIGN.md) | [Technical](rupee-economy/TECHNICAL.md) |
| **Rupee Pickup** | Provides a flying collectible that directly increases the player's wallet. | [Design](rupee-pickup/DESIGN.md) | [Technical](rupee-pickup/TECHNICAL.md) |
| **Rupee HUD** | Displays the current wallet and becomes an attention cue when the player can afford at least one available unowned Shop item. | [Design](rupee-hud/DESIGN.md) | [Technical](rupee-hud/TECHNICAL.md) |
| **Shop** | Provides the persistent upgrade store, inventory rules, wallet display, ownership state, and item purchase interactions. | [Design](shop/DESIGN.md) | [Technical](shop/TECHNICAL.md) |
| **Shop Discovery** | Controls when the Shop becomes meaningful and how the player is taught that Rupees can be spent. | [Design](shop-discovery/DESIGN.md) | [Technical](shop-discovery/TECHNICAL.md) |
| **Shop Availability Rules** | Gates selected inventory behind Epic, Legendary, or Shop mastery progression rather than exposing every item immediately. | [Design](shop-availability-rules/DESIGN.md) | [Technical](shop-availability-rules/TECHNICAL.md) |
| **Shop Purchase and Equip Flow** | Handles buying items, equipping gameplay modifiers, unequipping them, and persisting ownership. | [Design](shop-purchase-and-equip-flow/DESIGN.md) | [Technical](shop-purchase-and-equip-flow/TECHNICAL.md) |
| **Shop Rarity Presentation** | Keeps Rare, Epic, and Legendary Shop cards tied to their item rarity instead of inheriting the active site theme. | [Design](shop-rarity-presentation/DESIGN.md) | [Technical](shop-rarity-presentation/TECHNICAL.md) |
| **Shop Affordability Cue** | Makes the Rupee HUD pulse when at least one currently available unowned item can be afforded. | [Design](shop-affordability-cue/DESIGN.md) | [Technical](shop-affordability-cue/TECHNICAL.md) |
| **Lucky Charm** | A Rare gameplay item that increases the relative appearance chance of Hearts, Keys, and Stars. | [Design](lucky-charm/DESIGN.md) | [Technical](lucky-charm/TECHNICAL.md) |
| **Dog Whistle** | A Rare gameplay item that increases Doug Bone opportunities once Doug is in command. | [Design](dog-whistle/DESIGN.md) | [Technical](dog-whistle/TECHNICAL.md) |
| **Star Extender** | A Rare gameplay item that increases Star Power duration. | [Design](star-extender/DESIGN.md) | [Technical](star-extender/TECHNICAL.md) |
| **Slowpoke** | A Rare gameplay item that keeps newly spawned flying objects on screen longer. | [Design](slowpoke/DESIGN.md) | [Technical](slowpoke/TECHNICAL.md) |
| **Interact Toggle Shop Item** | An Epic passive item that unlocks the Interact Mode control. | [Design](interact-toggle-shop-item/DESIGN.md) | [Technical](interact-toggle-shop-item/TECHNICAL.md) |
| **Mippi Bird Extra Life** | An Epic passive item that gives each Mippi Bird round a rechargeable hit shield. | [Design](mippi-bird-extra-life/DESIGN.md) | [Technical](mippi-bird-extra-life/TECHNICAL.md) |
| **Production Discount** | An Epic passive item that permanently reduces the price of remaining unowned Shop inventory. | [Design](production-discount/DESIGN.md) | [Technical](production-discount/TECHNICAL.md) |
| **Celestial Beacon** | An Epic passive item that increases Shooting Star frequency and catchable duration after Epic unlock. | [Design](celestial-beacon/DESIGN.md) | [Technical](celestial-beacon/TECHNICAL.md) |
| **Golden Trigger** | A Legendary gameplay item that improves Legendary cursor targeting range and projectile speed. | [Design](golden-trigger/DESIGN.md) | [Technical](golden-trigger/TECHNICAL.md) |
| **Design Mode Unlocked** | The Legendary Shop capstone appears after Shop mastery and permanently unlocks Design Mode. | [Design](design-mode-unlocked/DESIGN.md) | [Technical](design-mode-unlocked/TECHNICAL.md) |

| **Mippi Bird Life Refill** | Repeatable Epic Rupee purchase banks one Mippi Bird life without affecting permanent Shop completion. | [Design](mippi-bird-life-refill/DESIGN.md) | [Technical](mippi-bird-life-refill/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
