# Unified Game Artwork - Design

**Introduced:** v3.00. **Current documented version:** v3.01.

The interactive portfolio now uses **14 authored SVG art assets** across its HUD, collectibles and enemies. Artwork is a coherent visual vocabulary: Rare, Epic and Legendary give related interactables one matching theme tint. The visual update is not permission to change game behavior.

## Art roles

| SVG | HUD / world role |
| --- | --- |
| `cool.svg` | Coolness hotbar meter |
| `alien.svg` | Invasion hotbar meter |
| `crown.svg` | Castle *meter* icon |
| `castle.svg` | Clickable Castle in world |
| `rupee.svg` | Rupee collectible and wallet hotbar icon |
| `bone.svg` | Doug Bone |
| `heart-empty.svg` | Empty HUD heart |
| `heart-full.svg` | Filled HUD heart and falling Heart collectible |
| `key.svg` | Hidden Key |
| `mushroom.svg` | Mushroom |
| `star.svg` | Collectible Star (not a Shooting Star) |
| `boss.svg` | Regular Boss and Super Boss adds |
| `enemy.svg` | Regular UFO |
| `super-boss.svg` | Super Boss core |

Castle presentation became roughly 1.5x larger, Super Boss core roughly twice its prior dimensions, and add sprites enlarged to match regular Boss scale. Inspect, Design and Interact controls differentiate **enabled active** state from **attention needed** state.

## Rules

Use `crown` only for Castle HUD progress and `castle` for the actual clickable reward. Shooting Stars retain their own appearance. SVG silhouettes must respect original aspect ratios and clickable hit targets without stretching the graphic to arbitrary boxes. Decorations do not intercept pointer/keyboard interaction.

## QA

Verify all 14 assets in Rare/Epic/Legendary, no missing resources, appropriate recolor and active states, native click/hit boxes, movement and scroll during v3.01 routes. Visual changes do not change achievements, Shop, music or encounter rewards.

See [Technical](TECHNICAL.md).
