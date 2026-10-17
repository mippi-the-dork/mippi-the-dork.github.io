# v3.11–v3.14 Release Regression QA

**Current documented version:** v3.14. The implementation PRs were merged; this checklist requires real-browser confirmation rather than presuming it was completed.

## Cursor, themes, Console (v3.11–v3.12)

- [ ] Rare always shows its visible 22px base AoE ring. Star Power adds 14px and renders a rotating rainbow **conic-gradient** ring. Mushroom power adds 17px per actual level; rarity does not change base radius. Confirm click behavior and ring scale in Rare/Epic/Legendary.
- [ ] Design Mode icon visibly overlaps square and circle. TRY WISH and OPEN BLUEPRINT pulses are readable and do not obscure controls.
- [ ] Console HUD button and tilde/backtick toggle both open and close Console, including when typing in its input. Check keyboard accessibility and focus.
- [ ] Complete progression in Epic or Rare then reload: restore the **last selected available rarity**, not force Legendary; persisted unlocks still gate unavailable themes.
- [ ] In the Music Player, clicking a song attempts playback during the click gesture; if browser policy blocks it, show **CLICK PLAY TO START**. Lyrics-only actions must not select/start songs.

## Studio career reveals (v3.12–v3.14)

- [ ] There are exactly **14** Selected Studios cards. Each opens a within-card slide-up reveal, only one open at a time, with accessible `aria-expanded`, `aria-hidden`, `inert` and close focus/return.
- [ ] Card click, Close, Escape and switching cards dismiss correctly. Nested external links activate and remain keyboard-accessible.
- [ ] Each studio has **1–3 concise, nonduplicated bullets** reflecting the work; no panel needs an internal scrollbar even on narrow widths.
- [ ] Your Studio Here uses compact **CONTACT** row (Discord, LinkedIn, Email) and **RESUMES** row (1 Page, Short, Long), aligned label-left/buttons-right, rather than tall two-column stacks.
- [ ] Backgrounds remain in full color at rest, on hover, keyboard focus and for the entire dismiss animation; no grayscale flash. Accent overlay handles hover.
- [ ] The main Hero service label is **Game CONSULTATION**, not Indie CONSULTATION.
- [ ] Verify current full-resolution `assets/career-real/yourstudiohere.png` loads and displays, after v3.11 optimized WebP treatment and v3.13 restoration.

## Graphics capability (v3.13)

- [ ] WebGL unavailable: Hero uses navigable 2D anchors; no Ambient/About WebGL creation attempts.
- [ ] Recognized software renderer strings including SwiftShader/llvmpipe trigger same fallback. Unknown renderer and unavailable debug extension do not automatically assert software.
- [ ] Notice appears above sticky header, has browser-specific graphics help link, can be dismissed and does not block header/nav; closing notice does not restart failed 3D.
- [ ] Genuine accelerated WebGL retains the ordinary Hero/Ambient/About scenes. Separate runtime context-loss fallback still functions.

## Shop and Mippi Bird (v3.13)

- [ ] Verify all **11 Shop entries** and updated base costs: Lucky Charm 5, Dog Whistle 5, Star Extender 7, Slowpoke 8, Interact Toggle 12, Mippi Bird Extra Life 12, Production Discount 16, Celestial Beacon 18, Golden Trigger 16, **Mippi Bird Life Refill 10**, **Design Mode Unlocked 30**.
- [ ] Epic refill can be purchased repeatedly, banks one Mippi Bird life per purchase, credits no permanent ownership, and costs 7 after Production Discount (floor of 75%). Wallet and life bank persist.
- [ ] Confirm Shop per-round passive shield is consumed before banked spare lives, invulnerability still works, and insufficient funds prevent purchases.
- [ ] Ten permanent items, including capstone, satisfy Buy the Store and capstone prerequisites; the eleventh consumable never blocks completion. Design Mode price is not discounted.
- [ ] Confirm Rupee HUD affordability and Shop telemetry correctly reflect repeatable refill eligibility.

## Docs website consistency

- [ ] Header, homepage, menu, manifest, release history and cache query parameters all identify **v3.14**.
- [ ] Every new feature has linked DESIGN and TECHNICAL pages and all **17 category feature counts** total correctly.
- [ ] No changes to portfolio runtime/assets, authored MP3s or LRCs occur in documentation-only PR.
