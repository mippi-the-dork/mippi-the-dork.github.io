# First-Discovery Onboarding - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > First-Discovery Onboarding > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Introduces the existence of hidden Signals after the player has had enough time to encounter the site naturally.

> This page is the canonical design documentation for **First-Discovery Onboarding** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The first discovery layer should not be explained before the player has a chance to notice it.

The portfolio should initially behave like a polished professional site.

Only after the visitor demonstrates curiosity should the site explain that there are hidden Signals.

This preserves surprise.

## Trigger Philosophy

The ideal onboarding moment is:

1. player encounters an unusual interaction,
2. receives an achievement or Signal,
3. system explains that more Signals exist.

The explanation should follow discovery, not precede it.

## What Onboarding Should Communicate

The player needs to know:

- hidden Signals exist,
- they are optional,
- more can be found around the portfolio,
- the Achievement Ledger can track them,
- Hint exists if needed.

The onboarding does not need to explain Epic, Legendary, Wishes, Finale, or postgame.

Those systems are too far away.

## Timing

The message should not stack directly on top of an achievement toast if that makes both unreadable.

It can wait briefly until the immediate unlock feedback settles.

## One-Time Nature

The introductory explanation should not repeat continuously.

Once the player understands that Signals exist, subsequent achievements can rely on that learned language.

## Design Rules

- Do not spoil the 10 Signal list.
- Do not explain later rarity tiers.
- Keep the message short.
- Present the Ledger as optional support.
- Avoid triggering before any evidence that the player wants to play.
- Do not repeat the introduction every page reload in the same session.

## Success Criteria

The player learns that the first discovery was part of a larger optional system without feeling that the professional portfolio has suddenly turned into a tutorial.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
