import { useCallback, useEffect, useState } from 'react';
import { materialsGallery } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';

function ChevronLeft({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function MaterialsCarousel({ theme = 'dark', className = '' }) {
  const ref = useReveal();
  const isLight = theme === 'light';
  const total = materialsGallery.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (next) => {
      setIndex((i) => (i + next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  if (!total) return null;

  const current = materialsGallery[index];

  return (
    <div
      ref={ref}
      className={`reveal mb-14 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="card-surface overflow-hidden rounded-2xl">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 sm:aspect-[3/2] lg:aspect-[16/9]"
          aria-roledescription="carrusel"
          aria-label="Galería Nervado 26"
        >
          {materialsGallery.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
              aria-hidden={i !== index}
            >
              <img
                src={encodeURI(slide.src)}
                alt={slide.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.position ?? 'center center' }}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'low'}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                draggable={false}
              />
            </div>
          ))}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="absolute top-1/2 left-3 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg transition hover:bg-white hover:scale-105 sm:left-4"
                aria-label="Imagen anterior"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute top-1/2 right-3 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/95 text-ink shadow-lg transition hover:bg-white hover:scale-105 sm:right-4"
                aria-label="Imagen siguiente"
              >
                <ChevronRight />
              </button>

              <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/50 px-3 py-2 backdrop-blur-sm">
                {materialsGallery.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-6 bg-orange' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                  />
                ))}
              </div>

              <p
                className="absolute top-4 right-4 z-30 rounded-md bg-ink/50 px-2.5 py-1 text-xs font-medium tracking-wider text-white backdrop-blur-sm"
                aria-live="polite"
              >
                {index + 1} / {total}
              </p>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-lavender/25 bg-cream/95 p-3 sm:gap-3 sm:p-4">
            {materialsGallery.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-[4.5rem] sm:w-28 ${
                  i === index
                    ? 'border-orange opacity-100 ring-2 ring-orange/25'
                    : 'border-transparent opacity-70 hover:border-lavender hover:opacity-100'
                }`}
                aria-label={slide.alt}
                aria-current={i === index ? 'true' : undefined}
              >
                <img
                  src={encodeURI(slide.src)}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: slide.position ?? 'center center' }}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {current?.alt && (
        <p
          className={`mt-3 text-center text-sm ${isLight ? 'text-ink-muted' : 'text-white/60'}`}
        >
          {current.alt}
        </p>
      )}
    </div>
  );
}
