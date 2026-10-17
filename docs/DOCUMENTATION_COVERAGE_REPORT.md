# Documentation Coverage Report

**Current documented version:** Mippi Portfolio v3.14. **Sources:** Nine ZIP handoffs containing 30 Markdown files (v2.81–v2.89).

This change only touches documentation paths. Runtime JavaScript, HTML, CSS, assets, user-authored MP3/LRC files, and hosting configuration are untouched.

## Release Matrix

| Release | Documented changes |
| --- | --- |
| v2.81 | Unified four-column HUD; bonus Hearts to Bird-life bank; nine-burst Castle reward; bounded Invasion; compile repair; docs links; Full/Single Enhanced LRC. |
| v2.82 | Shared 14-shot projectile updater; Director recovery; three-toast queue; rarity-owned Ledger; wider Castle fireworks; Hero image. |
| v2.83 | Framed resting HUD; actionable Wish/Blueprint prompts; collapsed music controls alignment; ResizeObserver companion lyrics at 12px. |
| v2.84 | Ledger/Docs unlock gating; native Mushroom cursor; Rare Rupee/Heart opportunities; closed Bird blocker correction; Player Model distinct from Director. |
| v2.85 | Five glyph Hearts; icon-safe HUD text; rarity cursor SVG; predicted Legendary bullets; Repeat Off/One/All; hover Ledger scrolling; public particles removed. |
| v2.86 | Offscreen Three.js culling, theme material caching, redundant CSS filter removal, dev perf. |
| v2.87 | perf-lab.js and hidden dev profile; no first-paint legacy HUD flash; desktop paired HUD groups. |
| v2.88 | Named subsystem/rAF timings, spike records, Hero/About/Ambient logic/Projectile/HUD logic isolates. |
| v2.89 | Timer source measurements, objective clock isolate, objective/toast/HUD DOM snapshots, nearby event correlations and Long Animation Frame attribution. |

## New Feature Documentation

Each entry below contains both Design and Technical pages and is included in its category README:

- [Unified Bottom HUD](01-experience-foundation/unified-bottom-hud/DESIGN.md) and [Technical](01-experience-foundation/unified-bottom-hud/TECHNICAL.md)
- [Three.js Rendering Budget](03-threejs-presentation/rendering-budget/DESIGN.md) and [Technical](03-threejs-presentation/rendering-budget/TECHNICAL.md)
- [System Toast Stack](05-achievements-discovery/system-toast-stack/DESIGN.md) and [Technical](05-achievements-discovery/system-toast-stack/TECHNICAL.md)
- [Documentation Access](13-interaction-modes/documentation-access/DESIGN.md) and [Technical](13-interaction-modes/documentation-access/TECHNICAL.md)
- [Synchronized Lyrics Viewer](16-finale-postgame/synchronized-lyrics-viewer/DESIGN.md) and [Technical](16-finale-postgame/synchronized-lyrics-viewer/TECHNICAL.md)
- [Performance Diagnostics](17-qa-operations/performance-diagnostics/DESIGN.md) and [Technical](17-qa-operations/performance-diagnostics/TECHNICAL.md)

Six new features increase the documented hierarchy from **233 to 242 feature folders**, or **478 Design/Technical pages**. Other affected existing features have version-specific corrections or supersession notes across the site shell, Three.js, achievements, Console, Wish, Hearts, Castles, Mippi Bird, Invasion, projectiles, modes, Director, Objectives, Music and QA.

## Cross-Cutting Documents

- [Release history](RELEASE_HISTORY.md)
- [Console command catalog](CONSOLE_COMMAND_CATALOG.md)
- [Persistence key registry](PERSISTENCE_KEY_REGISTRY.md)
- [Runtime state map](RUNTIME_STATE_MAP.md)
- [UI surface map](UI_SURFACE_MAP.md)
- [Feature relationships](FEATURE_RELATIONSHIPS.md)
- [Enhanced LRC authoring](MUSIC_LYRICS_AUTHORING_GUIDE.md)
- [Regression matrix](QA/V2_81_TO_V2_89_REGRESSION_MATRIX.md)
- [Performance test procedure](QA/PERFORMANCE_PROFILING_V2.89.md)

## Decisions That Supersede Old Documentation

