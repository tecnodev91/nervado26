import { Link } from 'react-router-dom';
import { contact, footer, navLinks, site } from '../../config/site';
import BrandLogo from '../ui/BrandLogo';
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from '../ui/Icons';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function Footer() {
  const salesEmail = contact.emails.find((item) => item.label === 'Ventas');

  return (
    <footer className="border-t-4 border-orange bg-ink text-white">
      <div className="h-1 bg-gradient-to-r from-orange via-lavender to-orange opacity-80" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <div className="mb-4">
              <Link to="/#inicio" className="inline-flex" aria-label={`${site.name} — Ir al inicio`}>
                <BrandLogo variant="footer" surface="dark" />
              </Link>
            </div>
            <p className="text-sm text-white/75">{site.tagline}</p>
            <p className="mt-1 text-sm text-white/50">{footer.note}</p>
          </div>

          <div>
            <h3 className="font-display mb-3 text-sm tracking-widest text-lavender">Enlaces</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-3 text-sm tracking-widest text-lavender">Contacto</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-orange"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {contact.whatsappDisplay}
                </a>
              </li>
              {salesEmail && (
                <li>
                  <a href={`mailto:${salesEmail.address}`} className="hover:text-orange">
                    <span className="text-white/90">{salesEmail.label}:</span> {salesEmail.address}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  {contact.address}
                </a>
              </li>
              {footer.hoursSummary && (
                <li className="text-white/55">{footer.hoursSummary}</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-3 text-sm tracking-widest text-lavender">Redes</h3>
            <div className="flex gap-3">
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="industrial-line mt-8 mb-5 !opacity-20" />
        <p className="text-center text-xs text-white/40">{footer.legal}</p>
      </div>
    </footer>
  );
}
