import { productsPage } from '../../config/site';
import Button from './Button';
import { ArrowRightIcon } from './Icons';

export default function ProductMoreCard() {
  const cta = productsPage.moreCta;

  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-lg shadow-black/25 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-8 sm:p-8">
      <div className="text-center sm:text-left">
        <h3 className="font-display text-xl text-white sm:text-2xl">{cta.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          {cta.description}
        </p>
      </div>
      <Button
        to="/productos"
        variant="orange"
        size="md"
        className="w-full shrink-0 sm:w-auto"
      >
        {cta.button}
        <ArrowRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
