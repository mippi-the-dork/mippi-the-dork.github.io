# v3.25.1 | Mippi Bird Lives and Super Boss QA

## Mippi Bird
- Without Shop upgrades, the HUD reads **LIVES 1**; the first pipe or boundary collision results in **LIVES 0** and Game Over.
- With the Mippi Bird passive, each new round begins with two Lives. The first collision leaves one Life, the second ends the round. Restart restores the passive Life.
- Each Life Refill purchase adds one banked Life. With three banked Lives and no passive, a new round starts at four Lives, and four collisions end the round. Banked Lives are consumed only when hit.
- The HUD has a single **LIVES** counter throughout the round, with no separate Shield or Spare Lives labels. Temporary post-hit invulnerability prevents consecutive hits from consuming multiple Lives.
- Existing Shop ownership, bank storage, restart behavior, score recording, and rewards remain intact.

## Super Boss
- Force the dev superboss command with Interact Mode locked, unlocked but OFF, and unlocked but ON. Ordinary portfolio interaction is suppressed during combat; the original Interact setting is restored after victory, Exit, and Escape.
- The fixed main menu, unified footer HUD, and active floating collectibles must appear *above* the boss arena; all their buttons and pickups must stay clickable.
- Boss heading and HP UI must clear the site header. EXIT BOSS FIGHT must clear the bottom HUD. Resize during combat and verify both clearances.
- Boss bullets, rockets, and active laser collisions trigger the same mushroom-buffer, cursor-size, and half-Heart damage path as ordinary arcade projectiles. Verify Heart HUD and persistence change.
- Contact knockback still occurs; invulnerability gating must prevent multiple simultaneous hits in one burst.
- Boss shooting, adds, victory, post-boss reward, and subsequent enemy spawning still operate.

The Super Boss shares the portfolio's existing Heart and cursor damage systems. No additional boss-only player health pool was introduced.
