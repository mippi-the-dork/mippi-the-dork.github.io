# Mippi Bird Sharing - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Sharing > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the optional sharing behavior associated with the Mippi Bird experience.

> This page is the canonical design documentation for **Mippi Bird Sharing** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Mippi Bird sharing exists because arcade scores are the kind of low-stakes result players may actually want to send to someone.

The share feature should remain:

- optional,
- explicit,
- predictable.

The site intentionally does not use the operating system's generic native-share sheet.

The Windows native share experience was not considered a good fit for the portfolio.

Instead, Mippi Bird owns a small in-game share menu.

## Share Destinations

Current options:

- X,
- LinkedIn,
- Facebook,
- Copy.

The menu remains visually inside the Mippi Bird panel.

## Shared Content

The message uses the session high score:

`I scored N in Mippi Bird on Mippi's portfolio.`

It also includes the current page URL.

Using high score rather than current in-progress score means the share always represents the player's best result from the current runtime session.

## Explicit Choice

Clicking Share only opens the destination menu.

The site does not immediately open an external network.

The player chooses the platform next.

This protects against accidental external navigation.

## Copy

Copy writes:

- score text,
- current page URL

to the clipboard when the browser grants clipboard access.

## No Reward

Sharing does not award:

- Rupees,
- achievements,
- Shop items,
- progression.

It is social flavor, not an economy exploit or required task.

## Design Rules

- Always use the site's own share menu.
- Do not invoke `navigator.share`.
- External destinations open in a new tab/window.
- Copy remains local.
- Sharing is optional.
- No progression reward.
- Menu closes after a destination choice.
- Share copy reflects session high score.

## Success Criteria

The player can share a Mippi Bird score with a predictable small menu and never gets thrown into an unwanted native operating-system share experience.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
