# Mippi Portfolio Documentation

**CURRENT DOCUMENTED VERSION: v2.98**

The Design, Technical, reference and QA documentation for the interactive Mippi portfolio. This is the canonical description of the experience **through v2.98**, including its game systems, presentation, tooling and performance investigations.

**247 documented features** across **17 categories**, with **494 canonical Design and Technical pages**.

## What's Current in v2.98

The latest release introduces **Scoped Mushroom Cursor** styling as the default. Enlarged cursors preserve their original look and gameplay benefits without activating the legacy page-wide cursor-selector network. Legacy styling is retained for reproducible comparison.

| Read this | Why it matters |
| --- | --- |
| [Scoped Mushroom Cursor - Design](01-experience-foundation/scoped-mushroom-cursor/DESIGN.md) | Current cursor appearance, behavior and interaction requirements |
| [Scoped Mushroom Cursor - Technical](01-experience-foundation/scoped-mushroom-cursor/TECHNICAL.md) | Scoped/Legacy CSS architecture, classes, commands and reset defaults |
| [Cursor Rendering Lab](17-qa-operations/cursor-rendering-lab/DESIGN.md) | Permanent visual-isolation and benchmarking controls |
| [v2.98 Cursor Architecture QA](QA/CURSOR_ARCHITECTURE_V2_98.md) | Windows A/B/A results, pointer safety and remaining Trail questions |
| [Performance Investigation Findings](QA/PERFORMANCE_INVESTIGATION_FINDINGS.md) | Measured comparisons, limitations and next diagnostic targets |
| [Release History](RELEASE_HISTORY.md) | Chronological changes through the current release |

**Performance status:** Scoped cursor styling performed substantially better than Legacy in the tested moving-cursor workloads. Performance is **not yet consistently at the intended target** under those conditions; the cause of remaining Trail and browser rendering cost has not been conclusively isolated. Reported FPS figures represent delivered animation callbacks, not independently measured GPU-presented frames.

## Explore the Documentation

- **Feature Design and Technical:** Open a category below, select a feature, then switch between its Design and Technical documents.
- **Project-wide reference:** Use the [Console Command Catalog](CONSOLE_COMMAND_CATALOG.md), [Runtime State Map](RUNTIME_STATE_MAP.md), [Persistence Key Registry](PERSISTENCE_KEY_REGISTRY.md), [Feature Relationships](FEATURE_RELATIONSHIPS.md) and other catalogs for authoritative cross-system details.
- **Quality and performance:** Start with the [current Release Checklist](QA/RELEASE_CHECKLIST.md), [v2.98 Cursor Architecture QA](QA/CURSOR_ARCHITECTURE_V2_98.md), [Long-Session Stability QA](QA/LONG_SESSION_STABILITY_V2_97.md) and [Combat Visual Rendering QA](QA/COMBAT_VISUAL_RENDERING_V2_94.md).
- **History:** Read the [Release History](RELEASE_HISTORY.md) and [Documentation Coverage Report](DOCUMENTATION_COVERAGE_REPORT.md) to understand changes over time.

## Numbered Documentation Categories

| Category                                                                              | Features | Scope                                                                                                          |
| ------------------------------------------------------------------------------------- | -------: | -------------------------------------------------------------------------------------------------------------- |
| [01. Experience Foundation](01-experience-foundation/README.md)                       |       15 | Core site shell, navigation, persistence, accessibility, layout, motion, and reset behavior.                   |
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
| [13. Interaction and Debug Modes](13-interaction-modes/README.md)                     |       10 | Interact, Inspect, Design, Vibe AI, Lumen, Nanite, Particle Boost, stat overlay, and unified HUD modes.            |
| [14. Dynamic Runtime Systems](14-dynamic-runtime/README.md)                           |       16 | Optional Objectives, Adaptive Director, attention budget, anti-drought, Player Model, telemetry, and cohesion. |
| [15. Project Heavy Water Perspective Visualizer](15-perspective-visualizer/README.md) |        8 | The tactical/live camera demonstration for first-, second-, and third-person camera ownership.                 |
| [16. Finale and Postgame](16-finale-postgame/README.md)                               |       16 | Normal Finale, Session Report, postgame reveal, True Completion, and the 12-track Music Player, repeat/shuffle options, and editable LRC lyrics.               |
| [17. QA, Runtime Operations, and Deployment](17-qa-operations/README.md)              |       16 | Startup validation, localhost preview, deployment, reset QA, integration QA, test plan, and Stability and Cursor Labs.     |

**Category total: 17**. **Feature folders: 247**. **Design + Technical feature pages: 494**.

## Project-Wide References

- [Release History](RELEASE_HISTORY.md)
- [Documentation Coverage Report](DOCUMENTATION_COVERAGE_REPORT.md)
- [Feature Relationships](FEATURE_RELATIONSHIPS.md)
- [Console Command Catalog](CONSOLE_COMMAND_CATALOG.md)
- [Persistence Key Registry](PERSISTENCE_KEY_REGISTRY.md)
- [Runtime State Map](RUNTIME_STATE_MAP.md)
- [UI Surface Map](UI_SURFACE_MAP.md)
- [Achievement Catalog](ACHIEVEMENT_CATALOG.md)
- [Shop Inventory Catalog](SHOP_INVENTORY_CATALOG.md)
- [Objective Catalog](OBJECTIVE_CATALOG.md)
- [Telemetry Event Catalog](TELEMETRY_EVENT_CATALOG.md)
- [Music Lyrics Authoring Guide](MUSIC_LYRICS_AUTHORING_GUIDE.md)

## QA and Performance References

- [Current Release Checklist](QA/RELEASE_CHECKLIST.md)
- [Extensive Regression QA Plan](QA/EXTENSIVE_QA_TEST_PLAN.md)
- [v2.98 Scoped Cursor Architecture QA](QA/CURSOR_ARCHITECTURE_V2_98.md)
- [v2.97 Cursor Lab Windows QA](QA/CURSOR_LAB_V2_97.md)
- [Long-Session Stability QA](QA/LONG_SESSION_STABILITY_V2_97.md)
- [Combat Visual Rendering QA](QA/COMBAT_VISUAL_RENDERING_V2_94.md)
- [Combat Benchmark QA](QA/COMBAT_BENCHMARK_V2_92.md)
- [Performance Investigation Findings](QA/PERFORMANCE_INVESTIGATION_FINDINGS.md)
- [v2.81–v2.89 Regression Matrix](QA/V2_81_TO_V2_89_REGRESSION_MATRIX.md)
- [v2.89 Performance Profiling Guide](QA/PERFORMANCE_PROFILING_V2.89.md)

The extensive regression plan originated with v2.80 and contains subsequent release addenda; version-numbered QA pages preserve the tests for their respective releases. The Release Checklist and this home page identify the **current v2.98** documentation requirements.

## Documentation Standards

Each feature folder has one `DESIGN.md` for player-facing rules and intent, and one `TECHNICAL.md` for implementation, dependencies, data and QA. Preserve exact command names, storage keys and feature IDs from the current catalogs; never invent competing identifiers. Distinguish persistent, session-only and derived state, and keep the professional portfolio usable when optional game systems are inactive.

Earlier feature pages may retain a historical implementation-baseline label such as v2.78. Those labels indicate where the original specification was authored, **not** the current documentation version. The current release identity is **v2.98**; release-specific changes are integrated into the applicable feature pages, catalogs and history.
