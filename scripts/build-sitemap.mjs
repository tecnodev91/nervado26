/** Genera public/sitemap.xml con las rutas fijas y una URL por material. */
import { writeFileSync } from 'fs';
import { materials } from '../src/config/materialsIndex.js';

const SITE_URL = 'https://nervado26.com.ar';
const paths = ['/', '/productos', '/servicios', '/nosotros', '/contacto', ...materials.map((m) => `/productos/${m.slug}`)];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${paths.length} URLs`);
