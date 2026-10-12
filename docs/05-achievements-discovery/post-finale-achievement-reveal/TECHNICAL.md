# Post-Finale Achievement Reveal - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Post-Finale Achievement Reveal > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds the Epic and Legendary achievement tier after the player has experienced the normal Finale and deliberately reveals it after a short delay.

> This page is the canonical technical documentation for **Post-Finale Achievement Reveal** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent Reveal Flag

The postgame reveal state uses:

```text
mippi-postgame-achievements-revealed-v1
```

## Timing

The intended delay is approximately:

```text
5 seconds
```

after the player exits the normal Finale flow.

## Trigger Paths

Both Finale choices ultimately schedule the same reveal behavior:

- Continue Exploring
- Session Report path after dismissal

## Reveal Action

When the timer completes:

1. set persistent reveal flag,
2. refresh Ledger content,
3. open Achievement Ledger,
4. show Epic and Legendary tiers.

## Duplicate Safety

If the reveal flag is already true:

- do not schedule another forced-open reveal.

## Reload Safety

If the player reloads after the reveal flag is saved, the postgame tiers remain available.

## QA

- `dev finale play`,
- Continue Exploring,
- wait about five seconds,
- verify Ledger opens,
- reload,
- verify no repeated forced reveal,
- reset,
- verify reveal state cleared.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
