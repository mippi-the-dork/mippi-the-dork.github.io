# v3.00 to v3.01 Gameplay and Visual QA

**Current documented version:** v3.01. Syntax checks passed in the source implementation; full gameplay and Windows performance QA remain separate validation work.

## Art and themes

Confirm all **14** registry-backed `assets/game/*.svg` files load from `game-art.js`; check Cool, Invasion, Castle **crown** meter, Rupee meter, empty/full Hearts, collectible Castle, Star, Mushroom, Key, Doug Bone, regular UFO, Boss/add and Super Boss. `star.svg` is not the shooting-star image. Verify Rare/Epic/Legendary tint, SVG aspect ratio, hotbar active `aria-pressed` versus attention, and clickable hitbox size.

## Combat and interaction

Check Legendary vertical enemy-only single shot, Cool Mode three-shot spread and Star Power piercing. Shots must not home or collect pickups. Check cursor contact radius 22px base (31px Legendary) +17px per actual Mushroom power level +14px during Star Power; forced visual size must not increase real contact radius. Native item clicks continue to work. Compare Super Boss core shots, six adds and Mega Laser freeze/aim. Validate 18-shot max and no lingering bullets.

## v3.01 movement and sources

| Object | Required observation |
| --- | --- |
| Star | Repeated lateral movement with hops above hotbar, reversal at boundaries |
| Rupee | Actual chance-based UI/link or enemy source, physical bounce near HUD, **no wallet credit before click** |
| Mushroom | Perimeter of an eligible content panel, follows scroll and clipped/complex panels |
| Heart | Enemy-only natural drops, roughly 5% UFO/10% Super Boss add and guaranteed Boss/Super Boss; click required |
| Bone | Ambient spin and drop from above, expires beyond hotbar |
| Key | Single non-expiring panel-bound key at bottom right; Castle quest opens on collection |
| UFO | Corner Bezier or vertical sine path, clean despawn and proper bullet origin |
| Boss | Repeating top/right/bottom/left diamond, escape timer and six HP |
| Super Boss | Top pan, six orbiting adds and synchronized pause during Mega Laser |
| Shooting Star | **Original path preserved** |

Stress test resize/scroll, target click and hover, slow motion, hidden/disabled interaction, stage-appropriate spawn timing, overlapping drops and stale movement handles. Normal ambient pickup selection should not naturally choose Hearts/Rupees. `dev pickup heart` remains a QA-only exception; `hey listen` describes how Hearts are found.

## Castle and FX

Castle 4/4 claim uses **nine Canvas-only bursts, 16 sprites each at 10px**, shorter lifetime than the previous huge version, with normal progression and friendly auto-collection preserved. It must not fall back to the earlier DOM firework implementation. Compare tighter Canvas cosmetic cores/halos to DOM reference, without changing gameplay or dropping unrelated visual effects.

## Local launcher and performance

Launch `START_LOCAL_TEST.bat` and `LocalTestServer.ps1` over localhost HTTP. Confirm test docs and runtime assets are present; export version-labeled FX/performance results. Re-run real-browser performance testing with Canvas and DOM isolation and representative moving entities. Source syntax passing is not equivalent to an end-to-end user gameplay pass, and no specific v3.01 FPS gain is established by the supplied materials.