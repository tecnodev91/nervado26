import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, site } from '../../config/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import BrandLogo from '../ui/BrandLogo';
import { MenuIcon, CloseIcon } from '../ui/Icons';

/** Altura del espaciador = logo + padding vertical + línea */
export const NAV_SPACER_CLASS =
  'h-[calc(5.25rem+2px)] sm:h-[calc(6.25rem+2px)] md:h-[calc(7.25rem+2px)] lg:h-[calc(8.25rem+2px)]';

function isLinkActive(link, pathname, activeSectionId) {
  if (link.isPage) {
    const pagePath = link.to.split('#')[0];
    if (pathname === pagePath) return true;
    if (pathname === '/' && link.sectionId && activeSectionId === link.sectionId) return true;
    return false;
  }
  if (pathname !== '/') return false;
  return activeSectionId === link.sectionId;
}

const homeSectionHrefs = navLinks
  .filter((l) => l.sectionId)
  .map((l) => `#${l.sectionId}`);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const activeSectionId = useActiveSection(pathname === '/' ? homeSectionHrefs : []);

  useEffect(() => {
    document.getElementById('nav-fallback')?.remove();
    document.getElementById('nav-fallback-spacer')?.remove();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Si ya estamos en la home, forzar scroll al tope (React Router no remonta `/`). */
  const goToHomeTop = () => {
    setMenuOpen(false);
    if (pathname !== '/') return;
    const el = document.getElementById('inicio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkClass = (link) => {
    const active = isLinkActive(link, pathname, activeSectionId);
    return `group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 md:px-4 md:text-[0.9375rem] ${
      active
        ? 'text-orange hover:text-orange'
        : 'text-lavender hover:text-orange'
    }`;
  };

  const mobileLinkClass = (link) => {
    const active = isLinkActive(link, pathname, activeSectionId);
    return `block rounded-xl px-4 py-3.5 text-sm font-medium transition-colors duration-200 hover:bg-orange/10 hover:text-orange ${
      active ? 'bg-orange/10 text-orange' : 'text-lavender'
    }`;
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 bg-ink transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40' : ''
        }`}
      >
        <nav
          className="font-display mx-auto flex max-w-7xl items-center gap-3 px-3 py-1 sm:gap-5 sm:px-5 sm:py-1.5 lg:px-8"
          aria-label="Principal"
        >
          <Link
            to="/#inicio"
            className="flex shrink-0 items-center"
            onClick={goToHomeTop}
            aria-label={`${site.name} — Ir al inicio`}
          >
            <BrandLogo variant="nav" surface="ink" priority />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link, pathname, activeSectionId);
              const isHomeLink = link.sectionId === 'inicio';

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={linkClass(link)}
                    onClick={isHomeLink ? goToHomeTop : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-orange transition-colors duration-200 group-hover:bg-orange md:left-4 md:right-4" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/35 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
        <div className="h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" aria-hidden />
      </header>

      <div className={NAV_SPACER_CLASS} aria-hidden />

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 flex h-full w-[min(100%,320px)] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-ink px-5 py-4">
            <Link
              to="/#inicio"
              className="flex shrink-0 items-center"
              onClick={goToHomeTop}
              aria-label={`${site.name} — Ir al inicio`}
            >
              <BrandLogo variant="mobile" surface="ink" priority />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <CloseIcon />
            </button>
          </div>

          <ul className="font-display flex flex-1 flex-col gap-1 px-3 py-4">
            {navLinks.map((link) => {
              const isHomeLink = link.sectionId === 'inicio';
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={mobileLinkClass(link)}
                    onClick={isHomeLink ? goToHomeTop : () => setMenuOpen(false)}
                    aria-current={isLinkActive(link, pathname, activeSectionId) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-lavender/30 p-4">
            <p className="text-center text-xs text-ink-muted">{site.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
