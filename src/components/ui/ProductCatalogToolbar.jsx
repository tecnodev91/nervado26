import { SearchIcon, CloseIcon } from './Icons';

/**
 * @param {{
 *   query: string,
 *   onQueryChange: (value: string) => void,
 *   category: string,
 *   onCategoryChange: (value: string) => void,
 *   categories: { id: string, label: string }[],
 * }} props
 */
export default function ProductCatalogToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="mb-8 space-y-4 sm:mb-10">
      <div className="relative mx-auto max-w-2xl">
        <label htmlFor="catalog-search" className="sr-only">
          Buscar productos
        </label>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-lavender" />
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nombre o material…"
          className="w-full rounded-xl border border-lavender/40 bg-cream py-3.5 pr-11 pl-12 text-sm text-ink shadow-lg shadow-black/20 placeholder:text-ink-muted transition-colors duration-200 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30 sm:text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-orange/10 hover:text-orange"
            aria-label="Limpiar búsqueda"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filtrar por categoría"
      >
        {categories.map((item) => {
          const active = category === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onCategoryChange(item.id)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                active
                  ? 'border-orange bg-orange text-white shadow-md shadow-orange/25'
                  : 'border-white/15 bg-white/5 text-lavender hover:border-orange/35 hover:bg-orange/10 hover:text-orange'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
