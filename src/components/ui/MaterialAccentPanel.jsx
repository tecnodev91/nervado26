/**
 * Panel informativo con acento celeste / naranja (estilo hero).
 *
 * @param {{ title: string, children: React.ReactNode }} props
 */
export default function MaterialAccentPanel({ title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-lavender/30 bg-white shadow-md shadow-lavender/10">
      <div className="h-1 bg-lavender" aria-hidden />
      <div className="p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {children}
      </div>
    </div>
  );
}
