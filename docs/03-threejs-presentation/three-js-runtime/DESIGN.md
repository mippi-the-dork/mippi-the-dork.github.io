# Three.js Runtime - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Three.js Runtime > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Loads and maintains the shared Three.js runtime used by all 3D scenes and provides recovery behavior when initialization fails.

> This page is the canonical design documentation for **Three.js Runtime** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Three.js is an enhancement layer for the portfolio, not a prerequisite for using the portfolio.

The 3D runtime exists to make the page feel like an interactive game-design space rather than a conventional static resume. It powers the Hero scene, the ambient background layer, and the About scene. Those systems add identity, motion, spatial navigation, theme expression, and playful presentation.

At the same time, the professional site must remain fully understandable when Three.js is unavailable.

This creates a deliberate product rule:

> Three.js can enrich navigation and presentation, but it cannot own access to the professional content.

## Experience Role

The shared Three.js runtime supports three different levels of presentation.

### Hero Scene

The Hero is the highest-value 3D experience.

It is:

- large,
- interactive,
- navigational,
- theme-aware,
- progression-aware,
- visually tied to Mippi's toolmaking identity.

It receives the highest renderer power preference.

### Ambient Layer

The ambient layer is a low-intensity screen-space atmosphere.

It should:

- create subtle depth,
- respond to progression themes,
- remain behind normal content,
- never accept pointer input,
- remain less visually dominant than the Hero.

### About Scene

The About scene is a smaller supporting presentation.

It exists to make the final major section feel alive without duplicating the cost or visual density of the Hero.

## Graceful Degradation

If Three.js cannot load:

- the Hero falls back to a DOM-based visual representation,
- normal Hero buttons still work,
- primary navigation still works,
- the six major sections remain available,
- About copy and links remain available,
- the static About watermark remains visible,
- no professional information is lost.

This is a core design requirement rather than an emergency afterthought.

## Network Dependency

In v2.78 the Three.js module is loaded from external CDN sources.

The runtime therefore has to assume that any one source may:

- be slow,
- be blocked,
- fail temporarily,
- be unavailable on a local test network,
- fail because the browser is offline.

The design response is resilience rather than a single hard dependency.

The loader races several sources and accepts the first successful one.

## Retry Philosophy

A single failed attempt must not permanently disable the site's 3D layer for the rest of the session.

The runtime retries when:

- the initial load times out or fails,
- the browser reports that it has returned online,
- the local preview startup watchdog sees that the expected scenes are still missing.

The retry behavior is more aggressive on localhost because local QA previously exposed a cold-load issue that was not reproduced on the GitHub-hosted build.

## Fallback Visibility

The Hero fallback is visible before Three.js is ready.

This avoids an empty visual region during module import and WebGL initialization.

When the Hero renderer becomes live, the fallback becomes visually subordinate rather than being removed from the DOM.

This gives the opening scene a stable presentation during startup.

## Performance Philosophy

The three scenes do not use identical renderer settings.

The runtime uses:

- high-performance preference for the Hero,
- low-power preference for Ambient,
- low-power preference for About.

Pixel ratio is clamped rather than blindly using the full device pixel ratio.

This is important because the portfolio already runs many other animated and game-layer systems.

## Theme Responsibility

Three.js scenes are not isolated decorative assets.

They respond to:

- Rare theme,
- Epic theme,
- Legendary theme,
- Particle Boost,
- Nanite visualization,
- Slowmo where relevant.

This makes the 3D layer part of the site's progression language.

## Current Product Constraint

The runtime is still CDN-dependent in v2.78.

The public hosted build was verified to cold-load correctly, while the local Python preview could occasionally require recovery behavior.

The current architecture hardens that case, but a future vendored local Three.js module would remove the external runtime dependency entirely.

That would be a technical hardening improvement, not a design change.

## Success Criteria

The Three.js runtime succeeds when:

- 3D starts automatically under normal conditions,
- a failed CDN source does not kill the session,
- the Hero never appears as a blank unexplained hole,
- professional navigation works without WebGL,
- all three scenes can recover after a transient load failure,
- theme changes remain reflected in live 3D,
- runtime problems can be diagnosed without guessing whether the failure happened before or during Three.js initialization.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
