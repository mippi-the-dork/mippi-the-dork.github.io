# Release History

**Current documented state:** Mippi Portfolio v2.98

This page records documentation-relevant changes after the original comprehensive v2.78 documentation pass.

v2.79 and v2.80 established the twelve-track Music Player, Repeat, Shuffle, and basic editable lyrics. The nine subsequent releases below changed the HUD, ambient rewards, progression feedback, lyrics presentation, cursor/projectile performance and diagnostic capabilities. Historical sections describe the behavior **at that time**; for current rules read the newest applicable release.

## v2.79 - Complete 12-Song Soundtrack

v2.79 replaced the six placeholder Music Player entries with the finished 12-song soundtrack.

Canonical order:

| # | Track | Audio asset |
| ---: | --- | --- |
| 01 | Literally Unplayable | assets/music/song-01.mp3 |
| 02 | Just Add Gameplay | assets/music/song-02.mp3 |
| 03 | Great Again | assets/music/song-03.mp3 |
| 04 | Inside My Head | assets/music/song-04.mp3 |
| 05 | I Made This | assets/music/song-05.mp3 |
| 06 | Come Back | assets/music/song-06.mp3 |
| 07 | Stat FPS | assets/music/song-07.mp3 |
| 08 | Every Byte | assets/music/song-08.mp3 |
| 09 | She Was Almost Gold | assets/music/song-09.mp3 |
| 10 | Everybody's Right | assets/music/song-10.mp3 |
| 11 | One Player Too Many | assets/music/song-11.mp3 |
| 12 | L-E-A-R-N | assets/music/song-12.mp3 |

The MUSIC_TRACKS array remains the playlist authority. No external playlist manifest or audio service was introduced.

v2.79 also added musicPlayWhenReady. Automatic track changes now wait for the new MP3's loadedmetadata event before attempting playback. This prevents an autoplay transition from racing the new audio source.

### What v2.79 did not introduce

The following behaviors already existed before v2.79 and remain documented under their earlier history:

- Music Player unlock through Legendary 100% Complete.
- Unlock persistence until the normal reset command.
- Sticky-header placement.
- Left alignment with the Mippi logo square.
- Downward expansion from a fixed top edge.
- Collapsed mode.
- Rare, Epic, and Legendary theme treatments.

v2.79 did not add a new music achievement, progression gate, or postgame step.

## v2.80 - Repeat, Shuffle, and Editable Lyrics

v2.80 extended the existing 12-track player with three major additions.

### Repeat

The #music-repeat control cycles:

~~~text
LOOP OFF
LOOP ALL
LOOP 1
~~~

Internal values:

~~~text
off
playlist
track
~~~

Automatic end-of-track behavior:

| Mode | Automatic behavior |
| --- | --- |
| off | Stop after the final sequential track or after the current shuffle cycle. |
| playlist | Start the playlist again, or build another shuffle cycle. |
| track | Restart the same track from 0. |

LOOP 1 takes priority over Shuffle when a song ends.

Persistent setting:

~~~text
mippi-music-repeat-v1
~~~

### Shuffle

The #music-shuffle control toggles independently between:

~~~text
SHUFFLE OFF
SHUFFLE ON
~~~

Persistent setting:

~~~text
mippi-music-shuffle-v1
~~~

Shuffle uses a Fisher-Yates bag of the other track indexes. A normal shuffle cycle does not intentionally repeat a track before the bag is exhausted.

The runtime also keeps an in-memory listening history so Previous follows the tracks the visitor actually heard.

Only the Shuffle preference persists. The generated order and history are rebuilt after reload.

### Lyrics Viewer

Every playlist row now exposes two independent actions:

1. Select the song.
2. Open its circled ? lyrics control.

Opening lyrics for another song does not change or start playback.

Each MP3 maps to an LRC file with the same numeric basename:

~~~text
assets/music/song-01.mp3
assets/music/song-01.lrc

...

assets/music/song-12.mp3
assets/music/song-12.lrc
~~~

All twelve v2.80 LRC files currently contain metadata-only templates. They do not ship with completed song lyrics or synchronization timestamps.

The player supports:

- untimed lyric lines,
- [mm:ss.xx] timestamps,
- multiple timestamps on one source line,
- standard LRC metadata,
- global [offset:] in milliseconds,
- UTF-8 BOM,
- section labels such as [Verse 2],
- current-line highlighting,
- lyrics-panel-local auto-scroll,
- graceful missing-file fallback.

