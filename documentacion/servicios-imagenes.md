# Imágenes de Servicios

Página `/servicios` — sección `ServicesSection.jsx`.

## Dos pestañas, distinto tratamiento

| Pestaña | Imágenes | Optimización |
|---------|----------|--------------|
| **Distribución** | Solo íconos SVG | No aplica |
| **Ingeniería** | 8 fotos en cards expandibles | WebP + `OptimizedImage` |

## Dónde están las fotos

`public/images/STOCK SERVICIOS/`

| Archivo | Uso en `site.js` |
|---------|------------------|
| `1.jpg` – `7.jpg` | Cards de servicios de ingeniería |
| `8.png` | Card "Beneficios exclusivos" (destacada) |

Rutas en `services.engineering.items[].image`.

## Componente

`EngineeringServiceCard` en `ServicesSection.jsx` usa `OptimizedImage`:

- Las **2 primeras** cards visibles: `loading="eager"`
- La primera además: `fetchPriority="high"`
- El resto: `lazy`

## Generar / actualizar WebP

```bash
npm run optimize-images
```

El script:

1. Comprime los JPG de `STOCK SERVICIOS/` (máx. 1000 px)
2. Genera `.webp` junto a cada JPG/PNG

Si cambiás una foto, reemplazá el archivo en esa carpeta y volvé a correr el comando.

## Agregar una imagen nueva a servicios

1. Guardá JPG o PNG en `public/images/STOCK SERVICIOS/`
2. Referenciá la ruta en `site.js` → `services.engineering.items`
3. Corré `npm run optimize-images`

No hace falta tocar el componente: `OptimizedImage` detecta el WebP automáticamente.
