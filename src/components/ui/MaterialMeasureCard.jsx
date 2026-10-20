import Button from './Button';
import { WhatsAppIcon } from './Icons';

const ORANGE_ACCENT = {
  card: 'border-orange/25 bg-white shadow-md shadow-orange/8 hover:border-orange/45 hover:shadow-orange/15',
  bar: 'bg-orange',
  badge: 'bg-orange/10 text-orange',
  titleHover: 'group-hover:text-orange',
  summary: 'border-orange/15 bg-cream/50',
};

export function MaterialMeasureGroupTitle({ children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-ink-muted">
      <span className="h-1 w-8 shrink-0 rounded-full bg-orange" aria-hidden />
      {children}
    </h3>
  );
}

/**
 * @param {{
 *   title: string,
 *   badge?: string,
 *   summary?: React.ReactNode,
 *   waUrl: string,
 *   actions?: React.ReactNode,
 *   expandedContent?: React.ReactNode,
 *   onToggle?: () => void,
 * }} props
 */
export default function MaterialMeasureCard({
  title,
  badge,
  summary,
  waUrl,
  actions,
  expandedContent,
  onToggle,
}) {
  const accent = ORANGE_ACCENT;

  return (
    <li
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${accent.card} ${
        onToggle ? 'cursor-pointer' : ''
      }`}
      onClick={(event) => {
        if (!onToggle) return;
        if (event.target.closest('a')) return;
        onToggle();
      }}
    >
      <div className={`h-1 shrink-0 ${accent.bar}`} aria-hidden />

      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className={`font-display text-lg text-ink transition-colors duration-300 ${accent.titleHover}`}>
            {title}
          </p>
          {badge && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider ${accent.badge}`}
            >
              {badge}
            </span>
          )}
        </div>

        {summary && (
          <div
            className={`mt-3 rounded-xl border px-3.5 py-3 text-sm leading-relaxed text-ink-muted ${accent.summary}`}
          >
            {summary}
          </div>
        )}

        {expandedContent}

        <div className="mt-4">
          {actions ?? (
            <Button href={waUrl} external variant="dark" size="sm" className="w-full">
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Consultar
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
