# Perspective Legend and Labels - Design Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Perspective Legend and Labels > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses explicit control, camera, and live-view labels so the demonstration does not rely on color or assumed perspective terminology.

> This page is the canonical design documentation for **Perspective Legend and Labels** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The visualizer is teaching a terminology problem.

That makes labeling unusually important.

A visitor should not need to infer:

- which marker is player-controlled,
- which marker is AI-controlled,
- whether the right panel is a camera view,
- whether the top-down panel is itself the gameplay perspective.

The UI labels those relationships directly.

## Player Legend

The left panel includes:

```text
PLAYER - Player Controlled
```

This phrasing was chosen deliberately.

A shorter label such as:

`Player`

does not explain the control relationship.

The control relationship is the entire point of the visualizer.

## Companion Legend

The second legend entry says:

```text
COMPANION NPC - AI Controlled
```

Again, the phrase describes agency, not only identity.

The Companion is not another local co-op player.

It is the AI-controlled camera owner in 2nd Person.

## Live Camera Labels

The right canvas has only two HUD labels.

Top-left:

```text
PERSPECTIVE VIEW
```

Bottom-right:

```text
LIVE CAMERA
```

Earlier redundant text around the panel was removed.

The canvas itself now carries the necessary labels.

## Tactical Instruction

The top-down canvas draws its own instruction:

```text
TOP VIEW · DRAG PLAYER
```

This keeps the interaction instruction exactly where the interaction happens.

The surrounding panel no longer duplicates:

- Top-down View,
- Drag Player

in multiple places.

## Mode Description

Below the right canvas, the active perspective is described in one sentence.

### First

```text
The camera is Player Controlled from your character's perspective.
```

### Second

```text
The camera is NPC Controlled from that character's perspective.
```

### Third

```text
The camera is Player Controlled from outside of your character's perspective.
```

These descriptions focus on camera ownership.

## Camera Icon

The tactical map also uses a visible white camera marker.

This provides a non-textual reinforcement of the active camera source.

It is especially useful in second person because the camera marker moves with the Companion NPC.

## Color Independence

The legend uses colored dots, but text carries the authoritative meaning.

This prevents theme changes from turning color into the only control-state signal.

The Companion stays neutral gray.

Player color changes with site theme.

## Design Rules

- Always label control ownership in the legend.
- Use `PLAYER - Player Controlled`.
- Use `COMPANION NPC - AI Controlled`.
- Right view says `PERSPECTIVE VIEW`.
- Right view bottom-right says `LIVE CAMERA`.
- Tactical instruction stays inside top-down canvas.
- Avoid duplicated outer panel headings.
- Mode descriptions explain camera ownership in plain language.
- Do not rely on color alone.

## Success Criteria

A visitor can understand the control and camera relationship even if they ignore the artwork and only read the UI labels.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
