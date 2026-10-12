# Cross-System Cohesion - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Cross-System Cohesion > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the runtime design principle that systems should share state, events, rewards, and interaction rules instead of behaving like isolated easter eggs.

> This page is the canonical design documentation for **Cross-System Cohesion** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio contains many small mechanics.

The risk with that structure is obvious:

- one button does a joke,
- one collectible does a joke,
- one UFO does a joke,
- one Console command does a joke,
- none of them matter to one another.

Cross-System Cohesion is the deliberate effort to make those systems acknowledge each other.

The goal is not to create one giant monolithic game.

The goal is to make independent features feel like they inhabit the same ruleset.

## Design Principle

A strong cross-system interaction should answer:

> What becomes more interesting because both of these systems exist?

Examples are stronger than simple coexistence.

### Star Power + UFO

Star Power turns cursor contact into UFO destruction.

### Star Power + Boss

The same contact system damages a Boss, but with a repeat-hit limiter.

### Star Power + Doug

A Bone becomes worth twice as much Coolness.

### Slowmo + Hostile Fire

Slowmo affects enemy projectiles too.

### Mushroom + Legendary

Cursor growth has mechanical target-acquisition value.

### UFO + Rupee Economy

Combat feeds the Shop loop.

### Mippi Bird + Rupees

Arcade performance feeds the same wallet, with anti-farming limits.

### Doug Peek + Doug Interaction

The offscreen cameo uses the same pet counter as the About card.

### Super Boss + Interact Mode

The encounter reuses the existing content-suppression rule instead of inventing another page-lock concept.

### Objectives + Telemetry

Objectives listen to the same meaningful event stream produced by real systems.

They do not require every mechanic to implement a second objective-specific hook.

## Shared Rules Beat Parallel Copies

The best cohesion work reuses the authoritative path.

Examples:

- Star Power clicks the same target route a normal click uses.
- Legendary projectiles invoke the same collection behavior.
- Objective rewards call the same Rupee wallet function.
- Shop modifiers are queried from one Shop ownership/equipment state.
- postgame history records milestones independently from transient UI.

This reduces both design inconsistency and technical bugs.

## First-Time Combo Feedback

Some particularly meaningful intersections receive a one-time:

`SYSTEM COMBO`

message.

This tells the player that the interaction was intentional.

The combo acknowledgement is not itself another achievement checklist.

## Economy as Glue

Rupees are one of the most important cohesion tools.

They connect:

- pickups,
- UFOs,
- Bosses,
- Castles,
- Objectives,
- Mippi Bird,
- Shop decisions.

The shared wallet gives repeated play a common consequence.

## Attention as Glue

The Attention Budget is another cohesion layer.

It prevents unrelated systems from each independently deciding that "now is a good time" for their own popup or spawn.

That coordination is less visible than a System Combo but just as important.

## Failure and Recovery

Cohesion also means systems should fail safely together.

Examples:

- Super Boss restores prior interaction state.
- Wish failure preserves celestial charge.
- projectiles always clean up.
- seeded Objective opportunities use real target behavior.
- missing Three.js does not remove normal navigation.

The experience should never require one subsystem to assume every other subsystem is healthy.

## Design Rules

- Prefer shared authoritative state over duplicated counters.
- Prefer shared event streams over bespoke cross-system polling.
- Reward combinations that create genuinely new behavior.
- Not every pair of systems needs a combo toast.
- Economy, attention, telemetry, and progression should provide connective tissue.
- Temporary overrides restore prior player state.
- Cross-system behavior should never make professional content fragile.
- The site should degrade gracefully when a presentation system fails.

## Success Criteria

The player experiences the site as one playful systemic portfolio rather than a folder of unrelated easter eggs.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
