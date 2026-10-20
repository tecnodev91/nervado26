import { brand, site } from '../../config/site';
import OptimizedImage from './OptimizedImage';

const sizes = {
  nav: 'h-20 w-auto max-w-[min(88vw,480px)] sm:h-24 md:h-28 lg:h-32',
  footer: 'h-20 w-auto sm:h-24',
  mobile: 'h-20 w-auto max-w-[min(85vw,400px)] sm:h-24',
};

const dimensions = {
  nav: { width: 320, height: 256 },
  footer: { width: 200, height: 120 },
  mobile: { width: 300, height: 240 },
};

/**
 * @param {'light' | 'orange' | 'ink' | 'dark'} surface
 */
export default function BrandLogo({
  variant = 'nav',
  surface = 'light',
  className = '',
  priority = false,
}) {
  const sizeClass = sizes[variant] ?? sizes.nav;
  const { width, height } = dimensions[variant] ?? dimensions.nav;
  const imageProps = {
    alt: site.name,
    className: `object-contain object-left ${sizeClass} ${className}`,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
    decoding: priority ? 'sync' : 'async',
  };

  if (surface === 'ink') {
    return (
      <OptimizedImage
        src={brand.logoNavColor}
        {...imageProps}
        pictureClassName="block leading-none"
      />
    );
  }

  if (surface === 'dark') {
    return (
      <OptimizedImage
        src={brand.logoFooterWhite}
        {...imageProps}
        pictureClassName="block leading-none"
      />
    );
  }

  if (surface === 'orange') {
    return (
      <OptimizedImage
        src={brand.logoFooterWhite}
        {...imageProps}
        className={`object-contain object-left mix-blend-screen ${sizeClass} ${className}`}
        pictureClassName="block leading-none"
      />
    );
  }

  return (
    <OptimizedImage
      src={brand.logoPrincipal}
      {...imageProps}
      pictureClassName="block leading-none"
    />
  );
}
