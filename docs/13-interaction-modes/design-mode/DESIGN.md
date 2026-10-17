# Design Mode - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Design Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks a late-game hover commentary layer explaining why systems were designed the way they were.

> This page is the canonical design documentation for **Design Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Design Mode answers:

> Why was this designed this way?

It is the site's commentary track.

Inspect Mode explains operation.

Design Mode explains:

- intent,
- tradeoffs,
- constraints,
- relationships,
- lessons,
- why a simpler solution was chosen,
- why a seemingly unnecessary joke became a system.

This makes the portfolio itself part of the design portfolio.

## Late-Game Unlock

Design Mode is deliberately withheld until the player has already experienced the systems normally.

The player must:

1. unlock Legendary,
2. own every other Shop item,
3. reveal the Shop capstone,
4. spend 10 Rupees on:
   - `Design Mode Unlocked`.

The capstone price is not reduced by Production Discount.

## Why It Is Locked

Design commentary can spoil discovery.

For example, a note that explains:

- why Signals teach hidden interaction language,
- why the Wish system uses Blueprint failure,
- why every third Boss becomes the Super Boss,

would weaken the experience if exposed from the first minute.

Locking the commentary lets the player first encounter the design as a player.

Later they can inspect it as a designer.

## Playable Postmortem

The goal is not a tiny set of one-line captions.

v2.61 expanded Design Mode into a broad playable commentary layer.

Coverage includes:

- onboarding,
- achievement structure,
- Hint and Cheat,
- theme/gameplay separation,
- progression traces,
- every major HUD track,
- Shop opportunity cost,
- rarity semantics,
- Doug systems,
- Hero navigation,
- Heavy Water,
- professional sections,
- Dev Console discoverability,
- Blueprint repair,
- shader compilation,
- Unreal Source reward,
- Mippi Bird,
- UFO escalation,
- Boss and Super Boss,
- Castles,
- graceful failure,
- Session Debrief,
- Finale,
- ordinary footer utility.

## Hover Behavior

Design Mode uses the same layout-neutral floating tooltip as Inspect Mode.

The tooltip gets a Design-specific visual treatment and can be slightly wider to support multi-sentence explanations.

## Mutual Exclusion

Design and Inspect cannot run simultaneously.

Turning on Design turns Inspect off.

This preserves one clear commentary channel.

## Persistence

Once entitled, the player's Design Mode on/off preference persists across reload.

The entitlement itself is persistent until full reset.

## Console Integration

After entitlement:

- `design` becomes available,
- normal Help includes it in the CORE group,
- the fixed Design button appears in the control strip.

Before entitlement, manually typing `design` explains that the Shop capstone is required.

## Design Rules

- Locked behind Shop mastery.
- Capstone remains 10 Rupees.
- Commentary is rationale-focused.
- Do not change annotated layout or hit testing.
- Mutually exclusive with Inspect Mode.
- Persist preference after entitlement.
- Do not auto-enable after purchase.
- The player chooses when to turn the commentary layer on.

## Success Criteria

After mastering the site, the player can replay it as a designer and read the reasoning behind the systems they already experienced.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## v3.14 Current Behavior

v3.11 Design Mode icon layers an overlapping circle and square; Shop capstone base price is 30 as of v3.13.
