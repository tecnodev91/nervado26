import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const MaterialDetailPage = lazy(() => import('./pages/MaterialDetailPage'));

function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center px-4"
      aria-live="polite"
      aria-busy="true"
      aria-label="Cargando página"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-lavender/30 border-t-orange" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nosotros" element={<AboutPage />} />
            <Route path="servicios" element={<ServicesPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="productos/:slug" element={<MaterialDetailPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
