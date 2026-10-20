# Imágenes y WebP

## Idea general

En el servidor hay **dos archivos** por cada foto optimizada:

```
hierrosnervados.png   ← original (fallback)
hierrosnervados.webp  ← versión liviana
```

El visitante **solo descarga una**. No bajan las dos.

## Qué hace el navegador

El componente `OptimizedImage` genera esto:

```html
<picture>
  <source srcset="/ruta/imagen.webp" type="image/webp" />
  <img src="/ruta/imagen.png" alt="..." />
</picture>
```

| Situación | Qué pide |
|-----------|----------|
| Navegador moderno (Chrome, Firefox, Edge, Safari reciente) | Solo el `.webp` |
| Navegador sin WebP | Solo el `.png` o `.jpg` |

## Dónde se usa

- `MaterialCard` — cards del catálogo
- `MaterialDetailPage` — foto principal y galería
- `FeaturedMaterialCard` / `FeaturedMaterialsCarousel` — destacados en home
- `ProductCard` — productos legacy
- `Hero` — usa `<picture>` propio con `principal.webp`
- `ServicesSection` — cards de Ingeniería (`STOCK SERVICIOS/`)
- `About.jsx` — preview en home e imagen de historia en `/nosotros`
- `AboutGallery.jsx` — galería bento (cuando está activa)

## Carpetas con WebP

| Carpeta | Uso |
|---------|-----|
| `public/images/materiales/` | Catálogo de productos |
| `public/images/STOCK SERVICIOS/` | Cards de servicios (pestaña Ingeniería) |
| `public/images/vista_principal/` | Hero |
| `public/images/nosotros/` | Sobre nosotros (home + página Nosotros) |

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/components/ui/OptimizedImage.jsx` | Componente `<picture>` reutilizable |
| `src/utils/imageSources.js` | Convierte `.png`/`.jpg` → ruta `.webp` |
| `scripts/optimize-public-images.py` | Genera los `.webp` en `public/images/` |
| `public/images/materiales/` | Fotos del catálogo (+ sus `.webp`) |

## Cómo generar WebP

```bash
npm run optimize-images
```

Detalle del script (tamaño, calidad, carpetas, “¿se nota?”): [script-optimize-imagenes.md](./script-optimize-imagenes.md)

Resumen: redimensiona si hace falta, comprime con calidad 82 y crea `.webp` junto a cada JPG/PNG en `materiales/` y `STOCK SERVICIOS/`.

## Cómo verificar en el navegador

1. Abrí DevTools → pestaña **Network**
2. Entrá a una ficha de producto
3. Filtrá por `webp`
4. Deberías ver **una** petición de imagen (ej. `hierrosnervados.webp`)

Si ves **304**, la imagen ya estaba en caché (normal al recargar).

Para ver el peso real: activá **Disable cache** y recargá.

## Agregar una imagen nueva al catálogo

1. Poné el JPG/PNG en `public/images/materiales/...`
2. Referenciá la ruta en el catálogo (`materialsCatalog.js`, etc.)
3. Corré `npm run optimize-images` para crear el `.webp`
4. Usá `OptimizedImage` (o dejá que el componente ya lo haga)

Si falta el `.webp`, el navegador igual muestra el original — no se rompe nada.
