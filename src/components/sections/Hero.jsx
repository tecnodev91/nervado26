import { hero } from '../../config/site';
import Button from '../ui/Button';
import { WhatsAppIcon } from '../ui/Icons';
import { getBudgetWhatsAppUrl } from '../../utils/whatsapp';

export default function Hero() {
  const heroImage = hero.imageWebp ?? hero.image ?? hero.images?.[0];
  const heroWidth = hero.imageWidth ?? 743;
  const heroHeight = hero.imageHeight ?? 605;

  return (
    <section id="inicio" className="hero-pattern relative overflow-hidden border-b border-lavender/30 bg-cream">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-lavender/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20 lg:px-8">
        <div className="min-w-0">
          <h1 className="hero-enter hero-enter-1 font-display text-[2.45rem] leading-[1.05] text-ink min-[390px]:text-[2.65rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.08]">
            <span className="block text-lavender-deep sm:inline">{hero.headline.lead}</span>{' '}
            <span className="text-orange">{hero.headline.accent}</span>
          </h1>
          <p className="hero-enter hero-enter-2 mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{hero.subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
            <span className="hero-enter hero-enter-3 inline-flex max-w-full">
              <Button
                href={getBudgetWhatsAppUrl()}
                external
                variant="orange"
                size="lg"
                className="max-w-full hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {hero.cta}
              </Button>
            </span>
            <span className="hero-enter hero-enter-4 inline-flex max-w-full">
              <Button to="/productos" variant="lavender" size="lg" className="max-w-full hover:-translate-y-0.5">
                Ver materiales
              </Button>
            </span>
          </div>
        </div>

        <div className="relative min-w-0">
          {heroImage && (
            <div className="hero-enter-image relative aspect-[743/605] w-full max-w-md overflow-hidden rounded-3xl shadow-[0_20px_50px_-12px_rgba(26,26,26,0.35)] lg:max-w-none">
              <img
                src={encodeURI(heroImage)}
                alt="Nervado 26 — materiales de construcción"
                className="h-full w-full object-cover object-center"
                width={heroWidth}
                height={heroHeight}
                sizes="(min-width: 1024px) 560px, 100vw"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          )}
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-7xl justify-center pb-10 pt-8 lg:flex">
        <a
          href="#nosotros"
          className="hero-enter hero-enter-5 flex flex-col items-center gap-2 text-ink-muted transition-colors hover:text-orange"
          aria-label="Ir a la siguiente sección"
        >
          <span className="text-xs font-medium text-ink-muted">Descubrir</span>
          <span className="block h-10 w-px animate-pulse bg-ink/20" />
        </a>
      </div>
    </section>
  );
}
