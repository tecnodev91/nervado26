import { values } from '../../config/site';
import SectionTitle from '../ui/SectionTitle';
import { Reveal, RevealStagger, RevealItem } from '../ui/Reveal';
import { ValueIcon, getValueIconAccent } from '../ui/Icons';

/**
 * @param {{ embedded?: boolean }} props
 */
export default function ValuesSection({ embedded = false }) {
  const grid = (
    <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {values.items.map((item, index) => (
        <RevealItem key={item.label}>
          <div
            className="group flex h-full flex-col items-center rounded-2xl border border-lavender/30 bg-white p-5 text-center shadow-sm shadow-lavender/8 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-md hover:shadow-orange/10 sm:p-6"
          >
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl ${getValueIconAccent(index)}`}
            >
              <ValueIcon name={item.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="font-display text-sm text-ink sm:text-base">{item.label}</h3>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );

  if (embedded) {
    return (
      <div id="valores" className="relative" aria-label={values.title}>
        <h3 className="font-display mb-6 text-2xl text-ink sm:mb-8">{values.title}</h3>
        {grid}
      </div>
    );
  }

  return (
    <section
      id="valores"
      className="section-padding relative overflow-hidden border-t border-lavender/25 bg-lavender/15"
      aria-label={values.title}
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-orange/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-lavender/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <SectionTitle
            title={values.title}
            className="mx-auto [&_h2]:text-3xl sm:[&_h2]:text-4xl"
          />
        </Reveal>
        {grid}
      </div>
    </section>
  );
}
