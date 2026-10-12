# Achievement Catalog

**Implementation baseline:** Mippi Portfolio v2.80

The Achievement system has three rarity layers:

```text
10 Rare original discovery achievements
9 Epic postgame mastery achievements
1 Legendary 100% Complete capstone
```

Before postgame reveal the Ledger total is:

```text
10
```

After reveal:

```text
20
```

## Original Rare Signals

| Key | Title | Hint | Solution |
| --- | --- | --- | --- |
| `curious` | Curious Mind | The logo in the header is not just decoration. | Click the Mippi logo in the upper-left header once. |
| `secondPerson` | Second Perspective | Try changing your perspective. | Scroll to Project Heavy Water and use the Perspective Visualizer. |
| `signal` | Signal Acquired | The hero scene can do more than idle. | Click any floating interactive 3D signal object in the Hero scene. |
| `wip` | Under Construction | A filter might reveal something that is not ready to ship yet. | In Unreal Tools, click the WIP filter. |
| `ghost` | Ghost in the Machine | Some signals are only in the viewport briefly. | Catch the small glowing transient diamond signal before it disappears. |
| `lore` | The Whole Story | The short version never tells the whole story. | Open the Long resume. |
| `doug` | Best Boy | Some coworkers appreciate repeated attention. | Click Doug five times. |
| `unmark` | Unmarked | One tool has something hidden in its mark. | Click the Unmark feature artwork/logo. |
| `nda` | Classified | Classified does not always mean unresponsive. | Click the pixel-art Mob logo in the Career NDA card. |
| `konami` | Old Habits | An old-school cheat code input may still work. | Enter Up, Up, Down, Down, Left, Right, Left, Right, B, A. |

Completing all 10 unlocks Epic gameplay.

## Postgame Achievements

| Key | Title | Rarity | Player solution | Technical condition |
| --- | --- | --- | --- | --- |
| `post_signals` | Signal Saturation | Epic | Find all 10 original Rare Signals. | All 10 Rare achievement keys unlocked. |
| `post_cool` | Maximum Cool | Epic | Reach 100 percent Coolness and activate Cool Mode. | Persistent max-Cool historical flag. |
| `post_legendary` | Gold Standard | Epic | Unlock Legendary through the Wish progression. | `legendaryUnlocked` true. |
| `post_wish` | Reality Validated | Epic | Complete a validated Wish. | Finale Wish condition true. |
| `post_hearts` | Full Hearts | Epic | Collect 5 Hearts. | `heartCount >= 5`. |
| `post_shop` | Buy the Store | Epic | Purchase every Shop item including Design Mode capstone. | Every canonical Shop item ID owned. |
| `post_castles` | Another Castle | Epic | Reach 4/4 Castles in one run. | Persistent Castle-complete historical flag. |
| `post_sections` | Grand Tour | Epic | Visit Games, Career, Consulting, Crafting, Tools, and About. | All six postgame section IDs in persistent section history. |
| `post_superboss` | Air Superiority | Epic | Defeat the Super UFO Boss. | Persistent Super Boss historical flag. |
| `post_complete` | 100% Complete | Legendary | Complete all nine Epic postgame achievements and view the Finale. | Postgame revealed, Finale seen, all nine Epic postgame keys unlocked. |

## Reveal Rules

The postgame tier is hidden until after the normal Finale.

Reveal occurs approximately:

```text
5 seconds
```

after the player:

- continues directly from the Finale,
- continues from Session Report,
- closes Session Report.

Reveal persistence:

```text
mippi-postgame-achievements-revealed-v1
```

## Retroactive Recognition

Epic postgame conditions can be recorded before the postgame tier becomes visible.

Examples:

- Maximum Cool,
- Another Castle,
- Air Superiority,
- section-history progress.

When the tier is revealed, the runtime evaluates current and historical state before opening the Ledger.

The player should not repeat a completed milestone merely because its achievement had not been visible yet.

## Cheat Rules

`cheat` can reveal:

- next incomplete Rare solution,
- next incomplete Epic postgame solution after reveal.

It does not reveal the Legendary capstone solution as an assisted walkthrough path.

When all non-Legendary achievements are complete:

```text
The Legendary capstone does not accept walkthrough assistance.
```

## Rarity Presentation

The Ledger frame follows the currently selected world theme.

Each achievement entry preserves its own rarity identity:

- Rare,
- Epic,
- Legendary.

Every entry explicitly labels its rarity.

## Persistence

Rare unlocks:

```text
mippi-achievements-v2
```

Postgame unlocks:

```text
mippi-postgame-achievements-v1
```

Postgame reveal:

```text
mippi-postgame-achievements-revealed-v1
```

## Legendary Reward

First natural unlock of:

```text
post_complete
```

calls the Music Player unlock path.

Persistent reward:

```text
mippi-music-player-unlocked-v1
```

## Canonical Ordering

Ledger numbering:

```text
01-10 Rare
11-19 Epic postgame
20 Legendary
```

After reveal, the new postgame tier is rendered above the original Rare tier so the newly revealed content is immediately visible at the top.

## Maintenance Rule

When adding an achievement:

- assign a stable key,
- define rarity,
- define hint,
- define solution,
- define technical condition,
- update count math,
- update Ledger numbering,
- update Cheat behavior,
- update QA.
