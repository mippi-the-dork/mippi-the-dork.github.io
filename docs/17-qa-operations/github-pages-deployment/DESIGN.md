# GitHub Pages Deployment - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > GitHub Pages Deployment > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Publishes the portfolio as a static GitHub Pages site with runtime files at the repository root and no backend requirement.

> This page is the canonical design documentation for **GitHub Pages Deployment** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio is deliberately deployable as a static site.

The game layer is complex, but the hosting model should remain simple.

GitHub Pages is a good fit because the runtime needs only:

- HTML,
- CSS,
- client-side JavaScript,
- static assets,
- external Three.js module sources.

No application server is required.

## Static-First Architecture

The public site must continue to work with no backend.

Persistent progression uses browser storage.

Session telemetry uses browser session storage.

External actions use normal links.

The portfolio should not require:

- database,
- authentication,
- server session,
- API deployment,
- build pipeline for core runtime.

## Repository Root

For a GitHub user site, the original deployment instructions use:

```text
mippi-the-dork.github.io
```

with runtime files at repository root.

The important structural rule is:

> Do not wrap the actual site in an extra nested folder.

`index.html` must be directly available at the Pages root.

## Public Runtime Files

At minimum the deployed site needs:

- `index.html`,
- `style.css`,
- `script.js`,
- `perspective-demo.js`,
- `assets/`.

Additional public files such as a repository README can coexist, but development-only files should not be part of the runtime package.

## Development Files to Exclude

Do not publish these as public site runtime:

```text
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
__pycache__/
*.pyc
```

These are QA/source artifacts.

They are not visitor-facing runtime dependencies.

## Three.js Network Dependency

The site loads Three.js from external CDNs.

If all module sources are unavailable:

- professional HTML content remains present,
- Hero DOM fallback remains usable,
- Three.js recovery continues later.

GitHub Pages deployment therefore remains functional even when the 3D enhancement is temporarily unavailable.

## HTTPS

GitHub Pages provides HTTPS.

This is useful for browser features such as:

- clipboard API,
- secure external media behavior,
- consistent module loading.

## Deployment Verification

A successful local preview is not sufficient.

The final hosted site must receive its own cold-load check.

Important differences include:

- CDN/network timing,
- real browser cache,
- GitHub asset propagation,
- hosted relative paths,
- source case sensitivity,
- deployed file set.

## Design Rules

- Keep public runtime static.
- Keep `index.html` at site root.
- Deploy only runtime assets and intentional public repository files.
- Exclude local QA helpers.
- Verify actual hosted cold load.
- Preserve graceful Three.js fallback.
- Do not introduce a backend dependency for game state.
- Treat GitHub Pages as the public truth after deployment.

## Success Criteria

The complete portfolio experience can be published directly to static hosting and remains usable even when optional external 3D dependencies fail.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
