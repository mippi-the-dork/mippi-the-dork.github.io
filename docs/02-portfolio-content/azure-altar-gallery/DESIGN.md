# Azure Altar Gallery - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Azure Altar Gallery > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Azure Altar as a long-running workflow testbed with a dedicated screenshot gallery interaction.

> This page is the canonical design documentation for **Azure Altar Gallery** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Azure Altar represents long-term practical Unreal Engine R&D.

The important idea is not one screenshot. It is that the same side project has been maintained across engine generations so new technology can be learned, validated, and demonstrated in a real working environment.

The gallery gives visual evidence without turning the Tools section into a permanently huge image wall.

## Feature Presentation

The Azure Altar feature communicates:

- 7+ years,
- every Unreal Engine version,
- R&D testbed,
- practical demonstration project.

The card itself is large enough to explain the purpose before asking the visitor to open the gallery.

## Gallery Experience

Opening the feature presents a focused screenshot viewer with:

- current image,
- `N / 10` counter,
- previous/next controls,
- thumbnail strip,
- keyboard arrow navigation,
- Escape to close,
- touch swipe.

The gallery is intentionally player-dismissed. It does not auto-advance.

## Design Rules

- Gallery interaction should feel optional.
- Opening the gallery should not navigate away from the portfolio.
- The first screenshot should appear quickly.
- Adjacent navigation should feel responsive.
- Keyboard controls should be discoverable.
- Closing should return the visitor to where they were.
- The gallery should not contribute required progression.

## Relationship to Azure Altar Teaser

Games contains a smaller Azure Altar teaser that links to Tools.

The full feature and gallery live in Tools.

## Success Criteria

The visitor should leave with the impression that Azure Altar is a long-running practical learning environment, not just a collection of attractive screenshots.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