The implementation uses DOM elements and textContent for lyric text. LRC content is not injected as HTML.

See [Music Lyrics Authoring Guide](MUSIC_LYRICS_AUTHORING_GUIDE.md).

### Downloads

v2.80 also gives the selected download a human-readable filename based on the song title.

Invalid filename characters are replaced with a hyphen.

The downloaded source remains the numbered MP3 asset.

### Static fallback correction

v2.79 runtime JavaScript displayed the correct 12-track count, but its literal fallback HTML still said:

~~~text
TRACK 1 / 6
~~~

v2.80 corrected the static fallback to:

~~~text
TRACK 1 / 12
~~~

## Persistence Added in v2.80

| Key | Values | Purpose |
| --- | --- | --- |
| mippi-music-repeat-v1 | off, playlist, track | Repeat preference |
| mippi-music-shuffle-v1 | 1, 0 | Shuffle preference |

Both share the existing Mippi storage namespace and are cleared by the normal full reset.

Still not persisted:

- current track,
- playback position,
- playing/paused state,
- shuffle bag,
- shuffle history,
- open lyric panel,
- active lyric line.

## Scope of v2.79–v2.80

No v2.79 or v2.80 changes were made to the underlying:

- Three.js scene behavior,
- achievement or progression algorithms,
- non-music arcade systems,
- Unreal Tools assets,
- Perspective Visualizer.

Documentation outside the affected Music Player, persistence, UI, and QA areas should not attribute older behavior to these releases.

## v2.81 - Unified HUD, Invasion and Enhanced Lyrics

Introduced a single four-column dock: **Progress** (Ledger, Rupees, Hearts), **Gameplay** (Coolness, Invasion, Castles), **Modes** (Design, Documentation, Inspect, Interact), **Utilities** (Hint, Theme, Console). Original DOM controls moved instead of being duplicated. All gameplay meters use the same compact visual bar.

After five Hearts, collecting another Heart awards **one banked Mippi Bird life**, not a sixth Heart. The Castle 4/4 claim now has nine 33px fireworks bursts and automatically clicks already-airborne **friendly** rewards from a snapshot during approximately one second; it still awards three Rupees.

UFO Invasion gained an explicit bounded 0–10 kill wave, one pending Boss encounter, an escape/reacquisition state (normally four new kills), and retained every-third-boss escalation to Super Boss. The `compile` command's modal path was repaired; modal controls restore a visible native pointer.

The separate public docs site became accessible by `docs` Console command, a Modes HUD shortcut, and an About CTA. Music gained icon-based transport, seek bar, compact collapsed Play/Next, a right-hand companion lyrics viewer, **Full/Single** modes, and **Enhanced LRC word timing** (`<mm:ss.xx>`). Per-song ? lyric controls were removed.

## v2.82 - Notifications, Rewards and Shared Projectile Updates

Legendary cursor bullets switched from one `requestAnimationFrame` per projectile to one shared update loop and a **14-shot cap**, reclaiming shots after 1.8 seconds and measuring target geometry once per unique target. This is algorithmic optimization, not proof of a real-device FPS fix.

The Director retries missed natural opportunities faster (~2 seconds), no longer treats ordinary toasts/Ledger as permanent attention blockers, and recognizes only friendly pickups as evidence of reward opportunity. At this stage natural pickups remained Epic-gated (changed in v2.84).

The timed Objective moves immediately above the bottom-right HUD, with a separate **max-three** `#system-toast-stack` above it. Ledger entries retain their **own rarity styling** under Legendary theme. Castle fireworks gain broader displacement (about +/-280px horizontal, +/-225px vertical) and 2150ms lifetime; one-second friendly auto-collection remains. Music collapse width settles at ~326px, lyric sync avoids redundant DOM writes, and Project Heavy Water gets the supplied hero image.

## v2.83 - Wish Guidance and UI Presentation

HUD buttons gain visible low-contrast resting frames. Console desktop width becomes approximately **800px**, toast and objective cards approximately **310px** desktop / **280px** narrow.

Docs icon attention is contextual: only when Design Mode is **active** and the docs link has not been visited. Wish availability produces `WISH READY`; Blueprint failure produces `BLUEPRINT ERROR`. Contextual `TRY WISH` / `OPEN BLUEPRINT` controls dispatch the ordinary Console commands and hide during free-text Wish input.

