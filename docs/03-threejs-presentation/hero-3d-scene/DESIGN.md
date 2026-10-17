# Hero 3D Scene - Design Documentation

**Hierarchy:** Documentation Home > Three.js and Interactive 3D Presentation > Hero 3D Scene > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the large interactive 3D hero presentation at the top of the site.

> This page is the canonical design documentation for **Hero 3D Scene** within the Three.js and Interactive 3D Presentation category.

## Documentation Relationship

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Hero scene is the portfolio's strongest visual statement.

It needs to communicate three ideas at the same time:

1. this is a game designer's portfolio,
2. the page is interactive,
3. the interaction is useful rather than decorative.

The scene therefore combines Mippi identity, Unreal tool iconography, abstract signal nodes, spatial motion, and direct navigation.

## Composition

The Hero scene is built around a central technical object rather than a literal game environment.

The main visual language includes:

- an icosahedral core,
- wireframe edges,
- a Mippi logo plane,
- orbital rings,
- a floor grid,
- connecting lines,
- abstract section nodes,
- orbiting Unreal tool icons,
- background particles.

This creates the feeling of a live design or systems workspace.

## Spatial Placement

The 3D composition sits primarily on the right side of the Hero.

The textual portfolio statement remains on the left.

This separation is important because the visitor should be able to read:

`I make games, systems, tools, and better questions.`

without visually fighting the scene.

The scene can move and react, but the professional message remains stable.

## Interactive Promise

The scene visibly tells the user:

- Drag to rotate.
- Hover a node.
- Click to jump.

The interaction guide exists because useful 3D interaction should not depend on guessing that a decorative-looking object is clickable.

## Signal Nodes

The current scene contains four navigational nodes:

- Games
- Career
- Consulting
- Unreal Tools

These are deliberately a subset of the full navigation.

The Hero is not trying to replace the header.

It is offering a playful spatial route into high-value destinations.

## Identity Integration

The central Mippi logo makes the scene feel authored rather than generic.

The orbiting tool icons reinforce that Unreal toolmaking is part of the same design identity rather than a detached portfolio category.

## Theme Progression

The Hero expresses rarity progression materially.

### Rare

Blue technical presentation.

### Epic

Purple, pink, and cyan treatment.

The scene becomes more energetic, not merely recolored.

### Legendary

Gold and teal treatment with additional geometry:

- Legendary shell,
- extra rings,
- orbiting shards.

Legendary is intentionally a rarity upgrade, not only a CSS palette swap.

## Fallback

A DOM scene remains behind the renderer.

The fallback reproduces the conceptual composition with:

- central core,
- orbit rings,
- grid,
- Mippi logo,
- labeled section nodes.

The fallback is not an interactive replacement for Three.js navigation.

Its role is to preserve visual meaning while ordinary HTML navigation remains available.

## Motion

The Hero should feel alive but not chaotic.

Motion includes:

- slow core rotation,
- orbital ring motion,
- subtle logo float,
- particle drift,
- tool icon float,
- node bob,
- pointer-driven root response,
- drag-driven scene rotation.

Slowmo can affect selected node motion.

## Design Rules

- Text must remain readable while the 3D moves.
- Interactive nodes need hover feedback.
- The scene should not capture normal page scrolling.
- Pointer interaction must not make the Hero a navigation requirement.
- Rarity progression should be visually meaningful.
- Legendary should feel like a real scene upgrade.
- Performance cost must remain bounded.
- The DOM fallback must already be present before the renderer starts.

## Success Criteria

The Hero succeeds when a visitor can:

- understand the portfolio before touching it,
- recognize that the scene is interactive,
- discover a useful section through the scene,
- still navigate normally if the renderer fails,
- immediately see a meaningful difference between Rare, Epic, and Legendary.
## Related Documentation

- [Three.js and Interactive 3D Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## v3.05–v3.10 Current Specification

v3.06 fixes the Hero opening yaw/pitch so idle animation preserves its intended framing. v3.08 refined decorative orbit rings; its direct logo translation caused an undesirable detached visual. **v3.10 fixes composition using a centered rotational logo orbit around the sphere**, retaining radial facing and the v3.08 ring geometry. Ensure 3D appearance is assessed on actual hardware. The accessible v3.07 fallback remains.
