# System Toast Stack - Design

**Introduced:** v2.82. **Current specification:** v2.89.

## Intent

Multiple earned notices should not overwrite one another. A dedicated, non-blocking bottom-right stack holds up to three toasts, oldest at top and newest below. The active timed Optional Objective occupies the lowest position immediately above the bottom HUD. If it is visible, notices stack above it. If it disappears, notices settle downward.

Original and postgame achievement notifications and general system messages share the queue, but timed objectives do not count against its three-toast capacity.

## Dimensions and priority

v2.82 used 330px desktop / 300px narrow. v2.83 reduced both to **310px desktop / 280px narrow**, and likewise reduced timed-objective card widths. Notices remain individually dismissible with their existing expiration behavior (normally 4,600ms). A fourth toast removes the oldest.

## Acceptance

Open multiple quick achievement notices during an active objective. Verify a maximum of three visible toasts, no overwrite, correct vertical order, no overlap with bottom HUD or one another, independent expiration/close, and narrow-width fit.
