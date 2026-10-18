# Mippi Bird - Design Documentation

## Current implementation correction (v3.25.2)

**Current design (v3.25.2).** Mippi Bird is a one-button optional Canvas minigame. A round begins with one base Life plus any per-round Shop Life and purchased refill bank. The last valid hit ends the round. Its game-over/score logic follows the worker's simulation, while the page displays the same themed Bird animation, visual score, Lives and controls. The side game should not degrade portfolio scrolling, navigation, or FPS when closed.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the embedded arcade minigame launched from the console.

> This page is the canonical design documentation for **Mippi Bird** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Mippi Bird is a deliberately narrow side game.

The portfolio already contains many systems.

The minigame should not become another sprawling progression tree.

Its core rule is intentionally familiar:

```text
click to flap
survive the rectangles
```

The game adds:

- fast failure,
- immediate restart,
- a high score,
- a few cross-system rewards.

Then it stops.

## Launch

The player launches the minigame with:

```text
play
```

from the Dev Console.

DEV QA can also open it directly.

The game appears as a focused panel rather than navigating away from the portfolio.

## One-Button Input

The canvas uses one pointer input.

### Before Start

Click begins the run and flaps.

### During Play

Every click applies upward velocity.

### After Game Over

Click resets the round, starts immediately, and flaps.

There is almost no restart friction.

## Core Physics

Mippi stays at a fixed horizontal position.

The game world moves left.

The player manages vertical position through:

- gravity,
- flap velocity.

Pipes use a fixed vertical gap size but randomized gap centers.

## Score

A point is awarded after a pipe fully passes the player's horizontal position.

The current score and high score are visible in the panel header/footer.

## Visual Identity

The player is the Mippi logo itself.

The canvas draws:

```text
assets/mippi-logo-blue.png
```

directly.

A vector fallback approximates the logo if the image has not decoded yet.

The fallback prevents the player from becoming a generic square during image-load timing.

## Theme

The background grid, pipes, edges, and accents adapt to:

- Rare,
- Epic,
- Legendary.

The Mippi image itself remains crisp rather than being broadly canvas-tinted.

## Cross-System Connections

Mippi Bird interacts with:

- Slowmo,
- Shop Extra Life,
- Mushroom banked lives,
- Rupee economy,
- Player Model,
- Session Report,
- Sharing.

These are enough connections to make the minigame relevant without turning it into a separate progression product.

## Attention

While Mippi Bird is open, it counts as a focused-attention surface.

The Director and Finale invitation should not compete with it.

## Exit

The player can click:

`QUIT`

at any time.

Closing stops the animation loop.

## Design Rules

- One-button control.
- Immediate failure feedback.
- Click-to-restart with almost no friction.
- No weapon system.
- No separate inventory.
- Use existing Shop/Mushroom life systems only.
- Limited Rupee rewards prevent farming.
- Theme follows current site rarity.
- Quit is always available.
- Mippi Bird never gates professional content or the normal Finale.

## Success Criteria

Mippi Bird feels like a compact portfolio toy that is fun to replay but disciplined enough not to become a second game project inside the site.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current v3.04 Specification

v3.04 Mippi Bird keeps the original Mippi logo silhouette but recolors it to Rare blue `#67cfff`, Epic pink `#ff6bd2`, Legendary gold `#ffd16b`; switching rarity while the minigame is open updates the art, not game physics.
