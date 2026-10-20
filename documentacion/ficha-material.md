# Ficha de material (detalle)

URL: `/productos/:slug`  
Archivo: `src/pages/MaterialDetailPage.jsx`

## Flujo

1. Lee el `slug` de la URL
2. Busca el material con `getMaterialBySlug(slug)` (`materialsIndex.js`)
3. Si no existe → redirige a `/productos`
4. Renderiza según el **tipo de vista** del material

## Tipos de vista

No todos los materiales se muestran igual. La página elige el layout según flags del material:

| Flag / config | Componente | Cuándo |
|---------------|------------|--------|
| `variantView` | `MaterialVariantSection` | Cards de medidas + tabla colapsable (mallas, perfiles IPN/C, etc.) |
| `profileWView` | `MaterialProfilesWSection` | Perfiles W con vista especial |
| slug `canos` | `MaterialCanosVariantSection` | Caños con subtipos |
| `useCollapsibleSpecsTable` | `CollapsibleMaterialSpecsTable` | Solo tabla colapsable (ángulos) |
| (default) | `MaterialSpecsTable` | Tabla de medidas simple |

La config de variantes está en `config/materialVariantViews.js`.

## Bloques comunes a todas las fichas

- Breadcrumb (volver a Productos)
- Imagen principal (`OptimizedImage`)
- Info: unidad de venta, marca, resumen, highlights
- Botón WhatsApp con mensaje prearmado
- Tabla o cards de medidas
- Galería de fotos extra (si hay)

## Materiales "solo consulta"

Algunos materiales (cantoneras, omega, ángulo de ajuste) no muestran precios ni tabla pública.

Se detectan con `isConsultOnlyMaterial()` en `utils/materialMeasures.js`.

Muestran usos/ventajas y botón de consulta.

## WhatsApp en la ficha

Un solo botón principal de WhatsApp (se quitó el duplicado bajo la imagen en vistas con cards de medidas).

Mensaje: `"Hola, vengo desde la web. Quiero consultar por: [nombre del material]"`
