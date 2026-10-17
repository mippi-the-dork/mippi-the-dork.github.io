# Graphics Capability Fallback - Design Documentation

**Introduced:** v3.13. **Current documented version:** v3.14.

## Intent

The portfolio's 3D elements are optional presentation layers, not a requirement to view work, navigate the site or use its interactive systems. When WebGL is unavailable or a clearly identified software renderer is detected, the site switches to a lightweight, useful **2D Hero navigation** and does not start the Ambient or About Three.js scenes. This is distinct from lowering visual quality merely because a user's machine is slow.

## Visitor experience

A browser-help notice appears **above the sticky site header**, so it remains readable without competing with the main navigation. It includes a browser-specific graphics acceleration help link and a dismissal control. The Hero fallback presents real links to Games, Career, Consulting and Tools, preserving the v3.07 accessible signal-navigation design. The rest of the portfolio remains usable, including professional content, achievements and Shop controls.

The warning is a best-effort browser detection, **not** a definitive statement about the visitor's GPU: browser interfaces cannot universally report hardware acceleration status. The advice should be actionable and should not label a capable GPU as certainly defective.

## Behavior boundaries

The normal Three.js Hero, Ambient and About scenes remain active on supported renderers. An unavailable WebGL context or an identified software renderer takes the fallback path. WebGL context loss and scene initialization failures retain the earlier v3.07 fallback/recovery behavior.

## Acceptance

Check the notice's placement, dismissal, linked instructions for major browsers, usable Hero signals by keyboard/mouse, normal portfolio interaction, and that the 3D scenes do not start under the software/unavailable-WebGL branch. Confirm normal GPU systems do not receive erroneous blocking treatment, including where renderer-detail extensions are missing.

See [Technical](TECHNICAL.md), [Hero Navigation Fallback](../hero-navigation-fallback/DESIGN.md), and [v3.14 QA](../../QA/V3_11_TO_V3_14_REGRESSION_QA.md).
