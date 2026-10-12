# Mippi Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Mippi Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets wishes involving Mippi as a route to the contact panel.

> This page is the canonical design documentation for **Mippi Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Mippi Wish converts a playful input into useful professional action.

If the player wishes for Mippi, the system interprets that as:

`You want Mippi available to work on your project.`

The joke lands directly in a real contact panel.

This is an example of the portfolio game layer producing professional value rather than only an easter egg.

## Trigger Family

Wish text containing:

- Mippi,
- MippiTheDork

qualifies.

This branch has highest precedence.

A Wish containing Mippi plus other recognized words should still resolve to Mippi.

## Result

The player receives:

- Console success,
- Wish Granted toast,
- Contact Mippi popup.

The popup provides:

- Discord,
- LinkedIn,
- email.

## Design Rules

- Never auto-send a message.
- Contact actions remain explicit.
- Mippi branch wins over lower-priority keywords.
- Contact panel is dismissible.
- Contact information must remain current.
- The professional contact route also remains available outside the Wish system.

## Success Criteria

The branch is funny for a moment and then immediately useful.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
