import { useState } from 'react';
import MaterialSpecsTable from './MaterialSpecsTable';

/**
 * @param {{
 *   columns: string[],
 *   rows: Record<string, string>[],
 *   label?: string,
 * }} props
 */
export default function CollapsibleMaterialSpecsTable({
  columns,
  rows,
  label = 'Ver ficha técnica completa',
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!columns.length || !rows.length) return null;

  return (
    <section className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex w-full items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4 text-left shadow-sm transition-all duration-300 hover:border-orange/40 ${
          isOpen ? 'border-orange/35 shadow-orange/10' : 'border-lavender/30'
        }`}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-ink">{label}</span>
        <span
          className={`text-lavender-deep transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="mt-4">
            <MaterialSpecsTable columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </section>
  );
}
