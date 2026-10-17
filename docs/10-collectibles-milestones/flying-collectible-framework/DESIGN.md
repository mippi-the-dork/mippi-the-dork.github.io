# Flying Collectible Framework - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Flying Collectible Framework > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the shared spawning, movement, lifetime, interaction, and collection behavior used by friendly flying game-layer objects.

> This page is the canonical design documentation for **Flying Collectible Framework** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The flying collectible framework gives the portfolio a repeatable game layer without turning the document itself into a level.

Collectibles move across the viewport on top of the normal portfolio.

The player can keep reading, scrolling, or navigating while opportunities appear around them.

The framework supports several collectible families:

- Rupees,
- Hearts,
- Mushrooms,
- Stars,
- Keys,
- Doug Bones,
- Shooting Stars through a related celestial path.

Each collectible has a different payoff, but the movement and interaction language should remain consistent.

## Core Player Loop

The shared loop is:

1. an opportunity is scheduled,
2. the object enters from a viewport edge,
3. it travels across the screen,
4. the player notices and collects it,
5. the object resolves immediately,
6. missing it has little or no penalty,
7. another opportunity can appear later.

This makes the system opportunistic rather than stressful.

## Friendly Opportunity Philosophy

Friendly collectibles are not enemies.

They should not:

- damage the player,
- block scrolling,
- force a modal,
- punish a miss with lost long-term progress.

The main cost of missing one is simply waiting for another opportunity.

## Spawn Progression

Natural flying pickups are primarily Epic-stage content.

The first Rare discovery layer remains focused on exploring the professional site.

Once Epic is unlocked, the site can become more visibly game-like.

This keeps the initial presentation relatively calm.

## Shared Movement

Most friendly flying objects use the same edge-to-edge movement model.

An object:

- begins just outside one viewport edge,
- travels toward another edge,
- receives a rotation angle matching the path,
- owns a configurable flight duration.

The path is movement, not a fixed DOM layout position.

## Timing Modifiers

Flight lifetime can be changed by several systems.

### Adaptive Director

Can globally adjust friendly flight timing.

### Slowpoke

Adds about 35 percent more on-screen time for supported flying objects.

### Slowmo

Doubles supported flying duration.

These modifiers stack through the shared duration function.

## Interaction Methods

A collectible can be resolved through more than one player interaction.

Typical collection methods include:

- direct pointer click,
- Star Power cursor contact,
- Legendary cursor projectile,
- forced QA interaction.

The feature itself should produce the same underlying reward regardless of collection method unless the combo system intentionally adds an extra effect.

## Accessibility and Semantics

Friendly collectibles are real `button` elements.

That gives them semantic interaction identity.

Their continuous motion still makes pointer play the primary practical interaction method, but the DOM is not built from inert decorative `div` elements.

## Interact Mode

Interact Mode suppresses normal portfolio links and controls while game-layer objects remain interactive.

Flying collectibles therefore become easier to hunt without accidental navigation.

## Attention Budget

The Adaptive Director can block friendly ambient opportunities when the screen is already busy.

This is important because the portfolio can simultaneously contain:

- Wishes,
- Boss encounters,
- Optional Objectives,
- popups,
- progression claims,
- other ambient objects.

A collectible should not spawn simply because its timer expired if another authored sequence already owns the player's attention.

## Miss Handling

Flying objects remove themselves when their CSS animation ends.

The animation owns lifetime.

This is important because fixed removal timers would conflict with Slowmo and other duration multipliers.

A missed object can record telemetry before removal.

## Natural Pickup Pool

The standard pickup pool includes:

- Rupee,
- Heart,
- Mushroom,
- Star,
- Key.

Keys use additional scheduling rules because they create Castle quests.

Doug Bones use the same broad flight language but have a separate scheduler and prerequisite.

Shooting Stars use a related framework with their own progression and charge rules.

## Design Rules

- Natural standard pickups require Epic gameplay progression.
- Friendly objects should remain optional.
- A miss has low cost.
- Movement uses shared timing modifiers.
- Game-layer objects remain interactive in Interact Mode.
- Natural opportunities obey attention blocking.
- Collection reward should not depend on whether the object was clicked or hit by an allowed alternate collection method.
- Keys must not naturally stack multiple active Castle quests.
- Animation lifetime and removal must stay synchronized.
- Forced DEV objects may intentionally bypass normal progression restrictions.

## Success Criteria

The player quickly learns a consistent rule:

> If something unusual flies across the portfolio, it is probably worth interacting with.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## v3.01 Spawnable Movement

Stars bounce above the HUD, Mushrooms follow a content-panel perimeter, hidden Keys stay attached until collected, Rupees and Hearts fall with gravity, and Bones fall spinning. Shooting Star behavior is unchanged. No generic fly-across path is shared by all pickups.
