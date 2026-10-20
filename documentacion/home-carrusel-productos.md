# Carrusel de productos en la home

Sección **"¿Qué necesita tu obra?"** — carrusel horizontal con 12 materiales destacados.

## Componentes involucrados

| Archivo | Rol |
|---------|-----|
| `src/pages/HomePage.jsx` | Preload del catálogo en segundo plano |
| `src/components/sections/ProductsPreview.jsx` | Sección en la home |
| `src/components/ui/ProductsPreviewCarousel.jsx` | Carrusel con flechas y auto-scroll |
| `src/components/ui/MaterialCard.jsx` | Card de cada material |
| `src/config/featuredMaterialsHome.js` | Datos livianos de los 12 destacados |
| `src/config/site.js` → `productsPage.featuredSlugs` | Orden y lista de slugs destacados |

## Problema que había

Al scrollear hasta el carrusel, las cards tardaban **1–2 segundos** por varias causas encadenadas:

1. **Import dinámico del catálogo completo** (`materialsIndex.js`, ~135 KB) solo para mostrar 12 items
2. **Skeleton** mientras esperaba ese archivo
3. **Animación Reveal** (opacity 0 + ~750 ms) sobre el carrusel
4. **`loading="lazy"`** en todas las imágenes — el navegador esperaba a scrollear para bajarlas

## Las 4 optimizaciones aplicadas

### 1. Datos livianos solo para la home

**Antes:** `import('../../config/materialsIndex.js')` en un `useEffect`.

**Ahora:** `featuredMaterialsHome.js` con solo lo que necesita cada card:

- `slug`, `name`, `description`, `image`
- `measuresCatalogLabel`, `saleUnit`

El carrusel importa ese archivo **directo** — sin espera, sin skeleton.

> El catálogo completo sigue existiendo para `/productos` y las fichas.

### 2. Imágenes visibles con prioridad

En `ProductsPreviewCarousel`, las cards que entran en pantalla usan:

- `imageLoading="eager"` — el navegador baja la foto ya
- `imageFetchPriority="high"` en la primera card visible

Las que están fuera de vista siguen con `lazy`.

### 3. Sin Reveal en el carrusel

Se quitó `<Reveal>` del carrusel y del bloque "Ver más productos".

El título de la sección mantiene Reveal; las cards aparecen **sin esperar la animación de entrada**.

### 4. Preload del catálogo completo

En `HomePage.jsx`:

```js
useEffect(() => {
  import('../config/materialsIndex.js');
}, []);
```

Al abrir la home, el navegador empieza a bajar `materialsIndex` en segundo plano. Cuando el usuario va a **Productos** o una ficha, el JS ya está listo (o casi).

## Flujo actual al scrollear

```
Usuario baja a la sección
  → Cards ya están en el DOM (datos livianos)
  → Sin animación Reveal en el carrusel
  → Imágenes visibles se piden con eager
  → Fotos aparecen rápido
```

## Cambiar los materiales destacados

1. Editá `featuredSlugs` en `src/config/site.js`
2. Regenerá el archivo liviano:

```bash
npm run build-featured-home
```

Eso lee el catálogo completo y actualiza `featuredMaterialsHome.js` con los datos mínimos de cada slug.

3. Si cambiaste imágenes, corré también:

```bash
npm run optimize-images
```

## Mantener sincronizado

| Si cambiás… | Hacé… |
|-------------|-------|
| Qué materiales van en el carrusel | `site.js` + `npm run build-featured-home` |
| Texto o imagen de un material del catálogo | Catálogo/descripciones + `npm run build-featured-home` |
| Solo datos del catálogo (no destacados) | Nada extra en la home |

Si `featuredSlugs` y `featuredMaterialsHome.js` no coinciden, el carrusel puede mostrar materiales viejos o faltar alguno.
