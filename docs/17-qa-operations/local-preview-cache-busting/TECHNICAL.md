# Local Preview Cache Busting - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Local Preview Cache Busting > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Uses no-cache headers, version query strings, a unique per-launch URL token, and localhost-specific Three.js recovery to reduce stale local-preview failures.

> This page is the canonical technical documentation for **Local Preview Cache Busting** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Static Asset Query Strings

`index.html` currently references:

```text
style.css?v=2.80
script.js?v=2.80
perspective-demo.js?v=2.80
```

`index-debug.html` uses the same version strings.

## Preview Launch URL

The Python server opens:

```text
http://127.0.0.1:<port>/?v=2.80&local=<unix timestamp>
```

The `local` timestamp changes every launch.

## Response Headers

The server adds:

```text
Cache-Control:
no-store, no-cache, must-revalidate, max-age=0
```

plus legacy no-cache headers.

## Three.js Preload

Both HTML pages include:

```html
<link
  rel="preconnect"
  href="https://cdn.jsdelivr.net"
  crossorigin>

<link
  rel="modulepreload"
  href="https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
  crossorigin>
```

## Local Detection

Runtime:

```js
const THREE_LOCAL_PREVIEW =
  /^(?:localhost|127\.0\.0\.1)$/
    .test(
      location.hostname
    );
```

## Import Timeout

Local:

```text
3500 ms
```

Public:

```text
8000 ms
```

## Recovery Delay

Default localhost recovery:

```text
1200 ms
```

Public:

```text
7000 ms
```

## Online Recovery

If browser fires `online` and any Three scene is missing, recovery is scheduled after:

```text
750 ms
```

## Local Watchdog

On window load, localhost waits:

```text
5000 ms
```

If Hero, Ambient, or About Three.js is still missing:

1. clear existing recovery timer,
2. clear `threePromise`,
3. schedule another recovery after:
   - 50 ms.

## Primary Source Order

The primary dynamic import candidate is:

```text
jsDelivr Three.js 0.180.0
```

Alternate sources remain in the race.

## Release QA

When preparing the release after v2.80:

- update HTML asset query strings,
- update preview URL version,
- update runtime version label,
- update package comments/README where appropriate,
- launch a new preview process rather than relying on an old open server tab.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
