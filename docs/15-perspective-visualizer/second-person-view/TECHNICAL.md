# Second-Person View - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Second-Person View > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Keeps the Player under user control while moving the active camera onto an independently AI-controlled Companion NPC.

> This page is the canonical technical documentation for **Second-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Camera Function

For 2nd Person:

```js
return {
  x:companionNpc.x,
  y:61,
  z:companionNpc.z,
  yaw:companionNpc.yaw
};
```

## Companion Runtime

Initial Companion:

```js
const companionNpc={
  x:-85,
  z:120,
  yaw:0
};
```

Path:

```js
const companionNpcPath={
  centerX:-85,
  centerZ:185,
  radius:65,
  angle:-Math.PI/2,
  speed:.42
};
```

## Continuous Motion

Every frame:

```js
companionNpcPath.angle +=
  companionNpcPath.speed*dt;
```

Then:

```js
companionNpc.x =
  centerX+
  Math.cos(angle)*radius;

companionNpc.z =
  centerZ+
  Math.sin(angle)*radius;
```

This path continues regardless of selected perspective.

## Companion Facing

Every frame:

```js
const target =
  Math.atan2(
    player.x-companionNpc.x,
    player.z-companionNpc.z
  );
```

Companion yaw then follows the target through shortest-arc smoothing:

```js
companionNpc.yaw +=
  shortest(
    companionNpc.yaw,
    target
  )
  *ease(
    14,
    dt
  );
```

This gives the second-person camera a strong tendency to keep looking toward the Player.

## Live Actor Rendering

Player:

```js
if(mode!=='1st')
  character(
    cam,
    player,
    pal.player
  );
```

Therefore visible.

Companion:

```js
if(mode!=='2nd')
  character(
    cam,
    companionNpc,
    '#8793a3'
  );
```

Therefore hidden in 2nd Person.

## Default State

JavaScript:

```js
let mode='2nd';
```

HTML button:

```text
2ND PERSON
```

ships with `.active`.

Initial footer text already contains the 2nd Person description.

## Telemetry

A deliberate 2nd Person button interaction increments:

```text
portfolio.secondPersonToggles
```

in addition to general perspective-mode telemetry.

## QA

- Fresh load and verify 2nd Person is active.
- Do not touch Player and watch Companion orbit.
- Drag Player across map.
- Verify Companion continues its own path.
- Verify Companion rotates toward Player.
- Confirm camera wedge follows Companion.
- Confirm Player body appears in live camera.
- Confirm Companion body does not.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
