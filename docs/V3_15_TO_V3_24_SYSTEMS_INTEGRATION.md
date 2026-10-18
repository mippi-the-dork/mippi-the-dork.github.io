# v3.15–v3.24 Systems Integration

**Current documented behavior:** v3.24. This page reconciles the ten sequential release handoffs. Earlier release decisions that were subsequently reversed are **historical**, not current specifications.

## Release-by-release evolution

| Version | Relevant change | Current implication |
| --- | --- | --- |
| 3.15 | 3.15.5 stable pre-icon baseline | Preserve existing Three.js, progression, music and arcade architecture. |
| 3.16 | 20 unique achievement SVG emblems | 10 Rare, 9 Epic, 1 Legendary, including locked/toast presentation. |
| 3.17 | Shop item emblems, Doug Bone layering, Arcade Bounty | Bones stay below header/HUD; Arcade Bounty increases UFO Rupee-drop chance by +45%. |
| 3.18 | Combined Bird shield/refill Shop card; Insert Coin; gated Dev Console | Epic Console purchase tied to Shooting Star; Shop and reset access retained; Console hotbar hidden until ownership. |
| 3.19 | Icon polish | Stronger locked hints, Legendary outlines, unused SVG cleanup. |
| 3.20 | Icon polish and DEV bypass | DEV commands available before Console ownership, ordinary command gates preserved. |
| 3.21 | Brain/antenna/Unmark silhouettes; PASSIVE // ACTIVE repair | Insert Coin approximately quadruples natural UFO wave frequency. |
| 3.22 | Half-Heart projectile damage; Bird separation | Hearts/Mushrooms cannot grant Bird lives; refill from Shop or explicitly credited rewards. Temporary Key changes superseded. |
| 3.23 | Reverted Key changes; layered defense | Star invulnerability, Mushroom tier depletion before Heart damage, Bones intercept both friendly and hostile shots. |
| 3.24 | Pause model, persistent discovered Heart HUD, Castle impact | P-key, focus/visibility pause with explicit resume, Shop/Bird background suspension. |

## Current system contracts

### Shop and progression
Shop-owned upgrades and repeatable life refills are distinct. Never count repeat purchases as additional unique permanent inventory for completion. Respect saved Shop item IDs, migration and current prerequisite checks. **Dev Console purchase** gates its hotbar entry but must not make the public RESET/SHOP access paths or eligible DEV commands inaccessible. Insert Coin adjusts **natural wave cadence**, not arbitrary projectiles or scripted boss adds. Arcade Bounty modifies Rupee-drop probability, not direct wallet balance.

### Damage layers
Incoming damage first respects Star Power invulnerability. When vulnerable, active Mushroom size tiers act as a damage buffer; once depleted, hostile projectile damage can remove a half Heart. Bone collisions may intercept either hostile or friendly projectile, with corresponding cleanup. Hearts and Bird lives are separate currencies; ordinary Hearts/Mushrooms do not award Bird lives. Shop and explicit Bird reward paths own life grants.

### Keys and Castles
Do **not** retain v3.22's temporary Key eligibility/panel placement experiment. v3.23 restores the earlier rules. Castle click impact VFX in v3.24 must be cosmetic and must not bypass or double-trigger the established Key-to-Castle progression.

### Pause ownership
P-key toggles the user pause state. Focus/visibility loss enters a pause state that does not silently clear on return; an explicit user resume is required. Shop and Bird surfaces suspend the background temporarily; closing them must not resume a still-manually-paused or focus-paused session. Pause-sensitive schedulers must not accumulate backlog or apply delayed damage on resume. Confirm precise transition logic from source before documenting specific internal names.

### Visual identity
All twenty achievement emblems, Shop glyphs and toast/locked variants should retain rarity-semantic colors even when the overall theme differs. Keep Dog Bone layers below header and HUD. Show the discovered Heart HUD even when its value becomes zero.

## Source handoff links
- [v3.15 baseline](https://github.com/mippi-the-dork/mippi-the-dork.github.io/tree/431834ca88268e1e5a84350c2eb9e258db9d1ef7)
- [v3.16 PR #35](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/35)
- [v3.17 PR #36](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/36)
- [v3.18 PR #37](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/37)
- [v3.19 PR #40](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/40)
- [v3.20 PR #41](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/41)
- [v3.21 PR #42](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/42)
- [v3.22 PR #43](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/43)
- [v3.23 PR #44](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/44)
- [v3.24 PR #45](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/45)

See [v3.24 acceptance QA](QA/V3_15_TO_V3_24_REGRESSION_QA.md).
