# Boss Adds - Technical Documentation

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

## Runtime representation

`spawnSuperBoss()` creates **6** `.superboss-add` sprites, each with a distinct orbital phase (one-sixth turn separation), `alive` status, **3 current / maximum HP**, screen-space `x/y`, and original slot identity.

A player-shot collision decrements the selected add's HP by **1** and updates its short health bar and hit feedback. An add is destroyed only when the third valid hit reaches 0. Projectiles test adds before the Super Boss core, preserving the cover/interception mechanic.

On add destruction, the runtime records existing telemetry, captures its actual world position, emits its explosion, and marks it inactive. The destroyed slot schedules a **5,000ms** respawn that restores HP to 3 and its orbital location only if the encounter remains active. Every pending respawn timeout is stored in the encounter's timeout registry and cancelled in encounter cleanup so there are no post-fight orphaned adds.

## Movement and combat

Living adds orbit the moving parent with the shared `bossMoveClock`; when `laserActive` the parent and orbit freeze. A regular add-fire interval selects a random living add (approximately 1,080ms normal / 1,650ms Slowmo). Destroyed slots cannot fire until respawn.

Regular Boss HP remains **6**. The Super Boss main core has **27 HP** from v3.04, and its projectile attack phase thresholds are scaled to HP 18 and 9.

## Diagnostics and QA

`window.__MIPPI_SUPERBOSS__.snapshot()` includes current/max boss HP and each add's HP for inspection. Verify hit/health display, concurrent destroyed slots, timer cancellation on exit/victory, no double-counted drops or rewards, and impact coordinates. See [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
