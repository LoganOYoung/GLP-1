# Data layer (JSON)

These JSON files drive calculator prices, telehealth platforms, TrumpRx states, and discount cards. **Update them periodically**; the site reads from here at build time.

| File | Update frequency | Used by |
|------|------------------|--------|
| `calculator-prices.json` | Monthly | Calculator engine (medication prices, tiers, Medicare, HSA/FSA rate) |
| `telehealth-platforms.json` | Monthly | Alternatives page, calculator telehealth scenario |
| `trumprx-states.json` | Quarterly | TrumpRx page, calculator TrumpRx eligibility |
| `discount-cards.json` | Monthly | Cost & Insurance page, calculator (reference) |

## One-command update

You can update common fields with a single command (no need to open JSON by hand):

```bash
# Medication list price
npm run update-data -- price wegovy 1349

# Telehealth platform monthly price
npm run update-data -- telehealth henry-meds 297

# TrumpRx state status (active | pending | not-available)
npm run update-data -- trumprx FL active

# Manufacturer card limits (maxMonthly, optional maxAnnual)
npm run update-data -- card wegovy 100 1200
```

Run `npm run update-data --` with no args to see all commands.

**Process:** See [docs/DATA-UPDATE-PROCESS.md](../docs/DATA-UPDATE-PROCESS.md) for the full checklist and validation steps.

**Auto-refresh (pure frontend):** A GitHub Action runs on the **1st and 15th** of each month (09:00 UTC). It refreshes all `lastUpdated` in these JSON files, commits and pushes, so your host (e.g. Vercel/Netlify) redeploys the site with current dates. No backend or API — just scheduled Actions + push. On the 1st it also opens a reminder issue. See [.github/workflows/data-update-reminder.yml](../.github/workflows/data-update-reminder.yml).

**How to get “auto-updating” data in pure frontend:** See [docs/DATA-AUTO-UPDATE-PURE-FRONTEND.md](../docs/DATA-AUTO-UPDATE-PURE-FRONTEND.md) for the full picture (dates vs. real data, scheduled jobs, optional API/CMS).

**Optional: fetch from external URLs.** The monthly Action runs `scripts/fetch-external-data.js` before refreshing dates. To pull data from your API/CDN, add repo **Variables** (Settings → Secrets and variables → Actions → Variables): `CALCULATOR_PRICES_URL`, `TELEHEALTH_PLATFORMS_URL`, `TRUMPRX_STATES_URL`, `DISCOUNT_CARDS_URL`. Each URL must return JSON matching the corresponding file schema. Local test: `CALCULATOR_PRICES_URL=https://... npm run fetch-external-data`.
