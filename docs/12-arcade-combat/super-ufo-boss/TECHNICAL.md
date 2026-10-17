# Super UFO Boss - Technical Documentation

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

## Encounter state

`spawnSuperBoss(force=false)` constructs `.superboss-arena`, its header/health bar, `.superboss-core`, add layer, cursor, Exit button, active timers and rAF handles. The core starts at **hp:27, maxHp:27**, not the historical 18. HUD value and proportional fill use 27.

Six `.superboss-add` objects orbit the core. Each has 3 HP, a damaged bar and hit feedback. A destroyed add schedules respawn of its **same slot after ~5,000ms** if the encounter is still live. Add respawn timers belong to `state.timeouts` and are cancelled on fight exit/death. See [Boss Adds](../boss-adds/TECHNICAL.md).

## Motion and phases

Boss X pans between authored screen-space bounds with occasional direction reversals; v3.03's horizontal speed is approximately **50% of the v3.01 rate**. Y drifts subtly. `bossMoveClock` advances only when `!laserActive`, so core and six-orbit add phase never jump after the beam.

Core attack pressure scales with remaining HP:

| HP | Core volley |
| --- | --- |
| 19–27 | 1 shot |
| 10–18 | 2 shots |
| 1–9 | 3 shots |

Rocket, add-fire and Mega Laser schedulers retain their existing patterns and Slowmo variants. Mega Laser originates at `bossY + 62`, with the visual and hit segment aligned. The Super Boss's own upward player-shot and knockback mechanics remain independent of the regular UFO projectile path.

## Rewards, exit, diagnostics

At zero HP, existing Super Boss victory/telemetry/postgame history and eight Rupee physical rewards remain. The victory panel persists briefly before teardown. Escape/Exit ends encounter and cancels active rAF/interval/timeout work, **including pending add respawns**. The exposed `__MIPPI_SUPERBOSS__.snapshot()` includes maximum HP and per-add health, enabling deterministic QA without editing saved progression.

Source syntax and merge checks were performed; visual hitbox/beam and end-to-end Windows gameplay results require manual QA. See [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
