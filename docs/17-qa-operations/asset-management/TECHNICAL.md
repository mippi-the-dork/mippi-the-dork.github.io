# Asset Management - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Asset Management > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines what belongs in the public asset set, how local references should be validated, and which development-only files must remain outside the deployed runtime package.

> This page is the canonical technical documentation for **Asset Management** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
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
```

Any intentionally public repository documentation can be handled separately from the runtime-package cleanup.

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
- dynamically created image paths.

A useful release audit should scan all three file types.

## Case Sensitivity

Validation should compare exact path case.

This is particularly important for GitHub-hosted/Linux-backed serving.

## Music Exception

Current expected files:

```text
assets/music/song-01.mp3
assets/music/song-02.mp3
assets/music/song-03.mp3
assets/music/song-04.mp3
assets/music/song-05.mp3
assets/music/song-06.mp3
```

v2.78 is explicitly designed to tolerate missing versions of these files.

If validating a pre-music package, list them as known pending rather than reporting six unexplained fatal errors.

## Asset Notes

Development source contains:

```text
ASSET_NOTES.md
```

with provenance/context.

Because it matches:

```text
*_DEV.md
```

only partially? No. `ASSET_NOTES.md` does not match that suffix.

Treat it as source documentation rather than a runtime dependency and exclude it from a minimal public runtime package unless there is a deliberate reason to publish it.

## Generated Python Artifacts

If local scripts create:

```text
__pycache__
*.pyc
```

remove them before packaging.

They are never required by the browser.

## QA

- Run a clean public-package file listing.
- Scan for development-only names.
- Resolve every local asset reference.
- Validate case.
- Load every gallery.
- Toggle all themes to exercise alternate Doug images.
- Open every tool card using supplied icons.
- Unlock Music and verify missing/installed track states as expected.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
