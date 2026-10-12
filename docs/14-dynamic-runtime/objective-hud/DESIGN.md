# Objective HUD - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective HUD > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays the current Optional Objective as a compact card positioned above the persistent progression HUD.

> This page is the canonical design documentation for **Objective HUD** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Objective HUD needs to be visible enough to create direction without becoming the primary interface.

It therefore appears as one compact fixed card near the persistent progression systems.

The card communicates:

- objective category,
- task,
- optional explanatory detail,
- progress,
- remaining time,
- reward,
- dismiss control.

## Stack Relationship

The objective is subordinate to persistent progression.

Persistent meters such as:

- Hearts,
- Rupees,
- Coolness,
- Invasion,
- Castles,
- Meta Trace

sit below it.

The objective card is positioned above that stack.

This is important because the persistent HUD can change height while an objective is already active.

For example:

- first Rupee reveals wallet,
- first Heart reveals Hearts,
- Coolness appears,
- Castle progress appears.

The objective should move upward rather than overlap those systems.

## Stable Anchoring

A previous implementation positioned the objective relative to animated screen-space rectangles.

That caused the card to float incorrectly when Achievement Ledger or other controls changed size.

The current design uses stable HUD layout anchors.

The objective should feel attached to the HUD stack, not to a transient animation state.

## Active Presentation

While active the card remains fully opaque.

High-attention UI no longer fades the objective almost invisible.

Once the system has offered the timed objective, the player needs to be able to continue reading its timer and task.

The Director controls when a new objective can appear.

It does not hide an already active one.

## Complete Presentation

On success:

- kicker changes to `OBJECTIVE COMPLETE`,
- title becomes `Signal resolved.`,
- reward text confirms Rupees were added,
- timer/progress text becomes `COMPLETE`,
- progress bar returns to full,
- dismiss button disappears.

If the objective unlocked the player's first Rupee wallet, the completion copy also explains that the Rupee counter can open the Shop.

## Failure Presentation

On timeout:

- kicker becomes `OBJECTIVE FAILED`,
- title becomes `Time expired.`,
- detail says no reward was earned,
- progress text becomes `TIME EXPIRED`,
- reward says `REWARD // MISSED`,
- bar is empty,
- dismiss button disappears.

The state remains visible briefly before leaving.

## Manual Dismissal

The close button is always a safe opt-out while the objective is active.

There is no confirmation dialog.

A player who does not want the challenge can close it immediately.

## Theme Treatment

The Objective HUD follows the active site rarity.

The objective itself is not a Rare/Epic/Legendary inventory item.

Its theme therefore follows the current world presentation rather than preserving a separate semantic rarity.

## Design Rules

- One card only.
- Position above persistent HUD.
- Reposition when the persistent HUD height changes.
- Stay fully readable while active.
- Explicit success and failure states.
- Dismiss hidden after resolution.
- Never overlap the persistent progression stack.
- Do not become a modal.
- Keep professional content scrollable behind it.

## Success Criteria

The player can understand the current challenge and time pressure at a glance without the card obscuring the portfolio or other persistent progression.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
