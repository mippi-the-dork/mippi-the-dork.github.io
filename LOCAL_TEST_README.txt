MIPPI PORTFOLIO v3.00 - LOCAL TEST INSTRUCTIONS

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
- Compare new HUD meter and heart icons in Rare, Epic, Legendary.
- Collect Rupee, Heart, Key, Mushroom, Star, Bone; check castle.
- Examine the regular UFO, Boss, Super Boss, and Super Boss adds.
- Confirm the shooting star still has its ORIGINAL distinct art.
- In dev console, compare: dev fx renderer dom
                          dev fx renderer canvas
  Stop the combat benchmark before changing FX renderer.
- Capture new 30-second v3.00 performance runs in Epic and Legendary.
- Check your unlocked music player and individual MP3 downloads.

NOTES
- This test is LOCAL. It does not change or publish your GitHub Pages site.
- Closing this server window stops the site server.
- Do not open index.html directly as a file; use this launcher.
- Keep all site files and assets alongside the BAT file.
- Changes are on the v3.00 draft branch, not on main.
