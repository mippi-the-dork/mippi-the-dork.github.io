# Asset Management - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Asset Management > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Defines what belongs in the public asset set, how local references should be validated, and which development-only files must remain outside the deployed runtime package.

> This page is the canonical design documentation for **Asset Management** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)

## Design Intent

The portfolio accumulated many image, audio, documentation, and development files during iteration.

Asset management has two goals:

1. keep every referenced public asset available,
2. avoid shipping dead, private, or development-only files simply because they happened to exist in the working folder.

## Public vs Development

The public runtime should contain what a visitor needs.

That includes:

- current HTML,
- CSS,
- JavaScript,
- referenced images,
- icons,
- gallery assets,
- installed soundtrack MP3s,
- Music Player LRC files,
- public documentation under `docs/`,
- public favicon.

Development-only helpers belong in source archives, not the public host.

## Development-Only Exclusions

Current explicit exclusions:

```text
__pycache__/
*.pyc
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

These files are useful during development and QA but are not visitor-facing runtime dependencies.

## Local Asset Validation

Release validation should scan local references from:

- HTML,
- CSS,
- JavaScript,
- documentation links where applicable

and verify the files exist with matching case.

Static hosting can expose case errors that a local Windows filesystem may not.

## Music Assets

v2.80 is a music-ready release.

The public package now contains 12 authored MP3s:

```text
assets/music/song-01.mp3
...
assets/music/song-12.mp3
```

and 12 editable lyric files:

```text
assets/music/song-01.lrc
...
assets/music/song-12.lrc
```

The MP3s are required soundtrack assets for the current package.

The LRC files are also expected, but their current contents are metadata-only templates. A metadata-only LRC is valid and intentionally produces the **Lyrics coming soon** state.

The runtime still handles missing audio or lyrics gracefully, but missing files should be treated as a deployment defect in the normal v2.80 release rather than the intended content-staging state.

## Lyrics Content Boundary

The LRC files are independently editable content.

Updating actual lyrics should not require changing:

- HTML,
- CSS,
- JavaScript,
- MP3 files.

See [Music Lyrics Authoring Guide](../../MUSIC_LYRICS_AUTHORING_GUIDE.md).

## Asset Provenance

`ASSET_NOTES.md` tracks broad provenance and usage context for project imagery and branding where maintained in the source package.

It is source/release documentation, not a browser runtime dependency.

## Unused Asset Cleanup

Before release, compare:

- files in `assets/`,
- references in source,
- runtime-derived paths.

Do not remove an asset merely because it is not visible on the first screen.

Many assets are state-gated or derived by convention.

For example, LRC files are derived from MP3 paths rather than listed in a separate manifest.

## Design Rules

- Public host contains intentional runtime assets and public documentation.
- Development helpers stay out of deployment.
- Validate exact reference case.
- All 12 MP3s are required in the v2.80 public release.
- All 12 matching LRC files should ship, even while metadata-only.
- Missing-file fallback is resilience, not the desired shipped state.
- Track provenance separately.
- Remove genuinely dead assets, not state-gated assets.

## Success Criteria

The deployed site contains every file the current runtime can legitimately request, including the complete soundtrack and editable LRC layer, while development-only tooling remains outside the public host.

## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
