import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import StatsSection from '../components/sections/StatsSection';
import ProductsPreview from '../components/sections/ProductsPreview';
import HowWeWorkSection from '../components/sections/HowWeWorkSection';
import FAQSection from '../components/sections/FAQSection';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About preview />
      <div className="bg-dark-section">
        <ProductsPreview />
        <StatsSection />
      </div>
      <HowWeWorkSection />
      <FAQSection />
      <Contact preview />
    </>
  );
}
