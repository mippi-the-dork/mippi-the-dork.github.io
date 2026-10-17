# Cursor Interaction and Upward Shooting - Design

**Introduced:** v3.00. **Current documented version:** v3.01.

## Two distinct mechanics

**Close-range collection:** A visible cursor circle marks an interaction radius for nearby eligible world clickables. Actual Mushroom levels increase that real radius (not only cursor art). Star Power auto-contact uses the same radius. The ordinary native click on a pickup or enemy remains valid.

**Shooting:** Once Legendary shooting is unlocked, left-clicking the world fires **upward, enemy-only** bullets from the cursor. Shots **do not seek or home**, and they **do not collect** Rupees, Hearts, Stars, Mushrooms, Keys, Bones, Castles or Shooting Stars. Aim by placing the cursor under the enemy. Cursor growth is not a projectile lock-on range.

Cool Mode upgrades the volley to a **three-shot angled spread**; Star Power makes shots pierce enemies and separately allows cursor-area contacts. Golden Trigger increases bullet speed, not acquisition radius.

## Game design purpose

Distinguishing manual aim from proximity interaction preserves readable agency. Real Mushroom power gives playful extra reach for clicking without turning shots into automatic collection. The Super Boss has its own upward shot/hazard experience, retaining its Mega Laser avoidance encounter.

## Acceptance

Test world pointer clicks, wide cursor radius, regular UFO/Boss collisions, Star Power contact and piercing, Cool Mode three-shot spread, and the non-interaction of bullets with collectibles or Shooting Stars. Ensure modal and navigation controls do not accidentally fire bullets. See [Technical](TECHNICAL.md).
