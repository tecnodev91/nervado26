import { contact } from '../../config/site';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
} from '../ui/Icons';
import { getBudgetWhatsAppUrl, getWhatsAppUrl } from '../../utils/whatsapp';
import { Reveal, RevealStagger, RevealItem } from '../ui/Reveal';

const accentStyles = {
  orange: {
    card: 'border-orange/25 bg-gradient-to-br from-orange/[0.09] via-white to-white shadow-orange/8 hover:border-orange/40 hover:shadow-orange/15',
    icon: 'bg-orange text-white shadow-md shadow-orange/20',
  },
  lavender: {
    card: 'border-lavender/30 bg-gradient-to-br from-lavender/[0.14] via-white to-cream/40 shadow-lavender/8 hover:border-lavender/45 hover:shadow-lavender/15',
    icon: 'bg-lavender/25 text-lavender-deep',
  },
};

function ContactItem({ icon: Icon, title, children, accent = 'orange' }) {
  const style = accentStyles[accent] ?? accentStyles.lavender;

  return (
    <div
      className={`group h-full rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 sm:p-6 ${style.card}`}
    >
      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:scale-105 ${style.icon}`}
        >
          <Icon />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base text-ink">{title}</h3>
          <div className="mt-1.5 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

function ContactHoursBlock() {
  const { hours } = contact;

  return (
    <div className="overflow-hidden rounded-2xl border border-lavender/25 bg-white shadow-lg shadow-lavender/10">
      <div className="h-1 bg-gradient-to-r from-orange via-lavender to-orange" aria-hidden />
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lavender/30 to-orange/15 text-lavender-deep">
            <ClockIcon className="h-4 w-4" />
          </span>
          <h3 className="font-display text-base text-ink sm:text-lg">{hours.title}</h3>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {hours.schedules.map((schedule, index) => (
            <li
              key={schedule.label}
              className={`rounded-xl border bg-gradient-to-br px-4 py-3.5 shadow-sm ${
                index % 2 === 0
                  ? 'border-orange/20 border-l-[3px] border-l-orange from-orange/[0.04] to-white shadow-orange/5'
                  : 'border-lavender/25 border-l-[3px] border-l-lavender from-lavender/[0.06] to-white shadow-lavender/5'
              }`}
            >
              <p className="text-xs font-semibold leading-snug text-ink sm:text-sm">{schedule.label}</p>
              <p className="mt-2.5 text-xs font-medium text-ink-muted sm:text-sm">{schedule.days}</p>
              <p className="font-display mt-0.5 text-lg font-bold tracking-tight text-ink tabular-nums sm:text-xl">
                {schedule.time}
              </p>
            </li>
          ))}
          <li className="rounded-xl border border-lavender/25 border-l-[3px] border-l-lavender bg-gradient-to-br from-lavender/[0.08] via-white to-orange/[0.04] px-4 py-3.5 shadow-sm shadow-lavender/5 sm:col-span-3 lg:col-span-1">
            <p className="text-xs font-semibold leading-snug text-ink sm:text-sm">{hours.advisory.label}</p>
            <p className="mt-2.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
              {hours.advisory.description}{' '}
              <a
                href={getWhatsAppUrl(hours.advisory.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </li>
        </ul>

        <p className="mt-5 border-t border-lavender/20 pt-4 text-xs leading-relaxed text-ink-muted sm:text-sm">
          {hours.note}
        </p>
      </div>
    </div>
  );
}

function ContactPreview() {
  const { preview } = contact;

  return (
    <section
      id="contacto"
      className="bg-dark-section overflow-hidden border-t border-white/8 py-12 sm:py-14"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
        <Reveal direction="left" className="text-center lg:max-w-xl lg:text-left">
          <SectionTitle
            label={preview.label}
            title={preview.title}
            description={preview.description}
            light
            accent="orange"
            className="mx-auto lg:mx-0 [&_h2]:text-balance [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_p]:mt-2 [&_p]:text-base [&_span]:mb-2"
          />
        </Reveal>

        <Reveal direction="right" delay={100} className="shrink-0">
          <Button to="/contacto" variant="orange" size="lg" className="w-full sm:w-auto">
            {preview.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function ContactMap() {
  if (!contact.mapsEmbedUrl) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-lavender/25 bg-white shadow-lg shadow-lavender/10">
      <div className="flex flex-col gap-3 border-b border-lavender/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="font-display text-base text-ink sm:text-lg">Cómo llegar</h3>
          <p className="mt-1 text-sm text-ink-muted">{contact.address}</p>
        </div>
        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange transition-colors hover:underline"
        >
          Abrir en Google Maps
        </a>
      </div>
      <iframe
        title="Ubicación de Nervado 26 en Google Maps"
        src={contact.mapsEmbedUrl}
        className="h-80 w-full border-0 sm:h-[360px]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function ContactSocial() {
  return (
    <div className="rounded-2xl border border-lavender/25 bg-white p-5 shadow-lg shadow-lavender/10 sm:p-6">
      <h3 className="font-display text-base text-ink sm:text-lg">Redes</h3>
      <p className="mt-1 text-sm text-ink-muted">Seguinos para novedades y nuestro trabajo en obra.</p>
      <div className="mt-4 flex gap-3">
        <a
          href={contact.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-lavender/30 bg-lavender/10 text-lavender-deep transition-colors hover:border-orange/40 hover:bg-orange/10 hover:text-orange"
          aria-label="Instagram de Nervado 26"
        >
          <InstagramIcon />
        </a>
        <a
          href={contact.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-lavender/30 bg-lavender/10 text-lavender-deep transition-colors hover:border-orange/40 hover:bg-orange/10 hover:text-orange"
          aria-label="Facebook de Nervado 26"
        >
          <FacebookIcon />
        </a>
      </div>
    </div>
  );
}

function ContactFinalCta() {
  const { finalCta } = contact.page;

  return (
    <div className="bg-dark-section relative overflow-hidden rounded-2xl px-6 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-9">
      <h3 className="font-display text-center text-xl text-white sm:text-left sm:text-2xl">
        {finalCta.title}
      </h3>
      <Button
        href={getBudgetWhatsAppUrl()}
        external
        variant="orange"
        size="lg"
        className="mt-5 w-full shrink-0 sm:mt-0 sm:w-auto"
      >
        <WhatsAppIcon />
        {finalCta.button}
      </Button>
    </div>
  );
}

function ContactFull() {
  const { page } = contact;

  return (
    <section id="contacto" className="section-padding bg-cream !pt-10 sm:!pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="fade" className="card-surface overflow-hidden rounded-3xl bg-white">
          <div className="relative overflow-hidden bg-ink px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-orange/20 blur-3xl"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <SectionTitle
                label={page.label}
                title={page.title}
                description={page.description}
                light
                accent="orange"
              />
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-cream/90 via-white to-cream/70 p-6 sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-10 h-64 w-64 rounded-full bg-orange/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-20 h-56 w-56 rounded-full bg-lavender/15 blur-3xl"
              aria-hidden
            />

            <div className="relative space-y-8">
              <RevealStagger className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <RevealItem>
                  <ContactItem icon={WhatsAppIcon} title="WhatsApp" accent="orange">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink-muted transition-colors hover:text-orange"
                    >
                      {contact.whatsappDisplay}
                    </a>
                  </ContactItem>
                </RevealItem>

                <RevealItem>
                  <ContactItem icon={PhoneIcon} title="Teléfono" accent="orange">
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-medium text-ink-muted transition-colors hover:text-orange"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </ContactItem>
                </RevealItem>

                <RevealItem>
                  <ContactItem icon={MailIcon} title="Correo" accent="orange">
                    <ul className="space-y-1.5">
                      {contact.emails.map((item) => (
                        <li key={item.address}>
                          <a
                            href={`mailto:${item.address}`}
                            className="text-ink-muted transition-colors hover:text-orange"
                          >
                            <span className="font-medium text-ink">{item.label}:</span> {item.address}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ContactItem>
                </RevealItem>

                <RevealItem>
                  <ContactItem icon={MapPinIcon} title="Dirección" accent="orange">
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted transition-colors hover:text-orange"
                    >
                      {contact.address}
                    </a>
                    {contact.addressNote && (
                      <p className="mt-1 text-ink-muted/80">{contact.addressNote}</p>
                    )}
                  </ContactItem>
                </RevealItem>
              </RevealStagger>

              <Reveal>
                <ContactHoursBlock />
              </Reveal>

              <Reveal delay={80}>
                <ContactMap />
              </Reveal>

              <Reveal delay={100}>
                <ContactSocial />
              </Reveal>

              <Reveal delay={120}>
                <ContactFinalCta />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * @param {{ preview?: boolean }} props
 */
export default function Contact({ preview = false }) {
  return preview ? <ContactPreview /> : <ContactFull />;
}
