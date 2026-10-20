# Rutas y páginas

Definidas en `src/App.jsx`.

## Mapa de URLs

| URL | Página | Archivo |
|-----|--------|---------|
| `/` | Inicio | `pages/HomePage.jsx` |
| `/nosotros` | Sobre nosotros | `pages/AboutPage.jsx` |
| `/servicios` | Servicios | `pages/ServicesPage.jsx` |
| `/contacto` | Contacto | `pages/ContactPage.jsx` |
| `/productos` | Catálogo | `pages/ProductsPage.jsx` |
| `/productos/:slug` | Ficha de material | `pages/MaterialDetailPage.jsx` |

El `:slug` es el identificador del material, ej. `hierros-nervados-de-construccion`.

## Layout común

Todas las rutas van dentro de `<Layout />`:

- Navbar arriba
- Contenido de la página en el medio (`<Outlet />`)
- Footer abajo
- Botón flotante de WhatsApp

Archivo: `components/layout/Layout.jsx`

## Carga diferida (lazy)

La home carga al instante. El resto se descarga **solo cuando entrás** a esa sección:

```js
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
```

Mientras carga, se muestra un spinner (`PageFallback`).

**Por qué:** el catálogo de materiales pesa ~135 KB; no conviene cargarlo en la home.

## Home: qué secciones tiene

`HomePage.jsx` arma la landing con bloques de `components/sections/`:

- Hero
- Preview de productos (carrusel — ver [home-carrusel-productos.md](./home-carrusel-productos.md))
- Materiales destacados
- Cómo trabajamos
- Estadísticas
- FAQ
- CTA / contacto

## Productos con filtro por URL

`/productos?grupo=hierros-nervados` pre-selecciona un grupo de filtros.

Los grupos están en `config/materialFilterGroups.js`.

## Recargar `/productos`, `/nosotros`, etc. (error 404)

Si al recargar ves **Not Found**, falta la regla **Rewrite** en Render.

Guía completa (qué es Rewrite vs Redirect, cómo configurarlo, archivos del repo):

→ **[spa-render-rewrite.md](./spa-render-rewrite.md)**

Resumen rápido:

| Campo | Valor |
|-------|--------|
| Source | `/*` |
| Destination | `/index.html` |
| Action | **Rewrite** (no Redirect) |

Panel: [dashboard.render.com](https://dashboard.render.com) → nervado26 → Redirects / Rewrites.
