# Inspect Mode - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Inspect Mode > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides an early, hover-driven explanation layer describing what annotated systems are doing without changing their layout or behavior.

> This page is the canonical design documentation for **Inspect Mode** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Inspect Mode answers:

> What is this thing doing?

It is the practical explanation layer.

The site contains enough hidden and overlapping systems that a player may understand that something is interactive without understanding the purpose of the system.

Inspect Mode gives that player a way to interrogate the portfolio directly.

It is deliberately available early.

Unlike Design Mode, Inspect Mode is not a late-game reward because its information is primarily:

- usability support,
- system identification,
- light technical flavor.

## Hover-Driven Model

When Inspect Mode is active, hovering an annotated element produces a floating tooltip near the pointer.

The element itself is not outlined or repositioned.

This is a deliberate implementation and design rule.

Early versions of annotation styling risked altering structural layout.

The current model keeps all commentary in one fixed tooltip layer.

## Information Style

Inspect notes explain things such as:

- what a panel is tracking,
- what a HUD element represents,
- what an interaction is for,
- why a particular feature exists operationally,
- where a fake debug surface connects to a real system.

They are shorter and more descriptive than Design Mode notes.

## Annotation Coverage

Inspect Mode covers broad portfolio and game surfaces, including examples such as:

- Hero actions,
- Hero scene,
- introductory strip,
- Heavy Water,
- Azure Altar,
- Career board,
- employer wall,
- career timeline,
- tool filters,
- resumes,
- consulting projects,
- Crafting Play,
- tool grid,
- roadmap,
- resource links,
- About,
- Doug,
- hardware warning,
- discovery HUD,
- progress HUD,
- Achievement Ledger,
- Hint,
- Dev Console,
- Optional Objectives,
- Shop,
- Blueprint,
- shader compile popup,
- Wish/contact surfaces,
- footer.

The exact list can grow independently from the mode itself.

## Persistence

The player's Inspect preference is persistent.

If they reload while Inspect Mode is enabled, the page restores it.

This makes the mode useful as a genuine analysis layer rather than a temporary novelty.

## Design Mode Relationship

Inspect Mode and Design Mode are mutually exclusive.

They share the same tooltip surface but answer different questions.

Turning one on turns the other off.

This prevents:

- competing notes,
- ambiguous hover state,
- overlapping explanation layers.

## Objective Relationship

Inspecting annotated elements contributes to the exploration telemetry.

The Dynamic Optional Objective:

`Inspect one annotated element`

can use this behavior as its completion event.

This turns the mode itself into a small playable exploration mechanic.

## Visual Treatment

The floating tooltip follows the active rarity theme.

Design Mode uses a distinct design variant of the same tooltip.

Inspect remains visually recognizable as the simpler system-information layer.

## Design Rules

- Available without late-game unlock.
- Hover-driven, not click-driven.
- Never alter target geometry.
- Never change target hit testing.
- Never add outlines that shift layout.
- Persist the player's preference.
- Mutually exclusive with Design Mode.
- Commentary should explain operation rather than design rationale.
- Annotated content remains fully usable.

## Success Criteria

A curious visitor can turn Inspect Mode on and explore the page as if hovering over debug metadata without the mode itself breaking or moving the website.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
