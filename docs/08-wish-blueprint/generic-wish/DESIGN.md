# Generic Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Generic Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a safe fallback response for validated Wish text that does not match an authored special branch.

> This page is the canonical design documentation for **Generic Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Wish system must not become a secret phrase guessing game.

A player who solves the entire progression puzzle and enters an original sentence should still succeed.

Generic Wish is the guarantee that freeform input remains valid.

## Result

If no authored family matches, the site responds:

`Wish granted. Reality has been updated within acceptable tolerances.`

A supporting toast confirms:

`The reference was valid. The runtime survived.`

This intentionally keeps the result lighter than the bespoke branches.

## Progression

Generic Wish receives the exact same shared progression consequences as every other validated Wish.

It:

- spends the charge,
- counts as successful,
- satisfies the normal Finale Wish requirement,
- triggers the base success treatment,
- unlocks Legendary when eligible,
- can satisfy Reality Validated in postgame.

## Why No Generated Response

The site does not send the Wish to an AI service or external backend.

Generic Wish is deterministic and local.

This keeps the portfolio:

- static-host compatible,
- private,
- predictable,
- safe from network dependency.

## Design Rules

- Generic is always valid after Blueprint validation.
- Never tell the player their unrecognized Wish was wrong.
- Do not require special keywords for progression.
- Keep fallback concise.
- No external service call.
- Exactly one branch should resolve.

## Success Criteria

A player can type any sensible or ridiculous Wish and still feel that solving the Wish system mattered.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
