# Guía de imágenes para la web

## Tamaños objetivo (aprox.)

| Uso | Ancho máx. | Formato | Peso objetivo |
|-----|------------|---------|---------------|
| Hero inicio | 1400 px | JPG/WebP | 150–350 KB |
| Cards producto (catálogo) | 800–1000 px | JPG | 30–120 KB |
| Galería Nosotros | 1200 px | JPG | 80–200 KB cada una |
| Carrusel / decoración | 1200 px | WebP | 100–250 KB |
| Logos navbar/footer | — | PNG | &lt; 80 KB |

## Optimizar antes de publicar

Requiere Python y Pillow (`pip install pillow`).

```bash
npm run optimize-images
```

Comprime JPG, genera WebP y define tamaños por carpeta. Ver guía completa en `documentacion/script-optimize-imagenes.md`.

## Carpetas

- **`public/images/`** → lo que ve el visitante (Vite copia a `dist/`).
- **`assets/`** → respaldo y originales; no se publica.

## Archivos que no deben estar en `public/`

Fotos de stock sin uso, duplicados de `verdaderos/` y catálogos legacy (`product-*.jpeg`, `hero-bg.jpeg`) solo en `assets/` si hace falta.