- **Floating HUD:** Unified four-group dock; paired groups desktop since v2.87.
- **Per-track lyric ?:** Single Lyrics toggle and separate Full/Single companion from v2.81.
- **Line-only LRC:** Enhanced word/segment timing supported from v2.81.
- **15px/14px lyrics text:** v2.83 current 12px text.
- **Repeat Off/All/One:** v2.85 current Off/One/All.
- **All pickups Epic-only:** Rare Rupees/Hearts available since v2.84.
- **Mippi Bird DOM blocks attention:** Only open Mippi Bird blocks.
- **Public particles Console command:** Removed v2.85, internal effect remains.
- **Renderer-call FPS:** Not equivalent to actual GPU-presented FPS.

## Verification Limits

The release handoffs describe the documented features, but do not establish a verified performance fix on the user's Windows hardware. The v2.86–v2.89 performance work remains an **open investigation**. The new [regression matrix](QA/V2_81_TO_V2_89_REGRESSION_MATRIX.md) and [profile plan](QA/PERFORMANCE_PROFILING_V2.89.md) specify follow-up real-browser checks. No handoff ZIP files are being copied into the public docs tree.


## v2.90–v2.92 Addendum

Three additional ZIP handoffs add permanent [Combat Performance Lab](17-qa-operations/combat-performance-lab/DESIGN.md), [Combat Geometry Caching](12-arcade-combat/combat-geometry-caching/DESIGN.md), and [Authored Flight Motion Geometry](12-arcade-combat/authored-flight-motion-geometry/DESIGN.md). This adds **3 new feature folders / 6 Design+Technical documents** to the v2.89 inventory: **244 folders / 488 feature documents**.

Coverage also includes [v2.92 benchmark QA](QA/COMBAT_BENCHMARK_V2_92.md) and [observational performance findings](QA/PERFORMANCE_INVESTIGATION_FINDINGS.md). The supplied performance evidence does not prove the reported FPS issue is resolved. No user-authored audio/lyrics or website code was altered.


## v2.93–v2.94 Coverage

Two release handoffs, plus two v2.93 user performance analyses, add **Combat Visual Isolation** (category 17) and **Shared Canvas Particle Renderer** (category 12) as new Design/Technical feature pairs. The documented inventory is now **244 feature folders / 488 feature pages**. Updated documentation includes Console commands, performance tools, effect consumers, asset dependencies, QA matrix, release chronology, references and [Canvas/DOM ABBA testing](QA/COMBAT_VISUAL_RENDERING_V2_94.md).

v2.93 independently hides player/UFO projectile paint, explosion *emission*, explosion *paint*, and glow. Combined benchmark frame-delivery rates were 30.4 all-on versus 49.8 with cosmetic emission disabled; the fifth, much later unbracketed paint-hidden capture did not establish that hidden paint causes poor performance. v2.94 changes the default `explodeAt()` backend to shared Canvas2D with original DOM fallback and A/B control. The release has passed headless code/functional tests, while Windows performance and visual parity remain unverified by the provided evidence. No audio, lyric, portfolio code or runtime assets have been changed in this docs-only update.


## v2.95–v2.97 Coverage

Three additional release handoffs and six performance-analysis documents extend the current specification to **v2.97**. Two feature folders each with Design/Technical documentation were added: [Long-Session Stability Lab](17-qa-operations/long-session-stability-lab/DESIGN.md) and [Cursor Rendering Lab](17-qa-operations/cursor-rendering-lab/DESIGN.md). Total inventory is **246 feature folders and 492 feature pages**. New procedures: [Long-Session Stability QA](QA/LONG_SESSION_STABILITY_V2_97.md) and [Cursor Lab Windows QA](QA/CURSOR_LAB_V2_97.md).

Current documentation distinguishes the validated v2.96 foreground 14-cycle phase change (55.0 then 49.2 callback FPS), the separate correlation of extreme slowdown with grown cursor styles (18.5/23.6), and unproven cursor causation. v2.97 introduces isolation controls and exports, **not a demonstrated performance fix**. Canvas remains the default and original visuals remain unchanged without explicit test toggles. No portfolio source, audio or assets are edited by this documentation-only update.


## v2.98 Coverage

