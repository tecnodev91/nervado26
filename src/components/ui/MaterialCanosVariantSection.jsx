import { useMemo, useState } from 'react';

import Button from './Button';
import MaterialMeasureCard from './MaterialMeasureCard';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppUrl, productWhatsAppMessage } from '../../utils/whatsapp';
import { buildCanosVariants, filterCanosVariants } from '../../utils/canosVariants';

function ThicknessSpecsTable({ thicknesses }) {
  if (!thicknesses.length) {
    return <p className="mt-4 text-sm text-ink-muted">Consultá disponibilidad en depósito.</p>;
  }

  return (
    <div className="mt-4 overflow-x-auto border-t border-lavender/20 pt-4">
      <table className="w-full min-w-[240px] text-left text-sm">
        <thead>
          <tr className="border-b border-lavender/20 text-xs uppercase tracking-wide text-ink-muted">
            <th className="pb-2 pr-4 font-semibold">Espesor</th>
            <th className="pb-2 font-semibold">Peso aprox.</th>
          </tr>
        </thead>
        <tbody>
          {thicknesses.map((item) => (
            <tr key={item.thickness} className="border-b border-lavender/10 last:border-0">
              <td className="py-2 pr-4 text-ink">{item.thickness}</td>
              <td className="py-2 text-ink-muted">{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * @param {{
 *   slug: string,
 *   materialName: string,
 *   rows: Record<string, string>[],
 *   columns: string[],
 *   view: { title: string, cardBadge?: string, measureColumn: string, showSearch?: boolean },
 * }} props
 */
export default function MaterialCanosVariantSection({ slug, materialName, rows, columns, view }) {
  const [expandedKey, setExpandedKey] = useState(null);
  const [search, setSearch] = useState('');

  const variants = useMemo(
    () => buildCanosVariants(slug, columns, rows, view.measureColumn),
    [slug, columns, rows, view.measureColumn],
  );

  const visibleVariants = useMemo(
    () => (view.showSearch ? filterCanosVariants(variants, search) : variants),
    [variants, view.showSearch, search],
  );

  const toggleSpecs = (key) => {
    setExpandedKey((current) => (current === key ? null : key));
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-xl text-ink sm:text-2xl">{view.title}</h2>

        {view.showSearch && (
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Buscar por medida</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por diámetro…"
              className="w-full rounded-xl border border-lavender/35 bg-white px-4 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-muted/60 focus:border-orange/50"
            />
          </label>
        )}
      </div>

      {view.showSearch && search && (
        <p className="mt-3 text-sm text-ink-muted">
          {visibleVariants.length} medida{visibleVariants.length === 1 ? '' : 's'} encontrada
          {visibleVariants.length === 1 ? '' : 's'}
        </p>
      )}

      <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleVariants.map((variant) => {
          const isExpanded = expandedKey === variant.id;
          const waUrl = getWhatsAppUrl(
            productWhatsAppMessage(`${materialName} ${variant.title}`),
          );

          return (
            <MaterialMeasureCard
              key={variant.id}
              title={variant.title}
              badge={view.cardBadge}
              summary={variant.thicknessSummary}
              waUrl={waUrl}
              onToggle={() => toggleSpecs(variant.id)}
              expandedContent={
                isExpanded ? <ThicknessSpecsTable thicknesses={variant.thicknesses} /> : null
              }
              actions={
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleSpecs(variant.id);
                    }}
                    className="text-sm font-semibold text-orange transition-colors hover:text-lavender-deep"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                  </button>
                  {isExpanded && (
                    <Button href={waUrl} external variant="dark" size="sm" className="w-full">
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Consultar
                    </Button>
                  )}
                </div>
              }
            />
          );
        })}
      </ul>

      {visibleVariants.length === 0 && (
        <p className="mt-6 rounded-xl border border-lavender/25 bg-white px-4 py-6 text-center text-sm text-ink-muted">
          No hay medidas que coincidan con tu búsqueda.
        </p>
      )}
    </section>
  );
}
