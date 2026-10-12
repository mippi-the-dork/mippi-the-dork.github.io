# Session Report - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Session Report > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the optional post-Finale Session Debrief using local telemetry, current Player Model, curated observations, assistance disclosure, and explicit sharing controls.

> This page is the canonical design documentation for **Session Report** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Finale is authored closure.

The Session Report is reflection.

It uses the telemetry accumulated during the session to answer:

> How did you actually use this ridiculous portfolio?

The report is optional.

The player chooses:

`VIEW SESSION REPORT`

from the Finale identity state.

Someone who only wants the ending can skip it.

## Player Model

The report headline is the current Player Model label.

The summary beneath it comes from that archetype.

Because the Player Model is mutable, the report describes the current session behavior rather than claiming a personality diagnosis.

## Curated Metrics

The report surfaces a compact set of readable metrics rather than dumping internal telemetry.

Current grid includes:

- time exploring,
- professional sections visited,
- Signals,
- UFOs,
- Boss wins,
- Doug Bones,
- Hearts,
- Rupees earned/spent,
- Mippi Bird high score,
- Console commands,
- successful Wishes,
- Optional Objectives,
- rarity themes unlocked.

## Notable Behavior

The report can generate up to four context-sensitive observations.

Examples include:

- Console use exceeding navigation,
- high Doug pet count,
- many Bones,
- Boss victories,
- Super Boss victories,
- Mippi Bird score,
- all professional sections visited,
- Rupee spending,
- invalid Console experimentation,
- assistance use or lack of assistance.

This turns raw numbers into a more readable session story.

## Assistance Disclosure

The report lists whether the player used:

- Easy Mode,
- Hints,
- Cheat,
- Godmode.

There is no penalty.

The message is descriptive.

Using assistance does not invalidate the ending or True Completion.

## Local Privacy

The footer explicitly says:

`Session behavior stays local to this browser tab. No analytics package was invited.`

That is an important product promise.

The report exists because the telemetry is local.

## Sharing

The report provides explicit buttons for:

- X,
- LinkedIn,
- Facebook,
- Copy Result.

It does not invoke the operating system's native share sheet.

The shared text summarizes:

- Player Model,
- Signals,
- UFOs,
- Boss total,
- Mippi Bird high score.

## Continue

The report can be closed with:

- X,
- Continue Exploring.

Both routes return to the live portfolio and schedule the postgame reveal if needed.

## Design Rules

- Session Report is optional.
- Use curated metrics, not raw JSON.
- Show current Player Model and summary.
- Limit notable observations to four.
- Show assistance without penalty.
- Keep telemetry local.
- Use explicit share buttons.
- Do not use native OS share sheet.
- Closing or continuing schedules postgame reveal.
- Report does not reset the session.

## Success Criteria

The report feels like a playful post-game results screen while remaining transparent about what data exists and where it stays.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