Collapsed Music uses `#music-mini-controls` with equal-height Play, Next, Expand; lyrics companion follows Music Player's actual height via ResizeObserver. The later **12px lyrics typography** supersedes v2.82's intermediate 15/14px presentation. User-authored LRC files must be preserved when updating website code.

## v2.84 - Unlock Gates, Early Pickups and Native Cursor

Ledger button is gated until at least one original Signal or postgame reveal and uses a centered inline SVG. Docs HUD shortcut is gated until **Design Mode has been purchased**; public Console/About docs links remain available.

Legendary shooting adopts ~75ms geometry cache, reduced paint/shadow, and cursor spark throttling. Mushroom growth uses a **browser-native SVG cursor**, with focus/enter/leave handling instead of a DOM imitation.

Rare players now receive low-impact natural pickups: **65% Rupee / 35% Heart**, baseline ~11–16 seconds plus Director modifiers, with ~17-second anti-drought fallback. Epic remains ~4.6–8.6s before modifiers. A closed Mippi Bird panel no longer blocks Director spawns or Finale: only `.flappy-game.open` counts as open.

**PROFESSIONAL is a Player Model label, not a Director state or spawn-blocker.** Director Quiet has its own modest pacing profile.

## v2.85 - HUD and Projectile Polish

Fixed a decorative HUD ring appearing as a sixth Heart. `setHudControlText` preserves injected SVG icons while updating hidden accessible text. Desktop HUD spacing used distributed max-content tracks (later superseded by v2.87 paired grouping). Mushroom SVG cursor palettes now match Rare/Epic/Legendary.

Shared Legendary shots now use ~50ms target sampling, bounded velocity prediction, **120ms dt cap**, 46ms linear transform smoothing, 14-shot cap, and unchanged speeds of 1050px/s (normal) / 1380px/s (Golden Trigger). Player-side FPS remains unverified.

Music Repeat selection order becomes **Off → Loop 1 → Loop All → Off** (superseding v2.80). Expanded order becomes **Download, Previous, Play/Pause, Next, Loop, Shuffle, Lyrics**. The Ledger supports hover wheel/trackpad scrolling. The public `particles` Console command is **removed**, while Particle Boost remains an internal effect.

## v2.86 - Three.js Rendering-Budget Pass

Rendering is skipped for offscreen Hero, Ambient and About canvases or hidden tabs, using a 100px `IntersectionObserver` margin. RAF scheduling remains available for resume. Static palette/material updates only run when rarity changes. Ambient/About redundant full-canvas CSS color filters were removed; all three renderers request high-performance adapter preference (advisory).

Hidden `dev perf` exposes Three scene render-loop FPS, visibility, DPR, draw calls and skipped offscreen frames. It does **not** measure GPU presentation FPS. The reported real Windows performance regression was **not declared fixed**.

## v2.87 - Opt-In Performance Laboratory

Added required runtime file `perf-lab.js`, loaded before `script.js`, and hidden `dev profile` commands: boot, sample (5–40s), start/stop, report/export, reset, and `hud` / `hudfx` / `themefx` / `cursorfx` / `ambient` isolation toggles. Capture includes RAF frame intervals, long tasks/frames, startup paint and HUD relocation costs, CSS animation counts, HUD mutations and local JSON export.

The new `html.hud-pending` guard prevents the old floating UI flashing during startup; the dock relocates twelve existing controls. At >=1000px, desktop layout becomes **Progress + Gameplay** and **Modes + Utilities** close pairs, about 20px inside each pair, with flexible middle separation. Normal Help remains unchanged.

## v2.88 - Named Subsystem Attribution

The profiler gained named Hero/Ambient/About update vs render-call durations, cursor/projectile, Director, Objective and HUD timings; more reliable RAF callback source labels; recorded >=33.3ms spikes and per-spike subsystem activity; and diagnostic logic isolate verbs `hero`, `about`, `ambientlogic`, `projectiles`, `hudlogic` (`off/on`). `ambient off` still means hiding its canvas, distinct from `ambientlogic off`.

No geometry, progression, audio or themes were changed. Calling `renderer.render()` measures CPU submission duration, **not GPU presentation**. The instrumentation is for investigation only.

## v2.89 - Timer, Objective and DOM Correlation

