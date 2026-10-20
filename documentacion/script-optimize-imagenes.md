# Script `optimize-public-images.py`

Comando: `npm run optimize-images`  
Archivo: `scripts/optimize-public-images.py`  
Requiere: Python 3 + Pillow (`pip install pillow`)

## Qué hace en una frase

Reduce **tamaño en píxeles** (si la foto es muy ancha) y **peso del archivo** (compresión), y genera **WebP** al lado de cada JPG/PNG. En la web se ve igual o casi igual.

---

## Dos tipos de operación

### A) Comprimir JPG in-place (sobrescribe el original)

Función: `optimize_jpeg`

1. Abre el JPG
2. Si el ancho supera el máximo → **redimensiona** (mantiene proporción, filtro LANCZOS)
3. Guarda de nuevo el JPG con **calidad 82** y `optimize=True`

El archivo original se **reemplaza** por la versión más liviana.

### B) Generar WebP (archivo nuevo, original intacto)

Función: `image_to_webp`

1. Abre JPG o PNG
2. Misma lógica de redimensionado si hace falta
3. Crea `misma-ruta.webp` con **calidad 82**, método 6
4. **No borra** el JPG/PNG — queda como fallback para navegadores viejos

Si el `.webp` ya existe y es más nuevo que el original, **no lo regenera** (salvo que cambies la foto y vuelvas a correr el script).

---

## Parámetros por defecto

| Parámetro | Valor | Significado |
|-----------|-------|-------------|
| `max_width` | 1000–1400 px según carpeta | Ancho máximo; solo achica si la foto es más grande |
| `quality` | 82 (algunos JPG en `verdaderos`: 85) | Compresión 0–100; 82 es buen equilibrio web |
| Resample | LANCZOS | Algoritmo de resize de buena calidad |

---

## ¿Se nota en pantalla?

**En el sitio, normalmente no.**

- Una card de producto muestra la imagen a ~300–400 px de ancho; el archivo tiene hasta 1000 px (sobra para pantallas retina).
- Calidad 82 en WebP/JPG es estándar para fotos web: mucho menos peso, pérdida visual mínima.

**Dónde podría notarse un poco:**

- Zoom extremo en la imagen
- Gráficos con texto muy fino (algunos PNG)
- Comparación lado a lado con el original a tamaño completo

Si una foto se ve “lavada”, se puede subir `quality` a 88 o el `max_width` en el script para esa carpeta.

---

## Qué carpetas procesa

| Carpeta / archivos | Operación | Ancho máx. | Calidad |
|--------------------|-----------|------------|---------|
| `nosotros/**` (JPG, JPEG, PNG) | Comprime JPG/JPEG + WebP | 1200 px | 82 |
| `materiales/brick-piles-….jpg` | Comprime JPG | 1400 px | 82 |
| `materiales/sirven/*.png` | Solo WebP | 1200 px | 82 |
| `materiales/verdaderos/*.jpg` | Comprime JPG | 1000 px | 85 |
| `vista_principal/*.png` | Solo WebP (hero) | 1400 px | 82 |
| `materiales/**` (todo el árbol) | Solo WebP | 1000 px | 82 |
| `STOCK SERVICIOS/*.jpg` | Comprime JPG + WebP | 1000 px | 82 |
| `STOCK SERVICIOS/*.png` | Solo WebP | 1000 px | 82 |

**No procesa hoy:**

- Logos sueltos en `public/images/` (fuera de las carpetas anteriores)

---

## Cómo correrlo

```bash
npm run optimize-images
```

Correrlo cuando:

- Agregues o cambies fotos en `public/images/materiales/`, `STOCK SERVICIOS/` o `nosotros/`
- Reemplaces imágenes del hero

La consola imprime antes/después en KB por archivo.

---

## Relación con el front

El script **solo prepara archivos** en `public/images/`.

El componente `OptimizedImage` es el que sirve WebP en el navegador:

```
foto.jpg  +  foto.webp  →  <picture>  →  el usuario baja solo uno
```

Ver [imagenes-webp.md](./imagenes-webp.md) para el comportamiento en el navegador.

---

## Ajustar calidad o tamaño

Editá `scripts/optimize-public-images.py`:

- `max_width=1000` → subir si querés más detalle en fichas ampliadas
- `quality=82` → subir a 88–90 si alguna foto se ve mal; bajar a 75–78 si priorizás peso mínimo

Después de cambiar parámetros, borrá los `.webp` viejos (o tocá el JPG/PNG original) y volvé a correr el script.
