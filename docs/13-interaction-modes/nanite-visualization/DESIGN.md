# Nanite Visualization - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Nanite Visualization > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Replaces eligible Three.js scene materials with per-triangle debug colors to imitate a Nanite-style triangle visualization.

> This page is the canonical design documentation for **Nanite Visualization** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Nanite Visualization is a fake engine-debug view applied to the site's actual Three.js scenes.

The joke works better when the visualization is attached to real portfolio geometry rather than drawn as a disconnected screen overlay.

Eligible scene meshes become a patchwork of bright per-triangle colors.

This is visually reminiscent of engine triangle/debug views without claiming to expose real Nanite data.

## Scope

The visualization applies to registered Three.js scenes.

In v2.78, the Hero and About Three.js scene initialization paths register themselves for Nanite visualization.

The mode is therefore different from Lumen:

### Lumen

Screen-space fake lighting artifact layer.

### Nanite

Actual replacement geometry/material presentation on supported Three.js meshes.

## Mesh Eligibility

Not every mesh should be replaced.

The current system intentionally skips meshes that are likely to be unsuitable, including:

- objects that are not meshes,
- geometry without position data,
- material arrays,
- textured materials,
- objects explicitly marked to skip Nanite.

This preserves important authored visuals and avoids replacing billboard-like assets with meaningless triangle colors.

## Triangle Coloring

Each triangle gets one palette color.

The result is intentionally noisy and technical-looking.

The palette includes:

- pink,
- blue,
- cyan,
- purple,
- yellow,
- green,
- orange,
- white.

This is debug visualization color, not world rarity.

## Material Replacement

The mode swaps eligible objects to a simple vertex-colored unlit material.

Turning the mode off restores each object's original:

- geometry,
- material.

The original scene is therefore recoverable without rebuilding it.

## Live Scene Registration

A Three.js scene can register while Nanite is already enabled.

The registration helper immediately applies the current mode state.

This prevents startup order from making one scene miss the visualization.

## Runtime Nature

Nanite Visualization is a temporary debug toy.

It is not persisted.

Reload returns normal materials.

## Design Rules

- Never describe the mode as actual Nanite metrics.
- Operate only on registered Three.js meshes.
- Preserve original geometry and material references.
- Skip textured or explicitly excluded meshes.
- Restore originals when disabled.
- Debug colors remain semantic to the visualization rather than theme rarity.
- Mode never alters professional content data.

## Success Criteria

The player can toggle a convincingly engine-like triangle view over the site's real 3D geometry and restore the scene instantly.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
