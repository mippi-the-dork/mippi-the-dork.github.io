# Legendary Unlock - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Legendary Unlock > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks Legendary progression after the player successfully completes the validated Wish path.

> This page is the canonical technical documentation for **Legendary Unlock** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Authority

Legendary state uses:

```js
let legendaryUnlocked=false;
```

loaded from:

```text
mippi-legendary-unlocked
```

## Unlock Function

`unlockLegendaryMode()` first checks:

```js
unlockedAchievements.size ===
ACHIEVEMENT_KEYS.length
```

If Rare progression is incomplete it prints:

```text
LEGENDARY THEME // Epic progression is still incomplete.
```

and returns false.

## Persistence

On success:

```js
legendaryUnlocked=true;
localStorage.setItem(
  LEGENDARY_UNLOCK_KEY,
  '1'
);
```

## Immediate Theme

The function calls:

```js
applyThemeMode('legendary');
```

This changes presentation but is not the authority for gameplay.

## Dependent Refreshes

It then refreshes:

- Design Mode availability,
- Shop if open,
- Meta Trace,
- progression HUD,
- Ledger,
- postgame achievement evaluation.

## First-Unlock Presentation

Only when transitioning from false to true:

```js
telemetryMeaningful('legendary_unlocked');
```

runs.

Console prints:

```text
LEGENDARY THEME UNLOCKED // rarity upgraded to gold.
```

A toast explains that:

- Golden Trigger is revealed,
- Shop capstone can eventually unlock Design Mode.

## Validated Wish Ordering

`grantValidatedWish()` calls:

```js
playWishSuccess();
unlockLegendaryMode();
evaluatePostgameAchievements();
```

before resolving keyword-specific Wish branches.

## Repeated Wishes

Once Legendary is already true:

- a later successful Wish still resolves its branch,
- the unlock helper does not replay first-unlock celebration.

## QA

- `dev signals 9`,
- attempt direct Legendary helper path through available QA,
- verify refusal,
- reach 10/10,
- complete validated Wish,
- verify persistence,
- cycle to Rare,
- verify Legendary gameplay remains,
- reload,
- verify entitlement and preferred theme behavior.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
