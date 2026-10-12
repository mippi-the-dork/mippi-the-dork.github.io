# Rupee Economy - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee Economy > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines how Rupees are earned, stored, spent, surfaced in the HUD, and connected to arcade and exploration systems.

> This page is the canonical design documentation for **Rupee Economy** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Rupees are the site's lightweight currency layer.

They exist to connect otherwise separate game systems into a simple economy:

- flying collectibles,
- arcade encounters,
- Castle rewards,
- the Shop,
- progression modifiers,
- the final Design Mode capstone.

The economy is intentionally small and legible.

The goal is not to simulate a deep market.

The goal is to make incidental play produce meaningful choices.

## Currency Role

Rupees answer a useful design question:

> What should happen after the player has already discovered that flying objects can be clicked?

Instead of every pickup being only a one-time joke, Rupees create repeatable value.

They encourage the player to:

- keep watching airborne opportunities,
- interact with arcade systems,
- open the Shop,
- make tradeoffs between cheap early upgrades and expensive later ones.

## Sources

Rupees can come from multiple systems.

Primary sources include:

- Rupee flying pickups,
- arcade rewards,
- Castle completion reward,
- selected authored reward events.

The exact source matters to telemetry but not to the wallet.

All sources feed the same persistent balance.

## Persistence

The wallet survives reloads.

This is important because some Shop items require several pickups or later progression before they can be purchased.

The player should not lose purchasing power because they leave the page.

## Discovery

The Rupee HUD remains hidden until the economy becomes relevant.

The first earned Rupee reveals:

- the wallet,
- the Shop concept,
- the fact that the Rupee counter can be clicked.

This keeps first-visit UI from exposing an unexplained currency before the player has seen one.

## Spending Philosophy

The Shop uses fixed base prices.

The Production Discount can later reduce remaining eligible prices.

The wallet should always display the real current amount.

Purchasing is immediate.

There is no confirmation dialog because prices are low, purchases are persistent, and the economy is intentionally playful.

## No Negative Balance

The wallet never goes below zero.

A purchase with insufficient funds is denied.

The Shop gives explicit feedback rather than silently doing nothing.

## Economy and Completion

The economy contributes to two major progression layers.

### Normal Finale

The player only needs some Shop participation.

### Postgame

`Buy the Store` requires owning every item.

This separation keeps the normal ending accessible while giving completionists a long-term reason to continue earning Rupees.

## Choice Philosophy

Early item prices create small tradeoffs.

For example:

- buy a 2-Rupee utility item now,
- save for Production Discount,
- save for Celestial Beacon,
- hold Rupees for later Legendary inventory.

The wallet milestone at 10 Rupees explicitly calls attention to this decision point.

## Design Rules

- Wallet is persistent.
- Currency never gates professional portfolio content.
- Spending never creates negative balance.
- Prices remain small enough to understand at a glance.
- Multiple gameplay systems can award the same currency.
- Shop state and wallet state persist independently.
- Production Discount affects future purchases, not already-spent Rupees.
- Completion requires ownership, not merely holding currency.

## Success Criteria

Rupees make repeated interaction feel useful without turning the portfolio into a grind-heavy economy.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
