# Azure Altar Gallery - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Azure Altar Gallery > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Azure Altar as a long-running workflow testbed with a dedicated screenshot gallery interaction.

> This page is the canonical technical documentation for **Azure Altar Gallery** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Feature Markup

The Tools feature uses:

```html
<div class="tool-feature azure-altar"
     role="button"
     tabindex="0"
     aria-label="Open Azure Altar screenshot gallery">
```

This allows pointer and keyboard opening.

## Dialog Markup

The gallery root is:

```html
<div class="azure-gallery"
     id="azure-gallery"
     aria-hidden="true"
     role="dialog"
     aria-modal="true"
     aria-label="Azure Altar screenshot gallery">
```

Important children:

- `.azure-gallery-backdrop`
- `.azure-gallery-close`
- `#azure-gallery-image`
- `#azure-gallery-counter`
- `.azure-gallery-prev`
- `.azure-gallery-next`
- `#azure-gallery-thumbs`

## Image Set

`script.js` generates ten image records.

Full images:

```text
assets/azure-gallery/azure-01.webp
...
assets/azure-gallery/azure-10.webp
```

Thumbnail pattern:

```text
assets/azure-gallery/azure-01-thumb.jpg
...
assets/azure-gallery/azure-10-thumb.jpg
```

## Open Flow

`openAzureGallery(index = 0)`:

1. records telemetry,
2. saves `document.activeElement`,
3. renders thumbnails if needed,
4. loads requested image,
5. adds `.open`,
6. sets `aria-hidden="false"`,
7. adds `azure-gallery-open` to body,
8. focuses the close button.

## Image Navigation

`showAzureGalleryImage(index)` wraps indexes modulo gallery length.

It updates:

- image `src`,
- image `alt`,
- counter,
- active thumbnail,
- `aria-current`.

It also preloads adjacent full images to make next/previous navigation feel immediate.

## Close Flow

`closeAzureGallery()`:

- removes `.open`,
- restores `aria-hidden="true"`,
- removes body class,
- removes image `src`,
- restores prior focus where possible.

## Input Support

- click card
- Enter / Space on card
- close button
- backdrop click
- Escape
- left/right arrow keys
- previous/next buttons
- touch swipe over 42 pixels

## Telemetry

Opening records:

- gallery open count
- meaningful event `azure_gallery_opened`

Viewing images records unique gallery-image IDs.

## QA

- Open by mouse and keyboard.
- Browse all ten images in both directions.
- Verify wraparound from first to last and last to first.
- Verify thumbnails update `aria-current`.
- Verify Escape closes.
- Verify backdrop closes.
- Verify focus returns to the opening control.
- Verify touch swipe.
- Verify no stale full image remains loaded after close.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
