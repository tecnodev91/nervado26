# Rewrite vs Redirect (Render y rutas del sitio)

Nervado 26 es una **SPA**: una sola `index.html` y React Router cambia lo que se ve según la URL (`/productos`, `/nosotros`, etc.).

En producción (Render) hay que decirle al servidor qué hacer cuando alguien pide una ruta que **no es un archivo real**.

---

## El problema del 404 al recargar

| Acción | ¿Qué pasa? |
|--------|------------|
| Clic en el menú → Productos | ✅ Funciona (React cambia la vista en el navegador) |
| F5 en `/productos` | ❌ Sin regla: Render busca un archivo `productos` → **Not Found** |
| Pegar `nervado26.com.ar/nosotros` en la barra | ❌ Igual: el servidor no tiene carpeta `nosotros` |

**Solución:** una regla en Render que, para casi todas las rutas, **sirva `index.html`** y deje que React Router resuelva el resto.

---

## Redirect vs Rewrite

Son dos acciones distintas en el panel **Redirects / Rewrites** de Render.

### Redirect (redirección)

El servidor le dice al navegador: **“esa página está en otra URL, andá para allá”**.

- La **barra de direcciones cambia** (ej. de `/viejo` a `/nuevo`).
- El navegador hace **una nueva petición** a la URL nueva.
- Código HTTP típico: **301** o **302**.

**Ejemplo de uso:**

| Source | Destination | Para qué |
|--------|-------------|----------|
| `/old-blog` | `/nosotros` | Una URL vieja que debe llevar a otra página |
| `http://...` | `https://...` | Forzar HTTPS (Render suele hacerlo solo) |

**No sirve para SPAs** si querés que `/productos` siga diciendo `/productos` en la barra pero muestre la app.

---

### Rewrite (reescritura)

El servidor **no avisa al navegador**. Internamente dice: “para esta petición, serví el contenido de **otro archivo**”.

- La **URL en la barra no cambia** (`/productos` sigue siendo `/productos`).
- El navegador recibe el HTML de `index.html`.
- React arranca, lee la URL y muestra la página correcta.

**Regla que usa Nervado 26:**

| Campo | Valor |
|-------|--------|
| Source | `/*` |
| Destination | `/index.html` |
| Action | **Rewrite** |

`/*` = cualquier ruta (`/productos`, `/nosotros`, `/productos/hierros-nervados-de-construccion`, etc.).

---

## Analogía rápida

Imaginá un edificio con **una sola puerta** (`index.html`) y un **mapa adentro** (React Router):

| Acción | Qué pasa |
|--------|----------|
| **Rewrite** | El visitante pide “piso Productos”; el portero lo deja entrar por la puerta única y **adentro** el mapa lo lleva a Productos. La dirección en el papel sigue diciendo “Productos”. |
| **Redirect** | El portero dice “Productos no está acá, andá a la calle Inicio”. Cambia la dirección escrita. |

Para nuestra web necesitamos **Rewrite**.

---

## Cómo configurarlo en Render

1. [dashboard.render.com](https://dashboard.render.com) → sitio **nervado26**
2. Menú **Redirects** o **Redirects / Rewrites**
3. **Add rule**
4. Completar:

```
Source:       /*
Destination:  /index.html
Action:       Rewrite
```

5. Guardar
6. Probar: entrar a `https://nervado26.com.ar/productos` y apretar **F5** → debe cargar el catálogo, no “Not Found”.

---

## Archivos en el repo (por plataforma)

| Archivo | Plataforma | Equivalente a |
|---------|------------|----------------|
| `render.yaml` → `routes: rewrite /* → /index.html` | Render (Blueprint) | Rewrite en dashboard |
| `vercel.json` → `rewrites` | Vercel | Rewrite |
| `public/_redirects` → `/* /index.html 200` | Netlify | Rewrite (formato distinto) |

**Importante:** tener `public/_redirects` **no alcanza** en Render. Ahí la regla va en el **dashboard** o en `render.yaml` si usan Blueprint.

---

## ¿Hay que repetir esto por cada ruta nueva?

**No.** La regla `/*` cubre todas las rutas actuales y futuras que definas en `App.jsx`.

Solo agregarías reglas **Redirect** aparte si más adelante querés, por ejemplo:

- `/promo` → `/productos?grupo=...`
- Una URL vieja de un sitio anterior → página nueva

Esas reglas específicas van **arriba** del catch-all `/*` si Render las evalúa en orden (consultar orden en el panel).

---

## Más información

- Deploy y dominio: `docs/GUIA-DEPLOY-RENDER-Y-DOMINIO.md`
- Mapa de rutas del front: [rutas-y-paginas.md](./rutas-y-paginas.md)
