# Rupee Pickup - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee Pickup > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a flying collectible that directly increases the player's wallet.

> This page is the canonical technical documentation for **Rupee Pickup** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Pickup Definition

Rupee is one entry in:

```js
const pickupKinds=[
  {kind:'rupee', ...},
  {kind:'heart', ...},
  {kind:'1up', ...},
  {kind:'star', ...},
  {kind:'key', ...}
];
```

## Markup

`getPickupMarkup('rupee')` returns a custom SVG using:

```text
.pickup-rupee
.pickup-fill
.pickup-line
.pickup-facet
```

The geometry is a vertically faceted gem.

## Spawn

`spawnGamePickup()` creates:

```html
<button class="game-pickup"
        data-kind="rupee"
        data-telemetry-kind="rupee">
```

The object receives a random edge-to-edge flight.

Base duration:

```text
5.2 + random 0 to 4.6 seconds
```

before shared flight multipliers.

## Collection

`handleGamePickup()` routes:

```js
def.kind==='rupee'
```

to:

```js
collectRupee();
```

`collectRupee()` calls:

```js
awardRupees(1,{
  source:'pickup',
  announce:'pickup'
});
```

## Legendary Collection

The Legendary cursor targeting system includes:

```text
.game-pickup
```

as a valid flying target.

A Legendary projectile can therefore click the Rupee automatically on hit.

## Slowpoke

The shared `setFlightDuration()` helper multiplies flight time by 1.35 when Slowpoke is equipped.

## Telemetry

Spawn and collection use the shared flying-object telemetry system.

The collection method can distinguish:

- pointer collection,
- Legendary cursor projectile,
- other forced collection routes.

## QA

- spawn with `rupee`,
- click manually,
- verify +1,
- equip Slowpoke and compare duration,
- unlock Legendary and shoot pickup,
- confirm same +1 wallet result,
- miss a pickup and verify no wallet change.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
