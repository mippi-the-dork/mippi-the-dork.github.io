# Runtime Health and Startup Watchdog - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Runtime Health and Startup Watchdog > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks startup state and retries or reports 3D initialization problems without allowing one failed load to permanently disable the experience.

> This page is the canonical technical documentation for **Runtime Health and Startup Watchdog** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Health Object

At the top of `script.js`, v2.78 creates:

```js
const mippiRuntimeHealth = {
  version: '2.78',
  bootStartedAt: Date.now(),
  bootStage: 'script-start',
  errors: [],
  three: {
    source: null,
    hero: false,
    ambient: false,
    about: false,
    attempts: []
  }
};
```

This exists before most of the rest of the site initializes.

## Global Error Capture

The runtime listens for normal JavaScript errors:

```js
window.addEventListener('error', event => { ... });
```

Stored fields include:

- type,
- message,
- source file,
- line.

Unhandled promise rejections are also captured:

```js
window.addEventListener('unhandledrejection', event => { ... });
```

The health object keeps only the most recent 12 entries.

## Public Diagnostic Snapshot

The runtime exposes:

```js
window.__MIPPI_RUNTIME__
```

using:

```js
Object.defineProperty(...)
```

The value is frozen and only exposes:

```js
snapshot()
```

The snapshot deep-copies the internal object through JSON serialization.

This allows QA to inspect runtime state without receiving a direct mutable reference to the internal health object.

## Boot Stages

Important values written in v2.78 include:

```text
script-start
pre-three-complete
three-loading
three-loaded
three-unavailable
three-retrying
hero-three-live
```

These strings are diagnostic state, not gameplay progression.

A future cleanup could formalize them into constants or an enum-like registry.

## Three Health Flags

The shared object records:

```js
three.hero
three.ambient
three.about
```

Each flag is set only after its scene's `WebGLRenderer` is successfully created.

This is more useful than merely knowing that the Three.js module imported.

## Source Attempt Log

Every source passed to the import race is pushed into:

```js
mippiRuntimeHealth.three.attempts
```

Because recovery can start a new race, the same source URL may appear multiple times.

That is expected in the current implementation.

The winning source is recorded in:

```js
mippiRuntimeHealth.three.source
```

## Local Preview Watchdog

The localhost-only watchdog starts from:

```js
window.addEventListener('load', ...)
```

After 5000 ms it checks:

```js
hero && ambient && about
```

If any are false:

- pending recovery is canceled,
- `threePromise` is cleared,
- a near-immediate recovery pass is requested.

## Software Rendering Probe

The user-facing hardware warning is driven by:

```js
detectSoftwareRendering()
```

The function creates a temporary canvas and requests:

```js
webgl2
```

falling back to:

```js
webgl
```

Both request `powerPreference: 'high-performance'`.

If no WebGL context can be created, the function returns true.

If available, it reads:

```js
WEBGL_debug_renderer_info
```

and tries to obtain the unmasked renderer string.

The current software-renderer pattern includes names such as:

- SwiftShader
- llvmpipe
- software rasterizer
- software renderer
- Microsoft Basic Render
- Mesa Offscreen
- ANGLE software

If no renderer string can be read, the function returns false rather than guessing.

## Hardware Warning UI

The warning root is:

```html
<div class="hardware-warning"
     id="hardware-warning"
     role="status"
     aria-live="polite">
```

If software rendering is detected:

```js
hardwareWarning?.classList.add('show');
```

The warning is dismissible.

Its help link points to a browser hardware-acceleration guide.

## Debug HTML

`index-debug.html` includes a separate lightweight error collector:

```js
window.__errs = [];
```

It captures top-level errors and unhandled rejections, then appends a `<pre id="debug-errors">` after 4500 ms.

If nothing was captured, it displays:

```text
NO_TOPLEVEL_ERRORS
```

This page is intended for local QA and is not required for public deployment.

## Diagnostic Workflow

When 3D is missing:

1. run `window.__MIPPI_RUNTIME__.snapshot()`,
2. inspect `bootStage`,
3. inspect `errors`,
4. inspect `three.attempts`,
5. inspect `three.source`,
6. inspect scene booleans.

Interpretation examples:

### `bootStage` never reaches `three-loading`

Likely a startup failure before the Three.js bootstrap.

### `three-loading` then `three-unavailable`

Likely module acquisition failure or timeout.

### `three.source` populated but one scene flag remains false

Likely renderer or scene construction failure for that scene.

### All scene flags true but visual missing

Likely CSS, stacking, opacity, sizing, or post-initialization rendering issue.

## QA

- Intentionally throw a startup error before Three.js and verify it appears in `errors`.
- Block all module sources and verify `three-unavailable`.
- Allow one CDN and verify `three.source`.
- Force one scene canvas missing and verify its health flag remains false.
- Test hardware warning under software-rendered WebGL when available.
- Dismiss the warning and confirm it does not affect Three.js state.
- Use `index-debug.html` locally and confirm top-level errors are reported.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.05–v3.10 Current Specification

v3.07 delays setting `mippiRuntimeHealth.three.hero=true` until successful scene initialization. Exceptions or `webglcontextlost` mark failure, record fallback reason/boot stage, hide failed Canvas and activate usable four-link DOM Hero fallback rather than leaving dead labels. Avoid rendering into a lost context. See [Hero Navigation Fallback](../hero-navigation-fallback/TECHNICAL.md).


## v3.14 Current Behavior

v3.13 distinguishes unavailable or recognized software WebGL from normal renderer initialization. `mippiSoftwareFallback` skips Hero, Ambient and About 3D starts; the Hero uses 2D signal links. Browser warnings are best-effort, not guaranteed hardware diagnoses, and a missing renderer-info extension is not proof of software mode.
