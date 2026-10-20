# WhatsApp y contacto

## Número y mensajes

Todo sale de `src/config/site.js` → objeto `contact`:

- `whatsapp` — número sin símbolos (ej. `54911...`)
- `whatsappBudgetMessage` — mensaje del botón "Pedir presupuesto"
- `whatsappProductPrefix` — prefijo al consultar un producto

## Helper de links

Archivo: `src/utils/whatsapp.js`

```js
getWhatsAppUrl(mensaje)        // link genérico con texto
getBudgetWhatsAppUrl()          // link de presupuesto
productWhatsAppMessage(nombre)  // mensaje para un producto
```

Genera URLs tipo: `https://wa.me/54911...?text=...`

## Dónde aparece WhatsApp

| Lugar | Mensaje |
|-------|---------|
| Botón flotante | Presupuesto general |
| Cards del catálogo | "Quiero consultar por: [material]" |
| Ficha de material | Mismo mensaje con nombre del producto |
| Sección contacto | Link directo |

## Componente Button

Los botones de WhatsApp usan `<Button href={waUrl} external>`.

`external` abre en nueva pestaña.

## Página de contacto

`pages/ContactPage.jsx` renderiza `sections/Contact.jsx`:

- Cards con teléfono, email, dirección
- Mapa embebido
- Horarios
- Redes sociales

Los datos vienen de `site.js` → `contact`.
