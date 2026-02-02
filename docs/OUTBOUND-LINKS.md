# Outbound Links Inventory

All external (outbound) URLs used on the site. Verify periodically for validity (no 404s, redirects OK). Run `node scripts/check-outbound-links.js` for automated checks.

## Government / Regulatory

| URL | Used on | Notes |
|-----|---------|-------|
| https://www.fda.gov/safety/report-problem-fda | Legitimacy, About | FDA MedWatch – adverse events |
| https://reportfraud.ftc.gov/ | Legitimacy, About | FTC Report Fraud |
| https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages | Shortage page, ShortageClient | FDA Drug Shortages |
| https://www.fda.gov/drugs/guidance-compliance-regulatory-information/human-drug-compounding | LabInfoModal | FDA human drug compounding |

## Manufacturer / Pharmacy (Discount Cards)

Loaded from `data/discount-cards.json`. Update there; re-run check script.

| URL | Card |
|-----|------|
| https://www.ozempic.com/savings-and-resources/save-on-ozempic.html | Ozempic |
| https://www.wegovy.com/coverage-and-savings/save-on-wegovy.html | Wegovy |
| https://www.mounjaro.com/savings | Mounjaro |
| https://www.zepbound.com/savings | Zepbound |
| https://www.rybelsus.com/savings | Rybelsus |
| https://www.goodrx.com | Pharmacy discount programs |

## Verification

- **Automated**: `node scripts/check-outbound-links.js` (requires network).
- **Manual**: Open each URL; confirm no 404 and content is appropriate. Manufacturer savings URLs may change; update `data/discount-cards.json` and this doc.

### Notes from last check

- **FDA compounding**: Use `.../guidance-compliance-regulatory-information/human-drug-compounding` (older path may 404).
- **403 on manufacturer savings (Mounjaro, Zepbound)**: Script may get 403 (bot-blocking); verify in a normal browser. If broken for users, update `officialLink` in `data/discount-cards.json` to main site (e.g. mounjaro.com, zepbound.com).
- **Rybelsus**: `officialLink` set to main site (rybelsus.com) after /savings returned 404.
