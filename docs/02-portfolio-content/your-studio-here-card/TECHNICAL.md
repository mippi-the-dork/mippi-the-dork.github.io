# Your Studio Here Career Card - Technical Documentation

**Introduced:** v3.09. **Current documented version:** v3.10.

## Document structure

`index.html` inserts `article.studio-card.studio-yourstudio` as the first child of the `.studio-grid` in **Selected Studios & Companies**, preceding `.studio-mob`. The card includes:

- `.studio-image.studio-yourstudio-image` as the decorative background holder
- `strong` label **Your Studio Here**
- `span` label **Design Direction / Systems Design / Game Consulting · Today**
- Decorative `.studio-art` treatment

The card uses the same shared career-wall visual language rather than introducing a new page or modal.

## CSS and image

`style.css` includes a `.studio-yourstudio .studio-yourstudio-image` background using `url('assets/career-real/yourstudiohere.png')` with a blue gradient fallback. The asset in both v3.09 and v3.10 handoff packages is **2048 × 576 PNG**. It is an actual website asset dependency, not a Markdown/documentation attachment.

At **min-width:901px**, `.studio-grid > .studio-yourstudio` spans two columns and has additional height; after shifting subsequent children, the grid separator rules account for the new column progression. At **max-width:900px**, return it to an ordinary one-column item and keep text bounds comfortable.

The original v3.09 handoff reported that the PNG was not checked in alongside the initial CSS change. Consequently, regression testing must verify actual network success and rendered pixels, not infer success from correct CSS or the presence of a fallback gradient.

## QA

Check network response for `assets/career-real/yourstudiohere.png`, grid separator positions at 900/901 and wide desktop, card order/labels, fallback behavior, themes and narrow-screen text readability. This documentation update does **not** itself install the PNG into the website source tree.

See [Design](DESIGN.md) and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).
