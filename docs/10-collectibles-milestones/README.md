# 10. Collectibles and Claimable Milestones

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones

Covers flying collectibles, progress meters, claim-ready milestones, and their rewards across Hearts, Castles, Stars, Mushrooms, Keys, and Bones.

## Purpose

This category groups the canonical documentation for **Collectibles and Claimable Milestones**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Flying Collectible Framework** | Provides the shared spawning, movement, lifetime, interaction, and collection behavior used by friendly flying game-layer objects. | [Design](flying-collectible-framework/DESIGN.md) | [Technical](flying-collectible-framework/TECHNICAL.md) |
| **Heart Collection** | Tracks up to five Hearts as a visible collectible progression meter. | [Design](heart-collection/DESIGN.md) | [Technical](heart-collection/TECHNICAL.md) |
| **Full Hearts Claim State** | Makes the Hearts HUD pulse at 5 out of 5 and requires the player to click the meter before the reward is granted. | [Design](full-hearts-claim-state/DESIGN.md) | [Technical](full-hearts-claim-state/TECHNICAL.md) |
| **Unreal Source Heart Reward** | Uses the claimed five-Heart milestone to present the Unreal Source reward instead of automatically interrupting the player. | [Design](unreal-source-heart-reward/DESIGN.md) | [Technical](unreal-source-heart-reward/TECHNICAL.md) |
| **Key Pickup** | Provides the collectible needed to advance Castle checks. | [Design](key-pickup/DESIGN.md) | [Technical](key-pickup/TECHNICAL.md) |
| **Castle Progression** | Tracks the repeated Castle-check loop and turns the fourth completed Castle into a claim-ready milestone. | [Design](castle-progression/DESIGN.md) | [Technical](castle-progression/TECHNICAL.md) |
| **Castle Claim State** | Makes the Castles HUD pulse at 4 out of 4 and waits for the player to click it before firing the completion reward. | [Design](castle-claim-state/DESIGN.md) | [Technical](castle-claim-state/TECHNICAL.md) |
| **Castle Fireworks** | Provides the Castle reward celebration using larger particles for readability without increasing particle count. | [Design](castle-fireworks/DESIGN.md) | [Technical](castle-fireworks/TECHNICAL.md) |
| **Star Pickup and Star Power** | Grants a temporary power state that affects movement, arcade interactions, and selected system-combo behavior. | [Design](star-pickup-and-star-power/DESIGN.md) | [Technical](star-pickup-and-star-power/TECHNICAL.md) |
| **Mushroom Pickup** | Grows cursor power to a fixed maximum and can buffer hits at max; does not provide Bird Lives. | [Design](mushroom-pickup/DESIGN.md) | [Technical](mushroom-pickup/TECHNICAL.md) |
| **Doug Bone Pickup** | Feeds the Doug Coolness progression and can trigger special Doug responses and system combinations. | [Design](doug-bone-pickup/DESIGN.md) | [Technical](doug-bone-pickup/TECHNICAL.md) |
| **Claim-Ready HUD Pattern** | Defines the consistent glowing HUD behavior used when a completed meter is waiting for an explicit player claim. | [Design](claim-ready-hud-pattern/DESIGN.md) | [Technical](claim-ready-hud-pattern/TECHNICAL.md) |

| **Physical Reward Drops** | Collectible ground-bouncing Rupees and enemy-earned Hearts. | [Design](physical-reward-drops/DESIGN.md) | [Technical](physical-reward-drops/TECHNICAL.md) |


**Current v3.25.2 correction:** Keys retain their Epic gate after the v3.23 restoration; the Rare Insert Coin item grants UFO/s shooting access only. Ordinary Hearts and Mushrooms never replenish Bird Lives. See [systems integration](../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
