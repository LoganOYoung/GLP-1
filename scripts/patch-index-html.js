#!/usr/bin/env node
/**
 * 修补 out/index.html：Next 静态导出根页 RSC 中 urlParts 为 ["",""]，
 * 客户端会当成未匹配路由而显示 404。改为 ["/",""] 使根路径正确匹配。
 * 在 npm run build 后自动执行。
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'out', 'index.html');
if (!fs.existsSync(file)) {
  console.warn('patch-index-html: out/index.html not found, skip');
  process.exit(0);
}

let html = fs.readFileSync(file, 'utf8');
const before = html;
html = html.replace(/"urlParts\\":\[\\"\\",\\"\\"\]/g, '"urlParts\\":[\"\\/\",\"\"]');
if (html !== before) {
  fs.writeFileSync(file, html);
  console.log('patch-index-html: patched out/index.html (urlParts root fix)');
} else {
  console.log('patch-index-html: no change needed');
}
