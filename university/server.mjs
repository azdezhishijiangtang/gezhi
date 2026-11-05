/**
 * MathLens 静态资源服务器（零依赖）
 * - 服务 frontend/dist 生产构建产物
 * - SPA 历史路由回退：未知路径返回 index.html
 * - 监听 process.env.PORT（发布平台注入），默认 4173
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(rootDir, 'dist');
const port = Number(process.env.PORT) || 4173;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.map': 'application/json',
};

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    // 防目录穿越：规范化后必须位于 distDir 内
    const safe = normalize(join(distDir, pathname));
    if (!safe.startsWith(distDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Forbidden');
    }

    let filePath = safe;
    const s = await stat(filePath).catch(() => null);
    if (s?.isDirectory()) filePath = join(filePath, 'index.html');

    let data = await readFile(filePath).catch(() => null);
    if (!data) {
      // SPA 回退：/login、/profile、/topics/xxx 等前端路由均返回 index.html
      data = await readFile(join(distDir, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(data);
    }

    const type = MIME[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` });
    res.end(data);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`MathLens static server running on http://0.0.0.0:${port}`);
});
