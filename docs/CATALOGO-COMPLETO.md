# Catálogo completo — estado en la web

Referencia alineada con `docs/DESCRIPCION Y FICHA TECNICA ARTICULOS.docx`.

**En la web:** 47 familias de materiales (16 siderúrgicos con medidas + 31 nuevos con consulta por WhatsApp).

**Pendiente operativo:** tablas de medidas y fotos dedicadas para los ítems de consulta (cuando haya Excel o imágenes).

---

## En la web con tabla de medidas (16)

| # | Material | Archivo datos |
|---|----------|---------------|
| 1 | Hierros nervados de construcción | `materialsCatalog.js` |
| 2 | Alambres recocidos o negros | |
| 3 | Alambres galvanizados | |
| 4 | Clavos punta parís | |
| 5 | Clavos espiralados | |
| 6 | Clavos negros | |
| 7 | Mallas sima | |
| 8 | Caños redondos | `materialsCatalogCanosSplit.js` |
| 9 | Caños cuadrados | |
| 10 | Caños rectangulares | |
| 11 | Ángulos | `materialsCatalog.js` |
| 12 | Planchuelas lisas | |
| 13 | Hierros lisos redondos | |
| 14 | Perfiles C | |
| 15 | Perfiles UPN grandes | |
| 16 | Perfiles UPN chicos | |

---

## Agregados en la web — consulta / medidas pendientes (31)

| # | Material | Slug |
|---|----------|------|
| 17 | Cemento | `cemento` |
| 18 | Caños negros de uso mecánico | `canos-negros-uso-mecanico` |
| 19 | Planchuelas perforadas | `planchuelas-perforadas` |
| 20 | Hierros lisos cuadrados | `hierros-lisos-cuadrados` |
| 21 | Hierro perfil TE | `hierro-perfil-te` |
| 22 | Perfiles IPN | `perfiles-ipn` |
| 23 | Perfiles W | `perfiles-w` |
| 24 | Chapas negras lisas | `chapas-negras-lisas` |
| 25 | Chapas galvanizadas lisas | `chapas-galvanizadas-lisas` |
| 26 | Chapas rayadas / semilla de melón | `chapas-rayadas-semilla-melon` |
| 27 | Chapas para techo | `chapas-para-techo` |
| 28 | Arena | `arena` |
| 29 | Ripio | `ripio` |
| 30 | Piedra bola | `piedra-bola` |
| 31 | Estabilizado | `estabilizado` |
| 32 | Placas de yeso estándar (ST) | `placas-yeso-st` |
| 33 | Placas de yeso RH | `placas-yeso-rh` |
| 34 | Placas de yeso RF | `placas-yeso-rf` |
| 35 | Placas de yeso AR | `placas-yeso-ar` |
| 36 | Placas de yeso acústicas | `placas-yeso-acusticas` |
| 37 | Placas cementicias Multiplaca | `placas-cementicias-multiplaca` |
| 38 | Placas cementicias estructurales | `placas-cementicias-estructurales` |
| 39 | Placas cementicias entrepisos | `placas-cementicias-entrepisos` |
| 40 | Placas cementicias texturizadas | `placas-cementicias-texturizadas` |
| 41 | Placas cementicias bajo teja | `placas-cementicias-bajo-teja` |
| 42 | Montantes 35 mm | `montantes-35` |
| 43 | Montantes 70 mm | `montantes-70` |
| 44 | Montantes 100 mm | `montantes-100` |
| 45 | Soleras 35 mm | `soleras-35` |
| 46 | Soleras 70 mm | `soleras-70` |
| 47 | Soleras 100 mm | `soleras-100` |

Textos en `materialDescriptionsExtra.js`. Datos stub en `materialsCatalogExtra.js`.

---

## Cobertura del documento

Todos los ítems y variantes comerciales del `docx` están representados (caños, placas de yeso, placas cementicias, montantes y soleras por medida). Los slugs unificados antiguos (`canos`, `placas-de-yeso`, `placas-cementicias`, `montantes`, `soleras`) ya no se usan.

---

## Archivos del proyecto

| Qué editar | Archivo |
|------------|---------|
| Medidas y tablas (siderúrgicos) | `src/config/materialsCatalog.js` |
| Caños separados | `src/config/materialsCatalogCanosSplit.js` |
| Nuevos materiales (stub) | `src/config/materialsCatalogExtra.js` |
| Textos cards y fichas (base) | `src/config/materialDescriptions.js` |
| Textos nuevos materiales | `src/config/materialDescriptionsExtra.js` |
| Unión para la web | `src/config/materialsIndex.js` |

---

## Próximos pasos sugeridos

1. Incorporar medidas del Excel para ítems de consulta.
2. Fotos en `public/images/materiales/verdaderos/` para cada familia nueva.
