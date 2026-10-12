# Tool Filtering - Design Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Tool Filtering > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets visitors filter the Unreal Tools catalog by meaningful states such as released and work-in-progress tools.

> This page is the canonical design documentation for **Tool Filtering** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Filtering exists to help visitors answer simple questions quickly:

- What is released?
- What is still in development?
- What is public?
- What is private?

The filter UI should remain intentionally simple. The complexity belongs in the tools themselves, not in browsing the portfolio.

## Current Filters

The visible filter set is:

- All
- Released
- WIP
- Public
- Private

Only one filter is active at a time.

## Behavior

Selecting a filter immediately hides tool cards that do not contain the selected state.

There is no Apply button, multi-select logic, query builder, or persisted filter preference.

`All` restores every card in the public grid.

## Design Rules

- The active filter must be visually obvious.
- Filtering must not reorder cards.
- Filters should describe tool state rather than arbitrary categories.
- Empty states should not be created accidentally through contradictory multi-select rules.
- The filter should not affect roadmap entries or feature projects unless intentionally redesigned.
- Filter state does not need persistence across reloads.

## Rare Achievement Relationship

Selecting `WIP` awards the Rare achievement `Under Construction`.

This works because the WIP filter is a normal useful portfolio control first and a hidden discovery trigger second.

The achievement should not alter filter behavior.

## Telemetry

Filter selections are meaningful professional interactions and can contribute to local session telemetry.

## Success Criteria

A visitor should understand the filter model without instructions and see the grid update immediately.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
