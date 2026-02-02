#!/usr/bin/env node
/**
 * Refresh all lastUpdated fields in data/*.json to today.
 * Used by GitHub Actions on 1st and 15th to auto-update dates and trigger deploy.
 * Pure frontend: no API calls, only touches dates.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

function today() {
  return new Date().toISOString().slice(0, 10);
}

function todayISO() {
  return new Date().toISOString().slice(0, 19) + 'Z';
}

const date = today();
const dateISO = todayISO();

function refreshCalculatorPrices() {
  const p = path.join(DATA_DIR, 'calculator-prices.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.lastUpdated = date;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('calculator-prices.json lastUpdated ->', date);
}

function refreshTelehealthPlatforms() {
  const p = path.join(DATA_DIR, 'telehealth-platforms.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.lastUpdated = dateISO;
  if (Array.isArray(data.platforms)) {
    data.platforms.forEach((platform) => {
      platform.lastUpdated = dateISO;
    });
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('telehealth-platforms.json lastUpdated ->', dateISO);
}

function refreshTrumprxStates() {
  const p = path.join(DATA_DIR, 'trumprx-states.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.lastUpdated = dateISO;
  if (Array.isArray(data.states)) {
    data.states.forEach((state) => {
      state.lastUpdated = date;
    });
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('trumprx-states.json lastUpdated ->', date);
}

function refreshDiscountCards() {
  const p = path.join(DATA_DIR, 'discount-cards.json');
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.lastUpdated = date;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('discount-cards.json lastUpdated ->', date);
}

refreshCalculatorPrices();
refreshTelehealthPlatforms();
refreshTrumprxStates();
refreshDiscountCards();
console.log('All data lastUpdated set to', date, '/', dateISO);
