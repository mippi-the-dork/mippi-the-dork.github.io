MIPPI PORTFOLIO v3.02 - LOCAL TEST INSTRUCTIONS

1. Extract the ENTIRE GitHub ZIP to a regular folder on your PC.
2. Double-click START_LOCAL_TEST.bat inside that extracted website folder.
3. Your default browser should open at http://127.0.0.1:8765/
   If port 8765 is busy, the script tries 8766 through 8774.
4. Leave the black server window open while you test.
5. When done, return to that window and press Ctrl+C to stop.

NO PYTHON OR NODE INSTALL REQUIRED
The launcher uses Windows PowerShell and a built-in .NET localhost web server.
You need an internet connection for externally hosted Three.js dependencies.

WHAT TO TEST
- Star continuously bounces across the width above the hotbar and disappears when its timer expires.
- Rupees can burst from meaningful UI interactions. External website links drop 2-3 more often.
- Rupees fall, bounce on the hotbar, settle briefly, and are only awarded when clicked.
- Mushrooms orbit a content card, including corners, and follow the card when scrolling.
- A single Key appears in the lower-right of a panel and remains until clicked.
- Regular UFOs follow sweeping corner paths (including top-to-top and bottom-to-bottom) or vertical sine waves.
- Defeated UFOs have a small chance to drop a Heart. Normal Boss and Super Boss guarantee Hearts.
- Boss travels in a repeating diamond and escapes after its timer.
- Super Boss moves horizontally with occasional direction reversals and stops during its Mega Laser.
- Six adds orbit the Super Boss in a single formation.
- Bones fall and spin.
- Shooting Stars continue using their original path.
- Shooting, click-radius, difficulty, theme switching and progression still behave normally.
- Run Epic and Legendary performance checks using dev profile sample 30.

NOTES
- This test is LOCAL. It does not change or publish your GitHub Pages site.
- Closing this server window stops the site server.
- Do not open index.html directly as a file; use this launcher.
- Keep all site files and assets alongside the BAT file.
- Changes are on the v3.02 draft branch, not on main.

V3.02 ADDITIONAL TESTS
- Mushrooms must float over content borders without clipping or panel-dependent scaling.
- At most three mushrooms can exist, with no two on the same panel.
- Only one bouncing Star may be visible at once.
- Expired Stars, Mushrooms, Bones, Rupees, UFOs fade and lift slightly instead of popping away.
- Castle SVG should have no faint horizontal divider line behind it.
- Enemy formations share a curve or sine path with 280ms stagger as INVASION grows.
- Active enemy population is capped at six for natural spawns.
- Confirm UI, shooting, Star Power, keys, and native browser links remain functional.
- Compare performance in Rare, Epic, Legendary, especially at high INVASION.
