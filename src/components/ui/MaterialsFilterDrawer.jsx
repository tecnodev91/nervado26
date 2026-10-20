import { useEffect, useState } from 'react';
import { FilterIcon, CloseIcon } from './Icons';
import { MaterialsSidebarContent } from './MaterialsSidebar';

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
 * }} props
 */
export default function MaterialsFilterDrawer(props) {
  const [open, setOpen] = useState(false);
  const hasFilters = props.selectedIds.length > 0 || props.query.trim() !== '';
  const activeFilterCount =
    props.selectedIds.length + (props.query.trim() ? 1 : 0);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-lavender/30 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm shadow-lavender/10 transition-colors hover:border-orange/35 hover:bg-orange/5"
        >
          <FilterIcon className="h-4 w-4 text-orange" />
          Filtrar materiales
          {hasFilters && (
            <span className="rounded-full bg-orange px-2 py-0.5 text-[0.6875rem] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="materials-filter-title">
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Cerrar filtros"
          />

          <div className="absolute inset-x-0 bottom-0 flex max-h-[min(88vh,720px)] flex-col rounded-t-2xl border border-lavender/25 bg-cream shadow-2xl shadow-ink/20 animate-[slide-up_0.3s_ease-out]">
            <div className="flex shrink-0 items-center justify-between border-b border-lavender/20 bg-white px-4 py-3.5">
              <div>
                <h2 id="materials-filter-title" className="text-base font-semibold text-ink">
                  Filtrar materiales
                </h2>
                <p className="mt-0.5 text-[0.6875rem] text-ink-muted">
                  <span className="font-semibold text-orange">{props.visibleCount}</span> de{' '}
                  {props.totalCount} materiales
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-lavender/30 bg-white text-ink-muted transition-colors hover:border-orange/40 hover:bg-orange/10 hover:text-orange"
                aria-label="Cerrar filtros"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="catalog-sidebar flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
              <MaterialsSidebarContent
                {...props}
                searchId="materials-search-mobile"
                hideTitle
                variant="light"
                categoriesOnlyScroll
              />
            </div>

            <div className="shrink-0 border-t border-lavender/20 bg-white p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-md bg-orange px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-colors hover:bg-orange/90"
              >
                Ver {props.visibleCount} materiales
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
