# Guía: qué hicimos para publicar Nervado 26 en internet

Documento para el equipo. Explica el deploy en **Render**, el dominio **nervado26.com.ar**, **Cloudflare**, **DNS** y por qué agregamos registros nuevos sin tocar los que ya existían.

---

## 1. Resumen en una frase

Construimos una **landing web** (React + Vite), la subimos a **GitHub**, Render la **compila y la publica** en internet, y conectamos el dominio **nervado26.com.ar** (comprado en Argentina) usando **Cloudflare** como “directorio telefónico” del dominio.

---

## 2. Piezas del rompecabezas (quién hace qué)

| Pieza | Qué es | Rol en Nervado 26 |
|-------|--------|-------------------|
| **Código del sitio** | Carpeta del proyecto (`nervado26/`) | Textos, diseño, productos, contacto |
| **GitHub** | Repositorio online del código | Donde Render “toma” el proyecto para publicarlo |
| **Render** | Servicio de hosting | Compila el sitio y lo deja online 24/7 |
| **NIC Argentina** | Registro oficial de dominios `.com.ar` | Donde se **compró/registró** `nervado26.com.ar` |
| **Cloudflare** | Servicio de DNS y seguridad | Donde se **configura a dónde apunta** el dominio |
| **Dominio** | `nervado26.com.ar` | La dirección que la gente escribe en el navegador |

**Importante:** el dominio se compra en **NIC Argentina** (o trámite relacionado). **Cloudflare no vende el dominio** en este caso: solo **administra el DNS** (a dónde va cada cosa cuando alguien entra a `nervado26.com.ar`).

---

## 3. ¿Qué es DNS? (explicado simple)

**DNS** = Sistema de nombres de dominio. Es como la **guía telefónica de internet**.

- Vos escribís: `nervado26.com.ar`
- El navegador pregunta: “¿Dónde está ese sitio?”
- El DNS responde: “Está en esta dirección” (una IP o un servidor como `nervado26.onrender.com`)
- El navegador carga la página

Sin DNS correcto, el dominio existe pero **no lleva a ningún sitio**.

Los “registros DNS” son **instrucciones** en esa guía. Cada fila dice algo distinto:

| Tipo | Para qué sirve (ejemplo) |
|------|---------------------------|
| **A** | “Este dominio va a esta **IP**” (número del servidor) |
| **CNAME** | “Este subdominio es un **alias** de otro nombre” (ej. `www` → Render) |
| **MX** | “Los **correos** de @nervado26.com.ar van a Google” |
| **TXT** | Textos de **verificación** (Google, seguridad, etc.) |

---

## 4. ¿Qué es Cloudflare?

**Cloudflare** es una plataforma que, entre otras cosas:

1. **Gestiona el DNS** del dominio (las reglas de la guía telefónica).
2. Puede dar **seguridad** y **certificado HTTPS** (candado del navegador).
3. Opcionalmente acelera el sitio (CDN).

En el panel de Cloudflare entraron con la cuenta del proyecto y vieron el dominio **nervado26.com.ar** ya agregado. Eso significa que **alguien del equipo** (tu compañera u otro) ya vinculó el dominio de NIC con Cloudflare en su momento.

**Cloudflare ≠ lugar de compra del dominio.**  
**NIC Argentina = registro/compra del `.com.ar`.**  
**Cloudflare = configuración técnica de a dónde apunta.**

---

## 5. Qué había YA en Cloudflare (antes de Render)

Cuando abrieron **DNS → Records**, ya existían **2 registros**. Esos **no los tocamos** porque cumplen otras funciones:

### Registro 1 — MX (correo)

| Campo | Valor |
|-------|--------|
| Tipo | **MX** |
| Nombre | `nervado26.com.ar` |
| Contenido | `smtp.google.com` |

**Qué hace:** hace que los mails `info@`, `ventas@`, etc. **lleguen a Google Workspace** (Gmail empresarial).  
**Si lo borrás:** los correos dejan de funcionar.

### Registro 2 — TXT (verificación)

| Campo | Valor |
|-------|--------|
| Tipo | **TXT** |
| Nombre | `nervado26.com.ar` |
| Contenido | `google-site-verification=...` |

**Qué hace:** prueba ante Google que el dominio es de ustedes (Search Console, Workspace, etc.).  
**Si lo borrás:** pueden fallar verificaciones de Google; conviene dejarlo.

