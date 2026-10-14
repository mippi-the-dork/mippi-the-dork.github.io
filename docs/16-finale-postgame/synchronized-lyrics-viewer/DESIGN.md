# Synchronized Lyrics Viewer - Design

**Introduced:** v2.80 (viewer); **major UX redesign:** v2.81. **Current specification:** v2.89.

## Scope

The v2.80 per-track circled ? action is **obsolete**. v2.81 replaced it with one Lyrics icon for the **currently selected track**. Opening/closing lyrics never stops audio; selecting a new song while the panel is open loads that song's lyrics.

On desktop, lyrics appear as a **separate companion panel to the right** of the header Music Player, not below the playlist. On narrow layouts the companion falls below the player.

### Full

Shows a scrollable list of lyric lines, highlighting the current line and activated Enhanced LRC word segments; timestamps remain hidden. The list scrolls internally.

### Single

Shows the current active line centered. Collapsing the player forces Single temporarily, without changing the listener's selected preference. Expanding restores their prior Full/Single choice.

## Release refinements

- **v2.81:** Companion panel, Full/Single, Enhanced LRC word segments, seekable progress, icon-only transport. Collapse retains title, progress, Play/Pause and Next.
- **v2.82:** Collapsed panel about 72px high. Single active lyric 15px, missing/empty placeholder 14px; lyric sync avoids redundant DOM work.
- **v2.83:** Companion always matches player's **actual rendered height** via ResizeObserver; collapsed and expanded styles use **12px** lyric and placeholder typography, matching track title. This supersedes v2.82's 15/14px sizes.

Existing track order (12), music entitlement, Repeat and Shuffle persist unchanged. The user's authored local `.lrc` files must not be replaced by bundled template files when deploying code-only updates.

## Acceptance

Test Full/Single, collapse/restore preference, time seeking and resync, word-level highlights, right-side alignment at desktop and narrow fallback, missing lyric placeholders, no visible raw timestamps, no unintended autoplay, and safe content display.
