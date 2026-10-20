import fs from 'fs';
import path from 'path';

const publicImages = 'public/images';
const files = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name)) files.push(p.replace(/\\/g, '/'));
  }
}

walk(publicImages);

const refs = new Set();

function scanFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  for (const match of text.matchAll(/\/images\/[^"'`\s)]+/g)) {
    refs.add(match[0].split('?')[0]);
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scanDir(p);
    else if (/\.(jsx?|html|css|js|mjs|json|md)$/i.test(e.name)) scanFile(p);
  }
}

for (const root of ['src', 'index.html', 'documentacion', 'docs']) {
  if (fs.existsSync(root) && fs.statSync(root).isFile()) scanFile(root);
  else scanDir(root);
}

const unused = [];

for (const filePath of files) {
  const url = `/${filePath.replace(/^public\//, '')}`;
  const base = path.basename(url);
  const used =
    refs.has(url) ||
    refs.has(url.replace(/\.(png|jpe?g)$/i, '.webp')) ||
    [...refs].some((r) => r.endsWith(base) || r.includes(base));

  if (!used) {
    unused.push({ url, kb: Math.round(fs.statSync(filePath).size / 1024) });
  }
}

unused.sort((a, b) => b.kb - a.kb);
const totalKb = unused.reduce((sum, item) => sum + item.kb, 0);
console.log(`UNUSED: ${unused.length} files, ~${totalKb} KB total\n`);
for (const item of unused) {
  console.log(`${item.kb}\t${item.url}`);
}
