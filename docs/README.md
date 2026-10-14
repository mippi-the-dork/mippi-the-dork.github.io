# Mippi Portfolio Documentation

**Current documented state:** Mippi Portfolio v2.94

**Comprehensive baseline:** v2.78, with chronological release changes v2.79 through v2.94 integrated. The v2.86–v2.89 profiling work is diagnostic and does not claim the reported FPS regression is fixed.

This folder is the canonical documentation set for the Mippi portfolio experience.

The documentation is organized in three layers:

1. **Feature documentation** inside the 17 numbered category folders.
2. **Project-wide reference documents** at this root.
3. **Release and QA material** inside `QA/`.

Each feature folder contains:

```text
DESIGN.md
TECHNICAL.md
```

`DESIGN.md` is the canonical player-facing/product rationale for that feature.

`TECHNICAL.md` is the canonical implementation, state, dependency, and QA reference for that feature.

Project-wide catalogs should not replace feature documentation. They exist to answer cross-cutting questions such as:

- Which storage key owns this state?
- Which Console command reaches this system?
- Which systems depend on one another?
- Which telemetry event is emitted?
- Which UI surface owns this control?
- Which state is persistent, session-scoped, or runtime-only?

For exact IDs, storage keys, command names, achievement keys, Shop IDs, Objective IDs, and telemetry event names, the root reference catalogs are authoritative for the current v2.92 documented state.

## Numbered Documentation Categories

| Category                                                                              | Features | Scope                                                                                                          |
| ------------------------------------------------------------------------------------- | -------: | -------------------------------------------------------------------------------------------------------------- |
| [01. Experience Foundation](01-experience-foundation/README.md)                       |       14 | Core site shell, navigation, persistence, accessibility, layout, motion, and reset behavior.                   |
| [02. Portfolio Content and Professional Presentation](02-portfolio-content/README.md) |       17 | Games, career, consulting, Crafting Play, Unreal tools, galleries, About, and contact presentation.            |
| [03. Three.js and Interactive 3D Presentation](03-threejs-presentation/README.md)     |        8 | Three.js loading, runtime health, Hero 3D, ambient 3D, About 3D, and 3D interaction input.                     |
| [04. Rarity Themes and Visual Language](04-themes-visual-language/README.md)          |        9 | Rare, Epic, Legendary presentation, theme cycling, semantic exceptions, attention cues, and particles.         |
| [05. Achievements and Discovery](05-achievements-discovery/README.md)                 |       30 | Rare discovery Signals, Ledger, hints, Cheat, postgame Epic achievements, and Legendary 100 percent.           |
| [06. Meta Progression and Guidance](06-progression-guidance/README.md)                |        8 | Progression spine, onboarding, return guidance, Finale readiness, and True Completion framing.                 |
| [07. Dev Console and Command Surface](07-dev-console/README.md)                       |       16 | Console shell, command parsing, Help, special command styling, stats, reset, hidden commands, and QA commands. |
| [08. Wish and Blueprint Progression](08-wish-blueprint/README.md)                     |       17 | Shooting Star charge, BP_WishManager repair, validated Wishes, Legendary unlock, and authored Wish branches.   |
| [09. Rupee Economy and Shop](09-economy-shop/README.md)                               |       19 | Rupees, Shop discovery, prices, equipment, rarity presentation, affordability cues, and all ten Shop items.    |
| [10. Collectibles and Claimable Milestones](10-collectibles-milestones/README.md)     |       12 | Flying pickups, Hearts, Keys, Castles, Star Power, Mushrooms, Doug Bones, and claim-ready HUD behavior.        |
| [11. Doug and Coolness](11-doug-coolness/README.md)                                   |        8 | Doug petting, offscreen cameo, Coolness meter, Cool Mode, command state, Rainbow Bones, and reactions.         |
| [12. Arcade, Combat, and System Combos](12-arcade-combat/README.md)                   |       22 | UFOs, Bosses, Super Boss, projectiles, Mega Laser, Slowmo, Easy Mode, System Combos, and Mippi Bird.           |
| [13. Interaction and Debug Modes](13-interaction-modes/README.md)                     |       10 | Interact, Inspect, Design, Vibe AI, Lumen, Nanite, Particle Boost, stat overlay, and control strip.            |
| [14. Dynamic Runtime Systems](14-dynamic-runtime/README.md)                           |       16 | Optional Objectives, Adaptive Director, attention budget, anti-drought, Player Model, telemetry, and cohesion. |
| [15. Project Heavy Water Perspective Visualizer](15-perspective-visualizer/README.md) |        8 | The tactical/live camera demonstration for first-, second-, and third-person camera ownership.                 |
| [16. Finale and Postgame](16-finale-postgame/README.md)                               |       16 | Normal Finale, Session Report, postgame reveal, True Completion, and the 12-track Music Player, repeat/shuffle options, and editable LRC lyrics.               |
| [17. QA, Runtime Operations, and Deployment](17-qa-operations/README.md)              |       14 | Startup validation, localhost preview, deployment, reset QA, integration QA, test plan, and release sweep.     |

