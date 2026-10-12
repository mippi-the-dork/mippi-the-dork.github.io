# Tool Cards - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Tool Cards > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents each Unreal plugin with identity, status, links, and consistent iconography.

> This page is the canonical design documentation for **Tool Cards** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Tool cards must make small Unreal Engine utilities understandable at a glance.

Each card should answer:

- What is the tool called?
- What friction does it remove?
- Is it released or WIP?
- Can I access it publicly?
- Where should I click?

## Card Content Model

A standard card can contain:

- tool icon,
- status label,
- tool name,
- short purpose line,
- primary destination,
- secondary destination.

Released tools often use FAB as the primary visual action and GitHub as the free secondary action.

GitHub-only released tools clearly state that FAB is coming soon.

Public WIP cards provide GitHub without pretending there is a store release.

## Copy Style

Purpose lines are intentionally compact:

- Blueprint node styling
- Details presets
- Outliner hierarchy lock
- Viewport headlamp
- Area navigation links

The card is an index, not the plugin README.

## Icon System

Icons should feel consistent in size and treatment even when their source artwork differs.

Portal and Omni use their official supplied symbols rather than invented placeholder icons.

Theme treatment can recolor or decorate icons, but should preserve recognizability.

## Status Honesty

Status is part of the product information.

The site should distinguish:

- Released.
- Released / GitHub.
- WIP / Public.
- Private WIP roadmap concept.

Do not use a released visual treatment for a tool that cannot actually be downloaded as a release.

## Distribution Message

The tools section explicitly communicates that GitHub is free and FAB is a low-cost convenience/support option.

Individual cards should not contradict that broader message.

## Success Criteria

A visitor should be able to scan the grid and understand the tool ecosystem before opening any repository.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
