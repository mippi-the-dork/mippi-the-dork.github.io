# 17. QA, Runtime Operations, and Deployment

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment

Collects the development-only systems and release practices used to verify startup, persistence, deployment, cache behavior, assets, and full progression.

## Purpose

This category groups the canonical documentation for **QA, Runtime Operations, and Deployment**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Startup QA** | Defines the minimum checks required to confirm that the site reaches a healthy interactive state without initialization-order regressions. | [Design](startup-qa/DESIGN.md) | [Technical](startup-qa/TECHNICAL.md) |
| **Local Preview Server** | Provides the Python-based local server and launcher used to test the site under HTTP rather than file URLs. | [Design](local-preview-server/DESIGN.md) | [Technical](local-preview-server/TECHNICAL.md) |
| **Local Preview Cache Busting** | Ensures each local preview launch requests the current build rather than accidentally reusing stale script or stylesheet assets. | [Design](local-preview-cache-busting/DESIGN.md) | [Technical](local-preview-cache-busting/TECHNICAL.md) |
| **GitHub Pages Deployment** | Defines the public static-host deployment path and the exact public files needed for the live portfolio. | [Design](github-pages-deployment/DESIGN.md) | [Technical](github-pages-deployment/TECHNICAL.md) |
| **Debug HTML** | Provides a local-only diagnostic page that exposes top-level runtime errors without being part of the public deployment. | [Design](debug-html/DESIGN.md) | [Technical](debug-html/TECHNICAL.md) |
| **Version and Cache Strategy** | Keeps HTML, CSS, JavaScript, and preview-version identifiers synchronized so new builds do not silently reuse stale assets. | [Design](version-and-cache-strategy/DESIGN.md) | [Technical](version-and-cache-strategy/TECHNICAL.md) |
| **Asset Management** | Defines which visual, icon, audio, and runtime assets belong in the public package and which generated development files should be excluded. | [Design](asset-management/DESIGN.md) | [Technical](asset-management/TECHNICAL.md) |
| **Reset Integrity QA** | Verifies that reset clears every intended persistent system and reboots Three.js and the rest of the runtime cleanly. | [Design](reset-integrity-qa/DESIGN.md) | [Technical](reset-integrity-qa/TECHNICAL.md) |
| **Integration QA** | Validates that independent features continue to cooperate after changes to progression, overlays, arcade systems, and persistent state. | [Design](integration-qa/DESIGN.md) | [Technical](integration-qa/TECHNICAL.md) |
| **Extensive QA Test Plan** | Provides the full manual release checklist and DEV-assisted state matrix for validating the complete portfolio. | [Design](extensive-qa-test-plan/DESIGN.md) | [Technical](extensive-qa-test-plan/TECHNICAL.md) |
| **Release Candidate Sweep** | Provides a fast DEV-command-driven sanity pass for checking critical states before publishing a build. | [Design](release-candidate-sweep/DESIGN.md) | [Technical](release-candidate-sweep/TECHNICAL.md) |
| **Performance Diagnostics** | Hidden performance sampling, isolation switches, exports and careful FPS interpretation. | [Design](performance-diagnostics/DESIGN.md) | [Technical](performance-diagnostics/TECHNICAL.md) |
| **Combat Performance Lab** | Permanent opt-in five-scenario combat benchmark with JSON export and A/B geometry mode. | [Design](combat-performance-lab/DESIGN.md) | [Technical](combat-performance-lab/TECHNICAL.md) |
| **Combat Visual Isolation** | Five independent cosmetic diagnostic switches with permanent benchmark reporting. | [Design](combat-visual-isolation/DESIGN.md) | [Technical](combat-visual-isolation/TECHNICAL.md) |
| **Long-Session Stability Lab** | Opt-in resource timelines, combat soak, foreground-aware cycle validation and cleanup. | [Design](long-session-stability-lab/DESIGN.md) | [Technical](long-session-stability-lab/TECHNICAL.md) |
| **Cursor Rendering Lab** | Visual-only cursor-size, CSS style, SVG and cosmetic isolation for reproducible performance comparisons. | [Design](cursor-rendering-lab/DESIGN.md) | [Technical](cursor-rendering-lab/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
