import { getWebpSource } from '../../utils/imageSources';

/**
 * @param {{
 *   src: string,
 *   alt: string,
 *   className?: string,
 *   width?: number,
 *   height?: number,
 *   sizes?: string,
 *   loading?: 'lazy' | 'eager',
 *   fetchPriority?: 'high' | 'low' | 'auto',
 *   decoding?: 'async' | 'sync' | 'auto',
 *   pictureClassName?: string,
 *   'aria-hidden'?: boolean,
 * }} props
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  pictureClassName = 'block h-full w-full',
  width,
  height,
  sizes,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  'aria-hidden': ariaHidden,
}) {
  // Preferir WebP como src real para no descargar PNG/JPEG pesados de fallback.
  const resolvedSrc = getWebpSource(src) ?? src;

  return (
    <picture className={pictureClassName}>
      <img
        src={encodeURI(resolvedSrc)}
        alt={alt}
        className={className}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        aria-hidden={ariaHidden}
      />
    </picture>
  );
}
