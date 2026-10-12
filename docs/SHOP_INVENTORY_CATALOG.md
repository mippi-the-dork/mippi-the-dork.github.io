# Shop Inventory Catalog

**Implementation baseline:** Mippi Portfolio v2.78

Canonical Shop inventory contains:

```text
10 items
```

## Inventory

| ID | Name | Base cost | Rarity | Slot | Tag | Requirement | Effect |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| `lucky-charm` | Lucky Charm | 2 | Rare | gameplay | DISCOVERY | None | Hearts, Keys, and Stars become somewhat more likely to appear. |
| `dog-whistle` | Dog Whistle | 2 | Rare | gameplay | MORALE | None | Doug Bones enter the flight schedule more often once Doug is in command. |
| `star-extender` | Star Extender | 3 | Rare | gameplay | POWER-UP | None | Star Power lasts about two seconds longer. |
| `slowpoke` | Slowpoke | 3 | Rare | gameplay | TIMING | None | New flying objects remain on screen about 35 percent longer. |
| `interact-toggle` | Interact Toggle | 4 | Epic | passive | FOCUS | Epic | Unlocks Interact Mode. |
| `bird-extra-life` | Mippi Bird Extra Life | 4 | Epic | passive | MIPPI BIRD | None | Every new Mippi Bird round gets one rechargeable hit shield. |
| `production-discount` | Production Discount | 6 | Epic | passive | ECONOMY | None | Permanent passive discount on unowned Shop inventory. |
| `celestial-beacon` | Celestial Beacon | 7 | Epic | passive | CELESTIAL | Epic | Shooting Stars appear more often and remain catchable longer. |
| `golden-trigger` | Golden Trigger | 5 | Legendary | gameplay | WEAPON | Legendary | Legendary cursor shots acquire farther targets and travel faster. |
| `design-mode-unlock` | Design Mode Unlocked | 10 | Legendary | passive | CAPSTONE | Shop Master + Legendary | Unlocks the portfolio Design Mode commentary layer. |

## Slot Rules

### Gameplay

Only one gameplay item is equipped at a time.

Current gameplay items:

```text
lucky-charm
dog-whistle
star-extender
slowpoke
golden-trigger
```

Gameplay items can be swapped freely after ownership.

### Passive

Passive items take effect through ownership.

They do not occupy the gameplay equipment slot.

Current passive items:

```text
interact-toggle
bird-extra-life
production-discount
celestial-beacon
design-mode-unlock
```

## Availability Rules

No `requires` value:

```text
available immediately after Shop access
```

`epic`:

```text
all 10 Rare Signals complete
```

`legendary`:

```text
Legendary gameplay unlocked
```

`shop-master`:

```text
Legendary unlocked
and
every other Shop item owned
```

The Design Mode capstone uses `shop-master`.

## Production Discount

When owned, price calculation for unowned items is:

```text
floor(base cost * 0.75)
minimum 1
```

The discount does not apply to:

```text
production-discount
design-mode-unlock
```

Therefore the 10-Rupee Design Mode capstone stays 10.

## Rarity Isolation

Shop rarity cards preserve their own rarity identity independent of the current world theme.

Examples:

- Rare card remains blue/cyan under Legendary site theme.
- Epic card remains violet/pink/cyan under Rare site theme.
- Legendary card remains gold/teal under Epic site theme.

## Shop Completion

`Buy the Store` requires ownership of every canonical `SHOP_ITEMS` ID, including:

```text
design-mode-unlock
```

## Migration

Current state migration inside:

```text
mippi-shop-state-v1
```

maps old owned IDs:

```text
galaga-warranty -> bird-extra-life
tractor-beam -> interact-toggle
```

Legacy equipped references to those old IDs are cleared.

## Storage

Canonical state:

```text
mippi-shop-state-v1
```

Value shape:

```json
{
  "owned": ["item-id", "..."],
  "equipped": "gameplay-item-id-or-null"
}
```

Wallet:

```text
mippi-rupee-wallet-v1
```

Discovery:

```text
mippi-rupee-discovered-v1
```

## Affordability Attention

The Rupee HUD pulses only when:

- Rupees/Shop are discovered,
- at least one currently available unowned item is affordable,
- Shop is not already open.

Affordability uses the actual discounted price.

## QA Rule

Every release should validate each item in four states where applicable:

```text
locked
available but unaffordable
affordable
owned/equipped
```

Gameplay items additionally require:

```text
equip
swap
unequip
reload
```
