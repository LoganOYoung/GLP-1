#!/usr/bin/env node
/**
 * Check outbound links for validity (HTTP status).
 * Run from repo root: node scripts/check-outbound-links.js
 * Requires network. Non-2xx or fetch errors are reported.
 */

const fs = require('fs');
const path = require('path');

const GOVERNMENT = [
  'https://www.fda.gov/safety/report-problem-fda',
  'https://reportfraud.ftc.gov/',
  'https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages',
  'https://www.fda.gov/drugs/guidance-compliance-regulatory-information/human-drug-compounding',
];

function getDiscountCardUrls() {
  const jsonPath = path.join(__dirname, '..', 'data', 'discount-cards.json');
  if (!fs.existsSync(jsonPath)) return [];
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return (data.cards || []).map((c) => c.officialLink).filter(Boolean);
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'GLP-1-Guide-LinkChecker/1.0' },
    });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: null, ok: false, error: err.message };
  }
}

async function main() {
  const urls = [...GOVERNMENT, ...getDiscountCardUrls()];
  const seen = new Set();
  const unique = urls.filter((u) => {
    if (seen.has(u)) return false;
    seen.add(u);
    return true;
  });

  console.log('Checking', unique.length, 'outbound links...\n');
  const results = [];
  for (const url of unique) {
    const r = await checkUrl(url);
    results.push(r);
    const badge = r.ok ? 'OK' : 'FAIL';
    const status = r.status != null ? r.status : r.error || 'error';
    console.log(`${badge.padEnd(4)} ${r.status || '—'}  ${url}`);
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log('\n--- Failed ---');
    failed.forEach((r) => console.log(r.url, r.status || r.error));
    process.exit(1);
  }
  console.log('\nAll links OK.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
