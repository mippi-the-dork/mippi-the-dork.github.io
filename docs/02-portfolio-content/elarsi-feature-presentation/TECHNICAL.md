# Elarsi Feature Presentation - Technical Documentation

**Introduced:** v3.05. **Current documented version:** v3.10.

## Markup and semantics

The side-project section in `index.html` includes:

- `article.tool-feature.elarsi-feature` and `.tool-feature-copy`
- `.tool-feature-visual.elarsi-visual` with `aria-hidden="true"`
- CSS illustration elements `.elarsi-art`, `.elarsi-waveform`, `.elarsi-lyric` and `.elarsi-timeline`
- `a.inline-card-link` to `https://github.com/mippi-the-dork/Elarsi` with `target="_blank"` and `rel="noopener noreferrer"`

The art is a CSS-only decorative preview and should not become a functional audio waveform editor within the portfolio.

## Layout and themes

`style.css` switches `.tool-feature-grid` to `repeat(3,minmax(0,1fr))` at **min-width:1200px**. The card uses the same general `.tool-feature` construction as the other two projects, with dedicated Elarsi theme selectors and a vertically aligned GitHub link.

`v3.05` advanced the stylesheet query/cache identity; the main JavaScript was still v3.04 at this release. Current overall documentation version is v3.10; don't treat the v3.05 CSS cache suffix as a current runtime deploy instruction.

## QA

Verify the live breakpoint, link keyboard focus/new-tab behavior, Elarsi text and external destination, header/footer card alignment, CSS art dimensions and Rare/Epic/Legendary themes. No Elarsi application behavior runs inside the website.

See [Design](DESIGN.md) and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).
