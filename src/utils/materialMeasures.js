/** Tabla de una sola fila "Consulta" — sin medidas publicadas en catálogo. */
export function isConsultOnlyMaterial(material) {
  const columns = material?.columns ?? [];
  const rows = material?.rows ?? [];

  return columns.length === 1 && columns[0] === 'Consulta' && rows.length === 1;
}

/** Badge naranja en cards del catálogo. */
export function getMeasuresCatalogLabel(material) {
  if (material.measuresBadge) {
    return material.measuresBadge;
  }

  if (isConsultOnlyMaterial(material)) {
    return null;
  }

  if (material.itemCount > 0) {
    return `${material.itemCount} medidas`;
  }

  return null;
}

/** Línea al pie de la ficha técnica en detalle de producto. */
export function getMeasuresCatalogDetailLine(material) {
  if (isConsultOnlyMaterial(material)) {
    return null;
  }

  if (material.itemCount > 0) {
    return `${material.itemCount} medidas en catálogo`;
  }

  if (material.measuresBadge) {
    return `${material.measuresBadge} en catálogo`;
  }

  return null;
}
