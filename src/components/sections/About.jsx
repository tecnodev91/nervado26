import { about } from '../../config/site';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import OptimizedImage from '../ui/OptimizedImage';
// import AboutGallery from '../ui/AboutGallery';
import ValuesSection from './ValuesSection';
import { AudienceIcon } from '../ui/Icons';
import { Reveal, RevealStagger, RevealItem } from '../ui/Reveal';

function AboutHistoryBlock({ label, title, paragraphs, image }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-lavender/25 bg-white shadow-lg shadow-lavender/12">
      <div
        className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-orange via-orange to-lavender/80 sm:w-2"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-lavender/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col md:flex-row">
        <div className="min-w-0 flex-1 py-6 pr-6 pl-7 sm:py-8 sm:pr-8 sm:pl-9">
          <span className="font-label inline-flex items-center rounded-full border border-orange/35 bg-orange/10 px-3 py-1 text-orange">
            {label}
          </span>
          <h3 className="font-display mt-4 text-2xl leading-tight text-ink sm:text-[1.75rem]">
            {title}
          </h3>
          <div className="mt-6 space-y-4 border-t border-lavender/20 pt-6">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="flex gap-3 sm:gap-4">
                <span
                  className="font-display mt-0.5 shrink-0 text-sm font-bold text-orange/70 tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>

        {image && (
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden border-t border-lavender/20 md:aspect-auto md:min-h-0 md:w-[42%] md:border-t-0 md:border-l">
            <OptimizedImage
              src={image}
              alt=""
              pictureClassName="absolute inset-0 h-full w-full"
              className="h-full w-full object-cover object-center"
              sizes="(min-width: 768px) 42vw, 100vw"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </div>
    </article>
  );
}

function AboutDifferentialHighlight({ label, headline, support, closing }) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl bg-[#181818] px-7 py-10 shadow-xl shadow-black/25 ring-1 ring-white/[0.06] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
      style={{
        backgroundColor: '#181818',
        backgroundImage:
          'radial-gradient(ellipse 48% 90% at 0% 50%, rgba(249, 134, 18, 0.1), transparent 72%)',
      }}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-orange via-orange/90 to-lavender/40 sm:w-2"
        aria-hidden
      />

      <div className="relative max-w-3xl">
        <span className="font-label inline-flex items-center rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-orange">
          {label}
        </span>
        <h3 className="font-display mt-5 text-2xl leading-[1.15] tracking-wide text-white uppercase sm:text-3xl lg:text-[2.125rem]">
          {headline}
        </h3>
        <p className="mt-5 text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base">{support}</p>
        <p className="font-display mt-8 border-t border-white/15 pt-6 text-lg leading-snug text-orange sm:text-xl">
          {closing}
        </p>
      </div>
    </article>
  );
}

