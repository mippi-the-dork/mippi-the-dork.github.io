# Post-Finale Reveal Timing - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Post-Finale Reveal Timing > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Waits five seconds after the player leaves the Finale or Session Report, then force-opens the Achievement Ledger with the hidden postgame tier.

> This page is the canonical design documentation for **Post-Finale Reveal Timing** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The postgame tier should not appear inside the Finale.

The ending needs a moment to land.

If the site immediately opened ten new achievements the instant the player clicked Continue, the emotional sequence would become:

```text
Thanks for playing.
Now here is another checklist.
```

The five-second gap creates separation.

The player returns to the portfolio.

Then the site reveals:

> The normal ending was not 100 percent completion.

## Reveal Trigger Points

The timer begins after one of these actions:

- Continue Exploring from the Finale,
- Continue Exploring from Session Report,
- closing Session Report with X.

Choosing View Session Report from the Finale does not start the timer immediately.

The timer waits until the report itself is closed or continued.

This prevents the Ledger from opening behind the report.

## Reveal Delay

Current delay:

```text
5 seconds
```

The timer is reset if the scheduling helper is called again before it fires.

There is only one reveal.

## Forced Ledger Open

When the reveal occurs:

- postgame reveal state becomes persistent,
- current postgame conditions are evaluated silently,
- Ledger content rerenders,
- Achievement Ledger is opened,
- scroll position is moved to the top,
- the new Legendary capstone and nine Epic achievements appear above the original Rare tier.

This is an authored reveal.

The player does not have to manually rediscover the Ledger.

## Retroactive Completion

The system evaluates postgame conditions before opening.

If the player already completed some postgame challenges naturally before the tier was revealed, those achievements appear as already complete.

This avoids making the player repeat:

- max Coolness,
- Castle run,
- Super Boss,
- section visits,
- other historical conditions.

## 100 Percent Edge Case

It is possible for all nine Epic postgame conditions and Finale seen to already be true before the reveal.

In that case the Legendary capstone can unlock during the reveal evaluation.

A dedicated toast follows shortly after:

```text
100% COMPLETE
You beat the website. Music Player unlocked.
```

## Persistence

After reveal, the tier stays visible on future visits until full reset.

The five-second reveal sequence does not repeat.

## Design Rules

- Never reveal postgame tier before Finale.
- Wait five seconds after the player actually leaves Finale/report.
- Do not reveal behind Session Report.
- Force-open Ledger when revealed.
- Scroll Ledger to top.
- Evaluate historical conditions before presentation.
- Reveal only once until reset.
- Preserve tier on future loads.

## Success Criteria

The postgame layer feels like a deliberate "one more thing" after the ending rather than an interruption of the ending itself.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
