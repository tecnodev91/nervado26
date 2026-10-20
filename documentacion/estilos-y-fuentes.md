# Estilos y fuentes

## Tailwind CSS 4

Configurado en `src/styles/index.css` con el plugin de Vite (`@tailwindcss/vite`).

Se usan clases directamente en los componentes, sin archivos CSS por componente.

## Colores de marca

Definidos como tokens en `index.css`:

| Token | Uso |
|-------|-----|
| `orange` | CTAs, acentos, hover |
| `lavender` / `lavender-deep` | Bordes, links secundarios |
| `cream` | Fondos claros |
| `ink` / `ink-muted` | Texto principal y secundario |

Ejemplo: `text-orange`, `bg-cream`, `border-lavender/30`

## Tipografías

**Montserrat** — títulos (`font-display`)  
**Inter** — cuerpo de texto

### Fuentes locales (sin Google Fonts)

- Archivos en `public/fonts/`
- Declaración en `src/styles/fonts.css`
- Import en `main.jsx`
- Preload en `index.html` para las variantes críticas

**Ventaja:** menos requests externos y mejor rendimiento.

## Animaciones

- `Reveal` / `useReveal` — elementos que aparecen al hacer scroll
- `useCountUp` — números animados en estadísticas
- Transiciones en hover de cards (`hover:-translate-y-1`, `group-hover:scale-[1.04]`)

## Componentes de diseño repetidos

| Componente | Uso |
|----------|-----|
| `SectionTitle` | Título + subtítulo de secciones |
| `Button` | Variantes: `orange`, `dark`, `outline` |
| `BrandLogo` | Logo en navbar y footer |

## Responsive

Mobile-first con breakpoints de Tailwind:

- `sm:` — 640px+
- `md:` — 768px+
- `lg:` — 1024px+

Ejemplo: el sidebar del catálogo en desktop es fijo; en mobile es un drawer (`MaterialsFilterDrawer`).
