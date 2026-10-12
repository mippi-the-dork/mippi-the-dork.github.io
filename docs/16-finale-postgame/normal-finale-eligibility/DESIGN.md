# Normal Finale Eligibility - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Normal Finale Eligibility > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the broad engagement requirements for reaching the authored normal Finale without requiring 100 percent completion.

> This page is the canonical design documentation for **Normal Finale Eligibility** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The normal Finale is the authored stopping point for the portfolio.

It is intentionally not the reward for doing absolutely everything.

The player should be able to reach closure after demonstrating broad engagement across the major systems without:

- buying every Shop item,
- defeating the Super Boss,
- maxing Doug,
- completing every postgame challenge,
- finding every later completion condition.

This creates two distinct end states:

### Normal Finale

You meaningfully experienced the portfolio.

### True Completion

You mastered the optional systems after the Finale and completed the postgame layer.

That distinction is central to the endgame design.

## Current Requirements

v2.78 requires all seven of the following:

1. all 10 original Rare Signals,
2. Legendary unlocked,
3. at least one successful validated Wish,
4. at least one Boss victory,
5. 5 out of 5 Hearts,
6. at least one Shop item owned,
7. at least five of the six major professional sections visited.

The six major professional sections are:

- Games,
- Career,
- Consulting,
- Crafting,
- Tools,
- About.

## Why These Requirements

### All 10 Signals

Proves the player completed the first discovery chapter.

### Legendary

Proves the player continued through Epic and solved the Shooting Star / Blueprint / Wish chain.

### Validated Wish

Proves the central Epic progression puzzle actually resolved.

### Boss Victory

Proves the player meaningfully engaged with the arcade layer.

A normal Boss or Super Boss victory can satisfy this condition.

### 5 Hearts

Proves the player engaged with collectible progression.

### Shop Ownership

Proves the Rupee economy was not ignored completely.

Only one owned item is required for the normal ending.

### Five of Six Professional Sections

Prevents the game layer from completely replacing the professional portfolio.

The visitor must still spend time moving through the actual work.

Requiring five rather than all six preserves flexibility.

## Important Heart Rule

The v2.78 implementation checks:

```text
Heart count >= 5
```

It does not currently require the separate Unreal Source Heart reward to have been claimed.

The claim-ready reward and Finale eligibility are therefore separate rules.

This is worth documenting explicitly because older design notes described the five-Heart reward more broadly.

## Section Visit Scope

Normal Finale section readiness uses current session telemetry.

It counts visits where the session telemetry reports at least one visit for the six professional sections.

This means the normal Finale section condition is more session-oriented than the persistent postgame `Grand Tour` condition, which uses its own persistent section-history set.

## Broad Completion Philosophy

The requirements sample several systems rather than demanding exhaustive mastery of each one.

That is deliberate.

The normal Finale should say:

> You engaged with the whole shape of this portfolio.

It should not say:

> You completed every optional joke before being allowed to see the ending.

## Design Rules

- Normal Finale is not 100 percent completion.
- Require all 10 original Signals.
- Require Legendary progression.
- Require one successful validated Wish.
- Require one Boss victory, normal or Super Boss.
- Require 5 Hearts.
- Require at least one Shop item.
- Require at least five of six professional sections.
- Do not require all Shop items.
- Do not require Super Boss.
- Do not require all six sections.
- Do not require postgame achievements.
- Current implementation does not require Heart reward claim.
- Finale eligibility must remain independent from active visual theme.

## Success Criteria

The normal Finale becomes available after a visitor has meaningfully touched discovery, progression, combat, collectibles, economy, and professional content, while still leaving substantial postgame mastery available.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
