# Your Studio Here Career Card - Design Documentation

**Introduced:** v3.09. **Current documented version:** v3.10.

## Purpose

The first featured card within **Selected Studios & Companies** is now **Your Studio Here**, positioned **before Mob Entertainment**. It provides a current-facing career / consulting invitation while retaining the professional career wall's existing styling and hierarchy.

Its displayed label is:

**Design Direction / Systems Design / Game Consulting · Today**

The card is deliberately wider on desktop, signaling an available working relationship rather than an additional past employer. It is not presented as a completed studio employment record.

## Presentation

At viewport widths **greater than 900px**, the card spans **two grid columns**, and separator rules remain aligned around this asymmetric first item. On smaller widths it returns to the normal stacked grid. The background uses the supplied 2048 × 576 artwork and a fallback gradient, with title/role text readable in Rare, Epic and Legendary themes.

## Art dependency

The intended source asset is `assets/career-real/yourstudiohere.png`. It is supplied with the v3.09/v3.10 handoffs, and the website references this path; the page must be tested with the actual image available. A fallback gradient is a graceful missing-image state, **not** proof the intended image loaded.

## Acceptance

Verify first-card position before Mob Entertainment, two-column span above 900px, stacked/narrow layout, no separator gaps, correct text legibility, real image load and theme treatment. The career history, other studio order and other portfolio systems remain unchanged.

See [Technical](TECHNICAL.md) and [v3.10 QA](../../QA/V3_05_TO_V3_10_REGRESSION_QA.md).


## v3.14 Current Behavior

v3.12 the first card opens an in-card work-availability reveal; v3.13 adds Wish-style Discord, LinkedIn and Email links plus all three resumes; **v3.14** compacts these into CONTACT and RESUMES horizontally labeled rows, short curated career copy and full-color background with no reveal scrollbar. The heading **Game CONSULTATION** supersedes earlier Indie CONSULTATION elsewhere in the hero.
