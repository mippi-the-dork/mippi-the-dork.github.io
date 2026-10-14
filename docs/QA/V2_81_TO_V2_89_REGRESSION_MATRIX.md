# v2.81–v2.89 Regression Matrix

**Purpose:** Verify each release-specific change without implying that the diagnostics resolved the Windows FPS regression.

| Version | Area | Test | Expected |
| --- | --- | --- | --- |
| 2.81 | HUD | Fresh/Rare/Epic/Legendary, resize | Four semantic groups, existing controls and events intact |
| 2.81 | Hearts | Reach 5/5, collect sixth Heart | Exactly five glyphs, 1 banked Mippi Bird life, no repeated Unreal Source reward |
| 2.81 | Castle | Claim 4/4 while friendly pickups airborne | Nine large fireworks bursts, 3 Rupees, only snapshot of airborne friendlies auto-collected within ~1s |
| 2.81 | Invasion | Kill 13 UFOs quickly and escape/retry Boss | 0–10 bounded wave, one pending encounter, 4-kill reacquire; no backwards meter |
| 2.81 | Console | Run `compile`, dismiss | Modal opens/closes, no JS error |
| 2.81 | Lyrics | ELRC line+word timing and seek | Word highlights update; timestamp text not visible |
| 2.82 | Legendary shots | Rapid-click moving targets | <=14 shared bullets, 1.8s cleanup, normal target click rewards, no stuck bullets |
| 2.82 | Director | Open/close Console, Ledger, toasts | Friendly opportunities resume, no false permanent attention block |
| 2.82 | Notifications | Objective + 4 toasts | Max 3 toasts above independent Objective; oldest evicted; no overlap |
| 2.82 | Achievement rarity | Legendary theme + mixed rarities | Rare stays blue, Epic purple, Legendary gold |
| 2.82 | Castle | Trigger fireworks | 33px particles, expanded reach and 2150ms lifetime |
| 2.83 | Wish | Charge and break BP | WISH READY / BLUEPRINT ERROR cue; TRY WISH / OPEN BLUEPRINT execute real commands |
| 2.83 | HUD | Idle/unlocked/hover | Quiet framed buttons, stronger actionable feedback, Docs quiet outside active Design |
| 2.83 | Music | Collapse and expand | Play, Next, Expand share centered row; 326px width; lyrics panel matches player height |
| 2.84 | Ledger/Docs | Fresh then unlock Design Mode | Ledger locked until Signal; Docs button hidden until entitlement; context-limited pulse |
| 2.84 | Rare pickup | Before Epic and after closing Mippi Bird | Natural Rupee/Heart opportunities, closed Bird does not block |
| 2.84 | Cursor | Mushroom power, change focus/theme | Native pointer visible outside page/modal; enlarged arrow doesn't get stuck |
| 2.85 | HUD | Switch Theme/Inspect/Interact/Design labels | Injected SVG icons remain centered; five Heart glyphs only |
| 2.85 | Music | Cycle Loop; reload | Off -> 1 -> All -> Off; stored values retain compatibility |
| 2.85 | Ledger | Hover wheel, page scroll | Ledger consumes wheel only while scrollable |
| 2.85 | Console | Type `particles`, inspect Help | No dispatch and no Help entry; internal effects still operate |
| 2.85 | Shots | Delayed frames, normal/Golden Trigger | 50ms velocity-predictive target cache, smooth motion, 120ms delta cap; real FPS not yet established |
| 2.86 | Three.js | Hero/About scroll, theme, minimize | Visible scene draws, offscreen stops, correct color on resume; `dev perf` readout |
| 2.87 | HUD boot | Cold load, use `dev profile boot` | No floating legacy control flash; 12 relocated control nodes measured |
| 2.87 | Perf Lab | Record, isolate, export | Locally exported JSON, hidden DEV commands, no unintended game progression reset |
| 2.88 | Named timing | Baseline then `hudlogic/hero/projectiles off` | Isolated subsystem suspends, report named cost distribution, restore afterward |
| 2.89 | Objective clock | A/B/C/D captures | Freeze text only; objective deadline and reward unchanged |
| 2.89 | Timer/UI correlation | Export JSON | timerEvents, UI snapshots, nearby activity and optional browser scripts populated where supported |

**Required manual checks:** Windows hardware FPS/smoothness across all rarities; live MP3 and user-authored LRC without overwriting them; GitHub Pages cold load; browser reduced-motion; full natural progression and Finale after restoring all profiling isolates.

See [Performance Profiling Procedure](PERFORMANCE_PROFILING_V2.89.md).
