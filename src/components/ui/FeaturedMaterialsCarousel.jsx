import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

/**
 * @param {{
 *   items: Array<{ label: string, title?: string, description?: string, image: string, to: string }>,
 *   slideInterval?: number,
 *   embedded?: boolean,
 *   activeIndex?: number,
 *   onActiveIndexChange?: (index: number) => void,
 *   isPaused?: boolean,
 *   onPauseChange?: (paused: boolean) => void,
 * }} props
 */
export default function FeaturedMaterialsCarousel({
  items,
  slideInterval = 3000,
  embedded = false,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  isPaused: controlledPaused,
  onPauseChange,
}) {
  const total = items.length;
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalPaused, setInternalPaused] = useState(false);

  const activeIndex = controlledIndex ?? internalIndex;
  const isPaused = controlledPaused ?? internalPaused;

  const setActiveIndex = useCallback(
    (index) => {
      if (onActiveIndexChange) onActiveIndexChange(index);
      else setInternalIndex(index);
    },
    [onActiveIndexChange],
  );

  const setIsPaused = useCallback(
    (paused) => {
      if (onPauseChange) onPauseChange(paused);
      else setInternalPaused(paused);
    },
    [onPauseChange],
  );

  useEffect(() => {
    if (total <= 1 || isPaused || controlledIndex !== undefined) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const id = window.setInterval(() => {
      setInternalIndex((current) => (current + 1) % total);
    }, slideInterval);

    return () => window.clearInterval(id);
  }, [controlledIndex, isPaused, slideInterval, total]);

  if (!total) return null;

  const activeItem = items[activeIndex];

  const rootClass = embedded
    ? 'absolute inset-0'
    : 'relative min-h-[16rem] sm:min-h-[18rem] lg:min-h-0';

  const frameClass = embedded
    ? 'relative h-full w-full overflow-hidden'
    : 'relative min-h-[16rem] overflow-hidden rounded-2xl border border-lavender/25 bg-ink shadow-lg shadow-lavender/10 sm:min-h-[18rem]';

  return (
    <div
      className={rootClass}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className={frameClass} aria-roledescription="carrusel" aria-label="Materiales destacados">
        <Link
          to={activeItem.to}
          className="absolute inset-0 z-10"
          aria-label={`Ver ${activeItem.label}`}
        />

        {items.map((item, index) => (
          <OptimizedImage
            key={item.label}
            src={item.image}
            alt={item.label}
            pictureClassName="absolute inset-0 h-full w-full"
            className={`h-full w-full transition-opacity duration-700 ease-in-out ${
              embedded ? 'object-cover object-[center_82%]' : 'object-cover object-center'
            } ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={index !== activeIndex}
          />
        ))}

        <div
          className={`pointer-events-none absolute inset-0 ${
            embedded
              ? 'bg-gradient-to-t from-ink/70 via-ink/15 to-transparent'
              : 'bg-gradient-to-br from-lavender/15 via-transparent to-orange/10'
          }`}
          aria-hidden
        />

        {total > 1 && !embedded && (
          <div className="absolute right-4 bottom-4 z-20 flex gap-1.5 sm:right-5 sm:bottom-5">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-6 bg-orange'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Mostrar ${item.label}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
