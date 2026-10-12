# Normal Finale Eligibility - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Normal Finale Eligibility > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the broad engagement requirements for reaching the authored normal Finale without requiring 100 percent completion.

> This page is the canonical technical documentation for **Normal Finale Eligibility** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Eligibility Helper

The authoritative v2.78 function is:

```js
function finaleEligibility(){
  return {
    signals:
      unlockedAchievements.size ===
      ACHIEVEMENT_KEYS.length,

    legendary:
      legendaryUnlocked,

    wish:
      finaleWishSatisfied,

    boss:
      finaleBossSatisfied,

    hearts:
      heartCount>=5,

    shop:
      shopOwned.size>0,

    sections:
      finaleVisitedSections()>=5
  };
}
```

## Final Boolean

```js
function finaleEligible(){
  return Object.values(
    finaleEligibility()
  ).every(Boolean);
}
```

## Signals

The Signal gate compares:

```text
unlockedAchievements.size
```

against:

```text
ACHIEVEMENT_KEYS.length
```

which is 10 in v2.78.

## Legendary

The authoritative progression flag is:

```js
legendaryUnlocked
```

This is independent of whether the current visual theme is Rare, Epic, or Legendary.

## Wish

Runtime state:

```js
finaleWishSatisfied
```

Startup reconstructs it from either:

```text
mippi-finale-wish-v1
```

or a successful Wish recorded in current session telemetry.

A validated Wish writes the persistent key.

## Boss

Runtime state:

```js
finaleBossSatisfied
```

Startup reconstructs it from:

```text
mippi-finale-boss-v1
```

or current-session telemetry for:

- normal Boss defeat,
- Super Boss defeat.

Both Boss types write the same persistent Finale Boss key on victory.

## Hearts

The condition is exactly:

```js
heartCount>=5
```

It does not inspect:

```text
heartRewardShown
```

or:

```text
mippi-heart-reward-v1
```

for Finale eligibility.

## Shop

Condition:

```js
shopOwned.size>0
```

Any one canonical owned Shop item is sufficient.

## Professional Sections

```js
function finaleVisitedSections(){
  return [
    'games',
    'career',
    'consulting',
    'crafting',
    'tools',
    'about'
  ].filter(
    id =>
      (
        Number(
          sessionTelemetry
            .sections?.[id]?.visits
        )||0
      )>0
  ).length;
}
```

The Hero is not part of this six-section Finale count.

## Current Persistence Nuance

Because normal Finale section count reads session telemetry, it survives reloads within the same browser session through sessionStorage but is not the same long-term persistence model used by postgame Grand Tour.

Postgame Grand Tour uses:

```text
mippi-postgame-sections-v1
```

in localStorage.

## DEV

```text
dev finale ready
dev finale play
```

force a complete normal Finale-ready state for QA.

## QA

Test each gate independently:

- 9/10 Signals,
- Legendary false,
- Wish false,
- Boss false,
- 4 Hearts,
- zero Shop items,
- four visited professional sections.

For each, verify the Finale does not arm.

Then satisfy only that missing condition and verify eligibility becomes true.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
