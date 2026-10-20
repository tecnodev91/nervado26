import { Link, Navigate, useParams } from 'react-router-dom';
import { getMaterialBySlug } from '../config/materialsIndex';
import MaterialSpecsTable from '../components/ui/MaterialSpecsTable';
import MaterialVariantSection from '../components/ui/MaterialVariantSection';
import MaterialCanosVariantSection from '../components/ui/MaterialCanosVariantSection';
import MaterialProfilesWSection from '../components/ui/MaterialProfilesWSection';
import CollapsibleMaterialSpecsTable from '../components/ui/CollapsibleMaterialSpecsTable';
import Button from '../components/ui/Button';
import { WhatsAppIcon } from '../components/ui/Icons';
import { getWhatsAppUrl, productWhatsAppMessage } from '../utils/whatsapp';
import { useReveal } from '../hooks/useReveal';
import MaterialAccentPanel from '../components/ui/MaterialAccentPanel';
import { usePageMeta } from '../hooks/usePageMeta';
import OptimizedImage from '../components/ui/OptimizedImage';

function MaterialDetailBreadcrumb({ materialName }) {
  return (
    <div className="relative overflow-hidden border-b border-lavender/30 bg-gradient-to-br from-lavender/[0.1] via-cream to-orange/[0.06] shadow-sm shadow-lavender/8">
      <div className="flex h-1" aria-hidden>
        <span className="flex-1 bg-lavender" />
        <span className="flex-1 bg-orange" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to="/productos"
            className="inline-flex items-center gap-1.5 rounded-full border border-lavender/35 bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-lavender-deep shadow-sm transition-all duration-300 hover:border-orange/40 hover:text-orange hover:shadow-md hover:shadow-orange/10"
          >
            <span aria-hidden className="text-base leading-none">
              ←
            </span>
            Productos
          </Link>
          <span className="hidden text-lavender/40 sm:inline" aria-hidden>
            /
          </span>
          <span
            title={materialName}
            className="inline-block max-w-[min(100%,16rem)] truncate rounded-full border border-orange/30 bg-orange/10 px-3.5 py-1.5 font-display text-sm font-semibold text-orange sm:max-w-md"
          >
            {materialName}
          </span>
        </nav>
      </div>
    </div>
  );
}

