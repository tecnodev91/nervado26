import { CloseIcon } from './Icons';

/**
 * @param {{
 *   visibleCount: number,
 *   totalCount: number,
 *   selectedSections: { id: string, label: string }[],
 *   query: string,
 *   onRemoveSection: (id: string) => void,
 *   onClearQuery: () => void,
 *   onClearAll: () => void,
 *   variant?: 'dark' | 'light',
 * }} props
 */
export default function MaterialsCatalogHeader({
  visibleCount,
  totalCount,
  selectedSections,
  query,
  onRemoveSection,
  onClearQuery,
  onClearAll,
  variant = 'light',
}) {
  const light = variant === 'light';
  const hasActiveFilters = selectedSections.length > 0 || query.trim() !== '';

  return (
    <div className="mb-6 space-y-4">
      <div
        className={`flex flex-wrap items-end justify-between gap-4 rounded-xl border px-5 py-4 sm:px-6 ${
          light
            ? 'border-lavender/25 bg-white shadow-sm'
            : 'border-white/10 bg-white/[0.04] backdrop-blur-sm'
        }`}
      >
        <div>
          <p className={`font-label ${light ? 'text-orange' : 'text-lavender'}`}>Resultados</p>
          <p className={`mt-1 font-display text-2xl sm:text-3xl ${light ? 'text-ink' : 'text-white'}`}>
            {visibleCount}{' '}
            <span
              className={`text-lg font-normal sm:text-xl ${
                light ? 'text-ink-muted' : 'text-white/45'
              }`}
            >
              / {totalCount} materiales
            </span>
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className={
              light
                ? 'rounded-full border border-lavender/30 bg-cream px-4 py-2 text-xs font-medium text-ink-muted transition-all hover:border-orange/40 hover:bg-orange/10 hover:text-orange'
                : 'rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:border-orange/40 hover:bg-orange/15 hover:text-orange'
            }
          >
            Quitar filtros
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {query.trim() && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-orange/35 bg-orange/10 py-1 pr-1 pl-3 text-xs ${
                light ? 'text-ink' : 'text-white'
              }`}
            >
              <span className={light ? 'text-ink-muted' : 'text-white/55'}>Búsqueda:</span>
              <span className="font-medium">{query}</span>
              <button
                type="button"
                onClick={onClearQuery}
                className={
                  light
                    ? 'ml-1 flex h-5 w-5 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-lavender/15 hover:text-ink'
                    : 'ml-1 flex h-5 w-5 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white'
                }
                aria-label="Quitar búsqueda"
              >
                <CloseIcon className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedSections.map((section) => (
            <span
              key={section.id}
              className={`inline-flex items-center gap-1.5 rounded-full border border-lavender/35 bg-lavender/10 py-1 pr-1 pl-3 text-xs ${
                light ? 'text-ink' : 'text-white'
              }`}
            >
              {section.label}
              <button
                type="button"
                onClick={() => onRemoveSection(section.id)}
                className={
                  light
                    ? 'ml-1 flex h-5 w-5 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-lavender/20 hover:text-ink'
                    : 'ml-1 flex h-5 w-5 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white'
                }
                aria-label={`Quitar filtro ${section.label}`}
              >
                <CloseIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
