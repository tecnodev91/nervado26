# Guía: dominio, DNS, Cloudflare y deploy en Render — Nervado 26

Documento para el equipo. Explica **qué hicimos**, **por qué**, y **qué significa cada cosa** (NIC, Cloudflare, DNS, Render).

---

## 1. Resumen en una frase

**La compañera compró el dominio `nervado26.com.ar` en NIC Argentina. El DNS se administra en Cloudflare. El sitio web se sube a Render. Los dos registros que agregamos en Cloudflare conectan el dominio con Render.**

La gente entra a `https://nervado26.com.ar` — no a `nervado26.onrender.com`.

---

## 2. ¿Qué construimos y dónde vive el sitio?

| Qué | Dónde |
|-----|--------|
| Código del sitio (React + Vite) | GitHub → repo `nervado26` |
| Hosting del sitio (servidor web) | **Render** (Static Site) |
| Dominio público | **nervado26.com.ar** |
| Administración DNS | **Cloudflare** |
| Registro del dominio (.com.ar) | **NIC Argentina** |

### Configuración en Render (formulario)

| Campo | Valor | Significado |
|-------|--------|-------------|
| Build Command | `npm install && npm run build` | Instala dependencias y genera la versión de producción |
| Publish Directory | **`dist`** | Carpeta que crea Vite con el sitio listo para publicar |
| Branch | `main` | Rama de GitHub que Render usa para cada deploy |

Cada vez que suben cambios a GitHub en `main`, Render vuelve a construir y publicar el sitio.

### URL técnica vs dominio propio

- **`nervado26.onrender.com`** → URL que Render crea siempre (interna/respaldo). No se puede eliminar.
- **`nervado26.com.ar`** → Dominio que ven los clientes. Se logra con DNS (ver abajo).

No son dos sitios distintos: es **el mismo sitio**, con dos formas de llegar. Lo que compartimos en tarjetas, WhatsApp e Instagram es siempre **nervado26.com.ar**.

---

## 3. ¿Dónde se compra el dominio? ¿NIC o Cloudflare?

Son cosas **diferentes**:

### NIC Argentina ([nic.ar](https://nic.ar))

- Es el **registro oficial** de dominios `.com.ar` en Argentina.
- Ahí se **compra y renueva** el dominio (derecho de uso del nombre `nervado26.com.ar`).
- La compañera hizo el trámite ahí (CUIT Hernán, según la planilla del equipo).
- NIC **no es** donde se “diseña” el sitio ni donde se suben archivos HTML.

**Analogía:** NIC es como la escritura del terreno — el nombre es tuyo por X años.

### Cloudflare ([dash.cloudflare.com](https://dash.cloudflare.com))

- **No compra** el dominio (en este caso).
- Se usa para **administrar el DNS**: decir a qué servidor apunta `nervado26.com.ar` y `www.nervado26.com.ar`.
- También puede dar seguridad, CDN, etc. (opcional).

**Analogía:** Cloudflare es la **guía telefónica** que dice “cuando alguien busca nervado26.com.ar, mandalo a esta dirección (Render)”.

### Resumen

| Servicio | Rol |
|----------|-----|
| **NIC Argentina** | Comprar / renovar el dominio `.com.ar` |
| **Cloudflare** | Configurar DNS (a dónde apunta el dominio) |
| **Render** | Alojar el sitio web (archivos de la landing) |
| **Google Workspace** | Correos `@nervado26.com.ar` (info@, ventas@, etc.) |

---

## 4. ¿Qué es DNS?

**DNS** (Domain Name System) = sistema que traduce nombres fáciles (`nervado26.com.ar`) a direcciones que entienden las computadoras (IPs o otros servidores).

Cuando alguien escribe `nervado26.com.ar` en el navegador:

1. El navegador pregunta: “¿Dónde está este sitio?”
2. Cloudflare responde según los **registros DNS** que configuramos.
3. El visitante llega al servidor de **Render**, que muestra la landing.

Sin DNS correcto, el dominio existe (en NIC) pero **no muestra el sitio** de Render.

---

## 5. Registros que YA estaban en Cloudflare (no los tocamos)

Antes de conectar Render, en Cloudflare ya había **2 registros** (de cuando configuraron correo y Google):

| Tipo | Nombre | Contenido | Para qué sirve |
|------|--------|-----------|----------------|
| **MX** | `nervado26.com.ar` | `smtp.google.com` | **Correo electrónico** — indica que los mails `@nervado26.com.ar` los maneja Google (Workspace/Gmail). |
| **TXT** | `nervado26.com.ar` | `google-site-verification=...` | **Verificación de Google** (Search Console, Workspace, etc.). |

**Importante:** Si borrás el MX, pueden dejar de funcionar los correos `info@`, `ventas@`, etc. Por eso **no los modificamos**.

Los mails del equipo (planilla “Mails creados”) son **otro servicio** (Google), no el sitio web en Render.

---

## 6. Los DOS registros que AGREGAMOS (para Render)

Render, al agregar dominio personalizado, pidió conectar el sitio. En Cloudflare agregamos:

### Registro 1 — Raíz del dominio (sin www)

| Campo | Valor |
|-------|--------|
| Tipo | **A** |
| Nombre | `@` (significa `nervado26.com.ar` sin www) |
| IP | `216.24.57.1` |
| Proxy | **DNS only** (nube gris en Cloudflare) |

**¿Qué es un registro A?**  
Apunta un nombre de dominio a una **dirección IP**. Render usa esa IP para el dominio raíz.

