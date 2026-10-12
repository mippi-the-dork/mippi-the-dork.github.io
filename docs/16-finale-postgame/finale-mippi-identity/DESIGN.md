# Finale Mippi Identity - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Mippi Identity > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Resolves the ending onto a white Mippi logo, MIPPI THE DORK identity, role, and the current Player Model.

> This page is the canonical design documentation for **Finale Mippi Identity** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Finale begins as a game ending and resolves back into a professional identity.

That transition is the point.

After the site spends several minutes behaving like:

- an arcade game,
- a progression system,
- a Shop,
- a Blueprint puzzle,
- a debug playground,

the ending ultimately says:

```text
MIPPI THE DORK
GAME DESIGNER
```

The portfolio becomes about the person again.

## White Mark

The final identity screen shows the Mippi logo above the name.

The mark is rendered white.

This avoids tying the final identity card too strongly to whichever rarity palette happens to be active.

The Player Model line still uses theme-accent color underneath.

## Visual Hierarchy

Final state:

1. white Mippi mark,
2. `MIPPI THE DORK`,
3. `GAME DESIGNER`,
4. `PLAYER PROFILE // ...`,
5. ending choices.

The role is intentionally reduced to the simple core identity.

The site's longer professional titles remain available in normal content.

## Player Profile

The current mutable Player Model remains visible.

This creates a two-sided ending:

### Who made the portfolio

Mippi the Dork, Game Designer.

### How you used it

Your current Player Model.

The visitor becomes part of the final presentation without their behavior replacing the professional identity.

## Cursor Reliability

The identity state is also the moment where the player must make a choice.

The visible native cursor is therefore part of the presentation requirement.

The buttons must remain easy to select regardless of prior game-layer cursor state.

## Design Rules

- Show actual Mippi logo.
- Render the mark white.
- Position logo above identity text.
- Use `MIPPI THE DORK`.
- Use `GAME DESIGNER`.
- Show Player Model beneath.
- Keep visual identity readable in every rarity.
- Do not let custom cursor effects obscure choice buttons.

## Success Criteria

The final frame feels like the game layer collapsing back into a clean professional signature.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
