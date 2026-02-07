#!/usr/bin/env node
/**
 * 构建后校验：out/ 中必须存在所有预期静态页对应的 .html，避免部署后出现 404。
 * 与 scripts/generate-sitemap.js 的路径列表保持一致。
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');

const STATIC_PATHS = [
  '', '/quiz', '/calculator', '/alternatives', '/cost-insurance', '/cost-insurance/appeals',
  '/comparison', '/legitimacy', '/legitimacy/shortage', '/labs', '/trumprx', '/tools/dose-converter',
  '/faq', '/about', '/report',
];
const DRUG_SLUGS = ['wegovy', 'ozempic', 'mounjaro', 'zepbound'];

function pathToFile(p) {
  if (p === '') return path.join(OUT, 'index.html');
  const relative = p.startsWith('/') ? p.slice(1) : p;
  return path.join(OUT, relative + '.html');
}

const allPaths = [...STATIC_PATHS, ...DRUG_SLUGS.map((s) => `/drugs/${s}`)];
const missing = [];

for (const p of allPaths) {
  const file = pathToFile(p);
  if (!fs.existsSync(file)) missing.push(p || '/');
}

if (missing.length > 0) {
  console.error('verify-static-output: missing HTML in out/ for routes:', missing.join(', '));
  console.error('Deploying would cause 404 on these URLs. Fix the build or add routes.');
  process.exit(1);
}

console.log('verify-static-output: all', allPaths.length, 'routes have HTML in out/');