Added source-labeled `setInterval`/`setTimeout` callback timings, named ~200ms objective clock measurements, versioned `script.js?v=2.89:line:column` source recognition, DOM mutation history for objective/toast/HUD, one-second UI snapshots, optional Chromium Long Animation Frame script attribution, and spike correlations with nearby timer/DOM events.

New hidden `dev profile objectiveclock off/on` freezes **only the visible countdown text**; deadline/failure/rewards stay live. Exports add `timerEvents`, `domEvents`, `uiSnapshots`, `spikes[].nearbyTimers`, `spikes[].nearbyDomChanges`, `longFrames[].scripts` and `isolationSkipped.objectiveclock`.

This version is a **diagnostic release, not a performance fix**. The profiler itself incurs some overhead, and spike correlation shows proximity rather than proof of causation.

## Current Documentation Authority

For the v2.81–v2.89 release sequence, the end state was **v2.89**. Keep version attribution and supersession explicit: current loop order comes from v2.85, current HUD grouping from v2.87, current profiler from v2.89. Older descriptions may remain as versioned history but must not be treated as current implementation instructions.

Refer to [Documentation Coverage Report](DOCUMENTATION_COVERAGE_REPORT.md), [Performance Diagnostics](17-qa-operations/performance-diagnostics/TECHNICAL.md), and [Unified Bottom HUD](01-experience-foundation/unified-bottom-hud/TECHNICAL.md).


## v2.90 - Permanent Combat Performance Lab

Added the opt-in, permanent `combat-lab.js` benchmark harness. `dev combat` supports `idle`, `player`, `ufo`, `combined`, and `explosions` for 10–45-second reproducible workloads (30 seconds default). Tests use production projectile and explosion hooks, temporary entities flagged to avoid progression, and local JSON profiler reports. Director non-forced spawns defer during runs and resume afterward. Instrumentation includes 1Hz combat snapshots and counts for creation, cleanup, hits and active/peak populations. The required load order is `perf-lab.js` → `combat-lab.js` → `script.js`.

Five user-supplied Legendary/Edge 30-second samples (2151×1307, DPR1) showed approximate rAF frame-delivery rates: idle **59.4**, player **35.7**, UFO **29.8**, combined **11.7**, explosions **50.3** FPS. These are artificial stress tests, not normal game rates or measured GPU-present timing. Combat hit acquisition and enemy projectile spawning were high-cost measured paths. An initial metadata inconsistency recorded `version:2.89` while identifying a `v2.90` diagnostic harness.

## v2.91 - Cached Geometry with Legacy A/B

Added `combatGeometry` to share target/emitter positions across player-shot acquisition, homing and hostile-shot spawning. Target list refreshes about 125ms; position cache expiry about 115ms, with bounded velocity extrapolation. The UFO benchmark prepares all four emitter centers before performing projectile insertion. `dev combat geometry off/on` compares v2.90 legacy DOM measurement against caching; default is on and the setting cannot change mid-run.

A 30-second Legendary combined comparison produced 313 frames (~10.4 rAF FPS) with legacy reads vs 563 (~18.8) with cache, with **500 hostile shots each**. Optimized emitter geometry read time fell from ~8.23s to ~1.32s across 500 calls, but some expensive reads remained. Comparison runs were not a balanced ABBA design, and objective visibility differed, so improvement should not be interpreted as a fully controlled performance proof. Two exports had misleading `v2.90` filenames while their JSON internally identified v2.91.

## v2.92 - Authored Flight Motion Geometry

Optimized geometry now uses authored flight trajectory models for registered CSS-animated UFOs, boss, pickups, shooting stars, Doug bones and lab objects. `motionCenter()` reads the browser's active CSS animation clock (`Animation.currentTime`) and computes object centers without layout rectangle measurement in those modeled cases. Effects also seek the modeled center. Unregistered entities fall back to the v2.91 cache; `dev combat geometry off` retains the original v2.90 direct-read path for A/B comparisons. Added named `modelHit` and `animation.lookup` profiler scopes.

The handoff reports successful JavaScript syntax checks and headless 10-second combined workload counts of **105 player shots and 164 hostile shots in both modes**, and limited position-parity observations. **The real Windows/Edge 30-second A/B comparison was still pending.** No reduction in normal projectile counts, hit behavior, audio, particles or achievements was intended.


## v2.93 - Combat Visual Isolation

