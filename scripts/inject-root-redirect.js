#!/usr/bin/env node
/**
 * 在 out/index.html 的 <head> 标签后立即注入根路径重定向脚本，
 * 确保在 Next 的 async 脚本之前执行，避免 pathname 为空时客户端路由误判导致空白。
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'out', 'index.html');
if (!fs.existsSync(file)) {
  console.warn('inject-root-redirect: out/index.html not found, skip');
  process.exit(0);
}

const redirectScript =
  '<script>(function(){var p=document.location.pathname;if(!p||p===\'\'){document.location.replace(document.location.origin+\'/\');}})();</script>';

let html = fs.readFileSync(file, 'utf8');
const headOpen = html.indexOf('<head>');
if (headOpen === -1) {
  console.warn('inject-root-redirect: no <head> found');
  process.exit(0);
}
const insertAt = headOpen + '<head>'.length;
html = html.slice(0, insertAt) + redirectScript + html.slice(insertAt);
fs.writeFileSync(file, html);
console.log('inject-root-redirect: injected root redirect as first in head');
