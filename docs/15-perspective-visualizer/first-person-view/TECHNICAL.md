# First-Person View - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > First-Person View > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places the active camera on the player-controlled character and uses the Player's facing direction for a conventional first-person reference.

> This page is the canonical technical documentation for **First-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Camera Function

`activeCam()` returns for first person:

```js
{
  x:player.x,
  y:61,
  z:player.z,
  yaw:player.yaw
}
```

## Tactical Result

Because camera X/Z equals Player X/Z:

- camera icon overlays the Player marker,
- FOV wedge originates from Player.

## Live Character Rendering

Inside `renderView(cam)`:

```js
if(mode!=='1st')
  character(
    cam,
    player,
    pal.player
  );
```

Therefore the Player is deliberately not drawn in First Person.

Companion rendering:

```js
if(mode!=='2nd')
  character(
    cam,
    companionNpc,
    '#8793a3'
  );
```

So the Companion NPC can appear in First Person.

## Turn Interpolation

Frame loop:

```js
const angularDifference =
  shortest(
    player.yaw,
    player.targetYaw
  );
```

First Person interpolation speed:

```text
7.5
```

Other modes:

```text
5.2
```

## Maximum Turn Step

First Person:

```text
5.0 radians/second cap
```

Other modes:

```text
3.1 radians/second cap
```

implemented as:

```js
const maxStep=
  (mode==='1st'
    ? 5.0
    : 3.1)
  *dt;
```

This is the explicit faster-turning correction.

## Rotation Source

`player.targetYaw` is updated from filtered drag movement:

```js
Math.atan2(
  motion.x,
  motion.z
)
```

when filtered motion magnitude exceeds 8.

## View Projection

First Person uses the same:

- near plane,
- focal length,
- perspective projection,
- floor grid,
- tower rendering

as the other modes.

Only camera ownership and actor visibility differ.

## QA

- Switch to First Person.
- Confirm camera icon overlaps Player.
- Drag Player in a circle.
- Compare response speed against Third Person.
- Verify Player body is absent from live view.
- Move Companion into view and verify it renders.
- Compare tactical FOV direction to live camera.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
