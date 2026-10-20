import Button from './Button';
import OptimizedImage from './OptimizedImage';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppUrl, productWhatsAppMessage } from '../../utils/whatsapp';

export default function ProductCard({ name, description, image, showPromo = false }) {
  const waUrl = getWhatsAppUrl(productWhatsAppMessage(name));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-lg shadow-black/25 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange/15">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
        <OptimizedImage
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />

        {showPromo && (
          <div
            className="absolute top-0 right-0 left-0 flex justify-center overflow-hidden"
            aria-hidden
          >
            <div className="w-[110%] rounded-b-[50%] bg-orange px-6 pb-5 pt-3 text-center shadow-md">
              <p className="text-[0.65rem] font-semibold leading-tight text-white sm:text-xs">
                Pedí tu presupuesto hoy
              </p>
            </div>
          </div>
        )}

        <h3 className="font-display absolute bottom-3 left-4 right-4 text-lg leading-snug text-white sm:text-xl">
          {name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
        <Button
          href={waUrl}
          external
          variant="primary"
          size="sm"
          className="w-full justify-center !rounded-lg sm:w-auto sm:self-start"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar
        </Button>
      </div>
    </article>
  );
}
