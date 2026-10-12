# Resume Selector - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Resume Selector > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Offers short, medium, and long resume paths so visitors can choose the depth of career detail they want.

> This page is the canonical design documentation for **Resume Selector** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Different portfolio visitors want radically different levels of career detail.

The resume selector gives them agency instead of forcing one resume length to serve everyone.

The current choices are:

- 1 Page: fast scan.
- Short: more context.
- Long: the whole story.

## Information Philosophy

The website itself is curated.

The resume links exist for visitors who want evidence, chronology, or deeper history beyond what is appropriate in a single-page portfolio.

The selector explicitly communicates this with:

`The site is curated. The resumes are not. Pick the depth you want.`

## Design Rules

- The shortest option should be obvious for recruiters doing a fast pass.
- The longest option should be available without making it the default.
- Each option should communicate its expected reading commitment.
- All options are external documents.
- Opening a resume should not permanently navigate the visitor away from the portfolio if the browser allows a new tab.
- Resume interaction must remain optional.

## Rare Achievement Relationship

The Long resume awards `The Whole Story`.

The achievement recognizes a visitor who deliberately chooses the most detailed career version.

It must not make the Long resume misleadingly look like a game-only control. It remains a legitimate professional link first.

## Success Criteria

A visitor should be able to choose resume depth in one glance and understand why multiple versions exist.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
