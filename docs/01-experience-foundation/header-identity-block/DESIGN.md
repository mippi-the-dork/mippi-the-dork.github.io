# Header Identity Block - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Header Identity Block > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the Mippi logo, name, role, and persistent identity treatment at the top of the site.

> This page is the canonical design documentation for **Header Identity Block** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The header identity block is the site's persistent anchor. It establishes who the portfolio belongs to before the visitor encounters any game systems.

It must remain compact enough to function as navigation chrome rather than becoming a second hero.

## Visible Identity

The block contains:

- the Mippi logo inside a square mark container,
- `MIPPI THE DORK`,
- `GAME DESIGNER // DESIGN DIRECTOR`.

The identity stays readable in the starting Rare theme and adapts visually as Epic and Legendary themes are selected.

## Dual Purpose

The identity block has two layers of meaning:

1. A conventional home link that returns to the top of the page.
2. A game-layer interaction through the logo mark.

The logo mark is deliberately one of the earliest hidden interactions. It teaches that ordinary portfolio surfaces can have secondary mechanical behavior.

Later, when the normal Finale is ready, the same logo mark becomes the trigger for the Finale. This reuses an already learned interaction instead of introducing a new unexplained button.

## Finale Attention State

When Finale eligibility is satisfied, the logo mark receives a visible pulse or glow.

The cue must work in:

- Rare.
- Epic.
- Legendary.

The treatment may change with theme color, but the communication must remain equivalent: the visitor should understand that the logo now wants attention.

## Music Player Relationship

After true completion, the Music Player belongs to the same header identity cluster.

Its collapsed and expanded states are positioned beneath the left side of the header, aligned to the left edge of the Mippi logo square.

This placement intentionally groups the postgame reward with the site's identity instead of with the gameplay HUD.

## Interaction Rules

- The full brand remains a normal link to the top.
- The logo mark can intercept its click for game-layer behavior.
- Finale readiness takes priority over the early logo achievement behavior.
- The identity block must remain usable when Three.js or other game systems fail.
- The Music Player must not push or reflow the header when expanded.

## Accessibility

The brand link has an accessible label identifying it as the home action.

The logo image inside the brand is decorative because the surrounding brand copy already communicates identity.

The Music Player is a separate labeled region rather than being hidden inside the brand link.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