---

## 6. Qué AGREGAMOS nosotros (para Render) y por qué

Render publicó el sitio en una URL técnica:

`https://nervado26.onrender.com`

Esa URL **siempre existe** en Render; no se puede eliminar. Pero el objetivo del equipo es que la gente use:

- `https://nervado26.com.ar`
- `https://www.nervado26.com.ar`

Para eso Render pidió **agregar 2 registros DNS** en Cloudflare. Son **adicionales** a los de correo; no reemplazan MX ni TXT.

### Registro nuevo 1 — A (dominio sin www)

| Campo | Valor |
|-------|--------|
| Tipo | **A** |
| Nombre | `@` (significa la raíz: `nervado26.com.ar`) |
| IP | `216.24.57.1` |
| Proxy | **DNS only** (nube gris en Cloudflare) |

**Qué hace:** cuando alguien entra a `nervado26.com.ar` (sin www), el DNS lo manda al servidor de Render.

**Por qué IP y no CNAME en `@`:** muchos proveedores (incluido Cloudflare en la raíz) usan **registro A** con la IP que Render indica, en lugar de CNAME en `@`.

### Registro nuevo 2 — CNAME (www)

| Campo | Valor |
|-------|--------|
| Tipo | **CNAME** |
| Nombre | `www` |
| Destino | `nervado26.onrender.com` |
| Proxy | **DNS only** (nube gris) |

**Qué hace:** cuando alguien entra a `www.nervado26.com.ar`, el DNS lo redirige al sitio alojado en Render.

**Por qué dos registros:** internet trata `nervado26.com.ar` y `www.nervado26.com.ar` como dos direcciones; conviene configurar **ambas**.

### ¿Por qué “nube gris” (DNS only)?

En Cloudflare la nube **naranja** pasa el tráfico por proxies de Cloudflare. Para el primer enlace con Render, se recomienda **gris (DNS only)** hasta que Render **verifique** el dominio. Después se puede revisar si conviene naranja.

---

## 7. Paso a paso: lo que hicimos con Render

### Paso 1 — Código en GitHub

- Proyecto subido al repositorio de GitHub del proyecto.
- Render se conecta a ese repo y despliega automáticamente cuando hay cambios en la rama `main`.

### Paso 2 — Crear Static Site en Render

En **Configure and deploy your new Static Site** completamos:

| Campo | Valor |
|-------|--------|
| **Name** | `nervado26` |
| **Branch** | `main` |
| **Root Directory** | *(vacío)* — el `package.json` está en la raíz del repo |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | **`dist`** |

**¿Por qué `dist`?**  
Vite, al hacer `npm run build`, genera la carpeta **`dist`** con el sitio listo para producción (HTML, JS, CSS, imágenes). Render debe saber **qué carpeta publicar**; sin `dist` aparece el error “Required”.

### Paso 3 — Deploy

Render ejecuta el build en sus servidores. Si termina bien, el sitio queda en:

`https://nervado26.onrender.com`

Eso confirma que el **sitio funciona** antes de conectar el dominio propio.

### Paso 4 — Custom Domain en Render

En el sitio → **Settings** → **Custom Domains** → agregar:

- `nervado26.com.ar`
- `www.nervado26.com.ar`

Render muestra **qué registros DNS** cargar en Cloudflare (los de la sección 6).

### Paso 5 — DNS en Cloudflare

1. Entrar a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Clic en **nervado26.com.ar**
3. Menú **DNS** → **Records**
4. **Add record** → cargar el **A** y el **CNAME** (sin borrar MX ni TXT)
5. Guardar

### Paso 6 — Verify en Render

Volver a Render → Custom Domains → **Verify**.

- Puede tardar desde minutos hasta varias horas (propagación DNS).
- Cuando figure **Verified**, Render activa **HTTPS** (candado) en el dominio.

### Paso 7 — Regla para rutas del sitio (importante)

El sitio usa rutas como `/productos` y `/nosotros` (React Router). Al **recargar** esas URLs, el servidor debe devolver `index.html` con una regla **Rewrite** en Render.

**Guía detallada (Rewrite vs Redirect):** `documentacion/spa-render-rewrite.md`

**En Render** (obligatorio si no está):

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | **Rewrite** |

