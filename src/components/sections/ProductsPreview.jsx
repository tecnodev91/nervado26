import { productsPage } from '../../config/site';
import { featuredHomeMaterials } from '../../config/featuredMaterialsHome';
import SectionTitle from '../ui/SectionTitle';
import ProductsPreviewCarousel from '../ui/ProductsPreviewCarousel';
import ProductMoreCard from '../ui/ProductMoreCard';
import { Reveal } from '../ui/Reveal';

export default function ProductsPreview() {
  return (
    <section
      id="productos"
      className="section-padding relative overflow-hidden !pt-6 sm:!pt-7 lg:!pt-8 !pb-10 sm:!pb-12"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-5 sm:mb-6">
          <SectionTitle
            label={productsPage.label}
            title={productsPage.preview.title}
            description={productsPage.preview.lead}
            accent="orange"
            light
            className="[&_p]:mt-3"
          />
        </Reveal>

        <ProductsPreviewCarousel
          items={featuredHomeMaterials}
          intervalMs={productsPage.carouselInterval ?? 4500}
        />

        <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
          <ProductMoreCard />
        </div>
      </div>
    </section>
  );
}
