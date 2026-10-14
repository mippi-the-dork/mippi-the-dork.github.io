# Documentation Coverage Report

**Current documented version:** Mippi Portfolio v2.92. **Sources:** Nine ZIP handoffs containing 30 Markdown files (v2.81–v2.89).

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

Three additional ZIP handoffs add permanent [Combat Performance Lab](17-qa-operations/combat-performance-lab/DESIGN.md), [Combat Geometry Caching](12-arcade-combat/combat-geometry-caching/DESIGN.md), and [Authored Flight Motion Geometry](12-arcade-combat/authored-flight-motion-geometry/DESIGN.md). This adds **3 new feature folders / 6 Design+Technical documents** to the v2.89 inventory: **242 folders / 484 feature documents**.

Coverage also includes [v2.92 benchmark QA](QA/COMBAT_BENCHMARK_V2_92.md) and [observational performance findings](QA/PERFORMANCE_INVESTIGATION_FINDINGS.md). The supplied performance evidence does not prove the reported FPS issue is resolved. No user-authored audio/lyrics or website code was altered.
