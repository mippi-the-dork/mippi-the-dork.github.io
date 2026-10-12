# Particle Presentation - Technical Documentation

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language > Particle Presentation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the optional screen-space and event-driven particle treatments used to reinforce milestones and playful console effects.

> This page is the canonical technical documentation for **Particle Presentation** within the Rarity Themes and Visual Language category.

## Documentation Relationship

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command Particle System

The screen-space console particle system uses:

```js
let particleFieldTimer = null;
```

Each DOM particle is created by:

```js
emitCommandParticle()
```

## Particle Element

A particle is:

```html
<i class="command-particle">
```

The function assigns:

- random viewport position,
- random drift variables,
- random size,
- current-theme color,
- glow.

Particles are appended directly to `document.body`.

Each removes itself after:

```text
2600 ms
```

## Palette Selection

`emitCommandParticle()` reads body classes.

Legendary:

```js
[
  '#ffc43f',
  '#ff7a1a',
  '#43e0dc',
  '#fff0b5'
]
```

Epic:

```js
[
  '#d96cff',
  '#ff4fc8',
  '#67e8ff',
  '#ffffff'
]
```

Rare:

```js
[
  '#2f93ff',
  '#67e8ff',
  '#d8f3ff',
  '#ffffff'
]
```

## Particle Geometry

Particle size is randomized approximately between:

```text
2 px and 7 px
```

Position starts in the lower portion of the viewport.

Custom properties include:

```text
--px
--py
```

for animation drift.

## Particle Boost State

`setParticleBoost(active)`:

1. records telemetry,
2. toggles body class `particle-boost`,
3. clears any previous interval,
4. if active, emits an initial burst,
5. starts a repeating interval.

Initial burst:

```text
28 particles
```

staggered by 25 ms.

Ongoing field:

```text
3 particles every 190 ms
```

## Console Command

The `particles` command toggles the current state.

Console output communicates:

```text
PARTICLES ON
```

or:

```text
PARTICLES OFF
```

## Three.js Integration

The Ambient scene checks:

```js
document.body.classList.contains('particle-boost')
```

and increases its overdrive particle layer accordingly.

This makes the command affect both DOM and WebGL presentation.

## Telemetry

Particle toggling contributes to:

```text
modes.particleToggles
```

and Player Model chaos interpretation.

## Doug Particle Families

Separate functions create:

- Doug paw particles,
- rainbow Doug particles.

These systems use their own class names and lifetimes.

They should not be routed through `command-particle` because their semantic ownership is Doug.

## Castle Fireworks

Castle fireworks are a separate authored celebration.

The design requirement is larger visible particles, not higher count.

This keeps the event more noticeable without unnecessary DOM or animation cost.

## Cleanup

Command particles remove themselves through `setTimeout`.

Turning Particle Boost off clears:

```js
particleFieldTimer
```

but existing particles finish naturally.

This avoids abrupt visual popping.

## Theme Changes During Particle Boost

New particles use the theme active at emission time.

Existing particles retain their assigned inline color for the remainder of their short lifetime.

This is acceptable because they disappear quickly.

Three.js ambient particles update theme live each frame.

## QA

### Rare

1. set Rare active,
2. run `particles`,
3. verify blue/cyan/white field.

### Epic

1. switch Epic,
2. verify new particles use violet/pink/cyan.

### Legendary

1. switch Legendary,
2. verify new particles use gold/orange/teal.

### Cleanup

1. turn particles off,
2. verify no new particles spawn,
3. wait 2.6 seconds,
4. verify existing particles are gone.

### Performance

Leave Particle Boost active for several minutes.

Verify:

- no unbounded DOM accumulation,
- particle nodes continue removing themselves,
- page interaction remains responsive.

### Castle

Complete/claim a Castle run.

Verify fireworks are visibly larger without a noticeably increased count.
## Related Documentation

- [Rarity Themes and Visual Language Index](../README.md)
- [Design Documentation](DESIGN.md)
