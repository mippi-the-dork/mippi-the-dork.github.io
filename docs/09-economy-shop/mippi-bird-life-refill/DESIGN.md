# Mippi Bird Life Refill - Design Documentation

**Introduced:** v3.13. **Current documented version:** v3.14.

## Purpose

After Rupee income increased, the Shop gained a **repeatable way to turn spare currency into another attempt at Mippi Bird**. The Epic **Mippi Bird Life Refill** increases the existing extra-life bank by **one** per purchase. It does not replace the permanent **Mippi Bird Extra Life** passive shield, and it does not buy victory or increase the maximum Heart reserve.

## Rules

- Appears in the Epic Shop tier after Epic progression unlock.
- **Base cost: 10 Rupees**. The existing Production Discount, when owned, also affects its actual purchase price; show the current cost at the time of purchase.
- Each successful purchase immediately spends Rupees and banks one extra Mippi Bird life.
- The item remains purchasable repeatedly while affordable and unlocked. It does not become `OWNED`, equipped or a permanent inventory requirement.
- The Shop contains **11 listed items**: **10 permanent items** and this consumable refill. The refill is excluded from the `Buy the Store` achievement and from the Design Mode capstone's `own every other Shop item` check.
- The Design Mode capstone's v3.13 base cost is **30 Rupees**.

The Mippi Bird hit mechanic consumes its dedicated per-round Shop shield when available, then the banked extra life, preserving the existing short invulnerability response.

## Acceptance

Purchase multiple refills, verify wallet reduction and stored bank increases after each, persistence/reload, discount pricing, Mippi Bird hit consumption and no duplicate purchase after insufficient funds. Verify that ten permanent purchases still satisfy Shop completion irrespective of refill history.

See [Technical](TECHNICAL.md) and [v3.14 QA](../../QA/V3_11_TO_V3_14_REGRESSION_QA.md).
