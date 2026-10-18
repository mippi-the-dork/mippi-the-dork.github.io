# Browser Storage Fallback and Client-Side Game Integrity

## Storage policy
The portfolio is a public website, not an authenticated game server. Browser storage permission is **not required for gameplay**.

- The primary script routes progress reads/writes through adapters for `localStorage` and `sessionStorage`.
- When storage is denied, inaccessible, or starts throwing, an in-memory map supports the current page visit.
- When durable local storage is unavailable, show a small nonblocking notice that progress may not persist after reload.
- Existing storage keys and previously saved progress are retained when persistence is available.
- Full reset clears the active adapter state and reloads the page.
- Other standalone runtime modules should also be audited for direct storage reads if issues appear with strict browser privacy settings.

## Tampering and security boundaries
All gameplay, including Mippi Bird lives, coordinates and collisions, executes on the visitor's machine. No naming scheme, minification, obfuscation, deceptive function names, or local state checks can guarantee trustworthy scores or lives. Obscure names would also impair maintenance and debugging.

Instead:
- Keep the code's names accurate.
- Clamp invalid numerical values and positions before physics.
- Enforce lives and collision consequences in the actual simulation rather than only in the visible HUD.
- Avoid promoting browser-provided values into authoritative public records.
- If public competitive leaderboards or rewards are ever introduced, validate them through a trusted service with appropriate abuse controls.

## Regression QA
- [ ] Browser with normal storage: purchases, achievements, theme, lives and loadouts survive reload.
- [ ] Browser with storage denied: website initializes, Shop and arcade work during the visit, no uncaught storage exception, notice is readable.
- [ ] Private session: no unjustified guarantee of persistence.
- [ ] Clear/reset in fallback mode: state resets cleanly.
- [ ] Mippi Bird: zero lives ends a round; outside-arena position cannot avoid boundary damage.
- [ ] Mippi Bird: malformed nonfinite coordinates or values recover without freezing the loop.
- [ ] Check normal screen-size changes, reduced motion, mobile input and all themes.

**Validation status:** Source changes implemented; browser testing still required.
