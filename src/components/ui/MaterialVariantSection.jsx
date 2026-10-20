import { useState } from 'react';

import Button from './Button';

import MaterialMeasureCard, { MaterialMeasureGroupTitle } from './MaterialMeasureCard';

import { WhatsAppIcon } from './Icons';

import { getWhatsAppUrl, productWhatsAppMessage } from '../../utils/whatsapp';

import { MATERIAL_VARIANT_VIEWS } from '../../config/materialVariantViews';



function formatSeparation(row) {

  const longMm = Number.parseFloat(row['Dist. entre alamb. Long. (mm)']);

  const transvMm = Number.parseFloat(row['Dist. entre alamb. Transv. (mm)']);



  if (Number.isNaN(longMm) || Number.isNaN(transvMm)) return '—';



  const formatCm = (mm) => {

    const cm = mm / 10;

    return Number.isInteger(cm) ? String(cm) : cm.toFixed(1).replace('.', ',');

  };



  return `${formatCm(longMm)} × ${formatCm(transvMm)} cm`;

}



function formatDiameter(row) {

  const long = row['Diám. alamb. Long. (mm)'];

  const transv = row['Diám. alamb. Transv. (mm)'];



  if (!long) return '—';

  if (long === transv) return `Ø ${long} mm`;



  return `Ø ${long} / ${transv} mm`;

}



function formatPanelWeight(row) {

  const weight = row['Masa nominal Por panel (kg)'];

  return weight ? `${weight} kg/panel` : '—';

}



function formatMallaCompactLine(row) {

  return `${formatSeparation(row)} · ${formatDiameter(row)} · ${formatPanelWeight(row)}`;

}



function formatCompactLine(row, view) {

  if (view.compactLineKeys?.length) {

    return view.compactLineKeys

      .map((key) => {

        const value = row[key];

        if (!value) return null;

        const suffix = view.compactLineSuffix?.[key] ?? '';

        return `${value}${suffix}`;

      })

      .filter(Boolean)

      .join(' · ');

  }



  return formatMallaCompactLine(row);

}



function getVariantTitle(row, group, view) {

  const titleColumn = view.titleColumn ?? 'Den.';

  const label = row[titleColumn] ?? 'Modelo';

  const prefix = view.titlePrefix ?? '';

  return `${prefix}${label}${group.denSuffix ?? ''}`;

}



/**

 * @param {{

 *   slug: string,

 *   materialName: string,

 *   rows: Record<string, string>[],

 *   columns: string[],

 * }} props

 */

export default function MaterialVariantSection({ slug, materialName, rows, columns }) {

  const view = MATERIAL_VARIANT_VIEWS[slug];

  const [expandedKey, setExpandedKey] = useState(null);



  if (!view) return null;



  const toggleSpecs = (key) => {

    setExpandedKey((current) => (current === key ? null : key));

  };



  return (

    <section className="w-full">

      <h2 className="font-display text-xl text-ink sm:text-2xl">{view.title}</h2>



      <div className="mt-6 space-y-8">

        {view.groups.map((group) => {

          const groupRows = rows.slice(group.rowStart, group.rowEnd + 1);



          return (

            <div key={group.id}>

              {!group.hideLabel && group.label && (

                <MaterialMeasureGroupTitle>{group.label}</MaterialMeasureGroupTitle>

              )}



              <ul className="mt-4 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {groupRows.map((row, index) => {

                  const title = getVariantTitle(row, group, view);

                  const rowKey = `${group.id}-${title}-${index}`;

                  const isExpanded = expandedKey === rowKey;

                  const waUrl = getWhatsAppUrl(

                    productWhatsAppMessage(`${materialName} ${title}`),

                  );



                  return (

                    <MaterialMeasureCard

                      key={rowKey}

                      title={title}

                      badge={view.cardBadge}
                      summary={formatCompactLine(row, view)}

                      waUrl={waUrl}
                      onToggle={() => toggleSpecs(rowKey)}

                      expandedContent={

                        isExpanded ? (

                          <dl className="mt-4 grid gap-2 border-t border-lavender/20 pt-4 sm:grid-cols-2">

                            {columns.map((col) => (

                              <div key={col} className="rounded-lg bg-cream/80 px-3 py-2">

                                <dt className="text-xs text-ink-muted">{col}</dt>

                                <dd className="mt-0.5 text-sm font-medium text-ink">

                                  {row[col] || '—'}

                                </dd>

                              </div>

                            ))}

                          </dl>

                        ) : null

                      }

                      actions={

                        <div className="flex flex-col gap-2">

                          <button

                            type="button"

                            onClick={(event) => {
                              event.stopPropagation();
                              toggleSpecs(rowKey);
                            }}

                            className="text-sm font-semibold text-orange transition-colors hover:text-lavender-deep"

                            aria-expanded={isExpanded}

                          >

                            {isExpanded ? 'Ver menos' : 'Ver más'}

                          </button>

                          {isExpanded && (
                            <Button href={waUrl} external variant="dark" size="sm" className="w-full">

                              <WhatsAppIcon className="h-3.5 w-3.5" />

                              Consultar

                            </Button>
                          )}

                        </div>

                      }

                    />

                  );

                })}

              </ul>

            </div>

          );

        })}

      </div>

    </section>

  );

}

