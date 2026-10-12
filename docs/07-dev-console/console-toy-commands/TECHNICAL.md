# Console Toy Commands - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Toy Commands > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Collects playful commands such as compile, shipit, joke, particles, Lumen, Nanite, and other non-critical experiments.

> This page is the canonical technical documentation for **Console Toy Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command Ownership

Toy commands are ordinary entries in the curated `COMMANDS` registry.

They use existing site systems rather than a separate toy framework.

## Examples

### `particles`

Toggles:

```text
particle-boost
```

and starts/stops screen-space particle emission.

### `compile`

Calls:

```js
openCompile()
```

and opens the fake shader compilation experience.

### `slowmo`

Toggles shared timing modifiers for flying objects, hostile projectiles, and Mippi Bird gravity.

### `easy mode`

Increases ambient opportunity spawning.

It records assistance telemetry.

### `lumen`

Toggles the fake Lumen visualization layer.

### `nanite`

Toggles fake Nanite triangle visualization over compatible scene meshes.

### `ufo`

Spawns a forced arcade contact.

### `twinkle`

Spawns a Star pickup.

### `shroom`

Spawns a Mushroom pickup.

### `rupee`

Spawns a Rupee pickup.

### `hey listen`

Spawns a Heart pickup.

### `play`

Opens Mippi Bird.

### `vibe`

Toggles AI-themed presentation.

## Telemetry

Most player-facing commands record normal Console command telemetry.

Some toy modes also record dedicated mode or assistance counters.

## Cleanup

Temporary visual systems should own their own cleanup.

`dev clean` can be used during QA to remove several authored overlays without erasing progression.

## QA

Run every player-facing toy command from a clean state and after Legendary.

For toggle commands:

- turn on,
- verify effect,
- turn off,
- verify cleanup.

For spawn commands:

- spawn,
- interact,
- verify no duplicate stale object remains.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
