# Third-Person View - Technical Documentation

**Hierarchy:** Documentation Home > Project Heavy Water Perspective Visualizer > Third-Person View > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Places a player-controlled follow camera behind the Player to provide the familiar external-camera comparison case.

> This page is the canonical technical documentation for **Third-Person View** within the Project Heavy Water Perspective Visualizer category.

## Documentation Relationship

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
## Camera Function

Third Person falls through the final branch of `activeCam()`.

Back distance:

```js
const back=110;
```

Returned camera:

```js
{
  x:
    player.x-
    Math.sin(
      player.yaw
    )*back,

  y:72,

  z:
    player.z-
    Math.cos(
      player.yaw
    )*back,

  yaw:
    player.yaw
}
```

## Follow Direction

Forward world vector is based on:

```text
sin(yaw), cos(yaw)
```

Subtracting that vector by 110 places the camera behind the Player.

## Tactical Relationship

When:

```js
mode==='3rd'
```

`renderMap()` draws a dashed line from active camera point to Player map point.

## Actor Visibility

In `renderView()`:

```js
if(mode!=='1st')
  character(
    cam,
    player,
    pal.player
  );
```

and:

```js
if(mode!=='2nd')
  character(
    cam,
    companionNpc,
    '#8793a3'
  );
```

Both conditions are true in Third Person.

Therefore both characters can render.

## Turn Rate

Third Person shares the slower follow-style Player turn response:

```text
interpolation speed 5.2
max angular step 3.1 rad/s
```

First Person instead uses:

```text
7.5
5.0 rad/s
```

## Camera Pitch

The camera is yaw-only.

There is no pitch or roll.

The renderer comment explicitly notes:

```text
Deliberately no pitch or roll:
a level, yaw-only eye/follow camera.
```

## QA

- Switch to Third Person.
- Verify camera icon is offset behind Player.
- Rotate Player through different drag directions.
- Confirm camera offset rotates around with yaw.
- Verify dashed line tracks camera-to-Player.
- Verify Player and Companion can both render in live camera.
- Compare Third and Second tactical camera ownership.
## Related Documentation

- [Project Heavy Water Perspective Visualizer Index](../README.md)
- [Design Documentation](DESIGN.md)
