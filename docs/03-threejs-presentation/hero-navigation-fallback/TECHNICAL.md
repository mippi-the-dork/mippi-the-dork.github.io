# Hero Navigation Fallback - Technical Documentation

**Introduced:** v3.07. **Current documented version:** v3.10.

## Markup and links

The Hero markup in `index.html` uses `#hero-canvas[aria-hidden="true"]` and `#scene-fallback`. The fallback contains four `a.fallback-node[data-fallback-signal]` elements linking to `#games`, `#career`, `#consulting`, `#tools`.

Real anchor semantics provide keyboard focus/activation and work without synthetic scrolling or raycasting. Do not replace these elements with decorative `span` elements.

## State and failover

In `script.js`, `activateHeroFallback(reason)`:

1. Sets `mippiRuntimeHealth.three.hero=false` and records `fallbackReason`.
2. Removes `.scene-live` and adds `.show` to the fallback.
3. Hides the failed Hero Canvas and changes `#scene-readout` to **2D SIGNALS // CLICK TO JUMP**.

`initScene()` keeps `bootStage='hero-three-initializing'` while constructing scene, camera, renderer and objects, and only sets `three.hero=true` after the initialization succeeds. Initialization exceptions activate the fallback and record `hero-fallback-active`. The Canvas `webglcontextlost` handler `preventDefault()`s and invokes fallback with `hero-context-lost`. The frame loop does not continue rendering the failed WebGL context.

## Achievement and telemetry

Fallback links marked `data-fallback-signal` increment `portfolio.heroSignalClicks`, emit `telemetryMeaningful('hero_signal',{target:key,fallback:true})` and invoke `showAchievement('signal')` for legitimate navigation. The listener checks target IDs and preserves the `interaction-hunt` exclusion. These are the real Hero Signal semantics, not a second shadow achievement.

## Interactions with later releases

v3.08 changed the Hero composition; v3.10 introduced the logo's centered pivot. Neither removes the v3.07 fallback. The fallback is independent of the 3D logo pose.

## QA

Test WebGL import failure, renderer construction exception, context loss after success, hidden Canvas state, fallback link accessibility, telemetry, achievement, overlay stacking and repeated visits. If WebGL recovers, ensure the fallback is not incorrectly left clickable over a healthy 3D scene.

See [Design](DESIGN.md) and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).
