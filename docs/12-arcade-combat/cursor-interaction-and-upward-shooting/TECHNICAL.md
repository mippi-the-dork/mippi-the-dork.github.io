# Cursor Interaction and Upward Shooting - Technical

**Introduced:** v3.00. **Current documented version:** v3.01.

## Click radius

`cursorClickRadius()` in `script.js` computes **22px base**, **31px in Legendary**, plus **17px per actual `cursorPowerLevel`**, plus **14px during Star Power**. `syncCursorClickRadius()` uses the same value for visible ring custom property `--cursor-click-radius`, kept current after theme and power changes.

`nearbyClickable(x,y,{starAuto})` queries eligible world clickables and checks radius from the cursor to each target rectangle edge. The explicit native target click still uses its original handler; a `pointerdown` radius contact calls the appropriate original `.click()` with telemetry method. The `starAuto` path excludes Castles and hidden Keys and applies its own candidate set.

**Do not reuse historical +55px Mushroom projectile-acquisition language as v3.01 behavior.** Cursor-radius formula and `cursorPowerLevel` remain separate from the Cursor Lab's visual-only override.

## Projectiles

`fireLegendaryPlayerShot(x,y,{angle,lab})` uses velocity `vx=sin(angle)*speed`, `vy=-cos(angle)*speed`, **1050 px/s** normally or **1380 px/s** Golden Trigger. `tickLegendaryShots` updates up to **18** live shots in one shared rAF (this supersedes previous 14-shot cap), with <=120ms delta step and **1800ms** lifetime. Target candidates are restricted to regular `.galaga-secret` UFO/Boss and diagnostic Lab targets. Segment-vs-AABB swept collision uses a Set of hit targets for piercing shots.

On world `pointerdown`, the Cool Mode flag `dougCoolActive` fires angles `[-12,0,12]`; otherwise angle `[0]`. `piercing` is true while Star Power is active (non-Lab), continuing past hit enemies. The original entity click handler remains the authoritative damage/telemetry action; shots neither touch pickups nor shooting stars.

`window.MippiCombatHooks.playerFire` calls this production function in the opt-in Combat Lab with `lab` flag, preventing normal progression. Super Boss uses its encounter-specific straight-up bullets rather than the normal target path.

## Safeguards

Native buttons/links/inputs and modals are excluded from the document shooting handler. If a valid radius contact exists under the World pointer, contact is used before firing. Behavior under non-Legendary/Star eligibility is checked by ordinary game progression flags. These are separate responsibilities from `combatGeometry` position accounting and visual Cursor Lab `size`.

See [Design](DESIGN.md), [Player Projectile Combat](../cursor-projectile-combat/TECHNICAL.md) and [Gameplay QA](../../QA/V3_00_V3_01_GAMEPLAY_QA.md).
