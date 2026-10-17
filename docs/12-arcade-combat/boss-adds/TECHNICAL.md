# Boss Adds - Technical Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Boss Adds > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides supporting enemies that can be shot and explode in place during the Super Boss encounter.

> This page is the canonical technical documentation for **Boss Adds** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Creation

During Super Boss spawn:

```js
for(let i=0;i<4;i++){
  const el=
    document.createElement('i');

  el.className=
    'superboss-add';

  state.adds.push({
    el,
    alive:true,
    x:0,
    y:0,
    phase:i*Math.PI/2
  });
}
```

## Motion

Every encounter render frame, living Adds update relative to current Boss position.

Angle:

```js
add.phase+
now*.00072*
(i%2?1:-1)
```

Radius:

```text
145 px
```

or:

```text
187 px
```

depending on index parity.

Horizontal:

```js
bossX+
Math.cos(angle)*radius
```

Vertical:

```js
bossY+
Math.sin(angle)*76+
68
```

## Add Fire

Recurring Add-fire interval:

```text
1080 ms normal
1650 ms Slowmo
```

At each tick:

1. filter living Adds,
2. choose one random living Add,
3. fire a direct Super Boss projectile at gameplay cursor.

If no Adds remain, the interval does nothing.

## Collision

Player vertical projectiles check living Adds first.

Collision radius:

```text
28 px
```

## Destroy

`destroyAdd(add)`:

1. returns if already dead,
2. sets:
   - `alive=false`,
3. records:
   - `superBossAddsDestroyed`,
4. captures:
   - `const x=add.x`,
   - `const y=add.y`,
5. adds class:
   - `destroyed`,
6. calls:
   - `explodeAt(x,y,30)`,
7. removes Add after:
   - 90 ms.

Capturing X/Y before changing visual state is the key v2.68 position-preservation fix.

## CSS

The destroyed class changes:

- opacity,
- brightness/filter

without applying a replacement positional transform.

## QA

- Shoot each Add once.
- Verify one shot kills.
- Verify explosion occurs at actual moving position.
- Confirm no snap to origin.
- Compare incoming Add fire with four, two, one, and zero Adds.
- Fire through an Add toward core and verify Add consumes the shot.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current v3.01 Behavior

v3.01 Super Boss uses SIX equally spaced Boss-art adds in a circular orbit around its moving core. Their orbit pauses with the parent movement clock during Mega Laser. Earlier descriptions of four adds or generic paths are superseded.

See [Release History](../../RELEASE_HISTORY.md) for historical changes and superseded values.
