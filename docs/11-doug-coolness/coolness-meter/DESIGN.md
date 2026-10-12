# Coolness Meter - Design Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Coolness Meter > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes Doug's morale progression visible as a persistent 0 to 100 percent HUD track.

> This page is the canonical design documentation for **Coolness Meter** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Coolness gives Doug progression anticipation.

Without a meter, Bone pickups would be isolated jokes.

With a meter, every Bone communicates:

> Doug is getting closer to something.

The meter therefore makes the future Cool Mode payoff legible before the player reaches it.

## Visibility

The Coolness meter should not occupy the HUD on a fresh page.

It becomes visible once Doug progression has become relevant.

The current visibility condition includes:

- Coolness above zero,
- Cool Mode currently active,
- at least one Doug Bone collected in the current session.

This means the meter arrives as a consequence of play.

## Range

The standard display is:

```text
COOLNESS
0% to 100%
```

At full limit state the numeric display changes to:

```text
COOL!
```

This makes the active state readable even without inspecting the fill bar.

## Fill Meaning

The meter is a direct representation of current Coolness progress.

Normal Bone:

```text
+25
```

Star-powered Bone:

```text
+50
```

This creates simple mental math:

- four normal Bones from zero,
- or two Star-powered Bones,
- or mixed progress.

## Limit Presentation

At maximum, the meter switches to a rainbow animation.

The rainbow is deliberately allowed to override normal rarity styling.

This is a temporary state signal, not a fourth permanent site rarity.

## Parallel Progression

Coolness lives beside other independent HUD tracks such as:

- Hearts,
- Rupees,
- Castles,
- Invasion,
- Meta Trace.

It is not converted into generic XP.

That preserves the identity of Doug's system.

## Persistence Philosophy

Current Coolness is session-persistent.

This means a reload in the same session can preserve progress toward 100 percent.

Long-term max history is stored separately for postgame mastery.

The distinction is useful:

- short-term meter progress belongs to the current play session,
- "I reached maximum Coolness" is a lasting accomplishment.

## Design Rules

- Meter is hidden before Doug progression matters.
- Current value is clamped 0 to 100.
- Full active state says `COOL!`.
- Limit state visually overrides ordinary theme fill.
- Meter never becomes the player's health.
- Current progress is separate from historical max.
- The meter should remain compact enough to coexist with other HUD tracks.

## Success Criteria

The player can look at the HUD and immediately understand how close Doug is to entering Cool Mode.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
