import { createContext, useContext, useEffect, useRef, useState } from 'react';

const RevealSequenceContext = createContext(-1);

const directionClass = {
  up: 'reveal',
  down: 'reveal-from-down',
  left: 'reveal-from-left',
  right: 'reveal-from-right',
  fade: 'reveal-fade',
};

/**
 * @param {{ children: import('react').ReactNode, className?: string, direction?: keyof typeof directionClass, delay?: number, as?: keyof JSX.IntrinsicElements }} props
 */
export function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${directionClass[direction] ?? directionClass.up} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

/**
 * @param {{ children: import('react').ReactNode, className?: string }} props
 */
export function RevealStagger({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: '0px 0px 80px 0px' },
    );

    observer.observe(el);

    // Contenedores muy altos (catálogo completo) pueden no alcanzar ratio > 0 con threshold fijo
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-stagger ${className}`}>
      {children}
    </div>
  );
}

/**
 * @param {{ children: import('react').ReactNode, className?: string }} props
 */
export function RevealItem({ children, className = '' }) {
  return <div className={`reveal-item ${className}`}>{children}</div>;
}

/**
 * Revela hijos uno por uno al entrar en vista.
 * @param {{ children: import('react').ReactNode, className?: string, staggerMs?: number, totalSteps: number }} props
 */
export function RevealSequence({ children, className = '', staggerMs = 1000, totalSteps }) {
  const ref = useRef(null);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const start = () => setStep(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      start();
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (step < 0 || step >= totalSteps - 1) return undefined;
    const id = window.setTimeout(() => setStep((prev) => prev + 1), staggerMs);
    return () => window.clearTimeout(id);
  }, [step, totalSteps, staggerMs]);

  return (
    <div ref={ref} className={className}>
      <RevealSequenceContext.Provider value={step}>{children}</RevealSequenceContext.Provider>
    </div>
  );
}

/**
 * @param {{ children: import('react').ReactNode, index: number, className?: string }} props
 */
export function RevealSequenceItem({ children, index, className = '' }) {
  const step = useContext(RevealSequenceContext);
  const visible = step >= index;

  return (
    <div className={`reveal-sequence-item ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
