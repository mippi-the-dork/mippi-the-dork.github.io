# Objective Opportunity Seeding - Technical Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Objective Opportunity Seeding > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Quietly creates fair target opportunities for timed objectives so success does not depend entirely on ambient random schedules.

> This page is the canonical technical documentation for **Objective Opportunity Seeding** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entry

Every objective start calls:

```js
objectiveSeedOpportunity(def);
```

## Retry Wrapper

The seeding helper defines:

```js
const trySeed =
  (attempt=0) => { ... };
```

It first verifies that the same objective is still:

- active,
- incomplete,
- not failed.

## Attention Retry

If:

```js
directorAttentionBlocked()
```

is true:

```js
if(attempt<8)
  setTimeout(
    () =>
      trySeed(
        attempt+1
      ),
    1100
  );
```

The seeder therefore retries up to eight additional delayed attempts.

## Generic Friendly / Legendary Targets

For:

```text
pickup-catch
pickup-double
pickup-variety
field-test
legendary-shot
legendary-double
```

the seeder checks for:

```text
.game-pickup
.doug-bone
.shooting-star
```

If none exist:

```js
spawnGamePickup(
  null,
  true
);
```

## Heart

`heart-signal`:

```js
spawnGamePickup(
  'heart',
  true
);
```

when a Heart pickup is not already present.

## Rupee

`rupee-hunt`:

```js
spawnGamePickup(
  'rupee',
  true
);
```

when an appropriate Rupee pickup is absent.

## UFO

For:

```text
airspace
airspace-one
contact-damage
```

the seeder force-spawns a regular UFO when:

- no regular UFO is already present,
- no Boss is active,
- no Super Boss is active.

## Bone

`bone-run` force-spawns a Bone when none exists.

## Castle

If `castle-check` is active and:

```text
castleQuestActive
```

is true but no Castle node exists:

```js
spawnCastle();
```

runs.

## Initial Delay

Most objectives:

```text
900 ms
```

`contact-damage`:

```text
220 ms
```

## Second Seed

These objectives schedule a second `trySeed()`:

```text
pickup-double
pickup-variety
legendary-double
airspace
bone-run
```

Delay:

```js
Math.min(
  18000,
  Math.max(
    7000,
    duration*.28
  )
)
```

This produces a second opportunity between 7 and 18 seconds into the challenge depending on authored duration.

## Telemetry Relationship

Seeded objects still use the normal flying-object spawn telemetry and can be marked as forced by the underlying spawn helper.

The objective system itself records only lifecycle events and completion.

## QA

- Force every seeded objective.
- Remove all matching targets before the objective begins.
- Verify a valid target appears.
- Open Shop immediately after objective start.
- Verify seeding waits for attention to clear.
- Test two-target objectives and observe follow-up opportunity timing.
- Verify seeded collection uses the same reward/progression logic as a natural object.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Design Documentation](DESIGN.md)
