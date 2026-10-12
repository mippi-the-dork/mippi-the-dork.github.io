# Runtime Health and Startup Watchdog - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Runtime Health and Startup Watchdog > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks startup state and retries or reports 3D initialization problems without allowing one failed load to permanently disable the experience.

> This page is the canonical design documentation for **Runtime Health and Startup Watchdog** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The most frustrating version of a Three.js failure is not a visible error.

It is a portfolio where the 3D simply does not appear and nobody knows whether the cause was:

- JavaScript startup order,
- a CDN failure,
- WebGL,
- a renderer issue,
- a stale local preview,
- a browser error earlier in the file.

The Runtime Health system exists to make those failure categories observable.

Its primary audience is development and QA, but it also supports better user-facing fallback behavior.

## Why Runtime Health Exists

Several historical Three.js regressions were caused by code that failed before the Three.js loader was even reached.

Examples documented during development include:

- a progression-state temporal-dead-zone error,
- a stale `lensToggle` reference after replacing an earlier Perspective Visualizer implementation,
- HUD initialization reading Arcade or Castle state before those variables were initialized.

In all of those cases the symptom looked like:

> Three.js stopped working.

But Three.js itself was not the cause.

The health system exists so the developer can distinguish a pre-Three startup crash from a real Three.js problem.

## Health Philosophy

The runtime should answer:

- Did the main script start?
- What startup stage was reached?
- Were there top-level errors?
- Was Three.js requested?
- Which sources were attempted?
- Which source succeeded?
- Which scenes actually initialized?
- Did a promise reject before scene creation?

The runtime should not silently repair every possible bug. Its first job is to make the state legible.

## User-Facing Performance Warning

The portfolio also performs a best-effort WebGL renderer check.

If WebGL is missing, or the browser clearly reports a software renderer such as SwiftShader or llvmpipe, the page can show a hardware-acceleration warning.

The warning is advisory.

It should:

- explain that performance problems may come from software rendering,
- provide a help link,
- remain dismissible,
- avoid claiming certainty when browsers do not expose reliable hardware-acceleration state.

## Local Preview Watchdog

Local preview receives extra recovery behavior because a specific cold-load timing issue was observed there while the GitHub-hosted deployment worked normally.

This distinction matters.

The public website should not become more aggressive or noisy merely because the local developer server has unusual timing.

## Design Rules

- Health information should remain diagnostic, not become normal player HUD.
- The site should fall back before exposing a raw technical error to ordinary visitors.
- Runtime snapshots must not contain private account information.
- A warning should be actionable when it is shown.
- Local-only recovery behavior should not accidentally become required for the hosted build.
- Debugging should distinguish failure stage before changing scene code.

## Success Criteria

A developer investigating missing 3D should be able to determine whether the failure happened:

1. before Three.js loading,
2. during module acquisition,
3. during scene construction,
4. after renderer initialization.

That should be possible without adding ad hoc console logging every time.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
