# About Section - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > About Section > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the personal summary, contact information, Doug, and the About-area interactive presentation.

> This page is the canonical design documentation for **About Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

About closes the professional page by connecting the work back to the person.

It should feel personal without becoming a detached biography.

The current framing presents Mippi as:

- veteran game designer,
- design leader,
- consultant,
- game design educator,
- Unreal Engine toolmaker.

The section reinforces continued hands-on practice with the phrase:

`Still making games, building useful things, helping other developers, and staying close to the actual craft.`

## About Panel

The left side combines:

- a lighter Three.js canvas,
- Mippi logo watermark,
- 25+ years callout,
- motion-oriented presentation.

The right side provides direct external profile destinations.

## External Profiles

Current links include:

- LinkedIn
- Crafting Play
- GitHub
- FAB
- Unreal Source
- Steam

These are deliberately explicit and conventional.

## Doug

Doug receives a dedicated card because he is both personal context and a recurring character in the site game layer.

The card communicates that Doug is genuinely part of the working environment before the hidden Coolness systems turn him into a mechanic.

Doug's gameplay documentation is canonical under the Doug and Coolness category.

## Design Rules

- About should humanize the portfolio rather than repeat Career.
- External profiles should be easy to scan.
- The 3D scene should be lighter than the Hero to avoid unnecessary rendering cost.
- Doug should read as authentic personal context even if the game layer is ignored.
- The section remains usable if the About Three.js scene does not initialize.
- Contact routes should remain available elsewhere through the Contact Panel and external profiles.

## Progression Relationship

About is one of the six major sections required for Grand Tour.

Doug interactions inside About can contribute to the `Best Boy` achievement and Coolness systems, but About itself is not gated.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
