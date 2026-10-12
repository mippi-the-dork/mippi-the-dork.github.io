# Motion Policy - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Motion Policy > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines which motion is gameplay-critical and establishes that browser or operating-system reduced-motion preferences do not silently disable the site's playable layer.

> This page is the canonical technical documentation for **Motion Policy** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Current Runtime Flag

The current implementation sets:

```js
const reduceMotion = false;
```

Game systems reference this flag, but it is intentionally hard-coded false.

The runtime does not bind it to:

```js
window.matchMedia('(prefers-reduced-motion: reduce)')
```

## CSS Policy

`style.css` includes an explicit policy comment stating that `prefers-reduced-motion` does not alter the playable layer.

There is no active CSS media query that disables the core motion systems based on the operating-system preference.

## Systems Referencing `reduceMotion`

The flag is checked by multiple systems, including:

- Director opportunity spawning,
- Dynamic Objective eligibility,
- regular UFO spawning,
- Boss and Super Boss opportunity logic,
- Doug Bone spawning,
- Legendary opportunity guarantees,
- ambient canvas initialization,
- Hero and About animation loops.

Because the flag is fixed false, those systems remain active.

## Three.js

Hero and About scene animation loops contain `if (!reduceMotion)` branches. With the current policy, the animation path always runs when the scene itself initializes successfully.

## QA

Test twice:

1. OS/browser reduced-motion preference disabled.
2. OS/browser reduced-motion preference enabled.

Expected result:

- same flying-object opportunities,
- same arcade availability,
- same Hero and About scene motion,
- same Dynamic Objective eligibility,
- same progression capability.

Any difference caused only by the browser motion preference is a regression against the current policy.

## Future Change Warning

If the product later introduces an authored motion-accessibility mode, do not simply wire `reduceMotion` to `matchMedia`.

A safe redesign must also define substitute behavior for systems whose gameplay depends on movement, spawn timing, or visual trajectory.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
