# GitHub Pages Deployment - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > GitHub Pages Deployment > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Publishes the portfolio as a static GitHub Pages site with runtime files at the repository root and no backend requirement.

> This page is the canonical technical documentation for **GitHub Pages Deployment** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Core Runtime Layout

Recommended Pages root:

```text
/
├── index.html
├── style.css
├── script.js
├── perspective-demo.js
└── assets/
```

Intentional public repository files can exist alongside that structure if desired.

## User-Site Repository

The original deployment guide targets a public repository named:

```text
mippi-the-dork.github.io
```

For that user-site pattern, GitHub publishes the repository root.

## Pages Settings

Original documented setup:

```text
Settings
-> Pages
-> Build and deployment
-> Deploy from a branch
-> main
-> / (root)
```

Exact GitHub UI wording can change over time, but the runtime itself assumes root-relative static hosting.

## No Build Step

The current site does not require:

```text
npm install
npm run build
webpack
vite
server-side rendering
```

for production.

The authored HTML/CSS/JS are directly deployable.

## Public Exclusions

Do not include in the runtime deployment package:

```text
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
__pycache__
*.pyc
```

## Asset Paths

Runtime uses relative paths such as:

```text
assets/...
style.css?v=2.78
script.js?v=2.78
perspective-demo.js?v=2.78
```

Case must match the deployed file system exactly.

## Three.js

Primary CDN is module-preloaded from:

```text
cdn.jsdelivr.net
```

Runtime races multiple Three.js module hosts.

The site does not bundle Three.js locally in v2.78.

## Hosted QA

After deployment:

1. open a new private/incognito window,
2. load the production URL,
3. inspect visible version behavior,
4. verify CSS/JS current changes,
5. inspect browser Console,
6. run:
   - `window.__MIPPI_RUNTIME__.snapshot()`,
7. verify Hero/Ambient/About scene status,
8. verify at least one external link,
9. verify persistence after reload,
10. verify `reset` performs a full reload.

## Cache Propagation

If a hosted change appears stale:

- verify deployed source first,
- verify v2.78-style query string was bumped for the new release,
- hard reload only as diagnosis,
- do not assume a successful hard reload means versioning is correct.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
