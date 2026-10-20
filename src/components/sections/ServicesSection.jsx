import { useState } from 'react';

import { services } from '../../config/site';

import SectionTitle from '../ui/SectionTitle';
import OptimizedImage from '../ui/OptimizedImage';

import { Reveal, RevealItem, RevealStagger } from '../ui/Reveal';

import { ChevronDownIcon, DistributorServiceIcon } from '../ui/Icons';

const DISTRIBUTOR_ACCENTS = [
  'bg-orange text-white shadow-orange/25',
  'bg-lavender-deep text-white shadow-lavender-deep/25',
  'bg-lavender-deep text-white shadow-lavender-deep/25',
  'bg-orange text-white shadow-orange/25',
];

function ServiceChooser({ table, activeTab, onChange }) {
  const tabIds = {
    distributor: 'services-tab-distributor',
    engineering: 'services-tab-engineering',
  };

  return (
    <div
      role="tablist"
      aria-label="Tipos de servicios"
      className="grid gap-4 sm:grid-cols-2 sm:gap-5"
    >
      {table.rows.map((row, index) => {
        const selected = activeTab === row.tab;
        const number = String(index + 1).padStart(2, '0');

        return (
          <button
            key={row.tab}
            type="button"
            role="tab"
            id={tabIds[row.tab]}
            aria-selected={selected}
            aria-controls={`services-panel-${row.tab}`}
            onClick={() => onChange(row.tab)}
            className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-sm transition-all duration-300 sm:p-6 ${
              selected
                ? 'border-orange/40 shadow-md shadow-orange/10'
                : 'border-lavender/30 shadow-lavender/10 hover:-translate-y-0.5 hover:border-lavender/50 hover:shadow-md'
            }`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 ${
                selected ? 'bg-orange' : 'bg-lavender/40'
              }`}
              aria-hidden
            />
            <p className="font-label text-orange">{number}</p>
            <h3 className="font-display mt-2 text-lg text-ink sm:text-xl">{row.area}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{row.idealFor}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted/90 sm:text-sm">
              <span className="font-semibold text-ink">Incluye: </span>
              {row.includes}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function DistributorCard({ item, index }) {
  return (
    <div className="group flex h-full flex-col rounded-xl border border-lavender/30 bg-white p-4 shadow-sm shadow-lavender/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/35 hover:shadow-md hover:shadow-orange/12 sm:p-5">
      <div
        className={`mb-2.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${
          DISTRIBUTOR_ACCENTS[index % DISTRIBUTOR_ACCENTS.length]
        }`}
      >
        <DistributorServiceIcon name={item.icon} className="h-5 w-5 sm:h-5 sm:w-5" />
      </div>
      <h4 className="font-display text-base leading-snug text-ink sm:text-lg">{item.title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
    </div>
  );
}

function EngineeringServiceCard({ item, isOpen, onToggle, imageIndex = 0 }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow duration-300 ${
        item.highlight
          ? 'border-orange/50 shadow-orange/10'
          : 'border-lavender/25 hover:shadow-md hover:shadow-lavender/15'
      } ${isOpen ? 'shadow-lg shadow-lavender/20' : ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full flex-col text-left"
        aria-expanded={isOpen}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-lavender/10">
          <OptimizedImage
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            loading={imageIndex < 2 ? 'eager' : 'lazy'}
            fetchPriority={imageIndex === 0 ? 'high' : undefined}
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
            aria-hidden
          />
          {item.highlight && (
            <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Exclusivo
            </span>
          )}
          <h3 className="font-display absolute bottom-4 left-4 right-12 text-lg text-white sm:text-xl">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <span className="text-sm text-ink-muted">
            {isOpen ? 'Ocultar detalle' : 'Ver más información'}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 shrink-0 text-orange transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-5 text-sm leading-relaxed text-ink-muted sm:px-5 sm:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function DistributorPanel({ distributor }) {
  return (
    <div className="services-tab-panel">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <p className="font-label text-lavender-deep">{distributor.label}</p>
        <h3 className="font-display mt-2 text-2xl text-ink sm:text-3xl">{distributor.title}</h3>
      </div>

      <RevealStagger key="distributor-cards" className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {distributor.items.map((item, index) => (
          <RevealItem key={item.title} className="h-full">
            <DistributorCard item={item} index={index} />
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}

function EngineeringPanel({ engineering, openIndex, onToggle }) {
  return (
    <div className="services-tab-panel">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange">
          {engineering.badge}
        </span>
        <p className="font-label mt-6 text-lavender-deep">{engineering.label}</p>
        <h3 className="font-display mt-2 text-2xl text-ink sm:text-3xl">{engineering.title}</h3>
        <p className="font-display mt-6 text-xl text-orange sm:text-2xl">{engineering.headline}</p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {engineering.intro}
        </p>
      </div>

      <RevealStagger
        key="engineering-cards"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
      >
        {engineering.items.map((item, index) => (
          <RevealItem key={item.title}>
            <EngineeringServiceCard
              item={item}
              isOpen={openIndex === index}
              onToggle={() => onToggle(index)}
              imageIndex={index}
            />
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}

export default function ServicesSection() {
  const { distributor, engineering, comparisonTable, subtitle } = services;
  const [activeTab, setActiveTab] = useState('distributor');
  const [openEngineeringIndex, setOpenEngineeringIndex] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOpenEngineeringIndex(null);
  };

  const toggleEngineering = (index) => {
    setOpenEngineeringIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="servicios"
      className="section-padding relative overflow-hidden border-t border-lavender/25 bg-cream !pt-6 sm:!pt-7 lg:!pt-8"
      aria-label={services.title}
    >
      <div
        className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-lavender/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-orange/8 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <SectionTitle
            label={services.label}
            title={services.title}
            description={subtitle}
            className="mx-auto text-center"
          />
        </Reveal>

        <Reveal className="mb-10 sm:mb-12">
          <ServiceChooser
            table={comparisonTable}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </Reveal>

        <div
          key={activeTab}
          role="tabpanel"
          id={`services-panel-${activeTab}`}
          aria-labelledby={`services-tab-${activeTab}`}
        >
          {activeTab === 'distributor' ? (
            <DistributorPanel distributor={distributor} />
          ) : (
            <EngineeringPanel
              engineering={engineering}
              openIndex={openEngineeringIndex}
              onToggle={toggleEngineering}
            />
          )}
        </div>
      </div>
    </section>
  );
}
