# Scripts y comandos

## NPM (día a día)

```bash
npm run dev       # servidor local (http://localhost:5173)
npm run build     # build de producción → carpeta dist/
npm run preview   # sirve dist/ para probar antes de subir
npm run optimize-images   # genera WebP y comprime JPG
npm run build-featured-home   # regenera featuredMaterialsHome.js
```

## Regenerar destacados de la home

Script: `scripts/build-featured-home.mjs`

Lee `productsPage.featuredSlugs` de `site.js`, extrae datos mínimos del catálogo y escribe `src/config/featuredMaterialsHome.js`.

Correrlo cuando cambies qué materiales van en el carrusel de la home o cuando actualices textos/imágenes de esos materiales.

## Optimizar imágenes

Script: `scripts/optimize-public-images.py`  
Guía detallada: [script-optimize-imagenes.md](./script-optimize-imagenes.md)

Requiere: Python 3 + Pillow (`pip install pillow`)

Resumen — el script:

1. **Redimensiona** fotos más anchas que el máximo (1000–1400 px según carpeta)
2. **Comprime** JPG con calidad 82 (sobrescribe el original en algunas carpetas)
3. **Genera `.webp`** al lado de cada JPG/PNG (el original queda como fallback)

En pantalla se ve igual en uso normal; gana mucho en peso y velocidad.

Carpetas que procesa hoy: `materiales/`, `STOCK SERVICIOS/`, `nosotros/`, `vista_principal/`, `sirven/`, etc. (tabla completa en la guía).

```bash
npm run optimize-images
```

Correrlo cada vez que agregues o cambies fotos en `public/images/`.

## Scripts de catálogo (avanzado)

En `scripts/` hay herramientas para regenerar documentación de materiales:

| Script | Genera |
|--------|--------|
| `build-featured-home.mjs` | `featuredMaterialsHome.js` (carrusel home) |
| `build-materials-images-md.py` | Listado de imágenes |
| `build-material-descriptions.py` | Descripciones |
| `build-productos-catalogo-md.mjs` | Catálogo en markdown |

Salida en la carpeta `docs/`.

## Build: qué esperar

Tamaños aproximados del bundle:

| Chunk | Tamaño (gzip) |
|-------|---------------|
| `index.js` (core) | ~100 KB |
| `materialsIndex.js` | ~28 KB |
| CSS | ~16 KB |

`materialsIndex` se carga al ir a Productos o una ficha. En la **home**, el carrusel usa `featuredMaterialsHome.js` (liviano); `HomePage` hace preload de `materialsIndex` en segundo plano para cuando el usuario navegue al catálogo.

## Deploy

Guías de deploy y dominio en `docs/`:

- `GUIA-DEPLOY-RENDER-Y-DOMINIO.md`
- `GUIA-DOMINIO-DNS-RENDER.md`
