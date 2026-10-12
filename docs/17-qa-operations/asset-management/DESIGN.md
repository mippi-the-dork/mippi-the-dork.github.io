# Asset Management - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Asset Management > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines what belongs in the public asset set, how local references should be validated, and which development-only files must remain outside the deployed runtime package.

> This page is the canonical design documentation for **Asset Management** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio accumulated many image, audio, and development files during iteration.

Asset management has two goals:

1. keep every referenced public asset available,
2. avoid shipping dead, private, or development-only files simply because they happened to exist in the working folder.

This is both cleanliness and risk reduction.

## Public vs Development

The public runtime should contain what a visitor needs.

That includes:

- current HTML,
- CSS,
- JavaScript,
- referenced images,
- icons,
- gallery assets,
- optional music files when authored,
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

These files are useful during development and QA.

They are not runtime dependencies.

## Local Asset Validation

Release validation should scan local references from:

- HTML,
- CSS,
- JavaScript

and verify the files exist with matching case.

This matters especially for static hosting where:

```text
Asset.png
```

and:

```text
asset.png
```

can behave differently depending on environment.

A local Windows filesystem may hide a case mismatch that a hosted environment exposes.

## Music Assets

The Music Player has an intentional exception.

It references six canonical paths:

```text
assets/music/song-01.mp3
...
assets/music/song-06.mp3
```

Those files can legitimately be absent while the player UI is still under content staging.

The runtime treats absence as:

```text
MUSIC FILE PENDING
```

rather than a fatal asset validation error.

A final music-ready release should of course verify all six.

## Asset Provenance

`ASSET_NOTES.md` tracks broad provenance and usage context for:

- Mippi-supplied branding,
- Heavy Water imagery,
- Doug photos,
- Azure Altar screenshots,
- Unreal plugin icons,
- career/reference imagery.

The public package does not need that development note to render.

The note exists for source/release management.

## Unused Asset Cleanup

Before release, compare:

- files in `assets/`,
- references in source.

Remove files that are clearly obsolete unless they are intentionally retained for:

- alternate runtime state,
- gallery content,
- future authored music slot,
- source provenance.

Do not delete only because an asset is not visible on the default first screen.

Many assets are state-gated.

## Design Rules

- Public host contains runtime assets only.
- Development notes/helpers stay out of deployment.
- Validate local references and case.
- Treat intentionally pending music as a documented exception.
- Track provenance separately.
- Remove genuinely dead assets before release.
- Do not remove state-gated assets merely because they are not visible in a smoke test.

## Success Criteria

The deployed site contains every file the runtime can legitimately request and little else.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
