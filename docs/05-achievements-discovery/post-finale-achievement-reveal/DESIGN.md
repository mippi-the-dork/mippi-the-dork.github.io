# Post-Finale Achievement Reveal - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Post-Finale Achievement Reveal > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adds the Epic and Legendary achievement tier after the player has experienced the normal Finale and deliberately reveals it after a short delay.

> This page is the canonical design documentation for **Post-Finale Achievement Reveal** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The normal Finale should feel like a real ending.

The postgame achievement tier should not undercut that moment immediately.

The reveal therefore waits until the player has left the ending and had a brief moment back in the portfolio.

Then the Ledger opens and reveals:

- nine Epic goals,
- one Legendary capstone.

This creates a classic postgame feeling:

`You finished it. There is more if you want it.`

## Trigger Paths

The reveal occurs after either:

- Continue Exploring,
- View Session Report, then closing the report.

The delay is approximately five seconds after returning from the ending flow.

## One-Time Nature

The forced reveal should happen once.

After the player has seen the postgame tier, later visits should not keep force-opening the Ledger.

## Design Rules

- Do not reveal postgame goals before the normal Finale.
- Let the Finale breathe before opening the Ledger.
- Make the new tier visually obvious.
- Preserve player agency after the one-time reveal.
- Store reveal state persistently.

## Success Criteria

The player experiences the normal ending as closure, then discovers a voluntary mastery layer instead of feeling like the ending was fake.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
