# Mega Laser - Design Documentation

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

Mega Laser is the Super Boss's sweeping beam attack. The Boss and its six orbiting adds **stop moving** for the attack; the beam charges and rotates gradually toward the moving gameplay cursor, pressuring the visitor to dodge continuously.

v3.04 places the beam origin at the **lower-center mouth** of the authored `super-boss.svg`, rather than the old middle-of-face center. The boss-side end uses a rounded capsule and glowing orb/cap. Gameplay collision uses the **same adjusted origin** as the visual beam, avoiding discrepancies between displayed and dangerous positions.

The mouth alignment is an authored approximation and requires screenshot/interactive QA across supported viewports. This does not change the optional fight's exit path or make the laser an instant-snap tracking attack.

See [Technical](TECHNICAL.md) and [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
