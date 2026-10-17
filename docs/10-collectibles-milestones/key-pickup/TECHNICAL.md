# Key Pickup - Technical Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Key Pickup > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the collectible needed to advance Castle checks.

> This page is the canonical technical documentation for **Key Pickup** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)
## Standard Pickup

Key is part of the normal `pickupKinds` list:

```js
{kind:'key', ...}
```

Its custom SVG is created by:

```js
getPickupMarkup('key')
```

## Natural Selection

`choosePickupDefinition()` immediately avoids Keys when:

```js
castleQuestActive ||
activeCastle
```

and chooses only non-Key pickups.

## Key Pity

Outside an active Castle state, Key selection uses:

- random chance,
- pity counter.

Normal pity threshold:

```text
3 pickups since Key
```

Lucky Charm:

```text
2 pickups since Key
```

Random Key chance:

```text
26 percent normal
36 percent Lucky Charm
```

When a Key is selected:

```js
pickupsSinceKey=0;
```

## Collection

`handleGamePickup()` increments:

```text
economy.keysCollected
```

then routes Key to:

```js
activateCastleQuest();
```

## Activate Castle Quest

The function exits if:

```js
castleQuestActive ||
activeCastle
```

Otherwise:

```js
castleQuestActive=true;
```

It refreshes Castle HUD and prints:

```text
KEY ITEM // A small castle has appeared somewhere between sections.
```

Then schedules:

```js
spawnCastle()
```

after 500 ms.

## DEV

```text
dev pickup key
```

can force a Key.

The natural no-duplicate rule is primarily enforced by pickup selection and `activateCastleQuest()`.

## QA

- collect Key,
- verify Castle meter becomes visible,
- verify Castle appears after about 500 ms,
- leave Castle unclicked and wait for natural pickups,
- verify no natural second Key is selected,
- click Castle,
- collect another Key,
- verify next Castle cycle.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Design Documentation](DESIGN.md)


## Current v3.01 Behavior

v3.01 only one hidden Key remains stationary at bottom-right of a content panel and scrolls with it until clicked, then activates Castle quest.
