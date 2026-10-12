# HAL Denial Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > HAL Denial Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Responds to exact wish or wishes inputs with the intentionally unhelpful HAL-style denial branch.

> This page is the canonical design documentation for **HAL Denial Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

HAL Denial is a deliberately pedantic interpretation of Wish input.

If the player enters exactly:

- `wish`
- `wishes`

as the content of their validated Wish, the system refuses.

The branch exists as a classic computer-interface reference.

## Exact Match Rule

The match must remain exact.

This is important because the word `wish` naturally appears inside many normal sentences.

The HAL branch should not steal:

`I wish Mippi would help me`

from the Mippi branch or turn every generic Wish sentence into a denial.

## Result

The system responds:

`I'm sorry Dave, I'm afraid I can't do that.`

A red HAL-style eye occupies the screen briefly.

## Progression Meaning

Even though the authored response is "denied," this was still a validated Wish.

The shared validated-Wish progression already occurred before branch resolution.

That means:

- the charge was spent,
- Wish success was recorded,
- Legendary unlock was attempted,
- Finale Wish requirement was satisfied.

The denial is flavor, not a failed validation.

## Design Rules

- Match exact Wish/Wishes only.
- Keep HAL visual red as a semantic reference even under other themes.
- Overlay is brief and noninteractive.
- Do not treat this as Blueprint failure.
- Do not refund charge.
- Do not block Legendary progression.

## Success Criteria

The player receives a recognizable denial joke without breaking the consistency of validated Wish progression.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
