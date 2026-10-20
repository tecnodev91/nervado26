import Button from '../ui/Button';
import { WhatsAppIcon } from '../ui/Icons';
import { getBudgetWhatsAppUrl } from '../../utils/whatsapp';
import { Reveal } from '../ui/Reveal';

export default function CtaBanner() {
  return (
    <section className="bg-dark-section overflow-hidden py-14 sm:py-16">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <Reveal direction="left" className="text-center lg:text-left">
          <p className="label-accent font-label mb-3 inline-flex items-center text-orange">
            WhatsApp directo
          </p>
          <h2 className="font-display text-3xl text-white sm:text-4xl">¿Arrancamos tu obra?</h2>
          <p className="mt-2 max-w-xl text-lg text-white/80">
            Consultá materiales, stock y presupuesto por WhatsApp. Te respondemos con atención
            personalizada.
          </p>
        </Reveal>
        <Reveal direction="right" delay={120}>
          <Button
            href={getBudgetWhatsAppUrl()}
            external
            variant="orange"
            size="lg"
            className="shrink-0"
          >
            <WhatsAppIcon />
            Pedir presupuesto
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
