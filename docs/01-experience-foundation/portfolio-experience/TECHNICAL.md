# Portfolio Experience - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Portfolio Experience > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** The complete portfolio is both a professional website and an optional playable discovery layer, with the professional work remaining fully usable even when the visitor ignores every game system.

> This page is the canonical technical documentation for **Portfolio Experience** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Implementation Overview

The experience is a static web application composed primarily of:

- `index.html` for semantic content and the core DOM structure.
- `style.css` for the visual system, responsive behavior, rarity themes, overlays, HUD surfaces, and state styling.
- `script.js` for progression, telemetry, persistence, game systems, interaction state, overlays, Three.js bootstrap, and the Dev Console.
- `perspective-demo.js` for the Heavy Water Perspective Visualizer.
- `assets/` for images, tool icons, gallery media, and future music files.

The professional page is rendered as conventional HTML before the playable runtime is required. This is a deliberate dependency direction: JavaScript enriches the page rather than constructing the professional portfolio from scratch.

## Runtime Ownership

`script.js` owns the majority of runtime systems. It initializes:

- local and session state,
- telemetry,
- navigation behavior,
- achievement state,
- themes,
- Shop and economy state,
- game-layer progression,
- console commands,
- overlays,
- Three.js scenes,
- arcade systems,
- Finale state,
- postgame state,
- Music Player state.

The runtime exposes diagnostic snapshots through immutable window properties such as `window.__MIPPI_RUNTIME__`, `window.__MIPPI_TELEMETRY__`, and `window.__MIPPI_PLAYER_MODEL__`.

## Layering Strategy

The page uses several simultaneous UI layers:

1. Normal document flow for professional content.
2. Sticky header for identity and navigation.
3. Decorative or interactive canvases for Three.js presentation.
4. Fixed progression HUD and controls.
5. Fixed or modal overlays for authored events.
6. Full-screen encounter layers for Finale, Super Boss, and selected Wish states.

The professional content remains in normal document flow so game-layer systems can be hidden, disabled, or fail without destroying the information architecture.

## State Classes

Major runtime state is communicated to CSS through body classes and element classes. Examples include:

- `theme-complete`
- `theme-legendary`
- `finale-ready`
- `finale-active`
- `interaction-hunt`
- `star-power`
- `design-mode`
- `inspect-mode`
- `ai-wish-corrupted`

This keeps visual state in CSS while JavaScript remains responsible for the authoritative progression and interaction state.

## Progressive Enhancement

Important navigation is conventional HTML. The header navigation uses anchor links to public section IDs. The Hero also provides Three.js signal navigation, but those signals are redundant.

Three.js failure therefore does not remove the visitor's ability to navigate the portfolio.

## Runtime Health

At script startup, `mippiRuntimeHealth` records:

- package version,
- boot start time,
- boot stage,
- top-level errors,
- unhandled promise rejections,
- Three.js source and scene initialization state.

The object is exposed through `window.__MIPPI_RUNTIME__.snapshot()` for QA without allowing external code to mutate the internal object directly.

## Error Tolerance

Persistent storage reads and writes are generally wrapped in `try/catch`. A storage failure should not stop initial page rendering.

Three.js has its own recovery and fallback behavior documented in the Three.js category.

Individual game systems should fail locally rather than making the entire portfolio unusable.

## Integration Contract

The following are foundational contracts that other systems depend on:

- Major section IDs are stable.
- The header remains the primary conventional navigation path.
- Professional content stays accessible without progression.
- Local storage keys use the `mippi` prefix.
- Full reset clears all `mippi` storage keys.
- Rarity classes are presentation state, not progression authority.
- Session telemetry stays local to the browser.
- Modal or encounter systems must clean up their transient state.

## QA

Minimum regression checks:

1. Load the site with JavaScript enabled and verify all professional sections are reachable.
2. Block or fail Three.js and verify conventional navigation still works.
3. Use `dev fresh` and verify the first-visit state.
4. Use `dev snapshot` and verify the runtime reports plausible state.
5. Unlock Epic and Legendary and confirm professional content remains unchanged in meaning.
6. Enter and exit the Shop, Console, Wish overlays, Boss content, and Finale without leaving the page unusable.
7. Run the public `reset` flow and confirm the page returns to a clean first-visit state after reload.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
