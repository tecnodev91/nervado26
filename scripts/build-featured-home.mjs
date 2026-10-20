/** Regenera src/config/featuredMaterialsHome.js desde el catálogo completo. */
import { writeFileSync } from 'fs';
import { productsPage } from '../src/config/site.js';
import { getMaterialsBySlugs } from '../src/config/materialsIndex.js';

const items = getMaterialsBySlugs(productsPage.featuredSlugs).map((m) => ({
  id: m.id,
  slug: m.slug,
  name: m.name,
  description: m.description,
  image: m.image,
  measuresCatalogLabel: m.measuresCatalogLabel ?? null,
  saleUnit: m.saleUnit || '',
}));

const body = `/**
 * Datos mínimos para el carrusel de productos en la home.
 * Orden = productsPage.featuredSlugs en site.js.
 * Generado con: npm run build-featured-home
 */
export const featuredHomeMaterials = ${JSON.stringify(items, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;

writeFileSync(new URL('../src/config/featuredMaterialsHome.js', import.meta.url), body, 'utf8');
console.log(`featuredMaterialsHome.js actualizado (${items.length} materiales)`);
