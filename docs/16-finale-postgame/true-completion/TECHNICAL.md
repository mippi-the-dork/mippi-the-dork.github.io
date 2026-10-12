# True Completion - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > True Completion > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines 100 percent completion as all nine Epic postgame achievements plus a viewed Finale, then awards the Legendary capstone.

> This page is the canonical technical documentation for **True Completion** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Epic Key Set

Canonical array:

```js
const POSTGAME_EPIC_KEYS=[
  'post_signals',
  'post_cool',
  'post_legendary',
  'post_wish',
  'post_hearts',
  'post_shop',
  'post_castles',
  'post_sections',
  'post_superboss'
];
```

## Legendary Key

```js
const POSTGAME_LEGENDARY_KEY=
  'post_complete';
```

## Condition Resolver

```js
postgameEpicCondition(key)
```

maps:

```text
post_signals    all 10 Rare Signals
post_cool       postgameCoolMaxed
post_legendary  legendaryUnlocked
post_wish       finaleWishSatisfied
post_hearts     heartCount >= 5
post_shop       every SHOP_ITEMS item owned
post_castles    postgameCastleComplete
post_sections   all 6 POSTGAME_MAJOR_SECTIONS visited
post_superboss  postgameSuperBossDefeated
```

## Persistent Postgame State

Keys:

```text
mippi-postgame-sections-v1
mippi-postgame-cool-maxed-v1
mippi-postgame-castle-complete-v1
mippi-postgame-superboss-v1
mippi-postgame-achievements-revealed-v1
mippi-postgame-achievements-v1
```

## Epic Unlock Evaluation

`evaluatePostgameAchievements()` evaluates all nine Epic conditions whether or not the tier has already been revealed.

The achievement keys can therefore be stored as completed before the player sees them.

Announcement toasts are suppressed until reveal.

## Legendary Gate

Legendary capstone evaluation is stricter:

```js
const allEpic=
  POSTGAME_EPIC_KEYS.every(
    key =>
      unlockedPostgameAchievements
        .has(key)
  );

if(
  postgameRevealed &&
  finaleSeen &&
  allEpic
){
  ...
}
```

All three are required:

```text
postgame revealed
Finale seen
all nine Epic unlocked
```

## Legendary Unlock

On first capstone unlock:

```js
unlockPostgameAchievement(
  POSTGAME_LEGENDARY_KEY,
  {announce}
);
```

If new:

```js
unlockMusicPlayer(
  {announce}
);
```

## Ledger Count

Before reveal:

```text
10 total
```

After reveal:

```text
20 total
```

The visible count becomes:

```text
Rare achievements
+
postgame unlocks
```

## Persistence

Unlocked postgame keys are saved to:

```text
mippi-postgame-achievements-v1
```

## DEV

```text
dev postgame reveal
dev postgame complete
dev music
```

support late-game QA.

## QA

- Reveal postgame with zero postgame Epic completions.
- Complete each Epic independently.
- Verify capstone remains locked until all nine.
- Complete all nine before Finale and verify Finale seen is still required.
- Complete all nine before reveal and verify capstone resolves during reveal after Finale.
- Reload after 100 percent and verify capstone/Music Player persistence.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
