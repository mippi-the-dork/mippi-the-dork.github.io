# Release Checklist

**Current documented target:** Mippi Portfolio v2.98

**How to use:** This is the cumulative release checklist. Use the **v2.98 Current Behavior** section and linked v2.98 QA as the current version-specific checks. Older numbered sections retain their original release requirements for regression context; do not use their version examples as v2.98 build identifiers.

Use this as the final release-candidate signoff after feature QA is already complete.

It is intentionally shorter than the [Extensive QA Test Plan](EXTENSIVE_QA_TEST_PLAN.md).

## 1. Freeze Candidate

- [ ] Confirm the candidate version.
- [ ] Stop unrelated polish until signoff finishes.
- [ ] Record package/source location.
- [ ] Confirm all intended changes are actually in this candidate.

## 2. Version Synchronization

- [ ] Runtime health version matches candidate.
- [ ] `style.css?v=<version>` matches.
- [ ] `script.js?v=<version>` matches.
- [ ] `perspective-demo.js?v=<version>` matches.
- [ ] `index-debug.html` query strings match source candidate.
- [ ] Preview server URL version matches.
- [ ] Preview server banner version matches.
- [ ] Package/release notes use the same version.

For v2.80, expected runtime asset queries are:

```text
style.css?v=2.80
script.js?v=2.80
perspective-demo.js?v=2.80
```

## 3. Public Package Hygiene

Public runtime should contain the intentional site files and assets.

Confirm these are absent:

```text
__pycache__/
*.pyc
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

- [ ] No Python cache.
- [ ] No local preview scripts.
- [ ] No debug HTML.
- [ ] No development-only Markdown.
- [ ] No clearly obsolete unused asset files.
- [ ] All required referenced assets are present.
- [ ] File/path case matches references exactly.

Music assets are no longer placeholder content in v2.80.

Confirm:

```text
assets/music/song-01.mp3 ... song-12.mp3
assets/music/song-01.lrc ... song-12.lrc
```

All 12 MP3s should be present. The 12 LRC files may remain metadata-only until actual lyrics are authored.

## 4. Static Validation

- [ ] JavaScript syntax check passes.
- [ ] Duplicate HTML ID scan passes.
- [ ] CSS brace/structure check passes.
- [ ] Local HTML asset references resolve.
- [ ] CSS `url(...)` references resolve.
- [ ] JavaScript dynamic image/icon references resolve.
- [ ] Minimal startup mock passes.
- [ ] DOM-enabled startup mock passes.
- [ ] `index-debug.html` differs from `index.html` only by intended diagnostic code.

## 5. Fresh Local Cold Load

Start a **new** local preview process.

Do not reuse an old browser tab as the only evidence.

- [ ] `PreviewLocal.bat` opens the expected version.
- [ ] URL contains a unique local launch token.
- [ ] Browser Console has no uncaught startup error.
- [ ] Current CSS is visibly loaded.
- [ ] Current JavaScript behavior is loaded.
- [ ] Professional navigation works.
- [ ] Heavy Water Perspective Visualizer works.
- [ ] Three.js scenes load or degrade gracefully.

Inspect:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

Expected:

- [ ] version correct,
- [ ] no unexplained early errors,
- [ ] Three import attempts sensible,
- [ ] Hero state matches visible Hero,
- [ ] Ambient state matches visible ambient layer,
- [ ] About state matches visible About 3D.

## 6. Returning-State Startup

Repeat local cold startup with representative saved states.

- [ ] Rare partial state.
- [ ] Epic state.
- [ ] Legendary state.
- [ ] Postgame revealed.
- [ ] 100 percent / Music Player unlocked.

Watch specifically for Temporal Dead Zone or initialization-order regressions.

## 7. Public Reset Integrity

Use the player-facing:

```text
reset
```

flow.

- [ ] First `reset` asks for confirmation.
- [ ] Non-reset input cancels.
- [ ] Second `reset` confirms.
- [ ] Mippi localStorage state clears.
- [ ] Mippi sessionStorage state clears.
- [ ] Scroll returns to top.
- [ ] Real `location.reload()` occurs.
- [ ] Rare baseline returns.
- [ ] Shop empty.
- [ ] Rupees zero.
- [ ] Hearts zero.
- [ ] Wish charge zero.
- [ ] Postgame hidden.
- [ ] Music Player hidden.
- [ ] Three.js bootstrap runs again without requiring manual refresh.

## 8. High-Risk Regression Sweep

- [ ] Hostile projectiles always clean up after hit/miss.
- [ ] No projectile remains frozen on screen.
- [ ] Optional Objective does not overlap full progress HUD.
- [ ] Optional Objective remains readable when other focused UI opens.
- [ ] Super Boss beam freezes translation and rotates toward cursor.
- [ ] Super Boss Adds explode at current position.
- [ ] Super Boss player fire works without Legendary prerequisite.
- [ ] Super Boss restores prior Interact state.
- [ ] Finale cursor is visible over choice buttons.
- [ ] Music Player aligns to Mippi logo/header inset.
- [ ] Music Player expands downward from fixed top edge.
- [ ] `wish` Help treatment remains readable.
- [ ] `blueprint` Help state turns warning red while broken.
- [ ] Local Three.js cold load does not require a manual refresh.
- [ ] Perspective Visualizer first-person turn speed is faster than second/third.

## 9. Fast DEV State Sweep

Use DEV for breadth.

### Progress

```text
dev rare
dev epic
dev legendary
dev finale ready
dev finale play
dev postgame reveal
dev postgame complete
dev music
```

- [ ] Rare visual/state.
- [ ] Epic visual/state.
- [ ] Legendary visual/state.
- [ ] Finale readiness.
- [ ] Finale sequence.
- [ ] Postgame reveal.
- [ ] True Completion.
- [ ] Music Player.

### Economy / Milestones

```text
dev rupees 10
dev shop affordable
dev shop complete
dev hearts 5
dev cool max
dev castle 4
```

- [ ] Shop affordability cue.
- [ ] Shop completion.
- [ ] Hearts claim-ready.
- [ ] Cool Mode.
- [ ] Castle claim-ready.

### Arcade

```text
dev ufo
dev boss
dev superboss
dev starpower
dev flappy
```

- [ ] Regular UFO.
- [ ] Normal Boss.
- [ ] Super Boss.
- [ ] Star Power.
- [ ] Mippi Bird.

### Director

```text
dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery
```

- [ ] All five states force successfully.
- [ ] Snapshot profile changes.

### Objectives

```text
dev objective random
dev objective complete
dev objective fail
```

- [ ] Offer.
- [ ] Completion.
- [ ] Failure.

### Attention

```text
dev attention rupees
dev attention wish
dev attention blueprint
```

- [ ] Rupee affordability attention.
- [ ] Wish-ready Console attention.
- [ ] Broken Blueprint Console attention.

## 10. Natural Critical Path

Do not use DEV for this pass.

- [ ] Find all 10 Rare Signals.
- [ ] Epic unlocks naturally.
- [ ] Catch a Shooting Star.
- [ ] `wish` has charge.
- [ ] First broken-Wish attempt preserves charge.
- [ ] Open BP_WishManager.
- [ ] Insert Is Valid.
- [ ] Complete a validated Wish.
- [ ] Legendary unlocks naturally.
- [ ] Satisfy normal Finale gates.
- [ ] Finale-ready Mippi logo appears.
- [ ] Trigger Finale.
- [ ] Continue or view Session Report.
- [ ] Wait approximately 5 seconds after leaving ending/report.
- [ ] Postgame Ledger force-opens.

## 11. Postgame Smoke

- [ ] 9 Epic postgame entries visible.
- [ ] 1 Legendary capstone visible.
- [ ] Locked entries show hidden/appropriate hint treatment.
- [ ] Cheat stops before Legendary walkthrough assistance.
- [ ] `100% Complete` requires all nine Epic plus Finale seen.
- [ ] Music Player unlocks on Legendary capstone.
- [ ] Music Player persists through reload.
- [ ] Full reset removes it.

## 12. Music Player

### 12-Track Soundtrack

- [ ] Twelve rows visible in canonical order.
- [ ] Every installed MP3 reaches READY.
- [ ] Play/Pause works.
- [ ] Manual Previous/Next works.
- [ ] Automatic switching waits for metadata.
- [ ] Static counter reads `TRACK 1 / 12`.
- [ ] Collapse while playing does not interrupt audio.
- [ ] Expand restores the full player state.

### Repeat and Shuffle

- [ ] Repeat cycles `LOOP OFF -> LOOP ALL -> LOOP 1 -> LOOP OFF`.
- [ ] LOOP OFF stops at the end of a sequential or shuffled pass.
- [ ] LOOP ALL begins another pass.
- [ ] LOOP 1 repeats the current song and overrides Shuffle at song end.
- [ ] Shuffle does not intentionally duplicate a track before its bag is exhausted.
- [ ] Previous follows Shuffle listening history.
- [ ] Repeat and Shuffle preferences survive reload.
- [ ] Exact Shuffle order/history does not survive reload.

### Lyrics

- [ ] Every row has an independent circled `?` control.
- [ ] `?` opens lyrics without selecting/starting that track.
- [ ] Metadata-only LRC shows `Lyrics coming soon`.
- [ ] Missing LRC falls back without breaking audio.
- [ ] Timed test lyrics show timestamp, highlight current line, and auto-scroll inside the lyrics panel.
- [ ] Seeking updates current lyric.
- [ ] HTML-like lyric text is displayed literally.
- [ ] Closing/reopening lyrics reloads edited LRC content without requiring a full page refresh in local preview.

### Downloads

- [ ] All 12 installed songs download.
- [ ] Download follows selected track, not viewed lyrics track.
- [ ] Filename uses human-readable title.
- [ ] Invalid filename characters sanitize to hyphens.
- [ ] Full reset clears Music entitlement plus Repeat and Shuffle preferences.

## 13. Responsive Smoke

Test at least:

```text
wide desktop
narrow desktop/tablet
mobile-width
```

- [ ] Header/navigation readable.
- [ ] Music Player usable.
- [ ] Progress HUD usable.
- [ ] Optional Objective avoids overlap.
- [ ] Mode strip order remains Design, Inspect, Interact, Hint.
- [ ] Bottom-left discovery controls remain accessible.
- [ ] Achievement toasts do not hide fixed controls.
- [ ] Finale buttons reachable.
- [ ] Session Report scrollable.
- [ ] Perspective Visualizer stacks correctly.

## 14. Hosted Deployment Smoke

After deployment, open a fresh private/incognito context.

- [ ] Correct production version.
- [ ] Current CSS/JS served.
- [ ] No case-sensitive asset failures.
- [ ] Three.js cold load.
- [ ] Professional navigation.
- [ ] Major external links.
- [ ] Dev Console.
- [ ] Shop.
- [ ] Perspective Visualizer.
- [ ] Persistence after reload.
- [ ] Public reset.
- [ ] No unexplained Console errors.

Inspect:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

again on the hosted build.

## 15. Release Signoff

Record:

```text
Build/version:
Date:
Tester:
Local cold load:
Returning-state startup:
Hosted cold load:
Natural critical path:
DEV state sweep:
Responsive smoke:
Reset integrity:
Known nonblocking issues:
Release approved:
```

### Automatic Release Blockers

Do not ship with any known:

- startup crash,
- progression blocker,
- stuck overlay,
- stuck hostile projectile,
- inaccessible required control,
- broken public professional link,
- broken reset,
- unexplained uncaught runtime error.

A bug does not become acceptable merely because a manual refresh makes it disappear.


## Current Release v2.89 Checklist (Supersedes Historical Build Labels Above)

- [ ] All production asset query versions report v2.89 and `perf-lab.js` loads before `script.js`.
- [ ] Documentation site uses v2.89 documented label; all new Design/Technical links load.
- [ ] Four-column dock remains usable, with v2.87 paired desktop groups and no old first-paint HUD flash.
- [ ] Exactly five Hearts displayed; after 5/5, bonus Hearts award one banked Bird life each.
- [ ] 4/4 Castle explicit claim fires large fireworks and consumes only already-airborne friendly rewards.
- [ ] Invasion wave bounded 0–10; escaped Boss reacquisition and every-third-win Super Boss work.
- [ ] Rare Rupees and Hearts spawn without Epic; closed Bird doesn't block opportunities/Finale.
- [ ] Docs HUD shortcut unlock-gated, Design Mode-only attention; public `docs` and About links work.
- [ ] Music seek, icon transport, Full/Single ELRC word timing, current 12px lyric presentation, Repeat Off/One/All, Shuffle and human-readable downloads work.
- [ ] `particles` not in public Help or dispatch; internal particle effects still run.
- [ ] `dev perf` and `dev profile` operate as documented; `dev profile reset` restores isolates and does not wipe progression.
- [ ] Latest performance exports capture timer, objective clock, DOM and spike data; **do not claim FPS resolved** without Windows/browser measurement.
- [ ] Author's twelve MP3s and editable LRC sources are preserved, not replaced by old archive templates.

See [v2.89 profiling procedure](PERFORMANCE_PROFILING_V2.89.md) and [regression matrix](V2_81_TO_V2_89_REGRESSION_MATRIX.md).


## v2.92 Handoff Release Verification

- [ ] Verify version command, `script.js`, profiler JSON, downloaded filename, cache query and preview launch metadata agree on v2.92.
- [ ] Verify `perf-lab.js`, `combat-lab.js`, `script.js` load in documented order.
- [ ] All five `dev combat` scenarios run and cleanup diagnostic objects without progression.
- [ ] `dev combat geometry off/on` cannot change during a run; on prefers authored motion, falls back to cache; off uses legacy DOM reads.
- [ ] Validate moving target/ship/effect center parity and Slowmo duration adjustment in real Windows Edge.
- [ ] Capture ABBA combined runs with consistent viewport, theme, source counts and performance evidence.
- [ ] Profiled costs are not summed across nested scopes; no blanket FPS fix is claimed.


## v2.93–v2.94 Current Update

v2.94 QA: verify Canvas is default and `dev combat renderer dom/canvas/status` works, backend cannot change during active benchmarks, `particle-renderer.js` initializes ahead of `script.js`, visual switches affect both backends with correct emission-vs-paint semantics, DOM fallback activates when Canvas2D unavailable, canvas/rAF cleans up when idle, and real Windows Edge/Chrome ABBA plus visual/theme/Castle checks are performed before claiming improved frame pacing. See [Combat Visual Rendering QA](COMBAT_VISUAL_RENDERING_V2_94.md).


## v2.95–v2.97 Current Update

Current v2.97 QA: ensure `stability-lab.js` loads before `perf-lab.js`, `particle-renderer.js`, `combat-lab.js`, `script.js`; verify stop/queued cleanup, foreground-only soak results, interruption/recovery, bounded exports; ensure `dev cursor reset` restores original universal styling and all effects, and visual-only size does not alter actual Mushroom progression or Legendary targeting. v2.97 Cursor Lab Edge A/B results remain open. See [Stability QA](LONG_SESSION_STABILITY_V2_97.md) and [Cursor QA](CURSOR_LAB_V2_97.md).


## v2.98 Current Behavior

v2.98 verification: default `dev cursor status` reports `architecture:scoped`; `dev cursor reset` restores Scoped/gameplay size and all effects. Verify Legacy remains selectable, `style universal|inherit` only affects Legacy, v2.98 profile filenames/snapshots identify architecture, both modes display matching native SVG pointer, and all modal/window focus fallback controls are operable. Validate moving-cursor performance and Trail/objective confounds separately. See [Scoped Cursor QA](CURSOR_ARCHITECTURE_V2_98.md).


## Current v3.01 Acceptance

- [ ] Verify 14 SVG assets and game-art.js roles, theme colors, HUD active state and clickable sizes.
- [ ] Verify cursor radius (+17px per real Mushroom level, +14px Star Power) and enemy-only upward shooting with Cool three-shot spread and Star Power piercing.
- [ ] Verify smaller nine-burst Canvas-only Castle fireworks with all progression unchanged.
- [ ] Verify authored Spawn Motion for Stars, Rupees, Mushrooms, Hearts, Keys, Bones, UFO, Boss, six Super Boss adds; Shooting Stars unchanged.
- [ ] Verify ambient pool excludes Heart/Rupee and natural Hearts come from enemy deaths only.
- [ ] Verify Rupee wallet increments on physical collection, not on generating drops.
- [ ] Verify fx-renderer.js, game-art.js and spawn-motion.js initialize before script.js.
- [ ] Verify v3.01 Console, diagnostics, local launcher and no performance regressions using browser traces.

See [Current Gameplay QA](V3_00_V3_01_GAMEPLAY_QA.md).


## Current v3.04 Specification

Current v3.04 release checks: max three non-clipped, per-panel unique Mushroom overlays under header/HUD; one Star; 1,050ms staggered same-duration Galaga formations and natural cap six; Boss ~50% slower; themed Mippi Bird logo; Super Boss 27 HP, six 3-HP adds with five-second respawn cancelled on exit; lower-mouth beam visuals and hitline; reduced-motion-aware one-time onscreen spawn entrances and natural expiry fades. See [v3.04 QA](V3_02_TO_V3_04_QA.md). These items need browser verification despite successful syntax checks and merged code.