function AboutBlock({ title, children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-lavender/30 bg-white p-6 shadow-md shadow-lavender/8 sm:p-8 ${className}`}
    >
      <h3 className="font-display text-xl text-orange sm:text-2xl">{title}</h3>
      {children}
    </div>
  );
}

function AboutBlockParagraphs({ paragraphs }) {
  return (
    <div className="mt-5 space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function PillarsGrid({ compact = false, showLabel = false }) {
  return (
    <div className={compact ? 'mt-8' : 'mt-10'}>
      {showLabel && (
        <p className="mb-4 text-sm font-semibold text-orange">{about.pillarsLabel}</p>
      )}
      <RevealStagger className="grid gap-6 sm:grid-cols-3">
        {about.pillars.map((pillar) => (
          <RevealItem key={pillar.title}>
            <div className="h-full rounded-2xl border border-lavender/35 bg-cream p-5 shadow-sm shadow-lavender/10 transition-all duration-300 hover:-translate-y-1 hover:border-orange/30 hover:shadow-md hover:shadow-lavender/20">
              <h3 className="font-display text-lg text-orange">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}

/**
 * @param {{ preview?: boolean }} props
 */
export default function About({ preview = false }) {
  if (preview) {
    return (
      <section
        id="nosotros"
        className="section-padding border-t border-lavender/30 bg-cream !pt-6 sm:!pt-7 lg:!pt-8"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-lavender/30 bg-white shadow-lg shadow-lavender/10">
              <div className="flex h-1" aria-hidden>
                <span className="flex-1 bg-lavender" />
                <span className="flex-1 bg-orange" />
              </div>

              <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-stretch">
                {about.previewImage && (
                  <div className="relative min-h-[16rem] overflow-hidden border-b border-lavender/20 sm:min-h-[20rem] lg:min-h-[22rem] lg:border-r lg:border-b-0">
                    <OptimizedImage
                      src={about.previewImage}
                      alt="Nervado 26 — depósito"
                      pictureClassName="absolute inset-0 h-full w-full"
                      className="h-full w-full object-cover object-center"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lavender/15 via-transparent to-orange/10"
                      aria-hidden
                    />
                  </div>
                )}

                <div className="flex min-w-0 flex-col justify-center bg-gradient-to-br from-lavender/[0.08] via-white to-orange/[0.05] p-6 sm:p-8 lg:p-10">
                  <span className="font-label text-orange">{about.label}</span>
                  <h2 className="font-display mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                    {about.previewTitle.lead} {about.previewTitle.accent}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">
                    {about.preview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {about.pillars.map((pillar, index) => {
                      const accentFirst = index % 2 === 0;

                      return (
                        <span
                          key={pillar.title}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            accentFirst
                              ? 'border-lavender/40 bg-lavender/15 text-lavender-deep'
                              : 'border-orange/35 bg-orange/10 text-orange'
                          }`}
                        >
                          {pillar.title}
                        </span>
                      );
                    })}
                  </div>

                  <Button to="/nosotros" variant="orange" size="md" className="mt-8 self-start">
                    {about.previewCta}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding border-t border-lavender/25 bg-lavender/15 !pt-6 sm:!pt-7 lg:!pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-12">
          <SectionTitle
            label={about.label}
            title={about.title}
            description="Conocé nuestra trayectoria, valores y propuesta como distribuidor de materiales."
          />
        </Reveal>

        {/* Galería de fotos — desactivada por pedido
        <Reveal delay={100}>
          <AboutGallery className="mb-14 sm:mb-16" />
        </Reveal>
        */}

        <div className="mx-auto max-w-4xl space-y-8">
          <Reveal>
            <AboutHistoryBlock
              label={about.history.label}
              title={about.history.title}
              paragraphs={about.history.paragraphs}
              image={about.history.image}
            />
          </Reveal>

          <RevealStagger className="grid gap-6 sm:grid-cols-2">
            <RevealItem>
              <AboutBlock title={about.mission.title} className="h-full">
                <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
                  {about.mission.text}
                </p>
              </AboutBlock>
            </RevealItem>
            <RevealItem>
              <AboutBlock title={about.vision.title} className="h-full">
                <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
                  {about.vision.text}
                </p>
              </AboutBlock>
            </RevealItem>
          </RevealStagger>

          <Reveal>
            <AboutDifferentialHighlight
              label={about.differential.label}
              headline={about.differential.headline}
              support={about.differential.support}
              closing={about.differential.closing}
            />
          </Reveal>

          <Reveal>
            <div>
              <h3 className="font-display mb-5 text-2xl text-ink">{about.audience.title}</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {about.audience.items.map((item, index) => {
                  const isLast = index === about.audience.items.length - 1;

                  return (
                    <li
                      key={item.label}
                      className={`group flex items-center gap-3.5 rounded-xl border border-lavender/30 bg-white px-4 py-4 shadow-sm shadow-lavender/8 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-md hover:shadow-orange/10 ${
                        isLast ? 'sm:col-span-2 sm:max-w-[calc(50%-0.375rem)] sm:justify-self-center' : ''
                      }`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
                        <AudienceIcon name={item.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold leading-snug text-ink">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Qué ofrecemos — desactivado por pedido
          <Reveal>
          <div>
            <h3 className="font-display mb-2 text-2xl text-ink">{about.offering.title}</h3>
            <p className="mb-6 text-ink-muted">{about.offering.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {about.offering.categories.map((cat) => (
                <div
                  key={cat.name}
                  className="rounded-2xl border border-lavender/35 bg-cream p-5"
                >
                  <h4 className="font-display text-lg text-orange">{cat.name}</h4>
                  <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                    {cat.items.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
          */}

          <Reveal>
            <ValuesSection embedded />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
