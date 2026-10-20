import { useId, useState } from 'react';
import { ChevronDownIcon } from './Icons';

const answerPanelClass =
  'border-t border-lavender/15 px-4 pb-3.5 pt-2.5 text-sm leading-relaxed text-ink-muted sm:px-5 sm:pb-4';

/**
 * @param {{ blocks: { type: string, text?: string, items?: string[], href?: string, entries?: { label: string, text: string }[] }[] | string }} props
 */
function FaqAnswerContent({ blocks }) {
  if (typeof blocks === 'string') {
    return <p className={answerPanelClass}>{blocks}</p>;
  }

  return (
    <div className={`${answerPanelClass} space-y-3`}>
      {blocks.map((block, index) => {
        if (block.type === 'p') {
          return (
            <p key={index} className="text-pretty">
              {block.text}
            </p>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={index} className="space-y-1.5 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'link') {
          return (
            <a
              key={index}
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-medium text-orange transition-colors hover:underline"
            >
              {block.text}
            </a>
          );
        }

        if (block.type === 'schedule') {
          return (
            <div key={index} className="space-y-3">
              {block.entries.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded-xl border border-lavender/20 bg-cream/50 px-3.5 py-3"
                >
                  <p className="font-semibold text-ink">{entry.label}</p>
                  <p className="mt-1 text-pretty">{entry.text}</p>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

/**
 * @param {{
 *   question: string,
 *   answer: { type: string, text?: string, items?: string[], href?: string, entries?: { label: string, text: string }[] }[] | string,
 *   isOpen: boolean,
 *   onToggle: () => void,
 * }} props
 */
export function FaqAccordionItem({ question, answer, isOpen, onToggle }) {
  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  return (
    <div
      className={`rounded-xl border bg-white transition-colors duration-300 ${
        isOpen ? 'border-orange/35 shadow-sm shadow-orange/10' : 'border-lavender/25'
      }`}
    >
      <h4>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left sm:px-5 sm:py-3.5"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="text-sm font-semibold leading-snug text-ink sm:text-[0.9375rem]">
            {question}
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen
                ? 'rotate-180 border-orange/40 bg-orange/10 text-orange'
                : 'border-lavender/30 bg-cream text-lavender'
            }`}
            aria-hidden
          >
            <ChevronDownIcon className="h-4 w-4" />
          </span>
        </button>
      </h4>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <FaqAnswerContent blocks={answer} />
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   categories: {
 *     id: string,
 *     title?: string | null,
 *     items: { id: string, question: string, answer: { type: string, text?: string, items?: string[], href?: string, entries?: { label: string, text: string }[] }[] | string }[],
 *   }[],
 * }} props
 */
export default function FaqAccordion({ categories }) {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (itemId) => {
    setOpenId((current) => (current === itemId ? null : itemId));
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      {categories.map((category) => (
        <section
          key={category.id}
          aria-labelledby={category.title ? `faq-cat-${category.id}` : undefined}
        >
          {category.title && (
            <h3
              id={`faq-cat-${category.id}`}
              className="font-display mb-3 flex items-center gap-3 text-lg text-ink sm:text-xl"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-lavender/50 to-transparent" aria-hidden />
              <span className="shrink-0">{category.title}</span>
              <span className="h-px flex-1 bg-gradient-to-l from-lavender/50 to-transparent" aria-hidden />
            </h3>
          )}
          <ul className="space-y-2">
            {category.items.map((item) => {
              const itemId = `${category.id}-${item.id}`;
              return (
                <li key={itemId}>
                  <FaqAccordionItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openId === itemId}
                    onToggle={() => handleToggle(itemId)}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
