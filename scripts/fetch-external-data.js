#!/usr/bin/env node
/**
 * Fetch external data into data/*.json (optional step for pure-frontend auto-update).
 * Used by GitHub Actions: set env vars to pull from your API/CDN; if unset or fetch fails, skips.
 *
 * Env vars (all optional):
 *   CALCULATOR_PRICES_URL   → overwrites data/calculator-prices.json
 *   TELEHEALTH_PLATFORMS_URL → overwrites data/telehealth-platforms.json
 *   TRUMPRX_STATES_URL      → overwrites data/trumprx-states.json
 *   DISCOUNT_CARDS_URL      → overwrites data/discount-cards.json
 *
 * Response must be valid JSON matching existing schema (minimal checks below).
 * On any failure: log and continue; never overwrite with invalid data.
 *
 * In GitHub Actions, when a URL var is not set, falls back to the repo's raw
 * file (current branch) so the fetch step always runs and succeeds; refresh-data-dates
 * then updates lastUpdated. Set vars to override with your own API/CDN.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function setDefaultUrlsInGitHubActions() {
  if (process.env.GITHUB_ACTIONS !== 'true') return;
  const repo = process.env.GITHUB_REPOSITORY;
  const ref = process.env.GITHUB_REF_NAME || (process.env.GITHUB_REF || '').replace(/^refs\/heads\//, '') || 'main';
  if (!repo || !ref) return;
  const base = `https://raw.githubusercontent.com/${repo}/${ref}/data`;
  if (!process.env.CALCULATOR_PRICES_URL?.trim()) process.env.CALCULATOR_PRICES_URL = `${base}/calculator-prices.json`;
  if (!process.env.TELEHEALTH_PLATFORMS_URL?.trim()) process.env.TELEHEALTH_PLATFORMS_URL = `${base}/telehealth-platforms.json`;
  if (!process.env.TRUMPRX_STATES_URL?.trim()) process.env.TRUMPRX_STATES_URL = `${base}/trumprx-states.json`;
  if (!process.env.DISCOUNT_CARDS_URL?.trim()) process.env.DISCOUNT_CARDS_URL = `${base}/discount-cards.json`;
}

function isValidCalculatorPrices(obj) {
  return obj && typeof obj === 'object' && typeof obj.medicationBaseCosts === 'object';
}

function isValidTelehealthPlatforms(obj) {
  return obj && typeof obj === 'object' && Array.isArray(obj.platforms);
}

function isValidTrumprxStates(obj) {
  return obj && typeof obj === 'object' && Array.isArray(obj.states);
}

function isValidDiscountCards(obj) {
  return obj && typeof obj === 'object' && Array.isArray(obj.cards);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function writeJson(filename, data) {
  const p = path.join(DATA_DIR, filename);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('fetch-external-data: wrote', filename);
}

async function tryFetch(name, urlEnv, filename, validator) {
  const url = process.env[urlEnv];
  if (!url || url.trim() === '') return false;
  try {
    const data = await fetchJson(url.trim());
    if (!validator(data)) {
      console.warn('fetch-external-data: invalid shape for', filename, '(skipped)');
      return false;
    }
    writeJson(filename, data);
    return true;
  } catch (err) {
    console.warn('fetch-external-data: failed', filename, err.message);
    return false;
  }
}

async function main() {
  setDefaultUrlsInGitHubActions();
  let updated = 0;
  updated += (await tryFetch(
    'calculator-prices',
    'CALCULATOR_PRICES_URL',
    'calculator-prices.json',
    isValidCalculatorPrices
  )) ? 1 : 0;
  updated += (await tryFetch(
    'telehealth-platforms',
    'TELEHEALTH_PLATFORMS_URL',
    'telehealth-platforms.json',
    isValidTelehealthPlatforms
  )) ? 1 : 0;
  updated += (await tryFetch(
    'trumprx-states',
    'TRUMPRX_STATES_URL',
    'trumprx-states.json',
    isValidTrumprxStates
  )) ? 1 : 0;
  updated += (await tryFetch(
    'discount-cards',
    'DISCOUNT_CARDS_URL',
    'discount-cards.json',
    isValidDiscountCards
  )) ? 1 : 0;

  if (updated === 0) {
    console.log('fetch-external-data: no URLs set or no successful fetch; skipping.');
  } else {
    console.log('fetch-external-data: updated', updated, 'file(s).');
  }
}

main().catch((err) => {
  console.error('fetch-external-data:', err);
  process.exit(1);
});
