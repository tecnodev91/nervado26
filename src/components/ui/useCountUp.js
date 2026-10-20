import { useEffect, useState } from 'react';

/**
 * Cuenta de 0 hasta `end` cuando `active` es true.
 * @param {number} end
 * @param {number} durationMs
 * @param {boolean} active
 */
export function useCountUp(end, durationMs, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return undefined;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, end, durationMs]);

  return value;
}

export function formatStatNumber(n) {
  return n.toLocaleString('es-AR', { maximumFractionDigits: 0 });
}
