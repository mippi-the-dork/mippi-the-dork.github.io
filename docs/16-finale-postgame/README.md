# 16. Finale and Postgame

**Hierarchy:** Documentation Home > Finale and Postgame

Documents the normal ending, session reflection, post-Finale reveal, true completion layer, and persistent Music Player reward.

## Purpose

This category groups the canonical documentation for **Finale and Postgame**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Normal Finale Eligibility** | Defines the broad-engagement requirements that make the normal Finale available without demanding true 100 percent completion. | [Design](normal-finale-eligibility/DESIGN.md) | [Technical](normal-finale-eligibility/TECHNICAL.md) |
| **Finale Trigger** | Uses the glowing Mippi header identity as the player-controlled entry point once Finale eligibility is satisfied. | [Design](finale-trigger/DESIGN.md) | [Technical](finale-trigger/TECHNICAL.md) |
| **Finale Sequence** | Presents the Thanks for Playing ending, Mippi identity treatment, visible cursor, and the choice between continuing or viewing the Session Report. | [Design](finale-sequence/DESIGN.md) | [Technical](finale-sequence/TECHNICAL.md) |
| **Finale Mippi Identity** | Displays the white Mippi logo above MIPPI THE DORK on the final choice screen. | [Design](finale-mippi-identity/DESIGN.md) | [Technical](finale-mippi-identity/TECHNICAL.md) |
| **Continue Exploring** | Returns the player to the portfolio after the Finale while preserving progression and scheduling the postgame achievement reveal. | [Design](continue-exploring/DESIGN.md) | [Technical](continue-exploring/TECHNICAL.md) |
| **Session Report** | Builds a personalized local debrief from the session's telemetry and presents it as an optional reflection after the Finale. | [Design](session-report/DESIGN.md) | [Technical](session-report/TECHNICAL.md) |
| **Post-Finale Reveal Timing** | Waits briefly after leaving the Finale or closing the Session Report, then force-opens the Achievement Ledger to reveal the new postgame tier. | [Design](post-finale-reveal-timing/DESIGN.md) | [Technical](post-finale-reveal-timing/TECHNICAL.md) |
| **True Completion** | Requires all nine Epic postgame achievements plus having viewed the Finale before awarding the Legendary 100 Percent Complete achievement. | [Design](true-completion/DESIGN.md) | [Technical](true-completion/TECHNICAL.md) |
| **Music Player Unlock** | Permanently unlocks the Music Player after 100 percent completion until the player uses the full reset command. | [Design](music-player-unlock/DESIGN.md) | [Technical](music-player-unlock/TECHNICAL.md) |
| **Music Player Header Placement** | Anchors the Music Player beneath the left header identity block with its left edge aligned to the Mippi logo square. | [Design](music-player-header-placement/DESIGN.md) | [Technical](music-player-header-placement/TECHNICAL.md) |
| **Music Player Expansion** | Expands downward from a fixed top edge so the control remains spatially attached to the header. | [Design](music-player-expansion/DESIGN.md) | [Technical](music-player-expansion/TECHNICAL.md) |
| **Music Player Theme Treatment** | Adapts its presentation to the currently active Rare, Epic, or Legendary visual theme. | [Design](music-player-theme-treatment/DESIGN.md) | [Technical](music-player-theme-treatment/TECHNICAL.md) |
| **Music Playback** | Provides the 12-song soundtrack, play/pause, previous/next, repeat, shuffle, playlist navigation, and Enhanced LRC lyrics in a separate Full/Single companion viewer. | [Design](music-playback/DESIGN.md) | [Technical](music-playback/TECHNICAL.md) |
| **Music Downloads** | Lets visitors download each installed authored song with a readable title-based filename. | [Design](music-downloads/DESIGN.md) | [Technical](music-downloads/TECHNICAL.md) |
| **Music Player Persistence** | Keeps the reward plus repeat/shuffle preferences across reloads while reset clears the entire Music Player state. | [Design](music-player-persistence/DESIGN.md) | [Technical](music-player-persistence/TECHNICAL.md) |
| **Synchronized Lyrics Viewer** | Companion Full/Single panel, seeking and Enhanced LRC word highlights. | [Design](synchronized-lyrics-viewer/DESIGN.md) | [Technical](synchronized-lyrics-viewer/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
