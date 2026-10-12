# Local Preview Cache Busting - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Local Preview Cache Busting > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Uses no-cache headers, version query strings, a unique per-launch URL token, and localhost-specific Three.js recovery to reduce stale local-preview failures.

> This page is the canonical design documentation for **Local Preview Cache Busting** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Local browser caching created a misleading QA problem.

A developer could:

- change the files,
- restart preview,
- still see an older script or stylesheet,
- conclude that a code fix failed,
- refresh manually,
- suddenly see the new build.

That is a bad development loop.

v2.76 and v2.77 hardened local preview specifically so each launch strongly prefers current files.

## Multi-Layer Strategy

Local cache busting does not rely on one mechanism.

It uses several.

### No-Cache HTTP Headers

The Python preview server asks the browser not to cache responses.

### Static Asset Version Query

HTML references:

```text
style.css?v=2.80
script.js?v=2.80
perspective-demo.js?v=2.80
```

### Unique Launch Token

The browser opens:

```text
/?v=2.80&local=<timestamp>
```

so each preview launch has a unique page URL.

### Three.js Module Preload

The primary Three.js CDN module is preloaded in the HTML head.

### Faster Local Retry

Localhost uses shorter Three import timeouts and recovery cadence.

### Local Startup Watchdog

If one of the three 3D layers is still missing after page load, localhost triggers another recovery pass.

## Hosted vs Local Behavior

The local hardening should not destabilize the public site.

Hosted GitHub behavior had already been observed working correctly.

The changes therefore target:

- localhost timeout values,
- preview server cache behavior,
- launch URL,
- startup watchdog.

The hosted site keeps longer recovery windows that are more appropriate for real network conditions.

## Version Discipline

When a new release package changes:

- `script.js`,
- `style.css`,
- `perspective-demo.js`

the query-string version should be updated with the package version.

The local preview URL version string should match too.

A mismatched version creates avoidable debugging ambiguity.

## Design Rules

- Local preview should strongly prefer fresh assets.
- Use both HTTP and URL-level cache busting.
- Keep version labels synchronized.
- Use a unique launch token.
- Preload primary Three module.
- Localhost can retry faster than public hosting.
- Do not remove public fallback behavior merely because localhost is hardened.

## Success Criteria

A fresh local preview launch normally reflects the current package without requiring a manual browser refresh.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
