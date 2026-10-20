import { useEffect } from 'react';

const BASE = 'Nervado 26';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
}

/** Actualiza título y descripción de la pestaña para cada página (SPA). */
export function usePageMeta(title, description, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Materiales de Construcción`;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[property="og:description"]', 'content', description);
  }, [title, description, enabled]);
}
