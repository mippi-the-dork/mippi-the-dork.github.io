# Player Start Position - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Player Start Position > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places the Player near the center of the tactical map's bottom-right quarter so the default second-person camera composition is immediately readable.

> This page is the canonical design documentation for **Player Start Position** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Player start position is composition, not an arbitrary coordinate.

Earlier versions started the Player closer to the center of the play area.

That made the initial second-person relationship less visually clear because:

- Player,
- camera wedge,
- Companion NPC,
- towers

competed near the same central area.

v2.72 deliberately moved the Player into the bottom-right quarter.

## Current Start

World position:

```text
X = 120
Z = 105
```

On the 480 by 420 tactical map this becomes approximately:

```text
X = 360
Y = 315
```

That point is near the center of the map's bottom-right quarter.

## Why Bottom Right

The Companion NPC begins left of the Player and follows a circular path centered further up the map.

Starting the Player in the lower-right creates immediate separation between:

- controlled Player,
- AI camera owner,
- tower landmarks.

The default second-person field-of-view wedge can therefore point into the scene without the Player sitting directly underneath the camera.

## Default 2nd Person Read

Because the visualizer opens in 2nd Person, the first frame should communicate:

- the Player is over there,
- the Companion NPC is over here,
- the camera belongs to the Companion,
- the Companion is looking toward the Player.

The start position supports that message before the visitor drags anything.

## Not a Gameplay Spawn

This is a presentation start point.

The visualizer is not simulating a real Heavy Water level.

There is no:

- spawn volume,
- navmesh,
- collision route,
- checkpoint logic.

The coordinate exists to create an explanatory composition.

## Drag Freedom

The player can immediately move away from the initial composition.

The starting point does not constrain later use.

It only establishes a useful first read.

## Design Rules

- Start at world `(120,105)`.
- Preserve the bottom-right-quarter composition.
- Default camera remains 2nd Person.
- Start position should create visible separation from Companion NPC.
- It is a presentation coordinate, not production-level game data.
- Player remains freely draggable afterward.

## Success Criteria

Before any interaction, the default frame already demonstrates that the player-controlled character and the active camera source are different objects.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
