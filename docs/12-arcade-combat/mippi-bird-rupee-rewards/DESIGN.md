# Mippi Bird Rupee Rewards - Design Documentation

## Current implementation correction (v3.25.2)

Bird no longer pays milestone rewards. It pays once on completed round compared with the **high score at round start**: below pays 0, a tie pays 1, and improvement pays the score difference plus 1. Example: starting record 8, final score 11 pays 4.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Rupee Rewards > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Awards limited session Rupees for reaching selected Mippi Bird score milestones without allowing unlimited farming.

> This page is the canonical design documentation for **Mippi Bird Rupee Rewards** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Mippi Bird should connect to the Rupee economy, but it should not become the best way to farm the Shop.

The solution is limited score milestones.

A player is rewarded for demonstrating competence at several thresholds.

Repeating those thresholds after every crash does not continue generating currency in the same browser session.

## Current Milestones

```text
Score 5   -> 1 Rupee
Score 10  -> 1 Rupee
Score 20  -> 2 Rupees
```

Maximum Mippi Bird milestone payout per browser session:

```text
4 Rupees
```

## Why One-Time Per Session

The minigame can restart almost instantly.

If Score 5 awarded one Rupee every run, a player could turn the Shop economy into repetitive low-score farming.

The session cap keeps the reward meaningful but bounded.

## Session Scope

The milestones reset with a new browser session because they are stored in session telemetry.

This is acceptable.

The system is not a permanent once-per-account reward.

It is a per-session anti-farming rule.

## Feedback

At each newly claimed milestone:

- Rupees are awarded silently through the wallet system,
- Console prints milestone reward,
- a transient Mippi Bird toast appears.

The normal wallet still updates.

## Design Rules

- Reward only exact milestone thresholds.
- 5, 10, and 20 use 1, 1, and 2 Rupees.
- Each milestone awards once per browser session.
- Restarting a run does not re-arm claimed milestones.
- Rewards use the same persistent Rupee wallet.
- High scores above 20 do not create additional current v2.78 milestones.
- Reward cap prevents Mippi Bird from dominating economy progression.

## Success Criteria

Mippi Bird feels economically connected to the rest of the site without becoming a repetitive currency exploit.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
