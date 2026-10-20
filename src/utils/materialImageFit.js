/** Productos en packshot / fondo blanco: no recortar con object-cover. */
const CONTAIN_IMAGE_SLUGS = new Set([
  'alambres-recocidos-o-negros',
  'alambres-galvanizados',
  'clavos-punta-paris',
  'clavos-espiralados',
  'clavos-negros',
  'montantes',
  'soleras',
  'cantoneras',
  'angulo-de-ajuste',
  'perfil-omega',
  'cinta-estanqueidad-banda-acustica',
  'cinta-butilica-autoadhesiva',
  'cinta-papel-microperforada',
  'cinta-tramada-fibra-vidrio',
  'masillas-construccion-seco',
]);

/**
 * @param {{ slug?: string, imageFit?: 'cover' | 'contain' }} material
 * @returns {'cover' | 'contain'}
 */
export function getMaterialImageFit(material) {
  if (material?.imageFit === 'contain' || material?.imageFit === 'cover') {
    return material.imageFit;
  }
  if (material?.slug && CONTAIN_IMAGE_SLUGS.has(material.slug)) return 'contain';
  return 'cover';
}
