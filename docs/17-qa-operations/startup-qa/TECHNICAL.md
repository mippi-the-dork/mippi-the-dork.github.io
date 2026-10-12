# Startup QA - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Startup QA > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Validates that the portfolio can complete early initialization without JavaScript ordering regressions, missing DOM paths, or a pre-Three.js crash.

> This page is the canonical technical documentation for **Startup QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Health Object

The script begins with:

```js
const mippiRuntimeHealth={
  version:'2.78',
  bootStartedAt:Date.now(),
  bootStage:'script-start',
  errors:[],
  three:{
    source:null,
    hero:false,
    ambient:false,
    about:false,
    attempts:[]
  }
};
```

## Error Capture

Global listeners collect:

```text
error
unhandledrejection
```

The runtime keeps the most recent:

```text
12
```

captured errors.

## Read-Only QA Surface

The runtime exposes:

```js
Object.defineProperty(
  window,
  '__MIPPI_RUNTIME__',
  {
    value:Object.freeze({
      snapshot:
        () =>
          JSON.parse(
            JSON.stringify(
              mippiRuntimeHealth
            )
          )
    }),
    configurable:false,
    writable:false
  }
);
```

The public QA surface returns a deep copy.

## Important Boot Stages

Current v2.78 assignments include:

```text
script-start
core-interactions-ready
initial-hud-ready
pre-three-complete
three-loading
three-loaded
three-unavailable
three-retrying
hero-three-live
```

The individual Three.js booleans provide more precise scene state than the single boot-stage string.

## Startup Validation Policy

`STARTUP_QA_DEV.md` documents the release checks:

- JavaScript syntax,
- duplicate IDs,
- CSS brace structure,
- local asset references,
- no duplicate moved state declarations,
- minimal startup mock,
- DOM-enabled startup mock.

## DOM-Enabled Requirement

The DOM-enabled startup test must include the actual HUD elements needed to force:

```text
updateHeartMeter()
updateProgressHudVisibility()
updateCastleMeter()
updateInvasionMeter()
updateCoolMeter()
```

through the same branches reached in the browser.

## State Ordering Rule

Variables reachable through early HUD updates belong in the early progression-state block.

Do not move them later merely because their feature-specific functions appear later in the file.

## Cold-Load QA

For every release candidate:

1. close the existing local preview browser tab,
2. start a fresh preview server,
3. open a new page load,
4. inspect browser console,
5. inspect `window.__MIPPI_RUNTIME__.snapshot()`.

Then repeat with a populated persistent save.

## Returning-State Matrix

At minimum test:

```text
fresh
Epic
Legendary
postgame revealed
100% / Music unlocked
```

A returning state is more likely to trigger hidden initialization dependencies.

## Release Failure Rule

Any uncaught error before:

```text
pre-three-complete
```

should be treated as a general startup failure first.

Do not classify it as a Three.js import failure until the runtime snapshot shows that startup actually reached the Three loader.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
