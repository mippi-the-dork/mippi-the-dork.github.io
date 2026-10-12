# Contact Panel - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Contact Panel > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a dedicated way to reach Mippi and is also used as the payoff for the Mippi Wish branch.

> This page is the canonical design documentation for **Contact Panel** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Contact Panel is a professional payoff reached through a playful route.

A visitor can already find external identity links in About. The Contact Panel exists so the Wish system can turn a joke or authored input into a genuinely useful next action.

This is an example of the site's core philosophy: playful interaction should be capable of terminating in professional value.

## Trigger

The Contact Panel is opened by the authored Mippi Wish branch.

Wish text involving Mippi can route to:

`Contact Mippi`

The result message states that the wish is granted and Mippi is available to work on the visitor's project.

## Contact Actions

The current panel provides:

- Discord
- LinkedIn
- Email Mippi

These actions intentionally cover:

- direct chat,
- professional profile/message route,
- traditional email.

## Design Rules

- Contact actions must be explicit and readable.
- The panel must never auto-send a message.
- The Wish branch can be humorous, but the contact options themselves should be straightforward.
- The user decides whether to leave the site or contact Mippi.
- The panel must have a visible close action.
- Clicking the surrounding overlay may close the panel.
- Escape should close it.
- Contact information should be kept current.

## Relationship to About

About provides always-available professional identity links.

The Contact Panel is not the only way to contact Mippi. It is a focused call-to-action surfaced through a playful system.

## Success Criteria

A visitor who arrives through the Wish should immediately understand how to reach Mippi without having to decode another joke.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
