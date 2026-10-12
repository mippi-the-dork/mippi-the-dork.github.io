# Arcade Spawn Layer - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Arcade Spawn Layer > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Schedules optional arcade threats and opportunities without allowing them to permanently block the professional portfolio experience.

> This page is the canonical design documentation for **Arcade Spawn Layer** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Arcade Spawn Layer is the bridge between passive portfolio browsing and the site's optional combat thread.

Arcade content should feel like the portfolio is gradually becoming aware that the player is interacting with it.

The intended escalation is:

1. Epic progression unlocks airborne arcade activity.
2. Regular UFOs begin appearing occasionally.
3. Repeated UFO defeats raise visible Invasion pressure.
4. Ten regular UFO defeats call a Boss.
5. Boss victories advance the longer three-Boss arc.
6. Every third Boss slot escalates into the Super UFO Boss.

This creates a long arc without requiring the player to enter a separate game screen until the final encounter.

## Optionality

The arcade layer is never allowed to become the only way to use the portfolio.

Regular UFOs and the normal Boss:

- fly over the existing page,
- can be ignored,
- eventually leave,
- do not block scrolling,
- do not remove professional content.

The Super Boss is different because it is a focused full-screen encounter.

Even there, the player has:

- a permanent Exit Boss Fight control,
- Escape as a second exit,
- no penalty for leaving.

The arcade thread therefore escalates commitment gradually.

## Epic Gate

Natural UFO activity belongs to Epic gameplay progression.

The first Rare Signal chapter remains comparatively calm.

Once the player has found all 10 original Signals, the portfolio is allowed to become more overtly game-like.

This gate is progression-based.

It is not tied to whether the player is currently displaying the Epic visual theme.

## Ambient Timing

Regular UFOs are intentionally uncommon under normal pacing.

They should feel like occasional hostile contact, not like a permanent shooter layered over every section.

The Adaptive Game Director can further stretch or compress the timing based on player behavior.

Easy Mode dramatically increases opportunity frequency for players who want more activity.

## Attention Budget

Natural arcade spawns respect the same attention budget as the rest of the site.

A new UFO should not appear simply because a timer expired while the player is already handling:

- a Wish sequence,
- a Shop decision,
- Blueprint repair,
- a major popup,
- Mippi Bird,
- the Finale,
- another Boss encounter.

Blocked opportunities are deferred and retried instead of disappearing for another full long interval.

## Boss Escalation

Bosses are not scheduled randomly.

They are earned by regular UFO defeats.

The standard rhythm is:

```text
10 UFO defeats -> Boss contact
```

A Boss escape does not erase the encounter arc.

Instead, reacquisition is shortened so the player only needs a few more UFO defeats before another opportunity.

This prevents a single missed Boss from turning into another full grind.

## Super Boss Escalation

The longer arc uses successful Boss victories.

Every third Boss victory slot is replaced by the Super Boss.

Leaving the Super Boss does not count as a victory.

That means the next reacquired Boss slot remains the Super Boss until the player defeats it.

## Calm Windows

After large encounters, the site deliberately creates a short arcade calm period.

This gives the portfolio time to become readable again.

Current examples include:

- normal Boss defeat: longer calm,
- normal Boss escape: shorter calm,
- Super Boss defeat: longest calm,
- Super Boss exit: short recovery window.

## Design Rules

- Natural arcade activity requires Epic gameplay progression.
- Regular UFOs remain ignorable.
- Bosses are driven by kill progression, not random timer alone.
- Super Boss appears every third successful Boss victory.
- Exiting a Super Boss has no progression penalty.
- Failed Boss opportunities reacquire faster than the original 10-UFO cycle.
- Natural spawns respect focused-attention blocking.
- Easy Mode can deliberately increase arcade density.
- No arcade system may permanently block professional portfolio access.
- Calm windows must follow major encounters.

## Success Criteria

The arcade layer succeeds when repeated optional interactions gradually create a recognizable escalation arc without making the portfolio feel like a shooter from the first page load.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
