#!/usr/bin/env node
/**
 * Download placeholder images from Picsum (Unsplash) and save as WebP.
 * Fills all image paths required by the site so no slot is empty.
 * Run: node scripts/download-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const IMAGES = path.join(PUBLIC, 'images');

// All required images: path (relative to public) -> { width, height, seed for variety }
const IMAGE_LIST = [
  { path: 'images/logos/logo.webp', width: 32, height: 32, seed: 'logo' },
  { path: 'images/banners/home-hero-banner.webp', width: 600, height: 400, seed: 'home' },
  { path: 'images/inline/trust-people.webp', width: 640, height: 128, seed: 'trust' },
  { path: 'images/inline/we-help-cost.webp', width: 400, height: 112, seed: 'cost' },
  { path: 'images/inline/we-help-insurance.webp', width: 400, height: 112, seed: 'ins' },
  { path: 'images/inline/we-help-shortage.webp', width: 400, height: 112, seed: 'short' },
  { path: 'images/inline/we-help-legitimacy.webp', width: 400, height: 112, seed: 'legit' },
  { path: 'images/banners/calculator-tool-banner.webp', width: 600, height: 192, seed: 'calc' },
  { path: 'images/banners/quiz-tool-banner.webp', width: 600, height: 192, seed: 'quiz' },
  { path: 'images/banners/calculator-hero-banner.webp', width: 1200, height: 256, seed: 'calch' },
  { path: 'images/banners/about-hero-banner.webp', width: 600, height: 256, seed: 'about' },
  { path: 'images/inline/about-trust-oasis.webp', width: 600, height: 160, seed: 'oasis' },
  { path: 'images/inline/about-data-engine.webp', width: 640, height: 176, seed: 'data' },
  { path: 'images/banners/cost-insurance-hero-banner.webp', width: 600, height: 256, seed: 'costins' },
  { path: 'images/inline/savings-success.webp', width: 800, height: 176, seed: 'savings' },
  { path: 'images/banners/faq-hero-banner.webp', width: 600, height: 256, seed: 'faq' },
  { path: 'images/inline/faq-support.webp', width: 192, height: 144, seed: 'support' },
  { path: 'images/banners/legitimacy-hero-banner.webp', width: 600, height: 256, seed: 'legitb' },
  { path: 'images/inline/verify-pharmacy.webp', width: 600, height: 160, seed: 'pharmacy' },
  { path: 'images/banners/alternatives-hero-banner.webp', width: 600, height: 256, seed: 'alt' },
  { path: 'images/inline/alternatives-paths.webp', width: 700, height: 160, seed: 'paths' },
  { path: 'images/banners/quiz-hero-banner.webp', width: 800, height: 176, seed: 'quizh' },
  { path: 'images/banners/trumprx-hero-banner.webp', width: 600, height: 256, seed: 'trumprx' },
  { path: 'images/inline/trumprx-apply.webp', width: 600, height: 144, seed: 'apply' },
  { path: 'images/banners/labs-hero-banner.webp', width: 600, height: 256, seed: 'labs' },
  { path: 'images/inline/labs-transparency.webp', width: 700, height: 144, seed: 'transparency' },
  { path: 'images/drugs/wegovy-hero.webp', width: 600, height: 256, seed: 'wegovy' },
  { path: 'images/drugs/ozempic-hero.webp', width: 600, height: 256, seed: 'ozempic' },
  { path: 'images/drugs/mounjaro-hero.webp', width: 600, height: 256, seed: 'mounjaro' },
  { path: 'images/drugs/zepbound-hero.webp', width: 600, height: 256, seed: 'zepbound' },
  { path: 'images/inline/drug-lifestyle.webp', width: 600, height: 160, seed: 'lifestyle' },
  { path: 'images/infographics/brand-medication-card.webp', width: 400, height: 128, seed: 'brand' },
  { path: 'images/infographics/compounded-medication-card.webp', width: 400, height: 128, seed: 'comp' },
  { path: 'images/infographics/oral-medication-card.webp', width: 400, height: 128, seed: 'oral' },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function download(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'GLP-1-Placeholder-Script/1' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function fetchAndSaveAsWebP(entry) {
  const url = `https://picsum.photos/seed/${encodeURIComponent(entry.seed)}/${entry.width}/${entry.height}`;
  const outPath = path.join(PUBLIC, entry.path);
  ensureDir(path.dirname(outPath));

  try {
    const buffer = await download(url);
    await sharp(buffer)
      .webp({ quality: 85 })
      .toFile(outPath);
    console.log('OK', entry.path);
    return true;
  } catch (err) {
    console.error('FAIL', entry.path, err.message);
    return false;
  }
}

async function main() {
  console.log('Downloading placeholder images to public/...');
  let ok = 0;
  for (const entry of IMAGE_LIST) {
    const success = await fetchAndSaveAsWebP(entry);
    if (success) ok++;
  }
  console.log(`Done: ${ok}/${IMAGE_LIST.length} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
