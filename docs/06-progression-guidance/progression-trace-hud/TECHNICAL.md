# Progression Trace HUD - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Progression Trace HUD > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Surfaces the next broad progression direction without turning the portfolio into a rigid quest checklist.

> This page is the canonical technical documentation for **Progression Trace HUD** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Ownership

The Progression Trace HUD is driven by derived progression state in `script.js`.

It observes existing systems rather than owning a separate progression counter.

## Inputs

Relevant inputs can include:

- Rare achievement count,
- Epic unlock,
- Wish charge,
- Blueprint repair state,
- validated Wish state,
- Legendary unlock,
- Boss history,
- Heart state,
- Shop ownership,
- section visits,
- Finale eligibility,
- postgame reveal,
- postgame completion state.

## Priority Evaluation

The renderer should evaluate guidance in a stable priority order.

A typical structure is:

```text
if critical blocked state
else if actionable major milestone
else if incomplete broad requirement
else if optional exploration prompt
```

The first matching condition becomes the current Trace.

## No Authority

The HUD must never mutate the state it describes.

For example:

- it can say Wish repair is needed,
- it cannot set the repair flag.

This keeps the guidance layer testable and prevents UI display bugs from changing progression.

## Refresh Triggers

Trace should refresh after:

- achievement unlock,
- Wish charge change,
- Blueprint repair change,
- validated Wish,
- Legendary unlock,
- Shop purchase,
- Heart milestone,
- Boss victory,
- section visit,
- Finale readiness change,
- postgame reveal.

## Theme

The HUD frame follows the active site theme.

Its content does not change simply because the visual theme changes.

## Hidden Requirements

Postgame-only requirements should remain excluded until:

```text
mippi-postgame-achievements-revealed-v1
```

is true.

## QA

For each major state:

1. use DEV command to create state,
2. inspect Trace text,
3. resolve state,
4. verify Trace advances,
5. reload,
6. verify persistent progression still produces the correct guidance.

Also test multiple simultaneous incomplete requirements and verify stable priority rather than rapid alternation.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
