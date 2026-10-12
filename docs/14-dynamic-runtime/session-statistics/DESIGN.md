# Session Statistics - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Session Statistics > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents a readable snapshot of the current local play session through the `stats` Dev Console command.

> This page is the canonical design documentation for **Session Statistics** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio contains two kinds of stat commands.

### Unreal-Style Performance Stats

```text
stat fps
stat unit
```

These are presentation/debug toys.

### Session Statistics

```text
stats
```

This is a summary of what the visitor has actually done in the current browser session.

The distinction should remain clear.

## Purpose

Session Statistics lets a player inspect the accumulated local telemetry before reaching the Finale.

It answers questions such as:

- How long have I been exploring?
- How much of the portfolio did I visit?
- How many Signals did I find?
- How much arcade activity happened?
- How many Rupees did I earn and spend?
- What does the Player Model currently think I am doing?
- Did I use assistance?

## Current Metrics

The Console report includes:

- active session time,
- sections visited,
- Signals found,
- flying objects collected,
- UFOs destroyed,
- Boss UFOs defeated,
- Super Bosses defeated,
- Doug Bones,
- Morale,
- Coolness,
- Hearts,
- Mushrooms,
- progress toward next Mushroom life,
- banked Bird lives,
- Rupees earned,
- Rupees spent,
- current wallet,
- Shop items owned,
- Mippi Bird high score,
- Console command count,
- successful Wishes,
- current Wish charge,
- completed Objectives,
- rarity themes unlocked,
- Player Model,
- confidence,
- assistance use.

## Mutable Model Disclosure

The output explicitly says:

`recent behavior is weighted heavily; this profile can change.`

This is important.

The player should not interpret the current archetype as a permanent verdict.

## Assistance

The report lists assistance openly:

- Easy Mode,
- Hint count,
- Cheat count,
- God Mode.

It does not subtract score or mark completion invalid.

The system is descriptive, not punitive.

## Relationship to Session Debrief

`stats` is the developer-console version of the current session state.

The Session Debrief is the authored post-Finale presentation of similar information.

They should agree.

If the model or major counts differ between Stats and Debrief, that is a bug.

## Design Rules

- Local session only.
- Distinguish from `stat fps` and `stat unit`.
- Report factual counts plainly.
- Explain mutable Player Model.
- Report assistance without punishment.
- Do not expose raw internal JSON to the player-facing Console.
- Keep QA raw snapshots in real browser DevTools only.

## Success Criteria

A player can type one simple command and get a coherent readable summary of the entire current session.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
