import { useCallback, useEffect, useRef, useState } from 'react';
import MaterialCard from './MaterialCard';
import { ChevronDownIcon } from './Icons';

function ChevronLeft({ className = 'h-5 w-5' }) {
  return <ChevronDownIcon className={`rotate-90 ${className}`} aria-hidden />;
}

function ChevronRight({ className = 'h-5 w-5' }) {
  return <ChevronDownIcon className={`-rotate-90 ${className}`} aria-hidden />;
}

function getCardsPerView(width) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function isWrap(fromIndex, toIndex, total) {
  if (total <= 1 || fromIndex == null) return false;
  return (
    (fromIndex === total - 1 && toIndex === 0) ||
    (fromIndex === 0 && toIndex === total - 1)
  );
}

/**
 * Carrusel horizontal estilo fila — varias cards visibles, flechas y páginas.
 */
export default function ProductsPreviewCarousel({ items, intervalMs = 5500 }) {
  const total = items.length;
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const pageCount = Math.max(1, Math.ceil(total / cardsPerView));
  const currentPage = Math.min(pageCount - 1, Math.floor(activeIndex / cardsPerView));

  const scrollToCard = useCallback(
    (index, fromIndex = activeIndexRef.current) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      if (!track || !card) return;

      const left = card.offsetLeft - track.offsetLeft;
      const behavior = isWrap(fromIndex, index, total) ? 'auto' : 'smooth';
      track.scrollTo({ left, behavior });
      activeIndexRef.current = index;
      setActiveIndex(index);
    },
    [total],
  );

  const goNext = useCallback(() => {
    const from = activeIndexRef.current;
    scrollToCard((from + 1) % total, from);
  }, [scrollToCard, total]);

  const goPrev = useCallback(() => {
    const from = activeIndexRef.current;
    scrollToCard((from - 1 + total) % total, from);
  }, [scrollToCard, total]);

  const goToPage = useCallback(
    (page) => {
      scrollToCard(Math.min(page * cardsPerView, total - 1));
    },
    [cardsPerView, scrollToCard, total],
  );

  useEffect(() => {
    const update = () => setCardsPerView(getCardsPerView(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      let closest = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      activeIndexRef.current = closest;
      setActiveIndex(closest);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || isPaused) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      const from = activeIndexRef.current;
      scrollToCard((from + 1) % total, from);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, isPaused, scrollToCard, total]);

  if (!total) return null;

  const canScroll = total > cardsPerView;
  const arrowClass =
    'absolute top-[110px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-orange/15 bg-white text-orange shadow-lg transition hover:scale-105 hover:shadow-xl sm:h-11 sm:w-11';

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="relative py-1 sm:py-2"
        aria-roledescription="carrusel"
        aria-label="Materiales del catálogo"
      >
        {canScroll && pageCount > 1 && (
          <div className="mb-3 flex justify-center gap-1.5 sm:mb-4 sm:justify-end">
            {Array.from({ length: pageCount }, (_, page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`h-2 rounded-full transition-all ${
                  page === currentPage ? 'w-5 bg-orange' : 'w-2 bg-white/35 hover:bg-white/55'
                }`}
                aria-label={`Ir a página ${page + 1}`}
                aria-current={page === currentPage ? 'true' : undefined}
              />
            ))}
          </div>
        )}

        <div className="relative">
          {canScroll && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className={`${arrowClass} left-2 sm:left-3`}
                aria-label="Materiales anteriores"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={goNext}
                className={`${arrowClass} right-2 sm:right-3`}
                aria-label="Materiales siguientes"
              >
                <ChevronRight />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            className="products-carousel-track flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-0.5 pb-3"
          >
            {items.map((material, index) => (
              <div
                key={material.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="flex min-w-0 shrink-0 snap-start flex-col self-stretch"
                style={{
                  width: `calc((100% - ${(cardsPerView - 1) * 1}rem) / ${cardsPerView})`,
                }}
              >
                <MaterialCard
                  {...material}
                  compact
                  className="flex-1"
                  imageLoading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