Extended the permanent hidden Combat Lab with five independent cosmetic switches: `player`, `ufo`, `explosions`, `explosionpaint`, `glow`, plus `all` and `status`. Projectile visibility can be suppressed without skipping its physics/hits; disabling explosions suppresses particle creation, whereas hiding explosion paint retains nodes, animation and removal. No combat balancing or progression changes were made. Each report freezes selected visual/geometry options, tracks actual production `explodeAt` emissions and live/peak DOM elements, and exports uniquely named condition-labeled profiles. `dev profile reset` restores visual isolates but preserves geometry selection.

Five Legendary-theme 30-second combined test reports recorded ~**30.4 rAF FPS** all-on, **49.8** explosion emission off, **30.5** player/UFO paint hidden, **24.3** glow off, and **15.3** explosion paint hidden. Disabling particle emission coincided with far fewer long tasks and the strongest improvement, implicating the *particle system as a whole*. The fifth experiment was much later in the session and is not controlled evidence that hiding paint itself causes slowdown. None of these reports proves actual GPU-present frame rate, a precise browser bottleneck, or a complete fix.

## v2.94 - Shared Canvas2D Particle Renderer

Replaced default `explodeAt()` particle rendering with new `particle-renderer.js`: one fixed, pointer-transparent Canvas2D layer and shared rAF/particle data, instead of independently animated `.arcade-pixel` nodes and expiry timers. Original DOM rendering remains available via `dev combat renderer dom`; `canvas` is default, `status` reports selection; choice is session-only, switch blocked during benchmark, and no-Canvas fallback uses DOM. Renderer changes clear only old cosmetic particles.

Preserves all effect consumers (impacts, UFO/Boss, stars, pickups, Doug, Castle fireworks), original counts/colors/shape, easing, 180-degree rotation, shrink to 20%, fade, radii, durations and z-index 70. The Canvas is lazily mounted and removed when idle; DPR backing is capped at 2. Profiler exports distinguish logical sprite emission from physical DOM vs Canvas particles, add `combat.particles.canvasSpawn` and `combat.particles.canvasFrame`, renderer mode, session age and uniquely identified filenames. v2.93's visual isolates continue to work on both backends.

Code syntax and headless functional tests passed. **Repeatable Windows Edge/Chrome ABBA renderer comparisons and visual fidelity inspection remain to be completed.** v2.94 is an architectural optimization, not a proven FPS outcome. See [Shared Canvas Renderer](12-arcade-combat/shared-canvas-particle-renderer/TECHNICAL.md) and [Combat Visual Rendering QA](QA/COMBAT_VISUAL_RENDERING_V2_94.md).


## v2.95 - Permanent Long-Session Stability Lab

Introduced `stability-lab.js` before the existing diagnostic and gameplay scripts, and hidden `dev stability help/start/report/export/stop/soak N` commands (N=2–60 nominal minutes). Every ~5 seconds the opt-in monitor samples live and cumulative timer counts, DOM/animations, projectile lifecycle and Canvas state, plus browser JS heap when exposed. `soak` alternates 30-second production-path protected combined-combat runs with ~10.5-second recovery, exports bounded timelines and reports from live counters. Cleanup now cancels diagnostic hostile projectile rAF/guard timers, empty shared player-shot loop and a queued 400ms benchmark start while leaving ordinary projectiles untouched. Initial syntax/headless smoke tests passed.

v2.94 **fresh-page** Legendary comparisons motivating this work showed ~30.6 rAF FPS with DOM particles, **54.7** with Canvas, **56.1** with emissions off (single runs; separate page loads). A later v2.94 **same-session** DOM/Canvas/Canvas/DOM run at ~38–42 minutes varied substantially and could not establish a renderer-wide FPS causal estimate, despite roughly **43x** lower measured `combat.explosion.spawn` JS function time for Canvas. A v2.95 14-cycle monitoring export exhibited later severe collapses and recovery; the tool did not yet measure browser focus, so those cycles cannot all be assumed valid foreground performance.

## v2.96 - Focus-Aware Stability Lab

Stability monitoring now classifies `foreground`, `visible-unfocused`, `hidden`; tracks focus events/time-in-state, an independent rAF heartbeat, first-frame return time and five-second recovery. Interrupted synthetic combat is cancelled, cleaned up, logged separately, then **restarted from the beginning after 1.5s stable foreground**, without contributing to valid-cycle average. Focus loss during recovery repeats only recovery, retaining completed combat metrics. Reports/exports include focus summaries, interruptions and `validForeground` flags; previous timer/DOM/Canvas monitoring stays intact.

