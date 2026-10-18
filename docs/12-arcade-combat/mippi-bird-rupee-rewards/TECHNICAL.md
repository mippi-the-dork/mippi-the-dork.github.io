# Mippi Bird Rupee Rewards - Technical Documentation

## Current implementation correction (v3.25.2)

At reset, `birdPreviousHigh` captures `flappySessionHighScore`. Worker score events may update the live high score without paying. The first `ended` event passes `score,birdPreviousHigh` into `rewardFlappyRound` and `birdEndedAwarded` ensures it happens once. Arithmetic: `score < previousHighScore ? 0 : score - previousHighScore + 1`.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Rupee Rewards > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Awards limited session Rupees for reaching selected Mippi Bird score milestones without allowing unlimited farming.

> This page is the canonical technical documentation for **Mippi Bird Rupee Rewards** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
## Reward Table

```js
const rewards={
  5:1,
  10:1,
  20:2
};
```

## Evaluation

Whenever score increments:

```js
maybeRewardFlappyMilestone(
  s.score
);
```

runs.

If the score is not exactly a key in the reward table, the function returns.

## Claimed Set

The current session's claimed milestones come from:

```js
sessionTelemetry.flappy
  ?.rupeeMilestones
```

If the score already exists in that array:

```js
return;
```

## Persistence Scope

Session telemetry is stored under:

```text
mippi-session-telemetry-v1
```

in `sessionStorage`.

Therefore milestone claims survive:

- Mippi Bird restart,
- closing/reopening the panel,
- page reload in the same browser session.

They do not behave as permanent local-storage rewards across a new browser session.

## Award

New milestone:

```js
telemetryUnique(
  'flappy',
  'rupeeMilestones',
  score
);

telemetryCount(
  'flappy',
  'rupeesEarned',
  amount
);
```

Then:

```js
awardRupees(
  amount,
  {
    source:'mippi_bird',
    announce:'silent'
  }
);
```

The wallet itself is persistent local storage.

## Feedback

Console:

```text
MIPPI BIRD MILESTONE //
SCORE N //
+X RUPEE(S)
```

Toast uses category:

```text
ARCADE
```

## Maximum Session Payout

Current table total:

```text
1 + 1 + 2 = 4 Rupees
```

## QA

- Fresh browser session, score 5: +1.
- Crash and score 5 again: +0.
- Reach 10: +1.
- Reach 20: +2.
- Continue above 20: no new current milestone.
- Reload same session: repeat milestones remain claimed.
- Start a genuinely new browser session and verify the per-session claim list resets.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Design Documentation](DESIGN.md)
