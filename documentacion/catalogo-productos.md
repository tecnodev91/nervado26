# Catálogo de productos

## Dónde viven los datos

El catálogo no viene de una API: son **archivos JS** en `src/config/`.

| Archivo | Contenido |
|---------|-----------|
| `materialsCatalog.js` | Materiales base + secciones del sidebar |
| `materialsCatalogExtra.js` | Materiales agregados después |
| `materialsCatalogCanosSplit.js` | Caños divididos por tipo |
| `angulosCatalog.js` | Ángulos (tabla colapsable) |
| `planchuelasLisasCatalog.js` | Planchuelas lisas |
| `profilesWCatalog.js` | Perfiles W |
| `materialDescriptions.js` | Textos largos, badges, highlights |
| `materialDescriptionsExtra.js` | Textos de materiales extra |
| `materialsIndex.js` | **Une todo** y exporta funciones |
| `featuredMaterialsHome.js` | **12 destacados** para el carrusel de la home (liviano) |

Ver también: [home-carrusel-productos.md](./home-carrusel-productos.md)

## Cómo se arma el índice

`materialsIndex.js`:

1. Junta materiales de todos los catálogos
2. Les agrega descripciones (`enrichMaterial`)
3. Calcula badges de medidas (`withMeasuresMeta`)
4. Exporta `materials`, `getMaterialBySlug`, filtros, etc.

## Vista del catálogo

`components/sections/ProductsCatalog.jsx`:

- **Sidebar** (`MaterialsSidebar`) — categorías
- **Toolbar** — búsqueda y filtros por grupo
- **Grid** — `MaterialCard` por material

## Búsqueda

Archivo: `src/utils/search.js`

- Busca **solo por nombre** del material (`material.name`)
- Coincidencia por **prefijo de palabra** (escribir "angu" encuentra "Ángulos", no "rectángulo")

## Filtros por grupo

`materialFilterGroups.js` define grupos como "Hierros", "Chapas", "Caños".

Cada grupo agrupa varios `slug` de materiales. Se pueden combinar con la búsqueda.

## Agregar un material nuevo

1. Agregar entrada en el catálogo correspondiente (datos + imagen + tabla de medidas)
2. Agregar descripción en `materialDescriptions.js` o `Extra`
3. Si hace falta, agregarlo a un grupo en `materialFilterGroups.js`
4. Poner la foto en `public/images/materiales/...`
5. Correr `npm run optimize-images`

El `slug` debe ser único y en kebab-case (ej. `angulo-de-ajuste`).
