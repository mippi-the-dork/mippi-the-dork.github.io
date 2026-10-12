# Signal Acquired - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Signal Acquired > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards using a 3D Hero signal as navigation instead of treating the scene as decoration.

> This page is the canonical technical documentation for **Signal Acquired** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Raycast Path

On Hero pointer release, the scene raycasts against the `clickable` Signal meshes.

On a valid hit:

```js
showAchievement('signal')
```

is invoked before or alongside smooth section navigation.

## Telemetry

The interaction also records Hero Signal click telemetry and a meaningful `hero_signal` event.

## Interact Mode

If:

```text
body.interaction-hunt
```

is active, Hero professional navigation is suppressed.

The achievement therefore should not unlock from a blocked click.

## QA

- click each Hero Signal,
- verify one successful click unlocks Signal Acquired,
- enable Interact Mode,
- verify blocked Signal navigation does not count,
- disable Interact Mode,
- verify navigation returns.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
