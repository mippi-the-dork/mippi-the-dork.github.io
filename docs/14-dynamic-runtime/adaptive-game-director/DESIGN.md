# Adaptive Game Director - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Adaptive Game Director > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses local session behavior to invisibly adjust ambient pacing and arcade generosity without changing professional content, rewards, or progression validity.

> This page is the canonical design documentation for **Adaptive Game Director** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The site has two fundamentally different visitor types living in the same page.

One visitor may be:

- reading case studies,
- checking career history,
- opening resumes,
- evaluating tools.

Another may be:

- collecting objects,
- fighting UFOs,
- opening the Console,
- chasing achievements,
- testing system combinations.

A fixed ambient game schedule treats both visitors badly.

The Adaptive Game Director exists to make the game layer more respectful of the way the current session is actually being used.

## Invisible by Default

The Director is not a character.

It does not announce:

`Difficulty increased`.

There is no Director HUD.

Its job is pacing, not performance grading.

The player should notice:

- a calmer professional reading experience,
- slightly more activity when actively playing,
- more forgiving targets after repeated misses.

They should not feel that a hidden system is changing the rules arbitrarily.

## Inputs

The Director consumes local session telemetry such as:

- flying objects collected,
- flying objects missed,
- UFO performance,
- achievement unlocks,
- Console use,
- Shop purchases,
- Mippi Bird starts,
- Doug petting,
- mode toggles,
- sections visited,
- professional dwell time,
- external/professional actions,
- recent meaningful game events.

It uses aggregate behavior.

It does not read private text or external analytics.

## Outputs

The Director can adjust:

- pickup delay,
- Shooting Star delay,
- UFO delay,
- Doug Bone delay,
- flying-object lifetime,
- hostile firing cadence,
- hostile projectile duration,
- Legendary target generosity.

It also coordinates:

- attention blocking,
- deferred opportunities,
- anti-drought help,
- Legendary opportunity guarantees,
- objective pacing.

## What Never Changes

The Director must never change:

- professional portfolio facts,
- achievement solutions,
- Rupee values,
- Shop prices,
- Wish validity,
- Finale validity,
- postgame requirements,
- whether a player "deserves" completion.

Adaptive pacing must never become adaptive truth.

## Easy Mode Override

Easy Mode intentionally supersedes Director difficulty/pacing multipliers.

The Director is not allowed to react to assistance by increasing challenge.

That would be adversarial.

When Easy Mode is active:

- Director delay multipliers become neutral,
- flight multipliers become neutral,
- hostile cadence multipliers become neutral,
- projectile-duration multipliers become neutral,
- target bonus becomes neutral.

Easy Mode's own aggressive spawn systems remain the explicit override.

## Locality and Privacy

The Director is entirely browser-local.

Its state and metrics are exposed only through a QA snapshot in the real browser developer console.

No server receives the model.

## Design Rules

- Director remains invisible in ordinary UI.
- Adapt pacing, not progression rules.
- Use aggregate local telemetry.
- Never punish professional reading.
- Never punish assistance use.
- Easy Mode always wins.
- Struggling requires evidence of actual attempts, not simply ignoring the game.
- State changes need hysteresis.
- Director-created opportunities still require player success.

## Success Criteria

The portfolio feels calmer to a reader, livelier to an engaged player, and more forgiving to someone repeatedly attempting and missing interactions, without any of those visitors needing to understand that a Director exists.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
