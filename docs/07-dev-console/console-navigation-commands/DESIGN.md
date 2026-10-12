# Console Navigation Commands - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Navigation Commands > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides command shortcuts for major portfolio sections, projects, resumes, and external destinations.

> This page is the canonical design documentation for **Console Navigation Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Navigation commands make the Console useful even for someone who is not interested in secret progression.

They reinforce the idea that the Console is a real alternate interface to the portfolio.

## Internal Navigation

Commands can jump to:

- top,
- About,
- Games,
- Career,
- Consulting,
- Crafting Play,
- Tools,
- Resumes,
- Project Heavy Water,
- Azure Altar,
- Unmark,
- Hero.

## External Navigation

Commands can open:

- GitHub,
- FAB,
- Steam,
- Unreal Source,
- Epic learning resources.

## NDA Command

`nda` is deliberately playful.

It navigates to Career but prints:

`ACCESS DENIED: NDA still stronger than console privileges.`

The command reinforces the confidentiality boundary instead of pretending a hidden Console can bypass it.

## Design Rules

- Console navigation must remain redundant with ordinary navigation.
- Internal commands should use smooth movement.
- External destinations should open separately.
- NDA command never reveals protected information.
- Command naming should be short and memorable.

## Success Criteria

The Console can function as a complete alternate navigation layer without becoming the only navigation layer.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
