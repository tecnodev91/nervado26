import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import { useGlobalReveal } from '../../hooks/useGlobalReveal';
import { usePageMeta } from '../../hooks/usePageMeta';

const PAGE_META = {
  '/': [null, 'Materiales de construcción en Godoy Cruz, Mendoza: hierro, acero, cemento, chapas y más. Asesoramiento y presupuesto por WhatsApp.'],
  '/productos': ['Catálogo de materiales', 'Catálogo de hierros, caños, perfiles, chapas, cemento y más materiales de construcción. Consultá medidas y pedí presupuesto.'],
  '/servicios': ['Servicios', 'Corte, logística y asesoramiento técnico para tu obra. Entregas en Mendoza.'],
  '/nosotros': ['Nosotros', 'Conocé a Nervado 26: atención cercana, calidad garantizada y asesoramiento en materiales de construcción.'],
  '/contacto': ['Contacto', 'Independencia 650, Godoy Cruz, Mendoza. Horarios, teléfono, WhatsApp y mapa.'],
};

export default function Layout() {
  const { pathname, hash } = useLocation();
  useGlobalReveal();
  const isDetail = pathname.startsWith('/productos/');
  const [metaTitle, metaDesc] = PAGE_META[pathname.replace(/\/$/, '') || '/'] ?? PAGE_META['/'];
  // El detalle de material define su propio título (ver MaterialDetailPage).
  usePageMeta(metaTitle, metaDesc, !isDetail);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    const id = hash.replace('#', '');
    const scrollToEl = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    // Esperar un frame (y otro si la home recién montó) para que exista el nodo.
    requestAnimationFrame(() => {
      scrollToEl();
      if (!document.getElementById(id)) {
        window.setTimeout(scrollToEl, 50);
      }
    });
  }, [pathname, hash]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
