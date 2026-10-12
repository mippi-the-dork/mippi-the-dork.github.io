# Finale Sequence - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Sequence > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Runs the authored full-screen ending, records Finale history, and presents either Continue Exploring or the optional Session Report.

> This page is the canonical design documentation for **Finale Sequence** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Open-ended systems still deserve authored closure.

The portfolio can be explored indefinitely.

The player can:

- keep collecting,
- keep changing themes,
- keep using Console toys,
- keep fighting arcade encounters,
- keep chasing postgame mastery.

The Finale provides a moment where the site says:

> You reached a meaningful stopping point.

It is short, deliberate, and authored.

## Sequence Structure

The ending unfolds in four beats.

### Beat 1

```text
THANKS FOR PLAYING.
```

### Beat 2

```text
THANKS FOR PLAYING.
This was supposed to be a portfolio.
```

### Beat 3

```text
THANKS FOR PLAYING.
It got away from us.
```

### Identity

```text
MIPPI THE DORK
GAME DESIGNER
PLAYER PROFILE // <current model>
```

The final identity state also reveals the choice buttons.

## Timing

The full authored reveal takes roughly 5.7 seconds before interaction returns.

That is long enough to feel like an ending and short enough not to become an unskippable cinematic.

## Player Model

The identity card includes the current Player Model label.

This makes the ending acknowledge how the visitor used the portfolio.

The model is computed at Finale start.

It is descriptive, not evaluative.

## Input Lock

While the Finale is active, normal page content cannot receive pointer input.

The overlay owns interaction.

This avoids accidental portfolio clicks under the full-screen ending.

## Cursor Restoration

The Finale explicitly restores a normal visible browser cursor.

This matters because the site can have:

- Mushroom cursor scaling,
- custom power cursor visuals,
- other game-layer cursor treatments.

The player must be able to see and use the two ending buttons reliably.

## Exit Choices

The identity state reveals:

- `VIEW SESSION REPORT`
- `CONTINUE EXPLORING`

Neither resets progression.

The Finale never locks the user out of the portfolio after completion.

## Persistence

Starting the Finale immediately records:

```text
Finale seen
```

The player does not need to click one of the final buttons before the viewed state becomes true.

This viewed state is part of the later True Completion requirement.

## Design Rules

- Full-screen authored closure.
- Keep the sequence short.
- Preserve the comedic "portfolio got away from us" line.
- Compute Player Model at Finale start.
- Record Finale seen immediately on start.
- Restore a normal visible cursor.
- Block underlying pointer interaction while active.
- Reveal controls only on identity beat.
- Never reset progression when the Finale ends.
- Always offer Continue Exploring.

## Success Criteria

The player receives a clear authored ending while still understanding that the portfolio remains explorable afterward.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
