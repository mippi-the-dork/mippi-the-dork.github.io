# Particle Boost - Technical Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Particle Boost > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds a high-density screen-space particle field and strengthens the ambient Three.js particle presentation.

> This page is the canonical technical documentation for **Particle Boost** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Timer

```js
let particleFieldTimer=null;
```

The body class used as shared state is:

```text
particle-boost
```

## Command

Player-facing:

```text
particles
```

checks whether the body currently has `particle-boost`, flips the state, and calls:

```js
setParticleBoost(
  active
);
```

## Toggle Function

`setParticleBoost(active)`:

1. increments:
   - `modes.particleToggles`,
2. toggles body class,
3. clears any previous emitter interval,
4. creates activation burst if enabled,
5. starts continuous interval if enabled.

## Activation Burst

On enable:

```js
for(
  let i=0;
  i<28;
  i++
){
  setTimeout(
    emitCommandParticle,
    i*25
  );
}
```

This gives 28 particles spread over approximately 675 ms.

## Continuous Emission

While enabled:

```js
particleFieldTimer =
  setInterval(
    () => {
      for(let i=0;i<3;i++)
        emitCommandParticle();
    },
    190
  );
```

That is approximately:

```text
15.8 screen particles per second
```

before natural removal.

## Particle Creation

Each `.command-particle`:

- starts at a random horizontal viewport position,
- begins between roughly 60 and 102 viewport-height units,
- moves upward 80 to 300 px,
- drifts horizontally up to about 60 px either direction,
- uses size roughly 2 to 7 px,
- gets a glow matching its chosen palette color.

DOM cleanup:

```text
2600 ms
```

CSS animation:

```text
2.35 seconds
```

## Rarity Palette

Rare:

```text
#2f93ff
#67e8ff
#d8f3ff
#ffffff
```

Epic:

```text
#d96cff
#ff4fc8
#67e8ff
#ffffff
```

Legendary:

```text
#ffc43f
#ff7a1a
#43e0dc
#fff0b5
```

## Ambient Three.js Integration

The ambient scene frame loop reads:

```js
const boosted =
  document.body.classList.contains(
    'particle-boost'
  );
```

It increases:

- ambient point opacity,
- ambient point size,
- signal point opacity,
- overdrive-point visibility.

The exact result also depends on whether the site is in Epic/Legendary completion presentation.

This is an ambient-scene boost, not a universal material override for every Three.js scene.

## Disable

Turning off clears:

```js
particleFieldTimer
```

and removes the body class.

Already emitted particles finish and remove themselves.

## Doug Executive Review

The Wish sequence captures prior particle state and only calls:

```js
setParticleBoost(false)
```

during cleanup when the review was responsible for turning it on.

## QA

- Enable in Rare, Epic, Legendary.
- Verify initial 28-particle burst.
- Let it run for 10 seconds and verify stable emitter behavior.
- Inspect ambient Three.js scene with mode on/off.
- Toggle rapidly and verify only one interval remains.
- Trigger Doug Executive Review with Particle Boost initially off.
- Repeat with Particle Boost initially on.
- Verify cleanup restores prior state correctly.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Design Documentation](DESIGN.md)
