# Imágenes de Sobre nosotros

Carpeta activa: **`public/images/nosotros/`**

La carpeta `public/images/sobre-nos/` quedó como respaldo local (está en `.gitignore` y **no se deploya**).

## Qué se usa hoy en el sitio

| Archivo | Dónde se ve |
|---------|-------------|
| `afuera2.jpg` (+ `.webp`) | Preview "Sobre Nosotros" en la **home** |
| `image.png` (+ `.webp`) | Bloque "Nuestra historia" en **`/nosotros`** |

Config en `src/config/site.js` → `about.previewImage` y `about.history.image`.

## Galería (desactivada)

`AboutGallery.jsx` sigue apuntando a `sobre-nos/01–09` por si se reactiva. Si volvés a usar la galería, mové esas fotos a `nosotros/` y actualizá `aboutGallery.js`.

## Optimización

```bash
npm run optimize-images
```

Procesa `public/images/nosotros/` (comprime JPG y genera WebP).

## Cambiar una foto

1. Reemplazá el archivo en `public/images/nosotros/`
2. Corré `npm run optimize-images`
3. Si cambió el nombre, actualizá `site.js`

Detalle del script: [script-optimize-imagenes.md](./script-optimize-imagenes.md)
