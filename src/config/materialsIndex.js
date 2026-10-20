import { materials as baseMaterials, MATERIAL_SECTIONS as baseSections } from './materialsCatalog.js';
import { canosSplitMaterials, canosSplitSections } from './materialsCatalogCanosSplit.js';
import { extraMaterials, extraSections } from './materialsCatalogExtra.js';
import { materialDescriptions } from './materialDescriptions.js';
import { materialDescriptionsExtra } from './materialDescriptionsExtra.js';
import { MATERIAL_FILTER_GROUP_DEFS, expandFilterGroupIds } from './materialFilterGroups.js';
import { MATERIAL_VARIANT_VIEWS } from './materialVariantViews.js';
import { PROFILES_W_SLUG } from './profilesWCatalog.js';
import { planchuelasLisasMaterial } from './planchuelasLisasCatalog.js';
import { angulosMaterial } from './angulosCatalog.js';
import {
  getMeasuresCatalogDetailLine,
  getMeasuresCatalogLabel,
  isConsultOnlyMaterial,
} from '../utils/materialMeasures.js';
import { getMaterialImageFit } from '../utils/materialImageFit.js';

const baseWithoutCanos = baseMaterials.filter(
  (m) => m.slug !== 'canos' && m.slug !== 'planchuelas-lisas' && m.slug !== 'angulos',
);
const baseSectionsWithoutCanos = baseSections.filter((s) => s.id !== 'canos');

const allDescriptions = { ...materialDescriptions, ...materialDescriptionsExtra };

function enrichMaterial(material) {
  const copy = allDescriptions[material.slug] ?? {};
  const variantView = MATERIAL_VARIANT_VIEWS[material.slug] ?? null;
  const specColumns = variantView?.displayColumns ?? material.columns;

  return {
    ...material,
    saleUnit: copy.saleUnit || '',
    brand: copy.brand || '',
    measuresBadge: copy.measuresBadge || '',
    summary: copy.summary || material.description,
    highlights: copy.highlights || [],
    summaryParagraphs: copy.summaryParagraphs || null,
    detailSections: copy.detailSections || [],
    howToRead: copy.howToRead || null,
    specsTableNote: copy.specsTableNote || '',
    measuresCatalogDetailLine: copy.measuresCatalogDetailLine || null,
    useCollapsibleSpecsTable: material.useCollapsibleSpecsTable ?? false,
    collapsibleTableLabel: material.collapsibleTableLabel || 'Ver tabla de medidas',
    description: copy.cardDescription || material.description,
    variantView,
    specColumns,
    profileWView: material.slug === PROFILES_W_SLUG,
    imageFit: getMaterialImageFit(material),
  };
}

function withMeasuresMeta(material) {
  const consultMeasuresOnly = isConsultOnlyMaterial(material);

  return {
    ...material,
    consultMeasuresOnly,
    measuresCatalogLabel: getMeasuresCatalogLabel(material),
    measuresCatalogDetailLine:
      material.measuresCatalogDetailLine ?? getMeasuresCatalogDetailLine(material),
  };
}

const catalogMaterials = [
  ...baseWithoutCanos,
  planchuelasLisasMaterial,
  angulosMaterial,
  ...canosSplitMaterials,
  ...extraMaterials,
];

export const materials = catalogMaterials.map(enrichMaterial).map(withMeasuresMeta);

export const MATERIAL_SECTIONS = [
  ...baseSectionsWithoutCanos,
  ...canosSplitSections,
  ...extraSections,
];

/** Grupos para el filtro lateral del catálogo (familias, no cada variante). */
export const MATERIAL_FILTER_GROUPS = MATERIAL_FILTER_GROUP_DEFS.map((group) => ({
  id: group.id,
  label: group.label,
  section: group.section ?? null,
  materialIds: group.materialIds,
  count: group.materialIds.length,
}));

/**
 * IDs de materiales que coinciden con los grupos seleccionados.
 * `null` = sin filtro de grupo (mostrar todos).
 */
export function getMaterialIdsForFilterGroups(groupIds) {
  if (!groupIds.length) return null;

  const ids = new Set();
  for (const group of MATERIAL_FILTER_GROUP_DEFS) {
    if (groupIds.includes(group.id)) {
      group.materialIds.forEach((id) => ids.add(id));
    }
  }
  return ids;
}

export { expandFilterGroupIds } from './materialFilterGroups.js';

export const MATERIALS_TOTAL = materials.length;

export function getMaterialBySlug(slug) {
  return materials.find((material) => material.slug === slug);
}

/** Materiales destacados para el home u otras vistas resumidas. */
export function getMaterialsBySlugs(slugs) {
  if (!slugs?.length) return [];

  const bySlug = new Map(materials.map((material) => [material.slug, material]));
  return slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
}
