# 12. Arcade, Combat, and System Combos

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos

Covers the optional arcade layer from ambient UFOs through Boss and Super Boss combat, plus Mippi Bird, powerups, combat modifiers, and cross-system interactions.

## Purpose

This category groups the canonical documentation for **Arcade, Combat, and System Combos**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Arcade Spawn Layer** | Schedules optional arcade threats and opportunities without allowing them to permanently block the professional portfolio experience. | [Design](arcade-spawn-layer/DESIGN.md) | [Technical](arcade-spawn-layer/TECHNICAL.md) |
| **Regular UFO** | Provides the baseline hostile arcade target and begins the site's invasion escalation loop. | [Design](regular-ufo/DESIGN.md) | [Technical](regular-ufo/TECHNICAL.md) |
| **Hostile Projectile System** | Lets UFOs and bosses fire at the player while ensuring impacts, misses, and cleanup do not leave stale projectiles on screen. | [Design](hostile-projectile-system/DESIGN.md) | [Technical](hostile-projectile-system/TECHNICAL.md) |
| **Boss UFO** | Provides the normal multi-hit boss encounter and satisfies the normal Finale's boss requirement. | [Design](boss-ufo/DESIGN.md) | [Technical](boss-ufo/TECHNICAL.md) |
| **Invasion Meter** | Tracks arcade escalation toward larger encounters and communicates progress toward the Super Boss. | [Design](invasion-meter/DESIGN.md) | [Technical](invasion-meter/TECHNICAL.md) |
| **Super UFO Boss** | Provides the late-game multi-phase boss encounter required by the Air Superiority Epic achievement. | [Design](super-ufo-boss/DESIGN.md) | [Technical](super-ufo-boss/TECHNICAL.md) |
| **Super Boss Interaction Override** | Temporarily manages Interact Mode and cursor behavior so the Super Boss remains playable regardless of the player's previous interaction setting. | [Design](super-boss-interaction-override/DESIGN.md) | [Technical](super-boss-interaction-override/TECHNICAL.md) |
| **Cursor Projectile Combat** | Lets the player fire upward-moving cursor projectiles that collide with boss targets and adds. | [Design](cursor-projectile-combat/DESIGN.md) | [Technical](cursor-projectile-combat/TECHNICAL.md) |
| **Mega Laser** | Provides the Super Boss beam attack that pauses boss movement while continuously tracking the player's cursor at a controlled rate. | [Design](mega-laser/DESIGN.md) | [Technical](mega-laser/TECHNICAL.md) |
| **Boss Adds** | Provides supporting enemies that can be shot and explode in place during the Super Boss encounter. | [Design](boss-adds/DESIGN.md) | [Technical](boss-adds/TECHNICAL.md) |
| **Star Power Combat** | Lets Star Power contact damage regular UFOs and interact with boss targets through explicit cooldown rules. | [Design](star-power-combat/DESIGN.md) | [Technical](star-power-combat/TECHNICAL.md) |
| **Slowmo** | Applies a slower timing model to flying objects, hostile projectiles, and selected arcade physics. | [Design](slowmo/DESIGN.md) | [Technical](slowmo/TECHNICAL.md) |
| **Easy Mode** | Dramatically increases ambient opportunity spawning and serves as both an accessibility aid and a playful console modifier. | [Design](easy-mode/DESIGN.md) | [Technical](easy-mode/TECHNICAL.md) |
| **System Combos** | Recognizes meaningful interactions between independent systems such as Star Power, UFOs, Slowmo, Doug, Shop loadouts, and Legendary attacks. | [Design](system-combos/DESIGN.md) | [Technical](system-combos/TECHNICAL.md) |
| **Mippi Bird** | Provides the embedded arcade minigame launched from the console. | [Design](mippi-bird/DESIGN.md) | [Technical](mippi-bird/TECHNICAL.md) |
| **Mippi Bird Extra Lives** | Combines the Shop shield and Mushroom progression to give Mippi Bird additional survivability. | [Design](mippi-bird-extra-lives/DESIGN.md) | [Technical](mippi-bird-extra-lives/TECHNICAL.md) |
| **Mippi Bird Rupee Rewards** | Awards limited session Rupees for reaching selected Mippi Bird score milestones without allowing unlimited farming. | [Design](mippi-bird-rupee-rewards/DESIGN.md) | [Technical](mippi-bird-rupee-rewards/TECHNICAL.md) |
| **Mippi Bird Damage Feedback** | Communicates shield loss, invulnerability, crashes, and recovery clearly during the minigame. | [Design](mippi-bird-damage-feedback/DESIGN.md) | [Technical](mippi-bird-damage-feedback/TECHNICAL.md) |
| **Mippi Bird Sharing** | Provides the optional sharing behavior associated with the Mippi Bird experience. | [Design](mippi-bird-sharing/DESIGN.md) | [Technical](mippi-bird-sharing/TECHNICAL.md) |
| **Combat Geometry Caching** | Shared cached target/emitter reads and diagnostic comparison switch, introduced v2.91. | [Design](combat-geometry-caching/DESIGN.md) | [Technical](combat-geometry-caching/TECHNICAL.md) |
| **Authored Flight Motion Geometry** | v2.92 modeled CSS flight trajectories synchronized with the animation clock. | [Design](authored-flight-motion-geometry/DESIGN.md) | [Technical](authored-flight-motion-geometry/TECHNICAL.md) |

| **Shared Canvas Particle Renderer** | Canvas2D default for shared explosion particles, with original DOM renderer retained for A/B comparison. | [Design](shared-canvas-particle-renderer/DESIGN.md) | [Technical](shared-canvas-particle-renderer/TECHNICAL.md) |

| **Cursor Interaction and Upward Shooting** | Mushroom-scaled contact radius is separate from upward-only enemy shooting. | [Design](cursor-interaction-and-upward-shooting/DESIGN.md) | [Technical](cursor-interaction-and-upward-shooting/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
