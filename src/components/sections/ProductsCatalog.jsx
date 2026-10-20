import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsPage } from '../../config/site';
import {
  materials,
  MATERIALS_TOTAL,
  MATERIAL_FILTER_GROUPS,
  getMaterialIdsForFilterGroups,
  expandFilterGroupIds,
} from '../../config/materialsIndex';
import SectionTitle from '../ui/SectionTitle';
import MaterialCard from '../ui/MaterialCard';
import MaterialsSidebar from '../ui/MaterialsSidebar';
import MaterialsFilterDrawer from '../ui/MaterialsFilterDrawer';
import MaterialsCatalogHeader from '../ui/MaterialsCatalogHeader';
import Button from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { matchesSearch } from '../../utils/search';

const PRODUCT_GRID =
  'grid grid-cols-[minmax(0,1fr)] items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8';

export default function ProductsCatalog() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  useEffect(() => {
    const raw = searchParams.get('grupo');
    if (!raw) return;

    const ids = expandFilterGroupIds(
      raw
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    );
    const validIds = ids.filter((id) => MATERIAL_FILTER_GROUPS.some((group) => group.id === id));

    if (validIds.length) setSelectedGroupIds(validIds);
  }, [searchParams]);

  const toggleGroup = (id) => {
    setSelectedGroupIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedGroupIds([]);
  };

  const allowedMaterialIds = useMemo(
    () => getMaterialIdsForFilterGroups(selectedGroupIds),
    [selectedGroupIds],
  );

  const visibleMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesGroup = !allowedMaterialIds || allowedMaterialIds.has(material.id);

      if (!matchesGroup) return false;

      return matchesSearch(query, material.name);
    });
  }, [query, allowedMaterialIds]);

  const selectedGroups = MATERIAL_FILTER_GROUPS.filter((group) =>
    selectedGroupIds.includes(group.id),
  );

  return (
    <section id="productos">
      <div className="bg-cream px-4 pt-8 pb-10 sm:px-6 sm:pt-9 sm:pb-12 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-7 sm:mb-8">
            <SectionTitle
              label={productsPage.label}
              title={productsPage.catalog.title}
              description={productsPage.catalog.lead}
              className="[&_p]:mt-3"
            />
          </Reveal>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
            <Reveal direction="left" className="hidden lg:block">
              <MaterialsSidebar
                sections={MATERIAL_FILTER_GROUPS}
                selectedIds={selectedGroupIds}
                onToggle={toggleGroup}
                onClear={clearFilters}
                query={query}
                onQueryChange={setQuery}
                visibleCount={visibleMaterials.length}
                totalCount={MATERIALS_TOTAL}
                variant="light"
              />
            </Reveal>

            <div className="min-w-0">
              <MaterialsFilterDrawer
                sections={MATERIAL_FILTER_GROUPS}
                selectedIds={selectedGroupIds}
                onToggle={toggleGroup}
                onClear={clearFilters}
                query={query}
                onQueryChange={setQuery}
                visibleCount={visibleMaterials.length}
                totalCount={MATERIALS_TOTAL}
              />
              <Reveal delay={100}>
                <MaterialsCatalogHeader
                  visibleCount={visibleMaterials.length}
                  totalCount={MATERIALS_TOTAL}
                  selectedSections={selectedGroups}
                  query={query}
                  onRemoveSection={toggleGroup}
                  onClearQuery={() => setQuery('')}
                  onClearAll={clearFilters}
                  variant="light"
                />
              </Reveal>

              {visibleMaterials.length > 0 ? (
                <div className={PRODUCT_GRID}>
                  {visibleMaterials.map((material) => (
                    <MaterialCard key={material.id} catalog {...material} />
                  ))}
                </div>
              ) : (
                <Reveal>
                  <div className="rounded-2xl border border-lavender/25 bg-white px-6 py-14 text-center shadow-sm shadow-lavender/8">
                    <p className="font-display text-xl text-ink">Sin resultados</p>
                    <p className="mt-3 text-sm text-ink-muted sm:text-base">
                      No encontramos materiales con esos filtros. Probá otra sección o un término
                      distinto en la búsqueda.
                    </p>
                    <Button
                      type="button"
                      variant="orange"
                      size="md"
                      className="mt-6"
                      onClick={clearFilters}
                    >
                      Ver todos los materiales
                    </Button>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
