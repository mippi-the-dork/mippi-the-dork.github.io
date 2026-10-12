# Intro Quick Profile - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Intro Quick Profile > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides an immediately scannable summary of role, experience, and specialization near the top of the page.

> This page is the canonical design documentation for **Intro Quick Profile** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Quick Profile exists for visitors who are scanning before they commit to reading the full portfolio.

It answers four high-level questions immediately:

- How experienced is this person?
- What kind of design work do they do?
- Do they work with smaller teams and consultation?
- Do they build Unreal Engine tools and workflows?

## Current Content

The four blocks are:

| Value | Label |
| --- | --- |
| `25+` | Years in Games |
| `Design` | Direction + Systems |
| `Indie` | Consultation |
| `UE5` | Tools + Workflow |

The content is intentionally compact and not interactive.

## Placement

The strip appears directly after the Hero and before Games.

This position lets the Hero establish personality while the Quick Profile immediately grounds that personality in professional qualifications.

## Design Rules

- Keep the number of items small.
- Prefer recognizable professional categories over clever labels.
- Avoid turning the strip into a second biography.
- Do not hide important qualifications behind hover.
- The strip should remain readable before any game progression begins.
- Theme changes may decorate the strip but should not alter the information.
- The strip should not become a progression meter.

## Responsive Intent

Desktop presents all four items in one row.

Narrow layouts split them into two columns so the text remains legible without horizontal scrolling.

## Relationship to Game Systems

The Quick Profile is professional-only content. It can receive visual theme treatment and Inspect or Design notes, but it does not itself gate or advance progression.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