### Registro 2 — Subdominio www

| Campo | Valor |
|-------|--------|
| Tipo | **CNAME** |
| Nombre | `www` |
| Destino | `nervado26.onrender.com` |
| Proxy | **DNS only** (nube gris) |

**¿Qué es un CNAME?**  
Es un **alias**: “www.nervado26.com.ar es lo mismo que nervado26.onrender.com”. El navegador termina en el sitio de Render.

### ¿Por qué dos registros?

Porque son **dos direcciones** que la gente puede usar:

- `https://nervado26.com.ar`
- `https://www.nervado26.com.ar`

Render quiere verificar **ambas**. Por eso no alcanza con uno solo.

### ¿Por qué la nube gris en Cloudflare?

- **Nube naranja (Proxied):** el tráfico pasa por Cloudflare antes de Render. A veces complica la verificación o el SSL al inicio.
- **Nube gris (DNS only):** Cloudflare solo responde DNS y el tráfico va directo a Render. Recomendado para la primera configuración.

---

## 7. Paso a paso: qué hicimos en orden

### A) Sitio web (desarrollo)

1. Landing en React + Vite en la carpeta del proyecto.
2. Código en el repositorio de GitHub del proyecto.
3. Deploy en **Render** como Static Site:
   - Build: `npm install && npm run build`
   - Publicar carpeta: `dist`
4. Sitio funcionando en `https://nervado26.onrender.com` (URL temporal de Render).
5. Regla **Rewrite** en Render: `/*` → `/index.html` (para rutas `/productos`, `/nosotros`).

### B) Dominio (ya hecho por la compañera)

1. Compra/registro de `nervado26.com.ar` en **NIC Argentina**.
2. Dominio agregado a **Cloudflare** (nameservers apuntan a Cloudflare).
3. Correos configurados en **Google Workspace** (registro MX ya en Cloudflare).

### C) Conectar dominio con Render (lo que hicimos juntos)

1. En **Render** → Static Site → **Settings** → **Custom Domains** → agregar `nervado26.com.ar` y `www.nervado26.com.ar`.
2. Render muestra qué registros DNS hace falta crear.
3. En **Cloudflare** → dominio → **DNS** → **Records** → **Add record**:
   - A `@` → `216.24.57.1`
   - CNAME `www` → `nervado26.onrender.com`
4. Volver a **Render** → **Verify**.
5. Esperar propagación DNS (minutos a 24 h).
6. Render activa **HTTPS** (candado) automáticamente.

---

## 8. Diagrama simple

```
Usuario escribe nervado26.com.ar
        │
        ▼
   Cloudflare (DNS)
   "¿A dónde voy?"
   - @  → IP de Render (216.24.57.1)
   - www → nervado26.onrender.com
        │
        ▼
   Render (hosting)
   Sirve archivos de /dist (la landing)
        │
        ▼
   El usuario ve el sitio con tu dominio
```

Correo (aparte):

```
mail a info@nervado26.com.ar
        │
        ▼
   Registro MX → Google (smtp.google.com)
   (no pasa por Render)
```

---

## 9. Preguntas frecuentes del equipo

### ¿Compramos el dominio en Cloudflare?

No necesariamente. En este proyecto: **compra en NIC**, **DNS en Cloudflare**.

### ¿Por qué aparece onrender.com si queremos .com.ar?

Render siempre genera una URL `.onrender.com`. El dominio `.com.ar` se suma encima con DNS. El público usa `.com.ar`.

### ¿Hay que pagar algo más?

- **NIC:** renovación anual del dominio `.com.ar`.
- **Render:** plan gratuito o de pago según uso.
- **Cloudflare:** plan gratuito suele alcanzar para DNS.
- **Google Workspace:** correos (plan por usuario).

### ¿Qué pasa si cambiamos algo en el código?

`git push` a `main` → Render redeploy automático → el dominio sigue igual, muestra la versión nueva.

### ¿Dónde se editan teléfono, WhatsApp, textos?

Archivo `src/config/site.js` en el repositorio.

---

## 10. Checklist de verificación

- [ ] Sitio live en `nervado26.onrender.com`
- [ ] Publish Directory en Render = `dist`
- [ ] Rewrite SPA en Render (`/*` → `/index.html`)
- [ ] Registro A `@` → `216.24.57.1` en Cloudflare
- [ ] Registro CNAME `www` → `nervado26.onrender.com` en Cloudflare
- [ ] MX y TXT de Google **sin cambios**
- [ ] Verify en Render → dominios en verde / Verified
- [ ] Prueba: `https://nervado26.com.ar` y `https://www.nervado26.com.ar`
- [ ] Prueba: `/productos` y `/nosotros` con recarga de página

---

## 11. Contactos útiles (según planilla interna — sin contraseñas)

| Servicio | Uso | Acceso |
|----------|-----|--------|
| NIC Argentina | Dominio .com.ar | [nic.ar](https://nic.ar/) |
| Cloudflare | DNS del dominio | [dash.cloudflare.com](https://dash.cloudflare.com/login) |
| Render | Hosting del sitio | [dashboard.render.com](https://dashboard.render.com) |
| Google Workspace | Correos @nervado26.com.ar | [admin.google.com](https://admin.google.com) |
| GitHub | Código fuente | repo `nervado26` |

**Seguridad:** no compartir contraseñas en planillas abiertas ni en chats. Usar gestor de contraseñas del equipo.

---

*Última actualización: junio 2026 — Nervado 26*
