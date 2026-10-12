# Console Toy Commands - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Toy Commands > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Collects playful commands such as compile, shipit, joke, particles, Lumen, Nanite, and other non-critical experiments.

> This page is the canonical design documentation for **Console Toy Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Console toys reward experimentation without becoming required progression.

They make the Console feel like a place worth exploring.

The best toy commands either:

- reference Unreal habits,
- change presentation,
- spawn a playful system,
- make a joke about development.

## Current Examples

### Unreal-Flavored

- `compile`
- `slowmo`
- `easy mode`
- `lumen`
- `nanite`
- `stat fps`
- `stat unit`

### Presentation

- `particles`
- `vibe`
- `theme`
- `inspect`
- `design`

### Game Layer

- `ufo`
- `twinkle`
- `shroom`
- `rupee`
- `hey listen`
- `shop`
- `play`

### Flavor

- `doug`
- `shipit`
- `joke`
- `stars`

## Design Rules

- Toys should not destroy persistent progression.
- Toggled toys should have a clear off path.
- Spawning toys should not permanently flood the screen.
- Joke output should remain short.
- Unreal references should be recognizable but understandable enough in context.
- Required progression should not depend on guessing a toy command unless another guidance path exists.

## Success Criteria

A visitor can type a few plausible development commands and repeatedly get delightful, coherent responses.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
