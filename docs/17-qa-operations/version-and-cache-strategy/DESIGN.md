# Version and Cache Strategy - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Version and Cache Strategy > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Keeps package labels, runtime diagnostics, static asset query strings, and local preview URLs synchronized so testers can tell which build is actually running.

> This page is the canonical design documentation for **Version and Cache Strategy** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Versioning in a static site is deceptively important.

There is no executable installer to display a build number.

A browser can also cache:

- CSS,
- JavaScript,
- HTML,
- external modules.

Without a consistent version strategy, a developer can spend time debugging an older file while believing it is the current release.

The goal is simple:

> A tester should be able to determine which package and runtime version they are looking at.

## Current Release Label

This documentation baseline is:

```text
v2.78
```

The release label appears in several places.

Important runtime-facing locations include:

- script runtime health object,
- HTML CSS/JS query strings,
- preview server URL,
- preview server console text,
- package comments.

## Query-String Strategy

Static local files use:

```text
?v=2.80
```

This gives hosted browsers a new URL when release version changes.

It is not a substitute for correct cache headers on every platform, but it is a useful static-site cache-busting layer.

## Per-Launch Local Token

Local preview adds:

```text
&local=<timestamp>
```

to the page URL.

This token is not the release version.

It exists only to ensure each local preview process opens a unique top-level document URL.

## Runtime Truth

The runtime diagnostic object reports:

```text
version:'2.80'
```

This is useful when the UI looks stale.

A tester can compare:

- expected package,
- loaded script runtime.

## Update Discipline

A release version bump should update all coordinated version surfaces in the same change.

Do not update only:

- README,
- package filename,

while leaving:

- script asset query,
- preview URL,
- runtime health label

behind.

That makes cache diagnosis ambiguous.

## CDN Version Pin

Three.js is separately pinned to:

```text
0.180.0
```

The portfolio release version and Three.js dependency version are independent.

Changing one does not automatically change the other.

## Design Rules

- One portfolio version per release package.
- Synchronize runtime version surfaces.
- Use version query strings for local JS/CSS.
- Use unique local launch token in addition to release version.
- Keep dependency versions explicit.
- Do not diagnose cache problems without first confirming loaded version.
- Bump version query whenever deployable JS/CSS changes for a new release.

## Success Criteria

When a tester reports stale behavior, the first question can be answered immediately: which actual build is loaded?
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
