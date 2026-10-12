# Discovery Hint Control - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Discovery Hint Control > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides contextual hints for the next undiscovered Rare Signal and later progression guidance when all original Signals are complete.

> This page is the canonical design documentation for **Discovery Hint Control** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Hints exist to prevent discovery from turning into frustration.

The Hint control should preserve mystery while giving the player a nudge toward a real next action.

It is not intended to be a complete walkthrough.

## Rare Phase

During the original Signal hunt, Hint should point toward the next undiscovered Rare achievement in a way that suggests context rather than naming the exact action.

Examples:

- look at the header,
- try the Perspective Visualizer,
- inspect the Unreal Tools filters,
- spend more time with Doug.

## Post-Rare Phase

Once all 10 Rare Signals are complete, Hint should stop pretending there are more original secrets.

It can instead redirect toward larger progression such as:

- Epic systems,
- Wish preparation,
- Finale requirements,
- postgame completion.

## Attention Placement

Hint lives in the fixed control strip with:

- Design Mode,
- Inspect Mode,
- Interact Mode.

It should remain visible enough to be useful without constantly pulsing.

## Design Rules

- Hint never auto-completes an achievement.
- Hint text should preserve discovery when possible.
- After Rare completion, Hint must evolve rather than repeat obsolete advice.
- Hint should not compete with stronger actionable attention cues.
- The player should always be able to ignore it.

## Success Criteria

A stuck player can make progress after using Hint without feeling like the site simply handed them the answer.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
