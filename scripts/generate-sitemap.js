#!/usr/bin/env node
/**
 * 构建前生成 public/sitemap.xml，确保部署后根路径可访问（Vercel 等对 output:export 的
 * sitemap 有时不提供根路径静态文件）。与 app/sitemap.ts 保持同步：STATIC_PATHS、DRUG_SLUGS。
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.rxlikewise.com';
const STATIC_PATHS = [
  '', '/quiz', '/calculator', '/alternatives', '/cost-insurance', '/cost-insurance/appeals',
  '/comparison', '/legitimacy', '/legitimacy/shortage', '/labs', '/trumprx', '/tools/dose-converter',
  '/faq', '/about', '/report',
];
const DRUG_SLUGS = ['wegovy', 'ozempic', 'mounjaro', 'zepbound'];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const now = new Date().toISOString();
const urls = [];

for (const p of STATIC_PATHS) {
  const url = p ? `${SITE_URL}${p}` : SITE_URL;
  urls.push(`  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p === '' ? '1' : '0.8'}</priority>\n  </url>`);
}
for (const slug of DRUG_SLUGS) {
  urls.push(`  <url>\n    <loc>${escapeXml(SITE_URL + '/drugs/' + slug)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf8');
console.log('generate-sitemap: wrote public/sitemap.xml');
