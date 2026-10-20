import { Link } from 'react-router-dom';
import Button from './Button';
import OptimizedImage from './OptimizedImage';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppUrl, productWhatsAppMessage } from '../../utils/whatsapp';
import { getMaterialImageFit } from '../../utils/materialImageFit';

/**
 * @param {{ slug: string, name: string, description: string, image: string, measuresCatalogLabel?: string | null, saleUnit?: string, catalog?: boolean, compact?: boolean, imageLoading?: 'lazy' | 'eager', imageFetchPriority?: 'high' | 'low' | 'auto' }} props
 */
export default function MaterialCard({
  slug,
  name,
  description,
  image,
  measuresCatalogLabel,
  saleUnit,
  imageFit,
  catalog = false,
  compact = false,
  className = '',
  imageLoading = 'lazy',
  imageFetchPriority,
}) {
  const waUrl = getWhatsAppUrl(productWhatsAppMessage(name));
  const contain = getMaterialImageFit({ slug, imageFit }) === 'contain';

  const cardSurface = catalog
    ? 'border-lavender/25 bg-white shadow-md shadow-lavender/10'
    : 'border-lavender/25 bg-cream shadow-lg shadow-black/15';

  return (
    <article
      className={`group flex h-full w-full flex-col overflow-hidden transition-all duration-300 hover:border-orange/40 ${
        compact
          ? 'rounded-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-orange/15'
          : 'rounded-2xl hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange/20'
      } ${cardSurface} ${className}`}
    >
      <Link
        to={`/productos/${slug}`}
        className={`relative block h-[220px] shrink-0 overflow-hidden ${
          contain ? 'bg-white' : 'bg-ink/5'
        }`}
      >
        <OptimizedImage
          src={image}
          alt={name}
          className={`h-full w-full object-center transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            contain
              ? 'object-contain p-4 sm:p-5'
              : 'object-cover'
          }`}
          sizes={
            compact
              ? '(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw'
              : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          }
          loading={imageLoading}
          fetchPriority={imageFetchPriority}
          decoding="async"
        />
        <div className={`absolute flex flex-wrap gap-1.5 ${compact ? 'top-2 left-2' : 'top-3 left-3 gap-2'}`}>
          {measuresCatalogLabel && (
            <span
              className={`rounded-full bg-orange font-semibold text-white shadow-sm ${
                compact ? 'px-2 py-0.5 text-[0.6rem]' : 'px-2.5 py-1 text-[0.65rem]'
              }`}
            >
              {measuresCatalogLabel}
            </span>
          )}
          {saleUnit && (
            <span
              className={`rounded-full border font-medium shadow-sm backdrop-blur-sm ${
                contain
                  ? 'border-ink/10 bg-ink/75 text-white'
                  : 'border-white/30 bg-ink/40 text-white'
              } ${compact ? 'px-2 py-0.5 text-[0.6rem]' : 'px-2.5 py-1 text-[0.65rem]'}`}
            >
              {saleUnit}
            </span>
          )}
        </div>
      </Link>

      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col ${
          compact ? 'gap-1 px-4 pt-4 pb-5' : 'gap-1.5 px-5 pt-5 pb-6 sm:gap-2 sm:px-6'
        }`}
      >
        <Link to={`/productos/${slug}`} className="group/title shrink-0">
          <h3
            className={`line-clamp-2 font-display leading-snug text-ink transition-colors group-hover/title:text-orange ${
              compact
                ? 'min-h-[2.5rem] text-base sm:min-h-[2.625rem] sm:text-[1.05rem]'
                : 'min-h-[3rem] text-lg sm:text-xl'
            }`}
          >
            {name}
          </h3>
        </Link>

        <p
          className={`line-clamp-3 min-h-[3lh] shrink-0 leading-snug text-ink-muted ${
            compact ? 'text-xs sm:text-sm' : 'text-sm'
          }`}
        >
          {description}
        </p>

        <div className="min-h-2 flex-1" aria-hidden />

        <div className={`flex shrink-0 flex-col ${compact ? 'gap-2' : 'gap-2.5'}`}>
          <Button
            href={waUrl}
            external
            variant="orange"
            size="sm"
            className={`w-full max-w-full justify-center text-center leading-tight ${compact ? '!px-4 !py-2.5 !text-sm' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            Consultar por WhatsApp
          </Button>
          <Link
            to={`/productos/${slug}`}
            className={`inline-flex items-center justify-center gap-1.5 py-1 font-semibold text-lavender-deep transition-colors hover:text-orange ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            Ver ficha técnica
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
