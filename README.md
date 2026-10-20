# Nervado 26 — Landing Page

Sitio institucional para **Nervado 26**, venta de materiales de construcción. React + Vite + Tailwind CSS.

## Inicio rápido

```bash
npm install
npm run dev
```

Build para producción:

```bash
npm run build
npm run preview
```

## Deploy en Render

El sitio se publica como Static Site en Render. No hace falta un archivo `.env`: el sitio no lee variables de entorno.

En `render.yaml`:

- Build: `npm install && npm run build`
- Publicar: `dist`
- Rewrite: `/*` → `/index.html`

Esa regla hace que recargar `/productos`, `/nosotros` y el resto de las rutas no devuelva 404. Si el servicio ya existe, la misma regla está en el dashboard: Settings → Redirects/Rewrites. Detalle en `documentacion/spa-render-rewrite.md` y `docs/GUIA-DEPLOY-RENDER-Y-DOMINIO.md`.

## Editar contenido

Todo el texto editable está en **`src/config/site.js`**:

- Datos de contacto y WhatsApp
- Hero, nosotros, productos, beneficios
- Horarios, redes y footer

### WhatsApp

Actualizar `contact.whatsapp` con formato internacional sin `+` ni espacios (ej: `5492611234567`).

### Imágenes

1. Editá o agregá el archivo en **`assets/`** (originales de diseño).
2. Copiá la versión optimizada a **`public/images/`** (es lo que ve el sitio).
3. Si cambiás el nombre, actualizá la ruta en **`src/config/site.js`**.

Para el carrusel de materiales, priorizá JPG de buena resolución (evitá subir archivos de más de ~2–3 MB por foto si podés comprimirlos para web).

## Carpetas del proyecto (`assets` vs `public` vs `docs`)

| Carpeta | ¿Va al sitio? | Para qué sirve |
|---------|----------------|----------------|
| **`public/`** | Sí | Archivos estáticos finales: imágenes, logos, fuentes. Todo lo que referenciás con `/images/...` en el código. |
| **`assets/`** | No | Respaldo y materiales de trabajo: logos en todas las versiones, fotos originales, piezas de RRSS. No los borra Vite; son referencia del equipo. |
| **`docs/`** | No | Documentación interna: manual de marca, toma de requisitos, PDFs. No forma parte del build. |

**Flujo recomendado:** diseño en `assets/` → copiar a `public/` → el código en `src/` solo apunta a `public/`.

### Fuentes de marca

Copiar los archivos `.woff2` en `public/fonts/`:

- `Benn-ExBold.woff2`
- `NeueHaasGroteskDisplayPro-Roman.woff2`
- `NeueHaasGroteskDisplayPro-Medium.woff2`

Sin ellas, el sitio usa fuentes de respaldo definidas en CSS.

## Estructura

```
nervado26/              # Raíz del proyecto (Vite + Render)
├── assets/             # Originales de marca (no se publican)
├── docs/               # Documentación interna
├── public/             # Archivos del sitio en producción
│   ├── fonts/
│   └── images/
├── src/                # Código React
│   ├── components/
│   ├── config/         # ← Textos y datos editables
│   ├── hooks/
│   ├── styles/
│   └── utils/
├── index.html
├── package.json
└── render.yaml
```

## Colores de marca

| Token     | Hex       |
|-----------|-----------|
| Cream     | `#f4f1ec` |
| Lavender  | `#9bacd8` |
| Orange    | `#f98612` |