- **Rewrite** → la URL no cambia; el servidor sirve `index.html` y React muestra la página correcta. **Es lo que necesitamos.**
- **Redirect** → el navegador va a otra URL (301/302). **No usar** para `/productos`, `/nosotros`, etc.

También está en `render.yaml` del repo para deploys con Blueprint.

**Nota:** `public/_redirects` es formato **Netlify**; Render **no** lo lee.

---

## 8. Flujo completo (diagrama mental)

```
Usuario escribe nervado26.com.ar
        ↓
   Cloudflare (DNS)
   “¿Qué registro aplica?”
        ↓
   Registro A → IP de Render
   o CNAME www → nervado26.onrender.com
        ↓
   Render sirve los archivos de /dist
        ↓
   El usuario ve la landing Nervado 26
   (con el dominio .com.ar en la barra)
```

Los correos (`info@`, `ventas@`) **no pasan por Render**: siguen el registro **MX** hacia Google.

---

## 9. Preguntas frecuentes del equipo

### ¿El sitio queda en onrender.com o en .com.ar?

**Ambas URLs existen**, pero la **pública** para clientes es **nervado26.com.ar**.  
`nervado26.onrender.com` es la URL técnica de Render; no hace falta compartirla en tarjetas, redes o Google.

### ¿Por qué agregamos cosas si Cloudflare ya tenía registros?

Porque los que ya estaban eran para **correo y Google**, no para el **sitio web**.  
Agregamos solo lo que Render necesita para **mostrar la página**, sin romper el mail.

### ¿Dónde se compró el dominio?

En **NIC Argentina** (registro `.com.ar`), según la planilla del equipo.  
Cloudflare solo **apunta** el dominio; no lo reemplaza como registro.

### ¿Quién administra qué?

| Tarea | Dónde |
|-------|--------|
| Renovar dominio `.com.ar` | NIC Argentina |
| Registros DNS (web + mail) | Cloudflare |
| Publicar / actualizar el sitio | Render (desde GitHub) |
| Editar textos e imágenes | Código → `src/config/site.js` y `public/images/` |

### ¿Cada cambio en el código actualiza el sitio?

Sí, si Render está conectado a GitHub: al hacer **push** a `main`, Render vuelve a hacer build y deploy automáticamente.

---

## 10. Checklist para verificar que todo está bien

- [ ] `https://nervado26.onrender.com` abre el sitio
- [ ] En Cloudflare: registros **A** (`@`) y **CNAME** (`www`) guardados
- [ ] En Cloudflare: **MX** y **TXT** de Google siguen ahí
- [ ] En Render: dominios en estado **Verified**
- [ ] `https://nervado26.com.ar` abre el sitio
- [ ] `https://www.nervado26.com.ar` abre el sitio
- [ ] `/productos` y `/nosotros` funcionan al recargar la página
- [ ] Los correos `@nervado26.com.ar` siguen llegando (probar envío/recepción)

---

## 11. Glosario rápido

| Término | Significado |
|---------|-------------|
| **Deploy** | Publicar una versión del sitio en internet |
| **Build** | Compilar el proyecto (`npm run build` → carpeta `dist`) |
| **Hosting** | Servidor que guarda y muestra el sitio (Render) |
| **DNS** | Sistema que traduce nombres (dominios) en direcciones de servidores |
| **Registro DNS** | Una fila de configuración (A, CNAME, MX, TXT…) |
| **NIC** | Entidad que registra dominios `.ar` en Argentina |
| **Render** | Plataforma donde está alojada la web estática |
| **Static Site** | Sitio de archivos fijos (HTML/JS/CSS), sin servidor propio de base de datos |
| **HTTPS** | Conexión segura (candado); Render lo activa al verificar el dominio |
| **Propagación DNS** | Tiempo que tardan los cambios de DNS en actualizarse en todo el mundo |

---

## 12. Contacto técnico del proyecto (referencia)

- **Repositorio:** GitHub `nervado26`
- **Dominio web:** `nervado26.com.ar` / `www.nervado26.com.ar`
- **Hosting web:** Render (Static Site, publish `dist`)
- **DNS:** Cloudflare
- **Correos:** Google Workspace (registro MX existente)

---

*Documento generado para el equipo Nervado 26 — deploy web + dominio + DNS.*
