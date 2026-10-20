/** Convierte filas anchas de caños en variantes por medida + espesores. */

function isNumericWeight(value) {
  if (value == null || value === '') return false;
  const text = String(value).trim();
  if (/\d\s*x\s*\d/i.test(text)) return false;
  return /^[\d.,]+$/.test(text);
}

function formatCanoWeight(value) {
  const num = Number.parseFloat(String(value).replace(',', '.'));
  if (Number.isNaN(num)) return '—';

  const kgPerM = num >= 100 ? num / 1000 : num;
  const formatted = kgPerM.toFixed(3).replace(/\.?0+$/, '').replace('.', ',');
  return `${formatted} kg/m`;
}

function parseThicknessLabel(column) {
  const match = column.match(/^([\d,]+)/);
  return match ? `${match[1]} mm` : column;
}

function formatMeasureTitle(slug, measure) {
  if (slug === 'canos-redondos') return `Ø ${measure} mm`;
  return String(measure).replace(/x/gi, ' × ');
}

/**
 * @param {string} slug
 * @param {string[]} columns
 * @param {Record<string, string>[]} rows
 */
export function buildCanosVariants(slug, columns, rows, measureColumn) {
  const thicknessColumns = columns.filter((col) => col !== measureColumn);

  return rows.map((row, index) => {
    const measure = row[measureColumn];
    const thicknesses = thicknessColumns
      .filter((col) => isNumericWeight(row[col]))
      .map((col) => ({
        thickness: parseThicknessLabel(col),
        weight: formatCanoWeight(row[col]),
      }));

    const thicknessLabels = thicknesses
      .map((item) => item.thickness.replace(/\s*mm$/, ''))
      .join(' / ');

    return {
      id: `${slug}-${index}`,
      measure,
      title: formatMeasureTitle(slug, measure),
      thicknessSummary: thicknessLabels
        ? `Espesores disponibles: ${thicknessLabels} mm`
        : 'Consultar espesores disponibles',
      thicknesses,
    };
  });
}

export function filterCanosVariants(variants, query) {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized) return variants;

  return variants.filter((variant) => {
    const measure = String(variant.measure).toLowerCase().replace(/\s+/g, '');
    const title = variant.title.toLowerCase().replace(/\s+/g, '');
    return measure.includes(normalized) || title.includes(normalized);
  });
}
