# Finale Trigger - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Trigger > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns the header Mippi logo into the ending trigger once eligibility is complete and the screen is calm.

> This page is the canonical design documentation for **Finale Trigger** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Finale should not appear as a conventional giant:

`FINISH PORTFOLIO`

button.

The portfolio has trained the player to treat the Mippi logo as an interactive object from the very beginning.

When the ending becomes available, that familiar mark changes.

The player sees:

- a pulse,
- a glow,
- a changed tooltip,
- a short system-status message.

Clicking the logo now starts the ending.

This makes the trigger feel like a final discovered state rather than an external menu command.

## Calm-Window Requirement

Eligibility alone is not enough.

The Finale only arms when the screen is calm.

This prevents the header from inviting the player into the ending while they are already dealing with:

- a Boss,
- Super Boss,
- Dev Console,
- Shop,
- Blueprint,
- Wish report,
- Mippi Bird,
- Achievement Ledger,
- another focused overlay.

The site waits for a clean moment.

## One-Way Ready State

Once the Finale has armed during the session, the ready state remains true.

Opening another popup afterward does not disarm the logo.

The attention check is used to choose the moment when the invitation first appears.

It is not a continuous lockout on the ending after readiness has already been communicated.

## Header Signal

The brand mark gains:

- pulsing scale,
- stronger glow,
- pointer cursor.

The brand accessibility label changes to:

`Mippi The Dork home. Something has changed.`

Tooltip:

`Something has changed.`

## First-Time Notification

If the player has not previously viewed the Finale, readiness also shows:

```text
SYSTEM STATUS
You have seen basically everything.
...BASICALLY
FINAL TRACE
```

The "...BASICALLY" language intentionally hints that this is closure, not 100 percent completion.

## Existing Logo Behavior

Before Finale readiness, clicking the Mippi mark is the `Curious Mind` Rare Signal.

After readiness, the same click starts the Finale instead.

This is a deliberate reuse of a learned interaction.

## Readiness Polling

The runtime checks periodically rather than synchronously after every possible condition change.

The initial check occurs shortly after startup, then repeats every few seconds.

A newly eligible player may therefore wait briefly before the header pulse appears.

That delay is acceptable because the Finale is an invitation, not a time-critical reward.

## Design Rules

- Reuse the Mippi logo as the Finale trigger.
- Do not add a separate giant Finish button.
- Arm only after eligibility and a calm interaction window.
- Once armed, remain armed.
- Change accessible label and tooltip.
- First-time readiness explains that the player has seen "basically" everything.
- Preserve normal Curious Mind behavior before readiness.
- Visual treatment must remain visible across site themes.
- Trigger should never fire automatically.

## Success Criteria

The player notices that the familiar header logo has changed and intentionally clicks it to begin the ending.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
