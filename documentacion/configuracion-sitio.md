# Configuración del sitio

Archivo central: `src/config/site.js`

Ahí vive la info que se repite en varias páginas.

## Qué contiene

| Sección | Para qué |
|---------|----------|
| `contact` | Teléfono, email, WhatsApp, dirección, redes |
| `hero` | Imagen, textos y CTA del banner principal |
| `stats` | Números de la sección estadísticas |
| `values` | Valores de "Sobre nosotros" |
| `howWeWork` | Pasos de "Cómo trabajamos" |
| `featuredMaterials` | Materiales del carrusel destacado |
| `materialsGallery` | Fotos del carrusel de materiales |
| `services` | Bloques de la página Servicios |
| `navLinks` | Links del navbar |

## FAQ

Las preguntas frecuentes están en un archivo aparte: `src/config/faq.js`

Se renderizan con `FaqAccordion.jsx`, que soporta:

- Párrafos
- Listas
- Links
- Horarios

## Sobre nosotros

- Textos y bloques: `components/sections/About.jsx`
- Galería de fotos: `config/aboutGallery.js` + `AboutGallery.jsx`

## Hero

Config en `site.js`, render en `components/sections/Hero.jsx`.

Usa `<picture>` con `principal.webp` (fallback PNG) y preload en `index.html`.

## Cómo cambiar algo visible en todo el sitio

1. **Teléfono / WhatsApp / dirección** → `site.js` → `contact`
2. **Menú de navegación** → `site.js` → `navLinks`
3. **Texto del hero** → `site.js` → `hero`
4. **Preguntas FAQ** → `faq.js`

Después de editar, guardá y el dev server recarga solo.
