#!/usr/bin/env node
/**
 * 静态站点服务器：正确处理根路径与子路径，避免 404。
 * - GET / 或 空路径 -> out/index.html
 * - GET /path -> out/path.html（无 trailingSlash 导出）
 * - 静态资源按路径直接映射 out 目录
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 3000;
const OUT = path.join(__dirname, '..', 'out');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
};

function send(res, status, body, contentType) {
  res.writeHead(status, { 'Content-Type': contentType || 'text/html; charset=utf-8' });
  res.end(body);
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'Not Found', 'text/plain');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '' || p === '/') {
    serveFile(res, path.join(OUT, 'index.html'));
    return;
  }
  if (p.startsWith('/')) p = p.slice(1);
  const filePath = path.join(OUT, p);
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      serveFile(res, filePath);
      return;
    }
    if (!err && stat.isDirectory()) {
      const indexHtml = path.join(filePath, 'index.html');
      fs.stat(indexHtml, (e2, s2) => {
        if (!e2 && s2.isFile()) {
          serveFile(res, indexHtml);
          return;
        }
        send(res, 404, 'Not Found', 'text/plain');
      });
      return;
    }
    const withHtml = path.join(OUT, p + '.html');
    fs.stat(withHtml, (e3, s3) => {
      if (!e3 && s3.isFile()) {
        serveFile(res, withHtml);
        return;
      }
      send(res, 404, 'Not Found', 'text/plain');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Serving ${OUT} at http://localhost:${PORT}`);
});
