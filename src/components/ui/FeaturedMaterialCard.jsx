import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

/**
 * @param {{ label: string, description?: string, image: string, to: string }} props
 */
export default function FeaturedMaterialCard({ label, description, image, to }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-lavender/30 bg-white shadow-sm shadow-lavender/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/30 hover:shadow-md hover:shadow-lavender/20">
      <div className="flex h-0.5" aria-hidden>
        <span className="flex-1 bg-lavender/80" />
        <span className="flex-1 bg-orange" />
      </div>

      <Link to={to} className="relative block aspect-[3/4] max-h-[13.5rem] overflow-hidden bg-ink sm:max-h-[14.5rem]">
        <OptimizedImage
          src={image}
          alt={label}
          className="h-full w-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 py-3.5 sm:px-4 sm:py-4">
        <h3 className="font-display text-base leading-snug text-ink sm:text-[1.05rem]">{label}</h3>
        {description && (
          <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
        <Link
          to={to}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange transition-colors hover:text-lavender-deep"
        >
          Ver material
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
