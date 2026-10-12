# 15. Project Heavy Water Perspective Visualizer

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer

Documents the interactive first-person, second-person, and third-person teaching tool embedded in the Project Heavy Water portfolio feature.

## Purpose

This category groups the canonical documentation for **Project Heavy Water Perspective Visualizer**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Perspective Visualizer** | Provides an interactive comparison of camera ownership across first-person, second-person, and third-person perspective models. | [Design](perspective-visualizer/DESIGN.md) | [Technical](perspective-visualizer/TECHNICAL.md) |
| **Top-Down Play Area** | Shows the Player, Companion NPC, environmental blocks, and camera relationship in a draggable top-down representation. | [Design](top-down-play-area/DESIGN.md) | [Technical](top-down-play-area/TECHNICAL.md) |
| **Player Start Position** | Places the Player in the middle of the bottom-right quarter of the top-down play area so the initial composition reads clearly. | [Design](player-start-position/DESIGN.md) | [Technical](player-start-position/TECHNICAL.md) |
| **First-Person View** | Shows the camera as player-controlled from the Player character's own perspective. | [Design](first-person-view/DESIGN.md) | [Technical](first-person-view/TECHNICAL.md) |
| **Second-Person View** | Shows the camera as NPC-controlled from the Companion character's perspective while the Player remains the controlled character. | [Design](second-person-view/DESIGN.md) | [Technical](second-person-view/TECHNICAL.md) |
| **Third-Person View** | Shows the camera as player-controlled from outside the Player character's perspective. | [Design](third-person-view/DESIGN.md) | [Technical](third-person-view/TECHNICAL.md) |
| **Perspective Legend and Labels** | Explains player ownership, companion AI ownership, and live camera state using consistent labels and color language. | [Design](perspective-legend-and-labels/DESIGN.md) | [Technical](perspective-legend-and-labels/TECHNICAL.md) |
| **Perspective Camera Controls** | Defines dragging, rotation speed, switching perspective, and live camera updates across the three modes. | [Design](perspective-camera-controls/DESIGN.md) | [Technical](perspective-camera-controls/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
