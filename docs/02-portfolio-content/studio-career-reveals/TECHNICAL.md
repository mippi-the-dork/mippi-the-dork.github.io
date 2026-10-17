# Studio Career Reveals - Technical Documentation

**Introduced:** v3.12; **current presentation:** v3.14.

## Structure

`index.html` gives each of the fourteen `.studio-card[data-studio-detail]` elements a full-card `button.studio-card-open[aria-expanded][aria-controls]`, a decorative `.studio-card-cue`, and `section.studio-card-reveal[aria-hidden][inert]` containing a close button, role kicker, short paragraph and one-to-three curated bullets.

The Your Studio Here card includes `.studio-career-links` with **CONTACT** and **RESUMES** groups. Since v3.14, each group is a **horizontal row** with its label to the left and small button links to the right, not the v3.13 two-column stacks.

## Event and focus flow

`script.js` delegates events from `.studio-grid`. `setExpanded(card, expanded, {restoreFocus})` toggles `.studio-expanded`, synchronizes `aria-expanded`, `aria-hidden`, `inert`, and opener label, focuses the close control on opening and restores opener focus on closing via Escape or dismiss. Opening a second card closes the previous active card. A click within the reveal is a close interaction, except links/buttons must retain their normal activation semantics and be verified with real-browser tests.

## CSS and supersessions

`.studio-card-reveal` is absolutely positioned, clipped to its card, `translateY(101%)` to `translateY(0)` over 0.36s; reduced-motion bypasses transition. v3.14 reduces body/bullet sizes and spacing, increases minimum card heights (224px desktop, 232px <=900px, 244px <=560px, 260px for narrow Your Studio Here), hides scrollbars and retains fully saturated art. The v3.13 grayscale hover/focus rules are overridden with `filter:none!important`; accent overlay remains.

These CSS values describe current implementation, not a guarantee that every translated/narrow view fits; browser QA is required.

See [Design](DESIGN.md) and [v3.14 QA](../../QA/V3_11_TO_V3_14_REGRESSION_QA.md).
