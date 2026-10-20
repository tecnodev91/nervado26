import FeaturedMaterialCard from './FeaturedMaterialCard';

/**
 * @param {{
 *   items: Array<{ label: string, description?: string, image: string, to: string }>,
 * }} props
 */
export default function FeaturedMaterialsShowcase({ items }) {
  if (!items?.length) return null;

  return (
    <div className="mx-auto grid max-w-3xl items-stretch gap-4 sm:max-w-4xl sm:grid-cols-3 sm:gap-5 lg:max-w-5xl lg:gap-6">
      {items.map((item) => (
        <FeaturedMaterialCard key={item.label} {...item} />
      ))}
    </div>
  );
}
