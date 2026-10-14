# Documentation Access - Technical

**Introduced:** v2.81. **Current specification:** v2.89.

## Surface and state

`#docs-toggle` resides in `#hud-modes` between Design and Inspect. The HTML element begins `hidden`. `initializeUnifiedHud()` and unlock state only show/enable it when Design Mode is **unlocked**, independent of Design Mode's current toggle state.

`mippi-docs-discovered-v1` (localStorage) remembers a click. `initializeUnifiedHud()` applies `attention-new` only if Docs has not been visited **and** `document.body.classList.contains('design-mode')`. `setDesignMode()` reevaluates attention on every toggle.

The Console `docs` command is in regular Help; the About CTA is a normal external link. All point to https://mippi-the-dork.github.io/docs/ and open a new tab. No docs HTML is embedded within the gameplay UI.

## QA

Initial first visit: Docs HUD control hidden. Purchase Design Mode: Docs control visible but quiet. Enable Design Mode while docs unvisited: attention pulses. Click: destination opens, persistent visited key recorded, pulse stops. Disable Design Mode: quiet. Reload: proper purchased/visited state restores. Console and About paths remain usable without capstone.
