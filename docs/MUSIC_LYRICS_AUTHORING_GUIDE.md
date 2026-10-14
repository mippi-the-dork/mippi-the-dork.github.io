# Music Lyrics Authoring Guide

**Current documented state:** Mippi Portfolio v2.89

The unlocked Music Player supports one editable LRC file per soundtrack track.

This guide documents the file format accepted by the current runtime.

## File Mapping

Lyrics are discovered automatically from the selected track's MP3 path.

There is no separate lyrics manifest.

~~~text
assets/music/song-01.mp3
-> assets/music/song-01.lrc

assets/music/song-02.mp3
-> assets/music/song-02.lrc

...

assets/music/song-12.mp3
-> assets/music/song-12.lrc
~~~

Keep the numeric basename paired with the matching MP3.

## Current v2.80 Content State

All twelve shipped LRC files are metadata-only templates.

Example:

~~~text
[ti:Literally Unplayable]
[ar:mippithedork]
[offset:0]
~~~

They do not currently contain completed lyric text or synchronization timestamps.

The UI therefore shows:

~~~text
Lyrics coming soon.
~~~

for the shipped templates.

## Encoding

Save LRC files as UTF-8 plain text.

A UTF-8 BOM at the beginning of the file is tolerated and removed by the parser.

## Metadata

The parser ignores these standard informational tags as lyric text:

~~~text
[ti:]
[ar:]
[al:]
[au:]
[by:]
[length:]
[re:]
[ve:]
~~~

Recommended minimal template:

~~~text
[ti:Song Title]
[ar:mippithedork]
[offset:0]
~~~

## Untimed Lyrics

A plain nonblank line is rendered as ordinary lyric text:

~~~text
First lyric line
Second lyric line
~~~

Untimed lyrics display correctly but do not participate in playback synchronization.

## Timestamped Lyrics

Use:

~~~text
[mm:ss.xx]Text
~~~

Example:

~~~text
[00:13.25]First lyric line
[00:17.80]Second lyric line
~~~

Accepted timestamp rules:

- minutes: one to three digits,
- seconds: exactly two digits from 00 through 59,
- fractional seconds: optional, one to three digits.

The current player displays timestamps and highlights the latest timed line whose timestamp has passed.

Synchronization is line-by-line.

It is not word-by-word karaoke.

## Multiple Timestamps

One source line can target more than one time:

~~~text
[00:22.50][01:15.80]Repeated phrase
~~~

The parser creates a separate timed entry for each timestamp.

## Global Offset

Use milliseconds:

~~~text
[offset:+500]
~~~

or:

~~~text
[offset:-250]
~~~

The offset is applied to parsed timestamps.

Resulting times are clamped so they cannot become negative.

## Section Labels

A line such as:

~~~text
[Verse 2]
~~~

does not match recognized metadata and is rendered as untimed text.

## Mixed Timed and Untimed Content

Avoid mixing formats in the final synchronized lyric file.

When at least one timed line exists:

- timed lines are sorted chronologically,
- untimed lines are placed after the timed entries,
- untimed lines cannot synchronize reliably.

For finished synchronized lyrics, timestamp every lyric phrase that should participate in playback highlighting.

## Editing Iteration

The viewer fetches the LRC with no-store cache behavior.

This supports a fast local authoring loop:

1. edit the matching .lrc,
2. save it,
3. close the lyrics panel,
4. reopen that song's lyrics.

A full page reload should not be necessary just to refresh the LRC content.

## Playback Relationship

The circled ? control is intentionally separate from song selection.

Opening lyrics:

- does not select that song,
- does not start it,
- does not stop the current song.

Synchronization only occurs when the lyrics being viewed match the currently selected track.

If the selected track changes while the lyrics panel is already open, the panel follows the new selected track.

## Current-Line Sync

The player updates lyric sync on native audio timeupdate and seeked events.

The current line is the latest timed line at or before the current audio time.

The current line is highlighted and scrolled into the center area of the lyrics well.

The scroll is contained inside the lyrics panel, not the webpage.

## Reduced Motion

At reduced-motion preference:

- lyrics scrolling becomes immediate rather than smooth,
- lyric-line transitions are disabled.

This does not change playback or synchronization timing.

## Safety

LRC lyric text is rendered through DOM nodes with textContent.

It is never inserted as HTML.

Characters that resemble HTML must display literally rather than execute.

## Missing File Behavior

If the expected LRC cannot be fetched, the lyrics panel shows a fallback message and audio playback continues unaffected.

The lyrics system is optional content layered on top of the audio player.

## Authoring QA

For each completed lyric file:

- Verify the correct title/track pairing.
- Verify UTF-8 text.
- Verify seconds never exceed 59.
- Verify timestamps against the actual beginning of the MP3.
- Seek backward and forward and confirm the highlighted line updates.
- Verify repeated timestamps produce repeated entries.
- Verify any [offset:] adjustment.
- Close and reopen the panel after editing.
- Verify the webpage itself does not scroll when the highlighted line changes.
- Verify HTML-like text displays literally.
- Check Rare, Epic, and Legendary themes.
- Check narrow layouts at 760 px or below.


## Enhanced LRC and Current v2.89 Viewer

**v2.81 added Enhanced LRC:** Keep the line timestamp `[mm:ss.xx]`, then use `<mm:ss.xx>` before each word/segment:

```text
[00:11.50]<00:11.50>I <00:11.72>made <00:12.12>this
[00:15.00]<00:15.00>Every <00:15.33>little <00:15.70>feature
```

Inline timestamps produce word/segment highlighting; standard LRC lines remain valid in the same file. Spaces and punctuation belong to segments. No animated letter-filling or raw timestamp presentation is implied.

**Current UI:** The v2.80 per-track circled ? buttons were **removed in v2.81**. Use the single Lyrics toggle for the currently selected song. A companion panel appears right of the header player on desktop or below on narrow screens, offering Full/Single modes. Collapse temporarily forces Single; expand restores the selected viewing mode. Native audio seek updates sync; current lyrics are rendered safely as text.

**v2.83 styling:** The companion height follows the player's actual height via ResizeObserver. Active lines and placeholders use ~12px text. Earlier descriptions of 15px/14px collapsed type are v2.82 history, not current behavior.

**Content ownership:** Hand-off ZIPs never replace your locally edited `assets/music/*.lrc` sources. Empty metadata-only templates in archived builds do not establish whether current user-authored lyrics are complete. Use HTTP local preview or GitHub Pages for fetch testing, not `file://`.
