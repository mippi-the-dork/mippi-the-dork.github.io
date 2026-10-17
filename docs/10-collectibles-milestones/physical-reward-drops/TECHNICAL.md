# Physical Reward Drops - Technical

**Introduced:** v3.01. **Current documented version:** v3.01.

`script.js` owns `spawnGroundDrop(kind,x,y,{velocityX,duration})`, `maybeSpawnInteractionRupees(event)`, `awardArcadeRupees(amount,x,y,source)`, and `handleGamePickup(def,item)`. `MippiSpawnMotion.register` moves .game-pickup.mippi-ground-drop with initial upward velocity, gravity **1150 px/s²**, lateral momentum, up to three bounces and a ground coordinate derived from the bottom HUD. Default lifetime is 15 seconds. Wallet increments only when the corresponding Rupee's `click` handler calls `awardRupees(1,...)`.

UI event filter requires a trusted click on `a[href]`, `button`, `[role=button]` or `[role=link]`, omitting disabled controls and existing game layers, Console, Boss and Mippi Bird. Chance ~0.24 local / 0.56 external HTTP(S) origin, external amount 2–3, WeakMap per-control successful cooldown ~11,000ms, global successful minimum ~700ms, recent successful drop-event cap 10/60s. These throttles apply to **successful spawns**, not all clicks. Source attribution is stored in `item.dataset.rupeeSource`.

Regular UFO `registerUfoKill`: 30% Rupee drop opportunity and 5% Heart. Regular Boss kill: physical three-Rupee reward and guaranteed Heart. Super Boss kill: eight physical Rupees and guaranteed Heart. Add defeat: 10% Heart chance. The `pickupKinds` list retains Heart/Rupee definitions for forced QA, but `choosePickupDefinition()` naturally selects Star/Mushroom or conditional Key instead.

`awardRupees()` continues maintaining wallet persistence/telemetry, but is reached by pickup collection for these events. Other unrelated economy award sources are not necessarily converted. The hotbar acts as the shared physical ground via `MippiSpawnMotion.ground()`. Validate overlaps and rapid drop creation in real browser.

See [Design](DESIGN.md), [Spawn Motion](../../14-dynamic-runtime/authored-spawn-motion/TECHNICAL.md).
