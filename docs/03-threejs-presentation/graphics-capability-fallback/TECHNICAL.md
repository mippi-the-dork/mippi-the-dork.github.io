# Graphics Capability Fallback - Technical Documentation

**Introduced:** v3.13. **Current documented version:** v3.14.

## Capability probe

`script.js` calls `detectSoftwareRendering()` before starting the Three.js scenes. The probe creates a temporary Canvas and requests `webgl2` or `webgl` with `powerPreference:'high-performance'`. Failure to obtain a context returns `{fallback:true,reason:'WebGL unavailable'}`.

If a context exists, the implementation queries `WEBGL_debug_renderer_info` where available, otherwise `gl.RENDERER`. A case-insensitive regex recognizes names including **SwiftShader**, **llvmpipe**, **softpipe**, **software rasterizer/renderer**, **Microsoft Basic Render**, **Mesa offscreen**, or ANGLE software. It calls `WEBGL_lose_context` where supported for the temporary probe. An unrecognized renderer does **not** automatically force fallback, and an exception returns an undetermined/non-fallback result. Renderer names are an imperfect capability signal.

`mippiGraphicsCapability` contains the detection result, and `mippiSoftwareFallback` enables the fallback. Both `html` and `body` receive `.mippi-software-fallback` and `#hardware-warning` receives `.show`. The notice uses `#hardware-warning-help` and `#hardware-warning-close`; `graphicsHelpLink()` selects Edge, Firefox, Chrome or Safari guidance using the user agent.

## Scene integration

- **Hero:** `initScene()` checks `mippiSoftwareFallback` before requesting Three.js; when active, `activateHeroFallback(mippiGraphicsCapability.reason)` exposes the four navigable signal links and hides the 3D Canvas.
- **Ambient:** `initAmbientScene()` returns early under fallback.
- **About:** `initAboutScene()` returns early under fallback.
- **Independent failures:** existing Hero WebGL initialization/context-loss handling still activates the fallback even if the initial probe did not identify software.

The help notice stays outside the sticky header stacking surface; `.mippi-software-notice` uses relative positioning, normal document flow and a high z-index, not an obstruction over header controls. The `Dismiss` action hides the notice; it does **not** re-enable a scene that was deliberately skipped for graphics safety.

## QA

Exercise failure at WebGL context acquisition, known software renderer strings, unknown renderer string, missing extension and initialization/context-loss cases. Check DOM behavior, scene status, header stacking, browser help destinations and repeat visits.

See [Design](DESIGN.md) and [v3.14 QA](../../QA/V3_11_TO_V3_14_REGRESSION_QA.md).
