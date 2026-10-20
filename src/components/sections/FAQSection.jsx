import { faqPage, faqCategories } from '../../config/faq';
import SectionTitle from '../ui/SectionTitle';
import FaqAccordion from '../ui/FaqAccordion';
import { Reveal } from '../ui/Reveal';

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding border-t border-lavender/20 bg-cream !pb-10 !pt-6 sm:!pb-12 sm:!pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-6 text-center sm:mb-7">
          <SectionTitle
            label={faqPage.label}
            title={faqPage.title}
            description={faqPage.description}
            className="mx-auto"
          />
        </Reveal>

          <Reveal delay={80}>
            <FaqAccordion categories={faqCategories} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
