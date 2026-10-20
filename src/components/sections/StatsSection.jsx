import { useEffect, useRef, useState } from 'react';
import { stats } from '../../config/site';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { formatStatNumber, useCountUp } from '../ui/useCountUp';

const COUNT_DURATION_MS = 1400;

function StatCard({ item, active, delay }) {
  const count = useCountUp(item.value, COUNT_DURATION_MS + delay * 80, active);

  return (
    <div
      className="stats-card group relative flex h-full min-h-[11.5rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] p-5 text-center backdrop-blur-sm transition-all duration-500 hover:border-orange/35 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-orange/10 sm:min-h-[12.5rem] sm:p-6"
      style={{ transitionDelay: active ? `${delay * 60}ms` : '0ms' }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <p
        className="stats-number font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.25rem]"
        aria-label={`+${formatStatNumber(item.value)}`}
      >
        <span className="text-orange">+</span>
        {formatStatNumber(count)}
      </p>
      <p className="mt-3 flex min-h-[2.75rem] items-center justify-center px-1 text-sm leading-snug text-white/70 sm:min-h-[3rem] sm:text-[0.9375rem]">
        {item.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="section-padding relative overflow-hidden !pt-0 !pb-12 sm:!pb-14"
      aria-labelledby="stats-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <SectionTitle
            label={stats.label}
            title={stats.title}
            light
            accent="orange"
            className="mx-auto max-w-3xl [&_h2]:text-balance"
          />
        </Reveal>

        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-4">
          {stats.items.map((item, index) => (
            <li key={item.label} className="flex min-h-0">
              <StatCard item={item} active={active} delay={index} />
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <Button to="/servicios" variant="orange" size="lg">
            {stats.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
