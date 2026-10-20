import { useEffect } from 'react';

/**
 * Activa `.reveal` en cualquier elemento del DOM al entrar en viewport.
 */
export function useGlobalReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8px 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
