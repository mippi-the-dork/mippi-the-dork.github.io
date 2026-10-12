# Shop Discovery - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Discovery > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Controls when the Shop becomes meaningful and how the player is taught that Rupees can be spent.

> This page is the canonical design documentation for **Shop Discovery** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Shop should not appear as an unexplained permanent interface on a first visit.

The player first discovers currency.

Then the site explains spending.

This makes the economy feel like a discovered layer of the portfolio rather than a storefront that was always demanding attention.

## First Rupee Flow

On first currency acquisition:

1. wallet becomes visible,
2. Console reports the pickup,
3. a `WALLET UNLOCKED` toast appears,
4. the toast explains that the Rupee counter can be clicked,
5. it also mentions the `shop` Console command.

This gives both pointer and Console-oriented players a route.

## Returning Players

If the player already has:

- wallet balance,
- Shop ownership,

the economy is considered discovered at startup.

The site does not replay the first-pickup tutorial unnecessarily.

## Direct Console Discovery

A player can type:

```text
shop
```

before naturally earning a Rupee.

Browsing with zero Rupees is allowed.

The Shopkeeper explicitly says:

`Browsing remains aggressively free.`

This is intentional.

Curiosity is not blocked.

## Why Browsing Is Allowed

Hiding the Shop completely until the first Rupee would make the Console command inconsistent and could frustrate players who discover the command first.

The discovery state therefore controls persistent HUD visibility and onboarding, not access permission.

## Design Rules

- First Rupee teaches spending.
- Returning state reconstructs discovery.
- Shop can still be opened directly with `shop`.
- Browsing costs nothing.
- No forced Shop popup on first Rupee.
- Affordability attention begins only after discovery.

## Success Criteria

The economy reveals itself naturally while still rewarding players who discover the Shop through the Console first.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
