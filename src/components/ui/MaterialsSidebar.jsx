import { FilterIcon, SearchIcon, CloseIcon, CheckIcon } from './Icons';
import { Fragment } from 'react';

/**
 * @param {{
 *   section: { id: string, label: string, count: number },
 *   checked: boolean,
 *   onToggle: (id: string) => void,
 *   variant?: 'dark' | 'light',
 * }} props
 */
function SectionOption({ section, checked, onToggle, variant = 'dark' }) {
  const light = variant === 'light';

  return (
    <li>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onToggle(section.id)}
        className={`group flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-all duration-200 ${
          checked
            ? 'border-orange/40 bg-orange/10 shadow-sm shadow-orange/8'
            : light
              ? 'border-transparent hover:border-lavender/30 hover:bg-cream'
              : 'border-transparent hover:border-white/15 hover:bg-white/8'
        }`}
      >
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
            checked
              ? 'border-orange bg-orange text-white'
              : light
                ? 'border-lavender/40 bg-white text-transparent group-hover:border-orange/50'
                : 'border-white/30 bg-white/5 text-transparent group-hover:border-orange/50'
          }`}
          aria-hidden
        >
          <CheckIcon className="h-2.5 w-2.5" />
        </span>
        <span
          className={`min-w-0 flex-1 text-[0.8125rem] leading-snug ${
            checked
              ? 'font-medium text-ink'
              : light
                ? 'text-ink-muted'
                : 'text-white/75'
          }`}
        >
          {section.label}
        </span>
        <span
          className={`shrink-0 rounded-full px-1.5 py-px text-[0.625rem] font-medium ${
            checked
              ? 'bg-orange/15 text-orange'
              : light
                ? 'bg-lavender/15 text-ink-muted'
                : 'bg-white/10 text-white/50'
          }`}
        >
          {section.count}
        </span>
      </button>
    </li>
  );
}

/**
 * @param {{
 *   sections: { id: string, label: string, count: number }[],
 *   selectedIds: string[],
 *   onToggle: (id: string) => void,
 *   onClear: () => void,
 *   query: string,
 *   onQueryChange: (value: string) => void,
 *   visibleCount: number,
 *   totalCount: number,
 *   searchId?: string,
 *   hideTitle?: boolean,
 *   variant?: 'dark' | 'light',
 *   categoriesOnlyScroll?: boolean,
 * }} props
 */
export function MaterialsSidebarContent({
  sections,
  selectedIds,
  onToggle,
  onClear,
  query,
  onQueryChange,
  visibleCount,
  totalCount,
  searchId = 'materials-search',
  hideTitle = false,
  variant = 'dark',
  categoriesOnlyScroll = false,
}) {
  const light = variant === 'light';
  const hasFilters = selectedIds.length > 0 || query.trim() !== '';

  const clearButtonClass = light
    ? 'rounded-md border border-lavender/30 bg-white px-2 py-1 text-[0.6875rem] font-medium text-ink-muted transition-colors hover:border-orange/40 hover:bg-orange/10 hover:text-orange'
    : 'rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[0.6875rem] font-medium text-white/70 transition-colors hover:border-orange/40 hover:bg-orange/15 hover:text-orange';

  const categoriesBlock = (
    <>
      <div className="mb-2 px-1.5">
        <p className={`font-label text-[0.6875rem] ${light ? 'text-ink-muted/80' : 'text-white/50'}`}>
          Categorías
        </p>
      </div>

      <ul className="space-y-0.5">
        {sections.map((section, index) => {
          const prevSection = index > 0 ? sections[index - 1].section : undefined;
          const showHeader = section.section && section.section !== prevSection;
          const isFirstHeader =
            showHeader && sections.findIndex((item) => item.section) === index;

          return (
            <Fragment key={section.id}>
              {showHeader && (
                <li className={`list-none ${isFirstHeader ? 'mt-1' : 'mt-4'}`}>
                  <p
                    className={`flex items-center gap-2 px-1.5 font-label text-[0.6875rem] font-semibold uppercase tracking-wide ${
                      light ? 'text-lavender-deep' : 'text-lavender'
                    }`}
                  >
                    <span className="h-1 w-5 shrink-0 rounded-full bg-lavender" aria-hidden />
                    {section.section}
                  </p>
                </li>
              )}
              <SectionOption
                section={section}
                checked={selectedIds.includes(section.id)}
                onToggle={onToggle}
                variant={variant}
              />
            </Fragment>
          );
        })}
      </ul>
    </>
  );

  return (
    <>
      <div
        className={`shrink-0 ${hideTitle ? '' : light ? 'border-b border-lavender/20' : 'border-b border-white/10'} px-4 py-3.5 sm:px-5`}
      >
        {!hideTitle && (
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange to-orange/80 text-white shadow-md shadow-orange/20">
                <FilterIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 className={`text-base font-semibold ${light ? 'text-ink' : 'text-white'}`}>
                  Filtrar
                </h2>
                <p className={`mt-0.5 text-[0.6875rem] ${light ? 'text-ink-muted' : 'text-white/55'}`}>
                  <span className="font-semibold text-orange">{visibleCount}</span> de {totalCount}{' '}
                  materiales
                </p>
              </div>
            </div>
            {hasFilters && (
              <button type="button" onClick={onClear} className={clearButtonClass}>
                Limpiar
              </button>
            )}
          </div>
        )}

        <div className={hideTitle ? '' : 'mt-3.5'}>
          <label htmlFor={searchId} className="sr-only">
            Buscar materiales
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-lavender" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar por nombre…"
              className={
                light
                  ? 'w-full rounded-lg border border-lavender/30 bg-white py-2 pr-9 pl-9 text-[0.8125rem] text-ink shadow-sm placeholder:text-ink-muted/50 transition-all duration-200 focus:border-orange/50 focus:outline-none focus:ring-2 focus:ring-orange/15'
                  : 'w-full rounded-lg border border-white/15 bg-white/8 py-2 pr-9 pl-9 text-[0.8125rem] text-white shadow-inner shadow-black/20 placeholder:text-white/40 transition-all duration-200 focus:border-orange/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange/20'
              }
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className={
                  light
                    ? 'absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-lavender/15 hover:text-ink'
                    : 'absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white'
                }
                aria-label="Limpiar búsqueda"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {hideTitle && hasFilters && (
          <button type="button" onClick={onClear} className={`mt-3 ${clearButtonClass} px-2.5 py-1.5`}>
            Limpiar filtros
          </button>
        )}
      </div>

      {categoriesOnlyScroll ? (
        <div className="catalog-sidebar min-h-0 flex-1 overflow-y-auto px-2.5 py-3 sm:px-3">
          {categoriesBlock}
        </div>
      ) : (
        <div className="px-2.5 py-3 sm:px-3">{categoriesBlock}</div>
      )}
    </>
  );
}

/**
 * @param {{
 *   sections: { id: string, label: string, count: number }[],
 *   selectedIds: string[],
 *   onToggle: (id: string) => void,
 *   onClear: () => void,
 *   query: string,
 *   onQueryChange: (value: string) => void,
 *   visibleCount: number,
 *   totalCount: number,
 *   variant?: 'dark' | 'light',
 * }} props
 */
export default function MaterialsSidebar({ variant = 'light', ...props }) {
  const light = variant === 'light';

  return (
    <aside
      className={`catalog-sidebar flex flex-col overflow-hidden rounded-xl lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] ${
        light
          ? 'border border-lavender/25 bg-white shadow-lg shadow-lavender/10'
          : 'border border-white/12 bg-white/[0.06] shadow-xl shadow-black/30 backdrop-blur-md'
      }`}
    >
      <div
        className="h-1 shrink-0 bg-gradient-to-r from-orange via-lavender/80 to-transparent"
        aria-hidden
      />
      <MaterialsSidebarContent
        {...props}
        variant={variant}
        searchId="materials-search-desktop"
        categoriesOnlyScroll
      />
    </aside>
  );
}
