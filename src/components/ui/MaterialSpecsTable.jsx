/**
 * @param {{ columns: string[], rows: Record<string, string>[] }} props
 */
export default function MaterialSpecsTable({ columns, rows }) {
  if (!columns.length || !rows.length) {
    return (
      <p className="rounded-xl border border-lavender/30 bg-cream px-4 py-8 text-center text-sm text-ink-muted">
        Consultanos por WhatsApp para medidas y disponibilidad.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-lavender/30 bg-cream shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-lavender/25 bg-lavender/10">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 py-3 text-xs font-semibold whitespace-nowrap text-ink"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-lavender/15 transition-colors last:border-0 even:bg-white/60 hover:bg-orange/5"
            >
              {columns.map((col) => (
                <td key={col} className="px-4 py-3 whitespace-nowrap text-ink-muted">
                  {row[col] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
