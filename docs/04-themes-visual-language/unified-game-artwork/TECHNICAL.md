# Unified Game Artwork - Technical

**Introduced:** v3.00. **Current documented version:** v3.01.

## Authoritative assets and registry

The **merged site** uses `assets/game/*.svg` referenced by new `game-art.js` (loaded before `script.js`). This supersedes the **pre-integration staging package** paths `assets/gameplay/*.svg` and its `asset-map.json`. Those staging paths are **not** runtime asset locations.

`window.MippiGameArt` is frozen and contains:

```text
hud:        cool-meter, invasion-meter, castle-meter, rupee-meter, heart-empty, heart-full
clickables: castle, bone, rupee, heart, key, mushroom, star
pickups:    rupee, heart, 1up, key, star
enemies:    ufo, boss, add, superBoss
```

Specific mapping: `hud.cool-meter -> cool.svg`, `hud.invasion-meter -> alien.svg`, `hud.castle-meter -> crown.svg`, `hud.rupee-meter -> rupee.svg`, `hud.heart-empty -> heart-empty.svg`, `hud.heart-full -> heart-full.svg`; world Castle `castle.svg`, Bone `bone.svg`, Rupee `rupee.svg`, Heart `heart-full.svg`, Key `key.svg`, Mushroom `mushroom.svg`, Star `star.svg`; UFO `enemy.svg`, Boss/Add `boss.svg`, Super Boss `super-boss.svg`.

`script.js` uses registry URLs inside `--game-art:url(...)` CSS custom property and `.game-art-icon` mask treatment. CSS assigns rarity-appropriate tint. Preserve viewBox and aspect ratio, and keep clickable buttons and their event listeners independent of the SVG children. A fallback inline SVG may remain in source for missing registry entries. Art assets do not replace CSS/Canvas particle sprites.

## Checks

Validate `index.html` load order, missing network asset failures, theme changes, 5-heart icon fill state, active/attention HUD classes, mouse hit targets and disabled-interact behavior, Boss/Add/Super Boss scaling. `star.svg` is for collectable Star and not Shooting Star.

See [Design](DESIGN.md), [Art/Movement QA](../../QA/V3_00_V3_01_GAMEPLAY_QA.md).
