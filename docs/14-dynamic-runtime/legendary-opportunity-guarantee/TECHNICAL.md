# Legendary Opportunity Guarantee - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Legendary Opportunity Guarantee > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents Legendary gameplay from entering dead air by forcing a legal ambient opportunity after a short calm gap.

> This page is the canonical technical documentation for **Legendary Opportunity Guarantee** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Function

```js
directorLegendaryGuarantee()
```

runs from the Director's 900 ms maintenance interval.

## Gates

It returns when any are true:

```text
Legendary gameplay not unlocked
reduced motion active
attention blocked
```

## Existing Ambient

```js
if(
  directorAmbientVisible()
){
  directorRuntime
    .lastFriendlyAmbientAt =
      Date.now();

  return;
}
```

Visible ambient selector:

```text
.shooting-star
.galaga-secret
.game-pickup
.doug-bone
```

## Idle Calculation

```js
const idleFor =
  now -
  Math.max(
    lastFriendlyAmbientAt,
    lastOpportunityAt,
    lastLegendaryGuaranteeAt
  );
```

All missing timestamps fall back to zero.

## Threshold

```js
if(idleFor<2600)
  return;
```

The hard idle requirement is therefore:

```text
2.6 seconds
```

## Spawn

The guarantee calls:

```js
directorSpawnOpportunityByPriority(
  null,
  {force:true}
);
```

This differs from general anti-drought.

The Legendary guarantee intentionally uses `force:true` after its own legality/attention checks so that long natural scheduler gates cannot recreate dead air.

## Success State

On successful spawn:

```js
directorRuntime
  .lastLegendaryGuaranteeAt =
    now;
```

and:

```text
sessionTelemetry.director.legendaryGuarantees
```

is incremented.

## Priority

With no explicit preferred type, the helper attempts in this order based on what is legal:

1. Shooting Star if Wish system exists, no charge is held, and Epic gameplay is active.
2. Doug Bone if Doug is in command.
3. Standard pickup.
4. Regular UFO if no Boss/Super Boss/calm conflict exists.

The first successful attempt returns.

## Maintenance Cadence

Startup:

```js
setInterval(
  () => {
    directorFlushBlockedAmbient();
    directorLegendaryGuarantee();
  },
  900
);
```

The exact spawn can therefore occur slightly after the 2.6-second threshold depending on interval phase.

## QA

- Unlock Legendary.
- Clear all flying objects.
- Keep screen calm.
- Verify opportunity appears after roughly 2.6 to 3.5 seconds.
- Hold a Wish charge and confirm Shooting Star is skipped.
- Put Doug In Command and inspect candidate behavior.
- Open Shop and hold for several seconds.
- Confirm guarantee waits.
- Close Shop and confirm it resumes.
- Switch visual theme to Rare and verify guarantee remains active.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