One focus-interrupted three-cycle test validated exclusion/restart, with **52.61 delivered rAF FPS** across valid cycles and no diagnostic resource buildup. A fully foreground, zero-interruption **14-cycle/10-minute** run averaged **55.01 rAF FPS** on cycles 1–8 and **49.17** on cycles 9–14, with long tasks rising from **42** to **103**. This is a real measured phase change in foreground callback delivery, **not evidence of a particular leak or confirmed GPU/paint cause**. Eight other v2.96 30-second reports found two severe drops to **18.5 and 23.6** rAF FPS precisely when the cursor classes were `cursor-grown cursor-power-1/2`; later normal-cursor runs recovered to ~53–54 in the same page session. Correlation alone does not establish that cursor growth caused the slowdown.

## v2.97 - Cursor Rendering Lab

Introduced permanent hidden `dev cursor` controls to isolate cursor **visual size** (`gameplay/normal/big/verybig`), CSS `universal` vs experimental body-only `inherit`, native SVG pointer artwork, aura, glow, Trail and Star Power sparks. `dev cursor reset` restores existing v2.96 visuals; `dev profile reset` does not affect this separate lab. The gameplay Mushroom level remains authoritative for the **55px-per-level** Legendary acquisition bonus, unaffected by visual-only overrides. All settings are in memory and not saved.

Profiler exports now record `raw.cursorInitial`/`raw.cursorFinal`, a Cursor Lab summary, and condition-labelled filenames. JavaScript syntax and headless interactions/profile export passed; **controlled Windows Edge A/B and pointer-affordance verification are pending**. Original universal cursor styling remains the default; body-only inheritance is diagnostic, not a proven optimization. No projectile, Canvas, Three.js, metagame, music or lyric behavior was changed.

For current procedures see [Long-Session Stability QA](QA/LONG_SESSION_STABILITY_V2_97.md) and [Cursor Lab Windows QA](QA/CURSOR_LAB_V2_97.md).


## v2.98 - Scoped Mushroom Cursor Architecture

The Mushroom cursor now uses **Scoped** CSS styling by default. `body.cursor-scoped-grown` replaces `body.cursor-grown` while Scoped is active, avoiding the original broad descendant matching and parent `:has()` rules; the old `cursor-grown` implementation remains available via `dev cursor architecture legacy` for controlled comparisons. Both paths preserve `cursor-power-1/2`, themed SVG appearance, original cursor size/hotspot, aura, glow, Trail and Star sparks. Scoped styling targets the body and explicit interactives with native-pointer fallbacks on modal surfaces and inactive windows. `dev cursor style universal/inherit` now affects only Legacy. `dev cursor reset` restores Scoped plus gameplay visual level, all cosmetics ON. Actual Mushroom progression and the **55px per actual level** Legendary target radius remain unchanged. All overrides are memory-only.

The profiler and runtime version identify **v2.98**, with `cursorInitial`/`cursorFinal.architecture` and filename form `cursor-<level>-<architecture>-<style>-<native>`. Syntax/Chromium smoke tests verified reset, Scoped/Legacy switching, matching SVG artwork and modal pointer behavior.

Seven v2.97 runs that motivated this change consistently returned ~**24–26 delivered rAF FPS** for enlarged cursor states versus ~**47–51** for normal size; Big with native SVG off remained **25.2**, so disabling artwork alone did not fix the slowdown. In later v2.98 moving-pointer A/B/A measurements, Scoped/Legacy/Scoped delivered **30.5 / 10.0 / 23.1** rAF FPS. Scoped was substantially better than Legacy, though it was not near the intended ~50–55 FPS and input motion was not measured.

A subsequent Scoped Big Trail-on/off test returned **30.9** versus **41.1** rAF FPS, with 133 vs 70 long tasks. The Trail-on recording also had an active timed objective for 29/30 snapshots versus none in Trail-off; pointer speed/events were not captured. Thus the Trail's DOM/CSS animation work is a reasonable optimization candidate, but the measurements do **not** prove a causal 10 FPS improvement from disabling Trail or establish a full FPS fix. No Canvas Trail replacement was implemented in v2.98.

See [Scoped Cursor](01-experience-foundation/scoped-mushroom-cursor/TECHNICAL.md) and [v2.98 Windows QA](QA/CURSOR_ARCHITECTURE_V2_98.md).
