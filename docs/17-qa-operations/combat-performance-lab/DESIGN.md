# Combat Performance Lab - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Combat Performance Lab > Design

**Introduced:** v2.90. **Current documented specification:** v2.92, based on release handoffs.

## Intent and product status

The Combat Performance Lab is **permanent, opt-in technical content** in the interactive portfolio. It is not a debug artifact to be removed after fixing a regression. It demonstrates why game performance testing benefits from repeatable workloads, real runtime code paths, controlled comparisons and careful interpretation. It remains hidden from ordinary `help` to preserve the Console's optional/discoverable developer experience, but is openly described in the public documentation.

The lab does not automatically activate. Visitors who choose to run it receive temporary visual benchmark targets/emitters, a controlled workload and an exportable report. It is an **investigation tool**, not a new achievement, currency loop, challenge or player reward.

## Scenarios

| Mode | Authored load | What it teaches |
| --- | --- | --- |
| `idle` | No benchmark-spawned shots or targets | Baseline page/frame work with incidental site activity still possible |
| `player` | Up to four moving temporary targets and a player shot about every 95ms | Shared Legendary shot creation, homing, targeting, impact and cleanup |
| `ufo` | Six fixed emitters, four hostile shots per roughly 240ms volley | Concurrent hostile shot spawning, individual updates and cleanup |
| `combined` | Player and hostile workloads together | Contention between live projectile systems |
| `explosions` | 28 CSS particles per burst about every 190ms | Particle creation, animation and compositing stress |

Normal runs are 30 seconds; allowed duration is **10 to 45 seconds**. Tests should compare the same browser, theme, viewport, scene, pointer position and background load.

## Player-safety rules

The temporary objects exercise **real production** projectile/particle creation, hit and cleanup paths through adapter hooks, not separate toy physics. Nevertheless, synthetic hits do not grant progression or trigger organic kill/collect callbacks. Rupees, Hearts, achievements, Invasion, Wishes, Shop and boss state must remain unchanged by benchmark actions.

Organic non-forced Director spawns are deferred during a benchmark, then restored. Stopping a benchmark deletes **only** diagnostic-tagged objects/shots, leaving organic gameplay objects unaffected. No capture is sent offsite or stored automatically: a user deliberately exports a local JSON file.

## Product evolution

- **v2.90:** Permanent Combat Lab, five scenarios, reporting and exports.
- **v2.91:** Optional geometry caching, compared with legacy behavior via `dev combat geometry off/on`.
- **v2.92:** The `on` mode uses authored motion models for recognized flying targets, with caching fallback for others; `off` still restores the original v2.90 geometry reading path.

## Acceptance

An idle run makes no benchmark shots; every other mode creates the stated load; reports show counts and frame statistics; temporary objects are gone after stop; ambient spawning returns; ordinary progression does not change; and test results are never presented as guaranteed Windows FPS improvements.

See [Technical Documentation](TECHNICAL.md), [Performance Diagnostics](../performance-diagnostics/TECHNICAL.md), and [Combat Benchmark QA](../../QA/COMBAT_BENCHMARK_V2_92.md).