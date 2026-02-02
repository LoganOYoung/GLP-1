#!/usr/bin/env node
/**
 * One-command data update: edit data/*.json from the CLI.
 * Usage: npm run update-data -- <command> [args...]
 *
 * Examples:
 *   npm run update-data -- price wegovy 1349
 *   npm run update-data -- telehealth henry-meds 297
 *   npm run update-data -- trumprx CA active
 *   npm run update-data -- card wegovy 100 1200
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

function readJson(name) {
  const p = path.join(DATA_DIR, name);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(name, data) {
  const p = path.join(DATA_DIR, name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function price(medication, amount) {
  const num = parseInt(amount, 10);
  if (Number.isNaN(num) || num < 0) {
    console.error('Invalid amount. Use a number, e.g. 1349');
    process.exit(1);
  }
  const valid = ['wegovy', 'ozempic', 'mounjaro', 'zepbound', 'rybelsus', 'compounded', 'oral'];
  if (!valid.includes(medication.toLowerCase())) {
    console.error('Unknown medication. Use one of:', valid.join(', '));
    process.exit(1);
  }
  const data = readJson('calculator-prices.json');
  data.medicationBaseCosts[medication.toLowerCase()] = num;
  data.lastUpdated = today();
  if (medication.toLowerCase() === 'wegovy') data.legacy.brandBaseCost = num;
  if (medication.toLowerCase() === 'compounded') data.legacy.compoundedBaseCost = num;
  if (medication.toLowerCase() === 'oral') data.legacy.oralBaseCost = num;
  writeJson('calculator-prices.json', data);
  console.log(`Updated ${medication} price to $${num}. lastUpdated = ${data.lastUpdated}`);
}

function telehealth(platformId, totalMonthly) {
  const num = parseInt(totalMonthly, 10);
  if (Number.isNaN(num) || num < 0) {
    console.error('Invalid amount. Use a number, e.g. 297');
    process.exit(1);
  }
  const data = readJson('telehealth-platforms.json');
  const platform = data.platforms.find((p) => p.id === platformId);
  if (!platform) {
    console.error('Platform not found. IDs:', data.platforms.map((p) => p.id).join(', '));
    process.exit(1);
  }
  platform.totalMonthly = num;
  platform.basePrice = platform.type === 'compounded' ? num - (platform.membershipFee || 0) : platform.basePrice;
  platform.lastUpdated = todayISO();
  data.lastUpdated = todayISO();
  writeJson('telehealth-platforms.json', data);
  console.log(`Updated ${platform.name} (${platformId}) totalMonthly to $${num}. lastUpdated set.`);
}

function trumprx(stateCode, status) {
  const valid = ['active', 'pending', 'not-available'];
  if (!valid.includes(status.toLowerCase())) {
    console.error('Status must be one of:', valid.join(', '));
    process.exit(1);
  }
  const data = readJson('trumprx-states.json');
  const state = data.states.find((s) => s.stateCode.toUpperCase() === stateCode.toUpperCase());
  if (!state) {
    console.error('State not found. Codes:', data.states.map((s) => s.stateCode).join(', '));
    process.exit(1);
  }
  state.status = status.toLowerCase();
  state.lastUpdated = today();
  data.lastUpdated = todayISO();
  writeJson('trumprx-states.json', data);
  console.log(`Updated ${state.stateName} (${stateCode}) TrumpRx status to "${state.status}". lastUpdated set.`);
}

function card(cardId, maxMonthly, maxAnnual) {
  const monthly = parseInt(maxMonthly, 10);
  if (Number.isNaN(monthly) || monthly < 0) {
    console.error('maxMonthly must be a number, e.g. 100');
    process.exit(1);
  }
  const annual = maxAnnual ? parseInt(maxAnnual, 10) : monthly * 12;
  const calcData = readJson('calculator-prices.json');
  const key = cardId.toLowerCase().replace(/-/g, '');
  const mapping = {
    ozempic: 'ozempic',
    wegovy: 'wegovy',
    mounjaro: 'mounjaro',
    zepbound: 'zepbound',
    rybelsus: 'rybelsus',
  };
  const calcKey = mapping[cardId.toLowerCase()] || cardId.toLowerCase();
  if (calcData.manufacturerCardSavings[calcKey]) {
    calcData.manufacturerCardSavings[calcKey] = { maxMonthly: monthly, maxAnnual: annual };
    calcData.lastUpdated = today();
    writeJson('calculator-prices.json', calcData);
    console.log(`Updated calculator manufacturer card ${calcKey}: maxMonthly=$${monthly}, maxAnnual=$${annual}.`);
  }
  const discountData = readJson('discount-cards.json');
  const discountCard = discountData.cards.find(
    (c) => c.id === cardId || c.id.replace(/-/g, '') === cardId.replace(/-/g, '')
  );
  if (discountCard && !['pharmacy-discount'].includes(discountCard.id)) {
    discountCard.maxSavings = `$${monthly}/month`;
    discountData.lastUpdated = today();
    writeJson('discount-cards.json', discountData);
    console.log(`Updated discount-cards.json ${discountCard.id} maxSavings to $${monthly}/month.`);
  }
}

function help() {
  console.log(`
One-command data update. Usage:

  npm run update-data -- <command> [args...]

Commands:

  price <medication> <amount>
    Update medication list price (e.g. wegovy 1349).
    Medications: wegovy, ozempic, mounjaro, zepbound, rybelsus, compounded, oral

  telehealth <platform-id> <totalMonthly>
    Update telehealth platform monthly price (e.g. henry-meds 297).
    IDs: henry-meds, ro, mochi, calibrate, found

  trumprx <stateCode> <status>
    Update TrumpRx state status (e.g. CA active).
    Status: active, pending, not-available

  card <card-id> <maxMonthly> [maxAnnual]
    Update manufacturer card limits (e.g. wegovy 100 1200).

Examples:

  npm run update-data -- price wegovy 1349
  npm run update-data -- telehealth henry-meds 297
  npm run update-data -- trumprx FL active
  npm run update-data -- card wegovy 100 1200
`);
}

const [cmd, ...args] = process.argv.slice(2).filter((a) => !a.startsWith('--'));

if (!cmd || cmd === 'help' || cmd === '-h' || cmd === '--help') {
  help();
  process.exit(0);
}

switch (cmd.toLowerCase()) {
  case 'price':
    if (args.length < 2) {
      console.error('Usage: npm run update-data -- price <medication> <amount>');
      process.exit(1);
    }
    price(args[0], args[1]);
    break;
  case 'telehealth':
    if (args.length < 2) {
      console.error('Usage: npm run update-data -- telehealth <platform-id> <totalMonthly>');
      process.exit(1);
    }
    telehealth(args[0], args[1]);
    break;
  case 'trumprx':
    if (args.length < 2) {
      console.error('Usage: npm run update-data -- trumprx <stateCode> <status>');
      process.exit(1);
    }
    trumprx(args[0], args[1]);
    break;
  case 'card':
    if (args.length < 2) {
      console.error('Usage: npm run update-data -- card <card-id> <maxMonthly> [maxAnnual]');
      process.exit(1);
    }
    card(args[0], args[1], args[2]);
    break;
  default:
    console.error('Unknown command:', cmd);
    help();
    process.exit(1);
}
