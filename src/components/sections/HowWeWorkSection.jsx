import { useEffect, useRef, useState } from 'react';
import { howWeWork } from '../../config/site';

const REVEAL_STEP_MS = 420;
const PAUSE_AFTER_ALL_MS = 5500;
const RESET_BEFORE_RESTART_MS = 400;

function chevronClass(index, total) {
  if (index === 0) return 'hww-chevron-first';
  if (index === total - 1) return 'hww-chevron-last';
  return 'hww-chevron-mid';
}

function stepToneClass(index, filled) {
  if (!filled) return 'hww-step-idle';
  return `hww-step-tone hww-step-tone-${index}`;
}

function StepWatermark({ value }) {
  return <span className="hww-step-watermark" aria-hidden>{value}</span>;
}

function HorizontalChevronStep({ step, index, total, revealed, filled, isLoading }) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <li
      data-step-index={index}
      className={`hww-chevron hww-step-reveal ${stepToneClass(index, filled)} ${revealed ? 'hww-step-reveal--in' : ''} ${isLoading ? 'hww-step-loading' : ''} ${chevronClass(index, total)}`}
      style={{ zIndex: index + 1 }}
    >
      <StepWatermark value={stepNumber} />
      <h3 className="hww-step-title font-display relative z-[1] mt-8 text-sm font-bold leading-snug sm:mt-9 sm:text-base">
        {step.title}
      </h3>
      <p className="hww-step-body relative z-[1] mt-1.5 text-xs leading-relaxed hyphens-none sm:text-sm">
        {step.description}
      </p>
    </li>
  );
}

function MobileStepCard({ step, index, revealed, filled, isLoading }) {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <li
      data-step-index={index}
      className={`relative hww-step-reveal overflow-hidden rounded-xl p-4 sm:p-5 ${stepToneClass(index, filled)} ${revealed ? 'hww-step-reveal--in' : ''} ${isLoading ? 'hww-step-loading' : ''}`}
    >
      <StepWatermark value={stepNumber} />
      <div className="relative z-[1] min-w-0 pl-1 pt-7">
        <h3 className="hww-step-title font-display text-base">{step.title}</h3>
        <p className="hww-step-body mt-1.5 text-sm leading-relaxed hyphens-none">
          {step.description}
        </p>
      </div>
    </li>
  );
}

export default function HowWeWorkSection() {
  const { label, title, description, steps } = howWeWork;
  const stepsRef = useRef(null);

  const [revealCount, setRevealCount] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const reduced = mq.matches;
      setReduceMotion(reduced);
      if (reduced) {
        setRevealCount(steps.length);
        setInView(true);
      }
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [steps.length]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const el = stepsRef.current;
    if (!el) return undefined;

    let timerId = null;
    let visible = false;

    const clearTimer = () => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    };

    const schedule = (fn, delay) => {
      clearTimer();
      timerId = window.setTimeout(fn, delay);
    };

    const runReveal = (count) => {
      if (!visible) return;

      setRevealCount(count);

      if (count < steps.length) {
        schedule(() => runReveal(count + 1), REVEAL_STEP_MS);
        return;
      }

      schedule(() => {
        if (!visible) return;
        setRevealCount(0);
        schedule(() => runReveal(1), RESET_BEFORE_RESTART_MS);
      }, PAUSE_AFTER_ALL_MS);
    };

    const startLoop = () => {
      clearTimer();
      setRevealCount(0);
      schedule(() => runReveal(1), RESET_BEFORE_RESTART_MS);
    };

    const stopLoop = () => {
      clearTimer();
      setRevealCount(0);
      setInView(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          setInView(true);
          startLoop();
        } else {
          visible = false;
          stopLoop();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      visible = true;
      setInView(true);
      startLoop();
    }

    return () => {
      visible = false;
      observer.disconnect();
      clearTimer();
    };
  }, [reduceMotion, steps.length]);

  return (
    <section
      id="como-trabajamos"
      className="hww-section section-padding border-t border-lavender/25 bg-cream !pb-5 !pt-10 sm:!pb-6 sm:!pt-12"
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 grid gap-4 lg:mb-8 lg:grid-cols-2 lg:items-end lg:gap-8">
          <div>
            <span className="font-label mb-3 inline-flex items-center text-orange">{label}</span>
            <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl lg:text-[2.125rem]">
              {title}
            </h2>
          </div>
          <p className="hww-lead text-sm leading-relaxed text-ink-muted sm:text-base lg:max-w-lg lg:pb-0.5">
            {description}
          </p>
        </div>

        <div ref={stepsRef} className="hww-steps-wrap">
          <div className="hww-track relative z-[1] hidden overflow-x-auto pb-2 md:block lg:overflow-visible lg:pb-0">
            <ol className="flex list-none lg:w-full">
              {steps.map((step, index) => {
                const filled = index < revealCount;
                const isLoading =
                  filled && index === revealCount - 1 && revealCount < steps.length;

                return (
                  <HorizontalChevronStep
                    key={step.title}
                    step={step}
                    index={index}
                    total={steps.length}
                    revealed={inView}
                    filled={filled}
                    isLoading={isLoading}
                  />
                );
              })}
            </ol>
          </div>

          <ol className="hww-steps-mobile relative z-[1] grid list-none gap-3 md:hidden">
            {steps.map((step, index) => {
              const filled = index < revealCount;
              const isLoading =
                filled && index === revealCount - 1 && revealCount < steps.length;

              return (
                <MobileStepCard
                  key={step.title}
                  step={step}
                  index={index}
                  revealed={inView}
                  filled={filled}
                  isLoading={isLoading}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
