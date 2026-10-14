# Synchronized Lyrics Viewer - Technical

**Introduced:** v2.80; enhanced v2.81, v2.82 and v2.83. **Current specification:** v2.89.

## Markup and API

The lyrics panel is a sibling of `#music-player` within `.site-header`. Important elements: `#music-lyrics-toggle`, `#music-lyrics-mode`, lyric content container, `#music-seek`, `#music-current-time`, and `#music-duration`.

`musicSyncProgress()` drives `m:ss` progress text and range value from `HTMLAudioElement`; seeking changes `currentTime` and invokes synchronization. `musicSyncLyricsMode()` switches Full/Single. `ResizeObserver` maintains `--music-companion-height` from actual player height, avoiding independent growth. CSS stacks lyrics under player when viewport is narrow.

## LRC / ELRC parsing

A source file maps to its audio basename (`song-XX.mp3` -> `song-XX.lrc`). Regular LRC line timestamps `[mm:ss.xx]` activate lines. Enhanced LRC inline timestamps `<mm:ss.xx>` before each word/segment become `entries[].words` with `{text,time}`. Optional metadata and `[offset:...]` are handled. A standard line may coexist with Enhanced lines.

`renderMusicLyrics()` constructs DOM with `textContent` (never HTML injection). `updateMusicLyricsSync()` compares active-line/active-word keys before touching classes, and scrolls only on changed Full-mode line. Timestamp markers are **not displayed**.

## Last-change precedence

v2.83's lyric body and placeholder typography is **12px** in both Full and collapsed modes; the preceding v2.82 15px/14px sizes should not be used as the final specification. Player max desktop width remains ~326px collapsed or expanded, with a matching companion panel rendered height.

## QA and authoring

Use HTTP preview/GitHub Pages, not `file://`, because LRC fetch may be blocked locally. Preserve user-edited lyric files; don't overwrite with template variants. See [Music Lyrics Authoring Guide](../../MUSIC_LYRICS_AUTHORING_GUIDE.md). Test seek, progress labels, word highlights, mode restore and missing-file fallback.
