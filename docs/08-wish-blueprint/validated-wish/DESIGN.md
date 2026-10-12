# Validated Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Validated Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Successfully routes a charged Wish through the repaired Blueprint and records the Wish as a major progression milestone.

> This page is the canonical design documentation for **Validated Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

A validated Wish is the major progression payoff of the Epic Wish puzzle.

It proves that the player has successfully connected several systems:

- Epic airspace,
- Shooting Star,
- Dev Console,
- Wish input,
- Blueprint diagnosis,
- Is Valid repair.

Once validation succeeds, the content of the Wish determines the flavor event.

The progression reward does not depend on choosing a specific phrase.

## Shared Success Consequences

Every validated Wish:

- consumes one Shooting Star charge,
- counts as a successful Wish,
- satisfies the normal Finale Wish requirement,
- plays the base Wish success effect,
- attempts Legendary unlock,
- reevaluates postgame achievements,
- resolves exactly one authored branch or the generic fallback.

This consistency matters.

The player should not be punished for making a generic Wish instead of guessing the "correct" keyword.

## Branching Philosophy

Special branches are bonus authored responses.

They are not required for Legendary.

This encourages experimentation without creating a secret-password problem.

## Branch Precedence

When Wish text matches more than one family, the first matching family wins.

The current order is:

1. Mippi
2. Blender
3. Money
4. exact Wish / Wishes
5. Engine
6. AI
7. Game
8. Doug
9. Generic

This order is part of the behavior contract.

## Base Success Effect

Before special branch presentation, the site briefly enters a Wish-granted visual state and creates a central explosion.

This gives every validated Wish one common presentation language.

## Design Rules

- Any freeform validated Wish can succeed.
- One charge is consumed before branch presentation.
- Special branches are flavor and authored payoff, not progression gates.
- Branch matching is deterministic.
- Exactly one branch resolves.
- Successful Wish satisfies normal Finale requirement.
- Legendary unlock occurs before branch spectacle.
- Generic Wish remains a valid success.

## Success Criteria

The player feels rewarded for solving the system even if their specific Wish text was not anticipated by an authored joke.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
