# Doug Bone Pickup - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Doug Bone Pickup > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Feeds the Doug Coolness progression and can trigger special Doug responses and system combinations.

> This page is the canonical technical documentation for **Doug Bone Pickup** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Natural Gate

`spawnDougBone(force=false)` first checks:

```js
dougCard?.classList.contains(
  'doug-command'
)
```

and motion policy.

It then asks:

```js
directorAllowsAmbient(
  'bone',
  {force}
)
```

## DOM Object

The Bone is:

```html
<button class="doug-bone"
        aria-label="Doug-approved bone pickup">
```

with a custom inline SVG.

Telemetry kind:

```text
bone
```

## Flight

Base lifetime:

```text
5.4 + random 0 to 3.8 seconds
```

then shared flight multipliers apply through `setFlightDuration()`.

## Collection

Clicking the Bone:

1. records collection method,
2. explodes at Bone position,
3. calls `collectDougBone(method)`,
4. stops cool visual trail,
5. removes the Bone.

## Coolness

`collectDougBone()` increments:

```js
dougBoneCount++;
```

Normal:

```js
addDougCoolness(
  25,
  {source:'bone'}
);
```

During Star Power:

```js
addDougCoolness(
  50,
  {source:'star_power_bone'}
);
```

## Combo

Star-powered collection increments:

```text
combos.starPowerDoug
```

and announces:

```text
Star Power + Doug
```

## Character Feedback

If Doug is visible:

```js
reactDoug(...)
burstDougPaws(...)
```

If not:

```js
showDougPeek(...)
```

## Cool Bone Visual

`setDougBoneCoolVisual(bone,active)` toggles:

```text
cool-bone
```

and can start an 85 ms rainbow trail interval.

The interval self-cleans if the Bone is removed or loses cool state.

## Natural Scheduling

Easy Mode:

```text
3 to 7 seconds
```

Dog Whistle:

```text
Director-adjusted 4.3 to 9.3 seconds
```

Normal:

```text
Director-adjusted 7 to 15 seconds
```

## Telemetry

Bone collection updates:

```text
economy.bonesCollected
```

and the shared flying-object telemetry.

## QA

- no Doug command: natural Bone does not spawn,
- activate Doug command,
- collect normal Bone: +25,
- activate Star Power and collect Bone: +50,
- move away from Doug and collect: peek feedback,
- enable Cool Mode and inspect rainbow Bone trail,
- equip Dog Whistle and compare cadence.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
