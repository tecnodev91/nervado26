import { useState } from 'react';
import { aboutGallery } from '../../config/aboutGallery';
import OptimizedImage from './OptimizedImage';

/** Primera foto destacada; el resto completa la grilla bento */
function bentoClass(index) {
  if (index === 0) {
    return 'col-span-2 row-span-2 min-h-[200px] sm:min-h-0';
  }
  return 'col-span-1 row-span-1 aspect-square sm:aspect-auto sm:min-h-0';
}

function GalleryTile({ item, index, isActive, onActivate, onDeactivate }) {
  const isClient = item.type === 'client';
  const isFeatured = index === 0;

  return (
    <figure
      className={`about-gallery-tile group relative cursor-pointer overflow-hidden rounded-xl bg-ink/5 shadow-sm ring-1 ring-lavender/20 transition-[transform,box-shadow,ring-color] duration-300 ease-out ${bentoClass(index)} ${
        isActive
          ? 'z-20 scale-[1.03] shadow-2xl shadow-ink/25 ring-2 ring-orange'
          : 'hover:z-10 hover:scale-[1.02] hover:shadow-xl hover:shadow-ink/15 hover:ring-orange/50'
      }`}
      tabIndex={0}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <OptimizedImage
        src={item.src}
        alt={item.alt ?? ''}
        className={`h-full w-full object-cover transition-transform duration-500 ${
          isActive ? 'scale-110' : 'group-hover:scale-105'
        }`}
        sizes={
          isFeatured
            ? '(min-width: 640px) 50vw, 100vw'
            : '(min-width: 640px) 25vw, 50vw'
        }
        loading={index < 3 ? 'eager' : 'lazy'}
        fetchPriority={index === 0 ? 'high' : undefined}
        decoding="async"
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      <figcaption
        className={`pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 pt-8 transition-all duration-300 ${
          isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
        }`}
      >
        {isClient && item.client?.name ? (
          <>
            {item.client.project && (
              <p className="text-xs font-medium text-lavender">{item.client.project}</p>
            )}
            <p className="text-sm font-semibold text-white">{item.client.name}</p>
          </>
        ) : (
          <p className={`font-medium text-white ${isFeatured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
            {item.alt}
          </p>
        )}
      </figcaption>

      {isClient && (
        <span className="pointer-events-none absolute top-2.5 left-2.5 rounded-full bg-orange px-2 py-0.5 text-[0.6rem] font-semibold text-white shadow-md">
          Cliente
        </span>
      )}
    </figure>
  );
}

export default function AboutGallery({ className = '' }) {
  const { title, subtitle, items } = aboutGallery;
  const [activeId, setActiveId] = useState(null);

  if (!items.length) return null;

  return (
    <section className={className} aria-label={title}>
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 h-1 w-12 rounded-full bg-orange" aria-hidden />
          <h2 className="font-display text-xl text-ink sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <p className="text-xs font-medium text-ink-muted sm:text-sm">
          {items.length} fotos · pasá el cursor para ampliar
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-lavender/30 bg-cream/80 p-2 shadow-lg shadow-lavender/10 sm:p-3">
        <div className="grid grid-cols-2 gap-2 auto-rows-fr sm:grid-cols-4 sm:gap-3 sm:auto-rows-[minmax(120px,1fr)]">
          {items.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={index}
              isActive={activeId === item.id}
              onActivate={() => setActiveId(item.id)}
              onDeactivate={() => setActiveId((current) => (current === item.id ? null : current))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
