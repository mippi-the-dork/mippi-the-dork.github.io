# Post-Finale Reveal Timing - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Post-Finale Reveal Timing > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Waits five seconds after the player leaves the Finale or Session Report, then force-opens the Achievement Ledger with the hidden postgame tier.

> This page is the canonical technical documentation for **Post-Finale Reveal Timing** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Timer

Runtime handle:

```js
let postgameRevealTimer=null;
```

## Schedule Function

```js
function schedulePostgameAchievementReveal(){
  if(postgameRevealed)
    return;

  window.clearTimeout(
    postgameRevealTimer
  );

  postgameRevealTimer=
    window.setTimeout(
      revealPostgameAchievements,
      5000
    );
}
```

## Reveal Guard

`revealPostgameAchievements()` immediately returns when:

```js
postgameRevealed
```

is already true.

## Persistent Reveal Key

On first reveal:

```js
postgameRevealed=true;
```

and:

```text
mippi-postgame-achievements-revealed-v1
```

is written to localStorage.

## Evaluation Before Presentation

The function captures whether Legendary was already unlocked, then calls:

```js
evaluatePostgameAchievements(
  {announce:false}
);
```

This silently recognizes every currently satisfied Epic condition.

It can also unlock the Legendary capstone because:

- postgame is now revealed,
- Finale has already been seen,
- all nine Epic conditions may already be true.

## Ledger Refresh

Then:

```js
updateAchievementProgress();
renderLedger();
openLedger();
```

and:

```js
ledger.scrollTop=0;
```

## Reveal Telemetry

```text
postgame_achievement_tier_revealed
```

Console:

```text
POSTGAME //
9 EPIC ACHIEVEMENTS +
1 LEGENDARY CAPSTONE REVEALED.
```

## Immediate 100 Percent Case

If Legendary was not previously unlocked but becomes unlocked during reveal:

```js
window.setTimeout(
  () =>
    showTransientToast(
      '100% COMPLETE',
      'You beat the website. Music Player unlocked.',
      'LEGENDARY // MUSIC PLAYER',
      'LEGENDARY ACHIEVEMENT'
    ),
  650
);
```

## Reveal Entry Points

Scheduler is called by:

```text
Finale Continue
Session Debrief Close
Session Debrief Continue
```

It is not called by `VIEW SESSION REPORT` itself.

## QA

- Continue directly from Finale and time 5 seconds.
- Choose Session Report and keep it open longer than 5 seconds.
- Verify Ledger does not open underneath it.
- Close report and time 5 seconds from close.
- Repeat after reveal and verify no second forced reveal.
- Pre-complete all nine conditions and verify Legendary capstone can resolve during reveal.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
