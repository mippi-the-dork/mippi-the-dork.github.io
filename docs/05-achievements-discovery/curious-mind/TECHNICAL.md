# Curious Mind - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Curious Mind > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards clicking the Mippi header logo and teaches that apparently decorative UI may be interactive.

> This page is the canonical technical documentation for **Curious Mind** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Interaction Hook

`script.js` attaches a click listener to:

```text
.brand-mark
```

The handler prevents the parent brand anchor from also navigating when the mark itself is being used for the game interaction.

## Priority

If Finale is ready:

```js
finaleReady
```

the same click starts the Finale instead of replaying the early discovery behavior.

Otherwise the logo Signal path can unlock Curious Mind.

## Persistence

The achievement is stored through the shared Rare achievement system.

No dedicated storage key exists for Curious Mind.

## QA

- fresh state: click Mippi mark,
- verify Curious Mind unlocks,
- click again,
- verify no duplicate unlock,
- force Finale-ready,
- click mark,
- verify Finale takes priority.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
