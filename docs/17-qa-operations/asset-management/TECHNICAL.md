# Asset Management - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Asset Management > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Defines what belongs in the public asset set, how local references should be validated, and which development-only files must remain outside the deployed runtime package.

> This page is the canonical technical documentation for **Asset Management** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
- [Music Lyrics Authoring Guide](../../MUSIC_LYRICS_AUTHORING_GUIDE.md)

## Public Runtime Exclusion List

Release cleanup should remove:

```text
__pycache__/
*.pyc
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

from the public deployment artifact.

## Runtime Files to Preserve

Current essential top-level runtime:

```text
index.html
style.css
script.js
perspective-demo.js
assets/
docs/
```

The `docs/` directory is intentionally public and hosts the separate documentation experience.

## Reference Sources

Local asset references can appear in:

### HTML

```text
src=
href=
```

### CSS

```text
url(...)
```

### JavaScript

- image source strings,
- theme image maps,
- gallery sources,
- track sources,
- dynamically created image paths,
- LRC paths derived from MP3 paths.

### Documentation

Public Markdown and documentation-site navigation can also contain repository-relative links that should be validated.

## Case Sensitivity

Validation should compare exact path case.

This is particularly important for GitHub-hosted serving.

## Music Inventory

Expected audio files:

```text
assets/music/song-01.mp3
assets/music/song-02.mp3
assets/music/song-03.mp3
assets/music/song-04.mp3
assets/music/song-05.mp3
assets/music/song-06.mp3
assets/music/song-07.mp3
assets/music/song-08.mp3
assets/music/song-09.mp3
assets/music/song-10.mp3
assets/music/song-11.mp3
assets/music/song-12.mp3
```

Expected lyric files:

```text
assets/music/song-01.lrc
...
assets/music/song-12.lrc
```

The runtime derives each LRC path from its MP3 path by replacing the `.mp3` suffix with `.lrc`.

There is no separate lyrics manifest.

## Current LRC Content State

All 12 v2.80 LRC files are metadata-only templates.

That is valid current content, not a missing asset.

Example:

```text
[ti:Literally Unplayable]
[ar:mippithedork]
[offset:0]
```

The player should render **Lyrics coming soon** for a valid metadata-only template.

## Missing-File Resilience

The runtime still has graceful fallbacks:

### Missing audio

- current audio remains unavailable,
- status can report pending/unavailable,
- Download disables.

### Missing LRC

- lyrics panel shows an unavailable-file fallback,
- audio continues unaffected.

These states should be tested, but they are not the expected normal v2.80 package state.

## Asset Notes

Development source may include `ASSET_NOTES.md` for provenance/context.

Treat it as source documentation rather than a runtime dependency unless intentionally published.

## Generated Python Artifacts

If local scripts create:

```text
__pycache__
*.pyc
```

remove them before packaging.

## QA

- Run a clean public-package file listing.
- Scan for development-only names.
- Resolve every local asset reference.
- Validate case.
- Confirm all 12 MP3s are present.
- Confirm all 12 LRC files are present.
- Verify every MP3 reaches Music Player READY.
- Verify every metadata-only LRC shows Lyrics coming soon.
- Temporarily remove one MP3 and one LRC in local QA to verify graceful fallback.
- Load every gallery.
- Toggle all themes to exercise alternate assets.
- Open every tool card using supplied icons.
- Verify the public `docs/` experience loads without depending on portfolio runtime code.

## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

From v2.87 a new required **runtime file** `perf-lab.js` is loaded deferred before `script.js`. Keep it in the published portfolio runtime, not in docs handoff ZIP. All twelve MP3 and user-authored LRC files must remain untouched by documentation and code-only update work. v2.82 changes `assets/heavy-water-hero.png`; documentation references it but must not modify it.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).


## v2.90–v2.92 Combat Lab Runtime Files

The v2.92 runtime requires `perf-lab.js` followed by `combat-lab.js`, then `script.js`. `combat-lab.js` is a **permanent, opt-in runtime file**, not an expendable development-only archive. Documentation maintenance must not modify production JavaScript or assets.


## v2.93–v2.94 Current Update

v2.94 runtime requires `particle-renderer.js` loaded before gameplay `script.js`, alongside existing `perf-lab.js` and `combat-lab.js`. All are intentional runtime assets, not disposable debug archives. Original `.arcade-pixel` CSS animation remains as DOM fallback. Documentation-only edits must never modify JS/CSS/assets or music/LRC files.


## v2.95–v2.97 Current Update

The current v2.97 runtime script initialization order is `stability-lab.js`, `perf-lab.js`, `particle-renderer.js`, `combat-lab.js`, `script.js`. All are intentional permanent runtime dependencies even though developer commands are hidden from ordinary player Help. Documentation changes never alter those scripts, twelve MP3s or editable LRCs.


## v2.98 Current Behavior

v2.98 updates runtime asset cache-busting and profile metadata to v2.98. The code-only website update leaves the twelve MP3/LRC sources and all images untouched, preserving the author's edited lyrics. The documentation update modifies no website assets.


## v3.01 Runtime Asset Authority

Author art is integrated at assets/game/*.svg (14 files) via game-art.js, unlike earlier assets/gameplay staging. fx-renderer.js handles cosmetic Canvas effects; particle-renderer.js handles combat bursts; spawn-motion.js drives authored movement. All initialize before script.js. Preserve existing MP3 and user-authored LRC. Windows test uses START_LOCAL_TEST.bat with LocalTestServer.ps1.


## Current v3.04 Specification

v3.02–v3.04 update `script.js`, `spawn-motion.js`, `style.css`, `index.html`, `perf-lab.js`, Windows `START_LOCAL_TEST.bat` and `LOCAL_TEST_README.txt` as applicable. Browser cache/version labels and local launcher now target v3.04. Preserve fourteen `assets/game/*.svg` and all authored MP3/LRC files. Existing game-art/cosmetic Canvas modules remain.