Total feature folders:

```text
244
```

Total canonical feature pages:

```text
488
```

## Project-Wide References

- [Documentation Coverage Report](DOCUMENTATION_COVERAGE_REPORT.md)
- [Combat Performance Lab](17-qa-operations/combat-performance-lab/DESIGN.md)
- [Combat Benchmark QA](QA/COMBAT_BENCHMARK_V2_92.md)
- [Combat Visual Rendering QA](QA/COMBAT_VISUAL_RENDERING_V2_94.md)
- [Shared Canvas Particle Renderer](12-arcade-combat/shared-canvas-particle-renderer/DESIGN.md)
- [Performance Investigation Findings](QA/PERFORMANCE_INVESTIGATION_FINDINGS.md)
- [Performance Diagnostics](17-qa-operations/performance-diagnostics/DESIGN.md)
- [Unified Bottom HUD](01-experience-foundation/unified-bottom-hud/DESIGN.md)

- [Release History](RELEASE_HISTORY.md)
- [Music Lyrics Authoring Guide](MUSIC_LYRICS_AUTHORING_GUIDE.md)

- [Feature Relationships](FEATURE_RELATIONSHIPS.md)
- [Persistence Key Registry](PERSISTENCE_KEY_REGISTRY.md)
- [Console Command Catalog](CONSOLE_COMMAND_CATALOG.md)
- [Achievement Catalog](ACHIEVEMENT_CATALOG.md)
- [Shop Inventory Catalog](SHOP_INVENTORY_CATALOG.md)
- [Objective Catalog](OBJECTIVE_CATALOG.md)
- [Telemetry Event Catalog](TELEMETRY_EVENT_CATALOG.md)
- [UI Surface Map](UI_SURFACE_MAP.md)
- [Runtime State Map](RUNTIME_STATE_MAP.md)

## QA

- [Extensive QA Test Plan](QA/EXTENSIVE_QA_TEST_PLAN.md)
- [Release Checklist](QA/RELEASE_CHECKLIST.md)
- [v2.81–v2.89 Regression Matrix](QA/V2_81_TO_V2_89_REGRESSION_MATRIX.md)
- [v2.89 Performance Profiling Procedure](QA/PERFORMANCE_PROFILING_V2.89.md)

## Documentation Rules

- Use the exact identifiers from the current v2.80 reference catalogs.
- Do not invent alternate names for storage keys or runtime IDs.
- Keep visual theme state separate from gameplay progression state.
- Treat localStorage, sessionStorage, and runtime-only state as different persistence classes.
- Treat the normal Finale and True Completion as separate gates.
- Treat the professional portfolio as the primary product. Game systems may enrich it but must degrade safely.
- Update cross-cutting registries whenever a release adds, removes, or renames an identifier.
- Update both `DESIGN.md` and `TECHNICAL.md` when a feature's player-facing behavior and implementation both change.
- Do not create a second competing canonical source for the same feature.

## Current Release Identity

Public runtime:

```text
index.html
style.css
script.js
perspective-demo.js
assets/
```

Development and QA helpers such as:

```text
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

belong in source/QA packages, not the public runtime deployment.

The full public reset is the boundary between one completed save state and a genuinely fresh experience.

## Versioning Note

Most feature documentation was authored against the comprehensive v2.78 baseline. When v2.79 or v2.80 changed a feature, the affected feature and cross-cutting pages are updated to v2.80. Unchanged feature pages may still show v2.78 as their implementation baseline because their documented behavior did not change in those releases.
