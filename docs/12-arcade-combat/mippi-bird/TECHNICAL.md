# Mippi Bird - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the embedded arcade minigame launched from the console.

> This page is the canonical technical documentation for **Mippi Bird** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime State

Main globals:

```js
let flappyPanel=null;
let flappyCanvas=null;
let flappyCtx=null;
let flappyRaf=0;
let flappyBirdImage=null;
let flappyState=null;
let flappySessionHighScore=0;
```

## Launch

Player command:

```text
play
```

calls:

```js
openFlappyGame();
```

DEV:

```text
dev flappy
```

uses the same open function.

## Panel

The game is created lazily by:

```js
ensureFlappyGame()
```

Dynamic root:

```text
.flappy-game
```

Canvas:

```html
<canvas
  width="520"
  height="280"
  id="flappy-canvas"
  aria-label="Click inside the game to flap">
```

## Round State

`resetFlappyGame()` creates:

```js
{
  y:140,
  vy:0,
  score:0,
  gameOver:false,
  started:false,
  shopLifeAvailable:
    shopOwns(
      'bird-extra-life'
    ),
  invulnerableUntil:0,
  pipes:[
    {x:590,gapY:118},
    {x:850,gapY:168}
  ]
}
```

## Pointer Input

Canvas pointerdown:

### Game Over

- resets,
- marks started,
- records game start,
- immediately applies jump velocity.

### Not Started

- marks started,
- records game start.

### All Running Clicks

Set:

```js
flappyState.vy=
  flappyJumpStrength();
```

## Physics

Normal jump:

```text
-6.9
```

Slowmo jump:

```text
-5.25
```

Normal gravity:

```text
0.36
```

Slowmo gravity:

```text
0.24
```

Each frame:

```js
s.vy += gravity*dt;
s.y  += s.vy*dt;
```

## World Scroll

Pipe X movement:

```js
2.65*dt
```

per frame step.

Pipe spacing:

```text
260 px
```

New gap center:

```text
78 + random 0 to 120
```

Gap size:

```text
124 px
```

Pipe width:

```text
43.2 px
```

## Player Collision

Player center X:

```text
102
```

Approximate collision box:

```text
38 x 38
```

Collision checks:

- upper/lower pipe rectangles,
- canvas top/bottom boundaries.

## Score

When a pipe fully passes the player's X:

```js
s.score++;
```

The runtime updates:

- current score,
- session high score,
- telemetry max,
- Rupee milestone check.

## Game Over

If collision is not absorbed by an Extra Life:

```js
s.gameOver=true;
```

On the transition:

```text
flappy.deaths
meaningful: flappy_game_over
```

are recorded.

The canvas draws a dark overlay with:

```text
GAME OVER
CLICK TO RESTART
```

## Player Art

The game loads:

```text
assets/mippi-logo-blue.png
```

as an Image.

If decoded:

```js
ctx.drawImage(...)
```

If not, `drawMippiBirdFallback()` renders a vector approximation.

## Frame Loop

`openFlappyGame()` starts requestAnimationFrame and calculates a normalized frame delta capped at 2.2.

`closeFlappyGame()`:

- removes `.open`,
- cancels RAF.

## QA

- Launch from `play`.
- Click to start.
- Verify one-button flap behavior.
- Crash and click to restart.
- Quit mid-run.
- Toggle Slowmo and compare physics.
- Switch all three themes.
- Simulate slow image decode and verify vector fallback instead of square art.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current v3.04 Specification

v3.04 uses a cached offscreen canvas recolor of `assets/mippi-logo-blue.png` for Rare `#67cfff`, Epic `#ff6bd2`, Legendary `#ffd16b`, preserving transparent logo shape rather than drawing a solid tinted box. Cache clears when the source image loads. Vector fallback uses the same theme color. Theme-switch test must operate while the Bird minigame is already open.