function MaterialInfoCard({ material }) {
  return (
    <div className="min-w-0 rounded-2xl border border-lavender/35 bg-cream p-4 sm:p-6">
      {material.saleUnit && (
        <p className="mb-4 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
          Unidad de venta: {material.saleUnit}
        </p>
      )}
      {material.brand && (
        <p className="mb-4 text-sm text-ink-muted">
          <span className="font-semibold text-ink">Marca:</span> {material.brand}
        </p>
      )}
      <div className="space-y-4">
        {(material.summaryParagraphs ?? (material.summary ? [material.summary] : [])).map(
          (paragraph, index) => (
            <p key={index} className="text-justify text-sm leading-relaxed text-ink-muted">
              {paragraph}
            </p>
          ),
        )}
      </div>

      {material.highlights?.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-lavender/20 pt-5">
          {material.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                aria-hidden
              />
              <span className="text-justify">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {material.detailSections?.map((section) => (
        <div key={section.title} className="mt-5 border-t border-lavender/20 pt-5">
          <h4 className="text-sm font-semibold text-ink">{section.title}</h4>
          <ul className="mt-3 space-y-2">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-deep"
                  aria-hidden
                />
                <span className="text-justify">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {material.measuresCatalogDetailLine && (
        <p className="mt-5 text-sm font-semibold text-ink">{material.measuresCatalogDetailLine}</p>
      )}
    </div>
  );
}

export default function MaterialDetailPage() {
  const { slug } = useParams();
  const material = getMaterialBySlug(slug);
  usePageMeta(
    material?.name,
    material ? `${material.name} en Nervado 26, Godoy Cruz, Mendoza. Medidas, ficha técnica y presupuesto por WhatsApp.` : undefined,
  );
  const contentRef = useReveal();

  if (!material) {
    return <Navigate to="/productos" replace />;
  }

  const waUrl = getWhatsAppUrl(productWhatsAppMessage(material.name));
  const imageClassName = 'aspect-[4/3] w-full object-cover object-center';

  return (
    <div className="min-h-screen bg-cream">
      <MaterialDetailBreadcrumb materialName={material.name} />

      <div ref={contentRef} className="reveal mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {material.profileWView ? (
          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <div className="overflow-hidden rounded-2xl border border-lavender/30 bg-white shadow-lg">
                  <OptimizedImage
                    src={material.image}
                    alt={material.name}
                    className={imageClassName}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div>
                <h1 className="font-display text-3xl text-ink sm:text-4xl">{material.name}</h1>
                <p className="mt-2 text-justify text-sm text-ink-muted">
                  Consultá medidas Tipo I y Tipo H / HP según tu proyecto. Disponibilidad en
                  depósito.
                </p>

                <div className="mt-6">
                  <MaterialInfoCard material={material} />
                </div>
              </div>
            </div>

            <MaterialProfilesWSection materialName={material.name} />
          </div>
        ) : material.variantView ? (
          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <div className="overflow-hidden rounded-2xl border border-lavender/30 bg-white shadow-lg">
                  <OptimizedImage
                    src={material.image}
                    alt={material.name}
                    className={imageClassName}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div>
                <h1 className="font-display text-3xl text-ink sm:text-4xl">{material.name}</h1>
                <p className="mt-2 text-justify text-sm text-ink-muted">
                  {material.variantView.type === 'canos-by-measure'
                    ? 'Elegí la medida y consultá los espesores disponibles. Disponibilidad en depósito.'
                    : 'Elegí el modelo según tu obra. Consultá disponibilidad en depósito.'}
                </p>

                <div className="mt-6">
                  <MaterialInfoCard material={material} />
                </div>
              </div>
            </div>

            {material.variantView.type === 'canos-by-measure' ? (
              <MaterialCanosVariantSection
                slug={material.slug}
                materialName={material.name}
                rows={material.rows}
                columns={material.columns}
                view={material.variantView}
              />
            ) : (
              <>
                <MaterialVariantSection
                  slug={material.slug}
                  materialName={material.name}
                  rows={material.rows}
                  columns={material.specColumns}
                />

                {!material.variantView.hideCollapsibleTable && (
                  <CollapsibleMaterialSpecsTable
                    columns={material.specColumns}
                    rows={material.rows}
                    label={material.variantView.collapsibleTableLabel}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14">
            {/* 1) Imagen — primero en mobile; columna izquierda en desktop */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-lavender/30 bg-white shadow-lg lg:col-start-1 lg:row-start-1">
              <OptimizedImage
                src={material.image}
                alt={material.name}
                className={imageClassName}
                width={800}
                height={600}
                sizes="(min-width: 1024px) 400px, 100vw"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* 2) Título + medidas + WhatsApp — segundo en mobile; columna derecha en desktop */}
            <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <h1 className="font-display text-3xl text-ink sm:text-4xl">{material.name}</h1>
              <p className="mt-2 text-pretty text-sm text-ink-muted">
                Medidas y especificaciones según planilla técnica. Consultá disponibilidad en
                depósito.
              </p>
              <div className="mt-8 space-y-6">
                {material.howToRead && (
                  <MaterialAccentPanel title="Cómo leer la medida">
                    <p className="mt-2 font-display text-lg text-orange">{material.howToRead.example}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                      {material.howToRead.lines.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lavender-deep" aria-hidden />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </MaterialAccentPanel>
                )}

                {material.useCollapsibleSpecsTable ? (
                  <CollapsibleMaterialSpecsTable
                    columns={material.columns}
                    rows={material.rows}
                    label={material.collapsibleTableLabel}
                  />
                ) : (
                  <div className="min-w-0">
                    <h2 className="font-display mb-4 text-lg text-ink sm:text-xl">
                      {material.rows.length === 1 && material.columns.length === 1
                        ? 'Consulta de medidas'
                        : 'Medidas frecuentes'}
                    </h2>
                    <MaterialSpecsTable columns={material.columns} rows={material.rows} />
                    {material.specsTableNote && (
                      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{material.specsTableNote}</p>
                    )}
                  </div>
                )}

                <Button href={waUrl} external variant="orange" size="md" className="mt-6 w-full">
                  <WhatsAppIcon className="h-4 w-4" />
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>

            {/* 3) Descripción — abajo en mobile; debajo de la imagen en desktop */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <MaterialInfoCard material={material} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
