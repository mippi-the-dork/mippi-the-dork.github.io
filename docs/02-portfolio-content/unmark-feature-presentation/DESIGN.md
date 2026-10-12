# Unmark Feature Presentation - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Unmark Feature Presentation > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Unmark as a documentation-focused Unreal tool and hosts the Unmarked discovery interaction.

> This page is the canonical design documentation for **Unmark Feature Presentation** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Unmark is larger than a normal tool card because its concept needs explanation.

It represents documentation as part of the Unreal Engine workflow rather than something that lives completely outside the editor.

The feature communicates that standard Markdown can remain portable while Unreal-aware presentation brings documentation closer to the work.

## Current Message

The feature highlights:

- native Markdown,
- Unreal assets,
- graph cards,
- documentation,
- editor workflow,
- source-control-friendly files,
- Unreal-aware links,
- embedded documents.

The site should avoid promising functionality that is still experimental or not part of the current Unmark implementation.

## Status

The feature is explicitly:

- In Development.
- Private repository.
- Planned for FAB + GitHub at release.

This is separate from the public WIP card model used by Portal and Omni.

## Discovery Interaction

The visual identity is a button with class `.unmark-secret`.

Clicking it awards the Rare achievement `Unmarked`.

The secret interaction is intentionally attached to the project identity rather than arbitrary text.

The professional feature remains complete without discovering the achievement.

## Design Rules

- Documentation should be presented as a workflow tool, not a novelty.
- Keep Markdown compatibility central.
- Keep WIP status honest.
- Do not expose a private repository link.
- The achievement interaction must not interfere with reading the logo or feature copy.
- When the repository becomes public, update status and release links.

## Success Criteria

A visitor should understand the problem Unmark is trying to solve even if they never discover the secret achievement.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