The v2.98 cursor architecture handoff and four performance-analysis reports add [Scoped Mushroom Cursor](01-experience-foundation/scoped-mushroom-cursor/DESIGN.md) with Design and Technical documents, bringing the inventory to **247 feature folders / 494 feature pages**. Added [Scoped Cursor Architecture QA](QA/CURSOR_ARCHITECTURE_V2_98.md) and updated Cursor Lab, Mushroom and keyboard/pointer safety, Console, release history, version/navigation and investigation findings. Scoped is the default and Legacy remains a reversible comparison. v2.98 tests show a strong performance association for Scoped under moving-pointer load, but residual performance problems and Trail/objective confounds remain. The recommendation to move the DOM Trail to Canvas belongs to a possible later release, **not v2.98**. All changes in this documentation update are under `docs/` only.


## v2.99 to v3.01 Coverage

Three successive handoff releases add five feature pairs: [Canvas-First FX](04-themes-visual-language/canvas-first-2d-fx/DESIGN.md), [Unified Game Artwork](04-themes-visual-language/unified-game-artwork/DESIGN.md), [Physical Reward Drops](10-collectibles-milestones/physical-reward-drops/DESIGN.md), [Cursor Interaction and Upward Shooting](12-arcade-combat/cursor-interaction-and-upward-shooting/DESIGN.md), and [Authored Spawn Motion](14-dynamic-runtime/authored-spawn-motion/DESIGN.md). This brings documentation to **252 feature folders / 504 Design and Technical pages**. The art staging checklist describes proposed integration only; the v3.00 and v3.01 source/merged release briefs describe subsequent completed integration. The distinction between historical v2.99 diagnostic results and unmeasured v3.01 runtime performance is preserved. Website files/assets remain untouched by this docs-only update.


## v3.02–v3.04 Coverage

[Galaga Formations](12-arcade-combat/galaga-formations/DESIGN.md) and [Spawn Entrance and Expiry](14-dynamic-runtime/spawn-entrance-expiry/DESIGN.md) add two canonical feature pairs. Current documentation totals **254 folders and 508 Design/Technical pages**. v3.02 adds body-level Mushroom overlays, concurrency caps, UFO formations and expiry; v3.03 changes layering, stagger to 1,050ms and Boss pacing; v3.04 tints Mippi Bird, changes the Super Boss to 27 HP and six 3-HP respawning adds, moves laser origin to the mouth and adds onscreen entrances. See [v3.04 QA](QA/V3_02_TO_V3_04_QA.md). Syntax checks and implementation merges were performed; full browser acceptance remains open.


## v3.05–v3.10 Coverage

Six uploaded documentation handoffs and referenced source commits are incorporated chronologically. Three new feature pairs add [Elarsi Feature Presentation](02-portfolio-content/elarsi-feature-presentation/DESIGN.md), [Your Studio Here Career Card](02-portfolio-content/your-studio-here-card/DESIGN.md), and [Hero Navigation Fallback](03-threejs-presentation/hero-navigation-fallback/DESIGN.md). Totals: **257 feature folders / 514 canonical Design and Technical pages**. Existing Hero, Signal navigation, runtime health, Second Perspective, related achievement hints, Star Power, career/tool layouts, QA, cross-system references, release history and the docs portal are updated.

The current Hero logo configuration uses the v3.10 centered `logoOrbit` and the v3.08 decorative-ring angles; the v3.08 translated logo is superseded. Source handoffs document Elarsi's CSS art, Star Power's hue-only ring rotation, the accessible four-link WebGL fallback, and the wide career card. The 2048×576 `assets/career-real/yourstudiohere.png` is supplied in handoff ZIPs but is an **external website asset dependency**, not installed by documentation changes. Verify that the image actually loads. The v3.10 release notes require human visual QA of final Hero composition. No live-version comparisons are needed in the documentation.


## v3.14 Consolidated Update

Current documented state is **v3.14**, including all four v3.11–v3.14 handoffs and merged implementation PRs #24–#27. Three feature pairs added: [Studio Career Reveals](02-portfolio-content/studio-career-reveals/DESIGN.md), [Graphics Capability Fallback](03-threejs-presentation/graphics-capability-fallback/DESIGN.md), and [Mippi Bird Life Refill](09-economy-shop/mippi-bird-life-refill/DESIGN.md). Inventory is **260 features / 520 DESIGN+TECHNICAL pages** across 17 categories. v3.11 corrects ring/Console/theme memory, v3.12 adds career reveals and theme-independent click radius/music selection play, v3.13 adds graphics fallback, links and 11-item Shop, and v3.14 refines full-color, no-scroll career panels. See [v3.14 QA](QA/V3_11_TO_V3_14_REGRESSION_QA.md).
