# Three.js Runtime - Technical Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Three.js Runtime > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Loads and maintains the shared Three.js runtime used by all 3D scenes and provides recovery behavior when initialization fails.

> This page is the canonical technical documentation for **Three.js Runtime** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Ownership

The shared Three.js bootstrap lives in `script.js`.

The runtime is initialized after the majority of the portfolio's earlier startup logic has executed.

The three scene entry points are:

```js
initScene()
initAmbientScene()
initAboutScene()
```

All three depend on the shared:

```js
loadThree()
```

function.

## Runtime State

The shared loader uses:

```js
let threePromise;
let threeRecoveryTimer = null;
```

`threePromise` ensures multiple scenes reuse the same in-flight or completed module import rather than requesting Three.js independently.

When recovery is required, `threePromise` can be reset to `null` so a new source race can begin.

## Local Preview Detection

The runtime identifies the local preview environment with:

```js
const THREE_LOCAL_PREVIEW =
  /^(?:localhost|127\.0\.0\.1)$/.test(location.hostname);
```

This changes import timeout and retry cadence.

## Module Sources

v2.78 attempts Three.js `0.180.0` from five external module sources:

```text
https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js
https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.module.js
https://unpkg.com/three@0.180.0/build/three.module.js?module
https://esm.sh/three@0.180.0
https://esm.run/three@0.180.0
```

The primary jsDelivr module is also preloaded in `index.html` and `index-debug.html`:

```html
<link rel="preconnect"
      href="https://cdn.jsdelivr.net"
      crossorigin>

<link rel="modulepreload"
      href="https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
      crossorigin>
```

## Source Race

`importThreeFromFirstAvailable()` starts dynamic imports for all configured sources.

Each source is wrapped as:

```js
import(src)
  .then(module => ({ module, src }))
```

Failures are logged and rethrown.

The function waits on:

```js
Promise.race([
  Promise.any(attempts),
  timeoutPromise
])
```

This means:

- all sources begin together,
- the first successful import wins,
- individual failures do not fail the whole load while another source is still viable,
- a timeout prevents startup from waiting indefinitely.

## Timeouts

Current timeout values:

| Environment | Import timeout |
| --- | ---: |
| Local preview | 3500 ms |
| Hosted / normal | 8000 ms |

These are not scene construction timeouts. They only bound the shared module acquisition race.

## Retry Scheduling

`scheduleThreeRecovery()` defaults to:

| Environment | Retry delay |
| --- | ---: |
| Local preview | 1200 ms |
| Hosted / normal | 7000 ms |

The recovery callback:

1. exits if Hero, Ambient, and About are all live,
2. clears its timer handle,
3. clears `threePromise`,
4. sets runtime boot stage to `three-retrying`,
5. calls any scene initializer whose health flag is still false.

## Online Recovery

The runtime listens for:

```js
window.addEventListener('online', ...)
```

If any scene is still missing:

- an existing recovery timer is cleared,
- a new recovery pass is scheduled after 750 ms.

This supports a visitor who loaded while offline or during a transient network loss.

## Local Startup Watchdog

On localhost only, the runtime listens for the `load` event and waits 5000 ms.

If all three scenes are not healthy at that point:

1. any pending recovery timer is cleared,
2. `threePromise` is reset,
3. a new recovery is scheduled almost immediately.

This was added after local Python preview could occasionally require a manual refresh while the GitHub-hosted version worked correctly.

## Runtime Health Integration

The runtime writes into:

```js
mippiRuntimeHealth.three
```

Current fields:

```js
{
  source: null,
  hero: false,
  ambient: false,
  about: false,
  attempts: []
}
```

Successful module acquisition stores the winning source.

Each scene sets its own boolean only after constructing its renderer.

The state is available through:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

## Renderer Creation

Hero:

```js
new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
```

Ambient:

```js
new THREE.WebGLRenderer({
  canvas: ambientCanvas,
  alpha: true,
  antialias: false,
  powerPreference: 'low-power'
});
```

About:

```js
new THREE.WebGLRenderer({
  canvas: aboutCanvas,
  alpha: true,
  antialias: true,
  powerPreference: 'low-power'
});
```

All renderers use transparent clear color.

## Pixel Ratio Caps

Hero caps device pixel ratio at:

- 1.8 on wider layouts,
- 1.35 below 720 px.

Ambient caps at 1.25.

About caps at 1.5.

These limits reduce GPU cost on high-density displays.

## Current Limitation

The module loader schedules recovery when module acquisition fails.

If the module imports successfully but `WebGLRenderer` construction itself fails on the hosted public path, the individual scene catch block falls back visually but does not independently call `scheduleThreeRecovery()`.

The local 5-second watchdog may retry that case locally.

A future runtime hardening pass could distinguish:

- module load failure,
- WebGL context failure,
- scene construction failure,

and apply different recovery policy to each.

## Reset Integration

The public `reset` command ends with:

```js
location.reload()
```

Three.js scenes are startup systems.

The explicit reload is required so the whole Three.js bootstrap path runs again from a clean document instead of attempting to mutate old renderers in place.

## QA

### Healthy Startup

1. Open the hosted build in a private window.
2. Inspect `window.__MIPPI_RUNTIME__.snapshot()`.
3. Confirm `three.source` is populated.
4. Confirm `hero`, `ambient`, and `about` are true.

### CDN Resilience

Block one CDN source at a time.

Expected:

- another source can win,
- no user action is required,
- successful source is recorded.

### Total Network Failure

Block all configured Three.js sources.

Expected:

- Hero DOM fallback remains visible,
- professional navigation remains usable,
- errors are logged,
- recovery is scheduled.

Restore connectivity.

Expected:

- online handler requests recovery,
- missing scenes can initialize.

### Reset Regression

1. Confirm all three scenes are live.
2. Use public `reset`.
3. Confirm page reloads.
4. Confirm 3D initializes again without a second manual refresh.

### Local Preview

Launch through `PreviewLocal.bat`.

Expected:

- primary module is preloaded,
- cache token prevents stale startup assets,
- local watchdog recovers if scenes are not ready after initial load.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
