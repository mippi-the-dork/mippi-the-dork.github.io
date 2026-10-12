# Version and Cache Strategy - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Version and Cache Strategy > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Keeps package labels, runtime diagnostics, static asset query strings, and local preview URLs synchronized so testers can tell which build is actually running.

> This page is the canonical technical documentation for **Version and Cache Strategy** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Version

At top of `script.js`:

```js
const mippiRuntimeHealth={
  version:'2.80',
  ...
};
```

QA:

```js
window.__MIPPI_RUNTIME__
  .snapshot()
  .version
```

should return:

```text
2.80
```

## HTML Asset Versions

Both normal and debug HTML use:

```text
style.css?v=2.80
script.js?v=2.80
perspective-demo.js?v=2.80
```

## Preview Version

`preview_server.py` opens:

```text
?v=2.80
```

and prints:

```text
Mippi Portfolio v2.80 preview:
```

## Package Comment

The HTML footer contains:

```text
MIPPI PORTFOLIO PACKAGE v2.80
```

## Three.js Dependency

Pinned module:

```text
three@0.180.0
```

across all dynamic import candidates where version syntax is supported.

## Version Bump Checklist

For a future release:

1. change `script.js` runtime comment/version,
2. change runtime health version,
3. update `style.css?v=...`,
4. update `script.js?v=...`,
5. update `perspective-demo.js?v=...`,
6. update `index-debug.html` equivalents,
7. update preview server URL version,
8. update preview server printed version,
9. update package comment,
10. update release README/notes as appropriate.

## Cache Diagnosis

If hosted behavior appears stale:

```text
A. Inspect page source / network request for script.js?v=<expected>.
B. Run __MIPPI_RUNTIME__.snapshot().
C. Compare runtime version.
D. Verify deployed file contents.
E. Only then use hard reload as a diagnostic step.
```

A hard reload fixing the issue indicates caching, but it does not prove the release's versioning is sufficient.

## Local Diagnosis

Local preview additionally verifies the top-level URL contains:

```text
local=<unique timestamp>
```

and responses carry no-cache headers.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
