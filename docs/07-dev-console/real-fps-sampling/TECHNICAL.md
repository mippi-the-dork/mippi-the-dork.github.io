# Real FPS Sampling - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Real FPS Sampling > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses actual requestAnimationFrame timing for browser-tab FPS when available and falls back to the existing estimate when necessary.

> This page is the canonical technical documentation for **Real FPS Sampling** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Variables

FPS sampling uses:

```js
statFpsRaf
statFpsFrames
statFpsWindowStart
statFpsMeasured
statFpsMeasuredAt
```

## Sampling Model

A requestAnimationFrame loop counts rendered frames over a measurement window.

When enough time has elapsed, the system calculates:

```text
frames / elapsed time
```

and records:

- measured FPS,
- measurement timestamp.

## Freshness Window

The overlay treats a sample as recent when it is approximately within:

```text
1600 ms
```

of the current `performance.now()` time.

## Display

Recent sample:

```js
fps = statFpsMeasured
```

Label:

```text
STAT FPS // LIVE
```

Stale or missing sample:

```js
58 + Math.random() * 4
```

Label:

```text
STAT FPS // EST
```

## Why Estimate Remains

Browser RAF can become stale when:

- tab was hidden,
- sampling just started,
- browser throttled callbacks.

The estimate preserves immediate output while clearly labeling it as non-live.

## QA

- open FPS overlay,
- wait for LIVE,
- verify value changes plausibly,
- hide tab for several seconds,
- return,
- observe EST if sample is stale,
- wait for LIVE recovery,
- test on 60 Hz and high-refresh displays when available.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
