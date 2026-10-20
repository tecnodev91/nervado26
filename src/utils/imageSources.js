/** Ruta WebP equivalente para jpg/jpeg/png. */
export function getWebpSource(src) {
  if (!src || /\.webp$/i.test(src)) return null;
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}
