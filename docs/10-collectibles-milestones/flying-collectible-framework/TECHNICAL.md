# Flying Collectible Framework - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Flying Collectible Framework > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the shared spawning, movement, lifetime, interaction, and collection behavior used by friendly flying game-layer objects.

> This page is the canonical technical documentation for **Flying Collectible Framework** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Standard Pickup Definitions

The standard pickup list is:

```js
const pickupKinds=[
  {kind:'rupee', ...},
  {kind:'heart', ...},
  {kind:'1up', ...},
  {kind:'star', ...},
  {kind:'key', ...}
];
```

`1up` is the internal kind used for the Mushroom pickup.

## Natural Spawn

`spawnGamePickup(forcedKind=null,force=false)` rejects a natural spawn when:

```js
!epicGameplayUnlocked()
```

or motion policy blocks the system.

It then asks:

```js
directorAllowsAmbient('pickup',{force})
```

before continuing.

DEV-forced pickups can bypass normal Epic progression through `force=true`.

## Pickup Selection

If `forcedKind` is supplied, the function selects that exact definition.

Otherwise:

```js
choosePickupDefinition()
```

selects from the natural pool.

Key selection has additional pity and Castle-state rules.

## DOM Object

The standard object is:

```html
<button class="game-pickup"
        data-kind="<kind>"
        data-telemetry-kind="<kind>">
```

The button receives custom SVG markup from:

```js
getPickupMarkup(kind)
```

## Flight

The object gets:

```js
const f=randomEdgeFlight(100);
```

and custom properties:

```text
--dx
--dy
--angle
--dur
```

Base standard pickup lifetime:

```text
5.2 + random 0 to 4.6 seconds
```

before shared modifiers.

## Shared Duration

`setFlightDuration(el,seconds)` stores:

```js
el.dataset.baseDuration=String(seconds);
```

and applies:

```text
seconds
* Director flight multiplier
* Slowpoke multiplier
* Slowmo multiplier
```

Slowpoke multiplier:

```text
1.35
```

Slowmo multiplier:

```text
2
```

## Animation-Owned Removal

`removeWhenFlightEnds(el)` waits for:

```text
animationend
```

rather than a fixed timeout.

If the element still exists and has a telemetry kind:

```js
telemetryFlyingMiss(kind)
```

is recorded before removal.

This was specifically designed so Slowmo cannot make an actor disappear halfway through its path.

## Collection Router

The click handler calls:

```js
handleGamePickup(def,item)
```

That function:

1. determines collection method,
2. records flying-object telemetry,
3. records economy telemetry for selected types,
4. creates an explosion at the object's current screen position,
5. routes to the correct feature reward,
6. removes the object.

Current routing:

```text
heart  -> collectHeart()
1up    -> advanceCursorPower()
star   -> activateStarPower()
rupee  -> collectRupee()
key    -> activateCastleQuest()
```

Mushroom life progression is recorded before `advanceCursorPower()`.

## Scheduler

Natural pickup scheduling uses:

```js
nextNaturalPickupDelay()
```

Normal:

```text
Director-adjusted 13 to 26 seconds
```

Easy Mode:

```text
2.6 to 5.8 seconds
```

If a spawn is blocked, the scheduler uses shorter retry windows instead of discarding the opportunity for a full cycle.

Examples include:

- Epic not unlocked: 4.5 seconds,
- attention blocked: 1.2 seconds,
- other failure: 3.2 seconds.

## Legendary Collection

Legendary cursor targeting includes:

```text
.game-pickup
```

as a valid target family.

A successful Legendary projectile ultimately invokes the same click route.

## Star Power Collection

Star Power checks the object beneath the current pointer with:

```js
document.elementFromPoint(...)
```

and includes:

```text
.game-pickup
```

in its allowed target selector.

It marks telemetry collection method as:

```text
star_power
```

before invoking the same click handler.

## DEV

Available forced pickup commands:

```text
dev pickup heart
dev pickup rupee
dev pickup star
dev pickup 1up
dev pickup key
```

Player-facing shortcuts also include selected pickup commands such as:

```text
rupee
shroom
twinkle
hey listen
```

## QA

Test every standard pickup through:

- direct click,
- Star Power contact,
- Legendary projectile where supported,
- forced DEV spawn,
- natural spawn.

Also verify:

- Slowpoke,
- Slowmo,
- attention blocking,
- animation-end miss telemetry,
- Interact Mode.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
