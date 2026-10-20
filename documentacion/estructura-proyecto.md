# Estructura del proyecto

## Stack

- **React 19** + **Vite 6** — front y bundler
- **React Router 7** — rutas (`/productos`, `/nosotros`, etc.)
- **Tailwind CSS 4** — estilos con clases utilitarias

## Carpetas principales

```
nervado26/
├── public/              → Archivos estáticos (imágenes, fuentes)
│   ├── images/          → Fotos del sitio
│   └── fonts/           → Inter y Montserrat locales
├── src/
│   ├── main.jsx         → Entrada de la app
│   ├── App.jsx          → Rutas
│   ├── pages/           → Una página por ruta
│   ├── components/
│   │   ├── layout/      → Navbar, Footer, Layout, WhatsApp flotante
│   │   ├── sections/    → Bloques de cada página (Hero, FAQ, etc.)
│   │   └── ui/          → Piezas reutilizables (cards, botones, tablas)
│   ├── config/          → Datos: catálogo, FAQ, site.js
│   ├── utils/           → Helpers (búsqueda, WhatsApp, imágenes)
│   ├── hooks/           → useReveal, useActiveSection...
│   └── styles/          → CSS global y fuentes
├── scripts/             → Python/Node para generar datos e imágenes
└── documentacion/       → Estas guías
```

## Flujo al cargar el sitio

```
index.html
  → main.jsx (monta React)
    → App.jsx (define rutas)
      → Layout (navbar + footer + outlet)
        → Página según la URL
```

## Punto de entrada

`src/main.jsx` importa los estilos y renderiza `<App />` en el `#root` del HTML.

## Componentes: secciones vs UI

| Tipo | Ejemplo | Uso |
|------|---------|-----|
| `sections/` | `Hero.jsx`, `FAQSection.jsx` | Bloques grandes de una página |
| `ui/` | `MaterialCard.jsx`, `Button.jsx` | Piezas chicas reutilizables |
| `layout/` | `Navbar.jsx`, `Footer.jsx` | Envoltorio común a todas las páginas |

## Build de producción

```bash
npm run build   # genera dist/
npm run preview # prueba el build local
```

Vite empaqueta JS/CSS y copia `public/` a `dist/`.
